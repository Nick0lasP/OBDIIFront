const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  getVehicleData,
  saveVehicleData,
  getVehicleHistoryData,
  getAllVehicles,
  saveVehicleCommand,
} = require('./dbProvider');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

app.get('/data', async (req, res) => {
  try {
    const vehicleId = req.query.vehicleId || 'vehicleOnix';
    const data = await getVehicleData(vehicleId);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Vehicle data not found' });
    }
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
    res.status(500).json({ error: 'Error fetching vehicle data' });
  }
});

app.get('/position', async (req, res) => {
  try {
    const vehicleId = req.query.vehicleId || 'vehicleOnix';
    const data = await getVehicleData(vehicleId);

    if (data && data.position) {
      res.json({ position: data.position });
    } else {
      res.status(404).json({ error: 'Position data not found' });
    }
  } catch (error) {
    console.error('Error fetching position data:', error);
    res.status(500).json({ error: 'Error fetching position data' });
  }
});

app.get('/problems', async (req, res) => {
  try {
    const vehicleId = req.query.vehicleId || 'vehicleOnix';
    const data = await getVehicleData(vehicleId);

    if (data && data.problems) {
      res.json({ problems: data.problems });
    } else {
      res.status(404).json({ error: 'Problems data not found' });
    }
  } catch (error) {
    console.error('Error fetching problems data:', error);
    res.status(500).json({ error: 'Error fetching problems data' });
  }
});

app.post('/data', async (req, res) => {
  try {
    const vehicleData = req.body;
    await saveVehicleData(vehicleData);
    res.status(201).json({ message: 'Vehicle data saved successfully' });
  } catch (error) {
    console.error('Error saving vehicle data:', error);
    res.status(500).json({ error: 'Error saving vehicle data' });
  }
});

app.get('/data/history', async (req, res) => {
  try {
    const vehicleId = req.query.vehicleId || 'vehicleOnix';
    const { startTime, endTime } = req.query;

    const data = await getVehicleHistoryData(vehicleId, startTime, endTime);

    if (data && data.length > 0) {
      res.json({ history: data });
    } else {
      res.status(404).json({ error: 'No historical data found' });
    }
  } catch (error) {
    console.error('Error fetching historical data:', error);
    res.status(500).json({ error: 'Error fetching historical data' });
  }
});

app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await getAllVehicles();
    res.json({ vehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Error fetching vehicles' });
  }
});

app.post('/commands', async (req, res) => {
  try {
    const vehicleId = req.body.vehicleId || 'vehicleOnix';
    const command = req.body.command;

    const result = await saveVehicleCommand(vehicleId, command);
    res.json({ message: 'Command sent successfully', result });
  } catch (error) {
    console.error('Error sending command:', error);
    res.status(500).json({ error: 'Error sending command' });
  }
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
