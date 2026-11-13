const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM, VirtualConsole} = require('jsdom');

function loadChapter(n, language='en') {
  const errors = [], vc = new VirtualConsole();
  vc.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(fs.readFileSync(`physics-chapter${n}.html`, 'utf8'), {
    url: `https://example.test/physics-chapter${n}.html?lang=${language}`,
    runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc
  });
  const w = dom.window;
  if (n === 1) {
    w.Element.prototype.scrollIntoView = function() {};
    w.Element.prototype.setPointerCapture = function() {};
    w.Element.prototype.getBoundingClientRect = function() { return {width:390,height:480,left:0,top:0,right:390,bottom:480}; };
    w.HTMLDialogElement.prototype.showModal = function() { this.open = true; };
    w.HTMLDialogElement.prototype.close = function() { this.open = false; };
    w.matchMedia = () => ({matches:false});
    w.ResizeObserver = class { constructor(cb) { this.cb = cb; } observe() { this.cb(); } disconnect() {} };
    w.requestAnimationFrame = () => 1;
    w.cancelAnimationFrame = () => {};
  }
  for (const script of w.document.querySelectorAll('script[src]')) {
    w.eval(fs.readFileSync(script.getAttribute('src').split('?')[0], 'utf8'));
  }
  return {dom, w, errors};
}
function checkUnique(entries, context) {
  const seen = new Map();
  for (const {id, prompt} of entries) {
    const normalized = prompt?.replace(/\s+/g, ' ').trim().toLocaleLowerCase();
    assert.ok(normalized && normalized.length >= 15, `${context} ${id} has no usable prompt`);
    assert.doesNotMatch(prompt, /[\u20d7\ufffd]/u, `${context} ${id} contains an unsupported vector or replacement glyph`);
    assert.ok(!seen.has(normalized), `${context}: ${id} duplicates ${seen.get(normalized)}`);
    seen.set(normalized, id);
  }
}

test('chapter 1 has distinct prompts in both languages across every exercise page', () => {
  for (const language of ['en', 'sv']) {
    const {w, errors} = loadChapter(1, language), d = w.document, entries = [];
    for (const id of ['physics-set', 'physics-topic']) {
      const select = d.getElementById(id);
      select.value = 'all';
      select.dispatchEvent(new w.Event('change', {bubbles:true}));
    }
    const next = d.getElementById('physics-next');
    do {
      for (const card of d.querySelectorAll('#physics-exercises article[data-question]')) {
        assert.doesNotMatch(card.textContent, /[\u20d7\ufffd]/u, `chapter 1 ${language} ${card.dataset.question} card`);
        entries.push({id: card.dataset.question, prompt: card.querySelector('.question-text')?.textContent});
      }
      if (next.disabled) break;
      next.click();
    } while (entries.length < 1000);
    assert.equal(next.disabled, true, 'pagination should terminate');
    assert.ok(entries.length >= 100, 'all categories should be included');
    checkUnique(entries, `chapter 1 ${language}`);
    assert.deepEqual(errors, []);
    w.close();
  }
});

for (let n = 2; n <= 44; n++) {
  test(`chapter ${n} has distinct bilingual exercise prompts`, () => {
    const {w, errors} = loadChapter(n);
    const key = n === 2 ? 'EmberMotionExercises' : n === 3 || n === 4 ? 'EmberChapters34Exercises' : `EmberChapter${n}Exercises`;
    const all = w[key];
    assert.ok(Array.isArray(all), key);
    const idPattern = new RegExp(`^(?:${n}\\.|Q${n}\\.|VP${n}\\.|TYU${n}\\.|OPEN${n}$|BR${n}$)`);
    const exercises = all.filter(e => idPattern.test(e.id));
    assert.ok(exercises.length >= 50, `chapter ${n} exercise count`);
    for (const language of ['en', 'sv']) {
      checkUnique(exercises.map(e => ({id:e.id, prompt:e[language]?.prompt})), `chapter ${n} ${language}`);
      for (const e of exercises) {
        const explanation = [e[language]?.hint, ...(e[language]?.steps || [])].join(' ');
        assert.doesNotMatch(explanation, /[\u20d7\ufffd]/u, `chapter ${n} ${language} ${e.id} explanation`);
      }
    }
    assert.deepEqual(errors, []);
    w.close();
  });
}

test('shared passages do not repeat the same setup inside a question', () => {
  const cases = [
    {n:16, id:'16.77', en:'1540 m/s', sv:'1540 m/s'},
    {n:16, id:'16.78', en:'1.0 MHz', sv:'1,0 MHz'},
    {n:16, id:'16.80', en:'1540 m/s', sv:'1540 m/s'},
    {n:17, id:'17.116', en:'2.80×10⁵ J/kg', sv:'2,80·10⁵ J/kg'},
    {n:20, id:'20.59', en:'27 °C', sv:'27 °C'},
    {n:20, id:'20.60', en:'10 MW', sv:'10 MW'},
    {n:22, id:'22.63', en:'diameter is 5 m', sv:'diameter är 5 m'},
    {n:38, id:'38.41', en:'10⁸ cells/cm³', sv:'10⁸ celler/cm³'},
    {n:38, id:'38.42', en:'4 MeV', sv:'4 MeV'},
    {n:18, id:'18.86', en:'Helium has M = 4.0 g/mol', sv:'Helium har M = 4,0 g/mol', forbiddenEn:'An insulating gas between window panes is assumed', forbiddenSv:'Ett tvåglasfönsters isolerande gas antas'},
    {n:18, id:'18.87', en:'Helium has M = 4.0 g/mol', sv:'Helium har M = 4,0 g/mol', forbiddenEn:'with M_He = 4.0 and M_Xe = 131', forbiddenSv:'med M_He = 4,0 och M_Xe = 131'},
    {n:20, id:'20.62', en:'10 MW', sv:'10 MW', forbiddenEn:'delivers 10 MW work', forbiddenSv:'ger 10 MW arbete'},
    {n:19, id:'19.64', en:'premixed anesthetic gas', sv:'förblandad anestesigas'},
    {n:25, id:'25.79', en:'9, 19, 41, 63, 102, 76, 50, 24', sv:'9, 19, 41, 63, 102, 76, 50, 24', forbiddenEn:'On release, at 9, 7 and 5 mm', forbiddenSv:'På återvägen vid 9, 7 och 5 mm'},
    {n:25, id:'25.80', en:'9, 19, 41, 63, 102, 76, 50, 24', sv:'9, 19, 41, 63, 102, 76, 50, 24', forbiddenEn:'resistance 9 GΩ at length 5 mm', forbiddenSv:'resistans 9 GΩ vid längden 5 mm'},
    {n:30, id:'30.75', en:'20.9 kJ/kg', sv:'20,9 kJ/kg'},
    {n:30, id:'30.72', en:'1.0 m in diameter', sv:'1,0 m i diameter'},
    {n:30, id:'30.73', en:'inductance 4.4 H', sv:'induktans 4,4 H', forbiddenEn:'A 4.4 H MRI coil', forbiddenSv:'En 4,4 H MRI-spole'},
    {n:31, id:'31.70', en:'ρ/(10a)', sv:'ρ/(10a)'},
    {n:32, id:'32.54', en:'25 Hz–3 kHz', sv:'25 Hz–3 kHz'},
    {n:33, id:'33.62', en:'horizontally polarized light', sv:'horisontellt polariserat ljus'},
    {n:35, id:'35.59', en:'340 m/s', sv:'340 m/s'},
    {n:36, id:'36.70', en:'vacuum wavelength is 650 nm', sv:'vakuumvåglängd 650 nm'},
    {n:37, id:'37.71', en:'approximately 300 m/s', sv:'ungefär 300 m/s', forbiddenEn:'In an imagined universe light speed is', forbiddenSv:'I ett tänkt universum är ljushastigheten'},
    {n:37, id:'37.74', en:'approximately 300 m/s', sv:'ungefär 300 m/s', forbiddenEn:'In an imagined universe with c =', forbiddenSv:'I ett tänkt universum med c ='},
    {n:38, id:'38.43', en:'Photon energy in the exercise is 4 MeV', sv:'Fotonenergin i övningen är 4 MeV', forbiddenEn:'A photon of energy 4 MeV', forbiddenSv:'En foton med energin 4 MeV'},
    {n:39, id:'39.89', en:'10–50 kV', sv:'10–50 kV'},
    {n:40, id:'40.67', en:'Eₘₙ = (m²+n²)π²ℏ²/(2ML²)', sv:'Eₘₙ = (m²+n²)π²ℏ²/(2ML²)'},
    {n:41, id:'41.70', en:'orbital radius about 1 μm', sv:'omloppsradie omkring 1 μm'},
    {n:42, id:'42.56', en:'100 mA', sv:'100 mA'},
    {n:42, id:'42.58', en:'25 °C', sv:'25 °C'},
    {n:43, id:'43.75', en:'8.04 days', sv:'8,04 dygn'},
    {n:44, id:'44.58', en:'10 ns', sv:'10 ns'},
    {n:44, id:'44.59', en:'N = N₀e^(−μx)', sv:'N = N₀e^(−μx)'}
  ];
  for (const item of cases) {
    const {w, errors} = loadChapter(item.n), e = w[`EmberChapter${item.n}Exercises`].find(x => x.id === item.id);
    for (const lang of ['en', 'sv']) {
      assert.equal(e[lang].prompt.split(item[lang]).length - 1, 1, `${item.id} ${lang}`);
      const forbidden = item[lang === 'en' ? 'forbiddenEn' : 'forbiddenSv'];
      if (forbidden) assert.ok(!e[lang].prompt.includes(forbidden), `${item.id} ${lang} repeats the setup`);
    }
    assert.deepEqual(errors, []);
    w.close();
  }
});
