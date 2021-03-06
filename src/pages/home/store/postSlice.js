import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, like, comment, add } from 'api/post'
import S3 from 'react-aws-s3'
import s3Config from 'configs/s3Config'
import { uuid } from 'short-uuid'

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
    const extension = '.jpg'; //get extension from _data.file.name
    const post_url = `uuid.${extension}`; //generate using uuid and extension

    //Get file extension
    let regex = /(?:\.([^.]+))?$/;
    let file_extension = regex.exec(_data.file.name)
    console.log('Extension:', file_extension)

    //generate url
    let generated_uuid = uuid()
    let URL = `${generated_uuid}.${file_extension}`

    ReactS3Client.uploadFile(_data.file, post_url)
      .then((response) => {
        console.log(response)
        if (response.status == 204) {
          let data = {
            post_type: _data.post_type,
            post_url: post_url,
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
      if (action.payload.type == 'success') state.posts = action.payload.data;
      else state.error = action.payload.message;
    },
    [loadPosts.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
    [likePost.fulfilled]: (state, action) => {
      console.log(action.payload)
      //update the specific post in state to set isLiked true
    },
    [commentPost.fulfilled]: (state, action) => {
      console.log(action.payload)
      //update the specific post in state to refresh comments
    },
    [addPost.fulfilled]: (state, action) => {
      console.log(action.payload)
      //handle add post
    },
  }
});

export default postSlice.reducer;