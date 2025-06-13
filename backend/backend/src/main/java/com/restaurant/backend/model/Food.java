package com.restaurant.backend.model;

import jakarta.persistence.*;

@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;

    @Column(name = "rating_count")
    private int ratingCount;

    @Column(name = "average_rating")
    private double averageRating;

    // 🌟 Yeni alan
    private String image;

    public Food() {}

    // --- Getter & Setter'lara image ekle ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }


    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public int getRatingCount() {return ratingCount;}
    public void setRatingCount(int ratingCount) { this.ratingCount = ratingCount; }

    public double getAverageRating() {return averageRating;}
    public void setAverageRating(double averageRating) { this.averageRating = averageRating; }
}