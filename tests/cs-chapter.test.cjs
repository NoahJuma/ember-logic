const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const counts=[6,4,6,10,5,11,4,4,7,6];
const ids=counts.flatMap((count,index)=>Array.from({length:count},(_,i)=>`section-1.${index+1}-${i+1}`)).concat(Array.from({length:61},(_,i)=>`review-${i+1}`),Array.from({length:7},(_,i)=>`social-${i+1}`));
const draftKey=id=>'ember-cs-chapter1:attempt:'+id;
const displayed=value=>String(value).replace(/^```(?:python|text)?[ \t]*$/gm,'').replace(/\s+/g,' ').trim();

// Execute the real page's script list. Geometry/native browser APIs are stubbed:
// these assertions verify behavior and content, not visual layout or touch feel.
function fixture({lang='en',stored={},browserLanguage='en-US',noStorage=false,baseOnly=false}={}){
  const errors=[],vc=new VirtualConsole();
  vc.on('jsdomError',error=>errors.push(error.message));
  const dom=new JSDOM(read('computer-science.html'),{url:'https://example.test/computer-science.html'+(lang?'?lang='+lang:''),runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window,d=w.document;
  Object.defineProperty(w.navigator,'language',{value:browserLanguage});
  w.structuredClone=globalThis.structuredClone;
  w.Element.prototype.scrollIntoView=function(){};
  w.Element.prototype.setPointerCapture=function(){};
  w.Element.prototype.releasePointerCapture=function(){};
  w.Element.prototype.getBoundingClientRect=function(){return{width:390,height:480,left:0,top:0,right:390,bottom:480};};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
  w.ResizeObserver=class{constructor(callback){this.callback=callback;}observe(){this.callback([]);}disconnect(){}};
  w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};
  for(const[key,value]of Object.entries(stored))w.localStorage.setItem(key,value);
  if(noStorage){w.Storage.prototype.getItem=function(){throw new Error('Storage unavailable');};w.Storage.prototype.setItem=function(){throw new Error('Storage unavailable');};}
  for(const node of d.querySelectorAll('script[src]')){
    const file=node.getAttribute('src').split('?')[0];
    if(!baseOnly||file==='cs-chapter-base.js')w.eval(read(file));
  }
  const $=selector=>d.querySelector(selector),all=selector=>Array.from(d.querySelectorAll(selector));
  const input=(selector,value,type='input')=>{const node=typeof selector==='string'?$(selector):selector;assert.ok(node,String(selector));node.value=String(value);node.dispatchEvent(new w.Event(type,{bubbles:true}));};
  const click=selector=>{const node=typeof selector==='string'?$(selector):selector;assert.ok(node,String(selector));node.click();};
  const submit=selector=>{const node=$(selector);assert.ok(node,selector);node.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));};
  const language=value=>input('#cs-language',value,'change');
  const card=id=>d.getElementById('cs-exercise-'+id);
  const search=value=>{input('#cs-book-topic','all','change');input('#cs-book-search',value);};
  return{w,d,$,all,input,click,submit,language,card,search,errors,close:()=>w.close()};
}

function assertBilingual(value,label){
  for(const language of ['en','sv'])assert.ok(typeof value?.[language]==='string'&&value[language].trim().length>0,`${label}.${language}`);
}

test('computer-science language preference uses URL, saved JSON, then browser language',()=>{
  for(const[config,expected]of[
    [{lang:'sv'},'sv'],[{lang:'en',browserLanguage:'sv-SE'},'en'],
    [{lang:null,browserLanguage:'sv-SE'},'sv'],
    [{lang:null,stored:{'ember-cs-chapter1:language':'"en"'},browserLanguage:'sv-SE'},'en'],
    [{lang:null,stored:{'ember-cs-chapter1:language':'"sv"'}},'sv'],
    [{lang:'invalid',stored:{'ember-cs-chapter1:language':'broken'}},'en'],
    [{lang:null,browserLanguage:'sv-SE',noStorage:true},'sv']
  ]){
    const f=fixture({...config,baseOnly:true});assert.equal(f.w.CSChapterUI.language,expected);assert.equal(f.d.documentElement.lang,expected);assert.deepEqual(f.errors,[]);f.close();
  }
});

test('language changes emit one chapter event and retain unrelated query parameters and anchor',()=>{
  const f=fixture({baseOnly:true});f.w.history.replaceState(null,'','?from=class&lang=en#book');let changes=0;
  f.d.addEventListener('cslanguagechange',()=>changes++);
  f.w.CSChapterUI.setLanguage('sv');f.w.CSChapterUI.setLanguage('sv');f.w.CSChapterUI.setLanguage('unsupported');
  assert.equal(changes,1);assert.equal(f.w.localStorage.getItem('ember-cs-chapter1:language'),'"sv"');
  const url=new URL(f.w.location.href);assert.equal(url.searchParams.get('lang'),'sv');assert.equal(url.searchParams.get('from'),'class');assert.equal(url.hash,'#book');
  assert.equal(f.w.CSChapterUI.t('one','ett'),'ett');assert.equal(f.w.CSChapterUI.text({en:'two',sv:'två'}),'två');f.close();
});

test('chapter contains every source exercise exactly once, including all four section 1.2 questions',()=>{
  const f=fixture(),items=f.w.CSChapter.exercises;
  assert.equal(items.length,131);assert.deepEqual(Array.from(items,item=>item.id).sort(),ids.slice().sort());
  const expectedPages=[[47,48],[51],[56,57],[63,64],[70],[76,77],[82,83],[90,91],[97],[101]];
  for(const item of items){
    assertBilingual(item.title,item.id+' title');assertBilingual(item.question,item.id+' question');assertBilingual(item.answer,item.id+' answer');
    assert.ok(item.question.en.length>20,item.id+' complete question');
    for(const lang of ['en','sv']){assert.ok(Array.isArray(item.steps?.[lang]),item.id+' steps '+lang);assert.ok(item.steps[lang].length>=2,item.id+' pedagogical steps '+lang);item.steps[lang].forEach(step=>assert.ok(typeof step==='string'&&step.trim().length>0,item.id+' nonempty step'));}
    assert.equal(item.steps.en.length,item.steps.sv.length,item.id+' translated step count');
    const allowed=item.section==='review'?[102,103,104,105,106,107]:item.section==='social'?[107,108]:expectedPages[Number(item.section.split('.')[1])-1];
    assert.ok(allowed?.includes(item.page),item.id+' source page');
    assert.doesNotMatch(item.answer.en,/TODO|coming soon|solution pending|placeholder/i,item.id);
  }
  assert.deepEqual(f.errors,[]);f.close();
});

test('all ten topics have bilingual lessons, glossary definitions, and every quiz difficulty/type combination',()=>{
  const f=fixture(),data=f.w.CSChapter;
  assert.deepEqual(Array.from(data.lessons,lesson=>lesson.id),counts.map((_,i)=>`1.${i+1}`));
  for(const lesson of data.lessons){
    for(const key of ['title','intro','example','takeaway'])assertBilingual(lesson[key],lesson.id+' '+key);
    assertBilingual(lesson.check.question,lesson.id+' check');assertBilingual(lesson.check.answer,lesson.id+' check answer');
    assert.ok(lesson.steps.en.length>=2,lesson.id);assert.equal(lesson.steps.en.length,lesson.steps.sv.length,lesson.id);
  }
  assert.ok(data.glossary.length>=30);for(const entry of data.glossary){assertBilingual(entry.term,'term');assertBilingual(entry.meaning,'meaning');}
  assert.ok(data.quiz.length>=120);assert.equal(new Set(Array.from(data.quiz,q=>q.id)).size,data.quiz.length);
  for(const q of data.quiz){
    assertBilingual(q.question,q.id);assertBilingual(q.explanation,q.id+' explanation');
    assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4,q.id+' correct option');
    for(const lang of ['en','sv']){assert.equal(q.options[lang].length,4,q.id+' options');q.options[lang].forEach(option=>assert.ok(typeof option==='string'&&option.trim(),q.id));}
  }
  for(const section of data.lessons.map(lesson=>lesson.id))for(const level of [1,2,3,4])for(const type of ['problems','terms','language'])assert.ok(data.quiz.some(q=>q.section===section&&q.level===level&&q.type===type),`${section} level ${level} ${type}`);
  assert.deepEqual(f.errors,[]);f.close();
});

test('translated textbook questions retain their numerical data and binary patterns',()=>{
  const f=fixture();
  const numericalData=(value,language)=>{
    let text=value.normalize('NFKC').replace(/[−–]/g,'-');
    if(language==='en')text=text.replace(/(\d),(?=\d{3}(?:\D|$))/g,'$1');
    else text=text.replace(/\b\d{1,3}(?:[ \u00a0]\d{3})+\b/g,group=>group.replace(/[ \u00a0]/g,'')).replace(/(\d),(?=\d)/g,'$1.');
    // Signs and prose word numbers are checked in targeted mathematical cases;
    // here preserve each printed numeral, its multiplicity, and leading zeros.
    return(text.match(/\d+(?:\.\d+)?/g)||[]).sort();
  };
  for(const item of f.w.CSChapter.exercises){
    const en=numericalData(item.question.en,'en'),sv=numericalData(item.question.sv,'sv');
    // Swedish may add a translation of a literal English ASCII sentence; that
    // legitimately repeats numbers. Every original printed numeral must remain.
    for(const value of new Set(en))assert.ok(sv.filter(x=>x===value).length>=en.filter(x=>x===value).length,`${item.id}: missing numeral ${value}`);
  }
  assert.deepEqual(f.errors,[]);f.close();
});

test('worked answers resolve the source edition’s numbering and floating-point answer-key traps',()=>{
  const f=fixture(),get=id=>f.w.CSChapter.exercises.find(item=>item.id===id);
  assert.match(get('section-1.2-4').answer.en.replace(/[,\s]/g,''),/32768/);
  assert.match(get('section-1.2-3').question.en,/swap|interchange|exchange/i);
  assert.match(get('section-1.6-7').question.en,/3 − \(−2\)/);assert.match(get('section-1.6-7').answer.en,/b[.)]\s*0101\s*=\s*5\b/);
  for(const language of ['en','sv']){
    const smallest=get('section-1.7-4').answer[language];assert.match(smallest,/1\/32/);assert.match(smallest,/00001000/);assert.match(smallest,/1\/256/);assert.match(smallest,/00000001/);
    const review40=get('review-40'),worked=review40.steps[language].join('\n')+'\n'+review40.answer[language];assert.match(worked,/13\/128/);assert.match(worked,/12\/128|3\/32/);
    assert.match(get('review-39').answer[language],/1[.,]875|15\/8/);
    for(const word of ['HE','FED','DEAD','CABBAGE','CAFE'])assert.match(get('review-54').answer[language],new RegExp('\\b'+word+'\\b'));
  }
  assert.match(get('section-1.9-2').steps.en.join('\n'),/whole.word|complete word/);assert.match(get('section-1.9-2').steps.en.join('\n'),/not the usual|not standard/);
  assert.match(get('section-1.10-1').answer.en,/\(b\).*\(c\).*\(e\)/);
  assert.deepEqual(f.errors,[]);f.close();
});

test('parity exercise answers preserve every literal character and satisfy the stated parity rule',()=>{
  const f=fixture(),get=id=>f.w.CSChapter.exercises.find(item=>item.id===id);
  for(const[id,messages,parity]of[
    ['section-1.10-4',['"Stop!" Cheryl shouted.','Does 2 + 3 = 5?'],1],
    ['review-51',['Does 100/5 = 20?','The total cost is $7.25.'],0]
  ]){
    const answer=get(id).answer.en,groups=answer.split(/\n\s*\n/);assert.equal(groups.length,messages.length,id);
    groups.forEach((group,index)=>{
      const bytes=group.match(/\b[01]{8}\b/g)||[];assert.equal(bytes.length,messages[index].length,id+' character count');
      assert.equal(bytes.map(bits=>String.fromCharCode(parseInt(bits,2)&127)).join(''),messages[index],id+' literal text');
      bytes.forEach(bits=>assert.equal([...bits].filter(bit=>bit==='1').length%2,parity,id+' '+bits));
    });
  }
  assert.deepEqual(f.errors,[]);f.close();
});

test('every book card shows its complete bilingual question, separate writing area, and initially hidden numbered solution',()=>{
  const f=fixture();f.input('#cs-book-topic','all','change');
  for(const lang of ['en','sv']){
    f.language(lang);
    for(const item of f.w.CSChapter.exercises){
      const card=f.card(item.id);assert.ok(card,item.id);assert.equal(displayed(card.querySelector('.cs-question-copy').textContent),displayed(item.question[lang]),item.id+' '+lang+' question');
      const attempt=card.querySelector('.attempt-panel'),solution=card.querySelector('.solution-panel'),textarea=card.querySelector('textarea[data-attempt]');
      assert.ok(attempt&&solution&&textarea,item.id);assert.notEqual(attempt,solution);assert.ok(!solution.contains(textarea),item.id+' writing independent of solution');assert.equal(solution.open,false,item.id+' hidden solution');
      const steps=Array.from(card.querySelectorAll('.cs-solution-steps li'));assert.equal(steps.length,item.steps[lang].length,item.id);
      steps.forEach((step,i)=>assert.ok(displayed(step.textContent).includes(displayed(item.steps[lang][i])),item.id+' step '+(i+1)));
      assert.ok(displayed(card.querySelector('.cs-final-answer').textContent).includes(displayed(item.answer[lang])),item.id+' final answer');
      const code=[item.question[lang],...item.steps[lang],item.answer[lang]].flatMap(text=>Array.from(text.matchAll(/```(?:python|text)?\n([\s\S]*?)```/g),match=>match[1].replace(/\n$/,'')));
      assert.deepEqual(Array.from(card.querySelectorAll('pre.cs-code>code'),node=>node.textContent),code,item.id+' code and indentation');
      for(const img of card.querySelectorAll('img')){assert.ok(img.alt.trim(),item.id+' accessible figure');assert.ok(fs.existsSync(path.join(root,img.getAttribute('src'))),item.id+' local figure');}
    }
  }
  assert.equal(f.all('#cs-book-list article').length,131);assert.deepEqual(f.errors,[]);f.close();
});

test('a learner can reveal a solution directly or write and compare; switching language preserves drafts, filters and disclosures',()=>{
  const id='section-1.2-3',draft='Mitt eget svar <script>window.injected=true</script>',f=fixture();
  f.input('#cs-book-topic','1.2','change');let card=f.card(id);assert.ok(card);
  f.click(card.querySelector('.solution-panel>summary'));assert.equal(card.querySelector('.solution-panel').open,true);assert.equal(card.querySelector('textarea').value,'');
  f.click(card.querySelector('.attempt-panel>summary'));f.input(card.querySelector('textarea'),draft);
  f.language('sv');card=f.card(id);assert.equal(f.$('#cs-book-topic').value,'1.2');assert.equal(card.querySelector('textarea').value,draft);assert.equal(card.querySelector('.attempt-panel').open,true);assert.equal(card.querySelector('.solution-panel').open,true);assert.equal(card.querySelector('script'),null);assert.equal(f.w.injected,undefined);
  const saved=f.w.localStorage.getItem(draftKey(id));assert.ok(saved===draft||saved===JSON.stringify(draft),'draft persists');
  f.language('en');assert.equal(f.card(id).querySelector('textarea').value,draft);
  const stored={};for(let i=0;i<f.w.localStorage.length;i++){const key=f.w.localStorage.key(i);stored[key]=f.w.localStorage.getItem(key);}
  const reloaded=fixture({stored});reloaded.input('#cs-book-topic','1.2','change');assert.equal(reloaded.card(id).querySelector('textarea').value,draft);
  assert.deepEqual(f.errors,[]);assert.deepEqual(reloaded.errors,[]);f.close();reloaded.close();
});

test('English and Swedish search remain available in both languages and unsaved drafts survive unavailable storage',()=>{
  const f=fixture({noStorage:true});f.search('parity');const initial=f.all('#cs-book-list article').map(card=>card.id);assert.ok(initial.length>0);
  const id=initial[0].replace('cs-exercise-','');f.input(f.card(id).querySelector('textarea'),'My reasoning stays in this tab.');
  f.language('sv');assert.equal(f.$('#cs-book-search').value,'parity');assert.deepEqual(f.all('#cs-book-list article').map(card=>card.id),initial);assert.equal(f.card(id).querySelector('textarea').value,'My reasoning stays in this tab.');
  f.search('paritet');assert.ok(f.all('#cs-book-list article').length>0);f.language('en');assert.ok(f.all('#cs-book-list article').length>0);
  f.search('no-result-xyz-8675309');assert.equal(f.all('#cs-book-list article').length,0);f.search('');assert.equal(f.all('#cs-book-list article').length,131);
  assert.deepEqual(f.errors,[]);f.close();
});

test('quiz preserves question, shuffled option order, selection, and scored feedback across language changes',()=>{
  const f=fixture();f.input('#cs-quiz-level','3','change');f.input('#cs-quiz-type','problems','change');f.input('#cs-quiz-topic','1.6','change');f.submit('#cs-quiz-form');
  const play=f.$('#cs-quiz-play'),id=play.dataset.questionId,q=f.w.CSChapter.quiz.find(q=>q.id===id);assert.ok(q,'rendered quiz exposes its bank ID');assert.equal(q.section,'1.6');assert.equal(q.level,3);assert.equal(q.type,'problems');
  const labels=f.all('#cs-quiz-play .quiz-options label'),order=labels.map(node=>q.options.en.indexOf(node.querySelector('span').textContent));assert.equal(order.length,4);assert.deepEqual(order.slice().sort(),[0,1,2,3]);
  const selected=String(order.indexOf(q.correct));f.click(`#cs-quiz-play [name=choice][value="${selected}"]`);
  f.language('sv');assert.equal(f.$('#cs-quiz-play').dataset.questionId,id);assert.deepEqual(f.all('#cs-quiz-play .quiz-options label').map(node=>q.options.sv.indexOf(node.querySelector('span').textContent)),order);assert.equal(f.$('#cs-quiz-play [name=choice]:checked').value,selected);assert.ok(f.$('#cs-quiz-play').textContent.includes(q.question.sv));
  f.submit('#cs-quiz-answer');assert.match(f.$('#cs-quiz-play').textContent,/Rätt/);assert.ok(f.$('#cs-quiz-play').textContent.includes(q.explanation.sv));
  f.language('en');assert.equal(f.$('#cs-quiz-play').dataset.questionId,id);assert.match(f.$('#cs-quiz-play').textContent,/Correct/);assert.ok(f.$('#cs-quiz-play').textContent.includes(q.explanation.en));assert.equal(f.$('#cs-quiz-level').value,'3');assert.equal(f.$('#cs-quiz-type').value,'problems');assert.equal(f.$('#cs-quiz-topic').value,'1.6');
  assert.deepEqual(f.errors,[]);f.close();
});

test('every difficulty and topic can start a quiz and reveal an explanation without writing an answer',()=>{
  const f=fixture();
  for(const level of [1,2,3,4])for(const section of counts.map((_,i)=>`1.${i+1}`)){
    f.input('#cs-quiz-level',level,'change');f.input('#cs-quiz-type','mixed','change');f.input('#cs-quiz-topic',section,'change');f.submit('#cs-quiz-form');
    const id=f.$('#cs-quiz-play').dataset.questionId,q=f.w.CSChapter.quiz.find(q=>q.id===id);assert.ok(q,section+' quiz');assert.equal(q.section,section);assert.equal(q.level,level);
    f.click('[data-quiz-reveal]');assert.ok(f.$('#cs-quiz-play').textContent.includes(q.explanation.en));
    f.language('sv');assert.equal(f.$('#cs-quiz-play').dataset.questionId,id);assert.ok(f.$('#cs-quiz-play').textContent.includes(q.explanation.sv));f.language('en');
  }
  assert.deepEqual(f.errors,[]);f.close();
});

test('quiz scores correct attempts once, excludes reveals, and explains incorrect answers',()=>{
  const f=fixture();f.input('#cs-quiz-type','mixed','change');f.input('#cs-quiz-topic','1.6','change');f.submit('#cs-quiz-form');
  const bank=f.w.CSChapter.quiz;
  f.submit('#cs-quiz-answer');assert.match(f.$('#cs-quiz-validation').textContent,/Choose an answer/);assert.equal(f.$('[data-quiz-next]'),null);
  for(const outcome of ['correct','reveal','incorrect']){
    const q=bank.find(q=>q.id===f.$('#cs-quiz-play').dataset.questionId);assert.ok(q);
    if(outcome==='reveal')f.click('[data-quiz-reveal]');
    else{const label=f.all('#cs-quiz-play .quiz-options label').find(label=>(label.querySelector('span').textContent===q.options.en[q.correct])===(outcome==='correct'));f.click(label.querySelector('input'));f.submit('#cs-quiz-answer');}
    assert.ok(f.$('#cs-quiz-feedback').textContent.includes(q.explanation.en));
    assert.equal(f.$('#cs-quiz-answer [type=submit]').disabled,true);assert.equal(f.$('[data-quiz-reveal]').disabled,true);
    f.submit('#cs-quiz-answer');f.click('[data-quiz-next]');
  }
  assert.match(f.$('#cs-quiz-play').textContent,/You answered 1 of 3 correctly/);
  f.language('sv');assert.match(f.$('#cs-quiz-play').textContent,/1 av 3/);assert.equal(f.$('#cs-quiz-play').dataset.questionId,undefined);
  assert.deepEqual(f.errors,[]);f.close();
});

test('lesson progress, selected topic and open explanation survive a language switch and reload',()=>{
  const f=fixture();f.click('[data-lesson="1.7"]');assert.equal(f.d.activeElement,f.$('#cs-lesson h3'));f.click('#cs-lesson details>summary');f.click('[data-understood]');assert.equal(f.d.activeElement,f.$('[data-understood]'));
  f.click('[data-try-lab]');assert.equal(f.$('[data-cs-tab][aria-selected=true]').dataset.csTab,'float');assert.equal(f.d.activeElement,f.$('[data-cs-tab=float]'));
  f.language('sv');assert.equal(f.$('[data-lesson][aria-current=true]').dataset.lesson,'1.7');assert.equal(f.$('#cs-lesson details').open,true);assert.match(f.$('#cs-progress').textContent,/1 av 10/);
  assert.equal(f.$('#cs-language').value,'sv');assert.match(f.d.title,/Datavetenskap/);
  const stored=f.w.localStorage.getItem('ember-cs-chapter1:understood');assert.deepEqual(JSON.parse(stored),['1.7']);
  const reloaded=fixture({stored:{'ember-cs-chapter1:understood':stored}});assert.match(reloaded.$('#cs-progress').textContent,/1 of 10/);
  assert.deepEqual(f.errors,[]);assert.deepEqual(reloaded.errors,[]);f.close();reloaded.close();
});

test('chapter labs preserve edits, memory contents and accessible full-screen state across languages',()=>{
  const f=fixture(),state=()=>f.w.CSChapterLabs.getState();
  f.input('[data-cs-field=address]','3','change');f.input('[data-cs-field=byte]','173');f.click('[data-cs-action=write]');f.$('[data-cs-action=read]').focus();f.click('[data-cs-action=read]');assert.equal(f.d.activeElement,f.$('[data-cs-action=read]'));
  assert.equal(state().memory.cells[3],173);assert.equal(state().memory.output,173);
  f.input('[data-cs-field=yaw]','1.2');const before=f.$('#cs-memory-scene').innerHTML;
  f.click('[data-cs-action=fullscreen]');assert.equal(f.$('#cs-memory-panel').getAttribute('aria-modal'),'true');assert.equal(f.d.body.style.overflow,'hidden');
  f.click('#cs-memory-panel details>summary');
  f.language('sv');assert.equal(state().memory.cells[3],173);assert.equal(state().memory.output,173);assert.equal(f.$('[data-cs-field=byte]').value,'173');assert.equal(f.$('[data-cs-field=yaw]').value,'1.2');assert.equal(f.$('#cs-memory-panel').getAttribute('aria-modal'),'true');assert.equal(f.$('#cs-memory-panel details').open,true);assert.match(f.$('#cs-memory-scene').getAttribute('aria-label'),/Åtta minnesadresser/);
  f.$('#cs-memory-scene').dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.ok(Number(state().yaw)>1.2);assert.notEqual(f.$('#cs-memory-scene').innerHTML,before);
  f.$('#cs-memory-scene').dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(state().full,false);assert.equal(f.d.body.style.overflow,'');
  f.$('[data-cs-tab=bits]').dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(f.$('[data-cs-tab][aria-selected=true]').dataset.csTab,'numbers');assert.equal(f.d.activeElement,f.$('[data-cs-tab=numbers]'));
  for(const tab of ['bits','numbers','float','media','compression','errors']){f.click(`[data-cs-tab=${tab}]`);assert.equal(f.$('[data-cs-tab][aria-selected=true]').dataset.csTab,tab);assert.ok(f.$('#cs-lab-panel').textContent.trim().length>100);assert.doesNotMatch(f.$('#cs-lab-panel').textContent,/undefined|NaN/);}
  f.click('[data-cs-tab=numbers]');f.input('[data-cs-field=binary]','110.01');f.submit('#cs-lab-panel form');f.language('en');assert.equal(f.$('[data-cs-field=binary]').value,'110.01');assert.match(f.$('#cs-lab-panel').textContent,/6\.25|25\/4/);
  f.click('[data-cs-tab=bits]');assert.equal(state().memory.cells[3],173);f.click('[data-cs-action=power]');assert.ok(Array.from(state().memory.cells).every(value=>value===null));
  assert.deepEqual(f.errors,[]);f.close();
});

test('original workbench and its old deep links remain reachable',()=>{
  const html=read('computer-science.html'),legacy=read('computer-science-labs.html');
  assert.match(html,/href="computer-science-labs\.html"/);assert.match(legacy,/src="app\.js/);
  const legacyDom=new JSDOM(legacy);for(const node of legacyDom.window.document.querySelectorAll('script[src]'))assert.ok(fs.existsSync(path.join(root,node.getAttribute('src').split('?')[0])));legacyDom.window.close();
  const redirect=Array.from(html.matchAll(/<script>([\s\S]*?)<\/script>/g),m=>m[1]).find(code=>code.includes('location.replace'));assert.ok(redirect);
  for(const hash of ['gates','circuit','boolean','memory','numbers','binary','systems','ascii','media','practice','reference']){
    let target;vm.runInNewContext(redirect,{location:{hash:'#'+hash,search:'?lang=sv',replace:value=>target=value}});assert.equal(target,'computer-science-labs.html?lang=sv#'+hash);
  }
  for(const hash of ['learn','lab','book','quiz','glossary']){
    let redirected=false;vm.runInNewContext(redirect,{location:{hash:'#'+hash,search:'',replace:()=>redirected=true}});assert.equal(redirected,false);
  }
  assert.match(read('app.js'),/ember-logic-v1/);
});
