const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file.split('?')[0]), 'utf8');
const plain = value => JSON.parse(JSON.stringify(value));
// These two English compounds name a positive column number or polynomial
// degree. Their hyphens are punctuation; arithmetic signs such as x-3 stay.
const numericTokens = text => (String(text).replace(/\b(column|degree)-(?=\d)/g, '$1 ')
  .match(/[-−]?\d+(?:\.\d+)?/g) || []).sort();

// Execute the actual document's complete script list. Layout, SVG painting,
// touch hardware and native browser dialogs are outside these DOM checks.
function fixture({ page = 'linear-algebra.html', query = '?lang=en', stored = {}, browser = 'en-US', unavailable = false } = {}) {
  const errors = [], frames = new Map();
  let frameId = 0, clock = 0;
  const vc = new VirtualConsole();
  vc.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(read(page), {
    url: 'https://example.test/' + page + query,
    runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc
  });
  const w = dom.window, d = w.document;
  w.structuredClone = structuredClone;
  Object.defineProperty(w.navigator, 'language', { value: browser, configurable: true });
  w.Element.prototype.scrollIntoView = function () {};
  w.Element.prototype.setPointerCapture = function () {};
  w.Element.prototype.getBoundingClientRect = function () { return { width: 390, height: 480, left: 0, top: 0, right: 390, bottom: 480 }; };
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new w.Event('close')); };
  w.matchMedia = () => ({ matches: false });
  w.ResizeObserver = class { constructor(cb) { this.cb = cb; } observe() { this.cb(); } disconnect() {} };
  w.performance.now = () => clock;
  w.requestAnimationFrame = cb => { frames.set(++frameId, cb); return frameId; };
  w.cancelAnimationFrame = id => frames.delete(id);
  for (const [key, value] of Object.entries(stored)) w.localStorage.setItem(key, value);
  const disableStorage = () => {
    w.Storage.prototype.getItem = function () { throw new Error('Storage unavailable'); };
    w.Storage.prototype.setItem = function () { throw new Error('Storage unavailable'); };
  };
  if (unavailable) disableStorage();
  for (const script of d.querySelectorAll('script[src]')) w.eval(read(script.getAttribute('src')));
  const $ = selector => d.querySelector(selector);
  const all = selector => Array.from(d.querySelectorAll(selector));
  const input = (element, value, type = 'input') => {
    if (typeof element === 'string') element = $(element);
    element.value = String(value);
    element.dispatchEvent(new w.Event(type, { bubbles: true }));
  };
  const language = value => input('#math-language', value, 'change');
  const submit = selector => $(selector).dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
  const flush = time => { clock = time; const queue = [...frames.values()]; frames.clear(); queue.forEach(cb => cb(time)); };
  return { w, d, $, all, input, language, submit, flush, frames, errors, disableStorage,
    section: value => input('#book-topic', value, 'change'),
    card: number => d.getElementById('textbook-exercise-' + number),
    close: () => dom.window.close() };
}

test('mathematics language follows URL, saved preference and browser priority and carries through course links', () => {
  const cases = [
    { query: '?lang=sv', stored: { 'ember-mathematics:language': '"en"' }, browser: 'en-US', expected: 'sv' },
    { query: '?lang=en', stored: { 'ember-mathematics:language': '"sv"' }, browser: 'sv-SE', expected: 'en' },
    { query: '', stored: { 'ember-mathematics:language': '"sv"' }, browser: 'en-US', expected: 'sv' },
    { query: '?lang=invalid', stored: { 'ember-mathematics:language': '"en"' }, browser: 'sv-SE', expected: 'en' },
    { query: '', stored: { 'ember-mathematics:language': 'broken json' }, browser: 'sv-SE', expected: 'sv' },
    { query: '', browser: 'de-DE', expected: 'en' },
    { query: '', browser: 'sv-SE', unavailable: true, expected: 'sv' }
  ];
  for (const config of cases) {
    const f = fixture({ page: 'mathematics.html', ...config });
    assert.equal(f.d.documentElement.lang, config.expected);
    assert.equal(f.$('#math-language').value, config.expected);
    assert.equal(f.$('h1').textContent, config.expected === 'sv' ? 'Matematik' : 'Mathematics');
    assert.match(f.$('.subject-card').getAttribute('href'), new RegExp('lang=' + config.expected));
    assert.deepEqual(f.errors, []); f.close();
  }
  const landing = fixture({ page: 'mathematics.html', query: '?lang=sv' });
  assert.equal(landing.d.title, 'Matematik — Ember Study Labs');
  assert.equal(landing.$('.subject-card h2').textContent, 'Linjär algebra');
  assert.match(landing.$('.subject-card').getAttribute('href'), /^linear-algebra\.html\?lang=sv$/);
  landing.language('en');
  assert.equal(landing.d.title, 'Mathematics — Ember Study Labs');
  assert.equal(landing.$('h1').textContent, 'Mathematics');
  assert.equal(landing.$('.subject-card h2').textContent, 'Linear Algebra');
  assert.equal(landing.$('.subject-card').getAttribute('href'), 'linear-algebra.html?lang=en');
  assert.deepEqual(landing.errors, []); landing.close();
  const f = fixture({ query: '?lang=en&keep=1#book' });
  f.language('sv');
  assert.equal(f.d.documentElement.lang, 'sv');
  assert.equal(JSON.parse(f.w.localStorage.getItem('ember-mathematics:language')), 'sv');
  assert.equal(new URL(f.w.location.href).searchParams.get('keep'), '1');
  assert.equal(f.w.location.hash, '#book');
  assert.match(f.d.title, /Linjär algebra/);
  assert.ok(f.all('a[href^="mathematics.html"]').every(a => a.getAttribute('href').includes('lang=sv')));
  assert.deepEqual(f.errors, []); f.close();
});

test('all 437 Swedish mathematics cards retain full questions, mathematical values, hidden solutions and exact English roundtrip', () => {
  assert.deepEqual(numericTokens('column-3; degree-5; x-3; x−5'), ['-3', '3', '5', '−5']);
  const f = fixture();
  const english = plain(f.w.EmberTextbook), englishQuestions = plain(f.w.EmberMathQuestions);
  const originalObjects = [f.w.EmberChapter, f.w.EmberTextbook, f.w.EmberMathQuestions, f.w.EmberLearning];
  const seen = new Set();
  f.language('sv');
  assert.equal(f.d.documentElement.lang, 'sv');
  for (const [set, entries] of Object.entries(f.w.EmberTextbook.solutions)) {
    f.section(set);
    assert.equal(f.all('#book-list>article').length, entries.length, set);
    for (const problem of entries) {
      const key = set + ':' + problem.number;
      const en = english.solutions[set].find(item => item.number === problem.number);
      const article = f.card(problem.number), source = f.w.EmberMathQuestions[set][problem.number];
      assert.ok(en && article && source, key); assert.ok(!seen.has(key), key); seen.add(key);
      assert.equal(problem.prompt, source.text, key);
      assert.notEqual(problem.prompt, en.prompt, key + ': full question is translated');
      assert.equal(problem.steps.length, en.steps.length, key + ': no omitted steps');
      for (const field of ['prompt', 'answer', 'questionReference']) {
        assert.deepEqual(numericTokens(problem[field] || ''), numericTokens(en[field] || ''), key + ':' + field);
      }
      problem.steps.forEach((step, i) => {
        assert.deepEqual(numericTokens(step), numericTokens(en.steps[i]), key + ':step:' + i);
        if (/^(?:The |This |We |Use |First |Now |For |A matrix |Check |Start |Write |Multiply |Divide |Subtract |Add |Read |Solve |Let |Since |Therefore )/.test(en.steps[i])) {
          assert.notEqual(step, en.steps[i], key + ': untranslated step ' + i);
        }
      });
      const question = article.querySelector('.math-question');
      assert.equal(question.getAttribute('aria-label'), 'Hela uppgiften från boken', key);
      assert.equal(question.closest('details'), null, key);
      assert.deepEqual(Array.from(question.querySelectorAll('.math-question-copy>p'), p => p.textContent),
        Array.from(f.w.EmberLearning.readable(problem.prompt).split(/\n\s*\n/)), key);
      assert.equal(article.querySelector('.attempt-panel').open, false, key);
      assert.equal(article.querySelector('.solution-panel').open, false, key);
      const steps = Array.from(article.querySelectorAll('.math-worked-steps>li'));
      assert.ok(steps.length > 0, key);
      steps.forEach((step, i) => assert.equal(step.querySelector('.math-step-label').textContent, 'Steg ' + (i + 1), key));
      assert.equal(article.querySelector('.math-final-answer h4').textContent, 'Det slutliga svaret är…', key);
      assert.equal(article.querySelector('.math-final-answer .worked-result').textContent, f.w.EmberLearning.readable(problem.answer), key);
      for (const image of question.querySelectorAll('img')) {
        assert.ok(fs.existsSync(path.join(root, image.getAttribute('src'))), key + ': translated diagram exists');
        assert.ok(image.getAttribute('alt').length > 20, key);
      }
    }
    const ids = f.all('[id]').map(node => node.id);
    assert.equal(new Set(ids).size, ids.length, set + ': unique IDs');
  }
  assert.equal(seen.size, 437);
  f.language('en');
  assert.deepEqual(plain(f.w.EmberTextbook), english);
  assert.deepEqual(plain(f.w.EmberMathQuestions), englishQuestions);
  [f.w.EmberChapter, f.w.EmberTextbook, f.w.EmberMathQuestions, f.w.EmberLearning].forEach((obj, i) => assert.equal(obj, originalObjects[i]));
  assert.deepEqual(f.errors, []); f.close();
});

test('language switches preserve legacy answers, unsaved drafts, filters and disclosures even when storage fails', () => {
  const key = 'ember-linear-algebra:book-1.2-0';
  const f = fixture({ stored: { [key]: 'Earlier answer: x = 2.' } });
  f.section('1.2'); f.input('#practice-topic', '1.7', 'change');
  assert.equal(f.card('9').querySelector('textarea').value, 'Earlier answer: x = 2.');
  const written = '<img src=x onerror="alert(1)">\nMy answer is x < 3 & y > 2.';
  f.input(f.card('9').querySelector('textarea'), written);
  assert.equal(f.w.localStorage.getItem(key), written);
  f.card('9').querySelectorAll('details').forEach(node => { node.open = true; });
  f.$('#practice-list .solution-panel').open = true;
  const focus = f.card('9').querySelector('textarea'); focus.focus(); focus.setSelectionRange(4, 11);
  f.language('sv');
  assert.equal(f.$('#book-topic').value, '1.2'); assert.equal(f.$('#practice-topic').value, '1.7');
  assert.equal(f.card('9').querySelector('textarea').dataset.attempt, 'book-1.2-0');
  assert.equal(f.card('9').querySelector('textarea').value, written);
  assert.equal(f.card('9').querySelector('.attempt-copy').textContent, written);
  assert.equal(f.card('9').querySelector('.attempt-copy img'), null);
  assert.ok(Array.from(f.card('9').querySelectorAll('details')).every(node => node.open));
  assert.equal(f.$('#practice-list .solution-panel').open, true);
  assert.equal(f.d.activeElement.selectionStart, 4); assert.equal(f.d.activeElement.selectionEnd, 11);

  f.disableStorage();
  const unavailableDraft = 'Nytt svar som inte kan sparas.';
  f.input(f.card('9').querySelector('textarea'), unavailableDraft);
  assert.match(f.card('9').querySelector('.save-status').textContent, /Lagring är inte tillgänglig/);
  f.$('#practice-list textarea').value = 'Uncommitted input without an input event.';
  f.language('en');
  assert.equal(f.card('9').querySelector('textarea').value, unavailableDraft);
  assert.equal(f.$('#practice-list textarea').value, 'Uncommitted input without an input event.');
  assert.ok(Array.from(f.card('9').querySelectorAll('details')).every(node => node.open));
  f.section('1.3'); f.section('1.2');
  assert.equal(f.card('9').querySelector('textarea').value, unavailableDraft);
  f.language('sv');
  assert.equal(f.card('9').querySelector('textarea').value, unavailableDraft);
  assert.deepEqual(f.errors, []); f.close();
});

test('multiple-choice quiz retains question, option order, selection and awarded score across languages', () => {
  const f = fixture();
  f.input('#quiz-level', '1'); f.input('#quiz-type', 'terms'); f.input('#quiz-topic', '1.3'); f.submit('#quiz-form');
  const correct = f.w.EmberChapter.glossary[2][0][0];
  const labels = f.all('.quiz-options label').map(node => node.textContent.trim());
  const correctIndex = labels.indexOf(correct); assert.ok(correctIndex >= 0);
  const identities = labels.map(label => {
    for (let i = 0; i < f.w.EmberChapter.glossary.length; i++) for (let j = 0; j < 4; j++) {
      if (f.w.EmberChapter.glossary[i][j][0] === label) return [i, j];
    }
    assert.fail('Unknown glossary option: ' + label);
  });
  f.all('.quiz-options input')[correctIndex].click();
  f.language('sv');
  assert.match(f.$('#quiz-play .kicker').textContent, /Fråga 1 av 1 · 1\.3/);
  assert.equal(f.$('.quiz-options input:checked').value, String(correctIndex));
  assert.deepEqual(f.all('.quiz-options label').map(node => node.textContent.trim()), identities.map(([i, j]) => f.w.EmberChapter.glossary[i][j][0]));
  f.submit('#quiz-answer');
  assert.equal(f.$('#quiz-feedback strong').textContent, 'Rätt');
  assert.ok(f.all('#quiz-answer input').every(node => node.disabled));
  f.language('en'); f.language('sv');
  assert.equal(f.$('#quiz-feedback strong').textContent, 'Rätt');
  f.$('[data-mark="next"]').click();
  assert.match(f.$('#quiz-play').textContent, /Du fick 1 av 1 rätt/);
  f.language('en');
  assert.match(f.$('#quiz-play').textContent, /You got 1 of 1 correct/);

  // Opening a solution is allowed after selecting an option, but must not
  // silently award a point or discard that selection during translation.
  f.submit('#quiz-form');
  const skipIndex = f.all('.quiz-options label').findIndex(node => node.textContent.trim() === correct);
  assert.ok(skipIndex >= 0); f.all('.quiz-options input')[skipIndex].click();
  f.$('[data-quiz-solution]').click(); f.language('sv');
  assert.equal(f.$('.quiz-options input:checked').value, String(skipIndex));
  assert.match(f.$('#quiz-feedback strong').textContent, /ingen poäng/);
  assert.ok(f.all('#quiz-answer input').every(node => node.disabled));
  f.language('en'); assert.equal(f.$('.quiz-options input:checked').value, String(skipIndex));
  f.$('[data-mark="next"]').click();
  assert.match(f.$('#quiz-play').textContent, /You got 0 of 1 correct/);
  assert.deepEqual(f.errors, []); f.close();
});

test('problem quiz keeps written reasoning and revealed solutions and distinguishes self-marking from skipping', () => {
  const f = fixture();
  const start = () => { f.input('#quiz-level', '2'); f.input('#quiz-type', 'problems'); f.input('#quiz-topic', '1.1'); f.submit('#quiz-form'); };
  start();
  const promptNumbers = numericTokens(f.$('.quiz-prompt').textContent);
  const draft = 'My working: <script>bad()</script>\nI subtract the equations.';
  f.input('#quiz-answer textarea', draft); f.language('sv');
  assert.equal(f.$('#quiz-answer textarea').value, draft);
  assert.deepEqual(numericTokens(f.$('.quiz-prompt').textContent), promptNumbers);
  f.submit('#quiz-answer');
  assert.equal(f.$('#quiz-feedback .attempt-copy').textContent, draft);
  assert.equal(f.$('#quiz-feedback script'), null);
  assert.equal(f.$('#quiz-feedback strong').textContent, 'Jämför ditt arbete');
  const answerNumbers = numericTokens(f.$('#quiz-feedback .worked-result').textContent);
  f.language('en');
  assert.equal(f.$('#quiz-answer textarea').value, draft);
  assert.equal(f.$('#quiz-answer textarea').disabled, true);
  assert.deepEqual(numericTokens(f.$('#quiz-feedback .worked-result').textContent), answerNumbers);
  f.$('[data-mark="yes"]').click();
  assert.match(f.$('#quiz-play').textContent, /You got 1 of 1 correct/);
  start(); f.$('[data-quiz-solution]').click(); f.language('sv');
  assert.match(f.$('#quiz-feedback strong').textContent, /ingen poäng/);
  f.$('[data-mark="next"]').click();
  assert.match(f.$('#quiz-play').textContent, /Du fick 0 av 1 rätt/);
  assert.deepEqual(f.errors, []); f.close();
});

test('3D lab preserves geometry, camera, pending edits, panels, fullscreen and animation when language changes', () => {
  const f = fixture();
  const shape = () => f.all('#scene polygon,#scene polyline,#scene circle').map(el => el.outerHTML).join('');
  for (const [mode, names] of [['planes', ['En punkt', 'En linje', 'Samma plan', 'Ingen lösning']], ['transform', ['Sträck', 'Rotera', 'Skjuva', 'Spegla', 'Platta till']]]) {
    f.input('#scene-mode', mode, 'change');
    for (let i = 0; i < names.length; i++) {
      f.language('en'); f.$('#scene-examples [data-preset="' + i + '"]').click();
      const geometry = shape(); f.language('sv');
      assert.equal(f.$('#scene-examples [data-preset="' + i + '"]').textContent, names[i]);
      assert.equal(shape(), geometry); f.language('en'); assert.equal(shape(), geometry);
    }
  }
  f.input('#scene-mode', 'planes', 'change'); f.input('#scene-plane', '1', 'change'); f.input('#scene-distance', '1.35');
  f.$('[data-plane-visible="2"]').click(); f.$('#scene-grid').click();
  f.$('[data-camera="right"]').click(); f.$('[data-camera="in"]').click();
  f.all('#scene-controls details').forEach(el => { el.open = true; });
  f.$('#scene-dock').open = false; f.$('.scene-calculations').open = true;
  const editing = f.$('#scene-controls [data-row="0"][data-col="0"]'); editing.value = '7.25'; editing.focus();
  const geometry = shape(); f.language('sv');
  assert.equal(shape(), geometry); assert.equal(f.$('#scene-plane').value, '1');
  assert.equal(f.$('#scene-grid').checked, false); assert.equal(f.$('[data-plane-visible="2"]').checked, false);
  assert.equal(f.d.activeElement.value, '7.25'); assert.equal(f.d.activeElement.dataset.row, '0');
  assert.ok(f.all('#scene-controls details').every(el => el.open));
  assert.equal(f.$('#scene-dock').open, false); assert.equal(f.$('.scene-calculations').open, true);
  f.$('#scene-fullscreen').click(); f.language('en');
  assert.equal(f.$('#lab-fullscreen').open, true);
  assert.equal(f.$('#lab-workspace').parentElement, f.$('#lab-fullscreen'));
  assert.equal(f.$('#scene-fullscreen').textContent, '✕ Exit'); assert.equal(shape(), geometry);
  f.language('sv'); assert.equal(f.$('#scene-fullscreen').textContent, '✕ Avsluta'); f.$('#scene-fullscreen').click();
  f.input('#scene-mode', 'transform', 'change'); f.$('#scene-examples [data-preset="1"]').click();
  f.input('#scene-point-0', '2.5'); f.input('#scene-angle', '120'); f.$('#scene-play').click(); f.flush(875);
  assert.equal(f.$('#scene-progress').value, '25');
  const animated = shape(), pending = f.frames.size; f.language('en');
  assert.equal(f.$('#scene-play').textContent, 'Pause'); assert.equal(f.$('#scene-progress').value, '25');
  assert.equal(f.$('#scene-point-0').value, '2.5'); assert.equal(f.$('#scene-angle').value, '120');
  assert.equal(shape(), animated); assert.equal(f.frames.size, pending);
  f.language('sv'); f.flush(3500);
  assert.equal(f.$('#scene-progress').value, '100'); assert.equal(f.$('#scene-play').textContent, '▶ Spela en gång');
  assert.match(f.$('#scene').getAttribute('aria-label'), /Interaktiv 3D/);
  assert.deepEqual(f.errors, []); f.close();
});
