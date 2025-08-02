import type { Card } from "./card"

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  userId: string
}

export interface User {
  id: string
  name?: string
  email: string
}

export interface UserState {
  token: string
  user: User | null
  cards: Card[] | null
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface MeResponse extends User {
  cards: Card[]
}
