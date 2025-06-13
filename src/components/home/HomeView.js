// src/components/home/HomeView.js
import React from 'react';
import './HomePage.css'; 

function HomeView({ onStartClick, onLoginClick }) {
  return (
    <div className='div1'>
      <h1 className='baslik'>Vanilla</h1>
      <button className='startButon' onClick={onStartClick}>START</button>
      <button className='loginButon' onClick={onLoginClick}>LOGIN</button>
    </div>
  );
}

export default HomeView;
