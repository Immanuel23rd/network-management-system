import ResourceCrud from '../components/ResourceCrud';

export default function SubnetsPage() {
  return (
    <ResourceCrud
      title="Subnets"
      subtitle="IPv4 prefixes assigned to a VLAN. CIDR is stored as an integer 0–32."
      endpoint="/subnets"
      columns={[
        {
          key: 'network',
          label: 'Network',
          mono: true,
          render: (row) => `${row.networkAddress}/${row.cidr}`
        },
        { key: 'subnetMask', label: 'Mask', mono: true },
        { key: 'vlan', label: 'VLAN', render: (row) => (row.vlan ? `${row.vlan.vlanNumber} ${row.vlan.name}` : '—') },
        { key: 'description', label: 'Description' }
      ]}
      fields={[
        { name: 'networkAddress', label: 'Network address', required: true, placeholder: '10.10.0.0' },
        { name: 'cidr', label: 'CIDR', type: 'number', required: true },
        { name: 'subnetMask', label: 'Subnet mask', required: true, placeholder: '255.255.255.0' },
        {
          name: 'vlan',
          label: 'VLAN',
          type: 'relation',
          endpoint: '/vlans',
          optionLabel: (item) => `${item.vlanNumber} ${item.name}`,
          required: true
        },
        { name: 'description', label: 'Description', type: 'textarea' }
      ]}
    />
  );
}
