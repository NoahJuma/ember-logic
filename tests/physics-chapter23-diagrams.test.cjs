const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
test('chapter 23 diagrams and passage options are available in both languages',()=>{
 const file='physics-chapter23.html',dom=new JSDOM(fs.readFileSync(file,'utf8'),{url:'https://example.test/'+file+'?lang=en',runScripts:'outside-only'});
 for(const s of dom.window.document.querySelectorAll('script[src]'))dom.window.eval(fs.readFileSync(s.getAttribute('src').split('?')[0],'utf8'));
 for(const n of [54,63,78]){const e=dom.window.EmberChapter23Exercises.find(e=>e.id===`23.${n}`);assert.ok(e&&fs.existsSync('assets/physics/chapter23/'+e.figure));assert.ok(e.alt.sv&&e.alt.en)}
 const e=dom.window.EmberChapter23Exercises.find(e=>e.id==='23.45');assert.ok(e&&fs.existsSync('assets/physics/chapter23/'+e.solutionFigure));assert.ok(e.solutionAlt.sv&&e.solutionAlt.en);
 for(const n of [84,85,86]){const e=dom.window.EmberChapter23Exercises.find(e=>e.id===`23.${n}`);assert.match(e.sv.prompt,/\(d\)/);assert.match(e.en.prompt,/\(d\)/)}
 dom.window.close();
});
