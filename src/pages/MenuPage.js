// src/pages/MenuPage.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DishList from '../components/menu/DishList';
import AddDishModal from '../components/menu/AddDishModal';
import CartModal from '../components/menu/CartModal';
import WaiterCall from '../components/menu/WaiterCall';
import './MenuPage.css';

function MenuPage() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [callStep, setCallStep] = useState(0);
  const [callTable, setCallTable] = useState('');
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const [cart, setCart] = useState(() => {
    const userRole = localStorage.getItem('userRole');
    const location = userRole === 'staff'
      ? localStorage.getItem('staffLocation')
      : localStorage.getItem('selectedLocation');
    const savedCart = localStorage.getItem(`cart_${location}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [selectedLocation, setSelectedLocation] = useState('');
  const isStaff = localStorage.getItem('userRole') === 'staff';
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const loc = userRole === "staff"
      ? localStorage.getItem("staffLocation")
      : localStorage.getItem("selectedLocation");
    setSelectedLocation(loc || "");
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/foods')
      .then((response) => {
        setDishes(response.data);
      })
      .catch((error) => {
        console.error('Yemekler alınamadı:', error);
      });
  }, []);

  const addToCart = (dish) => {
    const updatedCart = [...cart, dish];
    setCart(updatedCart);
    localStorage.setItem(`cart_${selectedLocation}`, JSON.stringify(updatedCart));
  };

  const handleAddDish = () => {
    const updatedDishes = [...dishes, { ...newDish, id: Date.now() }];
    setDishes(updatedDishes);
    localStorage.setItem(`menuDishes_${selectedLocation}`, JSON.stringify(updatedDishes));
    setIsAddModalOpen(false);
    setNewDish({ name: '', description: '', price: '', image: '' });

    axios.post('http://localhost:8080/api/foods', updatedDishes[updatedDishes.length - 1])
      .then(response => {
        console.log("Yemek eklendi:", response.data);
      })
      .catch(error => {
        console.error("Hata:", error);
      });
  };

  const goToOrder = () => {
    if (cart.length === 0) {
      alert('Sepetiniz boş. Lütfen önce ürün ekleyin.');
      return;
    }
    navigate('/order');
  };

  const goToStaffOrders = () => {
    navigate('/stafforder');
  };

  return (
    <div className="menu-container">
      <h2 className='lokasyonadi'>Vanilla {selectedLocation}</h2>

      {isStaff ? (
        <>
          <button className='add-dish-btn' onClick={() => setIsAddModalOpen(true)}>Yemek Ekle</button>
          <button
            onClick={goToStaffOrders}
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Bildirimleri Görüntüle
          </button>
        </>
      ) : (
        <WaiterCall
          callStep={callStep}
          setCallStep={setCallStep}
          callTable={callTable}
          setCallTable={setCallTable}
        />
      )}

      {isAddModalOpen && (
        <AddDishModal
          newDish={newDish}
          setNewDish={setNewDish}
          onClose={() => setIsAddModalOpen(false)}
          addDish={handleAddDish}
        />
      )}

      <DishList dishes={dishes} isStaff={isStaff} addToCart={addToCart} />

      {!isStaff && (
        <>
          <div className='bottomBar'>
            <button
              className="cart-button"
              onClick={() => cart.length > 0 && setIsCartModalOpen(true)}
            >
              Cart ({cart.length})
            </button>
          </div>

          {isCartModalOpen && (
            <CartModal
              cart={cart}
              onClose={() => setIsCartModalOpen(false)}
              onPlaceOrder={goToOrder}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MenuPage;
