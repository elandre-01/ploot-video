# Motion · English localization

The visual grammar and choreography come from Spanish V14. English timing is anchored to the supplied Luke C recording, with the music grid used where it fits the delivery.

## Timing

- Authored scene time is mapped through `src/beat-sync.json` once, in `retimeBeatTimeline`.
- The contact sequence is added afterward using final English seconds. Do not remap it again.
- Bonkers starts at 23.0 s. The existing 110 BPM grid provides beat and half-beat anchors.
- Text remains native HTML; long English headlines fit by reducing their font size only when they exceed the available line width.
- All animation is driven by the single paused `main` GSAP timeline and supports seeking in either direction.

## Final contact sequence

| Action | Seconds |
| --- | ---: |
| Floating message enters | 67.181818 |
| Message paragraphs enter | 67.454545 / 67.727273 / 68.000000 |
| Reply enters | 69.090909 |
| Message exits | 69.360000–69.636364 |
| Floating calendar enters | 69.636364 |
| Twelve demos enter in three groups | 69.909091 / 70.181818 / 70.454546 |
| All demo entrances finish | 70.754546 |
| Narrated meeting phrase ends | 71.060000 |
| Next narrated phrase starts | 71.152000 |
| Closing scene begins | 71.272727 |

The message has fully disappeared when the calendar starts. The closing scene follows the meeting phrase by 0.213 s.

## Preserved fixes

- Intro cards and competitor websites track the English narration.
- The enlarged Following button changes to a native-size text layer at 42.714286 s, avoiding bitmap enlargement.
- Discarded buying-signal rows reach zero opacity.
- The chat uses three separate paragraphs and appears once.
- The calendar shows twelve demos with varied names.

## Verification

The animation map contains 1,589 tweens and no dead zones. Custom checks found zero transform conflicts, zero reverse-seek mismatches and zero message/calendar coexistence samples at 120 Hz. All 21 monitored interface actions align to the half-beat grid within 0.001 ms. See `review/en-v1/motion-continuity.json` for measured values.
