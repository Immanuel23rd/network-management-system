import ResourceCrud from '../components/ResourceCrud';
import StatusBadge from '../components/StatusBadge';

export default function DevicesPage() {
  return (
    <ResourceCrud
      title="Devices"
      subtitle="Physical and virtual network assets. Type and location are required foreign keys."
      endpoint="/devices"
      columns={[
        { key: 'hostname', label: 'Hostname', mono: true },
        { key: 'deviceType', label: 'Type', render: (row) => row.deviceType?.name || '—' },
        { key: 'location', label: 'Location', render: (row) => row.location?.name || '—' },
        { key: 'manufacturer', label: 'Manufacturer' },
        { key: 'model', label: 'Model' },
        { key: 'serialNumber', label: 'Serial', mono: true },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> }
      ]}
      fields={[
        { name: 'hostname', label: 'Hostname', required: true },
        { name: 'manufacturer', label: 'Manufacturer' },
        { name: 'model', label: 'Model' },
        { name: 'serialNumber', label: 'Serial number', required: true },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: ['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'DECOMMISSIONED']
        },
        { name: 'purchaseDate', label: 'Purchase date', inputType: 'date' },
        {
          name: 'deviceType',
          label: 'Device type',
          type: 'relation',
          endpoint: '/device-types',
          optionLabel: 'name',
          required: true
        },
        {
          name: 'location',
          label: 'Location',
          type: 'relation',
          endpoint: '/locations',
          optionLabel: 'name',
          required: true
        },
        { name: 'notes', label: 'Notes', type: 'textarea' }
      ]}
    />
  );
}
