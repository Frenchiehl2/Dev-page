---
title: This Website
summary: The portfolio you are reading now. Angular with a Markdown content pipeline, bilingual throughout, and a design system built by hand rather than pulled from a framework.
tags: [Angular, TypeScript, CSS, Markdown]
role: Sole author
year: 2026
url: https://github.com/Frenchiehl2/Dev-page
---

This page and everything on it. Angular 22 standalone components driven by signals, with no UI
framework and no CSS framework underneath the styling is plain CSS built on custom properties in
a single global sheet, with the rest scoped per component by Angular.

Content is not hard-coded. Every section reads Markdown from src/content, inlined as strings at
build time and parsed by a deliberately small frontmatter reader. That reader throws rather than
guessing, so a typo in a content file stops the build instead of quietly rendering an empty
section the whole site fails loudly or not at all.

The site is bilingual end to end. A language signal remembers the choice between visits, interface
strings live in one table, and every entry ships an English and a German file side by side, so
switching language swaps the prose rather than just the labels.

The look is built rather than imported: chamfered panels cut with clip-path instead of rounded
corners, a near-black palette carrying one orange accent and a magenta and cyan pair on the
borders, a film-grain overlay, and a scroll reveal driven by an IntersectionObserver.

## Highlights

- Markdown content pipeline with frontmatter validated at build time, so bad content fails loudly.
- Bilingual throughout, down to a separate Markdown file per language for every single entry.
- The Showcase embeds load a thumbnail first and the player only on click, rather than shipping
  player code for every video on page load.
