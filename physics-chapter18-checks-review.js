(function(root){'use strict';
for(const e of root.EmberChapter18Checks){
 if(e.id==='TYU18.2'){
  e.sv.prompt+=' Alternativ: (i) dubbla; (ii) fyra gånger; (iii) åtta gånger; (iv) hälften; (v) en fjärdedel; (vi) en åttondel.';
  e.en.prompt+=' Choices: (i) twice; (ii) four times; (iii) eight times; (iv) one half; (v) one quarter; (vi) one eighth.';
  e.sv.steps.push('(vi) är rätt. (i)–(iii) ökar densiteten trots att samma massa får större volym; (iv) och (v) missar att skalningen gäller alla tre dimensionerna.');
  e.en.steps.push('(vi) is correct. (i)–(iii) increase density even though the same mass occupies a larger volume; (iv) and (v) miss scaling in all three dimensions.');
 }
 if(e.id==='TYU18.3'){
  e.sv.prompt=e.sv.prompt.replace('Rangordna rms-fart och medelenergi','Rangordna från högst till lägst (a) rms-fart och (b) genomsnittlig translationell rörelseenergi per molekyl');
  e.en.prompt=e.en.prompt.replace('Rank rms speed and mean energy','Rank from highest to lowest (a) rms speed and (b) average translational kinetic energy per molecule');
 }
 if(e.id==='TYU18.4'){
  e.sv.prompt+=' Om inte, ökar temperaturen snabbast nära början eller slutet? Förklara.';
  e.en.prompt+=' If not, does temperature rise fastest near the beginning or the end? Explain.';
 }
 if(e.id==='TYU18.5'){
  e.sv.prompt='En gas med N molekyler har fartfördelningen f(v). Hur många molekyler har farter mellan v₁ och v₂, där v₂ > v₁? Alternativ: (i) ∫[0,v₂]f(v)dv − ∫[0,v₁]f(v)dv; (ii) N[∫[0,v₂]f(v)dv − ∫[0,v₁]f(v)dv]; (iii) ∫[0,v₁]f(v)dv − ∫[0,v₂]f(v)dv; (iv) N[∫[0,v₁]f(v)dv − ∫[0,v₂]f(v)dv]; (v) inget av dessa.';
  e.en.prompt='A gas containing N molecules has speed distribution f(v). How many molecules have speeds between v₁ and v₂, where v₂ > v₁? Choices: (i) ∫[0,v₂]f(v)dv − ∫[0,v₁]f(v)dv; (ii) N[∫[0,v₂]f(v)dv − ∫[0,v₁]f(v)dv]; (iii) ∫[0,v₁]f(v)dv − ∫[0,v₂]f(v)dv; (iv) N[∫[0,v₁]f(v)dv − ∫[0,v₂]f(v)dv]; (v) none of these.';
  e.sv.steps.push('(ii) är rätt. (i) är andelen men saknar faktorn N; (iii) och (iv) subtraherar i fel ordning och ger en icke-positiv storhet; (v) är fel eftersom (ii) är korrekt.');
  e.en.steps.push('(ii) is correct. (i) gives the fraction but omits N; (iii) and (iv) subtract in the wrong order and give a nonpositive quantity; (v) is false because (ii) is correct.');
 }
}
})(window);
