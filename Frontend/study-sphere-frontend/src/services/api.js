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
export const fetchUserById = async (id) =>{
  const response = await api.get(`/users/${id}`)
  return response.data
}
export const searchUsers = async (query) => {
  const response = await api.get(`/users/search?q=${query}`);
  return response.data;
};
export const createGroup = async(groupData) => {
  const response = await api.post("/groups/creategroup", groupData)
  return response
}
export const fetchGroup = async() => {
  const response = await api.get("/groups/allgroups")
  return response.data
}