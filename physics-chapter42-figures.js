(function(root){'use strict';const by=id=>root.EmberChapter42DraftExercises.find(e=>e.id===id);const data={
'42.49':['diode-circuit-49.svg','Halvvågskrets: ett seriemotstånd mellan ingångens plus och utgångens plus; en diod är kopplad från utgångens plus ned till den gemensamma minusledningen.','Half-wave circuit: a series resistor between input positive and output positive; a diode connects from output positive downward to the common negative line.'],
'42.50':['junction-50.svg','Utarmningsområde med negativa acceptorjoner på p-sidan från minus a-p till noll och positiva donatorjoner på n-sidan från noll till a-n.','Depletion region with negative acceptor ions on the p side from minus a-p to zero and positive donor ions on the n side from zero to a-n.'],
'42.51':['co2-mode-51.svg','Koldioxidmolekyl med kol mellan två syreatomer och fjädrar som bindningar. I den asymmetriska moden rör sig syreatomerna åt samma håll och kolatomen åt motsatt håll.','Carbon dioxide with carbon between two oxygen atoms and springs for bonds. In the asymmetric mode both oxygen atoms move in the same direction and carbon moves oppositely.']};for(const [id,[figure,sv,en]] of Object.entries(data))Object.assign(by(id),{figure,alt:{sv,en}});Object.assign(by('42.47'),{solutionFigure:'graph-47.svg',solutionAlt:{sv:'Sex datapunkter visar energi mot ln av invers ockupationssannolikhet minus ett, med en stigande linjär anpassning.',en:'Six data points show energy versus ln of inverse occupancy minus one, with an upward linear fit.'}});for(const id of ['42.56','42.57','42.58'])Object.assign(by(id),{figure:'temperature-56.svg',alt:{sv:'Ungefärlig rekonstruktion av ström mot spänning för 150 och 25 grader Celsius. Vid 0,10 ampere avläses cirka 0,53 respektive 0,73 volt.',en:'Approximate reconstruction of current versus voltage at 150 and 25 degrees Celsius. At 0.10 ampere the readings are about 0.53 and 0.73 volts, respectively.'}});
const options={
'42.56':[' A: +0,2; B: +2,0; C: −0,2; D: −2,0 mV/°C.',' A: +0.2; B: +2.0; C: −0.2; D: −2.0 mV/°C.'],
'42.57':[' A: bandgapet ökar; B: fler elektroner når ledningsbandet; C: alla valenselektroner flyttas till ledningsbandet; D: dopatomerna rör sig fritt.',' A: the band gap increases; B: more electrons reach the conduction band; C: all valence electrons move to the conduction band; D: dopant atoms move freely.'],
'42.58':[' A: strömmen ökar sedan minskar; B: den ökar; C: den minskar mot noll; D: den ändras inte.',' A: current rises then falls; B: it rises; C: it falls toward zero; D: it does not change.']};for(const [id,[sv,en]] of Object.entries(options)){by(id).sv.prompt+=sv;by(id).en.prompt+=en}
})(window);
(function(root){'use strict';
const by=id=>root.EmberChapter42DraftExercises.find(e=>e.id===id);
by('42.2').sv.prompt+=' Energiförändringarna gäller i ordning en molekylvibration, en atomär övergång och en molekylrotation.';
by('42.2').en.prompt+=' The energy changes correspond respectively to molecular vibration, an atomic transition and molecular rotation.';
by('42.21').sv.prompt+=' Ange också resultatet som andel av R och förklara vilken process som främst ger den uppmätta värmekapaciteten.';
by('42.21').en.prompt+=' Also express the result as a fraction of R and explain which process contributes most of the measured heat capacity.';
by('42.33').sv.prompt+=' Diskutera varför bindningarnas jonkaraktär skiljer sig.';
by('42.33').en.prompt+=' Discuss why the bonds differ in ionic character.';
by('42.33').sv.steps.push('Natrium och klor har större skillnad i elektronegativitet än väte och jod, vilket i denna förenklade jämförelse ger mer laddningsförskjutning i NaCl och en mer kovalent bindning i HI.');
by('42.33').en.steps.push('Sodium and chlorine differ more in electronegativity than hydrogen and iodine; in this simplified comparison NaCl has greater charge transfer and HI has a more covalent bond.');
by('42.35').sv.prompt+=' Förklara varför kvoten först ökar och sedan avtar när l ökar.';
by('42.35').en.prompt+=' Explain why the ratio first increases and then decreases as l increases.';
by('42.38').sv.prompt+=' I molekylmoln finns ungefär 10 000 H₂-molekyler per CO-molekyl, men kalla H₂-molekyler strålar inte i de radio- eller synliga områden som diskuteras här. Därför används CO-linjen för att studera molnen.';
by('42.38').en.prompt+=' Molecular clouds contain roughly 10,000 H₂ molecules per CO molecule, but cold H₂ molecules do not radiate in the radio or visible bands discussed here. The CO line can therefore be used to study the clouds.';
by('42.47').sv.prompt=by('42.47').sv.prompt.replace('Anpassa E mot','Rita och anpassa E mot');
by('42.47').en.prompt=by('42.47').en.prompt.replace('Fit E against','Graph and fit E against');
by('42.48').sv.prompt+=' Övergången ingår i styrningen av ett vindkraftverk som undersöks efter ett fel.';
by('42.48').en.prompt+=' The junction is part of a wind turbine control system being checked after a malfunction.';
})(window);
