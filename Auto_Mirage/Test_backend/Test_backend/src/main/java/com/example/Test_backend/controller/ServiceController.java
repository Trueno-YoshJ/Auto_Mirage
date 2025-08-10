package com.example.Test_backend.controller;

import com.example.Test_backend.model.Service;
import com.example.Test_backend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping("/service")
    public Service newService(@RequestBody Service newService) {
        return serviceRepository.save(newService);
    }

    @GetMapping("/services")
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
    @DeleteMapping("/service/{id}")
    public String deleteService(@PathVariable Long id){
        if(!serviceRepository.existsById(id)) {
            throw new RuntimeException("Service with ID"+ id + "not found");
        }
        serviceRepository.deleteById(id);
        return "Service with ID" + id + "deletes successfully";

    }
}