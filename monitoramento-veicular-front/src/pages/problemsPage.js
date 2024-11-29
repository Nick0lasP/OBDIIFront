import React, { useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import api from '../api';
import { ProblemsContext } from '../contexts/problemsContext';

const ProblemsPage = () => {
  const { problems, setProblems } = useContext(ProblemsContext);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await api.get('/problems', {
          params: { vehicleId: 'vehicleOnix' }, 
        });
        setProblems(response.data.problems || []);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
    const interval = setInterval(fetchProblems, 5000); 

    return () => clearInterval(interval);
  }, [setProblems]);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Detected Problems
        </Typography>
        <List>
          {problems.length === 0 ? (
            <Typography variant="body1">No problems detected.</Typography>
          ) : (
            problems.map((problem) => (
              <React.Fragment key={problem.id}>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={problem.message}
                    secondary={`Date and Time: ${problem.date}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default ProblemsPage;

