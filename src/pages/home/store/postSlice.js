import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, like, comment, add } from 'api/post'
import S3 from 'react-aws-s3'
import s3Config from 'configs/s3Config'
import { uuid } from 'short-uuid'
import { act } from '@testing-library/react'

export const loadPosts = createAsyncThunk(
  'post/load',
  async (_data, { getState }) => {
    return get()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error)
      });
  }
);

export const likePost = createAsyncThunk(
  'post/like',
  async (_data, { getState }) => {
    return like(_data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error)
      });
  }
);

export const commentPost = createAsyncThunk(
  'post/comment',
  async (_data, { getState }) => {
    return comment(_data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error)
      });
  }
);

export const addPost = createAsyncThunk(
  'post/add',
  async (_data, { getState }) => {
    const ReactS3Client = new S3(s3Config)

    let fileSplit = _data.file.name.split(".");
    let extension = fileSplit[fileSplit.length - 1];

    //generate url
    let generated_uuid = uuid()
    let post_url = `${generated_uuid}.${extension}`

    ReactS3Client.uploadFile(_data.file.blobFile, post_url)
      .then((response) => {
        if (response.status == 204) {
          let data = {
            post_type: _data.post_type,
            post_url: response.location,
            post_description: _data.post_description,
            visibility: _data.visibility
          };
          return add(data)
            .then((response) => {
              return response;
            })
            .catch((error) => {
              console.log(error)
            });
        } else {
          //handle post could not be added
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }
);

const initialState = {
  loading: false,
  posts: [],
  error: ''
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [loadPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload)
      if (action.payload.type == 'success') state.posts = action.payload.data.data;
      else state.error = action.payload.data.message;
    },
    [loadPosts.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
    [likePost.fulfilled]: (state, action) => {
      if (action.payload.type == 'success') {
        for (let post of state.posts) {
          if (post.post_id == action.payload.data.data.post_id) {
            post.isLiked = !post.isLiked;
            post.likesCount = action.payload.data.data.likesCount;
          }
        }
      } else {
        state.error = "Could not like/unlike post";
      }
    },
    [commentPost.fulfilled]: (state, action) => {
      if (action.payload.type == 'success') {
        for (let post of state.posts) {
          if (post.post_id == action.payload.data.data.post_id) {
            post.comments = post.comments;
          }
        }
      } else {
        state.error = "Could not comment on post";
      }
    },
    [addPost.fulfilled]: (state, action) => {
      console.log(action.payload)
      //handle add post
    },
  }
});

export default postSlice.reducer;