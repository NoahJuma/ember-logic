(function(root){'use strict';
const passage={
 sv:'Gemensam information: Vissa spindelnät består av torrt silke täckt av en vattenattraherande lösning. Forskare undersökte hypotesen att den fuktiga beläggningen leder ström genom att placera 5 mm tråd mellan två elektriska kontakter, sträcka den stegvis och sedan låta den återgå. Några mätvärden i ordning är längd (mm): 5, 7, 9, 11, 13, 9, 7, 5; resistans (GΩ): 9, 19, 41, 63, 102, 76, 50, 24. ',
 en:'Shared information: Some spiderwebs consist of dry silk coated with a water-attracting solution. To investigate whether the moist coating conducts electricity, researchers placed 5 mm of thread between electrical contacts, stretched it in increments, then let it return. Selected measurements in order are length (mm): 5, 7, 9, 11, 13, 9, 7, 5; resistance (GΩ): 9, 19, 41, 63, 102, 76, 50, 24. '
};
for(const e of root.EmberChapter25DraftExercises){
 if(!/^25\.(79|80|81|82)$/.test(e.id))continue;
 for(const lang of ['sv','en'])e[lang].prompt=passage[lang]+e[lang].prompt;
 if(e.id==='25.79'){
  e.sv.prompt=e.sv.prompt.replace('En fuktig beläggning på en spindeltråd mäts medan tråden sträcks från 5 till 13 mm och sedan släpps tillbaka. Vid ökande längd 5, 7, 9, 11 och 13 mm är resistansen 9, 19, 41, 63 och 102 GΩ. På återvägen vid 9, 7 och 5 mm är den 76, 50 och 24 GΩ. Förklara den mest rimliga mekanismen.','Vilken mekanism förklarar observationerna bäst?');
  e.en.prompt=e.en.prompt.replace('A moist coating on a spider thread is measured while the thread is stretched from 5 to 13 mm and then released. During stretching, at lengths 5, 7, 9, 11 and 13 mm, resistance is 9, 19, 41, 63 and 102 GΩ. On release, at 9, 7 and 5 mm, it is 76, 50 and 24 GΩ. Explain the most plausible mechanism.','Which mechanism best explains the observations?');
 }
 if(e.id==='25.80'){
  e.sv.prompt=e.sv.prompt.replace('En ledande trådbeläggning har resistans 9 GΩ vid längden 5 mm och 102 GΩ vid 13 mm.','Använd mätvärdena under sträckningen.');
  e.en.prompt=e.en.prompt.replace('A conducting thread coating has resistance 9 GΩ at length 5 mm and 102 GΩ at 13 mm.','Use the measurements during stretching.');
 }
 if(e.id==='25.81'){
  e.sv.prompt=e.sv.prompt.replace('Den minsta uppmätta resistansen hos en spindeltråd är 9 GΩ. Vilken största ström ger ett 9 V-batteri enligt Ohms lag?','Vilken är den största strömmen under experimentet med en spänningskälla på 9 V?').replace('1 mA','1 μA');
  e.en.prompt=e.en.prompt.replace('The smallest measured spider-thread resistance is 9 GΩ. What maximum current does a 9 V battery give by Ohm’s law?','What is the maximum current during the experiment with a 9 V source?').replace('1 mA','1 μA');
 }
 const feedback={
  '25.79':{sv:'(a) följer inte av observationerna; (b) strider mot den ändliga uppmätta resistansen; (d) förklarar inte längdberoendet. (c) är bästa alternativet, men återgången är inte fullständig.',en:'(a) does not follow from the observations; (b) conflicts with the measured finite resistance; (d) does not explain the dependence on length. (c) is the best choice, although recovery is incomplete.'},
  '25.80':{sv:'Kvoten 0,229 ligger närmare (b) 1/4 än (a) 1/10, (c) 2/5 eller (d) 1.',en:'The ratio 0.229 is closer to (b) 1/4 than to (a) 1/10, (c) 2/5 or (d) 1.'},
  '25.81':{sv:'Alternativen (a) 1 A, (b) 0,1 A och (c) 1 μA är alla större än resultatet; (d) 1 nA är rätt.',en:'Choices (a) 1 A, (b) 0.1 A and (c) 1 μA are all larger than the result; (d) 1 nA is correct.'},
  '25.82':{sv:'En permanent positiv eller negativ nettoladdning skulle inte i sig förklara attraktion av båda tecknen. (d) är förenligt med polarisation, men attraktion bevisar inte att materialet leder ström.',en:'A permanent positive or negative net charge alone would not explain attraction to both signs. (d) is consistent with polarization, but attraction does not prove conductivity.'}
 }[e.id];
 for(const lang of ['sv','en'])e[lang].steps.push(feedback[lang]);
}
for(const e of root.EmberChapter25Checks){
 if(e.id==='TYU25.1'){
  e.sv.prompt+=' Välj: (i) oförändrad, (ii) dubbelt så stor, (iii) fyra gånger så stor, (iv) hälften så stor, (v) en fjärdedel.';
  e.en.prompt+=' Choose: (i) unchanged, (ii) twice, (iii) four times, (iv) one half, (v) one quarter.';
  e.sv.steps.push('(v) är rätt: diametern fördubblas och arean fyrdubblas. Övriga alternativ missar kvadratsambandet.');
  e.en.steps.push('(v) is correct: doubling the diameter quadruples area. The other choices miss this square relationship.');
 }
 if(e.id==='TYU25.2'){
  e.sv.prompt+=' Välj: (i) ökar, (ii) minskar, (iii) oförändrad.';e.en.prompt+=' Choose: (i) increases, (ii) decreases, (iii) unchanged.';
  e.sv.steps.push('(ii) är bokens svar i den enkla halvledarmodellen; (i) och (iii) följer inte av det antagna temperaturberoendet.');e.en.steps.push('(ii) is the book’s answer for the simple semiconductor model; (i) and (iii) do not follow from its assumed temperature dependence.');
 }
}
})(window);
