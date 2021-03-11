import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    redirect: false,
    redirectUrl: '',
    error: ''
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        resetRegisterStates: (state) => {
            state.redirect = false
            state.redirectUrl = ''
            state.error = ''
        },
        registerSuccess: (state, action) => {
            state.loading = false
            state.redirect = true
            state.redirectUrl = action.payload
        },
        registerFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        registerPending: (state, action) => {
            state.loading = true
        },
        skip: (state, action) => {
            state.redirectUrl= action.payload;
            state.redirect = true;
        }
    }
})

const { reducer, actions } = registerSlice

export const { resetRegisterStates, registerSuccess, registerFailure, registerPending, skip } = actions;

export default reducer;