// src/components/menu/AddDishModal.js
import React from 'react';

function AddDishModal({ newDish, setNewDish, onAdd, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add New Dish</h3>
        <input
          type="text"
          placeholder="Dish Name"
          value={newDish.name}
          onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newDish.description}
          onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price (₺)"
          value={newDish.price}
          onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newDish.image}
          onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onAdd}>Add Dish</button>
        </div>
      </div>
    </div>
  );
}

export default AddDishModal;
