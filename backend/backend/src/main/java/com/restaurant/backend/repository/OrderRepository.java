package com.restaurant.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {}