(function(root){
  'use strict';
  const storageKey='ember-mathematics:language', builders=[], pairs=new Map(), reverse=new Map();
  const valid=value=>value==='sv'||value==='en';
  let language='en';
  try{const p=new URL(root.location.href).searchParams.get('lang');if(valid(p))language=p;else{let saved;try{saved=JSON.parse(root.localStorage.getItem(storageKey));}catch{}language=valid(saved)?saved:(root.navigator.language||'').toLowerCase().startsWith('sv')?'sv':'en';}}catch{}
  function t(en,sv){if(sv!==undefined){pairs.set(en,sv);reverse.set(sv,en);}return language==='sv'?(sv??pairs.get(en)??en):en;}
  function localize(value){const en=reverse.get(value)??value;return language==='sv'?(pairs.get(en)??en):en;}
  function register(id,build){builders.push({id,build});build();}
  const staticNodes=[],staticAttributes=[];
  function captureStatic(){
    const translations=root.EmberMathUI||{};
    const walker=document.createTreeWalker(document,4);let node;
    while((node=walker.nextNode())){if(['SCRIPT','STYLE'].includes(node.parentElement?.tagName))continue;const en=node.data.trim();if(Object.hasOwn(translations,en)){staticNodes.push({node,en:node.data,sv:node.data.replace(en,translations[en])});}}
    for(const node of document.querySelectorAll('[aria-label],[placeholder]'))for(const key of ['aria-label','placeholder']){const en=node.getAttribute(key);if(Object.hasOwn(translations,en))staticAttributes.push({node,key,en,sv:translations[en]});}
  }
  function applyStatic(){
    document.documentElement.lang=language;
    for(const item of staticNodes)if(item.node.isConnected)item.node.data=item[language];
    for(const item of staticAttributes)if(item.node.isConnected)item.node.setAttribute(item.key,item[language]);
    const select=document.getElementById('math-language');if(select){select.value=language;select.setAttribute('aria-label',t('Choose language','Välj språk'));}
    for(const a of document.querySelectorAll('a[href]')){const url=new URL(a.getAttribute('href'),root.location.href);if(/\/(mathematics|linear-algebra)\.html$/.test(url.pathname)&&url.origin===root.location.origin){url.searchParams.set('lang',language);a.setAttribute('href',url.pathname.split('/').pop()+url.search+url.hash);}}
  }
  function setLanguage(value,{persist=true,notify=true}={}){
    if(!valid(value))return;
    const changed=value!==language;
    if(changed){
      language=value;
      const retained={EmberChapter:root.EmberChapter,EmberTextbook:root.EmberTextbook,EmberMathQuestions:root.EmberMathQuestions,EmberLearning:root.EmberLearning};
      for(const {build}of builders)build();
      for(const [key,old]of Object.entries(retained))if(old&&root[key]!==old){const fresh=root[key];for(const prop of Object.keys(old))delete old[prop];Object.assign(old,fresh);root[key]=old;}
    }
    applyStatic();
    if(persist){try{root.localStorage.setItem(storageKey,JSON.stringify(language));}catch{}try{const url=new URL(root.location.href);url.searchParams.set('lang',language);root.history.replaceState(null,'',url);}catch{}}
    if(changed&&notify)document.dispatchEvent(new CustomEvent('mathlanguagechange',{detail:{language}}));
  }
  root.EmberMathI18n={t,localize,register,setLanguage,get language(){return language;}};
  captureStatic();applyStatic();
  document.getElementById('math-language')?.addEventListener('change',e=>setLanguage(e.target.value));
})(globalThis);
