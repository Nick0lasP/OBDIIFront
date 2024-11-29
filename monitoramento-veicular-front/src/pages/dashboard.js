import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import api from '../api';
import { ProblemsContext } from '../contexts/problemsContext';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const { setProblems } = useContext(ProblemsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/data', {
          params: { vehicleId: 'vehicleOnix' },
        });
        setData(response.data);
        setProblems(response.data.problems || []);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, [setProblems]);

  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* RPM */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">RPM</Typography>
            <Typography variant="h4">{data.rpm}</Typography>
          </Paper>
        </Grid>
        {/* Speed */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Speed</Typography>
            <Typography variant="h4">{data.speed} km/h</Typography>
          </Paper>
        </Grid>
        {/* Temperature */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Temperature</Typography>
            <Typography variant="h4">{data.temperature} °C</Typography>
          </Paper>
        </Grid>
        {/* Fuel Level */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Fuel Level</Typography>
            <Typography variant="h4">{data.fuelLevel} %</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;