import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/users', label: 'Users' },
  { to: '/device-types', label: 'Device Types' },
  { to: '/locations', label: 'Locations' },
  { to: '/devices', label: 'Devices' },
  { to: '/interfaces', label: 'Interfaces' },
  { to: '/vlans', label: 'VLANs' },
  { to: '/subnets', label: 'Subnets' },
  { to: '/ip-addresses', label: 'IP Addresses' },
  { to: '/maintenance', label: 'Maintenance' }
];

function Icon({ name }) {
  const common = {
    width: 16,
    height: 16,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  switch (name) {
    case 'Dashboard':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case 'Users':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="3" />
          <path d="M4 19c0-3 2.2-5 5-5s5 2 5 5" />
          <circle cx="17" cy="9" r="2" />
          <path d="M20 19c0-2.2-1.3-3.7-3-4" />
        </svg>
      );
    case 'Devices':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="12" rx="1.5" />
          <path d="M9 18v2h6v-2" />
        </svg>
      );
    case 'Interfaces':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 12h16" />
          <path d="M8 8v8" />
          <path d="M16 8v8" />
          <rect x="6" y="6" width="4" height="4" />
          <rect x="14" y="14" width="4" height="4" />
        </svg>
      );
    case 'VLANs':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16" />
        </svg>
      );
    case 'Subnets':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 4v16" />
          <path d="M6 8h12" />
          <path d="M6 16h12" />
        </svg>
      );
    case 'IP Addresses':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 9h4M7 12h10M7 15h6" />
        </svg>
      );
    case 'Maintenance':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M14 7l3 3-8 8H6v-3z" />
          <path d="M13 8l2-2 3 3-2 2" />
        </svg>
      );
    case 'Locations':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    default:
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="5" y="5" width="14" height="14" />
        </svg>
      );
  }
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const current = LINKS.find((link) =>
    link.end ? location.pathname === '/' : location.pathname.startsWith(link.to)
  );

  return (
    <div className="app-shell">
      {open ? <div className="backdrop" onClick={() => setOpen(false)} /> : null}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 12h4l2-6 4 12 2-6h4" />
            </svg>
          </div>
          <div>
            <h1>NetManage</h1>
            <p>Northline University</p>
          </div>
        </div>
        <nav className="nav">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={Boolean(link.end)}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <Icon name={link.label} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot">CRUD inventory · REST / JPA</div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button className="menu-btn" type="button" onClick={() => setOpen(true)} aria-label="Open navigation">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <div className="crumb">{current ? current.label : 'NetManage'}</div>
        </header>
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
