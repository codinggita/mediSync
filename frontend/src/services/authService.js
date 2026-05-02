import api from '../utils/api.js';






export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data; 
};


export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data; 
};


export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};




export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};


export const updateUserProfile = async (updates) => {
  const response = await api.put('/users/profile', updates);
  return response.data;
};


export const updateVitals = async (vitals) => {
  const response = await api.put('/users/vitals', vitals);
  return response.data;
};




export const adminGetAllUsers = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};


export const adminGetStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};


export const adminUpdateUser = async (id, updates) => {
  const response = await api.put(`/admin/users/${id}`, updates);
  return response.data;
};


export const adminDeleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};
