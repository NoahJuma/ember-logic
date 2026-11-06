const test=require('node:test');
const assert=require('node:assert/strict');
const P=require('../physics-core.js');
const B=require('../physics-book.js');
const C=require('../physics-content.js');
const V=require('../physics-lab.js');
const near=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<=tol,`${a} should be within ${tol} of ${b}`);
const vectorNear=(a,b,tol=1e-8)=>a.forEach((n,i)=>near(n,b[i],tol));
const item=id=>B.items.find(i=>i.id===id);

test('physics book covers all numbered, discussion, guided and bridging questions exactly once',()=>{
  const ids=B.items.map(i=>i.id);assert.equal(new Set(ids).size,129);assert.equal(ids.length,129);
  for(let n=1;n<=94;n++)assert.ok(ids.includes('1.'+n));
  for(let n=1;n<=26;n++)assert.ok(ids.includes('Q1.'+n));
  for(const section of ['1.7','1.10'])for(let n=1;n<=4;n++)assert.ok(ids.includes(`VP${section}.${n}`));
  assert.ok(ids.includes('Bridge'));
  for(const i of B.items){assert.ok(i.steps.length>=3,i.id);assert.ok(i.answer.length>0,i.id);assert.ok(B.topics[i.topic],i.id);assert.ok(i.page>=54&&i.page<=61,i.id);}
});
test('unit conversions preserve tiny values and raise the factor to the correct dimension',()=>{
  near(P.convert(2.5,'m','cm'),250);
  near(P.convert(1,'cm','m',2),1e-4,1e-18);
  near(P.convert(1,'cm','m',3),1e-6,1e-18);
  near(P.convert(4.2e6,'µm','m',3),4.2e-12,1e-25);
  near(P.convert(480e6*4.2e6,'µm','m',3)*1000,2.016);
  assert.notEqual(P.fmt(1e-27),'0');assert.notEqual(P.fmt(1e-6),'0');
  assert.equal(P.convert(2,'m','kg'),null);
});
test('signs, quadrants, bearings, zero directions and projection are handled correctly',()=>{
  vectorNear(P.polar(5,90),[0,5,0]);
  near(P.direction([2,-1,0]),333.434948822922);
  near(P.direction([-2,1,0]),153.434948822922);
  vectorNear(P.bearingVector(10,90),[10,0,0]);
  near(P.bearing([1,0,0]),90);assert.equal(P.direction([0,0,0]),null);
  assert.equal(P.angle([0,0,0],[1,0,0]),null);assert.equal(P.unit([0,0,0]),null);
  assert.equal(P.projection([1,2,3],[0,0,0]),null);
  vectorNear(P.projection([-3,4,0],[2,0,0]),[-3,0,0]);
  near(P.angle([1e-14,0,0],[0,1e-14,0]),90);
  vectorNear(P.unit([0,0,-1e-14]),[0,0,-1]);
});
test('cross products obey antisymmetry, perpendicularity and the product identity over varied inputs',()=>{
  for(let i=-4;i<=4;i++)for(let j=-3;j<=3;j++){
    const a=[i,j,2],b=[j,3,-i],c=P.cross(a,b);
    vectorNear(c,P.scale(P.cross(b,a),-1));near(P.dot(a,c),0);near(P.dot(b,c),0);
    near(P.dot(c,c)+P.dot(a,b)**2,P.dot(a,a)*P.dot(b,b));
  }
  vectorNear(P.cross([2,0,0],[0,3,0]),[0,0,6]);
});
test('checked diagram orientations and source-specific cave distances produce the intended results',()=>{
  vectorNear(B.fig22.A,[0,-8,0]);vectorNear(B.fig22.B,[7.5,12.9903810568,0],1e-9);
  near(P.direction(B.fig22.C),205);near(P.direction(B.fig22.D),143);
  near(P.direction(B.fig37.A),70);near(P.direction(B.fig37.B),210);
  const delivery=item('1.21').interactive[0];vectorNear(delivery.expected,[4+3.1/Math.sqrt(2),2.6+3.1/Math.sqrt(2),0]);
  near(P.norm(item('1.23').interactive[0].expected),143.5465347483,1e-8);
  near(P.norm(item('1.57').interactive[0].expected),138.0214460078,1e-8);
  assert.notDeepEqual(item('1.23').interactive[0].expected,item('1.57').interactive[0].expected);
});
test('route solutions close at their stated destinations and 3D height is included',()=>{
  for(const i of B.items)for(const p of i.interactive||[])if(p.mode==='route'){
    const summed=p.legs.reduce((a,b)=>a.map((x,k)=>x+b[k]),[0,0,0]);
    if(p.destination)vectorNear(summed.map((x,k)=>x+p.expected[k]),p.destination,1e-8);
    else vectorNear(p.expected,summed,1e-8);
  }
  vectorNear(item('1.66').interactive[0].expected,[-8,12,22]);near(P.norm(item('1.66').interactive[0].expected),Math.sqrt(692));
  vectorNear(item('1.90').interactive[0].expected,[-160,-350,0]);
});
test('vector solutions satisfy independent defining conditions',()=>{
  vectorNear(item('1.36').interactive[0].expected,[-1,9,0]);
  vectorNear(item('1.39').interactive[0].expected,[-5,2,7]);
  vectorNear(item('1.42').interactive[0].expected,[0,0,-43]);
  vectorNear(item('1.47').interactive[0].expected,[0,-2,0]);
  const normal=item('1.84').interactive[0].expected;
  near(P.norm(normal),1);near(P.dot(normal,[-2,3,4]),0);near(P.dot(normal,[3,1,-3]),0);
  const c=item('1.85').interactive[0].expected;near(5*c[0]-6.5*c[1],0);near(3.5*c[0]-7*c[1],15);
  vectorNear(item('1.76').interactive[0].expected,[0,0,1.2]);
});
test('guided results agree with the printed answer key to its stated precision',()=>{
  const checks=[['VP1.7.1',12.7,309],['VP1.7.2',115,42],['VP1.7.3',11.2,225],['VP1.7.4',68.7,207]];
  for(const [id,length,theta]of checks){const v=item(id).interactive[0].expected;near(P.norm(v),length,.5);near(P.direction(v),theta,.5);}
  for(const id of ['VP1.10.1','VP1.10.2']){const p=item(id).interactive[0];near(P.dot(p.a,p.b),-26.8,.1);}
  const p=item('VP1.10.3').interactive[0];near(P.angle(p.a,p.b),91,.1);
  const w=item('VP1.10.4').interactive[0];near(P.dot(w.a,w.b),26);near(P.angle(w.a,w.b),77.7,.1);
});
test('density ranking, sphere volume, uncertainty bounds and ambiguous angle are independently checked',()=>{
  const densities={A:8/1.67,B:6e-6/9.38e-6,C:.008/.0025,D:.9/2.81,E:9e-5/1.59e-5,F:6e-5/1.25e-4};
  const sorted=Object.keys(densities).sort((a,b)=>densities[a]-densities[b]);assert.deepEqual(sorted,['D','F','B','C','A','E']);
  assert.match(item('1.87').answer,/D, F, B, C, A, E/);
  near(Math.PI*.036**2*12.1*1000,49.2651993565,1e-8);
  near(7.61*1.51-11.4,.0911);near(11.4-7.59*1.49,.0909);
  const acute=Math.asin(Math.sqrt(29)/9);near(Math.sin(acute),Math.sin(Math.PI-acute));assert.match(item('1.86').answer,/or/);
});
test('all interactive models have finite geometry and match their algebraic target',()=>{
  for(const i of B.items)for(const p of i.interactive||[]){
    for(const v of [p.a,p.b,...(p.expected?[p.expected]:[])])assert.ok(v.every(Number.isFinite),i.id);
    const r=V.result(p);if(p.expected)vectorNear(r,p.expected,1e-7);
    for(const three of [false,true]){
      const html=V.sceneMarkup(p,V.defaultCamera(three),390,480,V.extentFor(p));assert.doesNotMatch(html,/NaN|Infinity/,i.id);
    }
  }
});
test('vector feedback rejects blank/non-finite and wrong signs while allowing rounding',()=>{
  assert.equal(P.compareVector([NaN,0,0],[0,0,0]).valid,false);
  assert.equal(P.compareVector([Infinity,0,0],[1,0,0]).valid,false);
  assert.equal(P.compareVector([3,4,0],[3,4,0]).correct,true);
  assert.equal(P.compareVector([3,-4,0],[3,4,0]).correct,false);
  assert.equal(P.compareVector([7.50,12.99,0],B.fig22.B).correct,true);
});
test('all four quiz levels include problems, terms and mathematical language',()=>{
  assert.equal(C.quiz.length,48);assert.equal(new Set(C.quiz.map(q=>q.id)).size,48);
  for(let level=1;level<=4;level++)for(const type of ['problems','terms','language']){
    const qs=C.quiz.filter(q=>q.level===level&&q.type===type);assert.equal(qs.length,4);
    for(const q of qs){assert.equal(new Set(q.options).size,4);assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.why.length>30);}
  }
  assert.equal(C.lessons.length,10);assert.ok(C.lessons.every(l=>l.steps.length>=3&&l.answer));
});
