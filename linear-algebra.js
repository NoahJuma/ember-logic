(() => {
  'use strict';
  const M=window.EmberAlgebra,C=window.EmberChapter,L=window.EmberLearning,book=window.EmberTextbook;
  const tr=(en,sv)=>window.EmberMathI18n?.t(en,sv)??en;
  const $=id=>document.getElementById(id),html=L.escape,stepList=items=>L.steps(items);
  const drafts=new Map();
  function readAttempt(key){if(drafts.has(key))return drafts.get(key);try{return L.read(localStorage,key);}catch{return '';}}
  function saveAttempt(key,value){drafts.set(key,value);try{return L.save(localStorage,key,value);}catch{return false;}}
  function topicOptions(){
    const selected=Object.fromEntries(['practice-topic','quiz-topic','book-topic'].map(id=>[id,$(id).value]));
    const options=C.topics.map(([id,title])=>'<option value="'+id+'">'+id+' · '+html(title)+'</option>').join('');
    $('practice-topic').innerHTML=options;
    $('quiz-topic').innerHTML='<option value="all">'+tr('All chapter topics','Alla avsnitt i kapitlet')+'</option>'+options;
    $('book-topic').innerHTML=options+'<option value="review">'+tr('Chapter 1 supplementary exercises','Blandade uppgifter till kapitel 1')+'</option>';
    for(const [id,value]of Object.entries(selected))if(value)$(id).value=value;
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
    return '<figure class="solution-figure"><svg viewBox="0 0 570 286" role="img" aria-label="'+tr('Four quadratic curves for t equal to negative two, negative one, one, and two, all passing through zero comma one and one comma two.','Fyra andragradskurvor för t lika med minus två, minus ett, ett och två. Alla går genom punkterna (0,1) och (1,2).')+'">'+
      '<path d="M56 '+py(0)+' H520 M'+px(0)+' 18 V238" fill="none" stroke="#84756a"/>'+
      '<text x="530" y="'+(py(0)+4)+'">x</text><text x="'+(px(0)+7)+'" y="22">y</text>'+paths+markers+legend+
      '</svg><figcaption>'+tr('Four curves from the same family. The marked points lie on all four.','Fyra kurvor från samma familj. De markerade punkterna ligger på alla fyra.')+'</figcaption></figure>';
  }

  function exerciseCard(problem,key,label,topic,id=''){
    const figure=problem.figure==='quadratic-family'?quadraticFamily():'';
    const source=problem.source?'<p class="caption"><a href="'+html(problem.source.url)+'">'+html(problem.source.name)+'</a></p>':'';
    return L.card(problem,key,label,topic,readAttempt(key),id,figure+source);
  }
  for(const id of ['practice-list','book-list'])$(id).addEventListener('input',event=>{
    if(!event.target.matches('textarea[data-attempt]'))return;
    const saved=saveAttempt(event.target.dataset.attempt,event.target.value),article=event.target.closest('article');
    L.syncAttempt(article);
    article.querySelector('.save-status').textContent=saved?tr('Saved on this browser.','Sparat i denna webbläsare.'):tr('Saving is unavailable. Copy your writing before leaving or changing exercise sets.','Lagring är inte tillgänglig. Kopiera din text innan du lämnar sidan. Ditt utkast finns kvar när du byter språk eller övningsavsnitt här.');
  });
  const levels=()=>[tr('Easy','Lätt'),tr('Beginner','Nybörjare'),tr('Advanced','Avancerad'),tr('Very advanced','Mycket avancerad')];
  function renderPractice(){const topic=$('practice-topic').value;$('practice-list').innerHTML=levels().map((label,i)=>exerciseCard(C.makeProblem(topic,i+1),'practice-'+topic+'-'+i,tr('Level ','Nivå ')+(i+1)+' · '+label,topic)).join('');$('practice-list').querySelectorAll('article').forEach(L.syncAttempt);}
  function renderBook(){
    const topic=$('book-topic').value,range=book.index[topic];
    const rank=number=>number==='TF'?'999':number.replace(/^T/,'1000-');
    const entries=[...book.solutions[topic]].sort((a,b)=>rank(a.number).localeCompare(rank(b.number),'en',{numeric:true}));
    $('book-coverage').textContent=tr('Printed ','Tryckta ')+range.pages+' · '+entries.length+tr(' worked entries. TF means true or false, and T marks a technology exercise.',' lösta uppgifter. TF betyder sant eller falskt och T markerar en datoruppgift.');
    $('book-jump').innerHTML='<option value="">'+tr('Choose a number','Välj ett nummer')+'</option>'+entries.map(p=>'<option value="'+html(p.number)+'">'+html(p.number+' · '+p.title)+'</option>').join('');
    $('book-list').innerHTML=entries.map(p=>{const oldIndex=book.legacyAttempts[topic]?.[p.number],key=oldIndex===undefined?'book:'+topic+':'+p.number:'book-'+topic+'-'+oldIndex;return exerciseCard(p,key,tr('Textbook · ','Lärobok · ')+p.number,topic,'textbook-exercise-'+p.number);}).join('');
    $('book-list').querySelectorAll('article').forEach(L.syncAttempt);
  }
  $('practice-topic').addEventListener('change',renderPractice);$('book-topic').addEventListener('change',renderBook);
  $('book-jump').addEventListener('change',event=>{if(!event.target.value)return;const article=$('textbook-exercise-'+event.target.value);article.focus({preventScroll:true});article.scrollIntoView({block:'start'});event.target.value='';});
  function shuffled(items){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
  // Keep quiz identities and option order independent of their translated text.
  function quizRecipe(topic,level,type,k){
    const topicIndex=C.topics.findIndex(row=>row[0]===topic),recipe={topic,level,type,k,choices:[]};
    if(type==='problems')return recipe;
    const field=type==='terms'?0:2,seen=new Set([C.glossary[topicIndex][level-1][field]]),alternatives=[];
    C.glossary.forEach((rows,i)=>rows.forEach((row,j)=>{if((i===topicIndex&&j!==level-1)||(i!==topicIndex&&j===level-1)){if(!seen.has(row[field])){seen.add(row[field]);alternatives.push([i,j]);}}}));
    recipe.choices=shuffled([[topicIndex,level-1],...shuffled(alternatives).slice(0,3)]);return recipe;
  }
  function quizQuestion(recipe){
    const {topic,level,type,k}=recipe;
    if(type==='problems')return {...C.makeProblem(topic,level,k),topic,options:[]};
    const i=C.topics.findIndex(row=>row[0]===topic),[term,notation,meaning]=C.glossary[i][level-1],field=type==='terms'?0:2;
    return {topic,title:type==='terms'?tr('Name the idea','Namnge begreppet'):tr('Read the mathematical language','Tolka det matematiska språket'),
      prompt:type==='terms'?tr('Which term matches this description?\n','Vilket begrepp passar till denna beskrivning?\n')+meaning:tr('Which explanation best describes this notation?\n','Vilken förklaring beskriver denna notation bäst?\n')+notation,
      answer:type==='terms'?term:meaning,steps:[notation+tr(' illustrates ',' visar ')+term.toLowerCase()+'.',meaning],options:recipe.choices.map(([a,b])=>C.glossary[a][b][field])};
  }
  const quiz=$('quiz-play'),categories=['problems','terms','language'];
  let questions=[],question=0,score=0,completed=false;
  let current={draft:'',choice:null,revealed:false,skipped:false,correct:false};
  function displayQuestion(focus=true){
    if(completed){renderComplete(focus);return;}if(!questions.length)return;
    const p=quizQuestion(questions[question]);
    quiz.innerHTML='<p class="kicker">'+tr('Question ','Fråga ')+(question+1)+tr(' of ',' av ')+questions.length+' · '+html(p.topic)+'</p><h3 tabindex="-1">'+html(p.title)+'</h3><p class="quiz-prompt">'+html(p.prompt)+'</p><form id="quiz-answer">'+
      (p.options.length?'<fieldset class="quiz-options"><legend>'+tr('Choose an answer','Välj ett svar')+'</legend>'+p.options.map((option,i)=>'<label><input type="radio" name="choice" value="'+i+'" required'+(String(current.choice)===String(i)?' checked':'')+'> '+html(option)+'</label>').join('')+'</fieldset>':'<label>'+tr('Your answer and reasoning','Ditt svar och din motivering')+'<textarea required maxlength="4000" name="attempt">'+html(current.draft)+'</textarea></label>')+
      '<div class="quiz-buttons"><button class="primary" type="submit">'+(p.options.length?tr('Check answer','Kontrollera svaret'):tr('Reveal and compare','Visa och jämför'))+'</button><button class="secondary" type="button" data-quiz-solution>'+tr('Show solution without answering','Visa lösningen utan att svara')+'</button></div></form><div id="quiz-feedback"></div>';
    if(current.revealed)renderFeedback(false);if(focus)quiz.querySelector('h3').focus();
  }
  $('quiz-form').addEventListener('submit',event=>{
    event.preventDefault();const level=Number($('quiz-level').value),type=$('quiz-type').value,topic=$('quiz-topic').value;
    const topics=topic==='all'?shuffled(C.topics.map(row=>row[0])):[topic],types=type==='mixed'?categories:[type],combinations=types.flatMap(t=>topics.map(id=>[id,t]));
    const selection=topics.length>1&&type==='mixed'?shuffled(topics.slice(0,5).map((id,i)=>[id,categories[i%categories.length]])):shuffled(combinations).slice(0,5);
    questions=selection.map(([id,t])=>quizRecipe(id,level,t,Math.floor(Math.random()*4)));question=0;score=0;completed=false;current={draft:'',choice:null,revealed:false,skipped:false,correct:false};quiz.hidden=false;displayQuestion();
  });
  quiz.addEventListener('submit',event=>{
    event.preventDefault();const data=new FormData(event.target),choice=data.get('choice'),attempt=data.get('attempt');
    if(attempt!==null&&!attempt.trim()){event.target.elements.attempt.setCustomValidity(tr('Write an answer before comparing.','Skriv ett svar innan du jämför.'));event.target.elements.attempt.reportValidity();return;}
    revealQuestion(choice,attempt);
  });
  function revealQuestion(choice,attempt,skipped=false){
    if(current.revealed)return;const p=quizQuestion(questions[question]);current={...current,choice,draft:attempt??current.draft,revealed:true,skipped,correct:!skipped&&choice!==null&&p.options[Number(choice)]===p.answer};if(current.correct)score++;renderFeedback(true);
  }
  function renderFeedback(focus){
    const p=quizQuestion(questions[question]),{skipped,choice,draft,correct}=current;
    $('quiz-answer').querySelectorAll('input,textarea,button').forEach(el=>{el.disabled=true;});
    $('quiz-feedback').innerHTML='<div class="answer" tabindex="-1"><strong>'+(skipped?tr('Study the solution · no correct-answer credit','Studera lösningen · ingen poäng för rätt svar'):choice===null?tr('Compare your work','Jämför ditt arbete'):correct?tr('Correct','Rätt'):tr('Check the explanation','Läs förklaringen'))+'</strong>'+(choice===null&&draft?'<p class="attempt-copy">'+html(draft)+'</p>':'')+'<p class="worked-result">'+html(L.readable(p.answer))+'</p><ol class="steps">'+stepList(p.steps)+'</ol></div>'+
      (!skipped&&choice===null?'<p>'+tr('Did your answer and reasoning agree with the solution?','Stämde ditt svar och din motivering med lösningen?')+'</p><div class="quiz-buttons"><button class="secondary" data-mark="yes">'+tr('Yes, count it','Ja, räkna det som rätt')+'</button><button class="secondary" data-mark="no">'+tr('I need another try','Jag behöver öva mer')+'</button></div>':'<button class="secondary" data-mark="next">'+tr('Continue →','Fortsätt →')+'</button>');
    if(focus)$('quiz-feedback').querySelector('.answer').focus();
  }
  quiz.addEventListener('input',event=>{if(event.target.name==='attempt'){event.target.setCustomValidity('');current.draft=event.target.value;}if(event.target.name==='choice')current.choice=event.target.value;});
  quiz.addEventListener('change',event=>{if(event.target.name==='choice')current.choice=event.target.value;});
  function renderComplete(focus=true){quiz.innerHTML='<h3 tabindex="-1">'+tr('Quiz complete','Quizet är klart')+'</h3><p>'+tr('You got ','Du fick ')+score+tr(' of ',' av ')+questions.length+tr(' correct, including any problems you marked yourself.',' rätt, inklusive problem som du bedömde själv.')+'</p><button class="secondary" type="button" data-restart>'+tr('Back to quiz choices','Tillbaka till quizinställningarna')+'</button>';if(focus)quiz.querySelector('h3').focus();}
  quiz.addEventListener('click',event=>{
    if(event.target.hasAttribute('data-quiz-solution')){const data=new FormData($('quiz-answer'));revealQuestion(data.get('choice'),data.get('attempt'),true);return;}
    const mark=event.target.dataset.mark;if(!mark||!current.revealed)return;if(mark==='yes')score++;question++;
    if(question<questions.length){current={draft:'',choice:null,revealed:false,skipped:false,correct:false};displayQuestion();}else{completed=true;renderComplete();}
  });
  quiz.addEventListener('click',event=>{if(event.target.hasAttribute('data-restart'))$('quiz-level').focus();});
  document.addEventListener('mathlanguagechange',()=>{
    const panels=new Map();
    for(const article of document.querySelectorAll('#practice-list>article,#book-list>article')){const input=article.querySelector('textarea[data-attempt]');drafts.set(input.dataset.attempt,input.value);panels.set(input.dataset.attempt,Array.from(article.querySelectorAll('details'),d=>d.open));}
    const active=document.activeElement,focusId=active?.id,selection=active?.tagName==='TEXTAREA'?[active.selectionStart,active.selectionEnd]:null;
    if(!quiz.hidden&&!completed){const form=$('quiz-answer');if(form){const data=new FormData(form);if(form.elements.attempt)current.draft=form.elements.attempt.value;if(!current.revealed)current.choice=data.get('choice');}}
    topicOptions();renderPractice();renderBook();
    for(const article of document.querySelectorAll('#practice-list>article,#book-list>article')){const input=article.querySelector('textarea[data-attempt]'),saved=panels.get(input.dataset.attempt);if(saved)article.querySelectorAll('details').forEach((d,i)=>{d.open=saved[i]??false;});}
    if(!quiz.hidden)displayQuestion(false);
    if(focusId&&$(focusId)){const node=$(focusId);node.focus({preventScroll:true});if(selection&&node.setSelectionRange)node.setSelectionRange(...selection);}
  });
  topicOptions();renderPractice();renderBook();
})();
