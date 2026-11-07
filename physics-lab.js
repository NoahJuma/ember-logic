(function(root,factory){
  const api=factory(typeof module==='object'&&module.exports?require('./physics-core.js'):root.Physics);
  if(typeof module==='object'&&module.exports)module.exports=api;else root.PhysicsLab=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(P){
  'use strict';
  const tr=(en,sv)=>globalThis.PhysicsI18n?.t(en,sv)||en;
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
  const presetSwedish={
    walk:['Gå 3 + 4','Gå 3 m österut och sedan 4 m norrut. Flytta den blå pilens startpunkt till den första pilens spets. Den gröna genvägen förbinder startpunkten med slutpunkten.'],
    components:['Pilens skuggor','De streckade stegen visar hur en diagonal pil kan beskrivas med separata förflyttningar i x- och y-led.'],
    subtract:['Hitta skillnaden','Att subtrahera B betyder att addera −B. Den omvända blå pilen börjar vid spetsen på A.'],
    space:['Ett rum i 3D','Förflytta dig 3 m i x-led, 4 m i y-led och 2 m uppåt. Rotera rummet för att tydligt se de tre riktningarna.'],
    dot:['Längs med eller tvärs över?','Den lila pilen är A:s projektion på B. Ändra B:s riktning för att se när skalärprodukten är positiv, noll eller negativ.'],
    cross:['Ut ur planet','A och B spänner upp en platt parallellogram. A×B är vinkelrät mot den. Byt plats på A och B för att vända riktningen.'],
    methane:['Bindningsvinkel i metan','Två bindningsriktningar i metan. Rotera modellen och jämför deras verkliga vinkel i 3D med hur de ser ut på den platta skärmen.']
  };
  function localizeUnits(value=''){
    return String(value).replace(/\b(?:units|enheter)\b/g,tr('units','enheter')).replace(/\b(?:steps|steg)\b/g,tr('steps','steg')).replace(/\b(?:ly|ljusår)\b/g,tr('ly','ljusår'));
  }
  function localizePreset(value){
    const p=typeof value==='string'?presets[value]:value;
    const id=typeof value==='string'?value:Object.keys(presets).find(key=>presets[key].note===p.note||presetSwedish[key][1]===p.note);
    const sw=id?presetSwedish[id]:null;
    return {...p,label:sw?tr(presets[id].label,sw[0]):p.label,note:sw?tr(presets[id].note,sw[1]):tr(p.noteEn||p.note||'',p.noteSv||p.note||''),units:localizeUnits(p.units)};
  }
  const messages={
    experiment:['Experiment','Experiment'],experimentAria:['Vector experiment','Vektorexperiment'],
    add:['Add arrows','Addera pilar'],subtract:['Subtract arrows','Subtrahera pilar'],components:['Components in 2D / 3D','Komponenter i 2D / 3D'],unit:['Make a unit vector','Skapa en enhetsvektor'],dot:['Dot product & projection','Skalärprodukt och projektion'],cross:['Cross product in 3D','Kryssprodukt i 3D'],route:['Textbook route','Förflyttning från läroboken'],
    fullscreen:['⛶ Full screen','⛶ Helskärm'],close:['× Close','× Stäng'],examples:['Experiment examples','Exempel på experiment'],
    scene:['Vector lab. In 2D drag round tips; in 3D drag to rotate. Arrow keys rotate or pan; plus and minus zoom.','Vektorlabb. I 2D: dra i de runda spetsarna. I 3D: dra för att rotera. Piltangenterna roterar eller flyttar vyn. Plus och minus zoomar.'],
    first:['A / first leg','A / första delsträckan'],next:['B / next leg','B / nästa delsträcka'],result:['Result','Resultat'],
    view:['View controls','Vykontroller'],zoomIn:['Zoom in','Zooma in'],zoomOut:['Zoom out','Zooma ut'],left:['Rotate or pan left','Rotera eller flytta vyn åt vänster'],right:['Rotate or pan right','Rotera eller flytta vyn åt höger'],up:['Tilt or pan up','Luta eller flytta vyn uppåt'],down:['Tilt or pan down','Luta eller flytta vyn nedåt'],
    dimension2:['Switch to 2D','Byt till 2D'],dimension3:['Switch to 3D','Byt till 3D'],fit:['Fit & reset view','Anpassa och återställ vyn'],
    controls:['Controls & explanation','Kontroller och förklaring'],fold:['Tap to fold','Tryck för att fälla ihop'],swap:['Swap A & B','Byt plats på A och B'],reset:['Reset experiment','Återställ experimentet'],
    movement:['Move the second arrow head to tail','Flytta den andra pilens startpunkt till den första pilens spets'],play:['▶ Show the movement','▶ Visa förflyttningen'],pause:['Pause','Pausa'],calculation:['Show each calculation','Visa varje beräkning'],
    routeRequired:['Open a route problem in Worked answers, then choose “Explore this solution” to load its route.','Öppna en uppgift om förflyttning bland de genomgångna lösningarna. Välj sedan ”Utforska den här lösningen” för att visa dess delsträckor.'],
    routeControls:['The route uses the textbook’s fixed legs. Rotate or zoom the view, then use the answer card to enter your own result.','Förflyttningen använder lärobokens fasta delsträckor. Rotera eller zooma vyn och skriv sedan ditt eget resultat i svarsfältet vid uppgiften.'],
    defaultIntro:['This model uses the values from the selected worked answer. Change the inputs to explore a related example, or reset to restore the exercise.','Modellen använder värdena från den valda lösningen. Ändra värdena för att utforska ett liknande exempel, eller återställ för att återgå till uppgiften.'],
    gesture3:['1 finger: rotate · 2 fingers: zoom & move · components: edit the arrows','1 finger: rotera · 2 fingrar: zooma och flytta · komponenter: ändra pilarna'],gesture2:['Drag a round tip · drag background to move · pinch to zoom','Dra i en rund spets · dra i bakgrunden för att flytta vyn · nyp med två fingrar för att zooma'],
    crossNote:['Green arrow shows direction at a display scale. Read the true magnitude below.','Den gröna pilens längd är anpassad för visningen och visar riktningen. Läs det verkliga beloppet nedanför.'],
    projectionNote:['2D shows the xy projection only. Switch to 3D to see the height.','I 2D visas bara projektionen på xy-planet. Byt till 3D för att se höjden.'],
    dotNote:['Arrow lengths use the supplied numerical scales. For different physical units, compare directions; the dot product uses both input units.','Pilarnas längder följer de angivna talvärdena. Om vektorerna har olika fysikaliska enheter kan du jämföra deras riktningar. Skalärproduktens enhet är produkten av de båda enheterna.'],
    invalidComponent:['Enter a finite number between −1000000000 and 1000000000.','Ange ett ändligt tal mellan −1000000000 och 1000000000.']
  };
  const message=key=>tr(...messages[key]);
  const textLabel=(key,tag='span')=>`<${tag} data-lab-text="${key}">${E(message(key))}</${tag}>`;
  const ariaLabel=key=>`data-lab-aria="${key}" aria-label="${E(message(key))}"`;
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
    let html='<title>'+E(tr('Vector model. Use component controls for exact values.','Vektormodell. Använd komponentkontrollerna för att ange exakta värden.'))+'</title>';
    for(let v=-Math.floor(axisExtent/step)*step;v<=axisExtent+1e-8;v+=step){html+=line([v,-axisExtent,0],[v,axisExtent,0],'#365165',1)+line([-axisExtent,v,0],[axisExtent,v,0],'#365165',1);if(Math.abs(v)>step*.1)html+=label([v,0,0],f(v,3),'#9db2c3',2,16);}
    html+=arrow([-axisExtent,0,0],[axisExtent,0,0],colors.x,'')+label([axisExtent,0,0],'+x',colors.x,10,18)+arrow([0,-axisExtent,0],[0,axisExtent,0],colors.y,'')+label([0,axisExtent,0],'+y',colors.y,-22,-18);
    if(camera.three)html+=arrow([0,0,-axisExtent*.35],[0,0,axisExtent],colors.z,'')+label([0,0,axisExtent],'+z',colors.z,-22,-18);
    html+=label([0,0,0],'0','#c1d1de',-15,17);
    if(opts.candidate){
      html+=arrow([0,0,0],opts.candidate,colors.candidate,tr('Your vector','Din vektor'),'candidate');
      if(opts.reveal&&opts.target)html+=arrow([0,0,0],opts.target,colors.target,tr('Solution','Lösning'));
      return html;
    }
    const A=c.a,B=c.b,R=result(c),zero=[0,0,0];
    if(c.mode==='route'){
      let start=zero; c.legs.forEach((v,i)=>{const end=add(start,v);html+=arrow(start,end,i%2?colors.b:colors.a,String(i+1));start=end;});
      if(c.destination){html+=arrow(start,c.destination,colors.result,tr('Remaining','Återstående'));html+=label(c.destination,tr('Destination','Mål'),colors.result,-30,22);}
      else html+=arrow(zero,start,colors.result,message('result'));
    }else if(c.mode==='components'||c.mode==='unit'){
      const p1=[A[0],0,0],p2=[A[0],A[1],0];
      html+=line(zero,p1,colors.x,3,'6 4')+line(p1,p2,colors.y,3,'6 4')+line(p2,A,colors.z,3,'6 4');
      html+=arrow(zero,A,colors.a,'A','a');if(c.mode==='unit'&&R)html+=arrow(zero,R,colors.result,tr('Unit direction','Enhetsvektor'));
    }else{
      if(c.mode==='cross'){
        const pts=[zero,A,add(A,B),B].map(v=>{const p=pr(v);return `${p.x},${p.y}`;}).join(' ');
        html+=`<polygon points="${pts}" fill="#8dcbb5" fill-opacity=".14" stroke="#7ab69e" stroke-opacity=".6"/>`;
      }
      html+=arrow(zero,A,colors.a,'A','a')+arrow(zero,B,colors.b,'B','b');
      if(c.mode==='add'||c.mode==='subtract'){
        const moved=c.mode==='subtract'?scale(B,-1):B,start=scale(A,c.progress===undefined?1:c.progress);
        html+=line(A,R,'#8aaabd',1,'4 4')+arrow(start,add(start,moved),'#84c5ff','')+label(add(start,scale(moved,.5)),c.mode==='subtract'?tr('−B moved','−B förflyttad'):tr('B moved','B förflyttad'),colors.b,12,0)+arrow(zero,R,colors.result,message('result'));
      }else if(c.mode==='dot'){
        const proj=projection(A,B);if(proj)html+=line(A,proj,'#d5a8f1',2,'5 4')+arrow(zero,proj,'#d5a8f1',tr('Projection','Projektion'));
      }else if(c.mode==='cross'&&norm(R)>1e-10){
        html+=arrow(zero,scale(unit(R),Math.max(norm(A),norm(B))*.85),colors.result,tr('A×B (direction)','A×B (riktning)'));
      }
    }
    return html;
  }
  function describe(c){
    const r=result(c),u=localizeUnits(c.units||''),a=c.a,b=c.b;
    const length=v=>f(norm(v));
    if(c.mode==='dot')return {answer:`A·B = ${f(r)} ${u}\n${tr('Angle between A and B','Vinkeln mellan A och B')}: ${angle(a,b)===null?tr('undefined (zero vector)','odefinierad (nollvektor)'):f(angle(a,b))+'°'}`,steps:[
      `${tr('Multiply matching entries','Multiplicera motsvarande komponenter')}: (${f(a[0])})×(${f(b[0])}) + (${f(a[1])})×(${f(b[1])}) + (${f(a[2])})×(${f(b[2])}) = ${f(r)}.`,
      `${tr('Lengths','Längder')}: |A|=${length(a)}, |B|=${length(b)}.`,
      angle(a,b)===null?tr('The zero vector has no direction, so its angle is undefined.','Nollvektorn har ingen riktning. Därför är dess vinkel odefinierad.'):`cos θ = ${f(r)}/(${length(a)}×${length(b)}). ${tr('Inverse cosine gives','Invers cosinus, arccos, ger')} ${f(angle(a,b))}°.`,
      norm(b)<1e-10?tr('Projection onto a zero vector is undefined.','Projektion på en nollvektor är odefinierad.'):`${tr('A’s projection onto B','A:s projektion på B')} = [(A·B)/(B·B)]B = ${t(projection(a,b))}.`,
      tr('The dot product is a number. The purple projection is an arrow. They are related, but they are different objects.','Skalärprodukten är ett tal. Den lila projektionen är en pil, alltså en vektor. De hör ihop, men de är olika slags storheter.')
    ]};
    if(c.mode==='cross')return {answer:`A×B = ${t(r)} ${u}\n${tr('Magnitude','Belopp')} = ${length(r)} ${u}${norm(r)<1e-10?tr(' · no unique direction',' · ingen entydig riktning'):''}`,steps:[
      `x = AyBz−AzBy = ${f(a[1])}×${f(b[2])}−${f(a[2])}×${f(b[1])} = ${f(r[0])}.`,
      `y = AzBx−AxBz = ${f(a[2])}×${f(b[0])}−${f(a[0])}×${f(b[2])} = ${f(r[1])}.`,
      `z = AxBy−AyBx = ${f(a[0])}×${f(b[1])}−${f(a[1])}×${f(b[0])} = ${f(r[2])}.`,
      `${tr('Perpendicular check','Kontroll av vinkelräthet')}: A·(A×B)=${f(dot(a,r))}; B·(A×B)=${f(dot(b,r))}.`,
      tr('The green arrow is scaled to make its direction visible. Its numerical magnitude is shown above; it uses product units, not the input-vector units.','Den gröna pilens längd är anpassad så att riktningen syns tydligt. Det verkliga beloppet visas ovanför. Dess enhet är produkten av de två ingående vektorernas enheter.')
    ]};
    if(c.mode==='unit'&&!r)return{answer:tr('The zero vector has no unit direction.','Nollvektorn har ingen enhetsvektor i sin riktning.'),steps:[tr('Its length is zero. Dividing by that length is undefined. Make at least one component nonzero.','Dess längd är noll. Division med noll är odefinierad. Ändra minst en komponent så att den inte är noll.')]};
    const steps=[];
    if(c.mode==='route')steps.push(...c.legs.map((v,i)=>`${tr('Leg','Delsträcka')} ${i+1}: ${t(v)} ${u}.`),`${tr('Sum of legs','Summan av delsträckorna')} = ${t(sum(c.legs))} ${u}.`,...(c.destination?[`${tr('Remaining = destination','Återstående = målposition')} ${t(c.destination)} − ${tr('current','nuvarande position')} ${t(sum(c.legs))} = ${t(r)} ${u}.`]:[]));
    else if(c.mode==='unit')steps.push(tr(`Divide each entry of A by its length ${length(a)}: ${t(r)}.`,`Dividera varje komponent i A med vektorns längd ${length(a)}: ${t(r)}.`));
    else if(c.mode==='components')steps.push(`x=${f(r[0])}, y=${f(r[1])}, z=${f(r[2])}. ${tr('Each component is a signed amount along its axis.','Varje komponent anger ett värde längs sin axel. Tecknet visar riktningen längs axeln.')}`);
    else steps.push(...['x','y','z'].map((axis,i)=>`${axis}: ${f(a[i])} ${c.mode==='subtract'?'−':'+'} (${f(b[i])}) = ${f(r[i])}.`));
    steps.push(`${tr('Length','Längd')} = √[(${f(r[0])})²+(${f(r[1])})²+(${f(r[2])})²] = ${length(r)} ${c.mode==='unit'?'':u}.`);
    if(norm(r)>1e-10)steps.push(Math.abs(r[2])<1e-10?tr(`Angle = atan2(y,x) ≈ ${f(P.direction(r))}°, measured counterclockwise from +x. Signs matter when choosing the quadrant.`,`Vinkel = atan2(y,x) ≈ ${f(P.direction(r))}°, mätt moturs från +x. Komponenternas tecken avgör vilken kvadrant, alltså vilken fjärdedel av planet, vektorn ligger i.`):`${tr('3D direction, expressed as a unit vector','Riktning i 3D, uttryckt som en enhetsvektor')}: ${t(unit(r))}.`);
    else steps.push(tr('Zero length means there is no unique direction.','Längden noll innebär att det inte finns någon entydig riktning.'));
    return {answer:`${c.mode==='unit'?tr('Unit direction','Enhetsvektor'):message('result')} = ${t(r)} ${c.mode==='unit'?'':u}\n${tr('Length','Längd')} = ${length(r)} ${c.mode==='unit'?'':u}`,steps};
  }
  class Lab{
    constructor(host){
      this.host=host;this.camera=defaultCamera(false);this.config={...presets.walk,a:[...presets.walk.a],b:[...presets.walk.b],progress:1};this.extent=extentFor(this.config);this.pointers=new Map();this.animation=null;this.build();this.bind();this.loadPreset('walk');
    }
    build(){
      this.host.innerHTML=`<div class="lab-toolbar"><label>${textLabel('experiment')}<select data-control="mode" ${ariaLabel('experimentAria')}>${['add','subtract','components','unit','dot','cross','route'].map(mode=>`<option value="${mode}" data-lab-text="${mode}">${E(message(mode))}</option>`).join('')}</select></label><button type="button" data-action="fullscreen" class="primary">${E(message('fullscreen'))}</button></div>
        <div class="lab-presets" ${ariaLabel('examples')}>${Object.keys(presets).map(id=>`<button type="button" data-preset="${id}" aria-pressed="false">${E(localizePreset(id).label)}</button>`).join('')}</div>
        <div class="physics-stage"><svg class="physics-scene" tabindex="0" role="img" ${ariaLabel('scene')}></svg>
        <div class="physics-legend"><span><i style="background:${colors.a}"></i>${textLabel('first')}</span><span><i style="background:${colors.b}"></i>${textLabel('next')}</span><span><i style="background:${colors.result}"></i>${textLabel('result')}</span></div>
        <div class="physics-view-controls" ${ariaLabel('view')}><button data-action="zoom-in" ${ariaLabel('zoomIn')}>+</button><button data-action="zoom-out" ${ariaLabel('zoomOut')}>−</button><button data-action="left" ${ariaLabel('left')}>↶</button><button data-action="right" ${ariaLabel('right')}>↷</button><button data-action="up" ${ariaLabel('up')}>↑</button><button data-action="down" ${ariaLabel('down')}>↓</button><button class="wide" data-action="dimension">${E(message('dimension3'))}</button><button class="wide" data-action="fit" data-lab-text="fit">${E(message('fit'))}</button></div>
        <p class="physics-gesture"></p></div>
        <details class="physics-dock" open><summary>${textLabel('controls')} ${textLabel('fold')}</summary><div class="physics-dock-body"><p class="lab-intro"></p><p class="lab-mode-note"></p><div class="physics-components"></div><div class="lab-buttons"><button type="button" class="secondary" data-action="swap" data-lab-text="swap">${E(message('swap'))}</button><button type="button" class="secondary" data-action="reset" data-lab-text="reset">${E(message('reset'))}</button></div><div class="lab-progress-wrap"><label class="progress-label">${textLabel('movement')}<input class="lab-progress" type="range" min="0" max="1" step=".01" value="1" data-control="progress"></label><button type="button" class="secondary" data-action="play">${E(message('play'))}</button></div><div class="lab-result" role="status" aria-live="polite"></div><details class="lab-work"><summary data-lab-text="calculation">${E(message('calculation'))}</summary><ol class="steps"></ol></details></div></details>`;
      this.svg=this.host.querySelector('svg');
      this.host.lang=globalThis.PhysicsI18n?.language||'en';
    }
    loadPreset(id){this.preset=id;this.load(presets[id]);this.host.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preset===id)));}
    load(config){
      this.stop();this.introMessage=null;this.config={...config,a:P.vec(config.a),b:P.vec(config.b),progress:1};
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
      if(c.mode==='route')target.innerHTML='<p class="caption" data-lab-text="routeControls">'+E(message('routeControls'))+'</p>';
      else target.innerHTML=['a',...(['components','unit'].includes(c.mode)?[]:['b'])].map(key=>`<fieldset><legend data-component-legend="${key}">${key.toUpperCase()} — ${E(tr('signed components','komponenter med tecken'))}</legend>${['x','y','z'].map((axis,i)=>`<div class="physics-component-row"><label for="lab-${key}-${axis}">${axis}</label><input aria-label="${key.toUpperCase()} ${axis} ${E(tr('slider','skjutreglage'))}" type="range" min="${-range}" max="${range}" step="${range>100?1:.1}" value="${c[key][i]}" data-vector="${key}" data-index="${i}"><input id="lab-${key}-${axis}" aria-label="${key.toUpperCase()} ${axis} ${E(tr('exact value','exakt värde'))}" type="number" min="-1000000000" max="1000000000" step="any" value="${Number(c[key][i].toPrecision(8))}" data-vector="${key}" data-index="${i}"></div>`).join('')}</fieldset>`).join('');
      this.host.querySelector('[data-action="swap"]').hidden=['components','unit','route'].includes(c.mode);
      this.host.querySelector('.lab-progress-wrap').hidden=!['add','subtract'].includes(c.mode);
      this.updateIntro();
    }
    updateIntro(){
      const note=localizePreset(this.config).note;
      this.host.querySelector('.lab-intro').textContent=this.introMessage?message(this.introMessage):note||message('defaultIntro');
    }
    setLanguage(){
      // Update existing nodes so partial input, focus, gestures and open panels survive.
      this.host.lang=globalThis.PhysicsI18n?.language||'en';
      this.host.querySelectorAll('[data-lab-text]').forEach(el=>{el.textContent=message(el.dataset.labText);});
      this.host.querySelectorAll('[data-lab-aria]').forEach(el=>{el.setAttribute('aria-label',message(el.dataset.labAria));});
      this.host.querySelectorAll('[data-preset]').forEach(el=>{el.textContent=localizePreset(el.dataset.preset).label;});
      this.host.querySelectorAll('[data-component-legend]').forEach(el=>{el.textContent=el.dataset.componentLegend.toUpperCase()+' — '+tr('signed components','komponenter med tecken');});
      this.host.querySelectorAll('[data-vector]').forEach(el=>{
        const axis=['x','y','z'][Number(el.dataset.index)];
        el.setAttribute('aria-label',el.dataset.vector.toUpperCase()+' '+axis+' '+(el.type==='range'?tr('slider','skjutreglage'):tr('exact value','exakt värde')));
        if(el.validity.customError)el.setCustomValidity(message('invalidComponent'));
      });
      this.host.querySelector('[data-action="fullscreen"]').textContent=message(this.host.closest('#physics-fullscreen[open]')?'close':'fullscreen');
      this.host.querySelector('[data-action="play"]').textContent=message(this.animation!==null?'pause':'play');
      this.updateIntro();this.update();
    }
    dimensions(){const r=this.svg.getBoundingClientRect();return{width:r.width||700,height:r.height||480};}
    draw(){
      const {width,height}=this.dimensions();this.svg.setAttribute('viewBox',`0 0 ${width} ${height}`);this.svg.innerHTML=sceneMarkup(this.config,this.camera,width,height,this.extent);
      this.host.querySelector('[data-action="dimension"]').textContent=message(this.camera.three?'dimension2':'dimension3');
      this.host.querySelector('.physics-gesture').textContent=message(this.camera.three?'gesture3':'gesture2');
    }
    update(){
      this.draw();const info=describe(this.config);this.host.querySelector('.lab-result').textContent=info.answer;
      this.host.querySelector('.lab-work .steps').innerHTML=info.steps.map(s=>`<li>${E(s)}</li>`).join('');
      this.host.querySelector('.lab-mode-note').textContent=this.config.mode==='cross'?message('crossNote'):!this.camera.three&&(Math.abs(this.config.a[2])+Math.abs(this.config.b[2])>1e-10)?message('projectionNote'):this.config.mode==='dot'?message('dotNote'):'';
    }
    syncInputs(){this.host.querySelectorAll('[data-vector]').forEach(el=>{const n=this.config[el.dataset.vector][Number(el.dataset.index)];if(el.type==='range'){const max=Math.max(this.sliderRange,Math.abs(n));el.min=-max;el.max=max;}el.value=String(Number(n.toPrecision(8)));el.setCustomValidity('');});}
    stop(){if(this.animation!==null){cancelAnimationFrame(this.animation);this.animation=null;}const b=this.host.querySelector('[data-action="play"]');if(b)b.textContent=message('play');}
    play(){
      if(this.animation!==null){this.stop();return;}
      if(typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches){this.config.progress=this.config.progress>=1?0:1;this.host.querySelector('[data-control="progress"]').value=this.config.progress;this.draw();return;}
      this.config.progress=0;this.host.querySelector('[data-action="play"]').textContent=message('pause');let start=null;
      const tick=time=>{if(start===null)start=time;this.config.progress=Math.min(1,(time-start)/1800);this.host.querySelector('[data-control="progress"]').value=this.config.progress;this.draw();if(this.config.progress<1)this.animation=requestAnimationFrame(tick);else{this.animation=null;this.host.querySelector('[data-action="play"]').textContent=message('play');}};
      this.animation=requestAnimationFrame(tick);
    }
    fullscreen(){
      const dialog=document.getElementById('physics-fullscreen'),button=this.host.querySelector('[data-action="fullscreen"]');
      if(dialog.open){dialog.close();return;}
      dialog.append(this.host);button.textContent=message('close');this.previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
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
        if(el.dataset.vector){const n=Number(el.value);if(el.value.trim()===''||!Number.isFinite(n)||Math.abs(n)>1e9){el.setCustomValidity(message('invalidComponent'));return;}el.setCustomValidity('');this.config[el.dataset.vector][+el.dataset.index]=n;if(+el.dataset.index===2&&n!==0)this.camera.three=true;this.host.querySelectorAll(`[data-vector="${el.dataset.vector}"][data-index="${el.dataset.index}"]`).forEach(other=>{if(other!==el){other.value=el.value;other.setCustomValidity('');if(other.type==='range'&&Math.abs(n)>Number(other.max)){other.max=Math.abs(n);other.min=-Math.abs(n);other.value=n;}}});this.update();}
        if(el.dataset.control==='progress'){this.stop();this.config.progress=Number(el.value);this.draw();}
      });
      this.host.addEventListener('change',e=>{if(e.target.dataset.control==='mode'){
        const mode=e.target.value;if(mode==='route'&&!this.config.legs){e.target.value=this.config.mode;this.introMessage='routeRequired';this.updateIntro();return;}
        this.stop();this.introMessage=null;this.config.mode=mode;this.config.note='';this.config.noteEn='';this.config.noteSv='';if(mode==='cross')this.camera.three=true;this.extent=extentFor(this.config);this.buildControls();this.update();
      }});
      const dialog=document.getElementById('physics-fullscreen');dialog.addEventListener('close',()=>{document.getElementById('physics-lab-home').append(this.host);document.body.style.overflow=this.previousOverflow||'';this.host.querySelector('[data-action="fullscreen"]').textContent=message('fullscreen');this.draw();this.host.querySelector('[data-action="fullscreen"]').focus();});
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
  return {Lab,presets,localizePreset,localizeUnits,defaultCamera,result,extentFor,sceneMarkup,describe,colors,escape:E};
});
