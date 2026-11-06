const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const test=require('node:test');
const source=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');

// A small event/element test double, not a browser or a layout test. This runs
// the actual controller and checks state changes through its rendered output.
function sceneFixture() {
  const nodes=new Map(),anonymous=[],frames=new Map();let sequence=0;
  class Element {
    constructor(id='',attributes={}){this.id=id;this.listeners={};this.dataset={};this.style={};this.attributes=attributes;this.value=attributes.value||'';this.type=attributes.type||'';this.checked='checked' in attributes;this.open=false;this.textContent='';this._html='';
      for(const [key,value] of Object.entries(attributes))if(key.startsWith('data-'))this.dataset[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;
      if(id)nodes.set(id,this);else anonymous.push(this);
    }
    set innerHTML(value){this._html=value;for(const m of value.matchAll(/<(input|select|output|button)\b([^>]*)>/g)){
      const attrs={};for(const a of m[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g))attrs[a[1]]=a[2]??'';
      const el=new Element(attrs.id||'',attrs);el.tag=m[1];
    }}
    get innerHTML(){return this._html;}
    addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
    emit(type,event={}){for(const fn of this.listeners[type]||[])fn({target:this,preventDefault(){},...event});}
    setAttribute(k,v){this.attributes[k]=String(v);}
    getAttribute(k){return this.attributes[k];}
    querySelector(q){if(q==='.scene-camera')return nodes.get('camera');throw Error(q);}
    querySelectorAll(q){if(q==='[data-preset]')return anonymous.filter(e=>e.dataset.preset!==undefined);
      const row=q.match(/data-row="(\d+)"/);return row?anonymous.filter(e=>e.dataset.row===row[1]):[];}
    closest(){return this;}
    remove(){if(this.id)nodes.delete(this.id);}
    focus(){this.focused=true;}
    append(node){node.parent=this;}
    showModal(){this.open=true;}
    close(){this.open=false;this.emit('close');}
    getBoundingClientRect(){return {width:390,height:480};}
    setPointerCapture(){}
    checkValidity(){return this.value!==''&&Number.isFinite(Number(this.value))&&Number(this.value)>=-10&&Number(this.value)<=10;}
  }
  for(const id of [...source('linear-algebra.html').matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))new Element(id);
  new Element('camera');
  nodes.get('lab-home').append(nodes.get('lab-workspace'));
  const doc={getElementById:id=>nodes.get(id)||null,body:{style:{overflow:'auto'}},addEventListener(){}};
  const context=vm.createContext({document:doc,structuredClone,ResizeObserver:class{constructor(cb){this.cb=cb;}observe(){this.cb();}},performance:{now:()=>0},
    requestAnimationFrame:fn=>{frames.set(++sequence,fn);return sequence;},cancelAnimationFrame:id=>frames.delete(id),addEventListener(){},matchMedia:()=>({matches:false})});
  context.window=context;
  for(const name of ['core','learning','scene'])vm.runInContext(source('linear-algebra-'+name+'.js'),context);
  const input=(id,value)=>{const el=nodes.get(id);el.value=String(value);nodes.get('scene-controls').emit('input',{target:el});};
  const choose=(id,value)=>{const el=nodes.get(id);el.value=String(value);el.emit('change');};
  const example=i=>nodes.get('scene-examples').emit('click',{target:{closest:()=>({dataset:{preset:String(i)}})}});
  const flush=time=>{const queued=[...frames.values()];frames.clear();queued.forEach(fn=>fn(time));};
  return {nodes,doc,input,choose,example,flush,Element};
}

test('3D controls update the actual model and keep full-screen entry and exit usable',()=>{
  const f=sceneFixture(),n=id=>f.nodes.get(id);
  assert.equal(n('scene-summary').textContent,'One shared point');
  assert.equal(n('scene').getAttribute('viewBox'),'0 0 390 480');
  for(const [i,title] of ['One shared point','A shared line','A shared plane','No common solution'].entries()) {
    f.example(i);assert.equal(n('scene-summary').textContent,title);
    assert.doesNotMatch(n('scene').innerHTML,/NaN|Infinity/);
  }
  n('scene-fullscreen').emit('click');
  assert.equal(n('lab-fullscreen').open,true);
  assert.equal(n('lab-workspace').parent,n('lab-fullscreen'));
  assert.equal(f.doc.body.style.overflow,'hidden');
  n('lab-fullscreen').close(); // Native Escape closes this same dialog.
  assert.equal(n('lab-workspace').parent,n('lab-home'));
  assert.equal(f.doc.body.style.overflow,'auto');
  assert.equal(n('scene-fullscreen').getAttribute('aria-expanded'),'false');

  f.choose('scene-mode','transform');
  f.input('scene-progress',0);
  assert.match(n('scene-result').innerHTML,/Input \(1, 1, 1\) → output \(1, 1, 1\)/);
  f.input('scene-progress',100);
  assert.match(n('scene-result').innerHTML,/output \(2, 1, 1\/2\)/);
  f.example(1);f.input('scene-angle',180);f.input('scene-progress',50);
  assert.match(n('scene-result').innerHTML,/output \(-1, 1, 1\)/);
  f.example(4);
  assert.match(n('scene-result').innerHTML,/output \(1, 1, 0\)/);
  n('scene-controls').emit('click',{target:n('scene-play')});f.flush(1750);
  assert.match(n('scene-summary').textContent,/50%/);
  f.flush(3500);assert.match(n('scene-summary').textContent,/100%/);
});

test('one-finger orbit and two-finger zoom/pan change the scene without losing the model',()=>{
  const f=sceneFixture(),scene=f.nodes.get('scene');
  const initial=scene.innerHTML;
  scene.emit('pointerdown',{pointerId:1,pointerType:'touch',clientX:100,clientY:100});
  scene.emit('pointermove',{pointerId:1,clientX:130,clientY:115});f.flush(16);
  const rotated=scene.innerHTML;assert.notEqual(rotated,initial);
  scene.emit('pointerdown',{pointerId:2,pointerType:'touch',clientX:200,clientY:115});
  scene.emit('pointermove',{pointerId:2,clientX:250,clientY:140});f.flush(32);
  assert.notEqual(scene.innerHTML,rotated);
  assert.doesNotMatch(scene.innerHTML,/NaN|Infinity/);
  assert.equal(f.nodes.get('scene-summary').textContent,'One shared point');
  scene.emit('pointercancel',{pointerId:2});scene.emit('pointerup',{pointerId:1});
  const stopped=scene.innerHTML;
  scene.emit('pointermove',{pointerId:1,clientX:500,clientY:500});f.flush(48);
  assert.equal(scene.innerHTML,stopped);
});

test('sliding a plane preserves its normal and exact matrix edits still work',()=>{
  const f=sceneFixture();f.input('scene-distance',2);
  const result=f.nodes.get('scene-result').innerHTML;
  assert.match(result,/\(1\)x \+ \(1\)y \+ \(1\)z/);
  const el=new f.Element('',{'data-row':'0','data-col':'0',type:'number',value:'2'});
  f.nodes.get('scene-controls').emit('change',{target:el});
  assert.match(f.nodes.get('scene-result').innerHTML,/\(2\)x \+ \(1\)y \+ \(1\)z/);
  el.value='';f.nodes.get('scene-controls').emit('change',{target:el});assert.equal(el.value,2);
});
