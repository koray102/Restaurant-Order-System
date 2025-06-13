import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuView from '../components/menu/MenuView';
import { getAllFoods, addNewFood } from '../services/menuService';

function MenuController() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState(() => {
    const role = localStorage.getItem('userRole');
    const location = role === 'staff'
      ? localStorage.getItem('staffLocation')
      : localStorage.getItem('selectedLocation');
    const saved = localStorage.getItem(`cart_${location}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedLocation, setSelectedLocation] = useState('');
  const [newDish, setNewDish] = useState({ name: '', description: '', price: '', image: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [callStep, setCallStep] = useState(0);
  const [callTable, setCallTable] = useState('');
  const isStaff = localStorage.getItem('userRole') === 'staff';

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const loc = role === "staff"
      ? localStorage.getItem("staffLocation")
      : localStorage.getItem("selectedLocation");
    setSelectedLocation(loc || "");
  }, []);

  useEffect(() => {
    getAllFoods()
      .then((res) => setDishes(res.data))
      .catch((err) => console.error('Yemekler alınamadı:', err));
  }, []);

  const handleAddDish = () => {
    const updated = [...dishes, { ...newDish, id: Date.now() }];
    setDishes(updated);
    localStorage.setItem(`menuDishes_${selectedLocation}`, JSON.stringify(updated));
    setIsAddModalOpen(false);
    addNewFood(newDish).catch(err => console.error("Ekleme hatası:", err));
    setNewDish({ name: '', description: '', price: '', image: '' });
  };

  const addToCart = (dish) => {
    const updatedCart = [...cart, dish];
    setCart(updatedCart);
    localStorage.setItem(`cart_${selectedLocation}`, JSON.stringify(updatedCart));
  };

  const goToOrder = () => {
    if (cart.length === 0) {
      alert('Sepetiniz boş.');
      return;
    }
    navigate('/order');
  };

  const goToStaffOrders = () => navigate('/stafforder');

  const handleStartCall = () => setCallStep(1);

  const handleTableSubmit = () => {
    if (!callTable) {
      alert("Masa numarası girin.");
      return;
    }
    setCallStep(2);
  };

  const handleSendCall = (reason) => {
    const calls = JSON.parse(localStorage.getItem('waiterCalls')) || [];
    calls.push({ tableNumber: callTable, reason, timestamp: Date.now() });
    localStorage.setItem('waiterCalls', JSON.stringify(calls));
    alert(`Garson çağrıldı - ${reason}`);
    setCallStep(0);
    setCallTable('');
  };

  return (
    <MenuView
      isStaff={isStaff}
      selectedLocation={selectedLocation}
      dishes={dishes}
      cart={cart}
      newDish={newDish}
      setNewDish={setNewDish}
      handleAddDish={handleAddDish}
      isAddModalOpen={isAddModalOpen}
      setIsAddModalOpen={setIsAddModalOpen}
      handleStartCall={handleStartCall}
      callStep={callStep}
      callTable={callTable}
      setCallTable={setCallTable}
      handleTableSubmit={handleTableSubmit}
      handleSendCall={handleSendCall}
      addToCart={addToCart}
      goToOrder={goToOrder}
      isCartModalOpen={isCartModalOpen}
      setIsCartModalOpen={setIsCartModalOpen}
      goToStaffOrders={goToStaffOrders}
    />
  );
}

export default MenuController;
