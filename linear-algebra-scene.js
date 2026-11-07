(function (root) {
  'use strict';
  const tr=(en,sv)=>root.EmberMathI18n?.t(en,sv)??en;
  const localize=value=>root.EmberMathI18n?.localize(value)??value;
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
      {name:tr('One point',"En punkt"),values:[[1,1,1,3],[1,-1,0,0],[0,1,1,2]],hint:tr('Three sheets meet at one point. That point makes all three equations true.',"Tre plana skivor möts i en punkt. Den punkten gör alla tre ekvationerna sanna.")},
      {name:tr('A line',"En linje"),values:[[1,0,0,1],[0,1,0,1],[1,1,0,2]],hint:tr('All three sheets share the highlighted line. Every point on that line is a solution.',"Alla tre plana skivor delar den markerade linjen. Varje punkt på linjen är en lösning.")},
      {name:tr('Same plane',"Samma plan"),values:[[0,0,1,1],[0,0,2,2],[0,0,-1,-1]],hint:tr('These three equations describe the same sheet. Every point on it is a solution.',"Dessa tre ekvationer beskriver samma plana skiva. Varje punkt på den är en lösning.")},
      {name:tr('No solution',"Ingen lösning"),values:[[1,0,0,-1],[1,0,0,1],[0,1,1,0]],hint:tr('Two sheets are parallel and separated. No point can lie on all three.',"Två plana skivor är parallella och åtskilda. Ingen punkt kan ligga på alla tre.")}
    ],
    transform:[
      {name:tr('Stretch',"Sträck"),values:[[2,0,0],[0,1,0],[0,0,.5]],hint:tr('Double the x coordinate and halve z. Watch the unit cube become wider and shorter.',"Fördubbla x-koordinaten och halvera z. Se hur enhetskuben blir bredare och lägre.")},
      {name:tr('Rotate',"Rotera"),values:[[0,-1,0],[1,0,0],[0,0,1]],angle:90,hint:tr('Turn around the z-axis. The cube keeps its shape and size while its coordinates change.',"Rotera runt z-axeln. Kuben behåller sin form och storlek medan koordinaterna ändras.")},
      {name:tr('Shear',"Skjuva"),values:[[1,1,0],[0,1,0],[0,0,1]],hint:tr('Add y to x. Points with larger y slide farther sideways; the cube becomes slanted.',"Addera y till x. Punkter med större y förskjuts längre åt sidan, så kuben blir sned.")},
      {name:tr('Reflect',"Spegla"),values:[[-1,0,0],[0,1,0],[0,0,1]],hint:tr('Change x to −x, crossing the yz mirror. Halfway through this transition the cube is flat; at 100% it is a reflection.',"Ändra x till −x och passera genom spegelplanet yz. Halvvägs genom denna övergång är kuben platt; vid 100% är den speglad.")},
      {name:tr('Flatten',"Platta till"),values:[[1,0,0],[0,1,0],[0,0,0]],hint:tr('At 100%, set z to zero. A whole 3D cube becomes a flat square, so the original heights cannot be recovered.',"Vid 100% sätts z till noll. En hel 3D-kub blir en platt kvadrat, så de ursprungliga höjderna kan inte återskapas.")}
    ]
  };
  const initialCamera={yaw:-.57,pitch:.43,zoom:1,panX:0,panY:0};
  const state={...initialCamera,mode:'planes',preset:0,values:structuredClone(presets.planes[0].values),target:null,progress:100,angle:null,plane:0,
    visible:[true,true,true],point:[1,1,1],width:640,height:480,grid:true};
  let motion=0,frame=0,drag=new Map(),geometryResult;
  function equation(row) {return row.slice(0,3).map((v,i)=>'('+M.format(v)+')'+['x','y','z'][i]).join(' + ')+' = '+M.format(row[3]);}
  function hint() {return state.preset===null?tr('Custom values: read the result below and compare it with what you see.',"Egna värden: läs resultatet nedan och jämför med det du ser."):localize(presets[state.mode][state.preset].hint);}
  function examples() {
    $('scene-examples').innerHTML=presets[state.mode].map((p,i)=>'<button type="button" data-preset="'+i+'" aria-pressed="'+(i===state.preset)+'">'+esc(localize(p.name))+'</button>').join('');
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
      simple=tr('<label for="scene-plane">Move this plane</label><select id="scene-plane">',"<label for=\"scene-plane\">Flytta detta plan</label><select id=\"scene-plane\">")+colors.map((_,i)=>'<option value="'+i+'"'+(i===state.plane?' selected':'')+'>'+[tr('Orange',"Orange"),tr('Teal',"Turkos"),tr('Purple',"Lila")][i]+tr(' · Plane '," · Plan ")+(i+1)+'</option>').join('')+'</select>'+
        range('scene-distance',tr('Slide the plane',"Förskjut planet"),-6,6,.05,distance)+
        tr('<p class="caption">Move the selected sheet without turning it. Its distance is measured along its perpendicular direction.</p>',"<p class=\"caption\">Flytta den valda plana skivan utan att vrida den. Avståndet mäts i riktningen vinkelrätt mot planet.</p>")+
        tr('<details class="scene-more"><summary>Tilt or isolate a plane</summary>',"<details class=\"scene-more\"><summary>Luta eller visa ett plan separat</summary>")+range('scene-azimuth',tr('Turn sideways (degrees)',"Vrid åt sidan (grader)"),-180,180,1,azimuth)+range('scene-elevation',tr('Tilt upward (degrees)',"Luta uppåt (grader)"),-90,90,1,elevation)+
        '<div class="plane-toggles">'+colors.map((c,i)=>'<label><input type="checkbox" data-plane-visible="'+i+'"'+(state.visible[i]?' checked':'')+'><span style="color:'+c+tr('">●</span> Plane ',"\">●</span> Plan ")+(i+1)+'</label>').join('')+tr('</div><p class="caption">Hiding a sheet only changes the view. All three equations still count in the solution.</p></details>',"</div><p class=\"caption\">Att dölja en skiva ändrar bara vad som visas. Alla tre ekvationerna räknas fortfarande med i lösningen.</p></details>");
    } else {
      simple=range('scene-progress',tr('Apply the change (%)',"Utför förändringen (%)"),0,100,1,state.progress)+
        tr('<div class="scene-play-row"><button class="secondary" id="scene-play" type="button">▶ Play once</button><button class="secondary" id="scene-start" type="button">Back to 0%</button></div>',"<div class=\"scene-play-row\"><button class=\"secondary\" id=\"scene-play\" type=\"button\">▶ Spela en gång</button><button class=\"secondary\" id=\"scene-start\" type=\"button\">Tillbaka till 0%</button></div>")+
        tr('<p class="caption">0% shows the starting cube. 100% shows the selected transformation. Orange dashes mark the original; teal marks the result.</p>',"<p class=\"caption\">0% visar den ursprungliga kuben. 100% visar den valda avbildningen. Orange streck markerar ursprunget; turkos visar resultatet.</p>")+
        (state.angle!==null?range('scene-angle',tr('Rotation angle (degrees)',"Rotationsvinkel (grader)"),-180,180,1,state.angle):'')+
        tr('<details class="scene-more"><summary>Move the point being tracked</summary>',"<details class=\"scene-more\"><summary>Flytta punkten som följs</summary>")+state.point.map((v,i)=>range('scene-point-'+i,[tr('Point x',"Punktens x"),tr('Point y',"Punktens y"),tr('Point z',"Punktens z")][i],-3,3,.1,v)).join('')+'</details>';
    }
    const columns=planes?['x','y','z',tr('Right side',"Högerled")]:['x','y','z'];
    const edit=planes?state.values:state.target;
    $('scene-controls').innerHTML=simple+tr('<details class="scene-more"><summary>Edit exact ',"<details class=\"scene-more\"><summary>Redigera ")+(planes?tr('equations',"exakta ekvationer"):tr('target matrix',"exakt målmatris"))+'</summary><p class="caption">'+
      (planes?tr('Each row is ax + by + cz = d. Change one coefficient at a time.',"Varje rad är ax + by + cz = d. Ändra en koefficient i taget."):tr('Each row calculates one new coordinate. A custom matrix uses a straight transition from the identity.',"Varje rad beräknar en ny koordinat. En egen matris använder en linjär övergång från identitetsmatrisen."))+'</p><div class="matrix-edit '+(planes?'':'transform')+'">'+
      columns.map(x=>'<span class="caption">'+x+'</span>').join('')+edit.map((r,i)=>r.map((n,j)=>'<input type="number" min="-10" max="10" step="any" data-row="'+i+'" data-col="'+j+tr('" aria-label="Row ',"\" aria-label=\"Rad ")+(i+1)+' '+columns[j]+'" value="'+M.tidy(n)+'">').join('')).join('')+'</div></details>'+
      '<label class="grid-toggle"><input id="scene-grid" type="checkbox"'+(state.grid?' checked':'')+tr('> Show coordinate grid</label>',"> Visa koordinatnät</label>");
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
        point(state.point,colors[0],tr('Input ',"Inpunkt ")+M.vector(state.point))+point(mappedPoint,'#ffe59a',tr('Output ',"Utpunkt ")+M.vector(mappedPoint));
    }
    const origin=p([0,0,0]);
    scene.innerHTML='<title>'+esc(state.mode==='planes'?tr('Three planes: ',"Tre plan: ")+$('scene-summary').textContent:tr('A matrix transforming a cube and a tracked point',"En matris som avbildar en kub och en punkt som följs"))+'</title><defs>'+axisColors.map((c,i)=>'<marker id="axis-arrow-'+i+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="'+c+'"/></marker>').join('')+'</defs>'+grid+objects+axes+highlights+
      '<circle cx="'+origin.x+'" cy="'+origin.y+'" r="3" fill="#eaf2f7"/><text x="'+(origin.x-15)+'" y="'+(origin.y+20)+'" fill="#c1d0db">0</text>';
  }
  function update(announce=false) {
    let title,explanation,steps;
    if(state.mode==='planes') {
      const result=M.solve(state.values);geometryResult=result;steps=result.steps;
      title=result.kind==='one'?tr('One shared point',"En gemensam punkt"):result.kind==='none'?tr('No common solution',"Ingen gemensam lösning"):['',tr('A shared line',"En gemensam linje"),tr('A shared plane',"Ett gemensamt plan"),tr('Every point works',"Varje punkt fungerar")][result.basis.length];
      explanation=result.kind==='one'?tr('The highlighted point ',"Den markerade punkten ")+M.vector(result.point)+tr(' satisfies every equation.'," uppfyller varje ekvation."):result.kind==='none'?tr('There is no point that belongs to all three sheets.',"Det finns ingen punkt som tillhör alla tre plana skivorna."):tr('There are infinitely many solutions. ',"Det finns oändligt många lösningar. ")+(result.basis.length===3?tr('Every row says 0 = 0.',"Varje rad säger 0 = 0."):tr('Every point on the highlighted intersection satisfies all three equations.',"Varje punkt i den markerade skärningen uppfyller alla tre ekvationerna."));
      const outside=state.values.some(r=>Math.hypot(...r.slice(0,3))>1e-9&&!clipPlane(r).length);
      if(outside)explanation+=tr(' A plane is outside the displayed −3 to 3 box. Slide it closer to see it.'," Ett plan ligger utanför den visade rutan från −3 till 3. Förskjut det närmare för att se det.");
      if(result.kind==='one'&&result.point.some(n=>Math.abs(n)>3))explanation+=tr(' The intersection lies outside that box; use Fit to find the point.'," Skärningspunkten ligger utanför den rutan. Använd Anpassa för att hitta punkten.");
      $('scene-result').innerHTML='<p>'+esc(hint())+'</p><p>'+esc(explanation)+'</p><div class="plane-equations">'+state.values.map((r,i)=>'<span><b style="color:'+colors[i]+'">'+(i+1)+'</b> '+esc(equation(r))+'</span>').join('')+'</div>';
    } else {
      state.values=transformAt(state.target,state.progress/100,state.angle);
      const out=M.apply(state.values,state.point);
      title=state.progress===0?tr('Start: no change yet',"Start: ingen förändring ännu"):tr('Transformation · ',"Avbildning · ")+Math.round(state.progress)+'%';
      explanation=tr('Input ',"Inpunkt ")+M.vector(state.point)+tr(' → output '," → utpunkt ")+M.vector(out)+'.';
      steps=[tr('Read the current matrix one row at a time. Multiply each row by the input coordinates.\n',"Läs den aktuella matrisen en rad i taget. Multiplicera varje rad med inpunktens koordinater.\n")+M.matrixBlock(state.values),
        ...state.values.map((row,i)=>[tr('New x',"Nytt x"),tr('New y',"Nytt y"),tr('New z',"Nytt z")][i]+' = '+row.map((n,j)=>'('+M.format(n)+' × '+M.format(state.point[j])+')').join(' + ')+' = '+M.format(out[i])+'.'),
        tr('Apply that same rule to every point of the cube. The origin stays fixed: multiplying a zero coordinate column always gives zero.',"Använd samma regel på varje punkt i kuben. Origo ligger kvar: en kolumn med bara nollor ger alltid noll vid matrismultiplikation.")];
      $('scene-result').innerHTML='<p>'+esc(hint())+'</p><p class="tracked-point">'+esc(explanation)+'</p>';
    }
    $('scene-summary').textContent=title;
    $('scene-work').innerHTML=L.steps(steps);
    if(announce)$('scene-announcement').textContent=title+'. '+explanation;
    draw();
  }
  function stopMotion() {if(motion)cancelAnimationFrame(motion);motion=0;const button=$('scene-play');if(button)button.textContent=tr('▶ Play once',"▶ Spela en gång");}
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
    if(id==='scene-angle'){
      state.angle=Number(el.value);state.target=transformAt(state.target,1,state.angle);custom();
      state.target.forEach((row,i)=>workspace.querySelectorAll('[data-row="'+i+'"]').forEach(input=>{input.value=M.tidy(row[Number(input.dataset.col)]);}));
    }
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
    const start=performance.now();e.target.textContent=tr('Pause',"Pausa");
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
    $('scene-fullscreen').textContent=tr('⛶ Full screen',"⛶ Helskärm");$('scene-fullscreen').setAttribute('aria-expanded','false');resize();$('scene-fullscreen').focus();
  }
  $('scene-fullscreen').setAttribute('aria-expanded','false');
  $('scene-fullscreen').addEventListener('click',()=>{
    if(dialog.open){dialog.close();return;}
    previousOverflow=document.body.style.overflow;dialog.append(workspace);dialog.showModal();document.body.style.overflow='hidden';
    $('scene-fullscreen').textContent=tr('✕ Exit',"✕ Avsluta");$('scene-fullscreen').setAttribute('aria-expanded','true');resize();$('scene-fullscreen').focus();
  });
  dialog.addEventListener('close',closeFullscreen);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopMotion();drag.clear();}});
  function refreshLanguage() {
    // Rebuild only the translated controls. The model, camera and animation
    // remain live, including an exact-number edit that has not been committed.
    const controlsRoot=$('scene-controls');
    const identify=el=>el.id?'#'+el.id:el.dataset.row!==undefined?
      '[data-row="'+el.dataset.row+'"][data-col="'+el.dataset.col+'"]':
      el.dataset.planeVisible!==undefined?'[data-plane-visible="'+el.dataset.planeVisible+'"]':
      el.dataset.preset!==undefined?'[data-preset="'+el.dataset.preset+'"]':null;
    const inputs=Array.from(controlsRoot.querySelectorAll('input,select'),el=>({
      selector:identify(el),value:el.value,checked:el.checked
    }));
    const opened=Array.from(controlsRoot.querySelectorAll('details'),el=>el.open);
    const active=document.activeElement;
    const focused=workspace.contains(active)?identify(active):null;
    const selection=focused&&typeof active.selectionStart==='number'?
      [active.selectionStart,active.selectionEnd,active.selectionDirection]:null;
    examples();controls();update(true);
    for(const input of inputs){
      const el=input.selector&&controlsRoot.querySelector(input.selector);
      if(el){el.value=input.value;if(input.checked!==undefined)el.checked=input.checked;}
    }
    controlsRoot.querySelectorAll('details').forEach((el,i)=>{el.open=opened[i]??false;});
    const play=$('scene-play');if(play)play.textContent=motion?tr('Pause','Pausa'):tr('▶ Play once','▶ Spela en gång');
    $('scene-fullscreen').textContent=dialog.open?tr('✕ Exit','✕ Avsluta'):tr('⛶ Full screen','⛶ Helskärm');
    scene.setAttribute('aria-label',tr('Interactive 3D model. Drag to rotate; pinch to zoom. Arrow keys rotate; plus and minus zoom.','Interaktiv 3D-modell. Dra för att rotera; nyp för att zooma. Piltangenterna roterar; plus och minus zoomar.'));
    if(focused){
      const el=workspace.querySelector(focused);
      if(el){el.focus({preventScroll:true});if(selection)try{el.setSelectionRange(...selection);}catch{}}
    }
  }
  api.refreshLanguage=refreshLanguage;
  document.addEventListener('mathlanguagechange',refreshLanguage);
  new ResizeObserver(resize).observe(scene);
  root.addEventListener('resize',resize);
  preset(0);resize();
})(globalThis);
