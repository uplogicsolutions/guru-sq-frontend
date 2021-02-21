import { createSlice } from '@reduxjs/toolkit'
import api from 'utils/api'
import axios from 'axios'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      console.log(action.payload)
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
    },
  },
});

export const login = ({ username, password }) => async dispatch => {
  try {
    let user = {
      username: 'shubhangi@gmail.com'
    }
    dispatch(loginSuccess(user));
  } catch (e) {
    return console.error(e.message);
  }
}

export const logout = () => async dispatch => {
  try {
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}

const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer


