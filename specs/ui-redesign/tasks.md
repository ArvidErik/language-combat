# Tasks: Modern Dark UI Redesign

Implemented one at a time, with a manual in-browser checkpoint after each
before moving to the next. See [spec.md](./spec.md) for the design system
and constraints these tasks must respect.

- [x] **1. Design tokens + global base styles** — Add a `:root`
  custom-properties block (colors/spacing/radius/glow tokens) at the top of
  `style.css`; restyle `html`/`body` background to the dark gradient over
  `bg.gif`; swap hardcoded colors on bare tags (`strong`, `h2`, `h4`) to
  token references.
  *Verify:* page loads with dark backdrop, Start button still clickable,
  arrow/WASD movement still works — no component redesign yet.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **2. Start screen shell + title/subtitle** — Apply neon title glow,
  uppercase/letter-spacing treatment, muted subtitle, dark vignette on
  `#start-screen`.
  *Verify:* title glows, layout/centering unchanged, clicking Start still
  calls `createFighterElements()`.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **3. Shared `.btn` restyle** — Recolor background/border/hover/active
  states of `.btn` to dark-surface + neon glow, keep the existing skew-slide
  hover mechanic just recolored.
  *Verify:* Start, Next Round, and the dynamically-injected "START GAME"
  button all pick up consistent new styling and remain clickable.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **4. Fighter selection cards** — Restyle `.fighter-container` /
  `.fighter` / `.fighter-img` / `h4` as glowing dark cards; replace the
  `.fighter-img:hover` 50→60px jump with a `transform: scale()` transition;
  restyle `.p1-selected` / `.p2-selected` as glowing rings.
  *Verify:* hover is smooth with no layout shift; selecting two fighters
  shows correct red/cyan glow rings and reveals the Start Game button as
  before.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **5. Game-screen HUD/scoreboard** — Reskin `#score-board`,
  `#p1-name`, `#p2-name`, `#p1-score`, `#p2-score` as a dark glowing HUD bar,
  no DOM/ID changes.
  *Verify:* start a match, confirm names populate and scores update
  correctly with new colors.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **6. Arena platform + count-back overlay** — Reskin `#platform`'s
  visual surface while explicitly preserving its 400×400px base size and 2px
  border; restyle `#count-back` as a glowing number/GO! with an optional
  continuous CSS pulse.
  **Risk:** any change to `#platform`'s border thickness or `box-sizing`
  shifts `offsetWidth`, subtly moving the elimination boundary — keep border
  width identical.
  *Verify:* play a full round and confirm players get eliminated at the same
  visual edges as before; count-back still runs 3→2→1→GO!.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **7. Player avatars** — Recolor `.element` / `#p1` / `#p2` borders to
  glowing neon rings using `box-shadow`/`filter: drop-shadow()` (not box-size
  changes), keeping 50×50px + border thickness fixed.
  **Risk:** this is the most physics-sensitive component — any accidental
  width/height/border change here changes collision distances.
  *Verify:* play a round and confirm collision/bounce-back feel matches
  pre-redesign baseline; fighter PNGs remain legible against the new avatar
  background.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **8. End screen** — Reskin `#end-screen` / `#game-over-text` /
  `.game-o-text` as a dark glass/glow panel with gold neon title, keeping the
  existing absolute+transform centering untouched.
  *Verify:* force a game-over (win 2-0, or reach 3 rounds) and confirm the
  panel renders correctly centered with new styling.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **9. Responsiveness & polish pass** — Add media queries for narrower
  viewports (e.g. wrap/shrink `.fighter-container` cards); if `#platform`
  needs to visually shrink on small screens, scale a wrapping container
  rather than the platform's real px size; add CSS-only transitions/fade-ins
  between screens and subtle ambient animations.
  **Risk:** do not resize `#platform`'s actual `width`/`height` px values to
  make it "responsive" — that breaks collision boundary math.
  *Verify:* resize/DevTools-responsive-mode across a few breakpoints (e.g.
  1920/1440/1024), confirm no overlapping UI and the game is still playable.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before starting the next task.

- [ ] **10. Final regression pass** — Full manual playthrough (fighter
  select → multiple rounds → win) confirming scoreboard, platform shrinking,
  elimination/opacity dimming, next-round reset, and end-screen trigger
  conditions all behave identically to the pre-redesign baseline; cross-check
  `style.css` against the token list in `spec.md` for consistency.
  *Verify:* one complete playthrough with keyboard controls (arrows for P1,
  WASD for P2), confirm zero console errors.
  *Commit:* once verified, write a commit message (max 250 words, bullet
  points) summarizing the change and commit before wrapping up.
