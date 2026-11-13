(function(root){'use strict';
for(const e of root.EmberChapter27DraftExercises){if(e.id!=='27.67')continue;
 e.sv.prompt='En rätvinklig triangelslinga har P = (0,0), Q = (0; 0,600 m) och R = (0,800 m; 0). Strömmen 5,00 A går P→Q→R→P och ett homogent magnetfält 3,00 T pekar längs +y. Slingan kan rotera kring PR. (a) Bestäm kraftens storlek och riktning på varje sida. (b) Bestäm nettokraften. (c) Bestäm momentet kring PR från varje sidas kraft. (d) Bestäm nettomomentet både genom summan och med μ × B och jämför. (e) Rör sig Q in i eller ut ur figurens plan?';
 e.en.prompt='A right-triangular loop has P = (0,0), Q = (0, 0.600 m) and R = (0.800 m, 0). Current 5.00 A runs P→Q→R→P and a uniform 3.00 T magnetic field points along +y. The loop pivots about PR. (a) Find the magnitude and direction of the force on each side. (b) Find the net force. (c) Find the torque about PR from each side’s force. (d) Find the net torque both by summing and by μ × B, and compare. (e) Does Q move into or out of the plane of the figure?';
 e.sv.steps=['För varje rak sida är F = I L × B, med B = 3,00 j T och +k ut ur planet.','(a) PQ är parallell med fältet och har kraft noll. För QR ger x-komponenten F_QR = +12,0 k N; för RP ger den F_RP = −12,0 k N.','(b) Kraftsumman är noll.','(c) QR:s kraft angriper vid sidans mitt, 0,300 m från axeln PR, och ger τ_x = 0,300·12,0 = +3,60 N·m. PQ har ingen kraft och RP ligger på axeln, så deras axelmoment är noll.','(d) Summan är +3,60 i N·m. Arean är 0,800·0,600/2 = 0,240 m² och strömriktningen ger μ = −IA k. Då ger μ × B också +3,60 i N·m: metoderna stämmer.','(e) Q rör sig ut ur planet.'];
 e.en.steps=['For each straight side F = I L × B, with B = 3.00 j T and +k out of the plane.','(a) PQ is parallel to the field and has zero force. QR’s x component gives F_QR = +12.0 k N; RP gives F_RP = −12.0 k N.','(b) The forces sum to zero.','(c) QR’s force acts at its midpoint, 0.300 m from axis PR, giving τ_x = 0.300×12.0 = +3.60 N·m. PQ has no force and RP lies on the axis, so their axial torques are zero.','(d) The sum is +3.60 i N·m. Area is 0.800×0.600/2 = 0.240 m² and current direction gives μ = −IA k. Then μ × B also gives +3.60 i N·m: the methods agree.','(e) Q moves out of the plane.'];
}
for(const e of root.EmberChapter27Checks){
 if(e.id==='TYU27.3'){
  e.sv.prompt+=' (a) Välj fältstyrkans variation: (i) konstant; (ii) ökar och minskar sedan; (iii) minskar och ökar sedan. (b) Ändras riktningen?';
  e.en.prompt+=' (a) Choose the variation of field strength: (i) constant; (ii) increases then decreases; (iii) decreases then increases. (b) Does the direction change?';
  e.sv.steps.push('(a) (ii) gäller för en ideal cirkulär slinga på hela dess axel. (b) Fältets riktning längs axeln är densamma på båda sidor.');e.en.steps.push('(a) (ii) applies to an ideal circular loop along its axis. (b) The axial field direction is the same on both sides.');
 }
 if(e.id==='TYU27.4'){
  e.sv.prompt+=' Välj för var och en: (i) oförändrad; (ii) dubbelt så stor; (iii) fyra gånger så stor; (iv) hälften så stor; (v) en fjärdedel.';
  e.en.prompt+=' Choose for each: (i) unchanged; (ii) twice; (iii) four times; (iv) one half; (v) one quarter.';
  e.sv.steps.push('Radien motsvarar (ii), perioden (i). En fördubblad banlängd genomlöps med dubbla farten.');e.en.steps.push('Radius corresponds to (ii), period to (i). The doubled circumference is traversed at twice the speed.');
 }
 if(e.id==='TYU27.5'){
  e.sv.prompt+=' Välj: (i) 4,00; (ii) 2,00; (iii) 1,00; (iv) 0,50; (v) 0,25, samtliga i enheten 10⁵ m/s.';
  e.en.prompt+=' Choose: (i) 4.00; (ii) 2.00; (iii) 1.00; (iv) 0.50; (v) 0.25, all in units of 10⁵ m/s.';
  e.sv.steps.push('(iii) är rätt eftersom kraftbalansen qE = qvB inte beror på laddningsbeloppet. De övriga farterna ger inte noll nettokraft med samma fält.');e.en.steps.push('(iii) is correct because force balance qE = qvB is independent of charge magnitude. The other speeds do not give zero net force in the same fields.');
 }
 if(e.id==='TYU27.9'){
  e.sv.prompt+=' Välj: (i) norr; (ii) söder; (iii) öster; (iv) väster.';e.en.prompt+=' Choose: (i) north; (ii) south; (iii) east; (iv) west.';
  e.sv.steps.push('(ii) är rätt. Fält och laddningsseparation ger ingen Hallpotential på öst- eller västsidan; nordsidan blir negativ relativt sydsidan.');e.en.steps.push('(ii) is correct. The Hall separation is not toward east or west; the north side becomes negative relative to the south side.');
 }
}
const passage={sv:'Gemensam information: Magnetresonanstomografi använder kärnors magnetiska moment. I en förenklad modell kan ett moment vara orienterat med eller mot ett yttre fält, med olika energier. Kärnor med jämnt antal både protoner och neutroner har ofta parvis utjämnade bidrag och nettospinn noll. Spinn är en kvantegenskap; en klassisk strömslinga är endast en analogi. ',en:'Shared information: Magnetic resonance imaging uses nuclear magnetic moments. In a simplified model a moment can be oriented with or against an external field, with different energies. Nuclei with even numbers of both protons and neutrons often have paired contributions and zero net spin. Spin is a quantum property; a classical current loop is only an analogy. '};
for(const e of root.EmberChapter27DraftExercises){if(!/^27\.(83|84|85)$/.test(e.id))continue;for(const lang of ['sv','en'])e[lang].prompt=passage[lang]+e[lang].prompt;}
})(window);
