import { createSlice } from '@reduxjs/toolkit';

// Helper to get initial state from localStorage
const getStoredAuthState = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('userEmail');

  if (token && role && email) {
    return {
      user: { email, name: localStorage.getItem('userName') },
      isAuthenticated: true,
      isAdmin: role === 'Admin',
      isMechanic: role === 'Mechanic',
      token: token,
      role: role,
    };
  }
  return {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isMechanic: false,
    token: null,
    role: null,
  };
};

const initialState = getStoredAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, name, token, role } = action.payload;
      state.user = { email, name };
      state.role = role;
      state.isAuthenticated = true;
      state.isAdmin = role === 'Admin';
      state.isMechanic = role === 'Mechanic';
      state.token = token;

      // Persist to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.isMechanic = false;
      state.token = null;
      state.role = null;

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('user_active_section');
      localStorage.removeItem('admin_active_section');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
