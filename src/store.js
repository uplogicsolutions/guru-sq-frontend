import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import login from 'pages/login/store/loginSlice'
import register from 'pages/register/store/registerSlice'
import auth from 'auth/store/authSlice'
import post from 'pages/home/store'

const reducer = combineReducers({
  auth,
  login,
  register,
  post
})

const store = configureStore({
  reducer,
})

export default store;