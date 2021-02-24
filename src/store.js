import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import login from 'pages/login/store/loginSlice'
import register from 'pages/register/store/registerSlice'

const reducer = combineReducers({
  login,
  register
})

const store = configureStore({
  reducer,
})

export default store;