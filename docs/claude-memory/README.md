# Claude's project memory — for moving between machines

These seven files are what Claude has learned about this project across
sessions. They normally live OUTSIDE the repository, in a folder keyed to the
project's absolute path, which means they do not survive a move to another
computer — the path changes, so Claude looks in a folder that does not exist
and starts from nothing.

They are checked in here so a `git clone` carries them. They are a copy, not
the live location.

## Where they actually go

**macOS / Linux**

    ~/.claude/projects/<slug>/memory/

where `<slug>` is the project's absolute path with every `/` turned into `-`.
For `/Users/alex/Desktop/WORK/PATTON MOTORS` that is
`-Users-alex-Desktop-WORK-PATTON-MOTORS`.

**Windows**

    C:\Users\<you>\.claude\projects\<slug>\memory\

The slug is derived the same way from the Windows path. Rather than guessing
it: open the project in Claude Code once, let it create the folder, then copy
these files into the `memory` folder that appeared.

## What is in them

| File | What it holds |
|---|---|
| `MEMORY.md` | the index. Loaded every session; one line per memory |
| `patton-three-pillars.md` | dealer, auction house and a lounge — and "a bohemian car place", the line the live homepage never uses |
| `patton-motors-live-tokens.md` | tokens measured off the live DOM, and the open `/api/cars` feed |
| `patton-motors-redesign.md` | which file is which, and what state each is in |
| `alex-copy-then-redesign.md` | what "повторяем" means, and how Alex scopes work — read this one before starting anything |
| `patton-vault-hero-register.md` | open the vault's images, not only its notes |
| `aan-dealer-mockups-skill.md` | the AAN stack this mockup has to live inside |

`CLAUDE.md` and `NEXT.md` in the repository root are read automatically and do
not need moving. These add the reasoning behind them.
