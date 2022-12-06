import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../api';

const initialState = {
  posts: [],

  isLoading: false,
};

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await API.get(`/posts`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const createPost = createAsyncThunk('posts/addPost', async newPost => {
  try {
    const response = await API.post(`/posts`, newPost);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk('posts/updatePost', async postData => {
  try {
    const { _id: id } = postData;
    const { data } = await API.patch(`/posts/${id}`, postData);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async id => {
  try {
    await API.delete(`/posts/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk('posts/likePost', async id => {
  try {
    const { data } = await API.patch(`/posts/${id}/likePost`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const userAuth = createAsyncThunk('user/auth', async user => {});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},

  extraReducers: builder => {
    // Get Posts
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Create post
    builder.addCase(createPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = [...state.posts, action.payload];
    });

    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Update post
    builder.addCase(updatePost.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;

      state.posts = state.posts.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Delete post

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(post => post._id !== action.payload);
    });

    // Like post

    builder.addCase(likePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
