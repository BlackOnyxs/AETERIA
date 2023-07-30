import { configureStore } from '@reduxjs/toolkit';
import { authSlice, membersSlice, resourceSlice, uiSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        members: membersSlice.reducer,
        resources: resourceSlice.reducer,
        ui: uiSlice.reducer,
    }
})