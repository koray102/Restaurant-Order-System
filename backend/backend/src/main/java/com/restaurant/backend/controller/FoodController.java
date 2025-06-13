package com.restaurant.backend.controller;

import com.restaurant.backend.dto.RatingRequest;
import com.restaurant.backend.model.Food;
import com.restaurant.backend.repository.FoodRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {

    private final FoodRepository foodRepository;

    public FoodController(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @PostMapping
    public Food addFood(@RequestBody Food food) {
        return foodRepository.save(food);
    }

    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    @PostMapping("/rating")
    public ResponseEntity<String> updateFoodRating(@RequestBody RatingRequest request) {
        Optional<Food> optionalFood = foodRepository.findById(request.getFoodId());
        if (optionalFood.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Food food = optionalFood.get();
        int oldCount = food.getRatingCount();
        double oldAvg = food.getAverageRating();

        // Yeni ortalama
        int newCount = oldCount + 1;
        double newAvg = ((oldAvg * oldCount) + request.getRating()) / newCount;

        foodRepository.updateRatingData(request.getFoodId(), newCount, newAvg);

        return ResponseEntity.ok("Puan güncellendi");
    }
}