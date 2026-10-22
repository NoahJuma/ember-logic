(function(root){
  'use strict';
  const gates={
    AND:{name:'AND',tag:'Both together',symbol:'·',rule:'The output is 1 only when both inputs are 1.',title:'Two yeses make a yes.',memory:'AND needs every input to be 1. One 0 is enough to switch the output OFF.',analogy:'The two-key safe',analogyText:'Imagine a safe with two keys. Both keys must turn for the door to open.',icon:'⚿'},
    OR:{name:'OR',tag:'Either is enough',symbol:'+',rule:'The output is 1 when at least one input is 1.',title:'One yes is enough.',memory:'OR includes the “both” case: 1 OR 1 is still 1.',analogy:'The two-door room',analogyText:'You can enter through door A or door B. Either open door gets you inside; both can be open too.',icon:'↗'},
    XOR:{name:'XOR',tag:'Different wins',symbol:'⊕',rule:'The output is 1 when the two inputs are different.',title:'Different inputs. Bright idea.',memory:'For two inputs, XOR means exactly one 1. Two matching inputs always give 0.',analogy:'The odd-one rule',analogyText:'Think of two light switches: the light is on when their positions differ, and off when they match.',icon:'⇄'},
    NOT:{name:'NOT',tag:'Flip the bit',symbol:'¬',rule:'The output is the opposite of its single input.',title:'Turn a yes into a no.',memory:'NOT has just one input. It changes 0 to 1, and 1 to 0.',analogy:'The opposite-day switch',analogyText:'Every answer gets reversed. If the input says “on”, the output says “off”.',icon:'◐'},
    NAND:{name:'NAND',tag:'AND, then invert',symbol:'NAND',rule:'The output is 0 only when both inputs are 1.',title:'Both on? Turn the answer off.',memory:'NAND is NOT AND. Compute AND first, then reverse its result. The output bubble means inversion.',analogy:'The almost-always-open door',analogyText:'The door closes only when both switches are on. Every other combination keeps it open.',icon:'⊼'},
    NOR:{name:'NOR',tag:'OR, then invert',symbol:'NOR',rule:'The output is 1 only when both inputs are 0.',title:'No yeses make a yes.',memory:'NOR is NOT OR. Any input of 1 makes OR = 1 and therefore NOR = 0.',analogy:'The quiet-room light',analogyText:'The quiet sign lights up only when neither person is speaking. One voice is enough to turn it off.',icon:'⊽'},
    XNOR:{name:'XNOR',tag:'Matching wins',symbol:'XNOR',rule:'The output is 1 when the two inputs match.',title:'A match worth lighting up.',memory:'XNOR reverses XOR. 00 and 11 give 1; 01 and 10 give 0.',analogy:'The matching-pair detector',analogyText:'A pair is accepted when both answers agree. Both no and both yes count as a match.',icon:'≡'}
  };
  function gate(op,a,b){switch(op){case'AND':return a&b;case'OR':return a|b;case'XOR':return a^b;case'NOT':return 1-a;case'NAND':return 1-(a&b);case'NOR':return 1-(a|b);case'XNOR':return 1-(a^b);default:throw Error('Unknown gate');}}
  function tokenize(source){
    if(source.length>600)throw Error('Keep your expression under 600 characters.');
    const tokens=[];let i=0;
    while(i<source.length){const s=source.slice(i),ws=s.match(/^\s+/);if(ws){i+=ws[0].length;continue;}
      const word=s.match(/^(NAND|XNOR|NOR|AND|XOR|NOT|OR)\b/i);if(word){tokens.push({type:word[1].toUpperCase()});i+=word[0].length;continue;}
      const c=s[0];if(/[ABCDabcd01]/.test(c)){tokens.push({type:'value',value:c.toUpperCase()});i++;continue;}
      const map={'!':'NOT','~':'NOT','¬':'NOT','&':'AND','·':'AND','*':'AND','∧':'AND','|':'OR','+':'OR','∨':'OR','^':'XOR','⊕':'XOR','⊼':'NAND','⊽':'NOR','⊙':'XNOR','(':'(',')':')',"'":'POSTNOT'};
      if(map[c]){tokens.push({type:map[c]});i++;continue;}throw Error('I could not read “'+c+'”. Use A, B, C, D, 0, 1 and logic operators.');
    }return tokens;
  }
  function parse(source){
    const t=tokenize(source);let pos=0;const peek=()=>t[pos]?.type;
    function primary(){let n;if(peek()==='value'){n={op:'value',value:t[pos++].value};}else if(peek()==='('){pos++;n=or();if(peek()!==')')throw Error('A closing parenthesis “)” is missing.');pos++;}else throw Error('Expected A, B, C, D, 0, 1, NOT, or an opening parenthesis.');while(peek()==='POSTNOT'){pos++;n={op:'NOT',a:n};}return n;}
    function unary(){if(peek()==='NOT'){pos++;return{op:'NOT',a:unary()};}return primary();}
    function and(){let n=unary();while(['AND','NAND'].includes(peek())){const op=t[pos++].type;n={op,a:n,b:unary()};}return n;}
    function xor(){let n=and();while(['XOR','XNOR'].includes(peek())){const op=t[pos++].type;n={op,a:n,b:and()};}return n;}
    function or(){let n=xor();while(['OR','NOR'].includes(peek())){const op=t[pos++].type;n={op,a:n,b:xor()};}return n;}
    if(!t.length)throw Error('Enter an expression to start.');const ast=or();if(pos<t.length)throw Error('Unexpected input. Put an operator between values, for example A AND B.');if(count(ast)>10)throw Error('Use up to 10 operations per expression. Each NOT also counts as one operation.');return ast;
  }
  function evaluate(n,v){if(n.op==='value')return /^[01]$/.test(n.value)?Number(n.value):v[n.value];return gate(n.op,evaluate(n.a,v),n.b?evaluate(n.b,v):0);}
  function format(n){if(n.op==='value')return n.value;if(n.op==='NOT')return '¬'+(n.a.op==='value'?format(n.a):'('+format(n.a)+')');return '('+format(n.a)+' '+gates[n.op].symbol+' '+format(n.b)+')';}
  function variables(n){const s=new Set();function walk(x){if(x.op==='value'&&/^[ABCD]$/.test(x.value))s.add(x.value);if(x.a)walk(x.a);if(x.b)walk(x.b);}walk(n);return [...s].sort();}
  function count(n){return n.op==='value'?0:1+count(n.a)+(n.b?count(n.b):0);}
  function table(n,vars=variables(n)){return Array.from({length:2**vars.length},(_,i)=>{const vals={};vars.forEach((v,j)=>vals[v]=(i>>(vars.length-1-j))&1);return{values:vals,out:evaluate(n,vals)};});}
  function steps(n,v){const list=[];function walk(x){if(x.op==='value')return evaluate(x,v);const a=walk(x.a),b=x.b?walk(x.b):undefined;const out=gate(x.op,a,b??0);list.push({expression:format(x),operation:x.op==='NOT'?'NOT '+a:a+' '+x.op+' '+b,out});return out;}walk(n);return list;}
  function equivalent(a,b){const vars=[...new Set([...variables(a),...variables(b)])].sort();for(const row of table(a,vars)){const bv=evaluate(b,row.values);if(bv!==row.out)return{equal:false,values:row.values,a:row.out,b:bv};}return{equal:true,rows:2**vars.length};}
  function flip(type,q,x,y){switch(type){case'D':return x;case'T':return q===null?null:q^x;case'JK':return x?(y?(q===null?null:1-q):1):(y?0:q);case'SR':return x&&y?null:x?1:y?0:q;default:throw Error('Unknown flip-flop');}}
  const api={gates,gate,parse,evaluate,format,variables,table,steps,equivalent,flip,count};root.EmberLogic=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
