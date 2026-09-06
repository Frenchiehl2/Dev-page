---
title: Motor Control Simulation
summary: A SystemVerilog simulation of a 3D printer's motor control and on-board sensors, written to find out how much headroom the stock behaviour leaves.
tags: [SystemVerilog, Icarus Verilog, Embedded]
role: Sole author
year: 2024
url: https://github.com/Frenchiehl2/Iverilog-Motor-control-simulation
---

It started with taking a working printer apart: to understand how one is built, first take one
down. From there the focus is fine-tuning the on-board sensors and motor controllers to see how
much room there actually is to work with.

Sensors come first, since their readings feed the auxiliary systems, and those are the slowest
to tune. The largest single gain came from half-stepping the motors, which raises accuracy and
speed at once and so acts directly on print quality.

Testing put the benefit mostly at the small end: prints up to roughly 4.5 cm³ gain the most from
finer movement, while above that size the difference largely disappears.

## Highlights

- Half-stepping gave the largest single improvement, raising motor accuracy and speed together.
- Sensors characterised first, since the auxiliary systems depend on them and take longest to tune.
- Digital simulation in SystemVerilog alongside the circuit design.
