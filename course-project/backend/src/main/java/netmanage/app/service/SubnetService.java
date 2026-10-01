package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.Subnet;
import netmanage.app.entity.Vlan;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.SubnetRepository;
import netmanage.app.repository.VlanRepository;

@Service
@Transactional
public class SubnetService {

    private final SubnetRepository subnetRepository;
    private final VlanRepository vlanRepository;

    public SubnetService(SubnetRepository subnetRepository, VlanRepository vlanRepository) {
        this.subnetRepository = subnetRepository;
        this.vlanRepository = vlanRepository;
    }

    @Transactional(readOnly = true)
    public List<Subnet> findAll() {
        return subnetRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Subnet findById(Long id) {
        return subnetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subnet", id));
    }

    public Subnet create(Subnet subnet) {
        subnet.setId(null);
        subnet.setVlan(requireVlan(subnet));
        return subnetRepository.save(subnet);
    }

    public Subnet update(Long id, Subnet incoming) {
        Subnet existing = findById(id);
        existing.setNetworkAddress(incoming.getNetworkAddress());
        existing.setCidr(incoming.getCidr());
        existing.setSubnetMask(incoming.getSubnetMask());
        existing.setDescription(incoming.getDescription());
        existing.setVlan(requireVlan(incoming));
        return subnetRepository.save(existing);
    }

    public void delete(Long id) {
        Subnet existing = findById(id);
        subnetRepository.delete(existing);
    }

    private Vlan requireVlan(Subnet subnet) {
        if (subnet.getVlan() == null || subnet.getVlan().getId() == null) {
            throw new IllegalArgumentException("VLAN is required");
        }
        Long vlanId = subnet.getVlan().getId();
        return vlanRepository.findById(vlanId)
                .orElseThrow(() -> new ResourceNotFoundException("VLAN", vlanId));
    }
}
