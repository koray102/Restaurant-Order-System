import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/staff';

export const getLocations = () => axios.get(`${BASE_URL}/locations`);
export const addStaff = (data) => axios.post(`${BASE_URL}/add`, data);
export const deleteStaff = (username, location) =>
  axios.delete(`${BASE_URL}/delete`, {
    params: { username, location }
  });
export const getStaffByLocation = (location) =>
  axios.get(`${BASE_URL}/by-location/${location}`);
