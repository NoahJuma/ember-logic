(function(root){'use strict';
for(const e of root.EmberChapter28Checks){
 if(e.id==='TYU28.1'){
  e.sv.prompt+=' Välj (a) magnetkraft: (i) attraktiv, (ii) repulsiv; (b) nettokraft: (i) attraktiv, (ii) repulsiv, (iii) noll.';e.en.prompt+=' Choose (a) magnetic force: (i) attractive, (ii) repulsive; (b) net force: (i) attractive, (ii) repulsive, (iii) zero.';
  e.sv.steps.push('(a) är (i) och (b) är (ii): den magnetiska attraktionen är mindre än den elektriska repulsionen för v mycket mindre än c.');e.en.steps.push('(a) is (i) and (b) is (ii): magnetic attraction is weaker than electric repulsion for v much less than c.');
 }
 if(e.id==='TYU28.4'){
  e.sv.prompt+=' Välj i varje del: (i) attraktiv, (ii) repulsiv, (iii) noll.';e.en.prompt+=' For each part choose: (i) attractive, (ii) repulsive, (iii) zero.';
  e.sv.steps.push('I den angivna neutralitetsmodellen blir följden (i), (iii), (ii), (iii).');e.en.steps.push('In the stated neutrality model the sequence is (i), (iii), (ii), (iii).');
 }
 if(e.id==='TYU28.6'){
  e.sv.prompt+=' Välj: (i) inga strömmar; (ii) ström ut ur sidan; (iii) ström in i sidan; (iv) otillräcklig information.';e.en.prompt+=' Choose: (i) no currents; (ii) current out of the page; (iii) current into the page; (iv) insufficient information.';
  e.sv.steps.push('(ii) är rätt för den angivna riktningen: högerhandsregeln kopplar moturs integration till en ytnormal ut ur sidan.');e.en.steps.push('(ii) is correct for the stated direction: the right-hand rule links counterclockwise integration to an outward surface normal.');
 }
 if(e.id==='TYU28.8'){
  e.sv.prompt+=' Välj alla som stämmer: (i) natrium, (ii) vismut, (iii) bly, (iv) uran.';e.en.prompt+=' Choose all that apply: (i) sodium, (ii) bismuth, (iii) lead, (iv) uranium.';
  e.sv.steps.push('(i) och (iv) är paramagnetiska i tabellens modell; (ii) och (iii) är diamagnetiska.');e.en.steps.push('(i) and (iv) are paramagnetic in the table’s model; (ii) and (iii) are diamagnetic.');
 }
}
const passage={sv:'Gemensam information: Magnetotaktiska bakterier innehåller kedjor av ferromagnetiska partiklar som hjälper dem att orientera sig i magnetfält. I ett experiment placeras ett prov i en skärmad solenoid, lindad med tunnisolerad koppartråd i ett lager. Vridmomentet är proportionellt mot fältets styrka och sinus för vinkeln mellan fältet och bakteriens magnetiska moment. ',en:'Shared information: Magnetotactic bacteria contain chains of ferromagnetic particles that help orient them in magnetic fields. In an experiment a sample is placed inside a shielded solenoid wound in one layer with thinly insulated copper wire. Torque is proportional to field strength and to the sine of the angle between the field and the bacterium’s magnetic moment. '};
for(const e of root.EmberChapter28DraftExercises){if(!/^28\.(81|82|83)$/.test(e.id))continue;for(const lang of ['sv','en'])e[lang].prompt=passage[lang]+e[lang].prompt;
 if(e.id==='28.82'){
  e.sv.steps.push('För en ändlig, jämnt lindad solenoid ger centrumfältet B = μ₀nI L/√(L²+4a²). Med L = 0,40 m och radierna a = 0,06 respektive 0,12 m blir kvoten ungefär 0,895. Oförändrat vridmoment är alltså långsolenoidens approximation, inte ett exakt resultat för dessa ändliga mått.');
  e.en.steps.push('For a finite uniformly wound solenoid, the center field is B = μ₀nI L/√(L²+4a²). With L = 0.40 m and radii a = 0.06 and 0.12 m, the ratio is about 0.895. Unchanged torque is therefore the long-solenoid approximation, not an exact result for these finite dimensions.');
 }
}
})(window);
