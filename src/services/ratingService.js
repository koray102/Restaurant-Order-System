// src/services/ratingService.js
import axios from 'axios';

export const submitRatings = async (cart) => {
  for (let item of cart) {
    if (item.rating) {
      await axios.post("http://localhost:8080/api/foods/rating", {
        foodId: item.id,
        rating: item.rating
      });
    }
  }
};
