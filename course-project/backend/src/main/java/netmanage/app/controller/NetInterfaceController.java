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
import netmanage.app.entity.NetInterface;
import netmanage.app.service.NetInterfaceService;

@RestController
@RequestMapping("/api/interfaces")
public class NetInterfaceController {

    private final NetInterfaceService netInterfaceService;

    public NetInterfaceController(NetInterfaceService netInterfaceService) {
        this.netInterfaceService = netInterfaceService;
    }

    @GetMapping
    public List<NetInterface> findAll() {
        return netInterfaceService.findAll();
    }

    @GetMapping("/{id}")
    public NetInterface findById(@PathVariable Long id) {
        return netInterfaceService.findById(id);
    }

    @PostMapping
    public ResponseEntity<NetInterface> create(@Valid @RequestBody NetInterface netInterface) {
        return ResponseEntity.status(HttpStatus.CREATED).body(netInterfaceService.create(netInterface));
    }

    @PutMapping("/{id}")
    public NetInterface update(@PathVariable Long id, @Valid @RequestBody NetInterface netInterface) {
        return netInterfaceService.update(id, netInterface);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        netInterfaceService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
