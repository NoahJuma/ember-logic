const test=require('node:test');
const assert=require('node:assert/strict');
const M=require('../linear-algebra-core.js');

test('worked inverse displays preserve small nonzero entries instead of showing a zero matrix',()=>{
  const a=[[1e6,0],[0,2e6]],result=M.inverse(a);
  assert.deepEqual(result.value,[[1e-6,0],[0,5e-7]]);
  const displayed=result.value.map(row=>row.map(value=>Number(M.format(value))));
  assert.deepEqual(M.multiply(a,displayed),[[1,0],[0,1]]);
  assert.deepEqual(M.multiply(displayed,a),[[1,0],[0,1]]);
  for(const value of [1e-6,-1e-6,1.23456e-5,-9.87654e-5]){
    const printed=Number(M.format(value));
    assert.notEqual(printed,0);
    assert.ok(Math.abs((printed-value)/value)<1e-6);
  }
  assert.equal(M.format(1/3),'1/3');
  assert.equal(M.format(0),'0');
});
