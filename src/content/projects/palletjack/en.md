---
title: Palletjack
summary: A build-cache proxy for monorepos. Sits between CI runners and remote storage, cutting cold-start build times on a 200-package workspace from eleven minutes to under two.
tags: [Node, TypeScript, Redis, Docker]
role: Lead developer
year: 2023
---

CI runners in a large monorepo spend most of their time rebuilding packages that nobody changed.
Palletjack sits in front of the remote cache and serves artefacts from a warm local tier, falling
back to object storage only on a genuine miss.

It was built after measuring where the eleven minutes actually went: not compilation, but
thousands of small round trips to remote storage. Batching those and keeping a hot Redis tier
close to the runners removed most of the wall-clock time.

## Highlights

- Cold-start builds on a 200-package workspace dropped from ~11 minutes to under 2.
- Content-addressed keys make cache poisoning between branches structurally impossible.
- Drop-in: runners point at a different URL, no build-tool configuration changes.
