import { useDispatch, useSelector } from 'react-redux';
import { onToggleImageModal, onToggleMenu, onToggleUploadFile, onToggleVideoModal, onToggleVideoPlayerModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isMenuOpen,
        isImageModalOpen,
        isVideoModalOpen,
        isVideoPlayerModalOpen,
        isUpdloadingFile,
    } = useSelector( state => state.ui );

    const toggleMenu = () => {
        dispatch( onToggleMenu() )
    }
    const toggleImageModal = () => {
        dispatch( onToggleImageModal() )
    }

    const toggleVideoModal = () => {
        dispatch( onToggleVideoModal() )
    }

    const toggleImagePlayerModal = () => {
        dispatch( onToggleVideoPlayerModal() )
    }

    const toggleUploadFile = () => {
        dispatch( onToggleUploadFile() );
    }


    return {
        // Properties
        isMenuOpen,
        isImageModalOpen,
        isVideoModalOpen,
        isVideoPlayerModalOpen,
        isUpdloadingFile,
        // Methods
        toggleMenu,
        toggleImageModal,
        toggleVideoModal,
        toggleImagePlayerModal,
        toggleUploadFile,
    }
} 