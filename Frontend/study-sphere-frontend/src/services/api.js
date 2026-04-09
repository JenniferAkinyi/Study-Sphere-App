import axios from "axios";

const API_URL = "http://localhost:5000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
export const fetchMyGroups = async() => {
  const response = await api.get('/groups/mygroups')
  return response.data.groups
}
export const fetchGroupId = async(groupId) => {
  const response = await api.get(`/groups/${groupId}`)
  return response.data
}
export const fetchInvites = async() => {
  const response = await api.get('/invites/pending')
  return response.data
}
export const acceptInvite = async(inviteId) => {
  const response = await api.post(`/invites/${inviteId}/accept`)
  return response.data
}
export const declineInvite = async (inviteId) => {
  const response = await api.post(`/invites/${inviteId}/decline`)
  return response.data
} 
export const fetchDiscoveredGroups = async () => {
  const response = await api.get('/groups/discover')
  return response.data
}
export const groupEssay = async (groupId) => {
  const response = await api.get(`/groups/${groupId}/essay`)
  return response.data
}
export const essayById = async (groupId, id) => {
  const response = await api.get(`/groups/${groupId}/${id}`)
  return response.data
}
export const postEssay = async({title, content, groupId}) => {
  const response = await api.post(`/groups/${groupId}/postessay`, {title, content})
  return response.data
}
export const logStudyMinutes = async(minutes) => {
  const response = await api.post('/study/log', {minutes})
  return response.data
}
export const weeklyStudyData = async (userId) => {
  const response = await api.get(`/study/weekly/${userId}`)
  return response
}
