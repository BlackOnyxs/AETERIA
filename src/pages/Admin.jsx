import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Tab, Tabs, Typography } from '@mui/material'

import { Add, CreditCardOutlined, Image, Storage, VideoLibrary } from '@mui/icons-material';

import { useResourceStore, useUiStore, useAuthStore } from '../hooks';
import { ResourceModal, SummaryTile, VideoModal} from '../components/admin/';
import { resourceTypes } from '../data/data';

export const Admin = () => {

  const { uid } = useAuthStore();
  const { toggleImageModal, toggleVideoModal } = useUiStore();
  const { setActiveResource, resources, loadReources } = useResourceStore();

  const [resourceType, setResourceType] = useState(resourceTypes[0].value)
  useEffect(() => {
    if (uid) {
      loadReources(uid, resourceType);
    }
  }, [uid, resourceType]);

  return (
    <div style={{ marginTop: 50 }}>
      <Grid
        container
        spacing={2}
        className='fadeIn'
        justifyContent='center'
        mb={3}
      >

        <SummaryTile
          title='Free'
          subTitle='Plan Actual'
          icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={2}
          subTitle='Videos'
          icon={<VideoLibrary color='secondary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={1}
          subTitle='Images'
          icon={<Image color='secondary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title='200MB'
          subTitle='Espacio Restante'
          icon={<Storage color='error' sx={{ fontSize: 40 }} />}
        />
      </Grid>
      <Box display='flex' justifyContent='flex-end' mb={2}>

        <Button
          sx={{ borderRadius: 10, justifyContent: 'end', marginRight: 2 }}
          variant="contained"
          startIcon={<Add />}
          onClick={() => toggleVideoModal()}
          
        >
          Añadir Video
        </Button>
        <Button
          sx={{ borderRadius: 10, justifyContent: 'end' }}
          variant="contained"
          startIcon={<Add />}
          onClick={() => toggleImageModal()}

        >
          Añadir Imagen
        </Button>
      </Box>
      <Box
        display='flex' 
        justifyContent='center'  
      >
        <Tabs
          value={resourceType}
          onChange={(_, newValue) => setResourceType(newValue)}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label={resourceTypes[0].label} value={resourceTypes[0].value}/>
          <Tab label={resourceTypes[1].label} value={resourceTypes[1].value}/>
        </Tabs>
      </Box>

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
      <ResourceModal />
      <VideoModal />
    </div>
  );
};


