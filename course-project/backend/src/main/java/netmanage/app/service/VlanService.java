package netmanage.app.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import netmanage.app.entity.Vlan;
import netmanage.app.exception.ResourceNotFoundException;
import netmanage.app.repository.VlanRepository;

@Service
@Transactional
public class VlanService {

    private final VlanRepository vlanRepository;

    public VlanService(VlanRepository vlanRepository) {
        this.vlanRepository = vlanRepository;
    }

    @Transactional(readOnly = true)
    public List<Vlan> findAll() {
        return vlanRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Vlan findById(Long id) {
        return vlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("VLAN", id));
    }

    public Vlan create(Vlan vlan) {
        vlan.setId(null);
        return vlanRepository.save(vlan);
    }

    public Vlan update(Long id, Vlan incoming) {
        Vlan existing = findById(id);
        existing.setVlanNumber(incoming.getVlanNumber());
        existing.setName(incoming.getName());
        existing.setDescription(incoming.getDescription());
        existing.setStatus(incoming.getStatus());
        return vlanRepository.save(existing);
    }

    public void delete(Long id) {
        Vlan existing = findById(id);
        vlanRepository.delete(existing);
    }
}
