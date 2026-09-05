---
title: Tideline
summary: A self-hosted dashboard that turns a household's utility meter readings into forecasts. Handles gappy, irregularly sampled data without pretending the gaps aren't there.
tags: [Angular, TypeScript, D3, SQLite]
role: Sole author
year: 2024
---

Tideline reads gas, water and electricity meter readings entered by hand or scraped from a smart
meter, and projects them forward to the end of the billing period. It runs entirely on a home
server with no external service involved.

The interesting part is not the charting but the missing data. Readings arrive irregularly and
often stop for weeks at a time, so the forecast has to distinguish between a genuine drop in usage
and nobody having walked to the meter cupboard. Confidence bands widen visibly as readings get
stale.

## Highlights

- Custom D3 rendering layer so charts stay readable at any window size.
- Forecast confidence degrades explicitly with reading staleness rather than silently interpolating.
- Whole app plus database fits in a single container under 40MB.
