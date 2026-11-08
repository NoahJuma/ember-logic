const {test}=require('node:test'),assert=require('node:assert/strict');
const quiz=require('../physics-chapter2-quiz.js').create();
const close=(actual,expected,tol=1e-9)=>assert.ok(Math.abs(actual-expected)<=tol,`${actual} != ${expected}`);
test('all 72 numerical variants match independent one-dimensional motion calculations',()=>{
 for(let k=1;k<=3;k++){
  const cases={
   '2.1-1':2*k-(-2*k),'2.1-2':12*k/4,'2.1-3':(8*k-4*k)/4,'2.1-4':0,
   '2.2-1':2*k,'2.2-2':2*k*2,'2.2-3':(9*k-k)/2,'2.2-4':2*k/2,
   '2.3-1':k,'2.3-2':(8*k-2*k)/3,'2.3-3':(-2*k-(-8*k))/3,'2.3-4':2*k*3,
   '2.4-1':k*4,'2.4-2':k*4,'2.4-3':.5*k*16,'2.4-4':(4*k)**2/(2*k),
   '2.5-1':-(7+k),'2.5-2':-10*k,'2.5-3':10*k/10,'2.5-4':2*10*k/10,
   '2.6-1':k*4,'2.6-2':-k*4,'2.6-3':.5*4*2*k,'2.6-4':.5*k*16};
  for(const [prefix,value] of Object.entries(cases)){const item=quiz.find(q=>q.id===`${prefix}-${k}`);assert.ok(item,`${prefix}-${k}`);close(item.value,value)}
 }
});
test('two delayed balls in problem 2.89 hit ground together at the calculated speed',()=>{
 const g=9.8,h=20,delay=1,T=delay+Math.sqrt(2*h/g),v0=g*delay-g*delay**2/(2*T);
 close(h+v0*T-.5*g*T*T,0);close(h-.5*g*(T-delay)**2,0);close(v0,8.17764733845052);
 const printed=8.3;assert.ok(Math.abs(h+printed*T-.5*g*T*T)>.1);
});
test('rocket and data-fit examples respect stated conditions',()=>{
 const a=2.25,y=525,g=9.8,u=Math.sqrt(2*a*y),top=y+u*u/(2*g),fall=(u+Math.sqrt(u*u+2*g*y))/g;
 close(top,645.5357142857142);close(y+u*fall-.5*g*fall**2,0,1e-8);
 const xs=[0,1,2,3,4,5],ys=[5.95,5.52,5.08,4.55,3.96,3.40],xm=2.5,ym=ys.reduce((a,b)=>a+b,0)/6;
 const m=xs.reduce((a,x,i)=>a+(x-xm)*(ys[i]-ym),0)/xs.reduce((a,x)=>a+(x-xm)**2,0),b=ym-m*xm;
 close(m,-.513142857142857);close(b,6.026190476190476);close(5*b+12.5*m,23.71666666666667);close(12.5*b+125*m/6,64.63690476190473);
});
