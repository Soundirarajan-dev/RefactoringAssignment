import { apiService } from './api';

export const authService = {
  async login(email, password) {
    const response = await apiService.post('/auth/login', { email, password });
    return response.data;
  },

  async register(name, email, password) {
    const response = await apiService.post('/users', { name, email, password });
    return response.data;
  },

  async getCurrentUser() {
    const response = await apiService.get('/auth/me');
    return response.data;
  },

  async refreshToken() {
    const response = await apiService.post('/auth/refresh');
    return response.data;
  }
};