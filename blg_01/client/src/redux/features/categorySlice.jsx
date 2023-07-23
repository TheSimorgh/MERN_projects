/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reset_error_action, reset_success_action } from "./globalSlice";
import { BASE_URL } from "../../App";


//initialstate
const INITIAL_STATE = {
    loading: false,
    error: null,
    categories: [],
    category: null,
    success: false,
  };


  //!Fetch categories
export const get_categories = createAsyncThunk(
    "category/lists",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(`${BASE_URL}/category`);
        return data;
      } catch (error) {
        return rejectWithValue(error?.response?.data);
      }
    }
  );


  //! categories slices
const categoriesSlice = createSlice({
    name: "categories",
    initialState: INITIAL_STATE,
    // reducers:{},
    extraReducers: (builder) => {
      //fetch categories
      builder.addCase(get_categories.pending, (state, action) => {
        state.loading = true;
      });
      //handle fulfilled state
      builder.addCase(get_categories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.success = true;
        state.loading = false;
        state.error = null;
      });
      //* Handle the rejection
      builder.addCase(get_categories.rejected, (state, action) => {
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
  

//   const {} = categoriesSlice.actions;
  
  export default categoriesSlice.reducer;
  