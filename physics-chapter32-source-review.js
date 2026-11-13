(function(root){'use strict';
for(const e of root.EmberChapter32Checks){
 if(e.id==='TYU32.3'){
  e.sv.prompt+=' Välj: (i) amplituden skiljer sig, (ii) fasen skiljer sig, (iii) båda skiljer sig, (iv) inget av dessa.';e.en.prompt+=' Choose: (i) amplitude differs, (ii) phase differs, (iii) both differ, (iv) none of these.';
  e.sv.steps.push('(iv) är rätt för den idealiserade planvågen: E beror här bara på x och t.');e.en.steps.push('(iv) is correct for the idealized plane wave: E here depends only on x and t.');
 }
 if(e.id==='TYU32.4'){
  e.sv.prompt+=' Ange alternativen (i) x = 0, (ii) x = λ/4, (iii) x = λ/2, (iv) x = 3λ/4 för vardera av (a) maximal energitäthet, (b) minimal energitäthet, (c) maximalt Poyntingbelopp och (d) minimalt Poyntingbelopp.';
  e.en.prompt+=' Give the choices (i) x = 0, (ii) x = λ/4, (iii) x = λ/2, (iv) x = 3λ/4 for each of (a) maximum energy density, (b) minimum energy density, (c) maximum Poynting magnitude and (d) minimum Poynting magnitude.';
  e.sv.steps.push('(a) och (c): (i) och (iii). (b) och (d): (ii) och (iv).');e.en.steps.push('(a) and (c): (i) and (iii). (b) and (d): (ii) and (iv).');
 }
}
const passage={sv:'Gemensam information: Uppgifterna bygger på de historiska, frekvensberoende exponeringsvärden som boken återger från ett uttalande från 2009. För 1–25 Hz anger passagen elektrisk fältamplitud 14 kV/m; för 25 Hz–3 kHz används uttrycken i frågorna nedan. Detta är en räkneövning med en ideal vakuumvåg, inte aktuell vägledning om exponering. ',en:'Shared information: These questions use the historical frequency-dependent exposure values quoted by the book from a 2009 statement. For 1–25 Hz the passage states an electric-field amplitude of 14 kV/m; for 25 Hz–3 kHz it uses the expressions in the questions below. This is a calculation for an ideal vacuum wave, not current exposure guidance. '};
for(const e of root.EmberChapter32DraftExercises){if(!/^32\.(54|55|56)$/.test(e.id))continue;for(const lang of ['sv','en'])e[lang].prompt=passage[lang]+e[lang].prompt;}
})(window);
