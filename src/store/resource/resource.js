import { createSlice } from '@reduxjs/toolkit';

export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        isLoading: false,
        isSaving: false,
        activeResource: null,
        resources: [],
        errorMessage: null
    },
    reducers: {
        onLoadResource: (state, action ) => {
            state.resources = action.payload;
        },
        onUpdateResource: ( state, action ) => {
            state.resources = state.resources.map( rs => {
                if ( action.payload.id === rs.id ) {
                    return action.payload;
                }
                return rs;
            });
        },
        onCreateResource: ( state, action ) => {
            state.resources.push( action.payload );
        },
        onDeleteResource: ( state ) => {
            state.resources = state.resources.filter( rs => rs.id === state.activeResource.id );
        },
        onSetActiveResource: ( state, action ) => {
            state.activeResource = action.payload;
        },
        onSetIsSaving: ( state, action ) => {
            state.isSaving = action.payload;
        },
        onSetIsLoading: ( state, action ) => {
            state.isLoading = action.payload;
        },
        onSetError: ( state, action ) => {
            state.errorMessage = action.payload;
        }
    }
});

export const { 
    onLoadResource,
    onUpdateResource,
    onCreateResource,
    onDeleteResource,
    onSetActiveResource,
    onSetIsSaving,
    onSetIsLoading,
    onSetError,
 } = resourceSlice.actions;