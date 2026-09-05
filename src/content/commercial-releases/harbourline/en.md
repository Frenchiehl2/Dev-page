---
title: Harbourline
summary: A commercial berth-planning tool sold to small marinas. Schedules arrivals against a finite set of moorings and reprices a stay when the boat that shows up is not the boat that was booked.
tags: [Angular, TypeScript, PostgreSQL, Stripe]
role: Lead developer
year: 2025
---

Harbourline is the booking and billing system a marina office actually sits in front of all day.
Berths are allocated against hull length, draught and power requirements, and the schedule has to
stay solvable when a fortnight of bookings shifts because of weather.

The commercially interesting part is repricing. Boats arrive longer than declared, stay an extra
night, or take shore power that was not on the reservation. Every one of those is a billing event
that has to reconcile against a payment already authorised, so the pricing engine keeps an audit
trail rather than overwriting the original quote.

## Highlights

- Berth allocation solved as a constraint problem, so an overbooked weekend fails loudly at booking time rather than at the pontoon.
- Amendments are append-only: the original quote, every adjustment and the final invoice all stay readable.
- Shipped to paying marinas with a migration path from the spreadsheets most of them arrived with.
