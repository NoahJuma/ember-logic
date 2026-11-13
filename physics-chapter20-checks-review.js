(function(root){'use strict';
for(const e of root.EmberChapter20Checks){
 if(e.id==='TYU20.1'){
  e.sv.prompt+=' Alternativ: (i) reversibel; (ii) irreversibel.';e.en.prompt+=' Choices: (i) reversible; (ii) irreversible.';
  e.sv.steps.push('(ii) är rätt. (i) skulle kräva att både händer och omgivning kan återställas utan någon annan nettoförändring.');e.en.steps.push('(ii) is correct. (i) would require both hands and surroundings to be restored without another net change.');
 }
 if(e.id==='TYU20.3'){
  e.sv.prompt='En ideal Otto-motor har cylindrar av fast storlek och ett fast kompressionsförhållande. Vilka delar av figurens p–V-diagram ändras om den tillförda bränsleenergin per cykel fördubblas? Flera svar kan vara rätt: (i) det lodräta avståndet mellan b och c; (ii) det lodräta avståndet mellan a och d; (iii) det vågräta avståndet mellan b och a.';
  e.en.prompt='An ideal Otto engine has cylinders of fixed size and a fixed compression ratio. Which aspects of the figure’s p–V diagram change if fuel energy input per cycle doubles? More than one answer may be correct: (i) the vertical distance between b and c; (ii) the vertical distance between a and d; (iii) the horizontal distance between b and a.';
  e.sv.steps=['Med samma begynnelsetillstånd och konstanta värmekapaciteter fördubblas temperatur- och tryckökningen under den isokora värmetillförseln b→c.','Det fasta kompressionsförhållandet ger samma idealverkningsgrad, så värmeavgivningens belopp och tryckfallet d→a fördubblas också.','Alltså ändras (i) och (ii). (iii) ändras inte eftersom största och minsta cylindervolym är oförändrade.'];
  e.en.steps=['With the same initial state and constant heat capacities, the temperature and pressure rise during isochoric heat input b→c doubles.','The fixed compression ratio gives the same ideal efficiency, so the magnitude of heat rejected and the pressure drop d→a also double.','Thus (i) and (ii) change. (iii) does not because the maximum and minimum cylinder volumes are unchanged.'];
  e.figure='otto-20-6.svg';e.alt={sv:'Otto-cykel i ett p–V-diagram: a till b adiabatisk kompression, b till c värmning vid konstant volym, c till d adiabatisk expansion och d till a kylning vid konstant volym.',en:'Otto cycle on a pressure–volume diagram: a to b adiabatic compression, b to c constant-volume heating, c to d adiabatic expansion, and d to a constant-volume cooling.'};
 }
 if(e.id==='TYU20.8'){
  e.sv.prompt+=' Alternativ: (i) reversibel isoterm; (ii) reversibel adiabatisk; (iii) lika stor ökning.';
  e.en.prompt+=' Choices: (i) reversible isothermal; (ii) reversible adiabatic; (iii) the same increase.';
  e.sv.steps.push('(i) är rätt: (ii) har konstant entropi i den reversibla modellen, så (iii) gäller inte.');e.en.steps.push('(i) is correct: (ii) has constant entropy in the reversible model, so (iii) does not hold.');
 }
}
})(window);
