import axios, { AxiosInstance } from 'axios';
import { CreateUserInput, User } from '@/types/user';
import { env } from '@/config/env';

const api: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
});

export const getAuthToken = async (apiKey: string) => {
  const response = await api.post<{ token: string }>('/auth/token', { apiKey });
  return response.data.token;
};

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  createUser: async (userData: CreateUserInput): Promise<User> => {
    const response = await api.post<User>('/users', userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
