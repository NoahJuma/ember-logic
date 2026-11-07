const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const context=vm.createContext({});context.window=context;
for(const file of ['linear-algebra-core.js','linear-algebra-content.js','linear-algebra-textbook.js','linear-algebra-solutions.js',
  'linear-algebra-questions-early.js','linear-algebra-questions-operations.js','linear-algebra-questions-structure.js',
  'linear-algebra-questions-transformations.js','linear-algebra-questions-applications.js','linear-algebra-questions.js']){
  vm.runInContext(source(file),context,{filename:file});
}
const item=(section,number)=>context.EmberTextbook.solutions[section].find(p=>p.number===number);
const normalized=text=>text.replaceAll('−','-');
const numeric='[+-]?\\d+(?:/\\d+)?';
const rational=text=>{const [n,d=1]=text.split('/').map(Number);return n/d;};
const assignment=(answer,name)=>{
  const match=normalized(answer).match(new RegExp(name+'\\s*=\\s*('+numeric+')'));
  assert.ok(match,'Missing numerical assignment for '+name+' in '+answer);
  return rational(match[1]);
};
const tuple=(answer,count)=>{
  const terms=Array.from({length:count},()=>`(${numeric})`).join('\\s*,\\s*');
  const match=normalized(answer).match(new RegExp('\\(\\s*'+terms+'\\s*\\)'));
  assert.ok(match,'Missing '+count+'-coordinate numerical answer in '+answer);
  return match.slice(1).map(rational);
};
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-10,`${actual} != ${expected}`);

// Equations and current labels were read directly from the uploaded textbook's
// rendered printed pages 24, 67 and 109. Evaluate the displayed final answers in
// those source equations; do not use the production solver as the oracle.
test('1.2 exercise 36 solves reciprocals and satisfies all three original nonlinear equations',()=>{
  const p=item('1.2','36'),[x,y,z]=tuple(p.answer,3);
  [x,y,z].forEach(value=>assert.notEqual(value,0));
  near(x,-13/7);near(y,91/54);near(z,-91/8);
  near(1/x+2/y-4/z,1);
  near(2/x+3/y+8/z,0);
  near(-1/x+9/y+10/z,5);
  assert.match(p.prompt,/1\/x \+ 2\/y − 4\/z = 1/);
  assert.match(p.steps.join('\n'),/U = 1\/x/);
});

test('1.6 exercise 2 preserves the printed negative first right-hand side and satisfies both equations',()=>{
  const p=item('1.6','2');
  const [x1,x2]=/x₁\s*=/.test(p.answer)?[assignment(p.answer,'x₁'),assignment(p.answer,'x₂')]:tuple(p.answer,2);
  // The scan shows 4x₁ − 3x₂ = −3, not +3.
  assert.match(p.prompt,/4x₁ − 3x₂ = −3/);
  near(4*x1-3*x2,-3);
  near(2*x1-5*x2,9);
  near(x1,-3);near(x2,-3);
});

test('1.10 exercise 6 respects the drawn current arrows, junction balance and all three branch voltages',()=>{
  const p=item('1.10','6');
  const i1=assignment(p.answer,'I₁'),i2=assignment(p.answer,'I₂'),i3=assignment(p.answer,'I₃');
  // I₁ points up through the central 4 Ω resistor; I₂ down the 6 Ω
  // left branch; I₃ up the right branch through the 2 Ω resistor.
  near(i1+i3-i2,0);
  const middle=-4*i1,left=6*i2-1,right=2-2*i3;
  near(middle,left);near(left,right);near(middle,10/11);
  near(i1,-5/22);near(i2,7/22);near(i3,6/11);
  assert.ok(i1<0&&i2>0&&i3>0);
  assert.match(p.answer,/I₁=.*downward, opposite its arrow/);
});
