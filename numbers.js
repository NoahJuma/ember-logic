(function(root){
 'use strict';
 function parse(text,base,width=16){
  if(![2,10,16].includes(base))throw Error('Choose binary, decimal, or hexadecimal.');
  if(![8,16].includes(width))throw Error('Choose an 8-bit or 16-bit pattern.');
  let s=String(text).trim();if(s.length>100)throw Error('That input is too long for this lab.');
  if(base===2)s=s.replace(/^0b/i,'').replace(/[ _]/g,'');
  if(base===16)s=s.replace(/^0x/i,'').replace(/[ _]/g,'');
  if(!s)throw Error('Enter a number first.');
  if(!(base===2?/^[01]+$/:base===10?/^[0-9]+$/:/^[0-9a-f]+$/i).test(s))throw Error(base===2?'Binary uses only 0 and 1.':base===10?'Decimal uses digits 0–9. Use a whole, non-negative number.':'Hex uses 0–9 and A–F. For example, 2D or 0x2D.');
  const n=BigInt((base===2?'0b':base===16?'0x':'')+s);
  if(n>BigInt(2**width-1))throw Error('This '+width+'-bit lab accepts values from 0 to '+(2**width-1)+'.');
  return Number(n);
 }
 function repr(n,width=8){if(!Number.isInteger(n)||n<0||n>=2**width||![8,16].includes(width))throw Error('The number does not fit the selected bit width.');return{n,width,binary:n.toString(2).padStart(width,'0'),decimal:String(n),hex:n.toString(16).toUpperCase().padStart(width/4,'0')};}
 function nibbles(n,width=8){const r=repr(n,width);return r.hex.split('').map((digit,i)=>({digit,bits:r.binary.slice(i*4,i*4+4),value:parseInt(digit,16),position:r.hex.length-1-i,weight:16**(r.hex.length-1-i)}));}
 function division(n,base){if(!Number.isInteger(n)||n<0||n>65535||![2,16].includes(base))throw Error('Invalid division input.');const rows=[];do{const quotient=Math.floor(n/base),remainder=n%base;rows.push({n,base,quotient,remainder,digit:remainder.toString(16).toUpperCase()});n=quotient;}while(n>0);return rows;}
 function bitSum(n,width=8){return repr(n,width).binary.split('').flatMap((v,i)=>v==='1'?[2**(width-1-i)]:[]);}
 const api={parse,repr,nibbles,division,bitSum};root.EmberNumbers=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
