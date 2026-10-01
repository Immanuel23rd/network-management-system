package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.IpAddress;

public interface IpAddressRepository extends JpaRepository<IpAddress, Long> {
}
