import axios from 'axios';
import { baseURL } from '../../api/index';

const API_URL = baseURL;

export const login = async userData => {
  try {
    const response = await axios.post(`${API_URL}users/login`, userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async userData => {
  try {
    const response = await axios.post(`${API_URL}users/register`, userData);
    if (response.data) {

      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const logOut = () => {
  localStorage.removeItem('user');
};

