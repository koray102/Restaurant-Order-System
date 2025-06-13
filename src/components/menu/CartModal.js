// src/components/menu/CartModal.js
import React from 'react';

// src/components/menu/CartModal.js
function CartModal({ cart, onClose, onPlaceOrder }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Your Cart ({cart.length} items)</h3>

        <ul style={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: '20px' }}>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}₺
            </li>
          ))}
        </ul>

        <p style={{ marginTop: '10px' }}>
          <strong>Total:</strong> {cart.reduce((sum, item) => sum + Number(item.price), 0)}₺
        </p>

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
          <button onClick={onPlaceOrder}>Place Order</button> {/* ✅ Buraya dikkat */}
        </div>
      </div>
    </div>
  );
}

export default CartModal;

