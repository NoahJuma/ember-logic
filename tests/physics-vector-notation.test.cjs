const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

test('physics source uses readable vector notation instead of the combining arrow glyph',()=>{
  const root=path.join(__dirname,'..');
  const files=fs.readdirSync(root).filter(name=>/^physics.*\.(js|html)$/.test(name));
  for(const file of files){
    const text=fs.readFileSync(path.join(root,file),'utf8');
    assert.doesNotMatch(text,/\u20d7/,`${file} contains a combining vector arrow`);
  }
});
