import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getUserProfileDetails } from 'api/user'

export const getProfile = createAsyncThunk(
  'post/load',
  async (_data) => {
    return getUserProfileDetails(_data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error)
      });
  }
);


const initialState = {
  loading: false,
  profile: {},
  error: ''
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: {
    [getProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.type == 'success') state.profile = action.payload.data;
      else state.error = action.payload.data.message;
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
  }
});

export default userProfileSlice.reducer;
