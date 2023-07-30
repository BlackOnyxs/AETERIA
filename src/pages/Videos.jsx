import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useResourceStore, useUiStore } from '../hooks';
import { VideoPlayerModal } from '../components/VideoPlayerModal';

export const Videos = () => {
  const { toggleImagePlayerModal } = useUiStore();
  const { loadResourcesFromRoot, resources, setActiveResource } = useResourceStore();
  
  useEffect(() => {
    loadResourcesFromRoot();
  }, [])
  
  
  return (
    <Box>
      <Grid 
        container 
        display="flex" 
        justifyContent="center" 
        className="fadeIn"
        spacing={4}
      >
        {
          resources.map(resource => (
            <Grid item 
              id={ resource.id } 
              sx={{ height: 400, width: 600 }}
              xs={12}
              xm={ 6 }
              md={ 4 }
            >

              <Card 
                id={ resource.id }  
                onClick={ () => {
                  setActiveResource( resource );
                  toggleImagePlayerModal();
                }}
              >
                <CardMedia
                  id={ resource.id}
                  component='img'
                  className="fadeIn"
                  sx={{ maxHeight: 200}}
                  alt={`${resource.title}'s`}
                  image={resource.mini || resource.url }
                  
                />
                <CardContent>
                  <Typography variant="h5">{resource.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <VideoPlayerModal />
    </Box>
  )
}
