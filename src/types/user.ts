export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  description?: string;
  createdAt: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  description?: string;
  password: string;
} 