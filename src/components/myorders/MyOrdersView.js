// src/components/myorders/MyOrdersView.js
import OrderCard from './OrderCard';

function MyOrdersView({ tableNumber, orders }) {
  return (
    <div>
      <h2>Your Order - Table {tableNumber}</h2>
      {orders.length === 0 ? (
        <p>You don't have any orders yet.</p>
      ) : (
        orders.map((order, i) => <OrderCard key={i} order={order} />)
      )}
    </div>
  );
}

export default MyOrdersView;
