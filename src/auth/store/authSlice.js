import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    user: null,
    loggedIn: false,
    redirect: false,
    redirectUrl: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setRedirect: (state, action) => {
            state.redirect = action.payload
        },
        setRedirectUrl: (state, action) => {
            state.redirectUrl = action.payload
        },
    }
})

const { reducer, actions } = authSlice

export const { setLoading, setUser, setLoggedIn, setRedirect, setRedirectUrl } = actions;

export default reducer