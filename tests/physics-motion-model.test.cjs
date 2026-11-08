const {test} = require('node:test');
const assert = require('node:assert/strict');
const {at, extent} = require('../physics-motion-model');
test('constant-acceleration motion respects initial conditions and reversal', () => {
  assert.deepEqual(at(4, -3, 2, 0), {x:4,v:-3,a:2});
  assert.deepEqual(at(4, -3, 2, 3), {x:4,v:3,a:2});
  assert.equal(at(0, 12, -9.8, 2).x, 4.399999999999999);
});
test('rejects invalid time and keeps the axis visible', () => {
  assert.throws(() => at(0,0,1,-1));
  assert.throws(() => at(0,NaN,1,1));
  const [lo,hi] = extent([0,0]);
  assert.ok(lo < 0 && hi > 0);
  const [a,b] = extent([-12,-2]);
  assert.ok(a < -12 && b > 0);
});
