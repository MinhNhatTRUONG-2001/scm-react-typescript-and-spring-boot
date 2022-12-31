package com.nhat.scm.ScmServer.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhat.scm.ScmServer.entities.Location;
import com.nhat.scm.ScmServer.repositories.LocationRepository;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "http://localhost:3000")
public class LocationController {
    @Autowired
    LocationRepository repository;
    
    @GetMapping
    public List<Location> readAll() {
        return repository.findAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Location> read(@PathVariable Integer id) {
        return repository.findById(id);
    }
    
    @PostMapping
    public Location save(@RequestBody Location location){
        return repository.save(location);
    }
    
    @PutMapping
    public Location update(@RequestBody Location location){
        return repository.save(location);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
