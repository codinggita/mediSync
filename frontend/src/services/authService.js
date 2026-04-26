import api from './api.js';

/**
 * MediSync Auth Service
 * Wraps all /api/auth endpoints and /api/users profile/vitals endpoints.
 */

// ─── Auth ──────────────────────────────────────────────────────────────────

/**
 * Register a new user account.
 * @param {{ name, email, password, role, specialty?, hospital?, dateOfBirth?, bloodGroup?, gender? }} data
 */
export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data; // { _id, name, email, role, patientId, token }
};

/**
 * Log in with email + password.
 * @param {{ email, password }} credentials
 */
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data; // { _id, name, email, role, patientId, token }
};

/**
 * Fetch the current logged-in user's profile from the server.
 * Requires a valid token in localStorage (added automatically by api.js).
 */
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// ─── User Profile ──────────────────────────────────────────────────────────

/**
 * Get the full user profile (includes vitals).
 */
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

/**
 * Update the user's own profile fields.
 * @param {Partial<{ name, email, password, bloodGroup, gender, dateOfBirth, specialty, hospital }>} updates
 */
export const updateUserProfile = async (updates) => {
  const response = await api.put('/users/profile', updates);
  return response.data;
};

/**
 * Update the user's vitals.
 * @param {{ heartRate?, bloodPressure?, glucose?, spO2? }} vitals
 */
export const updateVitals = async (vitals) => {
  const response = await api.put('/users/vitals', vitals);
  return response.data;
};

// ─── Admin ─────────────────────────────────────────────────────────────────

/** Get all users (admin only). */
export const adminGetAllUsers = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

/** Get platform stats (admin only). */
export const adminGetStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

/** Update a user by ID (admin only). */
export const adminUpdateUser = async (id, updates) => {
  const response = await api.put(`/admin/users/${id}`, updates);
  return response.data;
};

/** Delete a user by ID (admin only). */
export const adminDeleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};
