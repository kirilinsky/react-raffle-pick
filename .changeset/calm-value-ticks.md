---
"react-raffle-picker": patch
---

### Fix: `roll`/`fade` per-tick jitter at large font sizes

The previous pass on these animations added a `scale()` + overshoot keyframe on
top of the opacity dip. At small sizes (hero-scale text) it read as a nice
snap; at large display sizes (e.g. a `clamp(80px,16vw,160px)` value in a
playground/demo) the combined scale + vertical offset, replaying every tick,
made the text visibly wobble/jitter instead of read as a clean spin.

Dropped the `scale()` and overshoot stop from both keyframes, keeping the
eased timing-function but reverting to a simpler translateY/opacity motion —
same idea as before this pass, no wobble at any font size.
