package com.restaurant.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.restaurant.backend.model.Food;

import org.springframework.data.repository.query.Param;

public interface FoodRepository extends JpaRepository<Food, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Food f SET f.ratingCount = :count, f.averageRating = :avg WHERE f.id = :id")
    void updateRatingData(@Param("id") Long id, @Param("count") int count, @Param("avg") double avg);

}