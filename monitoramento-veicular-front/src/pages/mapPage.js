import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import api from '../api';
import {
  Container,
  Typography,
  Paper,
  Box,
} from '@mui/material';

const MapPage = () => {
  const [position, setPosition] = useState(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'INSERIR_GOOGLE_MAPS_API_KEY', 
  });

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await api.get('/position', {
          params: { vehicleId: 'vehicleOnix' }, 
        });
        setPosition(response.data.position);
      } catch (error) {
        console.error('Error fetching position:', error);
      }
    };

    fetchPosition();
    const interval = setInterval(fetchPosition, 5000); 

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  if (!position) {
    return <div>Loading position...</div>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vehicle Location
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ height: '70vh', width: '100%' }}>
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            zoom={15}
            center={position}
          >
            <Marker position={position} label="Vehicle" />
          </GoogleMap>
        </Box>
      </Paper>
    </Container>
  );
};

export default MapPage;

