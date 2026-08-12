# Patton Motors — where this stands

Updated 12 Aug 2026. Read `CLAUDE.md` first; this is the state, that is the
rules. The memory files under the project's `memory/` folder load automatically.

## The live file is `mockup/index7.html`

| File | What it is |
|---|---|
| **`mockup/index7.html`** | **the work.** v7 — the Halo system, adapted to Patton. |
| `mockup/css/patton7.css` | its stylesheet, its own token system |
| `mockup/index6.html` · `css/patton6.css` | v6 — Oswald/Roboto Condensed, state pills, the finishing pass. Superseded on type and card grounds, not wrong. |
| `mockup/index5.html` · `css/patton5.css` | v5 — the one 12-column master grid the later versions inherit |
| `mockup/index4.html` · `css/patton4.css` | v4 — the page recomposed for rhythm |
| `mockup/index3.html` · `css/patton3.css` | v3 — the six masses; the palette derivations were made here |
| `mockup/index.html` | an earlier marketplace redesign Alex rejected |
| `mockup/index.reproduction.backup.html` | a faithful copy of the live pattonmotors.com |
| `mockup/index2.html` | an intermediate Bootstrap pass, superseded |

Serve it: `node <scratch>/serve.mjs "…/PATTON MOTORS/mockup" 8788`
→ http://localhost:8788/index7.html — there is no python on this machine.
The server sends `cache-control: no-store`, so a CSS edit is visible on reload.
That was not true of the old `python -m http.server` and it cost a measurement
pass on 11 Aug.

## The AAN theme is currently OFF

The stylesheet link to `assets/css/style.css` in `index7.html` is commented
out at Alex's instruction (12 Aug). The page loads exactly two stylesheets —
Google Fonts and `patton7.css` — and stands on its own. **Uncommenting that
one line restores it**; every override written against the theme is still in
the stylesheet and still correct, so nothing has to be rebuilt either way.

While it was on it cost three separate bugs, all the same shape: a theme or
reset selector outranking a component one. The fixes are still in place and
are listed under the bugs section below.

## What v7 is

**Donor: halorentals.com.au, read as a system rather than an appearance.**
Adopted: one accent that means ACTION and nothing else; a card whose photograph
outranks its chrome; filter pills as the way a large parc is entered; image-led
route cards with a translucent information layer; density as evidence of stock.
Rejected and why, in the build report — chiefly the yellow, the licensed face,
the price-dependent card foot, and the solid button repeated on every card.

Nine masses, in this order:

```
hero (film) · claim + stepped frames · LIVE AUCTIONS · the floor (light)
routes · sell & consign · why Patton (dark) · the room (bleed) · says · footer
```

**The compositional centre is still the auction**, and the centre that governs is
the centre of ACTION, not the semantic one: the page's only time-limited act is
registering to bid.

**Two type voices, six roles.** Anybody at wdth 125 carries display AND data —
its tabular figures at width read as an instrument, which is the systemic job a
mono face would otherwise be added for. Archivo at wdth 100 carries language.
Chosen against Archivo Expanded and Saira Expanded in a proof on this page's own
words. **Always name both axes** — `font-variation-settings: "wdth" X` alone
resets `wght` to the axis default, which silently renders a 700 line at 400.

**The accent is re-derived from the logo file.** `--gold: #E5A83D` is the mean of
the logo's modal stop `#CA912B` (26 of 88) and its own light stop `#FFBE4F`. The
modal stop alone sits inside the fleet's amber band and competes with the bronze
already in the photography. Green is demoted to one meaning: a lot live right
now, carried by a 7px dot and the word.

**Grounds are measured, not chosen.** Darkest 8% across 38 real frames = `#160B0D`,
held at a third of its chroma → `--ground: #120E0F`. The lit floor in the lower
third = `#D2CBC3`, lifted at the same hue → `--paper: #EFECE6`.

## Verified on the render, not asserted

- 40 flat text/ground pairs measured against their real composited ground. All
  pass AA. Tightest is the floor eyebrow at **4.69:1** (14px).
- Nine over-image runs measured against the **brightest pixel of the actual
  photograph** behind each. Hero headline 8.34, hero lead 15.72, hero eyebrow
  6.33, room headline 5.04, room paragraph 10.14, four route labels 7.06–9.97.
- The route labels **failed at 3.67–4.09:1** on the first measurement. Fixed at
  the background layer: the frosted panel went 0.62 → **0.78**, which is a
  measured minimum, not a taste value.
- No horizontal overflow at 1440 or 390. Nothing readable below 14px. Every tap
  target at or above 44px.
- Reduced motion: with `.m-on` removed, **zero** elements keep a hidden start
  state, and the countdown still runs.

## Three bugs that cost real time — do not reintroduce

- **A `clip-path` mask on the observed element is a reveal that can never
  fire.** An element clipped to zero width is reported as not intersecting, so
  the auction's featured photograph never appeared. The clip belongs on the
  inner `img`, never on the node the IntersectionObserver watches.
- **`min-height` plus `aspect-ratio` drives WIDTH.** `min-height: 560px` on the
  auction figure with the mobile `aspect-ratio: 16/10` made it 896px wide and
  took the document into horizontal scroll at 390. Release the min-height in the
  mobile rule.
- **CSS grid auto-placement is sparse and will not backtrack.** In Why Patton the
  proof column landed in a row of its own and left a 360px hole beside the
  photograph. Place the rows explicitly, and release them in the one-column rule.

## Things that cost a day, so they do not get relearned

- **The AAN theme fights back, and an ID beats a class.** `#header { background:
  #fff }` in the compiled base rendered the whole header white. `#header.hdr` is
  the one selector in `patton7.css` written at ID strength, on purpose.
- **Do not reset `font-weight` on `h1–h4` in a type-plus-class selector** — it
  outranks `.disp` and flattens every display line.
- **Open the vault's images, not only its notes.** `semlerpremium-dk-showroom`
  (r3, in) is the card reference; `rmsothebys-com` (r1, out) is the anti-reference
  and the closest record to this brief.
- **Dark is not the preference.** `EVIDENCE.md` C2e — darkness sits on approved
  and rejected records alike. Both grounds here are measured.
- **Scope is whatever Alex last named out loud.** A plan in this file is not a
  scope grant.

## Open, and deliberately not done

- `car-54` (Bugatti Mistral) and `car-78` (Bugatti Baby II) are **"COMING SOON"
  placeholder frames**, not photographs. They are excluded from the homepage and
  must stay excluded until real images exist.
- Auction bids, bid counts, reserves and closing times are still **sample data**
  and still marked as such. The vehicles and their photographs are real.
- `assets/extra/` holds 13 portrait frames Alex supplied on 12 Aug. Four are in
  use on the route cards. They carry no per-car attribution, so they are used
  only where the image illustrates a route — never where a specific priced
  vehicle is claimed.
- The three testimonials are Patton's own published copy. Note that their live
  site ships the **same body text under two different attributions** (Rachel M.
  and Jonathan M.); v7 quotes a different verbatim sentence from that shared body
  for each, rather than printing the duplicate twice.
