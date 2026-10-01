import ResourceCrud from '../components/ResourceCrud';
import StatusBadge from '../components/StatusBadge';

export default function MaintenancePage() {
  return (
    <ResourceCrud
      title="Maintenance"
      subtitle="Work records assigned to a device and a technician or administrator."
      endpoint="/maintenance"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'maintenanceType', label: 'Type' },
        { key: 'device', label: 'Device', render: (row) => row.device?.hostname || '—', mono: true },
        { key: 'user', label: 'Assigned to', render: (row) => row.user?.fullName || row.user?.username || '—' },
        { key: 'scheduledDate', label: 'Scheduled' },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> }
      ]}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        {
          name: 'maintenanceType',
          label: 'Type',
          type: 'select',
          required: true,
          options: ['PREVENTIVE', 'CORRECTIVE', 'UPGRADE', 'INSPECTION']
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
        },
        { name: 'scheduledDate', label: 'Scheduled date', inputType: 'date', required: true },
        { name: 'completedDate', label: 'Completed date', inputType: 'date' },
        {
          name: 'device',
          label: 'Device',
          type: 'relation',
          endpoint: '/devices',
          optionLabel: 'hostname',
          required: true
        },
        {
          name: 'user',
          label: 'Assigned user',
          type: 'relation',
          endpoint: '/users',
          optionLabel: (item) => `${item.fullName} (${item.username})`,
          required: true
        }
      ]}
    />
  );
}
