---
title: Harbourline
summary: Ein kommerzielles Liegeplatz-Planungswerkzeug für kleine Marinas. Es plant Ankünfte gegen eine begrenzte Zahl von Liegeplätzen und berechnet den Aufenthalt neu, wenn ein anderes Boot anlegt als gebucht war.
tags: [Angular, TypeScript, PostgreSQL, Stripe]
role: Leitende Entwicklung
year: 2025
---

Harbourline ist das Buchungs- und Abrechnungssystem, vor dem ein Hafenbüro den ganzen Tag sitzt.
Liegeplätze werden nach Rumpflänge, Tiefgang und Strombedarf vergeben, und der Plan muss lösbar
bleiben, wenn sich wegen des Wetters zwei Wochen an Buchungen verschieben.

Kommerziell interessant ist die Neuberechnung. Boote kommen länger an als angemeldet, bleiben eine
Nacht länger oder nehmen Landstrom, der nicht reserviert war. Jeder dieser Fälle ist ein
Abrechnungsvorgang, der zu einer bereits autorisierten Zahlung passen muss. Die Preislogik führt
deshalb einen Prüfpfad, statt das ursprüngliche Angebot zu überschreiben.

## Highlights

- Die Liegeplatzvergabe ist als Constraint-Problem gelöst, sodass ein überbuchtes Wochenende schon bei der Buchung auffällt und nicht erst am Steg.
- Änderungen werden nur angehängt: das ursprüngliche Angebot, jede Anpassung und die Schlussrechnung bleiben lesbar.
- Ausgeliefert an zahlende Marinas, samt Migrationsweg aus den Tabellen, mit denen die meisten ankamen.
