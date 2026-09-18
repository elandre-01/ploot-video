// Shared visual/audio clock. Times are local to their storyboard block.
export const MOTION = {
  slot: { pull: 6.4, stops: [7.42, 7.42 + 5 / 24, 7.42 + 10 / 24], rows: [27, 28, 30], acceleration: 0.14, brake: 0.46 },
  overload: { tools: [1.04, 1.22, 1.39], messages: [1.72, 1.94, 2.12, 2.27, 2.40, 2.51], swap: 2.3, collapse: 3.03, exit: 3.25, calendar: 3.38 },
  glitch: { rewind: 1.4, overload: 2.3, disappear: 14.65 },
};

// Integral of a smooth velocity ramp: accelerate, cruise, brake to exactly zero.
// The same curve positions the reels and places the mechanical audio ticks.
export function reelProgress(seconds, duration, acceleration = 0.14, brake = 0.46) {
  const t = Math.max(0, Math.min(duration, seconds));
  const distance = duration - (acceleration + brake) / 2;
  const integral = (u) => u ** 3 - u ** 4 / 2;
  if (t < acceleration) return acceleration * integral(t / acceleration) / distance;
  if (t <= duration - brake) return (t - acceleration / 2) / distance;
  const u = (t - duration + brake) / brake;
  return (duration - brake - acceleration / 2 + brake * (u - integral(u))) / distance;
}
