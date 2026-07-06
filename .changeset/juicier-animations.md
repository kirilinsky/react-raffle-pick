---
"react-raffle-picker": patch
---

### Livelier default animations, freeze "settle" pop, slot reel bounce-stop

`styles.css` (and the auto-injected `<RafflePick.Slots>` stylesheet) got a
visual pass:

- `roll` and `fade` (`<RafflePick.Value animation="...">`) now use eased,
  multi-stage keyframes instead of flat `linear` — noticeably snappier per
  tick.
- New: every animation type gets a shared "settle" pop on freeze
  (`[data-phase='frozen']`) — previously freezing had zero animation at all,
  the value just stopped in place.
- `<RafflePick.Slots>` reels now decelerate into a small overshoot bounce on
  stop instead of snapping instantly to rest.
- Fixed: the `prefers-reduced-motion` override didn't have enough CSS
  specificity to beat the (new) settle/stop animations — it's `!important`
  now, so it reliably wins regardless of what other animation rules exist.
- Fixed: the auto-injected runtime stylesheet for `<RafflePick.Slots>` had no
  `prefers-reduced-motion` guard at all (only the statically-imported
  `styles.css` did) — consumers relying on the auto-injected CSS got no
  reduced-motion protection for the slot reel.
