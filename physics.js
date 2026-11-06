(function(){
  'use strict';
  if(typeof document==='undefined')return;
  const P=window.Physics,B=window.PhysicsBook,C=window.PhysicsContent,V=window.PhysicsLab,E=V.escape;
  const $=id=>document.getElementById(id),prefix='ember-physics:';
  function read(key,fallback=''){try{const v=localStorage.getItem(prefix+key);return v===null?fallback:JSON.parse(v);}catch{return fallback;}}
  function save(key,value){try{localStorage.setItem(prefix+key,JSON.stringify(value));return true;}catch{return false;}}
  const lab=new V.Lab($('physics-lab'));
  let lessonIndex=P.clamp(Number(read('lesson',0))||0,0,C.lessons.length-1);
  function renderLesson(){
    const l=C.lessons[lessonIndex];
    $('lesson-nav').innerHTML=C.lessons.map((v,i)=>`<button type="button" data-lesson="${i}" aria-current="${i===lessonIndex}"><span>${String(i+1).padStart(2,'0')}</span>${E(v.title)}</button>`).join('');
    $('lesson').innerHTML=`<p class="kicker">${lessonIndex+1} / ${C.lessons.length} · SECTION ${E(l.section)} · ${E(l.tag)}</p><h3>${E(l.title)}</h3><p>${E(l.intro)}</p><ol>${l.steps.map(([title,text])=>`<li><b>${E(title)}</b>${E(text)}</li>`).join('')}</ol><p class="lesson-example">${E(l.example)}</p><div class="lesson-check"><p><strong>Pause and think:</strong> ${E(l.check)}</p><details><summary>Show the explanation</summary><p>${E(l.answer)}</p></details></div><div class="lesson-actions"><button type="button" class="secondary" data-lesson-move="-1" ${lessonIndex===0?'disabled':''}>← Previous</button>${l.preset?`<button type="button" class="secondary" data-lesson-preset="${l.preset}">Try this experiment ↗</button>`:''}<button type="button" class="primary" data-lesson-move="1" ${lessonIndex===C.lessons.length-1?'disabled':''}>Next idea →</button></div>`;
    save('lesson',lessonIndex);
  }
  $('lesson-nav').addEventListener('click',e=>{const b=e.target.closest('[data-lesson]');if(b){lessonIndex=+b.dataset.lesson;renderLesson();}});
  $('lesson').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.lessonMove){lessonIndex=P.clamp(lessonIndex+Number(b.dataset.lessonMove),0,C.lessons.length-1);renderLesson();$('lesson').scrollIntoView({block:'start'});}if(b.dataset.lessonPreset){lab.loadPreset(b.dataset.lessonPreset);$('lab').scrollIntoView({block:'start'});}});
  $('glossary').innerHTML=C.glossary.map(([word,meaning])=>`<dt>${E(word)}</dt><dd>${E(meaning)}</dd>`).join('');renderLesson();

  const lengthUnits=Object.keys(P.units.length);
  ['unit-from','unit-to'].forEach(id=>$(id).innerHTML=lengthUnits.map(u=>`<option>${E(u)}</option>`).join(''));
  $('unit-from').value='cm';$('unit-to').value='m';
  function updateUnits(){
    const raw=$('unit-value').value,n=Number(raw),from=$('unit-from').value,to=$('unit-to').value,power=Number($('unit-power').value),suffix=power===2?'²':power===3?'³':'';
    if(raw.trim()===''||!Number.isFinite(n)||n<0||n>1e12){$('unit-result').textContent='Enter an amount from 0 to 1 trillion.';$('unit-steps').innerHTML='';return;}
    const factor=P.units.length[from]/P.units.length[to],value=P.convert(n,from,to,power);
    $('unit-result').textContent=`${P.fmt(n,7)} ${from}${suffix} = ${P.fmt(value,7)} ${to}${suffix}`;
    $('unit-steps').innerHTML=[`One ${from} equals ${P.fmt(factor,7)} ${to}.`,power===1?'Length uses that conversion factor once.':`${power===2?'Area':'Volume'} contains ${power} length factors. The unit conversion is (${P.fmt(factor,7)})${suffix} = ${P.fmt(factor**power,7)}.`,`Multiply: ${P.fmt(n,7)} × ${P.fmt(factor**power,7)} = ${P.fmt(value,7)} ${to}${suffix}. The physical ${power===1?'length':power===2?'area':'volume'} has not changed.`].map(s=>`<li>${E(s)}</li>`).join('');
  }
  ['unit-value','unit-from','unit-to','unit-power'].forEach(id=>$(id).addEventListener('input',updateUnits));updateUnits();
  function updateCube(){
    const n=Number($('cube-size').value);$('cube-size-label').value=n;
    const p=(x,y,z)=>[180+(x-y)*20,200+(x+y)*8-z*24];
    const pts=coords=>coords.map(v=>p(...v).join(',')).join(' ');
    let html=`<title>Cube with ${n} blocks along each edge, ${n*n} on a face, ${n**3} inside.</title>`;
    html+=`<polygon points="${pts([[0,0,0],[n,0,0],[n,0,n],[0,0,n]])}" fill="#8eccc2" stroke="#306e67"/><polygon points="${pts([[0,0,0],[0,n,0],[0,n,n],[0,0,n]])}" fill="#b7dcd6" stroke="#306e67"/><polygon points="${pts([[0,0,n],[n,0,n],[n,n,n],[0,n,n]])}" fill="#e3f1e9" stroke="#306e67"/>`;
    // Three visible faces with n by n grid cells.
    for(let i=0;i<=n;i++)for(const [a,b]of [[[i,0,0],[i,0,n]],[[0,0,i],[n,0,i]],[[0,i,0],[0,i,n]],[[0,0,i],[0,n,i]],[[i,0,n],[i,n,n]],[[0,i,n],[n,i,n]]]){const u=p(...a),v=p(...b);html+=`<line x1="${u[0]}" y1="${u[1]}" x2="${v[0]}" y2="${v[1]}" stroke="#306e67" stroke-width=".8"/>`;}
    html+=`<text x="15" y="22">Edge: ${n}</text><text x="15" y="45">One face: ${n} × ${n} = ${n*n}</text><text x="15" y="68">Inside: ${n} × ${n} × ${n} = ${n**3}</text>`;
    $('cube-picture').innerHTML=html;$('cube-result').textContent=`${n} blocks along an edge, ${n*n} square units on a face, ${n**3} cubic units inside. Doubling an edge makes a face 4 times as large and the volume 8 times as large.`;
  }
  $('cube-size').addEventListener('input',updateCube);updateCube();

  Object.entries(B.topics).forEach(([value,text])=>{const option=document.createElement('option');option.value=value;option.textContent=text;$('physics-topic').append(option);});
  let page=0,filtered=[],controllers=[];
  const pageSize=5;
  const safeId=id=>id.replace(/[^A-Za-z0-9]/g,'-');
  function matchesSet(item,set){return set==='all'||(set==='numbered'&&/^1\./.test(item.id))||(set==='discussion'&&item.id.startsWith('Q'))||(set==='guided'&&(item.id.startsWith('VP')||item.id==='Bridge'));}
  function lessonFor(topic){return{units:2,precision:3,vectors:6,products:8,reasoning:0}[topic]||0;}
  function card(item){
    const id=safeId(item.id),attempt=read('answer-'+item.id,''),parts=(item.interactive||[]).map((p,i)=>({...p,index:i})).filter(p=>Array.isArray(p.expected));
    return `<article class="exercise" id="physics-${id}" data-question="${E(item.id)}"><div class="question-meta"><span>${E(B.topics[item.topic])}</span><span>Book p. ${item.page}</span>${parts.length?'<span>Interactive vector answer</span>':''}</div><h3>${E(item.id)} · ${E(item.title)}</h3><p>${E(item.prompt)}</p><p class="caption exercise-choice">Write your own answer, move an answer arrow, or open the worked solution immediately.</p>
      <details class="attempt-panel" ${attempt?'open':''}><summary>Write my answer <span>(optional)</span></summary><label class="attempt-label" for="attempt-${id}">My reasoning and calculations</label><textarea id="attempt-${id}" data-attempt="${E(item.id)}" placeholder="Write your idea, calculation, units and final answer here…">${E(attempt)}</textarea><p class="save-status caption" role="status"></p>
      ${parts.map(p=>`<section class="vector-part" data-part="${p.index}"><h4>${E(p.label)} · build my answer</h4><p class="caption">Enter x, y, z in ${E(p.units||'dimensionless units')}. For a flat vector, set z to 0. In 2D you can also drag the yellow tip.</p><div class="answer-fields">${['x','y','z'].map((axis,j)=>`<label for="candidate-${id}-${p.index}-${axis}">${axis}<input id="candidate-${id}-${p.index}-${axis}" data-candidate="${j}" type="number" step="any" min="-1000000000" max="1000000000" inputmode="decimal"></label>`).join('')}</div><svg class="answer-svg" tabindex="0" role="img" aria-label="Your answer vector. Drag its yellow tip in 2D, or use the component inputs. In 3D drag to rotate. Arrow keys adjust the view."></svg><div class="vector-check-actions"><button type="button" class="primary" data-check-vector>Check my vector</button><button type="button" class="secondary" data-answer-view>Switch view</button><button type="button" class="secondary" data-answer-fit>Fit</button><button type="button" class="secondary" data-reveal-answer>Compare with solution</button></div><p class="vector-feedback" role="status" aria-live="polite"></p><p class="caption vector-view-hint"></p></section>`).join('')}</details>
      <details class="solution-panel"><summary>Show worked solution</summary><details class="solution-guide"><summary>Need the basics first?</summary><p>${E({units:'Keep the quantity and unit together. A conversion factor changes the unit without changing the physical amount. Squares and cubes need squared and cubed factors.',precision:'A measured number has limited precision. State assumptions for estimates, keep extra digits during calculations, and round the final answer.',vectors:'Choose axes. A vector’s entries are amounts along x, y and z. Add matching entries; subtracting a negative adds a positive. Use Pythagoras for length.',products:'A dot product multiplies matching entries and adds them, giving a number. A cross product gives a perpendicular arrow. The angle is the angle between the two input directions.',reasoning:'Start with the meaning of each quantity. A simple example or counterexample is often enough to test a claim.'}[item.topic])}</p><button type="button" class="secondary" data-basics="${lessonFor(item.topic)}">Open the beginner lesson</button></details>
      <div class="comparison"><div><h4>My answer</h4><p class="attempt-copy">${E(attempt||'You can reveal the solution without writing an answer.')}</p><p class="comparison-note"></p></div><div><h4>Worked result</h4><div class="answer">${E(item.answer)}</div></div></div><h4>Follow the reasoning</h4><ol class="steps">${item.steps.map(s=>`<li>${E(s)}</li>`).join('')}</ol>
      ${(item.interactive||[]).length?`<div class="solution-experiments"><h4>Explore this solution</h4><p class="caption">Load the original inputs into the large lab. Rotate, change components, and see the calculations update.</p><div class="lesson-actions">${item.interactive.map((p,i)=>`<button type="button" class="secondary" data-explore="${i}">${E(p.label)} ↗</button>`).join('')}</div></div>`:''}
      <p class="compare-help">Compare one step at a time: the starting values, unit conversions, signs, formula and final units. A different correct method can still lead to the same answer. Displayed vector decimals include guard digits; round final measurements to the precision justified by the question.</p></details></article>`;
  }
  function makeCandidate(section,item,part,index){
    const key=`vector-${item.id}-${index}`,stored=read(key,['','','0']),inputs=[...section.querySelectorAll('[data-candidate]')],svg=section.querySelector('svg'),feedback=section.querySelector('.vector-feedback');
    const validStored=Array.isArray(stored)&&stored.length===3?stored:['','','0'];inputs.forEach((el,i)=>el.value=validStored[i]);
    const baseExtent=Math.max(3,P.norm(part.expected)*1.3),config={mode:'components',a:[0,0,0],b:[0,0,0]};let extent=baseExtent;
    let camera=V.defaultCamera(Math.abs(part.expected[2])>1e-9),revealed=false,drag=null;
    const values=()=>inputs.map(el=>el.value.trim()===''?NaN:Number(el.value));
    const drawable=()=>values().map(v=>Number.isFinite(v)?v:0);
    function draw(){
      const r=svg.getBoundingClientRect(),w=r.width||520,h=r.height||280;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
      svg.innerHTML=V.sceneMarkup(config,camera,w,h,extent,{candidate:drawable(),target:part.expected,reveal:revealed});
      section.querySelector('[data-answer-view]').textContent=camera.three?'Show in 2D':'Show in 3D';
      section.querySelector('.vector-view-hint').textContent=(camera.three?'3D: drag to rotate; enter components to edit.':'2D: drag the yellow tip to edit; x right, y up. Display is the xy projection.')+(revealed?' Yellow: your vector. Green: worked solution.':' Yellow: your vector. The solution stays hidden.');
    }
    function copy(){
      const article=section.closest('article');const notes=[...article.querySelectorAll('.vector-part')].map(el=>{const vals=[...el.querySelectorAll('[data-candidate]')].map(i=>i.value);if(vals.every(x=>x===''))return'';return `${item.interactive[+el.dataset.part].label}: (${vals.map(x=>x||'?').join(', ')})`;}).filter(Boolean);
      article.querySelector('.comparison-note').textContent=notes.join('\n');
    }
    function edited(){feedback.textContent='';const v=values();if(v.some(x=>Number.isFinite(x)&&Math.abs(x)>1e9)){feedback.textContent='Use component values between −1 billion and 1 billion.';return;}save(key,inputs.map(i=>i.value));copy();draw();}
    inputs.forEach((el,i)=>el.addEventListener('input',()=>{if(i===2&&Number(el.value)!==0)camera.three=true;edited();}));
    section.querySelector('[data-check-vector]').addEventListener('click',()=>{
      const actual=values();let check=P.compareVector(actual,part.expected);
      if(item.id==='1.84'&&check.valid&&!check.correct)check=P.compareVector(actual,P.scale(part.expected,-1));
      if(!check.valid){feedback.textContent='Enter all three components. Use 0 when there is no amount along an axis.';return;}
      feedback.textContent=check.correct?'Your vector matches a valid result within the rounding tolerance. Now compare the reasoning, not only the final numbers.':`Recheck the ${['x','y','z'].filter((_,i)=>!check.components[i]).join(', ')} component${check.components.filter(x=>!x).length>1?'s':''}. Check the direction signs and units, or open the worked solution.`;
    });
    section.querySelector('[data-answer-view]').addEventListener('click',()=>{camera.three=!camera.three;draw();});
    section.querySelector('[data-answer-fit]').addEventListener('click',()=>{extent=Math.max(baseExtent,P.norm(drawable())*1.3);camera=V.defaultCamera(camera.three);draw();});
    section.querySelector('[data-reveal-answer]').addEventListener('click',()=>{section.closest('article').querySelector('.solution-panel').open=true;revealed=true;draw();feedback.textContent='Green shows the worked result; yellow keeps your own answer. Compare the steps below.';});
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
    let observer;if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(draw);observer.observe(svg);}draw();copy();
    return{reveal(value){revealed=value;draw();},destroy(){observer?.disconnect();}};
  }
  function renderBook(){
    controllers.forEach(c=>c.destroy());controllers=[];
    const set=$('physics-set').value,topic=$('physics-topic').value,query=$('physics-search').value.trim().toLowerCase();
    const exact=B.items.find(i=>i.id.toLowerCase()===query);
    filtered=B.items.filter(i=>matchesSet(i,set)&&(topic==='all'||i.topic===topic)&&(!query||(exact?i===exact:`${i.id} ${i.title} ${i.prompt}`.toLowerCase().includes(query))));
    page=P.clamp(page,0,Math.max(0,Math.ceil(filtered.length/pageSize)-1));const shown=filtered.slice(page*pageSize,(page+1)*pageSize);
    $('physics-count').textContent=`${filtered.length} matching question${filtered.length===1?'':'s'} · ${B.items.length} worked answers in this chapter`;
    $('physics-exercises').innerHTML=shown.length?shown.map(card).join(''):'<p class="empty">No questions match. Try another topic, choose “All questions”, or clear the search.</p>';
    $('physics-page').textContent=filtered.length?`${page*pageSize+1}–${Math.min((page+1)*pageSize,filtered.length)} of ${filtered.length}`:'0 questions';$('physics-prev').disabled=page===0;$('physics-next').disabled=(page+1)*pageSize>=filtered.length;
    for(const item of shown){
      const article=$('physics-'+safeId(item.id)),owned=[];
      article.querySelectorAll('.vector-part').forEach(section=>{const index=+section.dataset.part,control=makeCandidate(section,item,item.interactive[index],index);owned.push(control);controllers.push(control);});
      article.querySelector('.solution-panel').addEventListener('toggle',e=>owned.forEach(c=>c.reveal(e.target.open)));
      article.querySelector('.attempt-panel').addEventListener('toggle',()=>owned.forEach(c=>c.reveal(article.querySelector('.solution-panel').open)));
    }
  }
  ['physics-set','physics-topic'].forEach(id=>$(id).addEventListener('change',()=>{page=0;renderBook();}));$('physics-search').addEventListener('input',()=>{page=0;renderBook();});
  $('physics-prev').addEventListener('click',()=>{page--;renderBook();$('book').scrollIntoView({block:'start'});});$('physics-next').addEventListener('click',()=>{page++;renderBook();$('book').scrollIntoView({block:'start'});});
  $('physics-exercises').addEventListener('input',e=>{if(e.target.dataset.attempt){const itemId=e.target.dataset.attempt,article=e.target.closest('article'),ok=save('answer-'+itemId,e.target.value);article.querySelector('.attempt-copy').textContent=e.target.value||'You can reveal the solution without writing an answer.';article.querySelector('.save-status').textContent=ok?'Saved on this browser.':'Browser storage is unavailable. Keep this page open or copy your answer before leaving.';}});
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
    quizState={questions:selected.map(q=>({...q,order:shuffled(q.options.map((_,i)=>i))})),index:0,score:0,answered:false,revealed:false,choice:null,skipped:0};$('physics-quiz').hidden=false;renderQuiz();
  }
  function renderQuiz(){
    const s=quizState,host=$('physics-quiz');
    if(s.index>=s.questions.length){host.innerHTML=`<p class="kicker">QUIZ COMPLETE</p><h3>${s.score} correct out of ${s.questions.length}</h3><p>${s.skipped} solution${s.skipped===1?'':'s'} viewed without a scored answer. Review the explanations, then try another set.</p><button class="primary" type="button" data-quiz-action="restart">Try another quiz</button>`;return;}
    const q=s.questions[s.index];host.innerHTML=`<p class="kicker">QUESTION ${s.index+1} OF ${s.questions.length} · ${E(q.type)}</p><h3>${E(q.prompt)}</h3><fieldset class="quiz-options"><legend>Choose one answer</legend>${q.order.map((n,i)=>`<label><input type="radio" name="physics-choice" value="${n}" ${s.choice===n?'checked':''} ${s.answered?'disabled':''}> ${E(q.options[n])}</label>`).join('')}</fieldset><div class="quiz-buttons"><button type="button" class="primary" data-quiz-action="check" ${s.answered?'disabled':''}>Check answer</button><button type="button" class="secondary" data-quiz-action="reveal" ${s.answered?'disabled':''}>Show solution without answering</button><button type="button" class="secondary" data-quiz-action="next" ${!s.answered?'disabled':''}>${s.index===s.questions.length-1?'See result':'Next question →'}</button></div><div id="physics-quiz-feedback" role="status" aria-live="polite">${s.answered?`<div class="answer"><strong>${s.revealed?'Solution viewed — not scored':s.choice===q.answer?'Correct':'Let’s work through it'}</strong><p>${E(q.options[q.answer])}</p><p>${E(q.why)}</p></div>`:''}</div>`;
  }
  $('physics-quiz-form').addEventListener('submit',e=>{e.preventDefault();startQuiz();});
  $('physics-quiz').addEventListener('change',e=>{if(e.target.name==='physics-choice'&&quizState&&!quizState.answered)quizState.choice=Number(e.target.value);});
  $('physics-quiz').addEventListener('click',e=>{const b=e.target.closest('[data-quiz-action]');if(!b)return;const action=b.dataset.quizAction,s=quizState;if(action==='restart'){startQuiz();return;}if(action==='next'&&s.answered){s.index++;s.answered=false;s.revealed=false;s.choice=null;renderQuiz();return;}if(s.answered)return;if(action==='check'){if(s.choice===null){$('physics-quiz-feedback').textContent='Choose an answer, or use “Show solution without answering”.';return;}s.answered=true;if(s.choice===s.questions[s.index].answer)s.score++;}else if(action==='reveal'){s.answered=true;s.revealed=true;s.skipped++;}renderQuiz();});
})();
