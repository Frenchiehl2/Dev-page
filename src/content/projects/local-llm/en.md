---
title: Local LLM
summary: An inference box built from retired AMD GPUs, running llama.cpp under Docker parallelised across several cards or driven from a single one.
tags: [llama.cpp, Docker, Vulkan, ROCm, Linux]
role: Sole author
year: 2026
url: https://github.com/Frenchiehl2/Local_LLM
---

Turns hardware that would otherwise be scrapped RX 570 and RX 470 cards on a DDR3 i5
platform into a local LLM server. llama.cpp does the serving, chosen for its hardware
compatibility and its parallelisation across cards.

It ships as Docker scripts rather than a build: a Vulkan path for multi-GPU setups, a ROCm path
for a single card, and an autostart script for a machine that gets powered on and off often.
Models come from Hugging Face and are managed either outside the container or within it.

 Docker Scripts can either be ran or copied into the terminal, simply download and run the desired version for your setup, fill in the fields if required

 -<code>llama-vulkan.sh</code> for multi GPU setup<br>
  -<code>llama-rocm.sh</code> for single GPU setup<br>
  -<code>docker-start.sh</code> should be put as an autostart in case the machine will be powered on and off frequently<br>


you can access the docker container via:

```javascript
  sudo docker ps
  sudo docker exec -it <containerID> /bin/bash
```

## Highlights

- Vulkan backend for multi-GPU, ROCm for a single card chosen per setup rather than one build for everything.
- Runs entirely in Docker, so the host stays clean and the machine can be power cycled without ceremony.
- Aimed at hardware past its resale value rather than at current cards.
