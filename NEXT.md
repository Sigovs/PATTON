# Patton Motors — where this stands

Updated 12 Aug 2026. Read `CLAUDE.md` first; this is the state, that is the
rules. The memory files under the project's `memory/` folder load automatically.

## PARKED — with the client, waiting on approval

**Both v6 and v7 are finished to review standard and both are pushed.** Work
stopped here on 12 Aug at Alex's word: *"sohranjaemsja poka. zhdem ot klienta
approval."* Nothing is half-done and nothing is uncommitted — `main` and
`origin/main` are level at `e6acf52`.

**Do not start the next pass on either file until the client comes back.**
Which of the two survives is the client's decision, not a design one, and
polishing the losing candidate is the specific way this project wastes a day.
When the answer arrives, the open items are listed at the bottom of this file.

Two candidates, not a version and its predecessor:

| Candidate | What it is |
|---|---|
| `mockup/index7.html` · `css/patton7.css` | v7 — the Halo system adapted to Patton. Anybody + Archivo, gold accent, image-led cards, nine masses. |
| `mockup/index6.html` · `css/patton6.css` | v6 — Oswald / Roboto Condensed. Its hero is the more resolved of the two: the film runs full-screen, the four route cards stand on it with no plate, and the band clears the fold at every height. |

The rest are history, in order:

| File | What it is |
|---|---|
| `mockup/index5.html` · `css/patton5.css` | v5 — the one 12-column master grid both candidates inherit |
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

## The last thing done to v6, so the reasoning is not lost

Two passes on 12 Aug, both on the hero, both at Alex's direction:

- **The eyebrow is gone**, the sentence runs wide on two authored lines, and
  hover on a route card is a 2px rule that grows from a short mark to the full
  card width — replacing a darkening plate, on a band whose whole argument is
  that the cards stand on the film with nothing behind them.
- **The band clears the fold by 48px** at desktop, 24 below 800px of height, 8
  on a phone. The room came from the card's own type: label 15 → 14, value
  28 → 20.

**One real bug was behind all of it, and it will come back if the routes are
ever moved again.** When the strip became a child of the hero, the descendant
selector `.pm6 .hero .g12` started matching the routes' own grid and handed it
the hero's 166px top clearance — 166px of empty film between the buttons and
the cards, which no amount of spacing work would have fixed. It is now written
`.pm6 .hero > .g12`. **Child combinator, not descendant**, for anything scoped
to the hero's own grid.

**A judgement left open on purpose:** the card value went 28 → 20 because
`--t-lead` is the only step below `--t-mid` in the scale. That is a 29% drop
where Alex asked for "a little". It reads well against the 14px label, but if
he wants it nearer the old weight the honest fix is a named step at 24 — not a
one-off number in a rule.

`--t-floor: 14px` is now named, and has exactly one occupant: the four route
labels. **A second occupant means it has become a rank and should be argued
again**, not quietly reused.

## When the client answers

- If **v7** wins: the S-Klub badge still sits on its own line beneath the
  buttons rather than beside them. Shortening or dropping "Exclusive US dealer"
  is the fix Alex has already been offered.
- If **v6** wins: the AAN theme is still linked in `index6.html` — v7 is the
  one running with it commented out. Decide which way that goes before any
  further CSS is written against it.
- Either way: `docs/claude-memory/*.md` still needs copying into the Windows
  `.claude/projects/<slug>/memory/` folder after the first run there, and
  `~/.local/bin/gh auth login` is Alex's to run, not mine.
