import { createAsyncThunk } from "@reduxjs/toolkit";



export const reset_success_action = createAsyncThunk(
    "reset-success-action", ()=> {
        return true
    }
  
  );


  export const reset_error_action = createAsyncThunk(
    "reset-error-action", ()=> {
        return true
    }
  );