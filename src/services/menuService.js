import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const getAllFoods = () => axios.get(`${API_BASE}/foods`);

export const addNewFood = (food) => axios.post(`${API_BASE}/foods`, food);
