// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StartPage from './pages/StartPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import StaffOrdersPage from './pages/StaffOrdersPage';
import MyOrderPages from './pages/MyOrderPages';
import RatingPage from './pages/RatingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/rate" element={<RatingPage />} />
        <Route path="/stafforder" element={<StaffOrdersPage />} />
        <Route path="/my-orders" element={<MyOrderPages />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
