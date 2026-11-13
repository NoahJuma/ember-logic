const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
test('chapter 22 worked graphs and passage options are available in both languages',()=>{
 const file='physics-chapter22.html',dom=new JSDOM(fs.readFileSync(file,'utf8'),{url:'https://example.test/'+file+'?lang=en',runScripts:'outside-only'});
 for(const s of dom.window.document.querySelectorAll('script[src]'))dom.window.eval(fs.readFileSync(s.getAttribute('src').split('?')[0],'utf8'));
 for(const n of [37,38,39,40,41,42,43,44,47,52,55]){const e=dom.window.EmberChapter22Exercises.find(e=>e.id===`22.${n}`);assert.ok(e&&fs.existsSync('assets/physics/chapter22/'+e.solutionFigure));assert.ok(e.solutionAlt.sv&&e.solutionAlt.en)}
 for(const n of [56,57]){const e=dom.window.EmberChapter22Exercises.find(e=>e.id===`22.${n}`);assert.ok(e&&fs.existsSync('assets/physics/chapter22/'+e.figure));assert.ok(e.alt.sv&&e.alt.en)}
 for(const n of [63,64,65,66]){const e=dom.window.EmberChapter22Exercises.find(e=>e.id===`22.${n}`);assert.match(e.sv.prompt,/\(d\)/);assert.match(e.en.prompt,/\(d\)/)}
 dom.window.close();
});
