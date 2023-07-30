
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';
import { Image, Dashboard, Login, Logout, GitHub, VideoLibrary  } from '@mui/icons-material/';


import { useAuthStore } from '../../hooks/useAuthStore';
import { useUiStore } from '../../hooks/useUIStore';

const menuItems = [
  {
    label: 'Images',
    value: '/images'
  },
  {
    label: 'Videos',
    value: '/videos'
  },
]

const menuAccess = [
  {
    label: 'Login',
    value: '/login'
  },
]


export const SideBar = () => {
  const { isMenuOpen, toggleMenu } = useUiStore();
  const { uid, startLogout } = useAuthStore();
  const navigate = useNavigate()
  return (
    <Drawer anchor="right" open={isMenuOpen} onClose={toggleMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map(({ value, label}, index) => (
            <ListItemButton 
              key={label}
              onClick={ () =>{
                navigate(value);
                toggleMenu()
              }}
            >
              <ListItemIcon>
                {index % 2 ? <Image /> : <VideoLibrary />}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>

        <Divider>Access</Divider>
        {
          !uid ? 
            (
              <List>
                {menuAccess.map(({ value, label}, index) => (
                  <ListItemButton 
                    key={label}
                    onClick={ () =>{
                      navigate(value);
                      toggleMenu()
                    }}
                  >
                    <ListItemIcon>
                      {index % 2 ? <VideoLibrary /> : <Login />}
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                ))}
              </List>
            )
          : (
            <>            
              <ListItemButton onClick={ () => {
                startLogout();
                toggleMenu();
              }}>
                <ListItemIcon>
                  <Logout />  
                </ListItemIcon>
                      <ListItemText primary='Logout' />
              </ListItemButton>
              <ListItemButton onClick={ () => {
                navigate('/admin');
                toggleMenu();
              }}>
                <ListItemIcon>
                  <Dashboard />  
                </ListItemIcon>
                      <ListItemText primary='Dashboard' />
              </ListItemButton>
            </>
          )
        }
        <Divider />
        {/* * TODO: Social Media  */}

        <Link href="https://github.com/BlackOnyxs/binary-calc" underline="none">
          <ListItemButton>
            <ListItemIcon>
              <GitHub />
            </ListItemIcon>
            <ListItemText primary="Repositorio" />
          </ListItemButton>
        </Link>
      </Box>
    </Drawer>
  );
};
