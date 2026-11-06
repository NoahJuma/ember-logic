(function(root,factory){
  const api=factory(typeof module==='object'&&module.exports?require('./physics-core.js'):root.Physics);
  if(typeof module==='object'&&module.exports)module.exports=api;else root.PhysicsLab=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(P){
  'use strict';
  const E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const {add,sub,scale,sum,norm,dot,cross,unit,angle,projection,fmt:f,tuple:t,project}=P;
  const colors={a:'#ffb777',b:'#84c5ff',result:'#a8efd0',candidate:'#ffe097',target:'#a8efd0',x:'#ff989e',y:'#a5e3b8',z:'#a8bdff'};
  const presets={
    walk:{label:'Walk 3 + 4',mode:'add',a:[3,0,0],b:[0,4,0],units:'m',note:'Walk 3 m east, then 4 m north. Slide the blue arrow head to tail; the green shortcut joins the endpoints.'},
    components:{label:'Arrow shadows',mode:'components',a:[3,4,0],b:[0,0,0],units:'m',note:'The dashed steps show how one diagonal arrow can be described using separate x and y amounts.'},
    subtract:{label:'Find the difference',mode:'subtract',a:[4,3,0],b:[1,4,0],units:'m',note:'Subtracting B means adding −B. The reversed blue arrow starts at the head of A.'},
    space:{label:'A room in 3D',mode:'components',a:[3,4,2],b:[0,0,0],units:'m',three:true,note:'Move 3 m along x, 4 m along y and 2 m upward. Rotate the room to separate the three directions.'},
    dot:{label:'Along or across?',mode:'dot',a:[4,2,0],b:[3,0,0],units:'units²',note:'The purple arrow is A’s projection onto B. Turn B to see positive, zero and negative alignment.'},
    cross:{label:'Out of the plane',mode:'cross',a:[3,0,0],b:[0,2,0],units:'units²',three:true,note:'A and B span a flat parallelogram. A×B points perpendicular to it. Swap A and B to reverse that direction.'},
    methane:{label:'Methane angle',mode:'dot',a:[1,1,1],b:[1,-1,-1],units:'',three:true,note:'Two methane bond directions. Rotate the model and compare their true 3D angle with their appearance on the flat screen.'}
  };
  const defaultCamera=three=>({three:!!three,yaw:-.55,pitch:.48,zoom:1,panX:0,panY:0});
  function result(c){
    if(c.mode==='route')return c.destination?sub(c.destination,sum(c.legs)):sum(c.legs);
    if(c.mode==='subtract')return sub(c.a,c.b);
    if(c.mode==='cross')return cross(c.a,c.b);
    if(c.mode==='dot')return dot(c.a,c.b);
    if(c.mode==='unit')return unit(c.a);
    if(c.mode==='components')return c.a;
    return add(c.a,c.b);
  }
  function extentFor(c){
    const points=[[0,0,0],c.a,c.b];
    if(c.mode==='route'){let start=[0,0,0];for(const v of c.legs){start=add(start,v);points.push(start);}if(c.destination)points.push(c.destination);}
    else if(['add','subtract'].includes(c.mode))points.push(result(c));
    const maximum=Math.max(1,...points.filter(Boolean).map(norm));
    return maximum*1.18;
  }
  function sceneMarkup(c,camera,width=700,height=480,extent=8,opts={}){
    const pr=v=>project(v,camera,width,height,extent);
    const line=(a,b,color,stroke=2,dash='')=>{const u=pr(a),v=pr(b);return `<line x1="${u.x}" y1="${u.y}" x2="${v.x}" y2="${v.y}" stroke="${color}" stroke-width="${stroke}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;};
    const label=(v,text,color='#bcd0df',dx=8,dy=-8)=>{const p=pr(v);return `<text x="${p.x+dx}" y="${p.y+dy}" fill="${color}">${E(text)}</text>`;};
    function arrow(a,b,color,name,handle){
      const u=pr(a),v=pr(b),dx=v.x-u.x,dy=v.y-u.y,len=Math.hypot(dx,dy);let s='';
      if(len>2){const ex=dx/len,ey=dy/len,size=Math.min(12,len*.45);s=line(a,b,color,3)+`<polygon points="${v.x},${v.y} ${v.x-size*ex+size*.45*ey},${v.y-size*ey-size*.45*ex} ${v.x-size*ex-size*.45*ey},${v.y-size*ey+size*.45*ex}" fill="${color}"/>`;}
      else s=`<circle cx="${v.x}" cy="${v.y}" r="4" fill="${color}"/>`;
      if(handle&&!camera.three)s+=`<circle data-handle="${handle}" cx="${v.x}" cy="${v.y}" r="20" fill="transparent" stroke="${color}" stroke-width="1.3" stroke-opacity=".5"/><circle data-handle="${handle}" cx="${v.x}" cy="${v.y}" r="6" fill="${color}"/>`;
      return s+(name?label(b,name,color,10,-12):'');
    }
    const axisExtent=extent*.8;
    const rough=axisExtent/4,base=10**Math.floor(Math.log10(rough)),step=base*(rough/base>5?10:rough/base>2?5:rough/base>1?2:1);
    let html='<title>Vector model. Use component controls for exact values.</title>';
    for(let v=-Math.floor(axisExtent/step)*step;v<=axisExtent+1e-8;v+=step){html+=line([v,-axisExtent,0],[v,axisExtent,0],'#365165',1)+line([-axisExtent,v,0],[axisExtent,v,0],'#365165',1);if(Math.abs(v)>step*.1)html+=label([v,0,0],f(v,3),'#9db2c3',2,16);}
    html+=arrow([-axisExtent,0,0],[axisExtent,0,0],colors.x,'')+label([axisExtent,0,0],'+x',colors.x,10,18)+arrow([0,-axisExtent,0],[0,axisExtent,0],colors.y,'')+label([0,axisExtent,0],'+y',colors.y,-22,-18);
    if(camera.three)html+=arrow([0,0,-axisExtent*.35],[0,0,axisExtent],colors.z,'')+label([0,0,axisExtent],'+z',colors.z,-22,-18);
    html+=label([0,0,0],'0','#c1d1de',-15,17);
    if(opts.candidate){
      html+=arrow([0,0,0],opts.candidate,colors.candidate,'Your vector','candidate');
      if(opts.reveal&&opts.target)html+=arrow([0,0,0],opts.target,colors.target,'Solution');
      return html;
    }
    const A=c.a,B=c.b,R=result(c),zero=[0,0,0];
    if(c.mode==='route'){
      let start=zero; c.legs.forEach((v,i)=>{const end=add(start,v);html+=arrow(start,end,i%2?colors.b:colors.a,String(i+1));start=end;});
      if(c.destination){html+=arrow(start,c.destination,colors.result,'Remaining');html+=label(c.destination,'Destination',colors.result,-30,22);}
      else html+=arrow(zero,start,colors.result,'Result');
    }else if(c.mode==='components'||c.mode==='unit'){
      const p1=[A[0],0,0],p2=[A[0],A[1],0];
      html+=line(zero,p1,colors.x,3,'6 4')+line(p1,p2,colors.y,3,'6 4')+line(p2,A,colors.z,3,'6 4');
      html+=arrow(zero,A,colors.a,'A','a');if(c.mode==='unit'&&R)html+=arrow(zero,R,colors.result,'Unit direction');
    }else{
      if(c.mode==='cross'){
        const pts=[zero,A,add(A,B),B].map(v=>{const p=pr(v);return `${p.x},${p.y}`;}).join(' ');
        html+=`<polygon points="${pts}" fill="#8dcbb5" fill-opacity=".14" stroke="#7ab69e" stroke-opacity=".6"/>`;
      }
      html+=arrow(zero,A,colors.a,'A','a')+arrow(zero,B,colors.b,'B','b');
      if(c.mode==='add'||c.mode==='subtract'){
        const moved=c.mode==='subtract'?scale(B,-1):B,start=scale(A,c.progress===undefined?1:c.progress);
        html+=line(A,R,'#8aaabd',1,'4 4')+arrow(start,add(start,moved),'#84c5ff','')+label(add(start,scale(moved,.5)),c.mode==='subtract'?'−B moved':'B moved',colors.b,12,0)+arrow(zero,R,colors.result,'Result');
      }else if(c.mode==='dot'){
        const proj=projection(A,B);if(proj)html+=line(A,proj,'#d5a8f1',2,'5 4')+arrow(zero,proj,'#d5a8f1','Projection');
      }else if(c.mode==='cross'&&norm(R)>1e-10){
        html+=arrow(zero,scale(unit(R),Math.max(norm(A),norm(B))*.85),colors.result,'A×B (direction)');
      }
    }
    return html;
  }
  function describe(c){
    const r=result(c),u=c.units||'',a=c.a,b=c.b;
    const length=v=>f(norm(v));
    if(c.mode==='dot')return {answer:`A·B = ${f(r)} ${u}\nAngle between A and B: ${angle(a,b)===null?'undefined (zero vector)':f(angle(a,b))+'°'}`,steps:[
      `Multiply matching entries: (${f(a[0])})×(${f(b[0])}) + (${f(a[1])})×(${f(b[1])}) + (${f(a[2])})×(${f(b[2])}) = ${f(r)}.`,
      `Lengths: |A|=${length(a)}, |B|=${length(b)}.`,
      angle(a,b)===null?'The zero vector has no direction, so its angle is undefined.':`cos θ = ${f(r)}/(${length(a)}×${length(b)}). Inverse cosine gives ${f(angle(a,b))}°.`,
      norm(b)<1e-10?'Projection onto a zero vector is undefined.':`A’s projection onto B = [(A·B)/(B·B)]B = ${t(projection(a,b))}.`,
      'The dot product is a number. The purple projection is an arrow. They are related, but they are different objects.'
    ]};
    if(c.mode==='cross')return {answer:`A×B = ${t(r)} ${u}\nMagnitude = ${length(r)} ${u}${norm(r)<1e-10?' · no unique direction':''}`,steps:[
      `x = AyBz−AzBy = ${f(a[1])}×${f(b[2])}−${f(a[2])}×${f(b[1])} = ${f(r[0])}.`,
      `y = AzBx−AxBz = ${f(a[2])}×${f(b[0])}−${f(a[0])}×${f(b[2])} = ${f(r[1])}.`,
      `z = AxBy−AyBx = ${f(a[0])}×${f(b[1])}−${f(a[1])}×${f(b[0])} = ${f(r[2])}.`,
      `Perpendicular check: A·(A×B)=${f(dot(a,r))}; B·(A×B)=${f(dot(b,r))}.`,
      'The green arrow is scaled to make its direction visible. Its numerical magnitude is shown above; it uses product units, not the input-vector units.'
    ]};
    if(c.mode==='unit'&&!r)return{answer:'The zero vector has no unit direction.',steps:['Its length is zero. Dividing by that length is undefined. Make at least one component nonzero.']};
    const steps=[];
    if(c.mode==='route')steps.push(...c.legs.map((v,i)=>`Leg ${i+1}: ${t(v)} ${u}.`),`Sum of legs = ${t(sum(c.legs))} ${u}.`,...(c.destination?[`Remaining = destination ${t(c.destination)} − current ${t(sum(c.legs))} = ${t(r)} ${u}.`]:[]));
    else if(c.mode==='unit')steps.push(`Divide each entry of A by its length ${length(a)}: ${t(r)}.`);
    else if(c.mode==='components')steps.push(`x=${f(r[0])}, y=${f(r[1])}, z=${f(r[2])}. Each component is a signed amount along its axis.`);
    else steps.push(...['x','y','z'].map((axis,i)=>`${axis}: ${f(a[i])} ${c.mode==='subtract'?'−':'+'} (${f(b[i])}) = ${f(r[i])}.`));
    steps.push(`Length = √[(${f(r[0])})²+(${f(r[1])})²+(${f(r[2])})²] = ${length(r)} ${c.mode==='unit'?'':u}.`);
    if(norm(r)>1e-10)steps.push(Math.abs(r[2])<1e-10?`Angle = atan2(y,x) ≈ ${f(P.direction(r))}°, measured counterclockwise from +x. Signs matter when choosing the quadrant.`:`3D direction, expressed as a unit vector: ${t(unit(r))}.`);
    else steps.push('Zero length means there is no unique direction.');
    return {answer:`${c.mode==='unit'?'Unit direction':'Result'} = ${t(r)} ${c.mode==='unit'?'':u}\nLength = ${length(r)} ${c.mode==='unit'?'':u}`,steps};
  }
  class Lab{
    constructor(host){
      this.host=host;this.camera=defaultCamera(false);this.config={...presets.walk,a:[...presets.walk.a],b:[...presets.walk.b],progress:1};this.extent=extentFor(this.config);this.pointers=new Map();this.animation=null;this.build();this.bind();this.loadPreset('walk');
    }
    build(){
      this.host.innerHTML=`<div class="lab-toolbar"><label><span>Experiment</span><select data-control="mode" aria-label="Vector experiment"><option value="add">Add arrows</option><option value="subtract">Subtract arrows</option><option value="components">Components in 2D / 3D</option><option value="unit">Make a unit vector</option><option value="dot">Dot product &amp; projection</option><option value="cross">Cross product in 3D</option><option value="route">Textbook route</option></select></label><button type="button" data-action="fullscreen" class="primary">⛶ Full screen</button></div>
        <div class="lab-presets" aria-label="Experiment examples">${Object.entries(presets).map(([id,p])=>`<button type="button" data-preset="${id}" aria-pressed="false">${E(p.label)}</button>`).join('')}</div>
        <div class="physics-stage"><svg class="physics-scene" tabindex="0" role="img" aria-label="Vector lab. In 2D drag round tips; in 3D drag to rotate. Arrow keys rotate or pan; plus and minus zoom."></svg>
        <div class="physics-legend"><span><i style="background:${colors.a}"></i>A / first leg</span><span><i style="background:${colors.b}"></i>B / next leg</span><span><i style="background:${colors.result}"></i>Result</span></div>
        <div class="physics-view-controls" aria-label="View controls"><button data-action="zoom-in" aria-label="Zoom in">+</button><button data-action="zoom-out" aria-label="Zoom out">−</button><button data-action="left" aria-label="Rotate or pan left">↶</button><button data-action="right" aria-label="Rotate or pan right">↷</button><button data-action="up" aria-label="Tilt or pan up">↑</button><button data-action="down" aria-label="Tilt or pan down">↓</button><button class="wide" data-action="dimension">Switch to 3D</button><button class="wide" data-action="fit">Fit &amp; reset view</button></div>
        <p class="physics-gesture"></p></div>
        <details class="physics-dock" open><summary>Controls &amp; explanation <span>Tap to fold</span></summary><div class="physics-dock-body"><p class="lab-intro"></p><p class="lab-mode-note"></p><div class="physics-components"></div><div class="lab-buttons"><button type="button" class="secondary" data-action="swap">Swap A &amp; B</button><button type="button" class="secondary" data-action="reset">Reset experiment</button></div><div class="lab-progress-wrap"><label class="progress-label">Move the second arrow head to tail<input class="lab-progress" type="range" min="0" max="1" step=".01" value="1" data-control="progress"></label><button type="button" class="secondary" data-action="play">▶ Show the movement</button></div><div class="lab-result" role="status" aria-live="polite"></div><details class="lab-work"><summary>Show each calculation</summary><ol class="steps"></ol></details></div></details>`;
      this.svg=this.host.querySelector('svg');
    }
    loadPreset(id){this.preset=id;this.load(presets[id]);this.host.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preset===id)));}
    load(config){
      this.stop();this.config={...config,a:P.vec(config.a),b:P.vec(config.b),progress:1};
      this.initial=JSON.parse(JSON.stringify(this.config));
      const three=!!config.three||config.mode==='cross'||Math.abs(this.config.a[2])+Math.abs(this.config.b[2])>1e-10||config.legs?.some(v=>v[2]);
      this.camera=defaultCamera(three);this.extent=extentFor(this.config);
      this.host.querySelector('[data-control="mode"]').value=config.mode;
      this.host.querySelector('[data-control="progress"]').value='1';
      this.buildControls();this.update();
    }
    buildControls(){
      const c=this.config,range=Math.max(5,Math.ceil(Math.max(norm(c.a),norm(c.b))*1.7));
      this.sliderRange=range;
      const target=this.host.querySelector('.physics-components');
      if(c.mode==='route')target.innerHTML='<p class="caption">The route uses the textbook’s fixed legs. Rotate or zoom the view, then use the answer card to enter your own result.</p>';
      else target.innerHTML=['a',...(['components','unit'].includes(c.mode)?[]:['b'])].map(key=>`<fieldset><legend>${key.toUpperCase()} — signed components</legend>${['x','y','z'].map((axis,i)=>`<div class="physics-component-row"><label for="lab-${key}-${axis}">${axis}</label><input aria-label="${key.toUpperCase()} ${axis} slider" type="range" min="${-range}" max="${range}" step="${range>100?1:.1}" value="${c[key][i]}" data-vector="${key}" data-index="${i}"><input id="lab-${key}-${axis}" aria-label="${key.toUpperCase()} ${axis} exact value" type="number" min="-1000000000" max="1000000000" step="any" value="${Number(c[key][i].toPrecision(8))}" data-vector="${key}" data-index="${i}"></div>`).join('')}</fieldset>`).join('');
      this.host.querySelector('[data-action="swap"]').hidden=['components','unit','route'].includes(c.mode);
      this.host.querySelector('.lab-progress-wrap').hidden=!['add','subtract'].includes(c.mode);
      this.host.querySelector('.lab-intro').textContent=c.note||'This model uses the values from the selected worked answer. Change the inputs to explore a related example, or reset to restore the exercise.';
    }
    dimensions(){const r=this.svg.getBoundingClientRect();return{width:r.width||700,height:r.height||480};}
    draw(){
      const {width,height}=this.dimensions();this.svg.setAttribute('viewBox',`0 0 ${width} ${height}`);this.svg.innerHTML=sceneMarkup(this.config,this.camera,width,height,this.extent);
      this.host.querySelector('[data-action="dimension"]').textContent=this.camera.three?'Switch to 2D':'Switch to 3D';
      this.host.querySelector('.physics-gesture').textContent=this.camera.three?'1 finger: rotate · 2 fingers: zoom & move · components: edit the arrows':'Drag a round tip · drag background to move · pinch to zoom';
    }
    update(){
      this.draw();const info=describe(this.config);this.host.querySelector('.lab-result').textContent=info.answer;
      this.host.querySelector('.lab-work .steps').innerHTML=info.steps.map(s=>`<li>${E(s)}</li>`).join('');
      this.host.querySelector('.lab-mode-note').textContent=this.config.mode==='cross'?'Green arrow shows direction at a display scale. Read the true magnitude below.':!this.camera.three&&(Math.abs(this.config.a[2])+Math.abs(this.config.b[2])>1e-10)?'2D shows the xy projection only. Switch to 3D to see the height.':this.config.mode==='dot'?'Arrow lengths use the supplied numerical scales. For different physical units, compare directions; the dot product uses both input units.':'';
    }
    syncInputs(){this.host.querySelectorAll('[data-vector]').forEach(el=>{const n=this.config[el.dataset.vector][Number(el.dataset.index)];if(el.type==='range'){const max=Math.max(this.sliderRange,Math.abs(n));el.min=-max;el.max=max;}el.value=String(Number(n.toPrecision(8)));});}
    stop(){if(this.animation!==null){cancelAnimationFrame(this.animation);this.animation=null;}const b=this.host.querySelector('[data-action="play"]');if(b)b.textContent='▶ Show the movement';}
    play(){
      if(this.animation!==null){this.stop();return;}
      if(typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches){this.config.progress=this.config.progress>=1?0:1;this.host.querySelector('[data-control="progress"]').value=this.config.progress;this.draw();return;}
      this.config.progress=0;this.host.querySelector('[data-action="play"]').textContent='Pause';let start=null;
      const tick=time=>{if(start===null)start=time;this.config.progress=Math.min(1,(time-start)/1800);this.host.querySelector('[data-control="progress"]').value=this.config.progress;this.draw();if(this.config.progress<1)this.animation=requestAnimationFrame(tick);else{this.animation=null;this.host.querySelector('[data-action="play"]').textContent='▶ Show the movement';}};
      this.animation=requestAnimationFrame(tick);
    }
    fullscreen(){
      const dialog=document.getElementById('physics-fullscreen'),button=this.host.querySelector('[data-action="fullscreen"]');
      if(dialog.open){dialog.close();return;}
      dialog.append(this.host);button.textContent='× Close';this.previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
      dialog.showModal();this.host.querySelector('.physics-dock').open=false;this.draw();button.focus();
    }
    action(name){
      if(name==='fullscreen'){this.fullscreen();return;}
      if(name==='reset'){this.load(this.initial);return;}
      if(name==='play'){this.play();return;}
      if(name==='swap'){[this.config.a,this.config.b]=[this.config.b,this.config.a];this.syncInputs();this.update();return;}
      if(name==='dimension')this.camera.three=!this.camera.three;
      if(name==='zoom-in')this.camera.zoom=P.clamp(this.camera.zoom*1.2,.2,8);
      if(name==='zoom-out')this.camera.zoom=P.clamp(this.camera.zoom/1.2,.2,8);
      if(name==='fit'){this.camera=defaultCamera(this.camera.three);this.extent=extentFor(this.config);}
      if(['left','right','up','down'].includes(name)){
        const dir=['left','up'].includes(name)?-1:1;
        if(this.camera.three){if(name==='left'||name==='right')this.camera.yaw+=dir*.15;else this.camera.pitch=P.clamp(this.camera.pitch-dir*.12,-1.3,1.3);}
        else{if(name==='left'||name==='right')this.camera.panX-=dir*25;else this.camera.panY-=dir*25;}
      }
      this.update();
    }
    bind(){
      this.host.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.preset)this.loadPreset(b.dataset.preset);else if(b.dataset.action)this.action(b.dataset.action);});
      this.host.addEventListener('input',e=>{
        const el=e.target;
        if(el.dataset.vector){const n=Number(el.value);if(el.value.trim()===''||!Number.isFinite(n)||Math.abs(n)>1e9)return;this.config[el.dataset.vector][+el.dataset.index]=n;if(+el.dataset.index===2&&n!==0)this.camera.three=true;this.host.querySelectorAll(`[data-vector="${el.dataset.vector}"][data-index="${el.dataset.index}"]`).forEach(other=>{if(other!==el){other.value=el.value;if(other.type==='range'&&Math.abs(n)>Number(other.max)){other.max=Math.abs(n);other.min=-Math.abs(n);other.value=n;}}});this.update();}
        if(el.dataset.control==='progress'){this.stop();this.config.progress=Number(el.value);this.draw();}
      });
      this.host.addEventListener('change',e=>{if(e.target.dataset.control==='mode'){
        const mode=e.target.value;if(mode==='route'&&!this.config.legs){e.target.value=this.config.mode;this.host.querySelector('.lab-intro').textContent='Open a route problem in Worked answers, then choose “Explore this solution” to load its route.';return;}
        this.stop();this.config.mode=mode;this.config.note='';if(mode==='cross')this.camera.three=true;this.extent=extentFor(this.config);this.buildControls();this.update();
      }});
      const dialog=document.getElementById('physics-fullscreen');dialog.addEventListener('close',()=>{document.getElementById('physics-lab-home').append(this.host);document.body.style.overflow=this.previousOverflow||'';this.host.querySelector('[data-action="fullscreen"]').textContent='⛶ Full screen';this.draw();this.host.querySelector('[data-action="fullscreen"]').focus();});
      this.svg.addEventListener('pointerdown',e=>{e.preventDefault();this.svg.setPointerCapture(e.pointerId);this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});this.dragHandle=!this.camera.three?e.target.dataset.handle:null;this.lastGesture=null;});
      this.svg.addEventListener('pointermove',e=>{
        if(!this.pointers.has(e.pointerId))return;e.preventDefault();const old=this.pointers.get(e.pointerId);this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
        if(this.pointers.size>=2){const [p,q]=[...this.pointers.values()],g={x:(p.x+q.x)/2,y:(p.y+q.y)/2,d:Math.hypot(p.x-q.x,p.y-q.y)};if(this.lastGesture){this.camera.zoom=P.clamp(this.camera.zoom*g.d/Math.max(1,this.lastGesture.d),.2,8);this.camera.panX+=g.x-this.lastGesture.x;this.camera.panY+=g.y-this.lastGesture.y;}this.lastGesture=g;this.dragHandle=null;this.draw();return;}
        if(this.dragHandle&&['a','b'].includes(this.dragHandle)){
          const rect=this.svg.getBoundingClientRect(),{width,height}=this.dimensions(),s=Math.min(width,height)*.36/this.extent*this.camera.zoom;
          this.config[this.dragHandle][0]=Math.round(((e.clientX-rect.left-width/2-this.camera.panX)/s)*10)/10;
          this.config[this.dragHandle][1]=Math.round((-(e.clientY-rect.top-height/2-this.camera.panY)/s)*10)/10;
          this.syncInputs();this.update();
        }else if(this.camera.three){this.camera.yaw+=(e.clientX-old.x)*.009;this.camera.pitch=P.clamp(this.camera.pitch+(e.clientY-old.y)*.007,-1.3,1.3);this.draw();}
        else{this.camera.panX+=e.clientX-old.x;this.camera.panY+=e.clientY-old.y;this.draw();}
      });
      const release=e=>{this.pointers.delete(e.pointerId);this.lastGesture=null;this.dragHandle=null;};['pointerup','pointercancel','lostpointercapture'].forEach(k=>this.svg.addEventListener(k,release));
      this.svg.addEventListener('wheel',e=>{e.preventDefault();this.camera.zoom=P.clamp(this.camera.zoom*Math.exp(-e.deltaY*.0015),.2,8);this.draw();},{passive:false});
      this.svg.addEventListener('keydown',e=>{const m={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down','+':'zoom-in','=':'zoom-in','-':'zoom-out','0':'fit'};if(m[e.key]){e.preventDefault();this.action(m[e.key]);}});
      if(typeof ResizeObserver!=='undefined'){this.observer=new ResizeObserver(()=>this.draw());this.observer.observe(this.svg);}else window.addEventListener('resize',()=>this.draw());
      document.addEventListener('visibilitychange',()=>{if(document.hidden)this.stop();});
    }
  }
  return {Lab,presets,defaultCamera,result,extentFor,sceneMarkup,describe,colors,escape:E};
});
