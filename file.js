const express = require('express');
const bodyParser = require('body-parser');

// In-memory data storage
let data = {
  id: 1,
  name: 'Initial Data',
};

const app = express();

// Middleware
app.use(bodyParser.json());

// Route to get the current data
app.get('/data', (req, res) => {
  res.json(data);
});

// Route to completely change the data
app.put('/data', (req, res) => {
  const newData = req.body;
  data = newData;
  res.json({ message: 'Data updated successfully', newData });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
