import { useCallback, useEffect, useMemo, useState } from 'react';
import { createRecord, deleteRecord, getAll, updateRecord } from '../api/client';
import StatusBadge from './StatusBadge';

function emptyForm(fields) {
  const next = {};
  fields.forEach((field) => {
    next[field.name] = field.defaultValue ?? '';
  });
  return next;
}

function recordToForm(record, fields) {
  const next = {};
  fields.forEach((field) => {
    if (field.type === 'relation') {
      next[field.name] = record[field.name]?.id ?? '';
    } else if (record[field.name] == null) {
      next[field.name] = '';
    } else {
      next[field.name] = String(record[field.name]);
    }
  });
  return next;
}

function formToBody(form, fields) {
  const body = {};
  fields.forEach((field) => {
    const raw = form[field.name];
    if (field.type === 'relation') {
      body[field.name] = raw === '' || raw == null ? null : { id: Number(raw) };
      return;
    }
    if (field.type === 'number') {
      body[field.name] = raw === '' || raw == null ? null : Number(raw);
      return;
    }
    body[field.name] = raw === '' ? null : raw;
  });
  return body;
}

function optionText(field, item) {
  if (typeof field.optionLabel === 'function') {
    return field.optionLabel(item);
  }
  if (field.optionLabel) {
    return item[field.optionLabel];
  }
  return item.name || item.hostname || item.title || `#${item.id}`;
}

export default function ResourceCrud({ title, subtitle, endpoint, columns, fields }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [banner, setBanner] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [form, setForm] = useState(() => emptyForm(fields));
  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [relationOptions, setRelationOptions] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    setBanner(null);
    try {
      const data = await getAll(endpoint);
      setRows(Array.isArray(data) ? data : []);
    } catch (error) {
      setBanner({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const relationKey = fields
    .filter((field) => field.type === 'relation' && field.endpoint)
    .map((field) => `${field.name}:${field.endpoint}`)
    .join('|');

  useEffect(() => {
    const relationFields = fields.filter((field) => field.type === 'relation' && field.endpoint);
    if (relationFields.length === 0) {
      return undefined;
    }
    let cancelled = false;
    Promise.all(
      relationFields.map(async (field) => {
        const data = await getAll(field.endpoint);
        return [field.name, Array.isArray(data) ? data : []];
      })
    )
      .then((entries) => {
        if (!cancelled) {
          setRelationOptions(Object.fromEntries(entries));
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setBanner({ type: 'error', text: error.message });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [relationKey]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return rows;
    }
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(needle));
  }, [rows, query]);

  function openCreate() {
    setForm(emptyForm(fields));
    setFieldErrors({});
    setBanner(null);
    setDrawer({ mode: 'create' });
  }

  function openEdit(row) {
    setForm(recordToForm(row, fields));
    setFieldErrors({});
    setBanner(null);
    setDrawer({ mode: 'edit', id: row.id });
  }

  function closeDrawer() {
    setDrawer(null);
    setFieldErrors({});
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setFieldErrors({});
    setBanner(null);
    const body = formToBody(form, fields);
    try {
      if (drawer.mode === 'create') {
        await createRecord(endpoint, body);
      } else {
        await updateRecord(endpoint, drawer.id, body);
      }
      closeDrawer();
      await load();
    } catch (error) {
      setFieldErrors(error.fieldErrors || {});
      setBanner({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) {
      return;
    }
    setBanner(null);
    try {
      await deleteRecord(endpoint, pendingDelete.id);
      setPendingDelete(null);
      await load();
    } catch (error) {
      setPendingDelete(null);
      setBanner({ type: 'error', text: error.message });
    }
  }

  function cell(column, row) {
    if (column.render) {
      return column.render(row);
    }
    const value = row[column.key];
    if (column.badge) {
      return <StatusBadge value={value} />;
    }
    if (value == null || value === '') {
      return <span className="muted">—</span>;
    }
    return column.mono ? <span className="mono">{value}</span> : String(value);
  }

  return (
    <section>
      <div className="page-head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="toolbar">
          <input
            className="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter rows"
          />
          <button className="btn btn-primary" type="button" onClick={openCreate}>
            New record
          </button>
        </div>
      </div>

      {banner ? <div className={`banner ${banner.type}`}>{banner.text}</div> : null}

      {pendingDelete ? (
        <div className="banner">
          Delete <strong>{pendingDelete.label}</strong>? Related child records will block this with HTTP 409.
          <div className="row-actions" style={{ marginTop: 10 }}>
            <button className="btn btn-danger" type="button" onClick={confirmDelete}>
              Confirm delete
            </button>
            <button className="btn" type="button" onClick={() => setPendingDelete(null)}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="empty">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="empty">
                    No records match the current view.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id}>
                    {columns.map((column) => (
                      <td key={column.key} className={column.mono ? 'mono' : undefined}>
                        {cell(column, row)}
                      </td>
                    ))}
                    <td>
                      <div className="row-actions">
                        <button className="btn" type="button" onClick={() => openEdit(row)}>
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() =>
                            setPendingDelete({
                              id: row.id,
                              label: row.hostname || row.name || row.address || row.title || row.username || `#${row.id}`
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {drawer ? (
        <div className="overlay" onClick={closeDrawer}>
          <aside className="drawer" onClick={(event) => event.stopPropagation()}>
            <header>
              <h3>{drawer.mode === 'create' ? `New ${title}` : `Edit ${title}`}</h3>
              <button className="btn" type="button" onClick={closeDrawer}>
                Close
              </button>
            </header>
            <form onSubmit={onSubmit}>
              {fields.map((field) => (
                <div className="field" key={field.name}>
                  <label htmlFor={field.name}>
                    {field.label}
                    {field.required ? ' *' : ''}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      value={form[field.name]}
                      onChange={(event) => setForm((prev) => ({ ...prev, [field.name]: event.target.value }))}
                    />
                  ) : field.type === 'select' || field.type === 'relation' ? (
                    <select
                      id={field.name}
                      value={form[field.name]}
                      required={field.required}
                      onChange={(event) => setForm((prev) => ({ ...prev, [field.name]: event.target.value }))}
                    >
                      <option value="">{field.placeholder || 'Select…'}</option>
                      {field.type === 'select'
                        ? field.options.map((option) => (
                            <option key={option} value={option}>
                              {option.replaceAll('_', ' ')}
                            </option>
                          ))
                        : (relationOptions[field.name] || []).map((item) => (
                            <option key={item.id} value={item.id}>
                              {optionText(field, item)}
                            </option>
                          ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      type={field.inputType || field.type || 'text'}
                      value={form[field.name]}
                      required={field.required}
                      placeholder={field.placeholder}
                      onChange={(event) => setForm((prev) => ({ ...prev, [field.name]: event.target.value }))}
                    />
                  )}
                  {fieldErrors[field.name] ? <div className="error">{fieldErrors[field.name]}</div> : null}
                </div>
              ))}
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </form>
          </aside>
        </div>
      ) : null}
    </section>
  );
}
