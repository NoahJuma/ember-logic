const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
test('reviewed book passages render one answer-choice list in each language',()=>{
 const groups={34:[108,109,110,111],35:[57,58,59,60],36:[69,70,71],37:[71,72,73,74],39:[88,89,90,91],40:[67,68,69,70],41:[70,71,72,73],43:[73,74,75,76,77],44:[57,58,59]};
 for(const [chapter,ids] of Object.entries(groups)){
  const d=new JSDOM(fs.readFileSync(`physics-chapter${chapter}.html`,'utf8'),{url:'https://example.test/',runScripts:'outside-only'});
  for(const s of d.window.document.querySelectorAll('script[src]'))d.window.eval(fs.readFileSync(s.getAttribute('src').split('?')[0],'utf8'));
  const es=d.window[`EmberChapter${chapter}Exercises`];
  for(const num of ids)for(const lang of ['sv','en']){
   const id=`${chapter}.${num}`,p=es.find(x=>x.id===id)[lang].prompt;
   const inline=(p.match(/(?:Choices|Options|Svarsalternativ|Alternativ|Choose|Välj):/g)||[]).length;
   const abcd=/ A:/.test(p)&&/ B:/.test(p);
   assert.ok(inline<=1,`${id} ${lang}: repeated list heading`);
   assert.ok(!(abcd&&/\(a\)/.test(p)&&/\(b\)/.test(p)),`${id} ${lang}: repeated answer lists`);
  }
  d.window.close();
 }
});
