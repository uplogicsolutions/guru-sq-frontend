import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import login from 'pages/login/store/loginSlice'


const reducer = combineReducers({
  login
})

const store = configureStore({
  reducer,
})

export default store;