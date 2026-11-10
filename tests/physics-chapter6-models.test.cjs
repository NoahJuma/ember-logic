const {test}=require('node:test'),assert=require('node:assert/strict'),M=require('../physics-chapter6-models.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} vs ${b}`);
test('linear-force work is signed area and energy change',()=>{let r=M.line(4,2,3,2,2);close(r.work,21);close(r.initial,4);close(r.end,25);close(r.finalSpeed,5);assert.equal(r.reachable,true);r=M.line(-3,0,2,1,4);close(r.work,-6);close(r.finalSpeed,2)});
test('model detects a negative kinetic energy before the end even if endpoint is positive',()=>{const r=M.line(-10,4,5,1,3);assert.ok(r.end>0);assert.equal(r.reachable,false);assert.equal(r.finalSpeed,null);close(r.minAt,2.5)});
test('spring work is the difference of quadratic energies for extension and compression',()=>{close(M.spring(100,.2,.1).work,1.5);close(M.spring(100,-.2,.2).work,0);close(M.spring(100,0,-.2).work,-2);assert.throws(()=>M.spring(-1,0,1))});
test('instantaneous power uses the component along velocity',()=>{close(M.power(10,4,0),40);close(M.power(10,4,90),0);close(M.power(10,4,180),-40);assert.throws(()=>M.line(1,0,1,0,1))});

test('a zero-energy equilibrium cannot be crossed in finite time',()=>{assert.equal(M.line(-2,1,4,1,2).reachable,false);assert.equal(M.line(0,1,2,1,0).reachable,false);assert.equal(M.line(1,0,2,1,0).reachable,true);assert.equal(M.line(-2,0,1,1,2).reachable,true)});
