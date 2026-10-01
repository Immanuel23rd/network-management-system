import ResourceCrud from '../components/ResourceCrud';

export default function LocationsPage() {
  return (
    <ResourceCrud
      title="Locations"
      subtitle="MDF, IDF, and building rooms that house network equipment."
      endpoint="/locations"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'building', label: 'Building' },
        { key: 'floor', label: 'Floor' },
        { key: 'room', label: 'Room', mono: true },
        { key: 'address', label: 'Address' }
      ]}
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'building', label: 'Building' },
        { name: 'floor', label: 'Floor' },
        { name: 'room', label: 'Room' },
        { name: 'address', label: 'Address' },
        { name: 'notes', label: 'Notes', type: 'textarea' }
      ]}
    />
  );
}
