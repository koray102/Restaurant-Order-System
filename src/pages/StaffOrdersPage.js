// src/pages/StaffOrdersPage.js
import { useEffect, useState } from 'react';
import {
  fetchOrdersByLocation,
  updateOrderStatus,
  getLocalWaiterCalls
} from '../services/orderService';
import StaffOrderView from '../components/staff/StaffOrderView';

function StaffOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [waiterCalls, setWaiterCalls] = useState([]);
  const [location, setLocation] = useState('');
  const [staffRole, setStaffRole] = useState('');

  useEffect(() => {
    const loc = localStorage.getItem('staffLocation') || '';
    const role = localStorage.getItem('staffRole') || '';
    setLocation(loc);
    setStaffRole(role);

    fetchOrdersByLocation(loc).then(setOrders);
  }, []);

  const handleShowCalls = () => {
    const calls = getLocalWaiterCalls();
    setWaiterCalls(calls);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  return (
    <StaffOrderView
      location={location}
      staffRole={staffRole}
      waiterCalls={waiterCalls}
      onShowCalls={handleShowCalls}
      orders={orders}
      onStatusUpdate={handleStatusUpdate}
    />
  );
}

export default StaffOrdersPage;
