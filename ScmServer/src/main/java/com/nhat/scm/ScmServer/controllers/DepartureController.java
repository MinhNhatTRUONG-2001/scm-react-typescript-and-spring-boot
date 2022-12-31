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

import com.nhat.scm.ScmServer.entities.Departure;
import com.nhat.scm.ScmServer.repositories.DepartureRepository;

@RestController
@RequestMapping("/api/departure")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartureController {
    @Autowired
    DepartureRepository repository;
    
    @GetMapping
    public List<Departure> readAll() {
        return repository.findAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Departure> read(@PathVariable Integer id) {
        return repository.findById(id);
    }
    
    @PostMapping
    public Departure save(@RequestBody Departure departure) {
        return repository.save(departure);
    }
    
    @PutMapping
    public Departure update(@RequestBody Departure departure){
        return repository.save(departure);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
