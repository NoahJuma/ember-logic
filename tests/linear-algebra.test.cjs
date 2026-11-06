const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const chapter = vm.createContext({});
chapter.window = chapter;
const source = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
const page = source('linear-algebra.html');
const scripts = [...page.matchAll(/<script src="(linear-algebra[^"]+)"/g)].map(([,name]) => name);
for (const name of scripts.slice(0,-1)) vm.runInContext(source(name), chapter, {filename:name});

const {solutions,legacyAttempts} = chapter.EmberTextbook;
const {multiply,reduce,solve} = chapter.EmberAlgebra;
const expected = {
  '1.1':[27,2], '1.2':[43,2], '1.3':[36,1], '1.4':[58,3], '1.5':[33,1], '1.6':[24,2],
  '1.7':[47,1], '1.8':[50,0], '1.9':[29,1], '1.10':[18,4], '1.11':[11,1], review:[29,0]
};

test('the textbook companion loads and covers every printed exercise number', () => {
  assert.equal(scripts.at(-1),'linear-algebra.js');
  for (const [set,[last,technology]] of Object.entries(expected)) {
    const numbers = new Set(Array.from({length:last},(_,i)=>String(i+1)));
    if(set==='1.5') for(const n of ['9','10']) {
      numbers.delete(n);
      numbers.add(n+'a');
      numbers.add(n+'b');
    }
    if(set!=='review') numbers.add('TF');
    for(let i=1;i<=technology;i++) numbers.add('T'+i);
    const entries=solutions[set];
    assert.equal(entries.length,numbers.size,set);
    for(const p of entries) {
      assert.ok(numbers.delete(p.number),set+' '+p.number+' is unexpected or duplicated');
      assert.ok(p.title && p.prompt && p.answer && p.steps.length,set+' '+p.number+' is incomplete');
      assert.ok(p.steps.every(step=>typeof step==='string'&&step.trim()),set+' '+p.number+' has a blank step');
      assert.doesNotMatch(p.answer,/NaN|Infinity|null/);
    }
    assert.equal(numbers.size,0,set);
  }
});

test('existing attempts still have their original keys after the exercise list was filled in', () => {
  assert.equal(legacyAttempts['1.2']['9'],0);
  assert.equal(legacyAttempts['1.7']['7'],1);
  assert.equal(legacyAttempts['1.8']['31'],1);
  assert.equal(legacyAttempts.review['7'],4);
  assert.equal(legacyAttempts['1.2']['1'],undefined);
});

test('Gaussian elimination stops at echelon form and Gauss–Jordan clears above pivots', () => {
  const a=[[1,1,3],[0,2,4]];
  assert.equal(JSON.stringify(reduce(a,2,false).rows),'[[1,1,3],[0,1,2]]');
  assert.equal(JSON.stringify(reduce(a,2).rows),'[[1,0,1],[0,1,2]]');
  assert.equal(JSON.stringify(solve(a).point),'[1,2]');
  assert.equal(reduce(a,2,false).operations[0].type,'scale');
});

test('selected computed solutions agree with the textbook key and the circuit balances', () => {
  const answer=(set,n)=>solutions[set].find(p=>p.number===n).answer;
  assert.equal(answer('1.2','37'),'(1, -6, 2, 10)');
  assert.match(answer('1.3','7'),/^a: \(67, 41, 41\)/);
  assert.match(answer('1.4','19'),/\[41  15\]  \[30  11\]/);
  assert.equal(answer('1.5','15'),'[7/2  0  -3]  [-1  1  0]  [0  -1  1]');
  assert.match(answer('1.8','27'),/\(2, 6, 1\)/);
  assert.match(answer('1.10','5'),/\(13\/5, -2\/5, 11\/5\)/);
  assert.match(answer('1.10','7'),/\(1\/2, 0, 0, 1\/2, 1\/2, 1\/2\)/);
  assert.equal(JSON.stringify(multiply([[1,4],[-2,3],[1,-2]],[[0,2],[1,1]])),'[[4,6],[3,-1],[-2,0]]');
  assert.match(answer('review','16'),/\(1, -4, -5\)/);
});
