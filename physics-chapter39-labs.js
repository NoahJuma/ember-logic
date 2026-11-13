(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const copy = {
    en: { language:'Language', back:'← Chapter 39', title:'Electron wave lab', intro:'Compare the relativistic de Broglie wavelength with the classical approximation for a free electron.', energy:'Kinetic energy (eV)', help:'An electron accelerated from rest through V volts gains V electron-volts, ignoring losses.', calculate:'Calculate', invalid:'Enter a positive finite energy within the calculator’s range.', exact:'Relativistic wavelength', classical:'Classical approximation', speed:'Speed as a fraction of c', difference:'Classical approximation overestimates wavelength by' },
    sv: { language:'Språk', back:'← Kapitel 39', title:'Laboration: elektronvågor', intro:'Jämför en fri elektrons relativistiska de Broglie-våglängd med den klassiska approximationen.', energy:'Rörelseenergi (eV)', help:'En elektron som accelereras från vila genom V volt får V elektronvolt, om förluster försummas.', calculate:'Beräkna', invalid:'Ange en positiv ändlig energi inom räknarens område.', exact:'Relativistisk våglängd', classical:'Klassisk approximation', speed:'Hastighet som andel av c', difference:'Den klassiska approximationen överskattar våglängden med' }
  };
  let lang = new URLSearchParams(location.search).get('lang') === 'sv' ? 'sv' : 'en', show = false;
  function render() {
    const t = copy[lang]; document.documentElement.lang = lang; $('language').value = lang;
    $('language-label').textContent = t.language; $('back').textContent = t.back; $('back').href = 'physics-chapter39.html?lang=' + lang;
    for (const id of ['title','intro','calculate']) $(id).textContent = t[id];
    $('energy-label').textContent = t.energy; $('energy-help').textContent = t.help; $('error').textContent = ''; $('result').replaceChildren();
    if (!show) return;
    try {
      const r = EmberChapter39Models.electronWave($('energy').value);
      const fmt = v => new Intl.NumberFormat(lang === 'sv' ? 'sv-SE' : 'en-US', { maximumSignificantDigits: 5 }).format(v);
      for (const line of [t.exact + ': ' + fmt(r.wavelength) + ' nm', t.classical + ': ' + fmt(r.classicalWavelength) + ' nm', t.speed + ': ' + fmt(r.speedFraction), t.difference + ': ' + fmt(r.classicalPercentError) + ' %']) {
        const p = document.createElement('p'); p.textContent = line; $('result').append(p);
      }
    } catch (_) { $('error').textContent = t.invalid; }
  }
  $('calculate').addEventListener('click', () => { show = true; render(); });
  $('energy').addEventListener('input', () => { if (show) render(); });
  $('language').addEventListener('change', e => { lang = e.target.value; const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState(null, '', url); render(); });
  render();
})();
