---
title: Marginalia
summary: An offline-first reading tool that keeps highlights and notes attached to text that shifts between editions. Small, no account required, syncs over a file you control.
tags: [Angular, IndexedDB, Web Workers]
role: Sole author
year: 2022
---

Most reading apps anchor highlights to character offsets, which means a highlight lands in the
wrong paragraph the moment the text is re-flowed or a new edition renumbers the pages. Marginalia
anchors to a fuzzy match on the surrounding text instead, so annotations survive the document
changing underneath them.

It works fully offline and never asks for an account. Sync is a plain file the reader puts
wherever they like — a synced folder, a USB stick, a repository.

## Highlights

- Fuzzy text anchoring re-locates highlights after edition changes and re-flows.
- Matching runs in a Web Worker, so a long document never blocks scrolling.
- No account, no server: state lives in IndexedDB and syncs through a user-controlled file.
