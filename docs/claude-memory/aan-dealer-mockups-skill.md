---
name: aan-dealer-mockups
description: "Ivaylo's AAN dealer-mockup skill — where it came from and the stack it locks"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 172e6685-0851-434d-bb91-89dfb4b74162
  modified: 2026-08-10T23:22:11.852Z
---

`aan-dealer-mockups` is the skill Ivaylo (AAN dev team) gave Alex. It was not
findable by name because it shipped **inside** `aan-dealer-mockups.zip`, in
`WORK/___________---------AAN------DESIGN------SYSTEM/`. Installed 2026-08-10 to
`~/.claude/skills/aan-dealer-mockups/`, so it now auto-loads for any dealer-site
work.

Its stance: **design free-form first, install the theme kit last.** The kit only
governs four things — buttons, colours, fonts, headline types. A mockup that
stays inside the kit's classes is unfinished, not compliant.

Stack it locks (hard rules, no exceptions): Bootstrap **4.0.0** only (`ml-/mr-`,
`data-toggle`, `.custom-select` — no BS5), jQuery 3.7.1 with no Migrate, wrapped
as `jQuery(function ($) { … })`; **Owl Carousel** for every slider; no CDN, no
font hotlinking, no CSS custom properties for theming (the kit is compile-time
Sass); `.container` overridden to 1325px; static markup only, no data wiring.

Two practical notes found the hard way: the bundled Dart Sass needs macOS 14 and
this machine is on 13, so SCSS cannot be compiled locally — ship plain CSS with
the token named in a comment, which the skill explicitly allows. And the theme's
own compiled `assets/css/style.css` ships light defaults, so a dark build needs
ID-qualified overrides like `#header { … }`.

Related: [[patton-motors-redesign]], [[patton-motors-live-tokens]].
