#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d '{"query": "Could you give me the recipe for something hearty?"}' http://localhost:5000/query
