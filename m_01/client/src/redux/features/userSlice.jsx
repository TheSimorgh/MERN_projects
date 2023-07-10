/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
  },

  reducers: {
    setUSer: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
      }
      state.user = action.payload;
    },
    setListFavorite: (state, action) => {
        state.listFavorites = action.payload;
    },
    removeListFavorite: (state, action) => {
        const {mediaId}=action.payload
        state.listFavorites=[...state.listFavorites].filter(e=>e.mediadId.toString() !==mediaId.toString())

    },
    addListFavorite: (state, action) => {
        state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});


export const {
    setUser,
    setListFavorites,
    addFavorite,
    removeFavorite
  } = userSlice.actions;
  
  export default userSlice.reducer;