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
  '1.1':[27,2], '1.2':[43,2], '1.3':[36,2], '1.4':[58,3], '1.5':[33,1], '1.6':[24,2],
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
  const polynomial=answer('1.2','37').replaceAll('−','-');
  const coefficients=['a','b','c','d'].map(name=>Number(polynomial.match(new RegExp(name+'\\s*=\\s*(-?\\d+)'))?.[1]));
  assert.deepEqual(coefficients,[1,-6,2,10]);
  for(const [x,y]of [[0,10],[1,7],[3,-11],[4,-14]]){
    assert.equal(coefficients[0]*x**3+coefficients[1]*x**2+coefficients[2]*x+coefficients[3],y);
  }
  assert.match(answer('1.3','7'),/^a: \(67, 41, 41\)/);
  assert.match(answer('1.4','19'),/\[41  15\]  \[30  11\]/);
  assert.equal(answer('1.5','15'),'[7/2  0  -3]  [-1  1  0]  [0  -1  1]');
  assert.match(answer('1.8','27'),/T\(x\)\s*=\s*\[2\]\s*\[6\]\s*\[1\]/);
  const circuit=answer('1.10','5').replaceAll('−','-');
  const currents=['I₁','I₂','I₃'].map(name=>{
    const fraction=circuit.match(new RegExp(name+'\\s*=\\s*(-?\\d+)/(\\d+)'));
    assert.ok(fraction,'Missing '+name+' current');return Number(fraction[1])/Number(fraction[2]);
  });
  assert.deepEqual(currents,[13/5,-2/5,11/5]);
  const [i1,i2,i3]=currents;
  assert.ok(Math.abs(i1+i2-i3)<1e-10);
  assert.ok(Math.abs((2*i1-6)-2*i2)<1e-10);
  assert.ok(Math.abs((8-4*i3)-2*i2)<1e-10);
  assert.match(answer('1.10','7'),/I₁=I₄=I₅=I₆=1\/2/);
  assert.match(answer('1.10','7'),/I₂=I₃=0/);
  assert.equal(JSON.stringify(multiply([[1,4],[-2,3],[1,-2]],[[0,2],[1,1]])),'[[4,6],[3,-1],[-2,0]]');
  const quadratic=answer('review','16').replaceAll('−','-');
  const [a,b,c]=['a','b','c'].map(name=>Number(quadratic.match(new RegExp(name+'\\s*=\\s*(-?\\d+)'))?.[1]));
  assert.deepEqual([a,b,c],[1,-4,-5]);
  assert.equal(a*(-1)**2+b*(-1)+c,0);
  assert.equal(a*2**2+b*2+c,-9);
  assert.equal(2*a*2+b,0);
});

test('every exercise offers independent writing and solution choices with a topic introduction', () => {
  const L=chapter.EmberLearning;
  let count=0;
  for(const [topic,entries] of Object.entries(solutions))for(const p of entries) {
    const markup=L.card(p,'test-'+topic+'-'+p.number,p.number,topic);
    assert.match(markup,/<details class="attempt-panel">/);
    assert.match(markup,/<details class="solution-panel">/);
    assert.doesNotMatch(markup,/<details[^>]+\bopen\b|<textarea[^>]+\brequired\b/);
    assert.match(markup,/You do not need to enter an answer/);
    assert.match(markup,/not automatically graded/);
    assert.match(markup,/Need the basics\?/);
    assert.ok(L.guides[topic]);
    count++;
  }
  assert.equal(count,437);
});

test('written attempts round-trip, reopen for editing and cannot inject HTML', () => {
  const L=chapter.EmberLearning,data=new Map(),storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
  const attempt='x = 2\n</textarea><script>bad()</script> & y = 3';
  assert.equal(L.save(storage,'book-1.2-0',attempt),true);
  assert.equal(L.read(storage,'book-1.2-0'),attempt);
  const markup=L.card(solutions['1.2'][0],'book-1.2-0','Test','1.2',L.read(storage,'book-1.2-0'));
  assert.match(markup,/<details class="attempt-panel" open>/);
  assert.match(markup,/<details class="solution-panel">/);
  assert.match(markup,/&lt;script&gt;bad\(\)&lt;\/script&gt;/);
  assert.doesNotMatch(markup,/<script>/);
  const textarea={value:'A new answer\non two lines'},copy={},comparison={};
  const article={querySelector:q=>({'textarea':textarea,'.attempt-copy':copy,'.attempt-comparison':comparison}[q])};
  L.syncAttempt(article);
  assert.equal(copy.textContent,textarea.value);
  assert.equal(comparison.hidden,false);
  textarea.value='   ';L.syncAttempt(article);
  assert.equal(comparison.hidden,true);
});

test('unavailable browser storage does not prevent writing or reading solutions', () => {
  const L=chapter.EmberLearning,blocked={getItem(){throw Error('blocked');},setItem(){throw Error('full');}};
  assert.equal(L.read(blocked,'test'),'');
  assert.equal(L.save(blocked,'test','My answer'),false);
  assert.match(L.card(solutions['1.1'][0],'test','1','1.1'),/Show worked solution/);
});

test('row explanations include each arithmetic operation, the augmented bar, and solution checks', () => {
  const r=solve([[2,4,10],[1,-1,-1]]);
  assert.match(r.steps.join('\n'),/Entry 1: \(2\) ÷ \(2\) = 1/);
  assert.match(r.steps.join('\n'),/Entry 3:.*−.*×/);
  assert.match(r.steps.join('\n'),/\[1  2  \|  5\]/);
  assert.match(r.steps.join('\n'),/Check original equation 1:/);
  const family=solve([[1,2,3,4],[0,0,0,0]]);
  assert.match(family.steps.join('\n'),/x2 = t1, x3 = t2/);
  assert.match(family.steps.join('\n'),/x1 = 4 \+ \(-2\)t1 \+ \(-3\)t2/);
  assert.match(family.steps.join('\n'),/Check the family:/);
  assert.match(chapter.EmberLearning.readable('[1 2]  [3 4]'),/\]\n\[/);
});

test('all generated system and inverse answers satisfy their original numerical data', () => {
  const ctx=vm.createContext({});ctx.window=ctx;
  vm.runInContext(source('linear-algebra-core.js'),ctx);
  const M=ctx.EmberAlgebra,originalSolve=M.solve,originalInverse=M.inverse;
  let systems=0,inverses=0;
  // Residuals are checked relative to the sum of absolute products so that the
  // large Vandermonde systems in technology exercises have a meaningful bound.
  function matches(row,v,b) {
    const value=row.reduce((s,a,i)=>s+a*v[i],0);
    const scale=1+Math.abs(b)+row.reduce((s,a,i)=>s+Math.abs(a*v[i]),0);
    assert.ok(Math.abs(value-b)<1e-7*scale,`${value} differs from ${b}`);
  }
  M.solve=a=>{
    const result=originalSolve(a);systems++;
    if(result.kind!=='none')for(const row of a){
      matches(row.slice(0,-1),result.point,row.at(-1));
      for(const direction of result.basis)matches(row.slice(0,-1),direction,0);
    }
    return result;
  };
  M.inverse=a=>{
    const result=originalInverse(a);inverses++;
    if(result.value)for(let i=0;i<a.length;i++)for(let j=0;j<a.length;j++) {
      matches(a[i],result.value.map(row=>row[j]),Number(i===j));
      matches(result.value[i],a.map(row=>row[j]),Number(i===j));
    }
    return result;
  };
  for(const name of ['linear-algebra-content.js','linear-algebra-textbook.js','linear-algebra-solutions.js'])vm.runInContext(source(name),ctx);
  assert.equal(systems,84);assert.equal(inverses,65);
});

test('clipped planes stay on their equation and inside the viewing box', () => {
  const {clipPlane}=chapter.EmberScene;
  for(const row of [[1,1,1,3],[1,0,0,1],[0,0,2,2],[1e-12,1,0,2],[2,-3,4,1],[0,1,0,3]]) {
    const vertices=clipPlane(row);assert.ok(vertices.length>=3);
    for(const v of vertices){assert.ok(v.every(n=>Number.isFinite(n)&&Math.abs(n)<=3+1e-8));assert.ok(Math.abs(v.reduce((s,n,i)=>s+n*row[i],0)-row[3])<1e-7);}
  }
  assert.equal(clipPlane([0,0,0,0]).length,0);
  assert.equal(clipPlane([0,0,1,8]).length,0);
});

test('transformation controls keep rotation rigid and interpolate stretching and flattening', () => {
  const {transformAt}=chapter.EmberScene,M=chapter.EmberAlgebra;
  const target=[[2,0,0],[0,1,0],[0,0,.5]],identity=[[1,0,0],[0,1,0],[0,0,1]];
  assert.equal(JSON.stringify(transformAt(target,0)),JSON.stringify(identity));
  assert.equal(JSON.stringify(transformAt(target,1)),JSON.stringify(target));
  for(const t of [0,.25,.5,.75,1]) {
    const out=M.apply(transformAt(target,t,90),[1,2,3]);
    assert.ok(Math.abs(Math.hypot(...out)-Math.sqrt(14))<1e-9);
  }
  assert.equal(JSON.stringify(M.apply(transformAt([[1,0,0],[0,1,0],[0,0,0]],1),[1,2,3])),'[1,2,0]');
});

test('camera projection adapts to portrait, landscape, zoom and two-finger pan', () => {
  const {project}=chapter.EmberScene;
  const camera={yaw:0,pitch:0,zoom:1,panX:0,panY:0};
  for(const [w,h] of [[390,500],[844,240],[1200,700]]) {
    const origin=project([0,0,0],camera,w,h);
    assert.equal(origin.x,w/2);assert.equal(origin.y,h/2);
    const zoom=project([1,0,1],{...camera,zoom:2,panX:20,panY:-10},w,h);
    assert.equal(zoom.x,w/2+Math.min(w,h)*.23+20);
    assert.equal(zoom.y,h/2-Math.min(w,h)*.23-10);
  }
});
