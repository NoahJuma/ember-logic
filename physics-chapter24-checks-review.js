(function(root){'use strict';
for(const e of root.EmberChapter24Checks){
 if(e.id==='TYU24.1'){
  e.sv.prompt+=' Alternativ: (i) ökar; (ii) minskar; (iii) oförändrad; (iv) beror på geometrin.';e.en.prompt+=' Choices: (i) increases; (ii) decreases; (iii) unchanged; (iv) depends on geometry.';
  e.sv.steps.push('(iii) är rätt för samma geometri och isolerande material. (i) och (ii) missar att spänningen ändras med laddningen; (iv) ändrar inte svaret när geometrin hålls fast.');
  e.en.steps.push('(iii) is correct for unchanged geometry and insulating material. (i) and (ii) overlook the voltage change; (iv) does not alter the answer when geometry is held fixed.');
 }
 if(e.id==='TYU24.2'){
  e.sv.prompt='Du har en 4 μF- och en 8 μF-kondensator anslutna till en spänningskälla med nollskild spänning. (a) Hur ska de kopplas för att spänningen över 4 μF ska vara större än spänningen över 8 μF? (b) Hur ska de kopplas för att laddningsbeloppet på 4 μF ska vara större än på 8 μF? Välj i varje del: (i) serie; (ii) parallellt; (iii) båda; (iv) ingen av kopplingarna.';
  e.en.prompt='You have a 4 μF and an 8 μF capacitor connected to a nonzero-voltage source. (a) How should they be connected so the voltage across the 4 μF capacitor is greater than across the 8 μF capacitor? (b) How should they be connected so the charge magnitude on the 4 μF capacitor is greater than on the 8 μF capacitor? For each part choose: (i) series; (ii) parallel; (iii) either; (iv) neither.';
  e.sv.steps=['(a) I serie är laddningsbeloppen lika och V = Q/C, så 4 μF får större spänning: (i). Parallellt är spänningarna lika, så (ii), (iii) och (iv) passar inte.','(b) I serie är laddningsbeloppen lika. Parallellt är spänningarna lika och Q = CV, så 8 μF har större laddning. Därför är (iv) rätt och (i)–(iii) fel.'];
  e.en.steps=['(a) In series the charge magnitudes are equal and V = Q/C, so 4 μF has greater voltage: (i). In parallel the voltages are equal, so (ii), (iii) and (iv) do not fit.','(b) In series the charge magnitudes are equal. In parallel the voltages are equal and Q = CV, so 8 μF has greater charge. Thus (iv) is correct and (i)–(iii) are not.'];
 }
 if(e.id==='TYU24.3'){
  e.sv.prompt+=' Välj: (i) serie; (ii) parallellt; (iii) båda; (iv) ingen av dem.';e.en.prompt+=' Choose: (i) series; (ii) parallel; (iii) either; (iv) neither.';
  e.sv.steps.push('(i) är rätt för nollskild lagrad laddning. (ii) ger motsatt ordning, vilket även utesluter (iii) och (iv).');e.en.steps.push('(i) is correct for nonzero stored charge. (ii) gives the reverse order, which also excludes (iii) and (iv).');
 }
 if(e.id==='TYU24.4'){
  e.sv.prompt+=' Alternativ: (i) ökar; (ii) minskar; (iii) oförändrad.';e.en.prompt+=' Choices: (i) increases; (ii) decreases; (iii) unchanged.';
  e.sv.steps.push('(i) är rätt för nollskild laddning och κ > 1. (ii) och (iii) motsäger U = Q²/(2C) när C minskar.');e.en.steps.push('(i) is correct for nonzero charge and κ > 1. (ii) and (iii) conflict with U = Q²/(2C) when C decreases.');
 }
 if(e.id==='TYU24.5'){
  e.figure='tyu-24-5.svg';e.alt={sv:'Före och efter att ett dielektrikum fyllt gapet: den vänstra plattan är positiv och den högra negativ; bundna laddningar är negativa på dielektrikums vänstra sida och positiva på dess högra.',en:'Before and after a dielectric fills the gap: the left plate is positive and the right negative; bound charge is negative on the dielectric’s left face and positive on its right face.'};
 }
 if(e.id==='TYU24.6'){
  e.sv.prompt+=' Välj: (i) |q|/(4πε₀r²); (ii) κ|q|/(4πε₀r²); (iii) |q|/(4πκε₀r²); (iv) inget av dessa.';
  e.en.prompt+=' Choose: (i) |q|/(4πε₀r²); (ii) κ|q|/(4πε₀r²); (iii) |q|/(4πκε₀r²); (iv) none of these.';
  e.sv.steps.push('(iii) är rätt för den ideala homogena modellen. (i) saknar dielektrikumsfaktorn och (ii) placerar den åt fel håll; därför är (iv) inte rätt.');
  e.en.steps.push('(iii) is correct for the ideal homogeneous model. (i) omits the dielectric factor and (ii) places it in the wrong direction; thus (iv) is not correct.');
 }
}
})(window);
