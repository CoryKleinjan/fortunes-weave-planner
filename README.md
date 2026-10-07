# Fortune's Weave Unit Planner

An Angular app for planning units in *Fire Emblem: Fortune's Weave*: pick a character, lay out a class route level by level, and see expected stats and which classes suit them.

## Features

- All 63 playable characters, grouped by faction, with personal growth rates.
- All 59 classes across the five tiers (Base/Beginner, Specialty, Advanced, Master, Divine) with growth modifiers.
- Class route builder: chain classes with a number of levels in each; the app shows effective growths per class and projected average stats after each step.
- Class fit: rank every class by the unit's effective growths in the stats you care about, and add one to the route with a click.
- Plans are saved per unit in the browser (localStorage).

## How the numbers work

Effective growth = personal growth + class modifier (confirmed by the source guide's example: Leda's 65% Spd becomes 90% as a Dancer). Each level adds growth% / 100 to a stat on average.

Assumptions, not yet confirmed: effective growths are clamped to 0-100%, and stat caps are not applied.

## Data

Growth data is in `src/app/data/` and was transcribed from
[KeenGamer's growth-rate guide](https://www.keengamer.com/articles/guides/fire-emblem-fortunes-weave-growth-rates-for-all-characters-and-classes/) (2026-09-28). Not included yet: base stats, stat caps, weapons, skills, and class unlock requirements.

## Development

Requires Node 22.22.3+ or 24.15+ (Angular 22).

```bash
npm install
npm start        # dev server at http://localhost:4200
npm test         # unit tests (Vitest)
npm run build
```
