import axios from "axios";

const API_URL = "http://localhost:5000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const register = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response;
};
export const login = async (email, password) => {
  const response = await api.post("/users/login", {
    email: email,
    password: password,
  });
  return response;
};
