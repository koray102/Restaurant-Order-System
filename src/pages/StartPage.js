// src/pages/StartPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

// Sabitler ayrı bir dosyada olmalı ama örnek için buraya ekliyorum
const LOCATIONS = [
  { value: '', label: '-- Choose your location --' },
  { value: 'Bornova', label: 'Bornova' },
  { value: 'Bostanli', label: 'Bostanli' }
];

function StartPage() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setLocation(e.target.value);
  };

  const handleGoToMenu = () => {
    if (!location) {
      alert('Please select a location first.');
      return;
    }

    // Kullanıcı rolünü "customer" olarak kaydet
    localStorage.setItem('userRole', 'customer');
    localStorage.setItem('selectedLocation', location); // Lokasyonu da kaydediyoruz

    navigate('/menu', { state: { location } });
  };

  return (
    <div className="div2">
      <h2 className="baslik2">Select Your Location</h2>

      <label htmlFor="locationSelect">Select Location:</label>
      <select 
        id="locationSelect" 
        value={location} 
        onChange={handleSelectChange}
        className="location-select"
      >
        {LOCATIONS.map((loc) => (
          <option key={loc.value} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>

      <button 
        className="menuButton" 
        onClick={handleGoToMenu}
        disabled={!location} // Lokasyon seçilmediyse buton pasif
      >
        Go to Menu
      </button>
    </div>
  );
}

export default StartPage;