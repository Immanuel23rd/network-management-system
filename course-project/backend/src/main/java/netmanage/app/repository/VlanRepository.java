package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.Vlan;

public interface VlanRepository extends JpaRepository<Vlan, Long> {
}
