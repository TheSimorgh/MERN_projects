/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../App";
import Cookies from "js-cookie";
import { reset_error_action, reset_success_action } from "./globalSlice";

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
    userInfo: Cookies.get("userInfo")
      ? JSON.parse(Cookies.get("userInfo"))
      : null,
  },
};

//! Login action
export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${BASE_URL}/user/login`, payload);
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

//! Get User Public Profile Action

export const user_pub_profile = createAsyncThunk(
  "user/user-public-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/user/profile/${userId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Get User  Profile Action

export const user_private_profile = createAsyncThunk(
  "user/user-private-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/user/profile/`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Block User Action
export const block_user = createAsyncThunk(
  "user/block-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/user/block/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! UnBlock User Action
export const unblock_user = createAsyncThunk(
  "user/unblock-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/user/unblock/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!Follow User Action
export const follow_user = createAsyncThunk(
  "user/follow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/user/following/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!UnFollow User Action
export const unfollow_user = createAsyncThunk(
  "user/unfollow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/user/unfollowing/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! upload cover image
export const upload_cover_img = createAsyncThunk(
  "users/upload-cover-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("file", payload?.image);

      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/user/upload-cover-image`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ! upload profile image
export const upload_prof_img = createAsyncThunk(
  "users/upload-profile-image",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("file", payload?.image);
      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/user/upload-profile-image`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//

//! Send Account verification email Action
export const send_acc_verf_email = createAsyncThunk(
  "users/send-account-verification-email",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/user/account-verification-email`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! verify account Action
export const verify_acc = createAsyncThunk(
  "users/account-verified",
  async (verifyToken, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/user/account-verification/${verifyToken}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!forgot password Action
export const forgot_password = createAsyncThunk(
  "users/forgot-password",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/forgot-password`,
        payload
      );
      //! save the user into localstorage
      Cookies.set("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! reset password Action
export const password_reset = createAsyncThunk(
  "user/password-reset",
  async ({ resetToken, password }, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/reset-password/${resetToken}`,
        {
          password,
        }
      );
      //! save the user into localstorage
      Cookies.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//! update user profile Action
export const update_profile = createAsyncThunk(
  "users/update-user-profile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    console.log(payload);
    try {
      const token = getState().users?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/users/update-profile/`,
        payload,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const xx = createAsyncThunk(
  "users/",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      1;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      (state.loading = false),
        (state.error = null),
        (state.users = []),
        (state.user = null),
        (state.success = false),
        (state.isverified = false),
        (state.isUpdated = false),
        (state.isRegistered = false),
        (state.isLogin = false),
        (state.isCoverImageUploaded = false),
        (state.isProfileImgUploaded = false),
        (state.emailMessage = undefined),
        (state.profile = {}),
        (state.isEmailSent = false),
        (state.userAuth = {
          error: null,
          userInfo: Cookies.remove("userInfo"),
        });
    },
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
      state.success = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLogin = false;
      state.success = false;
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

    //! Reset error action
    builder.addCase(reset_error_action.fulfilled, (state) => {
      state.error = null;
    });
    //! Reset success action
    builder.addCase(reset_success_action.fulfilled, (state) => {
      state.success = false;
    });

    //get user public profile
    builder.addCase(user_pub_profile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(user_pub_profile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(user_pub_profile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //get user private profile
    builder.addCase(user_private_profile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(user_private_profile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(user_private_profile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //Update user profile
    builder.addCase(update_profile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(update_profile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isUpdated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(update_profile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    });

    //block user
    builder.addCase(block_user.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(block_user.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(block_user.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //unblock user
    builder.addCase(unblock_user.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unblock_user.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unblock_user.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //follow user
    builder.addCase(follow_user.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(follow_user.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(follow_user.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //unfollow user
    builder.addCase(unblock_user.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unblock_user.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unblock_user.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //forgot password
    builder.addCase(forgot_password.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgot_password.fulfilled, (state, action) => {
      state.isEmailSent = true;
      state.emailMessage = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(forgot_password.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //reset password
    builder.addCase(password_reset.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(password_reset.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(password_reset.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //Send Account verification email
    builder.addCase(send_acc_verf_email.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(send_acc_verf_email.fulfilled, (state, action) => {
      state.isEmailSent = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(send_acc_verf_email.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    //Verify Account
    builder.addCase(verify_acc.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verify_acc.fulfilled, (state, action) => {
      state.isverified = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(verify_acc.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
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
export const { reset } = userSlice.actions;
export default userSlice.reducer;
