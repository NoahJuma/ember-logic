/* One-dimensional motion at constant acceleration, with SI units. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.EmberMotion = api;
})(typeof window === 'undefined' ? null : window, function () {
  'use strict';
  function at(x0, v0, a, t) {
    if (![x0, v0, a, t].every(Number.isFinite) || t < 0) throw new RangeError('Expected finite inputs and nonnegative time');
    return { x: x0 + v0*t + 0.5*a*t*t, v: v0 + a*t, a };
  }
  function extent(values) {
    let lo = Math.min(0, ...values), hi = Math.max(0, ...values);
    if (hi === lo) { lo -= 1; hi += 1; }
    const pad = (hi-lo)*0.1;
    return [lo-pad, hi+pad];
  }
  return { at, extent };
});
