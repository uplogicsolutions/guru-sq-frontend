import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, read } from 'api/notifications'

const initialState = {
  loading: false,
  notifications: [],
  error: ''
}

export const getNotifications = createAsyncThunk(
  'notifications/get',
  async () => {
    return get()
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
export const readNotifications = createAsyncThunk(
  'notifications/read',
  async () => {
    return read()
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


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: {
    [getNotifications.pending]: (state, action) => {
      state.loading = true
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.loading = false
      state.notifications = action.payload.data
    },
    [getNotifications.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  }
});

const { reducer, actions } = notificationSlice

export default reducer;