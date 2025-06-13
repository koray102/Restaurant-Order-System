// src/pages/OrderPage.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderView from '../components/order/OrderView';
import { submitOrder } from '../services/orderService';
import '../components/order/OrderView.css';

function OrderPage() {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [note, setNote] = useState('');
  const [cardInfo, setCardInfo] = useState('');
  const [location, setLocation] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const loc = userRole === 'staff'
      ? localStorage.getItem('staffLocation')
      : localStorage.getItem('selectedLocation');

    setLocation(loc);

    const savedCart = JSON.parse(localStorage.getItem(`cart_${loc}`)) || [];
    setCart(savedCart);
  }, []);

  const handlePayment = async () => {
    if (!tableNumber) {
      alert('Please enter the table number.');
      return;
    }
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    if (!cardInfo) {
      alert('Please enter card information.');
      return;
    }

    const orderData = {
      location,
      tableNumber,
      note,
      cardInfo,
      cart
    };

    const result = await submitOrder(orderData);

    if (result.success) {
      localStorage.setItem('lastOrderForRating', JSON.stringify(result.order));
      localStorage.setItem('tableNumber', tableNumber);
      navigate('/rate');
    }
  };

  return (
    <OrderView
      cart={cart}
      tableNumber={tableNumber}
      setTableNumber={setTableNumber}
      note={note}
      setNote={setNote}
      cardInfo={cardInfo}
      setCardInfo={setCardInfo}
      location={location}
      handlePayment={handlePayment}
    />
  );
}

export default OrderPage;
