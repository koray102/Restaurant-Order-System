// src/components/menu/DishList.js
import React from 'react';

function DishList({ dishes, isStaff, addToCart }) {
  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <div key={dish.id} className="dish-card">
          {dish.image && (
            <img src={dish.image} alt={dish.name} className="dish-image" />
          )}
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
          <p className="price">{dish.price}₺</p>

          {dish.averageRating !== undefined && (
            <p style={{ fontWeight: 'bold', color: '#f39c12' }}>
              Ortalama Puan: {dish.averageRating.toFixed(1)} ⭐
            </p>
          )}

          {!isStaff && (
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(dish)}
            >
              Add to Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default DishList;
