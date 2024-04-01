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

---

### Note ###

- Torch seems to be broken on M1. There are shape issues when trying to run inference on the model

```
  File "/Users/mdoan4/.cache/huggingface/modules/transformers_modules/vikhyatk/moondream1/f6e9da68e8f1b78b8f3ee10905d56826db7a5802/modeling_phi.py", line 491, in <lambda>
    else lambda fn, *args, **kwargs: fn(*args, **kwargs)
                                     ^^^^^^^^^^^^^^^^^^^
  File "/Users/mdoan4/.miniconda3/lib/python3.12/site-packages/torch/nn/modules/module.py", line 1511, in _wrapped_call_impl
    return self._call_impl(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/mdoan4/.miniconda3/lib/python3.12/site-packages/torch/nn/modules/module.py", line 1520, in _call_impl
    return forward_call(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/mdoan4/.miniconda3/lib/python3.12/site-packages/torch/amp/autocast_mode.py", line 16, in decorate_autocast
    return func(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^
  File "/Users/mdoan4/.miniconda3/lib/python3.12/site-packages/torch/amp/autocast_mode.py", line 16, in decorate_autocast
    return func(*args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^
  File "/Users/mdoan4/.cache/huggingface/modules/transformers_modules/vikhyatk/moondream1/f6e9da68e8f1b78b8f3ee10905d56826db7a5802/modeling_phi.py", line 318, in forward
    padding_mask.masked_fill_(key_padding_mask, 0.0)
RuntimeError: The size of tensor a (755) must match the size of tensor b (756) at non-singleton dimension 1
```
