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

import com.nhat.scm.ScmServer.entities.CusOrder;
import com.nhat.scm.ScmServer.repositories.CusOrderRepository;

@RestController
@RequestMapping("/api/cus_order")
@CrossOrigin(origins = "http://localhost:3000")
public class CusOrderController {
    @Autowired
    CusOrderRepository repository;
    
    @GetMapping
    public List<CusOrder> readAll() {
        return repository.findAll();
    }
    
    @GetMapping("/{id}")
    public Optional<CusOrder> read(@PathVariable Integer id) {
        return repository.findById(id);
    }
    
    @PostMapping
    public CusOrder save(@RequestBody CusOrder cusOrder) {
        return repository.save(cusOrder);
    }
    
    @PutMapping
    public CusOrder update(@RequestBody CusOrder cusOrder){
        return repository.save(cusOrder);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
