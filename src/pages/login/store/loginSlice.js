import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { act } from '@testing-library/react';
import { login } from 'api/auth'
import { setUser, setLoggedIn } from 'auth/store'

const initialState = {
    loading: false,
    redirect: false,
    redirectUrl: '',
    error: ''
}

export const userLogin = createAsyncThunk(
    'login/login',
    async (_data, { getState, dispatch }) => {
        return login(_data)
            .then((response) => {
                if (response && response.data) {
                    if (response.type == 'success' && response.data.isLoggedIn) {
                        dispatch(setUser(response.data.user));
                        dispatch(setLoggedIn(response.data.isLoggedIn));
                    }
                }
                return response;
            })
            .catch((error) => {
                return error;
            });
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: {
        [userLogin.pending]: (state, action) => {
            state.loading = true;
        },
        [userLogin.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.type == 'success' && action.payload.data.isLoggedIn) {
                state.redirect = true;
                state.redirectUrl = action.payload.data.redirectUrl;
            } else {
                state.error = action.payload.message
            }
        },
        [userLogin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

const { reducer, actions } = loginSlice

export default reducer;