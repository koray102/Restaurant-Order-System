// src/controllers/HomeController.js
import { useNavigate } from 'react-router-dom';

export function useHomeController() {
  const navigate = useNavigate();

  const onStartClick = () => navigate('/start');
  const onLoginClick = () => navigate('/login');

  return { onStartClick, onLoginClick };
}
