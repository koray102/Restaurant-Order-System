// src/components/menu/MenuView.js
import React from 'react';
import DishList from './DishList';
import AddDishModal from './AddDishModal';
import CartModal from './CartModal';
import WaiterCall from './WaiterCall';

const MenuView = ({
  isStaff,
  selectedLocation,
  dishes,
  cart,
  isCartModalOpen,
  setIsCartModalOpen,
  isAddModalOpen,
  setIsAddModalOpen,
  newDish,
  setNewDish,
  handleAddDish,
  addToCart,
  goToOrder,
  goToStaffOrders,
  callStep,
  callTable,
  setCallStep,
  setCallTable,
  handleStartCall,
  handleTableSubmit,
  handleSendCall
}) => {
  return (
    <div className="menu-container">
      <h2 className="lokasyonadi">Vanilla {selectedLocation}</h2>

      {/* Staff butonları */}
      {isStaff && (
        <div>
          <button className="add-dish-btn" onClick={() => setIsAddModalOpen(true)}>
            Add Dish
          </button>
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
            View Notifications
          </button>
        </div>
      )}

      {/* Garson çağırma */}
      {!isStaff && (
        <WaiterCall
          callStep={callStep}
          callTable={callTable}
          setCallStep={setCallStep}
          setCallTable={setCallTable}
          handleStartCall={handleStartCall}
          handleTableSubmit={handleTableSubmit}
          handleSendCall={handleSendCall}
        />
      )}

      {/* Yeni yemek modalı */}
      {isAddModalOpen && (
        <AddDishModal
          newDish={newDish}
          setNewDish={setNewDish}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddDish}
        />
      )}

      {/* Yemek listesi */}
      <DishList dishes={dishes} isStaff={isStaff} addToCart={addToCart} />

      {/* Sepet ve sipariş */}
      {!isStaff && (
        <>
          <div className="bottomBar">
            <button
              className="cart-button"
              onClick={() => {
                if (cart.length > 0) setIsCartModalOpen(true);
              }}
            >
              Cart ({cart.length})
            </button>
          </div>

          {isCartModalOpen && (
            <CartModal cart={cart} onClose={() => setIsCartModalOpen(false)} goToOrder={goToOrder} />
          )}
        </>
      )}
    </div>
  );
};

export default MenuView;
