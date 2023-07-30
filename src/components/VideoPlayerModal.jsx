
import { Box, Modal } from '@mui/material'
import ReactPlayer from 'react-player';
import { useUiStore } from '../hooks/useUIStore';
import { useResourceStore } from '../hooks';

export const VideoPlayerModal = () => {
  const { activeResource } = useResourceStore();
  const { isVideoPlayerModalOpen, toggleImagePlayerModal } = useUiStore();
  return (
      <Box display='flex' justifyContent='center' >
        <Modal open={isVideoPlayerModalOpen}
        onClose={toggleImagePlayerModal}
        >

          <>
          <ReactPlayer
            url={ activeResource?.url || '' }
            width="50%"
            height="50%"
            controls
        />
    
          </>
        </Modal>
      </Box>
  )
}
