import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isMenuOpen: false,
        isImageModalOpen: false,
        isVideoModalOpen: false,
        isVideoPlayerModalOpen: false,
        isUpdloadingFile: false,
    },
    reducers: {
        onToggleMenu: ( state ) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        onToggleImageModal: ( state ) => {
            state.isImageModalOpen = !state.isImageModalOpen
        },
        onToggleVideoModal: ( state ) => {
            state.isVideoModalOpen = !state.isVideoModalOpen
        },
        onToggleVideoPlayerModal: ( state ) => {
            state.isVideoPlayerModalOpen = !state.isVideoPlayerModalOpen
        },
        onToggleUploadFile: ( state ) => {
            state.isUpdloadingFile = !state.isUpdloadingFile;
        }
    }
});

export const { 
    onToggleMenu,
    onToggleImageModal,
    onToggleVideoModal,
    onToggleVideoPlayerModal,
    onToggleUploadFile,
 } = uiSlice.actions;