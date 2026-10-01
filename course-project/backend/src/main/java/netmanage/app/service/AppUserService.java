package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.AppUser;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.AppUserRepository;

@Service
@Transactional
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Transactional(readOnly = true)
    public List<AppUser> findAll() {
        return appUserRepository.findAll();
    }

    @Transactional(readOnly = true)
    public AppUser findById(Long id) {
        return appUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    public AppUser create(AppUser user) {
        user.setId(null);
        return appUserRepository.save(user);
    }

    public AppUser update(Long id, AppUser incoming) {
        AppUser existing = findById(id);
        existing.setUsername(incoming.getUsername());
        existing.setFullName(incoming.getFullName());
        existing.setEmail(incoming.getEmail());
        existing.setRole(incoming.getRole());
        existing.setStatus(incoming.getStatus());
        return appUserRepository.save(existing);
    }

    public void delete(Long id) {
        AppUser existing = findById(id);
        appUserRepository.delete(existing);
    }
}
