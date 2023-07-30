import React, { useContext } from 'react';
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import { useAuthStore, useUiStore } from '../../hooks/';


export const NavBar = () => {
  const { toggleMenu } = useUiStore();
  const { uid }= useAuthStore();
  return (
    <AppBar>
      <Toolbar>
        <Link href="/" display="flex" alignItems="flex-start" underline="none">
          <Typography color="white" variant="h5">
            AETERIA
          </Typography>
        </Link>
        
        <Box flex={1} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ ml: 5, display: { xs: 'none', sm: 'flex' }}}
        >
          <Link href="/images" underline="none">
            <Typography color="white" fontFamily="Source Code Pro" variant="h6" ml={5}>
              Images
            </Typography>
          </Link>
          <Link href="/videos"underline="none">
            <Typography color="white" variant="h6" fontFamily="Source Code Pro" ml={5}>
              Videos
            </Typography>
          </Link>
        </Box>
        <Box flex={1} />
        {/* <Box sx={ { ml: 5, display: !uid ? { xs: 'none', sm: 'flex' } : 'none'} }>
          <Link href="/login" underline="none">
              <Typography color="white" fontFamily="Source Code Pro" variant="h6" ml={5}>
                Login
              </Typography>

          </Link>
        </Box> */}
        
        <IconButton 
          size="large" 
          edge="end" 
          onClick={toggleMenu}
          // sx={{ display: { xs: 'flex', sm: 'none'}}}  
        >
          <MenuOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
