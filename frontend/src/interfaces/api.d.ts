export interface User {
  id: number;
  username: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  appointments: Appointment[];
  responsibleAlerts: Alert[];
  actions: Action[];
}

export interface Patient {
  id: number;
  name: string;
  alerts: Alert[];
  conversations: Conversation[];
  appointments: Appointment[];
  birthDate: string;
  phone: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: number;
  handledAt?: string;
  patient: Patient;
  score: number;
  reasons: string[];
  summary: string;
  responsible?: User;
  actions: Action[];
  conversation: Conversation;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  text: string;
  conversation: Conversation;
  origin: 'SYSTEM' | 'DOCTOR' | 'PATIENT';
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: number;
  closedAt?: string;
  messages: Message[];
  patient: Patient;
  alert?: Alert;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: number;
  title: string;
  reason: string;
  patient: Patient;
  user: User;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Action {
  id: number;
  type: 'CALL' | 'MESSAGE' | 'APPOINTMENT';
  alert: Alert;
  user: User;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
