package com.nhat.scm.ScmServer.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhat.scm.ScmServer.entities.Departure;

@Repository
public interface DepartureRepository extends JpaRepository<Departure, Integer> {

}