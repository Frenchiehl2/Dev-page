---
title: Foxglove
summary: Eine Abo-App zur Pflanzenpflege für eine Gartencenter-Kette. Aus einem gescannten Etikett wird ein Gieß- und Düngeplan, der sich an das Licht anpasst, das die Pflanze tatsächlich bekommt.
tags: [Angular, TypeScript, Capacitor, Node]
role: Full-Stack-Entwicklung
year: 2024
---

Foxglove ist die Kundenseite des Treueprogramms eines Gartencenters. Wer das Etikett am Topf
scannt, ordnet die Pflanze einem Raum im Haushalt zu; von da an plant die App Erinnerungen zum
Gießen, Düngen und Umtopfen.

Der Plan ist kein fester Rhythmus je Art. Die Lichtmenge wird aus dem zugeordneten Raum und der
Jahreszeit geschätzt, und der Abstand dehnt oder verkürzt sich entsprechend – ein Farn im
Nordbadezimmer im Januar läuft nach einer ganz anderen Uhr als derselbe Farn im Wintergarten im
Juli.

## Highlights

- Eine Codebasis für Web, iOS und Android über Capacitor, die Planungslogik unverändert geteilt.
- Erinnerungsabstände ergeben sich aus Raum, Jahreszeit und Art statt aus einer festen Tabelle.
- Offline-first: die Pflanzenbibliothek und die nächsten zwei Wochen an Erinnerungen überstehen ein Gewächshaus ohne Empfang.
