/* eslint-disable no-unused-vars */
import {
  createAsyncThunk,
  createSlice,
  
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../App";
import Cookies from "js-cookie";


// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'))
// userAuth: {
//   error: null,
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null,
// },
const user = Cookies.get("user") ? JSON.parse(Cookies.get("userInfo")) : null;
const initialState = {
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
    userInfo:  Cookies.get("userInfo") 
      ? JSON.parse(Cookies.get("userInfo")) : null
  },
};

//! Login action
export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
        try {
      const data  = await axios.post(`${BASE_URL}/user/login`, payload);
      // localStorage.setItem("userInfo", JSON.stringify(data));
      Cookies.set("userInfo", JSON.stringify(data));
      console.log(`login`);
     console.log(data);
    //  console.log(JSON.parse(localStorage.getItem("userInfo")));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


//! Register Action
export const register = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue }) => {
    //make request
    try {
      const { data } = await axios.post(`${BASE_URL}/user/register`, payload);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// ! Logout action
export const logout = createAsyncThunk("user/logout", async () => {
  //remove token from localstorage
  Cookies.remove("userInfo");
  return true;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    reset:(state)=>{
      state.loading=false,
        state.error= null,
  state.users= [],
  state.user=null,
  state.success= false,
  state.isverified= false,
  state.isUpdated=false,
  state.isRegistered= false,
  state.isLogin= false,
  state.isCoverImageUploaded= false,
  state.isProfileImgUploaded= false,
  state.emailMessage= undefined,
  state.profile= {},
  state.isEmailSent= false,
  state.userAuth= {error: null,userInfo:  Cookies.remove("userInfo") }

  }

  
  },
  extraReducers: (builder) => {
    //Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.isLogin = true;
      state.loading = false;
      state.success=true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLogin = false;
      state.success=false;
    });
    //! Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    //handle fulfilled state
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isRegistered = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isRegistered = false;
    });
  //     //logout
  // builder.addCase(logout.pending, (state) => {
  //   state.loading = true;
  // });
  // builder.addCase(logout.fulfilled, (state, action) => {
  //   state.userAuth.userInfo = action.payload;
   
  // });
  // builder.addCase(logout.rejected, (state, action) => {
  //   state.error = action.payload;
  //   state.loading = false;
  //   state.isLogin = false;
  //   state.success=false;
  // });
  },



  // extraReducers:{
  //   [register.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [register.fulfilled]: (state, action) => {
  //          state.user = action.payload;
  //     state.isRegistered = true;
  //     state.loading = false;
  //     state.error = null;
  //   },
  //   [register.rejected]: (state, action) => {
  //     state.error = action.payload;
  //     state.loading = false;
  //     state.isRegistered = false;
  //   },


  //   [login.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [login.fulfilled]: (state, action) => {
  //       state.userAuth.userInfo = action.payload;
  //       state.user = action.payload;
  //     state.isLogin = true;
  //     state.loading = false;
  //     state.error = null;
  //   },
  //   [login.rejected]: (state, action) => {
  //       state.error = action.payload;
  //     state.loading = false;
  //     state.isLogin = false;
  //   },
  // }
});

//! generate reducer
 export const {reset} =userSlice.actions
export default userSlice.reducer;
