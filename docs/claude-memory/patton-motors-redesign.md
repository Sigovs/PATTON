---
name: patton-motors-redesign
description: "State and workflow of the Patton Motors homepage project — copy first in index.html, redesign in index2.html"
metadata: 
  node_type: memory
  type: project
  originSessionId: 172e6685-0851-434d-bb91-89dfb4b74162
  modified: 2026-08-10T23:20:38.972Z
---

Patton Motors (pattonmotors.com, Pompano Beach FL, founder Martin Patton) —
collector-car dealer running the AAN `aanWordpress` theme. Work started
2026-08-10 in `/Users/alex/Desktop/WORK/PATTON MOTORS/mockup/`.

The agreed order is **copy first, redesign second**:

- `index.html` — faithful reproduction of the live homepage, plus an invariant
  layer (directional scrims, AA-safe primary button). Measured: 6 of 8
  text-over-photo pairs failed WCAG AA on the live design; 0 fail after.
- `index2.html` — byte-identical duplicate of `index.html`, reserved for the
  redesign. Not started — Alex said "пока не кодим".
- `.index.copy.bak` / `css/.patton.copy.bak` — the pure copy before the
  invariant layer, kept for before/after comparison.
- Both HTML files still share `css/patton.css`; the redesign needs its own
  stylesheet on day one or edits will leak into the copy.

Declared Design Read for the redesign: mandate REDESIGN (carriers fixed —
gold wordmark + "Buy / Sell-Trade" lockup, #CA912B, graphite #2A2A2A,
Helvetica Neue, 90px pills, all photography and both films); style mode PURE
[[auction-editorial]]; dimensionality SUPPORT.

See [[patton-motors-live-tokens]] and [[aan-dealer-mockups-skill]].
