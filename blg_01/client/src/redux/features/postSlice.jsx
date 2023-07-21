/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reset_error_action, reset_success_action } from "./globalSlice";
import { BASE_URL } from "../../App";

//initialstate
const INITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  success: false,
};

export const get_public_posts = createAsyncThunk(
  "post/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/post/public`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const get_private_posts = createAsyncThunk(
  "post/fetch-private-posts",
  async (
    { page = 1, limit = 2, searchTerm = "", category = "" },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/post?page=${page}&limit=${limit}&searchTerm=${searchTerm}&category=${category}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const get_post = createAsyncThunk(
  "post/get/post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/post/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const delete_post = createAsyncThunk(
  "post/delete/post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${BASE_URL}/post/${postId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const create_post = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${BASE_URL}/post`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const update_post = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/post/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const like_post = createAsyncThunk(
  "post/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/post/likes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const dislike_post = createAsyncThunk(
  "post/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/post/dislikes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!clap post
export const clap_post = createAsyncThunk(
  "post/clap",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/post/claps/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//!schedule post
export const schedule_post = createAsyncThunk(
  "post/schedule-post",
  async (
    { postId, scheduledPublish },
    { rejectWithValue, getState, dispatch }
  ) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/post/schedule/${postId}`,
        {
          scheduledPublish,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const post_view = createAsyncThunk(
    "posts/post-views",
    async (postId, { rejectWithValue, getState, dispatch }) => {
      //make request
      try {
        const token = getState().users?.userAuth?.userInfo?.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(
          `${BASE_URL}/post/${postId}/post-view-count`,
          {},
          config
        );
        return data;
      } catch (error) {
        return rejectWithValue(error?.response?.data);
      }
    }
  );
const postSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: { zzz: () => {} },
  extraReducers:builder =>{
  //fetch public posts
  builder.addCase(get_public_posts.pending, (state, action) => {
    state.loading = true;
  });
  //handle fulfilled state
  builder.addCase(get_public_posts.fulfilled, (state, action) => {
    state.posts = action.payload;
    state.loading = false;
    state.error = null;
  });
  //* Handle the rejection
  builder.addCase(get_public_posts.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //fetch priavte posts
  builder.addCase(get_private_posts.pending, (state, action) => {
    state.loading = true;
  });
  //handle fulfilled state
  builder.addCase(get_private_posts.fulfilled, (state, action) => {
    state.posts = action.payload;
    state.loading = false;
    state.error = null;
  });
  //* Handle the rejection
  builder.addCase(get_private_posts.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //! get single post
  builder.addCase(get_post.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(get_post.fulfilled, (state, action) => {
    state.post = action.payload;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(get_post.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //! create post
  builder.addCase(create_post.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(create_post.fulfilled, (state, action) => {
    state.post = action.payload;
    state.success = true;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(create_post.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //! update post
  builder.addCase(update_post.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(update_post.fulfilled, (state, action) => {
    state.post = action.payload;
    state.success = true;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(update_post.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //! delete post
    builder.addCase(delete_post.pending, (state, action) => {
        state.loading = true;
      });
      //handle fulfilled state
      builder.addCase(delete_post.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
      });
      //* Handle the rejection
      builder.addCase(delete_post.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //! schedule post
  builder.addCase(schedule_post.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(schedule_post.fulfilled, (state, action) => {
    state.post = action.payload;
    state.success = true;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(schedule_post.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //! like post
  builder.addCase(like_post.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(like_post.fulfilled, (state, action) => {
    state.post = action.payload;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(like_post.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //! dislike post
  builder.addCase(dislike_post.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(dislike_post.fulfilled, (state, action) => {
    state.post = action.payload;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(dislike_post.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //! post view
  builder.addCase(post_view.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(post_view.fulfilled, (state, action) => {
    state.post = action.payload;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(post_view.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //! claps post
  builder.addCase(clap_post.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(clap_post.fulfilled, (state, action) => {
    state.post = action.payload;
    state.loading = false;
    state.error = null;
  });
  builder.addCase(clap_post.rejected, (state, action) => {
    state.error = action.payload;
    state.loading = false;
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
export const { reset } = postSlice.actions;
export default postSlice.reducer;
