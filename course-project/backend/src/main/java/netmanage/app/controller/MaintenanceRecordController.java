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
import netmanage.app.entity.MaintenanceRecord;
import netmanage.app.service.MaintenanceRecordService;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceRecordController {

    private final MaintenanceRecordService maintenanceRecordService;

    public MaintenanceRecordController(MaintenanceRecordService maintenanceRecordService) {
        this.maintenanceRecordService = maintenanceRecordService;
    }

    @GetMapping
    public List<MaintenanceRecord> findAll() {
        return maintenanceRecordService.findAll();
    }

    @GetMapping("/{id}")
    public MaintenanceRecord findById(@PathVariable Long id) {
        return maintenanceRecordService.findById(id);
    }

    @PostMapping
    public ResponseEntity<MaintenanceRecord> create(@Valid @RequestBody MaintenanceRecord record) {
        return ResponseEntity.status(HttpStatus.CREATED).body(maintenanceRecordService.create(record));
    }

    @PutMapping("/{id}")
    public MaintenanceRecord update(@PathVariable Long id, @Valid @RequestBody MaintenanceRecord record) {
        return maintenanceRecordService.update(id, record);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        maintenanceRecordService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
