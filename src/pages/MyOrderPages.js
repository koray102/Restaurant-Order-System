// src/pages/MyOrdersPage.js
import { useState, useEffect } from 'react';
import MyOrdersView from '../components/myorders/MyOrdersView';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const location = localStorage.getItem('selectedLocation');
  const tableNumber = localStorage.getItem('tableNumber');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const filtered = savedOrders.filter(
      (order) => order.location === location && order.tableNumber === tableNumber
    );
    setOrders(filtered);
  }, [location, tableNumber]);

  return <MyOrdersView tableNumber={tableNumber} orders={orders} />;
}

export default MyOrdersPage;
