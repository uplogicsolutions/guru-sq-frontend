import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, read, count } from 'api/notifications'

const initialState = {
  loading: false,
  notifications: [],
  unreadNotificationsCount: 0,
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
  async ({dispatch}) => {
    return read()
      .then((response) => {
        if (response && response.data) {
          if (response.type == 'success') {
            dispatch(getUnreadNotificationsCount())
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

export const getUnreadNotificationsCount = createAsyncThunk(
  'notifications/count',
  async () => {
    return count()
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
    [getUnreadNotificationsCount.fulfilled]: (state, action) => {
      state.unreadNotificationsCount = action.payload.data
    }
  }
});

const { reducer, actions } = notificationSlice

export default reducer;