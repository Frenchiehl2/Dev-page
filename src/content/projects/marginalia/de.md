---
title: Marginalia
summary: Ein Offline-First-Lesewerkzeug, das Markierungen und Notizen an Text bindet, der sich zwischen Ausgaben verschiebt. Klein, ohne Konto, synchronisiert über eine Datei, die dir gehört.
tags: [Angular, IndexedDB, Web Workers]
role: Alleinige Entwicklung
year: 2022
---

Die meisten Lese-Apps verankern Markierungen an Zeichenpositionen. Sobald der Text neu umbrochen
wird oder eine neue Ausgabe die Seiten anders zählt, landet die Markierung im falschen Absatz.
Marginalia verankert stattdessen an einer unscharfen Übereinstimmung mit dem umgebenden Text, sodass
Anmerkungen es überleben, wenn sich das Dokument darunter verändert.

Es funktioniert vollständig offline und verlangt nie ein Konto. Die Synchronisierung läuft über eine
einfache Datei, die man ablegen kann, wo man möchte – ein synchronisierter Ordner, ein USB-Stick,
ein Repository.

## Highlights

- Unscharfe Textverankerung findet Markierungen nach Ausgabenwechseln und Neuumbrüchen wieder.
- Der Abgleich läuft in einem Web Worker, damit ein langes Dokument das Scrollen nie blockiert.
- Kein Konto, kein Server: Der Zustand liegt in IndexedDB und synchronisiert über eine selbst verwaltete Datei.
