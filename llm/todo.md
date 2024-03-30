### List of things to do to get llm module working ###

- [x] LLM runtime set up
    - [ ] benchmarking (can fall back on main pc if doesn't work out on thinkpad)
- [ ] semantic search
    - [x] set up
    - [ ] index population from csv
    - [ ] link to recipeID instead of returning the recipe itself (because images)
        - [ ] or just ditch images. decide by next week.
    - [ ] hook into LLM runtime

- [ ] full test (backend only)
    - [ ] backend sends a post request to localhost:5000, received by llm runtime
    - [ ] llm runtime does inference on backend request
    - [ ] llm runtime queries inference output in annoy
    - [ ] annoy returns a recipeID
    - [ ] llm backend pings recipeID back to normal backend
