package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.MaintenanceRecord;

public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Long> {
}
