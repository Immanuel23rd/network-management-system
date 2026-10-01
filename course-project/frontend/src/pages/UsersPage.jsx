import ResourceCrud from '../components/ResourceCrud';
import StatusBadge from '../components/StatusBadge';

export default function UsersPage() {
  return (
    <ResourceCrud
      title="Users"
      subtitle="Operators recorded in app_users. Roles are informational for this CRUD project; there is no login gate."
      endpoint="/users"
      columns={[
        { key: 'username', label: 'Username', mono: true },
        { key: 'fullName', label: 'Full name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> }
      ]}
      fields={[
        { name: 'username', label: 'Username', required: true },
        { name: 'fullName', label: 'Full name', required: true },
        { name: 'email', label: 'Email', inputType: 'email', required: true },
        { name: 'role', label: 'Role', type: 'select', required: true, options: ['ADMIN', 'TECHNICIAN', 'VIEWER'] },
        { name: 'status', label: 'Status', type: 'select', required: true, options: ['ACTIVE', 'INACTIVE'] }
      ]}
    />
  );
}
