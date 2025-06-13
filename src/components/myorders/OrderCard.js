// src/components/myorders/OrderCard.js
function OrderCard({ order }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <p><b>State:</b> {order.status}</p>
      <p><b>Products:</b></p>
      <ul>
        {order.cart.map((item, idx) => (
          <li key={idx}>{item.name} - {item.price}₺</li>
        ))}
      </ul>
      <p><small>Sipariş zamanı: {new Date(order.timestamp).toLocaleString()}</small></p>
    </div>
  );
}

export default OrderCard;
