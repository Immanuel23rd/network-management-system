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
import netmanage.app.entity.Vlan;
import netmanage.app.service.VlanService;

@RestController
@RequestMapping("/api/vlans")
public class VlanController {

    private final VlanService vlanService;

    public VlanController(VlanService vlanService) {
        this.vlanService = vlanService;
    }

    @GetMapping
    public List<Vlan> findAll() {
        return vlanService.findAll();
    }

    @GetMapping("/{id}")
    public Vlan findById(@PathVariable Long id) {
        return vlanService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Vlan> create(@Valid @RequestBody Vlan vlan) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vlanService.create(vlan));
    }

    @PutMapping("/{id}")
    public Vlan update(@PathVariable Long id, @Valid @RequestBody Vlan vlan) {
        return vlanService.update(id, vlan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vlanService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
