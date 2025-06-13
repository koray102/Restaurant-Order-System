package com.restaurant.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.backend.model.Staff;

import java.util.List;
import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByUsernameAndPassword(String username, String password);

    List<Staff> findByLocation(String location);
    Staff findByUsernameAndLocation(String username, String location);
}