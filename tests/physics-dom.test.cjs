const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');

// Execute the real page controllers in a DOM. This tests behaviour, not browser
// layout, SVG paint order, native dialog rendering or physical touch hardware.
function fixture(width=390,storage={}){
  const errors=[],frames=new Map();let frame=0;
  const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(read('physics-chapter1.html'),{url:'https://example.test/physics-chapter1.html',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window,d=w.document;
  w.Element.prototype.scrollIntoView=function(){};
  w.Element.prototype.setPointerCapture=function(){};
  w.Element.prototype.getBoundingClientRect=function(){return {width,height:this.classList.contains('answer-svg')?280:480,left:0,top:0,right:width,bottom:480};};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.matchMedia=()=>({matches:false});
  w.ResizeObserver=class{constructor(cb){this.cb=cb;}observe(){this.cb();}disconnect(){}};
  w.requestAnimationFrame=cb=>{frames.set(++frame,cb);return frame;};w.cancelAnimationFrame=id=>frames.delete(id);
  for(const [k,v]of Object.entries(storage))w.localStorage.setItem(k,v);
  for(const file of ['physics-core.js','physics-content.js','physics-questions.js','physics-book.js','physics-lab.js','physics.js'])w.eval(read(file));
  const $=s=>d.querySelector(s),all=s=>[...d.querySelectorAll(s)];
  const input=(el,value,event='input')=>{if(typeof el==='string')el=$(el);el.value=String(value);el.dispatchEvent(new w.Event(event,{bubbles:true}));};
  const click=s=>{const el=typeof s==='string'?$(s):s;assert.ok(el,`Missing element ${s}`);el.click();};
  const search=id=>{input('#physics-set','all','change');input('#physics-topic','all','change');input('#physics-search',id);};
  const point=(el,type,x,y,id=1)=>{const e=new w.MouseEvent(type,{bubbles:true,cancelable:true,clientX:x,clientY:y});Object.defineProperty(e,'pointerId',{value:id});el.dispatchEvent(e);};
  const flush=time=>{const queued=[...frames.values()];frames.clear();queued.forEach(cb=>cb(time));};
  return{w,d,$,all,input,click,search,point,errors,flush,close:()=>dom.window.close()};
}
test('physics page initialises at narrow and wide viewport sizes with no duplicate IDs or exceptions',()=>{
  for(const width of [390,1180]){const f=fixture(width);
    assert.match(f.$('#lesson').textContent,/Physics starts/);assert.equal(f.all('#lesson-nav button').length,10);
    assert.equal(f.all('#physics-exercises article').length,5);assert.equal(f.all('.solution-panel[open]').length,0);
    const ids=f.all('[id]').map(el=>el.id);assert.equal(new Set(ids).size,ids.length);
    assert.match(f.$('.lab-result').textContent,/Length = 5/);assert.deepEqual(f.errors,[]);f.close();
  }
});
test('measurement controls show squared, cubed and microscopic conversions without rounding to zero',()=>{
  const f=fixture();f.input('#unit-power',3);assert.match(f.$('#unit-result').textContent,/0.000001/);
  f.input('#unit-from','nm');assert.match(f.$('#unit-result').textContent,/10\^−27/);
  f.input('#unit-value','');assert.match(f.$('#unit-result').textContent,/Enter an amount/);
  f.input('#cube-size',5);assert.match(f.$('#cube-result').textContent,/125 cubic/);assert.doesNotMatch(f.$('#cube-picture').innerHTML,/NaN/);f.close();
});
test('all 129 answer cards render; solutions stay closed; filters and exact exercise search work',()=>{
  const f=fixture();f.input('#physics-set','all','change');const ids=[];
  do{
    for(const card of f.all('#physics-exercises article')){
      const id=card.dataset.question,q=f.w.PhysicsQuestions.get(id),question=card.querySelector('.question-body'),solution=card.querySelector('.solution-panel');ids.push(id);
      assert.equal([...question.querySelectorAll('.question-text>p')].map(p=>p.textContent).join('\n'),q.text,id);
      assert.equal(question.closest('details'),null,id);
      assert.ok(question.compareDocumentPosition(card.querySelector('.attempt-panel'))&4,id);
      assert.equal(solution.open,false,id);
      const steps=[...solution.querySelectorAll('.numbered-solution>li')];
      assert.ok(steps.length>=3,id);
      steps.forEach((li,i)=>assert.equal(li.querySelector('.solution-step-label').textContent,`Step ${i+1}`,id));
      const final=solution.querySelector('.final-answer');
      assert.equal(final.querySelector('h4').textContent,'The final answer is…',id);
      assert.ok(steps.at(-1).compareDocumentPosition(final)&4,id);
      assert.equal(final.querySelector('.answer').textContent,f.w.PhysicsBook.items.find(i=>i.id===id).answer,id);
      assert.equal(solution.lastElementChild.lastElementChild,final,id);
      if(q.figure)assert.equal(question.querySelector('img').getAttribute('src'),'assets/physics/questions/'+q.figure.file,id);
    }
    assert.equal(f.all('.solution-panel[open]').length,0);assert.doesNotMatch(f.$('#physics-exercises').innerHTML,/NaN|Infinity/);if(f.$('#physics-next').disabled)break;f.click('#physics-next');
  }while(true);
  assert.equal(ids.length,129);assert.equal(new Set(ids).size,129);
  f.search('1.1');assert.equal(f.all('#physics-exercises article').length,1);assert.equal(f.$('article[data-question]').dataset.question,'1.1');
  f.search('does not exist');assert.equal(f.all('#physics-exercises article').length,0);assert.match(f.$('#physics-exercises').textContent,/No questions match/);
  assert.deepEqual(f.errors,[]);f.close();
});
test('tables and shared passages are readable before opening answers, and full wording is searchable',()=>{
  const f=fixture();
  for(const id of ['1.87','1.88','1.89']){
    f.search(id);const table=f.$('.question-table');assert.equal(table.closest('details'),null);
    assert.equal(table.parentElement.previousElementSibling,f.$('.question-text>p'));
    assert.equal(table.querySelectorAll('tbody tr').length,{'1.87':6,'1.88':4,'1.89':2}[id]);
    if(id==='1.87'){assert.match(table.textContent,/6.00 µg/);assert.match(table.textContent,/9.38 × 10⁶ µm³/);}
    assert.equal(f.$('.solution-panel').open,false);
  }
  for(const id of ['1.92','1.93','1.94']){f.search(id);assert.match(f.$('.question-passage').textContent,/480 × 10⁶/);assert.match(f.$('.question-passage').textContent,/4.2 × 10⁶ µm³/);}
  f.search('microwave and radio-wave bands');assert.equal(f.$('article[data-question]').dataset.question,'1.50');
  f.search('VP1.7.2');assert.match(f.$('.question-reference').textContent,/72.4 m/);assert.match(f.$('.question-text').textContent,/vec\(A\) − vec\(B\) \+ vec\(C\)/);
  assert.deepEqual(f.errors,[]);f.close();
});
test('users can reveal without writing, retain an independent attempt and safely reload saved text',async()=>{
  const f=fixture();f.search('1.31');const article=f.$('article[data-question]'),solution=article.querySelector('.solution-panel');
  solution.open=true;solution.dispatchEvent(new f.w.Event('toggle'));
  assert.match(solution.textContent,/2.811/);assert.equal(article.querySelector('.attempt-panel').open,false);
  const text='<img src=x onerror=alert(1)>\nI get 2.81 km northwest.';f.input(article.querySelector('textarea'),text);
  assert.equal(article.querySelector('.attempt-copy').textContent,text);assert.equal(article.querySelector('.attempt-copy img'),null);
  assert.match(article.querySelector('.save-status').textContent,/Saved/);
  const stored=Object.fromEntries(Object.keys(f.w.localStorage).map(k=>[k,f.w.localStorage.getItem(k)]));f.close();
  const g=fixture(390,stored);g.search('1.31');assert.equal(g.$('textarea').value,text);assert.equal(g.$('.solution-panel').open,false);assert.equal(g.$('.attempt-panel').open,true);g.close();
});
test('interactive vector checking rejects blanks and wrong signs, accepts a correct answer and preserves it when revealing',()=>{
  const f=fixture();f.search('1.66');const fields=f.all('.vector-part input');
  f.click('[data-check-vector]');assert.match(f.$('.vector-feedback').textContent,/Enter all three/);
  [8,12,22].forEach((v,i)=>f.input(fields[i],v));f.click('[data-check-vector]');assert.match(f.$('.vector-feedback').textContent,/Recheck the x/);
  f.input(fields[0],-8);f.click('[data-check-vector]');assert.match(f.$('.vector-feedback').textContent,/matches a valid result/);
  f.click('[data-reveal-answer]');assert.equal(f.$('.solution-panel').open,true);assert.deepEqual(fields.map(i=>i.value),['-8','12','22']);assert.match(f.$('.answer-svg').innerHTML,/Solution/);
  f.$('.solution-panel').open=false;f.$('.solution-panel').dispatchEvent(new f.w.Event('toggle'));assert.doesNotMatch(f.$('.answer-svg').innerHTML,/>Solution</);
  f.search('1.84');const p=f.w.PhysicsBook.items.find(i=>i.id==='1.84').interactive[0].expected;f.all('.vector-part input').forEach((el,i)=>f.input(el,-p[i]));f.click('[data-check-vector]');assert.match(f.$('.vector-feedback').textContent,/matches a valid result/);f.close();
});
test('full-screen lab opens from a worked answer, keeps controls usable and restores on close',()=>{
  const f=fixture();f.search('1.66');f.click('[data-explore="0"]');assert.equal(f.$('#physics-fullscreen').open,true);assert.equal(f.$('#physics-lab').parentElement.id,'physics-fullscreen');assert.equal(f.$('.physics-dock').open,false);assert.match(f.$('.lab-result').textContent,/-8, 12, 22/);
  f.click('[data-action="fit"]');f.click('[data-action="zoom-in"]');f.click('[data-action="left"]');assert.doesNotMatch(f.$('.physics-scene').innerHTML,/NaN|Infinity/);
  f.$('#physics-fullscreen').close();assert.equal(f.$('#physics-lab').parentElement.id,'physics-lab-home');assert.equal(f.d.body.style.overflow,'');assert.match(f.$('[data-action="fullscreen"]').textContent,/Full screen/);assert.deepEqual(f.errors,[]);f.close();
});
test('lab sliders, swapping, pointer gestures, keyboard and animation change the actual model',()=>{
  const f=fixture();f.input('#lab-a-x',6);assert.match(f.$('.lab-result').textContent,/6, 4, 0/);
  f.click('[data-preset="cross"]');assert.match(f.$('.lab-result').textContent,/0, 0, 6/);f.click('[data-action="swap"]');assert.match(f.$('.lab-result').textContent,/0, 0, -6/);
  let before=f.$('.physics-scene').innerHTML;f.point(f.$('.physics-scene'),'pointerdown',120,130);f.point(f.$('.physics-scene'),'pointermove',165,150);f.point(f.$('.physics-scene'),'pointerup',165,150);assert.notEqual(f.$('.physics-scene').innerHTML,before);
  before=f.$('.physics-scene').innerHTML;f.point(f.$('.physics-scene'),'pointerdown',100,100,1);f.point(f.$('.physics-scene'),'pointerdown',200,200,2);f.point(f.$('.physics-scene'),'pointermove',210,210,2);f.point(f.$('.physics-scene'),'pointermove',240,240,2);f.point(f.$('.physics-scene'),'pointerup',100,100,1);f.point(f.$('.physics-scene'),'pointerup',240,240,2);assert.notEqual(f.$('.physics-scene').innerHTML,before);
  f.click('[data-preset="walk"]');f.point(f.$('[data-handle="a"]'),'pointerdown',220,240);f.point(f.$('.physics-scene'),'pointermove',260,220);f.point(f.$('.physics-scene'),'pointerup',260,220);assert.notEqual(f.$('#lab-a-x').value,'3');
  f.click('[data-action="play"]');f.flush(0);f.flush(900);assert.equal(Number(f.$('[data-control="progress"]').value),.5);f.flush(1800);assert.equal(Number(f.$('[data-control="progress"]').value),1);
  f.click('[data-preset="space"]');f.input('#lab-a-z',0);f.click('[data-action="dimension"]');assert.match(f.$('[data-action="dimension"]').textContent,/3D/);
  assert.deepEqual(f.errors,[]);f.close();
});
test('quiz refuses blank scoring, explains an answer, prevents double scoring, and treats reveal as unscored',()=>{
  const f=fixture();f.$('#physics-quiz-form').dispatchEvent(new f.w.Event('submit',{bubbles:true,cancelable:true}));
  f.click('[data-quiz-action="check"]');assert.match(f.$('#physics-quiz-feedback').textContent,/Choose an answer/);
  const prompt=f.$('#physics-quiz h3').textContent,q=f.w.PhysicsContent.quiz.find(q=>q.prompt===prompt),correct=f.all('#physics-quiz input').find(el=>Number(el.value)===q.answer);
  correct.checked=true;correct.dispatchEvent(new f.w.Event('change',{bubbles:true}));f.click('[data-quiz-action="check"]');assert.match(f.$('#physics-quiz-feedback').textContent,/Correct/);assert.equal(f.$('[data-quiz-action="check"]').disabled,true);
  f.click('[data-quiz-action="next"]');f.click('[data-quiz-action="reveal"]');assert.match(f.$('#physics-quiz-feedback').textContent,/not scored/);
  for(let i=0;i<3;i++){f.click('[data-quiz-action="next"]');f.click('[data-quiz-action="reveal"]');}f.click('[data-quiz-action="next"]');assert.match(f.$('#physics-quiz').textContent,/1 independent correct out of 5/);assert.match(f.$('#physics-quiz').textContent,/Solutions viewed: 4/);
  for(let level=1;level<=4;level++)for(const type of ['problems','terms','language']){f.input('#physics-level',level,'change');f.input('#physics-quiz-type',type,'change');f.$('#physics-quiz-form').dispatchEvent(new f.w.Event('submit',{bubbles:true,cancelable:true}));assert.match(f.$('#physics-quiz').textContent,/OF 4/);}
  assert.deepEqual(f.errors,[]);f.close();
});
