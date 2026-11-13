const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');

test('reviewed physics figures retain an arrowhead on each independent directed path',()=>{
 const figures=['chapter8/figure-8-41.svg','chapter21/diagram-27.svg','chapter22/diagram-42.svg','chapter23/diagram-80.svg','chapter23/diagram-72.svg','chapter27/selector-24.svg','chapter27/lift-geometry.svg','chapter28/discussion-13.svg','chapter28/springs-74.svg','chapter31/phasors-54.svg','chapter34/autocollimation-78.svg','chapter35/speakers-3.svg','chapter37/spacetime-solution-67.svg'];
 for(const name of figures){const svg=fs.readFileSync('assets/physics/'+name,'utf8');for(const tag of svg.match(/<path\b[^>]*\/>/g)||[]){if(!tag.includes('marker-end='))continue;const data=tag.match(/\bd="([^"]+)"/);assert.ok(data,name);assert.equal((data[1].match(/[Mm]/g)||[]).length,1,`${name}: each directed subpath needs its own marker`);}}
 const motion=fs.readFileSync('assets/physics/chapter2/e2-28-solution.svg','utf8');const group=motion.match(/<g[^>]*marker-end="url\(#arrow\)"[^>]*>([\s\S]*?)<\/g>/);assert.ok(group);for(const tag of group[1].match(/<path\b[^>]*\/>/g)||[]){const d=tag.match(/\bd="([^"]+)"/);assert.equal((d[1].match(/[Mm]/g)||[]).length,1);}
 const field=fs.readFileSync('assets/physics/chapter21/diagram-27.svg','utf8');for(const x of [320,390,460])assert.match(field,new RegExp(`d="M${x} 105V215"[^>]*marker-end=`));
});
