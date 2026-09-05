---
title: Foxglove
summary: A subscription plant-care app for a garden centre chain. Turns a shelf label scan into a watering and feeding schedule that adapts to the light the plant actually gets.
tags: [Angular, TypeScript, Capacitor, Node]
role: Full-stack developer
year: 2024
---

Foxglove ships as the customer-facing half of a garden centre's loyalty programme. Scanning the
label on a pot registers the plant to a room in the household, and from there the app schedules
watering, feeding and repotting reminders.

The schedule is not a fixed interval per species. Light exposure is estimated from the room the
plant was assigned to and the time of year, and the interval stretches or tightens accordingly — a
fern in a north-facing bathroom in January is on a very different clock from the same fern in a
July conservatory.

## Highlights

- One codebase to web, iOS and Android through Capacitor, sharing the scheduling logic verbatim.
- Reminder intervals derived from room, season and species rather than a species lookup table.
- Offline-first: the plant library and the next fortnight of reminders survive a greenhouse with no signal.
