(function(root){
  'use strict';
  const gates={
    AND:{name:'AND',tag:'Both together',symbol:'·',rule:'The output is 1 only when both inputs are 1.',title:'Two yeses make a yes.',memory:'AND needs every input to be 1. One 0 is enough to switch the output OFF.',analogy:'The two-key safe',analogyText:'Imagine a safe with two keys. Both keys must turn for the door to open.',icon:'⚿'},
    OR:{name:'OR',tag:'Either is enough',symbol:'+',rule:'The output is 1 when at least one input is 1.',title:'One yes is enough.',memory:'OR includes the “both” case: 1 OR 1 is still 1.',analogy:'The two-door room',analogyText:'You can enter through door A or door B. Either open door gets you inside; both can be open too.',icon:'↗'},
    XOR:{name:'XOR',tag:'Different wins',symbol:'⊕',rule:'The output is 1 when the two inputs are different.',title:'Different inputs. Bright idea.',memory:'For two inputs, XOR means exactly one 1. Two matching inputs always give 0.',analogy:'The odd-one rule',analogyText:'Think of two light switches: the light is on when their positions differ, and off when they match.',icon:'⇄'},
    NOT:{name:'NOT',tag:'Flip the bit',symbol:'¬',rule:'The output is the opposite of its single input.',title:'Turn a yes into a no.',memory:'NOT has just one input. It changes 0 to 1, and 1 to 0.',analogy:'The opposite-day switch',analogyText:'Every answer gets reversed. If the input says “on”, the output says “off”.',icon:'◐'}
  };
  function gate(op,a,b){switch(op){case'AND':return a&b;case'OR':return a|b;case'XOR':return a^b;case'NOT':return 1-a;default:throw Error('Unknown gate');}}
  function tokenize(source){
    if(source.length>180)throw Error('Keep your expression under 180 characters.');
    const tokens=[];let i=0;
    while(i<source.length){const s=source.slice(i),ws=s.match(/^\s+/);if(ws){i+=ws[0].length;continue;}
      const word=s.match(/^(AND|XOR|NOT|OR)\b/i);if(word){tokens.push({type:word[1].toUpperCase()});i+=word[0].length;continue;}
      const c=s[0];if(/[ABCabc01]/.test(c)){tokens.push({type:'value',value:c.toUpperCase()});i++;continue;}
      const map={'!':'NOT','~':'NOT','¬':'NOT','&':'AND','·':'AND','*':'AND','∧':'AND','|':'OR','+':'OR','∨':'OR','^':'XOR','⊕':'XOR','(':'(',')':')',"'":'POSTNOT'};
      if(map[c]){tokens.push({type:map[c]});i++;continue;}throw Error('I could not read “'+c+'”. Use A, B, C, 0, 1 and logic operators.');
    }return tokens;
  }
  function parse(source){
    const t=tokenize(source);let pos=0;const peek=()=>t[pos]?.type;
    function primary(){let n;if(peek()==='value'){n={op:'value',value:t[pos++].value};}else if(peek()==='('){pos++;n=or();if(peek()!==')')throw Error('A closing parenthesis “)” is missing.');pos++;}else throw Error('Expected A, B, C, 0, 1, NOT, or an opening parenthesis.');while(peek()==='POSTNOT'){pos++;n={op:'NOT',a:n};}return n;}
    function unary(){if(peek()==='NOT'){pos++;return{op:'NOT',a:unary()};}return primary();}
    function and(){let n=unary();while(peek()==='AND'){pos++;n={op:'AND',a:n,b:unary()};}return n;}
    function xor(){let n=and();while(peek()==='XOR'){pos++;n={op:'XOR',a:n,b:and()};}return n;}
    function or(){let n=xor();while(peek()==='OR'){pos++;n={op:'OR',a:n,b:xor()};}return n;}
    if(!t.length)throw Error('Enter an expression to start.');const ast=or();if(pos<t.length)throw Error('Unexpected input. Put an operator between values, for example A AND B.');return ast;
  }
  function evaluate(n,v){if(n.op==='value')return /^[01]$/.test(n.value)?Number(n.value):v[n.value];return gate(n.op,evaluate(n.a,v),n.b?evaluate(n.b,v):0);}
  function format(n){if(n.op==='value')return n.value;if(n.op==='NOT')return '¬'+(n.a.op==='value'?format(n.a):'('+format(n.a)+')');return '('+format(n.a)+' '+gates[n.op].symbol+' '+format(n.b)+')';}
  function variables(n){const s=new Set();function walk(x){if(x.op==='value'&&/^[ABC]$/.test(x.value))s.add(x.value);if(x.a)walk(x.a);if(x.b)walk(x.b);}walk(n);return [...s].sort();}
  function table(n,vars=variables(n)){return Array.from({length:2**vars.length},(_,i)=>{const vals={};vars.forEach((v,j)=>vals[v]=(i>>(vars.length-1-j))&1);return{values:vals,out:evaluate(n,vals)};});}
  function steps(n,v){const list=[];function walk(x){if(x.op==='value')return evaluate(x,v);const a=walk(x.a),b=x.b?walk(x.b):undefined;const out=gate(x.op,a,b??0);list.push({expression:format(x),operation:x.op==='NOT'?'NOT '+a:a+' '+x.op+' '+b,out});return out;}walk(n);return list;}
  function equivalent(a,b){const vars=[...new Set([...variables(a),...variables(b)])].sort();for(const row of table(a,vars)){const bv=evaluate(b,row.values);if(bv!==row.out)return{equal:false,values:row.values,a:row.out,b:bv};}return{equal:true,rows:2**vars.length};}
  function flip(type,q,x,y){switch(type){case'D':return x;case'T':return q===null?null:q^x;case'JK':return x?(y?(q===null?null:1-q):1):(y?0:q);case'SR':return x&&y?null:x?1:y?0:q;default:throw Error('Unknown flip-flop');}}
  const api={gates,gate,parse,evaluate,format,variables,table,steps,equivalent,flip};root.EmberLogic=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
