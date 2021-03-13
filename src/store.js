import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import login from 'pages/login/store/loginSlice'
import register from 'pages/register/store/registerSlice'
import auth from 'auth/store/authSlice'
import post from 'pages/home/store'
import profile from 'pages/profile/store/profileSlice'

const reducer = combineReducers({
  auth,
  login,
  register,
  post,
  profile
})

const store = configureStore({
  reducer,
})

export default store;