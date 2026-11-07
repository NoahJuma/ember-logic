const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file.split('?')[0]),'utf8');

// Run the actual page scripts. These checks cover navigation and retained work,
// not third-party playback, which takes place on the linked provider's website.
function fixture(subject,language='en'){
  const page=subject==='math'?'linear-algebra.html':'physics.html',errors=[];
  const virtualConsole=new VirtualConsole();virtualConsole.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(read(page),{url:'https://example.test/'+page+'?lang='+language,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole});
  const w=dom.window,d=w.document;w.structuredClone=globalThis.structuredClone;
  w.Element.prototype.scrollIntoView=function(){};
  w.Element.prototype.setPointerCapture=function(){};
  w.Element.prototype.releasePointerCapture=function(){};
  w.Element.prototype.getBoundingClientRect=function(){return{width:390,height:480,left:0,top:0,right:390,bottom:480};};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.ResizeObserver=class{constructor(cb){this.cb=cb;}observe(){this.cb();}disconnect(){}};
  w.matchMedia=()=>({matches:false});w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};
  for(const script of d.querySelectorAll('script[src]'))w.eval(read(script.getAttribute('src')));
  const $=selector=>d.querySelector(selector),all=selector=>Array.from(d.querySelectorAll(selector));
  const input=(selector,value,type='input')=>{const node=typeof selector==='string'?$(selector):selector;assert.ok(node,String(selector));node.value=value;node.dispatchEvent(new w.Event(type,{bubbles:true}));};
  const changeLanguage=value=>input(subject==='math'?'#math-language':'#physics-language',value,'change');
  return{w,d,$,all,input,changeLanguage,errors,close:()=>w.close()};
}
function externalLinks(node){return Array.from(node.querySelectorAll('a[href]')).filter(a=>/^https:\/\//.test(a.getAttribute('href')));}
function assertHelp(card){
  const help=card.querySelector('.study-video-help');assert.ok(help,'Video help is visible before opening an answer');
  assert.ok(externalLinks(help).length>0,'At least one specific video resource is linked');
  assert.equal(help.closest('.solution-panel'),null,'Video help must not be hidden inside the solution');
  assert.equal(card.querySelector('.solution-panel').open,false);
  for(const link of externalLinks(help)){
    assert.equal(link.target,'_blank');assert.match(link.rel,/noopener/);
    assert.ok(link.textContent.trim(),'The link must have an accessible name');
  }
  return help;
}

test('video libraries cover every mathematics section and physics lesson in both interface languages',()=>{
  for(const subject of ['math','physics'])for(const language of ['en','sv']){
    const f=fixture(subject,language),topics=subject==='math'?Array.from({length:11},(_,i)=>'1.'+(i+1)):['nature','method','units','uncertainty','estimates','arrows','components','unit','dot','cross'];
    assert.equal(new URL(f.$('#study-video-nav').href).hash,'#videos');
    for(const topic of topics){
      const anchor=f.d.getElementById('video-'+subject+'-'+topic.replaceAll('.','-'));
      assert.ok(anchor,subject+' '+topic+' library anchor');
      const group=anchor.closest('details');assert.ok(group,subject+' '+topic+' topic group');
      assert.ok(externalLinks(group).length>0,subject+' '+topic+' video coverage');
    }
    assert.equal(f.all('#videos iframe,#videos video').length,0,'Links do not preload third-party players');
    const libraryPanel=f.$('#study-video-library details');libraryPanel.open=true;
    const key=libraryPanel.dataset.videoKey;f.changeLanguage(language==='en'?'sv':'en');
    assert.equal(f.all('#study-video-library details').find(d=>d.dataset.videoKey===key).open,true);
    assert.deepEqual(f.errors,[]);f.close();
  }
});

test('every mathematics exercise offers video help, and language changes retain help, writing and solution choices',()=>{
  const f=fixture('math');let count=0;
  for(const topic of [...Array.from({length:11},(_,i)=>'1.'+(i+1)),'review']){
    f.input('#book-topic',topic,'change');
    for(const card of f.all('#book-list>article')){assertHelp(card);count++;}
  }
  assert.equal(count,437);
  f.input('#book-topic','1.2','change');
  let card=f.$('#book-list>article'),id=card.id;assertHelp(card).open=true;
  card.querySelector('.attempt-panel').open=true;card.querySelector('.solution-panel').open=true;
  f.input(card.querySelector('textarea'),'My row operations: R2 − 2R1');
  f.changeLanguage('sv');card=f.d.getElementById(id);
  assert.equal(card.querySelector('.study-video-help').open,true);
  assert.equal(card.querySelector('.attempt-panel').open,true);
  assert.equal(card.querySelector('.solution-panel').open,true);
  assert.equal(card.querySelector('textarea').value,'My row operations: R2 − 2R1');
  assert.match(card.querySelector('.attempt-copy').textContent,/R2 − 2R1/);
  assert.match(f.$('#study-video-nav').textContent,/Videohjälp/);
  assert.deepEqual(f.errors,[]);f.close();
});

test('physics lessons and all exercise pages offer independent video help while preserving written and vector attempts',()=>{
  const f=fixture('physics');
  for(let i=0;i<10;i++){
    f.$('#lesson-nav [data-lesson="'+i+'"]').click();
    assert.ok(externalLinks(f.$('#lesson .study-video-help')).length>0,'Lesson '+i);
  }
  f.$('#lesson .study-video-help').open=true;
  f.$('#lesson .lesson-check details').open=true;
  f.input('#physics-set','all','change');let count=0;
  for(;;){for(const card of f.all('#physics-exercises>article')){assertHelp(card);count++;}if(f.$('#physics-next').disabled)break;f.$('#physics-next').click();}
  assert.equal(count,129);
  f.input('#physics-search','1.84');let card=f.$('#physics-exercises>article');assertHelp(card).open=true;
  card.querySelector('.attempt-panel').open=true;card.querySelector('.solution-panel').open=true;
  f.input(card.querySelector('textarea'),'The opposite normal direction also works.');
  const vector=card.querySelector('[data-candidate]');assert.ok(vector);f.input(vector,'1.25');
  f.changeLanguage('sv');card=f.$('#physics-exercises>article');
  assert.equal(card.querySelector('.study-video-help').open,true);
  assert.equal(card.querySelector('.attempt-panel').open,true);
  assert.equal(card.querySelector('.solution-panel').open,true);
  assert.equal(card.querySelector('textarea').value,'The opposite normal direction also works.');
  assert.equal(card.querySelector('[data-candidate]').value,'1.25');
  assert.equal(f.$('#lesson .study-video-help').open,true);
  assert.equal(f.$('#lesson .lesson-check details').open,true);
  assert.match(f.$('#study-video-nav').textContent,/Videohjälp/);
  assert.deepEqual(f.errors,[]);f.close();
});

test('real book questions select the relevant application, prerequisite and vector method in English and Swedish',()=>{
  const firstVideo=(f,subject,card)=>{
    const id=card.querySelector('.study-video-help [data-video-id]')?.dataset.videoId;
    const entry=f.w.StudyVideoData[subject].videos.find(v=>v.id===id);
    assert.ok(entry,'The rendered recommendation names a catalog resource');return entry;
  };
  for(const language of ['en','sv']){
    const f=fixture('math',language);f.input('#book-topic','1.10','change');
    for(const[number,tag]of [['3','traffic'],['6','circuits'],['9','chemical'],['13','interpolation']]){
      const card=f.d.getElementById('textbook-exercise-'+number);
      assert.ok(firstVideo(f,'math',card).tags.includes(tag),'Application '+number+' in '+language);
    }
    f.input('#book-topic','review','change');
    const calculus=f.w.EmberTextbook.solutions.review.find(p=>p.number==='16');
    const inverse=f.w.EmberTextbook.solutions.review.find(p=>p.number==='17');
    if(language==='sv')assert.match(calculus.prompt,/matematisk analys/);
    assert.match(inverse.prompt,/⁻¹/);
    // Use the real full statement without its editorial title: notation and the
    // Swedish prerequisite phrase must be meaningful matching inputs themselves.
    assert.ok(f.w.StudyVideos.select('math','review',language,{prompt:calculus.prompt})[0].topics.includes('calculus'));
    assert.ok(f.w.StudyVideos.select('math','review',language,{prompt:inverse.prompt})[0].tags.includes('inverse'));
    assert.ok(firstVideo(f,'math',f.d.getElementById('textbook-exercise-16')).topics.includes('calculus'));
    assert.ok(firstVideo(f,'math',f.d.getElementById('textbook-exercise-17')).tags.includes('inverse'));
    assert.deepEqual(f.errors,[]);f.close();
    const p=fixture('physics',language);
    for(const[id,topic]of [['1.35','unit'],['1.40','dot'],['1.42','cross']]){
      p.input('#physics-search',id);
      assert.ok(firstVideo(p,'physics',p.$('#physics-exercises>article')).topics.includes(topic),'Physics '+id+' in '+language);
    }
    assert.deepEqual(p.errors,[]);p.close();
  }
});
