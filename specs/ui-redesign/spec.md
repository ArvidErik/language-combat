# Spec: Modern Dark UI Redesign

## 1. Overview / Goal

Give Language Combat a modern, dark, game-like visual identity — neon accents,
bold fighting-game feel — through CSS/asset changes only. No gameplay,
physics, DOM-structure, or event-wiring changes.

## 2. Non-Goals / Constraints

- No changes to game rules, scoring, movement, collision, or the game loop in
  `game.js` / `player.js`.
- No build tooling introduced (no bundler, no npm). Plain CSS/HTML/JS stays
  plain.
- No inline `style="display:none"` → CSS class cleanup in this pass (declined
  for this iteration to keep the change CSS/HTML/asset-only).
- No external network requests (no font CDNs, no image CDNs) — page stays
  fully offline-capable.
- Preserve every DOM ID/class that JS queries or creates:
  `#title`, `#sub-title`, `#count-back`, `#p1-name`, `#p2-name`, `#p1-score`,
  `#p2-score`, `#next-round-btn`, `#start-btn`, `#platform`, `#start-screen`,
  `#game-screen`, `#end-screen`, `#game-over-text`, `.fighter`,
  `.fighter-img`, `.fighter-container`, `.p1-selected`, `.p2-selected`,
  `.start-game-btn`, `.btn`, `.element`, `#p1`, `#p2`.
- **Physics-critical sizes must not change.** `#platform` must keep its base
  400×400px content box and 2px border (`game.js` hardcodes
  `platformWidth`/`platformHeight = 400` on reset, and `player.js
  checkLimit()` reads `platform.offsetWidth`/`offsetHeight` for boundary
  checks). `.element`/`#p1`/`#p2` must keep their 50×50px box and existing
  border thickness (`game.js collissionDetection()` derives collision radius
  from `element.offsetWidth`). Any visual emphasis on these elements
  (glow, rings, etc.) must use `box-shadow`, `filter: drop-shadow()`, or
  `outline` — never `width`/`height`/`border` changes that alter
  `offsetWidth`/`offsetHeight`.
- Maintain or improve responsiveness (currently there are zero media
  queries).

## 3. Visual Design System

### Color palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-void` | `#05070d` | page base background (under `bg.gif` overlay) |
| `--bg-surface` | `#11141c` | scoreboard bar, end-screen panel |
| `--bg-surface-raised` | `#181c27` | fighter selection cards, platform floor |
| `--accent-p1` | `#ff3860` | Player 1 neon red/crimson (name, score, avatar ring, selection glow) |
| `--accent-p2` | `#2ee6ff` | Player 2 neon cyan (name, score, avatar ring, selection glow) |
| `--accent-gold` | `#ffcc33` | primary CTA/button accent, "GAME OVER" title, win highlights |
| `--accent-violet` | `#b46cff` | count-back glow, sparing decorative accents |
| `--text-primary` | `#f2f4f8` | headings, primary copy |
| `--text-muted` | `#8a93a6` | subtitles, secondary copy |
| `--line` | `rgba(255,255,255,.08)` | hairline borders on dark panels |

### Glow/shadow tokens

```
--glow-p1: 0 0 12px rgba(255,56,96,.7);
--glow-p2: 0 0 12px rgba(46,230,255,.7);
--glow-gold: 0 0 16px rgba(255,204,51,.6);
```

### Typography

System font stack only (no new font files, no CDN):
`-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
Made to read as "game-y" via uppercase transform, wide letter-spacing
(`0.05em`–`0.12em`), bold weights, and neon `text-shadow` glows on titles
and buttons.

### Spacing scale

```
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;  --space-4: 16px;
--space-5: 24px; --space-6: 32px; --space-7: 48px;  --space-8: 64px;
```

### Radius scale

```
--radius-sm: 6px; --radius-md: 12px; --radius-lg: 20px; --radius-pill: 999px;
```

## 4. Component-level treatment

- **Start screen** (`#start-screen`): darken the existing `bg.gif` overlay
  gradient to a near-black vignette (`--bg-void` based); keep the existing
  flex-centered layout untouched.
- **Title/subtitle** (`#title`, `#sub-title`): uppercase, wide
  letter-spacing, gold/mixed neon `text-shadow` glow on the title; muted gray
  subtitle.
- **Buttons** (`.btn`, shared by `#start-btn`, `#next-round-btn`, and the
  dynamically-injected `.start-game-btn`): dark surface background, glowing
  accent border (gold by default); keep the existing uiverse.io skew-slide
  hover mechanic, recolored to neon tones; hover/active states intensify glow
  rather than jump-scale.
- **Fighter selection cards** (`.fighter-container`, `.fighter`,
  `.fighter-img`, `h4`): each `.fighter` becomes a dark glowing card
  (`--bg-surface-raised`, `--radius-md`, hairline border). Replace the
  current jarring `.fighter-img:hover { width/height 50→60px }` jump with a
  smooth `transform: scale(1.15)` + `transition` (fixes existing jank).
  `.p1-selected`/`.p2-selected` become glowing colored rings
  (`box-shadow`/`outline` in `--accent-p1`/`--accent-p2`) instead of flat 2px
  borders.
- **Scoreboard/HUD** (`#score-board`, `#p1-name`, `#p2-name`, `#p1-score`,
  `#p2-score`): reskinned as a dark HUD bar; P1 text in `--accent-p1` with
  glow, P2 in `--accent-p2` with glow, "vs" muted/small-caps.
- **Platform/arena** (`#platform`): reskin the floor visually
  (radial-gradient dark surface, neon rim glow via `box-shadow`, optional
  decorative grid texture via a `::before` pseudo-element so it adds zero box
  size) while keeping the literal 400×400px + 2px border footprint untouched.
- **Player avatars** (`.element`, `#p1`, `#p2`): recolor borders to glowing
  neon rings per player color, add `filter: drop-shadow(...)` for emphasis;
  keep 50×50px box and border thickness untouched; keep background near-white
  so the transparent-PNG fighter art stays legible.
- **End screen** (`#end-screen`, `#game-over-text`, `.game-o-text`): replace
  the flat `#ecd448` box with a dark glass/glow panel (`--bg-surface` +
  neon gold rim), big glowing uppercase "GAME OVER" title, muted subtitle;
  keep the existing absolute + `translate(-50%,-50%)` centering mechanism.
- **Count-back overlay** (`#count-back`): large glowing number/GO! text
  (gold or violet neon `text-shadow`), optionally a continuous CSS pulse
  animation (JS only toggles `textContent`/`display`, not classes, so a pure
  CSS animation is safe).

## 5. Acceptance Criteria

- All IDs/classes listed in section 2 are still present and wired correctly.
- A full playthrough (fighter select → 2–3 rounds → win) behaves identically
  to the pre-redesign baseline.
- No console errors.
- Page still loads with zero external network requests.
- `#platform` remains exactly 400×400px content box with its original border
  thickness; `.element`/`#p1`/`#p2` remain exactly 50×50px with original
  border thickness.
