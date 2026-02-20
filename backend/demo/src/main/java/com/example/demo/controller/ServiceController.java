package com.example.demo.controller;

import com.example.demo.model.Service;
import com.example.demo.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final VehicleService vehicleService;

    @GetMapping
    public List<Service> getAllServices() {
        return vehicleService.getAllServices();
    }

    @GetMapping("/{id}")
    public Service getServiceById(@PathVariable Long id) {
        return vehicleService.getServiceById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_Admin')")
    public Service createService(@RequestBody Service service) {
        return vehicleService.createService(service);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_Admin')")
    public Service updateService(@PathVariable Long id, @RequestBody Service service) {
        return vehicleService.updateService(id, service);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_Admin')")
    public void deleteService(@PathVariable Long id) {
        vehicleService.deleteService(id);
    }
}
