// src/pages/HomePage.js
import React from 'react';
import HomeView from '../components/home/HomeView.js';
import { useHomeController } from '../controllers/HomeController';

function HomePage() {
  const { onStartClick, onLoginClick } = useHomeController();

  return <HomeView onStartClick={onStartClick} onLoginClick={onLoginClick} />;
}

export default HomePage;
