# Verification notes

8 October 2026.

- Browser regression: search and HTML attack string; topic/level/impact filters; saved persistence; dark/light and Hinglish-tip persistence; sources; load more; answer toggles and completed quiz.
- No page errors or horizontal overflow at 320, 390, 768 and 1280 pixels.
- Visual inspection of both mobile themes and actual content cards.
- No eval, user HTML, external runtime scripts or command execution. HTTPS reference URLs and bounded, schema-checked local state.
- Examples listed below were checked on disposable local files. Network/services, ownership and signal examples were not run against a real machine; those use manual verification.

Quiz: 14 unique items; one designated correct option per item, explanation and reference on reveal.