(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Physics = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const rad = d => d * Math.PI / 180;
  const deg = r => r * 180 / Math.PI;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const vec = a => [0, 1, 2].map(i => Number(a[i] || 0));
  const add = (a, b) => vec(a).map((v, i) => v + vec(b)[i]);
  const scale = (a, s) => vec(a).map(v => v * s);
  const sub = (a, b) => add(a, scale(b, -1));
  const sum = vs => vs.reduce(add, [0, 0, 0]);
  const dot = (a, b) => vec(a).reduce((s, v, i) => s + v * vec(b)[i], 0);
  const norm = a => Math.hypot(...vec(a));
  const cross = (a, b) => { const [x,y,z] = vec(a), [u,v,w] = vec(b); return [y*w-z*v, z*u-x*w, x*v-y*u]; };
  const unit = a => norm(a) > 0 ? vec(a).map(x=>x/norm(a)) : null;
  const polar = (length, angle) => [Math.cos(rad(angle)), Math.sin(rad(angle)), 0].map(v=>Math.abs(v)<1e-14?0:length*v);
  const bearingVector = (length, bearing) => polar(length, 90 - bearing);
  const direction = a => Math.hypot(a[0],a[1]) === 0 ? null : (deg(Math.atan2(a[1],a[0])) + 360) % 360;
  const bearing = a => direction(a) === null ? null : (90 - direction(a) + 360) % 360;
  const angle = (a,b) => norm(a)===0||norm(b)===0 ? null : deg(Math.acos(clamp(dot(unit(a),unit(b)),-1,1)));
  const projection = (a,b) => norm(b)===0 ? null : scale(unit(b),dot(a,unit(b)));
  const fmt = (x, digits=4) => !Number.isFinite(x) ? 'undefined' : x===0 ? '0' : Number(x.toPrecision(digits)).toString().replace('e-', ' × 10^−').replace('e+', ' × 10^');
  const tuple = a => '(' + vec(a).map(v=>fmt(v)).join(', ') + ')';
  function compareVector(actual, expected, tolerance) {
    if (!Array.isArray(actual) || actual.length !== 3 || !actual.every(Number.isFinite)) return {valid:false,correct:false,components:[]};
    const tol = tolerance === undefined ? Math.max(0.015, norm(expected)*0.006) : tolerance;
    const components = actual.map((x,i)=>Math.abs(x-expected[i]) <= tol);
    return {valid:true,correct:components.every(Boolean),components,tolerance:tol,error:norm(sub(actual,expected))};
  }
  function solveRoute(legs, destination) {
    const position = sum(legs);
    return {position, result: destination ? sub(destination,position) : position, distance: legs.reduce((s,v)=>s+norm(v),0)};
  }
  const units = {
    length: {m:1, km:1000, cm:.01, mm:.001, 'µm':1e-6, nm:1e-9},
    mass: {kg:1,g:.001,mg:1e-6,'µg':1e-9,ng:1e-12},
    time: {s:1,ms:.001,'µs':1e-6,ns:1e-9,min:60,h:3600,day:86400,year:31536000}
  };
  function convert(value, from, to, power=1) {
    const family = Object.values(units).find(u=>from in u && to in u);
    if (!family || !Number.isFinite(value) || ![1,2,3].includes(power)) return null;
    return value * Math.pow(family[from]/family[to], power);
  }
  function project(point, camera, width=700, height=480, extent=8) {
    const s=Math.min(width,height)*.36/extent*camera.zoom;
    if (!camera.three) return {x:width/2+point[0]*s+camera.panX,y:height/2-point[1]*s+camera.panY,depth:point[2]};
    const c=Math.cos(camera.yaw),si=Math.sin(camera.yaw),p=Math.cos(camera.pitch),q=Math.sin(camera.pitch);
    const x=point[0]*c-point[1]*si, d=point[0]*si+point[1]*c;
    return {x:width/2+x*s+camera.panX,y:height/2-(point[2]*p-d*q)*s+camera.panY,depth:d*p+point[2]*q};
  }
  return {rad,deg,clamp,vec,add,sub,scale,sum,dot,norm,cross,unit,polar,bearingVector,direction,bearing,angle,projection,fmt,tuple,compareVector,solveRoute,units,convert,project};
});
