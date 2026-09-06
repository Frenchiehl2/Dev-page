---
title: This Website
summary: Das Portfolio, das Sie gerade lesen. Angular mit einer Markdown-Inhaltspipeline, durchgängig zweisprachig, und ein von Hand gebautes Designsystem statt eines fertigen Frameworks.
tags: [Angular, TypeScript, CSS, Markdown]
role: Alleinige Entwicklung
year: 2026
url: https://github.com/Frenchiehl2/Dev-page
---

Diese Seite und alles darauf. Angular-22-Standalone-Komponenten, von Signals gesteuert, ohne
UI-Framework und ohne CSS-Framework darunter die Gestaltung ist reines CSS auf Basis von Custom
Properties in einem globalen Stylesheet, der Rest von Angular je Komponente gekapselt.

Die Inhalte stehen nicht im Code. Jeder Abschnitt liest Markdown aus src/content, das zur Bauzeit
als Zeichenkette eingebettet und von einem bewusst kleinen Frontmatter-Parser gelesen wird. Dieser
Parser wirft einen Fehler, statt zu raten: Ein Tippfehler in einer Inhaltsdatei bricht den Build
ab, anstatt stillschweigend einen leeren Abschnitt zu erzeugen.

Die Seite ist durchgängig zweisprachig. Ein Sprach-Signal merkt sich die Wahl zwischen Besuchen,
die Oberflächentexte liegen in einer Tabelle, und zu jedem Eintrag gehören eine englische und eine
deutsche Datei nebeneinander. Ein Sprachwechsel tauscht also den Fließtext und nicht nur die
Beschriftungen.

Das Erscheinungsbild ist gebaut, nicht übernommen: abgeschrägte Flächen per clip-path statt runder
Ecken, eine fast schwarze Palette mit einem orangefarbenen Akzent und einem Magenta-Cyan-Paar auf
den Rändern, eine Filmkorn-Ebene und ein Scroll-Reveal über einen IntersectionObserver.

## Highlights

- Markdown-Inhaltspipeline mit zur Bauzeit geprüftem Frontmatter, sodass fehlerhafte Inhalte
  sofort auffallen.
- Durchgängig zweisprachig, bis hin zu einer eigenen Markdown-Datei je Sprache für jeden Eintrag.
- Die Showcase-Einbettungen laden zuerst ein Vorschaubild und den Player erst beim Klick, statt
  für jedes Video schon beim Seitenaufbau Player-Code auszuliefern.
