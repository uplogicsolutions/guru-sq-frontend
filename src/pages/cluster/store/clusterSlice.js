import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUsers, getMessages, sendMessage } from 'api/cluster'

export const getClusterUsers = createAsyncThunk(
  'cluster/users',
  async () => {
    return getUsers()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error)
      });
  }
);

export const getClusterMessages = createAsyncThunk(
  'cluster/messages',
  async () => {
    return getMessages()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error)
      });
  }
);

export const sendClusterMessage = createAsyncThunk(
  'cluster/send',
  async (_data) => {
    return sendMessage(_data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error)
      });
  }
);

export const handleClusterMessageEvent = createAsyncThunk(
  'cluster/messageEvent',
  async (_data, { dispatch }) => {
    //TODO: compare cluster_id and then update
    dispatch(getClusterMessages())
  }
)

const initialState = {
  loading: false,
  messages: [],
  users: [],
  error: ''
};

const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {},
  extraReducers: {
    [getClusterUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getClusterUsers.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.type == 'success') state.users = action.payload.data;
      else state.error = action.payload.data.message;
    },
    [getClusterUsers.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
    [getClusterMessages.pending]: (state, action) => {
      state.loading = true;
    },
    [getClusterMessages.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.type == 'success') state.messages = action.payload.data;
      else state.error = action.payload.data.message;
    },
    [getClusterMessages.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
  }
});

export default clusterSlice.reducer;