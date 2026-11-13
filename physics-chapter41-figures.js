(function(root){'use strict';const by=id=>root.EmberChapter41DraftExercises.find(e=>e.id===id);Object.assign(by('41.22'),{solutionFigure:'zeeman-22.svg',solutionAlt:{sv:'En orbital d-nivå utan fält delas i fem jämnt fördelade nivåer vid fältet 0,400 tesla; magnetiskt kvanttal går från minus två på lägsta till plus två på högsta.',en:'One orbital d level with no field splits into five equally spaced levels at 0.400 tesla; magnetic quantum number runs from minus two at lowest to plus two at highest.'}});Object.assign(by('41.63'),{solutionFigure:'graph-63.svg',solutionAlt:{sv:'Sju uppmätta frekvenser i gigahertz mot magnetfältet i tesla med en stigande rät anpassning.',en:'Seven measured frequencies in gigahertz versus magnetic field in tesla with an upward linear fit.'}});by('41.60').resources=[{url:'https://physics.nist.gov/PhysRefData/Handbook/Tables/lithiumtable3_a.htm',sv:'NIST · jämförelse med uppmätta spektrallinjer för neutralt litium',en:'NIST · comparison with measured neutral-lithium spectral lines'}];const options={
'41.70':[' A: 140; B: 400; C: 20; D: 81.',' A: 140; B: 400; C: 20; D: 81.'],
'41.71':[' A: 10⁵; B: 10⁸; C: 10¹¹; D: 10²¹ atomer/cm³.',' A: 10⁵; B: 10⁸; C: 10¹¹; D: 10²¹ atoms/cm³.'],
'41.72':[' A: √2ℏ; B: √6ℏ; C: √200ℏ; D: √10100ℏ.',' A: √2ℏ; B: √6ℏ; C: √200ℏ; D: √10100ℏ.'],
'41.73':[' A: 2; B: 100; C: 10000; D: 10.',' A: 2; B: 100; C: 10000; D: 10.']};for(const [id,[sv,en]] of Object.entries(options)){by(id).sv.prompt+=sv;by(id).en.prompt+=en}
})(window);
(function(root){'use strict';
const by=id=>root.EmberChapter41DraftExercises.find(e=>e.id===id);
by('41.22').sv.prompt=by('41.22').sv.prompt.replace('beskriv nivådiagrammet','rita ett nivådiagram med och utan fält');
by('41.22').en.prompt=by('41.22').en.prompt.replace('describe the level diagram','draw an energy-level diagram with and without the field');
by('41.26').sv.prompt+=' Sådan strålning från kalla vätgasmoln används inom astronomi. Jämför fältet med spinn–bankopplingens effektiva fält 18,0 T i natriumexemplet 41.7.';
by('41.26').en.prompt+=' Such radiation from cold hydrogen clouds is used in astronomy. Compare the field with the 18.0 T effective spin-orbit field in the sodium example 41.7.';
by('41.26').sv.steps.push('Jämfört med 18,0 T är 0,0510 T ungefär 0,00283 gånger så stort, eller cirka 353 gånger svagare.');
by('41.26').en.steps.push('Compared with 18.0 T, 0.0510 T is about 0.00283 times as large, or approximately 353 times weaker.');
by('41.43').sv.prompt+=' Jämför med sannolikheten mellan 0 och L/4 i exempel 41.1.';
by('41.43').en.prompt+=' Compare with the probability from 0 to L/4 in example 41.1.';
by('41.43').sv.steps.push('För 0 ≤ x ≤ L/4 är sannolikheten 1/4−1/(2π) ≈ 0,0908. De två kvartarna summerar till 1/2, som symmetrin kräver.');
by('41.43').en.steps.push('For 0 ≤ x ≤ L/4 the probability is 1/4−1/(2π) ≈ 0.0908. The two quarters add to 1/2, as symmetry requires.');
by('41.45').sv.steps.push('Den isotropa oscillatorn har också ett grundtillstånd men tre första exciterade tillstånd; här har båda nivåerna ett enda spatialt tillstånd.');
by('41.45').en.steps.push('The isotropic oscillator also has one ground state but three first-excited states; here each of these levels has one spatial state.');
})(window);
