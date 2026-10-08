# Test notes - 8 October 2026 expansion

Automated Playwright checks (headless Chromium) passed on local files and again on the live GitHub Pages URLs:

- Initial progressive render (12 cards) and Load more (24)
- Dynamic header counts match data.js exactly
- Search with XSS string renders zero injected nodes
- Topic filters including Security (LinuxReady)
- Bookmark save, reload persistence, clear local data
- Theme and Hinglish toggle persistence
- Quiz: full 10-question run, exactly one correct option highlighted per question
- Sources view lists 73 (LinuxReady) / 124 (CommandDeck) unique reference links
- No horizontal overflow at 320/390/768/1280px
- No page errors

Content accuracy: quiz answers and Q&A text reviewed line by line against the linked manuals; ambiguous claims were qualified (e.g. merged-/usr, GNU find -size rounding, set -e exceptions, killall/pkill overlap). Command examples derived from opened manual pages; network/service-changing examples are manual-checked, not executed against a real server.
