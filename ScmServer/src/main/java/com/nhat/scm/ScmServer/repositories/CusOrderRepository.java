package com.nhat.scm.ScmServer.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhat.scm.ScmServer.entities.CusOrder;

@Repository
public interface CusOrderRepository extends JpaRepository<CusOrder, Integer> {

}