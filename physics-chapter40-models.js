(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.EmberChapter40Models=factory()})(typeof window!=='undefined'?window:globalThis,function(){'use strict';
const h=6.62607015e-34,e=1.602176634e-19,me=9.1093837015e-31;
function box({width,n,start=0,end=1}){
 if([width,n,start,end].some(x=>x===''||x===null||!Number.isFinite(Number(x))))throw new RangeError('finite inputs required');
 width=Number(width);n=Number(n);start=Number(start);end=Number(end);
 if(width<=0||!Number.isInteger(n)||n<1||n>50||start<0||end>1||start>end)throw new RangeError('invalid box input');
 const L=width*1e-9,E=n*n*h*h/(8*me*L*L*e);
 const probability=(end-start)-(Math.sin(2*n*Math.PI*end)-Math.sin(2*n*Math.PI*start))/(2*n*Math.PI);
 if(!Number.isFinite(E)||E<=0||!Number.isFinite(probability))throw new RangeError('result out of range');
 return {energyEV:E,probability:Math.min(1,Math.max(0,probability))};
}
function density(n,x){if(!Number.isInteger(n)||n<1||n>50||!Number.isFinite(x)||x<0||x>1)throw new RangeError('invalid density input');return 2*Math.sin(n*Math.PI*x)**2}
return {box,density};});
