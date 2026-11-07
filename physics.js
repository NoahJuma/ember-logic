(function(){
  'use strict';
  if(typeof document==='undefined')return;
  const P=window.Physics,B=window.PhysicsBook,Q=window.PhysicsQuestions,C=window.PhysicsContent,V=window.PhysicsLab,E=V.escape;
  const tr=(en,sv)=>window.PhysicsI18n?.t(en,sv)||en;
  const $=id=>document.getElementById(id),prefix='ember-physics:';
  const memory=new Map();
  function read(key,fallback=''){if(memory.has(key))return memory.get(key);try{const v=localStorage.getItem(prefix+key);if(v===null)return fallback;const value=JSON.parse(v);memory.set(key,value);return value;}catch{return fallback;}}
  function save(key,value){memory.set(key,value);try{localStorage.setItem(prefix+key,JSON.stringify(value));return true;}catch{return false;}}
  const lab=new V.Lab($('physics-lab'));
  let lessonIndex=P.clamp(Number(read('lesson',0))||0,0,C.lessons.length-1);
  function renderLesson(){
    const l=C.lessons[lessonIndex];
    $('lesson-nav').innerHTML=C.lessons.map((v,i)=>`<button type="button" data-lesson="${i}" aria-current="${i===lessonIndex}"><span>${String(i+1).padStart(2,'0')}</span>${E(v.title)}</button>`).join('');
    $('lesson').innerHTML=`<p class="kicker">${lessonIndex+1} / ${C.lessons.length} · ${tr('SECTION','AVSNITT')} ${E(l.section)} · ${E(l.tag)}</p><h3>${E(l.title)}</h3><p>${E(l.intro)}</p><ol>${l.steps.map(([title,text])=>`<li><b>${E(title)}</b>${E(text)}</li>`).join('')}</ol><p class="lesson-example">${E(l.example)}</p><div class="lesson-check"><p><strong>${tr('Pause and think:','Stanna upp och fundera:')}</strong> ${E(l.check)}</p><details><summary>${tr('Show the explanation','Visa förklaringen')}</summary><p>${E(l.answer)}</p></details></div><div class="lesson-actions"><button type="button" class="secondary" data-lesson-move="-1" ${lessonIndex===0?'disabled':''}>${tr('← Previous','← Föregående')}</button>${l.preset?`<button type="button" class="secondary" data-lesson-preset="${l.preset}">${tr('Try this experiment ↗','Prova experimentet ↗')}</button>`:''}<button type="button" class="primary" data-lesson-move="1" ${lessonIndex===C.lessons.length-1?'disabled':''}>${tr('Next idea →','Nästa idé →')}</button></div>`;
    save('lesson',lessonIndex);
  }
  $('lesson-nav').addEventListener('click',e=>{const b=e.target.closest('[data-lesson]');if(b){lessonIndex=+b.dataset.lesson;renderLesson();}});
  $('lesson').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.lessonMove){lessonIndex=P.clamp(lessonIndex+Number(b.dataset.lessonMove),0,C.lessons.length-1);renderLesson();$('lesson').scrollIntoView({block:'start'});}if(b.dataset.lessonPreset){lab.loadPreset(b.dataset.lessonPreset);$('lab').scrollIntoView({block:'start'});}});
  function renderGlossary(){$('glossary').innerHTML=C.glossary.map(([word,meaning])=>`<dt>${E(word)}</dt><dd>${E(meaning)}</dd>`).join('');}
  renderGlossary();renderLesson();

  const lengthUnits=Object.keys(P.units.length);
  ['unit-from','unit-to'].forEach(id=>$(id).innerHTML=lengthUnits.map(u=>`<option>${E(u)}</option>`).join(''));
  $('unit-from').value='cm';$('unit-to').value='m';
  function updateUnits(){
    const raw=$('unit-value').value,n=Number(raw),from=$('unit-from').value,to=$('unit-to').value,power=Number($('unit-power').value),suffix=power===2?'²':power===3?'³':'';
    if(raw.trim()===''||!Number.isFinite(n)||n<0||n>1e12){$('unit-result').textContent=tr('Enter an amount from 0 to 1 trillion.','Ange ett värde från 0 till 1 biljon.');$('unit-steps').innerHTML='';return;}
    const factor=P.units.length[from]/P.units.length[to],value=P.convert(n,from,to,power);
    $('unit-result').textContent=`${P.fmt(n,7)} ${from}${suffix} = ${P.fmt(value,7)} ${to}${suffix}`;
    $('unit-steps').innerHTML=[tr(`One ${from} equals ${P.fmt(factor,7)} ${to}.`,`En ${from} motsvarar ${P.fmt(factor,7)} ${to}.`),power===1?tr('Length uses that conversion factor once.','För en längd används omvandlingsfaktorn en gång.'):tr(`${power===2?'Area':'Volume'} contains ${power} length factors. The unit conversion is (${P.fmt(factor,7)})${suffix} = ${P.fmt(factor**power,7)}.`,`${power===2?'Area':'Volym'} innehåller ${power} längdfaktorer. Enhetsomvandlingen blir (${P.fmt(factor,7)})${suffix} = ${P.fmt(factor**power,7)}.`),tr(`Multiply: ${P.fmt(n,7)} × ${P.fmt(factor**power,7)} = ${P.fmt(value,7)} ${to}${suffix}. The physical ${power===1?'length':power===2?'area':'volume'} has not changed.`,`Multiplicera: ${P.fmt(n,7)} × ${P.fmt(factor**power,7)} = ${P.fmt(value,7)} ${to}${suffix}. Den fysiska ${power===1?'längden':power===2?'arean':'volymen'} har inte ändrats.`)].map(s=>`<li>${E(s)}</li>`).join('');
  }
  ['unit-value','unit-from','unit-to','unit-power'].forEach(id=>$(id).addEventListener('input',updateUnits));updateUnits();
  function updateCube(){
    const n=Number($('cube-size').value);$('cube-size-label').value=n;
    const p=(x,y,z)=>[180+(x-y)*20,200+(x+y)*8-z*24];
    const pts=coords=>coords.map(v=>p(...v).join(',')).join(' ');
    let html=`<title>${tr(`Cube with ${n} blocks along each edge, ${n*n} on a face, ${n**3} inside.`,`Kub med ${n} klossar längs varje kant, ${n*n} på en sidoyta och ${n**3} totalt.`)}</title>`;
    html+=`<polygon points="${pts([[0,0,0],[n,0,0],[n,0,n],[0,0,n]])}" fill="#8eccc2" stroke="#306e67"/><polygon points="${pts([[0,0,0],[0,n,0],[0,n,n],[0,0,n]])}" fill="#b7dcd6" stroke="#306e67"/><polygon points="${pts([[0,0,n],[n,0,n],[n,n,n],[0,n,n]])}" fill="#e3f1e9" stroke="#306e67"/>`;
    // Three visible faces with n by n grid cells.
    for(let i=0;i<=n;i++)for(const [a,b]of [[[i,0,0],[i,0,n]],[[0,0,i],[n,0,i]],[[0,i,0],[0,i,n]],[[0,0,i],[0,n,i]],[[i,0,n],[i,n,n]],[[0,i,n],[n,i,n]]]){const u=p(...a),v=p(...b);html+=`<line x1="${u[0]}" y1="${u[1]}" x2="${v[0]}" y2="${v[1]}" stroke="#306e67" stroke-width=".8"/>`;}
    html+=`<text x="15" y="22">${tr('Edge:','Kant:')} ${n}</text><text x="15" y="45">${tr('One face:','En sidoyta:')} ${n} × ${n} = ${n*n}</text><text x="15" y="68">${tr('Inside:','Inuti:')} ${n} × ${n} × ${n} = ${n**3}</text>`;
    $('cube-picture').innerHTML=html;$('cube-result').textContent=tr(`${n} blocks along an edge, ${n*n} square units on a face, ${n**3} cubic units inside. Doubling an edge makes a face 4 times as large and the volume 8 times as large.`,`${n} klossar längs en kant, ${n*n} areaenheter på en sidoyta och ${n**3} volymenheter inuti. Om kantlängden fördubblas blir sidoytan 4 gånger så stor och volymen 8 gånger så stor.`);
  }
  $('cube-size').addEventListener('input',updateCube);updateCube();

  function renderTopics(){const select=$('physics-topic'),selected=select.value;select.innerHTML=`<option value="all">${tr('All topics','Alla områden')}</option>`;Object.entries(B.topics).forEach(([value,text])=>{const option=document.createElement('option');option.value=value;option.textContent=text;select.append(option);});select.value=selected||'all';}
  renderTopics();
  let page=0,filtered=[],controllers=[];
  const bookViews=new Map(),candidateViews=new Map();
  const pageSize=5;
  const safeId=id=>id.replace(/[^A-Za-z0-9]/g,'-');
  function matchesSet(item,set){return set==='all'||(set==='numbered'&&/^1\./.test(item.id))||(set==='discussion'&&item.id.startsWith('Q'))||(set==='guided'&&(item.id.startsWith('VP')||item.id==='Bridge'));}
  function lessonFor(topic){return{units:2,precision:3,vectors:6,products:8,reasoning:0}[topic]||0;}
  function questionMarkup(item){
    const q=Q.get(item.id),table=q.table;
    const tableHTML=table?`<div class="question-table-wrap" tabindex="0" role="region" aria-label="${E(table.caption)}"><table class="question-table"><caption>${E(table.caption)}</caption><thead><tr>${table.headers.map(h=>`<th scope="col">${E(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map((cell,i)=>i?`<td>${E(cell)}</td>`:`<th scope="row">${E(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
    const paragraphs=q.text.split('\n').map((p,i)=>`<p>${E(p)}</p>${table&&table.afterParagraph===i?tableHTML:''}`).join('');
    const figure=q.figure,src=figure?`assets/physics/questions/${figure.file}`:'';
    return `<section class="question-body" aria-label="${tr('Full textbook question','Hela uppgiften ur läroboken')}"><h4>${tr('Question','Uppgift')}</h4>${q.passage?`<div class="question-passage"><h5>${tr('Passage for questions 1.92–1.94','Text till uppgifterna 1.92–1.94')}</h5><p>${E(q.passage)}</p></div>`:''}<div class="question-text">${paragraphs}</div>${figure?`<figure class="question-figure"><a href="${E(src)}" target="_blank" rel="noopener" aria-label="${E(tr(`Open ${figure.caption} at full size`,`Öppna ${figure.caption} i full storlek`))}"><img src="${E(src)}" alt="${E(figure.alt)}" loading="lazy" decoding="async"></a><figcaption>${E(figure.caption)} · <a href="${E(src)}" target="_blank" rel="noopener">${tr('Open diagram ↗','Öppna diagrammet ↗')}</a></figcaption><details class="figure-description"><summary>${tr('Read the diagram description','Läs beskrivningen av diagrammet')}</summary><p>${E(figure.alt)}</p></details></figure>`:''}${q.reference?`<aside class="question-reference"><h5>${tr('Referenced information','Information som uppgiften hänvisar till')}</h5><p>${E(q.reference)}</p></aside>`:''}</section>`;
  }
  function card(item){
    const id=safeId(item.id),attempt=read('answer-'+item.id,''),parts=(item.interactive||[]).map((p,i)=>({...p,index:i})).filter(p=>Array.isArray(p.expected));
    return `<article class="exercise" id="physics-${id}" data-question="${E(item.id)}"><div class="question-meta"><span>${E(B.topics[item.topic])}</span><span>${tr('Book p.','Boken s.')} ${item.page}</span>${parts.length?`<span>${tr('Interactive vector answer','Interaktivt vektorsvar')}</span>`:''}</div><h3>${E(item.id)} · ${E(item.title)}</h3>${questionMarkup(item)}<p class="caption exercise-choice">${tr('Write your own answer, move an answer arrow, or open the worked solution immediately.','Skriv ditt eget svar, flytta en svarspil eller öppna den fullständiga lösningen direkt.')}</p>
      <details class="attempt-panel" ${attempt?'open':''}><summary>${tr('Write my answer','Skriv mitt svar')} <span>${tr('(optional)','(valfritt)')}</span></summary><label class="attempt-label" for="attempt-${id}">${tr('My reasoning and calculations','Mitt resonemang och mina beräkningar')}</label><textarea id="attempt-${id}" data-attempt="${E(item.id)}" placeholder="${tr('Write your idea, calculation, units and final answer here…','Skriv din idé, beräkning, dina enheter och ditt slutliga svar här…')}">${E(attempt)}</textarea><p class="save-status caption" role="status"></p>
      ${parts.map(p=>`<section class="vector-part" data-part="${p.index}"><h4>${E(p.label)} · ${tr('build my answer','bygg mitt svar')}</h4><p class="caption">${E(tr(`Enter x, y, z in ${p.units||'dimensionless units'}. For a flat vector, set z to 0. In 2D you can also drag the yellow tip.`,`Ange x, y, z i ${p.units||'dimensionslösa enheter'}. Sätt z till 0 för en vektor i planet. I 2D kan du också dra den gula pilspetsen.`))}</p><div class="answer-fields">${['x','y','z'].map((axis,j)=>`<label for="candidate-${id}-${p.index}-${axis}">${axis}<input id="candidate-${id}-${p.index}-${axis}" data-candidate="${j}" type="number" step="any" min="-1000000000" max="1000000000" inputmode="decimal"></label>`).join('')}</div><svg class="answer-svg" tabindex="0" role="img" aria-label="${tr('Your answer vector. Drag its yellow tip in 2D, or use the component inputs. In 3D drag to rotate. Arrow keys adjust the view.','Din svarsvektor. Dra den gula pilspetsen i 2D eller använd fälten för komponenterna. Dra i 3D för att rotera. Piltangenterna ändrar vyn.')}"></svg><div class="vector-check-actions"><button type="button" class="primary" data-check-vector>${tr('Check my vector','Kontrollera min vektor')}</button><button type="button" class="secondary" data-answer-view>${tr('Switch view','Byt vy')}</button><button type="button" class="secondary" data-answer-fit>${tr('Fit','Anpassa vyn')}</button><button type="button" class="secondary" data-reveal-answer>${tr('Compare with solution','Jämför med lösningen')}</button></div><p class="vector-feedback" role="status" aria-live="polite"></p><p class="caption vector-view-hint"></p></section>`).join('')}</details>
      <details class="solution-panel"><summary>${tr('Show worked solution','Visa lösningen steg för steg')}</summary><details class="solution-guide"><summary>${tr('Need the basics first?','Vill du börja med grunderna?')}</summary><p>${E({units:tr('Keep the quantity and unit together. A conversion factor changes the unit without changing the physical amount. Squares and cubes need squared and cubed factors.','Skriv alltid storhet och enhet tillsammans. En omvandlingsfaktor ändrar enheten utan att ändra den fysiska mängden. För kvadrater och kuber måste faktorn också kvadreras respektive kuberas.'),precision:tr('A measured number has limited precision. State assumptions for estimates, keep extra digits during calculations, and round the final answer.','Ett mätvärde har begränsad precision. Ange dina antaganden när du uppskattar, behåll extra siffror under beräkningen och avrunda det slutliga svaret.'),vectors:tr('Choose axes. A vector’s entries are amounts along x, y and z. Add matching entries; subtracting a negative adds a positive. Use Pythagoras for length.','Välj koordinataxlar. Vektorns komponenter anger hur mycket den sträcker sig längs x, y och z. Addera motsvarande komponenter; att subtrahera ett negativt tal är att addera ett positivt. Använd Pythagoras sats för längden.'),products:tr('A dot product multiplies matching entries and adds them, giving a number. A cross product gives a perpendicular arrow. The angle is the angle between the two input directions.','En skalärprodukt multiplicerar motsvarande komponenter och adderar produkterna till ett tal. En kryssprodukt ger en vinkelrät pil. Vinkeln är vinkeln mellan de två ursprungliga vektorernas riktningar.'),reasoning:tr('Start with the meaning of each quantity. A simple example or counterexample is often enough to test a claim.','Börja med vad varje storhet betyder. Ett enkelt exempel eller motexempel räcker ofta för att pröva ett påstående.')}[item.topic])}</p><button type="button" class="secondary" data-basics="${lessonFor(item.topic)}">${tr('Open the beginner lesson','Öppna nybörjarlektionen')}</button></details>
      <h4>${tr('Solve it step by step','Lös uppgiften steg för steg')}</h4><ol class="steps numbered-solution" role="list">${item.steps.map((s,i)=>`<li><strong class="solution-step-label">${tr('Step','Steg')} ${i+1}</strong><p>${E(s)}</p></li>`).join('')}</ol>
      ${(item.interactive||[]).length?`<div class="solution-experiments"><h4>${tr('Explore this solution','Utforska lösningen')}</h4><p class="caption">${tr('Load the original inputs into the large lab. Rotate, change components, and see the calculations update.','Läs in de ursprungliga värdena i det stora labbet. Rotera, ändra komponenter och se hur beräkningarna uppdateras.')}</p><div class="lesson-actions">${item.interactive.map((p,i)=>`<button type="button" class="secondary" data-explore="${i}">${E(p.label)} ↗</button>`).join('')}</div></div>`:''}
      <p class="compare-help">${tr('Compare one step at a time: the starting values, unit conversions, signs, formula and final units. A different correct method can still lead to the same answer. Displayed vector decimals include guard digits; round final measurements to the precision justified by the question.','Jämför ett steg i taget: startvärden, enhetsomvandlingar, tecken, formel och slutliga enheter. En annan korrekt metod kan ge samma svar. Vektorvärdena visas med extra decimaler för att minska avrundningsfel; avrunda slutliga mätvärden till den precision som uppgiften motiverar.')}</p>
      <div class="comparison"><div><h4>${tr('My answer','Mitt svar')}</h4><p class="attempt-copy">${E(attempt||tr('You can reveal the solution without writing an answer.','Du kan visa lösningen utan att skriva ett eget svar.'))}</p><p class="comparison-note"></p></div><section class="final-answer"><h4>${tr('The final answer is…','Det slutliga svaret är…')}</h4><div class="answer">${E(item.answer)}</div></section></div></details></article>`;
  }
  function makeCandidate(section,item,part,index){
    const key=`vector-${item.id}-${index}`,view=candidateViews.get(key),stored=view?.values||read(key,['','','0']),inputs=[...section.querySelectorAll('[data-candidate]')],svg=section.querySelector('svg'),feedback=section.querySelector('.vector-feedback');
    const validStored=Array.isArray(stored)&&stored.length===3?stored:['','','0'];inputs.forEach((el,i)=>el.value=validStored[i]);
    const baseExtent=Math.max(3,P.norm(part.expected)*1.3),config={mode:'components',a:[0,0,0],b:[0,0,0]};let extent=view?.extent||baseExtent;
    let camera=view?.camera?{...view.camera}:V.defaultCamera(Math.abs(part.expected[2])>1e-9),revealed=view?.revealed||false,drag=null,feedbackState=view?.feedback||null;
    const values=()=>inputs.map(el=>el.value.trim()===''?NaN:Number(el.value));
    const drawable=()=>values().map(v=>Number.isFinite(v)?v:0);
    function showFeedback(){
      if(!feedbackState){feedback.textContent='';return;}
      const {kind,axes=[]}=feedbackState;
      feedback.textContent=kind==='range'?tr('Use component values between −1 billion and 1 billion.','Använd komponentvärden mellan −1 miljard och 1 miljard.'):kind==='missing'?tr('Enter all three components. Use 0 when there is no amount along an axis.','Ange alla tre komponenterna. Använd 0 när vektorn saknar en komponent längs en axel.'):kind==='correct'?tr('Your vector matches a valid result within the rounding tolerance. Now compare the reasoning, not only the final numbers.','Din vektor stämmer med ett giltigt resultat inom avrundningstoleransen. Jämför nu resonemanget, inte bara de slutliga talen.'):kind==='revealed'?tr('Green shows the worked result; yellow keeps your own answer. Compare the steps below.','Grönt visar lösningens resultat; gult visar fortfarande ditt eget svar. Jämför stegen nedan.'):tr(`Recheck the ${axes.join(', ')} component${axes.length>1?'s':''}. Check the direction signs and units, or open the worked solution.`,`Kontrollera ${axes.length>1?'komponenterna':'komponenten'} ${axes.join(', ')} igen. Kontrollera riktningarnas tecken och enheterna, eller öppna lösningen steg för steg.`);
    }
    function setFeedback(kind,axes){feedbackState=kind?{kind,axes}:null;showFeedback();}
    function draw(){
      const r=svg.getBoundingClientRect(),w=r.width||520,h=r.height||280;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
      svg.innerHTML=V.sceneMarkup(config,camera,w,h,extent,{candidate:drawable(),target:part.expected,reveal:revealed});
      section.querySelector('[data-answer-view]').textContent=camera.three?tr('Show in 2D','Visa i 2D'):tr('Show in 3D','Visa i 3D');
      section.querySelector('.vector-view-hint').textContent=(camera.three?tr('3D: drag to rotate; enter components to edit.','3D: dra för att rotera; ange komponenter för att ändra vektorn.'):tr('2D: drag the yellow tip to edit; x right, y up. Display is the xy projection.','2D: dra den gula pilspetsen för att ändra vektorn; x åt höger och y uppåt. Vyn visar projektionen på xy-planet.'))+(revealed?tr(' Yellow: your vector. Green: worked solution.',' Gult: din vektor. Grönt: lösningens vektor.'):tr(' Yellow: your vector. The solution stays hidden.',' Gult: din vektor. Lösningen är fortfarande dold.'));
    }
    function copy(){
      const article=section.closest('article');const notes=[...article.querySelectorAll('.vector-part')].map(el=>{const vals=[...el.querySelectorAll('[data-candidate]')].map(i=>i.value);if(vals.every(x=>x===''))return'';return `${item.interactive[+el.dataset.part].label}: (${vals.map(x=>x||'?').join(', ')})`;}).filter(Boolean);
      article.querySelector('.comparison-note').textContent=notes.join('\n');
    }
    function edited(){setFeedback(null);const v=values();save(key,inputs.map(i=>i.value));if(v.some(x=>Number.isFinite(x)&&Math.abs(x)>1e9)){setFeedback('range');return;}copy();draw();}
    inputs.forEach((el,i)=>el.addEventListener('input',()=>{if(i===2&&Number(el.value)!==0)camera.three=true;edited();}));
    section.querySelector('[data-check-vector]').addEventListener('click',()=>{
      const actual=values();let check=P.compareVector(actual,part.expected);
      if(item.id==='1.84'&&check.valid&&!check.correct)check=P.compareVector(actual,P.scale(part.expected,-1));
      if(!check.valid){setFeedback('missing');return;}
      setFeedback(check.correct?'correct':'wrong',['x','y','z'].filter((_,i)=>!check.components[i]));
    });
    section.querySelector('[data-answer-view]').addEventListener('click',()=>{camera.three=!camera.three;draw();});
    section.querySelector('[data-answer-fit]').addEventListener('click',()=>{extent=Math.max(baseExtent,P.norm(drawable())*1.3);camera=V.defaultCamera(camera.three);draw();});
    section.querySelector('[data-reveal-answer]').addEventListener('click',()=>{section.closest('article').querySelector('.solution-panel').open=true;revealed=true;draw();setFeedback('revealed');});
    svg.addEventListener('pointerdown',e=>{e.preventDefault();svg.setPointerCapture(e.pointerId);drag={id:e.pointerId,x:e.clientX,y:e.clientY,edit:!camera.three&&e.target.dataset.handle==='candidate'};});
    svg.addEventListener('pointermove',e=>{
      if(!drag||drag.id!==e.pointerId)return;e.preventDefault();
      if(drag.edit){const r=svg.getBoundingClientRect(),s=Math.min(r.width||520,r.height||280)*.36/extent*camera.zoom;inputs[0].value=Number(((e.clientX-r.left-r.width/2-camera.panX)/s).toFixed(2));inputs[1].value=Number((-(e.clientY-r.top-r.height/2-camera.panY)/s).toFixed(2));if(inputs[2].value==='')inputs[2].value='0';edited();}
      else if(camera.three){camera.yaw+=(e.clientX-drag.x)*.01;camera.pitch=P.clamp(camera.pitch+(e.clientY-drag.y)*.008,-1.3,1.3);draw();}
      else{camera.panX+=e.clientX-drag.x;camera.panY+=e.clientY-drag.y;draw();}
      drag.x=e.clientX;drag.y=e.clientY;
    });
    ['pointerup','pointercancel','lostpointercapture'].forEach(k=>svg.addEventListener(k,()=>drag=null));
    svg.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','0'].includes(e.key))return;e.preventDefault();if(e.key==='+')camera.zoom=P.clamp(camera.zoom*1.2,.2,8);if(e.key==='-')camera.zoom=P.clamp(camera.zoom/1.2,.2,8);if(e.key==='0'){camera=V.defaultCamera(camera.three);extent=Math.max(baseExtent,P.norm(drawable())*1.3);}if(e.key==='ArrowLeft')camera.three?camera.yaw-=.15:camera.panX-=20;if(e.key==='ArrowRight')camera.three?camera.yaw+=.15:camera.panX+=20;if(e.key==='ArrowUp')camera.three?camera.pitch=P.clamp(camera.pitch+.1,-1.3,1.3):camera.panY-=20;if(e.key==='ArrowDown')camera.three?camera.pitch=P.clamp(camera.pitch-.1,-1.3,1.3):camera.panY+=20;draw();});
    let observer;if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(draw);observer.observe(svg);}draw();copy();showFeedback();
    return{key,snapshot(){return{values:inputs.map(el=>el.value),camera:{...camera},extent,revealed,feedback:feedbackState};},reveal(value){revealed=value;draw();},destroy(){observer?.disconnect();}};
  }
  function renderBook(){
    $('physics-exercises').querySelectorAll('article[data-question]').forEach(article=>bookViews.set(article.dataset.question,{details:[...article.querySelectorAll('details')].map(d=>d.open)}));
    controllers.forEach(c=>{candidateViews.set(c.key,c.snapshot());c.destroy();});controllers=[];
    const set=$('physics-set').value,topic=$('physics-topic').value,query=$('physics-search').value.trim().toLowerCase();
    const exact=B.items.find(i=>i.id.toLowerCase()===query);
    filtered=B.items.filter(i=>matchesSet(i,set)&&(topic==='all'||i.topic===topic)&&(!query||(exact?i===exact:(window.PhysicsI18n?.searchText?.(i.id)||`${i.id} ${i.title} ${i.prompt} ${Q.get(i.id).passage||''} ${Q.get(i.id).reference||''}`).toLowerCase().includes(query))));
    page=P.clamp(page,0,Math.max(0,Math.ceil(filtered.length/pageSize)-1));const shown=filtered.slice(page*pageSize,(page+1)*pageSize);
    $('physics-count').textContent=tr(`${filtered.length} matching question${filtered.length===1?'':'s'} · ${B.items.length} worked answers in this chapter`,`${filtered.length} matchande ${filtered.length===1?'uppgift':'uppgifter'} · ${B.items.length} genomgångna lösningar i kapitlet`);
    $('physics-exercises').innerHTML=shown.length?shown.map(card).join(''):`<p class="empty">${tr('No questions match. Try another topic, choose “All questions”, or clear the search.','Inga uppgifter matchar. Prova ett annat område, välj ”Alla uppgifter” eller rensa sökningen.')}</p>`;
    $('physics-page').textContent=filtered.length?`${page*pageSize+1}–${Math.min((page+1)*pageSize,filtered.length)} ${tr('of','av')} ${filtered.length}`:tr('0 questions','0 uppgifter');$('physics-prev').disabled=page===0;$('physics-next').disabled=(page+1)*pageSize>=filtered.length;
    for(const item of shown){
      const article=$('physics-'+safeId(item.id)),owned=[];
      const view=bookViews.get(item.id);if(view)article.querySelectorAll('details').forEach((detail,i)=>detail.open=!!view.details[i]);
      article.querySelectorAll('.vector-part').forEach(section=>{const index=+section.dataset.part,control=makeCandidate(section,item,item.interactive[index],index);owned.push(control);controllers.push(control);});
      article.querySelector('.solution-panel').addEventListener('toggle',e=>owned.forEach(c=>c.reveal(e.target.open)));
      article.querySelector('.attempt-panel').addEventListener('toggle',()=>owned.forEach(c=>c.reveal(article.querySelector('.solution-panel').open)));
    }
  }
  ['physics-set','physics-topic'].forEach(id=>$(id).addEventListener('change',()=>{page=0;renderBook();}));$('physics-search').addEventListener('input',()=>{page=0;renderBook();});
  $('physics-prev').addEventListener('click',()=>{page--;renderBook();$('book').scrollIntoView({block:'start'});});$('physics-next').addEventListener('click',()=>{page++;renderBook();$('book').scrollIntoView({block:'start'});});
  $('physics-exercises').addEventListener('input',e=>{if(e.target.dataset.attempt){const itemId=e.target.dataset.attempt,article=e.target.closest('article'),ok=save('answer-'+itemId,e.target.value);article.querySelector('.attempt-copy').textContent=e.target.value||tr('You can reveal the solution without writing an answer.','Du kan visa lösningen utan att skriva ett eget svar.');article.querySelector('.save-status').textContent=ok?tr('Saved on this browser.','Sparat i den här webbläsaren.'):tr('Browser storage is unavailable. Keep this page open or copy your answer before leaving.','Webbläsarens lagring är inte tillgänglig. Håll sidan öppen eller kopiera ditt svar innan du lämnar den.');}});
  $('physics-exercises').addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.dataset.basics!==undefined){lessonIndex=+button.dataset.basics;renderLesson();$('learn').scrollIntoView({block:'start'});}if(button.dataset.explore!==undefined){const item=B.items.find(i=>i.id===button.closest('article').dataset.question),part=item.interactive[+button.dataset.explore];lab.load({...part,three:part.mode==='cross'||part.a?.[2]!==0||part.b?.[2]!==0});lab.host.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed','false'));lab.fullscreen();}});
  renderBook();

  let quizState=null;
  function shuffled(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function startQuiz(){
    const level=Number($('physics-level').value),type=$('physics-quiz-type').value,pool=C.quiz.filter(q=>q.level===level&&(type==='mixed'||q.type===type));
    let selected;
    if(type==='mixed'){
      const first=['problems','terms','language'].map(t=>shuffled(pool.filter(q=>q.type===t))[0]);
      selected=shuffled([...first,...shuffled(pool.filter(q=>!first.includes(q))).slice(0,2)]);
    }else selected=shuffled(pool).slice(0,5);
    quizState={questions:selected.map(q=>({id:q.id,order:shuffled(q.options.map((_,i)=>i))})),index:0,score:0,answered:false,revealed:false,choice:null,skipped:0,notice:false};$('physics-quiz').hidden=false;renderQuiz();
  }
  function currentQuizQuestion(){const selected=quizState.questions[quizState.index];return{...C.quiz.find(q=>q.id===selected.id),order:selected.order};}
  const quizChoiceNotice=()=>tr('Choose an answer, or use “Show solution without answering”.','Välj ett svar eller använd ”Visa lösningen utan att svara”.');
  function renderQuiz(){
    const s=quizState,host=$('physics-quiz');
    if(s.index>=s.questions.length){host.innerHTML=`<p class="kicker">${tr('QUIZ COMPLETE','QUIZET ÄR KLART')}</p><h3>${tr(`${s.score} correct out of ${s.questions.length}`,`${s.score} rätt av ${s.questions.length}`)}</h3><p>${tr(`${s.skipped} solution${s.skipped===1?'':'s'} viewed without a scored answer. Review the explanations, then try another set.`,`${s.skipped} ${s.skipped===1?'lösning visades':'lösningar visades'} utan ett poängsatt svar. Läs igenom förklaringarna och prova sedan en ny omgång.`)}</p><button class="primary" type="button" data-quiz-action="restart">${tr('Try another quiz','Prova ett nytt quiz')}</button>`;return;}
    const q=currentQuizQuestion(),typeLabel={problems:tr('problems','problem'),terms:tr('terms','begrepp'),language:tr('language','matematiskt språk')}[q.type]||q.type;
    host.innerHTML=`<p class="kicker">${tr('QUESTION','FRÅGA')} ${s.index+1} ${tr('OF','AV')} ${s.questions.length} · ${E(typeLabel)}</p><h3>${E(q.prompt)}</h3><fieldset class="quiz-options"><legend>${tr('Choose one answer','Välj ett svar')}</legend>${q.order.map((n,i)=>`<label><input type="radio" name="physics-choice" value="${n}" ${s.choice===n?'checked':''} ${s.answered?'disabled':''}> ${E(q.options[n])}</label>`).join('')}</fieldset><div class="quiz-buttons"><button type="button" class="primary" data-quiz-action="check" ${s.answered?'disabled':''}>${tr('Check answer','Kontrollera svaret')}</button><button type="button" class="secondary" data-quiz-action="reveal" ${s.answered?'disabled':''}>${tr('Show solution without answering','Visa lösningen utan att svara')}</button><button type="button" class="secondary" data-quiz-action="next" ${!s.answered?'disabled':''}>${s.index===s.questions.length-1?tr('See result','Visa resultatet'):tr('Next question →','Nästa fråga →')}</button></div><div id="physics-quiz-feedback" role="status" aria-live="polite">${s.answered?`<div class="answer"><strong>${s.revealed?tr('Solution viewed — not scored','Lösningen visades – inga poäng'):s.choice===q.answer?tr('Correct','Rätt'):tr('Let’s work through it','Vi går igenom det tillsammans')}</strong><p>${E(q.options[q.answer])}</p><p>${E(q.why)}</p></div>`:s.notice?E(quizChoiceNotice()):''}</div>`;
  }
  $('physics-quiz-form').addEventListener('submit',e=>{e.preventDefault();startQuiz();});
  $('physics-quiz').addEventListener('change',e=>{if(e.target.name==='physics-choice'&&quizState&&!quizState.answered){quizState.choice=Number(e.target.value);quizState.notice=false;}});
  $('physics-quiz').addEventListener('click',e=>{const b=e.target.closest('[data-quiz-action]');if(!b)return;const action=b.dataset.quizAction,s=quizState;if(action==='restart'){startQuiz();return;}if(action==='next'&&s.answered){s.index++;s.answered=false;s.revealed=false;s.choice=null;s.notice=false;renderQuiz();return;}if(s.answered)return;if(action==='check'){if(s.choice===null){s.notice=true;$('physics-quiz-feedback').textContent=quizChoiceNotice();return;}s.answered=true;s.notice=false;if(s.choice===currentQuizQuestion().answer)s.score++;}else if(action==='reveal'){s.answered=true;s.revealed=true;s.skipped++;s.notice=false;}renderQuiz();});

  document.addEventListener('physicslanguagechange',()=>{
    const focused=document.activeElement,focusId=focused?.id,selection=focused&&typeof focused.selectionStart==='number'?[focused.selectionStart,focused.selectionEnd]:null;
    const explanationOpen=$('lesson').querySelector('.lesson-check details')?.open;
    renderLesson();const explanation=$('lesson').querySelector('.lesson-check details');if(explanation)explanation.open=!!explanationOpen;
    renderGlossary();renderTopics();renderBook();updateUnits();updateCube();if(quizState)renderQuiz();lab.setLanguage?.();
    if(focusId){const replacement=$(focusId);if(replacement&&replacement!==focused){replacement.focus({preventScroll:true});if(selection&&typeof replacement.setSelectionRange==='function')try{replacement.setSelectionRange(...selection);}catch{}}}
  });
})();
