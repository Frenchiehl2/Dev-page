---
title: Physics Simulation Framework
summary: Custom physics simulation software in C++, built directly on Qt, glad and OpenGL rather than on an existing engine.
tags: [C++, Qt, OpenGL, glad]
role: Sole author
year: 2026
url: https://github.com/Frenchiehl2/Physics-Simulation-Framework
---

A physics simulation framework written in C++ from its own foundations. Qt provides the
application shell; glad and OpenGL handle the drawing.

Choosing that stack over an off-the-shelf engine means the solver and the picture of it are both
under direct control — the visualisation shows what the simulation is actually doing rather than
what an engine decided to render.

## Highlights

- Built on Qt, glad and OpenGL instead of an off-the-shelf physics engine.
- Solver and renderer developed together, so the picture reflects the simulation rather than a replay.
