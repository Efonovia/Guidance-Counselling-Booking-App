import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
//   applications: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setUser: (state, action) => {
        state.user = action.payload.user;
    },

    setNotifications: (state, action) => {
        state.notifications = action.payload.notifications;
    },
  },
});

export const { setMode, setUser, setLoggedIn } = authSlice.actions;
export default authSlice.reducer; 