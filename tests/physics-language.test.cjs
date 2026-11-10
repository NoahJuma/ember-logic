const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

// Execute the HTML's actual script list, including initialization and locales.
// Browser geometry and native dialogs are simulated; no visual-layout claims.
function fixture({lang='en',stored={},browserLanguage='en-US'}={}){
  const errors=[],vc=new VirtualConsole();vc.on('jsdomError',error=>errors.push(error.message));
  const dom=new JSDOM(read('physics-chapter1.html'),{url:'https://example.test/physics-chapter1.html'+(lang?'?lang='+lang:''),runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window,d=w.document;
  Object.defineProperty(w.navigator,'language',{value:browserLanguage});
  w.Element.prototype.scrollIntoView=function(){};
  w.Element.prototype.setPointerCapture=function(){};
  w.Element.prototype.getBoundingClientRect=function(){return{width:390,height:this.classList.contains('answer-svg')?280:480,left:0,top:0,right:390,bottom:480};};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.matchMedia=()=>({matches:false});
  w.ResizeObserver=class{constructor(cb){this.cb=cb;}observe(){this.cb();}disconnect(){}};
  w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};
  for(const [key,value]of Object.entries(stored))w.localStorage.setItem(key,value);
  for(const node of d.querySelectorAll('script[src]'))w.eval(read(node.getAttribute('src').split('?')[0]));
  const $=selector=>d.querySelector(selector),all=selector=>Array.from(d.querySelectorAll(selector));
  const input=(selector,value,type='input')=>{const node=typeof selector==='string'?$(selector):selector;assert.ok(node,selector);node.value=String(value);node.dispatchEvent(new w.Event(type,{bubbles:true}));};
  const click=selector=>{const node=typeof selector==='string'?$(selector):selector;assert.ok(node,selector);node.click();};
  const language=value=>input('#physics-language',value,'change');
  const search=value=>{input('#physics-set','all','change');input('#physics-topic','all','change');input('#physics-search',value);};
  return{w,d,$,all,input,click,language,search,errors,close:()=>dom.window.close()};
}

test('physics language follows URL, saved choice and browser preference in that order',()=>{
  for(const [config,expected]of [
    [{lang:'sv'},'sv'],[{lang:'en',browserLanguage:'sv-SE'},'en'],
    [{lang:null,browserLanguage:'sv-SE'},'sv'],
    [{lang:null,stored:{'ember-physics:language':'"en"'},browserLanguage:'sv-SE'},'en'],
    [{lang:null,stored:{'ember-physics:language':'"sv"'}},'sv'],
    [{lang:'invalid',stored:{'ember-physics:language':'broken'}},'en']
  ]){
    const f=fixture(config);assert.equal(f.d.documentElement.lang,expected);assert.equal(f.$('#physics-language').value,expected);
    assert.match(f.d.title,expected==='sv'?/Fysik/:/Physics/);assert.deepEqual(f.errors,[]);f.close();
  }
});

test('all Swedish lessons, quiz questions and 136 worked entries retain numerical data and structure',()=>{
  const f=fixture(),english=JSON.parse(JSON.stringify({content:f.w.PhysicsContent,items:f.w.PhysicsBook.items}));
  const sourceQuestions=Object.fromEntries(f.w.PhysicsBook.items.map(item=>[item.id,JSON.parse(JSON.stringify(f.w.PhysicsQuestions.get(item.id)))]));
  const numbers=text=>(String(text).match(/[−-]?\d+(?:[.,]\d+)?|[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉]+/g)||[]).map(n=>n.replace(',','.'));
  f.language('sv');const swedish=f.w.PhysicsContent;
  assert.equal(swedish.lessons.length,10);assert.equal(swedish.glossary.length,16);assert.equal(swedish.quiz.length,72);
  swedish.lessons.forEach((lesson,i)=>{assert.equal(lesson.id,english.content.lessons[i].id);assert.equal(lesson.steps.length,english.content.lessons[i].steps.length);assert.notEqual(lesson.title,english.content.lessons[i].title);});
  swedish.quiz.forEach((question,i)=>{const en=english.content.quiz[i];assert.equal(question.id,en.id);assert.equal(question.answer,en.answer);assert.equal(question.level,en.level);assert.equal(question.type,en.type);assert.equal(question.options.length,en.options.length);assert.notEqual(question.prompt,en.prompt);if(question.why===en.why)assert.equal(question.why,'ΔA≈WΔL+LΔW=2×0.1+10×0.1=1.2 cm².');});
  assert.equal(Object.keys(f.w.PhysicsLocales.sv.items).length,136);
  f.w.PhysicsBook.items.forEach((item,i)=>{
    const en=english.items[i];assert.equal(item.id,en.id);assert.equal(item.steps.length,en.steps.length,item.id);assert.notEqual(item.title,en.title,item.id);assert.notEqual(item.prompt,en.prompt,item.id);
    item.steps.forEach((step,n)=>assert.deepEqual(numbers(step),numbers(en.steps[n]),item.id+' step '+n));
    assert.deepEqual(numbers(item.answer),numbers(en.answer),item.id+' answer');
    const question=f.w.PhysicsQuestions.get(item.id),original=sourceQuestions[item.id];
    for(const field of ['text','reference','passage'])assert.deepEqual(numbers(question[field]),numbers(original[field]),item.id+' question '+field);
    if(question.table)assert.deepEqual(Array.from(question.table.rows,row=>Array.from(row,numbers)),original.table.rows.map(row=>row.map(numbers)),item.id+' table');
    (item.interactive||[]).forEach((part,j)=>{for(const key of ['a','b','expected','legs','destination','mode','check'])assert.equal(JSON.stringify(part[key]),JSON.stringify(en.interactive[j][key]),item.id+' '+key);});
  });
  f.language('en');assert.equal(JSON.stringify(f.w.PhysicsContent),JSON.stringify(english.content));
  assert.equal(JSON.stringify(f.w.PhysicsBook.items),JSON.stringify(english.items));
  assert.deepEqual(f.errors,[]);f.close();
});

test('all 136 Swedish cards show full translated questions, numbered steps, tables and Swedish figures',()=>{
  const f=fixture({lang:'sv'});f.input('#physics-set','all','change');const seen=new Set();let figures=0;
  do{
    for(const card of f.all('#physics-exercises article')){
      const id=card.dataset.question,q=f.w.PhysicsQuestions.get(id),item=f.w.PhysicsBook.items.find(x=>x.id===id);seen.add(id);
      assert.equal(Array.from(card.querySelectorAll('.question-text>p'),p=>p.textContent).join('\n'),q.text,id);
      assert.equal(card.querySelector('.solution-panel').open,false,id);
      const steps=Array.from(card.querySelectorAll('.numbered-solution>li'));
      assert.equal(steps.length,item.steps.length,id);steps.forEach((step,i)=>{assert.equal(step.querySelector('strong').textContent,'Steg '+(i+1),id);assert.equal(step.querySelector('p').textContent,item.steps[i],id);});
      assert.equal(card.querySelector('.final-answer .answer').textContent,item.answer,id);
      assert.doesNotMatch(card.textContent,/Show worked solution|Write my answer|Step \d|The final answer is|Need the basics|Compare one step/i,id);
      if(q.figure){figures++;const img=card.querySelector('.question-figure img');assert.equal(img.getAttribute('src'),'assets/physics/questions/'+q.figure.file);assert.match(q.figure.file,/^sv\//);assert.ok(fs.existsSync(path.join(root,img.getAttribute('src'))));assert.equal(img.alt,q.figure.alt);}
      if(q.table){assert.equal(card.querySelector('caption').textContent,q.table.caption);assert.equal(card.querySelectorAll('tbody tr').length,q.table.rows.length);}
    }
    if(f.$('#physics-next').disabled)break;f.click('#physics-next');
  }while(true);
  assert.equal(seen.size,136);assert.ok(figures>=11);assert.equal(f.w.PhysicsI18n.missing.size,0);assert.deepEqual(f.errors,[]);f.close();
});

test('language changes preserve written work, vector components, disclosure state and saved keys',()=>{
  const f=fixture();f.search('1.31');const before=f.$('article[data-question]');
  f.click(before.querySelector('.attempt-panel>summary'));
  f.input(before.querySelector('textarea'),'Mitt eget svar <script>inget körs</script>');
  const part=before.querySelector('.vector-part');assert.ok(part);
  const inputs=Array.from(part.querySelectorAll('[data-candidate]'));[2.5,-3.5,1].forEach((value,i)=>f.input(inputs[i],value));
  f.click(before.querySelector('.solution-panel>summary'));
  f.language('sv');let card=f.$('article[data-question]');
  assert.equal(card.dataset.question,'1.31');assert.equal(card.querySelector('textarea').value,'Mitt eget svar <script>inget körs</script>');
  assert.equal(card.querySelector('.attempt-panel').open,true);assert.equal(card.querySelector('.solution-panel').open,true);
  assert.deepEqual(Array.from(card.querySelectorAll('.vector-part [data-candidate]'),n=>n.value),['2.5','-3.5','1']);
  assert.equal(card.querySelector('.attempt-copy script'),null);
  f.language('en');card=f.$('article[data-question]');assert.equal(card.querySelector('textarea').value,'Mitt eget svar <script>inget körs</script>');
  assert.equal(f.w.localStorage.getItem('ember-physics:answer-1.31'),'"Mitt eget svar <script>inget körs</script>"');
  assert.equal(f.w.localStorage.getItem('ember-physics:language'),'"en"');assert.equal(new URL(f.w.location.href).searchParams.get('lang'),'en');
  assert.deepEqual(f.errors,[]);f.close();
});

test('language switching retains a quiz question, option order, selection and scored result',()=>{
  const f=fixture();f.$('#physics-quiz-form').dispatchEvent(new f.w.Event('submit',{bubbles:true,cancelable:true}));
  const englishPrompt=f.$('#physics-quiz h3').textContent,q=f.w.PhysicsContent.quiz.find(x=>x.prompt===englishPrompt),order=f.all('[name=physics-choice]').map(x=>x.value);
  f.click(`[name=physics-choice][value="${q.answer}"]`);f.language('sv');
  const translated=f.w.PhysicsContent.quiz.find(x=>x.id===q.id);
  assert.equal(f.$('#physics-quiz h3').textContent,translated.prompt);assert.deepEqual(f.all('[name=physics-choice]').map(x=>x.value),order);
  assert.equal(f.$('[name=physics-choice]:checked').value,String(q.answer));
  f.click('[data-quiz-action=check]');assert.match(f.$('#physics-quiz-feedback').textContent,/Rätt/);
  f.language('en');assert.equal(f.$('#physics-quiz h3').textContent,englishPrompt);assert.match(f.$('#physics-quiz-feedback').textContent,/Correct/);assert.equal(f.$('[data-quiz-action=check]').disabled,true);
  f.language('sv');f.click('[data-quiz-action=next]');assert.match(f.$('#physics-quiz .kicker').textContent,/2/);
  assert.deepEqual(f.errors,[]);f.close();
});

test('language switching preserves current lab values and fullscreen and translates all modes',()=>{
  const f=fixture();f.click('[data-preset=space]');f.input('#lab-a-x',7.5);
  f.click('[data-action=fullscreen]');assert.equal(f.$('#physics-fullscreen').open,true);
  f.language('sv');assert.equal(f.$('#physics-fullscreen').open,true);assert.equal(f.$('#lab-a-x').value,'7.5');
  assert.equal(f.$('#physics-lab').parentElement.id,'physics-fullscreen');
  for(const mode of ['add','subtract','components','unit','dot','cross','route']){
    f.input('[data-control=mode]',mode,'change');
    assert.doesNotMatch(f.$('#physics-lab').textContent,/Show calculation|Signed components|Length =|Vector lab|Swap A and B|Your vector/);
    assert.doesNotMatch(f.$('#physics-lab svg').innerHTML,/Your vector|\bSolution\b|\bDestination\b|\bRemaining\b|\bResult\b|Unit direction|Vector model/);
  }
  assert.equal(f.w.PhysicsI18n.missing.size,0);assert.deepEqual(f.errors,[]);f.close();
});

test('bilingual search and language switching remain useful when storage is unavailable',()=>{
  const f=fixture();f.search('density');const count=f.$('#physics-count').textContent.match(/^\d+/)[0],id=f.$('article[data-question]').dataset.question;
  f.w.Storage.prototype.setItem=function(){throw new Error('Unavailable');};
  f.input(f.$('article[data-question] textarea'),'Spara mitt resonemang i den här fliken.');
  f.language('sv');assert.equal(f.$('#physics-count').textContent.match(/^\d+/)[0],count);assert.equal(f.$('article[data-question]').dataset.question,id);
  assert.equal(f.$('article[data-question] textarea').value,'Spara mitt resonemang i den här fliken.');
  f.search('densitet');assert.ok(f.all('#physics-exercises article').length>0);
  f.input('#unit-value','');assert.doesNotMatch(f.$('#unit-result').textContent,/Enter an amount/);assert.match(f.$('#unit-result').textContent,/Ange/);
  f.input('#cube-size',4);assert.match(f.$('#cube-result').textContent,/64/);assert.doesNotMatch(f.$('#cube-result').textContent,/blocks|cubic units|Doubling/);
  assert.deepEqual(f.errors,[]);f.close();
});

test('guided vector questions remain readable in both languages',()=>{
  for(const lang of ['sv','en']){
    const f=fixture({lang});
    for(const id of ['VP1.7.1','VP1.7.2','VP1.10.1']){
      f.search(id);
      const card=f.$(`article[data-question="${id}"]`);
      assert.ok(card,id);
      assert.match(card.querySelector('.question-text').textContent,/vec\([A-D]\)/,id);
      assert.doesNotMatch(card.textContent,/\u20d7/,id);
    }
    assert.match(f.$('[data-i18n="translationNote"]').textContent,/vec\(A\)/);
    assert.deepEqual(f.errors,[]);f.close();
  }
});
