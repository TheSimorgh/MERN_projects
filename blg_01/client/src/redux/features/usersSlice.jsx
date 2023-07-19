/* eslint-disable no-unused-vars */
import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../App";

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  user: null,
  success: false,
  isverified: false,
  isUpdated: false,
  isRegistered: false,
  isLogin: false,
  isCoverImageUploaded: false,
  isProfileImgUploaded: false,
  emailMessage: undefined,
  profile: {},
  isEmailSent: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! Login action
export const loginAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValuemgetState, dispatch }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, payload);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Register action
export const registerAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValuemgetState, dispatch }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/register`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! Logout action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  //remove token from localstorage
  localStorage.removeItem("userInfo");
  return true;
});

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //Login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.isLogin = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLogin = false;
    });
    //! Register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isRegistered = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(registerAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isRegistered = false;
    });
  },
});

//! generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
