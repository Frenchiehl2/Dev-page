---
title: Motor Control Simulation
summary: Eine SystemVerilog-Simulation der Motorsteuerung und Sensorik eines 3D-Druckers, um herauszufinden, wie viel Spielraum das Serienverhalten lässt.
tags: [SystemVerilog, Icarus Verilog, Embedded]
role: Alleinige Entwicklung
year: 2024
url: https://github.com/Frenchiehl2/Iverilog-Motor-control-simulation
---

Am Anfang stand das Zerlegen eines funktionierenden Druckers: Wer verstehen will, wie so etwas
gebaut ist, nimmt zuerst eines auseinander. Von dort aus geht es um das Feinabstimmen der
Sensoren und Motorsteuerungen, um zu sehen, wie viel Spielraum tatsächlich bleibt.

Die Sensoren kommen zuerst, denn ihre Werte speisen die Nebensysteme, und deren Abstimmung dauert
am längsten. Den größten einzelnen Gewinn brachte das Halbschrittverfahren: Es hebt Genauigkeit
und Geschwindigkeit zugleich und wirkt damit unmittelbar auf die Druckqualität.

In Tests lag der Nutzen vor allem im Kleinen: Drucke bis etwa 4,5 cm³ profitieren am meisten von
der feineren Bewegung, darüber verliert sich der Unterschied weitgehend.

## Highlights

- Das Halbschrittverfahren brachte die größte einzelne Verbesserung und hob Genauigkeit und Geschwindigkeit zugleich.
- Zuerst die Sensoren vermessen, da die Nebensysteme darauf aufbauen und am längsten brauchen.
- Digitale Simulation in SystemVerilog neben dem Schaltungsentwurf.
