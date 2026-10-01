package netmanage.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import netmanage.app.entity.DeviceType;
import netmanage.app.service.DeviceTypeService;

@RestController
@RequestMapping("/api/device-types")
public class DeviceTypeController {

    private final DeviceTypeService deviceTypeService;

    public DeviceTypeController(DeviceTypeService deviceTypeService) {
        this.deviceTypeService = deviceTypeService;
    }

    @GetMapping
    public List<DeviceType> findAll() {
        return deviceTypeService.findAll();
    }

    @GetMapping("/{id}")
    public DeviceType findById(@PathVariable Long id) {
        return deviceTypeService.findById(id);
    }

    @PostMapping
    public ResponseEntity<DeviceType> create(@Valid @RequestBody DeviceType deviceType) {
        return ResponseEntity.status(HttpStatus.CREATED).body(deviceTypeService.create(deviceType));
    }

    @PutMapping("/{id}")
    public DeviceType update(@PathVariable Long id, @Valid @RequestBody DeviceType deviceType) {
        return deviceTypeService.update(id, deviceType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        deviceTypeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
