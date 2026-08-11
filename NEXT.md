# Patton Motors — where this stands

Updated 11 Aug 2026. Read `CLAUDE.md` first; this is the state, that is the
rules. The memory files under the project's `memory/` folder load automatically.

## The live file is `mockup/index3.html`

| File | What it is |
|---|---|
| **`mockup/index3.html`** | **the work.** The whole page, hero to footer. |
| `mockup/css/patton3.css` | its stylesheet, vanilla, loaded after the AAN theme's compiled `style.css` |
| `mockup/index.html` | an earlier marketplace redesign Alex rejected |
| `mockup/index.reproduction.backup.html` | a faithful copy of the live pattonmotors.com |
| `mockup/index2.html` | an intermediate Bootstrap pass, superseded |

Everything is committed and pushed. Last commit `ffb14aa`.

Serve it: `cd mockup && python3 -m http.server 8787` → http://localhost:8787/index3.html
Note: that server lets the browser cache `patton3.css` aggressively. After a CSS
edit, force a reload or the measurements you take will be of the previous file.
That cost a wasted measurement pass on 11 Aug.

## What is built

Six masses, in this order, per the compiled brief at
`design_dna/projects/briefs/patton-motors.md`:

```
hero (film, untouched)  ·  routes  ·  BLOCK  ·  held frame + seam 1
floor  ·  sell & consign  ·  why Patton  ·  room + seam 2  ·  footer
```

**The compositional centre is the auction block, not the hero.** It dominates by
four mechanisms, none of them size alone: it is the last and largest mass of the
dark chapter, it owns the page's only accent, it carries the only moving element
after the film, and it culminates in the one oversized number the page allows.

**The second ground is derived, not chosen.** `--floor: #E2E0D7` is the measured
mean of the lower 12% of eight inventory photographs — the reflective floor all
forty cars stand on. The dark ground is corroborated by the upper 8% of the same
frames and by the brand's own `#2A2A2A`. Never restate this as a preference; it
is a measurement, and `EVIDENCE.md` still records colour as UNKNOWN.

**Two ground changes, two seams**, and the seams are `position: sticky` layout
rather than script. They release below 992px.

**One card component** for auctions and for the floor, separated only by the data
plate: state + bid + time against an asking price. A car on the block is not on
the floor.

## Open — five spacing corrections, found and NOT yet applied

Found by auditing the shipped page against `skills/spacing-taste/SKILL.md`, which
had been paraphrased from memory rather than read. All five are real:

1. **D4 violated.** `--gutter: clamp(20px, 3vw, 40px)` gives 20px at every width
   below ~800px; the floor is 24px. It was reported as a yield "on 320px", which
   was false — it is 20px at 390 too, where the yield condition plainly does not
   hold. → `clamp(24px, 3vw, 40px)`.
2. **I1 violated.** The skill gives a six-relationship stack component and says
   to set it as a component, not by hand. Two stacks shipped with UNIFORM gaps:
   `.pm-room__inner` at 24px across eyebrow→h2→lead→link, and `.pm-card` at 16px
   across media→key→title→sub→plate, patched with a `-6px` nudge.
3. **I2 violated.** Sixteen off-scale values in the stylesheet; the ones added in
   this pass are `2px`, `6px`, `7px`, `9px`, `10px`. The scale is 4px-based.
4. **D3 violated.** `.pm-note` measures 92ch against the 65–75ch cap. Everything
   else measured clean — the plates are 52ch, step bodies 47ch.
5. **D1 unmet.** The checklist wants at least one hesitated call resolved to the
   larger step, named in the report. The section-head margin was 80 vs 112 and
   took the smaller, unnamed.

## Verified, and worth not re-deriving

- 37 flat text/ground pairs measured against their real composited ground; all
  pass, tightest is the sample-data note at 5.74:1.
- The room's text is over a photograph, so it was screenshot-sampled, not
  computed: 6.49:1 after pulling the measure to 38ch. The first setting was
  4.55:1, which is over the line by 0.05 and would not survive a recrop.
- No horizontal overflow at 1440, 390 or 320. Nothing readable below 14px. Every
  tap target at or above 44px.

## Things that cost a day, so they do not get relearned

- **Open the vault's images, not only its notes.** Three passes were rejected
  while every judgement was quoted correctly and no screenshot had been opened.
- **Read the taste skills, do not paraphrase them.** The five items above are
  entirely the cost of having summarised `spacing-taste` instead of opening it.
- **Dark is not the preference.** `EVIDENCE.md` C2e — darkness sits on approved
  and rejected records alike.
- **The AAN theme fights back, and inheritance is not an override.** The compiled
  base sets its own `h2` and `p` colours, so a heading relying on `body { color }`
  renders near-black on near-black. Name the colour on both grounds. Bootstrap 4's
  reboot also sets `a:hover{text-decoration:underline}`, so both link states must
  be named.
- **Scope is whatever Alex last named out loud.** A plan in this file is not a
  scope grant. Finish the step, say you have stopped, hand it over, wait.
