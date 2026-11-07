(function(root){
  'use strict';
  root.PhysicsLocales={sv:{items:{},content:null}};
  let language='en',ready=false,english,originalQuestion;
  const missing=new Set();
  const clone=value=>JSON.parse(JSON.stringify(value));
  // Keep object identities so a live lesson or quiz can retain its state.
  function copyInto(target,source){
    for(const [key,value]of Object.entries(source)){
      if(value&&typeof value==='object'){
        if(!target[key]||typeof target[key]!=='object')target[key]=Array.isArray(value)?[]:{};
        copyInto(target[key],value);
        if(Array.isArray(value))target[key].length=value.length;
      }else target[key]=value;
    }
    return target;
  }
  function t(en,sv){
    if(language==='en')return en;
    if(sv===undefined){missing.add(en);return en;}
    return sv;
  }
  const topics={units:'Enheter och mätning',precision:'Osäkerhet och uppskattning',vectors:'Vektorer och komponenter',products:'Skalärprodukt och kryssprodukt',reasoning:'Vetenskapligt tänkande'};
  const svFigures=new Set(['figure-e1-21.svg','figure-e1-22.svg','figure-e1-33.svg','figure-e1-37.svg','figure-p1-56.svg','figure-p1-60.svg','figure-p1-61.svg','figure-p1-62.svg','figure-p1-91.svg','figure-p1-94.svg','figure-1-33.svg']);
  function applyContent(){
    const sv=root.PhysicsLocales.sv,source=language==='sv'?sv.content:english.content;
    copyInto(root.PhysicsContent,source);
    copyInto(root.PhysicsBook.topics,language==='sv'?topics:english.topics);
    root.PhysicsBook.items.forEach((item,index)=>{
      const source=language==='sv'?sv.items[item.id]:english.items[index];
      item.title=source.title;item.steps=clone(source.steps);item.answer=source.answer;
      item.prompt=language==='sv'?source.question.text:originalQuestion(item.id).text;
      (item.interactive||[]).forEach((part,i)=>{
        const translated=source.interactive?.[i];
        if(translated){part.label=translated.label;if(translated.units!==undefined)part.units=translated.units;}
      });
      root.PhysicsQuestions.text[item.id]=item.prompt;
    });
    root.PhysicsQuestions.get=id=>{
      if(language==='en')return originalQuestion(id);
      const question=root.PhysicsLocales.sv.items[id]?.question;
      if(!question)return null;
      return question.figure&&svFigures.has(question.figure.file)
        ?{...question,figure:{...question.figure,file:'sv/'+question.figure.file}}
        :question;
    };
  }
  function applyStatic(){
    document.documentElement.lang=language;
    for(const record of staticNodes){
      const text=language==='sv'?root.PhysicsLocales.sv.ui[record.key]:record.english;
      if(text===undefined)throw new Error('Missing Swedish interface string '+record.key);
      if(record.attribute)record.node.setAttribute(record.attribute,text);
      else record.node.innerHTML=text;
    }
    const select=document.getElementById('physics-language');if(select)select.value=language;
    document.title=t('Physics · Chapter 1 — Ember Study Labs','Fysik · Kapitel 1 — Ember Study Labs');
  }
  let staticNodes=[];
  function setLanguage(value,{persist=true,notify=true}={}){
    if(!['en','sv'].includes(value))return false;
    const previous=language;language=value;
    if(ready){applyContent();applyStatic();}
    if(persist){
      try{localStorage.setItem('ember-physics:language',JSON.stringify(language));}catch{}
      try{const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);}catch{}
    }
    if(ready&&notify&&previous!==language)document.dispatchEvent(new CustomEvent('physicslanguagechange',{detail:{language,previous}}));
    return true;
  }
  function initialize(){
    if(ready)return;
    const sv=root.PhysicsLocales.sv,B=root.PhysicsBook,Q=root.PhysicsQuestions;
    if(!sv.content||B.items.some(item=>!sv.items[item.id]))throw new Error('Incomplete Swedish physics content');
    english={content:clone(root.PhysicsContent),items:clone(B.items),topics:clone(B.topics)};
    // get() in the original question module closes over its mutable text map.
    // Snapshot complete questions before translating that map.
    const questions=Object.fromEntries(B.items.map(item=>[item.id,clone(Q.get(item.id))]));
    originalQuestion=id=>questions[id]||null;
    staticNodes=[];
    for(const node of document.querySelectorAll('[data-i18n]'))staticNodes.push({node,key:node.dataset.i18n,english:node.innerHTML});
    for(const attribute of ['aria-label','placeholder','content']){
      for(const node of document.querySelectorAll('[data-i18n-'+attribute+']'))staticNodes.push({node,attribute,key:node.getAttribute('data-i18n-'+attribute),english:node.getAttribute(attribute)});
    }
    let preferred;
    try{preferred=new URLSearchParams(location.search).get('lang');}catch{}
    if(!['sv','en'].includes(preferred))try{preferred=JSON.parse(localStorage.getItem('ember-physics:language'));}catch{}
    if(!['sv','en'].includes(preferred))preferred=(navigator.language||'').toLowerCase().startsWith('sv')?'sv':'en';
    ready=true;setLanguage(preferred,{persist:false,notify:false});
    document.getElementById('physics-language')?.addEventListener('change',event=>setLanguage(event.target.value));
  }
  function searchText(id){
    const en=originalQuestion?.(id),sv=root.PhysicsLocales.sv.items[id];
    const title=english?.items.find(item=>item.id===id)?.title;
    return [id,title,sv?.title,en?.text,en?.reference,en?.passage,sv?.question.text,sv?.question.reference,sv?.question.passage].filter(Boolean).join(' ');
  }
  root.PhysicsI18n={t,setLanguage,initialize,searchText,missing,get language(){return language;}};
})(globalThis);
