const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('jsdom');
test('graph follows inputs and language changes preserve the current state', () => {
  const dom = new JSDOM(fs.readFileSync('physics-motion-lab.html','utf8'),{url:'https://example.test/',runScripts:'outside-only'});
  const w=dom.window; w.eval(fs.readFileSync('physics-motion-model.js','utf8'));w.eval(fs.readFileSync('physics-motion-lab.js','utf8'));
  const set=(id,v)=>{const e=w.document.getElementById(id);e.value=v;e.dispatchEvent(new w.Event('input',{bubbles:true}));};
  set('v0','10');set('acc','-2');set('time','3');set('kind','v');
  assert.match(w.document.querySelector('#result').textContent,/v = 4\.00 m\/s/);
  assert.match(w.document.querySelector('#graph').getAttribute('aria-label'),/4\.00 m\/s/);
  set('lang','en');assert.equal(w.document.querySelector('#v0').value,'10');assert.equal(w.document.querySelector('#kind').value,'v');assert.match(w.document.querySelector('#result').textContent,/v = 4\.00/);
  w.document.querySelector('#reset').click();assert.equal(w.document.querySelector('#v0').value,'4');assert.equal(w.document.querySelector('#lang').value,'en');
  dom.window.close();
});

test('prediction hides the graph until a valid guess and survives a language change',async()=>{const dom=new JSDOM(fs.readFileSync('physics-motion-lab.html','utf8'),{url:'https://example.test/',runScripts:'outside-only'});const w=dom.window;w.eval(fs.readFileSync('physics-motion-model.js','utf8'));w.eval(fs.readFileSync('physics-motion-lab.js','utf8'));const panel=w.document.querySelector('#prediction');panel.open=true;panel.dispatchEvent(new w.Event('toggle'));assert.equal(w.document.querySelector('#graph').hidden,true);const pred=w.document.querySelector('#predict-value');pred.value='2';pred.dispatchEvent(new w.Event('input',{bubbles:true}));const lang=w.document.querySelector('#lang');lang.value='en';lang.dispatchEvent(new w.Event('input',{bubbles:true}));assert.equal(w.document.querySelector('#graph').hidden,true);w.document.querySelector('#predict-reveal').click();assert.equal(w.document.querySelector('#graph').hidden,false);assert.match(w.document.querySelector('#predict-feedback').textContent,/2.00 m\/s/);await new Promise(resolve=>setTimeout(resolve,10));dom.window.close()});
test('an empty simulation input does not silently become zero',()=>{const dom=new JSDOM(fs.readFileSync('physics-motion-lab.html','utf8'),{url:'https://example.test/',runScripts:'outside-only'});const w=dom.window;w.eval(fs.readFileSync('physics-motion-model.js','utf8'));w.eval(fs.readFileSync('physics-motion-lab.js','utf8'));const v=w.document.querySelector('#v0');v.value='';v.dispatchEvent(new w.Event('input',{bubbles:true}));assert.match(w.document.querySelector('#result').textContent,/Ange ändliga/);assert.equal(w.document.querySelector('#graph').children.length,0);dom.window.close()});
