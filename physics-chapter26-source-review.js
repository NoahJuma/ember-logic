(function(root){'use strict';
for(const e of root.EmberChapter26Checks){
 if(e.id==='TYU26.3'){
  e.sv.prompt='Du vill mäta strömmen genom och spänningen över en 2 Ω-resistor. (a) Välj inkoppling: (i) båda mätarna i serie; (ii) amperemetern i serie och voltmetern över resistorn; (iii) amperemetern över resistorn och voltmetern i serie; (iv) båda mätarna över resistorn. (b) Välj inre resistanser: (i) båda mycket större än 2 Ω; (ii) amperemetern mycket större och voltmetern mycket mindre; (iii) amperemetern mycket mindre och voltmetern mycket större; (iv) båda mycket mindre.';
  e.en.prompt='You want to measure the current through and the voltage across a 2 Ω resistor. (a) Choose connections: (i) both meters in series; (ii) ammeter in series and voltmeter across the resistor; (iii) ammeter across the resistor and voltmeter in series; (iv) both meters across the resistor. (b) Choose internal resistances: (i) both much greater than 2 Ω; (ii) ammeter much greater and voltmeter much smaller; (iii) ammeter much smaller and voltmeter much greater; (iv) both much smaller.';
  e.sv.steps=['(a) Välj (ii). En amperemeter ska bära grenströmmen; en voltmeter jämför potentialerna över resistorn. De andra kopplingarna mäter fel eller stör kretsen kraftigt.','(b) Välj (iii): amperemeterns låga resistans begränsar dess spänningsfall, medan voltmeterns höga resistans begränsar strömmen genom mätaren. Övriga alternativ uppfyller inte båda kraven.'];
  e.en.steps=['(a) Choose (ii). The ammeter carries the branch current; the voltmeter compares the potentials across the resistor. The other connections measure the wrong quantity or strongly disturb the circuit.','(b) Choose (iii): low ammeter resistance limits its voltage drop, while high voltmeter resistance limits current through it. The other choices do not satisfy both conditions.'];
 }
 if(e.id==='TYU26.4'){
  e.sv.prompt+=' Välj: (i) 1/e; (ii) 1/e²; (iii) 1−1/e; (iv) (1−1/e)²; (v) det beror på den ursprungliga energin.';
  e.en.prompt+=' Choose: (i) 1/e; (ii) 1/e²; (iii) 1−1/e; (iv) (1−1/e)²; (v) it depends on the initial energy.';
  e.sv.steps.push('(ii) är rätt. (i) är laddningskvoten, inte energikvoten; (iii) och (iv) använder laddningsuttrycket för uppladdning. Den relativa kvoten beror inte på initial energimängd, så (v) är fel.');
  e.en.steps.push('(ii) is correct. (i) is the charge ratio, not the energy ratio; (iii) and (iv) use the charging expression. The fraction is independent of the initial energy, so (v) is incorrect.');
 }
}
const passage={sv:'Gemensam information: En nervcells axon leder signaler. Jonkanaler är proteiner genom cellmembranet; när en kanal är öppen leder vätskan i poren ström mellan cellens in- och utsida. Själva det fettrika membranet har däremot hög resistivitet. ',en:'Shared information: A nerve cell’s axon conducts signals. Ion channels are proteins spanning its membrane; when a channel is open, fluid in its pore conducts between the cell interior and exterior. The lipid-rich membrane itself has high resistivity. '};
const feedback={
 '26.86':{sv:'(c) 2 Ω·m ligger närmast 2,36 Ω·m; (a), (b) och (d) ligger längre från beräkningen.',en:'(c) 2 Ω·m is closest to 2.36 Ω·m; (a), (b) and (d) are farther from the calculation.'},
 '26.87':{sv:'Omräkningen 10¹⁰/cm² = 100/μm² ger (d). De övriga alternativen är betydligt lägre och kräver en annan ström per kanal eller fel areaomräkning.',en:'Converting 10¹⁰/cm² = 100/μm² gives (d). The other options are much smaller and require a different current per channel or an incorrect area conversion.'},
 '26.88':{sv:'(b) 10 μs följer av (RA)(C/A). (a) och (c) skiljer en faktor tio; (d) skiljer en faktor hundra.',en:'(b) 10 μs follows from (RA)(C/A). (a) and (c) differ by a factor of ten; (d) differs by a factor of one hundred.'}
};
for(const e of root.EmberChapter26DraftExercises){if(!feedback[e.id])continue;for(const lang of ['sv','en']){e[lang].prompt=passage[lang]+e[lang].prompt;e[lang].steps.push(feedback[e.id][lang]);}}
})(window);
