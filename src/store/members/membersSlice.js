import { createSlice } from '@reduxjs/toolkit';

export const membersSlice = createSlice({
    name: 'members',
    initialState: {
        isLoadingMembers: true,
        members: [],
        activeMember: undefined,
        errorMensaje: undefined,
    },
    reducers: {
        onSetActiveMember: ( state, { payload } ) => {
            state.activeMember = payload;
        },
        onLoadMembers: ( state, { payload } ) => {
            state.members = payload;
        },
        onSetMembersLoading: ( state, { payload } ) => {
            state.isLoadingMembers = payload;
        },
        onSetMembersError: ( state, { payload } ) => {
            state.errorMensaje = payload;
        }
    }
});

export const { 
    onSetActiveMember,
    onLoadMembers,
    onSetMembersLoading,
    onSetMembersError,
 } = membersSlice.actions;