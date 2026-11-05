(() => {
  'use strict';

  const M = window.EmberAlgebra;
  const C = window.EmberChapter;
  const $ = id => document.getElementById(id);
  const html = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
  const stepList = steps => steps.map(step => '<li>'+html(step)+'</li>').join('');
  const topicOptions = C.topics.map(([id,title]) => '<option value="'+id+'">'+id+' · '+html(title)+'</option>').join('');
  $('practice-topic').innerHTML = topicOptions;
  $('quiz-topic').innerHTML = '<option value="all">All chapter topics</option>'+topicOptions;
  $('book-topic').innerHTML = topicOptions+'<option value="review">Chapter 1 supplementary exercises</option>';

  function readAttempt(key) {
    try { return localStorage.getItem('ember-linear-algebra:'+key) || ''; }
    catch { return ''; }
  }
  function saveAttempt(key,value) {
    try { localStorage.setItem('ember-linear-algebra:'+key,value); }
    catch { /* The comparison still works without browser storage. */ }
  }

  function exerciseCard(problem,key,label) {
    return '<article class="exercise"><p class="kicker">'+html(label)+'</p><h3>'+html(problem.title)+'</h3>'+
      '<p>'+html(problem.prompt)+'</p><label class="attempt-label">Your answer or working<textarea data-attempt="'+key+
      '" maxlength="4000" placeholder="Write your reasoning here…">'+html(readAttempt(key))+'</textarea></label>'+
      '<details><summary>Show worked solution</summary><div class="answer"><strong>Your attempt</strong><p class="attempt-copy"></p>'+
      '<strong>Worked answer</strong><p>'+html(problem.answer)+'</p></div><ol class="steps">'+stepList(problem.steps)+'</ol></details></article>';
  }
  function showAttempt(article) {
    article.querySelector('.attempt-copy').textContent=article.querySelector('textarea').value.trim()||'Your answer will appear here as you type.';
  }
  for (const id of ['practice-list','book-list']) {
    $(id).addEventListener('input', event => {
      if (!event.target.matches('textarea[data-attempt]')) return;
      saveAttempt(event.target.dataset.attempt,event.target.value);
      showAttempt(event.target.closest('article'));
    });
  }
  const levels=['Easy','Beginner','Advanced','Very advanced'];
  function renderPractice() {
    const topic=$('practice-topic').value;
    $('practice-list').innerHTML=levels.map((label,i)=>exerciseCard(C.makeProblem(topic,i+1),'practice-'+topic+'-'+i,'Level '+(i+1)+' · '+label)).join('');
    $('practice-list').querySelectorAll('article').forEach(showAttempt);
  }
  function renderBook() {
    const topic=$('book-topic').value;
    const range=window.EmberTextbook.index[topic];
    const solutions=window.EmberTextbook.solutions[topic]||[];
    $('book-coverage').textContent='Printed '+range.pages+' · '+range.exercises+'. '+solutions.length+' worked entries available for this set.';
    $('book-list').innerHTML=solutions.length ? solutions.map((p,i)=>exerciseCard(p,'book-'+topic+'-'+i,'Textbook · '+p.number)).join('') :
      '<p class="empty">Use the exercise references above with your copy. The worked practice section has original examples for each topic.</p>';
    $('book-list').querySelectorAll('article').forEach(showAttempt);
  }
  $('practice-topic').addEventListener('change',renderPractice);
  $('book-topic').addEventListener('change',renderBook);

  const presets = {
    planes: [
      ['One intersection',[[1,1,1,3],[1,-1,0,0],[0,1,1,2]]],
      ['A shared line',[[1,0,0,1],[0,1,0,1],[1,1,0,2]]],
      ['The same plane',[[0,0,1,1],[0,0,2,2],[0,0,-1,-1]]],
      ['No common point',[[1,0,0,-1],[1,0,0,1],[0,1,1,0]]]
    ],
    transform: [
      ['Shear',[[1,1,0],[0,1,0],[0,0,1]]],
      ['Stretch',[[2,0,0],[0,1,0],[0,0,.5]]],
      ['Rotate 90° around z',[[0,-1,0],[1,0,0],[0,0,1]]],
      ['Reflect across yz', [[-1,0,0],[0,1,0],[0,0,1]]],
      ['Flatten onto xy',[[1,0,0],[0,1,0],[0,0,0]]]
    ]
  };
  const state={mode:'planes',yaw:-.57,pitch:.43,zoom:1,values:structuredClone(presets.planes[0][1])};
  const colors=['#f4aa78','#72d1ce','#d7b2fb'];
  const scene=$('scene');

  function renderControls() {
    const transform=state.mode==='transform';
    const columns=transform ? ['x','y','z'] : ['x','y','z','Right side'];
    $('scene-controls').innerHTML='<h3>'+(transform?'Change the matrix':'Change the equations')+'</h3><p>'+
      (transform?'The dashed cube is the input. Each matrix row tells the computer how to calculate one new coordinate.':
        'Each row describes a plane: ax + by + cz = d. A solution is a point that lies on all three.')+'</p>'+
      '<label for="scene-preset">Example</label> <select id="scene-preset">'+presets[state.mode].map(([name],i)=>'<option value="'+i+'">'+name+'</option>').join('')+
      '<option value="custom" disabled>Custom</option></select>'+
      '<div class="matrix-edit '+(transform?'transform':'')+'">'+columns.map(x=>'<span class="caption">'+x+'</span>').join('')+
      state.values.map((row,i)=>row.map((v,j)=>'<input type="number" min="-10" max="10" step="any" data-row="'+i+'" data-col="'+j+
      '" class="'+(j===3?'rhs':'')+'" aria-label="Row '+(i+1)+' '+columns[j]+'" value="'+v+'">').join('')).join('')+'</div>';
  }

  function project(v) {
    const [x,y,z]=v, c=Math.cos(state.yaw), s=Math.sin(state.yaw);
    const across=x*c-y*s, depth=x*s+y*c;
    const up=z*Math.cos(state.pitch)-depth*Math.sin(state.pitch);
    return {x:320+across*state.zoom*54,y:218-up*state.zoom*54,d:depth*Math.cos(state.pitch)+z*Math.sin(state.pitch)};
  }
  const coord = p => p.x.toFixed(2)+','+p.y.toFixed(2);
  function line(a,b,color,width=1,extra='') {
    return '<polyline points="'+coord(project(a))+' '+coord(project(b))+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" '+extra+'/>';
  }
  function polygon(vertices,color,opacity) {
    return '<polygon points="'+vertices.map(v=>coord(project(v))).join(' ')+'" fill="'+color+'" fill-opacity="'+opacity+'" stroke="'+color+'" stroke-opacity=".85" stroke-width="1.5"/>';
  }
  function point(v,color,label) {
    const {x,y}=project(v);
    return '<circle cx="'+x+'" cy="'+y+'" r="5.5" fill="'+color+'"/><text x="'+(x+9)+'" y="'+(y-9)+'" fill="'+color+'">'+html(label)+'</text>';
  }
  function planeVertices(row,extent) {
    const normal=row.slice(0,3);
    const pivot=normal.reduce((best,n,i)=>Math.abs(n)>Math.abs(normal[best])?i:best,0);
    if (M.zero(normal[pivot])) return [];
    const [i,j]=[0,1,2].filter(n=>n!==pivot);
    return [[-extent,-extent],[extent,-extent],[extent,extent],[-extent,extent]].map(([a,b])=>{
      const v=[0,0,0];
      v[i]=a;
      v[j]=b;
      v[pivot]=(row[3]-normal[i]*a-normal[j]*b)/normal[pivot];
      return v;
    });
  }
  const cube=Array.from({length:8},(_,i)=>[i&1,(i>>1)&1,(i>>2)&1]);
  const edges=cube.flatMap((_,i)=>[1,2,4].filter(bit=>(i&bit)===0).map(bit=>[i,i|bit]));
  const faces=[[0,1,3,2],[4,5,7,6],[0,1,5,4],[2,3,7,6],[0,2,6,4],[1,3,7,5]];
  const avgDepth=vertices=>vertices.reduce((sum,v)=>sum+project(v).d,0)/vertices.length;

  function draw() {
    let axes='', objects='', highlights='';
    for (let i=-3;i<=3;i++) {
      axes+=line([i,-3,0],[i,3,0],'#56594d')+line([-3,i,0],[3,i,0],'#56594d');
    }
    for (const [i,axis] of ['x','y','z'].entries()) {
      const a=[0,0,0], b=[0,0,0];
      a[i]=-3.3; b[i]=3.3;
      const p=project(b);
      axes+=line(a,b,'#a9ab99',1.4)+'<text x="'+p.x+'" y="'+p.y+'" fill="#f3eddb">'+axis+'</text>';
    }
    if (state.mode==='planes') {
      const planes=state.values.map((row,i)=>({points:planeVertices(row,2.65),color:colors[i]})).filter(p=>p.points.length);
      planes.sort((a,b)=>avgDepth(a.points)-avgDepth(b.points));
      objects=planes.map(p=>polygon(p.points,p.color,.25)).join('');
      const s=state.result;
      if (s.kind==='one') highlights=point(s.point,'#ffec9a',M.vector(s.point));
      if (s.kind==='infinite'&&s.basis.length===1) {
        const d=s.basis[0], span=3.3/Math.hypot(...d);
        highlights=line(s.point.map((n,i)=>n-span*d[i]),s.point.map((n,i)=>n+span*d[i]),'#ffec9a',4);
      }
      if (s.kind==='infinite'&&s.basis.length===2) {
        const active=state.values.find(row=>row.slice(0,3).some(n=>!M.zero(n)));
        highlights=polygon(planeVertices(active,2.45),'#ffec9a',.2);
      }
    } else {
      const mapped=cube.map(v=>M.apply(state.values,v));
      objects=faces.map(face=>face.map(i=>mapped[i])).sort((a,b)=>avgDepth(a)-avgDepth(b)).map(face=>polygon(face,colors[1],.18)).join('');
      highlights=edges.map(([i,j])=>line(cube[i],cube[j],'#f4aa78',2,'stroke-dasharray="5 4"')).join('')+
        edges.map(([i,j])=>line(mapped[i],mapped[j],colors[1],2)).join('')+
        point(mapped[7],'#ffec9a','A(1, 1, 1)');
    }
    scene.innerHTML='<title>'+html(state.mode==='planes'?'Three planes and their common solutions':'Original and transformed cube')+'</title>'+axes+objects+highlights;
  }

  function updateScene() {
    let description, summary, steps;
    if (state.mode==='planes') {
      const s=M.solve(state.values);
      state.result=s;
      summary=s.kind==='one'?'One solution':s.kind==='none'?'No solution':['','A shared line','A shared plane','All of 3D space'][s.basis.length];
      description=s.kind==='none'?'There is no point on all three planes.':s.kind==='one'?'The common point is '+M.vector(s.point)+'.':
        s.basis.length===3?'All rows say 0 = 0, so every point works.':'The highlighted intersection shows where every equation holds.';
      steps=s.steps;
    } else {
      const v=[1,1,1], end=M.apply(state.values,v);
      summary='Watch one corner move';
      description='The matrix takes '+M.vector(v)+' to '+M.vector(end)+'. The orange outline shows the input and the teal shape shows the output.';
      steps=state.values.map((row,i)=>['x','y','z'][i]+' coordinate = '+row.map(n=>'('+n+' × 1)').join(' + ')+' = '+M.tidy(end[i])+'.');
      steps.push('Do the same calculation for every corner. The origin stays fixed because multiplying the zero vector gives zero.');
    }
    $('scene-result').innerHTML='<strong>'+html(summary)+'</strong><p>'+html(description)+'</p>';
    $('scene-work').innerHTML=stepList(steps);
    draw();
  }

  $('scene-mode').addEventListener('change',event=>{
    state.mode=event.target.value;
    state.values=structuredClone(presets[state.mode][0][1]);
    renderControls();
    updateScene();
  });
  $('scene-controls').addEventListener('change',event=>{
    if(event.target.id!=='scene-preset')return;
    const index=Number(event.target.value);
    state.values=structuredClone(presets[state.mode][index][1]);
    renderControls();
    $('scene-preset').value=String(index);
    $('scene-preset').focus();
    updateScene();
  });
  $('scene-controls').addEventListener('input',event=>{
    const {row,col}=event.target.dataset;
    if (row===undefined || !event.target.value || !event.target.checkValidity()) return;
    state.values[row][col]=Number(event.target.value);
    $('scene-preset').value='custom';
    updateScene();
  });
  $('scene-controls').addEventListener('focusout',event=>{
    const {row,col}=event.target.dataset;
    if(row!==undefined&&(!event.target.value||!event.target.checkValidity())) event.target.value=state.values[row][col];
  });

  function camera(action) {
    if (action==='left') state.yaw-=.17;
    if (action==='right') state.yaw+=.17;
    if (action==='up') state.pitch+=.13;
    if (action==='down') state.pitch-=.13;
    if (action==='in') state.zoom*=1.15;
    if (action==='out') state.zoom/=1.15;
    if (action==='reset') Object.assign(state,{yaw:-.57,pitch:.43,zoom:1});
    state.pitch=Math.max(-1.5,Math.min(1.5,state.pitch));
    state.zoom=Math.max(.24,Math.min(2.6,state.zoom));
    draw();
  }
  document.querySelector('.scene-actions').addEventListener('click',event=>{
    if(event.target.dataset.camera) camera(event.target.dataset.camera);
  });
  scene.addEventListener('keydown',event=>{
    const action={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down','+':'in','-':'out',Home:'reset'}[event.key];
    if (action) {event.preventDefault();camera(action);}
  });
  let pointer;
  scene.addEventListener('pointerdown',event=>{
    if (!event.isPrimary || event.button!==0) return;
    scene.setPointerCapture(event.pointerId);
    pointer=[event.pointerId,event.clientX,event.clientY];
  });
  scene.addEventListener('pointermove',event=>{
    if(pointer?.[0]!==event.pointerId)return;
    state.yaw+=(event.clientX-pointer[1])*.01;
    state.pitch=Math.max(-1.5,Math.min(1.5,state.pitch+(event.clientY-pointer[2])*.01));
    pointer=[event.pointerId,event.clientX,event.clientY];
    draw();
  });
  scene.addEventListener('lostpointercapture',()=>{pointer=null;});

  function shuffled(items) {
    const copy=[...items];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }

  function quizQuestion(topic,level,type,k) {
    const i=C.topics.findIndex(row=>row[0]===topic);
    if(type==='problems') {
      const original=C.makeProblem(topic,level,k);
      return {...original,options:[]};
    }
    const [term,notation,meaning]=C.glossary[i][level-1];
    const field=type==='terms'?0:2;
    const alternatives=shuffled([...new Set(C.glossary.flatMap((rows,j)=>j===i?rows.filter((_,n)=>n!==level-1):[rows[level-1]]).map(row=>row[field]))]);
    const answer=type==='terms'?term:meaning;
    return {title:type==='terms'?'Name the idea':'Read the mathematical language',
      prompt:type==='terms'?'Which term matches this description?\n'+meaning:'Which explanation best describes this notation?\n'+notation,
      answer,steps:[notation+' illustrates '+term.toLowerCase()+'.',meaning],options:shuffled([answer,...alternatives.slice(0,3)])};
  }

  const quiz=$('quiz-play');
  let questions=[], question=0, score=0;
  const categories=['problems','terms','language'];
  function displayQuestion() {
    const p=questions[question];
    quiz.innerHTML='<p class="kicker">Question '+(question+1)+' of '+questions.length+' · '+html(p.topic)+'</p>'+
      '<h3 tabindex="-1">'+html(p.title)+'</h3><p class="quiz-prompt">'+html(p.prompt)+'</p><form id="quiz-answer">'+
      (p.options.length?'<fieldset class="quiz-options"><legend>Choose an answer</legend>'+p.options.map((option,i)=>
        '<label><input type="radio" name="choice" value="'+i+'" required> '+html(option)+'</label>').join('')+'</fieldset>':
        '<label>Your answer and reasoning<textarea required maxlength="4000" name="attempt"></textarea></label>')+
      '<button class="primary" type="submit">'+(p.options.length?'Check answer':'Reveal and compare')+'</button></form>'+
      '<div id="quiz-feedback"></div>';
    quiz.querySelector('h3').focus();
  }
  $('quiz-form').addEventListener('submit',event=>{
    event.preventDefault();
    const level=Number($('quiz-level').value), type=$('quiz-type').value, topic=$('quiz-topic').value;
    const topics=topic==='all'?shuffled(C.topics.map(row=>row[0])):[topic];
    const types=type==='mixed'?categories:[type];
    const combinations=types.flatMap(t=>topics.map(id=>[id,t]));
    const selection=topics.length>1&&type==='mixed'?
      shuffled(topics.slice(0,5).map((id,i)=>[id,categories[i%categories.length]])):
      shuffled(combinations).slice(0,5);
    questions=selection.map(([id,t])=>({...quizQuestion(id,level,t,Math.floor(Math.random()*4)),topic:id}));
    question=0;score=0;quiz.hidden=false;
    displayQuestion();
  });
  quiz.addEventListener('submit',event=>{
    event.preventDefault();
    const p=questions[question], data=new FormData(event.target), choice=data.get('choice'), attempt=data.get('attempt');
    if (attempt!==null&&!attempt.trim()) {
      event.target.elements.attempt.setCustomValidity('Write an answer before comparing.');
      event.target.elements.attempt.reportValidity();
      return;
    }
    const correct=choice!==null&&p.options[Number(choice)]===p.answer;
    event.target.querySelectorAll('input,textarea,button').forEach(el=>{el.disabled=true;});
    if(correct) score++;
    $('quiz-feedback').innerHTML='<div class="answer" tabindex="-1"><strong>'+(choice===null?'Compare your work':correct?'Correct':'Check the explanation')+
      '</strong>'+(choice===null?'<p class="attempt-copy">'+html(attempt)+'</p>':'')+'<p>'+html(p.answer)+'</p><ol class="steps">'+stepList(p.steps)+'</ol></div>'+
      (choice===null?'<p>Did your answer and reasoning agree with the solution?</p><div class="quiz-buttons"><button class="secondary" data-mark="yes">Yes, count it</button><button class="secondary" data-mark="no">I need another try</button></div>':
        '<button class="secondary" data-mark="next">Continue →</button>');
    $('quiz-feedback').querySelector('.answer').focus();
  });
  quiz.addEventListener('input',event=>{if(event.target.name==='attempt')event.target.setCustomValidity('');});
  quiz.addEventListener('click',event=>{
    const mark=event.target.dataset.mark;
    if(!mark)return;
    if(mark==='yes')score++;
    question++;
    if(question<questions.length)displayQuestion();
    else {
      quiz.innerHTML='<h3 tabindex="-1">Quiz complete</h3><p>You got '+score+' of '+questions.length+' correct, including any problems you marked yourself.</p><button class="secondary" type="button" data-restart>Back to quiz choices</button>';
      quiz.querySelector('h3').focus();
    }
  });
  quiz.addEventListener('click',event=>{if(event.target.hasAttribute('data-restart'))$('quiz-level').focus();});

  renderControls();
  updateScene();
  renderPractice();
  renderBook();
})();
