import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../api/client';

const CARDS = [
  { key: 'users', label: 'Users', to: '/users' },
  { key: 'deviceTypes', label: 'Device Types', to: '/device-types' },
  { key: 'locations', label: 'Locations', to: '/locations' },
  { key: 'devices', label: 'Devices', to: '/devices' },
  { key: 'interfaces', label: 'Interfaces', to: '/interfaces' },
  { key: 'vlans', label: 'VLANs', to: '/vlans' },
  { key: 'subnets', label: 'Subnets', to: '/subnets' },
  { key: 'ipAddresses', label: 'IP Addresses', to: '/ip-addresses' },
  { key: 'maintenanceRecords', label: 'Maintenance', to: '/maintenance' }
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getAll('/stats')
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <div className="page-head">
        <div>
          <h2>Campus inventory</h2>
          <p>
            Northline University network records. Counts come from PostgreSQL through the Spring Boot REST API.
            This dashboard does not monitor live traffic.
          </p>
        </div>
      </div>
      {error ? <div className="banner error">{error}</div> : null}
      <div className="grid-cards">
        {CARDS.map((card) => (
          <Link key={card.key} to={card.to} className="stat-card">
            <span>{card.label}</span>
            <strong>{stats ? stats[card.key] : '—'}</strong>
          </Link>
        ))}
      </div>
      <div className="split">
        <div className="panel" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>How this project is wired</h3>
          <ol className="note-list">
            <li>React forms POST/PUT JSON to `/api/...` on port 8081.</li>
            <li>Controllers validate input and call the service layer.</li>
            <li>JPA entities persist to PostgreSQL with foreign keys.</li>
            <li>Deletes that still have children return HTTP 409.</li>
          </ol>
        </div>
        <div className="panel" style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>Suggested demo path</h3>
          <ol className="note-list">
            <li>Open Devices and show nested type/location names.</li>
            <li>Create an interface on `nl-core-sw-01`.</li>
            <li>Try deleting VLAN 10 while subnets still reference it.</li>
            <li>Edit a maintenance record and complete it.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
