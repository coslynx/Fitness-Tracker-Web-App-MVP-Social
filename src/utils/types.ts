import { API_URL, AUTH_SECRET } from '../.env';

export interface User {
  userId: string;
  email: string;
  username: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserRegistrationData {
  email: string;
  password: string;
  username: string;
}

export interface Goal {
  id: string;
  title: string;
  targetValue: number;
  deadline: Date;
  notes?: string;
}

export interface ProgressData {
  id: string;
  goalId: string;
  date: Date;
  value: number;
}

export interface OverallProgressData {
  goalId: string;
  progressPercentage: number;
}

export interface SocialFeedData {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}