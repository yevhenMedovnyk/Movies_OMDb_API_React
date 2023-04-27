import {createSlice} from "@reduxjs/toolkit";
import {getLocalStorage} from "../../services/localStorage";

const initialState = {
  email: getLocalStorage("user").email || null,
  token: getLocalStorage("user").token || null,
  id: getLocalStorage("user").id || null,
  avatarUrl: getLocalStorage("user").avatarUrl || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    setUserAvatar(state, action) {
      state.avatarUrl = action.payload.avatar;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.avatarUrl = null;
    },
  },
});

export const {setUser, removeUser, setUserAvatar} = userSlice.actions;
export default userSlice.reducer;
