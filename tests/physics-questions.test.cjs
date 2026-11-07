const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Q=require('../physics-questions.js');
const B=require('../physics-book.js');

test('every Physics answer has a complete question with the original multipart requirements',()=>{
  assert.deepEqual(Object.keys(Q.text).sort(),B.items.map(i=>i.id).sort());
  for(const item of B.items)assert.equal(item.prompt,Q.text[item.id]);
  assert.match(Q.text['1.50'],/1,420,405,751.786/);
  assert.match(Q.text['1.50'],/microwave and radio-wave bands/);
  assert.match(Q.text['1.50'],/\(d\).*age of the earth/);
  assert.match(Q.text['1.8'],/\(a\).*410 mg\/day/);
  assert.match(Q.text['1.8'],/µg\/day/);
  assert.match(Q.text['1.8'],/\(d\).*0.000070 g\/day.*mg\/day/);
  assert.match(Q.text['1.79'],/\(b\) If c = 0/);
  assert.match(Q.text['1.79'],/xz-plane and apply the right-hand rule/);
  assert.match(Q.text['1.79'],/component of A⃗ that is perpendicular to B⃗/);
  assert.match(Q.text['Bridge'],/425 N/);
  assert.match(Q.text['Bridge'],/1.50 m/);
  assert.match(Q.text['VP1.7.2'],/A⃗ − B⃗ \+ C⃗/);
});

test('all required textbook figure references have usable local image assets and accessible descriptions',()=>{
  assert.equal(Object.keys(Q.figures).length,11);
  for(const [key,figure]of Object.entries(Q.figures)){
    const svg=fs.readFileSync(path.join(__dirname,'../assets/physics/questions',figure.file),'utf8');
    assert.match(svg,/<svg[^>]+viewBox="0 0 \d+ \d+"/);
    const encoded=svg.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/)?.[1];
    assert.ok(encoded,key);
    const png=Buffer.from(encoded,'base64');
    assert.equal(png.subarray(1,4).toString(),'PNG');
    assert.ok(png.readUInt32BE(16)>=300,key);
    assert.ok(png.readUInt32BE(20)>=200,key);
    assert.ok(figure.alt.length>40,key);
  }
  for(const [id,text]of Object.entries(Q.text)){
    for(const m of text.matchAll(/(?:Fig\.|Figure)\s+([EP]1\.\d+)/g))assert.equal(Q.figureFor[id],m[1],id);
  }
});
