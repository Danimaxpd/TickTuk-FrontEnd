import axios from 'axios';
import { CreateUserInput, User } from '@/types/user';

const API_BASE_URL = 'http://localhost';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAuthToken = async (apiKey: string) => {
  const response = await api.post('/auth/token', { apiKey });
  return response.data.token;
};

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  createUser: async (userData: CreateUserInput): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
