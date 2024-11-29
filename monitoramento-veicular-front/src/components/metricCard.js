import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const MetricCard = ({ title, value, unit }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            {value} {unit}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MetricCard;

