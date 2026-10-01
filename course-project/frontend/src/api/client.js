const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

function formatError(data, statusText) {
  if (!data || typeof data !== 'object') {
    return statusText || 'Request failed';
  }
  if (data.message) {
    return data.message;
  }
  if (data.errors && typeof data.errors === 'object') {
    return Object.values(data.errors).join(' ');
  }
  return statusText || 'Request failed';
}

export async function api(path, options = {}) {
  const { body, headers, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    ...rest,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const error = new Error(formatError(data, response.statusText));
    error.status = response.status;
    error.details = data || {};
    error.fieldErrors = data && data.errors ? data.errors : {};
    throw error;
  }

  return data;
}

export function getAll(path) {
  return api(path);
}

export function getById(path, id) {
  return api(`${path}/${id}`);
}

export function createRecord(path, body) {
  return api(path, { method: 'POST', body });
}

export function updateRecord(path, id, body) {
  return api(`${path}/${id}`, { method: 'PUT', body });
}

export function deleteRecord(path, id) {
  return api(`${path}/${id}`, { method: 'DELETE' });
}
