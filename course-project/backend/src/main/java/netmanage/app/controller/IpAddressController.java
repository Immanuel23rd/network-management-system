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
import netmanage.app.entity.IpAddress;
import netmanage.app.service.IpAddressService;

@RestController
@RequestMapping("/api/ip-addresses")
public class IpAddressController {

    private final IpAddressService ipAddressService;

    public IpAddressController(IpAddressService ipAddressService) {
        this.ipAddressService = ipAddressService;
    }

    @GetMapping
    public List<IpAddress> findAll() {
        return ipAddressService.findAll();
    }

    @GetMapping("/{id}")
    public IpAddress findById(@PathVariable Long id) {
        return ipAddressService.findById(id);
    }

    @PostMapping
    public ResponseEntity<IpAddress> create(@Valid @RequestBody IpAddress ipAddress) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ipAddressService.create(ipAddress));
    }

    @PutMapping("/{id}")
    public IpAddress update(@PathVariable Long id, @Valid @RequestBody IpAddress ipAddress) {
        return ipAddressService.update(id, ipAddress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ipAddressService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
