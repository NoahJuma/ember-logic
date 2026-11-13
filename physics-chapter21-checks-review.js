(function(root){'use strict';
const directionChoices={sv:' Alternativ: (i) +x; (ii) −x; (iii) +y; (iv) −y; (v) noll; (vi) inget av dessa.',en:' Choices: (i) +x; (ii) −x; (iii) +y; (iv) −y; (v) zero; (vi) none of these.'};
for(const e of root.EmberChapter21Checks){
 if(e.id==='TYU21.1'){
  e.sv.prompt+=' Alternativ: (i) olika tecken; (ii) båda positiva; (iii) båda negativa; (iv) antingen (ii) eller (iii); (v) vilket som helst av (i)–(iii).';
  e.en.prompt+=' Choices: (i) opposite signs; (ii) both positive; (iii) both negative; (iv) either (ii) or (iii); (v) any of (i)–(iii).';
  e.sv.steps.push('(iv) är rätt. (ii) och (iii) är möjliga var för sig men ingen av dem kan väljas ensam; (i) skulle ge attraktion och gör även (v) fel.');
  e.en.steps.push('(iv) is correct. (ii) and (iii) are individually possible but neither can be selected alone; (i) would attract, making (v) wrong too.');
 }
 if(e.id==='TYU21.2'){
  e.sv.prompt+=' Välj för varje del: (i) attraktion; (ii) repulsion; (iii) ingen kraft.';e.en.prompt+=' For each part choose: (i) attraction; (ii) repulsion; (iii) no force.';
  e.sv.steps.push('Före kontakt är (i) rätt; efter kontakt är (ii) rätt under de angivna isoleringsvillkoren. De andra alternativen motsäger induktion respektive laddningsfördelning.');
  e.en.steps.push('Before contact (i) is correct; after contact (ii) is correct under the stated isolation conditions. The other choices conflict with induction and charge redistribution respectively.');
 }
 if(e.id==='TYU21.3'){
  e.sv.prompt='I exempel 21.4 sitter q₁ = +2,0 μC vid (0; +0,30 m) och Q = +4,0 μC vid (+0,40 m; 0). Ändra q₂ vid (0; −0,30 m) till −2,0 μC. Vilken riktning har nettokraften på Q?'+directionChoices.sv;
  e.en.prompt='In Example 21.4, q₁ = +2.0 μC is at (0, +0.30 m) and Q = +4.0 μC is at (+0.40 m, 0). Change q₂ at (0, −0.30 m) to −2.0 μC. What is the direction of the net force on Q?'+directionChoices.en;
  e.sv.steps.push('(iv) är rätt. (i) och (ii) bortser från att horisontalkomponenterna tar ut varandra, (iii) har fel riktning och (v) är fel eftersom vertikalkomponenterna adderas; därmed är även (vi) fel.');
  e.en.steps.push('(iv) is correct. (i) and (ii) overlook cancellation of horizontal components, (iii) has the wrong direction, and (v) is wrong because the vertical components add; therefore (vi) is wrong too.');
  e.figure='tyu-21-3.svg';e.alt={sv:'q₁ positiv ovanför origo, q₂ negativ lika långt nedanför och Q positiv till höger om origo.',en:'Positive q₁ above the origin, negative q₂ equally far below, and positive Q to the right.'};
 }
 if(e.id==='TYU21.4'){
  e.sv.prompt+=' Välj i varje del: (i) belopp; (ii) riktning; (iii) båda; (iv) ingetdera.';e.en.prompt+=' For each part choose: (i) magnitude; (ii) direction; (iii) both; (iv) neither.';
  e.sv.steps.push('(a) är (ii), medan (b) är (i). I varje fall är (iii) fel eftersom bara en av storheterna är konstant; (iv) är fel eftersom den andra faktiskt är konstant.');
  e.en.steps.push('(a) is (ii), while (b) is (i). In each case (iii) is wrong because only one quantity is constant; (iv) is wrong because the other is constant.');
 }
 if(e.id==='TYU21.5'){
  e.sv.prompt+=directionChoices.sv;e.en.prompt+=directionChoices.en;
  e.sv.steps.push('(iv) är rätt. (i) och (ii) bortser från att x-komponenterna släcks ut, (iii) har fel tecken och (v) missar de adderade y-komponenterna; (vi) är därför fel.');
  e.en.steps.push('(iv) is correct. (i) and (ii) overlook cancellation of x-components, (iii) has the wrong sign, and (v) misses the added y-components; therefore (vi) is wrong.');
  e.figure='tyu-21-5.svg';e.alt={sv:'En vertikal stav har laddningen +Q från origo till +a och −Q från origo till −a; P ligger på positiva x-axeln.',en:'A vertical rod has charge +Q from the origin to +a and −Q from the origin to −a; P lies on the positive x-axis.'};
 }
 if(e.id==='TYU21.7'){
  e.sv.prompt+=' Alternativ: (i) stabil; (ii) instabil; (iii) ingen jämvikt.';e.en.prompt+=' Choices: (i) stable; (ii) unstable; (iii) not an equilibrium.';
  e.sv.steps.push('(ii) är rätt. (i) är fel eftersom energin är maximal, och (iii) är fel eftersom vridmomentet är noll exakt i läget.');
  e.en.steps.push('(ii) is correct. (i) is wrong because energy is maximal, and (iii) is wrong because torque is zero exactly in that orientation.');
 }
}
})(window);
