package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.NetInterface;

public interface NetInterfaceRepository extends JpaRepository<NetInterface, Long> {
}
