---
title: Local LLM
summary: Ein Inferenz-Rechner aus ausgemusterten AMD-Grafikkarten, der llama.cpp unter Docker betreibt parallelisiert über mehrere Karten oder von einer einzelnen aus.
tags: [llama.cpp, Docker, Vulkan, ROCm, Linux]
role: Alleinige Entwicklung
year: 2026
url: https://github.com/Frenchiehl2/Local_LLM
---

Macht aus Hardware, die sonst verschrottet würde RX-570 und RX-470-Karten auf einer
DDR3-i5-Plattform einen lokalen LLM-Server. Das Ausliefern übernimmt llama.cpp, gewählt wegen
seiner Hardwarekompatibilität und der Parallelisierung über mehrere Karten.

Ausgeliefert wird es als Docker-Skripte statt als Build: ein Vulkan-Pfad für Aufbauten mit
mehreren GPUs, ein ROCm-Pfad für eine einzelne Karte und ein Autostart-Skript für eine Maschine,
die häufig ein- und ausgeschaltet wird. Die Modelle stammen von Hugging Face und werden entweder
außerhalb des Containers oder in ihm verwaltet.

 Docker-Skripte können entweder im Terminal ausgeführt oder dorthin kopiert werden. Laden Sie einfach die für Ihre Konfiguration gewünschte Version herunter und führen Sie sie aus. Füllen Sie gegebenenfalls die Felder aus.

  -<code>llama-vulkan.sh</code> für Multi-GPU-Konfigurationen<br>
  -<code>llama-rcom.sh</code> für eine Konfiguration mit einer einzigen GPU<br>
  -<code>docker-start.sh</code>sollte als Autostart eingerichtet werden, falls der Rechner häufig ein- und ausgeschaltet wird<br>

Sie können über folgenden Befehl auf den Docker-Container zugreifen:

  ```javascript
  sudo docker ps
  sudo docker exec -it <containerID> /bin/bash
```

## Highlights

- Vulkan-Backend für mehrere GPUs, ROCm für eine einzelne Karte passend zum Aufbau gewählt statt ein Build für alles.
- Läuft vollständig in Docker, sodass das Host-System sauber bleibt und die Maschine ohne Umstände neu gestartet werden kann.
- Ausgelegt auf Hardware jenseits ihres Wiederverkaufswerts statt auf aktuelle Karten.
