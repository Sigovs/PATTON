---
name: alex-copy-then-redesign
description: "How Alex scopes design work — \"повторяем/копируем\" means reproduce 1:1, and he sets scope in small explicit steps"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 172e6685-0851-434d-bb91-89dfb4b74162
  modified: 2026-08-11T21:21:21.195Z
---

When Alex says **"повторяем"** or **"копируем"** about an existing site, he means
*reproduce it faithfully*, not "redo it from scratch". On Patton Motors this was
misread once and cost a full original redesign that had to be parked.

**Why:** he works copy first, then improves on top of a verified reproduction —
so the copy is the baseline both sides can compare against, not a throwaway.

**How to apply:**
- Ask nothing, but treat "повторяем / копируем / один в один" as: measure the
  original's real values off the live DOM and reproduce them. He checks. When he
  asked "проверь всё один в один?" the honest answer was a numeric section-by-
  section table, and that was the right answer — not a claim that it matched.
- He scopes in small explicit moves — "начинаем с hero только", "пока не кодим",
  "просто дубликат для начала". Build exactly that much and stop. Running ahead
  into the next step gets thrown away.
  **This has now happened twice.** On 2026-08-11 a handover note (`NEXT.md`)
  said "go all the way down the page in one pass"; a whole homepage was built
  from it and Alex stopped it with *"мы сейчас должны были закончить только с
  hero"*. A note written in a previous session is not a scope grant — the
  current step is whatever Alex last named out loud, and a plan document only
  says what comes *after* he approves the step in hand. He also asks to be told
  when work stops so he can look: **finish the step, say you have stopped, hand
  it over, wait.**
- Never eyeball a value that can be measured. Computed styles, rendered-pixel
  contrast sampling and element bounding boxes all landed well; guessed
  coordinates and eyeballed colours produced wrong findings twice.
- Deviations from the original — even correct ones like fixing a 2.27:1 button —
  get named out loud and left one line from reversible, never made silently.

See [[patton-motors-redesign]].
