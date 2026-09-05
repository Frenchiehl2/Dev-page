---
title: Desktop-like Website
summary: Ein Desktop-Betriebssystem, im Browser mit Angular nachgebaut: ziehbare Symbole, bei Bedarf erzeugte Fenster und eine Taskleiste, die den Zustand jedes Fensters behält.
tags: [Angular, TypeScript, DOM]
role: Alleinige Entwicklung
year: 2026
url: https://github.com/Frenchiehl2/Desktop-like-Website
---

Bildet eine Desktop-Umgebung als Webseite nach. Der Desktop ist anpassbar, mit Symbolen darauf und
einer Navigationsleiste am unteren Rand, und jedes Symbol ist an einen eigenen Fenstercontainer
gebunden, der auf Anforderung dynamisch entsteht statt vorab deklariert zu sein.

Die Leiste hält den Zustand einzelner Fenster fest, sodass ein weggelegtes Fenster unverändert
zurückkommt. Symbole und Fenster lassen sich frei ziehen, und Fenster ändern ihre Größe wie auf
jedem Desktop.

## Highlights

- Fenstercontainer entstehen auf Anforderung dynamisch statt vorab deklariert zu sein.
- Die Leiste sichert den Zustand einzelner Fenster und stellt ihn beim erneuten Aufruf wieder her.
- Jedes Symbol und jedes Fenster ist ziehbar, Fenster lassen sich dynamisch skalieren.
