
import { Card, CardContent, CardMedia, Grid, Typography, Divider } from '@mui/material';

import { useMembersStore } from '../hooks/';
import { VideoPlayerModal } from '../components/VideoPlayerModal';


export const Member = () => {
  const { activeMember } = useMembersStore();

  return (
    <div style={{ marginTop: 20 }}>

      <Grid container spacing={4} mt={10} justifyContent='center'>
        <Grid item xs={6} sm={4}>
          <Card>
            <CardMedia
              component='img'

              image={activeMember?.banner}
            />
          </Card>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Card>
            <CardMedia
              component='img'
              image={activeMember?.bannerData}
            />
          </Card>
        </Grid>
      </Grid>

      <Divider variant='inset'>
        <Typography
          variant='h4'
          mb={1}
          mt={5}
          fontFamily="Source Code Pro"
          justifyContent="start"
        >
          Videos
        </Typography>
      </Divider>

      <Grid container spacing={4} mt={10} justifyContent='center'>
        <Grid item xs={6} sm={4} onClick={() => toggleModal()}>
          <Card>
            <CardContent>
              <Typography>Play 1</Typography>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Card>
            <CardContent>
              <Typography>Play 2</Typography>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
      <VideoPlayerModal />
    </div>
  )
}
