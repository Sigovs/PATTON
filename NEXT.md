# Patton Motors — where this stands

Updated 11 Aug 2026, at the end of a long session. Read this first; the memory
files under the project's `memory/` folder load automatically and carry the
reasoning behind it.

## The live file is `mockup/index3.html`

Everything else is history:

| File | What it is |
|---|---|
| **`mockup/index3.html`** | **the work.** Header + full-screen video hero + a four-route band. Nothing below that yet. |
| `mockup/css/patton3.css` | its stylesheet, vanilla, loaded after the AAN theme's compiled `style.css` |
| `mockup/index.html` | an earlier marketplace redesign Alex rejected — the register ate the page |
| `mockup/index.reproduction.backup.html` | a faithful copy of the live pattonmotors.com |
| `mockup/index2.html` | an intermediate Bootstrap pass, superseded |

**Uncommitted.** The last commit predates the whole hero. Everything from the
full-screen hero onward exists only in the working tree — commit early in the
next session.

## The hero, as it stands

Full-bleed video (`assets/video/hero_large.mp4`, 26 MB — Alex re-encoded it down
from 870 MB), header floating over it, and centred inside the frame:

```
POMPANO BEACH, FLORIDA
A BOHEMIAN CAR PLACE          ← tracked light caps, 0.13em
Collector cars on the floor. Four on the block this week.
[ DISCOVER ]
```

Then a band of four routes, each carrying a live fact rather than a label:
Auctions (4 live + countdown) · The floor (40 cars) · Sell & consign · The room
(open Saturday 9–1).

The headline is **Patton's own sentence**, taken off their About page where it
was buried. It is the one line no competitor can say and it covers all three
pillars at once.

## What is next

Go down the page, and go **all the way down in one pass**. Both of Alex's `out`
records in the vault fail on the same axis — a strong opening that never
develops into a page — and three separate passes were spent polishing this hero
alone. That is the same failure.

Order: hero → routes → **auctions** → the floor → sell & consign → why Patton →
footer. Auctions go above the inventory because a thing with a clock outranks a
thing without one.

Auction content is simulated from real stock (`assets/cars.json`, the live
`/api/cars` feed). The mechanics Alex supplied, from an NFI reference:
buying = Register to Bid / Bidding / Winning; selling = Submit your Vehicle /
Final Approval / Go Time. **Bids, counts and closing times are sample data and
must be marked as such.**

Cards, not a register. Same component for auction and inventory, distinguished
by the data plate: state + bid + time versus asking price. A car on the block is
removed from the floor.

## Things that cost a day, so they do not get relearned

- **Open the vault's images, not only its notes.** See the memory file
  `patton-vault-hero-register` — three passes were rejected while every
  judgement was quoted correctly and no screenshot had been opened.
- **Dark is not the preference.** `EVIDENCE.md` C2e: two `in` records are dark
  and so is the rating-1 `out`. Darkness does not discriminate.
- **The AAN theme fights back.** Everything written is an override. Bootstrap 4's
  reboot sets `a:hover{text-decoration:underline}`, so both states must be named
  or the underline returns — an anti-pattern Alex catches immediately.
- **Alternating section grounds is not decoration if it has one rule.** Alex
  wants alternation and scroll overlays. His own vault record `hbbody-com-en-home`
  explains why they need each other: without tonal contrast, layering does not
  register. Two overlays for the whole page, not a transition between every block.

## Session note

`Bash` was blocked by a safety classifier for the remainder of the previous
session, which is why this handover exists. A fresh session clears it.
