package netmanage.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import netmanage.app.entity.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
}
