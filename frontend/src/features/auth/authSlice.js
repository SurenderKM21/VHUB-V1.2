
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isAdmin: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       const { email, isAdmin } = action.payload;
//       state.user = { email };
//       state.isAuthenticated = true;
//       state.isAdmin = isAdmin;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.isAdmin = false;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  token: null, 
  role:null,
isTech:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, isAdmin, token ,role,isTech} = action.payload; // Destructure token from payload
      state.user = { email };
      state.role={role};
      state.isAuthenticated = true;
      state.isAdmin = isAdmin;
      state.token = token; // Store token in state
      state.isTech=isTech;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.token = null; 
      state.isTech=null;// Clear token on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
