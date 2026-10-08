# LinuxReady

Mobile-first static Linux learning site by Akash Vishwakarma. 35 curated entries with source links.

## Features
English technical content, optional Hinglish guidance, dark/light modes, search, topic filters, local bookmarks, clear local data. 14 explained quiz questions and 35 Q&A/scenarios.

## Content and safety
Original summaries based on linked manuals, not copied interview-answer collections. Common admin reference, not an exhaustive Linux encyclopedia. Distribution/package versions differ. Examples do not execute in the browser. Use a disposable lab and check paths, privileges, service names and backups before running them. Root/destructive actions are labelled. Commands requiring services/network were source-checked, not executed on a live server.

No accounts, third-party scripts, telemetry or external runtime dependencies. Strict meta CSP; user search values never become HTML. Local state is schema checked. GitHub Pages cannot set arbitrary response headers. No site is guaranteed attack-proof.

## Run
Serve this directory with `python3 -m http.server 8080` then open localhost:8080. GitHub Pages serves main branch root.

## Source coverage
See SOURCES.md and the per-entry links. Documentation reviewed 8 October 2026.

## Maintenance
Edit data.js to add reviewed entries, preserving unique IDs and source links. Keep risky examples labelled; rerun browser and content checks before publication.
