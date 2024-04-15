#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d '{"userID": "e6328e4a-4477-4273-b299-8630ee657439", "query": "Your query goes here"}' http://localhost:3100/query
