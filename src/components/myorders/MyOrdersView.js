// src/components/myorders/MyOrdersView.js
import OrderCard from './OrderCard';

function MyOrdersView({ tableNumber, orders }) {
  return (
    <div>
      <h2>Verdiğiniz Siparişler - Masa {tableNumber}</h2>
      {orders.length === 0 ? (
        <p>Henüz siparişiniz yok.</p>
      ) : (
        orders.map((order, i) => <OrderCard key={i} order={order} />)
      )}
    </div>
  );
}

export default MyOrdersView;
