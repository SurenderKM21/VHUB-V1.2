package com.example.demo.service;

import com.example.demo.model.Service;
import com.example.demo.repo.ServiceRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class VehicleService {

    private final ServiceRepository serviceRepository;

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service service) {
        Service existing = getServiceById(id);
        existing.setTitle(service.getTitle());
        existing.setDescription(service.getDescription());
        existing.setIcon(service.getIcon());
        existing.setCost(service.getCost());
        return serviceRepository.save(existing);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}
