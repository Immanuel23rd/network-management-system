import ResourceCrud from '../components/ResourceCrud';
import StatusBadge from '../components/StatusBadge';

export default function IpAddressesPage() {
  return (
    <ResourceCrud
      title="IP addresses"
      subtitle="Host addresses inside a subnet. Binding to an interface is optional and unique."
      endpoint="/ip-addresses"
      columns={[
        { key: 'address', label: 'Address', mono: true },
        {
          key: 'subnet',
          label: 'Subnet',
          mono: true,
          render: (row) => (row.subnet ? `${row.subnet.networkAddress}/${row.subnet.cidr}` : '—')
        },
        {
          key: 'netInterface',
          label: 'Interface',
          render: (row) => row.netInterface?.name || '—'
        },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge value={row.status} /> }
      ]}
      fields={[
        { name: 'address', label: 'IP address', required: true, placeholder: '10.10.0.10' },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          options: ['ALLOCATED', 'AVAILABLE', 'RESERVED']
        },
        {
          name: 'subnet',
          label: 'Subnet',
          type: 'relation',
          endpoint: '/subnets',
          optionLabel: (item) => `${item.networkAddress}/${item.cidr}`,
          required: true
        },
        {
          name: 'netInterface',
          label: 'Interface',
          type: 'relation',
          endpoint: '/interfaces',
          optionLabel: (item) => `${item.device?.hostname || 'device'} / ${item.name}`
        }
      ]}
    />
  );
}
