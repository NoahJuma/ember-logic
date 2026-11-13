const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM,VirtualConsole}=require('jsdom');

test('draft exercise figures exist and have Swedish and English descriptions',()=>{
  for(let n=16;n<=44;n++){
    const errors=[],vc=new VirtualConsole();
    vc.on('jsdomError',e=>errors.push(e.message));
    const dom=new JSDOM(fs.readFileSync(`physics-chapter${n}.html`,'utf8'),{url:'https://example.test',runScripts:'outside-only',virtualConsole:vc});
    for(const script of dom.window.document.querySelectorAll('script[src]'))dom.window.eval(fs.readFileSync(script.getAttribute('src').split('?')[0],'utf8'));
    for(const exercise of dom.window[`EmberChapter${n}Exercises`])for(const [figure,description] of [['figure','alt'],['solutionFigure','solutionAlt']]){
      if(!exercise[figure])continue;
      assert.ok(fs.existsSync(`assets/physics/chapter${n}/${exercise[figure]}`),`${exercise.id} ${figure}`);
      assert.ok(exercise[description]?.sv&&exercise[description]?.en,`${exercise.id} ${description}`);
    }
    assert.deepEqual(errors,[],`chapter ${n}`);
    dom.window.close();
  }
});
