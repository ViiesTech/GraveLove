import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userData: null,
  user: null,
  role: null,
  isProfileCreated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCredentials: state => {
      state.token = null;
      state.userData = null;
      state.user = null;
      state.role = null;
      state.isProfileCreated = false;
    },
    setCredentials: (state, action) => {
      const { isProfileCreated = true, role, token, user, userData } = action.payload || {};
      const nextUserData = userData || user || null;

      state.token = token || null;
      state.userData = nextUserData;
      state.user = nextUserData;
      state.role = role || null;
      state.isProfileCreated = Boolean(isProfileCreated);
    },
    setProfileCreated: (state, action) => {
      state.isProfileCreated = Boolean(action.payload);
    },
    setUserData: (state, action) => {
      state.userData = action.payload || null;
      state.user = action.payload || null;
    },
  },
});

export const { clearCredentials, setCredentials, setProfileCreated, setUserData } = authSlice.actions;
export default authSlice.reducer;
