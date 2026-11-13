(function(root){'use strict';
const context={sv:'Rutherford-backspridning används för att undersöka ett materials struktur och sammansättning. En jonstråle, ofta heliumjoner, accelereras och riktas mot provet; fördelningen och energin hos spridda joner analyseras. I en tandemaccelerator startar negativa heliumjoner He⁻ vid potentialen 0 V och accelereras mot en positiv mittpunkt. Där avlägsnas elektroner så att jonerna blir He²⁺; de stöts sedan bort från mittpunkten och accelereras vidare till den bortre änden, där potentialen åter är 0 V. ',en:'Rutherford backscattering is used to investigate material structure and composition. An ion beam, often helium ions, is accelerated toward a sample, and the distribution and energy of scattered ions are analyzed. In a tandem accelerator, negative helium ions He⁻ start at 0 V and accelerate toward a positive midpoint. Electrons are stripped there, making the ions He²⁺; these are repelled from the midpoint and accelerate to the far end, where the potential is again 0 V. '};
const feedback={
'23.84':{sv:'(d) är rätt. (a) har fel tecken; (b) och (c) skulle ge 9,0 respektive 4,5 MeV i den idealiserade 3eV-modellen.',en:'(d) is correct. (a) has the wrong sign; (b) and (c) would yield 9.0 and 4.5 MeV respectively in the idealized 3eV model.'},
'23.85':{sv:'(b) är rätt eftersom minsta heltal Z är 11. (a) är för litet för att vända jonen vid 10 fm; (c) och (d) är tillräckliga men inte minsta möjliga laddning.',en:'(b) is correct because the smallest integer Z is 11. (a) is too small to turn the ion at 10 fm; (c) and (d) suffice but are not the minimum charge.'},
'23.86':{sv:'(c) är rätt. (a), (b) och (d) följer inte av 6,0·10⁶ V dividerat med 12 m.',en:'(c) is correct. (a), (b) and (d) do not follow from dividing 6.0×10⁶ V by 12 m.'}
};
for(const e of root.EmberChapter23DraftExercises){const f=feedback[e.id];if(!f)continue;for(const lang of ['sv','en']){e[lang].prompt=context[lang]+e[lang].prompt;e[lang].steps.push(f[lang]);}}
for(const e of root.EmberChapter23Checks){
 if(e.id==='TYU23.1'){
  e.sv.prompt='Tre positiva punktladdningar från exempel 21.4 är q₁ = q₂ = +2,0 μC vid (0; ±0,30 m) och Q = +4,0 μC vid (0,40 m; 0). (a) Vilket tecken har den totala elektriska potentiella energin om nollpunkten är vid oändlig separation? (b) Vilket tecken har det långsamma yttre arbete som krävs för att skilja dem oändligt långt åt? Välj för varje del: (i) positivt; (ii) negativt; (iii) noll.';
  e.en.prompt='Three positive point charges from Example 21.4 are q₁ = q₂ = +2.0 μC at (0, ±0.30 m) and Q = +4.0 μC at (0.40 m, 0). (a) What is the sign of their total electric potential energy with zero at infinite separation? (b) What is the sign of the slow external work needed to separate them infinitely far? For each part choose: (i) positive; (ii) negative; (iii) zero.';
  e.sv.steps.push('(a) är (i) och (b) är (ii). Nollalternativet (iii) gäller inte någon av delarna för de givna separata, positiva laddningarna.');e.en.steps.push('(a) is (i) and (b) is (ii). The zero choice (iii) applies to neither part for the given distinct positive charges.');
  e.figure='tyu-23-1.svg';e.alt={sv:'Tre positiva laddningar: q₁ och q₂ lika långt ovanför och under origo, samt Q till höger.',en:'Three positive charges: q₁ and q₂ equally far above and below the origin, with Q to the right.'};
 }
 if(e.id==='TYU23.5'){
  e.sv.prompt+=' Välj alla korrekta påståenden: (i) större A ökar fältet överallt; (ii) större A minskar fältet överallt; (iii) fältet saknar z-komponent; (iv) fältet är noll i origo.';
  e.en.prompt+=' Select all correct statements: (i) increasing A increases the field everywhere; (ii) increasing A decreases it everywhere; (iii) the field has no z-component; (iv) the field is zero at the origin.';
  e.sv.steps.push('(iii) är rätt. (i) och (ii) är fel eftersom en konstant har gradienten noll; (iv) är fel eftersom E_x = −B i origo.');
  e.en.steps.push('(iii) is correct. (i) and (ii) are wrong because a constant has zero gradient; (iv) is wrong because E_x = −B at the origin.');
 }
}
})(window);
