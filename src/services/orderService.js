// src/services/orderService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/orders';

/**
 * Yeni siparişi sunucuya gönderir
 * @param {Object} order - Sipariş nesnesi
 * @returns {Promise<Object>}
 */
export async function submitOrder(orderData) {
  try {
    const response = await axios.post('http://localhost:8080/api/orders', {
      ...orderData,
      timestamp: Date.now()
    });

    const newOrder = {
      ...orderData,
      timestamp: Date.now(),
      status: 'hazırlanıyor'
    };

    // Siparişi localStorage’a kaydet
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    savedOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(savedOrders));

    // Sepeti temizle
    localStorage.removeItem(`cart_${orderData.location}`);

    return { success: true, order: newOrder };
  } catch (error) {
    console.error('Sipariş gönderilemedi:', error);
    alert('Sipariş gönderilemedi.');
    return { success: false };
  }
}

export async function fetchOrdersByLocation(location) {
  try {
    const response = await axios.get('http://localhost:8080/api/orders');
    return response.data.filter(order => order.location === location);
  } catch (error) {
    console.error('Siparişler alınamadı:', error);
    return [];
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    await axios.put(`http://localhost:8080/api/orders/${orderId}/status`, newStatus, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return true;
  } catch (err) {
    console.error("Durum güncellenemedi:", err);
    return false;
  }
}

export function getLocalWaiterCalls() {
  return JSON.parse(localStorage.getItem('waiterCalls')) || [];
}


