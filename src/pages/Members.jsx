import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { Member } from '../pages/'
import { useMembersStore } from '../hooks';

export const Members = () => {
  const navigate = useNavigate();
  const { activeMember } = useMembersStore();

  useEffect(() => {
    if ( !activeMember ) {
      navigate('/');
      return;
    }
    console.log('Si hay, no mames')
    navigate(`${ activeMember.nickname }`)
  }, [activeMember]);
  

  return (
    <>
      <Box height="80vh" mt={3}>
        <Routes>
          <Route path='/:id' element={<Member />} />
        </Routes>
      </Box>
    </>
  )
}
