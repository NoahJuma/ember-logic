(function(root){'use strict';
const figures={
'24.18':['series-18.svg','Kondensatorerna C₁ och C₂ är seriekopplade mellan a och b, där a har högre potential.','Capacitors C₁ and C₂ are in series between a and b, with a at higher potential.'],
'24.19':['parallel-19.svg','Kondensatorerna C₁ och C₂ är parallellkopplade mellan a och b, där a har högre potential.','Capacitors C₁ and C₂ are in parallel between a and b, with a at higher potential.'],
'24.48':['membrane-48.svg','Ett membran med tjocklek 7,5 nm och dielektricitetskonstant ungefär 10 skiljer positiv laddning på utsidan från negativ laddning på insidan.','A membrane of thickness 7.5 nm and dielectric constant approximately 10 separates positive charge outside from negative charge inside.'],
'24.66':['fuel-gauge-66.svg','Två vertikala plattor har höjd L och bredd w in i bilden. Bränsle med dielektricitetskonstant κ når höjden h; resten av mellanrummet innehåller luft. Ett batteri håller spänningen V.','Two vertical plates have height L and width w into the page. Fuel with dielectric constant κ reaches height h; air occupies the remaining gap. A battery maintains voltage V.'],
'24.70':['coaxial-sleeve-70.svg','Längd- och tvärsnitt av en koaxial kondensator: innerledaren har radie rₐ, ytterledaren innerradie rᵦ och dielektrikumets ytterradius är R. Hylsan är införd längden x av L.','Longitudinal and transverse sections of a coaxial capacitor: inner conductor radius rₐ, outer conductor inner radius rᵦ, dielectric sleeve outer radius R, and insertion length x of L.'],
'24.72':['inserted-slab-72.svg','Sidovy av två kvadratiska plattor med sidan L och avstånd D. En dielektrisk skiva fyller plattgapet över längden x, och resten innehåller luft. Plattorna sträcker sig bredden L in i bilden.','Side view of two square plates of side L separated by D. A dielectric slab fills the gap over length x and air fills the rest. The plates extend width L into the page.'],
'24.14':['network-14.svg','10,0 μF i serie med parallellkopplade 5,0 och 8,0 μF, följt av 9,0 μF.','10.0 μF in series with 5.0 and 8.0 μF in parallel, followed by 9.0 μF.'],
'24.16':['network-16.svg','15 pF mellan a och b; 9,0 och 11 pF parallellt mellan b och c.','15 pF between a and b; 9.0 and 11 pF in parallel between b and c.'],
'24.17':['network-17.svg','C₁ och C₂ i serie mellan a och d, parallellt med C₃; C₄ mellan d och b.','C₁ and C₂ in series between a and d, parallel to C₃; C₄ between d and b.'],
'24.20':['network-20.svg','C₁ och C₂ parallellt mellan a och d; C₃ mellan d och b.','C₁ and C₂ in parallel between a and d; C₃ between d and b.'],
'24.51':['network-51.svg','8,60 och 4,80 μF i serie, följt av parallella grenar: 6,20 och 11,8 μF i serie respektive 3,50 μF.','8.60 and 4.80 μF in series, then parallel branches: 6.20 and 11.8 μF in series, and 3.50 μF.'],
'24.53':['network-53.svg','C₁ i serie med en parallellkoppling av C₂ och seriegrenen C₃ och C₄, följt av C₅.','C₁ in series with C₂ in parallel with the series branch C₃ and C₄, followed by C₅.'],
'24.60':['slab-60.svg','En metallskiva med tjocklek a ligger mellan plattor med avstånd d; det finns luft på båda sidor.','A metal slab of thickness a lies between plates separated by d, with air gaps on both sides.'],
'24.64':['half-dielectric-64.svg','Dielektrikum fyller halva plattarean och luft den andra halvan; båda fyller hela avståndet.','Dielectric fills half the plate area and air the other half; both span the full separation.'],
'24.69':['graph-69.svg','Avlästa punkter: lagrad energi i nanojoule stiger nära linjärt med inversa avståndet i cm⁻¹.','Approximate plotted points: stored energy in nanojoules rises nearly linearly with inverse separation in cm⁻¹.'],
'24.59':['network-59.svg','Stegnät med tre C₁ i varje vågrät gren och tvärgrenar C₂, C₂ och C₁; c och d är de andra tvärgrenarnas ändar.','A ladder with three C₁ capacitors on each rail and cross-branches C₂, C₂ and C₁; c and d are the ends of the second cross-branch.'],
'24.56':['network-56.svg','Två parallella seriegrenar med öppen brytare mellan mittpunkterna d och c.','Two parallel series branches with an open switch between midpoints d and c.'],
'24.52':['network-17.svg','C₁ och C₂ i serie parallellt med C₃ mellan a och d, sedan C₄ mellan d och b.','C₁ and C₂ in series in parallel with C₃ between a and d, then C₄ between d and b.'],
'24.61':['network-17.svg','C₁ och C₂ i serie parallellt med C₃ mellan a och d, sedan C₄ mellan d och b.','C₁ and C₂ in series in parallel with C₃ between a and d, then C₄ between d and b.'],
'24.55':['network-20.svg','C₁ och C₂ parallellt mellan a och d, därefter C₃ mellan d och b.','C₁ and C₂ in parallel between a and d, followed by C₃ between d and b.'],
'24.28':['network-28.svg','150 nF och 120 nF i serie mellan a och b.','150 nF and 120 nF in series between a and b.'],
'24.29':['network-29.svg','35 nF och 75 nF parallellt mellan a och b.','35 nF and 75 nF in parallel between a and b.'],
'24.21':['network-21.svg','Tre parallellgrenar: 7,5 nF, sedan en gren med 18,0, 30,0 och 10,0 nF i serie, och 6,5 nF.','Three parallel branches: 7.5 nF; 18.0, 30.0 and 10.0 nF in series; and 6.5 nF.']};
for(const e of root.EmberChapter24DraftExercises){const f=figures[e.id];if(f){e.figure=f[0];e.alt={sv:f[1],en:f[2]}}}
})(window);
