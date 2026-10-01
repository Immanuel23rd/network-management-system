package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.DeviceType;

public interface DeviceTypeRepository extends JpaRepository<DeviceType, Long> {
}
