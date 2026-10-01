package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.Subnet;

public interface SubnetRepository extends JpaRepository<Subnet, Long> {
}
