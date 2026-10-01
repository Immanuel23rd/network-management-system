import ResourceCrud from '../components/ResourceCrud';
import StatusBadge from '../components/StatusBadge';

export default function InterfacesPage() {
  return (
    <ResourceCrud
      title="Interfaces"
      subtitle="Ports and SVIs belonging to a device. VLAN is optional."
      endpoint="/interfaces"
      columns={[
        { key: 'device', label: 'Device', render: (row) => row.device?.hostname || '—', mono: true },
        { key: 'name', label: 'Name', mono: true },
        { key: 'type', label: 'Type' },
        { key: 'macAddress', label: 'MAC', mono: true },
        { key: 'vlan', label: 'VLAN', render: (row) => (row.vlan ? `${row.vlan.vlanNumber} ${row.vlan.name}` : '—') },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> }
      ]}
      fields={[
        {
          name: 'device',
          label: 'Device',
          type: 'relation',
          endpoint: '/devices',
          optionLabel: 'hostname',
          required: true
        },
        { name: 'name', label: 'Interface name', required: true, placeholder: 'GigabitEthernet1/0/1' },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: true,
          options: ['ETHERNET', 'FIBER', 'WIFI', 'LOOPBACK', 'VLAN']
        },
        { name: 'macAddress', label: 'MAC address', placeholder: '00:1A:2B:3C:4D:5E' },
        { name: 'status', label: 'Status', type: 'select', required: true, options: ['UP', 'DOWN', 'DISABLED'] },
        {
          name: 'vlan',
          label: 'VLAN',
          type: 'relation',
          endpoint: '/vlans',
          optionLabel: (item) => `${item.vlanNumber} ${item.name}`
        }
      ]}
    />
  );
}
