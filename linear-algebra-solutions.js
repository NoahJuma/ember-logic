(window.EmberMathI18n?.register || ((_id,build)=>build()))("solutions", () => {
  'use strict';
  const tx=(en,sv)=>window.EmberMathI18n?.t(en,sv)??en;
  const M = window.EmberAlgebra;
  const C = window.EmberChapter;
  const {solutions} = window.EmberTextbook;
  let set;
  function add(number,title,answer,...steps) {
    const id = String(number);
    const exercise = {number:id,title,answer,steps,prompt:tx('Use exercise ',"Använd uppgift ")+id+tx(' in your copy of the textbook. Write your own answer or open the worked solution directly.'," i din lärobok. Skriv ditt eget svar eller öppna lösningen direkt.")};
    const rows = solutions[set];
    const previous = rows.findIndex(row=>row.number===id);
    if (previous<0) rows.push(exercise);
    else rows[previous]=exercise;
  }
  function linear(number,a,title=tx('Solve the linear system',"Lös det linjära systemet"),intro=[]) {
    const r=M.solve(a);
    add(number,title,C.solutionText(r),...intro,...r.steps);
  }
  function partSystems(number,parts) {
    const cases=parts.map(a=>M.solve(a));
    add(number,tx('Read pivots and find the solutions',"Läs pivoterna och bestäm lösningarna"),cases.map((r,i)=>String.fromCharCode(97+i)+': '+C.solutionText(r)).join('\n'),
      ...cases.flatMap((r,i)=>{
        const pivots=parts[i].flatMap((row,j)=>{
          const first=row.findIndex(x=>!M.zero(x));
          return first<0?[]:[tx('row ',"rad ")+(j+1)+tx(', column ',", kolumn ")+(first+1)];
        });
        return [tx('Part ',"Del ")+String.fromCharCode(97+i)+tx(': the first nonzero entry of each nonzero row gives ',": det första elementet som inte är noll på varje icke-nollrad ger ")+pivots.join('; ')+tx('. The final column is the right-hand side.',". Den sista kolumnen är högerledet."),...r.steps];
      }));
  }
  function gaussian(number,a,writeEquations=false) {
    const count=a[0].length-1;
    const {rows,pivots,steps}=M.reduce(a,count,false);
    const answer=M.solve(a);
    const named=['x₁','x₂','x₃','x₄','x₅'];
    if (writeEquations) steps.unshift(tx('Write one equation per row, using the last column as the right side:\n',"Skriv en ekvation per rad och använd den sista kolumnen som högerled:\n")+a.map(row=>describe([row.slice(0,count)],named)+' = '+M.format(row[count])).join('\n'));
    if (answer.kind==='none') {
      const row=rows.find(r=>r.slice(0,count).every(M.zero)&&!M.zero(r[count]));
      steps.push(tx('The last nonzero row says 0 = ',"Den sista raden som inte är en nollrad säger 0 = ")+M.format(row[count])+tx(', which is impossible.',", vilket är omöjligt."));
    } else {
      const free=named.slice(0,count).filter((_,i)=>!pivots.includes(i));
      steps.push(free.length?tx('Give ',"Ge ")+free.join(', ')+tx(' independent parameter values. Then work upward to find the pivot variables.'," oberoende parametervärden. Arbeta sedan uppåt för att bestämma pivotvariablerna."):tx('Every variable has a pivot. Work upward from the last equation.',"Varje variabel har en pivot. Arbeta uppåt från den sista ekvationen."));
      pivots.map((j,i)=>[j,rows[i]]).reverse().forEach(([j,row])=>{
        const rest=row.slice(j+1,count).flatMap((n,k)=>M.zero(n)?[]:['('+M.format(n)+')'+named[j+k+1]]);
        const rhs=M.format(row[count]);
        steps.push(tx('The row gives ',"Raden ger ")+named[j]+' = '+rhs+(rest.length?' − ('+rest.join(' + ')+')':'')+tx('. Substitute the values or expressions already found below it.',". Sätt in de värden eller uttryck som redan har bestämts nedanför."));
        if (!free.length) steps.push(tx('Substitution: ',"Insättning: ")+named[j]+' = '+rhs+row.slice(j+1,count).flatMap((n,k)=>M.zero(n)?[]:[' − ('+M.format(n)+' × '+M.format(answer.point[j+k+1])+')']).join('')+' = '+M.format(answer.point[j])+'.');
      });
      steps.push(...answer.steps.filter(step=>/^(There |Row \d+:|Set all parameters|Check the family:|Check original equation|Det |Rad \d+:|Sätt alla parametrar|Kontrollera lösningsfamiljen:|Kontrollera ursprunglig ekvation)/.test(step)));
    }
    add(number,tx('Gaussian elimination and back-substitution',"Gausselimination och bakåtsubstitution"),C.solutionText(answer),...steps);
  }
  function multi(number,a,rhs,title=tx('Solve all right-hand sides together',"Lös alla högerled tillsammans")) {
    const width=a[0].length;
    const aug=a.map((row,i)=>[...row,...rhs.map(b=>b[i])]);
    const r=M.reduce(aug,width);
    const cases=rhs.map((b,i)=>{
      const single=r.rows.map(row=>[...row.slice(0,width),row[width+i]]);
      return M.solve(single);
    });
    add(number,title,cases.map((s,i)=>tx('Column ',"Kolumn ")+(i+1)+': '+C.solutionText(s)).join('\n'),
      tx('Keep the coefficients on the left. Append every right-hand side as a separate column and perform the same operation on each complete row.',"Behåll koefficienterna till vänster. Lägg till varje högerled som en egen kolumn och gör samma operation på varje fullständig rad."),
      ...r.steps,tx('Read each right-hand column separately. A zero coefficient row with a nonzero number means no solution for that column. Otherwise use the pivot rows to read the coordinates or their formulas.',"Läs varje högerledskolumn för sig. En nollrad bland koefficienterna med ett tal som inte är noll i högerledet betyder att den kolumnen saknar lösning. Använd annars pivotraderna för att läsa av koordinaterna eller deras formler."));
  }
  function byInverse(number,a,b) {
    const r=M.inverse(a), out=M.apply(r.value,b);
    add(number,tx('Solve by using the inverse',"Lös med hjälp av inversen"),M.vector(out),...r.steps,
      tx('Multiply Ax = b on the left by A⁻¹. Because A⁻¹A = I, the result is x = A⁻¹b.',"Multiplicera Ax = b från vänster med A⁻¹. Eftersom A⁻¹A = I blir resultatet x = A⁻¹b."),
      ...r.value.map((row,i)=>tx('Coordinate ',"Koordinat ")+(i+1)+': '+row.map((n,j)=>'('+M.format(n)+' × '+M.format(b[j])+')').join(' + ')+' = '+M.format(out[i])+'.'));
  }

  set='1.2';
  add(1,tx('Check the staircase of pivots',"Kontrollera pivoternas trappmönster"),tx('a both · b both · c both · d both · e both · f both · g echelon only',"a båda · b båda · c båda · d båda · e båda · f båda · g endast trappform"),
    tx('Find the first nonzero number in each row. In this book, each leading number must be 1. As you move down, the leading 1 must move strictly to the right, and zero rows must be last.',"Hitta det första talet som inte är noll på varje rad. I denna bok måste varje ledande tal vara 1. När du går nedåt måste den ledande 1:an flyttas strikt åt höger, och nollrader ska ligga sist."),
    tx('For the reduced form, each leading 1 must also be the only nonzero entry in its column. In a–e, all pivot columns pass both tests. In f there are no nonzero rows, so there are no violations.',"För reducerad form måste varje ledande 1:a också vara det enda elementet som inte är noll i sin kolumn. I a–e uppfyller alla pivotkolumner båda kraven. I f finns inga icke-nollrader, så inga regler bryts."),
    tx('In g, the pivot in column 2 has −7 above it. This still gives an echelon staircase, but it fails the reduced test.',"I g har pivoten i kolumn 2 värdet −7 ovanför sig. Det ger fortfarande trappform men uppfyller inte kravet för reducerad form."));
  add(2,tx('Check echelon and reduced form',"Kontrollera trappform och reducerad form"),tx('a echelon only · b neither · c both · d echelon only · e neither · f neither · g both',"a endast trappform · b ingen · c båda · d endast trappform · e ingen · f ingen · g båda"),
    tx('a and d: the second pivot has a nonzero number above it. c and g: the staircase works and the pivot columns are cleared.',"a och d: den andra pivoten har ett tal som inte är noll ovanför sig. c och g: trappmönstret fungerar och pivotkolumnerna är rensade."),
    tx('b: two successive nonzero rows start in the same column and the last leading entry is 2. e: a zero row sits above a nonzero row. f: rows 1 and 2 both start in column 1.',"b: två på varandra följande icke-nollrader börjar i samma kolumn och det sista ledande elementet är 2. e: en nollrad ligger ovanför en icke-nollrad. f: raderna 1 och 2 börjar båda i kolumn 1."));
  partSystems(3,[[[1,-3,4,7],[0,1,2,2],[0,0,1,5]],[[1,0,8,-5,6],[0,1,4,-9,3],[0,0,1,1,2]],[[1,7,-2,0,-8,-3],[0,0,1,1,6,5],[0,0,0,1,3,9],[0,0,0,0,0,0]],[[1,-3,7,1],[0,1,4,0],[0,0,0,1]]]);
  partSystems(4,[[[1,0,0,-3],[0,1,0,0],[0,0,1,7]],[[1,0,0,-7,8],[0,1,0,3,2],[0,0,1,1,-5]],[[1,-6,0,0,3,-2],[0,0,1,0,4,7],[0,0,0,1,5,8],[0,0,0,0,0,0]],[[1,-3,0,0],[0,0,1,0],[0,0,0,1]]]);
  [
    [[1,1,2,8],[-1,-2,3,1],[3,-7,4,10]],
    [[2,2,2,0],[-2,5,2,1],[8,1,4,-1]],
    [[1,-1,2,-1,-1],[2,1,-2,-2,-2],[-1,2,-4,1,1],[3,0,0,-3,-3]],
    [[0,-2,3,1],[3,6,-3,-2],[6,6,3,5]]
  ].forEach((a,i)=>gaussian(i+5,a));
  add(14,tx('Start with the last equation',"Börja med den sista ekvationen"),tx('Only (0, 0, 0).',"Endast (0, 0, 0)."),tx('The last row says 4x₃ = 0, so x₃ = 0.',"Den sista raden säger 4x₃ = 0, alltså x₃ = 0."),tx('Put x₃ = 0 in the middle row to get x₂ = 0.',"Sätt x₃ = 0 i den mittersta raden och få x₂ = 0."),tx('Put both zeros in the first row to get x₁ = 0.',"Sätt in båda nollorna i den första raden och få x₁ = 0."));
  [
    [[2,1,3,0],[1,2,0,0],[0,1,1,0]],
    [[2,-1,-3,0],[-1,2,-3,0],[1,1,4,0]],
    [[3,1,1,1,0],[5,-1,1,-1,0]],
    [[0,1,3,-2,0],[2,1,-4,3,0],[2,3,2,-1,0],[-4,-3,5,-4,0]],
    [[0,2,2,4,0],[1,0,-1,-3,0],[2,3,1,1,0],[-2,1,3,-2,0]],
    [[1,3,0,1,0],[1,4,2,0,0],[0,-2,-2,-1,0],[2,-4,1,1,0],[1,-2,-1,1,0]],
    [[2,-1,3,4,9],[1,0,-2,7,11],[3,-3,1,5,8],[2,1,4,4,10]],
    [[0,0,1,1,1,0],[-1,-1,2,-3,1,0],[1,1,-2,0,-1,0],[2,2,-1,0,1,0]]
  ].forEach((a,i)=>linear(i+15,a,tx('Solve by row reduction',"Lös med radreduktion"),[tx('Read coordinates in the order used in the exercise.',"Läs koordinaterna i den ordning som används i uppgiften.")]));
  add(24,tx('Interpret the unspecified entries',"Tolka de ospecificerade elementen"),tx('a unique · b inconclusive · c inconsistent · d inconclusive',"a entydig · b går inte att avgöra · c olösbart · d går inte att avgöra"),
    tx('a: the three variable columns all have pivots. There is a unique solution for any right sides.',"a: alla tre variabelkolumner har pivoter. Det finns en entydig lösning för alla högerled."),
    tx('b: remove the first-column entries below row 1, then clear the second column below row 2. The last pivot may or may not vanish. For all asterisks zero there is a unique solution. To make the system have a free variable, take row 1 second entry = 1, row 2 first entry = 1, and all other asterisks zero. The first two coefficient rows now share their first two entries, and the system has a free variable.',"b: eliminera elementen i första kolumnen under rad 1 och rensa sedan andra kolumnen under rad 2. Den sista pivoten kan försvinna eller finnas kvar. Om alla asterisker är noll finns en entydig lösning. För att skapa en fri variabel, välj andra elementet på rad 1 = 1, första elementet på rad 2 = 1 och alla andra asterisker noll. De första två koefficientraderna har nu samma två första element och systemet har en fri variabel."),
    tx('c: subtract the first row from the second. It says 0 = 1.',"c: subtrahera den första raden från den andra. Då får vi 0 = 1."),
    tx('d: the last two rows say x₁ = 1. If the first row has other nonzero coefficients, we can satisfy it and still have a free variable. If those coefficients are zero and its right side differs from 1, it is inconsistent.',"d: de sista två raderna säger x₁ = 1. Om den första raden har andra koefficienter som inte är noll kan vi uppfylla den och ändå ha en fri variabel. Om dessa koefficienter är noll och högerledet skiljer sig från 1 är systemet olösbart."));
  add(25,tx('Find where the last pivot disappears',"Bestäm när den sista pivoten försvinner"),tx('Unique if a ≠ ±4. Infinite at a = 4. None at a = −4.',"Entydig om a ≠ ±4. Oändligt många vid a = 4. Ingen vid a = −4."),
    tx('Replace row 3 with row 3 minus rows 1 and 2. This leaves (a² − 16)z = a − 4.',"Ersätt rad 3 med rad 3 minus raderna 1 och 2. Då återstår (a² − 16)z = a − 4."),
    tx('The first two equations already determine x and y once z is known, since their two-by-two coefficient determinant is −7.',"De första två ekvationerna bestämmer redan x och y när z är känt, eftersom determinanten för deras två gånger två-koefficientmatris är −7."),
    tx('For a ≠ ±4, divide to find z. At 4, the last row is 0 = 0 and z is free. At −4, the last row is 0 = −8.',"För a ≠ ±4, dividera för att bestämma z. Vid 4 är den sista raden 0 = 0 och z är fri. Vid −4 är den sista raden 0 = −8."));
  add(26,tx('Compare the last two equations',"Jämför de sista två ekvationerna"),tx('Unique if a ≠ ±√2. None if a = ±√2. No infinite case.',"Entydig om a ≠ ±√2. Ingen om a = ±√2. Inget fall med oändligt många."),
    tx('Subtract the first row from the third to get (2 − a²)z = a − 2. The first two rows can determine x and y for any z since their coefficient determinant is −6.',"Subtrahera den första raden från den tredje och få (2 − a²)z = a − 2. De första två raderna kan bestämma x och y för varje z eftersom deras koefficientdeterminant är −6."),
    tx('For a ≠ ±√2, divide to find z. At either exceptional value, the left side is zero but a − 2 is nonzero.',"För a ≠ ±√2, dividera för att bestämma z. Vid båda undantagsvärdena är vänsterledet noll men a − 2 är inte noll."));
  add(27,tx('Match a dependent row',"Anpassa en beroende rad"),'c = a − b.',tx('The third left side is the first minus the second. Their right sides must follow the same rule.',"Det tredje vänsterledet är det första minus det andra. Högerleden måste följa samma regel."),tx('The first two rows are independent, so we can solve them for any a and b. If c = a − b, the third row adds no new requirement.',"De första två raderna är oberoende, så vi kan lösa dem för alla a och b. Om c = a − b tillför den tredje raden inget nytt krav."));
  add(28,tx('Find the row dependency',"Bestäm radberoendet"),'c = a − 2b.',tx('Take the first equation minus twice the second. On the left this gives 3x + 7y − z, exactly row 3.',"Ta den första ekvationen minus två gånger den andra. Till vänster får vi 3x + 7y − z, exakt rad 3."),tx('The first two rows are independent. The third equation agrees with them exactly when its right side equals a − 2b.',"De första två raderna är oberoende. Den tredje ekvationen stämmer med dem precis när dess högerled är a − 2b."));
  add(29,tx('Eliminate y',"Eliminera y"),'x = (6a − b)/9, y = (2b − 3a)/9.',tx('Multiply the first equation by 6 and subtract the second. This leaves 9x = 6a − b.',"Multiplicera den första ekvationen med 6 och subtrahera den andra. Då återstår 9x = 6a − b."),tx('Use y = a − 2x and simplify: y = (9a − 12a + 2b)/9.',"Använd y = a − 2x och förenkla: y = (9a − 12a + 2b)/9."));
  add(30,tx('Use the equations with two terms first',"Använd ekvationerna med två termer först"),'x₁ = a − c/3, x₂ = a − b/2, x₃ = b/2 + c/3 − a.',
    tx('Divide row 2 by 2 and row 3 by 3. They give x₁ + x₃ = b/2 and x₂ + x₃ = c/3.',"Dividera rad 2 med 2 och rad 3 med 3. De ger x₁ + x₃ = b/2 och x₂ + x₃ = c/3."),
    tx('Subtract each from row 1 to find the remaining coordinate. Then use x₁ + x₃ = b/2 to find x₃.',"Subtrahera var och en från rad 1 för att hitta den återstående koordinaten. Använd sedan x₁ + x₃ = b/2 för att bestämma x₃."));
  add(31,tx('Find two valid staircases',"Bestäm två giltiga trappformer"),tx('[1 3] [0 1] and [1 0] [0 1].',"[1 3] [0 1] och [1 0] [0 1]."),tx('Subtract twice row 1 from row 2 to get [0 1]. The result is already echelon.',"Subtrahera två gånger rad 1 från rad 2 och få [0 1]. Resultatet är redan i trappform."),tx('Subtract three copies of row 2 from row 1. The identity matrix is a second echelon form.',"Subtrahera tre gånger rad 2 från rad 1. Identitetsmatrisen är en andra trappform."));
  add(32,tx('Keep the intermediate entries integral',"Behåll heltal i mellanleden"),tx('The reduced form is I₃.',"Den reducerade formen är I₃."),
    tx('Double R₃, then subtract 3R₁. R₃ becomes [0 5 1]. Add 2R₂ to it to get [0 1 −57].',"Dubbla R₃ och subtrahera sedan 3R₁. R₃ blir [0 5 1]. Addera 2R₂ till den och få [0 1 −57]."),
    tx('Add 2R₃ to R₂ to get [0 0 −143]. Swap rows 2 and 3, then divide the last row by −143.',"Addera 2R₃ till R₂ och få [0 0 −143]. Byt plats på raderna 2 och 3 och dividera sedan den sista raden med −143."),
    tx('Add 57R₃ to R₂. Subtract 3R₃ and then R₂ from R₁ to get [2 0 0]. Halve the first row.',"Addera 57R₃ till R₂. Subtrahera 3R₃ och sedan R₂ från R₁ för att få [2 0 0]. Halvera den första raden."));
  function trig(number,a,answers,explanation) {
    const r=M.solve(a);
    add(number,tx('Solve for the trig values first',"Bestäm de trigonometriska värdena först"),answers,
      tx('Name x = sin α, y = cos β, z = tan γ. Now the equations are linear in x, y and z.',"Sätt x = sin α, y = cos β, z = tan γ. Nu är ekvationerna linjära i x, y och z."),...r.steps,...explanation);
  }
  trig(33,[[1,2,3,0],[2,5,3,0],[-1,-5,5,0]],tx('18 angle triples.',"18 vinkeltripplar."),[
    tx('Sine is zero at α = 0, π, 2π. Cosine is zero at β = π/2, 3π/2. Tangent is zero at γ = 0, π, 2π.',"Sinus är noll vid α = 0, π, 2π. Cosinus är noll vid β = π/2, 3π/2. Tangens är noll vid γ = 0, π, 2π."),
    tx('Every combination works because the three angles are independent once the trig values are fixed. Multiply 3 × 2 × 3 = 18.',"Varje kombination fungerar eftersom de tre vinklarna är oberoende när de trigonometriska värdena är bestämda. Multiplicera 3 × 2 × 3 = 18.")]);
  trig(34,[[2,-1,3,3],[4,2,-2,2],[6,-3,1,9]],'(α, β, γ) = (π/2, π, 0).',[
    tx('Subtract three copies of the first equation from the third to get −8 tan γ = 0. Therefore γ = 0 on [0, π).',"Subtrahera tre gånger den första ekvationen från den tredje och få −8 tan γ = 0. Därför är γ = 0 på [0, π)."),
    tx('The first two equations now give 2 sin α − cos β = 3 and 2 sin α + cos β = 1. Add to get sin α = 1. Then cos β = −1.',"De första två ekvationerna ger nu 2 sin α − cos β = 3 och 2 sin α + cos β = 1. Addera och få sin α = 1. Då är cos β = −1."),
    tx('On [0, 2π], sin α = 1 at α = π/2 and cos β = −1 at β = π. The only triple is (π/2, π, 0).',"På [0, 2π] är sin α = 1 vid α = π/2 och cos β = −1 vid β = π. Den enda trippeln är (π/2, π, 0).")]);
  linear(35,[[1,1,1,6],[1,-1,2,2],[2,1,-1,3]],tx('Find the squares first',"Bestäm kvadraterna först"),[tx('Use X = x², Y = y² and Z = z².',"Använd X = x², Y = y² och Z = z².")]);
  {
    const p=solutions[set].at(-1);
    p.answer=tx('x = ±1, y = ±√3, z = ±√2. The signs are independent.',"x = ±1, y = ±√3, z = ±√2. Tecknen väljs oberoende.");
    p.steps.push(tx('The squares are 1, 3 and 2. A positive square has two real roots. Take either sign for each coordinate to get eight triples.',"Kvadraterna är 1, 3 och 2. En positiv kvadrat har två reella rötter. Välj valfritt tecken för varje koordinat för att få åtta tripplar."));
  }
  linear(36,[[1/2,2/3,-4/8,1],[1,1,1,0],[-1,9,10,5]],tx('Clear the fractional coefficients',"Eliminera bråkkoefficienterna"),[tx('Keep the variable order x, y, z.',"Behåll variabelordningen x, y, z.")]);
  linear(37,[[0,0,0,1,10],[1,1,1,1,7],[27,9,3,1,-11],[64,16,4,1,-14]],tx('Find the four cubic coefficients',"Bestäm de fyra koefficienterna i tredjegradspolynomet"),[tx('Use each point (x,y) to write one row [x³, x², x, 1 | y]. The unknowns in order are a, b, c and d.',"Använd varje punkt (x,y) för att skriva en rad [x³, x², x, 1 | y]. De obekanta i ordning är a, b, c och d.")]);
  add(38,tx('Find the circle from its points',"Bestäm cirkeln från dess punkter"),tx('With a = 1, (a,b,c,d) = (1, −2, −4, −29). Any nonzero common multiple gives the same circle.',"Med a = 1 blir (a,b,c,d) = (1, −2, −4, −29). Varje gemensam multipel som inte är noll ger samma cirkel."),
    tx('Divide by a to set it to 1. Using (−2,7), (−4,5), (4,−3) gives −2b + 7c + d = −53, −4b + 5c + d = −41, and 4b − 3c + d = −25.',"Dividera med a för att göra det till 1. Punkterna (−2,7), (−4,5), (4,−3) ger −2b + 7c + d = −53, −4b + 5c + d = −41 och 4b − 3c + d = −25."),
    tx('Subtract the second equation from the first to get b + c = −6. Subtract the second from the third to get b − c = 2. Add these to get b = −2, then c = −4.',"Subtrahera den andra ekvationen från den första och få b + c = −6. Subtrahera den andra från den tredje och få b − c = 2. Addera dessa och få b = −2, sedan c = −4."),
    tx('Use the second equation: 8 − 20 + d = −41, so d = −29.',"Använd den andra ekvationen: 8 − 20 + d = −41, alltså d = −29."));
  add(39,tx('Reuse the same coefficient matrix',"Återanvänd samma koefficientmatris"),tx('The new system has exactly one solution.',"Det nya systemet har exakt en lösning."),
    tx('If the homogeneous system has only the zero solution, all three variable columns have pivots.',"Om det homogena systemet bara har nollösningen har alla tre variabelkolumner pivoter."),
    tx('Changing the right sides leaves those pivots intact. Three pivots in three rows also leave no room for a contradictory row.',"Ändrade högerled påverkar inte dessa pivoter. Tre pivoter på tre rader lämnar inte heller plats för en motsägelsefull rad."));
  add(40,tx('Count pivot positions',"Räkna pivotpositioner"),'a: 3. b: 5. c: 2.',
    tx('a: each pivot takes a different row, and there are only three rows.',"a: varje pivot kräver en egen rad och det finns bara tre rader."),
    tx('b: the sixth column is the right side, leaving five unknowns. If all rows are zero, every variable is free.',"b: den sjätte kolumnen är högerledet, så fem obekanta återstår. Om alla rader är noll är varje variabel fri."),
    tx('c: three columns give at most three pivots. Of five rows, at least two must be zero in echelon form.',"c: tre kolumner ger högst tre pivoter. Av fem rader måste minst två vara nollrader i trappform."));
  add(41,tx('Describe all reduced forms by their pivot choices',"Beskriv alla reducerade former genom deras pivotval"),tx('Choose any subset of the 3 or 4 columns to be pivot columns. This gives 8 or 16 pivot patterns respectively.',"Välj valfri delmängd av de 3 eller 4 kolumnerna som pivotkolumner. Detta ger 8 respektive 16 pivotmönster."),
    tx('Order the chosen columns from left to right and place one leading 1 per row from the top downward.',"Ordna de valda kolumnerna från vänster till höger och placera en ledande 1:a per rad, uppifrån och ned."),
    tx('Put zero above and below each pivot, to the left of each row’s leading 1, and in every row below the last pivot.',"Sätt noll ovanför och nedanför varje pivot, till vänster om varje rads ledande 1:a och på varje rad under den sista pivoten."),
    tx('Entries in nonpivot columns to the right of each row’s pivot can be arbitrary. This rule gives every reduced row echelon form, including the all-zero matrix when no columns are chosen.',"Element i kolumner utan pivot till höger om radens pivot kan vara godtyckliga. Regeln ger varje reducerad trappform, inklusive nollmatrisen när inga kolumner väljs."));
  add(42,tx('Picture three lines through the origin',"Föreställ dig tre linjer genom origo"),tx('Only the zero solution if some two lines differ. Nonzero solutions if all three lines coincide.',"Endast nollösningen om något par linjer skiljer sig. Lösningar som inte är noll om alla tre linjer sammanfaller."),
    tx('Each homogeneous equation describes a line containing (0,0). Two distinct lines through that point have no other point in common.',"Varje homogen ekvation beskriver en linje genom (0,0). Två olika linjer genom den punkten har ingen annan gemensam punkt."),
    tx('If the three lines coincide, every point on that line satisfies all three equations.',"Om de tre linjerna sammanfaller uppfyller varje punkt på linjen alla tre ekvationerna."));
  add(43,tx('Prove that a 2 × 2 matrix has two pivots',"Bevisa att en 2 × 2-matris har två pivoter"),tx('The reduced coefficient matrix is I₂. Every right side gives one solution.',"Den reducerade koefficientmatrisen är I₂. Varje högerled ger en lösning."),
    tx('If a ≠ 0, subtract (c/a) times row 1 from row 2. The second pivot is d − bc/a = (ad − bc)/a, which is nonzero.',"Om a ≠ 0, subtrahera (c/a) gånger rad 1 från rad 2. Den andra pivoten är d − bc/a = (ad − bc)/a, som inte är noll."),
    tx('If a = 0, then b and c are both nonzero because −bc ≠ 0. Swap the two rows to get a nonzero first pivot and keep b as the second.',"Om a = 0 är både b och c skilda från noll eftersom −bc ≠ 0. Byt plats på de två raderna för att få en första pivot som inte är noll och behåll b som den andra."),
    tx('Scale both pivots to 1 and clear above the second. Apply the same operations to the right sides k,l. The left side is now the identity, so each variable is fixed.',"Skala båda pivoterna till 1 och rensa ovanför den andra. Gör samma operationer på högerleden k,l. Vänsterdelen är nu identitetsmatrisen, så varje variabel är bestämd."));
  add('TF',tx('True or false',"Sant eller falskt"),'a T · b F · c F · d T · e T · f F · g T · h F · i F',
    tx('a: reduced form has all the echelon rules plus another. b: swapping a pivot row with a zero row can destroy the staircase. c: Exercise 31 gives two echelon forms.',"a: reducerad form har alla trappformsregler plus ytterligare ett krav. b: att byta plats på en pivotrad och en nollrad kan förstöra trappmönstret. c: uppgift 31 ger två trappformer."),
    tx('d: each of the r pivots fixes one variable in terms of the others. e: every next leading 1 must be farther right.',"d: var och en av de r pivoterna bestämmer en variabel uttryckt med de andra. e: varje ny ledande 1:a måste ligga längre åt höger."),
    tx('f: the echelon matrix with rows [1 2], [0 1] has a nonzero 2 above a pivot. g: n variable pivots leave no free variable, so only zero solves the homogeneous system.',"f: trappmatrisen med raderna [1 2], [0 1] har ett element 2 ovanför en pivot. g: n variabelpivoter lämnar ingen fri variabel, så bara noll löser det homogena systemet."),
    tx('h: x = 1 together with 0 = 0 has one solution. i: the single equation 0x + 0y = 1 has two unknowns but is impossible.',"h: x = 1 tillsammans med 0 = 0 har en lösning. i: den enda ekvationen 0x + 0y = 1 har två obekanta men är omöjlig."));
  linear('T1',[[6,1,0,4,-3],[-9,2,3,-8,1],[7,0,-4,5,2]],tx('Reduce the augmented matrix',"Reducera den utökade matrisen"));
  linear('T2',[[1,0,1,1,3],[0,1,3,1,4],[-1,0,4,0,-6],[0,-1,2,-2,0]],tx('Find the partial fraction coefficients',"Bestäm partialbråkskoefficienterna"),[
    tx('Multiply through by the common denominator. The right side becomes (Ax+B)(x²−1) + C(x+1)(x²+2x+2) + D(x−1)(x²+2x+2).',"Multiplicera med den gemensamma nämnaren. Högerledet blir (Ax+B)(x²−1) + C(x+1)(x²+2x+2) + D(x−1)(x²+2x+2)."),
    tx('Expand and match the coefficients of x³, x², x and 1 in order. Those four comparisons are the rows below. The unknowns are A, B, C and D. The identity holds wherever the original denominators are nonzero.',"Utveckla och jämför koefficienterna för x³, x², x och 1 i ordning. De fyra jämförelserna är raderna nedan. De obekanta är A, B, C och D. Identiteten gäller där de ursprungliga nämnarna inte är noll.")]);

  set='1.6';
  byInverse(5,[[1,1,1],[1,1,-4],[-4,1,1]],[5,10,0]);
  byInverse(6,[[0,-1,-2,-3],[1,1,4,4],[1,3,7,9],[-1,-2,-4,-6]],[0,7,4,6]);
  function symbolicInverse(number,a) {
    const r=M.inverse(a);
    const forms=r.value.map((row,i)=>'x'+(i+1)+' = '+row.map((v,j)=>'('+M.format(v)+')b'+(j+1)).join(' + '));
    add(number,tx('Solve for any right-hand side',"Lös för ett godtyckligt högerled"),forms.join('\n'),...r.steps,
      tx('Multiply Ax = b by A⁻¹ on the left to isolate x. Multiply each inverse row by the column of b values.',"Multiplicera Ax = b från vänster med A⁻¹ för att få x ensamt. Multiplicera varje rad i inversen med kolumnen av b-värden."),
      ...forms);
  }
  symbolicInverse(7,[[3,5],[1,2]]);
  symbolicInverse(8,[[1,2,3],[2,5,5],[3,5,8]]);
  multi(9,[[1,-5],[3,2]],[[1,4],[-2,5]]);
  multi(10,[[-1,4,1],[1,9,-2],[6,4,-8]],[[0,1,0],[-3,4,-5]]);
  multi(11,[[4,-7],[1,2]],[[0,1],[-4,6],[-1,3],[-5,1]]);
  multi(12,[[1,3,5],[-1,-2,0],[2,5,4]],[[1,0,-1],[0,1,1],[-1,-1,0]]);
  add(13,tx('Check for independent equations',"Kontrollera om ekvationerna är oberoende"),tx('All b₁ and b₂ are allowed.',"Alla b₁ och b₂ är tillåtna."),tx('Add twice row 1 to row 2. Its left side becomes 7x₂ and its right side is b₂ + 2b₁.',"Addera två gånger rad 1 till rad 2. Vänsterledet blir 7x₂ och högerledet är b₂ + 2b₁."),tx('Divide by 7 and substitute into row 1. Both steps work for any right sides.',"Dividera med 7 och sätt in i rad 1. Båda stegen fungerar för godtyckliga högerled."));
  add(14,tx('Check a multiple of the same equation',"Kontrollera en multipel av samma ekvation"),'b₁ = 2b₂.',tx('The first left side is twice the second, so subtract twice row 2 from row 1.',"Det första vänsterledet är två gånger det andra, så subtrahera två gånger rad 2 från rad 1."),tx('The new row says 0 = b₁ − 2b₂. When that is true, the second equation can be satisfied by choosing one variable and solving for the other.',"Den nya raden säger 0 = b₁ − 2b₂. När detta gäller kan den andra ekvationen uppfyllas genom att välja en variabel och lösa ut den andra."));
  add(15,tx('Check the third equation',"Kontrollera den tredje ekvationen"),'b₃ = b₁ − b₂.',tx('Subtract row 2 from row 1. The result on the left is −3x₁ + 3x₂ − 3x₃, the third left side.',"Subtrahera rad 2 från rad 1. Resultatet till vänster är −3x₁ + 3x₂ − 3x₃, det tredje vänsterledet."),tx('Rows 1 and 2 are independent. The last row agrees with them exactly when its right side is b₁ − b₂.',"Raderna 1 och 2 är oberoende. Den sista raden stämmer med dem precis när högerledet är b₁ − b₂."));
  add(16,tx('Check the three pivots',"Kontrollera de tre pivoterna"),tx('All values of b₁, b₂ and b₃ are allowed.',"Alla värden på b₁, b₂ och b₃ är tillåtna."),
    tx('Subtract row 2 from row 3 to get (0,2,2) on the left. Add 4 times row 1 to row 2 to get (0,−3,−2).',"Subtrahera rad 2 från rad 3 och få (0,2,2) till vänster. Addera 4 gånger rad 1 till rad 2 och få (0,−3,−2)."),
    tx('Twice the new row 2 plus three times the new row 3 has left side (0,0,2). Thus there is a pivot in each variable column.',"Två gånger den nya rad 2 plus tre gånger den nya rad 3 har vänsterledet (0,0,2). Alltså finns en pivot i varje variabelkolumn."),
    tx('The pivots let us solve from the bottom up for any b₁, b₂ and b₃.',"Pivoterna låter oss lösa nedifrån och upp för godtyckliga b₁, b₂ och b₃."));
  add(17,tx('Match the two dependent equations',"Anpassa de två beroende ekvationerna"),tx('b₃ = b₂ − b₁ and b₄ = 2b₁ − b₂.',"b₃ = b₂ − b₁ och b₄ = 2b₁ − b₂."),
    tx('The third left side equals row 2 minus row 1. The fourth left side equals twice row 1 minus row 2.',"Det tredje vänsterledet är rad 2 minus rad 1. Det fjärde vänsterledet är två gånger rad 1 minus rad 2."),
    tx('The right sides must satisfy the same relations. Rows 1 and 2 are independent, so any b₁ and b₂ work once the other two match.',"Högerleden måste uppfylla samma samband. Raderna 1 och 2 är oberoende, så alla b₁ och b₂ fungerar när de andra två stämmer."));
  {
    const a=[[2,1,2],[2,2,-2],[3,1,1]], cases=[1,4].map(k=>M.solve(a.map((row,i)=>[...row.map((n,j)=>n-(i===j?k:0)),0])));
    add(18,tx('Move the vector to the left',"Flytta vektorn till vänster"),cases.map((r,i)=>tx('Part ',"Del ")+(i===0?'a':'b')+': '+C.solutionText(r)).join('\n'),
      tx('Because Ix = x, subtracting kx from Ax gives (A − kI)x = 0. This subtracts k from each diagonal entry and leaves other entries unchanged.',"Eftersom Ix = x ger subtraktion av kx från Ax uttrycket (A − kI)x = 0. Detta subtraherar k från varje diagonalelement och lämnar andra element oförändrade."),
      tx('Part a uses k = 1.',"Del a använder k = 1."),...cases[0].steps,tx('Part b uses k = 4.',"Del b använder k = 4."),...cases[1].steps);
  }
  function matrixEquation(number,a,b) {
    const r=M.inverse(a), x=M.multiply(r.value,b);
    add(number,tx('Solve a matrix equation',"Lös en matrisekvation"),M.matrixText(x),...r.steps,tx('Multiply the entire equation AX = B on the left by A⁻¹, giving X = A⁻¹B.',"Multiplicera hela ekvationen AX = B från vänster med A⁻¹ och få X = A⁻¹B."),
      ...b[0].map((_,j)=>tx('Column ',"Kolumn ")+(j+1)+tx(' = A⁻¹ times '," = A⁻¹ gånger ")+M.vector(b.map(row=>row[j]))+' = '+M.vector(x.map(row=>row[j]))+'.'));
  }
  matrixEquation(19,[[1,-1,1],[2,3,0],[0,2,-1]],[[2,-1,5,7,8],[4,0,-3,0,1],[3,5,-7,2,1]]);
  matrixEquation(20,[[-2,0,1],[0,-1,-1],[1,1,-4]],[[4,3,2,1],[6,7,8,9],[1,3,7,9]]);
  add(21,tx('Prove the same fact for powers',"Bevisa samma egenskap för potenser"),tx('Only x = 0 solves Aᵏx = 0.',"Endast x = 0 löser Aᵏx = 0."),
    tx('Only the zero vector solves Ay = 0, so Ay = 0 forces y to vanish. Apply this with y = Aᵏ⁻¹x.',"Bara nollvektorn löser Ay = 0, så Ay = 0 tvingar y att vara noll. Använd detta med y = Aᵏ⁻¹x."),
    tx('Repeat: Aᵏ⁻¹x = 0 implies Aᵏ⁻²x = 0. After k steps, x = 0. The zero vector itself always works.',"Upprepa: Aᵏ⁻¹x = 0 medför Aᵏ⁻²x = 0. Efter k steg är x = 0. Själva nollvektorn fungerar alltid."));
  add(22,tx('Undo the extra multiplication',"Gör den extra multiplikationen ogjord"),tx('Ax = 0 and (QA)x = 0 have exactly the same solutions.',"Ax = 0 och (QA)x = 0 har exakt samma lösningar."),
    tx('If Ax = 0 then Q(Ax) = Q0 = 0. Conversely, if QAx = 0, multiply by Q⁻¹ on the left. This gives Ax = 0.',"Om Ax = 0 är Q(Ax) = Q0 = 0. Omvänt: om QAx = 0, multiplicera från vänster med Q⁻¹. Då får vi Ax = 0."),
    tx('Because both implications hold for every x, either both systems have only the zero solution or both have nonzero solutions.',"Eftersom båda riktningarna gäller för varje x har antingen båda systemen endast nollösningen eller båda lösningar som inte är noll."));
  add(23,tx('Describe every solution using one known answer',"Beskriv varje lösning med hjälp av ett känt svar"),tx('The set of solutions is x₁ + x₀ for all x₀ with Ax₀ = 0.',"Lösningsmängden är x₁ + x₀ för alla x₀ med Ax₀ = 0."),
    tx('Let x be any solution. Then A(x − x₁) = Ax − Ax₁ = b − b = 0. So x − x₁ can serve as x₀.',"Låt x vara en valfri lösning. Då är A(x − x₁) = Ax − Ax₁ = b − b = 0. Alltså kan x − x₁ användas som x₀."),
    tx('For the reverse direction, if Ax₀ = 0 then A(x₁ + x₀) = b + 0 = b. Every vector constructed this way really solves the system.',"Åt andra hållet: om Ax₀ = 0 så är A(x₁ + x₀) = b + 0 = b. Varje vektor som byggs på detta sätt löser verkligen systemet."));
  add(24,tx('Prove the right-inverse version',"Bevisa versionen med högerinvers"),tx('If AB = I for square matrices, then BA = I and B = A⁻¹.',"Om AB = I för kvadratiska matriser, så är BA = I och B = A⁻¹."),
    tx('Theorem 1.6.3(a) gives the left-inverse implication: if CD = I then DC = I and C = D⁻¹, with the left factor acting as the left inverse of the right factor.',"Sats 1.6.3(a) ger slutsatsen för vänsterinversen: om CD = I så är DC = I och C = D⁻¹, där vänsterfaktorn fungerar som vänsterinvers till högerfaktorn."),
    tx('Take C = A and D = B. Now A is a left inverse of B, so A = B⁻¹ and BA = I. Taking inverses gives B = A⁻¹.',"Välj C = A och D = B. Nu är A en vänsterinvers till B, så A = B⁻¹ och BA = I. Invertera och få B = A⁻¹."));
  add('TF',tx('True or false',"Sant eller falskt"),tx('All seven statements are true.',"Alla sju påståenden är sanna."),
    tx('a: two distinct solutions would give the entire line between and beyond them. b: uniqueness for a square system means the coefficient matrix is invertible, so every new right side has one solution.',"a: två olika lösningar skulle ge hela linjen mellan och bortom dem. b: entydighet för ett kvadratiskt system innebär att koefficientmatrisen är inverterbar, så varje nytt högerled har en lösning."),
    tx('c: for square matrices a right inverse is also a left inverse. d: row operations are reversible and preserve the solutions.',"c: för kvadratiska matriser är en högerinvers också en vänsterinvers. d: radoperationer kan göras ogjorda och bevarar lösningarna."),
    tx('e: multiply by S to get A(Sx) = Sb. f: rearrange to (A − 4I)x = 0, which has only zero precisely if its square coefficient matrix is invertible.',"e: multiplicera med S för att få A(Sx) = Sb. f: skriv om till (A − 4I)x = 0, som bara har nollösningen precis när dess kvadratiska koefficientmatris är inverterbar."),
    tx('g: if AB were invertible, B would have zero kernel and so be invertible. Then A = (AB)B⁻¹ would also be invertible.',"g: om AB vore inverterbar skulle B ha nollrum bestående av endast nollvektorn och alltså vara inverterbar. Då skulle A = (AB)B⁻¹ också vara inverterbar."));
  {
    const a=[[.299,.587,.114],[.596,-.275,-.321],[.212,-.523,.311]], r=M.inverse(a);
    add('T1',tx('Reverse the color conversion',"Vänd på färgomvandlingen"),M.matrixText(r.value),...r.steps,tx('Multiply the YIQ column by this inverse to recover the RGB column. The displayed entries are rounded.',"Multiplicera YIQ-kolumnen med denna invers för att återfå RGB-kolumnen. De visade elementen är avrundade."));
  }
  multi('T2',[[1,-2,2],[4,5,1],[0,3,-1]],[[0,1,7],[11,5,3],[1,-4,2]]);

  const matrix=M.matrixText;
  const diag=d=>d.map((n,i)=>d.map((_,j)=>i===j?n:0));
  const describe=(a,names)=>a.map(row=>row.flatMap((n,i)=>M.zero(n)?[]:['('+M.format(n)+')'+names[i]]).join(' + ')||'0').join(', ');
  function products(number,factors,explanation=tx('Each entry comes from multiplying a row by a column and adding the matching products.',"Varje element fås genom att multiplicera en rad med en kolumn och addera produkterna av motsvarande element.")) {
    let value=factors[0];
    const steps=[explanation,tx('Write the factors in the given order: ',"Skriv faktorerna i den givna ordningen: ")+factors.map(matrix).join(' × ')+'.'];
    factors.slice(1).forEach(factor=>{
      const next=M.multiply(value,factor);
      steps.push(...value.flatMap((row,i)=>next[i].map((v,j)=>tx('Entry (',"Element (")+(i+1)+','+(j+1)+'): '+row.map((n,k)=>'('+M.format(n)+' × '+M.format(factor[k][j])+')').join(' + ')+' = '+M.format(v)+'.')));
      value=next;
    });
    add(number,tx('Multiply the matrices',"Multiplicera matriserna"),matrix(value),...steps);
  }
  set='1.7';
  add(1,tx('Classify and check invertibility',"Klassificera och kontrollera inverterbarhet"),tx('a upper, invertible · b lower, singular · c diagonal and both triangular, invertible · d upper, singular',"a övre, inverterbar · b undre, singulär · c diagonal och både övre och undre triangulär, inverterbar · d övre, singulär"),
    tx('A triangular matrix has all zeros on one side of its main diagonal. A diagonal matrix has zeros on both sides.',"En triangulär matris har bara nollor på ena sidan av huvuddiagonalen. En diagonalmatris har nollor på båda sidor."),
    tx('Check the diagonal entries. a has (2,3), b has (0,0), c has (−1,2,5), and d has (3,0,8). A triangular matrix is invertible exactly when none of these entries is zero.',"Kontrollera diagonalelementen. a har (2,3), b har (0,0), c har (−1,2,5) och d har (3,0,8). En triangulär matris är inverterbar precis när inget av dessa element är noll."));
  add(2,tx('Classify and check four more matrices',"Klassificera och kontrollera ytterligare fyra matriser"),tx('a lower, invertible · b upper, singular · c diagonal and both triangular, invertible · d lower, singular',"a undre, inverterbar · b övre, singulär · c diagonal och både övre och undre triangulär, inverterbar · d undre, singulär"),
    tx('Use the same tests. The diagonals are (4,7), (0,0), (4,3/5,−2), and (3,1,0).',"Använd samma tester. Diagonalerna är (4,7), (0,0), (4,3/5,−2) och (3,1,0)."),
    tx('The second and fourth have a zero diagonal entry. The first and third do not.',"Den andra och fjärde har ett nollelement på diagonalen. Den första och tredje har det inte."));
  products(3,[diag([3,-1,2]),[[2,1],[-4,1],[2,5]]],tx('Multiplying by a diagonal matrix on the left scales the three rows by 3, −1, and 2.',"Multiplikation med en diagonalmatris från vänster skalar de tre raderna med 3, −1 och 2."));
  products(4,[[[1,2,-5],[-3,-1,0]],diag([-4,3,2])],tx('A diagonal factor on the right scales the columns by −4, 3 and 2.',"En diagonalfaktor till höger skalar kolumnerna med −4, 3 och 2."));
  products(5,[diag([5,2,-3]),[[-3,2,0,4,-4],[1,-5,3,0,3],[-6,2,2,2,2]]],tx('Scale the rows by 5, 2 and −3.',"Skala raderna med 5, 2 och −3."));
  products(6,[diag([2,-1,4]),[[4,-1,3],[1,2,0],[-5,1,-2]],diag([-3,5,2])],tx('Scale the middle matrix’s rows by 2, −1 and 4, then its columns by −3, 5 and 2.',"Skala den mittersta matrisens rader med 2, −1 och 4, och sedan dess kolumner med −3, 5 och 2."));
  solutions[set]=solutions[set].filter(p=>p.number!=='7–10');
  [[1,-2],[-6,3,5],[1/2,1/3,1/4],[-2,-4,-3,2]].forEach((d,i)=>{
    const square=matrix(diag(d.map(n=>n**2))), inv=matrix(diag(d.map(n=>n**-2)));
    const general='diag('+d.map(n=>'1/('+M.format(n)+')ᵏ').join(', ')+')';
    add(i+7,tx('Raise each diagonal entry separately',"Upphöj varje diagonalelement separat"),'A² = '+square+'\nA⁻² = '+inv+'\nA⁻ᵏ = '+general,
      tx('A diagonal matrix scales each coordinate on its own. Squaring the matrix squares each scale factor.',"En diagonalmatris skalar varje koordinat för sig. Att kvadrera matrisen kvadrerar varje skalfaktor."),
      tx('To undo a nonzero scale n, multiply by 1/n. The negative powers therefore use 1/n² or 1/nᵏ on each diagonal entry. Entries away from the diagonal stay zero.',"För att göra en skalning med ett n som inte är noll ogjord multiplicerar du med 1/n. Negativa potenser använder därför 1/n² eller 1/nᵏ på varje diagonalelement. Element utanför diagonalen förblir noll."));
  });
  products(11,[diag([1,0,3]),diag([2,5,0]),diag([0,2,1])],tx('Multiply corresponding diagonal entries: 1×2×0, 0×5×2 and 3×0×1.',"Multiplicera motsvarande diagonalelement: 1×2×0, 0×5×2 och 3×0×1."));
  products(12,[diag([-1,2,4]),diag([3,5,7]),diag([5,-2,3])],tx('Multiply corresponding diagonal entries: (−1)×3×5, 2×5×(−2) and 4×7×3.',"Multiplicera motsvarande diagonalelement: (−1)×3×5, 2×5×(−2) och 4×7×3."));
  add(13,tx('Use an odd power',"Använd en udda exponent"),'diag(1, −1).',tx('Compute 1³⁹ = 1. Each pair of factors −1 cancels, and one factor is left over because 39 is odd.',"Beräkna 1³⁹ = 1. Varje par av faktorer −1 tar ut varandra och en faktor blir kvar eftersom 39 är udda."));
  add(14,tx('Use an even power',"Använd en jämn exponent"),'I₂.',tx('Compute 1¹⁰⁰⁰ = 1. Pair all 1000 factors of −1, leaving a product of 1.',"Beräkna 1¹⁰⁰⁰ = 1. Para ihop alla 1000 faktorer −1 och få produkten 1."));
  add(15,tx('Scale rows and columns',"Skala rader och kolumner"),'a: [au av] [bw bx] [cy cz].\nb: [ra sb tc] [ua vb wc] [xa yb zc].',
    tx('A diagonal matrix on the left scales row 1 by a, row 2 by b, and row 3 by c.',"En diagonalmatris till vänster skalar rad 1 med a, rad 2 med b och rad 3 med c."),
    tx('On the right it scales column 1 by a, column 2 by b, and column 3 by c.',"Till höger skalar den kolumn 1 med a, kolumn 2 med b och kolumn 3 med c."));
  add(16,tx('Apply the same scaling rule',"Använd samma skalningsregel"),'a: [au bv] [aw bx] [ay bz].\nb: [ar as at] [bu bv bw] [cx cy cz].',
    tx('Part a has a diagonal matrix on the right, so multiply the first column by a and the second by b.',"Del a har en diagonalmatris till höger, så multiplicera den första kolumnen med a och den andra med b."),
    tx('Part b has it on the left, so multiply the three rows by a, b and c respectively.',"Del b har den till vänster, så multiplicera de tre raderna med a, b respektive c."));
  add(17,tx('Copy the entries across the diagonal',"Kopiera elementen över diagonalen"),'a: [2 −1] [−1 3].\nb: [1 3 7 2] [3 1 −8 −3] [7 −8 0 9] [2 −3 9 0].',
    tx('A symmetric matrix has equal entries at positions (i,j) and (j,i). Use each given entry below the diagonal to fill its partner above the diagonal.',"En symmetrisk matris har lika element på positionerna (i,j) och (j,i). Använd varje givet element under diagonalen för att fylla i dess motsvarighet ovanför diagonalen."));
  add(18,tx('Reflect the upper entries into the lower half',"Spegla de övre elementen till den undre halvan"),'a: [0 3] [3 0].\nb: [1 7 −3 2] [7 4 5 −7] [−3 5 1 −6] [2 −7 −6 3].',
    tx('In a, place 3 above the diagonal to match the given 3 below. In b, copy 7, −3 and 2 from row 1 to column 1, then 5 and −7 from row 2 into column 2, and −6 from row 3 into column 3.',"I a, placera 3 ovanför diagonalen för att motsvara det givna talet 3 nedanför. I b, kopiera 7, −3 och 2 från rad 1 till kolumn 1, sedan 5 och −7 från rad 2 till kolumn 2 och −6 från rad 3 till kolumn 3."));
  [[0,7,-2],[-1,3,5],[1,-5,4,3],[2,-1,0,-5]].forEach((d,i)=>add(i+19,tx('Inspect the main diagonal',"Granska huvuddiagonalen"),d.includes(0)?tx('Singular.',"Singulär."):tx('Invertible.',"Inverterbar."),
    tx('The matrix is triangular. Its main diagonal is ',"Matrisen är triangulär. Dess huvuddiagonal är ")+M.vector(d)+'.',d.includes(0)?tx('A zero on the diagonal prevents an inverse.',"En nolla på diagonalen förhindrar en invers."):tx('All diagonal entries are nonzero, so the inverse exists.',"Alla diagonalelement är skilda från noll, så inversen finns.")));
  add(23,tx('Find only the diagonal',"Bestäm bara diagonalen"),'(−3, 5, −6).',tx('In a product of upper triangular matrices, the diagonal entries are the matching diagonal factors multiplied together: 3(−1), 1(5), and (−1)6.',"I en produkt av övre triangulära matriser är diagonalelementen produkterna av motsvarande diagonalfaktorer: 3(−1), 1(5) och (−1)6."));
  add(24,tx('Multiply the lower triangular diagonals',"Multiplicera diagonalerna i undre triangulära matriser"),'(24, 0, 42).',tx('Below the diagonal both matrices may have nonzero entries, but each diagonal entry of their product still uses only one pair: 4×6, 0×5 and 7×6.',"Under diagonalen får båda matriserna ha element som inte är noll, men varje diagonalelement i produkten använder fortfarande bara ett par: 4×6, 0×5 och 7×6."));
  add(25,tx('Match the off-diagonal pair',"Anpassa paret utanför diagonalen"),'a = −8.',tx('Set a + 5 equal to −3. Subtract 5 from both sides.',"Sätt a + 5 lika med −3. Subtrahera 5 från båda sidor."));
  linear(26,[[1,-2,2,3],[2,1,1,0],[1,0,1,-2]],tx('Match the three off-diagonal pairs',"Anpassa de tre paren utanför diagonalen"),[tx('Compare a₁₂ with a₂₁, a₁₃ with a₃₁, and a₂₃ with a₃₂. This gives a−2b+2c=3, 2a+b+c=0 and a+c=−2.',"Jämför a₁₂ med a₂₁, a₁₃ med a₃₁ och a₂₃ med a₃₂. Detta ger a−2b+2c=3, 2a+b+c=0 och a+c=−2.")]);
  add(27,tx('Exclude the zero diagonal values',"Uteslut värden som ger noll på diagonalen"),tx('All real x except 1, −2 and 4.',"Alla reella x utom 1, −2 och 4."),tx('Set each diagonal factor x−1, x+2 and x−4 to zero separately. These are the only values that make the triangular matrix singular.',"Sätt varje diagonalfaktor x−1, x+2 och x−4 lika med noll för sig. Detta är de enda värden som gör den triangulära matrisen singulär."));
  add(28,tx('Check the lower triangular diagonal',"Kontrollera den undre triangulära diagonalens element"),tx('All real x except 1/2, 1/3 and −1/4.',"Alla reella x utom 1/2, 1/3 och −1/4."),tx('The diagonal is x−1/2, x−1/3 and x+1/4. A triangular matrix has an inverse exactly when each of these is nonzero.',"Diagonalen är x−1/2, x−1/3 och x+1/4. En triangulär matris har en invers precis när vart och ett av dessa element är skilt från noll."));
  add(29,tx('Read the inverse diagonal',"Läs inversens diagonal"),tx('The inverse diagonal entries are 1/aᵢᵢ.',"Inversens diagonalelement är 1/aᵢᵢ."),
    tx('The inverse of an invertible triangular matrix is triangular of the same type. In AA⁻¹ = I the i-th diagonal entry is aᵢᵢ times the matching inverse entry.',"Inversen till en inverterbar triangulär matris är triangulär av samma typ. I AA⁻¹ = I är det i:te diagonalelementet aᵢᵢ gånger motsvarande element i inversen."),
    tx('That product is 1. Divide by aᵢᵢ to get the reciprocal.',"Den produkten är 1. Dividera med aᵢᵢ för att få det inverterade talet."));
  add(30,tx('Transpose the products',"Transponera produkterna"),tx('All three products are symmetric.',"Alla tre produkter är symmetriska."),tx('When a product is transposed, transpose each factor and reverse their order.',"När en produkt transponeras ska varje faktor transponeras och deras ordning vändas."),
    tx('(BᵀB)ᵀ = BᵀB and (BBᵀ)ᵀ = BBᵀ because transposing twice returns B.',"(BᵀB)ᵀ = BᵀB och (BBᵀ)ᵀ = BBᵀ eftersom två transponeringar ger tillbaka B."),
    tx('(BᵀAB)ᵀ = BᵀAᵀB = BᵀAB because Aᵀ = A.',"(BᵀAB)ᵀ = BᵀAᵀB = BᵀAB eftersom Aᵀ = A."));
  add(31,tx('Take fifth roots of the diagonal',"Ta femterötter ur diagonalen"),'diag(1, −1, −1).',tx('For a diagonal matrix the fifth power raises each diagonal entry to the fifth power. The real fifth roots of 1, −1 and −1 are 1, −1 and −1.',"För en diagonalmatris upphöjer femte potensen varje diagonalelement till fem. De reella femterötterna ur 1, −1 och −1 är 1, −1 och −1."));
  add(32,tx('Take reciprocal square roots',"Ta kvadratrötter ur de inverterade talen"),tx('diag(±1/3, ±1/2, ±1), with independent signs.',"diag(±1/3, ±1/2, ±1), med oberoende teckenval."),tx('Write 1/a₁²=9, 1/a₂²=4 and 1/a₃²=1. Invert both sides of each equation, then take both square roots.',"Skriv 1/a₁²=9, 1/a₂²=4 och 1/a₃²=1. Invertera båda sidor i varje ekvation och ta sedan båda kvadratrötterna."));
  {
    const a=[[-1,2,5],[0,1,3],[0,0,-4]], b=[[2,-8,0],[0,2,1],[0,0,3]], r=M.inverse(a);
    add(33,tx('Verify the triangular product and inverse',"Kontrollera den triangulära produkten och inversen"),'AB = '+matrix(M.multiply(a,b))+'\nA⁻¹ = '+matrix(r.value),
      tx('Multiply A and B in order. For each entry below the diagonal, every row-column product includes a zero, so AB is upper triangular.',"Multiplicera A och B i ordning. För varje element under diagonalen innehåller varje rad-kolumnprodukt en nolla, så AB är övre triangulär."),
      ...r.steps,tx('The entries below the diagonal of A⁻¹ are zero as well.',"Elementen under diagonalen i A⁻¹ är också noll."));
  }
  add(34,tx('Use the transpose rule',"Använd transponeringsregeln"),tx('Both A² and 2A² − 3A + I are symmetric.',"Både A² och 2A² − 3A + I är symmetriska."),
    tx('Transpose A² to get AᵀAᵀ = AA = A². Then transpose the second expression term by term.',"Transponera A² och få AᵀAᵀ = AA = A². Transponera sedan det andra uttrycket term för term."),
    tx('A², A and I each equal their own transpose, so their weighted sum does too.',"A², A och I är var och en lika med sitt eget transponat, så deras viktade summa är det också."));
  {
    const parts=[[[2,-1],[-1,3]],[[1,-2,3],[-2,1,-7],[3,-7,4]]].map(M.inverse);
    add(35,tx('Check each inverse for symmetry',"Kontrollera varje invers för symmetri"),parts.map((r,i)=>tx('Part ',"Del ")+(i?'b':'a')+': '+matrix(r.value)).join('\n'),
      ...parts.flatMap((r,i)=>[tx('Part ',"Del ")+(i?'b':'a')+tx(': start by checking the matching entries across the diagonal of A.',": börja med att kontrollera motsvarande element på var sin sida om diagonalen i A."),...r.steps,
        tx('The inverse has matching entries in the same reflected positions, so it is symmetric.',"Inversen har lika element på samma speglade positioner, så den är symmetrisk.")]));
  }
  add(36,tx('Solve the scalar equation on each diagonal',"Lös skalärekvationen på varje diagonalposition"),tx('Eight matrices: diag(a,b,c), with a,b,c chosen independently from {−1,4}.',"Åtta matriser: diag(a,b,c), där a,b,c väljs oberoende ur {−1,4}."),
    tx('For each diagonal entry t, the equation becomes t²−3t−4=0. Factor it as (t−4)(t+1)=0.',"För varje diagonalelement t blir ekvationen t²−3t−4=0. Faktorisera den som (t−4)(t+1)=0."),
    tx('Each of the three positions can take either root. There are 2×2×2 choices.',"Var och en av de tre positionerna kan ha endera roten. Det finns 2×2×2 val."));
  add(37,tx('Switch the row and column indices',"Byt plats på rad- och kolumnindex"),tx('a and c are symmetric. b and d are not symmetric when n ≥ 2.',"a och c är symmetriska. b och d är inte symmetriska när n ≥ 2."),
    tx('a and c: swapping i and j changes only the order of addition, so the value stays the same.',"a och c: att byta i och j ändrar bara additionsordningen, så värdet är detsamma."),
    tx('b: a₁₂ = −3 and a₂₁ = 3. d: a₁₂ = 18 and a₂₁ = 10. Both fail the reflected-pair test.',"b: a₁₂ = −3 och a₂₁ = 3. d: a₁₂ = 18 och a₂₁ = 10. Båda misslyckas med testet för speglade par."),
    tx('When n = 1 there is only one entry, so all four cases are symmetric.',"När n = 1 finns bara ett element, så alla fyra fall är symmetriska."));
  add(38,tx('State the general test',"Formulera det allmänna testet"),tx('Compare aᵢⱼ and aⱼᵢ for every allowed i and j.',"Jämför aᵢⱼ och aⱼᵢ för alla tillåtna i och j."),tx('Swap the two indices in the formula. If this never changes the value, the matrix equals its transpose. One counterexample is enough to rule out symmetry.',"Byt plats på de två indexen i formeln. Om detta aldrig ändrar värdet är matrisen lika med sitt transponat. Ett enda motexempel räcker för att utesluta symmetri."));
  add(39,tx('Find the missing upper entry',"Bestäm det saknade övre elementet"),'[1 10] [0 −2].',
    tx('The diagonal of the cube is made of the cubes of the diagonal entries. Take real cube roots of 1 and −8 to get 1 and −2.',"Diagonalen i tredje potensen består av diagonalelementens kuber. Ta reella kubikrötter ur 1 och −8 och få 1 och −2."),
    tx('Call the remaining entry t. Squaring gives top-right t−2t = −t. Multiplying once more gives t + (−t)(−2) = 3t.',"Kalla det återstående elementet t. Vid kvadrering blir det övre högra elementet t−2t = −t. Multiplikation en gång till ger t + (−t)(−2) = 3t."),
    tx('Solve 3t = 30 to get t = 10.',"Lös 3t = 30 och få t = 10."));
  {
    const parts=[
      [[[1,0,0],[-2,3,0],[2,4,1]],[[2,-1,3],[0,1,2],[0,0,4]],[1,-2,0]],
      [[[2,0,0],[4,1,0],[-3,-2,3]],[[3,-5,2],[0,4,1],[0,0,2]],[4,-5,2]]
    ].map(([l,u,b])=>{
      const y=M.solve(l.map((r,i)=>[...r,b[i]])), x=M.solve(u.map((r,i)=>[...r,y.point[i]]));
      return {y,x};
    });
    add(40,tx('Solve first with L and then with U',"Lös först med L och sedan med U"),parts.map(({x},i)=>tx('Part ',"Del ")+(i?'b':'a')+': '+M.vector(x.point)).join('\n'),
      ...parts.flatMap(({y,x},i)=>[tx('Part ',"Del ")+(i?'b':'a')+tx(': call Ux the vector y. Solve Ly = b to get y.',": kalla vektorn Ux för y. Lös Ly = b för att få y."),...y.steps,
        tx('Now solve Ux = y. This recovers the original unknown vector x.',"Lös nu Ux = y. Då får du tillbaka den ursprungliga obekanta vektorn x."),...x.steps]));
  }
  add(41,tx('Use opposite entries across the diagonal',"Använd motsatta element över diagonalen"),'a: [0 0 4] [0 0 1] [−4 −1 0].\nb: [0 0 −8] [0 0 −4] [8 4 0].',
    tx('Every diagonal entry must equal its own negative, so it is zero. For each off-diagonal entry, put the opposite number in the reflected position.',"Varje diagonalelement måste vara lika med sitt eget negativa värde och är därför noll. För varje element utanför diagonalen sätter du det motsatta talet på den speglade positionen."));
  add(42,tx('Match opposite entries and set the diagonal to zero',"Anpassa motsatta element och sätt diagonalen till noll"),tx('(a,b,c,d) = (1+10t, 7t, t, 0), for any real t.',"(a,b,c,d) = (1+10t, 7t, t, 0), för varje reellt t."),
    tx('The conditions are 2a−3b+c=2, 3a−5b+5c=3, 5a−8b+6c=5, and d=0. The third equation is the sum of the first two.',"Villkoren är 2a−3b+c=2, 3a−5b+5c=3, 5a−8b+6c=5 och d=0. Den tredje ekvationen är summan av de första två."),
    tx('Double the second and subtract three times the first to get −b+7c=0. Thus b=7c. Substituting in the first gives a=1+10c.',"Dubbla den andra och subtrahera tre gånger den första för att få −b+7c=0. Alltså b=7c. Insättning i den första ger a=1+10c."),
    tx('Let c=t. The result is (1+10t,7t,t,0).',"Sätt c=t. Resultatet är (1+10t,7t,t,0)."));
  add(43,tx('Transpose a product of skew-symmetric matrices',"Transponera en produkt av skevsymmetriska matriser"),tx('The commuting product is symmetric. It is skew-symmetric only if the product is zero.',"Produkten av de kommuterande matriserna är symmetrisk. Den är skevsymmetrisk endast om produkten är noll."),
    tx('(AB)ᵀ = BᵀAᵀ = (−B)(−A) = BA. When the matrices commute, BA = AB.',"(AB)ᵀ = BᵀAᵀ = (−B)(−A) = BA. När matriserna kommuterar är BA = AB."),
    tx('A matrix equal to both its transpose and its negative must be zero. For a counterexample, square [0 1] [−1 0]. The result is −I₂, which is nonzero and symmetric.',"En matris som är lika med både sitt transponat och sitt negativa värde måste vara noll. Som motexempel, kvadrera [0 1] [−1 0]. Resultatet är −I₂, som inte är noll och är symmetriskt."));
  add(44,tx('Split a matrix into two parts',"Dela upp en matris i två delar"),'A = (A + Aᵀ)/2 + (A − Aᵀ)/2.',
    tx('Add the two expressions. The transposes cancel and 2A divided by 2 gives A.',"Addera de två uttrycken. Transponaten tar ut varandra och 2A dividerat med 2 ger A."),
    tx('Transposing the first expression leaves it unchanged. Transposing the second reverses the sign, so it is skew-symmetric.',"Transponering av det första uttrycket lämnar det oförändrat. Transponering av det andra byter tecken, så det är skevsymmetriskt."));
  add(45,tx('Keep track of signs when transposing',"Håll reda på tecknen vid transponering"),tx('The inverse, transpose, sum, difference and scalar multiple have the stated skew symmetry.',"Inversen, transponatet, summan, differensen och skalärmultipeln har den angivna skevsymmetrin."),
    tx('For the inverse, (A⁻¹)ᵀ = (Aᵀ)⁻¹ = (−A)⁻¹ = −A⁻¹.',"För inversen gäller (A⁻¹)ᵀ = (Aᵀ)⁻¹ = (−A)⁻¹ = −A⁻¹."),
    tx('For Aᵀ, transposing again gives A = −Aᵀ. For sums, differences and scalar multiples, distribute the transpose, then factor out the minus sign from Aᵀ and Bᵀ.',"För Aᵀ ger ytterligare transponering A = −Aᵀ. För summor, differenser och skalärmultiplar fördelas transponeringen, varefter minustecknet bryts ut ur Aᵀ och Bᵀ."));
  add(46,tx('Explain why only the diagonal factors survive',"Förklara varför bara diagonalfaktorerna återstår"),tx('(AB)ᵢᵢ = aᵢᵢbᵢᵢ and (BA)ᵢᵢ = bᵢᵢaᵢᵢ.',"(AB)ᵢᵢ = aᵢᵢbᵢᵢ och (BA)ᵢᵢ = bᵢᵢaᵢᵢ."),
    tx('The i-th diagonal of AB is the sum of aᵢₖbₖᵢ over k. For two upper triangular matrices, k<i makes the first factor zero and k>i makes the second zero.',"Det i:te diagonalelementet i AB är summan av aᵢₖbₖᵢ över k. För två övre triangulära matriser gör k<i den första faktorn noll och k>i den andra faktorn noll."),
    tx('For two lower triangular matrices, the two reasons switch. Either way only k=i remains. Exchange A and B for the second statement.',"För två undre triangulära matriser byter de två orsakerna plats. I båda fallen återstår bara k=i. Byt A och B för det andra påståendet."));
  add(47,tx('Transpose both sides',"Transponera båda sidor"),tx('A is symmetric and A² = A.',"A är symmetrisk och A² = A."),tx('The product AᵀA is symmetric because its transpose is again AᵀA. Since it equals A, the matrix A must be symmetric. Replace Aᵀ with A in the given equation.',"Produkten AᵀA är symmetrisk eftersom dess transponat återigen är AᵀA. Eftersom den är lika med A måste matrisen A vara symmetrisk. Ersätt Aᵀ med A i den givna ekvationen."));
  add('TF',tx('True or false',"Sant eller falskt"),'a T · b F · c F · d T · e T · f F · g F · h T · i T · j F · k F · l F · m T',
    tx('a: transposition fixes all diagonal positions. b: it turns an upper triangular matrix into a lower triangular one. c: an off-diagonal entry can survive the sum.',"a: transponering behåller alla diagonalpositioner. b: den gör en övre triangulär matris till en undre triangulär. c: ett element utanför diagonalen kan finnas kvar i summan."),
    tx('d: the upper half of a symmetric matrix determines the lower half by reflection. e: the lower half of an upper triangular matrix is already zero. f: a lower triangular inverse is lower triangular.',"d: den övre halvan av en symmetrisk matris bestämmer den undre genom spegling. e: den undre halvan av en övre triangulär matris är redan noll. f: inversen till en undre triangulär matris är undre triangulär."),
    tx('g: a negative diagonal entry can be nonzero and invertible. h: the sum still has zeros above the diagonal. i: the zeros below the diagonal reflect to zeros above it.',"g: ett negativt diagonalelement kan vara skilt från noll och inverterbart. h: summan har fortfarande nollor ovanför diagonalen. i: nollorna under diagonalen speglas till nollor ovanför den."),
    tx('j and k: take a matrix A with only a nonzero (2,1) entry and B = −A. Their sum is zero and each matrix fails both properties.',"j och k: välj en matris A med endast ett element skilt från noll på position (2,1) och B = −A. Summan är noll och ingen av matriserna har någon av egenskaperna."),
    tx('l: [0 1] [0 0] squares to the zero matrix but is not symmetric. m: from kAᵀ = kA, divide by nonzero k.',"l: [0 1] [0 0] kvadreras till nollmatrisen men är inte symmetrisk. m: dividera kAᵀ = kA med k som inte är noll."));
  {
    const r=M.inverse([[1.24,2.37,0,0],[3.08,-1.01,0,0],[0,0,2.76,4.92],[0,0,3.23,5.54]]);
    add('T1',tx('Invert the blocks separately',"Invertera blocken separat"),matrix(r.value),
      tx('Put D₁⁻¹ and D₂⁻¹ in the diagonal blocks and zero matrices elsewhere. Multiplying the two block matrices gives identity blocks on the diagonal and zeros elsewhere.',"Placera D₁⁻¹ och D₂⁻¹ i diagonalblocken och nollmatriser på övriga platser. Multiplikation av de två blockmatriserna ger identitetsblock på diagonalen och nollor på övriga platser."),
      ...r.steps,tx('The two diagonal blocks in the result are the inverses of the corresponding blocks in the original matrix.',"De två diagonalblocken i resultatet är inverserna till motsvarande block i den ursprungliga matrisen."));
  }

  set='1.9';
  add(3,tx('Apply the reflection and projection both ways',"Utför spegling och projektion i båda ordningarna"),tx('They commute. Both send (x,y,z) to (0,y,−z).',"De kommuterar. Båda skickar (x,y,z) till (0,y,−z)."),tx('Reflection in xy changes z to −z. Projection onto yz sets x to zero. These affect different coordinates, so changing the order leaves the same result.',"Spegling i xy ändrar z till −z. Projektion på yz sätter x till noll. De påverkar olika koordinater, så ordningsbyte ger samma resultat."));
  add(4,tx('Apply the reflection and scaling both ways',"Utför spegling och skalning i båda ordningarna"),tx('They commute. Both give (2x,3y,−z).',"De kommuterar. Båda ger (2x,3y,−z)."),tx('One operation negates z. The other doubles x and triples y. Neither operation alters the coordinates changed by the other.',"Den ena operationen byter tecken på z. Den andra dubblerar x och tredubblar y. Ingen av operationerna ändrar de koordinater som den andra påverkar."));
  function twoMaps(number,a,b,sizes,inputs) {
    const ba=M.multiply(b,a), ab=sizes?null:M.multiply(a,b);
    const names=inputs||['x₁','x₂','x₃','x₄'];
    add(number,tx('Compose in the order the maps act',"Sätt samman avbildningarna i den ordning de verkar"),'A = '+matrix(a)+'\nB = '+matrix(b)+'\nBA = '+matrix(ba)+'\n'+
      (ab?'AB = '+matrix(ab)+'\nT₁(T₂(x)) = ('+describe(ab,names)+')':tx('T₁ ∘ T₂ is undefined.',"T₁ ∘ T₂ är odefinierad."))+'\nT₂(T₁(x)) = ('+describe(ba,names)+')',
      tx('Read the coefficients of one output at a time to form one row of A or B.',"Läs koefficienterna för en utdatas koordinat i taget för att bilda en rad i A eller B."),
      tx('To apply T₁ first, multiply the input by A, then multiply that result by B. Therefore the composite matrix is BA, with A on the right.',"För att tillämpa T₁ först, multiplicera indata med A och multiplicera sedan resultatet med B. Den sammansatta matrisen är därför BA, med A till höger."),
      tx('Multiply each row of B with each column of A and add the matching products to obtain ',"Multiplicera varje rad i B med varje kolumn i A och addera motsvarande produkter för att få ")+matrix(ba)+'.',
      ab?tx('Reverse the order to find AB = ',"Vänd på ordningen för att bestämma AB = ")+matrix(ab)+tx('. Multiply each result by the input column to get the coordinate formulas.',". Multiplicera varje resultat med indatakolumnen för att få koordinatformlerna."):
        tx('The output of T₂ has ',"Utdata från T₂ har ")+b.length+tx(' coordinates but the input of T₁ needs '," koordinater men indata till T₁ behöver ")+a[0].length+tx('. So the reverse order is undefined. Multiply BA by the input to read its output formula.',". Den omvända ordningen är därför odefinierad. Multiplicera BA med indata för att läsa dess utdataformel."));
  }
  twoMaps(5,[[1,-2],[4,1]],[[2,-3],[5,0]]);
  twoMaps(6,[[6,3,-1],[2,0,1],[4,-3,6]],[[4,0,4],[-1,5,2],[2,-3,8]]);
  add(7,tx('Follow the order of the plane operations',"Följ ordningen för operationerna i planet"),'a: [1 0] [0 −1].\nb: [0 −√2/2] [0 √2/2].\nc: [1/2 √3/2] [√3/2 −1/2].',
    tx('a: a quarter turn takes (x,y) to (−y,x). Swapping gives (x,−y).',"a: ett kvarts varv tar (x,y) till (−y,x). Koordinatbyte ger (x,−y)."),
    tx('b: project to (0,y), then rotate 45° to (−y√2/2,y√2/2).',"b: projicera till (0,y) och rotera sedan 45° till (−y√2/2,y√2/2)."),
    tx('c: reflect to (x,−y), then rotate 60°. The result is (x/2 + y√3/2, x√3/2 − y/2). Use the x- and y-coefficients as the two columns.',"c: spegla till (x,−y) och rotera sedan 60°. Resultatet är (x/2 + y√3/2, x√3/2 − y/2). Använd x- och y-koefficienterna som de två kolumnerna."));
  add(8,tx('Follow three plane operations',"Följ tre operationer i planet"),'a: [0 0] [1/2 −√3/2].\nb: [−√2/2 0] [√2/2 0].\nc: −I₂.',
    tx('a: rotate 60° so the first coordinate is u = x/2 − y√3/2. Project to (u,0), then swap to get (0,u).',"a: rotera 60° så att den första koordinaten blir u = x/2 − y√3/2. Projicera till (u,0) och byt sedan koordinater till (0,u)."),
    tx('b: project to (x,0), rotate to (x√2/2,x√2/2), then negate the first coordinate.',"b: projicera till (x,0), rotera till (x√2/2,x√2/2) och byt sedan tecken på den första koordinaten."),
    tx('c: rotations about the origin add their angles. 15° + 105° + 60° = 180°, giving (−x,−y).',"c: rotationer kring origo adderar sina vinklar. 15° + 105° + 60° = 180°, vilket ger (−x,−y)."));
  add(9,tx('Follow two spatial operations',"Följ två operationer i rummet"),'a: diag(−1,0,1). b: diag(1,1,0). c: diag(−1,1,0).',
    tx('a: yz reflection flips x, then xz projection sets y to zero. b: xy reflection flips z, then xy projection removes z anyway.',"a: spegling i yz byter tecken på x, sedan sätter projektion på xz värdet y till noll. b: spegling i xy byter tecken på z, sedan tar projektion på xy ändå bort z."),
    tx('c: xy projection removes z, then yz reflection flips x. Read the three coordinate multipliers down the matrix diagonal.',"c: projektion på xy tar bort z, sedan byter spegling i yz tecken på x. Läs de tre koordinatfaktorerna längs matrisens diagonal."));
  add(10,tx('Follow three spatial operations',"Följ tre operationer i rummet"),'a: diag(−1,0,1). b: diag(0,−1,−1). c: diag(0,2,−2).',
    tx('a: (x,y,z) becomes (x,y,−z), then (x,0,−z), then (−x,0,z).',"a: (x,y,z) blir (x,y,−z), sedan (x,0,−z) och sedan (−x,0,z)."),
    tx('b: it becomes (x,y,−z), then (x,−y,−z), then (0,−y,−z).',"b: den blir (x,y,−z), sedan (x,−y,−z) och sedan (0,−y,−z)."),
    tx('c: it becomes (0,y,z), then (0,2y,2z), then (0,2y,−2z).',"c: den blir (0,y,z), sedan (0,2y,2z) och sedan (0,2y,−2z)."));
  twoMaps(11,[[1,1],[1,-1]],[[3,0],[2,4]]);
  twoMaps(12,[[4,0,0],[-2,1,0],[-1,-3,0]],[[1,2,0],[0,0,-1],[4,0,-1]]);
  twoMaps(13,[[1,-1],[-1,2],[3,0]],[[0,4,0],[1,2,0]]);
  twoMaps(14,[[1,2,3,0],[0,1,0,-1]],[[-1,0],[0,0],[1,1],[0,3]]);
  twoMaps(15,[[0,1],[1,0],[1,1],[1,-1]],[[1,0,0,1],[0,1,0,1],[0,0,1,1]],true,['x','y']);
  twoMaps(16,[[1,2],[0,0],[2,1]],[[0,0,3],[1,-1,0],[0,0,3],[-1,1,0]],true,['x','y']);
  function inverseMaps(number,parts,mode) {
    const answers=parts.map(([a,v])=>{
      const r=M.inverse(a);
      return {a,r,answer:'A = '+matrix(a)+'. '+(!r.value?tx('Singular.',"Singulär."):tx('Invertible.',"Inverterbar.")+
        (mode?' A⁻¹ = '+matrix(r.value)+'. '+(v?tx('Image = ',"Bild = ")+M.vector(M.apply(r.value,v))+'.':tx('Inverse output = (',"Inversens utdata = (")+describe(r.value,['w₁','w₂','w₃'])+').'):''))};
    });
    add(number,tx('Can the transformation be undone?',"Kan avbildningen göras ogjord?"),answers.map((r,i)=>tx('Part ',"Del ")+(i?'b':'a')+': '+r.answer).join('\n'),
      tx('The standard matrix has one row for each output coordinate. An inverse transformation exists exactly when this square matrix has an inverse.',"Standardmatrisen har en rad för varje utdatas koordinat. En invers avbildning finns precis när denna kvadratiska matris har en invers."),
      ...answers.flatMap(({a,r},i)=>[tx('Part ',"Del ")+(i?'b':'a')+tx(': use the coefficient matrix ',": använd koefficientmatrisen ")+matrix(a)+'.',...r.steps]),
      tx('When the inverse exists, multiply it by the output column to recover the input.',"När inversen finns multiplicerar du den med utdatakolumnen för att återfå indata."));
  }
  inverseMaps(17,[[[[8,4],[2,1]]],[[[-1,3,2],[2,0,4],[1,3,6]]]],false);
  inverseMaps(18,[[[[2,-3],[5,1]]],[[[1,2,3],[2,5,3],[1,0,8]]]],false);
  inverseMaps(19,[[[[1,2],[-1,1]]],[[[4,-6],[-2,3]]]],true);
  inverseMaps(20,[[[[1,-2,2],[2,1,1],[1,1,0]]],[[[1,-3,4],[-1,1,1],[0,-2,5]]]],true);
  add(21,tx('Find the reverse motion',"Bestäm den omvända rörelsen"),tx('a: the same reflection. b: a clockwise 60° rotation. c: no inverse.',"a: samma spegling. b: en medurs rotation på 60°. c: ingen invers."),
    tx('Reflecting twice in the same line restores the point. Rotating by 60° and then −60° adds to zero rotation.',"Två speglingar i samma linje återställer punkten. Rotation med 60° och sedan −60° ger tillsammans ingen rotation."),
    tx('Projection onto the x-axis discards y. For example (1,0) and (1,2) both give (1,0), so the original point cannot always be recovered.',"Projektion på x-axeln kastar bort y. Till exempel ger (1,0) och (1,2) båda (1,0), så den ursprungliga punkten kan inte alltid återställas."));
  add(22,tx('Check three more motions',"Kontrollera ytterligare tre rörelser"),tx('a: the same reflection. b: no inverse. c: the same reflection through the origin.',"a: samma spegling. b: ingen invers. c: samma spegling genom origo."),
    tx('Swapping coordinates twice restores both coordinates. Projecting to the y-axis erases x, so two inputs can have the same output.',"Två koordinatbyten återställer båda koordinaterna. Projektion på y-axeln tar bort x, så två indata kan ge samma utdata."),
    tx('Reflection through the origin negates both coordinates. Negating twice restores the original point.',"Spegling genom origo byter tecken på båda koordinaterna. Två teckenbyten återställer den ursprungliga punkten."));
  inverseMaps(23,[[[[1,2],[1,1]],[1,2]],[[[1,1],[1,1]],[1,2]]],true);
  inverseMaps(24,[[[[1,2,0],[1,1,1],[2,3,1]],[1,2,3]],[[[1,1,0],[0,1,1],[1,0,1]],[1,2,3]]],true);
  add(25,tx('Recognize the reflection line',"Identifiera speglingslinjen"),tx('Reflection across y = −x. Swap the coordinates, then negate both.',"Spegling i y = −x. Byt plats på koordinaterna och byt sedan tecken på båda."),
    tx('Multiply the matrix by (x,y) to get (−y,−x). Points on y = −x stay fixed, while points on y = x reverse direction.',"Multiplicera matrisen med (x,y) för att få (−y,−x). Punkter på y = −x ligger stilla, medan punkter på y = x byter riktning."),
    tx('Swapping alone reflects in y = x. Negating both coordinates after that gives the requested transformation.',"Ett rent koordinatbyte speglar i y = x. Teckenbyte på båda koordinaterna därefter ger den efterfrågade avbildningen."));
  add(26,tx('Recognize the double angle',"Känn igen dubbla vinkeln"),tx('Counterclockwise rotation by 2θ. Compose two rotations by θ.',"Moturs rotation med 2θ. Sätt samman två rotationer med θ."),
    tx('Use cos(2θ) = cos²θ − sin²θ and sin(2θ) = 2sinθ cosθ. The given matrix becomes the usual rotation matrix for 2θ.',"Använd cos(2θ) = cos²θ − sin²θ och sin(2θ) = 2sinθ cosθ. Den givna matrisen blir den vanliga rotationsmatrisen för 2θ."),
    tx('Two rotations about the same origin add their angles, so rotating by θ twice gives the same result.',"Två rotationer kring samma origo adderar sina vinklar, så rotation med θ två gånger ger samma resultat."));
  add(27,tx('Connect commuting maps and commuting matrices',"Koppla ihop kommuterande avbildningar och matriser"),tx('Tₐ and Tᵦ commute exactly when AB = BA.',"Tₐ och Tᵦ kommuterar precis när AB = BA."),
    tx('The two composites multiply each input by AB or BA. If the products agree, the maps agree.',"De två sammansättningarna multiplicerar varje indata med AB respektive BA. Om produkterna stämmer överens gör avbildningarna också det."),
    tx('If the maps agree on every input, test the coordinate vectors one at a time. Each test compares the matching columns of AB and BA, so all their entries agree.',"Om avbildningarna stämmer överens för varje indata, pröva koordinatvektorerna en i taget. Varje test jämför motsvarande kolumner i AB och BA, så alla deras element stämmer överens."));
  add(28,tx('Check whether a composite can be inverted',"Kontrollera om en sammansättning kan inverteras"),tx('It is invertible exactly when both factors are invertible.',"Den är inverterbar precis när båda faktorerna är inverterbara."),
    tx('If A and B have inverses, multiply AB by B⁻¹A⁻¹ in either order. The factors cancel to the identity.',"Om A och B har inverser, multiplicera AB med B⁻¹A⁻¹ i båda ordningarna. Faktorerna förkortas till identitetsmatrisen."),
    tx('Conversely, if AB is invertible then Bx = 0 forces ABx = 0, and therefore x = 0. The square matrix B is invertible. Now A = (AB)B⁻¹ is a product of invertible matrices.',"Omvänt: om AB är inverterbar medför Bx = 0 att ABx = 0 och därmed x = 0. Den kvadratiska matrisen B är inverterbar. Nu är A = (AB)B⁻¹ en produkt av inverterbara matriser."));
  add(29,tx('Relate inverse maps and unique solutions',"Koppla ihop inversa avbildningar och entydiga lösningar"),tx('Tₐ has an inverse exactly when every b has exactly one preimage.',"Tₐ har en invers precis när varje b har exakt en urbild."),
    tx('If there is an inverse, x = Tₐ⁻¹(b) exists and is the only possible input. If every b has one preimage, apply that to b = 0.',"Om en invers finns, existerar x = Tₐ⁻¹(b) och är den enda möjliga indatan. Om varje b har en urbild, tillämpa detta på b = 0."),
    tx('Only x = 0 then solves Ax = 0. The square matrix A has an inverse, which defines the inverse map on every vector.',"Då löser bara x = 0 ekvationen Ax = 0. Den kvadratiska matrisen A har en invers som definierar den inversa avbildningen på varje vektor."));
  add('TF',tx('True or false',"Sant eller falskt"),'a F · b T · c T · d F · e T · f F · g T',
    tx('a: an axis projection and the coordinate swap generally depend on the order. b: A acts first, then B, so multiply BA.',"a: projektion på en axel och koordinatbyte beror i allmänhet på ordningen. b: A verkar först, sedan B, så multiplicera BA."),
    tx('c: rotation angles add. d: reflecting twice in the same line produces the identity. e: swapping coordinates twice gives the original pair.',"c: rotationsvinklar adderas. d: två speglingar i samma linje ger identitetsavbildningen. e: två koordinatbyten ger det ursprungliga paret."),
    tx('f: a +90° turn is undone by −90°. g: negating both coordinates twice restores them.',"f: en vridning på +90° görs ogjord av −90°. g: två teckenbyten på båda koordinaterna återställer dem."));
  {
    const rotation=deg=>{const t=deg*Math.PI/180;return [[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]];};
    const a=M.multiply(M.multiply(rotation(33),diag([-1,1])),rotation(47));
    add('T1',tx('Compose a rotation, reflection and rotation',"Sätt samman rotation, spegling och rotation"),tx('a: approximately ',"a: ungefär ")+matrix(a)+tx('\nb: approximately ',"\nb: ungefär ")+M.vector(M.apply(a,[1,1])),
      tx('Write each standard matrix in the order it acts: R(47°), diag(−1,1), then R(33°). The first action belongs farthest right in the product.',"Skriv varje standardmatris i den ordning den verkar: R(47°), diag(−1,1) och sedan R(33°). Den första operationen står längst till höger i produkten."),
      tx('Multiply R(33°) × diag(−1,1) × R(47°). Then add the two entries of each output row to apply the composite matrix to (1,1).',"Multiplicera R(33°) × diag(−1,1) × R(47°). Addera sedan de två elementen på varje utdatarad för att tillämpa den sammansatta matrisen på (1,1)."));
  }

  set='1.8';
  solutions[set]=[];
  function dimensions(number,shapes) {
    add(number,tx('Count the input and output coordinates',"Räkna in- och utdatakoordinater"),
      shapes.map(([rows,columns],i)=>(shapes.length===1?'':tx('Part ',"Del ")+String.fromCharCode(97+i)+': ')+'ℝ^'+columns+' → ℝ^'+rows).join('\n'),
      ...shapes.map(([rows,columns],i)=>(shapes.length===1?'':tx('Part ',"Del ")+String.fromCharCode(97+i)+': ')+
        tx('There are ',"Det finns ")+columns+tx(' input coordinates (one for each column) and '," indatakoordinater (en per kolumn) och ")+rows+tx(' output coordinates (one for each row). The domain is the space of inputs. The codomain is the space the outputs live in.'," utdatakoordinater (en per rad). Definitionsmängden är rummet för indata. Målmängden är rummet där utdata ligger.")));
  }
  [
    [[3,2],[2,3],[3,3],[1,6]],[[4,5],[5,4],[4,4],[3,1]],[[2,2],[3,2]],
    [[3,3],[2,3]],[[2,3],[3,2]],[[2,2],[3,3]],[[2,2],[2,3]],[[2,4],[3,3]],[[3,2]],[[4,3]]
  ].forEach((shapes,i)=>dimensions(i+1,shapes));
  function maps(number,parts,proof=false) {
    const answer=[], steps=[];
    parts.forEach(([a,v],i)=>{
      const label=parts.length>1?tx('Part ',"Del ")+String.fromCharCode(97+i)+': ':'';
      const result=v?M.apply(a,v):null;
      answer.push(label+'A = '+matrix(a)+(result?'\nT('+M.vector(v)+') = '+M.vector(result):''));
      steps.push(label+tx('Use one row per output. In each row, list the coefficients of the input coordinates in their original order. Put 0 in any missing position.',"Använd en rad per utdatakoordinat. Skriv på varje rad indatakoordinaternas koefficienter i ursprunglig ordning. Sätt 0 på varje plats som saknas."));
      a.forEach((row,j)=>steps.push(tx('Output ',"Utdata ")+(j+1)+tx(' has coefficient row '," har koefficientraden ")+matrix([row])+'.'));
      if(v) {
        steps.push(tx('Substitute ',"Sätt in ")+M.vector(v)+tx(' into the coordinate formulas. The same substitutions appear as the products of each matrix row with the input column.'," i koordinatformlerna. Samma insättningar förekommer som produkterna av varje matrisrad med indatakolumnen."));
        a.forEach((row,j)=>steps.push(tx('Output ',"Utdata ")+(j+1)+': '+row.map((n,k)=>'('+M.format(n)+' × '+M.format(v[k])+')').join(' + ')+' = '+M.format(result[j])+'.'));
      }
      if(proof)steps.push(tx('The displayed matrix produces every given output by multiplying the input column. This is the definition of a matrix transformation.',"Den visade matrisen ger varje angiven utdata genom multiplikation med indatakolumnen. Detta är definitionen av en matrisavbildning."));
    });
    add(number,proof?tx('Prove this is a matrix transformation',"Bevisa att detta är en matrisavbildning"):tx('Build or apply the standard matrix',"Skriv eller använd standardmatrisen"),answer.join('\n'),...steps);
  }
  maps(11,[[[[2,-3,1],[3,5,-1]]],[[[7,2,-8],[0,-1,5],[4,7,-1]]]]);
  maps(12,[[[[-1,1],[3,-2],[5,-7]]],[[[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,1,1,1]]]]);
  maps(13,[[[[0,1],[-1,0],[1,3],[1,-1]]],[[[7,2,-1,1],[0,1,1,0],[-1,0,0,0]]],
    [Array.from({length:5},()=>[0,0,0])],[[[0,0,0,1],[1,0,0,0],[0,0,1,0],[0,1,0,0],[1,0,-1,0]]]]);
  maps(14,[[[[2,-1],[1,1]]],[diag([1,1])],[[[1,2,1],[1,5,0],[0,0,1]]],[diag([4,7,-8])]]);
  maps(15,[[[[3,5,-1],[4,-1,1],[3,2,-1]],[-1,2,4]]]);
  maps(16,[[[[2,3,-5,-1],[1,-5,2,-3]],[1,-1,2,4]]]);
  maps(17,[[[[-1,1],[0,1]],[-1,4]],[[[2,-1,1],[0,1,1],[0,0,0]],[2,1,-3]]]);
  maps(18,[[[[2,-1],[1,1]],[-2,2]],[[[1,0,0],[0,1,-1],[0,1,0]],[1,0,5]]]);
  maps(19,[[[[1,2],[3,4]],[3,-2]],[[[-1,2,0],[3,1,5]],[-1,1,3]]]);
  add(20,tx('Multiply using symbolic coordinates',"Multiplicera med symboliska koordinater"),'a: (−2x₁+x₂+4x₃, 3x₁+5x₂+7x₃, 6x₁−x₃).\nb: (−x₁+x₂, 2x₁+4x₂, 7x₁+8x₂).',
    tx('Read each row in order. Multiply the first entry by x₁, the second by x₂, and the third by x₃ if present. Add those terms and write the result in the corresponding row of the output column.',"Läs varje rad i ordning. Multiplicera det första elementet med x₁, det andra med x₂ och det tredje med x₃ om det finns. Addera termerna och skriv resultatet på motsvarande rad i utdatakolumnen."));
  maps(21,[[[[2,1],[1,-1]]],[[[1,0,0],[0,0,1],[1,1,0]]]],true);
  maps(22,[[[[1,1,0],[0,1,1],[1,0,0]]],[[[0,1],[1,0]]]],true);
  add(23,tx('Test whether scaling is preserved',"Testa om skalning bevaras"),tx('Neither is a matrix transformation.',"Ingen av dem är en matrisavbildning."),tx('A matrix map must satisfy T(2v) = 2T(v), because A(2v) = 2Av.',"En matrisavbildning måste uppfylla T(2v) = 2T(v), eftersom A(2v) = 2Av."),
    tx('a: for v = (1,0), the first output is 4 after doubling the input but 2 after doubling the output.',"a: för v = (1,0) blir första utdatan 4 när indatan dubbleras men 2 när utdatan dubbleras."),
    tx('b: for v = (1,0,1), the third output is 4 after doubling the input but 2 after doubling the output.',"b: för v = (1,0,1) blir tredje utdatan 4 när indatan dubbleras men 2 när utdatan dubbleras."));
  add(24,tx('Find a failed test in each case',"Hitta ett test som misslyckas i varje fall"),tx('Neither is a matrix transformation.',"Ingen av dem är en matrisavbildning."),tx('a: the input zero gives (0,1), while a matrix times zero always gives zero.',"a: nollindata ger (0,1), medan en matris gånger noll alltid ger noll."),
    tx('b: for v = (0,0,1), the third coordinate of T(4v) is 2, but of 4T(v) is 4. The formula also fails to give a real output when x₃ is negative.',"b: för v = (0,0,1) är tredje koordinaten i T(4v) lika med 2, men i 4T(v) är den 4. Formeln ger inte heller reell utdata när x₃ är negativt."));
  add(25,tx('Check the intercept',"Kontrollera konstanttermen"),tx('Yes exactly when b = 0.',"Ja, precis när b = 0."),tx('At x = 0, f(0) = b. A matrix map must send zero to zero, so b must be zero.',"Vid x = 0 är f(0) = b. En matrisavbildning måste skicka noll till noll, så b måste vara noll."),
    tx('If b = 0 then f(x) = mx, which is multiplication by the one-entry matrix [m].',"Om b = 0 är f(x) = mx, vilket är multiplikation med matrisen [m] som har ett element."));
  add(26,tx('Compare two constant maps',"Jämför två konstanta avbildningar"),tx('The constant-zero map is a matrix operator. The constant-(1,1) map is not.',"Den konstanta nollavbildningen är en matrisoperator. Den konstanta (1,1)-avbildningen är det inte."),
    tx('The 2 × 2 zero matrix sends every input to (0,0). The second map sends the zero input to (1,1), which no matrix can do.',"Nollmatrisen av storlek 2 × 2 skickar varje indata till (0,0). Den andra avbildningen skickar nollindata till (1,1), vilket ingen matris kan göra."));
  function basisImages(number,columns,v) {
    const a=columns[0].map((_,i)=>columns.map(col=>col[i])), result=M.apply(a,v);
    add(number,tx('Use the basis images as columns',"Använd basvektorernas bilder som kolumner"),'A = '+matrix(a)+'\nT(x) = '+M.vector(result),
      tx('Each standard basis vector has a single 1. Multiplying A by that vector selects the matching column. Put the given images into the columns in order.',"Varje standardbasvektor har en enda 1:a. Multiplikation av A med den vektorn väljer motsvarande kolumn. Placera de givna bilderna i kolumnerna i ordning."),
      tx('The input ',"Indatan ")+M.vector(v)+tx(' gives the weights for these columns. Add '," ger vikterna för dessa kolumner. Addera ")+v.map((n,i)=>M.format(n)+' × '+M.vector(columns[i])).join(' + ')+tx(' to get '," för att få ")+M.vector(result)+'.');
  }
  basisImages(27,[[1,3,0],[0,0,1],[4,-3,-1]],[2,1,0]);
  basisImages(28,[[2,1,3],[-3,-1,0],[1,0,2]],[3,2,1]);
  const swap=[[0,1],[1,0]], reflections2=[diag([1,-1]),diag([-1,1]),swap];
  const reflections3=[diag([1,1,-1]),diag([1,-1,1]),diag([-1,1,1])];
  const project2=[diag([1,0]),diag([0,1])], project3=[diag([1,1,0]),diag([1,0,1]),diag([0,1,1])];
  function geometry(number,a,v,description) {
    const output=typeof v[0]==='number'?a.map(mat=>M.vector(M.apply(mat,v))):a.map(mat=>'('+describe(mat,v)+')');
    add(number,tx('Apply the geometric matrices',"Använd de geometriska matriserna"),output.map((value,i)=>tx('Part ',"Del ")+String.fromCharCode(97+i)+': '+value).join('\n'),
      description,...a.map((mat,i)=>tx('Part ',"Del ")+String.fromCharCode(97+i)+': '+matrix(mat)+tx(' sends ('," skickar (")+v.join(', ')+tx(') to ',") till ")+output[i]+tx('. Multiply each row by the coordinate column.',". Multiplicera varje rad med koordinatkolumnen.")));
  }
  geometry(29,reflections2,[-1,2],tx('Reflection keeps the coordinate along the mirror line and reverses the perpendicular one. Reflection across y = x swaps coordinates.',"En spegling behåller koordinaten längs speglingslinjen och byter tecken på den vinkelräta. Spegling i y = x byter plats på koordinaterna."));
  geometry(30,reflections2,['a','b'],tx('Negate the coordinate perpendicular to the relevant axis. Across y = x, swap a and b.',"Byt tecken på koordinaten som är vinkelrät mot den aktuella axeln. Vid spegling i y = x byter a och b plats."));
  geometry(31,reflections3,[2,-5,3],tx('Negate the coordinate perpendicular to the mirror plane.',"Byt tecken på koordinaten vinkelrät mot speglingsplanet."));
  geometry(32,reflections3,['a','b','c'],tx('Only the coordinate perpendicular to the mirror plane changes sign.',"Bara koordinaten som är vinkelrät mot speglingsplanet byter tecken."));
  geometry(33,project2,[2,-5],tx('Keep the coordinate along the selected axis and set the other one to zero.',"Behåll koordinaten längs den valda axeln och sätt den andra till noll."));
  geometry(34,project2,['a','b'],tx('An axis projection removes the perpendicular coordinate.',"Projektion på en axel tar bort den vinkelräta koordinaten."));
  geometry(35,project3,[-2,1,3],tx('A plane projection keeps the two coordinates named in the plane and sets the remaining coordinate to zero.',"Projektion på ett plan behåller de två koordinater som namnger planet och sätter den återstående koordinaten till noll."));
  geometry(36,project3,['a','b','c'],tx('Keep the two coordinates in the plane and erase the perpendicular one.',"Behåll de två koordinaterna i planet och ta bort den vinkelräta."));
  add(37,tx('Rotate the vector through each angle',"Rotera vektorn med varje vinkel"),'a: ((3√3+4)/2, (3−4√3)/2).\nb: ((3−4√3)/2, (−3√3−4)/2).\nc: (7√2/2, −√2/2).\nd: (4,3).',
    tx('A rotation through θ sends (x,y) to (x cos θ − y sin θ, x sin θ + y cos θ). With (3,−4) this is (3 cos θ + 4 sin θ, 3 sin θ − 4 cos θ).',"En rotation med θ skickar (x,y) till (x cos θ − y sin θ, x sin θ + y cos θ). Med (3,−4) blir detta (3 cos θ + 4 sin θ, 3 sin θ − 4 cos θ)."),
    tx('a uses cosine √3/2 and sine 1/2. b uses cosine 1/2 and sine −√3/2. Insert these into both coordinates.',"a använder cosinus √3/2 och sinus 1/2. b använder cosinus 1/2 och sinus −√3/2. Sätt in dessa i båda koordinaterna."),
    tx('c uses √2/2 for both sine and cosine. d uses cosine 0 and sine 1.',"c använder √2/2 för både sinus och cosinus. d använder cosinus 0 och sinus 1."));
  add(38,tx('Write both rotation formulas',"Skriv båda rotationsformlerna"),'a: (v₁ cos α − v₂ sin α, v₁ sin α + v₂ cos α).\nb: (v₁ cos α + v₂ sin α, −v₁ sin α + v₂ cos α).',
    tx('Multiply the rotation matrix by the vector. Use the first row for the first coordinate and the second row for the second.',"Multiplicera rotationsmatrisen med vektorn. Använd den första raden för den första koordinaten och den andra raden för den andra."),
    tx('For a negative angle, cosine is unchanged and sine changes sign. Substitute these identities into the same formula.',"För en negativ vinkel är cosinus oförändrat och sinus byter tecken. Sätt in dessa identiteter i samma formel."));
  add(39,tx('Add the two basis images',"Addera de två basbilderna"),'(a+c, b+d).',tx('Write (1,1) = e₁ + e₂. A linear map preserves addition, so add (a,b) and (c,d) coordinate by coordinate.',"Skriv (1,1) = e₁ + e₂. En linjär avbildning bevarar addition, så addera (a,b) och (c,d) koordinat för koordinat."));
  add(40,tx('Use the two columns of the matrix',"Använd matrisens två kolumner"),'a: (ka,kc).\nb: (ka+lb,kc+ld).',tx('The first column is (a,c) and the second is (b,d). Multiply the first by k. In part b also multiply the second by l and add the two vectors.',"Den första kolumnen är (a,c) och den andra är (b,d). Multiplicera den första med k. I del b multiplicerar du även den andra med l och adderar vektorerna."));
  add(41,tx('Read and combine three columns',"Läs och kombinera tre kolumner"),'a: (−1,2,4), (3,1,5), (0,2,−3).\nb: (2,5,6).\nc: (0,14,−21).',
    tx('A basis vector selects its matching column. In b all three weights are 1, so add the three columns coordinate by coordinate. In c multiply column 3 by 7.',"En basvektor väljer motsvarande kolumn. I b är alla tre vikter 1, så addera de tre kolumnerna koordinat för koordinat. I c multiplicerar du kolumn 3 med 7."));
  geometry(42,project3,[1,2,3],tx('For the xy, xz and yz planes in that order, keep only the coordinates in the plane.',"För planen xy, xz och yz i den ordningen, behåll bara koordinaterna i planet."));
  geometry(43,reflections3,[1,2,3],tx('For xy, xz and yz respectively, flip the perpendicular z, y and x coordinate.',"För xy, xz respektive yz, byt tecken på den vinkelräta koordinaten z, y respektive x."));
  add(44,tx('Interpret the transposed rotation',"Tolka den transponerade rotationen"),tx('Aᵀ rotates through −θ.',"Aᵀ roterar med −θ."),tx('The diagonal cosine entries stay fixed. Swapping the off-diagonal entries changes the sign of the sine terms.',"Cosinuselementen på diagonalen är oförändrade. Att byta plats på elementen utanför diagonalen byter tecken på sinustermerna."),
    tx('That is exactly what happens when θ is replaced by −θ. The transpose reverses the original turn.',"Det är exakt vad som händer när θ ersätts med −θ. Transponeringen vänder den ursprungliga rotationen."));
  function findMap(number,x,y) {
    const r=M.inverse(x), a=M.multiply(y,r.value);
    add(number,tx('Recover the matrix from its known outputs',"Återskapa matrisen från dess kända utdata"),matrix(a),
      tx('Put the known inputs in the columns of X and their corresponding images in the columns of Y. Then AX = Y.',"Placera de kända indatavektorerna i X:s kolumner och motsvarande bilder i Y:s kolumner. Då är AX = Y."),
      tx('Here X = ',"Här är X = ")+matrix(x)+tx(' and Y = '," och Y = ")+matrix(y)+'.',...r.steps,
      tx('Multiply on the right by X⁻¹ to get A = YX⁻¹. Check that multiplying A by each original input returns its given image.',"Multiplicera från höger med X⁻¹ för att få A = YX⁻¹. Kontrollera att A gånger varje ursprunglig indatavektor ger dess angivna bild."));
  }
  findMap(45,[[1,2],[1,3]],[[1,-2],[-2,5]]);
  findMap(46,[[1,1,-3],[0,1,-1],[2,1,2]],[[2,1,-5],[-3,3,-11],[10,8,7]]);
  add(47,tx('Describe the motion and test zero',"Beskriv rörelsen och testa noll"),tx('Rotate about the origin by θ, then translate by x₀. This is not a matrix transformation.',"Rotera kring origo med θ och förskjut sedan med x₀. Detta är inte en matrisavbildning."),
    tx('First Rθx performs the rotation. Adding x₀ shifts every result by that same vector.',"Först utför Rθx rotationen. Addition av x₀ förskjuter varje resultat med samma vektor."),
    tx('The origin is sent to x₀, which is nonzero. Multiplying any matrix by zero would give zero.',"Origo skickas till x₀, som inte är noll. En matris multiplicerad med noll skulle ge noll."));
  geometry(48,[[[1,0,0],[0,0,1],[0,1,0]],[[0,0,1],[0,1,0],[1,0,0]],[[0,1,0],[1,0,0],[0,0,1]]],['x','y','z'],
    tx('Read each coordinate after the swap in the figure. Each output row has a 1 in the column it copies.',"Läs varje koordinat efter bytet i figuren. Varje utdatarad har en 1:a i den kolumn den kopierar."));
  solutions[set].at(-1).answer='a: [1 0 0] [0 0 1] [0 1 0].\nb: [0 0 1] [0 1 0] [1 0 0].\nc: [0 1 0] [1 0 0] [0 0 1].';
  add(49,tx('Recognize the double-angle matrix',"Känn igen matrisen för dubbla vinkeln"),tx('It rotates a vector counterclockwise by 2θ, with a negative angle interpreted clockwise.',"Den roterar en vektor moturs med 2θ, där en negativ vinkel tolkas som medurs."),
    tx('Replace cos²θ − sin²θ by cos(2θ) and 2sinθ cosθ by sin(2θ). The four entries now match the standard rotation matrix at angle 2θ.',"Ersätt cos²θ − sin²θ med cos(2θ) och 2sinθ cosθ med sin(2θ). De fyra elementen stämmer nu med standardrotationsmatrisen för vinkeln 2θ."));
  add(50,tx('Prove a property and test the reverse claim',"Bevisa en egenskap och testa omvändningen"),tx('a: T(0) = 0 for every matrix map.\nb: T(x) = x² is a counterexample to the reverse claim.',"a: T(0) = 0 för varje matrisavbildning.\nb: T(x) = x² är ett motexempel till omvändningen."),
    tx('a: write T(x) = Ax. In each row of A0 every product is zero, so the output is zero.',"a: skriv T(x) = Ax. I varje rad av A0 är varje produkt noll, så utdatan är noll."),
    tx('b: squaring sends 0 to 0. It sends 2 to 4, whereas twice its output at 1 is 2. Matrix maps preserve multiplication by 2, so squaring cannot be one.',"b: kvadrering skickar 0 till 0. Den skickar 2 till 4, medan två gånger utdatan vid 1 är 2. Matrisavbildningar bevarar multiplikation med 2, så kvadrering kan inte vara en sådan."));
  add('TF',tx('True or false',"Sant eller falskt"),'a F · b F · c T · d F · e T · f F · g F',
    tx('a and b: the number of columns is the input dimension and the number of rows is the output dimension.',"a och b: antalet kolumner är indatadimensionen och antalet rader är utdatadimensionen."),
    tx('c: choose x = 0 or use the zero map, so both sides are zero. d: every linear map between these coordinate spaces has a standard matrix formed by its basis images.',"c: välj x = 0 eller använd nollavbildningen, så är båda sidor noll. d: varje linjär avbildning mellan dessa koordinatrum har en standardmatris som bildas av dess basbilder."),
    tx('e: each basis image is one column of A, so all columns must be zero. f: every matrix map has T(−x) = −T(x) by scalar multiplication.',"e: varje basbild är en kolumn i A, så alla kolumner måste vara noll. f: varje matrisavbildning har T(−x) = −T(x) genom skalärmultiplikation."),
    tx('g: the zero input is mapped to b ≠ 0, which a matrix cannot do.',"g: nollindata avbildas på b ≠ 0, vilket en matris inte kan göra."));

  const transpose=a=>a[0].map((_,j)=>a.map(row=>row[j]));
  const scale=(k,a)=>a.map(row=>row.map(n=>k*n));
  const sum=(a,b)=>a.map((row,i)=>row.map((n,j)=>n+b[i][j]));
  const trace=a=>a.reduce((s,row,i)=>s+row[i],0);
  const unit=n=>diag(Array(n).fill(1));
  const label=i=>String.fromCharCode(97+i);
  set='1.3';
  {
    const data={
      A:[[3,0],[-1,2],[1,1]], B:[[4,-1],[0,2]], C:[[1,4,2],[3,1,5]],
      D:[[1,5,2],[-1,0,1],[3,2,4]], E:[[6,1,3],[-1,1,2],[4,1,3]]
    };
    function evaluate(x) {
      if(typeof x==='string')return {value:data[x],name:x,steps:[]};
      const [op,a,b]=x;
      const first=evaluate(a), second=Array.isArray(b)||typeof b==='string'?evaluate(b):null;
      const v=first.value, w=second?.value, n=first.name, m=second?.name;
      const steps=[...first.steps,...(second?.steps||[])];
      let name, value, action;
      if(op==='t'){name='('+n+')ᵀ';if(v){value=transpose(v);action=tx('Turn rows into columns.',"Gör rader till kolumner.");}}
      if(op==='tr'){
        name='tr('+n+')';
        if(v&&v.length===v[0].length){value=trace(v);action=tx('Add the main diagonal: ',"Addera huvuddiagonalen: ")+v.map((row,i)=>M.format(row[i])).join(' + ')+'.';}
        else if(v)action=tx('Trace requires a square matrix. This one has ',"Spåret kräver en kvadratisk matris. Denna har ")+v.length+tx(' rows and '," rader och ")+v[0].length+tx(' columns.'," kolumner.");
      }
      if(op==='s'){
        name=b+'('+n+')';
        if(typeof v==='number'){value=b*v;action=tx('Multiply ',"Multiplicera ")+b+tx(' by '," med ")+M.format(v)+'.';}
        else if(v){value=scale(b,v);action=tx('Multiply every entry by ',"Multiplicera varje element med ")+b+tx('. For example, the top-left entry is ',". Till exempel är elementet överst till vänster ")+b+' × '+M.format(v[0][0])+'.';}
      }
      if(op==='+'||op==='-'){
        name='('+n+' '+op+' '+m+')';
        if(v&&w){
          if(v.length===w.length&&v[0].length===w[0].length){
            value=sum(v,op==='+'?w:scale(-1,w));
            action=tx('Combine entries in matching positions. The top-left calculation is ',"Kombinera element på motsvarande positioner. Beräkningen överst till vänster är ")+M.format(v[0][0])+' '+op+' '+M.format(w[0][0])+'.';
          } else action=tx('Addition and subtraction require matching dimensions. Here the sizes are ',"Addition och subtraktion kräver samma dimensioner. Här är storlekarna ")+v.length+' × '+v[0].length+tx(' and '," och ")+w.length+' × '+w[0].length+'.';
        }
      }
      if(op==='*'){
        name='('+n+m+')';
        if(v&&w){
          if(v[0].length===w.length){
            value=M.multiply(v,w);
            action=tx('Multiply rows by columns.\n',"Multiplicera rader med kolumner.\n")+v.flatMap((row,i)=>w[0].map((_,j)=>tx('Entry (',"Element (")+(i+1)+','+(j+1)+'): '+row.map((num,k)=>'('+M.format(num)+' × '+M.format(w[k][j])+')').join(' + ')+' = '+M.format(value[i][j])+'.')).join('\n');
          } else action=tx('The first matrix has ',"Den första matrisen har ")+v[0].length+tx(' columns, but the second has '," kolumner, men den andra har ")+w.length+tx(' rows. These counts must match.'," rader. Dessa antal måste vara lika.");
        }
      }
      const display=value===undefined?tx('undefined',"odefinierad"):typeof value==='number'?M.format(value):matrix(value);
      steps.push(name+': '+(action||tx('A required inner expression is undefined.',"Ett nödvändigt inre uttryck är odefinierat."))+tx(' Result: '," Resultat: ")+display+'.');
      return {name,value,steps,display};
    }
    const t=a=>['t',a], tr=a=>['tr',a], s=(n,a)=>['s',a,n], plus=(a,b)=>['+',a,b], minus=(a,b)=>['-',a,b], times=(a,b)=>['*',a,b];
    const A='A',B='B',D='D',E='E',F='C';
    const parts=[
      [plus(D,E),minus(D,E),s(5,A),s(-7,F),minus(s(2,B),F),minus(s(4,E),s(2,D)),s(-3,plus(D,s(2,E))),minus(A,A),tr(D),tr(minus(D,s(3,E))),s(4,tr(s(7,B))),tr(A)],
      [plus(s(2,A),t(F)),minus(D,t(E)),t(minus(D,E)),plus(t(B),s(5,t(F))),minus(s(.5,t(F)),s(.25,A)),minus(B,t(B)),
        minus(s(2,t(E)),s(3,t(D))),t(minus(s(2,t(E)),s(3,t(D)))),times(times(F,D),E),times(F,times(B,A)),tr(times(D,t(E))),tr(times(B,F))],
      [times(A,B),times(B,A),times(s(3,E),D),times(times(A,B),F),times(A,times(B,F)),times(F,t(F)),
        t(times(D,A)),times(times(t(F),B),t(A)),tr(times(D,t(D))),tr(minus(s(4,t(E)),D)),tr(plus(times(t(F),t(A)),s(2,t(E)))),tr(times(t(times(E,t(F))),A))],
      [times(minus(s(2,t(D)),E),A),plus(times(s(4,B),F),s(2,B)),plus(t(s(-1,times(A,F))),s(5,t(D))),
        t(minus(times(B,t(A)),s(2,F))),times(t(B),minus(times(F,t(F)),times(t(A),A))),minus(times(t(D),t(E)),t(times(E,D)))]
    ];
    parts.forEach((items,i)=>{
      const results=items.map(evaluate);
      add(i+3,tx('Calculate each matrix expression',"Beräkna varje matrisuttryck"),results.map((r,j)=>label(j)+': '+r.display).join('\n'),
        tx('Work inside parentheses first. A transpose switches rows and columns. A trace adds diagonal entries of a square matrix.',"Arbeta först inuti parenteserna. Transponering byter rader och kolumner. Spåret adderar en kvadratisk matris diagonalelement."),
        ...results.flatMap((r,j)=>[tx('Part ',"Del ")+label(j)+':',...r.steps]));
    });
  }
  {
    const a=[[3,-2,7],[6,5,4],[0,4,9]], b=[[6,-2,4],[0,1,3],[7,7,5]];
    const select=(n,parts)=>{
      const answer=[],steps=[];
      parts.forEach(([x,y,direction,i],p)=>{
        const index=i-1, row=direction===tx('row',"rad");
        const weights=row?x[index]:transpose(y)[index], sources=row?y:transpose(x);
        const out=weights.map((_,j)=>M.dot(weights,sources.map(r=>r[j])));
        answer.push(label(p)+': '+M.vector(out));
        steps.push(tx('Part ',"Del ")+label(p)+tx(': the selected ',": vald ")+direction+tx(' gives weights '," ger vikterna ")+M.vector(weights)+tx('. Use those to combine the ',". Använd dem för att kombinera ")+direction+tx('s of the ',"er i den ")+(row?tx('right',"högra"):tx('left',"vänstra"))+tx(' matrix: '," matrisen: ")+weights.map((n,j)=>M.format(n)+' × '+M.vector(sources[j])).join(' + ')+' = '+M.vector(out)+'.');
      });
      add(n,tx('Find only the requested row or column',"Bestäm bara den efterfrågade raden eller kolumnen"),answer.join('\n'),...steps);
    };
    select(7,[[a,b,tx('row',"rad"),1],[a,b,tx('row',"rad"),3],[a,b,tx('column',"kolumn"),2],[b,a,tx('column',"kolumn"),1],[a,a,tx('row',"rad"),3],[a,a,tx('column',"kolumn"),3]]);
    select(8,[[a,b,tx('column',"kolumn"),1],[b,b,tx('column',"kolumn"),3],[b,b,tx('row',"rad"),2],[a,a,tx('column',"kolumn"),1],[a,b,tx('column',"kolumn"),3],[b,a,tx('row',"rad"),1]]);
    function columnCombinations(n,parts){
      const formulas=parts.flatMap(([x,y],p)=>transpose(y).map((w,j)=>tx('Part ',"Del ")+label(p)+tx(', column ',", kolumn ")+(j+1)+': '+
        w.map((v,k)=>M.format(v)+' × '+M.vector(transpose(x)[k])).join(' + ')));
      add(n,tx('Write columns as weighted sums',"Skriv kolumner som viktade summor"),formulas.join('\n'),
        tx('For column j, read the weights down column j of the right factor. Multiply the left factor’s first column by the first weight, its second by the second, and so on. Add the weighted columns.',"För kolumn j läser du vikterna nedåt i högerfaktorns kolumn j. Multiplicera vänsterfaktorns första kolumn med den första vikten, den andra med den andra och så vidare. Addera de viktade kolumnerna."),
        ...formulas);
    }
    columnCombinations(9,[[a,a],[b,b]]);
    columnCombinations(10,[[a,b],[b,a]]);
  }
  function equationFormat(n,parts,toMatrix) {
    const output=parts.map(([a,b,names],i)=>{
      const terms=a.map(row=>describe([row],names));
      return tx('Part ',"Del ")+label(i)+': '+(toMatrix?matrix(a)+' × ('+names.join(', ')+')ᵀ = '+M.vector(b)+'ᵀ':terms.map((f,j)=>f+' = '+b[j]).join('\n'));
    });
    add(n,toMatrix?tx('Write one matrix equation',"Skriv en matrisekvation"):tx('Write the individual equations',"Skriv de enskilda ekvationerna"),output.join('\n'),
      toMatrix?tx('Write the variables in a column. Copy the coefficient of each variable into its column, using zero for any missing term. Put the right-hand numbers in a separate column.',"Skriv variablerna i en kolumn. Kopiera varje variabels koefficient till dess kolumn och använd noll för saknade termer. Sätt högerledens tal i en separat kolumn."):
        tx('Multiply each coefficient row by the variable column. The result of each row is equal to the matching entry of the right-hand column.',"Multiplicera varje koefficientrad med variabelkolumnen. Resultatet för varje rad är lika med motsvarande element i högerledskolumnen."),...output);
  }
  const x3=['x₁','x₂','x₃'], x4=[...x3,'x₄'];
  equationFormat(11,[[[[2,-3,5],[9,-1,1],[1,5,4]],[7,-1,0],x3],
    [[[4,0,-3,1],[5,1,0,-8],[2,-5,9,-1],[0,3,-1,7]],[1,3,0,2],x4]],true);
  equationFormat(12,[[[[1,-2,3],[2,1,0],[0,-3,4],[1,0,1]],[-3,0,1,5],x3],
    [[[3,3,3],[-1,-5,-2],[0,-4,1]],[-3,3,0],x3]],true);
  equationFormat(13,[[[[5,6,-7],[-1,-2,3],[0,4,-1]],[2,0,3],x3],[[[1,1,1],[2,3,0],[5,-3,-6]],[2,2,-9],['x','y','z']]],false);
  equationFormat(14,[[[[3,-1,2],[4,3,7],[-2,1,5]],[2,-1,4],x3],[[[3,-2,0,1],[5,0,2,-2],[3,1,4,7],[-2,5,1,6]],[0,0,0,0],['w','x','y','z']]],false);
  add(15,tx('Multiply from the right',"Multiplicera från höger"),'k = −1.',tx('The middle matrix times the right column gives (k+1,k+2,−1).',"Den mittersta matrisen gånger högerkolumnen ger (k+1,k+2,−1)."),
    tx('Multiply by the left row to get k(k+1)+(k+2)−1 = k²+2k+1. Factor this as (k+1)² and set it to zero.',"Multiplicera med vänsterraden och få k(k+1)+(k+2)−1 = k²+2k+1. Faktorisera detta som (k+1)² och sätt det lika med noll."));
  add(16,tx('Find both roots',"Bestäm båda rötterna"),tx('k = −2 or k = −10.',"k = −2 eller k = −10."),tx('The middle matrix times the right column gives (6,4+3k,6+k).',"Den mittersta matrisen gånger högerkolumnen ger (6,4+3k,6+k)."),
    tx('Multiply by the left row to get 12+8+6k+6k+k² = k²+12k+20. The factorization (k+2)(k+10)=0 gives both values.',"Multiplicera med vänsterraden och få 12+8+6k+6k+k² = k²+12k+20. Faktoriseringen (k+2)(k+10)=0 ger båda värdena."));
  function outerProducts(number,a,b){
    const factors=transpose(a).map((col,k)=>({col,row:b[k],value:col.map(n=>b[k].map(w=>n*w))}));
    add(number,tx('Expand by columns times rows',"Utveckla som kolumner gånger rader"),factors.map(({value})=>matrix(value)).join(' + ')+' = '+matrix(M.multiply(a,b)),
      tx('Pair column 1 of A with row 1 of B, column 2 with row 2, and so on. In each pair, multiply each entry of the column by the entire row.',"Para ihop kolumn 1 i A med rad 1 i B, kolumn 2 med rad 2 och så vidare. I varje par multiplicerar du varje element i kolumnen med hela raden."),
      ...factors.map(({col,row,value},i)=>tx('Pair ',"Par ")+(i+1)+': '+M.vector(col)+tx(' as a column times '," som kolumn gånger ")+M.vector(row)+tx(' as a row gives '," som rad ger ")+matrix(value)+'.'),
      tx('Add the resulting matrices entry by entry.',"Addera de resulterande matriserna element för element."));
  }
  outerProducts(17,[[4,-3],[2,-1]],[[0,1,2],[-2,3,1]]);
  outerProducts(18,[[0,-2],[4,-3]],[[1,4,1],[-3,0,2]]);
  outerProducts(19,[[1,2,3],[4,5,6]],[[1,2],[3,4],[5,6]]);
  outerProducts(20,[[0,4,2],[1,-2,5]],[[2,-1],[4,0],[1,-1]]);
  const example=[[1,3,-2,0,2,0],[2,6,-5,-2,4,-3],[0,0,5,10,0,15],[2,6,0,8,4,18]];
  linear(21,example.map((row,i)=>[...row,[0,-1,5,6][i]]),tx('Separate the constant vector from the parameters',"Skilj konstantvektorn från parametrarna"),
    [tx('Use the equations of Example 5. A parameter is any number we can choose freely. Group the coefficients of each parameter into a separate vector.',"Använd ekvationerna i exempel 5. En parameter är ett tal som vi får välja fritt. Samla koefficienterna för varje parameter i en egen vektor.")]);
  linear(22,example.map(row=>[...row,0]),tx('Separate the free directions in the homogeneous example',"Skilj ut de fria riktningarna i det homogena exemplet"),
    [tx('Use the same coefficient rows with zeros on the right. Group the terms containing each free parameter into one vector.',"Använd samma koefficientrader med nollor till höger. Samla termerna med varje fri parameter i en vektor.")]);
  linear(23,[[1,0,0,0,4],[0,0,-2,1,3],[0,0,2,1,-1],[1,1,0,0,-2]],tx('Set corresponding entries equal',"Sätt motsvarande element lika"),[tx('Match the four positions. The unknowns in order are a,b,c,d.',"Jämför de fyra positionerna. De obekanta i ordning är a,b,c,d.")]);
  linear(24,[[1,-1,0,0,8],[1,1,0,0,1],[0,0,1,3,7],[0,0,-1,2,6]],tx('Match and solve the four entries',"Jämför och lös de fyra elementen"),[tx('Match the four positions. Read the final coordinates in order a,b,c,d.',"Jämför de fyra positionerna. Läs slutkoordinaterna i ordningen a,b,c,d.")]);
  add(25,tx('Track a zero row and a zero column',"Följ en nollrad och en nollkolumn"),tx('A zero row of A stays zero in AB. A zero column of B stays zero in AB.',"En nollrad i A förblir noll i AB. En nollkolumn i B förblir noll i AB."),
    tx('Every entry of row i of AB comes from dotting row i of A with a column of B. With a zero row, every product is zero.',"Varje element på rad i i AB kommer från skalärprodukten av rad i i A med en kolumn i B. Med en nollrad blir varje produkt noll."),
    tx('Every entry of column j of AB uses column j of B. A zero column there makes all those dot products zero.',"Varje element i kolumn j i AB använder kolumn j i B. En nollkolumn där gör alla dessa skalärprodukter noll."));
  add(26,tx('Place independent symbols only where allowed',"Placera oberoende symboler bara där de är tillåtna"),tx('a diagonal · b upper triangular · c lower triangular · d main diagonal and the two neighboring diagonals',"a diagonal · b övre triangulär · c undre triangulär · d huvuddiagonalen och de två närliggande diagonalerna"),
    ...[
      ['a',(i,j)=>i===j],['b',(i,j)=>i<=j],['c',(i,j)=>i>=j],['d',(i,j)=>Math.abs(i-j)<=1]
    ].map(([part,ok])=>tx('Part ',"Del ")+part+': '+Array.from({length:6},(_,i)=>'['+Array.from({length:6},(_,j)=>ok(i,j)?'a'+(i+1)+(j+1):'0').join(' ')+']').join(' ')),
    tx('Each symbol may be chosen independently. The zero positions follow the condition on the row and column indices.',"Varje symbol får väljas oberoende. Nollpositionerna följer villkoret på rad- och kolumnindex."));
  add(27,tx('Read the coefficient matrix from the output',"Läs koefficientmatrisen från utdatan"),tx('Exactly one: [1 1 0] [1 −1 0] [0 0 0].',"Exakt en: [1 1 0] [1 −1 0] [0 0 0]."),
    tx('The first output is x+y, so its coefficients are 1,1,0. The second has 1,−1,0. The third is zero.',"Första utdatan är x+y, så koefficienterna är 1,1,0. Den andra har 1,−1,0. Den tredje är noll."),
    tx('Each coefficient can be determined by setting its input to 1 and the other two to 0. Therefore no other matrix can work.',"Varje koefficient kan bestämmas genom att sätta dess indata till 1 och de andra två till 0. Därför kan ingen annan matris fungera."));
  add(28,tx('Explain why a product of variables cannot appear',"Förklara varför en produkt av variabler inte kan förekomma"),tx('No such matrix.',"Ingen sådan matris finns."),tx('A matrix’s first output must be ax+by+cz. Testing the three single-coordinate inputs forces a=b=c=0.',"En matris första utdata måste vara ax+by+cz. Test med de tre enskilda koordinatindata tvingar a=b=c=0."),
    tx('But testing (1,1,0) gives xy=1, contradicting that zero row.',"Men test med (1,1,0) ger xy=1, vilket motsäger nollraden."));
  add(29,tx('Explore square roots of matrices',"Undersök kvadratrötter till matriser"),tx('a: ±[1 1] [1 1].\nb: exactly four, diag(±√5, ±3).\nc: some real 2 × 2 matrices have no real square root.',"a: ±[1 1] [1 1].\nb: exakt fyra, diag(±√5, ±3).\nc: vissa reella 2 × 2-matriser saknar reell kvadratrot."),
    tx('a: multiplying the all-ones 2 × 2 matrix by itself gives 2 in all four positions. Negating both factors leaves the square unchanged.',"a: en 2 × 2-matris med bara ettor multiplicerad med sig själv ger 2 på alla fyra positioner. Om båda faktorerna byter tecken är kvadraten oförändrad."),
    tx('b: any B with B²=A commutes with A, since BA=B³=AB. With distinct diagonal entries 5 and 9, comparing the off-diagonal entries of BA and AB forces the off-diagonal entries of B to be zero. Then square the two diagonal entries independently.',"b: varje B med B²=A kommuterar med A, eftersom BA=B³=AB. Med olika diagonalelement 5 och 9 tvingar en jämförelse av elementen utanför diagonalen i BA och AB dessa element i B att vara noll. Kvadrera sedan de två diagonalelementen oberoende."),
    tx('c: choose A = diag(−1,1). The same commutation argument forces B to be diagonal. No real number squares to −1.',"c: välj A = diag(−1,1). Samma kommutationsargument tvingar B att vara diagonal. Inget reellt tal har kvadraten −1."));
  add(30,tx('Construct two examples',"Konstruera två exempel"),'a: [0 1] [0 0].\nb: [1 0] [0 0].',
    tx('a: multiply the proposed matrix by itself. Its only nonzero entry sends the second coordinate into the first, and applying it again sends the result to zero.',"a: multiplicera den föreslagna matrisen med sig själv. Dess enda element skilt från noll skickar den andra koordinaten till den första, och en tillämpning till skickar resultatet till noll."),
    tx('b: the diagonal matrix keeps the first coordinate and erases the second. Repeating has exactly the same effect.',"b: diagonalmatrisen behåller den första koordinaten och tar bort den andra. Upprepning har exakt samma effekt."));
  add(31,tx('Prove the column-row formula',"Bevisa kolumn-radformeln"),tx('The two sides have the same (i,j) entry.',"De två sidorna har samma element på position (i,j)."),
    tx('By the row-column formula, (AB)ᵢⱼ is the sum of aᵢₖbₖⱼ over k.',"Enligt rad-kolumnformeln är (AB)ᵢⱼ summan av aᵢₖbₖⱼ över k."),
    tx('In the product of column k of A and row k of B, the (i,j) entry is exactly aᵢₖbₖⱼ. Add those products over k to recover every entry of AB.',"I produkten av kolumn k i A och rad k i B är elementet (i,j) exakt aᵢₖbₖⱼ. Addera dessa produkter över k för att återfå varje element i AB."));
  {
    const examples=[(i,j)=>i+j,(i,j)=>i**(j-1),(i,j)=>Math.abs(i-j)>1?1:-1].map(f=>matrix(Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>f(i+1,j+1)))));
    add(32,tx('Fill the 4 × 4 matrices',"Fyll i 4 × 4-matriserna"),examples.map((s,i)=>label(i)+': '+s).join('\n'),
      tx('Number rows and columns from 1. In a, add the row number and column number. In b, raise the row number to the column number minus 1.',"Numrera rader och kolumner från 1. I a adderar du radnumret och kolumnnumret. I b upphöjer du radnumret till kolumnnumret minus 1."),
      tx('In c, put −1 on and immediately next to the main diagonal, because |i−j| is at most 1 there. Put 1 in the remaining positions.',"I c sätter du −1 på och alldeles intill huvuddiagonalen, eftersom |i−j| där är högst 1. Sätt 1 på de återstående positionerna."));
  }
  add(33,tx('Interpret prices multiplied by quantities',"Tolka priser multiplicerade med mängder"),tx('The monthly spending totals, in order January through April, are (20,17,32,24).',"De totala månadsutgifterna, i ordning januari till april, är (20,17,32,24)."),
    tx('Multiply each count by its price, then add across that month: 3+8+9=20, 5+12+0=17, 2+18+12=32, and 1+2+21=24.',"Multiplicera varje antal med dess pris och addera för den månaden: 3+8+9=20, 5+12+0=17, 2+18+12=32 och 1+2+21=24."));
  add(34,tx('Interpret monthly sales matrices',"Tolka månatliga försäljningsmatriser"),tx('a: May plus June counts by item and size.\nb: May minus June counts by item and size.\nc: x=(1,1,1)ᵀ.\nd: y=(1,1,1,1).\ne: 492 total May items.',"a: antal i maj plus juni per vara och storlek.\nb: antal i maj minus juni per vara och storlek.\nc: x=(1,1,1)ᵀ.\nd: y=(1,1,1,1).\ne: totalt 492 varor i maj."),
    tx('Adding or subtracting the matrices compares entries with the same product and size.',"Addition eller subtraktion av matriserna jämför element med samma vara och storlek."),
    tx('A right-side column of ones adds across the three sizes for each product. A left-side row of ones adds down the four products for each size.',"En kolumn av ettor till höger summerar de tre storlekarna för varje vara. En rad av ettor till vänster summerar de fyra varorna för varje storlek."),
    tx('Combining both adds all May counts. The four item totals are 180, 100, 122 and 90, which add to 492.',"Kombinationen summerar alla antal i maj. De fyra varutotalerna är 180, 100, 122 och 90, vilket ger 492."));
  add(35,tx('Prove that trace distributes across addition',"Bevisa att spåret fördelas över addition"),'tr(A+B) = tr(A) + tr(B).',tx('On the diagonal, the i-th entry of A+B is aᵢᵢ+bᵢᵢ. Add these entries and separate the a terms from the b terms.',"På diagonalen är det i:te elementet i A+B lika med aᵢᵢ+bᵢᵢ. Addera dessa element och skilj a-termerna från b-termerna."));
  add(36,tx('Use inner dimensions to prove the size claims',"Använd inre dimensioner för att bevisa storlekspåståendena"),tx('a: both products are square.\nb: B has size n × m.',"a: båda produkterna är kvadratiska.\nb: B har storlek n × m."),
    tx('Let A be m × n and B be p × q. AB being defined requires n=p. BA being defined requires q=m. Their resulting sizes are m × m and n × n.',"Låt A vara m × n och B vara p × q. Att AB är definierad kräver n=p. Att BA är definierad kräver q=m. Resultatens storlekar är m × m respektive n × n."),
    tx('For A(BA), the inner product BA first requires q=m and produces p × n. Multiplying A by that product requires n=p, so B has size n × m.',"För A(BA) kräver den inre produkten BA först q=m och ger p × n. Multiplikation av A med denna produkt kräver n=p, så B har storlek n × m."));
  add('TF',tx('True or false',"Sant eller falskt"),'a T · b F · c F · d F · e T · f F · g F · h T · i T · j T · k T · l F · m T · n T · o F',
    tx('a: this text defines the main diagonal for square matrices. b: m counts rows and n counts columns. c: multiplying a coordinate swap and a one-axis projection in opposite orders gives different outputs.',"a: boken definierar huvuddiagonalen för kvadratiska matriser. b: m räknar rader och n räknar kolumner. c: koordinatbyte och projektion på en axel ger olika utdata i motsatt ordning."),
    tx('d: row i of the product comes from row i of A times B. e: rows and columns switch twice. f: using A=B=I₂ gives trace 2 on the left and 4 on the right.',"d: rad i i produkten fås från rad i i A gånger B. e: rader och kolumner byter plats två gånger. f: med A=B=I₂ får vi spår 2 till vänster och 4 till höger."),
    tx('g: a transpose reverses the factor order. h: the main diagonal is unchanged. i: Bᵀ must be 2 × 4 to multiply the 4 × 6 matrix Aᵀ.',"g: transponering vänder faktorordningen. h: huvuddiagonalen ändras inte. i: Bᵀ måste vara 2 × 4 för att multipliceras med 4 × 6-matrisen Aᵀ."),
    tx('j: every diagonal entry is scaled by c. k: add C to both sides. l: let C be zero, so the products agree even for different A and B.',"j: varje diagonalelement skalas med c. k: addera C till båda sidor. l: låt C vara noll, så stämmer produkterna överens även för olika A och B."),
    tx('m: AB and BA have sizes m × m and n × n, which must agree for their sum. n: multiplying the zero column of B by A gives zero. o: take B=[1 0] [0 0] and A=[1 1] [0 1]. Both columns of BA are nonzero.',"m: AB och BA har storlekarna m × m och n × n, vilka måste stämma överens för deras summa. n: multiplikation av B:s nollkolumn med A ger noll. o: välj B=[1 0] [0 0] och A=[1 1] [0 1]. Båda kolumnerna i BA är skilda från noll."));
  outerProducts('T1',[[1,2,4],[2,6,0]],[[4,1,4,3],[0,-1,3,1],[2,7,5,2]]);

  set='1.4';
  {
    const a=[[3,-1],[2,4]], b=[[0,2],[1,-4]], c=[[4,1],[-3,-2]], p=M.multiply;
    function verify(number,parts){
      add(number,tx('Calculate each side separately',"Beräkna varje sida separat"),parts.map(([name,left,right],i)=>label(i)+': '+name+' → '+matrix(left)+tx(' on both sides'," på båda sidor")).join('\n'),
        tx('For a sum or difference, combine matching entries. For a product, multiply one row by one column and add. For a transpose, turn rows into columns.',"För summa eller differens kombinerar du motsvarande element. För produkt multiplicerar du en rad med en kolumn och adderar. För transponering gör du rader till kolumner."),
        ...parts.flatMap(([name,left,right,work],i)=>[tx('Part ',"Del ")+label(i)+': '+name+'. '+work,tx('The left side gives ',"Vänsterledet ger ")+matrix(left)+tx('. The right side gives ',". Högerledet ger ")+matrix(right)+tx('. Since every entry agrees, the rule is verified.',". Eftersom varje element stämmer överens är regeln verifierad.")]));
    }
    verify(1,[
      [tx('Associative addition',"Associativ addition"),sum(a,sum(b,c)),sum(sum(a,b),c),'B+C = '+matrix(sum(b,c))+tx(' and A+B = '," och A+B = ")+matrix(sum(a,b))+'.'],
      [tx('Associative multiplication',"Associativ multiplikation"),p(a,p(b,c)),p(p(a,b),c),'BC = '+matrix(p(b,c))+tx(' and AB = '," och AB = ")+matrix(p(a,b))+'.'],
      [tx('Left distributive law',"Vänsterdistributiva lagen"),p(a,sum(b,c)),sum(p(a,b),p(a,c)),'B+C = '+matrix(sum(b,c))+', AB = '+matrix(p(a,b))+', AC = '+matrix(p(a,c))+'.'],
      [tx('Scalar sum',"Summa av skalärer"),scale(-3,c),sum(scale(4,c),scale(-7,c)),tx('Add 4 and −7 on the left. On the right add 4C = ',"Addera 4 och −7 till vänster. Till höger adderar du 4C = ")+matrix(scale(4,c))+tx(' to −7C = '," till −7C = ")+matrix(scale(-7,c))+'.']
    ]);
    const out=p(b,c), scaled=scale(4,out);
    verify(2,[
      [tx('Scalar in a product',"Skalär i en produkt"),scaled,p(scale(4,b),c),'BC = '+matrix(out)+tx('. Compute (4B)C and B(4C) as well. Both give ',". Beräkna även (4B)C och B(4C). Båda ger ")+matrix(p(b,scale(4,c)))+'.'],
      [tx('Left distribution over subtraction',"Vänsterdistribution över subtraktion"),p(a,sum(b,scale(-1,c))),sum(p(a,b),scale(-1,p(a,c))),'B−C = '+matrix(sum(b,scale(-1,c)))+tx('. Compute AB and AC separately, then subtract.',". Beräkna AB och AC separat och subtrahera sedan.")],
      [tx('Right distribution',"Högerdistributiva lagen"),p(sum(b,c),a),sum(p(b,a),p(c,a)),tx('First form B+C, then multiply by A on the right. Compare with the sum of BA and CA.',"Bilda först B+C och multiplicera sedan med A från höger. Jämför med summan av BA och CA.")],
      [tx('Repeated scalar multiplication',"Upprepad skalärmultiplikation"),scale(4,scale(-7,c)),scale(-28,c),tx('First compute −7C = ',"Beräkna först −7C = ")+matrix(scale(-7,c))+tx(', then multiply it by 4. On the other side multiply 4 by −7 first.'," och multiplicera sedan med 4. På andra sidan multiplicerar du först 4 med −7.")]
    ]);
    verify(3,[
      [tx('Transpose twice',"Transponera två gånger"),transpose(transpose(a)),a,'Aᵀ = '+matrix(transpose(a))+tx('. Switch rows and columns again.',". Byt plats på rader och kolumner igen.")],
      [tx('Transpose of a product',"Transponatet av en produkt"),transpose(p(a,b)),p(transpose(b),transpose(a)),'AB = '+matrix(p(a,b))+tx('; multiply Bᵀ by Aᵀ in the reverse order.',"; multiplicera Bᵀ med Aᵀ i omvänd ordning.")]
    ]);
    verify(4,[
      [tx('Transpose of a sum',"Transponatet av en summa"),transpose(sum(a,b)),sum(transpose(a),transpose(b)),'A+B = '+matrix(sum(a,b))+tx('. Transpose that sum, then compare with adding the two transposes.',". Transponera summan och jämför sedan med summan av de två transponaten.")],
      [tx('Transpose of a scalar multiple',"Transponatet av en skalärmultipel"),transpose(scale(4,c)),scale(4,transpose(c)),'4C = '+matrix(scale(4,c))+tx('. Compare its transpose with scaling Cᵀ by 4.',". Jämför dess transponat med skalning av Cᵀ med 4.")]
    ]);
  }
  add(9,tx('Find the inverse of the exponential matrix',"Bestäm inversen till exponentialmatrisen"),tx('[u −v] [−v u], where u=(eˣ+e⁻ˣ)/2 and v=(eˣ−e⁻ˣ)/2.',"[u −v] [−v u], där u=(eˣ+e⁻ˣ)/2 och v=(eˣ−e⁻ˣ)/2."),
    tx('Call the common diagonal entry u and the common off-diagonal entry v. The determinant is u²−v² = (u+v)(u−v).',"Kalla det gemensamma diagonalelementet u och det gemensamma elementet utanför diagonalen v. Determinanten är u²−v² = (u+v)(u−v)."),
    tx('Adding the definitions gives u+v=eˣ. Subtracting gives u−v=e⁻ˣ. Their product is 1.',"Addition av definitionerna ger u+v=eˣ. Subtraktion ger u−v=e⁻ˣ. Deras produkt är 1."),
    tx('The inverse formula switches the two equal diagonal entries, changes both off-diagonal signs, and divides by 1.',"Inversformeln byter plats på de två lika diagonalelementen, byter tecken på båda elementen utanför diagonalen och dividerar med 1."));
  add(10,tx('Find the inverse rotation',"Bestäm den inversa rotationen"),'[cos θ −sin θ] [sin θ cos θ].',tx('The determinant is cos²θ + sin²θ = 1. Apply the 2 × 2 inverse formula: swap the equal diagonal entries, negate each off-diagonal entry, then divide by 1.',"Determinanten är cos²θ + sin²θ = 1. Använd inversformeln för 2 × 2: byt plats på de lika diagonalelementen, byt tecken på varje element utanför diagonalen och dividera sedan med 1."));
  {
    const a=[[2,-3],[4,4]], b=[[3,1],[5,2]], c=[[2,0],[0,3]], p=M.multiply, abc=p(p(a,b),c);
    const ai=M.inverse(a), bi=M.inverse(b), ci=M.inverse(c);
    const examples=[
      [11,tx('Transpose and invert',"Transponera och invertera"),M.inverse(transpose(a)).value,transpose(ai.value),tx('Find A⁻¹ = ',"Bestäm A⁻¹ = ")+matrix(ai.value)+tx(' and Aᵀ = '," och Aᵀ = ")+matrix(transpose(a))+'.'],
      [12,tx('Invert twice',"Invertera två gånger"),M.inverse(ai.value).value,a,tx('Invert A first to get ',"Invertera först A för att få ")+matrix(ai.value)+tx('. Inverting this matrix undoes the first inversion.',". Invertering av denna matris gör den första inverteringen ogjord.")],
      [13,tx('Invert three factors in reverse order',"Invertera tre faktorer i omvänd ordning"),M.inverse(abc).value,p(p(ci.value,bi.value),ai.value),tx('Compute ABC = ',"Beräkna ABC = ")+matrix(abc)+tx('. Separately compute C⁻¹ = ',". Beräkna separat C⁻¹ = ")+matrix(ci.value)+', B⁻¹ = '+matrix(bi.value)+tx(', and A⁻¹ = '," och A⁻¹ = ")+matrix(ai.value)+'.'],
      [14,tx('Transpose three factors in reverse order',"Transponera tre faktorer i omvänd ordning"),transpose(abc),p(p(transpose(c),transpose(b)),transpose(a)),tx('First compute ABC = ',"Beräkna först ABC = ")+matrix(abc)+tx('. For the other side, transpose C, B and A individually, then multiply in that order.',". För den andra sidan transponerar du C, B och A var för sig och multiplicerar sedan i den ordningen.")]
    ];
    examples.forEach(([n,title,left,right,work])=>add(n,title,matrix(left),work,tx('The left side is ',"Vänsterledet är ")+matrix(left)+tx('. The right side is ',". Högerledet är ")+matrix(right)+tx('. Compare the corresponding entries.',". Jämför motsvarande element.")));
  }
  [
    [[[-3,7],[1,-2]],r=>scale(1/7,r),tx('Inverting both sides gives 7A = M⁻¹. Divide every entry by 7.',"Invertering av båda sidor ger 7A = M⁻¹. Dividera varje element med 7.")],
    [[[-3,-1],[5,2]],r=>scale(1/5,transpose(r)),tx('Inverting both sides gives 5Aᵀ = M⁻¹. Transpose and then divide by 5.',"Invertering av båda sidor ger 5Aᵀ = M⁻¹. Transponera och dividera sedan med 5.")],
    [[[-1,2],[4,5]],r=>scale(.5,sum(r,scale(-1,unit(2)))),tx('Inverting both sides gives I+2A = M⁻¹. Subtract I and halve all entries.',"Invertering av båda sidor ger I+2A = M⁻¹. Subtrahera I och halvera alla element.")],
    [[[2,-1],[3,5]],r=>r,tx('Inverting both sides immediately gives A = M⁻¹.',"Invertering av båda sidor ger direkt A = M⁻¹.")]
  ].forEach(([m,finish,explanation],i)=>{
    const r=M.inverse(m);
    add(i+15,tx('Undo the given inverse',"Gör den givna inversen ogjord"),matrix(finish(r.value)),tx('Call the displayed matrix M and invert it.',"Kalla den visade matrisen M och invertera den."),...r.steps,explanation);
  });
  {
    const items=[[[3,1],[2,1]],[[2,0],[4,1]]];
    items.forEach((a,i)=>{
      const squared=M.multiply(a,a), cubed=M.multiply(squared,a), r=M.inverse(a);
      const inverseCube=M.multiply(M.multiply(r.value,r.value),r.value);
      const polynomial=sum(sum(squared,scale(-2,a)),unit(2));
      add(i+19,tx('Compute powers and a matrix expression',"Beräkna potenser och ett matrisuttryck"),'a: '+matrix(cubed)+'\nb: '+matrix(inverseCube)+'\nc: '+matrix(polynomial),
        tx('Multiply A by A to get ',"Multiplicera A med A för att få ")+matrix(squared)+tx('. Multiply by A again to obtain A³ = ',". Multiplicera med A igen för att få A³ = ")+matrix(cubed)+'.',
        ...r.steps,tx('Multiply A⁻¹ by itself three times to get A⁻³ = ',"Multiplicera A⁻¹ med sig själv tre gånger för att få A⁻³ = ")+matrix(inverseCube)+'.',
        tx('For c, compute A², subtract twice A entry by entry, then add 1 to the two diagonal entries to add I.',"För c beräknar du A², subtraherar två gånger A elementvis och adderar sedan 1 till de två diagonalelementen för att addera I."));
      const polys=[sum(a,scale(-2,unit(2))),sum(sum(scale(2,squared),scale(-1,a)),unit(2)),sum(sum(cubed,scale(-2,a)),unit(2))];
      add(i+21,tx('Evaluate three matrix polynomials',"Beräkna tre matrispolynom"),polys.map((m,j)=>label(j)+': '+matrix(m)).join('\n'),
        tx('Replace each x by A, and each constant term c by cI. The identity has the same size as A.',"Ersätt varje x med A och varje konstantterm c med cI. Identitetsmatrisen har samma storlek som A."),
        tx('Compute A² = ',"Beräkna A² = ")+matrix(squared)+tx(' and A³ = '," och A³ = ")+matrix(cubed)+'.',
        tx('a: subtract 2I from A. b: double A², subtract A, then add I. c: subtract 2A from A³, then add I. Combine matching entries.',"a: subtrahera 2I från A. b: dubbla A², subtrahera A och addera sedan I. c: subtrahera 2A från A³ och addera sedan I. Kombinera motsvarande element."));
    });
  }
  add(23,tx('Equate AB and BA',"Sätt AB och BA lika"),tx('c=0 and d=a. The entries a and b are arbitrary.',"c=0 och d=a. Elementen a och b är godtyckliga."),
    tx('Multiplying gives AB = [0 a] [0 c] and BA = [c d] [0 0]. Equate the top-left, top-right and bottom-right positions.',"Multiplikation ger AB = [0 a] [0 c] och BA = [c d] [0 0]. Jämför positionerna överst till vänster, överst till höger och nederst till höger."));
  add(24,tx('Equate AC and CA',"Sätt AC och CA lika"),tx('b=0 and d=a. The entries a and c are arbitrary.',"b=0 och d=a. Elementen a och c är godtyckliga."),
    tx('Multiplying gives AC = [b 0] [d 0] and CA = [0 0] [a b]. Matching positions gives b=0 and d=a.',"Multiplikation ger AC = [b 0] [d 0] och CA = [0 0] [a b]. Jämförelse av positionerna ger b=0 och d=a."));
  [
    [[[3,-2],[4,5]],[-1,3]], [[[-1,5],[-1,-3]],[4,1]],
    [[[6,1],[4,-3]],[0,-2]], [[[2,-2],[1,4]],[4,4]]
  ].forEach(([a,b],i)=>byInverse(i+25,a,b));
  {
    const a=[[3,1],[2,1]], l=sum(a,scale(3,unit(2))), r=sum(a,scale(-3,unit(2)));
    add(29,tx('Evaluate both sides of the factorization',"Beräkna båda sidor av faktoriseringen"),matrix(M.multiply(l,r)),
      tx('First multiply A by itself and subtract 9I to get ',"Multiplicera först A med sig själv och subtrahera 9I för att få ")+matrix(sum(M.multiply(a,a),scale(-9,unit(2))))+'.',
      tx('On the other side, A+3I = ',"På andra sidan är A+3I = ")+matrix(l)+tx(' and A−3I = '," och A−3I = ")+matrix(r)+tx('. Multiply them. The entries match.',". Multiplicera dem. Elementen stämmer överens."));
  }
  add(30,tx('Expand the matrix factors',"Utveckla matrisfaktorerna"),'(A+3I)(A−3I) = A²−9I.',
    tx('Multiply each term in the first bracket by each term in the second, retaining order. The terms are A², −3AI, +3IA and −9I².',"Multiplicera varje term i den första parentesen med varje term i den andra och behåll ordningen. Termerna är A², −3AI, +3IA och −9I²."),
    tx('Since AI=IA=A, the middle terms cancel. Since I²=I, the remaining constant term is −9I.',"Eftersom AI=IA=A tar mittentermerna ut varandra. Eftersom I²=I är den återstående konstanttermen −9I."));
  add(31,tx('See why the middle terms may survive',"Se varför mittentermerna kan finnas kvar"),'a: A=[1 0] [0 0], B=[0 1] [0 0].\nb: A²−AB+BA−B².\nc: AB=BA.',
    tx('For the example, AB=B and BA=0. The expanded product is A−B, whereas A²−B²=A.',"I exemplet är AB=B och BA=0. Den utvecklade produkten är A−B, medan A²−B²=A."),
    tx('Expand the two brackets term by term, keeping the multiplication order. The middle terms −AB and +BA cancel exactly when AB=BA.',"Utveckla de två parenteserna termvis och behåll multiplikationsordningen. Mittentermerna −AB och +BA tar ut varandra precis när AB=BA."));
  add(32,tx('Build eight square roots of the identity',"Skapa åtta kvadratrötter till identitetsmatrisen"),tx('diag(±1,±1,±1), with independent signs.',"diag(±1,±1,±1), med oberoende teckenval."),tx('Squaring a diagonal matrix squares its three diagonal entries. Each must square to 1, so choose either sign for each. There are 2³=8 choices.',"Kvadrering av en diagonalmatris kvadrerar dess tre diagonalelement. Varje kvadrat måste vara 1, så välj valfritt tecken för varje element. Det finns 2³=8 val."));
  add(33,tx('Find an inverse from a polynomial equation',"Bestäm en invers från en polynomekvation"),tx('a: A⁻¹=−A−2I.\nb: A is invertible whenever the constant coefficient is nonzero.',"a: A⁻¹=−A−2I.\nb: A är inverterbar när konstantkoefficienten är skild från noll."),
    tx('a: rearrange A²+2A+I=0 to A(−A−2I)=I. The factors commute because the second is a polynomial in A.',"a: skriv om A²+2A+I=0 till A(−A−2I)=I. Faktorerna kommuterar eftersom den andra är ett polynom i A."),
    tx('b: write p(A)=a₀I+A(a₁I+a₂A+⋯+aₘAᵐ⁻¹)=0. Move a₀I to the other side and divide by −a₀ to produce a matrix whose product with A is I.',"b: skriv p(A)=a₀I+A(a₁I+a₂A+⋯+aₘAᵐ⁻¹)=0. Flytta a₀I till andra sidan och dividera med −a₀ för att få en matris vars produkt med A är I."));
  add(34,tx('Read an inverse from the cube',"Läs en invers från tredje potensen"),tx('No. If A³=I, then A⁻¹=A².',"Nej. Om A³=I är A⁻¹=A²."),tx('Group the three factors as A(A²) or (A²)A. Both products equal I, which defines the inverse.',"Gruppera de tre faktorerna som A(A²) eller (A²)A. Båda produkterna är I, vilket definierar inversen."));
  add(35,tx('Test a zero row or column',"Testa en nollrad eller nollkolumn"),tx('No.',"Nej."),tx('A zero row would remain zero in every product AB, making AB=I impossible. A zero column would stay zero in every BA, making BA=I impossible.',"En nollrad skulle förbli noll i varje produkt AB, vilket gör AB=I omöjligt. En nollkolumn skulle förbli noll i varje BA, vilket gör BA=I omöjligt."));
  add(36,tx('Test repeated rows or columns',"Testa upprepade rader eller kolumner"),tx('No.',"Nej."),tx('Two identical rows of A give two identical rows of AB for every B. Two identical columns give two identical columns of BA. The identity matrix has neither kind of repetition.',"Två identiska rader i A ger två identiska rader i AB för varje B. Två identiska kolumner ger två identiska kolumner i BA. Identitetsmatrisen har ingen sådan upprepning."));
  {
    const r=M.inverse([[1,0,1],[1,1,0],[0,1,1]]);
    add(37,tx('Solve for the inverse one column at a time',"Lös ut inversen en kolumn i taget"),matrix(r.value),
      tx('In AX=I, let (u,v,w) be any column of X and let (p,q,r) be the matching identity column. The equations are u+w=p, u+v=q, and v+w=r.',"I AX=I, låt (u,v,w) vara en valfri kolumn i X och (p,q,r) motsvarande identitetskolumn. Ekvationerna är u+w=p, u+v=q och v+w=r."),
      tx('Add the first two equations and subtract the third: 2u=p+q−r. Then use v=q−u and w=p−u.',"Addera de första två ekvationerna och subtrahera den tredje: 2u=p+q−r. Använd sedan v=q−u och w=p−u."),
      tx('Use (p,q,r)=(1,0,0), (0,1,0), and (0,0,1) in turn to get the three columns in the answer.',"Använd (p,q,r)=(1,0,0), (0,1,0) och (0,0,1) i tur och ordning för att få svarets tre kolumner."));
  }
  add(38,tx('Test whether the identity can be reached',"Testa om identitetsmatrisen kan nås"),tx('No inverse.',"Ingen invers."),tx('Row 1 is row 2 plus row 3. After multiplication by any X, row 1 of AX would still be the sum of its last two rows.',"Rad 1 är rad 2 plus rad 3. Efter multiplikation med valfri X skulle rad 1 i AX fortfarande vara summan av dess sista två rader."),
    tx('But row 1 of I₃ is not the sum of rows 2 and 3, so AX=I₃ has no solution.',"Men rad 1 i I₃ är inte summan av raderna 2 och 3, så AX=I₃ saknar lösning."));
  add(39,tx('Simplify without moving factors',"Förenkla utan att flytta faktorer"),'B⁻¹.',tx('Expand the inverses in reverse order: B⁻¹A⁻¹ A C⁻¹ C D D⁻¹. Adjacent A⁻¹A, C⁻¹C and DD⁻¹ cancel.',"Utveckla inverserna i omvänd ordning: B⁻¹A⁻¹ A C⁻¹ C D D⁻¹. Intilliggande A⁻¹A, C⁻¹C och DD⁻¹ förkortas bort."));
  add(40,tx('Cancel neighboring inverse pairs',"Förkorta intilliggande inverspar"),'CD⁻¹.',tx('The first inverse and its matching factor multiply to I. Rewrite the remaining inverse as CA⁻¹.',"Den första inversen och dess motsvarande faktor ger produkten I. Skriv om den återstående inversen som CA⁻¹."),
    tx('The remaining product is CA⁻¹AD⁻¹, which reduces to CD⁻¹.',"Den återstående produkten är CA⁻¹AD⁻¹, som reduceras till CD⁻¹."));
  add(41,tx('Compare a row-column product with a trace',"Jämför en rad-kolumnprodukt med ett spår"),'RC = tr(CR).',tx('Write R=(r₁,…,rₙ) and C=(c₁,…,cₙ)ᵀ. RC is the single entry ∑rᵢcᵢ.',"Skriv R=(r₁,…,rₙ) och C=(c₁,…,cₙ)ᵀ. RC är det enda elementet ∑rᵢcᵢ."),
    tx('The (i,i) entry of CR is cᵢrᵢ. Its trace sums exactly the same scalar products.',"Elementet (i,i) i CR är cᵢrᵢ. Dess spår summerar exakt samma skalärprodukter."));
  add(42,tx('Transpose a repeated product',"Transponera en upprepad produkt"),tx('Yes, (Aⁿ)ᵀ=(Aᵀ)ⁿ.',"Ja, (Aⁿ)ᵀ=(Aᵀ)ⁿ."),tx('Transposing reverses factor order and transposes every factor. All n factors are the same A, so the reversed list still has n copies of Aᵀ.',"Transponering vänder faktorordningen och transponerar varje faktor. Alla n faktorer är samma A, så den omvända listan har fortfarande n stycken Aᵀ."));
  add(43,tx('Explain when cancellation works',"Förklara när förkortning fungerar"),tx('a: B=C.\nb: the cancellation requires an inverse.',"a: B=C.\nb: förkortningen kräver en invers."),
    tx('Multiply AB=AC on the left by A⁻¹. This gives IB=IC and hence B=C.',"Multiplicera AB=AC från vänster med A⁻¹. Detta ger IB=IC och därmed B=C."),
    tx('In the example where cancellation fails, the common factor is singular. The proof cannot begin without A⁻¹.',"I exemplet där förkortning misslyckas är den gemensamma faktorn singulär. Beviset kan inte inledas utan A⁻¹."));
  add(44,tx('Extend scalar factoring to all integer powers',"Utvidga skalärutbrytning till alla heltalspotenser"),tx('(kA)ⁿ = kⁿAⁿ for every integer n.',"(kA)ⁿ = kⁿAⁿ för varje heltal n."),
    tx('For positive n, take one scalar k out of each factor. For zero, both sides are I.',"För positivt n bryter du ut en skalär k ur varje faktor. För noll är båda sidor I."),
    tx('For n<0, use (kA)⁻¹=k⁻¹A⁻¹, which follows by multiplying them to get I. Apply the positive-power case to the inverse.',"För n<0 använder du (kA)⁻¹=k⁻¹A⁻¹, vilket följer genom att multiplicera dem och få I. Använd fallet med positiv exponent på inversen."));
  add(45,tx('Factor a product to reveal the identity',"Faktorisera en produkt för att få fram identitetsmatrisen"),tx('a: the product is I.\nb: A⁻¹+B⁻¹ is invertible, with inverse B(A+B)⁻¹A.',"a: produkten är I.\nb: A⁻¹+B⁻¹ är inverterbar med inversen B(A+B)⁻¹A."),
    tx('Distribute the outer factors: A(A⁻¹+B⁻¹)B = B+A. Multiplying by (A+B)⁻¹ gives I.',"Fördela de yttre faktorerna: A(A⁻¹+B⁻¹)B = B+A. Multiplikation med (A+B)⁻¹ ger I."),
    tx('Rewrite (A⁻¹+B⁻¹) as A⁻¹(A+B)B⁻¹. Its three factors are invertible. Reverse their order when inverting.',"Skriv om (A⁻¹+B⁻¹) som A⁻¹(A+B)B⁻¹. Dess tre faktorer är inverterbara. Vänd deras ordning vid invertering."));
  add(46,tx('Square each proposed expression',"Kvadrera varje föreslaget uttryck"),tx('a: I−A is idempotent.\nb: (2A−I)⁻¹=2A−I.',"a: I−A är idempotent.\nb: (2A−I)⁻¹=2A−I."),
    tx('Use A²=A. Expanding (I−A)² gives I−2A+A²=I−A.',"Använd A²=A. Utveckling av (I−A)² ger I−2A+A²=I−A."),
    tx('Expanding (2A−I)² gives 4A²−4A+I=I. A matrix whose square is I is its own inverse.',"Utveckling av (2A−I)² ger 4A²−4A+I=I. En matris vars kvadrat är I är sin egen invers."));
  add(47,tx('Multiply and cancel the successive powers',"Multiplicera och förkorta de successiva potenserna"),'(I−A)⁻¹ = I+A+⋯+Aᵏ⁻¹.',
    tx('Multiply the sum by I to get the same sum. Multiplying by −A gives −A−A²−⋯−Aᵏ.',"Multiplicera summan med I och få samma summa. Multiplikation med −A ger −A−A²−⋯−Aᵏ."),
    tx('Adding leaves I−Aᵏ=I. All powers commute with A, so multiplication in the other order also gives I.',"Addition lämnar I−Aᵏ=I. Alla potenser kommuterar med A, så multiplikation i andra ordningen ger också I."));
  add(48,tx('Check the four entries',"Kontrollera de fyra elementen"),'A²−(a+d)A+(ad−bc)I = 0.',
    tx('Multiply to get A² = [a²+bc, ab+bd] [ac+cd, bc+d²].',"Multiplicera och få A² = [a²+bc, ab+bd] [ac+cd, bc+d²]."),
    tx('Subtract (a+d)A. The off-diagonal entries cancel, and each diagonal entry is bc−ad. Adding (ad−bc)I makes both diagonal entries zero.',"Subtrahera (a+d)A. Elementen utanför diagonalen tar ut varandra och varje diagonalelement är bc−ad. Addition av (ad−bc)I gör båda diagonalelementen noll."));
  add(49,tx('Isolate the middle factor D',"Lös ut den mittersta faktorn D"),'D = CA⁻¹B⁻¹A⁻²BC²(Bᵀ)⁻¹A².',
    tx('Write the equation as LDR=Cᵀ with L=CᵀB⁻¹A²BAC⁻¹ and R=A⁻²BᵀC⁻². Multiply by L⁻¹ on the left and R⁻¹ on the right.',"Skriv ekvationen som LDR=Cᵀ med L=CᵀB⁻¹A²BAC⁻¹ och R=A⁻²BᵀC⁻². Multiplicera med L⁻¹ från vänster och R⁻¹ från höger."),
    tx('Reverse the factors to get L⁻¹=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹ and R⁻¹=C²(Bᵀ)⁻¹A². The neighboring (Cᵀ)⁻¹Cᵀ cancels.',"Vänd faktorerna för att få L⁻¹=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹ och R⁻¹=C²(Bᵀ)⁻¹A². Intilliggande (Cᵀ)⁻¹Cᵀ förkortas bort."));
  add(50,tx('Undo all factors surrounding D',"Gör alla faktorer runt D ogjorda"),'D = (Cᵀ)⁻¹B⁻¹BᵀC⁻¹(Aᵀ)⁻¹B⁻¹.',
    tx('Multiply AB Cᵀ D B Aᵀ C = ABᵀ by (ABCᵀ)⁻¹ on the left and (BAᵀC)⁻¹ on the right.',"Multiplicera AB Cᵀ D B Aᵀ C = ABᵀ med (ABCᵀ)⁻¹ från vänster och (BAᵀC)⁻¹ från höger."),
    tx('Reverse the order in each inverse and cancel the adjacent A⁻¹A. Keep all other factors in their given order.',"Vänd ordningen i varje invers och förkorta intilliggande A⁻¹A. Behåll alla andra faktorer i deras givna ordning."));
  add(51,tx('Prove commutativity of addition',"Bevisa additionens kommutativitet"),'A+B=B+A.',tx('In position (i,j), the two matrices contain aᵢⱼ+bᵢⱼ and bᵢⱼ+aᵢⱼ. These real sums agree at every position.',"På position (i,j) innehåller de två matriserna aᵢⱼ+bᵢⱼ respektive bᵢⱼ+aᵢⱼ. Dessa reella summor stämmer överens på varje position."));
  add(52,tx('Prove associativity of addition',"Bevisa additionens associativitet"),'A+(B+C)=(A+B)+C.',tx('At position (i,j), the two sides group the same three real entries differently. Ordinary addition gives the same number for either grouping.',"På position (i,j) grupperar de två sidorna samma tre reella element på olika sätt. Vanlig addition ger samma tal oavsett gruppering."));
  add(53,tx('Prove distribution over subtraction',"Bevisa distribution över subtraktion"),'A(B−C)=AB−AC.',tx('The (i,j) entry is ∑aᵢₖ(bₖⱼ−cₖⱼ). Distribute inside the sum and separate the two sums to obtain (AB)ᵢⱼ−(AC)ᵢⱼ.',"Elementet (i,j) är ∑aᵢₖ(bₖⱼ−cₖⱼ). Fördela inne i summan och dela upp de två summorna för att få (AB)ᵢⱼ−(AC)ᵢⱼ."));
  add(54,tx('Prove associativity of multiplication',"Bevisa multiplikationens associativitet"),'A(BC)=(AB)C.',tx('Expanding the (i,j) entry of A(BC) gives a sum over k and l of aᵢₖbₖₗcₗⱼ. Expanding (AB)C gives the same terms, with the other sum done first.',"Utveckling av elementet (i,j) i A(BC) ger en summa över k och l av aᵢₖbₖₗcₗⱼ. Utveckling av (AB)C ger samma termer med den andra summan utförd först."),
    tx('The sums are finite, so changing the order of addition leaves the result unchanged.',"Summorna är ändliga, så ändrad additionsordning lämnar resultatet oförändrat."));
  add(55,tx('Subtract a matrix from itself',"Subtrahera en matris från sig själv"),'A−A = A+(−A) = 0.',tx('At every position, subtract the same entry from itself. Each difference is zero, so the result is the zero matrix.',"På varje position subtraherar du samma element från sig självt. Varje differens är noll, så resultatet är nollmatrisen."));
  add(56,tx('Subtract the zero matrix',"Subtrahera nollmatrisen"),'A−0=A.',tx('At every position, subtract 0 from the entry of A. Every entry stays the same.',"På varje position subtraherar du 0 från elementet i A. Varje element förblir detsamma."));
  add(57,tx('Prove that transpose commutes with scaling',"Bevisa att transponering kommuterar med skalning"),'(kA)ᵀ = kAᵀ.',tx('Entry (i,j) of the left side comes from entry (j,i) of kA, which is kaⱼᵢ. The right side multiplies the same transposed entry by k.',"Elementet (i,j) i vänsterledet kommer från elementet (j,i) i kA, som är kaⱼᵢ. Högerledet multiplicerar samma transponerade element med k."));
  add(58,tx('Prove the reversed transpose rule',"Bevisa regeln för omvänd faktorordning vid transponering"),'(AB)ᵀ = BᵀAᵀ.',tx('Entry (i,j) of the left side is entry (j,i) of AB, the sum of aⱼₖbₖᵢ over k.',"Elementet (i,j) i vänsterledet är elementet (j,i) i AB, alltså summan av aⱼₖbₖᵢ över k."),
    tx('Entry (i,j) of BᵀAᵀ sums bₖᵢaⱼₖ. Real numbers commute, so the sums match at every position.',"Elementet (i,j) i BᵀAᵀ summerar bₖᵢaⱼₖ. Reella tal kommuterar, så summorna stämmer överens på varje position."));
  add('TF',tx('True or false',"Sant eller falskt"),'a F · b F · c F · d F · e F · f T · g T · h T · i F · j T · k F',
    tx('a: inverses give the identity. b and c: expansion yields both AB and BA. They need not be equal. d and e: both inversion and transposition reverse the order of a product.',"a: inverser ger identitetsmatrisen. b och c: utveckling ger både AB och BA. De behöver inte vara lika. d och e: både invertering och transponering vänder faktorordningen i en produkt."),
    tx('f: the determinant criterion is ad−bc≠0. g: switching indices commutes with addition and scaling. h: the transpose of the inverse undoes the transpose.',"f: determinantvillkoret är ad−bc≠0. g: indexbyte kommuterar med addition och skalning. h: inversens transponat gör transponeringen ogjord."),
    tx('i: the sum of coefficients multiplies I; the result is a matrix. j: a zero row or column prevents an identity product. k: I and −I are invertible but sum to zero.',"i: koefficienternas summa multiplicerar I; resultatet är en matris. j: en nollrad eller nollkolumn hindrar en identitetsprodukt. k: I och −I är inverterbara men summeras till noll."));
  {
    const a=[[0,1/2,1/3],[1/4,0,1/5],[1/6,1/7,0]], a2=M.multiply(a,a), a3=M.multiply(a2,a);
    add('T1',tx('Show that all powers approach zero',"Visa att alla potenser går mot noll"),tx('Every entry of Aᵏ approaches 0.',"Varje element i Aᵏ går mot 0."),
      tx('Compute A² = ',"Beräkna A² = ")+matrix(a2)+tx(' and A³ = '," och A³ = ")+matrix(a3)+tx(' to see the entries shrink.'," för att se hur elementen minskar."),
      tx('The entries are nonnegative and the largest row sum of A is 5/6. Every row sum of A² is at most (5/6)², because each is a weighted sum of row sums of A.',"Elementen är icke-negativa och A:s största radsumma är 5/6. Varje radsumma i A² är högst (5/6)², eftersom var och en är en viktad summa av A:s radsummor."),
      tx('Repeat to bound the row sums of Aᵏ by (5/6)ᵏ. Every entry is between zero and this bound, which tends to zero.',"Upprepa för att begränsa radsummorna i Aᵏ med (5/6)ᵏ. Varje element ligger mellan noll och denna gräns, som går mot noll."));
  }
  add('T2',tx('Find formulas for positive powers',"Bestäm formler för positiva potenser"),tx('a: [aⁿ, naⁿ⁻¹] [0, aⁿ]. For a=0, use A for n=1 and zero thereafter.\nb: [cos(nθ) sin(nθ)] [−sin(nθ) cos(nθ)].',"a: [aⁿ, naⁿ⁻¹] [0, aⁿ]. För a=0, använd A när n=1 och noll därefter.\nb: [cos(nθ) sin(nθ)] [−sin(nθ) cos(nθ)]."),
    tx('a: the first two powers have diagonal a and a² and upper-right entries 1 and 2a. Multiplying the general formula by A changes that entry to aⁿ+naⁿ=(n+1)aⁿ and multiplies the diagonal by a.',"a: de två första potenserna har diagonalerna a och a² och övre högra elementen 1 och 2a. Multiplikation av den allmänna formeln med A ändrar detta element till aⁿ+naⁿ=(n+1)aⁿ och multiplicerar diagonalen med a."),
    tx('b: the matrix rotates clockwise by θ. Repeating n times adds the angles, giving clockwise nθ.',"b: matrisen roterar medurs med θ. Upprepning n gånger adderar vinklarna och ger nθ medurs."));
  add('T3',tx('Verify the Fibonacci power formula',"Verifiera Fibonaccis potensformel"),tx('Qⁿ = [Fₙ₊₁ Fₙ] [Fₙ Fₙ₋₁] for n≥1.',"Qⁿ = [Fₙ₊₁ Fₙ] [Fₙ Fₙ₋₁] för n≥1."),
    tx('For n=1 the formula gives Q because F₂=F₁=1 and F₀=0.',"För n=1 ger formeln Q eftersom F₂=F₁=1 och F₀=0."),
    tx('Multiply the general matrix on the right by Q. Its first column becomes (Fₙ₊₁+Fₙ,Fₙ+Fₙ₋₁) = (Fₙ₊₂,Fₙ₊₁). Its second column becomes the old first column.',"Multiplicera den allmänna matrisen från höger med Q. Dess första kolumn blir (Fₙ₊₁+Fₙ,Fₙ+Fₙ₋₁) = (Fₙ₊₂,Fₙ₊₁). Dess andra kolumn blir den gamla första kolumnen."),
    tx('This is exactly the formula at n+1. The PDF shows F₀ in the last position. That works only for the first power and should read Fₙ₋₁.',"Detta är exakt formeln vid n+1. PDF-filen visar F₀ på den sista positionen. Det fungerar bara för den första potensen och ska vara Fₙ₋₁."));

  set='1.5';
  add(1,tx('Test for exactly one elementary row operation',"Testa om exakt en elementär radoperation räcker"),tx('a yes · b no · c no · d no',"a ja · b nej · c nej · d nej"),
    tx('a: start from I₂ and subtract five copies of row 1 from row 2.',"a: börja med I₂ och subtrahera fem gånger rad 1 från rad 2."),
    tx('b: a row swap alone would leave 0 in the upper-left corner. Adding a multiple changes only one row, but both rows here differ from the identity.',"b: ett rent radbyte skulle lämna 0 i övre vänstra hörnet. Addition av en multipel ändrar bara en rad, men här skiljer sig båda raderna från identitetsmatrisen."),
    tx('c: there is a zero row, so the matrix cannot be inverted. Every elementary operation is reversible.',"c: det finns en nollrad, så matrisen kan inte inverteras. Varje elementär operation kan göras ogjord."),
    tx('d: scaling row 1 changes only the first entry, and adding to it would leave its original diagonal entry 1. A swap cannot give its two nonzero entries. More than one operation is needed.',"d: skalning av rad 1 ändrar bara det första elementet, och radaddition skulle behålla det ursprungliga diagonalelementet 1. Ett byte kan inte ge de två elementen som inte är noll. Mer än en operation behövs."));
  add(2,tx('Find the one change when it exists',"Bestäm den enda ändringen när den finns"),tx('a yes · b yes · c yes · d no',"a ja · b ja · c ja · d nej"),
    tx('a: multiply row 2 by √3. b: swap rows 1 and 3. c: add nine copies of row 3 to row 2.',"a: multiplicera rad 2 med √3. b: byt plats på raderna 1 och 3. c: addera nio gånger rad 3 till rad 2."),
    tx('d: the last two rows have been swapped and the first row has been multiplied by −1. These are two operations.',"d: de sista två raderna har bytt plats och den första raden har multiplicerats med −1. Detta är två operationer."));
  function rowOperation(a,{type,i,j,factor}) {
    const rows=a.map(row=>[...row]);
    if(type==='swap')[rows[i],rows[j]]=[rows[j],rows[i]];
    if(type==='scale')rows[i]=rows[i].map(n=>n*factor);
    if(type==='add')rows[i]=rows[i].map((n,k)=>n+factor*rows[j][k]);
    return rows;
  }
  const swapOp=(i,j)=>({type:'swap',i:i-1,j:j-1});
  const scaleOp=(i,factor)=>({type:'scale',i:i-1,factor});
  const addOp=(i,j,factor)=>({type:'add',i:i-1,j:j-1,factor});
  function opText({type,i,j,factor}) {
    if(type==='swap')return tx('Swap rows ',"Byt plats på raderna ")+(i+1)+tx(' and '," och ")+(j+1);
    if(type==='scale')return tx('Multiply row ',"Multiplicera rad ")+(i+1)+tx(' by '," med ")+M.format(factor);
    return tx('Add (',"Addera (")+M.format(factor)+tx(') × row ',") × rad ")+(j+1)+tx(' to row '," till rad ")+(i+1);
  }
  function reverseOp(o) {
    if(o.type==='swap')return o;
    return {...o,factor:o.type==='scale'?1/o.factor:-o.factor};
  }
  function undoRows(n,parts,restoring=true) {
    add(n,tx('Undo each elementary operation',"Gör varje elementär operation ogjord"),parts.map(([d,o],i)=>label(i)+': '+matrix(rowOperation(unit(d),o))).join('\n'),
      (restoring?tx('Reverse the original row change.',"Gör den ursprungliga radändringen ogjord."):tx('Compare the two matrices row by row to find which operation sends the source to the target.',"Jämför de två matriserna rad för rad för att hitta operationen som skickar källmatrisen till målmatrisen."))+tx(' To build its matrix, apply that operation to the identity of the same size.'," För att bygga dess matris använder du operationen på identitetsmatrisen av samma storlek."),
      ...parts.map(([d,o],i)=>tx('Part ',"Del ")+label(i)+': '+opText(o)+tx('. On the identity this gives ',". På identitetsmatrisen ger detta ")+matrix(rowOperation(unit(d),o))+
        tx('. Applying the same operation to the source matrix ',". Samma operation tillämpad på källmatrisen ")+(restoring?tx('restores the identity.',"återställer identitetsmatrisen."):tx('gives the requested target.',"ger den efterfrågade målmatrisen."))));
  }
  undoRows(3,[[2,addOp(1,2,3)],[3,scaleOp(1,-1/7)],[3,addOp(3,1,5)],[4,swapOp(1,3)]]);
  undoRows(4,[[2,addOp(2,1,3)],[3,scaleOp(3,1/3)],[4,swapOp(1,4)],[4,addOp(1,3,1/7)]]);
  const a5=[[-1,-2,5,-1],[3,-6,-6,-6]], b5=[[2,-1,0,-4,-4],[1,-3,-1,5,3],[2,0,1,3,-1]], c5=[[1,4],[2,5],[3,6]];
  function checkRows(n,parts) {
    const cases=parts.map(([a,o])=>{
      const e=rowOperation(unit(a.length),o);
      return {a,e,o,result:M.multiply(e,a),changed:rowOperation(a,o)};
    });
    add(n,tx('Connect left multiplication to a row change',"Koppla vänstermultiplikation till en radändring"),cases.map((r,i)=>label(i)+': '+matrix(r.result)).join('\n'),
      tx('Compare E with the identity to find the row operation. Each row of E gives the weights used to combine the corresponding rows of A.',"Jämför E med identitetsmatrisen för att hitta radoperationen. Varje rad i E ger vikterna som används för att kombinera motsvarande rader i A."),
      ...cases.flatMap(({a,e,o,result,changed},i)=>[tx('Part ',"Del ")+label(i)+': '+opText(o)+tx('. This makes ',". Detta ger ")+matrix(changed)+tx(' from A.'," från A."),
        tx('Multiplying ',"Multiplikation av ")+matrix(e)+tx(' by '," med ")+matrix(a)+tx(' also gives '," ger också ")+matrix(result)+'.']));
  }
  checkRows(5,[[a5,swapOp(1,2)],[b5,addOp(3,2,-3)],[c5,addOp(1,3,4)]]);
  checkRows(6,[[a5,scaleOp(1,-6)],[b5,addOp(2,1,-4)],[c5,scaleOp(2,5)]]);
  undoRows(7,[[3,swapOp(1,3)],[3,swapOp(1,3)],[3,addOp(3,1,-2)],[3,addOp(3,1,2)]],false);
  undoRows(8,[[3,scaleOp(2,-3)],[3,scaleOp(2,-1/3)],[3,addOp(2,3,2)],[3,addOp(2,3,-2)]],false);
  function inverseParts(n,parts) {
    const cases=parts.map(M.inverse);
    add(n,tx('Use the row-reduction algorithm',"Använd algoritmen för radreduktion"),cases.map((r,i)=>(parts.length>1?label(i)+': ':'')+(r.value?matrix(r.value):tx('No inverse.',"Ingen invers."))).join('\n'),
      ...cases.flatMap((r,i)=>[...(parts.length>1?[tx('Part ',"Del ")+label(i)+':']:[]),...r.steps]));
  }
  inverseParts(11,[[[1,2,3],[2,5,3],[1,0,8]],[[-1,3,-4],[2,4,1],[-4,2,-9]]]);
  inverseParts(12,[[[.2,.2,-.4],[.2,.2,.1],[.2,-.8,.1]],[[.2,.2,-.4],[.4,-.6,-.3],[.2,-.8,.1]]]);
  inverseParts(13,[[[1,0,1],[0,1,1],[1,1,0]]]);
  add(14,tx('Invert the two-coordinate block',"Invertera blocket med två koordinater"),'[√2/26, −3√2/26, 0] [4√2/26, √2/26, 0] [0, 0, 1].',
    tx('The bottom coordinate is already unchanged, so work on the top-left block only. Divide both top rows of [A | I] by √2. The left block becomes [1 3] [−4 1], and the corresponding right block is I₂/√2.',"Den nedersta koordinaten är redan oförändrad, så arbeta bara med det övre vänstra blocket. Dividera båda övre raderna i [A | I] med √2. Vänsterblocket blir [1 3] [−4 1] och motsvarande högerblock är I₂/√2."),
    tx('Add 4 times the first row to the second, giving a second pivot 13. Divide that row by 13, then subtract three copies of it from the first row.',"Addera 4 gånger den första raden till den andra och få den andra pivoten 13. Dividera den raden med 13 och subtrahera sedan tre gånger den från den första raden."),
    tx('The right block now reads [1 −3] [4 1] divided by 13√2. Rationalizing gives the displayed entries. Leave the third row and column unchanged.',"Högerblocket blir nu [1 −3] [4 1] dividerat med 13√2. Rationalisering ger de visade elementen. Lämna den tredje raden och kolumnen oförändrade."));
  inverseParts(15,[[[2,6,6],[2,7,6],[2,7,7]]]);
  inverseParts(16,[[[1,0,0,0],[1,3,0,0],[1,3,5,0],[1,3,5,7]]]);
  inverseParts(17,[[[2,-4,0,0],[1,2,12,0],[0,0,2,0],[0,-1,-4,-5]]]);
  inverseParts(18,[[[0,0,2,0],[1,0,0,1],[0,-1,3,0],[2,1,5,-3]]]);
  add(19,tx('Invert the diagonal and 2 × 2 blocks',"Invertera diagonalen och 2 × 2-blocken"),tx('a: diag(1/k₁,1/k₂,1/k₃,1/k₄).\nb: put [1/k, −1/k] [0, 1] in both diagonal blocks, with zeros in the other blocks.',"a: diag(1/k₁,1/k₂,1/k₃,1/k₄).\nb: sätt [1/k, −1/k] [0, 1] i båda diagonalblocken och nollor i övriga block."),
    tx('a: each diagonal entry scales its own coordinate by kᵢ, so divide by the same number to undo it.',"a: varje diagonalelement skalar sin egen koordinat med kᵢ, så dividera med samma tal för att göra detta ogjort."),
    tx('b: each block maps (x,y) to (kx+y,y). Recover y from the second output, subtract it from the first output, then divide by k. This gives the stated inverse block.',"b: varje block avbildar (x,y) på (kx+y,y). Återfå y ur den andra utdatan, subtrahera det från den första utdatan och dividera sedan med k. Detta ger det angivna inversblocket."));
  add(20,tx('Undo a reversal and a lower triangular map',"Gör en omvändning och en undre triangulär avbildning ogjorda"),tx('a: antidiagonal entries (1/k₄,1/k₃,1/k₂,1/k₁), all other entries zero.\nb: [1/k 0 0 0] [−1/k² 1/k 0 0] [1/k³ −1/k² 1/k 0] [−1/k⁴ 1/k³ −1/k² 1/k].',"a: antidiagonalelement (1/k₄,1/k₃,1/k₂,1/k₁), alla andra element noll.\nb: [1/k 0 0 0] [−1/k² 1/k 0 0] [1/k³ −1/k² 1/k 0] [−1/k⁴ 1/k³ −1/k² 1/k]."),
    tx('a: the matrix reverses the coordinate order and scales each output. To undo this, divide by the relevant kᵢ and reverse again.',"a: matrisen vänder koordinatordningen och skalar varje utdata. Gör detta ogjort genom att dividera med relevant kᵢ och vända igen."),
    tx('b: solve Ax=y from the first row down. The first gives x₁=y₁/k. Each later row gives xᵢ=(yᵢ−xᵢ₋₁)/k. Substitute the previous expression each time and read off the coefficients of y.',"b: lös Ax=y från första raden och nedåt. Den första ger x₁=y₁/k. Varje senare rad ger xᵢ=(yᵢ−xᵢ₋₁)/k. Sätt in föregående uttryck varje gång och läs av koefficienterna för y."));
  add(21,tx('Find when every pivot survives',"Bestäm när varje pivot finns kvar"),tx('All c except 0 and 1.',"Alla c utom 0 och 1."),
    tx('Subtract the original second row from the first, then the original third row from the second. The diagonal entries of the triangular result are c−1, c−1 and c.',"Subtrahera den ursprungliga andra raden från den första och sedan den ursprungliga tredje raden från den andra. Diagonalelementen i det triangulära resultatet är c−1, c−1 och c."),
    tx('Row replacement does not change invertibility. Each diagonal must be nonzero, so exclude c=0 and c=1.',"Radaddition ändrar inte inverterbarheten. Varje diagonalelement måste vara skilt från noll, så uteslut c=0 och c=1."));
  add(22,tx('Check three exceptional values',"Kontrollera tre undantagsvärden"),tx('All c except 0, √2 and −√2.',"Alla c utom 0, √2 och −√2."),
    tx('Write the homogeneous equations cx+y=0, x+cy+z=0 and y+cz=0. From the first two, y=−cx and z=(c²−1)x.',"Skriv de homogena ekvationerna cx+y=0, x+cy+z=0 och y+cz=0. De första två ger y=−cx och z=(c²−1)x."),
    tx('Substitute those into the last equation. It becomes c(c²−2)x=0.',"Sätt in dem i den sista ekvationen. Den blir c(c²−2)x=0."),
    tx('If the coefficient is nonzero, all three unknowns are zero and the matrix is invertible. Otherwise x is free and the matrix has no inverse. The coefficient vanishes at 0 and ±√2.',"Om koefficienten inte är noll är alla tre obekanta noll och matrisen är inverterbar. Annars är x fri och matrisen saknar invers. Koefficienten blir noll vid 0 och ±√2."));
  [
    [[-3,1],[2,2]], [[1,0],[-5,2]], [[1,0,-2],[0,4,3],[0,0,1]], [[1,1,0],[1,1,1],[0,1,1]]
  ].forEach((a,i)=>{
    const {steps,operations}=M.reduce(a);
    const es=operations.map(o=>matrix(rowOperation(unit(a.length),o)));
    const back=operations.map(o=>matrix(rowOperation(unit(a.length),reverseOp(o))));
    add(i+23,tx('Write A and its inverse as products',"Skriv A och dess invers som produkter"),'A = '+back.join(' × ')+'\nA⁻¹ = '+[...es].reverse().join(' × '),
      tx('Reduce A to the identity and label each row operation E₁, E₂, and so on. To get its elementary matrix, apply the operation to the identity.',"Reducera A till identitetsmatrisen och beteckna varje radoperation E₁, E₂ och så vidare. Tillämpa operationen på identitetsmatrisen för att få dess elementära matris."),
      ...steps,...operations.map((o,j)=>'E'+(j+1)+': '+opText(o)+tx(' gives '," ger ")+es[j]+tx('. Its inverse is ',". Dess invers är ")+back[j]+'.'),
      tx('The first operation acts first, so it sits farthest right in A⁻¹. To get A, invert that whole product, reversing the order and replacing each factor by its inverse.',"Den första operationen verkar först och står därför längst till höger i A⁻¹. För att få A inverterar du hela produkten, vänder ordningen och ersätter varje faktor med dess invers."));
  });
  function rowEquivalent(n,a,b) {
    const ar=M.reduce(a), br=M.reduce(b);
    const backwards=[...br.operations].reverse().map(reverseOp);
    const ops=[...ar.operations,...backwards], transfer=ops.reduce(rowOperation,unit(a.length));
    let rows=ar.rows;
    add(n,tx('Find row operations and the matrix C',"Bestäm radoperationer och matrisen C"),'C = '+matrix(transfer),
      tx('Reduce A to its reduced form. Reduce B to the same form separately, then undo the operations on B in reverse order.',"Reducera A till reducerad form. Reducera B separat till samma form och gör sedan operationerna på B ogjorda i omvänd ordning."),
      ...ar.steps,tx('Now reduce B:',"Reducera nu B:"),...br.steps,tx('Starting with the common form, undo the operations used for B:',"Utgå från den gemensamma formen och gör operationerna som användes för B ogjorda:"),
      ...backwards.map(o=>{rows=rowOperation(rows,o);return opText(o)+tx('. The rows become ',". Raderna blir ")+matrix(rows)+'.';}),
      tx('Apply the entire A-to-B operation list to the identity instead of A. The result is C. Checking CA gives ',"Tillämpa hela listan av operationer från A till B på identitetsmatrisen i stället för A. Resultatet är C. Kontroll av CA ger ")+matrix(M.multiply(transfer,a))+'.');
  }
  rowEquivalent(27,[[1,2,3],[1,4,1],[2,1,9]],[[1,0,5],[0,2,-2],[1,1,4]]);
  rowEquivalent(28,[[2,1,0],[-1,1,0],[3,0,-1]],[[6,9,4],[-5,-1,0],[-1,-2,-1]]);
  add(29,tx('Count which entries a single operation can change',"Räkna vilka element en enda operation kan ändra"),tx('At least one of a,b,c is zero.',"Minst ett av a,b,c är noll."),
    tx('The first two rows of the identity are unchanged. A swap would change at least one of them, so the operation is either scaling row 3 or adding one other row to it.',"De första två raderna i identitetsmatrisen är oförändrade. Ett radbyte skulle ändra minst en av dem, så operationen är antingen skalning av rad 3 eller addition av en annan rad till den."),
    tx('Scaling leaves a=b=0. Adding one other row to row 3 can change a or b, but not both. In all cases at least one entry is zero.',"Skalning lämnar a=b=0. Addition av en annan rad till rad 3 kan ändra a eller b men inte båda. I alla fall är minst ett element noll."));
  add(30,tx('Find too many columns in the same two positions',"Hitta för många kolumner med samma två möjliga positioner"),tx('The matrix is always singular.',"Matrisen är alltid singulär."),
    tx('Look only at columns 1, 3 and 5. Their possible nonzero entries are all in rows 2 and 4.',"Titta bara på kolumnerna 1, 3 och 5. Deras möjliga element skilda från noll ligger alla på raderna 2 och 4."),
    tx('Three column vectors supported in two coordinates are dependent. Consequently the full matrix has a nonzero solution to Ax=0 and cannot be invertible.',"Tre kolumnvektorer som bara använder två koordinater är beroende. Därför har hela matrisen en lösning till Ax=0 som inte är nollvektorn och kan inte vara inverterbar."));
  add(31,tx('Relate row equivalence to reduced form',"Koppla radekvivalens till reducerad form"),tx('The matrices are row equivalent exactly when their reduced forms agree.',"Matriserna är radekvivalenta precis när deras reducerade former stämmer överens."),
    tx('Elementary operations are reversible. If A can be turned into B, then continuing to reduce B produces a reduced form of A. The reduced form is unique.',"Elementära operationer kan göras ogjorda. Om A kan omvandlas till B, ger fortsatt reduktion av B en reducerad form av A. Den reducerade formen är entydig."),
    tx('If the reduced forms agree, reduce A to that common form. Reverse the operations that reduce B. This gives a row-operation path from A to B.',"Om de reducerade formerna stämmer överens, reducera A till den gemensamma formen. Gör operationerna som reducerar B ogjorda. Detta ger en väg av radoperationer från A till B."));
  add(32,tx('Track invertibility through row operations',"Följ inverterbarheten genom radoperationerna"),tx('B is invertible.',"B är inverterbar."),
    tx('An elementary row operation multiplies on the left by an invertible elementary matrix. A sequence of operations gives B=Eₖ⋯E₁A.',"En elementär radoperation multiplicerar från vänster med en inverterbar elementär matris. En följd av operationer ger B=Eₖ⋯E₁A."),
    tx('All the factors have inverses. Their product has an inverse made by reversing the factors and inverting each one.',"Alla faktorer har inverser. Deras produkt har en invers som fås genom att vända faktorordningen och invertera varje faktor."));
  add(33,tx('Reverse the entire operation sequence',"Gör hela operationsföljden ogjord"),tx('Apply the inverse operations from last to first.',"Tillämpa de inversa operationerna från den sista till den första."),
    tx('Undo a swap by swapping again. Undo scaling by the reciprocal. Undo adding a multiple by adding the opposite multiple.',"Gör ett byte ogjort genom att byta igen. Gör skalning ogjord med det inverterade talet. Gör addition av en multipel ogjord genom att addera den motsatta multipeln."),
    tx('Undo the last change first, because it was performed on the result of all the earlier ones. Repeat until A is restored.',"Gör den sista ändringen ogjord först eftersom den utfördes på resultatet av alla tidigare ändringar. Upprepa tills A är återställd."));
  add('TF',tx('True or false',"Sant eller falskt"),'a F · b T · c T · d T · e T · f T · g F',
    tx('a: scaling row 1 by 2 and row 2 by 3 gives diag(2,3), which needs two changes to the identity. b: each individual operation is reversible.',"a: skalning av rad 1 med 2 och rad 2 med 3 ger diag(2,3), vilket kräver två ändringar av identitetsmatrisen. b: varje enskild operation kan göras ogjord."),
    tx('c: concatenate the two operation lists. d: a singular square matrix has a free variable in Ax=0, so infinitely many solutions.',"c: lägg de två operationslistorna efter varandra. d: en singulär kvadratisk matris har en fri variabel i Ax=0 och därför oändligt många lösningar."),
    tx('e and f: multiplying by an invertible elementary matrix preserves whether an inverse exists.',"e och f: multiplikation med en inverterbar elementär matris bevarar huruvida en invers finns."),
    tx('g: insert any elementary operation followed by its inverse. This gives a different product with the same value.',"g: infoga valfri elementär operation följd av dess invers. Detta ger en annan produkt med samma värde."));
  {
    const a=[[1,2],[0,-1]], b=unit(2), d=[[2,0],[3,3]], ai=M.inverse(a).value, di=M.inverse(d).value;
    const topRight=scale(-1,M.multiply(M.multiply(ai,b),di)), out=ai.map((row,i)=>[...row,...topRight[i]]).concat(di.map(row=>[0,0,...row]));
    add('T1',tx('Use the block inverse formula',"Använd formeln för blockinversen"),matrix(out),
      tx('Split the matrix into four 2 × 2 blocks. The bottom-left block C is zero, so D−CA⁻¹B is just D. The top-left and bottom-right inverse blocks are A⁻¹ and D⁻¹.',"Dela matrisen i fyra 2 × 2-block. Det nedre vänstra blocket C är noll, så D−CA⁻¹B är bara D. Inversens övre vänstra och nedre högra block är A⁻¹ respektive D⁻¹."),
      tx('Compute A⁻¹ = ',"Beräkna A⁻¹ = ")+matrix(ai)+tx(' and D⁻¹ = '," och D⁻¹ = ")+matrix(di)+tx('. The top-right block is −A⁻¹BD⁻¹ = ',". Det övre högra blocket är −A⁻¹BD⁻¹ = ")+matrix(topRight)+'.',
      tx('The bottom-left stays zero. Assemble the four blocks to get the answer.',"Det nedre vänstra förblir noll. Sätt samman de fyra blocken för att få svaret."));
  }

  set='review';
  [
    [[3,-1,0,4,1],[2,0,3,3,-1]],[[1,4,-1],[-2,-8,2],[3,12,-3],[0,0,0]],
    [[2,-4,1,6],[-4,0,3,-1],[0,1,-1,3]],[[3,1,-2],[-9,-3,6],[6,2,1]]
  ].forEach((a,i)=>gaussian(i+1,a,true));
  add(5,tx('Recover the rotated coordinates',"Återskapa de roterade koordinaterna"),'x′ = (3x+4y)/5, y′ = (−4x+3y)/5.',
    tx('Multiply the two equations by 5. The new rows have left sides 3x′−4y′ and 4x′+3y′, with right sides 5x and 5y.',"Multiplicera de två ekvationerna med 5. De nya radernas vänsterled är 3x′−4y′ och 4x′+3y′, med högerleden 5x och 5y."),
    tx('Divide row 1 by 3 and subtract 4 times the new row 1 from row 2. This gives (25/3)y′ = 5y − (20/3)x.',"Dividera rad 1 med 3 och subtrahera 4 gånger den nya rad 1 från rad 2. Detta ger (25/3)y′ = 5y − (20/3)x."),
    tx('Multiply row 2 by 3/25. Then add 4/3 of that row to row 1 to clear its y′ term. The right sides are the two formulas shown.',"Multiplicera rad 2 med 3/25. Addera sedan 4/3 av den raden till rad 1 för att eliminera dess y′-term. Högerleden är de två visade formlerna."));
  add(6,tx('Undo a symbolic rotation',"Gör en symbolisk rotation ogjord"),'x′ = x cos θ + y sin θ, y′ = −x sin θ + y cos θ.',
    tx('Write c = cos θ and s = sin θ. The augmented rows are [c,−s | x] and [s,c | y].',"Skriv c = cos θ och s = sin θ. De utökade raderna är [c,−s | x] och [s,c | y]."),
    tx('If c≠0, divide row 1 by c, then subtract s times that row from row 2. Its second coefficient is c+s²/c = 1/c because c²+s²=1.',"Om c≠0, dividera rad 1 med c och subtrahera sedan s gånger den raden från rad 2. Dess andra koefficient är c+s²/c = 1/c eftersom c²+s²=1."),
    tx('Multiply row 2 by c to get y′ = cy−sx. Add s/c times the new row 2 to row 1 to get x′ = cx+sy.',"Multiplicera rad 2 med c för att få y′ = cy−sx. Addera s/c gånger den nya rad 2 till rad 1 för att få x′ = cx+sy."),
    tx('If c=0 then s is 1 or −1. The original two rows directly give y′=−sx and x′=sy, the same formulas.',"Om c=0 är s lika med 1 eller −1. De ursprungliga två raderna ger direkt y′=−sx och x′=sy, alltså samma formler."));
  add(8,tx('Find the counts of the three coins',"Bestäm antalet av de tre myntsorterna"),tx('3 pennies, 4 nickels and 6 dimes.',"3 encentmynt, 4 femcentmynt och 6 tiocentmynt."),
    tx('Write p+n+d=13 for the total number and p+5n+10d=83 for the value in cents.',"Skriv p+n+d=13 för det totala antalet och p+5n+10d=83 för värdet i cent."),
    tx('Subtract the first equation from the second to get 4n+9d=70. Since n≥0, d can be at most 7. Also 9d and d have the same remainder on division by 4, so d must leave remainder 2.',"Subtrahera den första ekvationen från den andra och få 4n+9d=70. Eftersom n≥0 kan d vara högst 7. Dessutom ger 9d och d samma rest vid division med 4, så d måste ge resten 2."),
    tx('Try d=2 and d=6. The first gives n=13 and p=−2, which cannot count coins. The second gives n=4 and p=3.',"Pröva d=2 och d=6. Det första ger n=13 och p=−2, vilket inte kan vara antal mynt. Det andra ger n=4 och p=3."),
    tx('Check 3+4+6=13 and 3+20+60=83. The extra sentence about an economy has no data in this coin problem.',"Kontrollera 3+4+6=13 och 3+20+60=83. Den extra meningen om en ekonomi innehåller inga uppgifter för detta myntproblem."));
  add(9,tx('Separate the cases according to a and b',"Dela upp fallen efter a och b"),tx('a: a≠0 and b≠2.\nb: a≠0 and b=2.\nc: a=0 and b=2.\nd: a=0 and b≠2.',"a: a≠0 och b≠2.\nb: a≠0 och b=2.\nc: a=0 och b=2.\nd: a=0 och b≠2."),
    tx('Replace row 2 with row 2 minus rows 1 and 3. The new equation is (2−b)z = 2−b.',"Ersätt rad 2 med rad 2 minus raderna 1 och 3. Den nya ekvationen är (2−b)z = 2−b."),
    tx('If a≠0, rows 1 and 3 determine x and y once z is chosen. For b≠2, the new equation fixes z=1. For b=2, that equation says 0=0 and z is free.',"Om a≠0 bestämmer raderna 1 och 3 värdena x och y när z har valts. För b≠2 bestämmer den nya ekvationen z=1. För b=2 säger ekvationen 0=0 och z är fri."),
    tx('If a=0, the original middle row gives 4z=4. With z=1 the other rows require b=2. When they agree, x and y are both free.',"Om a=0 ger den ursprungliga mittenraden 4z=4. Med z=1 kräver de andra raderna b=2. När de stämmer överens är både x och y fria."));
  add(10,tx('Use the already known coordinate',"Använd den redan kända koordinaten"),tx('No solutions unless a=2 or a=−3/2. At either value there are infinitely many. There is never exactly one.',"Inga lösningar om inte a=2 eller a=−3/2. Vid båda värdena finns oändligt många. Det finns aldrig exakt en."),
    tx('The second equation already says x₃=2. Substitute into the third to obtain 2(a²−4)=a−2.',"Den andra ekvationen säger redan x₃=2. Sätt in i den tredje och få 2(a²−4)=a−2."),
    tx('Bring all terms to one side and factor: (a−2)(2a+3)=0. If this fails there is a contradiction.',"Flytta alla termer till samma sida och faktorisera: (a−2)(2a+3)=0. Om detta inte gäller finns en motsägelse."),
    tx('If it holds, the first equation reduces to x₁+x₂=2. Choose one freely and get the other by subtraction.',"Om det gäller reduceras den första ekvationen till x₁+x₂=2. Välj den ena fritt och få den andra genom subtraktion."));
  add(11,tx('Use the columns of B one at a time',"Använd B:s kolumner en i taget"),'K = [0 2] [1 1].',
    tx('Call AK the 3 × 2 matrix Y. The columns of YB are twice column 1 of Y, column 2 of Y, and negative column 2 of Y.',"Kalla 3 × 2-matrisen AK för Y. Kolumnerna i YB är två gånger kolumn 1 i Y, kolumn 2 i Y och minus kolumn 2 i Y."),
    tx('Match the columns of C to obtain Y₁=(4,3,−2) and Y₂=(6,−1,0). The third column agrees with −Y₂.',"Jämför C:s kolumner och få Y₁=(4,3,−2) och Y₂=(6,−1,0). Den tredje kolumnen stämmer med −Y₂."),
    tx('For each column (u,v) of K, use rows 1 and 3 of A: u+4v=Y₁st and u−2v=Y₃rd. Subtract to find v. This gives (0,1) for the first column and (2,1) for the second. Row 2 gives 3 and −1 respectively, as required.',"För varje kolumn (u,v) i K använder du raderna 1 och 3 i A: u+4v=Y:s första koordinat och u−2v=Y:s tredje koordinat. Subtrahera för att hitta v. Detta ger (0,1) för den första kolumnen och (2,1) för den andra. Rad 2 ger 3 respektive −1 som krävs."));
  add(12,tx('Substitute the known solution',"Sätt in den kända lösningen"),'a=2, b=−1, c=1.',
    tx('Insert x=1, y=−1, z=2 in each equation. Simplifying gives a−b=3, b+2c=1 and a−2c=0.',"Sätt in x=1, y=−1, z=2 i varje ekvation. Förenkling ger a−b=3, b+2c=1 och a−2c=0."),
    tx('Add the first two equations to obtain a+2c=4. Together with a=2c this gives 4c=4. Then c=1, a=2 and b=−1.',"Addera de första två ekvationerna och få a+2c=4. Tillsammans med a=2c ger detta 4c=4. Då är c=1, a=2 och b=−1."));
  {
    const b=[[-1,0,1],[1,1,0],[3,1,-1]], ca=[[1,2,0],[-3,1,5]], inv=M.inverse(b);
    const xa=M.multiply(ca,inv.value);
    const xb=[[-5,-1],[6,-3]].map(d=>M.solve([[1,3,d[0]],[-1,0,d[1]]]).point);
    const xc=M.solve([[2,-2,1,0,2],[-4,3,0,1,-2],[-1,0,1,-2,5],[0,-1,-4,2,4]]);
    add(13,tx('Isolate the unknown matrix by reading its entries',"Lös ut den obekanta matrisen genom att läsa dess element"),
      'a: '+matrix(xa)+'\nb: '+matrix(xb)+'\nc: '+matrix([xc.point.slice(0,2),xc.point.slice(2)]),
      tx('Part a: multiply XB=C on the right by B⁻¹ to get X=CB⁻¹.',"Del a: multiplicera XB=C från höger med B⁻¹ för att få X=CB⁻¹."),...inv.steps,
      tx('Part b: each unknown row (u,v) of X produces (u+3v,−u,2u+v). The first two entries determine u and v. The third entry checks the answer. This gives ',"Del b: varje obekant rad (u,v) i X ger (u+3v,−u,2u+v). De första två elementen bestämmer u och v. Det tredje kontrollerar svaret. Detta ger ")+matrix(xb)+'.',
      tx('Part c: write X with rows (u,v) and (w,z). Multiply on both sides and match the four entries. The resulting coefficient rows are below, in the variable order u,v,w,z.',"Del c: skriv X med raderna (u,v) och (w,z). Multiplicera på båda sidor och jämför de fyra elementen. De resulterande koefficientraderna visas nedan i variabelordningen u,v,w,z."),...xc.steps);
  }
  add(14,tx('Multiply the geometric sum by I−A',"Multiplicera den geometriska summan med I−A"),'a: I+A+A²+A³.\nb: I+A+⋯+Aⁿ.',
    tx('Multiplying I−A by a finite sum of successive powers leaves the first term I and the negative of the next power. The middle terms cancel in pairs.',"Multiplikation av I−A med en ändlig summa av successiva potenser lämnar den första termen I och minus nästa potens. Mittentermerna tar ut varandra parvis."),
    tx('In a the leftover is I−A⁴=I. In b it is I−Aⁿ⁺¹=I. The factors commute, so this gives both inverse products.',"I a återstår I−A⁴=I. I b återstår I−Aⁿ⁺¹=I. Faktorerna kommuterar, så detta ger båda inversprodukterna."));
  linear(16,[[1,-1,1,0],[4,2,1,-9],[4,1,0,0]],tx('Use two points and the slope',"Använd två punkter och lutningen"),
    [tx('Insert the two points into p(x)=ax²+bx+c to get a−b+c=0 and 4a+2b+c=−9.',"Sätt in de två punkterna i p(x)=ax²+bx+c och få a−b+c=0 och 4a+2b+c=−9."),
    tx('The derivative gives the slope: p′(x)=2ax+b. A horizontal tangent at x=2 means 4a+b=0. These three equations determine a,b,c.',"Derivatan anger lutningen: p′(x)=2ax+b. En horisontell tangent vid x=2 betyder 4a+b=0. Dessa tre ekvationer bestämmer a,b,c.")]);
  add(17,tx('Use the all-ones product',"Använd produkten av matriser med enbart ettor"),'(I−Jₙ)⁻¹ = I−Jₙ/(n−1).',
    tx('Each entry of Jₙ² adds n ones, so Jₙ²=nJₙ.',"Varje element i Jₙ² adderar n ettor, så Jₙ²=nJₙ."),
    tx('Multiply the two proposed factors. The coefficient of Jₙ becomes −1−1/(n−1)+n/(n−1)=0.',"Multiplicera de två föreslagna faktorerna. Koefficienten framför Jₙ blir −1−1/(n−1)+n/(n−1)=0."),
    tx('The product is I. Reversing the factors gives the same expansion, since each is a combination of I and Jₙ.',"Produkten är I. Omvänd faktorordning ger samma utveckling eftersom varje faktor är en kombination av I och Jₙ."));
  add(18,tx('Transpose the entire equation',"Transponera hela ekvationen"),tx('Aᵀ satisfies the same polynomial.',"Aᵀ uppfyller samma polynomekvation."),
    tx('Transpose each term. A power of a single matrix transposes to the same power of its transpose, because reversing identical factors changes nothing.',"Transponera varje term. En potens av en enda matris transponeras till samma potens av dess transponat, eftersom omvänd ordning på identiska faktorer inte ändrar något."),
    tx('I and the zero matrix equal their transposes. This gives (Aᵀ)³+4(Aᵀ)²−2Aᵀ+7I=0.',"I och nollmatrisen är lika med sina transponat. Detta ger (Aᵀ)³+4(Aᵀ)²−2Aᵀ+7I=0."));
  add(19,tx('Move the inverse to the other side',"Flytta inversen till andra sidan"),tx('A commutes with B⁻¹ exactly when it commutes with B.',"A kommuterar med B⁻¹ precis när A kommuterar med B."),
    tx('If AB⁻¹=B⁻¹A, multiply by B on the left and on the right to obtain BA=AB.',"Om AB⁻¹=B⁻¹A multiplicerar vi med B från vänster och från höger för att få BA=AB."),
    tx('Conversely, if AB=BA, multiply on the left and right by B⁻¹ to obtain B⁻¹A=AB⁻¹.',"Omvänt: om AB=BA multiplicerar vi från vänster och höger med B⁻¹ för att få B⁻¹A=AB⁻¹."));
  add(20,tx('Factor A out on the right',"Bryt ut A till höger"),tx('The two matrices are invertible together or singular together.',"De två matriserna är antingen båda inverterbara eller båda singulära."),
    tx('(I+BA⁻¹)A = A+B. Since A is invertible, if the first factor is invertible, their product is invertible.',"(I+BA⁻¹)A = A+B. Eftersom A är inverterbar är produkten inverterbar om den första faktorn är inverterbar."),
    tx('If A+B is invertible, rewrite I+BA⁻¹=(A+B)A⁻¹. Both factors on this right side are invertible.',"Om A+B är inverterbar skriver vi om I+BA⁻¹=(A+B)A⁻¹. Båda faktorerna i detta högerled är inverterbara."));
  add(21,tx('Read the product as an average',"Tolka produkten som ett medelvärde"),tx('The ith entry is the average of row i of A.',"Element i är medelvärdet av rad i i A."),
    tx('Multiply row i by the column B. Each entry of A is weighted by 1/n, so the result is (aᵢ₁+⋯+aᵢₙ)/n, the ordinary arithmetic mean.',"Multiplicera rad i med kolonnen B. Varje element i A får vikten 1/n, så resultatet är (aᵢ₁+⋯+aᵢₙ)/n, det vanliga aritmetiska medelvärdet."));
  add(22,tx('Differentiate each matrix entry',"Derivera varje matriselement"),'a: (kA)′=kA′.\nb: (A+B)′=A′+B′.\nc: (AB)′=A′B+AB′.',
    tx('In a, k is constant. The derivative of each scaled entry is k times that entry’s derivative.',"I a är k konstant. Derivatan av varje skalat element är k gånger elementets derivata."),
    tx('In b, differentiate the sum of the two matching entries term by term.',"I b deriverar vi summan av de två motsvarande elementen term för term."),
    tx('In c, entry (i,j) is a sum of products aᵢₖbₖⱼ. Apply the ordinary product rule to each pair. The terms differentiating A add to (A′B)ᵢⱼ, and those differentiating B add to (AB′)ᵢⱼ.',"I c är element (i,j) en summa av produkter aᵢₖbₖⱼ. Använd den vanliga produktregeln på varje par. Termerna där A deriveras summeras till (A′B)ᵢⱼ, och de där B deriveras summeras till (AB′)ᵢⱼ."));
  add(23,tx('Differentiate the identity product',"Derivera produkten som ger enhetsmatrisen"),'(A⁻¹)′ = −A⁻¹A′A⁻¹.',
    tx('Assume A(x) is square and invertible throughout a neighborhood and its entries are differentiable there. The inverse entries are differentiable there too, by the cofactor formula with nonzero determinant.',"Anta att A(x) är kvadratisk och inverterbar i en hel omgivning och att dess element är deriverbara där. Även inversens element är deriverbara där, enligt kofaktorformeln med en determinant som inte är noll."),
    tx('Differentiate AA⁻¹=I using the matrix product rule. The right side is constant, so A′A⁻¹+A(A⁻¹)′=0.',"Derivera AA⁻¹=I med produktregeln för matriser. Högerledet är konstant, så A′A⁻¹+A(A⁻¹)′=0."),
    tx('Move A′A⁻¹ to the right and multiply on the left by A⁻¹.',"Flytta A′A⁻¹ till högerledet och multiplicera från vänster med A⁻¹."));
  add(24,tx('Prove each identity by factoring',"Bevisa varje identitet genom faktorisering"),tx('All three identities hold whenever the stated inverses exist.',"Alla tre identiteterna gäller när de angivna inverserna finns."),
    tx('a: C⁻¹+D⁻¹ = D⁻¹(C+D)C⁻¹. Expand to check, then invert the product in reverse order.',"a: C⁻¹+D⁻¹ = D⁻¹(C+D)C⁻¹. Utveckla för att kontrollera och invertera sedan produkten i omvänd ordning."),
    tx('b: expand (I+CD)C and C(I+DC). Both equal C+CDC. Multiply by (I+CD)⁻¹ on the left and by (I+DC)⁻¹ on the right.',"b: utveckla (I+CD)C och C(I+DC). Båda är lika med C+CDC. Multiplicera med (I+CD)⁻¹ från vänster och med (I+DC)⁻¹ från höger."),
    tx('c: expand (C+DDᵀ)C⁻¹D. It equals D+DDᵀC⁻¹D = D(I+DᵀC⁻¹D). Multiply by the relevant inverses on the left and the right.',"c: utveckla (C+DDᵀ)C⁻¹D. Det blir D+DDᵀC⁻¹D = D(I+DᵀC⁻¹D). Multiplicera med de relevanta inverserna från vänster och höger."));
  {
    const a=[[1,0,2,1,4],[4,1,0,3,-1],[0,-3,4,2,-2]], b=[[3,0],[2,1],[4,-1],[0,3],[2,5]];
    const a11=a.slice(0,2).map(r=>r.slice(0,3)), a12=a.slice(0,2).map(r=>r.slice(3)),
      a21=a.slice(2).map(r=>r.slice(0,3)), a22=a.slice(2).map(r=>r.slice(3)), b1=b.slice(0,3),b2=b.slice(3);
    const terms=[M.multiply(a11,b1),M.multiply(a12,b2),M.multiply(a21,b1),M.multiply(a22,b2)];
    add(25,tx('Multiply using blocks, then check directly',"Multiplicera med block och kontrollera sedan direkt"),matrix(M.multiply(a,b)),
      tx('The A blocks have sizes 2×3, 2×2, 1×3, 1×2. B₁ is 3×2 and B₂ is 2×2. Both products for each block row have matching dimensions for addition.',"Blocken i A har storlekarna 2×3, 2×2, 1×3, 1×2. B₁ är 3×2 och B₂ är 2×2. De båda produkterna för varje blockrad har samma dimensioner och kan därför adderas."),
      tx('The two top products are ',"De två övre produkterna är ")+matrix(terms[0])+tx(' and '," och ")+matrix(terms[1])+tx('. Add them. The two bottom products are ',". Addera dem. De två nedre produkterna är ")+matrix(terms[2])+tx(' and '," och ")+matrix(terms[3])+tx('. Add them.',". Addera dem."),
      ...a.flatMap((row,i)=>transpose(b).map((col,j)=>tx('Direct check, entry (',"Direkt kontroll, element (")+(i+1)+','+(j+1)+'): '+row.map((v,k)=>'('+v+' × '+col[k]+')').join(' + ')+' = '+M.dot(row,col)+'.')));
  }
  add(26,tx('Solve the two block systems for the inverse',"Lös de två blocksystemen för att bestämma inversen"),tx('The four displayed formulas give the blocks of A⁻¹.',"De fyra visade formlerna ger blocken i A⁻¹."),
    tx('From AB=I, the first block column gives A₁₁B₁₁+A₁₂B₂₁=I and A₂₁B₁₁+A₂₂B₂₁=0.',"Från AB=I ger den första blockkolonnen A₁₁B₁₁+A₁₂B₂₁=I och A₂₁B₁₁+A₂₂B₂₁=0."),
    tx('Use the second equation to get B₂₁=−A₂₂⁻¹A₂₁B₁₁. Substitute into the first and invert the factor A₁₁−A₁₂A₂₂⁻¹A₂₁ to obtain B₁₁.',"Använd den andra ekvationen för att få B₂₁=−A₂₂⁻¹A₂₁B₁₁. Sätt in detta i den första och invertera faktorn A₁₁−A₁₂A₂₂⁻¹A₂₁ för att få B₁₁."),
    tx('From BA=I, B₁₁A₁₂+B₁₂A₂₂=0 gives B₁₂=−B₁₁A₁₂A₂₂⁻¹.',"Från BA=I ger B₁₁A₁₂+B₁₂A₂₂=0 att B₁₂=−B₁₁A₁₂A₂₂⁻¹."),
    tx('For the second block column of AB=I, eliminate B₁₂ using A₁₁B₁₂+A₁₂B₂₂=0. The other row becomes (A₂₂−A₂₁A₁₁⁻¹A₁₂)B₂₂=I, giving the last formula.',"För den andra blockkolonnen i AB=I eliminerar vi B₁₂ med A₁₁B₁₂+A₁₂B₂₂=0. Den andra raden blir (A₂₂−A₂₁A₁₁⁻¹A₁₂)B₂₂=I, vilket ger den sista formeln."));
  add(27,tx('Set the lower-left block to zero',"Sätt det nedre vänstra blocket till noll"),tx('The inverse has blocks A₁₁⁻¹, −A₁₁⁻¹A₁₂A₂₂⁻¹, 0 and A₂₂⁻¹.',"Inversen har blocken A₁₁⁻¹, −A₁₁⁻¹A₁₂A₂₂⁻¹, 0 och A₂₂⁻¹."),
    tx('Put A₂₁=0 in the four formulas from Exercise 26. Any product containing that block becomes zero.',"Sätt A₂₁=0 i de fyra formlerna från uppgift 26. Varje produkt som innehåller detta block blir noll."),
    tx('Only the top-right block retains a product of three nonzero factors. The two diagonal blocks are now the inverses of the original diagonal blocks.',"Endast blocket överst till höger behåller en produkt av tre faktorer som inte är noll. De två diagonalblocken är nu inverserna till de ursprungliga diagonalblocken."));
  add(28,tx('Connect row pivots to consistency',"Koppla radpivoter till konsistens"),tx('The system is consistent for every right-hand column.',"Systemet är konsistent för varje högerledskolonn."),
    tx('A contradiction requires a row whose coefficient entries are all zero and whose right-hand side is nonzero.',"En motsägelse kräver en rad där alla koefficienter är noll men högerledet inte är noll."),
    tx('With a pivot in every coefficient row there is no all-zero coefficient row, so that contradiction cannot occur.',"Med en pivot i varje koefficientrad finns ingen koefficientrad med enbart nollor, så en sådan motsägelse kan inte uppstå."));
  add(29,tx('Count both pivot and free columns',"Räkna både pivotkolonner och fria kolonner"),tx('The system is consistent and has infinitely many solutions, with two free parameters.',"Systemet är konsistent och har oändligt många lösningar med två fria parametrar."),
    tx('Three pivot columns use three different rows. There are only three rows, so every row has a coefficient pivot and no contradiction is possible.',"Tre pivotkolonner använder tre olika rader. Det finns bara tre rader, så varje rad har en koefficientpivot och ingen motsägelse är möjlig."),
    tx('Three of the five variable columns have pivots. The remaining two variables can be chosen freely.',"Tre av de fem variabelkolonnerna har pivoter. De återstående två variablerna kan väljas fritt."));

  set='1.10';
  add(1,tx('Balance the flow at each junction',"Balansera flödet vid varje knutpunkt"),tx('Top → left: 40. Top → right: 10. Left → bottom: 10.',"Överst → vänster: 40. Överst → höger: 10. Vänster → nederst: 10."),
    tx('The right junction sends out 60, but 50 already comes from the bottom. The missing 10 must arrive from the top.',"Den högra knutpunkten skickar ut 60, men 50 kommer redan nedifrån. De saknade 10 måste komma uppifrån."),
    tx('The top junction receives 50. It sends 10 right, leaving 40 to send left.',"Den övre knutpunkten tar emot 50. Den skickar 10 åt höger, vilket lämnar 40 att skicka åt vänster."),
    tx('The left junction receives 40 and sends 30 outside the network. The remaining 10 goes to the bottom.',"Den vänstra knutpunkten tar emot 40 och skickar 30 ut ur nätverket. De återstående 10 går nedåt."),
    tx('Check the bottom: 40 from outside plus 10 from the left equals the 50 going to the right.',"Kontrollera den nedre knutpunkten: 40 utifrån plus 10 från vänster är lika med de 50 som går åt höger."));
  add(2,tx('Balance the refinery flow',"Balansera raffinaderiets flöde"),'b: (x₁,x₂,x₃,x₄,x₅,x₆) = (150−s+t,175−s+t,50+s−t,s,200−t,t).\nc: (100,125,100,50,200,0).',
    tx('a: start at the upper-left and lower-left junctions: x₁+x₃=200 and x₁+25=x₂.',"a: börja vid knutpunkterna överst till vänster och nederst till vänster: x₁+x₃=200 och x₁+25=x₂."),
    tx('At the upper and lower middle junctions write x₃+150=x₄+x₅ and x₂+x₄=x₆+175. At the outlet write x₅+x₆=200.',"Vid de övre och nedre mittpunkterna skriver vi x₃+150=x₄+x₅ och x₂+x₄=x₆+175. Vid utloppet skriver vi x₅+x₆=200."),
    tx('b: name x₄=s and x₆=t. Use the outlet to find x₅=200−t. Work backward to find x₃=s+50−t, x₁=150−s+t, and x₂=175−s+t. The lower middle balance agrees.',"b: sätt x₄=s och x₆=t. Använd utloppet för att få x₅=200−t. Arbeta bakåt för att få x₃=s+50−t, x₁=150−s+t och x₂=175−s+t. Balansen vid den nedre mittpunkten stämmer."),
    tx('c: substitute s=50 and t=0. Every nonzero result is positive, so the arrows give the actual directions. No flow goes through branch x₆.',"c: sätt in s=50 och t=0. Alla resultat som inte är noll är positiva, så pilarna anger de verkliga riktningarna. Inget flöde går genom grenen x₆."));
  add(3,tx('Find the required traffic on A → B',"Bestäm den nödvändiga trafiken på A → B"),tx('b: (x₁,x₂,x₃,x₄) = (s−100,s−400,s−500,s).\nc: x₄ must exceed 500 vehicles per hour.',"b: (x₁,x₂,x₃,x₄) = (s−100,s−400,s−500,s).\nc: x₄ måste överstiga 500 fordon per timme."),
    tx('a: at the upper left, x₂+300=x₃+400. At A, x₃+750=x₄+250.',"a: överst till vänster gäller x₂+300=x₃+400. Vid A gäller x₃+750=x₄+250."),
    tx('At the lower left, x₁+100=x₂+400. At B, x₄+200=x₁+300.',"Nederst till vänster gäller x₁+100=x₂+400. Vid B gäller x₄+200=x₁+300."),
    tx('b: choose x₄=s. Work from B to find x₁=s−100, then around the left junctions to get x₂=s−400 and x₃=s−500.',"b: välj x₄=s. Arbeta från B för att få x₁=s−100 och sedan runt de vänstra knutpunkterna för att få x₂=s−400 och x₃=s−500."),
    tx('c: x₃ is the first route to reach zero as s falls. For positive traffic on every road, s>500. If traffic is counted in whole vehicles per hour, the smallest rate strictly above 500 is 501.',"c: x₃ är den första vägen där flödet når noll när s minskar. För positiv trafik på varje väg krävs s>500. Om trafiken räknas i hela fordon per timme är det minsta flödet strikt över 500 lika med 501."));
  add(4,tx('Test whether A → B can be closed',"Undersök om A → B kan stängas"),tx('b: (s,500+t,800−s,700+t−s,t,s−50,t+50).\nc: No.',"b: (s,500+t,800−s,700+t−s,t,s−50,t+50).\nc: Nej."),
    tx('a: balance the top three intersections: x₁+x₃=800, x₁+x₄=x₂+200, and x₂+100=x₅+600.',"a: balansera de tre övre korsningarna: x₁+x₃=800, x₁+x₄=x₂+200 och x₂+100=x₅+600."),
    tx('Balance the bottom three: x₃+x₆=750, x₇+600=x₆+x₄, and x₅+450=x₇+400.',"Balansera de tre nedre: x₃+x₆=750, x₇+600=x₆+x₄ och x₅+450=x₇+400."),
    tx('b: set x₁=s and x₅=t. Use the top-right and bottom-right equations to get x₂=500+t and x₇=t+50. The others give x₃=800−s, x₆=s−50 and x₄=700+t−s. The bottom-center equation then holds automatically.',"b: sätt x₁=s och x₅=t. Använd ekvationerna överst till höger och nederst till höger för att få x₂=500+t och x₇=t+50. De övriga ger x₃=800−s, x₆=s−50 och x₄=700+t−s. Ekvationen längst ned i mitten uppfylls då automatiskt."),
    tx('c: setting s=0 forces x₆=−50. That would send 50 vehicles in the wrong direction on a one-way street.',"c: om s=0 tvingas x₆=−50. Det skulle innebära att 50 fordon kör åt fel håll på en enkelriktad gata."));
  function circuit(n,a,context) {
    const r=M.solve(a);
    add(n,tx('Use current balance and voltage drops',"Använd strömbalans och spänningsfall"),'(I₁, I₂'+(r.point.length===6?', I₃, I₄, I₅, I₆':', I₃')+') = '+M.vector(r.point)+' A.',
      tx('A junction has the same total current entering and leaving. A resistor of R ohms has voltage drop RI along its current arrow. A source raises voltage from − to +.',"I en knutpunkt är den totala strömmen in lika stor som den totala strömmen ut. Ett motstånd på R ohm ger spänningsfallet RI längs sin strömpil. En spänningskälla höjer spänningen från − till +."),
      ...context,...r.steps,tx('A negative result means the actual current travels opposite the arrow drawn in the exercise.',"Ett negativt resultat betyder att den verkliga strömmen går åt motsatt håll mot pilen i uppgiften."));
  }
  circuit(5,[[1,1,-1,0],[2,-2,0,6],[0,2,4,8]],[
    tx('At the top junction, the right branch supplies the currents through the other two: I₃=I₁+I₂.',"Vid den övre knutpunkten försörjer den högra grenen strömmarna genom de två andra: I₃=I₁+I₂."),
    tx('The top-minus-bottom voltage is 2I₁−6 through the left branch, 2I₂ through the middle, and 8−4I₃ through the right.',"Spänningen upptill minus spänningen nedtill är 2I₁−6 genom den vänstra grenen, 2I₂ genom mitten och 8−4I₃ genom den högra."),
    tx('Equate the three expressions using the middle expression as the common value.',"Sätt de tre uttrycken lika med varandra och använd mittuttrycket som gemensamt värde.")]);
  circuit(6,[[1,-1,1,0],[0,6,4,1],[2,0,-4,2]],[
    tx('At the upper junction, I₁ and I₃ enter and I₂ leaves. Thus I₁+I₃=I₂.',"Vid den övre knutpunkten går I₁ och I₃ in och I₂ ut. Alltså gäller I₁+I₃=I₂."),
    tx('The top-minus-bottom voltage is 6I₂−1 on the left, −4I₃ in the middle, and 2−2I₁ on the right.',"Spänningen upptill minus spänningen nedtill är 6I₂−1 till vänster, −4I₃ i mitten och 2−2I₁ till höger."),
    tx('Match the left and right expressions to the middle expression to get the other two equations.',"Sätt vänster och höger uttryck lika med mittuttrycket för att få de två andra ekvationerna.")]);
  circuit(7,[
    [1,-1,0,-1,0,0,0],[0,0,-1,1,-1,0,0],[0,0,1,0,1,-1,0],
    [20,20,0,0,0,0,10],[0,1,-1,0,0,0,0],[0,-20,0,0,20,0,10]
  ],[
    tx('At the junctions write I₁=I₂+I₄, I₄=I₃+I₅, and I₆=I₃+I₅.',"Vid knutpunkterna skriver vi I₁=I₂+I₄, I₄=I₃+I₅ och I₆=I₃+I₅."),
    tx('The top rail has one voltage and the bottom rail has another. Their difference is 10−20I₁ on the left, 20I₂ and 20I₃ in the middle, and 20I₅−10 on the right.',"Den övre ledaren har en spänning och den nedre en annan. Skillnaden är 10−20I₁ till vänster, 20I₂ och 20I₃ i mitten och 20I₅−10 till höger."),
    tx('Equating these four expressions gives three more independent equations.',"Genom att sätta dessa fyra uttryck lika får vi ytterligare tre oberoende ekvationer.")]);
  circuit(8,[[1,-1,-1,0],[3,4,0,9],[0,4,-5,1]],[
    tx('The top branch flows right to left and the others left to right, so I₁=I₂+I₃.',"Strömmen i den övre grenen går från höger till vänster och i de övriga från vänster till höger, så I₁=I₂+I₃."),
    tx('Going from the left junction to the right, the left-minus-right voltage is 5−3I₁ in the top branch, 4I₂−4 in the middle, and 5I₃−3 at the bottom.',"När vi går från den vänstra knutpunkten till den högra är spänningen till vänster minus spänningen till höger 5−3I₁ i den övre grenen, 4I₂−4 i mitten och 5I₃−3 längst ned."),
    tx('Set the top and bottom expressions equal to the middle one.',"Sätt det övre och det nedre uttrycket lika med mittuttrycket.")]);
  add(16,tx('Fit a cubic to four points on the graph',"Anpassa en tredjegradsfunktion till fyra punkter i grafen"),'p(x)=−x³/8+x²/2+2x.',
    tx('Read the clear grid points (0,0), (2,5), (4,8), and (6,3). Start with p(x)=ax³+bx²+cx+d. The origin gives d=0.',"Läs av de tydliga rutnätspunkterna (0,0), (2,5), (4,8) och (6,3). Börja med p(x)=ax³+bx²+cx+d. Origo ger d=0."),
    tx('Substitute the other three points, then divide the resulting equations by 2, 4 and 6. This gives 4a+2b+c=5/2, 16a+4b+c=2, and 36a+6b+c=1/2.',"Sätt in de tre övriga punkterna och dividera sedan ekvationerna med 2, 4 respektive 6. Detta ger 4a+2b+c=5/2, 16a+4b+c=2 och 36a+6b+c=1/2."),
    tx('Subtract successive equations to get 12a+2b=−1/2 and 20a+2b=−3/2. Their difference is 8a=−1, so a=−1/8.',"Subtrahera på varandra följande ekvationer för att få 12a+2b=−1/2 och 20a+2b=−3/2. Skillnaden är 8a=−1, så a=−1/8."),
    tx('Substitute to find b=1/2 and c=2. Check p(2)=5, p(4)=8 and p(6)=3.',"Sätt in för att få b=1/2 och c=2. Kontrollera p(2)=5, p(4)=8 och p(6)=3."));
  add(17,tx('Find and sketch a family of curves',"Bestäm och skissa en familj av kurvor"),tx('p(x)=1+(1−t)x+tx². Use t≠0 for a true quadratic.',"p(x)=1+(1−t)x+tx². Använd t≠0 för en funktion av exakt andra graden."),
    tx('Write p(x)=ax²+bx+c. Putting in x=0 gives c=1. Putting in x=1 gives a+b=1.',"Skriv p(x)=ax²+bx+c. Insättning av x=0 ger c=1. Insättning av x=1 ger a+b=1."),
    tx('Choose a=t freely and set b=1−t. Every such curve passes through (0,1) and (1,2).',"Välj a=t fritt och sätt b=1−t. Alla sådana kurvor går genom (0,1) och (1,2)."),
    tx('The four sketches below use t=−2, −1, 1 and 2. Negative t opens downward, and positive t opens upward.',"De fyra skisserna nedan använder t=−2, −1, 1 och 2. Negativt t ger en nedåtvänd parabel och positivt t en uppåtvänd."));
  solutions[set].at(-1).figure='quadratic-family';
  add(18,tx('Research an application of linear systems',"Undersök en tillämpning av linjära ekvationssystem"),tx('Estimating temperatures in a metal plate.',"Uppskattning av temperaturen i en metallplatta."),
    tx('Imagine a thin plate with edges held at fixed temperatures. Put a grid over the plate. The edge temperatures are known, but each interior grid point has an unknown temperature.',"Föreställ dig en tunn platta vars kanter hålls vid bestämda temperaturer. Lägg ett rutnät över plattan. Temperaturerna vid kanterna är kända, men varje inre rutnätspunkt har en okänd temperatur."),
    tx('For a plate with no internal heat source, a simple grid model takes each inside temperature as the average of its four neighbors. Multiply by 4 to get one linear equation for that grid point.',"För en platta utan inre värmekälla antar en enkel rutnätsmodell att varje inre temperatur är medelvärdet av de fyra grannarnas temperaturer. Multiplicera med 4 för att få en linjär ekvation för den rutnätspunkten."),
    tx('Collect all the equations and solve them together to estimate the temperature across the plate. For example, a point surrounded by 20, 20, 20 and 0 °C would be estimated at 15 °C.',"Samla alla ekvationer och lös dem tillsammans för att uppskatta temperaturen över plattan. En punkt omgiven av 20, 20, 20 och 0 °C skulle exempelvis uppskattas till 15 °C."));
  solutions[set].at(-1).source={name:tx('Technical University of Denmark · The Poisson Problem',"Danmarks Tekniske Universitet · Poissonproblemet"),url:'https://www.imm.dtu.dk/~beda/DCAMM09/Labs/Poisson_problem.pdf'};
  add('TF',tx('True or false',"Sant eller falskt"),'a F · b F · c T · d F · e F',
    tx('a: balance needs an assumption such as no storage and no uncounted source or sink. In a tank that is filling, more can enter than leaves.',"a: balans kräver ett antagande såsom att inget lagras och att det inte finns någon oräknad källa eller något oräknat utlopp. I en tank som fylls kan mer komma in än vad som lämnar."),
    tx('b: voltage falls along a resistor in the direction of its current. c: the current law balances incoming and outgoing currents at a junction.',"b: spänningen faller längs ett motstånd i strömmens riktning. c: strömlagen balanserar inkommande och utgående strömmar i en knutpunkt."),
    tx('d: every element’s count must balance separately, not just the total atom count. e: two points with the same x and different y cannot both lie on the graph of a function.',"d: antalet av varje grundämne måste balanseras separat, inte bara det totala antalet atomer. e: två punkter med samma x men olika y kan inte båda ligga på grafen till en funktion."));
  function interpolant(points) {
    const width=points.length;
    const augmented=points.map(([x,y])=>[...Array.from({length:width},(_,i)=>x**i),y]);
    return {augmented,...M.solve(augmented)};
  }
  function decimal(n,d=9) { return Number(n.toFixed(d)).toString(); }
  function polyText(coefficients) {
    return coefficients.map((v,i)=>'('+decimal(v)+')'+(i?'x^'+i:'')).join(' + ');
  }
  {
    const points=[[1,0],[2,3.12],[4,15.86],[8,33.7],[16,81.5],[32,123]], r=interpolant(points);
    const value=r.point.reduce((total,n,i)=>total+n*20**i,0);
    add('T1',tx('Interpolate the wind-tunnel data',"Interpolera vindtunneldata"),'p(x) ≈ '+polyText(r.point)+tx('\nAt 2,000 ft/s: approximately ',"\nVid 2,000 ft/s: ungefär ")+decimal(value*100,2)+' lb.',
      tx('Measure speed x in hundreds of feet per second, and force in hundreds of pounds. Then 2,000 ft/s means x=20.',"Mät hastigheten x i hundratals fot per sekund och kraften i hundratals pund. Då betyder 2,000 ft/s att x=20."),
      tx('Write p(x)=c₀+c₁x+⋯+c₅x⁵. Each of the six observations gives one row [1,x,x²,x³,x⁴,x⁵ | force].',"Skriv p(x)=c₀+c₁x+⋯+c₅x⁵. Var och en av de sex observationerna ger en rad [1,x,x²,x³,x⁴,x⁵ | kraft]."),
      ...r.steps.slice(0,-2),tx('Read the coefficients from the right-hand column, starting with the constant term. Keep extra digits until the end.',"Läs koefficienterna i kolonnen längst till höger och börja med konstanttermen. Behåll extra siffror fram till slutet."),
      tx('Substitute 20 into every power and add to get ',"Sätt in 20 i varje potens och addera för att få ")+decimal(value,7)+tx(' hundreds of pounds. Multiply by 100 to convert to pounds.'," hundratals pund. Multiplicera med 100 för att omvandla till pund."));
  }
  {
    const points=Array.from({length:6},(_,i)=>[i/5,Math.exp((i/5)**2)]), r=interpolant(points);
    const area=r.point.reduce((total,n,i)=>total+n/(i+1),0);
    const simpson=Array.from({length:1001},(_,i)=>(i===0||i===1000?1:i%2===0?2:4)*Math.exp((i/1000)**2)).reduce((a,b)=>a+b,0)/3000;
    add('T2',tx('Integrate a polynomial that approximates the curve',"Integrera ett polynom som approximerar kurvan"),tx('Interpolation gives ',"Interpolation ger ")+decimal(area,9)+tx('. Direct numerical integration gives ',". Direkt numerisk integration ger ")+decimal(simpson,9)+'.',
      tx('Five equal subintervals give six sample points x=0,0.2,0.4,0.6,0.8,1. Evaluate e^(x²) at those points.',"Fem lika stora delintervall ger sex provpunkter x=0,0.2,0.4,0.6,0.8,1. Beräkna e^(x²) i dessa punkter."),
      tx('For p(x)=c₀+c₁x+⋯+c₅x⁵, use one row [1,x,x²,x³,x⁴,x⁵ | e^(x²)] per point.',"För p(x)=c₀+c₁x+⋯+c₅x⁵ använder vi en rad [1,x,x²,x³,x⁴,x⁵ | e^(x²)] per punkt."),
      ...r.steps.slice(0,-2),tx('The resulting polynomial is approximately ',"Polynomet som erhålls är ungefär ")+polyText(r.point)+'.',
      tx('From 0 to 1, the area under x^j is 1/(j+1). Multiply each coefficient by that number and add.',"Från 0 till 1 är arean under x^j lika med 1/(j+1). Multiplicera varje koefficient med det talet och addera."),
      tx('For comparison, composite Simpson integration applied directly to e^(x²) with 1,000 subintervals gives ',"Som jämförelse ger sammansatt Simpsonintegration direkt på e^(x²) med 1,000 delintervall ")+decimal(simpson,9)+tx('. The difference is about ',". Skillnaden är ungefär ")+decimal(Math.abs(area-simpson),9)+'.');
  }
  add('T3',tx('Balance the thermite reaction',"Balansera termitreaktionen"),'Fe₂O₃ + 2Al → Al₂O₃ + 2Fe.',
    tx('Use one Fe₂O₃ and one Al₂O₃ so there are three oxygen atoms on both sides.',"Använd en Fe₂O₃ och en Al₂O₃ så att det finns tre syreatomer på båda sidor."),
    tx('The reactant iron oxide contains two iron atoms, so put 2 before Fe. The product aluminum oxide contains two aluminum atoms, so put 2 before Al on the left. Check all three element counts.',"Reaktanten järnoxid innehåller två järnatomer, så sätt 2 framför Fe. Produkten aluminiumoxid innehåller två aluminiumatomer, så sätt 2 framför Al till vänster. Kontrollera antalet av alla tre grundämnen."));
  circuit('T4',[[1,1,-1,0],[0,3,470,20],[2,0,470,12]],[
    tx('The upper and lower branches supply the middle branch, so I₁+I₂=I₃.',"Den övre och den nedre grenen försörjer mittgrenen, så I₁+I₂=I₃."),
    tx('The left-minus-right voltage is 20−3I₂ through the top, 470I₃ through the middle, and 12−2I₁ through the bottom.',"Spänningen till vänster minus spänningen till höger är 20−3I₂ genom den övre grenen, 470I₃ genom mitten och 12−2I₁ genom den nedre."),
    tx('Set the top and bottom expressions equal to the middle voltage and rearrange.',"Sätt det övre och det nedre uttrycket lika med spänningen i mittgrenen och ordna om.")]);
});
