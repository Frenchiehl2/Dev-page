---
title: Tideline
summary: Ein selbst gehostetes Dashboard, das Zählerstände eines Haushalts in Prognosen verwandelt. Es geht mit lückenhaften, unregelmäßig erfassten Daten um, ohne die Lücken zu beschönigen.
tags: [Angular, TypeScript, D3, SQLite]
role: Alleinige Entwicklung
year: 2024
---

Tideline liest Gas-, Wasser- und Stromzählerstände ein – von Hand eingetragen oder aus einem
intelligenten Zähler ausgelesen – und schreibt sie bis zum Ende des Abrechnungszeitraums fort. Es
läuft vollständig auf einem Heimserver, ganz ohne externen Dienst.

Das Interessante daran ist nicht die Darstellung, sondern die fehlenden Daten. Ablesungen kommen
unregelmäßig und bleiben oft wochenlang ganz aus. Die Prognose muss deshalb unterscheiden, ob der
Verbrauch wirklich gesunken ist oder ob nur niemand zum Zählerschrank gegangen ist. Die
Konfidenzbänder werden sichtbar breiter, je älter die letzte Ablesung ist.

## Highlights

- Eigene D3-Renderschicht, damit die Diagramme in jeder Fenstergröße lesbar bleiben.
- Die Prognosesicherheit nimmt mit dem Alter der Daten sichtbar ab, statt still zu interpolieren.
- Anwendung und Datenbank zusammen passen in einen Container unter 40 MB.
