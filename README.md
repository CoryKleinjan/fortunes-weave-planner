# Fortune's Weave Unit Planner

An Angular app for planning units in _Fire Emblem: Fortune's Weave_: pick a character, lay out a class route level by level, and see expected stats and which classes suit them.

**Download for Windows:** [installer](https://github.com/CoryKleinjan/fortunes-weave-planner/releases/latest/download/FortunesWeavePlanner-Setup.exe) or [portable .exe](https://github.com/CoryKleinjan/fortunes-weave-planner/releases/latest/download/FortunesWeavePlanner-Portable.exe) (no install needed). All versions are on the [Releases page](https://github.com/CoryKleinjan/fortunes-weave-planner/releases). The app isn't code-signed, so Windows SmartScreen asks you to confirm the first time: click **More info**, then **Run anyway**.

## Features

- All 63 playable characters, grouped by faction, with personal growth rates.
- All 59 classes across the five tiers (Base/Beginner, Specialty, Advanced, Master, Divine) with growth modifiers.
- Class route builder: chain classes with a number of levels in each; the app shows effective growths per class and projected average stats after each step.
- Class fit: rank every class by the unit's effective growths in the stats you care about, and add one to the route with a click.
- Unit details: personal ability, strong and weak skills, joining class, and join stats where documented (one click fills them in).
- Route warnings when a step is below the exam's recommended level, needs a skill the unit is weak in, or breaks a personal restriction (e.g. Goliath can't ride).
- Projected stats as shown in-game: the final class's stat bonuses added and any stat caps applied.
- Add abilities from the game's list: each unit's unique abilities (personal ability upgrades and Diadems) and skill abilities (weapon ranks and mount bonds), picked from the same box you type a name in, or type in any other.
- Recruited units: every unit you've edited or ticked as Recruited is listed at the top with its picture, level and class; click one to switch to it. Unticking Recruited hides a unit but keeps its plan; "Reset unit" clears both.
- Optimal path: one click sets the class route that gives the most expected HP, attack stat (Str or Mag, whichever the unit grows faster), Spd, Dex, Def and Res by level 50, counting the last class's stat bonuses. It only uses regular exam classes from their recommended level and skips route-only, female-only and unique-item classes and any class needing a skill the unit is weak in. It's an estimate: weapon ranks for exams aren't planned.
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

## Desktop app

The planner also runs as a desktop app (Electron). Plans are saved on that computer between launches. Unit pictures still need an internet connection.

- Publishing a new version: bump `version` in `package.json`, then run the **Desktop app** workflow from the repo's Actions tab (or push a tag like `v1.0.1`). It builds the installer and portable `.exe` on Windows and publishes them as a release, so the download links above always point to the newest one.
- Build it yourself: `npm run dist:win` (on Windows), `npm run dist:mac` or `npm run dist:linux`. Output goes to `release/`.
- Try it without packaging: `npm run desktop`.

## Development

Requires Node 22.22.3+ or 24.15+ (Angular 22).

```bash
npm install
npm start        # dev server at http://localhost:4200
npm test         # unit tests (Vitest)
npm run build
```
