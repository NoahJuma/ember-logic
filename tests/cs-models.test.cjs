const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('../cs-chapter-models.js');

const flip = (bits, ...positions) => [...bits].map((bit, i) => positions.includes(i) ? String(1 - Number(bit)) : bit).join('');

test('gate truth tables and an asynchronous latch keep calculation separate from memory', () => {
  const tables = {AND:'0001', OR:'0111', XOR:'0110', NAND:'1110', NOR:'1000', XNOR:'1001'};
  for (const [gate, expected] of Object.entries(tables)) {
    assert.equal([[0,0],[0,1],[1,0],[1,1]].map(([a,b]) => M.gate(gate,a,b)).join(''), expected);
  }
  assert.equal(M.gate('NOT',0),1);
  assert.equal(M.gate('NOT',1),0);
  assert.equal(M.latch(0,1,0),1);
  assert.equal(M.latch(1,0,0),1);
  assert.equal(M.latch(1,0,1),0);
  assert.equal(M.latch(0,0,0),0);
  assert.equal(M.latch(0,1,1),null);
  assert.throws(() => M.gate('AND',2,1));
});

test('memory addresses select independent bytes, reads preserve contents, and power loss clears volatile state', () => {
  const initial = M.memory();
  const first = M.memoryAction(initial,'write',2,65);
  const second = M.memoryAction(first,'write',5,255);
  assert.deepEqual(initial.cells,Array(8).fill(null));
  assert.equal(second.cells[2],65);
  assert.equal(second.cells[5],255);
  assert.equal(M.memoryAction(second,'read',2).output,65);
  assert.equal(M.memoryAction(second,'read',1).output,null);
  assert.deepEqual(M.memoryAction(second,'read',2).cells,second.cells);
  const off = M.memoryAction(second,'power');
  assert.equal(off.powered,false);
  assert.deepEqual(off.cells,Array(8).fill(null));
  assert.equal(M.memoryAction(off,'power').powered,true);
  assert.throws(() => M.memoryAction(off,'read',0),/memory-power/);
  for (const bad of ['', ' ', null, undefined, true, 256, -1, 1.5]) {
    if (bad === undefined) continue; // Omitting data intentionally uses the explicit API default.
    assert.throws(() => M.memoryAction(initial,'write',0,bad));
  }
  assert.throws(() => M.memoryAction(initial,'read',''));
});

test('binary fractions use exact rational arithmetic and identify repeating decimal input', () => {
  const value = M.binaryFraction('101.101');
  assert.equal(value.fraction,'45/8');
  assert.equal(value.value,5.625);
  assert.deepEqual(value.terms.map(t => t.weight),['4','2','1','1/2','1/4','1/8']);
  assert.equal(M.toBinary('5.625').binary,'101.101');
  assert.equal(M.toBinary('-21/8').binary,'-10.101');
  assert.equal(M.toBinary('0').binary,'0');
  assert.deepEqual(M.toBinary('13').wholeSteps,[{before:'13',quotient:'6',remainder:1},{before:'6',quotient:'3',remainder:0},{before:'3',quotient:'1',remainder:1},{before:'1',quotient:'0',remainder:1}]);
  const repeating = M.toBinary('0.1');
  assert.equal(repeating.exact,false);
  assert.equal(repeating.repeat,1);
  assert.equal(repeating.digits,'00011');
  assert.deepEqual(repeating.steps[0],{before:'1/10',doubled:'1/5',digit:0,remainder:'1/5'});
  assert.equal(M.fraction(M.parseRational('2,625')),'21/8');
  assert.throws(() => M.parseRational('1/0'),/zero-denominator/);
  assert.throws(() => M.parseRational(''));
  assert.throws(() => M.binaryFraction('102.01'));
});

test('every four-bit signed integer round-trips through two’s complement and excess eight', () => {
  for (let n=-8;n<=7;n++) {
    const result=M.representations(n,4);
    assert.equal(M.decodeInteger(result.twos).twos,BigInt(n));
    assert.equal(M.decodeInteger(result.excess).excess,BigInt(n));
    assert.equal(result.bias,8n);
  }
  assert.deepEqual([M.representations(-5,4).twos,M.representations(-5,4).excess],['1011','0011']);
  assert.equal(M.representations(8,4).twos,null);
  assert.equal(M.representations(-9,4).excess,null);
  assert.equal(M.representations(15,4).unsigned,'1111');
  assert.equal(M.representations(16,4).unsigned,null);
  assert.deepEqual(M.representations('−5',4),M.representations('-5',4));
  assert.equal(M.addTwos('−5','2',4).stored.twos,-3n);
});

test('all 256 pairs of four-bit signed operands distinguish carry from overflow', () => {
  for (let a=-8;a<=7;a++) for (let b=-8;b<=7;b++) {
    const actual=M.addTwos(a,b,4), exact=a+b;
    const unsigned=((exact%16)+16)%16, signed=unsigned>=8?unsigned-16:unsigned;
    assert.equal(actual.stored.twos,BigInt(signed));
    assert.equal(actual.overflow,exact < -8 || exact > 7);
    assert.equal(actual.exact,BigInt(exact));
    assert.equal(actual.carry,Number(((a+16)%16)+((b+16)%16)>=16));
  }
  assert.equal(M.addTwos(5,6,4).overflow,true);
  assert.equal(M.addTwos(5,6,4).carry,0);
  assert.equal(M.addTwos(-1,1,4).overflow,false);
  assert.equal(M.addTwos(-1,1,4).carry,1);
  assert.throws(() => M.addTwos(8,0,4),/signed-range/);
});

test('all 256 book float patterns decode with excess four and a fractional four-bit mantissa', () => {
  for (let byte=0;byte<256;byte++) {
    const pattern=byte.toString(2).padStart(8,'0'), actual=M.decodeFloat(pattern);
    const expected=(byte&128?-1:1)*(byte&15)/16*2**(((byte>>4)&7)-4);
    assert.equal(actual.value,expected===0?0:expected);
    if ((byte&15)>=8 || byte===0) {
      const encoded=M.encodeFloat(actual.rational);
      assert.equal(encoded.status,'ok');
      assert.equal(encoded.bits,pattern);
      assert.equal(encoded.exact,true);
    }
  }
  assert.equal(M.decodeFloat('01101011').value,2.75);
  assert.equal(M.decodeFloat('00111100').value,.375);
  assert.equal(M.decodeFloat('01011001').value,1.125);
  assert.equal(M.decodeFloat('00000001').fraction,'1/256');
  assert.equal(M.decodeFloat('00000001').normalized,false);
  assert.equal(M.decodeFloat('00001000').fraction,'1/32');
  assert.equal(M.decodeFloat('01111111').value,7.5);
});

test('book float encoding truncates extra bits and treats zero and range limits explicitly', () => {
  const encoded=M.encodeFloat('2.625');
  assert.equal(encoded.bits,'01101010');
  assert.equal(encoded.stored.value,2.5);
  assert.equal(encoded.error,'1/8');
  assert.equal(encoded.exact,false);
  assert.equal(encoded.normalizedBinaryOriginal,'.10101 × 2^2');
  assert.equal(encoded.normalizedBinary,'.1010 × 2^2');
  assert.equal(encoded.keptBits,'1010');
  assert.equal(encoded.discardedBits,'1');
  assert.equal(M.encodeFloat('-2.625').stored.value,-2.5);
  assert.equal(M.encodeFloat('-2.625').error,'-1/8');
  assert.equal(M.encodeFloat('0').bits,'00000000');
  assert.equal(M.encodeFloat('1/64').status,'underflow');
  assert.equal(M.encodeFloat('8').status,'overflow');
  assert.equal(M.encodeFloat('-8').status,'overflow');
  assert.equal(M.encodeFloat('7.9').stored.value,7.5);
  assert.equal(M.floatSum(['2.5','0.125','0.125']).result,'5/2');
  assert.equal(M.floatSum(['0.125','0.125','2.5']).result,'11/4');
});

test('floating-point addition stores incoming operands before adding, then stores each sum', () => {
  const result=M.floatSum(['1/8','-1/10']);
  assert.equal(result.status,'ok');
  assert.equal(result.result,'1/32');
  assert.equal(result.steps[1].input,'-1/10');
  assert.equal(result.steps[1].right,'-3/32');
  assert.equal(result.steps[1].operand.exact,false);
  assert.equal(result.steps[1].exact,'1/32');
  assert.equal(M.floatSum(['1/8','1/64']).status,'underflow');
  assert.equal(M.floatSum(['1/8','8']).status,'overflow');
});

test('float teaching previews distinguish retained, discarded, padded and continuing bits', () => {
  const finite=M.encodeFloat('1/2');
  assert.equal(finite.normalizedBinaryOriginal,'.1 × 2^0');
  assert.equal(finite.keptBits,'1000');
  assert.equal(finite.discardedBits,'');
  assert.equal(finite.previewTruncated,false);
  const repeating=M.encodeFloat('1/3');
  assert.equal(repeating.keptBits,'1010');
  assert.match(repeating.normalizedBinaryOriginal,/^\.101010101010101010101010… × 2\^-1$/);
  assert.equal(repeating.discardedBits,'10101010101010101010…');
  assert.equal(repeating.previewTruncated,true);
});

test('UTF-8 bytes match the platform encoder for ASCII, Swedish and supplementary characters', () => {
  for (const text of ['', 'Hej!', 'Åäö', '世界', '🙂', 'e\u0301', '\u0000\u007f\u0080\u07ff\u0800\uffff\u{10000}\u{10ffff}']) {
    assert.deepEqual(M.utf8(text).bytes,[...new TextEncoder().encode(text)]);
    assert.equal(M.utf8(text).characters,Array.from(text).length);
  }
  assert.equal(M.utf8('A').ascii,true);
  assert.equal(M.utf8('Å').ascii,false);
  assert.throws(() => M.utf8('\ud800'),/surrogate/);
});

test('raw media sizing counts bits and rounds only the final packed byte count', () => {
  assert.deepEqual(M.imageSize(640,480,24),{bits:7372800n,bytes:921600n});
  assert.deepEqual(M.imageSize(3,3,1),{bits:9n,bytes:2n});
  assert.deepEqual(M.audioSize(44100,16,2,1),{bits:1411200n,bytes:176400n});
  for (const value of ['',null,0,-1,1.2]) assert.throws(() => M.imageSize(value,10,24));
});

test('run-length encoding is lossless, splits count overflow and can expand input', () => {
  const samples=['','AAAABBBCCDAA','ABABABAB','ÅÅÅ🙂🙂', 'A'.repeat(300)];
  for (let seed=0;seed<20;seed++) samples.push(Array.from({length:50},(_,i) => 'ABC'[(i*i+seed*i+seed)%3]).join(''));
  for (const input of samples) {
    const result=M.rle(input);
    assert.equal(result.decoded,input);
    assert.equal(result.runs.reduce((count,run)=>count+run.count,0),Array.from(input).length);
    assert.equal(result.runs.every(run=>run.count>0&&run.count<=255),true);
  }
  assert.deepEqual(M.rle('A'.repeat(300)).runs,[{symbol:'A',count:255},{symbol:'A',count:45}]);
  assert.ok(M.rle('ABABABAB').encodedBytes > M.rle('ABABABAB').originalBytes);
  assert.ok(M.rle('AAAAAAAA').encodedBytes < M.rle('AAAAAAAA').originalBytes);
  assert.equal(M.rle('ÅÅÅ').encodedBytes,3);
});

test('parity detects every single changed bit but does not detect two changed bits', () => {
  for (let value=0;value<128;value++) for (const kind of ['even','odd']) {
    const encoded=M.parity(value.toString(2).padStart(7,'0'),kind).encoded;
    assert.equal(M.parityCheck(encoded,kind).valid,true);
    for (let bit=0;bit<8;bit++) assert.equal(M.parityCheck(flip(encoded,bit),kind).valid,false);
    assert.equal(M.parityCheck(flip(encoded,0,1),kind).valid,true);
  }
  assert.equal(M.parity('1000001').encoded,'01000001');
});

test('Figure 1.27 has distance three and corrects all one-bit errors, with an explicit two-error limit', () => {
  let minimum=6;
  for (const [symbol,word] of Object.entries(M.code)) {
    assert.equal(M.nearest(word).decoded,symbol);
    for (let bit=0;bit<6;bit++) assert.equal(M.nearest(flip(word,bit)).decoded,symbol);
    for (const other of Object.values(M.code)) if (word!==other) minimum=Math.min(minimum,M.hamming(word,other));
    for (let first=0;first<6;first++) for (let second=first+1;second<6;second++) {
      assert.equal(Object.values(M.code).includes(flip(word,first,second)),false);
    }
  }
  assert.equal(minimum,3);
  assert.equal(M.nearest('010100').decoded,'D');
  const twoErrors=flip(M.code.A,1,4);
  assert.equal(M.hamming(M.code.A,twoErrors),2);
  assert.notEqual(M.nearest(twoErrors).decoded,'A');
  assert.ok(M.nearest(twoErrors).decoded, 'A decoder can choose a different symbol after two errors');
});
