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
import netmanage.app.entity.Device;
import netmanage.app.service.DeviceService;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping
    public List<Device> findAll() {
        return deviceService.findAll();
    }

    @GetMapping("/{id}")
    public Device findById(@PathVariable Long id) {
        return deviceService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Device> create(@Valid @RequestBody Device device) {
        return ResponseEntity.status(HttpStatus.CREATED).body(deviceService.create(device));
    }

    @PutMapping("/{id}")
    public Device update(@PathVariable Long id, @Valid @RequestBody Device device) {
        return deviceService.update(id, device);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        deviceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
