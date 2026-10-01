package netmanage.app.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "subnets")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Subnet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Network address is required")
    @Pattern(regexp = "^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$",
            message = "Network address must be a valid IPv4 address")
    @Column(name = "network_address", nullable = false, length = 45)
    private String networkAddress;

    @NotNull(message = "CIDR prefix is required")
    @Min(value = 0, message = "CIDR must be between 0 and 32")
    @Max(value = 32, message = "CIDR must be between 0 and 32")
    @Column(nullable = false)
    private Integer cidr;

    @NotBlank(message = "Subnet mask is required")
    @Size(max = 45)
    @Column(name = "subnet_mask", nullable = false, length = 45)
    private String subnetMask;

    @Size(max = 500)
    @Column(length = 500)
    private String description;

    @NotNull(message = "VLAN is required")
    @ManyToOne(optional = false)
    @JoinColumn(name = "vlan_id", nullable = false)
    @JsonIgnoreProperties({"subnets", "interfaces"})
    private Vlan vlan;

    @OneToMany(mappedBy = "subnet")
    @JsonIgnoreProperties({"subnet", "netInterface"})
    private List<IpAddress> ipAddresses = new ArrayList<>();

    public Subnet() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNetworkAddress() {
        return networkAddress;
    }

    public void setNetworkAddress(String networkAddress) {
        this.networkAddress = networkAddress;
    }

    public Integer getCidr() {
        return cidr;
    }

    public void setCidr(Integer cidr) {
        this.cidr = cidr;
    }

    public String getSubnetMask() {
        return subnetMask;
    }

    public void setSubnetMask(String subnetMask) {
        this.subnetMask = subnetMask;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
