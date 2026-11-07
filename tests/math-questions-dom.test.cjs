const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

// Run the real HTML script list and controllers. These tests check document
// content and behaviour, not physical phone layout, SVG painting or native dialogs.
function fixture(width=390,stored={}){
  const errors=[],frames=new Map();let nextFrame=0;
  const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(read('linear-algebra.html'),{url:'https://example.test/linear-algebra.html',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window,d=w.document;
  w.structuredClone=structuredClone;
  w.Element.prototype.scrollIntoView=function(){};
  w.Element.prototype.setPointerCapture=function(){};
  w.Element.prototype.getBoundingClientRect=function(){return {width,height:480,left:0,top:0,right:width,bottom:480};};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.matchMedia=()=>({matches:false});
  w.ResizeObserver=class{constructor(cb){this.cb=cb;}observe(){this.cb();}disconnect(){}};
  w.requestAnimationFrame=cb=>{frames.set(++nextFrame,cb);return nextFrame;};
  w.cancelAnimationFrame=id=>frames.delete(id);
  for(const [key,value]of Object.entries(stored))w.localStorage.setItem(key,value);
  for(const script of d.querySelectorAll('script[src]'))w.eval(read(script.getAttribute('src')));
  const $=selector=>d.querySelector(selector),all=selector=>Array.from(d.querySelectorAll(selector));
  const input=(element,value,event='input')=>{
    if(typeof element==='string')element=$(element);
    element.value=String(value);element.dispatchEvent(new w.Event(event,{bubbles:true}));
  };
  const section=set=>input('#book-topic',set,'change');
  const card=number=>d.getElementById('textbook-exercise-'+number);
  return {w,d,$,all,input,section,card,errors,close:()=>dom.window.close()};
}

test('all 437 mathematics cards show complete questions before independent hidden solutions and numbered steps',()=>{
  const f=fixture(),seen=new Set();
  const sections=Array.from(f.$('#book-topic').options,option=>option.value);
  assert.equal(sections.length,12);
  for(const set of sections){
    f.section(set);
    const entries=f.w.EmberTextbook.solutions[set];
    assert.equal(f.all('#book-list>article').length,entries.length,set);
    for(const problem of entries){
      const key=set+':'+problem.number,article=f.card(problem.number);
      assert.ok(article,key);assert.ok(!seen.has(key),key);seen.add(key);
      assert.equal(problem.textbookQuestion,true,key);
      const source=f.w.EmberMathQuestions[set][problem.number];
      assert.equal(problem.prompt,source.text,key);
      assert.doesNotMatch(problem.prompt,/Use exercise .+ in your copy of the textbook|Write your own answer or open the worked solution directly/i,key);
      const question=article.querySelector('.math-question'),attempt=article.querySelector('.attempt-panel'),solution=article.querySelector('.solution-panel');
      assert.equal(question.getAttribute('aria-label'),'Full textbook question',key);
      assert.equal(question.closest('details'),null,key);
      assert.ok(question.compareDocumentPosition(attempt)&4,key);
      assert.ok(attempt.compareDocumentPosition(solution)&4,key);
      assert.deepEqual(Array.from(question.querySelectorAll('.math-question-copy>p'),p=>p.textContent),Array.from(f.w.EmberLearning.readable(problem.prompt).split(/\n\s*\n/)),key);
      assert.equal(attempt.open,false,key);assert.equal(solution.open,false,key);
      const steps=Array.from(solution.querySelectorAll('.math-worked-steps>li'));
      assert.ok(steps.length>0,key);
      for(let i=0;i<steps.length;i++){
        assert.equal(steps[i].querySelector('.math-step-label').textContent,`Step ${i+1}`,key);
        assert.ok(steps[i].querySelector('p').textContent.trim(),key);
      }
      const final=solution.querySelector('.math-final-answer');
      assert.equal(final.querySelector('h4').textContent,'The final answer is…',key);
      assert.equal(final.querySelector('.worked-result').textContent,f.w.EmberLearning.readable(problem.answer),key);
      assert.ok(steps.at(-1).compareDocumentPosition(final)&4,key);
      assert.equal(solution.lastElementChild.lastElementChild,final,key);
    }
    const ids=f.all('[id]').map(element=>element.id);assert.equal(new Set(ids).size,ids.length,set);
  }
  assert.equal(seen.size,437);assert.deepEqual(f.errors,[]);f.close();
});

test('required mathematics figures and references appear with the question before any answer is opened',()=>{
  const f=fixture(1180);let figures=0,references=0;
  for(const [set,entries]of Object.entries(f.w.EmberTextbook.solutions)){
    f.section(set);
    for(const problem of entries){
      const article=f.card(problem.number),question=article.querySelector('.math-question'),solution=article.querySelector('.solution-panel');
      const images=Array.from(question.querySelectorAll('img')),expected=problem.questionFigures||[];
      assert.equal(images.length,expected.length,set+':'+problem.number);
      expected.forEach((figure,i)=>{
        figures++;
        const target='assets/mathematics/questions/'+figure.file;
        assert.equal(images[i].getAttribute('src'),target);
        assert.equal(images[i].getAttribute('alt'),figure.alt);
        assert.ok(figure.alt.trim().length>20);
        assert.equal(images[i].closest('details'),null);
        assert.ok(fs.existsSync(path.join(root,target)),target);
        assert.equal(images[i].parentElement.getAttribute('href'),target);
        assert.ok(question.compareDocumentPosition(solution)&4);
      });
      if(problem.questionReference){
        references++;
        const reference=question.querySelector('.math-question-reference');
        assert.equal(reference.querySelector('p').textContent,f.w.EmberLearning.readable(problem.questionReference));
        assert.equal(reference.closest('details'),null);
      }
      assert.equal(solution.open,false);
    }
  }
  assert.ok(figures>0);assert.ok(references>0);assert.deepEqual(f.errors,[]);f.close();
});

test('learners can open an answer without writing, or keep their own attempt visible alongside it',()=>{
  const f=fixture();const article=f.card('1'),attempt=article.querySelector('.attempt-panel'),solution=article.querySelector('.solution-panel');
  solution.querySelector('summary').click();
  assert.equal(solution.open,true);assert.equal(attempt.open,false);
  assert.equal(article.querySelector('textarea').value,'');
  attempt.querySelector('summary').click();assert.equal(attempt.open,true);assert.equal(solution.open,true);
  f.input(article.querySelector('textarea'),'My answer: a, c and f are linear.\nEach variable has power 1.');
  assert.equal(article.querySelector('.attempt-comparison').hidden,false);
  assert.equal(article.querySelector('.attempt-copy').textContent,article.querySelector('textarea').value);
  assert.match(article.querySelector('.save-status').textContent,/Saved/);
  solution.querySelector('summary').click();assert.equal(solution.open,false);assert.equal(attempt.open,true);
  assert.deepEqual(f.errors,[]);f.close();
});

test('legacy answer keys restore exactly and learner text remains escaped after saving and reloading',()=>{
  const legacyKey='ember-linear-algebra:book-1.2-0',original='My earlier saved work.\nI used row 2 first.';
  const f=fixture(390,{[legacyKey]:original});f.section('1.2');
  const article=f.card('9'),input=article.querySelector('textarea');
  assert.equal(input.dataset.attempt,'book-1.2-0');assert.equal(input.value,original);
  assert.equal(article.querySelector('.attempt-panel').open,true);assert.equal(article.querySelector('.solution-panel').open,false);
  assert.equal(article.querySelector('.attempt-copy').textContent,original);
  const text='<img src=x onerror="alert(1)">\n<script>alert(2)</script>\nMy result is x < 3 & y > 2.';
  f.input(input,text);assert.equal(f.w.localStorage.getItem(legacyKey),text);
  assert.equal(article.querySelector('.attempt-copy').textContent,text);
  assert.equal(article.querySelector('.attempt-copy img, .attempt-copy script'),null);
  const saved=Object.fromEntries(Object.keys(f.w.localStorage).map(key=>[key,f.w.localStorage.getItem(key)]));f.close();
  const g=fixture(390,saved);g.section('1.2');const restored=g.card('9');
  assert.equal(restored.querySelector('textarea').value,text);
  assert.equal(restored.querySelector('.attempt-copy').textContent,text);
  assert.equal(restored.querySelector('.attempt-copy img, .attempt-copy script'),null);
  assert.equal(restored.querySelector('.attempt-panel').open,true);
  assert.equal(restored.querySelector('.solution-panel').open,false);
  assert.deepEqual(g.errors,[]);g.close();
});

test('unavailable browser storage leaves mathematics writing and solution disclosure usable',()=>{
  const f=fixture();f.w.Storage.prototype.setItem=function(){throw new Error('Storage unavailable');};
  const article=f.card('1');f.input(article.querySelector('textarea'),'This attempt stays on the current page.');
  assert.match(article.querySelector('.save-status').textContent,/Saving is unavailable/);
  assert.equal(article.querySelector('.attempt-copy').textContent,'This attempt stays on the current page.');
  article.querySelector('.solution-panel>summary').click();assert.equal(article.querySelector('.solution-panel').open,true);
  assert.deepEqual(f.errors,[]);f.close();
});
