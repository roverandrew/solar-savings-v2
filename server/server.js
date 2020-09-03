const path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config()

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('/location', async (req, res) => {
  let fetchedLocationData = await fetch(`https://api.getgeoapi.com/api/v2/ip/check?api_key=${process.env.GEO_API_KEY}`);
  let locationData = await fetchedLocationData.json();
  res.json(locationData);
});

app.get('/power', async (req, res) => {
  const { latitude, longitude, systemCapacity, azimuth, tilt, arrayType, moduleType, losses } = req.query;
  const fetchedPowerData = await fetch(`https://developer.nrel.gov/api/pvwatts/v6.json?api_key=${process.env.NREL_API_KEY}&lat=${latitude}&lon=${longitude}&system_capacity=${systemCapacity}&azimuth=${azimuth}&tilt=${tilt}&array_type=${arrayType}&module_type=${moduleType}&losses=${losses}`);
  const powerData = await fetchedPowerData.json();
  res.json(powerData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is up!');
});