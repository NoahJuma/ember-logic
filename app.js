'use strict';
const L=window.EmberLogic;
const main=document.getElementById('main');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let saved={visits:{},stats:{},attempts:0,correct:0};
try{const p=JSON.parse(localStorage.getItem('ember-logic-v1'));if(p&&typeof p==='object')saved={...saved,...p,visits:p.visits||{},stats:p.stats||{}};}catch{}
let view='gates',gateType='AND',a=1,b=0,gateAnswer=null;
let expression='(A OR B) AND NOT C',exprValues={A:1,B:0,C:1,D:0},exprAst=L.parse(expression),exprError='',comparison='',compareResult='';
let ffType='D',ffQ=0,ffX=1,ffY=0,ffClk=0,ffEvents=[],ffMessage='Q starts at 0. Change D, then raise the clock to capture it.',ffTime=0;
let quizTopic='All topics',quizId=-1,quizSelected=null,quizChecked=false,quizHint=false,quizHistory=[];
function save(){try{localStorage.setItem('ember-logic-v1',JSON.stringify(saved));}catch{}updateProgress();}
function mark(key){saved.visits[key]=true;save();}
function updateProgress(){const n=['AND','OR','XOR','NOT','NAND','NOR','XNOR','circuit','boolean','memory','numbers','systems','ascii','training','binary','media'].filter(k=>saved.visits[k]).length;document.getElementById('journey-count').textContent=n+' / 16';document.getElementById('journey-fill').style.width=(n/16*100)+'%';document.getElementById('journey-text').innerHTML=n===16?'Every lab explored.<br>Keep practising to make it stick.':n>0?'You’re connecting the dots.<br>Keep exploring the workbench.':'Try a gate. Follow a signal.<br>Build your intuition.';}
function bit(v){return `<span class="table-bit ${v===1?'on':''}">${v===null?'?':v}</span>`;}
function switchBit(label,value,action){return `<button class="bit-switch" data-action="${action}" aria-label="Toggle input ${label}" aria-pressed="${!!value}"><strong>${label}</strong><span class="switch-track" aria-hidden="true"></span><span class="bit-value">${value}</span></button>`;}
function intro(k,title,desc,n){return `<section class="page-intro"><div><span class="eyebrow">${k}</span><h1>${title}</h1><p class="intro-text">${desc}</p></div><span class="chapter-label"><b>${n}</b> EXPLORE · UNDERSTAND · PRACTISE</span></section>`;}
function glyph(type){return window.EmberCircuitUI.glyph(type);}
function gateCircuit(){const out=L.gate(gateType,a,b),single=gateType==='NOT',ay=single?130:108;return `<svg class="circuit-svg" viewBox="0 0 620 255" role="img" aria-label="${gateType} gate. Input A ${a}${single?'':', input B '+b}. Output ${out}."><path class="signal ${a?'on flow':''}" d="M82 ${ay} H230"/><circle class="signal-dot ${a?'on':''}" cx="82" cy="${ay}" r="5"/><text class="wire-label" x="62" y="${ay+4}" text-anchor="end">A = ${a}</text>${single?'':`<path class="signal ${b?'on flow':''}" d="M82 152 H230"/><circle class="signal-dot ${b?'on':''}" cx="82" cy="152" r="5"/><text class="wire-label" x="62" y="156" text-anchor="end">B = ${b}</text>`}<g transform="translate(230,70)">${window.EmberCircuitUI.glyph(gateType,'width="168" height="120"')}</g><text class="gate-word" x="${single?290:310}" y="${single?215:218}" text-anchor="middle">${gateType}</text><path class="signal ${out?'on flow':''}" d="M398 130 H494"/>${out?'<circle class="bulb-glow" cx="516" cy="130" r="42"/>':''}<circle class="bulb-core ${out?'on':''}" cx="516" cy="127" r="22"/><path d="M505 150 H527 M506 156 H526 M510 162 H522" stroke="${out?'#b16b28':'#a89b88'}" stroke-width="3" stroke-linecap="round"/><text class="wire-label" x="516" y="202" text-anchor="middle">Y = ${out} · ${out?'ON':'OFF'}</text></svg>`;}
function renderGates(){const g=L.gates[gateType],single=gateType==='NOT',out=L.gate(gateType,a,b),rows=single?[[0],[1]]:[[0,0],[0,1],[1,0],[1,1]],guess=single?0:L.gate(gateType,1,1);return intro('01 / GATE PLAYGROUND','Make logic <em>click.</em>','Flip a switch. Follow the signal. See the rule come to life.','01')+
`<div class="gate-tabs" role="group" aria-label="Choose a logic gate">${Object.values(L.gates).map(x=>`<button class="gate-tab ${gateType===x.name?'active':''}" data-gate="${x.name}" aria-pressed="${gateType===x.name}">${glyph(x.name,true)}<span><strong>${x.name}</strong><small>${x.tag}</small></span></button>`).join('')}</div>
<div class="two-column"><section class="card"><div class="card-heading"><div><h2>${g.title}</h2><p>${g.rule}</p></div><span class="badge green"><span class="status-dot"></span> LIVE CIRCUIT</span></div><div class="lab-canvas"><span class="canvas-label">FOLLOW THE SIGNAL →</span>${gateCircuit()}</div><div class="switch-row"><div class="input-group">${switchBit('A',a,'gate-a')}${single?'':switchBit('B',b,'gate-b')}</div><div class="output-chip"><span>Output Y</span><span class="output-number ${out?'on':''}" aria-live="polite">${out}</span></div></div><div class="insight"><span class="spark">✧</span><span><strong>The little thing to remember</strong><br>${g.memory}</span></div></section>
<section class="card truth-panel"><div class="section-mini">EVERY POSSIBLE COMBINATION</div><h2>The truth table</h2><p class="subtle">Your switches highlight the current row.</p><table aria-label="${gateType} truth table"><thead><tr><th>A</th>${single?'':'<th>B</th>'}<th>Y <span aria-hidden="true">↗</span></th></tr></thead><tbody>${rows.map(r=>`<tr class="truth-row ${r[0]===a&&(single||r[1]===b)?'current':''}" data-row="${r.join(',')}" tabindex="0" role="button" aria-label="Set A to ${r[0]}${single?'':', B to '+r[1]}"><td>${r[0]}</td>${single?'':`<td>${r[1]}</td>`}<td>${bit(L.gate(gateType,r[0],r[1]))}</td></tr>`).join('')}</tbody></table><div class="truth-note"><span class="legend-dot"></span> Tap any row to try it in the circuit.</div><div class="formula-box">Y = ${single?'¬A':`A ${g.symbol} B`}<small>${single?'Also written as A′ or NOT A':gateType==='AND'?'Also written as A AND B or AB':gateType==='OR'?'Boolean + means OR, not ordinary addition':gateType==='XOR'?'⊕ means exclusive OR':gateType==='NAND'?'NAND = NOT (A AND B)':gateType==='NOR'?'NOR = NOT (A OR B)':'XNOR = NOT (A XOR B)'}</small></div></section></div>
<div class="bottom-grid"><section class="card concept-card"><div class="analogy-icon" aria-hidden="true">${g.icon}</div><div><span class="eyebrow">THINK OF IT LIKE THIS</span><h3>${g.analogy}</h3><p>${g.analogyText}</p></div></section><section class="card try-card"><span class="eyebrow">A 10-SECOND BRAIN CHECK</span><h3>Predict it before you flip it.</h3><p>${single?'If A is 1, what will Y be?':'If both inputs are 1, what will Y be?'}</p><div class="try-actions"><button class="small-button" data-gate-guess="0">Y = 0</button><button class="small-button" data-gate-guess="1">Y = 1</button>${gateAnswer===null?'':`<span class="inline-result" role="status">${gateAnswer===guess?'Exactly!':'Try again.'} ${gateAnswer===guess?single?'NOT reverses the bit.':gateType+' gives '+guess+' for inputs 11.':''}</span>`}</div></section></div>
<div class="lesson-path"><button data-view="circuit"><small>YOUR NEXT LITTLE CLICK</small><strong>Combine up to 10 gates into a circuit →</strong></button><button data-view="practice"><small>FEELING READY?</small><strong>Test your gate intuition →</strong></button></div>`;}
function exprTable(){const vars=L.variables(exprAst);return `<table aria-label="Expression truth table"><thead><tr>${vars.map(v=>`<th>${v}</th>`).join('')}<th>Y</th></tr></thead><tbody>${L.table(exprAst).map(row=>`<tr class="truth-row ${vars.every(v=>row.values[v]===exprValues[v])?'current':''}" tabindex="0" role="button" data-expr-row="${esc(JSON.stringify(row.values))}" aria-label="Try ${Object.entries(row.values).map(([k,v])=>k+'='+v).join(', ')||'constant expression'}"><td${vars.length?'':' style="display:none"'}>${vars.length?row.values[vars[0]]:''}</td>${vars.slice(1).map(v=>`<td>${row.values[v]}</td>`).join('')}<td>${bit(row.out)}</td></tr>`).join('')}</tbody></table>`;}
function laws(){return `<div class="law-grid"><div class="law"><strong>Identity / domination</strong><code>A · 1 = A &nbsp; A + 0 = A<br>A · 0 = 0 &nbsp; A + 1 = 1</code></div><div class="law"><strong>Complement / repetition</strong><code>A · ¬A = 0 &nbsp; A + ¬A = 1<br>A · A = A &nbsp; A + A = A</code></div><div class="law"><strong>De Morgan’s laws</strong><code>¬(A · B) = ¬A + ¬B<br>¬(A + B) = ¬A · ¬B</code></div><div class="law"><strong>Absorption / XOR</strong><code>A + A · B = A<br>A ⊕ A = 0 &nbsp; A ⊕ 1 = ¬A</code></div></div>`;}
function renderBoolean(){const vars=L.variables(exprAst),out=L.evaluate(exprAst,exprValues),steps=L.steps(exprAst,exprValues);return intro('03 / BOOLEAN STUDIO','Untangle the <em>expression.</em>','Turn a wall of symbols into a sequence of small, easy decisions.','03')+
`<div class="two-column"><section class="card"><div class="card-heading"><div><h2>One operation at a time.</h2><p>Write an expression. Watch its inside-out solution.</p></div><span class="badge">${L.count(exprAst)} / 10 OPERATIONS</span></div><div class="panel-body"><form id="expression-form"><label class="input-label" for="expression">Your Boolean expression</label><div class="expression-form"><input class="expression-input" id="expression" name="expression" value="${esc(expression)}" maxlength="600" spellcheck="false" autocomplete="off"><button class="primary" type="submit">Trace →</button></div></form><div class="syntax">Use A, B, C, D, 0, 1 · AND, OR, XOR, NOT, NAND, NOR, XNOR · up to 10 operations.<br>Order here: parentheses → NOT → AND/NAND → XOR/XNOR → OR/NOR. Equal levels run left to right. Use parentheses for mixed gates. Symbols &amp;, *, +, |, ^, ! and straight apostrophe are also accepted.</div><div class="examples"><button class="example-chip" data-example="(A OR B) AND NOT C">Grouped gates</button><button class="example-chip" data-example="NOT (A AND B)">De Morgan’s law</button><button class="example-chip" data-example="A OR (A AND B)">Absorption</button><button class="example-chip" data-example="A XOR B XOR C">Three-input XOR</button><button class="example-chip" data-example="(A NAND B) AND (C NOR D)">NAND + NOR</button></div>${exprError?`<div class="error" role="alert">${esc(exprError)} The last valid trace stays below.</div>`:''}
<div class="evaluation-controls"><div class="input-group">${vars.map(v=>switchBit(v,exprValues[v],'expr-'+v)).join('')||'<span class="subtle">A constant expression needs no input switches.</span>'}</div><div class="solution-line"><span>Currently</span><code>${esc(L.format(exprAst))}</code><span class="spacer"></span>${bit(out)}</div><div class="section-mini">FOLLOW THE SOLUTION</div><div class="step-list">${steps.map((s,i)=>`<div class="eval-step"><span class="step-number">${i+1}</span><div><code>${esc(s.expression)}</code><div class="subtle">${esc(s.operation)} = ${s.out}</div></div>${bit(s.out)}</div>`).join('')||`<div class="eval-step">Read ${esc(L.format(exprAst))} directly. ${bit(out)}</div>`}</div><div class="insight" style="border-radius:7px;padding:13px"><span class="spark">✧</span><span>Solve the innermost parts first. Each intermediate result becomes an input to the next gate.</span></div></div></div></section>
<section class="card truth-panel"><div class="section-mini">CHECK EVERY INPUT</div><h2>No combination missed.</h2><p class="subtle">${2**vars.length} possible ${vars.length?'input combinations':'result'}. Tap a row to trace it.</p>${exprTable()}<div class="formula-box">Y = ${out}<small>for ${vars.map(v=>v+' = '+exprValues[v]).join(', ')||'this constant'}</small></div><details class="disclosure"><summary>Why does the order matter?</summary><p>For A = 1, B = 0, C = 0, <strong>A OR B AND C</strong> gives 1: calculate B AND C first. <strong>(A OR B) AND C</strong> gives 0. Parentheses can change the function.</p><p>Precedence for XOR varies between courses. This kit groups AND/NAND before XOR/XNOR before OR/NOR. Operations on the same level run left to right. NAND, NOR, and XNOR are not associative: changing their grouping can change the result. Use parentheses to make your intended grouping clear.</p></details></section></div>
<section class="card full-width"><div class="card-heading"><div><h2>Can you make it simpler?</h2><p>Use a law, propose an equivalent expression, then check every combination.</p></div><span class="badge">EQUIVALENCE CHECK</span></div><div class="panel-body"><label class="input-label" for="comparison">Your simplified version of the expression above</label><form id="comparison-form" class="comparison"><input id="comparison" class="expression-input" value="${esc(comparison)}" placeholder="For A OR (A AND B), try A" maxlength="600" spellcheck="false" autocomplete="off"><button class="secondary" type="submit">Check equivalence →</button></form>${compareResult}<details class="disclosure"><summary>Open the Boolean law toolbox</summary>${laws()}<p>Example: A + A · B = A · 1 + A · B = A · (1 + B) = A · 1 = A. Factor A, then use domination and identity.</p><p>This checker proves equivalence for the supported variables; it does not claim your expression has the smallest possible form.</p></details></div></section>`;}
const ffMeta={D:{name:'D',label:'Data',inputs:['D'],rule:'At ↑, Q takes the value of D.',memory:'Think of a camera: D is the scene, the rising edge is the shutter, and Q is the photo.',table:[['0','0'],['1','1']],header:['D','Q next'],caption:'D is copied only on the rising edge.'},T:{name:'T',label:'Toggle',inputs:['T'],rule:'At ↑, T = 1 toggles Q; T = 0 holds Q.',memory:'Think of a click pen: each rising edge with T = 1 flips between the two states.',table:[['0','Q (hold)'],['1','¬Q (toggle)']],header:['T','Q next'],caption:'Toggle means 0 becomes 1, and 1 becomes 0.'},JK:{name:'JK',label:'Set, reset, toggle',inputs:['J','K'],rule:'At ↑: 00 holds, 01 resets, 10 sets, 11 toggles.',memory:'J asks for 1, K asks for 0. If both ask together, JK toggles the stored bit.',table:[['0','0','Q (hold)'],['0','1','0 (reset)'],['1','0','1 (set)'],['1','1','¬Q (toggle)']],header:['J','K','Q next'],caption:'Unlike SR, JK has a defined toggle action for 11.'},SR:{name:'SR',label:'Set & reset',inputs:['S','R'],rule:'At ↑: 00 holds, 01 resets, 10 sets. Avoid 11.',memory:'S sets Q to 1. R resets Q to 0. For this active-high SR model, asserting both is forbidden.',table:[['0','0','Q (hold)'],['0','1','0 (reset)'],['1','0','1 (set)'],['1','1','Invalid']],header:['S','R','Q next'],caption:'This is the active-high, clocked SR model.'}};
function resetFF(){ffQ=0;ffX=1;ffY=0;ffClk=0;ffTime=0;ffEvents=[{t:0,clk:0,q:0,x:1,y:0}];ffMessage='Q is initialized to 0 in this model. Change an input, then raise the clock.';}
resetFF();
function recordFF(){ffTime++;ffEvents.push({t:ffTime,clk:ffClk,q:ffQ,x:ffX,y:ffY});if(ffEvents.length>11)ffEvents.shift();}
function ffDiagram(){const m=ffMeta[ffType],two=m.inputs.length===2,known=ffQ!==null;return `<svg class="circuit-svg" viewBox="0 0 620 255" role="img" aria-label="${ffType} flip-flop. Clock ${ffClk}, output Q ${known?ffQ:'unknown'}."><path class="signal ${ffX?'on flow':''}" d="M96 85 H245"/><text class="wire-label" x="83" y="89" text-anchor="end">${m.inputs[0]} = ${ffX}</text>${two?`<path class="signal ${ffY?'on flow':''}" d="M96 130 H245"/><text class="wire-label" x="83" y="134" text-anchor="end">${m.inputs[1]} = ${ffY}</text>`:''}<path class="signal ${ffClk?'on':''}" d="M96 180 H245"/><text class="wire-label" x="83" y="184" text-anchor="end">CLK = ${ffClk}</text><rect x="245" y="52" width="126" height="156" rx="9" class="gate-shape"/><path class="signal" d="M245 171 L258 180 L245 189"/><text class="gate-word" x="308" y="113" text-anchor="middle">${ffType}</text><text class="wire-label" x="308" y="140" text-anchor="middle">stores 1 bit</text><path class="signal ${ffQ===1?'on flow':''}" d="M371 90 H497"/><text class="wire-label" x="385" y="78">Q</text><circle class="bulb-core ${ffQ===1?'on':''}" cx="516" cy="90" r="20"/><text class="gate-word" x="516" y="97" text-anchor="middle">${known?ffQ:'?'}</text><path class="signal ${ffQ===0?'on flow':''}" d="M371 171 H497"/><text class="wire-label" x="385" y="159">¬Q</text><circle class="bulb-core ${ffQ===0?'on':''}" cx="516" cy="171" r="20"/><text class="gate-word" x="516" y="178" text-anchor="middle">${known?1-ffQ:'?'}</text></svg>`;}
function waveform(){const m=ffMeta[ffType],events=ffEvents,rows=[['CLK','clk'],[m.inputs[0],'x'],...(m.inputs.length===2?[[m.inputs[1],'y']]:[]),['Q','q']],w=850,height=rows.length*54+38,start=70,step=(w-start-20)/Math.max(events.length,6);return `<svg viewBox="0 0 ${w} ${height}" role="img" aria-label="Timing diagram showing the last ${events.length} input and clock events. Q updates at rising clock edges.">${events.map((e,i)=>`<line class="wave-grid" x1="${start+i*step}" x2="${start+i*step}" y1="10" y2="${height-23}"/><text class="wave-label" x="${start+i*step+3}" y="${height-5}">${e.t}</text>${i>0&&e.clk===1&&events[i-1].clk===0?`<text x="${start+i*step-5}" y="10" fill="#b34d2b" font-size="11">↑</text>`:''}`).join('')}${rows.map(([name,key],r)=>{const base=30+r*54;let path='',prev=null;events.forEach((e,i)=>{const x=start+i*step,y=base+(e[key]===1?0:23);if(e[key]===null){prev=null;return;}path+=(prev===null?'M':'L')+x+' '+(prev===null?y:prev)+' L'+x+' '+y+' H'+(x+step);prev=y;});return `<text class="wave-label" x="12" y="${base+16}">${name}</text><path class="wave-line ${key==='q'?'q-wave':''}" d="${path}"/>${events.map((e,i)=>e[key]===null?`<text class="wave-label" x="${start+i*step+step/2}" y="${base+17}">?</text>`:'').join('')}`;}).join('')}</svg>`;}
function renderMemory(){const m=ffMeta[ffType],next=L.flip(ffType,ffQ,ffX,ffY);return intro('04 / MEMORY LAB','Give your circuit <em>a memory.</em>','Gates react now. Flip-flops remember. The clock decides when to update.','04')+
`<div class="type-tabs" role="group" aria-label="Flip-flop type">${Object.values(ffMeta).map(x=>`<button class="type-tab ${ffType===x.name?'active':''}" aria-pressed="${ffType===x.name}" data-ff="${x.name}"><strong>${x.name}</strong> <span class="subtle">/ ${x.label}</span></button>`).join('')}</div>
<div class="two-column"><section class="card"><div class="card-heading"><div><h2>${ffType === 'SR' ? 'An' : 'A'} ${ffType} flip-flop, one edge at a time.</h2><p>${m.rule}</p></div><span class="badge">↑ RISING EDGE</span></div><div class="lab-canvas"><span class="canvas-label">THE TRIANGLE MARKS A CLOCK INPUT</span>${ffDiagram()}</div><div class="memory-controls"><div class="input-group">${switchBit(m.inputs[0],ffX,'ff-x')}${m.inputs.length===2?switchBit(m.inputs[1],ffY,'ff-y'):''}</div><button class="clock-button" data-action="clock">${ffClk?'↓ Lower clock to 0':'↑ Raise clock to 1'}</button><span class="clock-state">CLK = ${ffClk}</span></div><div class="insight" role="status"><span class="spark">✧</span><span>${ffMessage}</span></div></section>
<section class="card truth-panel"><div class="section-mini">AT THE NEXT RISING EDGE</div><h2>The memory rule</h2><p class="mode-note">Ideal synchronous model · active-high inputs · no asynchronous set/reset.</p><table class="memory-table" aria-label="${ffType} next-state table"><thead><tr>${m.header.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${m.table.map(r=>`<tr class="${Number(r[0])===ffX&&(m.inputs.length===1||Number(r[1])===ffY)?'current':''}">${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table><div class="formula-box">Q = ${ffQ===null?'?':ffQ} <span style="color:var(--muted)">→</span> ${next===null?'?':next}<small>current state → state after the next ↑</small></div><p class="subtle" style="margin-top:15px">${m.caption}</p><button class="secondary" data-action="reset-ff">Initialize Q to 0</button><div class="memory-lesson">${m.memory}</div></section></div>
<section class="card full-width waveform"><div class="card-heading" style="padding:0 0 15px"><div><h2>Watch time tell the story.</h2><p>Each input change or clock transition adds an event. Q reacts only at ↑.</p></div><span class="badge">LAST 11 EVENTS</span></div><div class="waveform-scroll" tabindex="0" role="region" aria-label="Timing diagram; scroll horizontally on small screens">${waveform()}</div><div class="wave-key"><span>Clock &amp; inputs</span><span>Stored output Q</span></div><p class="subtle" style="margin:12px 0 0">Numbers are event indices, not physical time. Inputs are held steady for each simulated edge. “?” means unknown after an invalid SR input; clock in S=1, R=0 or S=0, R=1 to recover.</p></section>
<div class="bottom-grid"><section class="card concept-card"><div class="analogy-icon">↑</div><div><span class="eyebrow">THE EXAM-SAVING DISTINCTION</span><h3>An edge is a moment.</h3><p>A flip-flop samples on a clock transition. A level-sensitive latch can follow its input while its enable is active. This lab models flip-flops.</p></div></section><section class="card try-card"><span class="eyebrow">TRY THIS EXPERIMENT</span><h3>${ffType==='D'?'Make D move. Keep Q still.':ffType==='T'?'See a bit change its mind.':ffType==='JK'?'Try both inputs ON.':'Set it. Then let it remember.'}</h3><p>${ffType==='D'?'Raise the clock, then change D while CLK = 1. Q holds. Lower and raise CLK again to capture the new D.':ffType==='T'?'Keep T = 1. Lower and raise the clock twice. Q toggles at each rising edge.':ffType==='JK'?'Set J = K = 1. Lower and raise CLK repeatedly. Q toggles once per rising edge.': 'Clock in S = 1, R = 0 to set Q. Change both inputs to 0, then clock again. Q stays 1.'}</p><button class="small-button" data-view="practice">Practise memory questions →</button></section></div>`;}
const questions=[
{topic:'Gates',q:'Both inputs are 1. Which gate outputs 0?',code:'A = 1, B = 1',choices:['AND','OR','XOR','All three'],correct:2,why:'XOR is 1 only when its two inputs differ. With 1 and 1, XOR gives 0. AND and OR both give 1.',hint:'Which gate asks whether the inputs are different?'},
{topic:'Gates',q:'What is the output of this AND gate?',code:'0 AND 1 = ?',choices:['0','1'],correct:0,why:'AND requires every input to be 1. The 0 input makes the output 0.',hint:'AND needs two yeses.'},
{topic:'Gates',q:'What is the output of this OR gate?',code:'0 OR 1 = ?',choices:['0','1'],correct:1,why:'OR needs at least one 1. The second input is 1, so the output is 1.',hint:'OR accepts either input being on.'},
{topic:'Gates',q:'What does the NOT gate output?',code:'NOT 0 = ?',choices:['0','1'],correct:1,why:'NOT reverses its one input. 0 becomes 1, and 1 becomes 0.',hint:'Think opposite day.'},
{topic:'Gates',q:'What is the result of this XOR?',code:'1 XOR 0 = ?',choices:['0','1'],correct:1,why:'The two inputs differ, so XOR outputs 1.',hint:'Matching or different?'},
{topic:'Gates',q:'Does OR include the case where both inputs are 1?',choices:['Yes, the output is 1','No, the output is 0'],correct:0,why:'Boolean OR is inclusive. It gives 1 for 01, 10, and 11. XOR excludes the 11 case.',hint:'“At least one” includes two.'},
{topic:'Gates',q:'How many rows does a truth table with 3 independent inputs need?',choices:['3','6','8','9'],correct:2,why:'Each input has two possible values. Three inputs give 2 × 2 × 2 = 8 combinations.',hint:'Count all combinations, not just the inputs.'},
{topic:'Boolean',q:'Solve this expression with A = 1, B = 0, C = 0.',code:'A OR (B AND C)',choices:['0','1'],correct:1,why:'First B AND C = 0 AND 0 = 0. Then A OR 0 = 1 OR 0 = 1.',hint:'Work inside the parentheses first.'},
{topic:'Boolean',q:'Solve this expression with A = 1, B = 0, C = 0.',code:'(A OR B) AND C',choices:['0','1'],correct:0,why:'A OR B = 1 OR 0 = 1. Then 1 AND C = 1 AND 0 = 0. Grouping changes the previous question’s function.',hint:'The final operation is AND with C.'},
{topic:'Boolean',q:'Which expression is equivalent by De Morgan’s law?',code:'NOT (A AND B)',choices:['NOT A AND NOT B','NOT A OR NOT B','A OR B','NOT A XOR B'],correct:1,why:'Negating AND gives an OR of the negated inputs: ¬(A · B) = ¬A + ¬B. Negate each input and exchange AND with OR.',hint:'Distribute the negation and swap AND / OR.'},
{topic:'Boolean',q:'Simplify using absorption.',code:'A OR (A AND B)',choices:['A','B','A AND B','A XOR B'],correct:0,why:'If A = 1, the expression is 1. If A = 0, both terms are 0. Its value is always exactly A, whatever B is.',hint:'Try A = 0, then A = 1.'},
{topic:'Boolean',q:'What does an input AND its complement give?',code:'A AND NOT A',choices:['A','1','0','NOT A'],correct:2,why:'A and NOT A can never both be 1, so their AND is always 0.',hint:'Can a bit and its opposite both be on?'},
{topic:'Boolean',q:'What does this simplify to?',code:'A XOR A',choices:['A','NOT A','1','0'],correct:3,why:'The two XOR inputs always match, so its output is always 0.',hint:'XOR asks whether the inputs differ.'},
{topic:'Boolean',q:'Solve with A = 1, B = 0, C = 1.',code:'(A XOR B) AND NOT C',choices:['0','1'],correct:0,why:'A XOR B = 1. NOT C = 0. Finally 1 AND 0 = 0.',hint:'Find both inputs to the final AND gate.'},
{topic:'Boolean',q:'What does this simplify to?',code:'A OR NOT A',choices:['0','1','A','NOT A'],correct:1,why:'One of A and NOT A must be 1. Their OR is therefore always 1.',hint:'Can a bit and its opposite both be off?'},
{topic:'Memory',q:'D changes to 1, but no clock edge occurs. What happens to Q?',code:'D flip-flop: Q was 0',choices:['Q becomes 1 immediately','Q stays 0','Q toggles','Q becomes unknown'],correct:1,why:'A rising-edge D flip-flop waits for the 0→1 clock transition. D alone cannot update Q.',hint:'A flip-flop needs its sampling event.'},
{topic:'Memory',q:'What is Q immediately after the rising edge?',code:'D = 0, Q was 1, CLK: 0 → 1',choices:['0','1','It toggles twice','Unknown'],correct:0,why:'A D flip-flop copies D on the active edge. D is 0 at that edge, so Q becomes 0.',hint:'D means data to be copied.'},
{topic:'Memory',q:'A T flip-flop starts at Q = 0. T stays 1 for three rising edges. What is Q?',choices:['0','1','3','Unknown'],correct:1,why:'With T = 1, each rising edge toggles Q: 0 → 1 → 0 → 1. Three toggles leave Q = 1.',hint:'Walk through one edge at a time.'},
{topic:'Memory',q:'A rising edge arrives with T = 0. What happens?',choices:['Q resets to 0','Q sets to 1','Q holds its previous value','Q always toggles'],correct:2,why:'T = 0 means hold. Only T = 1 enables toggling at a rising edge.',hint:'T is a toggle request, not the next stored value.'},
{topic:'Memory',q:'What happens at the next rising edge?',code:'JK: J = 1, K = 1, Q = 1',choices:['Q stays 1','Q becomes 0','Invalid input','No output exists'],correct:1,why:'JK = 11 toggles the stored bit. Since Q was 1, its next value is 0. This is a defined JK behavior.',hint:'Both JK inputs high means toggle.'},
{topic:'Memory',q:'What happens at the next rising edge?',code:'JK: J = 0, K = 1, Q = 1',choices:['Q holds 1','Q resets to 0','Q becomes unknown','Q sets to 1'],correct:1,why:'For JK, 01 means reset: K asks for 0, so Q becomes 0 on the active edge.',hint:'K is the reset request.'},
{topic:'Memory',q:'Which input combination is forbidden in the active-high SR model?',choices:['S = 0, R = 0','S = 0, R = 1','S = 1, R = 0','S = 1, R = 1'],correct:3,why:'S = R = 1 requests set and reset together and is forbidden in the active-high SR model. 00 holds, 01 resets, and 10 sets.',hint:'Avoid asking for set and reset at once.'},
{topic:'Memory',q:'A clocked active-high SR flip-flop has Q = 1. What happens at ↑ with S = R = 0?',choices:['Q resets to 0','Q holds 1','Q toggles','Invalid input'],correct:1,why:'SR = 00 means hold. Neither set nor reset is requested, so Q keeps its previous value.',hint:'No request means remember.'},
{topic:'Memory',q:'Which statement describes a level-sensitive D latch?',choices:['It updates only on a rising edge','It follows D while its enable is active','It always toggles','It has no memory'],correct:1,why:'A D latch is transparent while its enable is active, then holds when disabled. An edge-triggered flip-flop samples at a clock transition.',hint:'“Level-sensitive” means a whole active interval.'},
{topic:'Memory',q:'D changes while CLK stays high. What does a rising-edge D flip-flop do?',choices:['Keeps following D','Holds Q until the next rising edge','Resets Q','Becomes a NOT gate'],correct:1,why:'The active edge is the moment CLK goes from 0 to 1. Staying at 1 is not another edge, so Q holds.',hint:'A high level and a rising edge are different.'},
{topic:'Boolean',q:'Boolean + means OR. What is this result?',code:'1 + 1',choices:['0','1','2'],correct:1,why:'In Boolean notation, + is OR, not ordinary arithmetic. 1 OR 1 = 1.',hint:'There are only two Boolean values: 0 and 1.'}
];
questions.push(...[{"topic":"Numbers","q":"What is the decimal value of this binary pattern?","code":"0010 1101₂","choices":["25","45","2.13","213"],"correct":1,"why":"The ON bits have weights 32, 8, 4, and 1. Add them: 32 + 8 + 4 + 1 = 45.","hint":"Use the weights of the ON bits."},{"topic":"Numbers","q":"Convert this binary byte to hexadecimal.","code":"1010 1111₂","choices":["0xAF","0xFA","0x15","0x10101111"],"correct":0,"why":"Split into four-bit groups: 1010 = A and 1111 = F. Keep the order: 0xAF.","hint":"One group of four bits becomes one hex digit."},{"topic":"Numbers","q":"How many bits does one hexadecimal digit represent?","choices":["2","4","8","16"],"correct":1,"why":"A hex digit has 16 possible values. Four bits have 2⁴ = 16 possible patterns, so one hex digit represents four bits.","hint":"Find the power of two that equals sixteen."},{"topic":"Numbers","q":"Which decimal value does hex F represent?","choices":["6","10","15","16"],"correct":2,"why":"Hex digits count 0–9, then A=10, B=11, C=12, D=13, E=14, F=15. The next number is 10₁₆ = 16₁₀.","hint":"A starts at ten."},{"topic":"Numbers","q":"Convert this hexadecimal number to decimal.","code":"0x2D","choices":["213","29","45","42"],"correct":2,"why":"2D₁₆ = 2 × 16 + 13 × 1 = 45₁₀. D is the digit for decimal thirteen.","hint":"The left digit has weight sixteen."},{"topic":"Numbers","q":"Which binary pattern represents decimal 16 in eight bits?","choices":["0000 1111","0001 0000","0000 0010","0010 0000"],"correct":1,"why":"16 is 2⁴. Only the bit with weight 16 is ON: 0001 0000.","hint":"The weights from the right are 1, 2, 4, 8, 16…"},{"topic":"Numbers","q":"How many hexadecimal digits are needed to display all eight bits of a byte?","choices":["1","2","4","8"],"correct":1,"why":"Each hex digit represents four bits. Eight bits require two hex digits, including leading zeros when displaying a full byte.","hint":"Divide eight bits by four bits per digit."},{"topic":"Numbers","q":"What happens to the value when leading zeros are added?","code":"101₂ → 0000 0101₂","choices":["It increases","It decreases","It stays the same","It becomes negative"],"correct":2,"why":"Leading zeros contribute zero at higher place values. Both patterns represent decimal 5; the second explicitly displays eight bits.","hint":"A zero contributes nothing to a place-value sum."},{"topic":"Numbers","q":"When converting decimal by repeated division, how do you read the remainders?","choices":["From top to bottom","From bottom to top","Largest first","Ignore zeros"],"correct":1,"why":"The first remainder is the least significant digit. Read the remainders from the last division back to the first, keeping zeros.","hint":"The first remainder belongs on the far right."},{"topic":"Numbers","q":"What is the largest unsigned value that fits in eight bits?","choices":["127","128","255","256"],"correct":2,"why":"Eight bits have 256 patterns, representing 0 through 255. The maximum is 2⁸ − 1 = 255 = 0xFF.","hint":"Count starts at zero."},{"topic":"Numbers","q":"Convert hexadecimal 0x10 to decimal.","choices":["2","10","16","100"],"correct":2,"why":"10₁₆ means 1 × 16 + 0 × 1 = 16₁₀. The written digits need a base to determine their value.","hint":"Hex place values are powers of sixteen."},{"topic":"Numbers","q":"Convert hexadecimal 0xF0 to an eight-bit binary pattern.","choices":["0000 1111","1111 0000","1111 1111","1010 0000"],"correct":1,"why":"F maps to 1111 and 0 maps to 0000. Preserve the digit order to get 1111 0000.","hint":"Translate each hex digit separately into four bits."}]);
questions.push(...[{"topic":"Gates","q":"What does this NAND gate output?","code":"1 NAND 1 = ?","choices":["0","1"],"correct":0,"why":"First 1 AND 1 = 1. NAND inverts that result, so NOT 1 = 0.","hint":"Compute AND, then reverse it."},{"topic":"Gates","q":"When is a two-input NOR gate ON?","choices":["When at least one input is 1","Only when both inputs are 0","Only when both inputs are 1","When the inputs differ"],"correct":1,"why":"NOR inverts OR. OR is 0 only for 00, so NOR is 1 only for 00.","hint":"NOR means NOT OR."},{"topic":"Gates","q":"What does this XNOR output?","code":"1 XNOR 0 = ?","choices":["0","1"],"correct":0,"why":"The inputs differ, so XOR would give 1. XNOR inverts that result to 0. Matching inputs give XNOR = 1.","hint":"XNOR detects a match."},{"topic":"Circuits","q":"Which connection makes a NAND gate act like NOT A?","choices":["Connect A to both inputs","Connect 0 to both inputs","Connect A and 0","Connect A and NOT A"],"correct":0,"why":"A NAND A = NOT (A AND A) = NOT A. A repeated through both inputs has AND result A, then the bubble reverses it.","hint":"AND of a bit with itself is that bit."},{"topic":"Circuits","q":"How many operations does this expression contain?","code":"(A NAND B) OR NOT C","choices":["1","2","3","4"],"correct":2,"why":"There is one NAND, one NOT, and one OR: three gate operations. A NAND is one gate type, even though its rule can be described as AND followed by inversion.","hint":"Count each named gate, including NOT."},{"topic":"Circuits","q":"Follow these two gates. What is Y?","code":"G1 = A NAND B; Y = G1 OR C; A = 1, B = 1, C = 0","choices":["0","1"],"correct":0,"why":"G1 = 1 NAND 1 = 0. Then Y = 0 OR 0 = 0. Carry the intermediate result forward.","hint":"Solve G1 before the final OR."},{"topic":"Circuits","q":"Can NAND gates alone implement XOR?","choices":["Yes, four NAND gates can do it","No, XOR always needs an OR gate","Only with a flip-flop","Only for input 00"],"correct":0,"why":"NAND is universal. In the NAND-only XOR example, G1=A NAND B, G2=A NAND G1, G3=B NAND G1, and Y=G2 NAND G3 match XOR for every input pair.","hint":"Try the NAND-only XOR preset in the workbench."},{"topic":"Circuits","q":"For A = 0, B = 1, C = 1, are these NAND expressions equivalent?","code":"(A NAND B) NAND C   versus   A NAND (B NAND C)","choices":["Yes, both give 0","Yes, both give 1","No: the first gives 0, the second gives 1","No: the first gives 1, the second gives 0"],"correct":2,"why":"Left: 0 NAND 1 = 1, then 1 NAND 1 = 0. Right: 1 NAND 1 = 0, then 0 NAND 0 = 1. NAND is not associative; parentheses matter.","hint":"Compute the parenthesized pair separately in each expression."}]);
questions.push(...[{"topic":"Numbers","q":"Which digits are valid in octal?","choices":["0 and 1 only","0 through 7","0 through 8","0 through 9 and A through F"],"correct":1,"why":"Base 8 has eight digits: 0, 1, 2, 3, 4, 5, 6, 7. After 7 comes 10₈.","hint":"A base has that many digits, starting at zero."},{"topic":"Numbers","q":"How many bits does one octal digit represent?","choices":["2","3","4","8"],"correct":1,"why":"8 = 2³, so three bits provide exactly the eight patterns needed for one octal digit.","hint":"Find the power of two that equals eight."},{"topic":"Numbers","q":"Convert this octal number to decimal.","code":"55₈","choices":["45","55","40","25"],"correct":0,"why":"55₈ = 5 × 8 + 5 × 1 = 45₁₀. The left digit has weight eight.","hint":"Octal place values are 1, 8, 64, 512…"},{"topic":"Numbers","q":"Convert this binary pattern to octal.","code":"111 101₂","choices":["75₈","57₈","13₈","65₈"],"correct":0,"why":"Group into threes from the right: 111 = 7 and 101 = 5. The octal result is 75₈, which equals decimal 61.","hint":"Each three-bit group maps to one octal digit."},{"topic":"Numbers","q":"How many bytes are in a 64-bit pattern?","choices":["4","8","16","64"],"correct":1,"why":"One byte contains eight bits, so 64 ÷ 8 = 8 bytes.","hint":"Divide the number of bits by eight."},{"topic":"Numbers","q":"What is the unsigned 64-bit range?","choices":["0 through 2⁶⁴ − 1","0 through 2⁶⁴","−2⁶³ through 2⁶³ − 1","1 through 2⁶⁴"],"correct":0,"why":"Unsigned 64-bit integers start at zero and end at 2⁶⁴ − 1 = 18,446,744,073,709,551,615. The signed range is a different interpretation.","hint":"Count all patterns, starting at zero."},{"topic":"Numbers","q":"A value of 256 is displayed in a 64-bit view. How many bits does the value minimally need?","choices":["8","9","32","64"],"correct":1,"why":"256 = 2⁸, so its binary representation is 100000000: nine bits. A 64-bit display pads it with zeros and occupies eight bytes, while minimum whole-byte storage is two bytes.","hint":"Distinguish the value’s minimum bit count from the chosen display width."}]);
questions.push(...[
 {
  "topic": "Memory systems",
  "q": "What stores the bit in a common DRAM cell?",
  "choices": [
   "A transistor and a capacitor",
   "A spinning platter",
   "A laser mark"
  ],
  "correct": 0,
  "why": "The access transistor selects a small capacitor. The stored state needs sense-and-restore and periodic refresh.",
  "hint": "Think of charge that leaks."
 },
 {
  "topic": "Memory systems",
  "q": "Why does powered SRAM not need periodic DRAM-style refresh?",
  "choices": [
   "Feedback maintains its state",
   "It has infinite capacity",
   "It uses optical pits"
  ],
  "correct": 0,
  "why": "Cross-coupled inverter feedback maintains the state while power is present. Removing power loses the volatile state.",
  "hint": "Look at the feedback loop."
 },
 {
  "topic": "Memory systems",
  "q": "Can refresh recover a DRAM value already lost?",
  "choices": [
   "Yes, always",
   "No, write a known value again"
  ],
  "correct": 1,
  "why": "Refresh preserves a still-readable state. It cannot recreate information that is already unknown.",
  "hint": "Preserving and reconstructing are different."
 },
 {
  "topic": "Memory systems",
  "q": "What does a byte-addressed memory decoder select?",
  "choices": [
   "The addressed word or byte location",
   "Every location at once",
   "A Unicode font"
  ],
  "correct": 0,
  "why": "Address bits select a location; data bits carry its contents. Write enable controls whether the selected location changes.",
  "hint": "Address and data have different jobs."
 },
 {
  "topic": "Memory systems",
  "q": "An address has 2 bits. How many byte locations can it select?",
  "choices": [
   "2",
   "4",
   "8",
   "16"
  ],
  "correct": 1,
  "why": "Two independent address bits give 2² = 4 locations, numbered 0–3. The data width can still be 8 bits.",
  "hint": "Count the possible address patterns."
 },
 {
  "topic": "Memory systems",
  "q": "What makes a cache hit?",
  "choices": [
   "A valid matching tag in the selected line",
   "Any nonempty line",
   "A disk spinning faster"
  ],
  "correct": 0,
  "why": "The index selects a line, the valid bit and tag identify whether it contains the requested block, and the offset selects the byte.",
  "hint": "Index alone is insufficient."
 },
 {
  "topic": "Memory systems",
  "q": "Can two addresses repeatedly evict each other from a direct-mapped cache?",
  "choices": [
   "Yes, when their blocks map to the same index",
   "No, caches never evict"
  ],
  "correct": 0,
  "why": "Different tags can share one cache index. Alternating those blocks can cause conflict misses even when other lines are free.",
  "hint": "Compare the tag and index separately."
 },
 {
  "topic": "Memory systems",
  "q": "What does a TLB cache?",
  "choices": [
   "Virtual-to-physical address translations",
   "Only text characters",
   "The entire SSD"
  ],
  "correct": 0,
  "why": "A TLB speeds address translation. A TLB miss alone does not necessarily mean the page is absent from RAM or that storage I/O is needed.",
  "hint": "It helps the address-translation path."
 },
 {
  "topic": "Memory systems",
  "q": "Must every page fault read a page from disk?",
  "choices": [
   "Yes",
   "No"
  ],
  "correct": 1,
  "why": "Some page faults need backing-store I/O; others can be resolved without it, such as demand-zero allocation. The workshop uses a small backed-page model.",
  "hint": "An OS can resolve different fault causes."
 },
 {
  "topic": "Memory systems",
  "q": "What normally happens when an SSD logical page is updated?",
  "choices": [
   "A free physical page is programmed and the map changes",
   "The same physical NAND page is freely overwritten",
   "The hard-drive arm moves"
  ],
  "correct": 0,
  "why": "Managed NAND controllers commonly write out of place, invalidate the old page, and later reclaim blocks. Actual page sizes are much larger than this toy model.",
  "hint": "Follow the logical-to-physical map."
 },
 {
  "topic": "Memory systems",
  "q": "What must NAND garbage collection preserve before erasing a block?",
  "choices": [
   "Its still-valid pages",
   "Only invalid pages",
   "Nothing"
  ],
  "correct": 0,
  "why": "Still-live data is copied and mappings are updated before the whole victim block is erased. Invalid pages can then be reclaimed.",
  "hint": "Erasure affects a block, not one chosen live byte."
 },
 {
  "topic": "Memory systems",
  "q": "Which operation returns programmed SLC NAND bits to the erased state?",
  "choices": [
   "Block erase",
   "A normal read",
   "CPU cache lookup"
  ],
  "correct": 0,
  "why": "NAND reads/programs pages and erases blocks. In the shown SLC convention erased bits read as 1; programming can make them 0.",
  "hint": "Find the larger erase unit."
 },
 {
  "topic": "Memory systems",
  "q": "What do ordinary SD cards and SSDs commonly share?",
  "choices": [
   "NAND flash and a controller",
   "Magnetic read heads",
   "Refresh-only DRAM storage"
  ],
  "correct": 0,
  "why": "Both commonly use managed NAND storage, although controllers, packaging, capabilities, and host interfaces differ.",
  "hint": "Look inside both device illustrations."
 },
 {
  "topic": "Memory systems",
  "q": "Is M.2 itself a physical memory-cell technology?",
  "choices": [
   "Yes",
   "No, it is a module/connector system"
  ],
  "correct": 1,
  "why": "M.2 describes a physical module/socket system. NVMe is a storage protocol and NAND is a cell/storage technology; these terms are not interchangeable.",
  "hint": "Separate form factor, protocol, and cells."
 },
 {
  "topic": "Memory systems",
  "q": "Which sequence illustrates an HDD access?",
  "choices": [
   "Seek, rotate, transfer",
   "Refresh, erase, decode",
   "Cache, Unicode, compile"
  ],
  "correct": 0,
  "why": "The arm positions the head, rotation brings the sector underneath it, and data is transferred. These are conceptual stages, not measured timings.",
  "hint": "Consider what physically moves."
 },
 {
  "topic": "Memory systems",
  "q": "Does ECC make volatile RAM retain data without power?",
  "choices": [
   "Yes",
   "No"
  ],
  "correct": 1,
  "why": "ECC adds information for detecting/correcting certain errors, depending on the code. Retention still depends on the underlying memory and power arrangement.",
  "hint": "Error protection and retention are separate properties."
 },
 {
  "topic": "ASCII",
  "q": "How many codes are defined by standard US-ASCII?",
  "choices": [
   "128",
   "256",
   "1,024"
  ],
  "correct": 0,
  "why": "US-ASCII uses 7 meaningful bits: codes 0–127. The high bit is zero when stored in an 8-bit byte.",
  "hint": "Calculate 2⁷."
 },
 {
  "topic": "ASCII",
  "q": "What is the ASCII code for uppercase A?",
  "choices": [
   "65 / 0x41",
   "97 / 0x61",
   "10 / 0x0A"
  ],
  "correct": 0,
  "why": "Uppercase A is decimal 65, hexadecimal 41, octal 101, and the byte 01000001.",
  "hint": "Find A in the table."
 },
 {
  "topic": "ASCII",
  "q": "What happens when bit 5 is toggled in ASCII uppercase A?",
  "choices": [
   "It becomes lowercase a",
   "It becomes B",
   "It becomes NUL"
  ],
  "correct": 0,
  "why": "65 XOR 32 = 97. A is 01000001 and a is 01100001. This bit trick applies to ASCII letter pairs, not arbitrary Unicode letters.",
  "hint": "Bit 5 has weight 32."
 },
 {
  "topic": "ASCII",
  "q": "Is the character “7” encoded as byte value 7 in ASCII?",
  "choices": [
   "Yes",
   "No, it is decimal 55"
  ],
  "correct": 1,
  "why": "The digit glyph “7” has ASCII code 55 (0x37). Byte 7 is the BEL control code. Text and a numeric value need different interpretations.",
  "hint": "Look up the glyph rather than its numeric meaning."
 },
 {
  "topic": "ASCII",
  "q": "Which ASCII control is decimal 10?",
  "choices": [
   "LF (line feed)",
   "CR (carriage return)",
   "DEL"
  ],
  "correct": 0,
  "why": "LF = 10 (0x0A), CR = 13 (0x0D), and DEL = 127 (0x7F). Different systems use different newline conventions.",
  "hint": "The table shows controls by name."
 },
 {
  "topic": "ASCII",
  "q": "Can strict US-ASCII encode é?",
  "choices": [
   "Yes, as one ASCII code",
   "No; UTF-8 can encode it as C3 A9"
  ],
  "correct": 1,
  "why": "é is outside ASCII. UTF-8 encodes this Unicode scalar as two bytes C3 A9. “Extended ASCII” is ambiguous without a named code page.",
  "hint": "ASCII ends at 127."
 },
 {
  "topic": "ASCII",
  "q": "How many stored bits are in UTF-8 bytes C3 A9?",
  "choices": [
   "8",
   "16",
   "7"
  ],
  "correct": 1,
  "why": "There are two 8-bit bytes, so 16 stored bits. This sequence represents one Unicode scalar, é.",
  "hint": "Count bytes before multiplying by eight."
 },
 {
  "topic": "ASCII",
  "q": "Is there one universal “extended ASCII” table for codes 128–255?",
  "choices": [
   "Yes",
   "No, a specific code page must be named"
  ],
  "correct": 1,
  "why": "Different 8-bit code pages assign different characters. Standard ASCII stops at 127; UTF-8 is a separate variable-length encoding.",
  "hint": "Ask which encoding defines the upper bytes."
 }
]);
questions.push(...[
 {
  "topic": "Binary",
  "q": "What is the signed 8-bit range?",
  "choices": [
   "−128 to 127",
   "−127 to 128",
   "0 to 255"
  ],
  "correct": 0,
  "why": "The sign bit has weight −128 and the remaining weights total 127.",
  "hint": "Use −2⁷ through 2⁷−1."
 },
 {
  "topic": "Binary",
  "q": "How do you form the two’s complement negative of a value?",
  "choices": [
   "Invert all bits, then add one",
   "Only flip the first bit",
   "Reverse the bit order"
  ],
  "correct": 0,
  "why": "Invert every bit at the chosen width, then add one and retain that width.",
  "hint": "There are two steps."
 },
 {
  "topic": "Binary",
  "q": "Interpret 11111011 as signed 8-bit two’s complement.",
  "choices": [
   "−5",
   "251",
   "−123"
  ],
  "correct": 0,
  "why": "Its unsigned value is 251; 251 − 256 = −5.",
  "hint": "Subtract 2⁸ when the sign bit is 1."
 },
 {
  "topic": "Binary",
  "q": "What does 127 + 1 produce in this 8-bit wrapping lab?",
  "choices": [
   "−128, with signed overflow",
   "128, without overflow",
   "0, with no flags"
  ],
  "correct": 0,
  "why": "The exact sum 128 cannot fit in signed 8-bit. The stored pattern is 10000000, interpreted as −128.",
  "hint": "Track exact value and stored bits separately."
 },
 {
  "topic": "Binary",
  "q": "Can signed 8-bit −128 be negated to signed +128 at the same width?",
  "choices": [
   "No, +128 is outside the range",
   "Yes, it always fits"
  ],
  "correct": 0,
  "why": "The range is asymmetric: −128…127. Negation wraps to the same pattern with signed overflow in this lab.",
  "hint": "Compare the positive limit."
 },
 {
  "topic": "Binary",
  "q": "Which shift preserves the sign when shifting right?",
  "choices": [
   "Arithmetic right shift",
   "Logical right shift",
   "Neither ever does"
  ],
  "correct": 0,
  "why": "Arithmetic right shift repeats the leading sign bit. Logical right shift fills with zeros.",
  "hint": "Consider a negative bit pattern."
 },
 {
  "topic": "Binary",
  "q": "What preserves a negative value when widening it?",
  "choices": [
   "Repeat the sign bit",
   "Always add zeros on the left",
   "Reverse the bytes"
  ],
  "correct": 0,
  "why": "Sign extension repeats the most-significant sign bit. 11111011 and 1111111111111011 both mean −5.",
  "hint": "Keep the signed value unchanged."
 },
 {
  "topic": "Binary",
  "q": "Is unsigned carry the same condition as signed overflow?",
  "choices": [
   "No",
   "Yes"
  ],
  "correct": 0,
  "why": "They describe different interpretations of a fixed-width operation. 01111111 + 1 overflows signed 8-bit with no carry-out.",
  "hint": "Check the 127 + 1 example."
 },
 {
  "topic": "Binary",
  "q": "What is 11110000 AND 00001111?",
  "choices": [
   "00000000",
   "11111111",
   "11110000"
  ],
  "correct": 0,
  "why": "AND keeps a 1 only where both corresponding input bits are 1.",
  "hint": "Compare each bit position."
 },
 {
  "topic": "Binary",
  "q": "What is −7 ÷ 2 in this integer lab?",
  "choices": [
   "−3, remainder −1",
   "−4, remainder 1",
   "−3.5, no remainder"
  ],
  "correct": 0,
  "why": "Division truncates toward zero. −7 = (−3 × 2) + (−1).",
  "hint": "This lab uses integer division."
 },
 {
  "topic": "Media",
  "q": "What is the raw RGB payload of an 8 × 8 image at 24 bits per pixel?",
  "choices": [
   "192 bytes",
   "64 bytes",
   "1,536 bytes"
  ],
  "correct": 0,
  "why": "8 × 8 × 24 = 1,536 bits; divide by 8 to get 192 bytes, excluding file overhead.",
  "hint": "First compute bits, then bytes."
 },
 {
  "topic": "Media",
  "q": "What does alpha usually describe in an RGBA pixel?",
  "choices": [
   "Opacity",
   "A fourth primary color",
   "Audio pitch"
  ],
  "correct": 0,
  "why": "Alpha controls how the pixel is composited with its background. RGB still supplies the color channels.",
  "hint": "Check the transparency checkerboard."
 },
 {
  "topic": "Media",
  "q": "What is mono 8,000-sample/s, 8-bit PCM raw data rate?",
  "choices": [
   "64,000 bits/s",
   "8,000 bits/s",
   "1,000 bits/s"
  ],
  "correct": 0,
  "why": "8,000 samples/s × 8 bits/sample × one channel = 64,000 bits/s.",
  "hint": "Multiply rate, depth, and channels."
 },
 {
  "topic": "Media",
  "q": "What does increasing PCM bit depth primarily refine?",
  "choices": [
   "Amplitude quantization",
   "How many time samples occur per second",
   "The video frame rate"
  ],
  "correct": 0,
  "why": "More amplitude levels give finer quantization. Sample rate determines time-sampling frequency.",
  "hint": "Separate amplitude resolution from time resolution."
 },
 {
  "topic": "Media",
  "q": "At a sample rate of 8,000 Hz, which source needs attention to aliasing?",
  "choices": [
   "A 6,000 Hz sine",
   "A 440 Hz band-limited sine"
  ],
  "correct": 0,
  "why": "6,000 Hz is above half the sample rate and folds to a 2,000 Hz sample sequence for this sine model.",
  "hint": "Compare with half the sample rate."
 },
 {
  "topic": "Media",
  "q": "What does a toy video delta record store here?",
  "choices": [
   "A changed pixel index and its new RGB bytes",
   "Every possible frame",
   "Only the filename"
  ],
  "correct": 0,
  "why": "The model applies changed-pixel records to a previous decoded frame. A key frame supplies a full starting image.",
  "hint": "Inspect changed-pixel records."
 },
 {
  "topic": "Media",
  "q": "Must delta coding always make a frame smaller?",
  "choices": [
   "No",
   "Yes"
  ],
  "correct": 0,
  "why": "If many pixels change, index-plus-RGB records can cost more than a full RGB frame.",
  "hint": "Account for per-record overhead."
 },
 {
  "topic": "Media",
  "q": "Does a .png extension prove that bytes form a valid PNG file?",
  "choices": [
   "No",
   "Yes"
  ],
  "correct": 0,
  "why": "A name is a hint. A PNG has a signature and structured chunks that must also be valid.",
  "hint": "Names and contents are different."
 },
 {
  "topic": "Media",
  "q": "Can the same four bytes have different meanings as integer and float?",
  "choices": [
   "Yes",
   "No"
  ],
  "correct": 0,
  "why": "The data type specifies how to interpret the bits. IEEE 754 binary32 and signed integer layouts differ.",
  "hint": "Keep the bytes fixed in the data lab."
 },
 {
  "topic": "Media",
  "q": "Is every decimal fraction exactly representable in binary32?",
  "choices": [
   "No",
   "Yes"
  ],
  "correct": 0,
  "why": "Finite binary fractions cannot exactly represent every decimal fraction. A stored 3.14 is typically an approximation.",
  "hint": "Check the packed binary32 value."
 }
]);
function pickQuestion(){let pool=questions.map((q,i)=>({q,i})).filter(x=>quizTopic==='All topics'||x.q.topic===quizTopic);const fresh=pool.filter(x=>!quizHistory.slice(-5).includes(x.i));if(fresh.length)pool=fresh;pool.sort((x,y)=>{const sx=saved.stats[x.q.topic]||{attempts:0,correct:0},sy=saved.stats[y.q.topic]||{attempts:0,correct:0};return (sx.attempts?sx.correct/sx.attempts:.5)-(sy.attempts?sy.correct/sy.attempts:.5);});const weakest=pool[0].q.topic;const candidates=quizTopic==='All topics'&&Math.random()<.65?pool.filter(x=>x.q.topic===weakest):pool;quizId=candidates[Math.floor(Math.random()*candidates.length)].i;quizHistory.push(quizId);quizSelected=null;quizChecked=false;quizHint=false;}
function renderPracticeQuestions(){if(quizId<0)pickQuestion();const q=questions[quizId],correct=quizSelected===q.correct;return `<div class="topic-bar" role="group" aria-label="Practice topic">${['All topics','Gates','Circuits','Boolean','Memory','Memory systems','Numbers','Binary','ASCII','Media'].map(t=>`<button class="topic-button ${quizTopic===t?'active':''}" data-topic="${t}" aria-pressed="${quizTopic===t}">${t}</button>`).join('')}</div><div class="practice-layout"><section class="card practice-card"><div class="question-meta"><span class="eyebrow">${q.topic} / ${quizChecked?'REVIEW THE REASON':'MAKE YOUR PREDICTION'}</span><span class="question-number">${questions.length} questions in the bank</span></div><h2 class="question-title">${q.q}</h2><p class="question-context">${q.topic==='Memory'?'Assume an ideal rising-edge flip-flop, stable inputs, and no asynchronous controls.':q.topic==='Memory systems'?'Distinguish cell technology, system role, interface, and storage device.':q.topic==='Binary'?'Use the stated fixed width and two’s complement interpretation.':q.topic==='Media'?'Payload sizes exclude file headers, metadata, padding, and compression unless stated.':q.topic==='ASCII'?'Use standard 7-bit US-ASCII unless the question explicitly says UTF-8.':q.topic==='Numbers'?'Assume unsigned whole numbers. Subscripts and 0x show the number base.':'Use Boolean values: 0 is false, 1 is true.'}</p>${q.code?`<div class="question-code">${esc(q.code)}</div>`:''}<div class="answer-options" role="group" aria-label="Answer choices">${q.choices.map((c,i)=>`<button class="answer-button ${quizSelected===i?'selected':''} ${quizChecked&&i===q.correct?'correct':''} ${quizChecked&&quizSelected===i&&!correct?'incorrect':''}" data-choice="${i}" aria-pressed="${quizSelected===i}" ${quizChecked?'disabled':''}><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${esc(c)}</span></button>`).join('')}</div>${quizHint&&!quizChecked?`<p class="hint-line">✧ Hint: ${q.hint}</p>`:''}${quizChecked?`<div class="answer-feedback ${correct?'good':''}" role="status"><strong>${correct?'That’s it. Here’s why.':'A useful mistake. Let’s untangle it.'}</strong>${q.why}</div>`:''}<div class="button-row">${quizChecked?'<button class="primary" data-action="next-question">Next question →</button>':`<button class="primary" data-action="check-answer" ${quizSelected===null?'disabled':''}>Check my answer →</button><button class="text-button" data-action="hint">A little hint</button>`}<span class="spacer"></span><button class="text-button" data-action="study-topic">Explore this topic ↗</button></div></section><aside><section class="card practice-stats"><span class="eyebrow">YOUR PRACTICE SO FAR</span><div class="stats-value">${saved.attempts?Math.round(saved.correct/saved.attempts*100)+'%':'—'}</div><div class="stats-desc">${saved.correct} correct out of ${saved.attempts} checked answers.<br>Practice accuracy, not a mastery grade.</div><div class="topic-stats">${['Gates','Circuits','Boolean','Memory','Memory systems','Numbers','Binary','ASCII','Media'].map(t=>{const s=saved.stats[t]||{correct:0,attempts:0};return `<div class="topic-stat"><span>${t}</span><span>${s.correct} / ${s.attempts}</span></div>`;}).join('')}</div><p class="subtle" style="margin:17px 0 0">All-topics mode revisits weaker topics more often. Progress stays in this browser.</p></section><section class="exam-tip"><span class="eyebrow">A SMALL EXAM HABIT</span><h3>Write the middle bits.</h3><p>For expressions, show intermediate gate results. For flip-flops, write Q before and after each active edge. Small steps prevent big slips.</p></section></aside></div>`;}
function renderPractice(){return window.EmberTraining.render({intro,esc,mark,render,navigate},renderPracticeQuestions);}
function renderReferenceCore(){return intro('11 / POCKET GUIDE','Keep the <em>essentials close.</em>','A compact reference for your revision. Try each rule in the labs, then test yourself.','11')+
`<div class="button-row" style="margin:0 0 20px"><button class="secondary print-button" data-action="print">Print pocket guide ↗</button><span class="subtle">Boolean + means OR; · means AND; ¬ or ′ means NOT; ⊕ means XOR.</span></div><div class="reference-grid"><section class="card reference-card"><span class="eyebrow">GATES / PRESENT INPUTS</span><h2>Four small building blocks.</h2><table class="reference-table"><thead><tr><th>A</th><th>B</th><th>A · B</th><th>A + B</th><th>A ⊕ B</th><th>¬A</th></tr></thead><tbody>${[[0,0],[0,1],[1,0],[1,1]].map(([x,y])=>`<tr><td>${x}</td><td>${y}</td><td>${L.gate('AND',x,y)}</td><td>${L.gate('OR',x,y)}</td><td>${L.gate('XOR',x,y)}</td><td>${1-x}</td></tr>`).join('')}</tbody></table><p><strong>AND:</strong> all inputs must be 1. <strong>OR:</strong> at least one is 1. <strong>Two-input XOR:</strong> exactly one is 1. <strong>NOT:</strong> reverse one bit.</p><p>For three or more inputs, chained XOR is 1 for an odd number of 1s. A truth table with n independent inputs has 2ⁿ rows.</p></section><section class="card reference-card"><span class="eyebrow">MEMORY / NEXT STATE</span><h2>What happens at ↑?</h2><table class="reference-table"><thead><tr><th>Type</th><th>Inputs</th><th>Q next</th></tr></thead><tbody><tr><td>D</td><td>D = 0 / 1</td><td>Copy D</td></tr><tr><td>T</td><td>T = 0 / 1</td><td>Hold / toggle</td></tr><tr><td>JK</td><td>00 / 01 / 10 / 11</td><td>Hold / 0 / 1 / toggle</td></tr><tr><td>SR</td><td>00 / 01 / 10 / 11</td><td>Hold / 0 / 1 / invalid</td></tr></tbody></table><p>↑ means a 0→1 clock edge. Between active edges, these flip-flops hold Q. ¬Q is the complement of a valid Q. “Hold” keeps the old value; “toggle” reverses it.</p><p>The SR table here is <strong>active-high and synchronous</strong>. An active-low NAND SR latch uses a different table. A latch follows inputs during its active enable level; a flip-flop samples on an edge.</p></section><section class="card reference-card"><span class="eyebrow">BOOLEAN / SIMPLIFY</span><h2>A handful of powerful laws.</h2>${laws()}<p>Distributive: A · (B + C) = A · B + A · C.<br>Double negation: ¬¬A = A.<br>Two-input XOR: A ⊕ B = A · ¬B + ¬A · B.</p></section><section class="card reference-card"><span class="eyebrow">YOUR EXAM ROUTINE</span><h2>Give every bit a place.</h2><ol><li><strong>Read the notation.</strong> Check the clock edge and whether inputs are active-high or active-low.</li><li><strong>Group the expression.</strong> Parentheses first, then NOT, then AND, then the remaining operators according to your course. This kit uses AND → XOR → OR.</li><li><strong>Write intermediate results.</strong> Feed them into the next gate.</li><li><strong>For memory, track Q.</strong> Mark the active edges. Update Q only there, using the inputs at that moment.</li><li><strong>Check the corners.</strong> Try all 0s, all 1s, and one changing input. Prove equivalence with all truth-table rows.</li></ol><div class="memory-lesson">Boolean algebra uses 0 and 1 as truth values. It is not ordinary arithmetic: 1 + 1 = 1 when + means OR.</div></section></div>`;}
function renderReference(){return renderReferenceCore()+window.EmberCircuitUI.guide()+window.EmberNumberUI.guide()+window.EmberMemoryUI.guide()+window.EmberASCIIUI.guide()+window.EmberBinaryUI.guide()+window.EmberMediaUI.guide();}
function render(keepFocus=false){const focus=keepFocus?document.activeElement:null,action=focus?.dataset?.action,gate=focus?.dataset?.gate,ff=focus?.dataset?.ff;window.EmberSpace.clear();main.innerHTML=({gates:renderGates,boolean:renderBoolean,memory:renderMemory,circuit:()=>window.EmberCircuitUI.render({intro,esc,mark,render,navigate,bit}),numbers:()=>window.EmberNumberUI.render({intro,esc,mark,render,navigate}),systems:()=>window.EmberMemoryUI.render({intro,esc,mark,render,navigate,bit}),ascii:()=>window.EmberASCIIUI.render({intro,esc,mark,render,navigate}),binary:()=>window.EmberBinaryUI.render({intro,esc,mark,render,navigate}),media:()=>window.EmberMediaUI.render({intro,esc,mark,render,navigate}),practice:renderPractice,reference:renderReference})[view]();const scene=window.EmberModels.scene(view,{gateType,a,b,exprAst,exprValues,ffType,ffQ,ffX,ffY,ffClk});if(scene)window.EmberSpace.mount(scene.key||view,scene);window.EmberInputs.mount();document.getElementById('mobile-section').value=view;document.querySelectorAll('.nav-link').forEach(el=>{el.classList.toggle('active',el.dataset.view===view);if(el.dataset.view===view)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});if(keepFocus){const q=action?`[data-action="${action}"]`:gate?`[data-gate="${gate}"]`:ff?`[data-ff="${ff}"]`:null;if(q)main.querySelector(q)?.focus({preventScroll:true});}}
function navigate(v){if(!['gates','circuit','boolean','memory','numbers','systems','ascii','binary','media','practice','reference'].includes(v))return;if(view==='media'&&v!=='media')window.EmberMediaUI.stop();view=v;history.replaceState(null,'','#'+v);render();if(innerWidth<=780){const nav=document.querySelector('.sidebar nav'),active=nav.querySelector('.active');nav.scrollLeft=active.offsetLeft-nav.offsetLeft-(nav.clientWidth-active.clientWidth)/2;}window.scrollTo({top:0,behavior:'instant'});}
document.addEventListener('change',e=>{if(e.target.id==='mobile-section')navigate(e.target.value);});
document.addEventListener('ember:clear',e=>{if(e.detail.id==='expression'){expression='';exprError='Input cleared. Enter a new expression.';}if(e.detail.id==='comparison'){comparison='';compareResult='';}});
function solveExpr(source){expression=source;try{exprAst=L.parse(expression);exprError='';compareResult='';mark('boolean');}catch(e){exprError=e.message;}render();}
function handleAction(action){if(action==='gate-a'||action==='gate-b'){if(action==='gate-a')a=1-a;else b=1-b;mark(gateType);render(true);}else if(action?.startsWith('expr-')){const v=action.slice(5);exprValues[v]=1-exprValues[v];mark('boolean');render(true);}else if(action==='ff-x'||action==='ff-y'){if(action==='ff-x')ffX=1-ffX;else ffY=1-ffY;recordFF();ffMessage='Input changed. No rising edge occurred, so Q '+(ffQ===null?'remains unknown.':'holds at '+ffQ+'.')+' '+(ffClk?'CLK is high, but staying high is not an edge.':'Raise CLK to sample the inputs.');render(true);}else if(action==='clock'){ffClk=1-ffClk;if(ffClk){const old=ffQ;ffQ=L.flip(ffType,ffQ,ffX,ffY);ffMessage=ffQ===null?(ffType==='SR'&&ffX&&ffY?'S and R are both 1: forbidden input. Q is now unknown in this model.':'Q is still unknown. Use a defined set or reset input at the next ↑ to recover.'):`Rising edge! ${ffType==='D'?'D = '+ffX+' was copied into Q.':old===ffQ?'The rule holds Q at '+ffQ+'.':'Q changed from '+(old===null?'unknown':old)+' to '+ffQ+'.'} Q will hold until the next active edge.`;mark('memory');}else ffMessage='Clock lowered to 0. This is a falling edge, so Q '+(ffQ===null?'remains unknown.':'holds at '+ffQ+'.')+' The next rise is the sampling event.';recordFF();render(true);}else if(action==='reset-ff'){resetFF();render(true);}else if(action==='check-answer'&&quizSelected!==null&&!quizChecked){quizChecked=true;const q=questions[quizId];saved.attempts++;const ok=quizSelected===q.correct;if(ok)saved.correct++;saved.stats[q.topic]??={attempts:0,correct:0};saved.stats[q.topic].attempts++;if(ok)saved.stats[q.topic].correct++;save();render();}else if(action==='next-question'){pickQuestion();render();}else if(action==='hint'){quizHint=true;render();}else if(action==='study-topic'){navigate({Gates:'gates',Boolean:'boolean',Memory:'memory','Memory systems':'systems',ASCII:'ascii',Binary:'binary',Media:'media',Numbers:'numbers',Circuits:'circuit'}[questions[quizId].topic]);}else if(action==='print')window.print();}
document.addEventListener('click',e=>{const el=e.target.closest('button,[data-row],[data-expr-row]');if(!el)return;if(el.dataset.view)navigate(el.dataset.view);else if(el.dataset.gate){gateType=el.dataset.gate;gateAnswer=null;render(true);}else if(el.dataset.row){[a,b]=el.dataset.row.split(',').map(Number);b??=0;mark(gateType);render();}else if(el.dataset.gateGuess){gateAnswer=Number(el.dataset.gateGuess);render();}else if(el.dataset.example){solveExpr(el.dataset.example);}else if(el.dataset.exprRow){Object.assign(exprValues,JSON.parse(el.dataset.exprRow));mark('boolean');render();}else if(el.dataset.ff){ffType=el.dataset.ff;resetFF();render(true);}else if(el.dataset.topic){quizTopic=el.dataset.topic;pickQuestion();render();}else if(el.dataset.choice!==undefined&&!quizChecked){quizSelected=Number(el.dataset.choice);render();}else if(el.dataset.action)handleAction(el.dataset.action);});
main.addEventListener('submit',e=>{e.preventDefault();if(e.target.id==='expression-form')solveExpr(document.getElementById('expression').value);else if(e.target.id==='comparison-form'){comparison=document.getElementById('comparison').value;try{const result=L.equivalent(exprAst,L.parse(comparison));compareResult=result.equal?`<div class="explanation" role="status"><strong>Equivalent.</strong> Both expressions match on all ${result.rows} input combinations.</div>`:`<div class="error" role="status"><strong>Not equivalent.</strong> For ${Object.entries(result.values).map(([k,v])=>k+' = '+v).join(', ')||'these constants'}, the original gives ${result.a}, but your version gives ${result.b}.</div>`;}catch(e){compareResult=`<div class="error" role="alert">${esc(e.message)}</div>`;}render();}});
main.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-row],[data-expr-row]')){e.preventDefault();e.target.click();}});
const help=document.getElementById('help-dialog');document.getElementById('help-button').addEventListener('click',()=>help.showModal());document.getElementById('close-help').addEventListener('click',()=>help.close());document.getElementById('start-help').addEventListener('click',()=>help.close());document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();navigate('gates');});window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)));updateProgress();navigate(location.hash.slice(1)||'gates');
