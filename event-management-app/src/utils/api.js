// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const fetchEventsByLocation = async (locationFilter) => {
  // Assume locationFilter is an object with { lat, lng } for now.
  try {
    const { lat, lng } = locationFilter;
    const response = await axios.get(`${API_BASE_URL}/events?lat=${lat}&lng=${lng}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events by location:', error);
    return [];
  }
};

// Other API functions (purchaseTicket, cancelTicket) can be added similarly.
