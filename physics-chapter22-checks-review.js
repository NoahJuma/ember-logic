(function(root){'use strict';
for(const e of root.EmberChapter22Checks){
 if(e.id==='TYU22.1'){
  e.sv.prompt+=' Alternativ: (i) nio gånger större; (ii) tre gånger större; (iii) oförändrat; (iv) en tredjedel; (v) en niondel; (vi) för lite information.';
  e.en.prompt+=' Choices: (i) nine times greater; (ii) three times greater; (iii) unchanged; (iv) one third; (v) one ninth; (vi) insufficient information.';
  e.sv.steps.push('(iii) är rätt. (i), (ii), (iv) och (v) missar att samma laddning förblir innesluten; (vi) är fel eftersom Gauss lag avgör nettoflödet.');
  e.en.steps.push('(iii) is correct. (i), (ii), (iv) and (v) overlook that the same charge remains enclosed; (vi) is wrong because Gauss’s law determines the net flux.');
 }
 if(e.id==='TYU22.3'){
  e.sv.prompt='Sex punktladdningar ligger i samma plan. Figuren visar vilka av dem som innesluts av var och en av de fem Gaussytorna S₁–S₅; varje ruta är en separat vy av samma laddningar. Rangordna ytornas elektriska nettoflöden från mest positivt till mest negativt.';
  e.en.prompt='Six point charges lie in the same plane. The figure shows which charges are enclosed by each of five Gaussian surfaces S₁–S₅; each panel is a separate view of the same charges. Rank the net electric flux through the surfaces from most positive to most negative.';
  e.sv.steps=['Summera först laddningarna inuti varje sluten yta; laddningar utanför påverkar inte nettoflödet.','S₁: 0; S₂: (−7 + 9 + 5) μC = +7 μC; S₃: (9 + 1 − 10) μC = 0.','S₄: (8 − 7) μC = +1 μC; S₅: (8 − 7 − 10 + 1 + 9 + 5) μC = +6 μC.','Gauss lag Φ = Q_innesluten/ε₀ ger S₂ > S₅ > S₄ > S₁ = S₃.'];
  e.en.steps=['First add the charges inside each closed surface; charges outside do not affect the net flux.','S₁: 0; S₂: (−7 + 9 + 5) μC = +7 μC; S₃: (9 + 1 − 10) μC = 0.','S₄: (8 − 7) μC = +1 μC; S₅: (8 − 7 − 10 + 1 + 9 + 5) μC = +6 μC.','Gauss’s law Φ = Q_enclosed/ε₀ gives S₂ > S₅ > S₄ > S₁ = S₃.'];
  e.figure='gaussian-surfaces-22-16.svg';e.alt={sv:'Fem separata vyer av Gaussytor: S₁ innesluter inga laddningar; S₂ innesluter −7, +9 och +5; S₃ +9, +1 och −10; S₄ +8 och −7; S₅ samtliga sex. Alla laddningar anges i mikrocoulomb.',en:'Five separate views of Gaussian surfaces: S₁ encloses no charges; S₂ encloses −7, +9 and +5; S₃ +9, +1 and −10; S₄ +8 and −7; S₅ all six. All charges are in microcoulombs.'};
 }
}
})(window);
