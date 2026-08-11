# Patton Motors — working rules

Collector-car dealer in Pompano Beach: auctions, a floor of ~40 cars, consignment
and a physical room. Static mockup over the AAN WordPress theme, no build step.

**State, the live file and what is next live in [NEXT.md](NEXT.md).** Read it
after this. This file is the standing rules; that one is where the work stands.

## Design DNA governs every visual decision here

**Before any design, layout, CSS, typography, colour, imagery or motion work,
invoke the `design-dna` skill.** It is installed globally and routes to
`/Users/alex/Desktop/WORK/design_dna/TASTE.md` and to whichever taste skill the
task needs. There is no local copy in this folder on purpose — the canonical path
is always current, and a copied folder ages silently.

Do not paraphrase the skills from memory. They carry hard numbers and hard bans,
and a remembered rule is a vague one.

**The mandate is REDESIGN.** The live pattonmotors.com is reproduced faithfully in
`mockup/index.reproduction.backup.html`; that is the thing being redesigned, not
replaced. Carried through untouched: the business's own sentence — *"a bohemian
car place"* — taken off their About page, where it was buried. It is the one line
no competitor can say, and it covers auctions, floor and room at once. It is not
copy to be improved.

Invariants never yield to this project's direction. Dialect rules do, for a stated
reason, said out loud in the report.

## The failure this project is most likely to commit

**A strong opening that never develops into a page.** Both of Alex's `out` records
in the vault fail on exactly that axis, and three separate passes have already
been spent on this hero alone. When in doubt, go **down** the page rather than
back over the top of it — hero → routes → auctions → floor → sell & consign →
why Patton → footer. Auctions sit above inventory because a thing with a clock
outranks a thing without one.

## Facts that cost a day each

**Dark is not a preference.** `EVIDENCE.md` records colour as UNKNOWN, and
darkness sits on approved and rejected records alike. Never reach for a dark
ground as a shortcut to seriousness — derive it or leave it.

**The AAN theme fights back.** Everything written here is an override on a
compiled `style.css`. Bootstrap 4's reboot sets `a:hover{text-decoration:underline}`,
so **both** link states must be named or the underline returns — `anti-patterns`
D5, and Alex catches it immediately.

**Open the vault's images, not only its notes.** Three passes were rejected while
every judgement was quoted correctly and no screenshot had been opened. A note
says what a reference decided; the shots say what it looks like. Both, always.

**Alternating grounds needs one rule, not a rhythm.** Alex wants alternation and
scroll overlays, and his own record `hbbody-com-en-home` explains why they need
each other: without tonal contrast, layering does not register. **Two overlays for
the whole page**, not a transition between every block — that record's central
weakness is repeated intensity leaving no room for silence.

## Imagery, and the line that does not move

`generated-imagery` binds. This is a dealership, so **GI3 is the one that matters
most: nothing synthetic may depict a real Patton car, the real floor, the real
room or a real person.** A generated photograph of a car being sold is a false
statement about that car, made in the medium buyers trust most, and the client
carries the consequence.

Any synthetic frame keeps a `gen-` prefix and a sidecar recording origin, model,
date and subject. An image with no declared origin is the failure mode.

Auction bids, counts and closing times are **sample data and must be marked as
such** wherever they appear.

## Type floor

`--t-micro: 14px` is the functional floor and nothing readable goes below it.
Values live in the token block at the top of `mockup/css/patton3.css`; nothing is
set inline because it looked right in one viewport.
