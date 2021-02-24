import { createSlice } from '@reduxjs/toolkit'
import reducer from 'pages/login/store'

const initialState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

const { reducer, actions } = authSlice

export const { setUser } = actions;

export default reducer