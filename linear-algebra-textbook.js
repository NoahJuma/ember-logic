(window.EmberMathI18n?.register || ((_id,build)=>build()))("textbook", () => {
  'use strict';
  const tr=(en,sv)=>window.EmberMathI18n?.t(en,sv)??en;

  const M = window.EmberAlgebra;
  const C = window.EmberChapter;
  const solutions = {};
  const index = {
    '1.1':{pages:tr('pp. 8–10',"s. 8–10"),exercises:tr('Exercises 1–27, true/false and technology',"Uppgifter 1–27, sant/falskt och teknikuppgifter")},
    '1.2':{pages:tr('pp. 22–25',"s. 22–25"),exercises:tr('Exercise Set 1.2',"Övningsavsnitt 1.2")},
    '1.3':{pages:tr('pp. 37–39',"s. 37–39"),exercises:tr('Exercise Set 1.3',"Övningsavsnitt 1.3")},
    '1.4':{pages:tr('pp. 51–53',"s. 51–53"),exercises:tr('Exercise Set 1.4',"Övningsavsnitt 1.4")},
    '1.5':{pages:tr('pp. 60–61',"s. 60–61"),exercises:tr('Exercise Set 1.5',"Övningsavsnitt 1.5")},
    '1.6':{pages:tr('pp. 67–68',"s. 67–68"),exercises:tr('Exercise Set 1.6',"Övningsavsnitt 1.6")},
    '1.7':{pages:tr('pp. 74–76',"s. 74–76"),exercises:tr('Exercise Set 1.7',"Övningsavsnitt 1.7")},
    '1.8':{pages:tr('pp. 88–90',"s. 88–90"),exercises:tr('Exercise Set 1.8',"Övningsavsnitt 1.8")},
    '1.9':{pages:tr('pp. 96–98',"s. 96–98"),exercises:tr('Exercise Set 1.9',"Övningsavsnitt 1.9")},
    '1.10':{pages:tr('pp. 108–110',"s. 108–110"),exercises:tr('Exercise Set 1.10',"Övningsavsnitt 1.10")},
    '1.11':{pages:tr('pp. 114–115',"s. 114–115"),exercises:tr('Exercise Set 1.11',"Övningsavsnitt 1.11")},
    review:{pages:tr('pp. 115–117',"s. 115–117"),exercises:tr('Chapter 1 supplementary exercises',"Blandade uppgifter till kapitel 1")}
  };

  function add(set,number,problem) {
    (solutions[set]??=[]).push({number,...problem});
  }
  function note(set,number,title,answer,...steps) {
    add(set,number,{title,prompt:tr('Use exercise ',"Använd uppgift ")+number+tr(' in your copy of the textbook. Write your own answer or open the worked solution directly.'," i din lärobok. Skriv ditt eget svar eller öppna lösningen direkt."),answer,steps});
  }
  const one=(...args)=>note('1.1',...args);

  one('1',tr('Recognize linear equations',"Känn igen linjära ekvationer"),tr('Linear: a, c, f. Nonlinear: b, d, e.',"Linjära: a, c, f. Icke-linjära: b, d, e."),
    tr('Check each variable. It must appear by itself to the first power, multiplied by a constant.',"Kontrollera varje variabel. Den ska stå ensam i första graden, multiplicerad med en konstant."),
    tr('a: √2 is a constant. c: move all variable terms to one side. f: π, √2 and the cube root of 7 are constants. A variable can be missing.',"a: √2 är en konstant. c: flytta alla variabeltermer till samma sida. f: π, √2 och kubikroten ur 7 är konstanter. En variabel får saknas."),
    tr('b: two variables multiply each other. d and e: the first variable has an exponent other than 1.',"b: två variabler multipliceras med varandra. d och e: den första variabeln har en annan exponent än 1."));
  one('2',tr('Separate constants from variables',"Skilj konstanter från variabler"),tr('Linear: a, c, f. Nonlinear: b, d, e.',"Linjära: a, c, f. Icke-linjära: b, d, e."),
    tr('a: both roots are constants. c: the cosine has a constant input, so the coefficient is a number. f: subtract y from both sides to get x − y = 7.',"a: båda rötterna är konstanter. c: cosinus har ett konstant argument, så koefficienten är ett tal. f: subtrahera y från båda sidor och få x − y = 7."),
    tr('b: roots of the unknowns are nonlinear. d: cosine acts on the unknown x. e: x and y are multiplied.',"b: rötter ur de obekanta är icke-linjära. d: cosinus verkar på den obekanta x. e: x och y multipliceras."));
  one('3',tr('Build the general systems',"Skriv de allmänna systemen"),tr('a: 2 equations, 2 variables. b: 3 equations, 3 variables. c: 2 equations, 4 variables.',"a: 2 ekvationer, 2 variabler. b: 3 ekvationer, 3 variabler. c: 2 ekvationer, 4 variabler."),
    tr('In row i, write aᵢ₁x₁ + ⋯ + aᵢₙxₙ = bᵢ. The first index tells you which equation and the second tells you which variable.',"På rad i skriver du aᵢ₁x₁ + ⋯ + aᵢₙxₙ = bᵢ. Det första indexet anger ekvationen och det andra anger variabeln."),
    tr('a: write a₁₁x₁ + a₁₂x₂ = b₁ and a₂₁x₁ + a₂₂x₂ = b₂.',"a: skriv a₁₁x₁ + a₁₂x₂ = b₁ och a₂₁x₁ + a₂₂x₂ = b₂."),
    tr('b: use i = 1, 2, 3, and write aᵢ₁x₁ + aᵢ₂x₂ + aᵢ₃x₃ = bᵢ on each row.',"b: använd i = 1, 2, 3 och skriv aᵢ₁x₁ + aᵢ₂x₂ + aᵢ₃x₃ = bᵢ på varje rad."),
    tr('c: use i = 1, 2, and write aᵢ₁x₁ + aᵢ₂x₂ + aᵢ₃x₃ + aᵢ₄x₄ = bᵢ.',"c: använd i = 1, 2 och skriv aᵢ₁x₁ + aᵢ₂x₂ + aᵢ₃x₃ + aᵢ₄x₄ = bᵢ."));
  one('4',tr('Turn coefficients into rows',"Gör koefficienterna till rader"),tr('The augmented sizes are a: 2 × 3, b: 3 × 4, c: 2 × 5.',"De utökade matrisernas storlekar är a: 2 × 3, b: 3 × 4, c: 2 × 5."),
    tr('Copy each row’s coefficients in order and put bᵢ in the last column.',"Skriv varje rads koefficienter i ordning och placera bᵢ i den sista kolumnen."),
    'a: [a₁₁ a₁₂ | b₁], [a₂₁ a₂₂ | b₂].',
    'b: [a₁₁ a₁₂ a₁₃ | b₁], [a₂₁ a₂₂ a₂₃ | b₂], [a₃₁ a₃₂ a₃₃ | b₃].',
    'c: [a₁₁ a₁₂ a₁₃ a₁₄ | b₁], [a₂₁ a₂₂ a₂₃ a₂₄ | b₂].');
  one('5',tr('Read equations from the matrix',"Läs ut ekvationer ur matrisen"),tr('a: three equations in two variables. b: three equations in three variables.',"a: tre ekvationer med två variabler. b: tre ekvationer med tre variabler."),
    tr('Read each coefficient from left to right. Skip any zero terms. The last column goes after the equals sign.',"Läs varje koefficient från vänster till höger. Hoppa över nolltermer. Den sista kolumnen står efter likhetstecknet."),
    'a: 2x₁ = 0, 3x₁ − 4x₂ = 0, x₂ = 1.',
    'b: 3x₁ − 2x₃ = 5, 7x₁ + x₂ + 4x₃ = −3, −2x₂ + x₃ = 7.');
  one('6',tr('Read four coefficient columns',"Läs fyra koefficientkolumner"),tr('Each row gives one equation in x₁, x₂, x₃ and x₄.',"Varje rad ger en ekvation i x₁, x₂, x₃ och x₄."),
    tr('a: 3x₂ − x₃ − x₄ = −1 and 5x₁ + 2x₂ − 3x₄ = −6.',"a: 3x₂ − x₃ − x₄ = −1 och 5x₁ + 2x₂ − 3x₄ = −6."),
    tr('b: 3x₁ + x₃ − 4x₄ = 3, −4x₁ + 4x₃ + x₄ = −3, −x₁ + 3x₂ − 2x₄ = −9, and −x₄ = −2.',"b: 3x₁ + x₃ − 4x₄ = 3, −4x₁ + 4x₃ + x₄ = −3, −x₁ + 3x₂ − 2x₄ = −9 och −x₄ = −2."));
  one('7',tr('Keep empty variable positions',"Behåll platserna för variabler som saknas"),tr('The column after the bar is the right-hand side.',"Kolumnen efter strecket är högerledet."),
    'a: [−2 | 6], [3 | 8], [9 | −3].',
    'b: [6 −1 3 | 4], [0 5 −1 | 1].',
    'c: [0 2 0 −3 1 | 0], [−3 −1 1 0 0 | −1], [6 2 −1 2 −3 | 6].');
  one('8',tr('Build each augmented matrix',"Skriv varje utökad matris"),tr('Write one row per equation and use zero for a missing variable.',"Skriv en rad per ekvation och använd noll för en variabel som saknas."),
    'a: [3 −2 | −1], [4 5 | 3], [7 3 | 2].',
    'b: [2 0 2 | 1], [3 −1 4 | 7], [6 1 −1 | 0].',
    'c: [1 0 0 | 1], [0 1 0 | 2], [0 0 1 | 3].');
  function checkPoints(number,a,points) {
    const expected=M.vector(a.map(row=>row.at(-1)));
    const checks=points.map((v,i)=>{
      const left=a.map(row=>M.dot(row.slice(0,-1),v));
      const valid=left.every((n,j)=>M.zero(n-a[j].at(-1)));
      const products=a.map(row=>row.slice(0,-1).map((n,j)=>'('+n+' × '+M.format(v[j])+')').join(' + '));
      return [valid,tr('Part ',"Del ")+String.fromCharCode(97+i)+tr(': insert ',": sätt in ")+M.vector(v)+tr('. Left sides: ',". Vänsterled: ")+products.join(' ; ')+' → '+M.vector(left)+'. '+(valid?tr('All three match.',"Alla tre stämmer."):tr('At least one differs.',"Minst ett skiljer sig."))];
    });
    one(number,tr('Test each candidate point',"Pröva varje föreslagen punkt"),checks.map(([valid],i)=>String.fromCharCode(97+i)+': '+(valid?tr('yes',"ja"):tr('no',"nej"))).join(', '),
      tr('A solution must make all three equations true. Substitute the coordinates and compare with ',"En lösning måste göra alla tre ekvationerna sanna. Sätt in koordinaterna och jämför med ")+expected+'.',...checks.map(row=>row[1]));
  }
  checkPoints('9',[[2,-4,-1,1],[1,-3,1,1],[3,-5,-3,1]],[[3,1,1],[3,-1,1],[13,5,2],[13/2,5/2,2],[17,7,5]]);
  checkPoints('10',[[1,2,-2,3],[3,-1,1,1],[-1,5,-5,5]],[[5/7,8/7,1],[5/7,8/7,0],[5,8,1],[5/7,10/7,2/7],[5/7,22/7,2]]);
  one('11',tr('Find intersections',"Bestäm skärningspunkter"),tr('a: none. b: (1/2 + 2t, t). c: (−8, −4).',"a: inga. b: (1/2 + 2t, t). c: (−8, −4)."),
    tr('a: subtract twice equation 1 from equation 2. The result is 0 = 1, so the lines are parallel and distinct.',"a: subtrahera två gånger ekvation 1 från ekvation 2. Resultatet blir 0 = 1, så linjerna är parallella och åtskilda."),
    tr('b: subtract twice equation 1 from equation 2. The result is 0 = 0. Let y = t and use 2x − 4t = 1 to get x = 1/2 + 2t. Both equations describe the same line.',"b: subtrahera två gånger ekvation 1 från ekvation 2. Resultatet blir 0 = 0. Sätt y = t och använd 2x − 4t = 1 för att få x = 1/2 + 2t. Båda ekvationerna beskriver samma linje."),
    tr('c: subtract equation 1 from equation 2. This gives −2y = 8, so y = −4. Substitute into x − 2y = 0 to get x = −8. Both equations hold at that point.',"c: subtrahera ekvation 1 från ekvation 2. Då får vi −2y = 8, alltså y = −4. Sätt in detta i x − 2y = 0 och få x = −8. Båda ekvationerna gäller i den punkten."));
  one('12',tr('Compare the right-hand sides',"Jämför högerleden"),tr('No solution when b ≠ 2a. Infinitely many when b = 2a. Never exactly one.',"Ingen lösning när b ≠ 2a. Oändligt många när b = 2a. Aldrig exakt en."),
    tr('Subtract twice equation 1 from equation 2. All variable terms cancel and the new row reads 0 = b − 2a.',"Subtrahera två gånger ekvation 1 från ekvation 2. Alla variabeltermer tar ut varandra och den nya raden blir 0 = b − 2a."),
    tr('If b − 2a is nonzero, that is impossible. Otherwise one independent equation remains. Let y = t and solve for x to get x = (a + 3t)/2.',"Om b − 2a inte är noll är detta omöjligt. Annars återstår en oberoende ekvation. Sätt y = t och lös ut x för att få x = (a + 3t)/2."));
  function params(number,answers,steps) {
    one(number,tr('Describe all solutions with parameters',"Beskriv alla lösningar med parametrar"),answers.join('\n'),...steps);
  }
  params('13',['a: (x,y) = ((3 + 5t)/7,t).','b: x₁ = (7 + 5s − 4t)/3, x₂ = s, x₃ = t.',
    'c: x₁ = (−1 + 2r − 5s + 6t)/8, x₂ = r, x₃ = s, x₄ = t.','d: v = (8q − 2r + s − 4t)/3, w = q, x = r, y = s, z = t.'],
    [tr('In each equation, assign an independent parameter to every variable except the first.',"Tilldela varje variabel utom den första en egen oberoende parameter i varje ekvation."),
     tr('a: add 5t, then divide by 7. b: add 5s and subtract 4t, then divide by 3.',"a: addera 5t och dividera sedan med 7. b: addera 5s och subtrahera 4t, och dividera sedan med 3."),
     tr('c: move 2r − 5s + 6t to the right, then divide by −8.',"c: flytta 2r − 5s + 6t till höger och dividera sedan med −8."),
     tr('d: move −8q + 2r − s + 4t to the right, then divide by 3. All parameters may be any real numbers.',"d: flytta −8q + 2r − s + 4t till höger och dividera sedan med 3. Alla parametrar får vara vilka reella tal som helst.")]);
  params('14',['a: x = 2 − 10t, y = t.','b: x₁ = 3 − 3s + 12t, x₂ = s, x₃ = t.',
    'c: x₁ = (20 − 2r − 3s − t)/4, x₂ = r, x₃ = s, x₄ = t.','d: v = −q − r + 5s − 7t, w = q, x = r, y = s, z = t.'],
    [tr('Assign parameters to the later variables in each equation.',"Tilldela de senare variablerna parametrar i varje ekvation."),
     tr('a: subtract 10t. b: subtract 3s and add 12t.',"a: subtrahera 10t. b: subtrahera 3s och addera 12t."),
     tr('c: subtract 2r + 3s + t and divide by 4. d: subtract q + r − 5s + 7t.',"c: subtrahera 2r + 3s + t och dividera med 4. d: subtrahera q + r − 5s + 7t.")]);
  params('15',['a: x = (1 + 3t)/2, y = t.','b: x₁ = −4 − 3s + t, x₂ = s, x₃ = t.'],
    [tr('a: the second row is three times the first. Let y = t in the first row, add 3t, and divide by 2.',"a: den andra raden är tre gånger den första. Sätt y = t i den första raden, addera 3t och dividera med 2."),
     tr('b: the other two rows are 3 and −1 times row 1. Let x₂ = s and x₃ = t in row 1. Subtract 3s and add t to isolate x₁.',"b: de andra två raderna är 3 respektive −1 gånger rad 1. Sätt x₂ = s och x₃ = t i rad 1. Subtrahera 3s och addera t för att få x₁ ensamt.")]);
  params('16',['a: x₁ = (−4 − t)/3, x₂ = t.','b: x = −2 + s/2 − t, y = s, z = t.'],
    [tr('a: the first row is twice the second. In the second row, substitute t for x₂, subtract t, then divide by 3.',"a: den första raden är två gånger den andra. Sätt in t för x₂ i den andra raden, subtrahera t och dividera sedan med 3."),
     tr('b: rows 2 and 3 are 3 and −2 times the first. Use y = s and z = t in row 1, add s, subtract 2t, then divide by 2.',"b: raderna 2 och 3 är 3 respektive −2 gånger den första. Använd y = s och z = t i rad 1, addera s, subtrahera 2t och dividera sedan med 2.")]);
  one('17',tr('Make the first pivot a 1',"Gör den första pivoten till 1"),tr('a: R₁ ← R₁ + 2R₂. b: Swap R₁ and R₃.',"a: R₁ ← R₁ + 2R₂. b: Byt plats på R₁ och R₃."),
    tr('a: −3 + 2 × 2 = 1. Every entry stays integral. The new first row is [1 −7 8 | 8].',"a: −3 + 2 × 2 = 1. Alla element förblir heltal. Den nya första raden är [1 −7 8 | 8]."),
    tr('b: the third row already begins with 1, so move it to the top.',"b: den tredje raden börjar redan med 1, så flytta den överst."));
  one('18',tr('Make the first pivot without fractions',"Skapa den första pivoten utan bråk"),'a: R₁ ← R₁/2. b: R₁ ← R₁ − 2R₂.',
    tr('a: every entry in row 1 is even. Halving the row gives [1 2 −3 | 4].',"a: varje element på rad 1 är jämnt. Halvera raden och få [1 2 −3 | 4]."),
    tr('b: 7 − 2 × 3 = 1. Subtract twice row 2 from row 1 to get [1 −2 −18 | 0].',"b: 7 − 2 × 3 = 1. Subtrahera två gånger rad 2 från rad 1 för att få [1 −2 −18 | 0]."));
  one('19',tr('Check consistency with k',"Undersök lösbarheten med k"),tr('a: k ≠ 2. b: every real k.',"a: k ≠ 2. b: alla reella k."),
    tr('Subtract 4 times row 1 from row 2. In a the new row is [0, 8 − 4k | 18], so k = 2 creates a contradiction.',"Subtrahera 4 gånger rad 1 från rad 2. I a blir den nya raden [0, 8 − 4k | 18], så k = 2 ger en motsägelse."),
    tr('In b the new row is [0, 8 − 4k | 0]. For k = 2 it says 0 = 0 and gives infinitely many solutions. For all other k it has a pivot.',"I b blir den nya raden [0, 8 − 4k | 0]. När k = 2 säger den 0 = 0 och ger oändligt många lösningar. För alla andra k har den en pivot."));
  one('20',tr('Check two more parameter cases',"Kontrollera ytterligare två parameterfall"),tr('a: k = −5/2. b: every real k.',"a: k = −5/2. b: alla reella k."),
    tr('a: add twice row 1 to row 2. The result is [0 0 | 5 + 2k]. It is consistent exactly when 5 + 2k = 0.',"a: addera två gånger rad 1 till rad 2. Resultatet är [0 0 | 5 + 2k]. Systemet är lösbart precis när 5 + 2k = 0."),
    tr('b: add row 1 to row 2. The result is [k + 4, 0 | 0]. If k ≠ −4 it forces x₁ = 0. At k = −4 it is a zero row. Both cases are consistent.',"b: addera rad 1 till rad 2. Resultatet är [k + 4, 0 | 0]. Om k ≠ −4 måste x₁ = 0. När k = −4 är det en nollrad. Båda fallen är lösbara."));
  one('21',tr('Turn three points into a linear model',"Gör tre punkter till en linjär modell"),tr('Row i is [xᵢ² xᵢ 1 | yᵢ] for i = 1, 2, 3.',"Rad i är [xᵢ² xᵢ 1 | yᵢ] för i = 1, 2, 3."),
    tr('Substitute each point into y = ax² + bx + c to get xᵢ²a + xᵢb + c = yᵢ.',"Sätt in varje punkt i y = ax² + bx + c för att få xᵢ²a + xᵢb + c = yᵢ."),
    tr('The unknowns are a, b and c. The point’s xᵢ and yᵢ are known numbers, so the equation is linear in the unknowns.',"De obekanta är a, b och c. Punktens xᵢ och yᵢ är kända tal, så ekvationen är linjär i de obekanta."));
  one('22',tr('Explain why row operations work',"Förklara varför radoperationer fungerar"),tr('Each operation can be undone, so both systems have exactly the same solutions.',"Varje operation kan göras ogjord, så båda systemen har exakt samma lösningar."),
    tr('Swap rows: swap them again. It only changes the order of equations.',"Byt plats på rader: byt tillbaka igen. Bara ekvationernas ordning ändras."),
    tr('Multiply by k ≠ 0: divide by k. Both sides of the equation change together.',"Multiplicera med k ≠ 0: dividera med k. Ekvationens båda led ändras tillsammans."),
    tr('Add k copies of another row: subtract k copies of that same unchanged row. An answer satisfies the old equations exactly when it satisfies the new ones.',"Addera k gånger en annan rad: subtrahera k gånger samma oförändrade rad. Ett svar uppfyller de gamla ekvationerna precis när det uppfyller de nya."));
  one('23',tr('When are two equations the same?',"När är två ekvationer samma?"),tr('k = l and c = d.',"k = l och c = d."),
    tr('Each equation assigns exactly one x₁ to every x₂. At x₂ = 0 both give x₁ = c = d.',"Varje ekvation ger exakt ett x₁ för varje x₂. Vid x₂ = 0 ger båda x₁ = c = d."),
    tr('At x₂ = 1 both give x₁ = c − k = d − l. Since c = d, subtract it to get k = l.',"Vid x₂ = 1 ger båda x₁ = c − k = d − l. Eftersom c = d kan vi subtrahera detta och få k = l."));
  one('24',tr('Picture three lines',"Föreställ dig tre linjer"),tr('a: no common point. b: one common point. c: all three lines coincide.',"a: ingen gemensam punkt. b: en gemensam punkt. c: alla tre linjer sammanfaller."),
    tr('a: a distinct parallel pair prevents a common point. If there is an intersecting pair, its intersection must fail to lie on the third line.',"a: ett par åtskilda parallella linjer hindrar en gemensam punkt. Om ett par linjer skär varandra måste deras skärningspunkt ligga utanför den tredje linjen."),
    tr('b: there is an intersecting pair and its intersection lies on the third line. The third line may coincide with one of the pair.',"b: ett par linjer skär varandra och skärningspunkten ligger på den tredje linjen. Den tredje linjen kan sammanfalla med en av de två."),
    tr('c: two distinct lines share at most one point, so infinitely many shared points force all three lines to be the same.',"c: två olika linjer delar högst en punkt, så oändligt många gemensamma punkter kräver att alla tre linjerna är samma linje."));
  one('25',tr('Translate a nutrition model',"Översätt en näringsmodell till ekvationer"),'2x + 3y + z = 7, 2x + y + 3z = 9, 4x + 2y + 5z = 16.',
    tr('Let x, y and z be ounces of the three foods.',"Låt x, y och z vara antalet ounces av de tre livsmedlen."),
    tr('Each equation is one nutrient total: fat first, protein second and carbohydrates third. Multiply the amount of each food by its nutrient per ounce and add.',"Varje ekvation anger ett totalt näringsinnehåll: först fett, sedan protein och sist kolhydrater. Multiplicera mängden av varje livsmedel med dess näringsinnehåll per ounce och addera."));
  one('26',tr('Set up the parabola',"Ställ upp parabeln"),tr('a + b + c = 1, 4a + 2b + c = 4, a − b + c = 1. Expect one solution.',"a + b + c = 1, 4a + 2b + c = 4, a − b + c = 1. Förvänta dig en lösning."),
    tr('Substitute x = 1, 2 and −1 into ax² + bx + c. Set each result equal to the matching y-coordinate.',"Sätt in x = 1, 2 och −1 i ax² + bx + c. Sätt varje resultat lika med motsvarande y-koordinat."),
    tr('The three x-coordinates are distinct. The difference of two possible answers would be a degree-at-most-two polynomial with three distinct zeros, so the difference would have to be identically zero.',"De tre x-koordinaterna är olika. Skillnaden mellan två möjliga svar skulle vara ett polynom av grad högst två med tre olika nollställen, så skillnaden måste vara identiskt noll."));
  one('27',tr('Translate three statements',"Översätt tre påståenden till ekvationer"),'x + y + z = 12, 2x + y + 2z = 5, z − x = 1.',
    tr('Use x, y and z in the same order as the three numbers.',"Använd x, y och z i samma ordning som de tre talen."),
    tr('The second sentence counts x and z twice. The last sentence says z = x + 1, so move x to the left.',"Den andra meningen räknar x och z två gånger. Den sista säger z = x + 1, så flytta x till vänster."));
  one('TF',tr('True or false',"Sant eller falskt"),'a T · b F · c T · d T · e F · f F · g T · h F',
    tr('a: the zero vector solves every homogeneous system. b: multiplying by zero cannot be undone.',"a: nollvektorn löser varje homogent system. b: multiplikation med noll kan inte göras ogjord."),
    tr('c: equation 2 has the same left side as twice equation 1. It is either redundant or contradictory. d: a linear equation has a nonzero coefficient on at least one variable, so at least one other variable can be chosen freely.',"c: ekvation 2 har samma vänsterled som två gånger ekvation 1. Den är antingen överflödig eller motsägelsefull. d: en linjär ekvation har en koefficient som inte är noll framför minst en variabel, så minst en annan variabel kan väljas fritt."),
    tr('e: repeating x = 1 creates more equations with the same solution. f: multiplying equations by a nonzero constant keeps the original solutions. For example, 2x = 2 still has x = 1, not x = 2.',"e: upprepa x = 1 för att få fler ekvationer med samma lösning. f: om ekvationerna multipliceras med en konstant som inte är noll behålls de ursprungliga lösningarna. Till exempel har 2x = 2 fortfarande x = 1, inte x = 2."),
    tr('g: subtracting is adding −1 times another row. h: the bottom row says 0 = −1.',"g: subtraktion är addition av −1 gånger en annan rad. h: den nedersta raden säger 0 = −1."));
  one('T1',tr('Compare the three example systems',"Jämför de tre exempelsystemen"),tr('Example 2: (7/3, 4/3). Example 3: none. Example 4: (1/4 + t/2, t).',"Exempel 2: (7/3, 4/3). Exempel 3: ingen. Exempel 4: (1/4 + t/2, t)."),
    tr('Example 2: add twice equation 1 with a minus sign to equation 2. This gives 3y = 4, then x = 1 + y.',"Exempel 2: addera två gånger ekvation 1 med minustecken till ekvation 2. Då får vi 3y = 4 och sedan x = 1 + y."),
    tr('Example 3: subtract three copies of the first equation from the second. The result is 0 = −6.',"Exempel 3: subtrahera tre gånger den första ekvationen från den andra. Resultatet blir 0 = −6."),
    tr('Example 4: subtract four copies of the first equation from the second. The result is 0 = 0. Put y = t in equation 1 and solve for x.',"Exempel 4: subtrahera fyra gånger den första ekvationen från den andra. Resultatet blir 0 = 0. Sätt y = t i ekvation 1 och lös ut x."));
  one('T2',tr('Check the printed point data',"Kontrollera de tryckta punktuppgifterna"),tr('If the first and third entries are x and y, the result is a = −5/2, b = 3/2, c = 8.',"Om det första och tredje elementet är x och y blir resultatet a = −5/2, b = 3/2, c = 8."),
    tr('The printed items have three entries each, while y = ax² + bx + c uses point pairs. Treating the middle entry as x² gives (−1,4), (0,8), (1,7).',"De tryckta uppgifterna innehåller tre element vardera, medan y = ax² + bx + c använder punktpar. Om det mittersta elementet tolkas som x² får vi (−1,4), (0,8), (1,7)."),
    tr('The middle point gives c = 8. The other points give a − b = −4 and a + b = −1.',"Den mittersta punkten ger c = 8. De andra punkterna ger a − b = −4 och a + b = −1."),
    tr('Add to get 2a = −5. Substitute a = −5/2 into a + b = −1 to get b = 3/2. This solution depends on that reading of the printed data.',"Addera för att få 2a = −5. Sätt in a = −5/2 i a + b = −1 och få b = 3/2. Lösningen beror på denna tolkning av de tryckta uppgifterna."));

  const systems12=[
    [[1,1,2,8],[-1,-2,3,1],[3,-7,4,10]],
    [[2,2,2,0],[-2,5,2,1],[8,1,4,-1]],
    [[1,-1,2,-1,-1],[2,1,-2,-2,-2],[-1,2,-4,1,1],[3,0,0,-3,-3]],
    [[0,-2,3,1],[3,6,-3,-2],[6,6,3,5]]
  ];
  systems12.forEach((a,i)=>add('1.2',String(9+i),C.system(tr('Gauss–Jordan elimination',"Gauss–Jordanelimination"),a)));
  note('1.2','13',tr('Count equations and unknowns',"Räkna ekvationer och obekanta"),tr('The system has nontrivial solutions.',"Systemet har icke-triviala lösningar."),
    tr('There are three equations and four unknowns, so there can be at most three pivots.',"Det finns tre ekvationer och fyra obekanta, så det kan finnas högst tre pivoter."),
    tr('At least one variable is free. The right-hand sides are zero, so the system is consistent. Choosing a nonzero value for a free variable gives a nonzero solution.',"Minst en variabel är fri. Högerleden är noll, så systemet är lösbart. Välj ett värde som inte är noll för en fri variabel för att få en lösning som inte är nollvektorn."));
  note('1.2','23',tr('Read the pivots without knowing the asterisks',"Läs pivoterna utan att känna till asteriskerna"),tr('a: unique. b: infinitely many. c: inconsistent. d: inconclusive.',"a: entydig. b: oändligt många. c: olösbart. d: går inte att avgöra."),
    tr('a: all three variable columns have pivots. b: two pivots and a zero row leave a free variable. c: the bottom row says 0 = 1.',"a: alla tre variabelkolumner har pivoter. b: två pivoter och en nollrad lämnar en fri variabel. c: den nedersta raden säger 0 = 1."),
    tr('d: the third row fixes the third variable. If the coefficient in row 2 is zero, that row is harmless. If it is nonzero, it forces the third variable to zero, which may conflict with row 3. So the system might be consistent or inconsistent.',"d: den tredje raden bestämmer den tredje variabeln. Om koefficienten på rad 2 är noll är raden ofarlig. Om den inte är noll tvingar den den tredje variabeln att bli noll, vilket kan strida mot rad 3. Systemet kan alltså vara lösbart eller olösbart."));

  note('1.3','1',tr('Check matrix dimensions',"Kontrollera matrisernas dimensioner"),tr('a: undefined. b: 4 × 4. c: 4 × 2. d: 5 × 2. e: 4 × 5. f: 5 × 5.',"a: odefinierad. b: 4 × 4. c: 4 × 2. d: 5 × 2. e: 4 × 5. f: 5 × 5."),
    tr('a: B has 5 columns and A has 4 rows, so BA is undefined. b: Bᵀ is 5 × 4, so (4 × 5)(5 × 4) gives 4 × 4.',"a: B har 5 kolumner och A har 4 rader, så BA är odefinierad. b: Bᵀ är 5 × 4, så (4 × 5)(5 × 4) ger 4 × 4."),
    tr('c: AC is 4 × 2 and can be added to D. d: multiply E, of size 5 × 4, by AC, of size 4 × 2.',"c: AC är 4 × 2 och kan adderas till D. d: multiplicera E, som är 5 × 4, med AC, som är 4 × 2."),
    tr('e: Eᵀ is 4 × 5, so the subtraction fits. f: the sum is 4 × 5 and E is 5 × 4, giving a 5 × 5 result.',"e: Eᵀ är 4 × 5, så subtraktionen fungerar. f: summan är 4 × 5 och E är 5 × 4, vilket ger ett resultat av storlek 5 × 5."));
  note('1.3','2',tr('Check six more expressions',"Kontrollera ytterligare sex uttryck"),tr('a: 5 × 4. b: undefined. c: 4 × 2. d: 2 × 4. e: 5 × 2. f: undefined.',"a: 5 × 4. b: odefinierad. c: 4 × 2. d: 2 × 4. e: 5 × 2. f: odefinierad."),
    tr('a: C has 2 columns and Dᵀ has 2 rows, so CDᵀ exists and is 5 × 4. b: D has 2 columns but C has 5 rows.',"a: C har 2 kolumner och Dᵀ har 2 rader, så CDᵀ finns och är 5 × 4. b: D har 2 kolumner men C har 5 rader."),
    tr('c: BC and D are 4 × 2. d: BE is 4 × 4, so Dᵀ(BE) is 2 × 4.',"c: BC och D är 4 × 2. d: BE är 4 × 4, så Dᵀ(BE) är 2 × 4."),
    tr('e: BᵀD and ED are both 5 × 2. f: BAᵀ is 4 × 4 and D is 4 × 2, so they cannot be added.',"e: BᵀD och ED är båda 5 × 2. f: BAᵀ är 4 × 4 och D är 4 × 2, så de kan inte adderas."));

  function inverse2(set,number,a,both=false) {
    const [[p,q],[r,s]]=a, det=p*s-q*r;
    const steps=[tr('Compute ad − bc: (',"Beräkna ad − bc: (")+p+' × '+s+') − ('+q+' × '+r+') = '+det+'.'];
    if(det) steps.push(tr('Swap the diagonal entries and reverse the signs off the diagonal. Then divide each entry by ',"Byt plats på diagonalelementen och byt tecken utanför diagonalen. Dividera sedan varje element med ")+det+'.');
    else steps.push(tr('The formula would divide by zero, so this matrix is singular.',"Formeln skulle ge division med noll, så matrisen är singulär."));
    if(both) steps.push(...M.inverse(a).steps);
    add(set,number,{title:tr('Find the inverse',"Bestäm inversen"),prompt:tr('Use the textbook matrix A = ',"Använd lärobokens matris A = ")+M.matrixText(a)+'.',answer:det?M.matrixText([[s/det,-q/det],[-r/det,p/det]]):tr('No inverse',"Ingen invers"),steps});
  }
  [[[2,-3],[4,4]],[[3,1],[5,2]],[[2,0],[0,3]],[[6,4],[-2,-1]]].forEach((a,i)=>inverse2('1.4',String(5+i),a));
  [[[1,4],[2,7]],[[2,-4],[-4,8]],[[1,-5],[3,-16]],[[6,4],[-3,-2]]].forEach((a,i)=>inverse2('1.5',['9a','9b','10a','10b'][i],a,true));

  function solveWithInverse(set,number,a,b,prompt) {
    const inv=M.inverse(a);
    const v=M.apply(inv.value,b);
    add(set,number,{title:tr('Solve by inverting a matrix',"Lös genom att invertera en matris"),prompt,answer:M.vector(v),
      steps:[...inv.steps,tr('Multiply both sides of Ax = b by A⁻¹. Since A⁻¹A = I, this leaves x = A⁻¹b.',"Multiplicera båda sidor av Ax = b med A⁻¹. Eftersom A⁻¹A = I återstår x = A⁻¹b."),
      ...inv.value.map((row,i)=>tr('Entry ',"Element ")+(i+1)+' = '+row.map((n,j)=>'('+M.format(n)+' × '+M.format(b[j])+')').join(' + ')+' = '+M.format(v[i])+'.')]});
  }
  [
    [[[1,1],[5,6]],[2,9]], [[[4,-3],[2,-5]],[-3,9]],
    [[[1,3,1],[2,2,1],[2,3,1]],[4,-1,3]], [[[5,3,2],[3,3,2],[0,1,1]],[4,2,5]]
  ].forEach(([a,b],i)=>solveWithInverse('1.6',String(i+1),a,b,tr('Solve Ax = b, with A = ',"Lös Ax = b, med A = ")+M.matrixText(a)+tr(' and b = '," och b = ")+M.vector(b)+'.'));

  note('1.7','1',tr('Classify the first four matrices',"Klassificera de första fyra matriserna"),tr('a: upper. b: lower. c: upper and lower. d: upper.',"a: övre. b: undre. c: övre och undre. d: övre."),
    tr('Look below the main diagonal to test for upper triangular, and above it to test for lower triangular.',"Titta under huvuddiagonalen för att testa övre triangulär form och ovanför den för att testa undre triangulär form."),
    tr('a and d have zeros below the diagonal. b has zeros above it. c has zeros on both sides, so it is also diagonal.',"a och d har nollor under diagonalen. b har nollor ovanför den. c har nollor på båda sidor och är därför också diagonal."));
  note('1.7','7–10',tr('Raise diagonal matrices to powers',"Upphöj diagonalmatriser till potenser"),tr('Each diagonal entry is raised to the requested power independently.',"Varje diagonalelement upphöjs för sig till den efterfrågade potensen."),
    tr('A diagonal matrix acts on each coordinate separately. Applying it twice squares every diagonal entry.',"En diagonalmatris verkar på varje koordinat separat. Två tillämpningar kvadrerar varje diagonalelement."),
    tr('All diagonal entries in these questions are nonzero, so invert by replacing each with its reciprocal.',"Alla diagonalelement i dessa uppgifter är skilda från noll, så invertera genom att ersätta vart och ett med sitt inverterade tal."),
    tr('7: apply the powers to (1, −2). 8: apply them to (−6, 3, 5).',"7: använd potenserna på (1, −2). 8: använd dem på (−6, 3, 5)."),
    tr('9: apply them to (1/2, 1/3, 1/4). 10: apply them to (−2, −4, −3, 2). For A⁻ᵏ, the new entry is 1 divided by the kth power of the original entry.',"9: använd dem på (1/2, 1/3, 1/4). 10: använd dem på (−2, −4, −3, 2). För A⁻ᵏ blir det nya elementet 1 dividerat med det ursprungliga elementets k:te potens."));

  note('1.8','1–2',tr('Read domain and codomain',"Läs definitionsmängd och målmängd"),'1a: ℝ² → ℝ³. 1b: ℝ³ → ℝ². 2a: ℝ⁵ → ℝ⁴. 2b: ℝ⁴ → ℝ⁵.',
    tr('An m × n matrix has n entries in each row, so it needs an input with n coordinates.',"En m × n-matris har n element på varje rad, så den behöver en indata med n koordinater."),
    tr('Every row makes one output coordinate. There are m rows, so the codomain is ℝᵐ. Apply that rule to each pair of dimensions.',"Varje rad skapar en utdatas koordinat. Det finns m rader, så målmängden är ℝᵐ. Använd regeln på varje dimensionspar."));
  note('1.8','31–32',tr('Reflect a point in the coordinate planes',"Spegla en punkt i koordinatplanen"),'31: (2, −5, −3), (2, 5, 3), (−2, −5, 3). 32: (a, b, −c), (a, −b, c), (−a, b, c).',
    tr('An xy reflection flips z, so use diagonal entries (1, 1, −1). An xz reflection flips y, and a yz reflection flips x.',"Spegling i xy-planet byter tecken på z, så använd diagonalelementen (1, 1, −1). Spegling i xz-planet byter tecken på y, och spegling i yz-planet byter tecken på x."),
    tr('Multiply the corresponding coordinate by −1 and leave the other two alone in each case.',"Multiplicera motsvarande koordinat med −1 och låt de andra två vara oförändrade i varje fall."));

  note('1.9','1',tr('Check if two actions commute',"Kontrollera om två operationer kommuterar"),tr('Neither pair commutes.',"Inget av paren kommuterar."),
    tr('a: apply the x-axis projection first to (x,y) to get (x,0), then swap coordinates to get (0,x). In the opposite order the result is (y,0).',"a: projicera först (x,y) på x-axeln och få (x,0), och byt sedan koordinater för att få (0,x). I omvänd ordning blir resultatet (y,0)."),
    tr('b: reflect in the x-axis after swapping to get (y,−x). Swap after reflecting in the x-axis to get (−y,x). The formulas differ.',"b: spegla i x-axeln efter koordinatbytet och få (y,−x). Byt koordinater efter speglingen i x-axeln och få (−y,x). Formlerna skiljer sig."));
  note('1.9','2',tr('Compare two more pairs',"Jämför ytterligare två par"),tr('a: yes. b: no.',"a: ja. b: nej."),
    tr('a: projecting onto either axis and then onto the other sends every vector to (0,0).',"a: projektion på den ena axeln och sedan på den andra skickar varje vektor till (0,0)."),
    tr('b: take (1,0). Rotating 45° then reflecting in the y-axis gives (−√2/2, √2/2). Reflecting first then rotating gives (−√2/2, −√2/2).',"b: välj (1,0). Rotation 45° följd av spegling i y-axeln ger (−√2/2, √2/2). Spegling först och sedan rotation ger (−√2/2, −√2/2)."));

  function fit(set,n,points) {
    const a=points.map(([x,y])=>[...points.map((_,i)=>x**(points.length-i-1)),y]);
    const result=M.solve(a);
    const powers=points.length===3?'a x² + b x + c':'a x³ + b x² + c x + d';
    const polynomial = result.point.map((value,i)=>{
      const degree = points.length-i-1;
      return '('+M.format(value)+')'+(degree===0?'':degree===1?'x':degree===2?'x²':'x³');
    }).join(' + ');
    add(set,n,{title:tr('Find the interpolating polynomial',"Bestäm interpolationspolynomet"),prompt:tr('Fit ',"Anpassa ")+powers+tr(' through '," genom ")+points.map(M.vector).join(', ')+'.',
      answer:'p(x) = '+polynomial+tr('\nCoefficients in descending order: ',"\nKoefficienter i fallande ordning: ")+M.vector(result.point),
      steps:[tr('Substitute each x into each power and put the observed y on the right. Every point gives one row.',"Sätt in varje x i varje potens och skriv det observerade y-värdet till höger. Varje punkt ger en rad."),...result.steps]});
  }
  fit('1.10','13',[[1,1],[2,2],[3,5]]);
  fit('1.10','14',[[0,0],[-1,1],[1,1]]);
  fit('1.10','15',[[-1,-1],[0,1],[1,3],[4,-1]]);
  note('1.10','9',tr('Balance propane combustion',"Balansera förbränning av propan"),'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.',
    tr('Start with one propane molecule. Its three carbon atoms require three CO₂ molecules.',"Börja med en propanmolekyl. Dess tre kolatomer kräver tre CO₂-molekyler."),
    tr('Its eight hydrogen atoms require four H₂O molecules.',"Dess åtta väteatomer kräver fyra H₂O-molekyler."),
    tr('The products now contain 3 × 2 + 4 × 1 = 10 oxygen atoms. Each O₂ contains two, so use five.',"Produkterna innehåller nu 3 × 2 + 4 × 1 = 10 syreatomer. Varje O₂ innehåller två, så använd fem."));
  note('1.10','10',tr('Balance the fermentation reaction',"Balansera jäsningsreaktionen"),'C₆H₁₂O₆ → 2CO₂ + 2C₂H₅OH.',
    tr('One glucose molecule contributes 12 hydrogen atoms. Each ethanol molecule has six, so take two ethanol molecules.',"En glukosmolekyl bidrar med 12 väteatomer. Varje etanolmolekyl har sex, så välj två etanolmolekyler."),
    tr('Two ethanols use four carbons. The two remaining carbons make two CO₂ molecules.',"Två etanolmolekyler använder fyra kolatomer. De två återstående kolatomerna bildar två CO₂-molekyler."),
    tr('The oxygen atoms total 2 × 2 + 2 × 1 = 6 on the right, matching the left.',"Syreatomerna är totalt 2 × 2 + 2 × 1 = 6 till höger, vilket stämmer med vänsterledet."));
  note('1.10','11',tr('Balance a reaction with fluorine',"Balansera en reaktion med fluor"),'CH₃COF + H₂O → CH₃COOH + HF.',
    tr('Start with one molecule of CH₃COF. Its two carbons belong in one molecule of CH₃COOH, and its fluorine belongs in one HF.',"Börja med en molekyl CH₃COF. Dess två kolatomer hör hemma i en molekyl CH₃COOH och dess fluor i en HF."),
    tr('The products use five hydrogens and two oxygens. The original molecule provides three hydrogens and one oxygen, so add one water.',"Produkterna använder fem väteatomer och två syreatomer. Den ursprungliga molekylen bidrar med tre väteatomer och en syreatom, så lägg till en vattenmolekyl."));
  note('1.10','12',tr('Balance photosynthesis',"Balansera fotosyntesen"),'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.',
    tr('One glucose molecule needs six carbons, so take six CO₂. It needs twelve hydrogens, so take six H₂O.',"En glukosmolekyl behöver sex kolatomer, så välj sex CO₂. Den behöver tolv väteatomer, så välj sex H₂O."),
    tr('The left side has 18 oxygen atoms. Six go into glucose and the remaining twelve make six O₂.',"Vänsterledet har 18 syreatomer. Sex går till glukosen och de återstående tolv bildar sex O₂."));
  solutions['1.10'].sort((a,b)=>Number(a.number)-Number(b.number));

  [
    [[[.1,.3],[.5,.4]],[50,60]],[[[.3,.1],[.3,.7]],[22,14]]
  ].forEach(([c,d],i)=>{
    const a=c.map((row,j)=>row.map((n,k)=>Number(j===k)-n));
    solveWithInverse('1.11',String(i+5),a,d,tr('Find x with C = ',"Bestäm x med C = ")+M.matrixText(c)+tr(' and external demand '," och extern efterfrågan ")+M.vector(d)+'.');
    solutions['1.11'].at(-1).steps.unshift(tr('Production covers internal use and demand: x = Cx + d. Rearrange to (I − C)x = d.',"Produktionen täcker intern förbrukning och efterfrågan: x = Cx + d. Skriv om till (I − C)x = d."));
  });
  function production(number,c,d,useInverse=false) {
    const a=c.map((row,i)=>row.map((n,j)=>Number(i===j)-n));
    const demand=tr('Read C from the input table and find the production vector for external demand d = ',"Läs C ur insatstabellen och bestäm produktionsvektorn för extern efterfrågan d = ")+M.vector(d)+'.';
    const model=[tr('Put provider sectors on the rows and output sectors on the columns. This gives C = ',"Placera levererande sektorer på raderna och producerande sektorer i kolumnerna. Detta ger C = ")+M.matrixText(c)+'.',
      tr('Write x = Cx + d. Move Cx to the left to get (I − C)x = d.',"Skriv x = Cx + d. Flytta Cx till vänster för att få (I − C)x = d."),
      tr('Subtract the entries of C from the identity to get I − C = ',"Subtrahera elementen i C från identitetsmatrisen för att få I − C = ")+M.matrixText(a)+'.'];
    if(useInverse) {
      solveWithInverse('1.11',number,a,d,demand);
      solutions['1.11'].at(-1).steps.unshift(...model);
      return;
    }
    const result=M.solve(a.map((row,i)=>[...row,d[i]]));
    add('1.11',number,{title:tr('Find the required production',"Bestäm den nödvändiga produktionen"),prompt:demand,answer:'C = '+M.matrixText(c)+tr('. Production = ',". Produktion = ")+M.vector(result.point)+'.',
      steps:[...model,...result.steps]});
  }
  production('1',[[.5,.25],[.25,.1]],[7000,14000]);
  production('2',[[.3,.2],[.1,.6]],[130000,130000]);
  production('3',[[.1,.6,.4],[.3,.2,.3],[.4,.1,.2]],[1930,3860,5790]);
  production('4',[[.4,.2,.45],[.3,.35,.3],[.15,.1,.2]],[5400,2700,900]);
  note('1.11','7',tr('A sector uses all its own output',"En sektor förbrukar hela sin egen produktion"),tr('Demand (2,0) is possible. Demand (2,1) is impossible.',"Efterfrågan (2,0) är möjlig. Efterfrågan (2,1) är omöjlig."),
    tr('Subtract C from I to get diagonal entries 1/2 and 0. The equations become x₁/2 = d₁ and 0 = d₂.',"Subtrahera C från I och få diagonalelementen 1/2 och 0. Ekvationerna blir x₁/2 = d₁ och 0 = d₂."),
    tr('For (2,0), choose x₁ = 4 and any nonnegative x₂. For (2,1), the second equation says 0 = 1.',"För (2,0), välj x₁ = 4 och ett valfritt icke-negativt x₂. För (2,1) säger den andra ekvationen 0 = 1."),
    tr('Sector 2 uses its full output internally, leaving zero units to sell outside.',"Sektor 2 använder hela sin produktion internt och har därför noll enheter kvar att sälja utanför modellen."));
  const equalDemand=M.solve([[1/2,-1/4,-1/4,1],[-1/2,7/8,-1/4,1],[-1/2,-1/4,7/8,1]]);
  note('1.11','8',tr('Compare the outputs',"Jämför produktionerna"),tr('The first sector must produce the most for equal positive outside demand.',"Den första sektorn måste producera mest vid lika stor positiv extern efterfrågan."),
    tr('Take the common demand to be 1 first. Other positive common demands simply scale the three outputs.',"Sätt först den gemensamma efterfrågan till 1. Andra positiva gemensamma efterfrågevärden skalar bara de tre produktionerna."),
    ...equalDemand.steps,tr('The first coordinate is largest, so sector 1 produces the most for every positive common demand.',"Den första koordinaten är störst, så sektor 1 producerar mest vid varje positiv gemensam efterfrågan."));
  note('1.11','9',tr('Prove that every demand has one solution',"Bevisa att varje efterfrågan har en lösning"),tr('The inequality guarantees a nonzero determinant, so I − C is invertible.',"Olikheten garanterar en determinant som inte är noll, så I − C är inverterbar."),
    tr('Form I − C = [1 − c₁₁, −c₁₂; −c₂₁, 1].',"Bilda I − C = [1 − c₁₁, −c₁₂; −c₂₁, 1]."),
    tr('Its determinant is (1 − c₁₁) × 1 − c₁₂c₂₁. By the given inequality this is positive.',"Dess determinant är (1 − c₁₁) × 1 − c₁₂c₂₁. Den givna olikheten säger att detta är positivt."),
    tr('Multiply the demand by the inverse. Each demand vector d gives exactly one x.',"Multiplicera efterfrågan med inversen. Varje efterfrågevektor d ger exakt ett x."));
  note('1.11','10',tr('Increase one sector’s outside demand',"Öka en sektors externa efterfrågan"),tr('The increase in production is column j of (I − C)⁻¹.',"Produktionsökningen är kolumn j i (I − C)⁻¹."),
    tr('Let eⱼ be the vector with a single 1 in position j. The new demand is d + eⱼ.',"Låt eⱼ vara vektorn med en enda 1 i position j. Den nya efterfrågan är d + eⱼ."),
    tr('Multiply by (I − C)⁻¹ and distribute. The first term is the old output x, and the second term is the jth column of the inverse.',"Multiplicera med (I − C)⁻¹ och fördela multiplikationen. Den första termen är den gamla produktionen x, och den andra termen är inversens j:te kolumn."),
    tr('Each entry of that column gives the additional production needed in its sector for the one-unit change in outside demand.',"Varje element i den kolumnen anger den extra produktion som krävs i dess sektor när den externa efterfrågan ökar med en enhet."));

  note('1.11','11',tr('Prove the inverse has nonnegative entries',"Bevisa att inversen har icke-negativa element"),tr('I − C is invertible and (I − C)⁻¹ has nonnegative entries.',"I − C är inverterbar och (I − C)⁻¹ har icke-negativa element."),
    tr('Read the nonnegativity claim as referring to the inverse. I − C itself has negative off-diagonal entries whenever C has positive ones there.',"Tolka påståendet om icke-negativitet som att det gäller inversen. Själva I − C har negativa element utanför diagonalen när C har positiva element där."),
    tr('Let r < 1 be the largest row sum of C. Since C has nonnegative entries, the row sums of C² are at most r². Repeating this shows the row sums of Cᵏ are at most rᵏ.',"Låt r < 1 vara den största radsumman i C. Eftersom C har icke-negativa element är radsummorna i C² högst r². Upprepning visar att radsummorna i Cᵏ är högst rᵏ."),
    tr('Each entry of I + C + C² + ⋯ is bounded by a convergent geometric series. The sum S exists and has nonnegative entries.',"Varje element i I + C + C² + ⋯ begränsas av en konvergent geometrisk serie. Summan S finns och har icke-negativa element."),
    tr('Multiply the partial sum through by I − C. All terms cancel except I − Cⁿ⁺¹. Since Cⁿ⁺¹ tends to zero, (I − C)S = I, so S is the inverse.',"Multiplicera delsumman med I − C. Alla termer tar ut varandra utom I − Cⁿ⁺¹. Eftersom Cⁿ⁺¹ går mot noll får vi (I − C)S = I, så S är inversen."));
  note('1.11','TF',tr('True or false',"Sant eller falskt"),'a F · b T · c F · d T · e T',
    tr('a: the product-producing sectors supply goods. The open sector represents outside demand. b: a closed economy has no outside sector.',"a: de varuproducerande sektorerna levererar varor. Den öppna sektorn representerar extern efterfrågan. b: en sluten ekonomi har ingen extern sektor."),
    tr('c: columns describe the inputs needed per unit of an output. A row follows a single provider across the output sectors.',"c: kolumnerna beskriver de insatser som krävs per producerad enhet. En rad följer en och samma leverantör genom de producerande sektorerna."),
    tr('d: for nonnegative C with column sums below 1, Cᵀ has row sums below 1. Apply the geometric-series argument to Cᵀ and transpose the inverse.',"d: för icke-negativ C med kolumnsummor under 1 har Cᵀ radsummor under 1. Använd argumentet med den geometriska serien på Cᵀ och transponera inversen."),
    tr('e: (I − C)x = d connects production x to external demand d.',"e: (I − C)x = d kopplar produktionen x till den externa efterfrågan d."));
  production('T1',[[.1,.25,.2],[.3,.4,.5],[.1,.15,.1]],[75000,50000,1250000],true);
  solutions['1.11'].at(-1).steps.push(tr('The model gives a positive value in every sector, so this production plan can meet the demand.',"Modellen ger ett positivt värde i varje sektor, så denna produktionsplan kan möta efterfrågan."));
  solutions['1.11'].sort((a,b)=>a.number.localeCompare(b.number,'en',{numeric:true}));

  [
    [[3,-1,0,4,1],[2,0,3,3,-1]],
    [[1,4,-1],[-2,-8,2],[3,12,-3],[0,0,0]],
    [[2,-4,1,6],[-4,0,3,-1],[0,1,-1,3]],
    [[3,1,-2],[-9,-3,6],[6,2,1]]
  ].forEach((a,i)=>add('review',String(i+1),C.system(tr('Read and solve the augmented system',"Läs och lös det utökade systemet"),a)));
  note('review','7',tr('Find the positive integer solution',"Bestäm den positiva heltalslösningen"),'x = 4, y = 2, z = 3.',
    tr('Subtract the first equation from the second to get 4y + 9z = 35.',"Subtrahera den första ekvationen från den andra för att få 4y + 9z = 35."),
    tr('Positive y forces z to be at most 3. Try z = 1, 2, 3. The values of 35 − 9z are 26, 17, and 8.',"Positivt y kräver att z är högst 3. Pröva z = 1, 2, 3. Värdena av 35 − 9z är 26, 17 och 8."),
    tr('Only 8 is divisible by 4, so z = 3 and y = 2. Then x = 9 − 2 − 3 = 4. Check: 4 + 10 + 30 = 44.',"Bara 8 är delbart med 4, så z = 3 och y = 2. Då är x = 9 − 2 − 3 = 4. Kontroll: 4 + 10 + 30 = 44."));
  fit('review','15',[[1,2],[-1,6],[2,3]]);

  // Preserve the storage keys used by the original companion before exercises were reordered.
  const legacyAttempts = Object.fromEntries(Object.entries(solutions).map(([set, entries]) => [
    set,
    Object.fromEntries(entries.map(({number}, i) => [number.split('–')[0], i]))
  ]));
  window.EmberTextbook={index,solutions,legacyAttempts};
});
