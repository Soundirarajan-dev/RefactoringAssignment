import { apiService } from './api';

export const userService = {
  async getUsers(page = 1, limit = 20) {
    const response = await apiService.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getUserById(id) {
    const response = await apiService.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData) {
    const response = await apiService.post('/users', userData);
    return response.data;
  },

  async updateUser(id, userData) {
    const response = await apiService.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    const response = await apiService.delete(`/users/${id}`);
    return response.data;
  },

  async searchUsers(name, page = 1, limit = 20) {
    const response = await apiService.get(`/users/search?name=${encodeURIComponent(name)}&page=${page}&limit=${limit}`);
    return response.data;
  }
};