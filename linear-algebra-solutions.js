(() => {
  'use strict';
  const M = window.EmberAlgebra;
  const C = window.EmberChapter;
  const {solutions} = window.EmberTextbook;
  let set;
  function add(number,title,answer,...steps) {
    const id = String(number);
    const exercise = {number:id,title,answer,steps,prompt:'Try exercise '+id+' in your copy of the textbook first.'};
    const rows = solutions[set];
    const previous = rows.findIndex(row=>row.number===id);
    if (previous<0) rows.push(exercise);
    else rows[previous]=exercise;
  }
  function linear(number,a,title='Solve the linear system',intro=[]) {
    const r=M.solve(a);
    add(number,title,C.solutionText(r),...intro,...r.steps);
  }
  function partSystems(number,parts) {
    const cases=parts.map(a=>M.solve(a));
    add(number,'Read pivots and find the solutions',cases.map((r,i)=>String.fromCharCode(97+i)+': '+C.solutionText(r)).join('\n'),
      ...cases.flatMap((r,i)=>{
        const pivots=parts[i].flatMap((row,j)=>{
          const first=row.findIndex(x=>!M.zero(x));
          return first<0?[]:['row '+(j+1)+', column '+(first+1)];
        });
        return ['Part '+String.fromCharCode(97+i)+': the first nonzero entry of each nonzero row gives '+pivots.join('; ')+'. The final column is the right-hand side.',...r.steps];
      }));
  }
  function gaussian(number,a,writeEquations=false) {
    const count=a[0].length-1;
    const {rows,pivots,steps}=M.reduce(a,count,false);
    const answer=M.solve(a);
    const named=['x₁','x₂','x₃','x₄','x₅'];
    if (writeEquations) steps.unshift('Write one equation per row, using the last column as the right side:\n'+a.map(row=>describe([row.slice(0,count)],named)+' = '+M.format(row[count])).join('\n'));
    if (answer.kind==='none') {
      const row=rows.find(r=>r.slice(0,count).every(M.zero)&&!M.zero(r[count]));
      steps.push('The last nonzero row says 0 = '+M.format(row[count])+', which is impossible.');
    } else {
      const free=named.slice(0,count).filter((_,i)=>!pivots.includes(i));
      steps.push(free.length?'Give '+free.join(', ')+' independent parameter values. Then work upward to find the pivot variables.':'Every variable has a pivot. Work upward from the last equation.');
      pivots.map((j,i)=>[j,rows[i]]).reverse().forEach(([j,row])=>{
        const rest=row.slice(j+1,count).flatMap((n,k)=>M.zero(n)?[]:['('+M.format(n)+')'+named[j+k+1]]);
        const rhs=M.format(row[count]);
        steps.push('The row gives '+named[j]+' = '+rhs+(rest.length?' − ('+rest.join(' + ')+')':'')+'. Substitute the values or expressions already found below it.');
      });
    }
    add(number,'Gaussian elimination and back-substitution',C.solutionText(answer),...steps);
  }
  function multi(number,a,rhs,title='Solve all right-hand sides together') {
    const width=a[0].length;
    const aug=a.map((row,i)=>[...row,...rhs.map(b=>b[i])]);
    const r=M.reduce(aug,width);
    const cases=rhs.map((b,i)=>{
      const single=r.rows.map(row=>[...row.slice(0,width),row[width+i]]);
      return M.solve(single);
    });
    add(number,title,cases.map((s,i)=>'Column '+(i+1)+': '+C.solutionText(s)).join('\n'),
      'Keep the coefficients on the left. Append every right-hand side as a separate column and perform the same operation on each complete row.',
      ...r.steps.slice(1),'Read each right-hand column separately. A zero coefficient row with a nonzero number means no solution for that column. Otherwise use the pivot rows to read the coordinates or their formulas.');
  }
  function byInverse(number,a,b) {
    const r=M.inverse(a), out=M.apply(r.value,b);
    add(number,'Solve by using the inverse',M.vector(out),...r.steps,
      'Multiply Ax = b on the left by A⁻¹. Because A⁻¹A = I, the result is x = A⁻¹b.',
      ...r.value.map((row,i)=>'Coordinate '+(i+1)+': '+row.map((n,j)=>'('+M.format(n)+' × '+M.format(b[j])+')').join(' + ')+' = '+M.format(out[i])+'.'));
  }

  set='1.2';
  add(1,'Check the staircase of pivots','a both · b both · c both · d both · e both · f both · g echelon only',
    'Find the first nonzero number in each row. In this book, each leading number must be 1. As you move down, the leading 1 must move strictly to the right, and zero rows must be last.',
    'For the reduced form, each leading 1 must also be the only nonzero entry in its column. In a–e, all pivot columns pass both tests. In f there are no nonzero rows, so there are no violations.',
    'In g, the pivot in column 2 has −7 above it. This still gives an echelon staircase, but it fails the reduced test.');
  add(2,'Check echelon and reduced form','a echelon only · b neither · c both · d echelon only · e neither · f neither · g both',
    'a and d: the second pivot has a nonzero number above it. c and g: the staircase works and the pivot columns are cleared.',
    'b: two successive nonzero rows start in the same column and the last leading entry is 2. e: a zero row sits above a nonzero row. f: rows 1 and 2 both start in column 1.');
  partSystems(3,[[[1,-3,4,7],[0,1,2,2],[0,0,1,5]],[[1,0,8,-5,6],[0,1,4,-9,3],[0,0,1,1,2]],[[1,7,-2,0,-8,-3],[0,0,1,1,6,5],[0,0,0,1,3,9],[0,0,0,0,0,0]],[[1,-3,7,1],[0,1,4,0],[0,0,0,1]]]);
  partSystems(4,[[[1,0,0,-3],[0,1,0,0],[0,0,1,7]],[[1,0,0,-7,8],[0,1,0,3,2],[0,0,1,1,-5]],[[1,-6,0,0,3,-2],[0,0,1,0,4,7],[0,0,0,1,5,8],[0,0,0,0,0,0]],[[1,-3,0,0],[0,0,1,0],[0,0,0,1]]]);
  [
    [[1,1,2,8],[-1,-2,3,1],[3,-7,4,10]],
    [[2,2,2,0],[-2,5,2,1],[8,1,4,-1]],
    [[1,-1,2,-1,-1],[2,1,-2,-2,-2],[-1,2,-4,1,1],[3,0,0,-3,-3]],
    [[0,-2,3,1],[3,6,-3,-2],[6,6,3,5]]
  ].forEach((a,i)=>gaussian(i+5,a));
  add(14,'Start with the last equation','Only (0, 0, 0).','The last row says 4x₃ = 0, so x₃ = 0.','Put x₃ = 0 in the middle row to get x₂ = 0.','Put both zeros in the first row to get x₁ = 0.');
  [
    [[2,1,3,0],[1,2,0,0],[0,1,1,0]],
    [[2,-1,-3,0],[-1,2,-3,0],[1,1,4,0]],
    [[3,1,1,1,0],[5,-1,1,-1,0]],
    [[0,1,3,-2,0],[2,1,-4,3,0],[2,3,2,-1,0],[-4,-3,5,-4,0]],
    [[0,2,2,4,0],[1,0,-1,-3,0],[2,3,1,1,0],[-2,1,3,-2,0]],
    [[1,3,0,1,0],[1,4,2,0,0],[0,-2,-2,-1,0],[2,-4,1,1,0],[1,-2,-1,1,0]],
    [[2,-1,3,4,9],[1,0,-2,7,11],[3,-3,1,5,8],[2,1,4,4,10]],
    [[0,0,1,1,1,0],[-1,-1,2,-3,1,0],[1,1,-2,0,-1,0],[2,2,-1,0,1,0]]
  ].forEach((a,i)=>linear(i+15,a,'Solve by row reduction',['Read coordinates in the order used in the exercise.']));
  add(24,'Interpret the unspecified entries','a unique · b inconclusive · c inconsistent · d inconclusive',
    'a: the three variable columns all have pivots. There is a unique solution for any right sides.',
    'b: remove the first-column entries below row 1, then clear the second column below row 2. The last pivot may or may not vanish. For all asterisks zero there is a unique solution. To make the system have a free variable, take row 1 second entry = 1, row 2 first entry = 1, and all other asterisks zero. The first two coefficient rows now share their first two entries, and the system has a free variable.',
    'c: subtract the first row from the second. It says 0 = 1.',
    'd: the last two rows say x₁ = 1. If the first row has other nonzero coefficients, we can satisfy it and still have a free variable. If those coefficients are zero and its right side differs from 1, it is inconsistent.');
  add(25,'Find where the last pivot disappears','Unique if a ≠ ±4. Infinite at a = 4. None at a = −4.',
    'Replace row 3 with row 3 minus rows 1 and 2. This leaves (a² − 16)z = a − 4.',
    'The first two equations already determine x and y once z is known, since their two-by-two coefficient determinant is −7.',
    'For a ≠ ±4, divide to find z. At 4, the last row is 0 = 0 and z is free. At −4, the last row is 0 = −8.');
  add(26,'Compare the last two equations','Unique if a ≠ ±√2. None if a = ±√2. No infinite case.',
    'Subtract the first row from the third to get (2 − a²)z = a − 2. The first two rows can determine x and y for any z since their coefficient determinant is −6.',
    'For a ≠ ±√2, divide to find z. At either exceptional value, the left side is zero but a − 2 is nonzero.');
  add(27,'Match a dependent row','c = a − b.','The third left side is the first minus the second. Their right sides must follow the same rule.','The first two rows are independent, so we can solve them for any a and b. If c = a − b, the third row adds no new requirement.');
  add(28,'Find the row dependency','c = a − 2b.','Take the first equation minus twice the second. On the left this gives 3x + 7y − z, exactly row 3.','The first two rows are independent. The third equation agrees with them exactly when its right side equals a − 2b.');
  add(29,'Eliminate y','x = (6a − b)/9, y = (2b − 3a)/9.','Multiply the first equation by 6 and subtract the second. This leaves 9x = 6a − b.','Use y = a − 2x and simplify: y = (9a − 12a + 2b)/9.');
  add(30,'Use the equations with two terms first','x₁ = a − c/3, x₂ = a − b/2, x₃ = b/2 + c/3 − a.',
    'Divide row 2 by 2 and row 3 by 3. They give x₁ + x₃ = b/2 and x₂ + x₃ = c/3.',
    'Subtract each from row 1 to find the remaining coordinate. Then use x₁ + x₃ = b/2 to find x₃.');
  add(31,'Find two valid staircases','[1 3] [0 1] and [1 0] [0 1].','Subtract twice row 1 from row 2 to get [0 1]. The result is already echelon.','Subtract three copies of row 2 from row 1. The identity matrix is a second echelon form.');
  add(32,'Keep the intermediate entries integral','The reduced form is I₃.',
    'Double R₃, then subtract 3R₁. R₃ becomes [0 5 1]. Add 2R₂ to it to get [0 1 −57].',
    'Add 2R₃ to R₂ to get [0 0 −143]. Swap rows 2 and 3, then divide the last row by −143.',
    'Add 57R₃ to R₂. Subtract 3R₃ and then R₂ from R₁ to get [2 0 0]. Halve the first row.');
  function trig(number,a,answers,explanation) {
    const r=M.solve(a);
    add(number,'Solve for the trig values first',answers,
      'Name x = sin α, y = cos β, z = tan γ. Now the equations are linear in x, y and z.',...r.steps,...explanation);
  }
  trig(33,[[1,2,3,0],[2,5,3,0],[-1,-5,5,0]],'18 angle triples.',[
    'Sine is zero at α = 0, π, 2π. Cosine is zero at β = π/2, 3π/2. Tangent is zero at γ = 0, π, 2π.',
    'Every combination works because the three angles are independent once the trig values are fixed. Multiply 3 × 2 × 3 = 18.']);
  trig(34,[[2,-1,3,3],[4,2,-2,2],[6,-3,1,9]],'(α, β, γ) = (π/2, π, 0).',[
    'Subtract three copies of the first equation from the third to get −8 tan γ = 0. Therefore γ = 0 on [0, π).',
    'The first two equations now give 2 sin α − cos β = 3 and 2 sin α + cos β = 1. Add to get sin α = 1. Then cos β = −1.',
    'On [0, 2π], sin α = 1 at α = π/2 and cos β = −1 at β = π. The only triple is (π/2, π, 0).']);
  linear(35,[[1,1,1,6],[1,-1,2,2],[2,1,-1,3]],'Find the squares first',['Use X = x², Y = y² and Z = z².']);
  {
    const p=solutions[set].at(-1);
    p.answer='x = ±1, y = ±√3, z = ±√2. The signs are independent.';
    p.steps.push('The squares are 1, 3 and 2. A positive square has two real roots. Take either sign for each coordinate to get eight triples.');
  }
  linear(36,[[1/2,2/3,-4/8,1],[1,1,1,0],[-1,9,10,5]],'Clear the fractional coefficients',['Keep the variable order x, y, z.']);
  linear(37,[[0,0,0,1,10],[1,1,1,1,7],[27,9,3,1,-11],[64,16,4,1,-14]],'Find the four cubic coefficients',['Use each point (x,y) to write one row [x³, x², x, 1 | y]. The unknowns in order are a, b, c and d.']);
  add(38,'Find the circle from its points','With a = 1, (a,b,c,d) = (1, −2, −4, −29). Any nonzero common multiple gives the same circle.',
    'Divide by a to set it to 1. Using (−2,7), (−4,5), (4,−3) gives −2b + 7c + d = −53, −4b + 5c + d = −41, and 4b − 3c + d = −25.',
    'Subtract the second equation from the first to get b + c = −6. Subtract the second from the third to get b − c = 2. Add these to get b = −2, then c = −4.',
    'Use the second equation: 8 − 20 + d = −41, so d = −29.');
  add(39,'Reuse the same coefficient matrix','The new system has exactly one solution.',
    'If the homogeneous system has only the zero solution, all three variable columns have pivots.',
    'Changing the right sides leaves those pivots intact. Three pivots in three rows also leave no room for a contradictory row.');
  add(40,'Count pivot positions','a: 3. b: 5. c: 2.',
    'a: each pivot takes a different row, and there are only three rows.',
    'b: the sixth column is the right side, leaving five unknowns. If all rows are zero, every variable is free.',
    'c: three columns give at most three pivots. Of five rows, at least two must be zero in echelon form.');
  add(41,'Describe all reduced forms by their pivot choices','Choose any subset of the 3 or 4 columns to be pivot columns. This gives 8 or 16 pivot patterns respectively.',
    'Order the chosen columns from left to right and place one leading 1 per row from the top downward.',
    'Put zero above and below each pivot, to the left of each row’s leading 1, and in every row below the last pivot.',
    'Entries in nonpivot columns to the right of each row’s pivot can be arbitrary. This rule gives every reduced row echelon form, including the all-zero matrix when no columns are chosen.');
  add(42,'Picture three lines through the origin','Only the zero solution if some two lines differ. Nonzero solutions if all three lines coincide.',
    'Each homogeneous equation describes a line containing (0,0). Two distinct lines through that point have no other point in common.',
    'If the three lines coincide, every point on that line satisfies all three equations.');
  add(43,'Prove that a 2 × 2 matrix has two pivots','The reduced coefficient matrix is I₂. Every right side gives one solution.',
    'If a ≠ 0, subtract (c/a) times row 1 from row 2. The second pivot is d − bc/a = (ad − bc)/a, which is nonzero.',
    'If a = 0, then b and c are both nonzero because −bc ≠ 0. Swap the two rows to get a nonzero first pivot and keep b as the second.',
    'Scale both pivots to 1 and clear above the second. Apply the same operations to the right sides k,l. The left side is now the identity, so each variable is fixed.');
  add('TF','True or false','a T · b F · c F · d T · e T · f F · g T · h F · i F',
    'a: reduced form has all the echelon rules plus another. b: swapping a pivot row with a zero row can destroy the staircase. c: Exercise 31 gives two echelon forms.',
    'd: each of the r pivots fixes one variable in terms of the others. e: every next leading 1 must be farther right.',
    'f: the echelon matrix with rows [1 2], [0 1] has a nonzero 2 above a pivot. g: n variable pivots leave no free variable, so only zero solves the homogeneous system.',
    'h: x = 1 together with 0 = 0 has one solution. i: the single equation 0x + 0y = 1 has two unknowns but is impossible.');
  linear('T1',[[6,1,0,4,-3],[-9,2,3,-8,1],[7,0,-4,5,2]],'Reduce the augmented matrix');
  linear('T2',[[1,0,1,1,3],[0,1,3,1,4],[-1,0,4,0,-6],[0,-1,2,-2,0]],'Find the partial fraction coefficients',[
    'Multiply through by the common denominator. The right side becomes (Ax+B)(x²−1) + C(x+1)(x²+2x+2) + D(x−1)(x²+2x+2).',
    'Expand and match the coefficients of x³, x², x and 1 in order. Those four comparisons are the rows below. The unknowns are A, B, C and D. The identity holds wherever the original denominators are nonzero.']);

  set='1.6';
  byInverse(5,[[1,1,1],[1,1,-4],[-4,1,1]],[5,10,0]);
  byInverse(6,[[0,-1,-2,-3],[1,1,4,4],[1,3,7,9],[-1,-2,-4,-6]],[0,7,4,6]);
  function symbolicInverse(number,a) {
    const r=M.inverse(a);
    const forms=r.value.map((row,i)=>'x'+(i+1)+' = '+row.map((v,j)=>'('+M.format(v)+')b'+(j+1)).join(' + '));
    add(number,'Solve for any right-hand side',forms.join('\n'),...r.steps,
      'Multiply Ax = b by A⁻¹ on the left to isolate x. Multiply each inverse row by the column of b values.',
      ...forms);
  }
  symbolicInverse(7,[[3,5],[1,2]]);
  symbolicInverse(8,[[1,2,3],[2,5,5],[3,5,8]]);
  multi(9,[[1,-5],[3,2]],[[1,4],[-2,5]]);
  multi(10,[[-1,4,1],[1,9,-2],[6,4,-8]],[[0,1,0],[-3,4,-5]]);
  multi(11,[[4,-7],[1,2]],[[0,1],[-4,6],[-1,3],[-5,1]]);
  multi(12,[[1,3,5],[-1,-2,0],[2,5,4]],[[1,0,-1],[0,1,1],[-1,-1,0]]);
  add(13,'Check for independent equations','All b₁ and b₂ are allowed.','Add twice row 1 to row 2. Its left side becomes 7x₂ and its right side is b₂ + 2b₁.','Divide by 7 and substitute into row 1. Both steps work for any right sides.');
  add(14,'Check a multiple of the same equation','b₁ = 2b₂.','The first left side is twice the second, so subtract twice row 2 from row 1.','The new row says 0 = b₁ − 2b₂. When that is true, the second equation can be satisfied by choosing one variable and solving for the other.');
  add(15,'Check the third equation','b₃ = b₁ − b₂.','Subtract row 2 from row 1. The result on the left is −3x₁ + 3x₂ − 3x₃, the third left side.','Rows 1 and 2 are independent. The last row agrees with them exactly when its right side is b₁ − b₂.');
  add(16,'Check the three pivots','All values of b₁, b₂ and b₃ are allowed.',
    'Subtract row 2 from row 3 to get (0,2,2) on the left. Add 4 times row 1 to row 2 to get (0,−3,−2).',
    'Twice the new row 2 plus three times the new row 3 has left side (0,0,2). Thus there is a pivot in each variable column.',
    'The pivots let us solve from the bottom up for any b₁, b₂ and b₃.');
  add(17,'Match the two dependent equations','b₃ = b₂ − b₁ and b₄ = 2b₁ − b₂.',
    'The third left side equals row 2 minus row 1. The fourth left side equals twice row 1 minus row 2.',
    'The right sides must satisfy the same relations. Rows 1 and 2 are independent, so any b₁ and b₂ work once the other two match.');
  {
    const a=[[2,1,2],[2,2,-2],[3,1,1]], cases=[1,4].map(k=>M.solve(a.map((row,i)=>[...row.map((n,j)=>n-(i===j?k:0)),0])));
    add(18,'Move the vector to the left',cases.map((r,i)=>'Part '+(i===0?'a':'b')+': '+C.solutionText(r)).join('\n'),
      'Because Ix = x, subtracting kx from Ax gives (A − kI)x = 0. This subtracts k from each diagonal entry and leaves other entries unchanged.',
      'Part a uses k = 1.',...cases[0].steps,'Part b uses k = 4.',...cases[1].steps);
  }
  function matrixEquation(number,a,b) {
    const r=M.inverse(a), x=M.multiply(r.value,b);
    add(number,'Solve a matrix equation',M.matrixText(x),...r.steps,'Multiply the entire equation AX = B on the left by A⁻¹, giving X = A⁻¹B.',
      ...b[0].map((_,j)=>'Column '+(j+1)+' = A⁻¹ times '+M.vector(b.map(row=>row[j]))+' = '+M.vector(x.map(row=>row[j]))+'.'));
  }
  matrixEquation(19,[[1,-1,1],[2,3,0],[0,2,-1]],[[2,-1,5,7,8],[4,0,-3,0,1],[3,5,-7,2,1]]);
  matrixEquation(20,[[-2,0,1],[0,-1,-1],[1,1,-4]],[[4,3,2,1],[6,7,8,9],[1,3,7,9]]);
  add(21,'Prove the same fact for powers','Only x = 0 solves Aᵏx = 0.',
    'Only the zero vector solves Ay = 0, so Ay = 0 forces y to vanish. Apply this with y = Aᵏ⁻¹x.',
    'Repeat: Aᵏ⁻¹x = 0 implies Aᵏ⁻²x = 0. After k steps, x = 0. The zero vector itself always works.');
  add(22,'Undo the extra multiplication','Ax = 0 and (QA)x = 0 have exactly the same solutions.',
    'If Ax = 0 then Q(Ax) = Q0 = 0. Conversely, if QAx = 0, multiply by Q⁻¹ on the left. This gives Ax = 0.',
    'Because both implications hold for every x, either both systems have only the zero solution or both have nonzero solutions.');
  add(23,'Describe every solution using one known answer','The set of solutions is x₁ + x₀ for all x₀ with Ax₀ = 0.',
    'Let x be any solution. Then A(x − x₁) = Ax − Ax₁ = b − b = 0. So x − x₁ can serve as x₀.',
    'For the reverse direction, if Ax₀ = 0 then A(x₁ + x₀) = b + 0 = b. Every vector constructed this way really solves the system.');
  add(24,'Prove the right-inverse version','If AB = I for square matrices, then BA = I and B = A⁻¹.',
    'Theorem 1.6.3(a) gives the left-inverse implication: if CD = I then DC = I and C = D⁻¹, with the left factor acting as the left inverse of the right factor.',
    'Take C = A and D = B. Now A is a left inverse of B, so A = B⁻¹ and BA = I. Taking inverses gives B = A⁻¹.');
  add('TF','True or false','All seven statements are true.',
    'a: two distinct solutions would give the entire line between and beyond them. b: uniqueness for a square system means the coefficient matrix is invertible, so every new right side has one solution.',
    'c: for square matrices a right inverse is also a left inverse. d: row operations are reversible and preserve the solutions.',
    'e: multiply by S to get A(Sx) = Sb. f: rearrange to (A − 4I)x = 0, which has only zero precisely if its square coefficient matrix is invertible.',
    'g: if AB were invertible, B would have zero kernel and so be invertible. Then A = (AB)B⁻¹ would also be invertible.');
  {
    const a=[[.299,.587,.114],[.596,-.275,-.321],[.212,-.523,.311]], r=M.inverse(a);
    add('T1','Reverse the color conversion',M.matrixText(r.value),...r.steps,'Multiply the YIQ column by this inverse to recover the RGB column. The displayed entries are rounded.');
  }
  multi('T2',[[1,-2,2],[4,5,1],[0,3,-1]],[[0,1,7],[11,5,3],[1,-4,2]]);

  const matrix=M.matrixText;
  const diag=d=>d.map((n,i)=>d.map((_,j)=>i===j?n:0));
  const describe=(a,names)=>a.map(row=>row.flatMap((n,i)=>M.zero(n)?[]:['('+M.format(n)+')'+names[i]]).join(' + ')||'0').join(', ');
  function products(number,factors,explanation='Each entry comes from multiplying a row by a column and adding the matching products.') {
    let value=factors[0];
    const steps=[explanation,'Write the factors in the given order: '+factors.map(matrix).join(' × ')+'.'];
    factors.slice(1).forEach(factor=>{
      const next=M.multiply(value,factor);
      steps.push(...value.flatMap((row,i)=>next[i].map((v,j)=>'Entry ('+(i+1)+','+(j+1)+'): '+row.map((n,k)=>'('+M.format(n)+' × '+M.format(factor[k][j])+')').join(' + ')+' = '+M.format(v)+'.')));
      value=next;
    });
    add(number,'Multiply the matrices',matrix(value),...steps);
  }
  set='1.7';
  add(1,'Classify and check invertibility','a upper, invertible · b lower, singular · c diagonal and both triangular, invertible · d upper, singular',
    'A triangular matrix has all zeros on one side of its main diagonal. A diagonal matrix has zeros on both sides.',
    'Check the diagonal entries. a has (2,3), b has (0,0), c has (−1,2,5), and d has (3,0,8). A triangular matrix is invertible exactly when none of these entries is zero.');
  add(2,'Classify and check four more matrices','a lower, invertible · b upper, singular · c diagonal and both triangular, invertible · d lower, singular',
    'Use the same tests. The diagonals are (4,7), (0,0), (4,3/5,−2), and (3,1,0).',
    'The second and fourth have a zero diagonal entry. The first and third do not.');
  products(3,[diag([3,-1,2]),[[2,1],[-4,1],[2,5]]],'Multiplying by a diagonal matrix on the left scales the three rows by 3, −1, and 2.');
  products(4,[[[1,2,-5],[-3,-1,0]],diag([-4,3,2])],'A diagonal factor on the right scales the columns by −4, 3 and 2.');
  products(5,[diag([5,2,-3]),[[-3,2,0,4,-4],[1,-5,3,0,3],[-6,2,2,2,2]]],'Scale the rows by 5, 2 and −3.');
  products(6,[diag([2,-1,4]),[[4,-1,3],[1,2,0],[-5,1,-2]],diag([-3,5,2])],'Scale the middle matrix’s rows by 2, −1 and 4, then its columns by −3, 5 and 2.');
  solutions[set]=solutions[set].filter(p=>p.number!=='7–10');
  [[1,-2],[-6,3,5],[1/2,1/3,1/4],[-2,-4,-3,2]].forEach((d,i)=>{
    const square=matrix(diag(d.map(n=>n**2))), inv=matrix(diag(d.map(n=>n**-2)));
    const general='diag('+d.map(n=>'1/('+M.format(n)+')ᵏ').join(', ')+')';
    add(i+7,'Raise each diagonal entry separately','A² = '+square+'\nA⁻² = '+inv+'\nA⁻ᵏ = '+general,
      'A diagonal matrix scales each coordinate on its own. Squaring the matrix squares each scale factor.',
      'To undo a nonzero scale n, multiply by 1/n. The negative powers therefore use 1/n² or 1/nᵏ on each diagonal entry. Entries away from the diagonal stay zero.');
  });
  products(11,[diag([1,0,3]),diag([2,5,0]),diag([0,2,1])],'Multiply corresponding diagonal entries: 1×2×0, 0×5×2 and 3×0×1.');
  products(12,[diag([-1,2,4]),diag([3,5,7]),diag([5,-2,3])],'Multiply corresponding diagonal entries: (−1)×3×5, 2×5×(−2) and 4×7×3.');
  add(13,'Use an odd power','diag(1, −1).','Compute 1³⁹ = 1. Each pair of factors −1 cancels, and one factor is left over because 39 is odd.');
  add(14,'Use an even power','I₂.','Compute 1¹⁰⁰⁰ = 1. Pair all 1000 factors of −1, leaving a product of 1.');
  add(15,'Scale rows and columns','a: [au av] [bw bx] [cy cz].\nb: [ra sb tc] [ua vb wc] [xa yb zc].',
    'A diagonal matrix on the left scales row 1 by a, row 2 by b, and row 3 by c.',
    'On the right it scales column 1 by a, column 2 by b, and column 3 by c.');
  add(16,'Apply the same scaling rule','a: [au bv] [aw bx] [ay bz].\nb: [ar as at] [bu bv bw] [cx cy cz].',
    'Part a has a diagonal matrix on the right, so multiply the first column by a and the second by b.',
    'Part b has it on the left, so multiply the three rows by a, b and c respectively.');
  add(17,'Copy the entries across the diagonal','a: [2 −1] [−1 3].\nb: [1 3 7 2] [3 1 −8 −3] [7 −8 0 9] [2 −3 9 0].',
    'A symmetric matrix has equal entries at positions (i,j) and (j,i). Use each given entry below the diagonal to fill its partner above the diagonal.');
  add(18,'Reflect the upper entries into the lower half','a: [0 3] [3 0].\nb: [1 7 −3 2] [7 4 5 −7] [−3 5 1 −6] [2 −7 −6 3].',
    'In a, place 3 above the diagonal to match the given 3 below. In b, copy 7, −3 and 2 from row 1 to column 1, then 5 and −7 from row 2 into column 2, and −6 from row 3 into column 3.');
  [[0,7,-2],[-1,3,5],[1,-5,4,3],[2,-1,0,-5]].forEach((d,i)=>add(i+19,'Inspect the main diagonal',d.includes(0)?'Singular.':'Invertible.',
    'The matrix is triangular. Its main diagonal is '+M.vector(d)+'.',d.includes(0)?'A zero on the diagonal prevents an inverse.':'All diagonal entries are nonzero, so the inverse exists.'));
  add(23,'Find only the diagonal','(−3, 5, −6).','In a product of upper triangular matrices, the diagonal entries are the matching diagonal factors multiplied together: 3(−1), 1(5), and (−1)6.');
  add(24,'Multiply the lower triangular diagonals','(24, 0, 42).','Below the diagonal both matrices may have nonzero entries, but each diagonal entry of their product still uses only one pair: 4×6, 0×5 and 7×6.');
  add(25,'Match the off-diagonal pair','a = −8.','Set a + 5 equal to −3. Subtract 5 from both sides.');
  linear(26,[[1,-2,2,3],[2,1,1,0],[1,0,1,-2]],'Match the three off-diagonal pairs',['Compare a₁₂ with a₂₁, a₁₃ with a₃₁, and a₂₃ with a₃₂. This gives a−2b+2c=3, 2a+b+c=0 and a+c=−2.']);
  add(27,'Exclude the zero diagonal values','All real x except 1, −2 and 4.','Set each diagonal factor x−1, x+2 and x−4 to zero separately. These are the only values that make the triangular matrix singular.');
  add(28,'Check the lower triangular diagonal','All real x except 1/2, 1/3 and −1/4.','The diagonal is x−1/2, x−1/3 and x+1/4. A triangular matrix has an inverse exactly when each of these is nonzero.');
  add(29,'Read the inverse diagonal','The inverse diagonal entries are 1/aᵢᵢ.',
    'The inverse of an invertible triangular matrix is triangular of the same type. In AA⁻¹ = I the i-th diagonal entry is aᵢᵢ times the matching inverse entry.',
    'That product is 1. Divide by aᵢᵢ to get the reciprocal.');
  add(30,'Transpose the products','All three products are symmetric.','When a product is transposed, transpose each factor and reverse their order.',
    '(BᵀB)ᵀ = BᵀB and (BBᵀ)ᵀ = BBᵀ because transposing twice returns B.',
    '(BᵀAB)ᵀ = BᵀAᵀB = BᵀAB because Aᵀ = A.');
  add(31,'Take fifth roots of the diagonal','diag(1, −1, −1).','For a diagonal matrix the fifth power raises each diagonal entry to the fifth power. The real fifth roots of 1, −1 and −1 are 1, −1 and −1.');
  add(32,'Take reciprocal square roots','diag(±1/3, ±1/2, ±1), with independent signs.','Write 1/a₁²=9, 1/a₂²=4 and 1/a₃²=1. Invert both sides of each equation, then take both square roots.');
  {
    const a=[[-1,2,5],[0,1,3],[0,0,-4]], b=[[2,-8,0],[0,2,1],[0,0,3]], r=M.inverse(a);
    add(33,'Verify the triangular product and inverse','AB = '+matrix(M.multiply(a,b))+'\nA⁻¹ = '+matrix(r.value),
      'Multiply A and B in order. For each entry below the diagonal, every row-column product includes a zero, so AB is upper triangular.',
      ...r.steps,'The entries below the diagonal of A⁻¹ are zero as well.');
  }
  add(34,'Use the transpose rule','Both A² and 2A² − 3A + I are symmetric.',
    'Transpose A² to get AᵀAᵀ = AA = A². Then transpose the second expression term by term.',
    'A², A and I each equal their own transpose, so their weighted sum does too.');
  {
    const parts=[[[2,-1],[-1,3]],[[1,-2,3],[-2,1,-7],[3,-7,4]]].map(M.inverse);
    add(35,'Check each inverse for symmetry',parts.map((r,i)=>'Part '+(i?'b':'a')+': '+matrix(r.value)).join('\n'),
      ...parts.flatMap((r,i)=>['Part '+(i?'b':'a')+': start by checking the matching entries across the diagonal of A.',...r.steps,
        'The inverse has matching entries in the same reflected positions, so it is symmetric.']));
  }
  add(36,'Solve the scalar equation on each diagonal','Eight matrices: diag(a,b,c), with a,b,c chosen independently from {−1,4}.',
    'For each diagonal entry t, the equation becomes t²−3t−4=0. Factor it as (t−4)(t+1)=0.',
    'Each of the three positions can take either root. There are 2×2×2 choices.');
  add(37,'Switch the row and column indices','a and c are symmetric. b and d are not symmetric when n ≥ 2.',
    'a and c: swapping i and j changes only the order of addition, so the value stays the same.',
    'b: a₁₂ = −3 and a₂₁ = 3. d: a₁₂ = 18 and a₂₁ = 10. Both fail the reflected-pair test.',
    'When n = 1 there is only one entry, so all four cases are symmetric.');
  add(38,'State the general test','Compare aᵢⱼ and aⱼᵢ for every allowed i and j.','Swap the two indices in the formula. If this never changes the value, the matrix equals its transpose. One counterexample is enough to rule out symmetry.');
  add(39,'Find the missing upper entry','[1 10] [0 −2].',
    'The diagonal of the cube is made of the cubes of the diagonal entries. Take real cube roots of 1 and −8 to get 1 and −2.',
    'Call the remaining entry t. Squaring gives top-right t−2t = −t. Multiplying once more gives t + (−t)(−2) = 3t.',
    'Solve 3t = 30 to get t = 10.');
  {
    const parts=[
      [[[1,0,0],[-2,3,0],[2,4,1]],[[2,-1,3],[0,1,2],[0,0,4]],[1,-2,0]],
      [[[2,0,0],[4,1,0],[-3,-2,3]],[[3,-5,2],[0,4,1],[0,0,2]],[4,-5,2]]
    ].map(([l,u,b])=>{
      const y=M.solve(l.map((r,i)=>[...r,b[i]])), x=M.solve(u.map((r,i)=>[...r,y.point[i]]));
      return {y,x};
    });
    add(40,'Solve first with L and then with U',parts.map(({x},i)=>'Part '+(i?'b':'a')+': '+M.vector(x.point)).join('\n'),
      ...parts.flatMap(({y,x},i)=>['Part '+(i?'b':'a')+': call Ux the vector y. Solve Ly = b to get y.',...y.steps,
        'Now solve Ux = y. This recovers the original unknown vector x.',...x.steps]));
  }
  add(41,'Use opposite entries across the diagonal','a: [0 0 4] [0 0 1] [−4 −1 0].\nb: [0 0 −8] [0 0 −4] [8 4 0].',
    'Every diagonal entry must equal its own negative, so it is zero. For each off-diagonal entry, put the opposite number in the reflected position.');
  add(42,'Match opposite entries and set the diagonal to zero','(a,b,c,d) = (1+10t, 7t, t, 0), for any real t.',
    'The conditions are 2a−3b+c=2, 3a−5b+5c=3, 5a−8b+6c=5, and d=0. The third equation is the sum of the first two.',
    'Double the second and subtract three times the first to get −b+7c=0. Thus b=7c. Substituting in the first gives a=1+10c.',
    'Let c=t. The result is (1+10t,7t,t,0).');
  add(43,'Transpose a product of skew-symmetric matrices','The commuting product is symmetric. It is skew-symmetric only if the product is zero.',
    '(AB)ᵀ = BᵀAᵀ = (−B)(−A) = BA. When the matrices commute, BA = AB.',
    'A matrix equal to both its transpose and its negative must be zero. For a counterexample, square [0 1] [−1 0]. The result is −I₂, which is nonzero and symmetric.');
  add(44,'Split a matrix into two parts','A = (A + Aᵀ)/2 + (A − Aᵀ)/2.',
    'Add the two expressions. The transposes cancel and 2A divided by 2 gives A.',
    'Transposing the first expression leaves it unchanged. Transposing the second reverses the sign, so it is skew-symmetric.');
  add(45,'Keep track of signs when transposing','The inverse, transpose, sum, difference and scalar multiple have the stated skew symmetry.',
    'For the inverse, (A⁻¹)ᵀ = (Aᵀ)⁻¹ = (−A)⁻¹ = −A⁻¹.',
    'For Aᵀ, transposing again gives A = −Aᵀ. For sums, differences and scalar multiples, distribute the transpose, then factor out the minus sign from Aᵀ and Bᵀ.');
  add(46,'Explain why only the diagonal factors survive','(AB)ᵢᵢ = aᵢᵢbᵢᵢ and (BA)ᵢᵢ = bᵢᵢaᵢᵢ.',
    'The i-th diagonal of AB is the sum of aᵢₖbₖᵢ over k. For two upper triangular matrices, k<i makes the first factor zero and k>i makes the second zero.',
    'For two lower triangular matrices, the two reasons switch. Either way only k=i remains. Exchange A and B for the second statement.');
  add(47,'Transpose both sides','A is symmetric and A² = A.','The product AᵀA is symmetric because its transpose is again AᵀA. Since it equals A, the matrix A must be symmetric. Replace Aᵀ with A in the given equation.');
  add('TF','True or false','a T · b F · c F · d T · e T · f F · g F · h T · i T · j F · k F · l F · m T',
    'a: transposition fixes all diagonal positions. b: it turns an upper triangular matrix into a lower triangular one. c: an off-diagonal entry can survive the sum.',
    'd: the upper half of a symmetric matrix determines the lower half by reflection. e: the lower half of an upper triangular matrix is already zero. f: a lower triangular inverse is lower triangular.',
    'g: a negative diagonal entry can be nonzero and invertible. h: the sum still has zeros above the diagonal. i: the zeros below the diagonal reflect to zeros above it.',
    'j and k: take a matrix A with only a nonzero (2,1) entry and B = −A. Their sum is zero and each matrix fails both properties.',
    'l: [0 1] [0 0] squares to the zero matrix but is not symmetric. m: from kAᵀ = kA, divide by nonzero k.');
  {
    const r=M.inverse([[1.24,2.37,0,0],[3.08,-1.01,0,0],[0,0,2.76,4.92],[0,0,3.23,5.54]]);
    add('T1','Invert the blocks separately',matrix(r.value),
      'Put D₁⁻¹ and D₂⁻¹ in the diagonal blocks and zero matrices elsewhere. Multiplying the two block matrices gives identity blocks on the diagonal and zeros elsewhere.',
      ...r.steps,'The two diagonal blocks in the result are the inverses of the corresponding blocks in the original matrix.');
  }

  set='1.9';
  add(3,'Apply the reflection and projection both ways','They commute. Both send (x,y,z) to (0,y,−z).','Reflection in xy changes z to −z. Projection onto yz sets x to zero. These affect different coordinates, so changing the order leaves the same result.');
  add(4,'Apply the reflection and scaling both ways','They commute. Both give (2x,3y,−z).','One operation negates z. The other doubles x and triples y. Neither operation alters the coordinates changed by the other.');
  function twoMaps(number,a,b,sizes,inputs) {
    const ba=M.multiply(b,a), ab=sizes?null:M.multiply(a,b);
    const names=inputs||['x₁','x₂','x₃','x₄'];
    add(number,'Compose in the order the maps act','A = '+matrix(a)+'\nB = '+matrix(b)+'\nBA = '+matrix(ba)+'\n'+
      (ab?'AB = '+matrix(ab)+'\nT₁(T₂(x)) = ('+describe(ab,names)+')':'T₁ ∘ T₂ is undefined.')+'\nT₂(T₁(x)) = ('+describe(ba,names)+')',
      'Read the coefficients of one output at a time to form one row of A or B.',
      'To apply T₁ first, multiply the input by A, then multiply that result by B. Therefore the composite matrix is BA, with A on the right.',
      'Multiply each row of B with each column of A and add the matching products to obtain '+matrix(ba)+'.',
      ab?'Reverse the order to find AB = '+matrix(ab)+'. Multiply each result by the input column to get the coordinate formulas.':
        'The output of T₂ has '+b.length+' coordinates but the input of T₁ needs '+a[0].length+'. So the reverse order is undefined. Multiply BA by the input to read its output formula.');
  }
  twoMaps(5,[[1,-2],[4,1]],[[2,-3],[5,0]]);
  twoMaps(6,[[6,3,-1],[2,0,1],[4,-3,6]],[[4,0,4],[-1,5,2],[2,-3,8]]);
  add(7,'Follow the order of the plane operations','a: [1 0] [0 −1].\nb: [0 −√2/2] [0 √2/2].\nc: [1/2 √3/2] [√3/2 −1/2].',
    'a: a quarter turn takes (x,y) to (−y,x). Swapping gives (x,−y).',
    'b: project to (0,y), then rotate 45° to (−y√2/2,y√2/2).',
    'c: reflect to (x,−y), then rotate 60°. The result is (x/2 + y√3/2, x√3/2 − y/2). Use the x- and y-coefficients as the two columns.');
  add(8,'Follow three plane operations','a: [0 0] [1/2 −√3/2].\nb: [−√2/2 0] [√2/2 0].\nc: −I₂.',
    'a: rotate 60° so the first coordinate is u = x/2 − y√3/2. Project to (u,0), then swap to get (0,u).',
    'b: project to (x,0), rotate to (x√2/2,x√2/2), then negate the first coordinate.',
    'c: rotations about the origin add their angles. 15° + 105° + 60° = 180°, giving (−x,−y).');
  add(9,'Follow two spatial operations','a: diag(−1,0,1). b: diag(1,1,0). c: diag(−1,1,0).',
    'a: yz reflection flips x, then xz projection sets y to zero. b: xy reflection flips z, then xy projection removes z anyway.',
    'c: xy projection removes z, then yz reflection flips x. Read the three coordinate multipliers down the matrix diagonal.');
  add(10,'Follow three spatial operations','a: diag(−1,0,1). b: diag(0,−1,−1). c: diag(0,2,−2).',
    'a: (x,y,z) becomes (x,y,−z), then (x,0,−z), then (−x,0,z).',
    'b: it becomes (x,y,−z), then (x,−y,−z), then (0,−y,−z).',
    'c: it becomes (0,y,z), then (0,2y,2z), then (0,2y,−2z).');
  twoMaps(11,[[1,1],[1,-1]],[[3,0],[2,4]]);
  twoMaps(12,[[4,0,0],[-2,1,0],[-1,-3,0]],[[1,2,0],[0,0,-1],[4,0,-1]]);
  twoMaps(13,[[1,-1],[-1,2],[3,0]],[[0,4,0],[1,2,0]]);
  twoMaps(14,[[1,2,3,0],[0,1,0,-1]],[[-1,0],[0,0],[1,1],[0,3]]);
  twoMaps(15,[[0,1],[1,0],[1,1],[1,-1]],[[1,0,0,1],[0,1,0,1],[0,0,1,1]],true,['x','y']);
  twoMaps(16,[[1,2],[0,0],[2,1]],[[0,0,3],[1,-1,0],[0,0,3],[-1,1,0]],true,['x','y']);
  function inverseMaps(number,parts,mode) {
    const answers=parts.map(([a,v])=>{
      const r=M.inverse(a);
      return {a,r,answer:'A = '+matrix(a)+'. '+(!r.value?'Singular.':'Invertible.'+
        (mode?' A⁻¹ = '+matrix(r.value)+'. '+(v?'Image = '+M.vector(M.apply(r.value,v))+'.':'Inverse output = ('+describe(r.value,['w₁','w₂','w₃'])+').'):''))};
    });
    add(number,'Can the transformation be undone?',answers.map((r,i)=>'Part '+(i?'b':'a')+': '+r.answer).join('\n'),
      'The standard matrix has one row for each output coordinate. An inverse transformation exists exactly when this square matrix has an inverse.',
      ...answers.flatMap(({a,r},i)=>['Part '+(i?'b':'a')+': use the coefficient matrix '+matrix(a)+'.',...r.steps]),
      'When the inverse exists, multiply it by the output column to recover the input.');
  }
  inverseMaps(17,[[[[8,4],[2,1]]],[[[-1,3,2],[2,0,4],[1,3,6]]]],false);
  inverseMaps(18,[[[[2,-3],[5,1]]],[[[1,2,3],[2,5,3],[1,0,8]]]],false);
  inverseMaps(19,[[[[1,2],[-1,1]]],[[[4,-6],[-2,3]]]],true);
  inverseMaps(20,[[[[1,-2,2],[2,1,1],[1,1,0]]],[[[1,-3,4],[-1,1,1],[0,-2,5]]]],true);
  add(21,'Find the reverse motion','a: the same reflection. b: a clockwise 60° rotation. c: no inverse.',
    'Reflecting twice in the same line restores the point. Rotating by 60° and then −60° adds to zero rotation.',
    'Projection onto the x-axis discards y. For example (1,0) and (1,2) both give (1,0), so the original point cannot always be recovered.');
  add(22,'Check three more motions','a: the same reflection. b: no inverse. c: the same reflection through the origin.',
    'Swapping coordinates twice restores both coordinates. Projecting to the y-axis erases x, so two inputs can have the same output.',
    'Reflection through the origin negates both coordinates. Negating twice restores the original point.');
  inverseMaps(23,[[[[1,2],[1,1]],[1,2]],[[[1,1],[1,1]],[1,2]]],true);
  inverseMaps(24,[[[[1,2,0],[1,1,1],[2,3,1]],[1,2,3]],[[[1,1,0],[0,1,1],[1,0,1]],[1,2,3]]],true);
  add(25,'Recognize the reflection line','Reflection across y = −x. Swap the coordinates, then negate both.',
    'Multiply the matrix by (x,y) to get (−y,−x). Points on y = −x stay fixed, while points on y = x reverse direction.',
    'Swapping alone reflects in y = x. Negating both coordinates after that gives the requested transformation.');
  add(26,'Recognize the double angle','Counterclockwise rotation by 2θ. Compose two rotations by θ.',
    'Use cos(2θ) = cos²θ − sin²θ and sin(2θ) = 2sinθ cosθ. The given matrix becomes the usual rotation matrix for 2θ.',
    'Two rotations about the same origin add their angles, so rotating by θ twice gives the same result.');
  add(27,'Connect commuting maps and commuting matrices','Tₐ and Tᵦ commute exactly when AB = BA.',
    'The two composites multiply each input by AB or BA. If the products agree, the maps agree.',
    'If the maps agree on every input, test the coordinate vectors one at a time. Each test compares the matching columns of AB and BA, so all their entries agree.');
  add(28,'Check whether a composite can be inverted','It is invertible exactly when both factors are invertible.',
    'If A and B have inverses, multiply AB by B⁻¹A⁻¹ in either order. The factors cancel to the identity.',
    'Conversely, if AB is invertible then Bx = 0 forces ABx = 0, and therefore x = 0. The square matrix B is invertible. Now A = (AB)B⁻¹ is a product of invertible matrices.');
  add(29,'Relate inverse maps and unique solutions','Tₐ has an inverse exactly when every b has exactly one preimage.',
    'If there is an inverse, x = Tₐ⁻¹(b) exists and is the only possible input. If every b has one preimage, apply that to b = 0.',
    'Only x = 0 then solves Ax = 0. The square matrix A has an inverse, which defines the inverse map on every vector.');
  add('TF','True or false','a F · b T · c T · d F · e T · f F · g T',
    'a: an axis projection and the coordinate swap generally depend on the order. b: A acts first, then B, so multiply BA.',
    'c: rotation angles add. d: reflecting twice in the same line produces the identity. e: swapping coordinates twice gives the original pair.',
    'f: a +90° turn is undone by −90°. g: negating both coordinates twice restores them.');
  {
    const rotation=deg=>{const t=deg*Math.PI/180;return [[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]];};
    const a=M.multiply(M.multiply(rotation(33),diag([-1,1])),rotation(47));
    add('T1','Compose a rotation, reflection and rotation','a: approximately '+matrix(a)+'\nb: approximately '+M.vector(M.apply(a,[1,1])),
      'Write each standard matrix in the order it acts: R(47°), diag(−1,1), then R(33°). The first action belongs farthest right in the product.',
      'Multiply R(33°) × diag(−1,1) × R(47°). Then add the two entries of each output row to apply the composite matrix to (1,1).');
  }

  set='1.8';
  solutions[set]=[];
  function dimensions(number,shapes) {
    add(number,'Count the input and output coordinates',
      shapes.map(([rows,columns],i)=>(shapes.length===1?'':'Part '+String.fromCharCode(97+i)+': ')+'ℝ^'+columns+' → ℝ^'+rows).join('\n'),
      ...shapes.map(([rows,columns],i)=>(shapes.length===1?'':'Part '+String.fromCharCode(97+i)+': ')+
        'There are '+columns+' input coordinates (one for each column) and '+rows+' output coordinates (one for each row). The domain is the space of inputs. The codomain is the space the outputs live in.'));
  }
  [
    [[3,2],[2,3],[3,3],[1,6]],[[4,5],[5,4],[4,4],[3,1]],[[2,2],[3,2]],
    [[3,3],[2,3]],[[2,3],[3,2]],[[2,2],[3,3]],[[2,2],[2,3]],[[2,4],[3,3]],[[3,2]],[[4,3]]
  ].forEach((shapes,i)=>dimensions(i+1,shapes));
  function maps(number,parts,proof=false) {
    const answer=[], steps=[];
    parts.forEach(([a,v],i)=>{
      const label=parts.length>1?'Part '+String.fromCharCode(97+i)+': ':'';
      const result=v?M.apply(a,v):null;
      answer.push(label+'A = '+matrix(a)+(result?'\nT('+M.vector(v)+') = '+M.vector(result):''));
      steps.push(label+'Use one row per output. In each row, list the coefficients of the input coordinates in their original order. Put 0 in any missing position.');
      a.forEach((row,j)=>steps.push('Output '+(j+1)+' has coefficient row '+matrix([row])+'.'));
      if(v) {
        steps.push('Substitute '+M.vector(v)+' into the coordinate formulas. The same substitutions appear as the products of each matrix row with the input column.');
        a.forEach((row,j)=>steps.push('Output '+(j+1)+': '+row.map((n,k)=>'('+M.format(n)+' × '+M.format(v[k])+')').join(' + ')+' = '+M.format(result[j])+'.'));
      }
      if(proof)steps.push('The displayed matrix produces every given output by multiplying the input column. This is the definition of a matrix transformation.');
    });
    add(number,proof?'Prove this is a matrix transformation':'Build or apply the standard matrix',answer.join('\n'),...steps);
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
  add(20,'Multiply using symbolic coordinates','a: (−2x₁+x₂+4x₃, 3x₁+5x₂+7x₃, 6x₁−x₃).\nb: (−x₁+x₂, 2x₁+4x₂, 7x₁+8x₂).',
    'Read each row in order. Multiply the first entry by x₁, the second by x₂, and the third by x₃ if present. Add those terms and write the result in the corresponding row of the output column.');
  maps(21,[[[[2,1],[1,-1]]],[[[1,0,0],[0,0,1],[1,1,0]]]],true);
  maps(22,[[[[1,1,0],[0,1,1],[1,0,0]]],[[[0,1],[1,0]]]],true);
  add(23,'Test whether scaling is preserved','Neither is a matrix transformation.','A matrix map must satisfy T(2v) = 2T(v), because A(2v) = 2Av.',
    'a: for v = (1,0), the first output is 4 after doubling the input but 2 after doubling the output.',
    'b: for v = (1,0,1), the third output is 4 after doubling the input but 2 after doubling the output.');
  add(24,'Find a failed test in each case','Neither is a matrix transformation.','a: the input zero gives (0,1), while a matrix times zero always gives zero.',
    'b: for v = (0,0,1), the third coordinate of T(4v) is 2, but of 4T(v) is 4. The formula also fails to give a real output when x₃ is negative.');
  add(25,'Check the intercept','Yes exactly when b = 0.','At x = 0, f(0) = b. A matrix map must send zero to zero, so b must be zero.',
    'If b = 0 then f(x) = mx, which is multiplication by the one-entry matrix [m].');
  add(26,'Compare two constant maps','The constant-zero map is a matrix operator. The constant-(1,1) map is not.',
    'The 2 × 2 zero matrix sends every input to (0,0). The second map sends the zero input to (1,1), which no matrix can do.');
  function basisImages(number,columns,v) {
    const a=columns[0].map((_,i)=>columns.map(col=>col[i])), result=M.apply(a,v);
    add(number,'Use the basis images as columns','A = '+matrix(a)+'\nT(x) = '+M.vector(result),
      'Each standard basis vector has a single 1. Multiplying A by that vector selects the matching column. Put the given images into the columns in order.',
      'The input '+M.vector(v)+' gives the weights for these columns. Add '+v.map((n,i)=>M.format(n)+' × '+M.vector(columns[i])).join(' + ')+' to get '+M.vector(result)+'.');
  }
  basisImages(27,[[1,3,0],[0,0,1],[4,-3,-1]],[2,1,0]);
  basisImages(28,[[2,1,3],[-3,-1,0],[1,0,2]],[3,2,1]);
  const swap=[[0,1],[1,0]], reflections2=[diag([1,-1]),diag([-1,1]),swap];
  const reflections3=[diag([1,1,-1]),diag([1,-1,1]),diag([-1,1,1])];
  const project2=[diag([1,0]),diag([0,1])], project3=[diag([1,1,0]),diag([1,0,1]),diag([0,1,1])];
  function geometry(number,a,v,description) {
    const output=typeof v[0]==='number'?a.map(mat=>M.vector(M.apply(mat,v))):a.map(mat=>'('+describe(mat,v)+')');
    add(number,'Apply the geometric matrices',output.map((value,i)=>'Part '+String.fromCharCode(97+i)+': '+value).join('\n'),
      description,...a.map((mat,i)=>'Part '+String.fromCharCode(97+i)+': '+matrix(mat)+' sends ('+v.join(', ')+') to '+output[i]+'. Multiply each row by the coordinate column.'));
  }
  geometry(29,reflections2,[-1,2],'Reflection keeps the coordinate along the mirror line and reverses the perpendicular one. Reflection across y = x swaps coordinates.');
  geometry(30,reflections2,['a','b'],'Negate the coordinate perpendicular to the relevant axis. Across y = x, swap a and b.');
  geometry(31,reflections3,[2,-5,3],'Negate the coordinate perpendicular to the mirror plane.');
  geometry(32,reflections3,['a','b','c'],'Only the coordinate perpendicular to the mirror plane changes sign.');
  geometry(33,project2,[2,-5],'Keep the coordinate along the selected axis and set the other one to zero.');
  geometry(34,project2,['a','b'],'An axis projection removes the perpendicular coordinate.');
  geometry(35,project3,[-2,1,3],'A plane projection keeps the two coordinates named in the plane and sets the remaining coordinate to zero.');
  geometry(36,project3,['a','b','c'],'Keep the two coordinates in the plane and erase the perpendicular one.');
  add(37,'Rotate the vector through each angle','a: ((3√3+4)/2, (3−4√3)/2).\nb: ((3−4√3)/2, (−3√3−4)/2).\nc: (7√2/2, −√2/2).\nd: (4,3).',
    'A rotation through θ sends (x,y) to (x cos θ − y sin θ, x sin θ + y cos θ). With (3,−4) this is (3 cos θ + 4 sin θ, 3 sin θ − 4 cos θ).',
    'a uses cosine √3/2 and sine 1/2. b uses cosine 1/2 and sine −√3/2. Insert these into both coordinates.',
    'c uses √2/2 for both sine and cosine. d uses cosine 0 and sine 1.');
  add(38,'Write both rotation formulas','a: (v₁ cos α − v₂ sin α, v₁ sin α + v₂ cos α).\nb: (v₁ cos α + v₂ sin α, −v₁ sin α + v₂ cos α).',
    'Multiply the rotation matrix by the vector. Use the first row for the first coordinate and the second row for the second.',
    'For a negative angle, cosine is unchanged and sine changes sign. Substitute these identities into the same formula.');
  add(39,'Add the two basis images','(a+c, b+d).','Write (1,1) = e₁ + e₂. A linear map preserves addition, so add (a,b) and (c,d) coordinate by coordinate.');
  add(40,'Use the two columns of the matrix','a: (ka,kc).\nb: (ka+lb,kc+ld).','The first column is (a,c) and the second is (b,d). Multiply the first by k. In part b also multiply the second by l and add the two vectors.');
  add(41,'Read and combine three columns','a: (−1,2,4), (3,1,5), (0,2,−3).\nb: (2,5,6).\nc: (0,14,−21).',
    'A basis vector selects its matching column. In b all three weights are 1, so add the three columns coordinate by coordinate. In c multiply column 3 by 7.');
  geometry(42,project3,[1,2,3],'For the xy, xz and yz planes in that order, keep only the coordinates in the plane.');
  geometry(43,reflections3,[1,2,3],'For xy, xz and yz respectively, flip the perpendicular z, y and x coordinate.');
  add(44,'Interpret the transposed rotation','Aᵀ rotates through −θ.','The diagonal cosine entries stay fixed. Swapping the off-diagonal entries changes the sign of the sine terms.',
    'That is exactly what happens when θ is replaced by −θ. The transpose reverses the original turn.');
  function findMap(number,x,y) {
    const r=M.inverse(x), a=M.multiply(y,r.value);
    add(number,'Recover the matrix from its known outputs',matrix(a),
      'Put the known inputs in the columns of X and their corresponding images in the columns of Y. Then AX = Y.',
      'Here X = '+matrix(x)+' and Y = '+matrix(y)+'.',...r.steps,
      'Multiply on the right by X⁻¹ to get A = YX⁻¹. Check that multiplying A by each original input returns its given image.');
  }
  findMap(45,[[1,2],[1,3]],[[1,-2],[-2,5]]);
  findMap(46,[[1,1,-3],[0,1,-1],[2,1,2]],[[2,1,-5],[-3,3,-11],[10,8,7]]);
  add(47,'Describe the motion and test zero','Rotate about the origin by θ, then translate by x₀. This is not a matrix transformation.',
    'First Rθx performs the rotation. Adding x₀ shifts every result by that same vector.',
    'The origin is sent to x₀, which is nonzero. Multiplying any matrix by zero would give zero.');
  geometry(48,[[[1,0,0],[0,0,1],[0,1,0]],[[0,0,1],[0,1,0],[1,0,0]],[[0,1,0],[1,0,0],[0,0,1]]],['x','y','z'],
    'Read each coordinate after the swap in the figure. Each output row has a 1 in the column it copies.');
  solutions[set].at(-1).answer='a: [1 0 0] [0 0 1] [0 1 0].\nb: [0 0 1] [0 1 0] [1 0 0].\nc: [0 1 0] [1 0 0] [0 0 1].';
  add(49,'Recognize the double-angle matrix','It rotates a vector counterclockwise by 2θ, with a negative angle interpreted clockwise.',
    'Replace cos²θ − sin²θ by cos(2θ) and 2sinθ cosθ by sin(2θ). The four entries now match the standard rotation matrix at angle 2θ.');
  add(50,'Prove a property and test the reverse claim','a: T(0) = 0 for every matrix map.\nb: T(x) = x² is a counterexample to the reverse claim.',
    'a: write T(x) = Ax. In each row of A0 every product is zero, so the output is zero.',
    'b: squaring sends 0 to 0. It sends 2 to 4, whereas twice its output at 1 is 2. Matrix maps preserve multiplication by 2, so squaring cannot be one.');
  add('TF','True or false','a F · b F · c T · d F · e T · f F · g F',
    'a and b: the number of columns is the input dimension and the number of rows is the output dimension.',
    'c: choose x = 0 or use the zero map, so both sides are zero. d: every linear map between these coordinate spaces has a standard matrix formed by its basis images.',
    'e: each basis image is one column of A, so all columns must be zero. f: every matrix map has T(−x) = −T(x) by scalar multiplication.',
    'g: the zero input is mapped to b ≠ 0, which a matrix cannot do.');

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
      if(op==='t'){name='('+n+')ᵀ';if(v){value=transpose(v);action='Turn rows into columns.';}}
      if(op==='tr'){
        name='tr('+n+')';
        if(v&&v.length===v[0].length){value=trace(v);action='Add the main diagonal: '+v.map((row,i)=>M.format(row[i])).join(' + ')+'.';}
        else if(v)action='Trace requires a square matrix. This one has '+v.length+' rows and '+v[0].length+' columns.';
      }
      if(op==='s'){
        name=b+'('+n+')';
        if(typeof v==='number'){value=b*v;action='Multiply '+b+' by '+M.format(v)+'.';}
        else if(v){value=scale(b,v);action='Multiply every entry by '+b+'. For example, the top-left entry is '+b+' × '+M.format(v[0][0])+'.';}
      }
      if(op==='+'||op==='-'){
        name='('+n+' '+op+' '+m+')';
        if(v&&w){
          if(v.length===w.length&&v[0].length===w[0].length){
            value=sum(v,op==='+'?w:scale(-1,w));
            action='Combine entries in matching positions. The top-left calculation is '+M.format(v[0][0])+' '+op+' '+M.format(w[0][0])+'.';
          } else action='Addition and subtraction require matching dimensions. Here the sizes are '+v.length+' × '+v[0].length+' and '+w.length+' × '+w[0].length+'.';
        }
      }
      if(op==='*'){
        name='('+n+m+')';
        if(v&&w){
          if(v[0].length===w.length){
            value=M.multiply(v,w);
            action='Multiply rows by columns. For the top-left entry, add '+v[0].map((num,j)=>'('+M.format(num)+' × '+M.format(w[j][0])+')').join(' + ')+'.';
          } else action='The first matrix has '+v[0].length+' columns, but the second has '+w.length+' rows. These counts must match.';
        }
      }
      const display=value===undefined?'undefined':typeof value==='number'?M.format(value):matrix(value);
      steps.push(name+': '+(action||'A required inner expression is undefined.')+' Result: '+display+'.');
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
      add(i+3,'Calculate each matrix expression',results.map((r,j)=>label(j)+': '+r.display).join('\n'),
        'Work inside parentheses first. A transpose switches rows and columns. A trace adds diagonal entries of a square matrix.',
        ...results.flatMap((r,j)=>['Part '+label(j)+':',...r.steps]));
    });
  }
  {
    const a=[[3,-2,7],[6,5,4],[0,4,9]], b=[[6,-2,4],[0,1,3],[7,7,5]];
    const select=(n,parts)=>{
      const answer=[],steps=[];
      parts.forEach(([x,y,direction,i],p)=>{
        const index=i-1, row=direction==='row';
        const weights=row?x[index]:transpose(y)[index], sources=row?y:transpose(x);
        const out=weights.map((_,j)=>M.dot(weights,sources.map(r=>r[j])));
        answer.push(label(p)+': '+M.vector(out));
        steps.push('Part '+label(p)+': the selected '+direction+' gives weights '+M.vector(weights)+'. Use those to combine the '+direction+'s of the '+(row?'right':'left')+' matrix: '+weights.map((n,j)=>M.format(n)+' × '+M.vector(sources[j])).join(' + ')+' = '+M.vector(out)+'.');
      });
      add(n,'Find only the requested row or column',answer.join('\n'),...steps);
    };
    select(7,[[a,b,'row',1],[a,b,'row',3],[a,b,'column',2],[b,a,'column',1],[a,a,'row',3],[a,a,'column',3]]);
    select(8,[[a,b,'column',1],[b,b,'column',3],[b,b,'row',2],[a,a,'column',1],[a,b,'column',3],[b,a,'row',1]]);
    function columnCombinations(n,parts){
      const formulas=parts.flatMap(([x,y],p)=>transpose(y).map((w,j)=>'Part '+label(p)+', column '+(j+1)+': '+
        w.map((v,k)=>M.format(v)+' × '+M.vector(transpose(x)[k])).join(' + ')));
      add(n,'Write columns as weighted sums',formulas.join('\n'),
        'For column j, read the weights down column j of the right factor. Multiply the left factor’s first column by the first weight, its second by the second, and so on. Add the weighted columns.',
        ...formulas);
    }
    columnCombinations(9,[[a,a],[b,b]]);
    columnCombinations(10,[[a,b],[b,a]]);
  }
  function equationFormat(n,parts,toMatrix) {
    const output=parts.map(([a,b,names],i)=>{
      const terms=a.map(row=>describe([row],names));
      return 'Part '+label(i)+': '+(toMatrix?matrix(a)+' × ('+names.join(', ')+')ᵀ = '+M.vector(b)+'ᵀ':terms.map((f,j)=>f+' = '+b[j]).join('\n'));
    });
    add(n,toMatrix?'Write one matrix equation':'Write the individual equations',output.join('\n'),
      toMatrix?'Write the variables in a column. Copy the coefficient of each variable into its column, using zero for any missing term. Put the right-hand numbers in a separate column.':
        'Multiply each coefficient row by the variable column. The result of each row is equal to the matching entry of the right-hand column.',...output);
  }
  const x3=['x₁','x₂','x₃'], x4=[...x3,'x₄'];
  equationFormat(11,[[[[2,-3,5],[9,-1,1],[1,5,4]],[7,-1,0],x3],
    [[[4,0,-3,1],[5,1,0,-8],[2,-5,9,-1],[0,3,-1,7]],[1,3,0,2],x4]],true);
  equationFormat(12,[[[[1,-2,3],[2,1,0],[0,-3,4],[1,0,1]],[-3,0,1,5],x3],
    [[[3,3,3],[-1,-5,-2],[0,-4,1]],[-3,3,0],x3]],true);
  equationFormat(13,[[[[5,6,-7],[-1,-2,3],[0,4,-1]],[2,0,3],x3],[[[1,1,1],[2,3,0],[5,-3,-6]],[2,2,-9],['x','y','z']]],false);
  equationFormat(14,[[[[3,-1,2],[4,3,7],[-2,1,5]],[2,-1,4],x3],[[[3,-2,0,1],[5,0,2,-2],[3,1,4,7],[-2,5,1,6]],[0,0,0,0],['w','x','y','z']]],false);
  add(15,'Multiply from the right','k = −1.','The middle matrix times the right column gives (k+1,k+2,−1).',
    'Multiply by the left row to get k(k+1)+(k+2)−1 = k²+2k+1. Factor this as (k+1)² and set it to zero.');
  add(16,'Find both roots','k = −2 or k = −10.','The middle matrix times the right column gives (6,4+3k,6+k).',
    'Multiply by the left row to get 12+8+6k+6k+k² = k²+12k+20. The factorization (k+2)(k+10)=0 gives both values.');
  function outerProducts(number,a,b){
    const factors=transpose(a).map((col,k)=>({col,row:b[k],value:col.map(n=>b[k].map(w=>n*w))}));
    add(number,'Expand by columns times rows',factors.map(({value})=>matrix(value)).join(' + ')+' = '+matrix(M.multiply(a,b)),
      'Pair column 1 of A with row 1 of B, column 2 with row 2, and so on. In each pair, multiply each entry of the column by the entire row.',
      ...factors.map(({col,row,value},i)=>'Pair '+(i+1)+': '+M.vector(col)+' as a column times '+M.vector(row)+' as a row gives '+matrix(value)+'.'),
      'Add the resulting matrices entry by entry.');
  }
  outerProducts(17,[[4,-3],[2,-1]],[[0,1,2],[-2,3,1]]);
  outerProducts(18,[[0,-2],[4,-3]],[[1,4,1],[-3,0,2]]);
  outerProducts(19,[[1,2,3],[4,5,6]],[[1,2],[3,4],[5,6]]);
  outerProducts(20,[[0,4,2],[1,-2,5]],[[2,-1],[4,0],[1,-1]]);
  const example=[[1,3,-2,0,2,0],[2,6,-5,-2,4,-3],[0,0,5,10,0,15],[2,6,0,8,4,18]];
  linear(21,example.map((row,i)=>[...row,[0,-1,5,6][i]]),'Separate the constant vector from the parameters',
    ['Use the equations of Example 5. A parameter is any number we can choose freely. Group the coefficients of each parameter into a separate vector.']);
  linear(22,example.map(row=>[...row,0]),'Separate the free directions in the homogeneous example',
    ['Use the same coefficient rows with zeros on the right. Group the terms containing each free parameter into one vector.']);
  linear(23,[[1,0,0,0,4],[0,0,-2,1,3],[0,0,2,1,-1],[1,1,0,0,-2]],'Set corresponding entries equal',['Match the four positions. The unknowns in order are a,b,c,d.']);
  linear(24,[[1,-1,0,0,8],[1,1,0,0,1],[0,0,1,3,7],[0,0,-1,2,6]],'Match and solve the four entries',['Match the four positions. Read the final coordinates in order a,b,c,d.']);
  add(25,'Track a zero row and a zero column','A zero row of A stays zero in AB. A zero column of B stays zero in AB.',
    'Every entry of row i of AB comes from dotting row i of A with a column of B. With a zero row, every product is zero.',
    'Every entry of column j of AB uses column j of B. A zero column there makes all those dot products zero.');
  add(26,'Place independent symbols only where allowed','a diagonal · b upper triangular · c lower triangular · d main diagonal and the two neighboring diagonals',
    ...[
      ['a',(i,j)=>i===j],['b',(i,j)=>i<=j],['c',(i,j)=>i>=j],['d',(i,j)=>Math.abs(i-j)<=1]
    ].map(([part,ok])=>'Part '+part+': '+Array.from({length:6},(_,i)=>'['+Array.from({length:6},(_,j)=>ok(i,j)?'a'+(i+1)+(j+1):'0').join(' ')+']').join(' ')),
    'Each symbol may be chosen independently. The zero positions follow the condition on the row and column indices.');
  add(27,'Read the coefficient matrix from the output','Exactly one: [1 1 0] [1 −1 0] [0 0 0].',
    'The first output is x+y, so its coefficients are 1,1,0. The second has 1,−1,0. The third is zero.',
    'Each coefficient can be determined by setting its input to 1 and the other two to 0. Therefore no other matrix can work.');
  add(28,'Explain why a product of variables cannot appear','No such matrix.','A matrix’s first output must be ax+by+cz. Testing the three single-coordinate inputs forces a=b=c=0.',
    'But testing (1,1,0) gives xy=1, contradicting that zero row.');
  add(29,'Explore square roots of matrices','a: ±[1 1] [1 1].\nb: exactly four, diag(±√5, ±3).\nc: some real 2 × 2 matrices have no real square root.',
    'a: multiplying the all-ones 2 × 2 matrix by itself gives 2 in all four positions. Negating both factors leaves the square unchanged.',
    'b: any B with B²=A commutes with A, since BA=B³=AB. With distinct diagonal entries 5 and 9, comparing the off-diagonal entries of BA and AB forces the off-diagonal entries of B to be zero. Then square the two diagonal entries independently.',
    'c: choose A = diag(−1,1). The same commutation argument forces B to be diagonal. No real number squares to −1.');
  add(30,'Construct two examples','a: [0 1] [0 0].\nb: [1 0] [0 0].',
    'a: multiply the proposed matrix by itself. Its only nonzero entry sends the second coordinate into the first, and applying it again sends the result to zero.',
    'b: the diagonal matrix keeps the first coordinate and erases the second. Repeating has exactly the same effect.');
  add(31,'Prove the column-row formula','The two sides have the same (i,j) entry.',
    'By the row-column formula, (AB)ᵢⱼ is the sum of aᵢₖbₖⱼ over k.',
    'In the product of column k of A and row k of B, the (i,j) entry is exactly aᵢₖbₖⱼ. Add those products over k to recover every entry of AB.');
  {
    const examples=[(i,j)=>i+j,(i,j)=>i**(j-1),(i,j)=>Math.abs(i-j)>1?1:-1].map(f=>matrix(Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>f(i+1,j+1)))));
    add(32,'Fill the 4 × 4 matrices',examples.map((s,i)=>label(i)+': '+s).join('\n'),
      'Number rows and columns from 1. In a, add the row number and column number. In b, raise the row number to the column number minus 1.',
      'In c, put −1 on and immediately next to the main diagonal, because |i−j| is at most 1 there. Put 1 in the remaining positions.');
  }
  add(33,'Interpret prices multiplied by quantities','The monthly spending totals, in order January through April, are (20,17,32,24).',
    'Multiply each count by its price, then add across that month: 3+8+9=20, 5+12+0=17, 2+18+12=32, and 1+2+21=24.');
  add(34,'Interpret monthly sales matrices','a: May plus June counts by item and size.\nb: May minus June counts by item and size.\nc: x=(1,1,1)ᵀ.\nd: y=(1,1,1,1).\ne: 492 total May items.',
    'Adding or subtracting the matrices compares entries with the same product and size.',
    'A right-side column of ones adds across the three sizes for each product. A left-side row of ones adds down the four products for each size.',
    'Combining both adds all May counts. The four item totals are 180, 100, 122 and 90, which add to 492.');
  add(35,'Prove that trace distributes across addition','tr(A+B) = tr(A) + tr(B).','On the diagonal, the i-th entry of A+B is aᵢᵢ+bᵢᵢ. Add these entries and separate the a terms from the b terms.');
  add(36,'Use inner dimensions to prove the size claims','a: both products are square.\nb: B has size n × m.',
    'Let A be m × n and B be p × q. AB being defined requires n=p. BA being defined requires q=m. Their resulting sizes are m × m and n × n.',
    'For A(BA), the inner product BA first requires q=m and produces p × n. Multiplying A by that product requires n=p, so B has size n × m.');
  add('TF','True or false','a T · b F · c F · d F · e T · f F · g F · h T · i T · j T · k T · l F · m T · n T · o F',
    'a: this text defines the main diagonal for square matrices. b: m counts rows and n counts columns. c: multiplying a coordinate swap and a one-axis projection in opposite orders gives different outputs.',
    'd: row i of the product comes from row i of A times B. e: rows and columns switch twice. f: using A=B=I₂ gives trace 2 on the left and 4 on the right.',
    'g: a transpose reverses the factor order. h: the main diagonal is unchanged. i: Bᵀ must be 2 × 4 to multiply the 4 × 6 matrix Aᵀ.',
    'j: every diagonal entry is scaled by c. k: add C to both sides. l: let C be zero, so the products agree even for different A and B.',
    'm: AB and BA have sizes m × m and n × n, which must agree for their sum. n: multiplying the zero column of B by A gives zero. o: take B=[1 0] [0 0] and A=[1 1] [0 1]. Both columns of BA are nonzero.');
  outerProducts('T1',[[1,2,4],[2,6,0]],[[4,1,4,3],[0,-1,3,1],[2,7,5,2]]);

  set='1.4';
  {
    const a=[[3,-1],[2,4]], b=[[0,2],[1,-4]], c=[[4,1],[-3,-2]], p=M.multiply;
    function verify(number,parts){
      add(number,'Calculate each side separately',parts.map(([name,left,right],i)=>label(i)+': '+name+' → '+matrix(left)+' on both sides').join('\n'),
        'For a sum or difference, combine matching entries. For a product, multiply one row by one column and add. For a transpose, turn rows into columns.',
        ...parts.flatMap(([name,left,right,work],i)=>['Part '+label(i)+': '+name+'. '+work,'The left side gives '+matrix(left)+'. The right side gives '+matrix(right)+'. Since every entry agrees, the rule is verified.']));
    }
    verify(1,[
      ['Associative addition',sum(a,sum(b,c)),sum(sum(a,b),c),'B+C = '+matrix(sum(b,c))+' and A+B = '+matrix(sum(a,b))+'.'],
      ['Associative multiplication',p(a,p(b,c)),p(p(a,b),c),'BC = '+matrix(p(b,c))+' and AB = '+matrix(p(a,b))+'.'],
      ['Left distributive law',p(a,sum(b,c)),sum(p(a,b),p(a,c)),'B+C = '+matrix(sum(b,c))+', AB = '+matrix(p(a,b))+', AC = '+matrix(p(a,c))+'.'],
      ['Scalar sum',scale(-3,c),sum(scale(4,c),scale(-7,c)),'Add 4 and −7 on the left. On the right add 4C = '+matrix(scale(4,c))+' to −7C = '+matrix(scale(-7,c))+'.']
    ]);
    const out=p(b,c), scaled=scale(4,out);
    verify(2,[
      ['Scalar in a product',scaled,p(scale(4,b),c),'BC = '+matrix(out)+'. Compute (4B)C and B(4C) as well. Both give '+matrix(p(b,scale(4,c)))+'.'],
      ['Left distribution over subtraction',p(a,sum(b,scale(-1,c))),sum(p(a,b),scale(-1,p(a,c))),'B−C = '+matrix(sum(b,scale(-1,c)))+'. Compute AB and AC separately, then subtract.'],
      ['Right distribution',p(sum(b,c),a),sum(p(b,a),p(c,a)),'First form B+C, then multiply by A on the right. Compare with the sum of BA and CA.'],
      ['Repeated scalar multiplication',scale(4,scale(-7,c)),scale(-28,c),'First compute −7C = '+matrix(scale(-7,c))+', then multiply it by 4. On the other side multiply 4 by −7 first.']
    ]);
    verify(3,[
      ['Transpose twice',transpose(transpose(a)),a,'Aᵀ = '+matrix(transpose(a))+'. Switch rows and columns again.'],
      ['Transpose of a product',transpose(p(a,b)),p(transpose(b),transpose(a)),'AB = '+matrix(p(a,b))+'; multiply Bᵀ by Aᵀ in the reverse order.']
    ]);
    verify(4,[
      ['Transpose of a sum',transpose(sum(a,b)),sum(transpose(a),transpose(b)),'A+B = '+matrix(sum(a,b))+'. Transpose that sum, then compare with adding the two transposes.'],
      ['Transpose of a scalar multiple',transpose(scale(4,c)),scale(4,transpose(c)),'4C = '+matrix(scale(4,c))+'. Compare its transpose with scaling Cᵀ by 4.']
    ]);
  }
  add(9,'Find the inverse of the exponential matrix','[u −v] [−v u], where u=(eˣ+e⁻ˣ)/2 and v=(eˣ−e⁻ˣ)/2.',
    'Call the common diagonal entry u and the common off-diagonal entry v. The determinant is u²−v² = (u+v)(u−v).',
    'Adding the definitions gives u+v=eˣ. Subtracting gives u−v=e⁻ˣ. Their product is 1.',
    'The inverse formula switches the two equal diagonal entries, changes both off-diagonal signs, and divides by 1.');
  add(10,'Find the inverse rotation','[cos θ −sin θ] [sin θ cos θ].','The determinant is cos²θ + sin²θ = 1. Apply the 2 × 2 inverse formula: swap the equal diagonal entries, negate each off-diagonal entry, then divide by 1.');
  {
    const a=[[2,-3],[4,4]], b=[[3,1],[5,2]], c=[[2,0],[0,3]], p=M.multiply, abc=p(p(a,b),c);
    const ai=M.inverse(a), bi=M.inverse(b), ci=M.inverse(c);
    const examples=[
      [11,'Transpose and invert',M.inverse(transpose(a)).value,transpose(ai.value),'Find A⁻¹ = '+matrix(ai.value)+' and Aᵀ = '+matrix(transpose(a))+'.'],
      [12,'Invert twice',M.inverse(ai.value).value,a,'Invert A first to get '+matrix(ai.value)+'. Inverting this matrix undoes the first inversion.'],
      [13,'Invert three factors in reverse order',M.inverse(abc).value,p(p(ci.value,bi.value),ai.value),'Compute ABC = '+matrix(abc)+'. Separately compute C⁻¹ = '+matrix(ci.value)+', B⁻¹ = '+matrix(bi.value)+', and A⁻¹ = '+matrix(ai.value)+'.'],
      [14,'Transpose three factors in reverse order',transpose(abc),p(p(transpose(c),transpose(b)),transpose(a)),'First compute ABC = '+matrix(abc)+'. For the other side, transpose C, B and A individually, then multiply in that order.']
    ];
    examples.forEach(([n,title,left,right,work])=>add(n,title,matrix(left),work,'The left side is '+matrix(left)+'. The right side is '+matrix(right)+'. Compare the corresponding entries.'));
  }
  [
    [[[-3,7],[1,-2]],r=>scale(1/7,r),'Inverting both sides gives 7A = M⁻¹. Divide every entry by 7.'],
    [[[-3,-1],[5,2]],r=>scale(1/5,transpose(r)),'Inverting both sides gives 5Aᵀ = M⁻¹. Transpose and then divide by 5.'],
    [[[-1,2],[4,5]],r=>scale(.5,sum(r,scale(-1,unit(2)))),'Inverting both sides gives I+2A = M⁻¹. Subtract I and halve all entries.'],
    [[[2,-1],[3,5]],r=>r,'Inverting both sides immediately gives A = M⁻¹.']
  ].forEach(([m,finish,explanation],i)=>{
    const r=M.inverse(m);
    add(i+15,'Undo the given inverse',matrix(finish(r.value)),'Call the displayed matrix M and invert it.',...r.steps,explanation);
  });
  {
    const items=[[[3,1],[2,1]],[[2,0],[4,1]]];
    items.forEach((a,i)=>{
      const squared=M.multiply(a,a), cubed=M.multiply(squared,a), r=M.inverse(a);
      const inverseCube=M.multiply(M.multiply(r.value,r.value),r.value);
      const polynomial=sum(sum(squared,scale(-2,a)),unit(2));
      add(i+19,'Compute powers and a matrix expression','a: '+matrix(cubed)+'\nb: '+matrix(inverseCube)+'\nc: '+matrix(polynomial),
        'Multiply A by A to get '+matrix(squared)+'. Multiply by A again to obtain A³ = '+matrix(cubed)+'.',
        ...r.steps,'Multiply A⁻¹ by itself three times to get A⁻³ = '+matrix(inverseCube)+'.',
        'For c, compute A², subtract twice A entry by entry, then add 1 to the two diagonal entries to add I.');
      const polys=[sum(a,scale(-2,unit(2))),sum(sum(scale(2,squared),scale(-1,a)),unit(2)),sum(sum(cubed,scale(-2,a)),unit(2))];
      add(i+21,'Evaluate three matrix polynomials',polys.map((m,j)=>label(j)+': '+matrix(m)).join('\n'),
        'Replace each x by A, and each constant term c by cI. The identity has the same size as A.',
        'Compute A² = '+matrix(squared)+' and A³ = '+matrix(cubed)+'.',
        'a: subtract 2I from A. b: double A², subtract A, then add I. c: subtract 2A from A³, then add I. Combine matching entries.');
    });
  }
  add(23,'Equate AB and BA','c=0 and d=a. The entries a and b are arbitrary.',
    'Multiplying gives AB = [0 a] [0 c] and BA = [c d] [0 0]. Equate the top-left, top-right and bottom-right positions.');
  add(24,'Equate AC and CA','b=0 and d=a. The entries a and c are arbitrary.',
    'Multiplying gives AC = [b 0] [d 0] and CA = [0 0] [a b]. Matching positions gives b=0 and d=a.');
  [
    [[[3,-2],[4,5]],[-1,3]], [[[-1,5],[-1,-3]],[4,1]],
    [[[6,1],[4,-3]],[0,-2]], [[[2,-2],[1,4]],[4,4]]
  ].forEach(([a,b],i)=>byInverse(i+25,a,b));
  {
    const a=[[3,1],[2,1]], l=sum(a,scale(3,unit(2))), r=sum(a,scale(-3,unit(2)));
    add(29,'Evaluate both sides of the factorization',matrix(M.multiply(l,r)),
      'First multiply A by itself and subtract 9I to get '+matrix(sum(M.multiply(a,a),scale(-9,unit(2))))+'.',
      'On the other side, A+3I = '+matrix(l)+' and A−3I = '+matrix(r)+'. Multiply them. The entries match.');
  }
  add(30,'Expand the matrix factors','(A+3I)(A−3I) = A²−9I.',
    'Multiply each term in the first bracket by each term in the second, retaining order. The terms are A², −3AI, +3IA and −9I².',
    'Since AI=IA=A, the middle terms cancel. Since I²=I, the remaining constant term is −9I.');
  add(31,'See why the middle terms may survive','a: A=[1 0] [0 0], B=[0 1] [0 0].\nb: A²−AB+BA−B².\nc: AB=BA.',
    'For the example, AB=B and BA=0. The expanded product is A−B, whereas A²−B²=A.',
    'Expand the two brackets term by term, keeping the multiplication order. The middle terms −AB and +BA cancel exactly when AB=BA.');
  add(32,'Build eight square roots of the identity','diag(±1,±1,±1), with independent signs.','Squaring a diagonal matrix squares its three diagonal entries. Each must square to 1, so choose either sign for each. There are 2³=8 choices.');
  add(33,'Find an inverse from a polynomial equation','a: A⁻¹=−A−2I.\nb: A is invertible whenever the constant coefficient is nonzero.',
    'a: rearrange A²+2A+I=0 to A(−A−2I)=I. The factors commute because the second is a polynomial in A.',
    'b: write p(A)=a₀I+A(a₁I+a₂A+⋯+aₘAᵐ⁻¹)=0. Move a₀I to the other side and divide by −a₀ to produce a matrix whose product with A is I.');
  add(34,'Read an inverse from the cube','No. If A³=I, then A⁻¹=A².','Group the three factors as A(A²) or (A²)A. Both products equal I, which defines the inverse.');
  add(35,'Test a zero row or column','No.','A zero row would remain zero in every product AB, making AB=I impossible. A zero column would stay zero in every BA, making BA=I impossible.');
  add(36,'Test repeated rows or columns','No.','Two identical rows of A give two identical rows of AB for every B. Two identical columns give two identical columns of BA. The identity matrix has neither kind of repetition.');
  {
    const r=M.inverse([[1,0,1],[1,1,0],[0,1,1]]);
    add(37,'Solve for the inverse one column at a time',matrix(r.value),
      'In AX=I, let (u,v,w) be any column of X and let (p,q,r) be the matching identity column. The equations are u+w=p, u+v=q, and v+w=r.',
      'Add the first two equations and subtract the third: 2u=p+q−r. Then use v=q−u and w=p−u.',
      'Use (p,q,r)=(1,0,0), (0,1,0), and (0,0,1) in turn to get the three columns in the answer.');
  }
  add(38,'Test whether the identity can be reached','No inverse.','Row 1 is row 2 plus row 3. After multiplication by any X, row 1 of AX would still be the sum of its last two rows.',
    'But row 1 of I₃ is not the sum of rows 2 and 3, so AX=I₃ has no solution.');
  add(39,'Simplify without moving factors','B⁻¹.','Expand the inverses in reverse order: B⁻¹A⁻¹ A C⁻¹ C D D⁻¹. Adjacent A⁻¹A, C⁻¹C and DD⁻¹ cancel.');
  add(40,'Cancel neighboring inverse pairs','CD⁻¹.','The first inverse and its matching factor multiply to I. Rewrite the remaining inverse as CA⁻¹.',
    'The remaining product is CA⁻¹AD⁻¹, which reduces to CD⁻¹.');
  add(41,'Compare a row-column product with a trace','RC = tr(CR).','Write R=(r₁,…,rₙ) and C=(c₁,…,cₙ)ᵀ. RC is the single entry ∑rᵢcᵢ.',
    'The (i,i) entry of CR is cᵢrᵢ. Its trace sums exactly the same scalar products.');
  add(42,'Transpose a repeated product','Yes, (Aⁿ)ᵀ=(Aᵀ)ⁿ.','Transposing reverses factor order and transposes every factor. All n factors are the same A, so the reversed list still has n copies of Aᵀ.');
  add(43,'Explain when cancellation works','a: B=C.\nb: the cancellation requires an inverse.',
    'Multiply AB=AC on the left by A⁻¹. This gives IB=IC and hence B=C.',
    'In the example where cancellation fails, the common factor is singular. The proof cannot begin without A⁻¹.');
  add(44,'Extend scalar factoring to all integer powers','(kA)ⁿ = kⁿAⁿ for every integer n.',
    'For positive n, take one scalar k out of each factor. For zero, both sides are I.',
    'For n<0, use (kA)⁻¹=k⁻¹A⁻¹, which follows by multiplying them to get I. Apply the positive-power case to the inverse.');
  add(45,'Factor a product to reveal the identity','a: the product is I.\nb: A⁻¹+B⁻¹ is invertible, with inverse B(A+B)⁻¹A.',
    'Distribute the outer factors: A(A⁻¹+B⁻¹)B = B+A. Multiplying by (A+B)⁻¹ gives I.',
    'Rewrite (A⁻¹+B⁻¹) as A⁻¹(A+B)B⁻¹. Its three factors are invertible. Reverse their order when inverting.');
  add(46,'Square each proposed expression','a: I−A is idempotent.\nb: (2A−I)⁻¹=2A−I.',
    'Use A²=A. Expanding (I−A)² gives I−2A+A²=I−A.',
    'Expanding (2A−I)² gives 4A²−4A+I=I. A matrix whose square is I is its own inverse.');
  add(47,'Multiply and cancel the successive powers','(I−A)⁻¹ = I+A+⋯+Aᵏ⁻¹.',
    'Multiply the sum by I to get the same sum. Multiplying by −A gives −A−A²−⋯−Aᵏ.',
    'Adding leaves I−Aᵏ=I. All powers commute with A, so multiplication in the other order also gives I.');
  add(48,'Check the four entries','A²−(a+d)A+(ad−bc)I = 0.',
    'Multiply to get A² = [a²+bc, ab+bd] [ac+cd, bc+d²].',
    'Subtract (a+d)A. The off-diagonal entries cancel, and each diagonal entry is bc−ad. Adding (ad−bc)I makes both diagonal entries zero.');
  add(49,'Isolate the middle factor D','D = CA⁻¹B⁻¹A⁻²BC²(Bᵀ)⁻¹A².',
    'Write the equation as LDR=Cᵀ with L=CᵀB⁻¹A²BAC⁻¹ and R=A⁻²BᵀC⁻². Multiply by L⁻¹ on the left and R⁻¹ on the right.',
    'Reverse the factors to get L⁻¹=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹ and R⁻¹=C²(Bᵀ)⁻¹A². The neighboring (Cᵀ)⁻¹Cᵀ cancels.');
  add(50,'Undo all factors surrounding D','D = (Cᵀ)⁻¹B⁻¹BᵀC⁻¹(Aᵀ)⁻¹B⁻¹.',
    'Multiply AB Cᵀ D B Aᵀ C = ABᵀ by (ABCᵀ)⁻¹ on the left and (BAᵀC)⁻¹ on the right.',
    'Reverse the order in each inverse and cancel the adjacent A⁻¹A. Keep all other factors in their given order.');
  add(51,'Prove commutativity of addition','A+B=B+A.','In position (i,j), the two matrices contain aᵢⱼ+bᵢⱼ and bᵢⱼ+aᵢⱼ. These real sums agree at every position.');
  add(52,'Prove associativity of addition','A+(B+C)=(A+B)+C.','At position (i,j), the two sides group the same three real entries differently. Ordinary addition gives the same number for either grouping.');
  add(53,'Prove distribution over subtraction','A(B−C)=AB−AC.','The (i,j) entry is ∑aᵢₖ(bₖⱼ−cₖⱼ). Distribute inside the sum and separate the two sums to obtain (AB)ᵢⱼ−(AC)ᵢⱼ.');
  add(54,'Prove associativity of multiplication','A(BC)=(AB)C.','Expanding the (i,j) entry of A(BC) gives a sum over k and l of aᵢₖbₖₗcₗⱼ. Expanding (AB)C gives the same terms, with the other sum done first.',
    'The sums are finite, so changing the order of addition leaves the result unchanged.');
  add(55,'Subtract a matrix from itself','A−A = A+(−A) = 0.','At every position, subtract the same entry from itself. Each difference is zero, so the result is the zero matrix.');
  add(56,'Subtract the zero matrix','A−0=A.','At every position, subtract 0 from the entry of A. Every entry stays the same.');
  add(57,'Prove that transpose commutes with scaling','(kA)ᵀ = kAᵀ.','Entry (i,j) of the left side comes from entry (j,i) of kA, which is kaⱼᵢ. The right side multiplies the same transposed entry by k.');
  add(58,'Prove the reversed transpose rule','(AB)ᵀ = BᵀAᵀ.','Entry (i,j) of the left side is entry (j,i) of AB, the sum of aⱼₖbₖᵢ over k.',
    'Entry (i,j) of BᵀAᵀ sums bₖᵢaⱼₖ. Real numbers commute, so the sums match at every position.');
  add('TF','True or false','a F · b F · c F · d F · e F · f T · g T · h T · i F · j T · k F',
    'a: inverses give the identity. b and c: expansion yields both AB and BA. They need not be equal. d and e: both inversion and transposition reverse the order of a product.',
    'f: the determinant criterion is ad−bc≠0. g: switching indices commutes with addition and scaling. h: the transpose of the inverse undoes the transpose.',
    'i: the sum of coefficients multiplies I; the result is a matrix. j: a zero row or column prevents an identity product. k: I and −I are invertible but sum to zero.');
  {
    const a=[[0,1/2,1/3],[1/4,0,1/5],[1/6,1/7,0]], a2=M.multiply(a,a), a3=M.multiply(a2,a);
    add('T1','Show that all powers approach zero','Every entry of Aᵏ approaches 0.',
      'Compute A² = '+matrix(a2)+' and A³ = '+matrix(a3)+' to see the entries shrink.',
      'The entries are nonnegative and the largest row sum of A is 5/6. Every row sum of A² is at most (5/6)², because each is a weighted sum of row sums of A.',
      'Repeat to bound the row sums of Aᵏ by (5/6)ᵏ. Every entry is between zero and this bound, which tends to zero.');
  }
  add('T2','Find formulas for positive powers','a: [aⁿ, naⁿ⁻¹] [0, aⁿ]. For a=0, use A for n=1 and zero thereafter.\nb: [cos(nθ) sin(nθ)] [−sin(nθ) cos(nθ)].',
    'a: the first two powers have diagonal a and a² and upper-right entries 1 and 2a. Multiplying the general formula by A changes that entry to aⁿ+naⁿ=(n+1)aⁿ and multiplies the diagonal by a.',
    'b: the matrix rotates clockwise by θ. Repeating n times adds the angles, giving clockwise nθ.');
  add('T3','Verify the Fibonacci power formula','Qⁿ = [Fₙ₊₁ Fₙ] [Fₙ Fₙ₋₁] for n≥1.',
    'For n=1 the formula gives Q because F₂=F₁=1 and F₀=0.',
    'Multiply the general matrix on the right by Q. Its first column becomes (Fₙ₊₁+Fₙ,Fₙ+Fₙ₋₁) = (Fₙ₊₂,Fₙ₊₁). Its second column becomes the old first column.',
    'This is exactly the formula at n+1. The PDF shows F₀ in the last position. That works only for the first power and should read Fₙ₋₁.');

  set='1.5';
  add(1,'Test for exactly one elementary row operation','a yes · b no · c no · d no',
    'a: start from I₂ and subtract five copies of row 1 from row 2.',
    'b: a row swap alone would leave 0 in the upper-left corner. Adding a multiple changes only one row, but both rows here differ from the identity.',
    'c: there is a zero row, so the matrix cannot be inverted. Every elementary operation is reversible.',
    'd: scaling row 1 changes only the first entry, and adding to it would leave its original diagonal entry 1. A swap cannot give its two nonzero entries. More than one operation is needed.');
  add(2,'Find the one change when it exists','a yes · b yes · c yes · d no',
    'a: multiply row 2 by √3. b: swap rows 1 and 3. c: add nine copies of row 3 to row 2.',
    'd: the last two rows have been swapped and the first row has been multiplied by −1. These are two operations.');
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
    if(type==='swap')return 'Swap rows '+(i+1)+' and '+(j+1);
    if(type==='scale')return 'Multiply row '+(i+1)+' by '+M.format(factor);
    return 'Add ('+M.format(factor)+') × row '+(j+1)+' to row '+(i+1);
  }
  function reverseOp(o) {
    if(o.type==='swap')return o;
    return {...o,factor:o.type==='scale'?1/o.factor:-o.factor};
  }
  function undoRows(n,parts,restoring=true) {
    add(n,'Undo each elementary operation',parts.map(([d,o],i)=>label(i)+': '+matrix(rowOperation(unit(d),o))).join('\n'),
      (restoring?'Reverse the original row change.':'Compare the two matrices row by row to find which operation sends the source to the target.')+' To build its matrix, apply that operation to the identity of the same size.',
      ...parts.map(([d,o],i)=>'Part '+label(i)+': '+opText(o)+'. On the identity this gives '+matrix(rowOperation(unit(d),o))+
        '. Applying the same operation to the source matrix '+(restoring?'restores the identity.':'gives the requested target.')));
  }
  undoRows(3,[[2,addOp(1,2,3)],[3,scaleOp(1,-1/7)],[3,addOp(3,1,5)],[4,swapOp(1,3)]]);
  undoRows(4,[[2,addOp(2,1,3)],[3,scaleOp(3,1/3)],[4,swapOp(1,4)],[4,addOp(1,3,1/7)]]);
  const a5=[[-1,-2,5,-1],[3,-6,-6,-6]], b5=[[2,-1,0,-4,-4],[1,-3,-1,5,3],[2,0,1,3,-1]], c5=[[1,4],[2,5],[3,6]];
  function checkRows(n,parts) {
    const cases=parts.map(([a,o])=>{
      const e=rowOperation(unit(a.length),o);
      return {a,e,o,result:M.multiply(e,a),changed:rowOperation(a,o)};
    });
    add(n,'Connect left multiplication to a row change',cases.map((r,i)=>label(i)+': '+matrix(r.result)).join('\n'),
      'Compare E with the identity to find the row operation. Each row of E gives the weights used to combine the corresponding rows of A.',
      ...cases.flatMap(({a,e,o,result,changed},i)=>['Part '+label(i)+': '+opText(o)+'. This makes '+matrix(changed)+' from A.',
        'Multiplying '+matrix(e)+' by '+matrix(a)+' also gives '+matrix(result)+'.']));
  }
  checkRows(5,[[a5,swapOp(1,2)],[b5,addOp(3,2,-3)],[c5,addOp(1,3,4)]]);
  checkRows(6,[[a5,scaleOp(1,-6)],[b5,addOp(2,1,-4)],[c5,scaleOp(2,5)]]);
  undoRows(7,[[3,swapOp(1,3)],[3,swapOp(1,3)],[3,addOp(3,1,-2)],[3,addOp(3,1,2)]],false);
  undoRows(8,[[3,scaleOp(2,-3)],[3,scaleOp(2,-1/3)],[3,addOp(2,3,2)],[3,addOp(2,3,-2)]],false);
  function inverseParts(n,parts) {
    const cases=parts.map(M.inverse);
    add(n,'Use the row-reduction algorithm',cases.map((r,i)=>(parts.length>1?label(i)+': ':'')+(r.value?matrix(r.value):'No inverse.')).join('\n'),
      ...cases.flatMap((r,i)=>[...(parts.length>1?['Part '+label(i)+':']:[]),...r.steps]));
  }
  inverseParts(11,[[[1,2,3],[2,5,3],[1,0,8]],[[-1,3,-4],[2,4,1],[-4,2,-9]]]);
  inverseParts(12,[[[.2,.2,-.4],[.2,.2,.1],[.2,-.8,.1]],[[.2,.2,-.4],[.4,-.6,-.3],[.2,-.8,.1]]]);
  inverseParts(13,[[[1,0,1],[0,1,1],[1,1,0]]]);
  add(14,'Invert the two-coordinate block','[√2/26, −3√2/26, 0] [4√2/26, √2/26, 0] [0, 0, 1].',
    'The bottom coordinate is already unchanged, so work on the top-left block only. Divide both top rows of [A | I] by √2. The left block becomes [1 3] [−4 1], and the corresponding right block is I₂/√2.',
    'Add 4 times the first row to the second, giving a second pivot 13. Divide that row by 13, then subtract three copies of it from the first row.',
    'The right block now reads [1 −3] [4 1] divided by 13√2. Rationalizing gives the displayed entries. Leave the third row and column unchanged.');
  inverseParts(15,[[[2,6,6],[2,7,6],[2,7,7]]]);
  inverseParts(16,[[[1,0,0,0],[1,3,0,0],[1,3,5,0],[1,3,5,7]]]);
  inverseParts(17,[[[2,-4,0,0],[1,2,12,0],[0,0,2,0],[0,-1,-4,-5]]]);
  inverseParts(18,[[[0,0,2,0],[1,0,0,1],[0,-1,3,0],[2,1,5,-3]]]);
  add(19,'Invert the diagonal and 2 × 2 blocks','a: diag(1/k₁,1/k₂,1/k₃,1/k₄).\nb: put [1/k, −1/k] [0, 1] in both diagonal blocks, with zeros in the other blocks.',
    'a: each diagonal entry scales its own coordinate by kᵢ, so divide by the same number to undo it.',
    'b: each block maps (x,y) to (kx+y,y). Recover y from the second output, subtract it from the first output, then divide by k. This gives the stated inverse block.');
  add(20,'Undo a reversal and a lower triangular map','a: antidiagonal entries (1/k₄,1/k₃,1/k₂,1/k₁), all other entries zero.\nb: [1/k 0 0 0] [−1/k² 1/k 0 0] [1/k³ −1/k² 1/k 0] [−1/k⁴ 1/k³ −1/k² 1/k].',
    'a: the matrix reverses the coordinate order and scales each output. To undo this, divide by the relevant kᵢ and reverse again.',
    'b: solve Ax=y from the first row down. The first gives x₁=y₁/k. Each later row gives xᵢ=(yᵢ−xᵢ₋₁)/k. Substitute the previous expression each time and read off the coefficients of y.');
  add(21,'Find when every pivot survives','All c except 0 and 1.',
    'Subtract the original second row from the first, then the original third row from the second. The diagonal entries of the triangular result are c−1, c−1 and c.',
    'Row replacement does not change invertibility. Each diagonal must be nonzero, so exclude c=0 and c=1.');
  add(22,'Check three exceptional values','All c except 0, √2 and −√2.',
    'Write the homogeneous equations cx+y=0, x+cy+z=0 and y+cz=0. From the first two, y=−cx and z=(c²−1)x.',
    'Substitute those into the last equation. It becomes c(c²−2)x=0.',
    'If the coefficient is nonzero, all three unknowns are zero and the matrix is invertible. Otherwise x is free and the matrix has no inverse. The coefficient vanishes at 0 and ±√2.');
  [
    [[-3,1],[2,2]], [[1,0],[-5,2]], [[1,0,-2],[0,4,3],[0,0,1]], [[1,1,0],[1,1,1],[0,1,1]]
  ].forEach((a,i)=>{
    const {steps,operations}=M.reduce(a);
    const es=operations.map(o=>matrix(rowOperation(unit(a.length),o)));
    const back=operations.map(o=>matrix(rowOperation(unit(a.length),reverseOp(o))));
    add(i+23,'Write A and its inverse as products','A = '+back.join(' × ')+'\nA⁻¹ = '+[...es].reverse().join(' × '),
      'Reduce A to the identity and label each row operation E₁, E₂, and so on. To get its elementary matrix, apply the operation to the identity.',
      ...steps,...operations.map((o,j)=>'E'+(j+1)+': '+opText(o)+' gives '+es[j]+'. Its inverse is '+back[j]+'.'),
      'The first operation acts first, so it sits farthest right in A⁻¹. To get A, invert that whole product, reversing the order and replacing each factor by its inverse.');
  });
  function rowEquivalent(n,a,b) {
    const ar=M.reduce(a), br=M.reduce(b);
    const backwards=[...br.operations].reverse().map(reverseOp);
    const ops=[...ar.operations,...backwards], transfer=ops.reduce(rowOperation,unit(a.length));
    let rows=ar.rows;
    add(n,'Find row operations and the matrix C','C = '+matrix(transfer),
      'Reduce A to its reduced form. Reduce B to the same form separately, then undo the operations on B in reverse order.',
      ...ar.steps,'Now reduce B:',...br.steps,'Starting with the common form, undo the operations used for B:',
      ...backwards.map(o=>{rows=rowOperation(rows,o);return opText(o)+'. The rows become '+matrix(rows)+'.';}),
      'Apply the entire A-to-B operation list to the identity instead of A. The result is C. Checking CA gives '+matrix(M.multiply(transfer,a))+'.');
  }
  rowEquivalent(27,[[1,2,3],[1,4,1],[2,1,9]],[[1,0,5],[0,2,-2],[1,1,4]]);
  rowEquivalent(28,[[2,1,0],[-1,1,0],[3,0,-1]],[[6,9,4],[-5,-1,0],[-1,-2,-1]]);
  add(29,'Count which entries a single operation can change','At least one of a,b,c is zero.',
    'The first two rows of the identity are unchanged. A swap would change at least one of them, so the operation is either scaling row 3 or adding one other row to it.',
    'Scaling leaves a=b=0. Adding one other row to row 3 can change a or b, but not both. In all cases at least one entry is zero.');
  add(30,'Find too many columns in the same two positions','The matrix is always singular.',
    'Look only at columns 1, 3 and 5. Their possible nonzero entries are all in rows 2 and 4.',
    'Three column vectors supported in two coordinates are dependent. Consequently the full matrix has a nonzero solution to Ax=0 and cannot be invertible.');
  add(31,'Relate row equivalence to reduced form','The matrices are row equivalent exactly when their reduced forms agree.',
    'Elementary operations are reversible. If A can be turned into B, then continuing to reduce B produces a reduced form of A. The reduced form is unique.',
    'If the reduced forms agree, reduce A to that common form. Reverse the operations that reduce B. This gives a row-operation path from A to B.');
  add(32,'Track invertibility through row operations','B is invertible.',
    'An elementary row operation multiplies on the left by an invertible elementary matrix. A sequence of operations gives B=Eₖ⋯E₁A.',
    'All the factors have inverses. Their product has an inverse made by reversing the factors and inverting each one.');
  add(33,'Reverse the entire operation sequence','Apply the inverse operations from last to first.',
    'Undo a swap by swapping again. Undo scaling by the reciprocal. Undo adding a multiple by adding the opposite multiple.',
    'Undo the last change first, because it was performed on the result of all the earlier ones. Repeat until A is restored.');
  add('TF','True or false','a F · b T · c T · d T · e T · f T · g F',
    'a: scaling row 1 by 2 and row 2 by 3 gives diag(2,3), which needs two changes to the identity. b: each individual operation is reversible.',
    'c: concatenate the two operation lists. d: a singular square matrix has a free variable in Ax=0, so infinitely many solutions.',
    'e and f: multiplying by an invertible elementary matrix preserves whether an inverse exists.',
    'g: insert any elementary operation followed by its inverse. This gives a different product with the same value.');
  {
    const a=[[1,2],[0,-1]], b=unit(2), d=[[2,0],[3,3]], ai=M.inverse(a).value, di=M.inverse(d).value;
    const topRight=scale(-1,M.multiply(M.multiply(ai,b),di)), out=ai.map((row,i)=>[...row,...topRight[i]]).concat(di.map(row=>[0,0,...row]));
    add('T1','Use the block inverse formula',matrix(out),
      'Split the matrix into four 2 × 2 blocks. The bottom-left block C is zero, so D−CA⁻¹B is just D. The top-left and bottom-right inverse blocks are A⁻¹ and D⁻¹.',
      'Compute A⁻¹ = '+matrix(ai)+' and D⁻¹ = '+matrix(di)+'. The top-right block is −A⁻¹BD⁻¹ = '+matrix(topRight)+'.',
      'The bottom-left stays zero. Assemble the four blocks to get the answer.');
  }

  set='review';
  [
    [[3,-1,0,4,1],[2,0,3,3,-1]],[[1,4,-1],[-2,-8,2],[3,12,-3],[0,0,0]],
    [[2,-4,1,6],[-4,0,3,-1],[0,1,-1,3]],[[3,1,-2],[-9,-3,6],[6,2,1]]
  ].forEach((a,i)=>gaussian(i+1,a,true));
  add(5,'Recover the rotated coordinates','x′ = (3x+4y)/5, y′ = (−4x+3y)/5.',
    'Multiply the two equations by 5. The new rows have left sides 3x′−4y′ and 4x′+3y′, with right sides 5x and 5y.',
    'Divide row 1 by 3 and subtract 4 times the new row 1 from row 2. This gives (25/3)y′ = 5y − (20/3)x.',
    'Multiply row 2 by 3/25. Then add 4/3 of that row to row 1 to clear its y′ term. The right sides are the two formulas shown.');
  add(6,'Undo a symbolic rotation','x′ = x cos θ + y sin θ, y′ = −x sin θ + y cos θ.',
    'Write c = cos θ and s = sin θ. The augmented rows are [c,−s | x] and [s,c | y].',
    'If c≠0, divide row 1 by c, then subtract s times that row from row 2. Its second coefficient is c+s²/c = 1/c because c²+s²=1.',
    'Multiply row 2 by c to get y′ = cy−sx. Add s/c times the new row 2 to row 1 to get x′ = cx+sy.',
    'If c=0 then s is 1 or −1. The original two rows directly give y′=−sx and x′=sy, the same formulas.');
  add(8,'Find the counts of the three coins','3 pennies, 4 nickels and 6 dimes.',
    'Write p+n+d=13 for the total number and p+5n+10d=83 for the value in cents.',
    'Subtract the first equation from the second to get 4n+9d=70. Since n≥0, d can be at most 7. Also 9d and d have the same remainder on division by 4, so d must leave remainder 2.',
    'Try d=2 and d=6. The first gives n=13 and p=−2, which cannot count coins. The second gives n=4 and p=3.',
    'Check 3+4+6=13 and 3+20+60=83. The extra sentence about an economy has no data in this coin problem.');
  add(9,'Separate the cases according to a and b','a: a≠0 and b≠2.\nb: a≠0 and b=2.\nc: a=0 and b=2.\nd: a=0 and b≠2.',
    'Replace row 2 with row 2 minus rows 1 and 3. The new equation is (2−b)z = 2−b.',
    'If a≠0, rows 1 and 3 determine x and y once z is chosen. For b≠2, the new equation fixes z=1. For b=2, that equation says 0=0 and z is free.',
    'If a=0, the original middle row gives 4z=4. With z=1 the other rows require b=2. When they agree, x and y are both free.');
  add(10,'Use the already known coordinate','No solutions unless a=2 or a=−3/2. At either value there are infinitely many. There is never exactly one.',
    'The second equation already says x₃=2. Substitute into the third to obtain 2(a²−4)=a−2.',
    'Bring all terms to one side and factor: (a−2)(2a+3)=0. If this fails there is a contradiction.',
    'If it holds, the first equation reduces to x₁+x₂=2. Choose one freely and get the other by subtraction.');
  add(11,'Use the columns of B one at a time','K = [0 2] [1 1].',
    'Call AK the 3 × 2 matrix Y. The columns of YB are twice column 1 of Y, column 2 of Y, and negative column 2 of Y.',
    'Match the columns of C to obtain Y₁=(4,3,−2) and Y₂=(6,−1,0). The third column agrees with −Y₂.',
    'For each column (u,v) of K, use rows 1 and 3 of A: u+4v=Y₁st and u−2v=Y₃rd. Subtract to find v. This gives (0,1) for the first column and (2,1) for the second. Row 2 gives 3 and −1 respectively, as required.');
  add(12,'Substitute the known solution','a=2, b=−1, c=1.',
    'Insert x=1, y=−1, z=2 in each equation. Simplifying gives a−b=3, b+2c=1 and a−2c=0.',
    'Add the first two equations to obtain a+2c=4. Together with a=2c this gives 4c=4. Then c=1, a=2 and b=−1.');
  {
    const b=[[-1,0,1],[1,1,0],[3,1,-1]], ca=[[1,2,0],[-3,1,5]], inv=M.inverse(b);
    const xa=M.multiply(ca,inv.value);
    const xb=[[-5,-1],[6,-3]].map(d=>M.solve([[1,3,d[0]],[-1,0,d[1]]]).point);
    const xc=M.solve([[2,-2,1,0,2],[-4,3,0,1,-2],[-1,0,1,-2,5],[0,-1,-4,2,4]]);
    add(13,'Isolate the unknown matrix by reading its entries',
      'a: '+matrix(xa)+'\nb: '+matrix(xb)+'\nc: '+matrix([xc.point.slice(0,2),xc.point.slice(2)]),
      'Part a: multiply XB=C on the right by B⁻¹ to get X=CB⁻¹.',...inv.steps,
      'Part b: each unknown row (u,v) of X produces (u+3v,−u,2u+v). The first two entries determine u and v. The third entry checks the answer. This gives '+matrix(xb)+'.',
      'Part c: write X with rows (u,v) and (w,z). Multiply on both sides and match the four entries. The resulting coefficient rows are below, in the variable order u,v,w,z.',...xc.steps);
  }
  add(14,'Multiply the geometric sum by I−A','a: I+A+A²+A³.\nb: I+A+⋯+Aⁿ.',
    'Multiplying I−A by a finite sum of successive powers leaves the first term I and the negative of the next power. The middle terms cancel in pairs.',
    'In a the leftover is I−A⁴=I. In b it is I−Aⁿ⁺¹=I. The factors commute, so this gives both inverse products.');
  linear(16,[[1,-1,1,0],[4,2,1,-9],[4,1,0,0]],'Use two points and the slope',
    ['Insert the two points into p(x)=ax²+bx+c to get a−b+c=0 and 4a+2b+c=−9.',
    'The derivative gives the slope: p′(x)=2ax+b. A horizontal tangent at x=2 means 4a+b=0. These three equations determine a,b,c.']);
  add(17,'Use the all-ones product','(I−Jₙ)⁻¹ = I−Jₙ/(n−1).',
    'Each entry of Jₙ² adds n ones, so Jₙ²=nJₙ.',
    'Multiply the two proposed factors. The coefficient of Jₙ becomes −1−1/(n−1)+n/(n−1)=0.',
    'The product is I. Reversing the factors gives the same expansion, since each is a combination of I and Jₙ.');
  add(18,'Transpose the entire equation','Aᵀ satisfies the same polynomial.',
    'Transpose each term. A power of a single matrix transposes to the same power of its transpose, because reversing identical factors changes nothing.',
    'I and the zero matrix equal their transposes. This gives (Aᵀ)³+4(Aᵀ)²−2Aᵀ+7I=0.');
  add(19,'Move the inverse to the other side','A commutes with B⁻¹ exactly when it commutes with B.',
    'If AB⁻¹=B⁻¹A, multiply by B on the left and on the right to obtain BA=AB.',
    'Conversely, if AB=BA, multiply on the left and right by B⁻¹ to obtain B⁻¹A=AB⁻¹.');
  add(20,'Factor A out on the right','The two matrices are invertible together or singular together.',
    '(I+BA⁻¹)A = A+B. Since A is invertible, if the first factor is invertible, their product is invertible.',
    'If A+B is invertible, rewrite I+BA⁻¹=(A+B)A⁻¹. Both factors on this right side are invertible.');
  add(21,'Read the product as an average','The ith entry is the average of row i of A.',
    'Multiply row i by the column B. Each entry of A is weighted by 1/n, so the result is (aᵢ₁+⋯+aᵢₙ)/n, the ordinary arithmetic mean.');
  add(22,'Differentiate each matrix entry','a: (kA)′=kA′.\nb: (A+B)′=A′+B′.\nc: (AB)′=A′B+AB′.',
    'In a, k is constant. The derivative of each scaled entry is k times that entry’s derivative.',
    'In b, differentiate the sum of the two matching entries term by term.',
    'In c, entry (i,j) is a sum of products aᵢₖbₖⱼ. Apply the ordinary product rule to each pair. The terms differentiating A add to (A′B)ᵢⱼ, and those differentiating B add to (AB′)ᵢⱼ.');
  add(23,'Differentiate the identity product','(A⁻¹)′ = −A⁻¹A′A⁻¹.',
    'Assume A(x) is square and invertible throughout a neighborhood and its entries are differentiable there. The inverse entries are differentiable there too, by the cofactor formula with nonzero determinant.',
    'Differentiate AA⁻¹=I using the matrix product rule. The right side is constant, so A′A⁻¹+A(A⁻¹)′=0.',
    'Move A′A⁻¹ to the right and multiply on the left by A⁻¹.');
  add(24,'Prove each identity by factoring','All three identities hold whenever the stated inverses exist.',
    'a: C⁻¹+D⁻¹ = D⁻¹(C+D)C⁻¹. Expand to check, then invert the product in reverse order.',
    'b: expand (I+CD)C and C(I+DC). Both equal C+CDC. Multiply by (I+CD)⁻¹ on the left and by (I+DC)⁻¹ on the right.',
    'c: expand (C+DDᵀ)C⁻¹D. It equals D+DDᵀC⁻¹D = D(I+DᵀC⁻¹D). Multiply by the relevant inverses on the left and the right.');
  {
    const a=[[1,0,2,1,4],[4,1,0,3,-1],[0,-3,4,2,-2]], b=[[3,0],[2,1],[4,-1],[0,3],[2,5]];
    const a11=a.slice(0,2).map(r=>r.slice(0,3)), a12=a.slice(0,2).map(r=>r.slice(3)),
      a21=a.slice(2).map(r=>r.slice(0,3)), a22=a.slice(2).map(r=>r.slice(3)), b1=b.slice(0,3),b2=b.slice(3);
    const terms=[M.multiply(a11,b1),M.multiply(a12,b2),M.multiply(a21,b1),M.multiply(a22,b2)];
    add(25,'Multiply using blocks, then check directly',matrix(M.multiply(a,b)),
      'The A blocks have sizes 2×3, 2×2, 1×3, 1×2. B₁ is 3×2 and B₂ is 2×2. Both products for each block row have matching dimensions for addition.',
      'The two top products are '+matrix(terms[0])+' and '+matrix(terms[1])+'. Add them. The two bottom products are '+matrix(terms[2])+' and '+matrix(terms[3])+'. Add them.',
      ...a.flatMap((row,i)=>transpose(b).map((col,j)=>'Direct check, entry ('+(i+1)+','+(j+1)+'): '+row.map((v,k)=>'('+v+' × '+col[k]+')').join(' + ')+' = '+M.dot(row,col)+'.')));
  }
  add(26,'Solve the two block systems for the inverse','The four displayed formulas give the blocks of A⁻¹.',
    'From AB=I, the first block column gives A₁₁B₁₁+A₁₂B₂₁=I and A₂₁B₁₁+A₂₂B₂₁=0.',
    'Use the second equation to get B₂₁=−A₂₂⁻¹A₂₁B₁₁. Substitute into the first and invert the factor A₁₁−A₁₂A₂₂⁻¹A₂₁ to obtain B₁₁.',
    'From BA=I, B₁₁A₁₂+B₁₂A₂₂=0 gives B₁₂=−B₁₁A₁₂A₂₂⁻¹.',
    'For the second block column of AB=I, eliminate B₁₂ using A₁₁B₁₂+A₁₂B₂₂=0. The other row becomes (A₂₂−A₂₁A₁₁⁻¹A₁₂)B₂₂=I, giving the last formula.');
  add(27,'Set the lower-left block to zero','The inverse has blocks A₁₁⁻¹, −A₁₁⁻¹A₁₂A₂₂⁻¹, 0 and A₂₂⁻¹.',
    'Put A₂₁=0 in the four formulas from Exercise 26. Any product containing that block becomes zero.',
    'Only the top-right block retains a product of three nonzero factors. The two diagonal blocks are now the inverses of the original diagonal blocks.');
  add(28,'Connect row pivots to consistency','The system is consistent for every right-hand column.',
    'A contradiction requires a row whose coefficient entries are all zero and whose right-hand side is nonzero.',
    'With a pivot in every coefficient row there is no all-zero coefficient row, so that contradiction cannot occur.');
  add(29,'Count both pivot and free columns','The system is consistent and has infinitely many solutions, with two free parameters.',
    'Three pivot columns use three different rows. There are only three rows, so every row has a coefficient pivot and no contradiction is possible.',
    'Three of the five variable columns have pivots. The remaining two variables can be chosen freely.');

  set='1.10';
  add(1,'Balance the flow at each junction','Top → left: 40. Top → right: 10. Left → bottom: 10.',
    'The right junction sends out 60, but 50 already comes from the bottom. The missing 10 must arrive from the top.',
    'The top junction receives 50. It sends 10 right, leaving 40 to send left.',
    'The left junction receives 40 and sends 30 outside the network. The remaining 10 goes to the bottom.',
    'Check the bottom: 40 from outside plus 10 from the left equals the 50 going to the right.');
  add(2,'Balance the refinery flow','b: (x₁,x₂,x₃,x₄,x₅,x₆) = (150−s+t,175−s+t,50+s−t,s,200−t,t).\nc: (100,125,100,50,200,0).',
    'a: start at the upper-left and lower-left junctions: x₁+x₃=200 and x₁+25=x₂.',
    'At the upper and lower middle junctions write x₃+150=x₄+x₅ and x₂+x₄=x₆+175. At the outlet write x₅+x₆=200.',
    'b: name x₄=s and x₆=t. Use the outlet to find x₅=200−t. Work backward to find x₃=s+50−t, x₁=150−s+t, and x₂=175−s+t. The lower middle balance agrees.',
    'c: substitute s=50 and t=0. Every nonzero result is positive, so the arrows give the actual directions. No flow goes through branch x₆.');
  add(3,'Find the required traffic on A → B','b: (x₁,x₂,x₃,x₄) = (s−100,s−400,s−500,s).\nc: x₄ must exceed 500 vehicles per hour.',
    'a: at the upper left, x₂+300=x₃+400. At A, x₃+750=x₄+250.',
    'At the lower left, x₁+100=x₂+400. At B, x₄+200=x₁+300.',
    'b: choose x₄=s. Work from B to find x₁=s−100, then around the left junctions to get x₂=s−400 and x₃=s−500.',
    'c: x₃ is the first route to reach zero as s falls. For positive traffic on every road, s>500. If traffic is counted in whole vehicles per hour, the smallest rate strictly above 500 is 501.');
  add(4,'Test whether A → B can be closed','b: (s,500+t,800−s,700+t−s,t,s−50,t+50).\nc: No.',
    'a: balance the top three intersections: x₁+x₃=800, x₁+x₄=x₂+200, and x₂+100=x₅+600.',
    'Balance the bottom three: x₃+x₆=750, x₇+600=x₆+x₄, and x₅+450=x₇+400.',
    'b: set x₁=s and x₅=t. Use the top-right and bottom-right equations to get x₂=500+t and x₇=t+50. The others give x₃=800−s, x₆=s−50 and x₄=700+t−s. The bottom-center equation then holds automatically.',
    'c: setting s=0 forces x₆=−50. That would send 50 vehicles in the wrong direction on a one-way street.');
  function circuit(n,a,context) {
    const r=M.solve(a);
    add(n,'Use current balance and voltage drops','(I₁, I₂'+(r.point.length===6?', I₃, I₄, I₅, I₆':', I₃')+') = '+M.vector(r.point)+' A.',
      'A junction has the same total current entering and leaving. A resistor of R ohms has voltage drop RI along its current arrow. A source raises voltage from − to +.',
      ...context,...r.steps,'A negative result means the actual current travels opposite the arrow drawn in the exercise.');
  }
  circuit(5,[[1,1,-1,0],[2,-2,0,6],[0,2,4,8]],[
    'At the top junction, the right branch supplies the currents through the other two: I₃=I₁+I₂.',
    'The top-minus-bottom voltage is 2I₁−6 through the left branch, 2I₂ through the middle, and 8−4I₃ through the right.',
    'Equate the three expressions using the middle expression as the common value.']);
  circuit(6,[[1,-1,1,0],[0,6,4,1],[2,0,-4,2]],[
    'At the upper junction, I₁ and I₃ enter and I₂ leaves. Thus I₁+I₃=I₂.',
    'The top-minus-bottom voltage is 6I₂−1 on the left, −4I₃ in the middle, and 2−2I₁ on the right.',
    'Match the left and right expressions to the middle expression to get the other two equations.']);
  circuit(7,[
    [1,-1,0,-1,0,0,0],[0,0,-1,1,-1,0,0],[0,0,1,0,1,-1,0],
    [20,20,0,0,0,0,10],[0,1,-1,0,0,0,0],[0,-20,0,0,20,0,10]
  ],[
    'At the junctions write I₁=I₂+I₄, I₄=I₃+I₅, and I₆=I₃+I₅.',
    'The top rail has one voltage and the bottom rail has another. Their difference is 10−20I₁ on the left, 20I₂ and 20I₃ in the middle, and 20I₅−10 on the right.',
    'Equating these four expressions gives three more independent equations.']);
  circuit(8,[[1,-1,-1,0],[3,4,0,9],[0,4,-5,1]],[
    'The top branch flows right to left and the others left to right, so I₁=I₂+I₃.',
    'Going from the left junction to the right, the left-minus-right voltage is 5−3I₁ in the top branch, 4I₂−4 in the middle, and 5I₃−3 at the bottom.',
    'Set the top and bottom expressions equal to the middle one.']);
  add(16,'Fit a cubic to four points on the graph','p(x)=−x³/8+x²/2+2x.',
    'Read the clear grid points (0,0), (2,5), (4,8), and (6,3). Start with p(x)=ax³+bx²+cx+d. The origin gives d=0.',
    'Substitute the other three points, then divide the resulting equations by 2, 4 and 6. This gives 4a+2b+c=5/2, 16a+4b+c=2, and 36a+6b+c=1/2.',
    'Subtract successive equations to get 12a+2b=−1/2 and 20a+2b=−3/2. Their difference is 8a=−1, so a=−1/8.',
    'Substitute to find b=1/2 and c=2. Check p(2)=5, p(4)=8 and p(6)=3.');
  add(17,'Find and sketch a family of curves','p(x)=1+(1−t)x+tx². Use t≠0 for a true quadratic.',
    'Write p(x)=ax²+bx+c. Putting in x=0 gives c=1. Putting in x=1 gives a+b=1.',
    'Choose a=t freely and set b=1−t. Every such curve passes through (0,1) and (1,2).',
    'The four sketches below use t=−2, −1, 1 and 2. Negative t opens downward, and positive t opens upward.');
  solutions[set].at(-1).figure='quadratic-family';
  add(18,'Research an application of linear systems','Estimating temperatures in a metal plate.',
    'Imagine a thin plate with edges held at fixed temperatures. Put a grid over the plate. The edge temperatures are known, but each interior grid point has an unknown temperature.',
    'For a plate with no internal heat source, a simple grid model takes each inside temperature as the average of its four neighbors. Multiply by 4 to get one linear equation for that grid point.',
    'Collect all the equations and solve them together to estimate the temperature across the plate. For example, a point surrounded by 20, 20, 20 and 0 °C would be estimated at 15 °C.');
  solutions[set].at(-1).source={name:'Technical University of Denmark · The Poisson Problem',url:'https://www.imm.dtu.dk/~beda/DCAMM09/Labs/Poisson_problem.pdf'};
  add('TF','True or false','a F · b F · c T · d F · e F',
    'a: balance needs an assumption such as no storage and no uncounted source or sink. In a tank that is filling, more can enter than leaves.',
    'b: voltage falls along a resistor in the direction of its current. c: the current law balances incoming and outgoing currents at a junction.',
    'd: every element’s count must balance separately, not just the total atom count. e: two points with the same x and different y cannot both lie on the graph of a function.');
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
    add('T1','Interpolate the wind-tunnel data','p(x) ≈ '+polyText(r.point)+'\nAt 2,000 ft/s: approximately '+decimal(value*100,2)+' lb.',
      'Measure speed x in hundreds of feet per second, and force in hundreds of pounds. Then 2,000 ft/s means x=20.',
      'Write p(x)=c₀+c₁x+⋯+c₅x⁵. Each of the six observations gives one row [1,x,x²,x³,x⁴,x⁵ | force].',
      ...r.steps.slice(0,-2),'Read the coefficients from the right-hand column, starting with the constant term. Keep extra digits until the end.',
      'Substitute 20 into every power and add to get '+decimal(value,7)+' hundreds of pounds. Multiply by 100 to convert to pounds.');
  }
  {
    const points=Array.from({length:6},(_,i)=>[i/5,Math.exp((i/5)**2)]), r=interpolant(points);
    const area=r.point.reduce((total,n,i)=>total+n/(i+1),0);
    const simpson=Array.from({length:1001},(_,i)=>(i===0||i===1000?1:i%2===0?2:4)*Math.exp((i/1000)**2)).reduce((a,b)=>a+b,0)/3000;
    add('T2','Integrate a polynomial that approximates the curve','Interpolation gives '+decimal(area,9)+'. Direct numerical integration gives '+decimal(simpson,9)+'.',
      'Five equal subintervals give six sample points x=0,0.2,0.4,0.6,0.8,1. Evaluate e^(x²) at those points.',
      'For p(x)=c₀+c₁x+⋯+c₅x⁵, use one row [1,x,x²,x³,x⁴,x⁵ | e^(x²)] per point.',
      ...r.steps.slice(0,-2),'The resulting polynomial is approximately '+polyText(r.point)+'.',
      'From 0 to 1, the area under x^j is 1/(j+1). Multiply each coefficient by that number and add.',
      'For comparison, composite Simpson integration applied directly to e^(x²) with 1,000 subintervals gives '+decimal(simpson,9)+'. The difference is about '+decimal(Math.abs(area-simpson),9)+'.');
  }
  add('T3','Balance the thermite reaction','Fe₂O₃ + 2Al → Al₂O₃ + 2Fe.',
    'Use one Fe₂O₃ and one Al₂O₃ so there are three oxygen atoms on both sides.',
    'The reactant iron oxide contains two iron atoms, so put 2 before Fe. The product aluminum oxide contains two aluminum atoms, so put 2 before Al on the left. Check all three element counts.');
  circuit('T4',[[1,1,-1,0],[0,3,470,20],[2,0,470,12]],[
    'The upper and lower branches supply the middle branch, so I₁+I₂=I₃.',
    'The left-minus-right voltage is 20−3I₂ through the top, 470I₃ through the middle, and 12−2I₁ through the bottom.',
    'Set the top and bottom expressions equal to the middle voltage and rearrange.']);
})();
