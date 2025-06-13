// src/pages/RatingPage.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingView from '../components/rating/RatingView';
import { submitRatings } from '../services/ratingService';
import '../components/rating/RatingView.css';

function RatingPage() {
  const [order, setOrder] = useState(null);
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrderForRating'));
    if (!lastOrder || !Array.isArray(lastOrder.cart)) {
      navigate('/');
    } else {
      setOrder(lastOrder);
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!order) return;

    const updatedCart = order.cart.map((item, index) => ({
      ...item,
      rating: ratings[index] || null
    }));

    try {
      await submitRatings(updatedCart);
    } catch (error) {
      console.error("Puan gönderme hatası:", error);
      alert("Bir puan gönderilirken hata oluştu!");
      return;
    }

    const updatedOrder = { ...order, cart: updatedCart };
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = allOrders.map((o) =>
      o.timestamp === order.timestamp ? updatedOrder : o
    );

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    localStorage.removeItem('lastOrderForRating');

    alert('Puanlarınız kaydedildi. Teşekkür ederiz!');
    navigate('/');
  };

  return (
    <RatingView
      order={order}
      ratings={ratings}
      setRatings={setRatings}
      handleSubmit={handleSubmit}
    />
  );
}

export default RatingPage;
