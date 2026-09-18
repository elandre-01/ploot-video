# SFX Credits

The original library sound effects in this directory are sourced from [Pixabay](https://pixabay.com/sound-effects/) and used under the [Pixabay Content License](https://pixabay.com/service/license-summary/).

The Pixabay license allows free use for commercial and non-commercial purposes without attribution, but attribution is appreciated and given here for transparency.

## Files

The following `.mp3` files are bundled with this skill:

- `chime.mp3`
- `click.mp3` / `click-soft.mp3`
- `error.mp3`
- `glitch-1.mp3` / `glitch-2.mp3` / `glitch-3.mp3`
- `impact-bass-1.mp3` / `impact-bass-2.mp3`
- `key-press.mp3`
- `notification.mp3`
- `ping.mp3`
- `pop.mp3`
- `riser.mp3`
- `sparkle.mp3`
- `typing.mp3`
- `whoosh.mp3` / `whoosh-short.mp3` / `whoosh-cinematic.mp3`

See `manifest.json` for per-file metadata (duration, energy character, recommended use).

## License

All files are distributed under the [Pixabay Content License](https://pixabay.com/service/license-summary/), which permits:

- Commercial and non-commercial use
- Modification and remixing
- Redistribution as part of derivative works (such as videos rendered with HyperFrames)

without any attribution requirement.

## Local derivatives · 2026-09-15

Generated reproducibly with `node src/sound-design.mjs` (FFmpeg, 48 kHz WAV):

- `slot-mechanism.wav`: filtered snippets of the existing `click.mp3`, mixed with an original procedural motor body. Forty teeth and three stops follow the same deterministic curve as the visual reels in `src/motion-cues.mjs`.
- `glitch-rewind.wav`: a short reversed and filtered section of the existing `glitch-3.mp3`, with fades.
- `glitch-cut.wav`: a short filtered section of the existing `glitch-3.mp3`, with fades.

The source recordings retain their existing Pixabay provenance and license. No external recording was added. The three resolved local assets are also recorded in the project's `.media` ledger.

## Refined short palette · 2026-09-15

The local HyperFrames/Pixabay library supplies three additional originals: `click-soft.mp3`, `key-press.mp3`, `ping.mp3`.
The following edits are produced by `src/sound-palette.mjs`, using only these and the existing recordings:

| Output WAV | Source recordings |
| --- | --- |
| ui-touch | click-soft |
| ui-latch | key-press, click-soft |
| panel-seat | pop, key-press |
| card-sort | key-press, click-soft |
| signal-tick | ping |
| confirm-soft | chime, click-soft |
| message-in | notification |
| coin-detail | sparkle, key-press |
| step-mark | impact-bass-1, key-press |
| logo-inhale | chime, reversed |
| logo-lock | impact-bass-2, chime |

Edits use trimming, filtering, resampling, short layered contacts, gentle stereo placement and fades. They are
not newly recorded physical objects. Source provenance remains the bundled Pixabay license above. The source
recordings and eleven derivative WAVs are registered in `.media/manifest.jsonl`.

## Reference sound revision · 2026-09-16

`motion-glide`, `motion-flick`, `motion-pull`, `ui-dismiss` and `type-detail` are short filtered/faded derivatives of the existing Pixabay recordings. Reproduce with `../../audio-reference/gojiberry/prepare-effects.py`. Exact source hashes and measurements: `src/reference-palette.json`. No audio from the reference video is used in Ploot.

## Groove / glitch revision · 2026-09-16

`glitch-tick`, `glitch-burst`, `glitch-scan`, `glitch-drop` and `glitch-lock` are gated, filtered short derivatives of the existing licensed `glitch-3.mp3`. Source hashes, peaks and recipes: `src/reference-palette.json`; reproducible preparation: `../../audio-reference/groove-glitch/prepare.py`. No competitor audio is incorporated.

## Groove / glitch revision 2 · 2026-09-16

`glitch-air-*` are continuous, upward-pitched, filtered and smoothly faded excerpts of licensed `glitch-3.mp3`, replacing the periodically gated derivatives in the current composition. Recipe and source hash: `src/reference-palette.json`; preparation: `../../audio-reference/groove-glitch-v2/prepare.py`.

## English V6 · Soft interface replacements
Seven excerpts from Kenney Interface Sounds (CC0): https://kenney.nl/assets/interface-sounds . Original filenames and SHA-256 hashes in src/soft-palette-v6.json; license in KENNEY-INTERFACE-LICENSE.txt. No pitch shifting or glitch sources.

## V7 · physical card and air recordings
Kenney Casino Audio (CC0): https://kenney.nl/assets/casino-audio . Card-place-1, card-slide-1/2, card-fan-1 and chip-lay-3. Kenney Foley Sounds (CC0), woosh1: https://gamesounds.xyz/?dir=Kenney%27s+Sound+Pack%2FFoley+Sounds . All edits are source trims; gains, softening and fades are native. Source hashes and offsets in src/foley-palette-v7.json.

## V8 · warm replacement accents
Kenney Impact Sounds (CC0), soft-medium-001, wood-medium-001 and wood-light-003: https://kenney.nl/assets/impact-sounds . Kenney Foley Sounds woosh3/4/6/7 (CC0): https://gamesounds.xyz/?dir=Kenney%27s+Sound+Pack%2FFoley+Sounds . Original clips converted losslessly to WAV; rewind reversed and slowed, calendar stretched with pitch preserved. Native per-clip fades/EQ only affect replacements. Details/hashes in src/warm-palette-v8.json.

## V9 · VHS rewind and continuous calendar air
Real VHS tape rewind: BigSoundBank / LaSonotheque sound 2693, CC0, https://bigsoundbank.com/vcr-rewind-s2693.html . Source WAV excerpt 43.35–44.85 seconds.
Whoosh: DJT4NN3R, whoosh_long_mid.wav, CC0, https://freesound.org/people/DJT4NN3R/sounds/449989/ . Public HQ preview, first 2.6 seconds reversed to align the swell with the calendar acceleration. Native gain/EQ/fades editable in the composition.

## V11 · Replacement rewind and calendar
Rewind Short.wav — LuKaiX — https://freesound.org/people/LuKaiX/sounds/700527/ — CC0. HQ public preview; tempo fitted to 1.5 s, native EQ and fades.
Whoosh stereo light (transition) — xkeril — https://freesound.org/people/xkeril/sounds/701104/ — CC0. HQ public preview; reversed, tempo fitted to 2.021 s, native gain/EQ/fades.
