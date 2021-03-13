import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { checkUser, getUser } from 'api/auth'

export const checkAuth = createAsyncThunk(
    'auth/check',
    async (_data, { getState, dispatch }) => {
        return checkUser()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
);

export const getAuth = createAsyncThunk(
    'auth/get',
    async (_data, { getState, dispatch }) => {
        return getUser()
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
);

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
        }
    },
    extraReducers: {
        [checkAuth.pending]: (state, action) => {
            state.loading = true;
        },
        [checkAuth.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.type == 'success' && action.payload.data.isLoggedIn) {
                state.user = action.payload.data.user;
                state.loggedIn = true;
                if (action.payload.data.redirectUrl != '/landing') {
                    state.redirect = true;
                    state.redirectUrl = action.payload.data.redirectUrl;
                }
            } else {
                state.error = action.payload.message;
                state.redirectUrl = '/landing';
            }
        },
        [checkAuth.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.redirect = true;
            state.redirectUrl = '/landing';
        },
        [getAuth.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.type == 'success' && action.payload.data) {
                state.user = action.payload.data.user;
            }
        },
    }
})

const { reducer, actions } = authSlice

export const { setLoading, setUser, setLoggedIn, setRedirect, setRedirectUrl } = actions;

export default reducer