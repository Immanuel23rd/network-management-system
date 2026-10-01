package netmanage.app.entity;

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
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "interfaces")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class NetInterface {

    public enum Type {
        ETHERNET, FIBER, WIFI, LOOPBACK, VLAN
    }

    public enum Status {
        UP, DOWN, DISABLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Interface name is required")
    @Size(max = 80)
    @Column(nullable = false, length = 80)
    private String name;

    @NotNull(message = "Interface type is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Type type;

    @Pattern(regexp = "^$|^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
            message = "MAC address must look like 00:1A:2B:3C:4D:5E")
    @Size(max = 17)
    @Column(name = "mac_address", unique = true, length = 17)
    private String macAddress;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @NotNull(message = "Device is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "device_id", nullable = false)
    @JsonIgnoreProperties({"interfaces", "maintenanceRecords"})
    private Device device;

    @ManyToOne
    @JoinColumn(name = "vlan_id")
    @JsonIgnoreProperties({"interfaces", "subnets"})
    private Vlan vlan;

    @OneToMany(mappedBy = "netInterface")
    @JsonIgnoreProperties({"netInterface", "subnet"})
    private List<IpAddress> ipAddresses = new ArrayList<>();

    public NetInterface() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public Vlan getVlan() {
        return vlan;
    }

    public void setVlan(Vlan vlan) {
        this.vlan = vlan;
    }

    public List<IpAddress> getIpAddresses() {
        return ipAddresses;
    }

    public void setIpAddresses(List<IpAddress> ipAddresses) {
        this.ipAddresses = ipAddresses;
    }
}
