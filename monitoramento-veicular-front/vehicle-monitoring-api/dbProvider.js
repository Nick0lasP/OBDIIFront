// dbProvider.js

const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = 'VehicleData';
const vehicleTableName = 'Vehicles'; 

// Function to get data for a specific vehicle
const getVehicleData = async (vehicleId) => {
  const params = {
    TableName: tableName,
    Key: {
      vehicleId: vehicleId,
    },
  };

  try {
    const data = await dynamodb.get(params).promise();
    return data.Item;
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
    throw error;
  }
};

// Function to save new vehicle data
const saveVehicleData = async (vehicleData) => {
  const params = {
    TableName: tableName,
    Item: vehicleData,
  };

  try {
    await dynamodb.put(params).promise();
    console.log('Vehicle data saved successfully');
  } catch (error) {
    console.error('Error saving vehicle data:', error);
    throw error;
  }
};

// Function to get historical data for a vehicle
const getVehicleHistoryData = async (vehicleId, startTime, endTime) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'vehicleId = :vehicleId AND #timestamp BETWEEN :startTime AND :endTime',
    ExpressionAttributeNames: {
      '#timestamp': 'timestamp',
    },
    ExpressionAttributeValues: {
      ':vehicleId': vehicleId,
      ':startTime': parseInt(startTime),
      ':endTime': parseInt(endTime),
    },
  };

  try {
    const data = await dynamodb.query(params).promise();
    return data.Items;
  } catch (error) {
    console.error('Error fetching vehicle history data:', error);
    throw error;
  }
};

// Function to get all vehicles
const getAllVehicles = async () => {
  const params = {
    TableName: vehicleTableName,
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.error('Error fetching all vehicles:', error);
    throw error;
  }
};


module.exports = {
  getVehicleData,
  saveVehicleData,
  getVehicleHistoryData,
  getAllVehicles,
  saveVehicleCommand,
};
