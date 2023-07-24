/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reset_error_action, reset_success_action } from "./globalSlice";
import { BASE_URL } from "../../App";

//initialstate
const INITIAL_STATE = {
  loading: false,
  error: null,
  comments: [],
  comment: null,
  success: false,
};

// ! update post
export const create_comment = createAsyncThunk(
  "comment/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.data.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/comment/${payload?.postId}`,
        {
          message: payload?.message,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! post slices
const commentsSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //create comment
    builder.addCase(create_comment.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(create_comment.fulfilled, (state, action) => {
      state.comment = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(create_comment.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Reset error action
    builder.addCase(reset_error_action.fulfilled, (state) => {
      state.error = null;
    });
    //! Reset success action
    builder.addCase(reset_success_action.fulfilled, (state) => {
      state.success = false;
    });
  },
});


export default commentsSlice.reducer;