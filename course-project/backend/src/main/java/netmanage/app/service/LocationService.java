package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.Location;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.LocationRepository;

@Service
@Transactional
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Transactional(readOnly = true)
    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Location findById(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location", id));
    }

    public Location create(Location location) {
        location.setId(null);
        return locationRepository.save(location);
    }

    public Location update(Long id, Location incoming) {
        Location existing = findById(id);
        existing.setName(incoming.getName());
        existing.setBuilding(incoming.getBuilding());
        existing.setFloor(incoming.getFloor());
        existing.setRoom(incoming.getRoom());
        existing.setAddress(incoming.getAddress());
        existing.setNotes(incoming.getNotes());
        return locationRepository.save(existing);
    }

    public void delete(Long id) {
        Location existing = findById(id);
        locationRepository.delete(existing);
    }
}
