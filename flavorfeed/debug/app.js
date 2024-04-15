const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3100;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Query endpoint
app.post('/query', (req, res) => {
  console.log('Received query request:');
  console.log('Request body:', req.body);

  // Extract the userID and query from the request body
  const { userID, query } = req.body;

  // Generate a sample response
  const response = {
    response: `This is a sample response for the query: "${query}"`,
  };

  // Send the response
  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});