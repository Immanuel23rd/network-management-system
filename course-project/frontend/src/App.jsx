import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import DeviceTypesPage from './pages/DeviceTypesPage';
import LocationsPage from './pages/LocationsPage';
import DevicesPage from './pages/DevicesPage';
import InterfacesPage from './pages/InterfacesPage';
import VlansPage from './pages/VlansPage';
import SubnetsPage from './pages/SubnetsPage';
import IpAddressesPage from './pages/IpAddressesPage';
import MaintenancePage from './pages/MaintenancePage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/device-types" element={<DeviceTypesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/interfaces" element={<InterfacesPage />} />
        <Route path="/vlans" element={<VlansPage />} />
        <Route path="/subnets" element={<SubnetsPage />} />
        <Route path="/ip-addresses" element={<IpAddressesPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
