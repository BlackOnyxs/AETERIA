import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        uid: null,
        errorMessage: undefined
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
        },
        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.errorMessage = undefined;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated',
            state.uid = null,
            state.errorMessage = payload
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;