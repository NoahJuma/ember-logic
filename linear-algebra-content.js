(globalThis.EmberMathI18n?.register || ((_id,build)=>build()))('content',()=>{
  const root=globalThis;
  'use strict';
  const tr=(en,sv)=>root.EmberMathI18n?.t(en,sv)??en;

  const M = root.EmberAlgebra;
  const topics = [
    ['1.1',tr('Introduction to linear systems',"Introduktion till linjära ekvationssystem"),2,8],
    ['1.2',tr('Gaussian elimination',"Gausselimination"),11,22],
    ['1.3',tr('Matrices and matrix operations',"Matriser och matrisoperationer"),25,37],
    ['1.4',tr('Inverses and matrix algebra',"Inverser och matrisalgebra"),40,51],
    ['1.5',tr('Elementary matrices and finding an inverse',"Elementärmatriser och att bestämma en invers"),53,60],
    ['1.6',tr('Linear systems and invertibility',"Linjära ekvationssystem och inverterbarhet"),62,67],
    ['1.7',tr('Diagonal, triangular and symmetric matrices',"Diagonalmatriser, triangulära och symmetriska matriser"),69,74],
    ['1.8',tr('Introduction to linear transformations',"Introduktion till linjära avbildningar"),76,88],
    ['1.9',tr('Composition of matrix transformations',"Sammansättning av matrisavbildningar"),90,96],
    ['1.10',tr('Applications of linear systems',"Tillämpningar av linjära ekvationssystem"),98,108],
    ['1.11',tr('Leontief input–output models',"Leontiefs input–output-modeller"),110,114]
  ];

  const names = ['x','y','z','w','v'];
  function equation(row) {
    const terms = row.slice(0,-1).flatMap((value,i) => value === 0 ? [] : [[value,names[i]]]);
    return (terms.map(([value,name],i) => (value < 0 ? (i ? ' − ' : '−') : (i ? ' + ' : '')) +
      (Math.abs(value) === 1 ? '' : Math.abs(value)) + name).join('') || '0') + ' = ' + row.at(-1);
  }

  function solutionText(result) {
    if (result.kind === 'none') return tr('No solution',"Ingen lösning");
    if (result.kind === 'one') return M.vector(result.point);
    return M.vector(result.point) + ' + ' + result.basis.map((v,i) => ['s','t','u','v'][i] + M.vector(v)).join(' + ') + tr(', with arbitrary real parameters',", där parametrarna är godtyckliga reella tal");
  }

  function system(title, a, intro = tr('Solve the system.',"Lös ekvationssystemet.")) {
    const solved = M.solve(a);
    return {title, prompt:intro+'\n'+a.map(equation).join('\n'), answer:solutionText(solved), steps:solved.steps};
  }

  function product(title,a,b) {
    const value=M.multiply(a,b);
    return {title,prompt:tr('Calculate AB.\nA = ',"Beräkna AB.\nA = ")+M.matrixText(a)+'\nB = '+M.matrixText(b),answer:M.matrixText(value),
      steps:[tr('Each output entry uses one row of A and one column of B. Multiply matching entries and add.',"Varje element i resultatet beräknas med en rad ur A och en kolumn ur B. Multiplicera elementen på motsvarande platser och addera produkterna."),...a.flatMap((row,i)=>b[0].map((_,j)=>tr('Entry (',"Element (")+(i+1)+', '+(j+1)+') = '+row.map((n,k)=>'('+n+' × '+b[k][j]+')').join(' + ')+' = '+value[i][j]+'.'))]};
  }

  function invert(title,a) {
    const result=M.inverse(a);
    return {title,prompt:tr('Find A⁻¹ if it exists.\nA = ',"Bestäm A⁻¹ om den finns.\nA = ")+M.matrixText(a),answer:result.value ? M.matrixText(result.value) : tr('No inverse',"Ingen invers"),steps:result.steps};
  }

  function transform(title,a,v) {
    const answer=M.apply(a,v);
    return {title,prompt:tr('Apply matrix A to v.\nA = ',"Tillämpa matrisen A på v.\nA = ")+M.matrixText(a)+'\nv = '+M.vector(v),answer:M.vector(answer),
      steps:[tr('Think of v as a column of coordinates. One row of A tells you how to calculate one new coordinate.',"Tänk på v som en kolumn med koordinater. Varje rad i A talar om hur en ny koordinat ska beräknas."),...a.map((row,i)=>tr('Coordinate ',"Koordinat ")+(i+1)+' = '+row.map((n,j)=>'('+n+' × '+v[j]+')').join(' + ')+' = '+answer[i]+'.')]};
  }

  function compose(title,a,b,v) {
    const mid=transform(title,a,v), end=transform(title,b,M.apply(a,v));
    return {title,prompt:tr('Apply A first, then B. Find BAv.\nA = ',"Tillämpa först A och sedan B. Bestäm BAv.\nA = ")+M.matrixText(a)+'\nB = '+M.matrixText(b)+'\nv = '+M.vector(v),answer:end.answer,
      steps:[tr('Work from right to left in BAv. First compute Av.',"Arbeta från höger till vänster i BAv. Beräkna först Av."),...mid.steps.slice(1),tr('The intermediate vector is ',"Vektorn efter det första steget är ")+mid.answer+tr('. Multiply it by B.',". Multiplicera den med B."),...end.steps.slice(1)]};
  }

  function leontief(level,k) {
    const c=level===1 ? [[.2]] : level===2 ? [[.2,.1],[0,.5]] : level===3 ? [[.4,.2],[.1,.3]] : [[.2,.1,.2],[.1,.4,.1],[.2,.1,.3]];
    const output=c.map((_,i)=>100+20*i+10*k);
    const coefficients=c.map((row,i)=>row.map((value,j)=>Number(i===j)-value));
    const demand=M.apply(coefficients,output);
    const solved=M.solve(coefficients.map((row,i)=>[...row,demand[i]]));
    return {title:tr('Plan total production',"Planera den totala produktionen"),prompt:tr('Find production x given the internal consumption matrix C and external demand d.\nC = ',"Bestäm produktionen x när matrisen C för intern förbrukning och den externa efterfrågan d är givna.\nC = ")+M.matrixText(c)+'\nd = '+M.vector(demand),answer:solutionText(solved),
      steps:[tr('Total production covers internal use Cx plus outside orders d, so x = Cx + d.',"Den totala produktionen ska täcka intern förbrukning Cx och externa beställningar d. Därför gäller x = Cx + d."),tr('Move Cx to the left. This gives (I − C)x = d.',"Flytta Cx till vänsterledet. Då får vi (I − C)x = d."),tr('Subtract C from I entry by entry to get ',"Subtrahera C från I, element för element, för att få ")+M.matrixText(coefficients)+'.',...solved.steps]};
  }

  function makeProblem(topic,level,k=0) {
    const t=k+1;
    const easy=[[1,1,5+k],[1,-1,1+k]];
    const unique=[[1,1,1,6+k],[2,-1,1,3+2*k],[1,2,-1,2+k]];
    const free=[[1,1,1,4+k],[2,2,2,8+2*k],[1,-1,0,k]];
    const impossible=[[1,2,1,7+k],[2,4,2,13+2*k],[1,0,1,2]];
    const standard=[[1,t],[2,3]];
    const triangle=[[1,t,2],[0,2,-1],[0,0,3]];
    switch (topic) {
      case '1.1':
        return system([tr('Crossing lines',"Linjer som skär varandra"),tr('Parallel lines',"Parallella linjer"),tr('Three planes meet',"Tre plan möts"),tr('Describe all common points',"Beskriv alla gemensamma punkter")][level-1],
          [easy,[[1,2,4+k],[2,4,9+2*k]],unique,free][level-1]);
      case '1.2':
        return system([tr('Start with a pivot',"Börja med ett pivotelement"),tr('Swap before you eliminate',"Byt plats på rader före eliminationen"),tr('Find the free variables',"Hitta de fria variablerna"),tr('Spot a contradiction',"Upptäck en motsägelse")][level-1],
          [[[1,2,5+k],[0,1,2]],[[0,1,t],[2,3,8+k]],[[1,2,0,1,5+k],[0,1,3,-2,4],[2,4,0,2,10+2*k]],impossible][level-1],
          tr('Use row operations to solve the system.',"Använd radoperationer för att lösa ekvationssystemet."));
      case '1.3':
        return level===1 ? product(tr('A row times a column',"En rad gånger en kolumn"),[[2,t]],[[3],[4]]) :
          level===2 ? product(tr('Multiply two small matrices',"Multiplicera två små matriser"),standard,[[2,0],[t,1]]) :
          level===3 ? product(tr('Multiply rectangular matrices',"Multiplicera rektangulära matriser"),[[1,t,0],[2,1,-1]],[[1,0],[t,2],[3,1]]) :
          product(tr('Multiply with signs and zeroes',"Multiplicera med tecken och nollor"),[[1,-t,0],[2,1,-1],[0,3,1]],[[1,0,2],[t,2,-2],[3,1,0]]);
      case '1.4':
        return invert([tr('Undo a scaling',"Gör en skalning ogjord"),tr('Invert a 2 × 2 matrix',"Bestäm inversen till en 2 × 2-matris"),tr('Recognize a singular matrix',"Känn igen en singulär matris"),tr('Invert a 3 × 3 matrix',"Bestäm inversen till en 3 × 3-matris")][level-1],
          [[[t+1,0],[0,4]],[[1,t],[2,2*t+1]],[[1,t],[3,3*t]],[[1,t,0],[2,2*t+1,1],[0,1,2]]][level-1]);
      case '1.5':
        return invert([tr('Undo a row addition',"Gör en radaddition ogjord"),tr('Undo a row swap',"Gör ett radbyte ogjort"),tr('Invert an upper triangular matrix',"Bestäm inversen till en övre triangulär matris"),tr('Track every row operation',"Följ varje radoperation")][level-1],
          [[[1,t],[0,1]],[[0,1],[1,t]],triangle,[[0,1,1],[1,t,2],[2,1,1]]][level-1]);
      case '1.6': {
        const exercise = system([tr('Solve a homogeneous system',"Lös ett homogent system"),tr('Find the unique solution',"Hitta den entydiga lösningen"),tr('A consistent singular system',"Ett konsistent system med singulär matris"),tr('A singular system can be inconsistent',"Ett system med singulär matris kan sakna lösning")][level-1],
          [[[1,t,0],[0,2,0]],easy,free,impossible][level-1],
          tr('Solve Ax = b and use the number of solutions to decide whether the square coefficient matrix is invertible.',"Lös Ax = b och använd antalet lösningar för att avgöra om den kvadratiska koefficientmatrisen är inverterbar."));
        const invertible = level <= 2;
        exercise.answer += invertible ? tr('. A is invertible.',". A är inverterbar.") : tr('. A is singular.',". A är singulär.");
        exercise.steps.push(invertible ? tr('There is a pivot in every variable column, so the square matrix A has an inverse.',"Det finns en pivot i varje variabelkolumn, så den kvadratiska matrisen A har en invers.") : tr('A variable column is missing a pivot, so the square matrix A has no inverse.',"En variabelkolumn saknar pivot, så den kvadratiska matrisen A har ingen invers."));
        return exercise;
      }
      case '1.7': {
        const a=[[[t,0],[0,2]],triangle,[[2,t,0],[t,1,-2],[0,-2,3]],[[1,0,0],[t,1,0],[0,2,4]]][level-1];
        if(level===4) return invert(tr('Invert a lower triangular matrix',"Bestäm inversen till en undre triangulär matris"),a);
        const labels=[tr('Diagonal, upper triangular, lower triangular, and symmetric',"Diagonal, övre triangulär, undre triangulär och symmetrisk"),tr('Upper triangular only',"Endast övre triangulär"),tr('Symmetric only',"Endast symmetrisk")];
        return {title:tr('Identify the matrix structure',"Identifiera matrisens struktur"),prompt:tr('Which of these labels apply: diagonal, upper triangular, lower triangular, symmetric?\nA = ',"Vilka av dessa beskrivningar stämmer: diagonal, övre triangulär, undre triangulär, symmetrisk?\nA = ")+M.matrixText(a),answer:labels[level-1],
          steps:[tr('Mark the main diagonal from top left to bottom right.',"Markera huvuddiagonalen från övre vänstra hörnet till nedre högra hörnet."),tr('Upper triangular means all entries below it are zero. Lower triangular means all entries above it are zero. Diagonal means both conditions hold.',"Övre triangulär betyder att alla element under huvuddiagonalen är noll. Undre triangulär betyder att alla element ovanför den är noll. Diagonal betyder att båda villkoren gäller."),tr('For symmetry, compare each entry with its reflection across the diagonal.',"För att undersöka symmetri jämför du varje element med elementet på dess spegelplats på andra sidan huvuddiagonalen."), tr('Applying these tests gives: ',"När vi använder dessa test får vi: ")+labels[level-1]+'.']};
      }
      case '1.8':
        return transform([tr('Scale an arrow',"Skala en pil"),tr('Reflect a point',"Spegla en punkt"),tr('Mix three coordinates',"Kombinera tre koordinater"),tr('Project onto a plane',"Projicera på ett plan")][level-1],
          [[[2,0],[0,3]],[[1,0],[0,-1]],[[1,t,0],[0,1,1],[2,0,-1]],[[.5,.5,0],[.5,.5,0],[0,0,1]]][level-1],
          level<3?[t,2]:[t,3,-2]);
      case '1.9':
        return compose([tr('Scale then reflect',"Skala och spegla sedan"),tr('Rotate then shear',"Rotera och skjuva sedan"),tr('Two 3D transformations',"Två avbildningar i 3D"),tr('Compose two maps that lose information',"Sätt samman två avbildningar som förlorar information")][level-1],
          [[[2,0],[0,1]],[[0,-1],[1,0]],[[1,t,0],[0,1,0],[0,0,1]],[[1,0,0],[0,1,0],[0,0,0]]][level-1],
          [[[-1,0],[0,1]],[[1,t],[0,1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,0],[1,1,0],[0,0,1]]][level-1],
          level<3?[t,2]:[t,3,2]);
      case '1.10': {
        const problems=[
          [tr('Two ticket types',"Två sorters biljetter"),[[1,1,7+k],[2,4,20+2*k]],tr('x child tickets and y adult tickets were sold. There were ',"x barnbiljetter och y vuxenbiljetter såldes. Totalt såldes ")+(7+k)+tr(' tickets in all. Child tickets cost 2 credits and adult tickets cost 4 credits. The total was '," biljetter. Barnbiljetter kostar 2 krediter och vuxenbiljetter kostar 4 krediter. Totalsumman var ")+(20+2*k)+tr(' credits.'," krediter.")],
          [tr('Find a line from two points',"Bestäm en linje från två punkter"),[[1,1,3+k],[3,1,7+k]],tr('A line y = mx + b passes through (1, ',"En linje y = mx + b går genom (1, ")+(3+k)+tr(') and (3, ',") och (3, ")+(7+k)+tr('). In the system below x means m and y means b.',"). I systemet nedan står x för m och y för b.")],
          [tr('Find a quadratic from three points',"Bestäm en andragradsfunktion från tre punkter"),[[0,0,1,2+k],[1,1,1,6+k],[4,2,1,12+k]],tr('The curve f(s) = x s² + y s + z passes through (0, ',"Kurvan f(s) = x s² + y s + z går genom (0, ")+(2+k)+'), (1, '+(6+k)+tr('), and (2, ',"), och (2, ")+(12+k)+tr('). Use x, y and z as its coefficients.',"). Använd x, y och z som funktionens koefficienter.")],
          [tr('Flow with a free route',"Flöde med en fritt valbar väg"),[[1,1,0,12+k],[-1,0,1,0],[0,1,1,12+k]],tr('At node A, ',"Vid nod A kommer ")+(12+k)+tr(' units arrive and leave on routes x and y. At node B, x arrives and z leaves. At node C, y and z arrive and '," enheter in och lämnar via vägarna x och y. Vid nod B kommer x in och z lämnar. Vid nod C kommer y och z in och ")+(12+k)+tr(' units leave. Flows are nonnegative.'," enheter lämnar. Flödena är icke-negativa.")]
        ];
        const [title,m,prompt]=problems[level-1], exercise=system(title,m,prompt+tr(' Solve the model below.'," Lös modellen nedan."));
        if(level===4){exercise.answer+=tr(' with 0 ≤ s ≤ '," där 0 ≤ s ≤ ")+(12+k);exercise.steps.push(tr('The free variable is z = s, so x = s and y = ',"Den fria variabeln är z = s, så x = s och y = ")+(12+k)+tr(' − s. All flows are nonnegative exactly when 0 ≤ s ≤ '," − s. Alla flöden är icke-negativa precis när 0 ≤ s ≤ ")+(12+k)+'.');}
        return exercise;
      }
      case '1.11': return leontief(level,k);
    }
  }

  // Each item pairs the mathematical language with the term and its meaning.
  const glossary = [
    [[tr('Linear equation',"Linjär ekvation"),'x + 2y = 5',tr('Variables appear to the first power and are never multiplied together.',"Variablerna har exponenten ett och multipliceras aldrig med varandra.")],[tr('Augmented matrix',"Utökad matris"),'[1  2 | 5]',tr('The final column stores the right side of each equation.',"Den sista kolumnen innehåller varje ekvations högerled.")],[tr('Inconsistent system',"Inkonsistent system"),'0 = 4',tr('A contradiction means the equations have no common solution.',"En motsägelse betyder att ekvationerna saknar en gemensam lösning.")],[tr('Free variable',"Fri variabel"),'x = 3 − t, y = t',tr('A variable without a pivot can be chosen freely in a consistent system.',"I ett konsistent system kan en variabel utan pivot väljas fritt.")]],
    [[tr('Pivot',"Pivotelement"),'[0  1  3]',tr('The leading entry is the first nonzero entry in a row.',"Det ledande elementet är radens första element som inte är noll.")],[tr('Row replacement',"Radersättning"),'R₂ ← R₂ − 3R₁',tr('Change row 2 by subtracting three copies of row 1.',"Ändra rad 2 genom att subtrahera tre gånger rad 1.")],[tr('Row echelon form',"Trappstegsform"),'[1  2; 0  3]',tr('Leading entries move to the right as you go down, and entries below them are zero.',"De ledande elementen flyttas åt höger när du går nedåt, och elementen under dem är noll.")],[tr('Reduced row echelon form',"Reducerad trappstegsform"),'[1  0  2; 0  1  3]',tr('Each pivot is 1 and is the only nonzero entry in its column.',"Varje pivotelement är 1 och är det enda elementet i sin kolumn som inte är noll.")]],
    [[tr('Matrix dimensions',"Matrisens dimensioner"),'A ∈ ℝ²ˣ³',tr('Read dimensions as rows first, columns second.',"Läs dimensionerna som antal rader först och antal kolumner sedan.")],[tr('Matrix entry',"Matriselement"),'a₂₃',tr('The first index gives the row and the second gives the column.',"Det första indexet anger raden och det andra anger kolumnen.")],[tr('Compatible product',"Definierad matrisprodukt"),'(2 × 3)(3 × 4)',tr('The inner dimensions match and the result is 2 × 4.',"De inre dimensionerna stämmer överens och resultatet blir 2 × 4.")],[tr('Matrix transpose',"Matrisens transponat"),'(AB)ᵀ = BᵀAᵀ',tr('The transpose swaps rows with columns and reverses the order of a product.',"Transponering byter plats på rader och kolumner och vänder ordningen i en produkt.")]],
    [[tr('Identity matrix',"Enhetsmatris"),'AI = A',tr('The identity plays the role of 1 for matrix multiplication.',"Enhetsmatrisen har samma roll vid matrismultiplikation som talet 1 vid vanlig multiplikation.")],[tr('Matrix inverse',"Matrisinvers"),'AA⁻¹ = A⁻¹A = I',tr('Multiplying by the inverse undoes the matrix.',"Multiplikation med inversen gör matrisens verkan ogjord.")],[tr('Singular matrix',"Singulär matris"),tr('A⁻¹ does not exist',"A⁻¹ finns inte"),tr('A square matrix is singular when it has no inverse.',"En kvadratisk matris är singulär när den saknar invers.")],[tr('Inverse of a product',"Inversen till en produkt"),'(AB)⁻¹ = B⁻¹A⁻¹',tr('Undo the last action first, so the order reverses.',"Gör den sista åtgärden ogjord först. Därför vänds ordningen.")]],
    [[tr('Elementary matrix',"Elementärmatris"),tr('E = I with two rows swapped',"E = I med två rader ombytta"),tr('One elementary row operation applied to I makes E.',"En enda elementär radoperation på I ger E.")],[tr('Left multiplication',"Multiplikation från vänster"),'EA',tr('The row operation encoded in E acts on the rows of A.',"Den radoperation som E beskriver utförs på A:s rader.")],[tr('Augmenting by the identity',"Utökning med enhetsmatrisen"),'[A | I]',tr('Apply every row operation to both sides of the divider.',"Utför varje radoperation på båda sidor om skiljestrecket.")],[tr('Product of row operations',"Produkt av radoperationer"),'E₃E₂E₁A = I',tr('The rightmost elementary matrix acts first, and E₃E₂E₁ = A⁻¹.',"Elementärmatrisen längst till höger verkar först och E₃E₂E₁ = A⁻¹.")]],
    [[tr('Homogeneous system',"Homogent system"),'Ax = 0',tr('Every right-hand side is zero.',"Alla högerled är noll.")],[tr('Trivial solution',"Trivial lösning"),'x = 0',tr('The all-zero vector solves every homogeneous system.',"Nollvektorn löser varje homogent system.")],[tr('Invertibility test',"Test av inverterbarhet"),tr('Ax = 0 has only x = 0',"Ax = 0 har endast lösningen x = 0"),tr('For square A, only the trivial homogeneous solution means A is invertible.',"För en kvadratisk A innebär det att A är inverterbar om det homogena systemet endast har den triviala lösningen.")],[tr('Unique solvability',"Entydig lösbarhet"),tr('For every b, there is exactly one x with Ax = b',"För varje b finns exakt en x som uppfyller Ax = b"),tr('For square A this is equivalent to invertibility.',"För en kvadratisk A är detta likvärdigt med inverterbarhet.")]],
    [[tr('Diagonal matrix',"Diagonalmatris"),tr('aᵢⱼ = 0 when i ≠ j',"aᵢⱼ = 0 när i ≠ j"),tr('Every entry outside the main diagonal is zero.',"Varje element utanför huvuddiagonalen är noll.")],[tr('Upper triangular matrix',"Övre triangulär matris"),tr('aᵢⱼ = 0 when i > j',"aᵢⱼ = 0 när i > j"),tr('Entries below the diagonal are zero.',"Elementen under huvuddiagonalen är noll.")],[tr('Symmetric matrix',"Symmetrisk matris"),'Aᵀ = A',tr('The entries across the main diagonal match.',"Element på motsvarande platser på var sin sida om huvuddiagonalen är lika.")],[tr('Invertible triangular matrix',"Inverterbar triangulär matris"),tr('All aᵢᵢ ≠ 0',"Alla aᵢᵢ ≠ 0"),tr('A square triangular matrix is invertible precisely when every diagonal entry is nonzero.',"En kvadratisk triangulär matris är inverterbar precis när varje diagonalelement är skilt från noll.")]],
    [[tr('Matrix transformation',"Matrisavbildning"),'T(v) = Av',tr('Multiply the input column by the matrix to get the output.',"Multiplicera matrisen med indatakolumnen för att få resultatet.")],[tr('Image of a vector',"Bilden av en vektor"),'T(v) = w',tr('The output w is the image of v under T.',"Resultatet w är bilden av v under avbildningen T.")],[tr('Standard matrix columns',"Standardmatrisens kolumner"),'A = [T(e₁)  T(e₂)]',tr('Each column records where one coordinate direction goes.',"Varje kolumn visar vart en koordinatriktnings enhetsvektor avbildas.")],[tr('Linearity',"Linjäritet"),'T(su + tv) = sT(u) + tT(v)',tr('A linear map preserves weighted sums of vectors.',"En linjär avbildning bevarar viktade summor av vektorer.")]],
    [[tr('Composition',"Sammansättning"),'(S ∘ T)(v)',tr('Apply T first, then S.',"Tillämpa först T och sedan S.")],[tr('Identity transformation',"Identitetsavbildning"),tr('T(v) = v for all v',"T(v) = v för alla v"),tr('The identity sends every input back to itself.',"Identitetsavbildningen lämnar varje indata oförändrad.")],[tr('Matrix of a composition',"Matrisen för en sammansättning"),'[S ∘ T] = [S][T]',tr('The matrix of the second action is on the left.',"Matrisen för den andra åtgärden står till vänster.")],[tr('Inverse transformation',"Invers avbildning"),'S ∘ T = T ∘ S = id',tr('Each map undoes the other, so composing in either order gives the identity.',"Avbildningarna gör varandras verkan ogjord. Sammansättningen i valfri ordning ger därför identitetsavbildningen.")]],
    [[tr('Flow conservation',"Flödesbevarande"),tr('total inflow = total outflow',"totalt inflöde = totalt utflöde"),tr('At a node without storage, the amount coming in equals the amount leaving.',"Vid en nod utan lagring är mängden som kommer in lika stor som mängden som lämnar.")],[tr('Interpolation',"Interpolation"),'f(1) = 3, f(2) = 5',tr('An interpolating curve goes through the supplied points.',"En interpolerande kurva går genom de givna punkterna.")],[tr('Quadratic model linear in its coefficients',"Andragradsmodell som är linjär i sina koefficienter"),'xᵢ²a + xᵢb + c = yᵢ',tr('Known point coordinates are constants and the unknown coefficients occur to the first power.',"De kända punktkoordinaterna är konstanter och de obekanta koefficienterna har exponenten ett.")],[tr('Homogeneous balance equations',"Homogena balansekvationer"),'An = 0',tr('For chemical balancing, n is the vector of molecule counts and each element has zero net change.',"Vid kemisk balansering är n vektorn med antal molekyler och varje grundämne har nettoförändringen noll.")]],
    [[tr('External demand',"Extern efterfrågan"),'d',tr('This vector records orders from outside the model.',"Denna vektor anger beställningar från aktörer utanför modellen.")],[tr('Consumption coefficient',"Förbrukningskoefficient"),'cᵢⱼ',tr('This is the input from sector i needed for one unit of sector j output.',"Detta är insatsen från sektor i som behövs för att producera en enhet i sektor j.")],[tr('Open Leontief equation',"Öppen Leontiefekvation"),'x = Cx + d',tr('Total output covers internal use and external demand.',"Den totala produktionen täcker intern förbrukning och extern efterfrågan.")],[tr('Production multiplier',"Produktionsmultiplikator"),'(I − C)⁻¹',tr('Column j gives the change in production when outside demand for sector j rises by one unit.',"Kolumn j visar hur produktionen ändras när den externa efterfrågan på sektor j ökar med en enhet.")]]
  ];

  root.EmberChapter = {topics,makeProblem,glossary,system,solutionText,invert,product};
});
