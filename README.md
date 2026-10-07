# Fortune's Weave Unit Planner

An Angular app for planning units in _Fire Emblem: Fortune's Weave_: pick a character, lay out a class route level by level, and see expected stats and which classes suit them.

## Features

- All 63 playable characters, grouped by faction, with personal growth rates.
- All 59 classes across the five tiers (Base/Beginner, Specialty, Advanced, Master, Divine) with growth modifiers.
- Class route builder: chain classes with a number of levels in each; the app shows effective growths per class and projected average stats after each step.
- Class fit: rank every class by the unit's effective growths in the stats you care about, and add one to the route with a click.
- Unit details: personal ability, strong and weak skills, joining class, and join stats where documented (one click fills them in).
- Route warnings when a step is below the exam's recommended level, needs a skill the unit is weak in, or breaks a personal restriction (e.g. Goliath can't ride).
- Projected stats as shown in-game: the final class's stat bonuses added and any stat caps applied.
- Unit pictures: the selected unit shows its in-game portrait, loaded from [fortunesweave.co.uk](https://fortunesweave.co.uk/characters/) (not bundled, so it needs a connection). If it can't load, an initials badge in the faction's colour shows.
- Add abilities from the game's list: each unit's unique abilities (personal ability upgrades and Diadems) and skill abilities (weapon ranks and mount bonds), picked from the same box you type a name in, or type in any other.
- Recruited units: every unit you've edited or ticked as Recruited is listed at the top with its picture, level and class; click one to switch to it. Unticking Recruited hides a unit but keeps its plan; "Reset unit" clears both.
- Plans are saved per unit in the browser (localStorage).

## How the numbers work

Effective growth = personal growth + class modifier (confirmed by the source guide's example: Leda's 65% Spd becomes 90% as a Dancer). Each level adds growth% / 100 to a stat on average.

Assumptions, not yet confirmed: effective growths are clamped to 0-100%.

No source documents stat caps yet, so the planner applies only caps you enter per unit; the data model has a `caps` field per class ready for real values.

## Data

All data is in `src/app/data/`:

- Growth rates (`characters.ts`, `classes.ts`): [KeenGamer's growth-rate guide](https://www.keengamer.com/articles/guides/fire-emblem-fortunes-weave-growth-rates-for-all-characters-and-classes/) (2026-09-28).
- Class weapons, skills, unlocks and stat bonuses (`class-details.ts`, `abilities.ts`), unique and skill abilities (`ability-catalog.ts`) and unit abilities, aptitudes and join stats (`character-details.ts`): [fortunesweave.co.uk](https://fortunesweave.co.uk/classes/) (checked 2026-10-07).

Gaps: stat caps (all classes), join stats for most units, join levels, flat stat bonuses for 15 classes, and Tobias's details. These were read through a page summarizer, so spot-check against the game.

## Development

Requires Node 22.22.3+ or 24.15+ (Angular 22).

```bash
npm install
npm start        # dev server at http://localhost:4200
npm test         # unit tests (Vitest)
npm run build
```
