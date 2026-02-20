import { createSlice } from '@reduxjs/toolkit';

// Helper to get initial state from localStorage
const getStoredAuthState = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('userEmail');

  if (token && role && email) {
    return {
      user: { email },
      isAuthenticated: true,
      isAdmin: role === 'Admin',
      token: token,
      role: role,
    };
  }
  return {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
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
      const { email, token, role } = action.payload;
      state.user = { email };
      state.role = role;
      state.isAuthenticated = true;
      state.isAdmin = role === 'Admin';
      state.token = token;

      // Persist to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userEmail', email);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.token = null;
      state.role = null;

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('user_active_section');
      localStorage.removeItem('admin_active_section');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
