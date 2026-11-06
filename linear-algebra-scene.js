(function (root) {
  'use strict';
  const M = root.EmberAlgebra || (typeof require==='function' ? require('./linear-algebra-core.js') : null);
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const cube=Array.from({length:8},(_,i)=>[i&1,(i>>1)&1,(i>>2)&1]);
  const edges=cube.flatMap((_,i)=>[1,2,4].filter(bit=>(i&bit)===0).map(bit=>[i,i|bit]));
  const faces=[[0,1,3,2],[4,5,7,6],[0,1,5,4],[2,3,7,6],[0,2,6,4],[1,3,7,5]];
  // Intersect the infinite plane with a finite viewing box, keeping all displayed
  // vertices on the actual plane. This avoids giant patches at near-zero normals.
  function clipPlane(row,extent=3) {
    const normal=row.slice(0,3), length=Math.hypot(...normal);
    if(length<1e-9)return [];
    const vertices=cube.map(v=>v.map(n=>(2*n-1)*extent)), points=[];
    const signed=v=>M.dot(normal,v)-row[3];
    const add=v=>{if(!points.some(p=>Math.hypot(...p.map((x,i)=>x-v[i]))<1e-7))points.push(v);};
    for(const [i,j] of edges) {
      const a=vertices[i],b=vertices[j],da=signed(a),db=signed(b);
      if(Math.abs(da)<1e-8)add(a);
      if(Math.abs(db)<1e-8)add(b);
      if(da*db<0) { const t=da/(da-db);add(a.map((x,k)=>x+t*(b[k]-x))); }
    }
    if(points.length<3)return [];
    const center=[0,1,2].map(i=>points.reduce((s,p)=>s+p[i],0)/points.length);
    const u=points[0].map((n,i)=>n-center[i]), unit=u.map(n=>n/Math.hypot(...u));
    const n=normal.map(x=>x/length),v=[n[1]*unit[2]-n[2]*unit[1],n[2]*unit[0]-n[0]*unit[2],n[0]*unit[1]-n[1]*unit[0]];
    return points.sort((a,b)=>{
      const aa=a.map((x,i)=>x-center[i]),bb=b.map((x,i)=>x-center[i]);
      return Math.atan2(M.dot(aa,v),M.dot(aa,unit))-Math.atan2(M.dot(bb,v),M.dot(bb,unit));
    });
  }
  function transformAt(target,progress,angle=null) {
    const t=clamp(progress,0,1);
    if(angle!==null) {const r=angle*t*Math.PI/180,c=Math.cos(r),s=Math.sin(r);return [[c,-s,0],[s,c,0],[0,0,1]];}
    return target.map((row,i)=>row.map((n,j)=>(i===j?1-t:0)+t*n));
  }
  function project(v,camera,width,height) {
    const [x,y,z]=v,c=Math.cos(camera.yaw),s=Math.sin(camera.yaw);
    const across=x*c-y*s,depth=x*s+y*c,scale=Math.min(width,height)*.115*camera.zoom;
    return {x:width/2+across*scale+camera.panX,y:height/2-(z*Math.cos(camera.pitch)-depth*Math.sin(camera.pitch))*scale+camera.panY,
      d:depth*Math.cos(camera.pitch)+z*Math.sin(camera.pitch)};
  }
  const api={clipPlane,transformAt,project};
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.EmberScene=api;
  if(typeof document==='undefined')return;

  const L=root.EmberLearning,$=id=>document.getElementById(id),esc=L.escape;
  const scene=$('scene'),workspace=$('lab-workspace'),dialog=$('lab-fullscreen');
  const colors=['#ffb86b','#65e5d7','#c8acff'],axisColors=['#ff8b92','#8ce8b0','#8bbcff'];
  const presets={
    planes:[
      {name:'One point',values:[[1,1,1,3],[1,-1,0,0],[0,1,1,2]],hint:'Three sheets meet at one point. That point makes all three equations true.'},
      {name:'A line',values:[[1,0,0,1],[0,1,0,1],[1,1,0,2]],hint:'All three sheets share the highlighted line. Every point on that line is a solution.'},
      {name:'Same plane',values:[[0,0,1,1],[0,0,2,2],[0,0,-1,-1]],hint:'These three equations describe the same sheet. Every point on it is a solution.'},
      {name:'No solution',values:[[1,0,0,-1],[1,0,0,1],[0,1,1,0]],hint:'Two sheets are parallel and separated. No point can lie on all three.'}
    ],
    transform:[
      {name:'Stretch',values:[[2,0,0],[0,1,0],[0,0,.5]],hint:'Double the x coordinate and halve z. Watch the unit cube become wider and shorter.'},
      {name:'Rotate',values:[[0,-1,0],[1,0,0],[0,0,1]],angle:90,hint:'Turn around the z-axis. The cube keeps its shape and size while its coordinates change.'},
      {name:'Shear',values:[[1,1,0],[0,1,0],[0,0,1]],hint:'Add y to x. Points with larger y slide farther sideways; the cube becomes slanted.'},
      {name:'Reflect',values:[[-1,0,0],[0,1,0],[0,0,1]],hint:'Change x to −x, crossing the yz mirror. Halfway through this transition the cube is flat; at 100% it is a reflection.'},
      {name:'Flatten',values:[[1,0,0],[0,1,0],[0,0,0]],hint:'At 100%, set z to zero. A whole 3D cube becomes a flat square, so the original heights cannot be recovered.'}
    ]
  };
  const initialCamera={yaw:-.57,pitch:.43,zoom:1,panX:0,panY:0};
  const state={...initialCamera,mode:'planes',preset:0,values:structuredClone(presets.planes[0].values),target:null,progress:100,angle:null,plane:0,
    visible:[true,true,true],point:[1,1,1],width:640,height:480,grid:true};
  let motion=0,frame=0,drag=new Map(),geometryResult;
  function equation(row) {return row.slice(0,3).map((v,i)=>'('+M.format(v)+')'+['x','y','z'][i]).join(' + ')+' = '+M.format(row[3]);}
  function hint() {return state.preset===null?'Custom values: read the result below and compare it with what you see.':presets[state.mode][state.preset].hint;}
  function examples() {
    $('scene-examples').innerHTML=presets[state.mode].map((p,i)=>'<button type="button" data-preset="'+i+'" aria-pressed="'+(i===state.preset)+'">'+esc(p.name)+'</button>').join('');
  }
  function range(id,label,min,max,step,value) {
    if(id==='scene-distance'){min=Math.min(min,Math.floor(value));max=Math.max(max,Math.ceil(value));}
    return '<label class="scene-slider" for="'+id+'"><span>'+esc(label)+'</span><output id="'+id+'-value" for="'+id+'">'+M.tidy(value)+'</output><input id="'+id+'" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+value+'"></label>';
  }
  function controls() {
    const planes=state.mode==='planes',row=state.values[state.plane];
    const norm=planes?Math.hypot(...row.slice(0,3)):1;
    let simple;
    if(planes) {
      const distance=norm?row[3]/norm:0,azimuth=norm?Math.atan2(row[1],row[0])*180/Math.PI:0,elevation=norm?Math.asin(clamp(row[2]/norm,-1,1))*180/Math.PI:90;
      simple='<label for="scene-plane">Move this plane</label><select id="scene-plane">'+colors.map((_,i)=>'<option value="'+i+'"'+(i===state.plane?' selected':'')+'>'+['Orange','Teal','Purple'][i]+' · Plane '+(i+1)+'</option>').join('')+'</select>'+
        range('scene-distance','Slide the plane',-6,6,.05,distance)+
        '<p class="caption">Move the selected sheet without turning it. Its distance is measured along its perpendicular direction.</p>'+
        '<details class="scene-more"><summary>Tilt or isolate a plane</summary>'+range('scene-azimuth','Turn sideways (degrees)',-180,180,1,azimuth)+range('scene-elevation','Tilt upward (degrees)',-90,90,1,elevation)+
        '<div class="plane-toggles">'+colors.map((c,i)=>'<label><input type="checkbox" data-plane-visible="'+i+'"'+(state.visible[i]?' checked':'')+'><span style="color:'+c+'">●</span> Plane '+(i+1)+'</label>').join('')+'</div><p class="caption">Hiding a sheet only changes the view. All three equations still count in the solution.</p></details>';
    } else {
      simple=range('scene-progress','Apply the change (%)',0,100,1,state.progress)+
        '<div class="scene-play-row"><button class="secondary" id="scene-play" type="button">▶ Play once</button><button class="secondary" id="scene-start" type="button">Back to 0%</button></div>'+
        '<p class="caption">0% shows the starting cube. 100% shows the selected transformation. Orange dashes mark the original; teal marks the result.</p>'+
        (state.angle!==null?range('scene-angle','Rotation angle (degrees)',-180,180,1,state.angle):'')+
        '<details class="scene-more"><summary>Move the point being tracked</summary>'+state.point.map((v,i)=>range('scene-point-'+i,['Point x','Point y','Point z'][i],-3,3,.1,v)).join('')+'</details>';
    }
    const columns=planes?['x','y','z','Right side']:['x','y','z'];
    const edit=planes?state.values:state.target;
    $('scene-controls').innerHTML=simple+'<details class="scene-more"><summary>Edit exact '+(planes?'equations':'target matrix')+'</summary><p class="caption">'+
      (planes?'Each row is ax + by + cz = d. Change one coefficient at a time.':'Each row calculates one new coordinate. A custom matrix uses a straight transition from the identity.')+'</p><div class="matrix-edit '+(planes?'':'transform')+'">'+
      columns.map(x=>'<span class="caption">'+x+'</span>').join('')+edit.map((r,i)=>r.map((n,j)=>'<input type="number" min="-10" max="10" step="any" data-row="'+i+'" data-col="'+j+'" aria-label="Row '+(i+1)+' '+columns[j]+'" value="'+M.tidy(n)+'">').join('')).join('')+'</div></details>'+
      '<label class="grid-toggle"><input id="scene-grid" type="checkbox"'+(state.grid?' checked':'')+'> Show coordinate grid</label>';
  }
  const p=v=>project(v,state,state.width,state.height);
  const coord=v=>{const a=p(v);return a.x.toFixed(2)+','+a.y.toFixed(2);};
  function line(a,b,color,width=1,extra='') {return '<polyline points="'+coord(a)+' '+coord(b)+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" '+extra+'/>';}
  function polygon(vertices,color,opacity) {return '<polygon points="'+vertices.map(coord).join(' ')+'" fill="'+color+'" fill-opacity="'+opacity+'" stroke="'+color+'" stroke-width="1.5"/>';}
  function point(v,color,label) {const a=p(v);return '<circle cx="'+a.x+'" cy="'+a.y+'" r="6" fill="'+color+'" stroke="#101e2e" stroke-width="2"/><text x="'+(a.x+10)+'" y="'+(a.y-12)+'" fill="'+color+'">'+esc(label)+'</text>';}
  const depth=vertices=>vertices.reduce((s,v)=>s+p(v).d,0)/vertices.length;
  function draw() {
    let grid='',axes='',objects='',highlights='';
    if(state.grid)for(let i=-3;i<=3;i++)grid+=line([i,-3,0],[i,3,0],'#314758')+line([-3,i,0],[3,i,0],'#314758');
    for(let i=0;i<3;i++) {
      const a=[0,0,0],b=[0,0,0];a[i]=-3.2;b[i]=3.4;
      axes+=line(a,b,axisColors[i],1.6,'marker-end="url(#axis-arrow-'+i+')"');
      const q=p(b);axes+='<text x="'+(q.x+7)+'" y="'+(q.y-7)+'" fill="'+axisColors[i]+'">'+['x','y','z'][i]+'</text>';
      if(state.grid)for(const tick of [-2,-1,1,2]) {const v=[0,0,0];v[i]=tick;const q=p(v);axes+='<text class="axis-tick" x="'+(q.x+4)+'" y="'+(q.y+15)+'" fill="'+axisColors[i]+'">'+tick+'</text>';}
    }
    if(state.mode==='planes') {
      const planes=state.values.map((r,i)=>({points:clipPlane(r),i})).filter(o=>state.visible[o.i]&&o.points.length);
      objects=planes.sort((a,b)=>depth(a.points)-depth(b.points)).map(o=>polygon(o.points,colors[o.i],o.i===state.plane?.25:.13)).join('');
      const s=geometryResult;
      if(s?.kind==='one')highlights=point(s.point,'#ffe59a',M.vector(s.point));
      if(s?.kind==='infinite'&&s.basis.length===1) {
        const d=s.basis[0],size=4/Math.hypot(...d);
        highlights=line(s.point.map((n,i)=>n-size*d[i]),s.point.map((n,i)=>n+size*d[i]),'#ffe59a',4);
      }
      if(s?.kind==='infinite'&&s.basis.length===2) {
        const active=state.values.find(r=>r.slice(0,3).some(n=>!M.zero(n)));
        const vertices=clipPlane(active);if(vertices.length)highlights=polygon(vertices,'#ffe59a',.08);
      }
    } else {
      const mapped=cube.map(v=>M.apply(state.values,v));
      objects=faces.map(f=>f.map(i=>mapped[i])).sort((a,b)=>depth(a)-depth(b)).map(f=>polygon(f,colors[1],.16)).join('');
      highlights=edges.map(([i,j])=>line(cube[i],cube[j],colors[0],1.8,'stroke-dasharray="5 5"')).join('')+
        edges.map(([i,j])=>line(mapped[i],mapped[j],colors[1],2.5)).join('');
      const mappedPoint=M.apply(state.values,state.point);
      highlights+=line([0,0,0],state.point,colors[0],2,'stroke-dasharray="4 4"')+line([0,0,0],mappedPoint,'#ffe59a',3)+
        point(state.point,colors[0],'Input '+M.vector(state.point))+point(mappedPoint,'#ffe59a','Output '+M.vector(mappedPoint));
    }
    const origin=p([0,0,0]);
    scene.innerHTML='<title>'+esc(state.mode==='planes'?'Three planes: '+$('scene-summary').textContent:'A matrix transforming a cube and a tracked point')+'</title><defs>'+axisColors.map((c,i)=>'<marker id="axis-arrow-'+i+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="'+c+'"/></marker>').join('')+'</defs>'+grid+objects+axes+highlights+
      '<circle cx="'+origin.x+'" cy="'+origin.y+'" r="3" fill="#eaf2f7"/><text x="'+(origin.x-15)+'" y="'+(origin.y+20)+'" fill="#c1d0db">0</text>';
  }
  function update(announce=false) {
    let title,explanation,steps;
    if(state.mode==='planes') {
      const result=M.solve(state.values);geometryResult=result;steps=result.steps;
      title=result.kind==='one'?'One shared point':result.kind==='none'?'No common solution':['','A shared line','A shared plane','Every point works'][result.basis.length];
      explanation=result.kind==='one'?'The highlighted point '+M.vector(result.point)+' satisfies every equation.':result.kind==='none'?'There is no point that belongs to all three sheets.':'There are infinitely many solutions. '+(result.basis.length===3?'Every row says 0 = 0.':'Every point on the highlighted intersection satisfies all three equations.');
      const outside=state.values.some(r=>Math.hypot(...r.slice(0,3))>1e-9&&!clipPlane(r).length);
      if(outside)explanation+=' A plane is outside the displayed −3 to 3 box. Slide it closer to see it.';
      if(result.kind==='one'&&result.point.some(n=>Math.abs(n)>3))explanation+=' The intersection lies outside that box; use Fit to find the point.';
      $('scene-result').innerHTML='<p>'+esc(hint())+'</p><p>'+esc(explanation)+'</p><div class="plane-equations">'+state.values.map((r,i)=>'<span><b style="color:'+colors[i]+'">'+(i+1)+'</b> '+esc(equation(r))+'</span>').join('')+'</div>';
    } else {
      state.values=transformAt(state.target,state.progress/100,state.angle);
      const out=M.apply(state.values,state.point);
      title=state.progress===0?'Start: no change yet':'Transformation · '+Math.round(state.progress)+'%';
      explanation='Input '+M.vector(state.point)+' → output '+M.vector(out)+'.';
      steps=['Read the current matrix one row at a time. Multiply each row by the input coordinates.\n'+M.matrixBlock(state.values),
        ...state.values.map((row,i)=>['New x','New y','New z'][i]+' = '+row.map((n,j)=>'('+M.format(n)+' × '+M.format(state.point[j])+')').join(' + ')+' = '+M.format(out[i])+'.'),
        'Apply that same rule to every point of the cube. The origin stays fixed: multiplying a zero coordinate column always gives zero.'];
      $('scene-result').innerHTML='<p>'+esc(hint())+'</p><p class="tracked-point">'+esc(explanation)+'</p>';
    }
    $('scene-summary').textContent=title;
    $('scene-work').innerHTML=L.steps(steps);
    if(announce)$('scene-announcement').textContent=title+'. '+explanation;
    draw();
  }
  function stopMotion() {if(motion)cancelAnimationFrame(motion);motion=0;const button=$('scene-play');if(button)button.textContent='▶ Play once';}
  function preset(index) {
    stopMotion();state.preset=index;
    const example=presets[state.mode][index];state.values=structuredClone(example.values);state.target=structuredClone(example.values);
    state.angle=example.angle??null;state.progress=100;state.visible=[true,true,true];state.plane=0;
    Object.assign(state,initialCamera);examples();controls();update(true);
  }
  function resize() {
    const r=scene.getBoundingClientRect();if(r.width<1||r.height<1)return;
    state.width=r.width;state.height=r.height;scene.setAttribute('viewBox','0 0 '+r.width+' '+r.height);draw();
  }
  function fit() {
    state.zoom=1;state.panX=0;state.panY=0;
    let vertices=cube.map(v=>v.map(n=>(2*n-1)*3));
    if(state.mode==='transform')vertices.push(...cube.map(v=>M.apply(state.values,v)),state.point,M.apply(state.values,state.point));
    if(state.mode==='planes'&&geometryResult?.kind==='one')vertices.push(geometryResult.point);
    const screen=vertices.map(p),xs=screen.map(p=>p.x),ys=screen.map(p=>p.y);
    const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
    state.zoom=clamp(Math.min((state.width-100)/(maxX-minX||1),(state.height-100)/(maxY-minY||1)),.02,3);
    state.panX=(state.width/2-(minX+maxX)/2)*state.zoom;state.panY=(state.height/2-(minY+maxY)/2)*state.zoom;
  }
  function camera(action) {
    if(action==='left')state.yaw-=.2;if(action==='right')state.yaw+=.2;
    if(action==='up')state.pitch+=.15;if(action==='down')state.pitch-=.15;
    if(action==='in')state.zoom*=1.2;if(action==='out')state.zoom/=1.2;
    if(action==='reset')Object.assign(state,initialCamera);
    if(action==='fit')fit();
    state.pitch=clamp(state.pitch,-Math.PI/2,Math.PI/2);state.zoom=clamp(state.zoom,.02,6);draw();
  }
  $('scene-mode').addEventListener('change',e=>{state.mode=e.target.value;preset(0);});
  $('scene-examples').addEventListener('click',e=>{const b=e.target.closest('[data-preset]');if(b)preset(Number(b.dataset.preset));});
  workspace.querySelector('.scene-camera').addEventListener('click',e=>{const b=e.target.closest('[data-camera]');if(b)camera(b.dataset.camera);});
  function setRange(id,value) {const el=$(id);if(el){el.value=value;$(id+'-value').textContent=M.tidy(value);}}
  function custom() {state.preset=null;workspace.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed','false'));}
  $('scene-controls').addEventListener('input',e=>{
    const el=e.target,id=el.id;
    if(el.type!=='range')return;stopMotion();setRange(id,Number(el.value));
    if(id==='scene-progress')state.progress=Number(el.value);
    if(id==='scene-angle'){state.angle=Number(el.value);custom();}
    if(id.startsWith('scene-point-'))state.point[Number(id.slice(-1))]=Number(el.value);
    if(['scene-distance','scene-azimuth','scene-elevation'].includes(id)) {
      const row=state.values[state.plane],norm=Math.hypot(...row.slice(0,3));
      if(id==='scene-distance'&&norm>1e-9)row[3]=Number(el.value)*norm;
      else {
        const az=id==='scene-azimuth'?Number(el.value)*Math.PI/180:(norm?Math.atan2(row[1],row[0]):0);
        const ev=id==='scene-elevation'?Number(el.value)*Math.PI/180:(norm?Math.asin(clamp(row[2]/norm,-1,1)):Math.PI/2);
        const distance=id==='scene-distance'?Number(el.value):(norm?row[3]/norm:0);
        state.values[state.plane]=[Math.cos(ev)*Math.cos(az),Math.cos(ev)*Math.sin(az),Math.sin(ev),distance];
      }
      custom();workspace.querySelectorAll('[data-row="'+state.plane+'"]').forEach(input=>{input.value=M.tidy(state.values[state.plane][Number(input.dataset.col)]);});
    }
    update();
  });
  $('scene-controls').addEventListener('change',e=>{
    const el=e.target;
    if(el.id==='scene-plane'){state.plane=Number(el.value);controls();draw();$('scene-plane').focus();return;}
    if(el.id==='scene-grid'){state.grid=el.checked;draw();return;}
    if(el.dataset.planeVisible!==undefined){state.visible[Number(el.dataset.planeVisible)]=el.checked;draw();return;}
    if(el.dataset.row!==undefined) {
      stopMotion();const i=Number(el.dataset.row),j=Number(el.dataset.col),rows=state.mode==='planes'?state.values:state.target;
      if(el.value===''||!el.checkValidity()){el.value=M.tidy(rows[i][j]);return;}
      rows[i][j]=Number(el.value);custom();
      if(state.mode==='transform'){state.angle=null;state.progress=100;setRange('scene-progress',100);const angle=$('scene-angle');if(angle)angle.closest('label').remove();}
      else {const r=state.values[state.plane],n=Math.hypot(...r.slice(0,3)),distance=n?r[3]/n:0;const slider=$('scene-distance');slider.min=Math.min(-6,Math.floor(distance));slider.max=Math.max(6,Math.ceil(distance));setRange('scene-distance',distance);setRange('scene-azimuth',n?Math.atan2(r[1],r[0])*180/Math.PI:0);setRange('scene-elevation',n?Math.asin(clamp(r[2]/n,-1,1))*180/Math.PI:90);}
      update(true);return;
    }
    if(el.type==='range')update(true);
  });
  $('scene-controls').addEventListener('click',e=>{
    if(e.target.id==='scene-start'){stopMotion();state.progress=0;setRange('scene-progress',0);update(true);}
    if(e.target.id!=='scene-play')return;
    if(motion){stopMotion();return;}
    if(root.matchMedia?.('(prefers-reduced-motion: reduce)').matches){state.progress=100;setRange('scene-progress',100);update(true);return;}
    const start=performance.now();e.target.textContent='Pause';
    const tick=now=>{state.progress=clamp((now-start)/35,0,100);setRange('scene-progress',state.progress);update();
      if(state.progress<100)motion=requestAnimationFrame(tick);else {motion=0;stopMotion();update(true);}};
    motion=requestAnimationFrame(tick);
  });
  scene.addEventListener('keydown',e=>{const action={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down','+':'in','=':'in','-':'out',Home:'reset',f:'fit'}[e.key];if(action){e.preventDefault();camera(action);}});
  scene.addEventListener('wheel',e=>{e.preventDefault();state.zoom=clamp(state.zoom*Math.exp(-e.deltaY*.001),.02,6);draw();},{passive:false});
  scene.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;scene.setPointerCapture(e.pointerId);drag.set(e.pointerId,{x:e.clientX,y:e.clientY});});
  scene.addEventListener('pointermove',e=>{
    if(!drag.has(e.pointerId))return;
    const before=[...drag.values()],old=drag.get(e.pointerId);
    drag.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(drag.size===1){state.yaw+=(e.clientX-old.x)*.008;state.pitch=clamp(state.pitch+(e.clientY-old.y)*.008,-Math.PI/2,Math.PI/2);}
    else {
      const after=[...drag.values()],distance=a=>Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),oldDistance=distance(before);
      if(oldDistance>2)state.zoom=clamp(state.zoom*distance(after)/oldDistance,.02,6);
      state.panX+=(after[0].x+after[1].x-before[0].x-before[1].x)/2;state.panY+=(after[0].y+after[1].y-before[0].y-before[1].y)/2;
    }
    if(!frame)frame=requestAnimationFrame(()=>{frame=0;draw();});
  });
  for(const type of ['pointerup','pointercancel','lostpointercapture'])scene.addEventListener(type,e=>drag.delete(e.pointerId));
  let previousOverflow='';
  function closeFullscreen() {
    stopMotion();$('lab-home').append(workspace);document.body.style.overflow=previousOverflow;
    $('scene-fullscreen').textContent='⛶ Full screen';$('scene-fullscreen').setAttribute('aria-expanded','false');resize();$('scene-fullscreen').focus();
  }
  $('scene-fullscreen').setAttribute('aria-expanded','false');
  $('scene-fullscreen').addEventListener('click',()=>{
    if(dialog.open){dialog.close();return;}
    previousOverflow=document.body.style.overflow;dialog.append(workspace);dialog.showModal();document.body.style.overflow='hidden';
    $('scene-fullscreen').textContent='✕ Exit';$('scene-fullscreen').setAttribute('aria-expanded','true');resize();$('scene-fullscreen').focus();
  });
  dialog.addEventListener('close',closeFullscreen);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopMotion();drag.clear();}});
  new ResizeObserver(resize).observe(scene);
  root.addEventListener('resize',resize);
  preset(0);resize();
})(globalThis);
