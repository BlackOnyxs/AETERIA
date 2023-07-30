import { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import { useResourceStore } from '../hooks/'

export const Images = () => {
  const { loadResourcesFromRoot, resources } = useResourceStore();
  
  useEffect(() => {
    loadResourcesFromRoot('images');
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

              <Card id={ resource.id }  >
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
    </Box>
  )
}
