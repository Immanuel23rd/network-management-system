package netmanage.app.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "devices")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Device {

    public enum Status {
        ACTIVE, INACTIVE, MAINTENANCE, DECOMMISSIONED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Hostname is required")
    @Size(max = 100)
    @Column(nullable = false, unique = true, length = 100)
    private String hostname;

    @Size(max = 100)
    @Column(length = 100)
    private String manufacturer;

    @Size(max = 100)
    @Column(length = 100)
    private String model;

    @NotBlank(message = "Serial number is required")
    @Size(max = 80)
    @Column(name = "serial_number", nullable = false, unique = true, length = 80)
    private String serialNumber;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @NotNull(message = "Device type is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "device_type_id", nullable = false)
    @JsonIgnoreProperties({"devices"})
    private DeviceType deviceType;

    @NotNull(message = "Location is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "location_id", nullable = false)
    @JsonIgnoreProperties({"devices"})
    private Location location;

    @OneToMany(mappedBy = "device")
    @JsonIgnoreProperties({"device", "ipAddresses"})
    private List<NetInterface> interfaces = new ArrayList<>();

    @OneToMany(mappedBy = "device")
    @JsonIgnoreProperties({"device", "user"})
    private List<MaintenanceRecord> maintenanceRecords = new ArrayList<>();

    public Device() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public DeviceType getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(DeviceType deviceType) {
        this.deviceType = deviceType;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<NetInterface> getInterfaces() {
        return interfaces;
    }

    public void setInterfaces(List<NetInterface> interfaces) {
        this.interfaces = interfaces;
    }

    public List<MaintenanceRecord> getMaintenanceRecords() {
        return maintenanceRecords;
    }

    public void setMaintenanceRecords(List<MaintenanceRecord> maintenanceRecords) {
        this.maintenanceRecords = maintenanceRecords;
    }
}
