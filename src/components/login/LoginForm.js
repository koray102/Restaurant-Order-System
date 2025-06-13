// src/components/login/LoginForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/LoginPage.css';

const LOCATIONS = [
  { value: '', label: '-- Select Location --' },
  { value: 'Bornova', label: 'Bornova' },
  { value: 'Bostanli', label: 'Bostanli' },
  { value: 'admin', label: 'admin' }
];

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/staff/login', {
        username,
        password
      });

      const staff = response.data;

      if (staff.location !== location) {
        setError("Selected location does not match staff's location.");
        return;
      }

      localStorage.setItem("staffRole", staff.role);
      localStorage.setItem('staffUser', staff.username);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      localStorage.setItem('userRole', 'staff');
      localStorage.setItem('staffLocation', staff.location);

      if (staff.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/menu');
      }

    } catch (err) {
      setError('Invalid username or password!');
      console.error(err);
    }
  };

  return (
    <div className="login-form">
      <h2 className="login-title">Staff Login</h2>
      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError('');
        }}
        className={`login-input ${error ? 'error' : ''}`}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError('');
        }}
        className={`login-input ${error ? 'error' : ''}`}
      />

      <select
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
          setError('');
        }}
        className={`login-select ${error ? 'error' : ''}`}
      >
        {LOCATIONS.map((loc) => (
          <option key={loc.value} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>

      <button onClick={handleLogin} className="login-button">
        Login
      </button>
    </div>
  );
}

export default LoginForm;
