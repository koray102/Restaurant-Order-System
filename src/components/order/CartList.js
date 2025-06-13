// src/components/order/CartList.js
import React from 'react';

function CartList({ cart }) {
  if (cart.length === 0) {
    return <p>Sepetiniz boş.</p>;
  }

  return (
    <ul className='itemler'>
      {cart.map((item, index) => (
        <li key={index}>
          {item.name} - {item.price}₺
        </li>
      ))}
    </ul>
  );
}

export default CartList;
