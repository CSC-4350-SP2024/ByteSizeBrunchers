#!/bin/bash

# Set the server URL and port
SERVER_URL="http://localhost:3000"
PORT="3000"

# Set the user ID and query
USER_ID="e6328e4a-4477-4273-b299-8630ee657439"
QUERY="something else italian"

# Create the JSON payload
JSON_PAYLOAD="{\"userID\":\"$USER_ID\",\"query\":\"$QUERY\"}"

# Send the POST request to the server
response=$(curl -X POST -H "Content-Type: application/json" -d "$JSON_PAYLOAD" "$SERVER_URL/query")

# Print the response
echo "Server response:"
echo "$response"
