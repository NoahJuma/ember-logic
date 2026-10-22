(function(root){
 'use strict';
 const bases=[2,8,10,16],widths=[8,16,32,64],MAX=(1n<<64n)-1n;
 function widthCheck(width){if(!widths.includes(width))throw Error('Choose an 8-, 16-, 32-, or 64-bit pattern.');}
 function max(width=64){widthCheck(width);return(1n<<BigInt(width))-1n;}
 function integer(value){let n;if(typeof value==='bigint')n=value;else if(typeof value==='number'&&Number.isSafeInteger(value))n=BigInt(value);else throw Error('Pass an exact integer. Enter large values as digits, without rounding.');if(n<0n||n>MAX)throw Error('Use an unsigned whole number from 0 to '+MAX+'.');return n;}
 function parse(text,base,width=64){
  if(!bases.includes(base))throw Error('Choose binary, octal, decimal, or hexadecimal.');widthCheck(width);if(typeof text==='number'&&!Number.isSafeInteger(text))throw Error('Enter large values as exact digit strings, without rounding.');
  let s=String(text).trim();if(s.length>256)throw Error('That input is too long for this lab.');s=s.replace(/[\s_]/g,'');
  const prefix=s.match(/^0([box])/i),prefixBases={b:2,o:8,x:16};
  if(prefix){const detected=prefixBases[prefix[1].toLowerCase()];if(detected===base)s=s.slice(2);else if(!(base===16&&detected===2))throw Error('The '+prefix[0]+' prefix means base '+detected+'. Select that input base, or remove the prefix.');}
  if(base===10&&/^\d{1,3}(,\d{3})+$/.test(s))s=s.replace(/,/g,'');if(!s)throw Error('Enter a number first.');
  const patterns={2:/^[01]+$/,8:/^[0-7]+$/,10:/^[0-9]+$/,16:/^[0-9a-f]+$/i};
  if(!patterns[base].test(s))throw Error({2:'Binary uses only 0 and 1.',8:'Octal uses only digits 0–7. Digits 8 and 9 are not valid.',10:'Decimal uses digits 0–9. Enter a non-negative whole number, without exponents or fractions.',16:'Hex uses 0–9 and A–F. For example, 2D or 0x2D.'}[base]);
  const n=BigInt(({2:'0b',8:'0o',10:'',16:'0x'})[base]+s);if(n>max(width))throw Error('This value exceeds '+width+' unsigned bits. The allowed range is 0–'+max(width)+'.');return n;
 }
 function bitsNeeded(n){n=integer(n);return n===0n?1:n.toString(2).length;}
 function minWidth(n){const bits=bitsNeeded(n);return widths.find(w=>bits<=w);}
 function repr(value,width=8){const n=integer(value);widthCheck(width);if(n>max(width))throw Error('The number does not fit the selected '+width+'-bit width.');const binary=n.toString(2).padStart(width,'0'),minimumBits=bitsNeeded(n);const bytes=Array.from({length:width/8},(_,i)=>{const bits=binary.slice(i*8,i*8+8),value=Number(BigInt('0b'+bits)),index=width/8-1-i;return{index,bits,value,hex:value.toString(16).toUpperCase().padStart(2,'0'),highBit:index*8+7,lowBit:index*8};});return{n,width,binary,octal:n.toString(8),decimal:n.toString(10),hex:n.toString(16).toUpperCase().padStart(width/4,'0'),bytes,minimumBits,minimumBytes:Math.ceil(minimumBits/8),storageBytes:width/8};}
 function nibbles(value,width=8){const r=repr(value,width);return r.hex.split('').map((digit,i)=>({digit,bits:r.binary.slice(i*4,i*4+4),value:parseInt(digit,16),position:r.hex.length-1-i,weight:16n**BigInt(r.hex.length-1-i)}));}
 function groups(value,base,width=8){if(![8,16].includes(base))throw Error('Group binary into octal or hex digits.');const r=repr(value,width),size=base===8?3:4,padding=(size-width%size)%size,pattern='0'.repeat(padding)+r.binary;return{size,padding,groups:Array.from({length:pattern.length/size},(_,i)=>{const bits=pattern.slice(i*size,(i+1)*size),value=Number(BigInt('0b'+bits));return{bits,value,digit:value.toString(16).toUpperCase()};})};}
 function division(value,base){let n=integer(value);if(![2,8,16].includes(base))throw Error('Divide by 2, 8, or 16.');const b=BigInt(base),rows=[];do{const quotient=n/b,remainder=Number(n%b);rows.push({n,base,quotient,remainder,digit:remainder.toString(16).toUpperCase()});n=quotient;}while(n>0n);return rows;}
 function bitSum(value,width=8){return repr(value,width).binary.split('').flatMap((v,i)=>v==='1'?[1n<<BigInt(width-1-i)]:[]);}
 function toggle(value,bit,width=8){const n=repr(value,width).n;if(!Number.isInteger(bit)||bit<0||bit>=width)throw Error('Choose a bit inside the selected width.');return n^(1n<<BigInt(bit));}
 const api={bases,widths,MAX,max,parse,repr,nibbles,groups,division,bitSum,bitsNeeded,minWidth,toggle};root.EmberNumbers=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
