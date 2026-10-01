package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long> {
}
