# Prototype 1: Player and Plants

Smallest real build. Not a tech demo — the core interaction loop of the farm game wearing placeholder skins.

## Scope (tonight)

A green player square moves freely over a gridded world. Plants (colored circles) populate random cells. Clicking a plant clears it — but only when the player is adjacent. Clear all plants to win. Press 'p' for terminal Game Over.

## Player

- Green square.
- Free continuous movement (velocity, not grid-stepping). WASD.
- Diagonals allowed (free movement makes this the natural default).
- Clamped to world bounds.
- Larger than one cell is fine; can overlap multiple cells at once.

## World / Grid

- White background, visible gridlines.
- Fixed cell size. Grid dimensions (number of cells) scale to window size, computed **once at load**. Live resize ignored.
- Grid is the world's coordinate system, not a track the player rides on. The player queries it ("which cells am I touching"); it does not constrain player position.

## Plants

- A random number of plants spawn at game start, each occupying one cell.
- Three types, distinguished by color and clicks-to-clear:
  - Red — 1 click
  - Blue — 2 clicks
  - Yellow — 3 clicks
- Each plant holds its own remaining-click count as state. Count decrements per valid click; plant leaves the board at zero.

## Interaction

- Move with keyboard (WASD), act with mouse (click). This is the farm-sim idler model.
- **Proximity gate:** a plant sits in a cell surrounded by 8 neighbor cells. If any part of the player's body is touching any of those 8 cells (or the plant's own cell), the plant is clickable. Otherwise the click does nothing.
- Adjacency includes diagonals (8 neighbors, not 4).
- "Player's cells" = every cell the player's body overlaps, not a single center cell. Forgiving by design.

## Win / Lose

- **Win:** last plant cleared → win state.
- **Lose / stop:** press 'p' → game halts, "Game Over" shown. Terminal. Refresh to replay.

## Why this is the right first build

The proximity gate is the adjacency query — pixel position → cell set → neighbor check — that every farm action runs through (plant, harvest, breed). Per-plant click count is per-tile state; swap "clicks remaining" for "growth timer remaining" and it's harvest-readiness. Clear-the-board is the empty form of the color-restoration hook. If the act-on-adjacent-tile loop feels good with ugly circles, it'll feel good with lit pixel art. If it feels clunky now, art won't save it later. This build isolates the one thing that has to feel right.

## Deferred (not tonight)

- **Camera follow / world larger than viewport.** Real architectural fork — camera-follow implies a world bigger than the screen, a different model than fixed-grid-at-load. Defer deliberately.
- **Rule legibility.** Red=1 / blue=2 / yellow=3 is invisible to a new player. Real design question, not needed while you're the only player.
- **Live resize handling.**