import axios from "axios";

const localUrl = "http://localhost:5000/api/";
const prodUrl = "https://eltribo-server.vercel.app/api/";

export const bkend = axios.create({
  baseURL: localUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const db = axios.create({
  baseURL: localUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// http://localhost:3000/
