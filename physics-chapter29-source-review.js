(function(root){'use strict';
for(const e of root.EmberChapter29DraftExercises){
 if(e.id==='29.44'){
  e.sv.prompt='En rektangulär slinga är 4,00 cm hög och 60,0 cm lång, med massan 24,0 g och resistansen 5,00 mΩ. Den är först i vila med en del av arean i ett homogent magnetfält B = 2,90 T vinkelrätt mot slingans plan. En konstant kraft 0,180 N drar slingan ut ur fältet; försumma friktion. Bestäm (a) accelerationen vid 3,00 cm/s, (b) den lokala gränsfarten och accelerationen där medan slingan passerar fältgränsen, och (c) accelerationen när slingan är helt utanför fältet.';
  e.en.prompt='A rectangular loop is 4.00 cm high and 60.0 cm long, with mass 24.0 g and resistance 5.00 mΩ. It is initially at rest with part of its area in a uniform magnetic field B = 2.90 T perpendicular to the loop’s plane. A constant 0.180 N force pulls it out of the field; neglect friction. Find (a) acceleration at 3.00 cm/s, (b) local limiting speed and acceleration there while crossing the field boundary, and (c) acceleration when fully outside the field.';
 }
 if(e.id==='29.69'){
  e.sv.prompt=e.sv.prompt.replace('glider på friktionsfria skenor','släpps från vila och glider nedför friktionsfria skenor');
  e.en.prompt=e.en.prompt.replace('slides on frictionless rails','is released from rest and slides down frictionless rails');
 }
}
for(const e of root.EmberChapter29DraftExercises){if(e.id!=='29.58')continue;
 e.sv.prompt='En 25,0 cm lång metallstav ligger i xy-planet med vinkeln 36,9° från +x mot +y och rör sig i +x-riktningen med farten 6,80 m/s. Magnetfältet är B = (0,120 î − 0,220 ĵ − 0,0900 k̂) T. (a) Bestäm beloppet av den inducerade emk:n. (b) Markera i en skiss vilken ände som har högre potential.';
 e.en.prompt='A 25.0 cm metal rod lies in the xy plane at 36.9° from +x toward +y and moves along +x at 6.80 m/s. The magnetic field is B = (0.120 î − 0.220 ĵ − 0.0900 k̂) T. (a) Find the induced emf magnitude. (b) Indicate in a sketch which end is at higher potential.';
 e.sv.steps=['Hastigheten är v = 6,80 î m/s. Kryssprodukten blir v × B = (0,612 ĵ − 1,496 k̂) V/m.','(a) Stavens längdvektor ligger i xy-planet och har beloppet 0,250 m. Därför ger skalärprodukten |ε| = 0,250·0,612 sin36,9° ≈ 0,0919 V.','(b) Den positiva projektionen av v × B längs staven driver positiva laddningar mot änden med större x och y. Den änden får högre potential, som skissen visar.','Den negativa z-komponenten av v × B är vinkelrät mot staven och bidrar inte till emk:n längs den.'];
 e.en.steps=['Velocity is v = 6.80 î m/s. The cross product is v × B = (0.612 ĵ − 1.496 k̂) V/m.','(a) The rod length vector lies in the xy plane and has magnitude 0.250 m. Its dot product gives |ε| = 0.250×0.612 sin36.9° ≈ 0.0919 V.','(b) The positive projection of v × B along the rod drives positive charges toward the end with larger x and y. That end is at higher potential, as shown in the sketch.','The negative z component of v × B is perpendicular to the rod and does not contribute to the emf along it.'];
 e.solutionFigure='rod-potential-58.svg';e.solutionAlt={sv:'Staven lutar upp åt höger i xy-planet och rör sig åt höger. Den övre högra änden har högre potential; den inplanära komponenten av v gånger B pekar uppåt.',en:'The rod slopes up and right in the xy plane and moves right. Its upper-right end has higher potential; the in-plane component of v cross B points upward.'};
}
for(const e of root.EmberChapter29Checks){
 if(e.id==='TYU29.2'){
  e.sv.prompt+=' Välj för båda delarna: (i) medurs; (ii) moturs; (iii) noll.';e.en.prompt+=' Choose for both parts: (i) clockwise; (ii) counterclockwise; (iii) zero.';
  e.sv.steps.push('Under deformationen är (i) rätt; efteråt är (iii) rätt. Moturs ström skulle motverka det inåtriktade fältet när flödet redan minskar.');e.en.steps.push('During deformation (i) is correct; afterward (iii) is correct. Counterclockwise current would oppose the inward field while its flux is already decreasing.');
 }
 if(e.id==='TYU29.3'){
  e.sv.prompt+=' Välj för varje del: (i) samma strömriktning som vid närmandet; (ii) motsatt; (iii) noll.';e.en.prompt+=' For each part choose: (i) the same current direction as during approach; (ii) opposite; (iii) zero.';
  e.sv.steps.push('Relativt närmande ger (i); oförändrat relativt läge ger (iii).');e.en.steps.push('Relative approach gives (i); unchanged relative position gives (iii).');
 }
 if(e.id==='TYU29.4'){
  e.sv.prompt+=' Alternativ för både (a) och (b): (i) öst–väst, (ii) nord–syd, (iii) vertikalt; (iv) i (a) samma emk för alla tre, i (b) ingen av dessa. Alternativ (c): (i) väster, (ii) norr, (iii) söder, (iv) upp, (v) ned. Flera svar kan passa i (b) och (c).';
  e.en.prompt+=' Choices for both (a) and (b): (i) east–west, (ii) north–south, (iii) vertical; (iv) in (a) the same emf for all three, in (b) none of these. Choices (c): (i) west, (ii) north, (iii) south, (iv) up, (v) down. More than one answer can apply in (b) and (c).';
  e.sv.steps.push('(a) (iii); (b) (i) och (ii); (c) (ii) och (iii), för det horisontella fältet i frågan.');e.en.steps.push('(a) (iii); (b) (i) and (ii); (c) (ii) and (iii), for the horizontal field specified.');
 }
 if(e.id==='TYU29.6'){
  e.sv.prompt+=' Välj: (i) båda oförändrade; (ii) kraft oförändrad och strömmar omvända; (iii) kraft omvänd och strömmar oförändrade; (iv) båda omvända.';e.en.prompt+=' Choose: (i) both unchanged; (ii) force unchanged and currents reversed; (iii) force reversed and currents unchanged; (iv) both reversed.';
  e.sv.steps.push('(iii) följer av att v × B är oförändrad men J × B vänder.');e.en.steps.push('(iii) follows because v × B is unchanged but J × B reverses.');
 }
}
const passage={sv:'Gemensam information: I transkraniell magnetstimulering skapar en spole nära huvudet ett tidsvarierande magnetfält. Fältet inducerar elektriska strömmar i ledande hjärnvävnad; de kan påverka nervcellers aktionspotentialer. I uppgifterna används en förenklad kretsmodell och den visade magnetfältspulsen. ',en:'Shared information: In transcranial magnetic stimulation, a coil near the head produces a time-varying magnetic field. The field induces electric currents in conducting brain tissue that can affect nerve-cell action potentials. These questions use a simplified circuit model and the illustrated magnetic-field pulse. '};
for(const e of root.EmberChapter29DraftExercises){if(!/^29\.(71|72|73|74)$/.test(e.id))continue;for(const lang of ['sv','en'])e[lang].prompt=passage[lang]+e[lang].prompt;}
})(window);
