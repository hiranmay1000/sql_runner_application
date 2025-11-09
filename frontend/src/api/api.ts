import axios from "axios";
import { API_BASE } from "../config/config";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Interceptors for token
api.interceptors.request.use((config) => {
  console.log("interceptor is calling");
  const token = localStorage.getItem("token");
  const skipAuth =
    config.url?.includes("/login") || config.url?.includes("/register");

  if (!skipAuth && token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("config", config);

  return config;
});
