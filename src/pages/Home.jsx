import React from 'react';
import { Box, Card, CardMedia, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMembersStore } from '../hooks/useMembersStore';
import { useEffect } from 'react';

export const Home = () => {
  const navigate = useNavigate();

  const { members, startLoadMembers, setActiceMember } = useMembersStore();

  useEffect(() => {
    startLoadMembers();
  }, []);

  return (
    <Box display='flex' justifyContent='center' flexDirection='column' flex={1}>
       
       <Box>
        <Box
          component="img"
          alignItems='center'
          sx={{
            height: 394,
            width: 434,
            marginTop: 10,
            mb: 10
          }}
          alt="The house from the offer."
          src="../src/assets/homeBanner.svg"
        />
       </Box>
       
      
      <Divider variant='inset'>
      <Typography 
        variant='h4' 
        mb={1} 
        fontFamily="Source Code Pro"
        justifyContent="start"
      >
        Members
      </Typography>
      </Divider>

      {
        members.length > 0 
        ? (
          <Grid container spacing={4} mt={1} justifyContent="center">
            {
              members.map( member => (
                <Grid 
                  id={ member.id }
                  item 
                  xs={24} 
                  sm={4}
                  onClick={() => {
                    setActiceMember( member );
                    navigate(`/member/`);
                  }}
                >
                  <Card id={member.name}>
                    <CardMedia
                      id={ member.banner } 
                      component='img'
                      alt={ `${ member.nickname}'s banner`}
                      image={ member?.banner }
                    />
                  </Card>
                </Grid>
                ))
            }
          </Grid>          
         )
        : (
          <Grid container
            direction='row'
            justifyContent='center'
            >
            <CircularProgress color='warning' />
        </Grid>
        )
      }
      
    </Box>
  )
}
