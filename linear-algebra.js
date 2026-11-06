(() => {
  'use strict';

  const M = window.EmberAlgebra;
  const C = window.EmberChapter;
  const L = window.EmberLearning;
  const $ = id => document.getElementById(id);
  const html = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
  const stepList = L.steps;
  const topicOptions = C.topics.map(([id,title]) => '<option value="'+id+'">'+id+' · '+html(title)+'</option>').join('');
  $('practice-topic').innerHTML = topicOptions;
  $('quiz-topic').innerHTML = '<option value="all">All chapter topics</option>'+topicOptions;
  $('book-topic').innerHTML = topicOptions+'<option value="review">Chapter 1 supplementary exercises</option>';

  function readAttempt(key) {
    try { return L.read(localStorage,key); } catch { return ''; }
  }
  function saveAttempt(key,value) {
    try { return L.save(localStorage,key,value); } catch { return false; }
  }

  function quadraticFamily() {
    const px = x => 56 + (x + .5) * 232;
    const py = y => 238 - (y + 1.2) * 40;
    const series = [[-2,'#9d2e42'],[-1,'#805523'],[1,'#226554'],[2,'#365d9f']];
    const paths = series.map(([t,color]) => {
      const points = Array.from({length:81},(_,i)=>{
        const x = -.5 + i/40;
        return px(x).toFixed(1)+','+py(1 + (1-t)*x + t*x*x).toFixed(1);
      });
      return '<polyline points="'+points.join(' ')+'" fill="none" stroke="'+color+'" stroke-width="2.5"/>';
    }).join('');
    const markers = [[0,1],[1,2]].map(([x,y])=>
      '<circle cx="'+px(x)+'" cy="'+py(y)+'" r="4" fill="#302822"/><text x="'+(px(x)+7)+'" y="'+(py(y)-8)+'">('+x+', '+y+')</text>').join('');
    const legend = series.map(([t,color],i)=>'<text x="'+(65 + i*116)+'" y="268" fill="'+color+'">● t = '+t+'</text>').join('');
    return '<figure class="solution-figure"><svg viewBox="0 0 570 286" role="img" aria-label="Four quadratic curves for t equal to negative two, negative one, one, and two, all passing through zero comma one and one comma two.">'+
      '<path d="M56 '+py(0)+' H520 M'+px(0)+' 18 V238" fill="none" stroke="#84756a"/>'+
      '<text x="530" y="'+(py(0)+4)+'">x</text><text x="'+(px(0)+7)+'" y="22">y</text>'+paths+markers+legend+
      '</svg><figcaption>Four curves from the same family. The marked points lie on all four.</figcaption></figure>';
  }

  function exerciseCard(problem,key,label,topic,id='') {
    const figure = problem.figure === 'quadratic-family' ? quadraticFamily() : '';
    const source = problem.source ? '<p class="caption"><a href="'+html(problem.source.url)+'">'+html(problem.source.name)+'</a></p>' : '';
    return L.card(problem,key,label,topic,readAttempt(key),id,figure+source);
  }
  for (const id of ['practice-list','book-list']) {
    $(id).addEventListener('input', event => {
      if (!event.target.matches('textarea[data-attempt]')) return;
      const saved=saveAttempt(event.target.dataset.attempt,event.target.value);
      const article=event.target.closest('article');
      L.syncAttempt(article);
      article.querySelector('.save-status').textContent=saved ? 'Saved on this browser.' : 'Saving is unavailable. Copy your writing before leaving or changing exercise sets.';
    });
  }
  const levels=['Easy','Beginner','Advanced','Very advanced'];
  function renderPractice() {
    const topic=$('practice-topic').value;
    $('practice-list').innerHTML=levels.map((label,i)=>exerciseCard(C.makeProblem(topic,i+1),'practice-'+topic+'-'+i,'Level '+(i+1)+' · '+label,topic)).join('');
    $('practice-list').querySelectorAll('article').forEach(L.syncAttempt);
  }
  const book=window.EmberTextbook;
  function renderBook() {
    const topic=$('book-topic').value;
    const range=book.index[topic];
    const rank=number=>number==='TF'?'999':number.replace(/^T/,'1000-');
    const entries=[...book.solutions[topic]].sort((a,b)=>rank(a.number).localeCompare(rank(b.number),'en',{numeric:true}));
    $('book-coverage').textContent='Printed '+range.pages+' · '+entries.length+' worked entries. TF means true or false, and T marks a technology exercise.';
    $('book-jump').innerHTML='<option value="">Choose a number</option>'+entries.map(p=>
      '<option value="'+html(p.number)+'">'+html(p.number+' · '+p.title)+'</option>').join('');
    $('book-list').innerHTML=entries.map(p=>{
      const oldIndex=book.legacyAttempts[topic]?.[p.number];
      const key=oldIndex===undefined ? 'book:'+topic+':'+p.number : 'book-'+topic+'-'+oldIndex;
      return exerciseCard(p,key,'Textbook · '+p.number,topic,'textbook-exercise-'+p.number);
    }).join('');
    $('book-list').querySelectorAll('article').forEach(L.syncAttempt);
  }
  $('practice-topic').addEventListener('change',renderPractice);
  $('book-topic').addEventListener('change',renderBook);
  $('book-jump').addEventListener('change',event=>{
    if (!event.target.value) return;
    const article=$('textbook-exercise-'+event.target.value);
    article.focus({preventScroll:true});
    article.scrollIntoView({block:'start'});
    event.target.value='';
  });

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
      '<div class="quiz-buttons"><button class="primary" type="submit">'+(p.options.length?'Check answer':'Reveal and compare')+'</button><button class="secondary" type="button" data-quiz-solution>Show solution without answering</button></div></form>'+
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
    revealQuestion(choice,attempt);
  });
  function revealQuestion(choice,attempt,skipped=false) {
    const p=questions[question];
    const correct=!skipped&&choice!==null&&p.options[Number(choice)]===p.answer;
    $('quiz-answer').querySelectorAll('input,textarea,button').forEach(el=>{el.disabled=true;});
    if(correct) score++;
    $('quiz-feedback').innerHTML='<div class="answer" tabindex="-1"><strong>'+(skipped?'Study the solution · no correct-answer credit':choice===null?'Compare your work':correct?'Correct':'Check the explanation')+
      '</strong>'+(choice===null&&attempt?'<p class="attempt-copy">'+html(attempt)+'</p>':'')+'<p class="worked-result">'+html(L.readable(p.answer))+'</p><ol class="steps">'+stepList(p.steps)+'</ol></div>'+
      (!skipped&&choice===null?'<p>Did your answer and reasoning agree with the solution?</p><div class="quiz-buttons"><button class="secondary" data-mark="yes">Yes, count it</button><button class="secondary" data-mark="no">I need another try</button></div>':
        '<button class="secondary" data-mark="next">Continue →</button>');
    $('quiz-feedback').querySelector('.answer').focus();
  }
  quiz.addEventListener('input',event=>{if(event.target.name==='attempt')event.target.setCustomValidity('');});
  quiz.addEventListener('click',event=>{
    if(event.target.hasAttribute('data-quiz-solution')){
      const data=new FormData($('quiz-answer'));
      revealQuestion(null,data.get('attempt'),true);
      return;
    }
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

  renderPractice();
  renderBook();
})();
