---
title: Desktop-like Website
summary: A desktop operating system recreated in the browser with Angular: draggable icons, windows created on demand, and a taskbar that remembers each window's state.
tags: [Angular, TypeScript, DOM]
role: Sole author
year: 2026
url: https://github.com/Frenchiehl2/Desktop-like-Website
---

Recreates a desktop environment as a web page. The desktop is customisable, with icons across it
and a navigation bar along the bottom, and each icon is bound to its own window container that is
built dynamically when the user asks for it rather than declared up front.

The bar keeps the state of individual windows, so one that has been put away comes back as it
was. Icons and windows drag freely, and windows resize the way they would in any desktop.

## Highlights

- Window containers are created dynamically per request, not declared ahead of time.
- The bar persists individual window state and restores it when a window is invoked again.
- Every icon and window is draggable, and windows resize dynamically.
