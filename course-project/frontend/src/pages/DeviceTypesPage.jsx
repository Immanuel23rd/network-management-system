import ResourceCrud from '../components/ResourceCrud';

export default function DeviceTypesPage() {
  return (
    <ResourceCrud
      title="Device types"
      subtitle="Categories used when classifying campus equipment."
      endpoint="/device-types"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' }
      ]}
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'description', label: 'Description', type: 'textarea' }
      ]}
    />
  );
}
