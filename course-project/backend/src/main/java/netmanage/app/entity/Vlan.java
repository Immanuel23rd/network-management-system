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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "vlans")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Vlan {

    public enum Status {
        ACTIVE, INACTIVE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "VLAN number is required")
    @Min(value = 1, message = "VLAN number must be at least 1")
    @Max(value = 4094, message = "VLAN number must be at most 4094")
    @Column(name = "vlan_number", nullable = false, unique = true)
    private Integer vlanNumber;

    @NotBlank(message = "Name is required")
    @Size(max = 80)
    @Column(nullable = false, length = 80)
    private String name;

    @Size(max = 500)
    @Column(length = 500)
    private String description;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @OneToMany(mappedBy = "vlan")
    @JsonIgnoreProperties({"vlan", "device", "ipAddresses"})
    private List<NetInterface> interfaces = new ArrayList<>();

    @OneToMany(mappedBy = "vlan")
    @JsonIgnoreProperties({"vlan", "ipAddresses"})
    private List<Subnet> subnets = new ArrayList<>();

    public Vlan() {
    }

    public Vlan(Integer vlanNumber, String name, String description, Status status) {
        this.vlanNumber = vlanNumber;
        this.name = name;
        this.description = description;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVlanNumber() {
        return vlanNumber;
    }

    public void setVlanNumber(Integer vlanNumber) {
        this.vlanNumber = vlanNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<NetInterface> getInterfaces() {
        return interfaces;
    }

    public void setInterfaces(List<NetInterface> interfaces) {
        this.interfaces = interfaces;
    }

    public List<Subnet> getSubnets() {
        return subnets;
    }

    public void setSubnets(List<Subnet> subnets) {
        this.subnets = subnets;
    }
}
