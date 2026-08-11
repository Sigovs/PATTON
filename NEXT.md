# Where this stands — 11 Aug 2026

The homepage redesign is pushed and it is **not right yet**. Alex's verdict:
worse than what it replaced. That verdict is correct, and the reason is
specific, so start here rather than re-reading the code.

## What went wrong

Seen small, as one object, the page is a spreadsheet. Roughly 4,500 of its
11,000 pixels are a bone-coloured list of 34 rows with 124px thumbnails.

The brief asked for the opposite of that, in as many words:

- "The CARS should remain the visual heroes" — the page shows one hero image,
  one lot image, and 39 postage stamps.
- "Photography + typography + spacing should do most of the design work" — what
  is actually doing the work is typography, hairlines and tables.
- Under *Avoid*: "dashboard-looking UI", "too many boxes".

Three more faults, in order of how much they cost:

1. **The register ate the page.** It is a good device for an inventory page and
   the wrong one for a homepage. It was kept because it elegantly solved the
   problem that every inventory photograph is shot from the same point in the
   same room — which is a designer falling for a mechanism and letting it take
   the position the subject should hold.
2. **The same red 250 GTO appears twice**, large, inside the first two screens —
   once as the hero, once as the featured lot. A repeat, not a system.
3. **The tonal rhythm is flat.** Dark, dark, one enormous bone slab, dark, dark.
   At that scale the panel stopped reading as a document inset into a page and
   became merely a light section. The device died of size.

## The correction, agreed but not built

The homepage becomes an **edit, not an index**.

- Move the 34-row register to the inventory page, where it belongs.
- Homepage shows **three live lots and five or six cars from the floor**, each
  at full width or near it — big photography, large type over or beside it, real
  air between. Eight or nine cars instead of forty, but at the size of a screen.
- "All auctions" and "Search the full inventory" carry the rest.
- Different vehicle in the hero than in the featured lot.

One question was left open and needs Alex's answer before the rebuild:

> Does the homepage show **few cars, large** (the recommendation), or must the
> first screen make it obvious there are forty of them — which needs a different
> device, but not a table.

## Files

| | |
|---|---|
| `mockup/index.html` | the redesign as it stands — vanilla, no framework, opens by double-click |
| `mockup/css/patton-marketplace.css` | the whole system; the organising rules are written at the top of the file |
| `mockup/build-home.mjs` | generator — reads `assets/cars.json`, emits the page. **Auction bids, bid counts and closing times are sample data** and are marked as such in the file. Vehicles are real stock. |
| `mockup/index.reproduction.backup.html` | the faithful copy of the live site, before any redesign |
| `mockup/index2.html` | an intermediate Bootstrap-based pass, superseded — safe to delete |

Run it: open `mockup/index.html`, or `python3 -m http.server` in `mockup/`.

## Two things that are right and worth keeping

- **The two-weight headline** — a heavy grotesque line answered by a thin one,
  taken from Alex's own unused sketches. No serif anywhere near it.
- **The colour logic** — gold is money and nothing else; LIVE never rides on
  colour alone. The wordmark gradient supplies money for both grounds:
  `#CA912B` reads 6.72:1 on ink but 2.40:1 on bone, where `#644815` reads 7.37:1.

Verified on the current build: no horizontal overflow at 375 or 1425, smallest
functional text 14px, minimum tap target 44px, nothing hidden on mobile.
