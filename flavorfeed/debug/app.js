const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3100;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Debug endpoint
app.post('/query', (req, res) => {
  console.log('Received debug request:');
  console.log('Request body:', req.body);

  // Send a response
  res.json({ message: 'Debug request received successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
