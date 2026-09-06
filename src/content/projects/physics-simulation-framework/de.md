---
title: Physics Simulation Framework
summary: Eigene Physiksimulationssoftware in C++, direkt auf Qt, glad und OpenGL aufgebaut statt auf einer bestehenden Engine.
tags: [C++, Qt, OpenGL, glad]
role: Alleinige Entwicklung
year: 2026
url: https://github.com/Frenchiehl2/Physics-Simulation-Framework
---

Ein Framework für Physiksimulation, in C++. Qt liefert den
Anwendungsrahmen, glad und OpenGL übernehmen die Darstellung.

Dieser Aufbau anstelle einer fertigen Engine hält den Solver und sein Bild gleichermaßen in der
Hand die Darstellung zeigt, was die Simulation tatsächlich tut, und nicht, was eine Engine zu
zeichnen beschlossen hat.

## Highlights

- Auf Qt, glad und OpenGL aufgebaut statt auf einer fertigen Physik-Engine.
- Solver und Renderer gemeinsam entwickelt, sodass das Bild die Simulation zeigt und keine Aufzeichnung.
