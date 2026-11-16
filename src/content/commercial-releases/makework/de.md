---
title: MakeWork
summary: Eine kostenlose Collaboration-App von BITE Gameworks, die Chat, Anrufe, Aufgaben, Dokumente, Tabellen, Diagramme, Designs, Dateien und Code an einem Ort bündelt, peer to peer synchronisiert und ohne Workspace-Server.
tags: [TypeScript, SolidJS, Electron, Peer to peer]
role: Leitende Entwicklung
year: 2026
url: https://makework.dev/
---

MakeWork ist eine kostenlose Open-Source-App von BITE Gameworks, um gemeinsam Dinge zu erschaffen, entwickelt von Spieleentwicklern, die einfach einen Ort zum Planen, Reden und Bauen wollten.

Ein Workspace besteht aus Kanälen, und jeder Kanal ist ein eigenes Werkzeug: Chat mit Threads und Umfragen, Sprach- und Videoanrufe mit Bildschirmfreigabe, Aufgabenboards, Dokumente, Tabellen, Diagramme, Designs, Dateiordner, Code und Git sowie ein gemeinsamer Browser. Alle Kanäle sind miteinander verknüpft, sodass ein Projekt nicht mehr über zehn verschiedene Dienste verstreut ist.

Es gibt keinen Workspace-Server. Die Mitglieder halten den Workspace als Protokoll signierter Änderungen vor und synchronisieren ihn direkt untereinander, und der Chat ist Ende-zu-Ende-verschlüsselt mit Schlüsseln, die nur die Mitglieder besitzen. Die App funktioniert allein und offline ohne Konto, und wachsende Teams können auf eigener Hardware dauerhaft laufende Nodes hinzufügen, die Dateien verfügbar halten und größere Anrufe ermöglichen.

Code-Kanäle bringen Language Server, Terminals und gemeinsame Ausführungskonfigurationen mit, direkt neben Git-Verlauf, Diffs und Merge-Konflikten. Agenten können eine Anfrage entgegennehmen, sie in Aufgaben aufteilen und diese erledigen, mit einem Modell, das das Team selbst auf einem beliebigen llama.cpp- oder OpenAI-kompatiblen Server betreibt.

MakeWork ist für Windows, macOS, Linux und Android verfügbar und läuft im Browser. Die App ist kostenlos, ohne Abonnements oder Nutzerlimits, und der Quellcode ist unter der GPL-3.0 veröffentlicht.

<a href="https://app.makework.dev" target="_blank" rel="noopener">Im Browser ausprobieren</a> · <a href="https://github.com/BITE-Gameworks/makework" target="_blank" rel="noopener">Quellcode</a> · <a href="https://github.com/orgs/BITE-Gameworks/repositories" target="_blank" rel="noopener">BITE Gameworks auf GitHub</a>

## Highlights

 - Peer-to-peer-Synchronisierung signierter Änderungen, ohne zentralen Server
 - Ende-zu-Ende-verschlüsselter Chat und private Nachrichten
 - Eine Codebasis für Desktop, Android und das Web
 - Selbst hostbare Nodes und Cloudflare Worker für Konten und Relays
 - Plugins, Bots und KI-Agenten mit selbst gehosteten Modellen
