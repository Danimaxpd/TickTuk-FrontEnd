import axios, { AxiosInstance } from 'axios';
import { CreateUserInput, User } from '@/types/user';
import { env } from '@/config/env';

const api: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAuthToken = async () => {
  try {
    const response = await axios.post<{ token: string }>('/api/auth');
    return response.data.token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
};

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  createUser: async (userData: CreateUserInput): Promise<User> => {
    try {
      const response = await api.post<User>('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};
