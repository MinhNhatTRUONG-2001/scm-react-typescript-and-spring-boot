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

import com.nhat.scm.ScmServer.entities.Truck;
import com.nhat.scm.ScmServer.repositories.TruckRepository;

@RestController
@RequestMapping("/api/truck")
@CrossOrigin(origins = "http://localhost:3000")
public class TruckController {
	@Autowired
	TruckRepository repository;
	
	@GetMapping
	public List<Truck> readAll() {
		return repository.findAll();
	}
	
	@GetMapping("/{id}")
    public Optional<Truck> read(@PathVariable Integer id) {
        return repository.findById(id);
    }
	
	@PostMapping
    public Truck save(@RequestBody Truck truck) {
        return repository.save(truck);
    }
	
	@PutMapping
    public Truck update(@RequestBody Truck truck){
        return repository.save(truck);
    }
	
	@DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
