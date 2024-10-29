import axios from 'axios';

export const bkend = axios.create({
  baseURL: 'https://eltribo-server.vercel.app/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const db = axios.create({
  baseURL: 'https://eltribo-server.vercel.app/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});