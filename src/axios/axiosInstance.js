import axios from 'axios';

const localUrl = "http://localhost:3000/api/";
const prodUrl = 'https://eltribo-server.vercel.app/api/'

export const bkend = axios.create({
  
  baseURL:prodUrl , 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const db = axios.create({
  baseURL: prodUrl, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// http://localhost:3000/