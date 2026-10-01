import ResourceCrud from '../components/ResourceCrud';
import StatusBadge from '../components/StatusBadge';

export default function VlansPage() {
  return (
    <ResourceCrud
      title="VLANs"
      subtitle="Campus broadcast domains. Numbers must be unique in the range 1–4094."
      endpoint="/vlans"
      columns={[
        { key: 'vlanNumber', label: 'Number', mono: true },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> }
      ]}
      fields={[
        { name: 'vlanNumber', label: 'VLAN number', type: 'number', required: true },
        { name: 'name', label: 'Name', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'status', label: 'Status', type: 'select', required: true, options: ['ACTIVE', 'INACTIVE'] }
      ]}
    />
  );
}
