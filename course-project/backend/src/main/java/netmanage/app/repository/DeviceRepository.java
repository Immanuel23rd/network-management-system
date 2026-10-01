package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.Device;

public interface DeviceRepository extends JpaRepository<Device, Long> {
}
