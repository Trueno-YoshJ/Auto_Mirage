package com.example.Test_backend.repository;

import com.example.Test_backend.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service,Long>
{


}
