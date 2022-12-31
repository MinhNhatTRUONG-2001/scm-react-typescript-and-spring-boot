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

import com.nhat.scm.ScmServer.entities.Depo;
import com.nhat.scm.ScmServer.repositories.DepoRepository;

@RestController
@RequestMapping("/api/depo")
@CrossOrigin(origins = "http://localhost:3000")
public class DepoController {
    @Autowired
    DepoRepository repository;
    
    @GetMapping
    public List<Depo> readAll() {
        return repository.findAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Depo> read(@PathVariable Integer id) {
        return repository.findById(id);
    }
    
    @PostMapping
    public Depo save(@RequestBody Depo depo) {
        return repository.save(depo);
    }
    
    @PutMapping
    public Depo update(@RequestBody Depo depo){
        return repository.save(depo);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
