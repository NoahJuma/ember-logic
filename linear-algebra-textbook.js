(() => {
  'use strict';

  const M = window.EmberAlgebra;
  const C = window.EmberChapter;
  const solutions = {};
  const index = {
    '1.1':{pages:'pp. 8–10',exercises:'Exercises 1–27, true/false and technology'},
    '1.2':{pages:'pp. 22–25',exercises:'Exercise Set 1.2'},
    '1.3':{pages:'pp. 37–39',exercises:'Exercise Set 1.3'},
    '1.4':{pages:'pp. 51–53',exercises:'Exercise Set 1.4'},
    '1.5':{pages:'pp. 60–61',exercises:'Exercise Set 1.5'},
    '1.6':{pages:'pp. 67–68',exercises:'Exercise Set 1.6'},
    '1.7':{pages:'pp. 74–76',exercises:'Exercise Set 1.7'},
    '1.8':{pages:'pp. 88–90',exercises:'Exercise Set 1.8'},
    '1.9':{pages:'pp. 96–98',exercises:'Exercise Set 1.9'},
    '1.10':{pages:'pp. 108–110',exercises:'Exercise Set 1.10'},
    '1.11':{pages:'pp. 114–115',exercises:'Exercise Set 1.11'},
    review:{pages:'pp. 115–117',exercises:'Chapter 1 supplementary exercises'}
  };

  function add(set,number,problem) {
    (solutions[set]??=[]).push({number,...problem});
  }
  function note(set,number,title,answer,...steps) {
    add(set,number,{title,prompt:'Find exercise '+number+' in your copy of the textbook and try it first.',answer,steps});
  }
  const one=(...args)=>note('1.1',...args);

  one('1','Recognize linear equations','Linear: a, c, f. Nonlinear: b, d, e.',
    'Check each variable. It must appear by itself to the first power, multiplied by a constant.',
    'a: √2 is a constant. c: move all variable terms to one side. f: π, √2 and the cube root of 7 are constants. A variable can be missing.',
    'b: two variables multiply each other. d and e: the first variable has an exponent other than 1.');
  one('2','Separate constants from variables','Linear: a, c, f. Nonlinear: b, d, e.',
    'a: both roots are constants. c: the cosine has a constant input, so the coefficient is a number. f: subtract y from both sides to get x − y = 7.',
    'b: roots of the unknowns are nonlinear. d: cosine acts on the unknown x. e: x and y are multiplied.');
  one('3','Build the general systems','a: 2 equations, 2 variables. b: 3 equations, 3 variables. c: 2 equations, 4 variables.',
    'In row i, write aᵢ₁x₁ + ⋯ + aᵢₙxₙ = bᵢ. The first index tells you which equation and the second tells you which variable.',
    'a: write a₁₁x₁ + a₁₂x₂ = b₁ and a₂₁x₁ + a₂₂x₂ = b₂.',
    'b: use i = 1, 2, 3, and write aᵢ₁x₁ + aᵢ₂x₂ + aᵢ₃x₃ = bᵢ on each row.',
    'c: use i = 1, 2, and write aᵢ₁x₁ + aᵢ₂x₂ + aᵢ₃x₃ + aᵢ₄x₄ = bᵢ.');
  one('4','Turn coefficients into rows','The augmented sizes are a: 2 × 3, b: 3 × 4, c: 2 × 5.',
    'Copy each row’s coefficients in order and put bᵢ in the last column.',
    'a: [a₁₁ a₁₂ | b₁], [a₂₁ a₂₂ | b₂].',
    'b: [a₁₁ a₁₂ a₁₃ | b₁], [a₂₁ a₂₂ a₂₃ | b₂], [a₃₁ a₃₂ a₃₃ | b₃].',
    'c: [a₁₁ a₁₂ a₁₃ a₁₄ | b₁], [a₂₁ a₂₂ a₂₃ a₂₄ | b₂].');
  one('5','Read equations from the matrix','a: three equations in two variables. b: three equations in three variables.',
    'Read each coefficient from left to right. Skip any zero terms. The last column goes after the equals sign.',
    'a: 2x₁ = 0, 3x₁ − 4x₂ = 0, x₂ = 1.',
    'b: 3x₁ − 2x₃ = 5, 7x₁ + x₂ + 4x₃ = −3, −2x₂ + x₃ = 7.');
  one('6','Read four coefficient columns','Each row gives one equation in x₁, x₂, x₃ and x₄.',
    'a: 3x₂ − x₃ − x₄ = −1 and 5x₁ + 2x₂ − 3x₄ = −6.',
    'b: 3x₁ + x₃ − 4x₄ = 3, −4x₁ + 4x₃ + x₄ = −3, −x₁ + 3x₂ − 2x₄ = −9, and −x₄ = −2.');
  one('7','Keep empty variable positions','The column after the bar is the right-hand side.',
    'a: [−2 | 6], [3 | 8], [9 | −3].',
    'b: [6 −1 3 | 4], [0 5 −1 | 1].',
    'c: [0 2 0 −3 1 | 0], [−3 −1 1 0 0 | −1], [6 2 −1 2 −3 | 6].');
  one('8','Build each augmented matrix','Write one row per equation and use zero for a missing variable.',
    'a: [3 −2 | −1], [4 5 | 3], [7 3 | 2].',
    'b: [2 0 2 | 1], [3 −1 4 | 7], [6 1 −1 | 0].',
    'c: [1 0 0 | 1], [0 1 0 | 2], [0 0 1 | 3].');
  function checkPoints(number,a,points) {
    const expected=M.vector(a.map(row=>row.at(-1)));
    const checks=points.map((v,i)=>{
      const left=a.map(row=>M.dot(row.slice(0,-1),v));
      const valid=left.every((n,j)=>M.zero(n-a[j].at(-1)));
      const products=a.map(row=>row.slice(0,-1).map((n,j)=>'('+n+' × '+M.format(v[j])+')').join(' + '));
      return [valid,'Part '+String.fromCharCode(97+i)+': insert '+M.vector(v)+'. Left sides: '+products.join(' ; ')+' → '+M.vector(left)+'. '+(valid?'All three match.':'At least one differs.')];
    });
    one(number,'Test each candidate point',checks.map(([valid],i)=>String.fromCharCode(97+i)+': '+(valid?'yes':'no')).join(', '),
      'A solution must make all three equations true. Substitute the coordinates and compare with '+expected+'.',...checks.map(row=>row[1]));
  }
  checkPoints('9',[[2,-4,-1,1],[1,-3,1,1],[3,-5,-3,1]],[[3,1,1],[3,-1,1],[13,5,2],[13/2,5/2,2],[17,7,5]]);
  checkPoints('10',[[1,2,-2,3],[3,-1,1,1],[-1,5,-5,5]],[[5/7,8/7,1],[5/7,8/7,0],[5,8,1],[5/7,10/7,2/7],[5/7,22/7,2]]);
  one('11','Find intersections','a: none. b: (1/2 + 2t, t). c: (−8, −4).',
    'a: subtract twice equation 1 from equation 2. The result is 0 = 1, so the lines are parallel and distinct.',
    'b: subtract twice equation 1 from equation 2. The result is 0 = 0. Let y = t and use 2x − 4t = 1 to get x = 1/2 + 2t. Both equations describe the same line.',
    'c: subtract equation 1 from equation 2. This gives −2y = 8, so y = −4. Substitute into x − 2y = 0 to get x = −8. Both equations hold at that point.');
  one('12','Compare the right-hand sides','No solution when b ≠ 2a. Infinitely many when b = 2a. Never exactly one.',
    'Subtract twice equation 1 from equation 2. All variable terms cancel and the new row reads 0 = b − 2a.',
    'If b − 2a is nonzero, that is impossible. Otherwise one independent equation remains. Let y = t and solve for x to get x = (a + 3t)/2.');
  function params(number,answers,steps) {
    one(number,'Describe all solutions with parameters',answers.join('\n'),...steps);
  }
  params('13',['a: (x,y) = ((3 + 5t)/7,t).','b: x₁ = (7 + 5s − 4t)/3, x₂ = s, x₃ = t.',
    'c: x₁ = (−1 + 2r − 5s + 6t)/8, x₂ = r, x₃ = s, x₄ = t.','d: v = (8q − 2r + s − 4t)/3, w = q, x = r, y = s, z = t.'],
    ['In each equation, assign an independent parameter to every variable except the first.',
     'a: add 5t, then divide by 7. b: add 5s and subtract 4t, then divide by 3.',
     'c: move 2r − 5s + 6t to the right, then divide by −8.',
     'd: move −8q + 2r − s + 4t to the right, then divide by 3. All parameters may be any real numbers.']);
  params('14',['a: x = 2 − 10t, y = t.','b: x₁ = 3 − 3s + 12t, x₂ = s, x₃ = t.',
    'c: x₁ = (20 − 2r − 3s − t)/4, x₂ = r, x₃ = s, x₄ = t.','d: v = −q − r + 5s − 7t, w = q, x = r, y = s, z = t.'],
    ['Assign parameters to the later variables in each equation.',
     'a: subtract 10t. b: subtract 3s and add 12t.',
     'c: subtract 2r + 3s + t and divide by 4. d: subtract q + r − 5s + 7t.']);
  params('15',['a: x = (1 + 3t)/2, y = t.','b: x₁ = −4 − 3s + t, x₂ = s, x₃ = t.'],
    ['a: the second row is three times the first. Let y = t in the first row, add 3t, and divide by 2.',
     'b: the other two rows are 3 and −1 times row 1. Let x₂ = s and x₃ = t in row 1. Subtract 3s and add t to isolate x₁.']);
  params('16',['a: x₁ = (−4 − t)/3, x₂ = t.','b: x = −2 + s/2 − t, y = s, z = t.'],
    ['a: the first row is twice the second. In the second row, substitute t for x₂, subtract t, then divide by 3.',
     'b: rows 2 and 3 are 3 and −2 times the first. Use y = s and z = t in row 1, add s, subtract 2t, then divide by 2.']);
  one('17','Make the first pivot a 1','a: R₁ ← R₁ + 2R₂. b: Swap R₁ and R₃.',
    'a: −3 + 2 × 2 = 1. Every entry stays integral. The new first row is [1 −7 8 | 8].',
    'b: the third row already begins with 1, so move it to the top.');
  one('18','Make the first pivot without fractions','a: R₁ ← R₁/2. b: R₁ ← R₁ − 2R₂.',
    'a: every entry in row 1 is even. Halving the row gives [1 2 −3 | 4].',
    'b: 7 − 2 × 3 = 1. Subtract twice row 2 from row 1 to get [1 −2 −18 | 0].');
  one('19','Check consistency with k','a: k ≠ 2. b: every real k.',
    'Subtract 4 times row 1 from row 2. In a the new row is [0, 8 − 4k | 18], so k = 2 creates a contradiction.',
    'In b the new row is [0, 8 − 4k | 0]. For k = 2 it says 0 = 0 and gives infinitely many solutions. For all other k it has a pivot.');
  one('20','Check two more parameter cases','a: k = −5/2. b: every real k.',
    'a: add twice row 1 to row 2. The result is [0 0 | 5 + 2k]. It is consistent exactly when 5 + 2k = 0.',
    'b: add row 1 to row 2. The result is [k + 4, 0 | 0]. If k ≠ −4 it forces x₁ = 0. At k = −4 it is a zero row. Both cases are consistent.');
  one('21','Turn three points into a linear model','Row i is [xᵢ² xᵢ 1 | yᵢ] for i = 1, 2, 3.',
    'Substitute each point into y = ax² + bx + c to get xᵢ²a + xᵢb + c = yᵢ.',
    'The unknowns are a, b and c. The point’s xᵢ and yᵢ are known numbers, so the equation is linear in the unknowns.');
  one('22','Explain why row operations work','Each operation can be undone, so both systems have exactly the same solutions.',
    'Swap rows: swap them again. It only changes the order of equations.',
    'Multiply by k ≠ 0: divide by k. Both sides of the equation change together.',
    'Add k copies of another row: subtract k copies of that same unchanged row. An answer satisfies the old equations exactly when it satisfies the new ones.');
  one('23','When are two equations the same?','k = l and c = d.',
    'Each equation assigns exactly one x₁ to every x₂. At x₂ = 0 both give x₁ = c = d.',
    'At x₂ = 1 both give x₁ = c − k = d − l. Since c = d, subtract it to get k = l.');
  one('24','Picture three lines','a: no common point. b: one common point. c: all three lines coincide.',
    'a: a distinct parallel pair prevents a common point. If there is an intersecting pair, its intersection must fail to lie on the third line.',
    'b: there is an intersecting pair and its intersection lies on the third line. The third line may coincide with one of the pair.',
    'c: two distinct lines share at most one point, so infinitely many shared points force all three lines to be the same.');
  one('25','Translate a nutrition model','2x + 3y + z = 7, 2x + y + 3z = 9, 4x + 2y + 5z = 16.',
    'Let x, y and z be ounces of the three foods.',
    'Each equation is one nutrient total: fat first, protein second and carbohydrates third. Multiply the amount of each food by its nutrient per ounce and add.');
  one('26','Set up the parabola','a + b + c = 1, 4a + 2b + c = 4, a − b + c = 1. Expect one solution.',
    'Substitute x = 1, 2 and −1 into ax² + bx + c. Set each result equal to the matching y-coordinate.',
    'The three x-coordinates are distinct. The difference of two possible answers would be a degree-at-most-two polynomial with three distinct zeros, so the difference would have to be identically zero.');
  one('27','Translate three statements','x + y + z = 12, 2x + y + 2z = 5, z − x = 1.',
    'Use x, y and z in the same order as the three numbers.',
    'The second sentence counts x and z twice. The last sentence says z = x + 1, so move x to the left.');
  one('TF','True or false','a T · b F · c T · d T · e F · f F · g T · h F',
    'a: the zero vector solves every homogeneous system. b: multiplying by zero cannot be undone.',
    'c: equation 2 has the same left side as twice equation 1. It is either redundant or contradictory. d: a linear equation has a nonzero coefficient on at least one variable, so at least one other variable can be chosen freely.',
    'e: repeating x = 1 creates more equations with the same solution. f: multiplying equations by a nonzero constant keeps the original solutions. For example, 2x = 2 still has x = 1, not x = 2.',
    'g: subtracting is adding −1 times another row. h: the bottom row says 0 = −1.');
  one('T1','Compare the three example systems','Example 2: (7/3, 4/3). Example 3: none. Example 4: (1/4 + t/2, t).',
    'Example 2: add twice equation 1 with a minus sign to equation 2. This gives 3y = 4, then x = 1 + y.',
    'Example 3: subtract three copies of the first equation from the second. The result is 0 = −6.',
    'Example 4: subtract four copies of the first equation from the second. The result is 0 = 0. Put y = t in equation 1 and solve for x.');
  one('T2','Check the printed point data','If the first and third entries are x and y, the result is a = −5/2, b = 3/2, c = 8.',
    'The printed items have three entries each, while y = ax² + bx + c uses point pairs. Treating the middle entry as x² gives (−1,4), (0,8), (1,7).',
    'The middle point gives c = 8. The other points give a − b = −4 and a + b = −1.',
    'Add to get 2a = −5. Substitute a = −5/2 into a + b = −1 to get b = 3/2. This solution depends on that reading of the printed data.');

  const systems12=[
    [[1,1,2,8],[-1,-2,3,1],[3,-7,4,10]],
    [[2,2,2,0],[-2,5,2,1],[8,1,4,-1]],
    [[1,-1,2,-1,-1],[2,1,-2,-2,-2],[-1,2,-4,1,1],[3,0,0,-3,-3]],
    [[0,-2,3,1],[3,6,-3,-2],[6,6,3,5]]
  ];
  systems12.forEach((a,i)=>add('1.2',String(9+i),C.system('Gauss–Jordan elimination',a)));
  note('1.2','13','Count equations and unknowns','The system has nontrivial solutions.',
    'There are three equations and four unknowns, so there can be at most three pivots.',
    'At least one variable is free. The right-hand sides are zero, so the system is consistent. Choosing a nonzero value for a free variable gives a nonzero solution.');
  note('1.2','23','Read the pivots without knowing the asterisks','a: unique. b: infinitely many. c: inconsistent. d: inconclusive.',
    'a: all three variable columns have pivots. b: two pivots and a zero row leave a free variable. c: the bottom row says 0 = 1.',
    'd: the third row fixes the third variable. If the coefficient in row 2 is zero, that row is harmless. If it is nonzero, it forces the third variable to zero, which may conflict with row 3. So the system might be consistent or inconsistent.');

  note('1.3','1','Check matrix dimensions','a: undefined. b: 4 × 4. c: 4 × 2. d: 5 × 2. e: 4 × 5. f: 5 × 5.',
    'a: B has 5 columns and A has 4 rows, so BA is undefined. b: Bᵀ is 5 × 4, so (4 × 5)(5 × 4) gives 4 × 4.',
    'c: AC is 4 × 2 and can be added to D. d: multiply E, of size 5 × 4, by AC, of size 4 × 2.',
    'e: Eᵀ is 4 × 5, so the subtraction fits. f: the sum is 4 × 5 and E is 5 × 4, giving a 5 × 5 result.');
  note('1.3','2','Check six more expressions','a: 5 × 4. b: undefined. c: 4 × 2. d: 2 × 4. e: 5 × 2. f: undefined.',
    'a: C has 2 columns and Dᵀ has 2 rows, so CDᵀ exists and is 5 × 4. b: D has 2 columns but C has 5 rows.',
    'c: BC and D are 4 × 2. d: BE is 4 × 4, so Dᵀ(BE) is 2 × 4.',
    'e: BᵀD and ED are both 5 × 2. f: BAᵀ is 4 × 4 and D is 4 × 2, so they cannot be added.');

  function inverse2(set,number,a,both=false) {
    const [[p,q],[r,s]]=a, det=p*s-q*r;
    const steps=['Compute ad − bc: ('+p+' × '+s+') − ('+q+' × '+r+') = '+det+'.'];
    if(det) steps.push('Swap the diagonal entries and reverse the signs off the diagonal. Then divide each entry by '+det+'.');
    else steps.push('The formula would divide by zero, so this matrix is singular.');
    if(both) steps.push(...M.inverse(a).steps);
    add(set,number,{title:'Find the inverse',prompt:'Use the textbook matrix A = '+M.matrixText(a)+'.',answer:det?M.matrixText([[s/det,-q/det],[-r/det,p/det]]):'No inverse',steps});
  }
  [[[2,-3],[4,4]],[[3,1],[5,2]],[[2,0],[0,3]],[[6,4],[-2,-1]]].forEach((a,i)=>inverse2('1.4',String(5+i),a));
  [[[1,4],[2,7]],[[2,-4],[-4,8]],[[1,-5],[3,-16]],[[6,4],[-3,-2]]].forEach((a,i)=>inverse2('1.5',['9a','9b','10a','10b'][i],a,true));

  function solveWithInverse(set,number,a,b,prompt) {
    const inv=M.inverse(a);
    const v=M.apply(inv.value,b);
    add(set,number,{title:'Solve by inverting a matrix',prompt,answer:M.vector(v),
      steps:[...inv.steps,'Multiply both sides of Ax = b by A⁻¹. Since A⁻¹A = I, this leaves x = A⁻¹b.',
      ...inv.value.map((row,i)=>'Entry '+(i+1)+' = '+row.map((n,j)=>'('+M.format(n)+' × '+M.format(b[j])+')').join(' + ')+' = '+M.format(v[i])+'.')]});
  }
  [
    [[[1,1],[5,6]],[2,9]], [[[4,-3],[2,-5]],[-3,9]],
    [[[1,3,1],[2,2,1],[2,3,1]],[4,-1,3]], [[[5,3,2],[3,3,2],[0,1,1]],[4,2,5]]
  ].forEach(([a,b],i)=>solveWithInverse('1.6',String(i+1),a,b,'Solve Ax = b, with A = '+M.matrixText(a)+' and b = '+M.vector(b)+'.'));

  note('1.7','1','Classify the first four matrices','a: upper. b: lower. c: upper and lower. d: upper.',
    'Look below the main diagonal to test for upper triangular, and above it to test for lower triangular.',
    'a and d have zeros below the diagonal. b has zeros above it. c has zeros on both sides, so it is also diagonal.');
  note('1.7','7–10','Raise diagonal matrices to powers','Each diagonal entry is raised to the requested power independently.',
    'A diagonal matrix acts on each coordinate separately. Applying it twice squares every diagonal entry.',
    'All diagonal entries in these questions are nonzero, so invert by replacing each with its reciprocal.',
    '7: apply the powers to (1, −2). 8: apply them to (−6, 3, 5).',
    '9: apply them to (1/2, 1/3, 1/4). 10: apply them to (−2, −4, −3, 2). For A⁻ᵏ, the new entry is 1 divided by the kth power of the original entry.');

  note('1.8','1–2','Read domain and codomain','1a: ℝ² → ℝ³. 1b: ℝ³ → ℝ². 2a: ℝ⁵ → ℝ⁴. 2b: ℝ⁴ → ℝ⁵.',
    'An m × n matrix has n entries in each row, so it needs an input with n coordinates.',
    'Every row makes one output coordinate. There are m rows, so the codomain is ℝᵐ. Apply that rule to each pair of dimensions.');
  note('1.8','31–32','Reflect a point in the coordinate planes','31: (2, −5, −3), (2, 5, 3), (−2, −5, 3). 32: (a, b, −c), (a, −b, c), (−a, b, c).',
    'An xy reflection flips z, so use diagonal entries (1, 1, −1). An xz reflection flips y, and a yz reflection flips x.',
    'Multiply the corresponding coordinate by −1 and leave the other two alone in each case.');

  note('1.9','1','Check if two actions commute','Neither pair commutes.',
    'a: apply the x-axis projection first to (x,y) to get (x,0), then swap coordinates to get (0,x). In the opposite order the result is (y,0).',
    'b: reflect in the x-axis after swapping to get (y,−x). Swap after reflecting in the x-axis to get (−y,x). The formulas differ.');
  note('1.9','2','Compare two more pairs','a: yes. b: no.',
    'a: projecting onto either axis and then onto the other sends every vector to (0,0).',
    'b: take (1,0). Rotating 45° then reflecting in the y-axis gives (−√2/2, √2/2). Reflecting first then rotating gives (−√2/2, −√2/2).');

  function fit(set,n,points) {
    const a=points.map(([x,y])=>[...points.map((_,i)=>x**(points.length-i-1)),y]);
    const result=M.solve(a);
    const powers=points.length===3?'a x² + b x + c':'a x³ + b x² + c x + d';
    const polynomial = result.point.map((value,i)=>{
      const degree = points.length-i-1;
      return '('+M.format(value)+')'+(degree===0?'':degree===1?'x':degree===2?'x²':'x³');
    }).join(' + ');
    add(set,n,{title:'Find the interpolating polynomial',prompt:'Fit '+powers+' through '+points.map(M.vector).join(', ')+'.',
      answer:'p(x) = '+polynomial+'\nCoefficients in descending order: '+M.vector(result.point),
      steps:['Substitute each x into each power and put the observed y on the right. Every point gives one row.',...result.steps]});
  }
  fit('1.10','13',[[1,1],[2,2],[3,5]]);
  fit('1.10','14',[[0,0],[-1,1],[1,1]]);
  fit('1.10','15',[[-1,-1],[0,1],[1,3],[4,-1]]);
  note('1.10','9','Balance propane combustion','C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.',
    'Start with one propane molecule. Its three carbon atoms require three CO₂ molecules.',
    'Its eight hydrogen atoms require four H₂O molecules.',
    'The products now contain 3 × 2 + 4 × 1 = 10 oxygen atoms. Each O₂ contains two, so use five.');
  note('1.10','10','Balance the fermentation reaction','C₆H₁₂O₆ → 2CO₂ + 2C₂H₅OH.',
    'One glucose molecule contributes 12 hydrogen atoms. Each ethanol molecule has six, so take two ethanol molecules.',
    'Two ethanols use four carbons. The two remaining carbons make two CO₂ molecules.',
    'The oxygen atoms total 2 × 2 + 2 × 1 = 6 on the right, matching the left.');
  note('1.10','11','Balance a reaction with fluorine','CH₃COF + H₂O → CH₃COOH + HF.',
    'Start with one molecule of CH₃COF. Its two carbons belong in one molecule of CH₃COOH, and its fluorine belongs in one HF.',
    'The products use five hydrogens and two oxygens. The original molecule provides three hydrogens and one oxygen, so add one water.');
  note('1.10','12','Balance photosynthesis','6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.',
    'One glucose molecule needs six carbons, so take six CO₂. It needs twelve hydrogens, so take six H₂O.',
    'The left side has 18 oxygen atoms. Six go into glucose and the remaining twelve make six O₂.');
  solutions['1.10'].sort((a,b)=>Number(a.number)-Number(b.number));

  [
    [[[.1,.3],[.5,.4]],[50,60]],[[[.3,.1],[.3,.7]],[22,14]]
  ].forEach(([c,d],i)=>{
    const a=c.map((row,j)=>row.map((n,k)=>Number(j===k)-n));
    solveWithInverse('1.11',String(i+5),a,d,'Find x with C = '+M.matrixText(c)+' and external demand '+M.vector(d)+'.');
    solutions['1.11'].at(-1).steps.unshift('Production covers internal use and demand: x = Cx + d. Rearrange to (I − C)x = d.');
  });
  function production(number,c,d,useInverse=false) {
    const a=c.map((row,i)=>row.map((n,j)=>Number(i===j)-n));
    const demand='Read C from the input table and find the production vector for external demand d = '+M.vector(d)+'.';
    const model=['Put provider sectors on the rows and output sectors on the columns. This gives C = '+M.matrixText(c)+'.',
      'Write x = Cx + d. Move Cx to the left to get (I − C)x = d.',
      'Subtract the entries of C from the identity to get I − C = '+M.matrixText(a)+'.'];
    if(useInverse) {
      solveWithInverse('1.11',number,a,d,demand);
      solutions['1.11'].at(-1).steps.unshift(...model);
      return;
    }
    const result=M.solve(a.map((row,i)=>[...row,d[i]]));
    add('1.11',number,{title:'Find the required production',prompt:demand,answer:'C = '+M.matrixText(c)+'. Production = '+M.vector(result.point)+'.',
      steps:[...model,...result.steps]});
  }
  production('1',[[.5,.25],[.25,.1]],[7000,14000]);
  production('2',[[.3,.2],[.1,.6]],[130000,130000]);
  production('3',[[.1,.6,.4],[.3,.2,.3],[.4,.1,.2]],[1930,3860,5790]);
  production('4',[[.4,.2,.45],[.3,.35,.3],[.15,.1,.2]],[5400,2700,900]);
  note('1.11','7','A sector uses all its own output','Demand (2,0) is possible. Demand (2,1) is impossible.',
    'Subtract C from I to get diagonal entries 1/2 and 0. The equations become x₁/2 = d₁ and 0 = d₂.',
    'For (2,0), choose x₁ = 4 and any nonnegative x₂. For (2,1), the second equation says 0 = 1.',
    'Sector 2 uses its full output internally, leaving zero units to sell outside.');
  const equalDemand=M.solve([[1/2,-1/4,-1/4,1],[-1/2,7/8,-1/4,1],[-1/2,-1/4,7/8,1]]);
  note('1.11','8','Compare the outputs','The first sector must produce the most for equal positive outside demand.',
    'Take the common demand to be 1 first. Other positive common demands simply scale the three outputs.',
    ...equalDemand.steps,'The first coordinate is largest, so sector 1 produces the most for every positive common demand.');
  note('1.11','9','Prove that every demand has one solution','The inequality guarantees a nonzero determinant, so I − C is invertible.',
    'Form I − C = [1 − c₁₁, −c₁₂; −c₂₁, 1].',
    'Its determinant is (1 − c₁₁) × 1 − c₁₂c₂₁. By the given inequality this is positive.',
    'Multiply the demand by the inverse. Each demand vector d gives exactly one x.');
  note('1.11','10','Increase one sector’s outside demand','The increase in production is column j of (I − C)⁻¹.',
    'Let eⱼ be the vector with a single 1 in position j. The new demand is d + eⱼ.',
    'Multiply by (I − C)⁻¹ and distribute. The first term is the old output x, and the second term is the jth column of the inverse.',
    'Each entry of that column gives the additional production needed in its sector for the one-unit change in outside demand.');

  note('1.11','11','Prove the inverse has nonnegative entries','I − C is invertible and (I − C)⁻¹ has nonnegative entries.',
    'Read the nonnegativity claim as referring to the inverse. I − C itself has negative off-diagonal entries whenever C has positive ones there.',
    'Let r < 1 be the largest row sum of C. Since C has nonnegative entries, the row sums of C² are at most r². Repeating this shows the row sums of Cᵏ are at most rᵏ.',
    'Each entry of I + C + C² + ⋯ is bounded by a convergent geometric series. The sum S exists and has nonnegative entries.',
    'Multiply the partial sum through by I − C. All terms cancel except I − Cⁿ⁺¹. Since Cⁿ⁺¹ tends to zero, (I − C)S = I, so S is the inverse.');
  note('1.11','TF','True or false','a F · b T · c F · d T · e T',
    'a: the product-producing sectors supply goods. The open sector represents outside demand. b: a closed economy has no outside sector.',
    'c: columns describe the inputs needed per unit of an output. A row follows a single provider across the output sectors.',
    'd: for nonnegative C with column sums below 1, Cᵀ has row sums below 1. Apply the geometric-series argument to Cᵀ and transpose the inverse.',
    'e: (I − C)x = d connects production x to external demand d.');
  production('T1',[[.1,.25,.2],[.3,.4,.5],[.1,.15,.1]],[75000,50000,1250000],true);
  solutions['1.11'].at(-1).steps.push('The model gives a positive value in every sector, so this production plan can meet the demand.');
  solutions['1.11'].sort((a,b)=>a.number.localeCompare(b.number,'en',{numeric:true}));

  [
    [[3,-1,0,4,1],[2,0,3,3,-1]],
    [[1,4,-1],[-2,-8,2],[3,12,-3],[0,0,0]],
    [[2,-4,1,6],[-4,0,3,-1],[0,1,-1,3]],
    [[3,1,-2],[-9,-3,6],[6,2,1]]
  ].forEach((a,i)=>add('review',String(i+1),C.system('Read and solve the augmented system',a)));
  note('review','7','Find the positive integer solution','x = 4, y = 2, z = 3.',
    'Subtract the first equation from the second to get 4y + 9z = 35.',
    'Positive y forces z to be at most 3. Try z = 1, 2, 3. The values of 35 − 9z are 26, 17, and 8.',
    'Only 8 is divisible by 4, so z = 3 and y = 2. Then x = 9 − 2 − 3 = 4. Check: 4 + 10 + 30 = 44.');
  fit('review','15',[[1,2],[-1,6],[2,3]]);

  // Preserve the storage keys used by the original companion before exercises were reordered.
  const legacyAttempts = Object.fromEntries(Object.entries(solutions).map(([set, entries]) => [
    set,
    Object.fromEntries(entries.map(({number}, i) => [number.split('–')[0], i]))
  ]));
  window.EmberTextbook={index,solutions,legacyAttempts};
})();
