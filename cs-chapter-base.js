(function(root){
  'use strict';
  root.CSChapter={lessons:[],exercises:[],quiz:[],glossary:[]};
  const valid=x=>x==='sv'||x==='en';
  let language='en';
  try{const requested=new URL(root.location.href).searchParams.get('lang');let saved;try{saved=JSON.parse(root.localStorage.getItem('ember-cs-chapter1:language'));}catch{}language=valid(requested)?requested:valid(saved)?saved:(root.navigator.language||'').toLowerCase().startsWith('sv')?'sv':'en';}catch{}
  const t=(en,sv)=>language==='sv'?sv:en;
  const text=value=>typeof value==='string'?value:value?.[language]??value?.en??'';
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  function setLanguage(value){if(!valid(value))return;const changed=language!==value;language=value;document.documentElement.lang=value;try{root.localStorage.setItem('ember-cs-chapter1:language',JSON.stringify(value));}catch{}try{const url=new URL(root.location.href);url.searchParams.set('lang',value);root.history.replaceState(null,'',url);}catch{}if(changed)document.dispatchEvent(new CustomEvent('cslanguagechange',{detail:{language}}));}
  root.CSChapterUI={t,text,escape,setLanguage,get language(){return language;}};
  document.documentElement.lang=language;
})(globalThis);
