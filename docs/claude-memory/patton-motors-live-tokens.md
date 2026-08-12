---
name: patton-motors-live-tokens
description: Measured design tokens and the live inventory API for pattonmotors.com
metadata: 
  node_type: memory
  type: reference
  originSessionId: 172e6685-0851-434d-bb91-89dfb4b74162
  modified: 2026-08-10T23:20:49.020Z
---

Tokens read off the live pattonmotors.com DOM (not eyeballed), 2026-08-10:

| | |
|---|---|
| ground | `#2A2A2A` |
| accent gold | `#CA912B` — also the mid stop of the wordmark gradient in `goldenlogo.svg` (`#644815 → #CA912B → #FFEB0F`), so brand and interface already resolve to one value |
| bone ink | `#EDE9D6` · testimonial cards `#D9D6C9` |
| container | `1400px`, BS4 gutter `15px` → 1370 content |
| pills | radius `90px`, 16px/500 · cards radius `5px` |
| type | Helvetica Neue, self-hosted; body 14px |
| gold H1 | `60px/700/-1.8px`; "Get a Cash Offer" is `100px/85px/-3px` |
| section padding | `50/50`, except the journal at `100/100` |
| section grounds | flat tint over a cover image: routes `.80`, inventory / prestige / cash `.70`, testimonials `.08` |

**Live inventory API — no auth, returns everything:**
`https://www.pattonmotors.com/api/cars` (also `?id=52` for one vehicle).
40 available vehicles with data, 28 sold, 17 marques, 1955–2025, only 8 priced —
the rest are price-on-request. Images come as `/imagetag/{id}/main/f/{slug}.jpg`;
never fabricate that URL shape, consume what the feed gives.

Every inventory photograph is the same shot: one white showroom, same angle,
same lighting. That is a design constraint, not an accident — a layout that
leans on hero photography will collapse on this asset set.

Related: [[patton-motors-redesign]].
