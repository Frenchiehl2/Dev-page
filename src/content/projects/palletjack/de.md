---
title: Palletjack
summary: Ein Build-Cache-Proxy für Monorepos. Er sitzt zwischen CI-Runnern und dem Remote-Speicher und senkt die Kaltstart-Buildzeit eines Workspace mit 200 Paketen von elf Minuten auf unter zwei.
tags: [Node, TypeScript, Redis, Docker]
role: Leitender Entwickler
year: 2023
---

CI-Runner in einem großen Monorepo verbringen die meiste Zeit damit, Pakete neu zu bauen, die
niemand geändert hat. Palletjack sitzt vor dem Remote-Cache und liefert Artefakte aus einer warmen
lokalen Ebene aus; erst bei einem echten Fehltreffer greift er auf den Objektspeicher zurück.

Entstanden ist er nach einer Messung, wohin die elf Minuten tatsächlich flossen: nicht in die
Kompilierung, sondern in Tausende kleiner Roundtrips zum Remote-Speicher. Diese zu bündeln und eine
heiße Redis-Ebene nah an den Runnern zu halten, hat den Großteil der Laufzeit beseitigt.

## Highlights

- Kaltstart-Builds eines Workspace mit 200 Paketen fielen von rund 11 Minuten auf unter 2.
- Inhaltsadressierte Schlüssel machen ein Vergiften des Caches zwischen Branches strukturell unmöglich.
- Direkt einsetzbar: Die Runner zeigen auf eine andere URL, an der Build-Konfiguration ändert sich nichts.
