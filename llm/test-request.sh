#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d '{"query": "What is the capital of France?"}' http://localhost:5000/query
