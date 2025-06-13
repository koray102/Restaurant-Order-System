package com.restaurant.backend.dto;

public class RatingRequest {
    private Long foodId;
    private int rating;

    public RatingRequest() {
        // Boş constructor (Spring tarafından otomatik kullanılır)
    }

    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}