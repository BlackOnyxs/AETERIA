import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material'

import { NavBar, SideBar } from '../ui'
import { useAuthStore } from '../../hooks/';
import { Admin, CheckingAuth, Home, Images, Login, Members, Videos } from '../../pages/';



export const Layout = () => {

  const { status } = useAuthStore();

  if ( status === 'checking') {
    return <CheckingAuth />
  }
  

  return (
    <Box sx={{ flexFlow: 1 }}>

    <NavBar />
    <SideBar />

    <Box 
      sx={{ padding: '10px 20px'}}
    >
        <Routes>
          {
            status !== 'authenticated'
            ?
              <>
                <Route path='/' element={ <Home />}/>
                <Route path='/videos' element={ <Videos />}/>
                <Route path='/images' element={ <Images />}/>
                <Route path='/login' element={ <Login />}/>
                <Route path='/member/*' element={ <Members />}/>
              </>
            :
            <>
              <Route path='/' element={ <Home />}/>
                <Route path='/videos' element={ <Videos />}/>
                <Route path='/images' element={ <Images />}/>
              <Route path='/admin' element={ <Admin />}/>
              <Route path="/login" element={ <Navigate to="/" /> } />
            </>
          }
          {/* <Route path="/*" element={ <Navigate to="/" /> } /> */}
        </Routes>
    </Box>
    </Box>
  )
}
