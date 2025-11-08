import { API_BASE } from "../config/config";
import axios from "axios";

export const userLoginAPI = (email: string, password: string) => {
  return axios.post(`${API_BASE}/login`, { email, password });
};

export const userRegisterAPI = (
  fullname: string,
  email: string,
  password: string
) => {
  return axios.post(`${API_BASE}/register`, { fullname, email, password });
};
