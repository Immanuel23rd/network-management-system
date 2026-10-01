package netmanage.app.entity;

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
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "ip_addresses")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class IpAddress {

    public enum Status {
        ALLOCATED, AVAILABLE, RESERVED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "IP address is required")
    @Pattern(regexp = "^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$",
            message = "Must be a valid IPv4 address")
    @Column(nullable = false, unique = true, length = 45)
    private String address;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @NotNull(message = "Subnet is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "subnet_id", nullable = false)
    @JsonIgnoreProperties({"ipAddresses"})
    private Subnet subnet;

    @ManyToOne
    @JoinColumn(name = "interface_id", unique = true)
    @JsonIgnoreProperties({"ipAddresses", "device", "vlan"})
    private NetInterface netInterface;

    public IpAddress() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Subnet getSubnet() {
        return subnet;
    }

    public void setSubnet(Subnet subnet) {
        this.subnet = subnet;
    }

    public NetInterface getNetInterface() {
        return netInterface;
    }

    public void setNetInterface(NetInterface netInterface) {
        this.netInterface = netInterface;
    }
}
