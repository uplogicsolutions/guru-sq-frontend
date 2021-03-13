import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProfile, editProfile } from 'api/profile'

const initialState = {
  loading: false,
  profile: {},
  error: ''
}

export const get = createAsyncThunk(
  'profile/get',
  async (_data) => {
    return getProfile()
      .then((response) => {
        if (response && response.data) {
          if (response.type == 'success') {
            return response.data
          } else {
            return response.message
          }
        }
      })
      .catch((error) => {
        return error;
      });
  }
);

export const edit = createAsyncThunk(
  'profile/edit',
  async (_data, { dispatch }) => {
    return editProfile(_data.url, _data.data)
      .then((response) => {
        if (response && response.data) {
          if (response.type == 'success') {
            dispatch(getProfile());
          }
        }
      })
      .catch((error) => {
        return error;
      });
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [getProfile.pending]: (state, action) => {
      state.loading = true
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false
      state.profile = action.payload
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [editProfile.pending]: (state, action) => {
      state.loading = true
    },
    [editProfile.fulfilled]: (state, action) => {
      state.loading = false
      state.profile = action.payload
    },
    [editProfile.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
});

const { reducer, actions } = profileSlice

export default reducer;