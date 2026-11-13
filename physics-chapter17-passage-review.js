(function(root){'use strict';
const context={
 sv:'Vid kryokonservering kyls biologiskt material för att bromsa skadliga kemiska reaktioner. En skyddande lösning, ett kryoskyddsmedel, används för att motverka bildning av iskristaller. För detta ämne anges smältpunkten −20 °C, smältvärmet 2,80·10⁵ J/kg, specifik värmekapacitet 4500 J/(kg·K) i vätska och 2000 J/(kg·K) i fast form samt värmeledningsförmåga 1,2 W/(m·K) i vätska och 2,5 W/(m·K) i fast form. ',
 en:'In cryopreservation, biological material is cooled to slow damaging chemical reactions. A protective solution called a cryoprotectant helps prevent ice-crystal formation. For this substance the stated melting point is −20 °C, latent heat of fusion 2.80×10⁵ J/kg, specific heat 4500 J/(kg·K) as a liquid and 2000 J/(kg·K) as a solid, and thermal conductivity 1.2 W/(m·K) as a liquid and 2.5 W/(m·K) as a solid. '
};
const feedback={
 '17.116':{sv:'B är närmast det beräknade värdet. A och C underskattar respektive överskattar summan av kylning och frysning; D överskattar den ännu mer.',en:'B is closest to the calculated value. A and C respectively underestimate and overestimate the sum of cooling and freezing; D overestimates it still more.'},
 '17.117':{sv:'A är det förväntade svaret i samma kylmodell. B och C bortser från den lägre energin som måste föras bort; D ger ingen annan jämförelse när densiteten hålls oförändrad.',en:'A is expected in the same cooling model. B and C ignore the lower energy that must be removed; D does not change the comparison when density is held fixed.'},
 '17.118':{sv:'D är rätt. A och B skulle öka värmeflödet ytterligare, och C kompenserar bara för halva areaökningen; fyra gånger tjockleken kompenserar för fyra gånger arean.',en:'D is correct. A and B would increase the heat flow still further, and C offsets only half the area increase; four times the thickness offsets four times the area.'},
 '17.119':{sv:'A är rätt. B har fel tecken; C bortser från den extra energin från rummet; D följer inte eftersom värmeläckan påverkar energibalansen även om fryspunkten är oförändrad.',en:'A is correct. B has the wrong sign; C ignores the extra energy from the room; D does not follow because heat leakage affects the energy balance even if freezing point is unchanged.'}
};
for(const e of root.EmberChapter17DraftExercises){const f=feedback[e.id];if(!f)continue;for(const lang of ['sv','en']){e[lang].prompt=context[lang]+e[lang].prompt;e[lang].steps.push(f[lang]);}}
})(window);
