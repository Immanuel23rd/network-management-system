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
import netmanage.app.entity.Subnet;
import netmanage.app.service.SubnetService;

@RestController
@RequestMapping("/api/subnets")
public class SubnetController {

    private final SubnetService subnetService;

    public SubnetController(SubnetService subnetService) {
        this.subnetService = subnetService;
    }

    @GetMapping
    public List<Subnet> findAll() {
        return subnetService.findAll();
    }

    @GetMapping("/{id}")
    public Subnet findById(@PathVariable Long id) {
        return subnetService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Subnet> create(@Valid @RequestBody Subnet subnet) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subnetService.create(subnet));
    }

    @PutMapping("/{id}")
    public Subnet update(@PathVariable Long id, @Valid @RequestBody Subnet subnet) {
        return subnetService.update(id, subnet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        subnetService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
