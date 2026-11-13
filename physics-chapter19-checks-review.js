(function(root){'use strict';
for(const e of root.EmberChapter19Checks){
 if(e.id==='TYU19.3'||e.id==='TYU19.5'){
  e.figure='pv-paths-19-7.svg';
  e.alt={sv:'p–V-diagram med tillstånd 1 upptill till vänster, 3 upptill till höger, 4 nedtill till vänster och 2 nedtill till höger. En böjd väg går från 1 till 2.',en:'Pressure–volume diagram with state 1 upper left, 3 upper right, 4 lower left and 2 lower right. A curved path joins 1 to 2.'};
 }
 if(e.id==='TYU19.2'){
  e.sv.prompt+=' Alternativ: (i) konstant tryck; (ii) konstant temperatur; (iii) lika mycket; (iv) för lite information.';
  e.en.prompt+=' Choices: (i) constant pressure; (ii) constant temperature; (iii) equal work; (iv) insufficient information.';
  e.sv.steps.push('(iv) är det entydiga svaret utan gemensamt start- eller sluttillstånd. (i) gäller vid samma start, medan (ii) gäller vid samma slut; (iii) följer inte enbart av volymfördubblingen.');
  e.en.steps.push('(iv) is the unambiguous answer without a shared initial or final state. (i) applies for the same initial state, while (ii) applies for the same final state; (iii) does not follow from volume doubling alone.');
 }
 if(e.id==='TYU19.7'){
  e.sv.steps.push('(i) är rätt under de vanliga rumstemperaturantagandena. (ii) och (iii) har normalt större värmekapacitet på grund av ytterligare frihetsgrader; därför är (iv) inte generellt rätt.');
  e.en.steps.push('(i) is correct under the usual room-temperature assumptions. (ii) and (iii) normally have larger heat capacities because additional degrees of freedom are active; (iv) is therefore not generally correct.');
 }
}
})(window);
