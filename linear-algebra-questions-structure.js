(() => {
  'use strict';
  const sets={'1.5':{},'1.6':{},'1.7':{}};
  const mat=rows=>rows.map(row=>'[ '+row.join('   ')+' ]').join('\n');
  const named=(name,rows)=>name+' =\n'+mat(rows);
  const parts=values=>values.map((value,i)=>'('+String.fromCharCode(97+i)+') '+value).join('\n\n');
  const put=(set,n,text,extra={})=>sets[set][String(n)]={text,...extra};
  const p5=(n,text,extra)=>put('1.5',n,text,extra);
  const p6=(n,text,extra)=>put('1.6',n,text,extra);
  const p7=(n,text,extra)=>put('1.7',n,text,extra);
  const diag=entries=>entries.map((entry,i)=>entries.map((_,j)=>i===j?entry:0));

  const elementary='Determine whether the given matrix is elementary.';
  p5(1,elementary+'\n\n'+parts([
    mat([[1,0],[-5,1]]),mat([[-5,1],[1,0]]),mat([[1,1,0],[0,0,1],[0,0,0]]),mat([[2,0,0,2],[0,1,0,0],[0,0,1,0],[0,0,0,1]])
  ]));
  p5(2,elementary+'\n\n'+parts([
    mat([[1,0],[0,'√3']]),mat([[0,0,1],[0,1,0],[1,0,0]]),mat([[1,0,0],[0,1,9],[0,0,1]]),mat([[-1,0,0],[0,0,1],[0,1,0]])
  ]),{steps:[
    'An elementary matrix must come from the identity by exactly one reversible row operation. The identity has 1 on its main diagonal and 0 elsewhere.',
    '(a) In I₂, multiply row 2 by √3. This gives exactly the displayed matrix. The multiplier is nonzero, so this is an allowed elementary operation.',
    '(b) In I₃, interchange rows 1 and 3. Row 2 stays unchanged, and the result is the given matrix.',
    '(c) In I₃, replace row 2 by row 2 + 9 × row 3. Only the entry in row 2, column 3 changes, from 0 to 9.',
    '(d) Swapping rows 2 and 3 does not change the first row. Multiplying row 1 by −1 does not swap the other rows. Both changes are required, so one elementary operation cannot produce this matrix.'
  ]});
  const restore='Find a row operation and the corresponding elementary matrix that will restore the given elementary matrix to the identity matrix.';
  p5(3,restore+'\n\n'+parts([
    mat([[1,-3],[0,1]]),mat([[-7,0,0],[0,1,0],[0,0,1]]),mat([[1,0,0],[0,1,0],[-5,0,1]]),mat([[0,0,1,0],[0,1,0,0],[1,0,0,0],[0,0,0,1]])
  ]));
  p5(4,restore+'\n\n'+parts([
    mat([[1,0],[-3,1]]),mat([[1,0,0],[0,1,0],[0,0,3]]),mat([[0,0,0,1],[0,1,0,0],[0,0,1,0],[1,0,0,0]]),mat([[1,0,'−1/7',0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])
  ]));
  const firstA=[[-1,-2,5,-1],[3,-6,-6,-6]],secondA=[[2,-1,0,-4,-4],[1,-3,-1,5,3],[2,0,1,3,-1]],thirdA=[[1,4],[2,5],[3,6]];
  const apply='An elementary matrix E and a matrix A are given. Identify the row operation corresponding to E and verify that the product EA results from applying the row operation to A.';
  p5(5,apply+'\n\n'+parts([
    named('E',[[0,1],[1,0]])+'\n'+named('A',firstA),
    named('E',[[1,0,0],[0,1,0],[0,-3,1]])+'\n'+named('A',secondA),
    named('E',[[1,0,4],[0,1,0],[0,0,1]])+'\n'+named('A',thirdA)
  ]));
  p5(6,apply+'\n\n'+parts([
    named('E',[[-6,0],[0,1]])+'\n'+named('A',firstA),
    named('E',[[1,0,0],[-4,1,0],[0,0,1]])+'\n'+named('A',secondA),
    named('E',[[1,0,0],[0,5,0],[0,0,1]])+'\n'+named('A',thirdA)
  ]));
  const commonElementary='Use the following matrices and find an elementary matrix E that satisfies the stated equation.\n\n'+[
    named('A',[[3,4,1],[2,-7,-1],[8,1,5]]),named('B',[[8,1,5],[2,-7,-1],[3,4,1]]),
    named('C',[[3,4,1],[2,-7,-1],[2,-7,3]]),named('D',[[8,1,5],[-6,21,3],[3,4,1]]),named('F',[[8,1,5],[8,1,1],[3,4,1]])
  ].join('\n\n');
  p5(7,commonElementary+'\n\n'+parts(['EA = B','EB = A','EA = C','EC = A']));
  p5(8,commonElementary+'\n\n'+parts(['EB = D','ED = B','EB = F','EF = B']));
  const twoInverse='First use Theorem 1.4.5 and then use the inversion algorithm to find A⁻¹, if it exists.';
  const inverseRule='Theorem 1.4.5: for A = [a b; c d], the inverse exists exactly when ad − bc ≠ 0, and A⁻¹ = (1/(ad − bc))[d −b; −c a]. The inversion algorithm row-reduces [A | I] to [I | A⁻¹], when possible.';
  for(const [id,a]of [['9a',[[1,4],[2,7]]],['9b',[[2,-4],[-4,8]]],['10a',[[1,-5],[3,-16]]],['10b',[[6,4],[-3,-2]]]])p5(id,twoInverse+'\n\n('+id.at(-1)+') '+named('A',a),{reference:inverseRule});
  const invert='Use the inversion algorithm to find the inverse of the matrix (if the inverse exists).';
  p5(11,invert+'\n\n'+parts([mat([[1,2,3],[2,5,3],[1,0,8]]),mat([[-1,3,-4],[2,4,1],[-4,2,-9]])]));
  p5(12,invert+'\n\n'+parts([mat([['1/5','1/5','−2/5'],['1/5','1/5','1/10'],['1/5','−4/5','1/10']]),mat([['1/5','1/5','−2/5'],['2/5','−3/5','−3/10'],['1/5','−4/5','1/10']])]));
  [
    [[1,0,1],[0,1,1],[1,1,0]],
    [['√2','3√2',0],['−4√2','√2',0],[0,0,1]],
    [[2,6,6],[2,7,6],[2,7,7]],
    [[1,0,0,0],[1,3,0,0],[1,3,5,0],[1,3,5,7]],
    [[2,-4,0,0],[1,2,12,0],[0,0,2,0],[0,-1,-4,-5]],
    [[0,0,2,0],[1,0,0,1],[0,-1,3,0],[2,1,5,-3]]
  ].forEach((a,i)=>p5(i+13,invert+'\n\n'+mat(a)));
  const parameterInverse='Find the inverse of each of the following 4 × 4 matrices, where k₁, k₂, k₃, k₄, and k are all nonzero.';
  p5(19,parameterInverse+'\n\n'+parts([mat(diag(['k₁','k₂','k₃','k₄'])),mat([['k',1,0,0],[0,1,0,0],[0,0,'k',1],[0,0,0,1]])]),{answer:parts([
    mat(diag(['1/k₁','1/k₂','1/k₃','1/k₄'])),
    mat([['1/k','−1/k',0,0],[0,1,0,0],[0,0,'1/k','−1/k'],[0,0,0,1]])
  ]),steps:[
    'An inverse undoes a matrix’s action. Call the input x=(x₁,x₂,x₃,x₄) and the output y=Ax. Solve these output equations for x to discover the inverse.',
    '(a) A diagonal matrix gives y₁=k₁x₁, y₂=k₂x₂, y₃=k₃x₃ and y₄=k₄x₄. Since each kᵢ is nonzero, divide to obtain xᵢ=yᵢ/kᵢ. Therefore the inverse has reciprocals on its diagonal and zeros elsewhere.',
    '(b) The first two equations are y₁=kx₁+x₂ and y₂=x₂. Read x₂=y₂ from the second equation, then substitute in the first: x₁=(y₁−y₂)/k.',
    'The last two equations repeat the same pattern: y₃=kx₃+x₄ and y₄=x₄. Thus x₄=y₄ and x₃=(y₃−y₄)/k.',
    'Read each row of the inverse from the coefficients of y₁,y₂,y₃,y₄ in these formulas. For example x₁=(1/k)y₁−(1/k)y₂ gives the first row [1/k −1/k 0 0]. The full matrices are below.',
    'Check part (b) by substitution: k×((y₁−y₂)/k)+y₂=y₁, and similarly for coordinates 3 and 4. Both coordinate pairs are recovered, so the displayed matrix undoes A.'
  ]});
  p5(20,parameterInverse+'\n\n'+parts([mat([[0,0,0,'k₁'],[0,0,'k₂',0],[0,'k₃',0,0],['k₄',0,0,0]]),mat([['k',0,0,0],[1,'k',0,0],[0,1,'k',0],[0,0,1,'k']])]),{answer:parts([
    mat([[0,0,0,'1/k₄'],[0,0,'1/k₃',0],[0,'1/k₂',0,0],['1/k₁',0,0,0]]),
    mat([['1/k',0,0,0],['−1/k²','1/k',0,0],['1/k³','−1/k²','1/k',0],['−1/k⁴','1/k³','−1/k²','1/k']])
  ]),steps:[
    'To find an inverse, write y=Ax and solve for the original coordinates x. Every division below is allowed because all the given k-values are nonzero.',
    '(a) The equations are y₁=k₁x₄, y₂=k₂x₃, y₃=k₃x₂, y₄=k₄x₁. Therefore x₁=y₄/k₄, x₂=y₃/k₃, x₃=y₂/k₂ and x₄=y₁/k₁. This explains both the reversed order and the reciprocals in the displayed inverse.',
    '(b) Start at the top: y₁=kx₁ gives x₁=y₁/k. The next row is y₂=x₁+kx₂, so x₂=(y₂−x₁)/k=−y₁/k²+y₂/k.',
    'The third row gives x₃=(y₃−x₂)/k. Substitute the expression just found: x₃=y₁/k³−y₂/k²+y₃/k. Each substitution reverses the preceding signs and adds one more factor k in the denominators.',
    'The fourth row gives x₄=(y₄−x₃)/k=−y₁/k⁴+y₂/k³−y₃/k²+y₄/k. Read the coefficients of the four y-values into the four rows of the inverse.',
    'Check the cancellation in row 3: x₂+kx₃=(−y₁/k²+y₂/k)+(y₁/k²−y₂/k+y₃)=y₃. The other rows cancel in the same way, verifying the inverse.'
  ]});
  const cValues='Find all values of c, if any, for which the given matrix is invertible.';
  p5(21,cValues+'\n\n'+mat([['c','c','c'],[1,'c','c'],[1,1,'c']]),{steps:[
    'A matrix is invertible when its action can be undone. Reversible row operations preserve this property, so simplify the matrix without dividing by any expression involving c.',
    'Replace row 1 by row 1−row 2. Entry by entry this gives [c−1 0 0]. Rows 2 and 3 are still unchanged at this point.',
    'Now replace row 2 by row 2−row 3, giving [0 c−1 0]. The matrix is now [c−1 0 0; 0 c−1 0; 1 1 c].',
    'This is lower triangular: every entry above the main diagonal is zero. A triangular square matrix is invertible exactly when every diagonal entry is nonzero. Here the diagonal is c−1,c−1,c.',
    'Require c−1≠0 and c≠0, giving c≠1 and c≠0. For every other real c the transformed matrix is invertible, so the original is too. At c=1 or c=0 a diagonal entry vanishes and no inverse exists.'
  ]});
  p5(22,cValues+'\n\n'+mat([['c',1,0],[1,'c',1],[0,1,'c']]));
  [ [[-3,1],[2,2]], [[1,0],[-5,2]], [[1,0,-2],[0,4,3],[0,0,1]], [[1,1,0],[1,1,1],[0,1,1]] ].forEach((a,i)=>p5(i+23,'Express the matrix and its inverse as products of elementary matrices.\n\n'+mat(a)));
  const rowEq='Show that the matrices A and B are row equivalent by finding a sequence of elementary row operations that produces B from A, and then use that result to find a matrix C such that CA = B.';
  p5(27,rowEq+'\n\n'+named('A',[[1,2,3],[1,4,1],[2,1,9]])+'\n\n'+named('B',[[1,0,5],[0,2,-2],[1,1,4]]));
  p5(28,rowEq+'\n\n'+named('A',[[2,1,0],[-1,1,0],[3,0,-1]])+'\n\n'+named('B',[[6,9,4],[-5,-1,0],[-1,-2,-1]]));
  p5(29,'Show that if\n'+named('A',[[1,0,0],[0,1,0],['a','b','c']])+'\nis an elementary matrix, then at least one entry in the third row must be zero.',{steps:[
    'An elementary matrix is obtained from the identity by one row operation: swap two rows, multiply one row by a nonzero number, or add a multiple of one row to another. Start with identity rows [1 0 0], [0 1 0], [0 0 1].',
    'The first two rows in A remain exactly as in the identity. A row swap would change at least one of them, so a swap cannot produce the displayed A.',
    'If the operation scales row 3 by a nonzero number t, the last row becomes [0 0 t]. Both a and b are zero. An operation leaving the whole identity unchanged also leaves zeros in that row.',
    'If it adds t times row 1 to row 3, the last row becomes [t 0 1], so b=0. If it adds t times row 2 to row 3, the last row becomes [0 t 1], so a=0.',
    'These exhaust the allowed ways one operation can change only row 3. Each produces at least one zero in that row, which proves the claim.'
  ]});
  p5(30,'Show that\n'+named('A',[[0,'a',0,0,0],['b',0,'c',0,0],[0,'d',0,'e',0],[0,0,'f',0,'g'],[0,0,0,'h',0]])+'\nis not invertible for any values of the entries.',{steps:[
    'To show that A has no inverse, it is enough to find a nonzero vector x with Ax = 0. An invertible matrix could only send x = 0 to zero.',
    'Try x = (u,0,v,0,w). Multiplication gives Ax = (0, bu + cv, 0, fv + gw, 0). The entries a,d,e,h have disappeared because they multiply zero coordinates.',
    'We need bu + cv = 0 and fv + gw = 0. These are two homogeneous equations in the three unknowns u,v,w. At most two variables can have pivots, so at least one variable is free.',
    'Choose a nonzero free parameter and solve for the pivot variables. This produces a nonzero x with Ax = 0, whatever values a through h have. Therefore A is never invertible.'
  ]});
  p5(31,'Prove that if A and B are m × n matrices, then A and B are row equivalent if and only if A and B have the same reduced row echelon form.',{steps:[
    '“If and only if” asks for two directions. Row equivalent means that a finite sequence of reversible elementary row operations changes one matrix into the other.',
    'First assume A is row equivalent to B. Perform the A-to-B operations, then reduce B. This gives a reduced row echelon form of A as well. The reduced row echelon form is unique, so both matrices have the same one.',
    'Conversely, suppose both reduce to the same matrix R. Reduce A to R. Then reverse, from last to first, the operations that reduced B to R.',
    'This gives a valid sequence A → R → B. Thus A and B are row equivalent. Both directions are proved.'
  ]});
  p5(32,'Prove that if A is an invertible matrix and B is row equivalent to A, then B is also invertible.',{steps:[
    'Row equivalence means B = Eₖ⋯E₂E₁A, where each E is the elementary matrix for one row operation.',
    'Every elementary operation can be undone: undo a swap with the same swap, undo a nonzero scale with its reciprocal, and undo adding a multiple by subtracting it. Therefore each E has an inverse.',
    'The given matrix A also has an inverse. To undo B, undo all its factors in reverse order: B⁻¹ = A⁻¹E₁⁻¹E₂⁻¹⋯Eₖ⁻¹.',
    'Multiplying B by this proposed inverse cancels adjacent inverse pairs and leaves I. The product in the other order also gives I, so B is invertible.'
  ]});
  p5(33,'Prove that if B is obtained from A by performing a sequence of elementary row operations, then there is a second sequence of elementary row operations, which when applied to B recovers A.',{steps:[
    'List the operations in the order they were used: O₁, O₂, …, Oₖ. Starting at A, operation O₁ acts first and Oₖ acts last.',
    'Every operation has an allowed reverse operation. Swap the same two rows again; divide by a nonzero scaling factor; or subtract the multiple that was added.',
    'Start from B and undo Oₖ first. This recovers the matrix just before the last change. Undo Oₖ₋₁ next, then keep going backward.',
    'After undoing O₁, every change has been reversed and the matrix is A again. This constructs the required second sequence.'
  ]});
  p5('TF','In parts (a)–(g) determine whether the statement is true or false, and justify your answer.\n\n'+parts([
    'The product of two elementary matrices of the same size must be an elementary matrix.',
    'Every elementary matrix is invertible.',
    'If A and B are row equivalent, and if B and C are row equivalent, then A and C are row equivalent.',
    'If A is an n × n matrix that is not invertible, then the linear system Ax = 0 has infinitely many solutions.',
    'If A is an n × n matrix that is not invertible, then the matrix obtained by interchanging two rows of A cannot be invertible.',
    'If A is invertible and a multiple of the first row of A is added to the second row, then the resulting matrix is invertible.',
    'An expression of an invertible matrix A as a product of elementary matrices is unique.'
  ]),{steps:[
    '(a) False. E₁ = diag(2,1) scales row 1 and E₂ = diag(1,3) scales row 2. Each is elementary, but E₁E₂ = diag(2,3) changes both rows and cannot result from one elementary operation on I₂.',
    '(b) True. A row operation can always be undone by another allowed row operation. Their elementary matrices multiply to I, giving the inverse.',
    '(c) True. First use the operations changing A into B, then use those changing B into C. Their combined list changes A into C.',
    '(d) True. The homogeneous system always has x = 0. A singular square coefficient matrix has fewer pivots than variables, so at least one free parameter can take infinitely many real values.',
    '(e) True. If the swapped matrix had an inverse, swapping back would also preserve invertibility, making A invertible. That contradicts the hypothesis.',
    '(f) True. The row change is reversible: subtract the same multiple to undo it. Multiplication by an invertible elementary matrix preserves invertibility.',
    '(g) False. Insert an elementary matrix E followed by E⁻¹ into a product. Since EE⁻¹ = I, the product stays A, but its factorization is different.'
  ]});
  const blockFormula='If S = D − CA⁻¹B, the stated inverse is the block matrix\n[ A⁻¹ + A⁻¹BS⁻¹CA⁻¹    −A⁻¹BS⁻¹ ]\n[ −S⁻¹CA⁻¹                  S⁻¹      ],\nprovided A⁻¹ and S⁻¹ exist.';
  p5('T1','It can be proved that if the partitioned matrix\n[ A   B ]\n[ C   D ]\nis invertible, then its inverse is\n[ A⁻¹ + A⁻¹B(D − CA⁻¹B)⁻¹CA⁻¹    −A⁻¹B(D − CA⁻¹B)⁻¹ ]\n[ −(D − CA⁻¹B)⁻¹CA⁻¹                  (D − CA⁻¹B)⁻¹       ]\nprovided that all of the inverses on the right side exist. Use this result to find the inverse of the matrix\n'+mat([[1,2,1,0],[0,-1,0,1],[0,0,2,0],[0,0,3,3]]));

  const byInverse='Solve the system by inverting the coefficient matrix and using Theorem 1.6.2.';
  const theorem162='Theorem 1.6.2: if A is an invertible n × n matrix, the system Ax = b has the unique solution x = A⁻¹b.';
  const systems6=[
    'x₁ + x₂ = 2\n5x₁ + 6x₂ = 9',
    '4x₁ − 3x₂ = −3\n2x₁ − 5x₂ = 9',
    'x₁ + 3x₂ + x₃ = 4\n2x₁ + 2x₂ + x₃ = −1\n2x₁ + 3x₂ + x₃ = 3',
    '5x₁ + 3x₂ + 2x₃ = 4\n3x₁ + 3x₂ + 2x₃ = 2\nx₂ + x₃ = 5',
    'x + y + z = 5\nx + y − 4z = 10\n−4x + y + z = 0',
    '−x − 2y − 3z = 0\nw + x + 4y + 4z = 7\nw + 3x + 7y + 9z = 4\n−w − 2x − 4y − 6z = 6',
    '3x₁ + 5x₂ = b₁\nx₁ + 2x₂ = b₂',
    'x₁ + 2x₂ + 3x₃ = b₁\n2x₁ + 5x₂ + 5x₃ = b₂\n3x₁ + 5x₂ + 8x₃ = b₃'
  ];
  systems6.forEach((system,i)=>p6(i+1,byInverse+'\n\n'+system,{reference:theorem162}));
  Object.assign(sets['1.6']['2'],{answer:'x₁ = −3, x₂ = −3.',steps:[
    'Write the equations as Ax=b, with A=[4 −3; 2 −5], x=(x₁,x₂), and b=(−3,9). Keep the minus sign on the first right-hand side.',
    'Find A⁻¹ using the 2 × 2 formula. First compute ad−bc=4×(−5)−(−3)×2=−20+6=−14. This is nonzero, so the inverse exists.',
    'Swap the diagonal entries of A and change the signs of the other two entries. Divide the resulting matrix by −14: A⁻¹=(1/−14)[−5 3; −2 4]=[5/14 −3/14; 1/7 −2/7].',
    'Multiply Ax=b on the left by A⁻¹. Since A⁻¹A=I, this isolates x=A⁻¹b. The first coordinate is x₁=(5/14)×(−3)−(3/14)×9=(−15−27)/14=−3.',
    'The second coordinate is x₂=(1/7)×(−3)−(2/7)×9=(−3−18)/7=−3.',
    'Check both original equations: 4×(−3)−3×(−3)=−12+9=−3, and 2×(−3)−5×(−3)=−6+15=9. Both right-hand sides agree.'
  ]});
  const together='Solve the linear systems. Using the given values for the b’s solve the systems together by reducing an appropriate augmented matrix to reduced row echelon form.';
  p6(9,together+'\n\nx₁ − 5x₂ = b₁\n3x₁ + 2x₂ = b₂\n(i) b₁ = 1, b₂ = 4\n(ii) b₁ = −2, b₂ = 5');
  p6(10,together+'\n\n−x₁ + 4x₂ + x₃ = b₁\nx₁ + 9x₂ − 2x₃ = b₂\n6x₁ + 4x₂ − 8x₃ = b₃\n(i) b₁ = 0, b₂ = 1, b₃ = 0\n(ii) b₁ = −3, b₂ = 4, b₃ = −5');
  p6(11,together+'\n\n4x₁ − 7x₂ = b₁\nx₁ + 2x₂ = b₂\n(i) b₁ = 0, b₂ = 1\n(ii) b₁ = −4, b₂ = 6\n(iii) b₁ = −1, b₂ = 3\n(iv) b₁ = −5, b₂ = 1');
  p6(12,together+'\n\nx₁ + 3x₂ + 5x₃ = b₁\n−x₁ − 2x₂ = b₂\n2x₁ + 5x₂ + 4x₃ = b₃\n(i) b₁ = 1, b₂ = 0, b₃ = −1\n(ii) b₁ = 0, b₂ = 1, b₃ = 1\n(iii) b₁ = −1, b₂ = −1, b₃ = 0');
  const consistency='Determine conditions on the bᵢ’s, if any, in order to guarantee that the linear system is consistent.';
  [
    'x₁ + 3x₂ = b₁\n−2x₁ + x₂ = b₂',
    '6x₁ − 4x₂ = b₁\n3x₁ − 2x₂ = b₂',
    'x₁ − 2x₂ + 5x₃ = b₁\n4x₁ − 5x₂ + 8x₃ = b₂\n−3x₁ + 3x₂ − 3x₃ = b₃',
    'x₁ − 2x₂ − x₃ = b₁\n−4x₁ + 5x₂ + 2x₃ = b₂\n−4x₁ + 7x₂ + 4x₃ = b₃',
    'x₁ − x₂ + 3x₃ + 2x₄ = b₁\n−2x₁ + x₂ + 5x₃ + x₄ = b₂\n−3x₁ + 2x₂ + 2x₃ − x₄ = b₃\n4x₁ − 3x₂ + x₃ + 3x₄ = b₄'
  ].forEach((system,i)=>p6(i+13,consistency+'\n\n'+system));
  sets['1.6']['13'].steps=[
    'Consistent means that at least one pair (x₁,x₂) satisfies both equations. We look for any restriction the right-hand sides must obey.',
    'Add twice equation 1 to equation 2. On the left, −2x₁+2x₁ cancels and x₂+6x₂=7x₂. The new equation is 7x₂=b₂+2b₁.',
    'Divide by 7: x₂=(b₂+2b₁)/7. Substitute into equation 1 to obtain x₁=b₁−3x₂=(b₁−3b₂)/7.',
    'These formulas are defined for every real b₁ and b₂, because we only divide by the nonzero number 7. Thus there are no restrictions: every right-hand side gives a solution.'
  ];
  sets['1.6']['14'].steps=[
    'Compare the left sides: 6x₁−4x₂ is exactly twice 3x₁−2x₂. Two equations describing the same left-hand quantity must also have matching right-hand quantities.',
    'Subtract twice equation 2 from equation 1. All variable terms cancel, leaving 0=b₁−2b₂. Therefore consistency requires b₁=2b₂.',
    'If that condition fails, the equations contradict each other. If it holds, the first equation adds no new requirement.',
    'To check sufficiency, choose any real t for x₂. Equation 2 then gives x₁=(b₂+2t)/3. This satisfies both equations whenever b₁=2b₂, so the stated condition is both necessary and sufficient.'
  ];
  sets['1.6']['15'].steps=[
    'Subtract the left side of equation 2 from that of equation 1: (x₁−2x₂+5x₃)−(4x₁−5x₂+8x₃)=−3x₁+3x₂−3x₃. This is exactly the third left side.',
    'The right sides must follow the same subtraction. Thus equation 3 can agree with the first two only when b₃=b₁−b₂.',
    'We also need to check that the first two equations can always be solved. Subtract four times equation 1 from equation 2 to get 3x₂−12x₃=b₂−4b₁.',
    'Choose x₃=t freely. Then x₂=4t+(b₂−4b₁)/3, and equation 1 gives x₁=b₁+2x₂−5t. These choices work for every b₁,b₂.',
    'With b₃=b₁−b₂, the third equation is automatically satisfied. Without that equality it is contradictory. Therefore this is the only required condition.'
  ];
  sets['1.6']['16'].steps=[
    'We check whether eliminating the variables creates a contradiction such as 0=1. Add four times equation 1 to equation 2: −3x₂−2x₃=b₂+4b₁.',
    'Subtract the original equation 2 from the original equation 3: 2x₂+2x₃=b₃−b₂. Keep both of these new equations.',
    'Multiply the first new equation by 2 and the second by 3, then add. The x₂ terms cancel, leaving 2x₃=8b₁−b₂+3b₃.',
    'Divide by 2 to find x₃. Then the second new equation gives x₂=(b₃−b₂)/2−x₃. Finally equation 1 gives x₁=b₁+2x₂+x₃.',
    'All divisions used nonzero fixed numbers. These steps therefore produce a solution for every b₁,b₂,b₃. There are no restrictions on the right-hand sides.'
  ];
  sets['1.6']['17'].steps=[
    'Compare entire left sides, keeping every coefficient. Equation 3 has the left side of equation 2 minus that of equation 1; equation 4 has twice the left side of equation 1 minus that of equation 2.',
    'Consequently their right sides must satisfy b₃=b₂−b₁ and b₄=2b₁−b₂. If either equality fails, that equation contradicts the first two.',
    'To see that there are no additional restrictions, add twice equation 1 to equation 2. This gives −x₂+11x₃+5x₄=b₂+2b₁.',
    'Choose x₃=s and x₄=t freely. Then x₂=11s+5t−b₂−2b₁, and equation 1 gives x₁=b₁+x₂−3s−2t. Thus the first two equations can always be solved.',
    'When the two conditions on b₃,b₄ hold, these same values also satisfy equations 3 and 4. The conditions are therefore necessary and sufficient.'
  ];
  p6(18,'Consider the matrices\n'+named('A',[[2,1,2],[2,2,-2],[3,1,1]])+'\nand\n'+named('x',[['x₁'],['x₂'],['x₃']])+'\n\n(a) Show that the equation Ax = x can be rewritten as (A − I)x = 0 and use this result to solve Ax = x for x.\n(b) Solve Ax = 4x.');
  p6(19,'Solve the matrix equation for X.\n\n'+mat([[1,-1,1],[2,3,0],[0,2,-1]])+'\n× X =\n'+mat([[2,-1,5,7,8],[4,0,-3,0,1],[3,5,-7,2,1]]));
  p6(20,'Solve the matrix equation for X.\n\n'+mat([[-2,0,1],[0,-1,-1],[1,1,-4]])+'\n× X =\n'+mat([[4,3,2,1],[6,7,8,9],[1,3,7,9]]));
  p6(21,'Let Ax = 0 be a homogeneous system of n linear equations in n unknowns that has only the trivial solution. Prove that if k is any positive integer, then the system Aᵏx = 0 also has only the trivial solution.',{steps:[
    'The trivial solution means x = 0. The assumption says that whenever Ay = 0, the vector y must be zero; A cannot send a nonzero vector to zero.',
    'Suppose Aᵏx = 0. For k ≥ 1, group the product as A(Aᵏ⁻¹x) = 0. The assumption forces Aᵏ⁻¹x = 0.',
    'Repeat the same argument, removing one factor A at a time. Eventually Ax = 0 forces x = 0. For k = 1 this is already the given assumption.',
    'Finally, x = 0 does satisfy Aᵏx = 0. It is therefore the only solution, as required.'
  ]});
  p6(22,'Let Ax = 0 be a homogeneous system of n linear equations in n unknowns, and let Q be an invertible n × n matrix. Prove that Ax = 0 has only the trivial solution if and only if (QA)x = 0 has only the trivial solution.',{steps:[
    'We will show that the two systems have exactly the same solutions. Multiplying by an invertible matrix should not lose information, because multiplication by its inverse undoes the change.',
    'Take any x satisfying Ax = 0. Multiply by Q on the left: Q(Ax) = Q0 = 0, so (QA)x = 0.',
    'Now take any x satisfying (QA)x = 0. Multiply by Q⁻¹: Q⁻¹QAx = Q⁻¹0. Since Q⁻¹Q = I, this becomes Ax = 0.',
    'Each solution of either system is a solution of the other. Hence one has only x = 0 exactly when the other does.'
  ]});
  p6(23,'Let Ax = b be any consistent system of linear equations, and let x₁ be a fixed solution. Prove that every solution to the system can be written in the form x = x₁ + x₀, where x₀ is a solution to Ax = 0. Prove also that every matrix of this form is a solution.',{steps:[
    '“Consistent” means at least one solution exists. We are given one such vector x₁, so Ax₁ = b. Here the subscript in x₁ labels a whole solution vector, not one coordinate.',
    'Take any other solution x. Subtract the known solution and call the difference x₀ = x − x₁.',
    'Use distribution: Ax₀ = A(x − x₁) = Ax − Ax₁ = b − b = 0. Thus x₀ solves the homogeneous system, and rearranging its definition gives x = x₁ + x₀.',
    'For the reverse direction, choose any x₀ with Ax₀ = 0. Then A(x₁ + x₀) = Ax₁ + Ax₀ = b + 0 = b.',
    'So every original solution has the stated form, and every vector of that form is an original solution. Adding a homogeneous solution moves between valid answers.'
  ]});
  p6(24,'Use part (a) of Theorem 1.6.3 to prove part (b).',{reference:'Theorem 1.6.3: let A be square. (a) If B is square and BA = I, then B = A⁻¹. (b) If B is square and AB = I, then B = A⁻¹.',steps:[
    'Assume AB = I, which is the hypothesis of part (b). The goal is to prove that B is the inverse of A.',
    'Apply part (a) with the names exchanged: view B as the matrix and A as its left inverse. Because AB = I, part (a) says A = B⁻¹.',
    'The equation A = B⁻¹ means that both AB = I and BA = I hold. Therefore B undoes A from either side.',
    'By the definition of inverse, B = A⁻¹. This proves part (b) using part (a).'
  ]});
  p6('TF','In parts (a)–(g) determine whether the statement is true or false, and justify your answer.\n\n'+parts([
    'It is impossible for a system of linear equations to have exactly two solutions.',
    'If A is a square matrix, and if the linear system Ax = b has a unique solution, then the linear system Ax = c also must have a unique solution.',
    'If A and B are n × n matrices such that AB = Iₙ, then BA = Iₙ.',
    'If A and B are row equivalent matrices, then the linear systems Ax = 0 and Bx = 0 have the same solution set.',
    'Let A be an n × n matrix and S is an n × n invertible matrix. If x is a solution to the system (S⁻¹AS)x = b, then Sx is a solution to the system Ay = Sb.',
    'Let A be an n × n matrix. The linear system Ax = 4x has a unique solution if and only if A − 4I is an invertible matrix.',
    'Let A and B be n × n matrices. If A or B (or both) are not invertible, then neither is AB.'
  ]),{steps:[
    '(a) True. If u and v are distinct solutions, every u + t(v − u) also works: its image is b + t(b − b) = b. Different real t give infinitely many solutions, so there cannot be exactly two.',
    '(b) True. A unique solution means the square coefficient matrix has a pivot in every variable column. Therefore A is invertible, and the new right side c has exactly one solution A⁻¹c.',
    '(c) True. For square matrices, Theorem 1.6.3 makes a one-sided inverse a two-sided inverse. Thus B = A⁻¹ and BA = Iₙ.',
    '(d) True. Elementary row operations preserve equations and can be reversed. Applying the same operations to the zero right-hand side keeps it zero, so the homogeneous solution sets agree.',
    '(e) True. Multiply S⁻¹ASx = b on the left by S. The inverse pair cancels, giving A(Sx) = Sb. Thus y = Sx satisfies the claimed equation.',
    '(f) True. Rewrite the equation as (A − 4I)x = 0. It always has x = 0. That solution is unique exactly when the square coefficient matrix A − 4I is invertible.',
    '(g) True. If AB were invertible, Bx = 0 would imply ABx = 0 and hence x = 0, making B invertible. Then A = (AB)B⁻¹ would also be invertible. Thus a noninvertible factor prevents an invertible product.'
  ]});
  p6('T1','Colors in print media, on computer monitors, and on television screens are implemented using what are called “color models.” For example, in the RGB model, colors are created by mixing percentages of red (R), green (G), and blue (B), and in the YIQ model (used in TV broadcasting), colors are created by mixing percentages of luminescence (Y) with percentages of a chrominance factor (I) and a chrominance factor (Q). The conversion from the RGB model to the YIQ model is accomplished by the matrix equation\n'+mat([['Y'],['I'],['Q']])+'\n=\n'+mat([['.299','.587','.114'],['.596','−.275','−.321'],['.212','−.523','.311']])+'\n×\n'+mat([['R'],['G'],['B']])+'\n\nWhat matrix would you use to convert the YIQ model to the RGB model?');
  p6('T2','Let\n'+named('A',[[1,-2,2],[4,5,1],[0,3,-1]])+'\n\n'+named('B₁',[[0],[1],[7]])+'\n\n'+named('B₂',[[11],[5],[3]])+'\n\n'+named('B₃',[[1],[-4],[2]])+'\n\nSolve the linear systems Ax = B₁, Ax = B₂, Ax = B₃ using the method of Example 2.',{reference:'Example 2 solves systems sharing A by reducing the single augmented matrix [A | B₁ | B₂ | B₃]. Every row operation is applied to all right-hand-side columns. Read each solution from its own column after reduction.'});

  const classify='Classify the matrix as upper triangular, lower triangular, or diagonal, and decide by inspection whether the matrix is invertible. Recall that a diagonal matrix is both upper and lower triangular, so there may be more than one answer in some parts.';
  p7(1,classify+'\n\n'+parts([mat([[2,1],[0,3]]),mat([[0,0],[4,0]]),mat(diag([-1,2,'1/5'])),mat([[3,-2,7],[0,0,3],[0,0,8]])]),{steps:[
    'The main diagonal runs from top left to bottom right. Upper triangular means all entries below it are zero; lower triangular means all entries above it are zero. Diagonal means both conditions hold.',
    '(a) The entry below the diagonal is 0, so the matrix is upper triangular. Its diagonal entries 2 and 3 are nonzero, so it is invertible.',
    '(b) The entry above the diagonal is 0, so it is lower triangular. Its two diagonal entries are 0, so it is not invertible.',
    '(c) All entries off the diagonal are zero. It is diagonal, upper triangular and lower triangular. The diagonal is (−1,2,1/5); none is zero, so the matrix is invertible.',
    '(d) All entries below the diagonal are zero, so it is upper triangular. The diagonal (3,0,8) contains zero, so it is not invertible. A zero anywhere else would not be enough to draw this conclusion; the diagonal is what matters.'
  ]});
  p7(2,classify+'\n\n'+parts([mat([[4,0],[1,7]]),mat([[0,-3],[0,0]]),mat(diag([4,'3/5',-2])),mat([[3,0,0],[3,1,0],[7,0,0]])]),{steps:[
    'Look above and below the main diagonal separately. Then use the triangular-matrix rule: an inverse exists exactly when every diagonal entry is nonzero.',
    '(a) The upper-right entry is 0, so this is lower triangular. Both diagonal entries 4 and 7 are nonzero; it is invertible.',
    '(b) The lower-left entry is 0, so this is upper triangular. Its diagonal is (0,0), so it is singular, meaning it has no inverse.',
    '(c) Only diagonal entries can be nonzero, so it is diagonal and both upper and lower triangular. The entries 4,3/5,−2 are nonzero, so it is invertible.',
    '(d) Entries above the diagonal are zero, so this is lower triangular. The last diagonal entry is 0, so it is singular.'
  ]});
  const productText=factors=>'Find the product by inspection.\n\n'+factors.map(mat).join('\n×\n');
  p7(3,productText([diag([3,-1,2]),[[2,1],[-4,1],[2,5]]]));
  p7(4,productText([[[1,2,-5],[-3,-1,0]],diag([-4,3,2])]));
  p7(5,productText([diag([5,2,-3]),[[-3,2,0,4,-4],[1,-5,3,0,3],[-6,2,2,2,2]]]));
  p7(6,productText([diag([2,-1,4]),[[4,-1,3],[1,2,0],[-5,1,-2]],diag([-3,5,2])]));
  [[1,-2],[-6,3,5],['1/2','1/3','1/4'],[-2,-4,-3,2]].forEach((d,i)=>p7(i+7,'Find A², A⁻², and A⁻ᵏ (where k is any integer) by inspection.\n\n'+named('A',diag(d)),{steps:[
    'A diagonal matrix acts separately on each coordinate. When it multiplies another diagonal matrix, each diagonal entry multiplies only the entry in the same position. Every off-diagonal entry remains zero.',
    'For A², square each diagonal entry: '+d.map(v=>'('+v+')²').join(', ')+'. In particular, squaring a negative number gives a positive number because its two minus signs cancel.',
    'Every given diagonal entry is nonzero, so the inverse exists. To find A⁻¹, replace each diagonal entry d by 1/d; that reciprocal undoes multiplication by d.',
    'Now square the inverse to obtain A⁻²: its diagonal entries are '+d.map(v=>'1/('+v+')²').join(', ')+'. For a fraction, taking its reciprocal swaps numerator and denominator before squaring.',
    'For any integer k, the same rule gives A⁻ᵏ=diag('+d.map(v=>'1/('+v+')ᵏ').join(', ')+'). If k=0 this gives I; if k is negative the expression is an ordinary positive power of A. Keep the parentheses around negative bases.'
  ]}));
  p7(11,'Compute the product by inspection.\n\n'+[diag([1,0,3]),diag([2,5,0]),diag([0,2,1])].map(mat).join('\n×\n'));
  p7(12,'Compute the product by inspection.\n\n'+[diag([-1,2,4]),diag([3,5,7]),diag([5,-2,3])].map(mat).join('\n×\n'));
  p7(13,'Compute the indicated quantity.\n\n'+mat([[1,0],[0,-1]])+'\nraised to the power 39.',{steps:[
    'The matrix is diagonal. When diagonal matrices multiply, each diagonal entry multiplies only the entry in its own position, so raise 1 and −1 to the 39th power separately.',
    'The first diagonal entry is 1³⁹ = 1, because every factor equals 1.',
    'For (−1)³⁹, group 38 factors into 19 pairs. Every pair gives (−1)(−1) = 1. One unpaired −1 remains, so the result is −1.',
    'Keep zeros off the diagonal. The resulting matrix is [1 0; 0 −1]. As a check, two applications of this sign-flip matrix undo each other, so an odd number of applications leaves one sign flip.'
  ]});
  p7(14,'Compute the indicated quantity.\n\n'+mat([[1,0],[0,-1]])+'\nraised to the power 1000.',{steps:[
    'For a diagonal matrix, take the power of each diagonal entry separately and leave all off-diagonal entries zero.',
    'Compute 1¹⁰⁰⁰ = 1. In (−1)¹⁰⁰⁰, group the 1000 negative factors into 500 pairs.',
    'Each pair is (−1)(−1) = 1, so (−1)¹⁰⁰⁰ = 1. Therefore both diagonal entries become 1.',
    'The answer is I₂ = [1 0; 0 1]. This makes sense: reversing the sign of the second coordinate an even number of times restores the original coordinate.'
  ]});
  const symbolicProduct='Use what you have learned in this section about multiplying by diagonal matrices to compute the product by inspection.';
  p7(15,symbolicProduct+'\n\n'+parts([
    mat(diag(['a','b','c']))+'\n×\n'+mat([['u','v'],['w','x'],['y','z']]),
    mat([['r','s','t'],['u','v','w'],['x','y','z']])+'\n×\n'+mat(diag(['a','b','c']))
  ]));
  p7(16,symbolicProduct+'\n\n'+parts([
    mat([['u','v'],['w','x'],['y','z']])+'\n×\n'+mat(diag(['a','b'])),
    mat(diag(['a','b','c']))+'\n×\n'+mat([['r','s','t'],['u','v','w'],['x','y','z']])
  ]));
  sets['1.7']['15'].steps=[
    'A diagonal factor on the left scales rows. A diagonal factor on the right scales columns. This follows from row-by-column multiplication: the diagonal factor has only one possible nonzero entry in each row or column.',
    '(a) Multiply row 1 by a: [u v] becomes [au av]. Multiply row 2 by b: [w x] becomes [bw bx]. Multiply row 3 by c: [y z] becomes [cy cz].',
    '(b) Here the diagonal factor is on the right. Multiply column 1 by a, column 2 by b, and column 3 by c. The resulting rows are [ra sb tc], [ua vb wc], [xa yb zc].',
    'Check the top-right entry in (b): row [r s t] times column [0 0 c] gives r×0+s×0+t×c=tc, confirming the column rule.'
  ];
  sets['1.7']['16'].steps=[
    'Locate the diagonal factor before multiplying: on the right it scales columns; on the left it scales rows.',
    '(a) The factor diag(a,b) is on the right. The first column (u,w,y) becomes (au,aw,ay); the second column (v,x,z) becomes (bv,bx,bz). Therefore the rows are [au bv], [aw bx], [ay bz].',
    '(b) The factor diag(a,b,c) is on the left. Multiply [r s t] by a, [u v w] by b, and [x y z] by c. The rows become [ar as at], [bu bv bw], [cx cy cz].',
    'Check dimensions: part (a) remains 3 × 2 and part (b) remains 3 × 3. Diagonal scaling changes entries but does not change the number of rows or columns.'
  ];
  const completeSym='Create a symmetric matrix by substituting appropriate numbers for the ×’s.';
  p7(17,completeSym+'\n\n'+parts([mat([[2,-1],['×',3]]),mat([[1,'×','×','×'],[3,1,'×','×'],[7,-8,0,'×'],[2,-3,9,0]])]),{steps:[
    'In a symmetric matrix, the entry in row i, column j equals the entry in row j, column i. These positions are mirror partners across the main diagonal.',
    '(a) The entry above the diagonal is −1. Put −1 in the missing position below it. The completed rows are [2 −1] and [−1 3].',
    '(b) Read the given entries below the diagonal and copy them to their partners above it: a₁₂ = 3, a₁₃ = 7, a₁₄ = 2, a₂₃ = −8, a₂₄ = −3, a₃₄ = 9.',
    'The completed rows are [1 3 7 2], [3 1 −8 −3], [7 −8 0 9], [2 −3 9 0]. Check that each column now matches the corresponding row. The original diagonal entries stay unchanged.'
  ]});
  p7(18,completeSym+'\n\n'+parts([mat([[0,'×'],[3,0]]),mat([[1,7,-3,2],['×',4,5,-7],['×','×',1,-6],['×','×','×',3]])]),{steps:[
    'Use aᵢⱼ = aⱼᵢ: every entry must match its reflected partner across the diagonal.',
    '(a) The lower-left entry is 3, so fill the upper-right entry with 3. This gives rows [0 3] and [3 0].',
    '(b) Copy 7,−3,2 from row 1 into the first column below the diagonal. Next copy 5,−7 from row 2 into column 2 below the diagonal. Finally copy −6 from row 3 into the remaining position.',
    'The completed rows are [1 7 −3 2], [7 4 5 −7], [−3 5 1 −6], [2 −7 −6 3]. Check one pair at a time, including the negative signs.'
  ]});
  [
    [[0,6,-1],[0,7,-4],[0,0,-2]], [[-1,2,4],[0,3,0],[0,0,5]],
    [[1,0,0,0],[2,-5,0,0],[4,-3,4,0],[1,-2,1,3]],
    [[2,0,0,0],[-3,-1,0,0],[-4,-6,0,0],[0,3,8,-5]]
  ].forEach((a,i)=>{
    const d=a.map((row,j)=>row[j]),upper=i<2,zero=d.includes(0);
    p7(i+19,'Determine by inspection whether the matrix is invertible.\n\n'+mat(a),{steps:[
      'This matrix is '+(upper?'upper':'lower')+' triangular: every entry '+(upper?'below':'above')+' the main diagonal is zero. The main diagonal runs from the upper-left corner to the lower-right corner.',
      'Read its diagonal entries: '+d.join(', ')+'. For a triangular square matrix, an inverse exists exactly when each diagonal entry is nonzero. Nonzero diagonal entries allow a pivot for every variable, so successive substitution can undo the matrix’s action.',
      zero?'Here the diagonal contains 0. Thus the matrix does not have a pivot for every variable and cannot be inverted. It is singular, which means “has no inverse.”':'Every diagonal entry is nonzero. Negative entries are allowed; only zero would fail the rule. Therefore the matrix is invertible.'
    ]});
  });
  p7(23,'Find the diagonal entries of AB by inspection.\n\n'+named('A',[[3,2,6],[0,1,-2],[0,0,-1]])+'\n\n'+named('B',[[-1,2,7],[0,5,3],[0,0,6]]),{steps:[
    'Both factors are upper triangular. For such factors, a diagonal entry of AB is the product of the corresponding diagonal entries of A and B.',
    'At position (1,1), the row-column calculation is 3×(−1) + 2×0 + 6×0 = −3.',
    'At position (2,2), it is 0×2 + 1×5 + (−2)×0 = 5.',
    'At position (3,3), it is 0×7 + 0×3 + (−1)×6 = −6. Thus the diagonal entries are −3,5,−6; there is no need to calculate the other entries.'
  ]});
  p7(24,'Find the diagonal entries of AB by inspection.\n\n'+named('A',[[4,0,0],[-2,0,0],[-3,0,7]])+'\n\n'+named('B',[[6,0,0],[1,5,0],[3,2,6]]),{steps:[
    'Both matrices are lower triangular. In the row-column sum for a diagonal entry, every term except the matching diagonal pair contains a zero.',
    'The first diagonal entry is 4×6 = 24.',
    'The second diagonal entry is 0×5 = 0. Multiplying does not remove that zero.',
    'The third diagonal entry is 7×6 = 42. Therefore the diagonal of AB is (24,0,42).'
  ]});
  p7(25,'Find all values of the unknown constant(s) for which A is symmetric.\n\n'+named('A',[[4,-3],['a+5',-1]]),{steps:[
    'For a 2 × 2 matrix, the only off-diagonal pair is the upper-right and lower-left entries. Symmetry requires them to be equal.',
    'Write a + 5 = −3. Subtract 5 from both sides so the equation stays balanced: a = −3 − 5 = −8.',
    'Check by substituting a = −8: the lower-left entry becomes −8 + 5 = −3, matching the upper-right entry. Thus a = −8 is the required value.'
  ]});
  p7(26,'Find all values of the unknown constant(s) for which A is symmetric.\n\n'+named('A',[[2,'a − 2b + 2c','2a + b + c'],[3,5,'a + c'],[0,-2,7]]));
  p7(27,'Find all values of x for which A is invertible.\n\n'+named('A',[['x−1','x²','x⁴'],[0,'x+2','x³'],[0,0,'x−4']]),{steps:[
    'This is upper triangular because every entry below the main diagonal is zero. Such a matrix is invertible exactly when all diagonal entries are nonzero.',
    'Read the diagonal: x−1, x+2, x−4. The powers above the diagonal do not affect this test.',
    'Solve each forbidden equality separately: x−1=0 gives x=1; x+2=0 gives x=−2; x−4=0 gives x=4.',
    'Exclude those three values. Every other real x leaves three nonzero pivots and therefore an invertible matrix.'
  ]});
  p7(28,'Find all values of x for which A is invertible.\n\n'+named('A',[['x−1/2',0,0],['x','x−1/3',0],['x²','x³','x+1/4']]),{steps:[
    'The matrix is lower triangular. Read its diagonal, not the entries below it: x−1/2, x−1/3, x+1/4.',
    'Invertibility requires x−1/2 ≠ 0, x−1/3 ≠ 0 and x+1/4 ≠ 0 simultaneously.',
    'The excluded values are x=1/2, x=1/3 and x=−1/4. Every other real value makes all diagonal entries nonzero.',
    'For a quick check, x=0 is allowed: its diagonal is (−1/2,−1/3,1/4), which contains no zero.'
  ]});
  p7(29,'If A is an invertible upper triangular or lower triangular matrix, what can you say about the diagonal entries of A⁻¹?',{steps:[
    'Name the inverse C=A⁻¹. The inverse of an invertible triangular matrix is triangular of the same type. Thus A and C are either both upper triangular or both lower triangular.',
    'By definition, AC=I. For two triangular factors of the same type, diagonal entry i of the product is aᵢᵢcᵢᵢ; other terms in its row-column sum contain zeros.',
    'The matching diagonal entry of I is 1, so aᵢᵢcᵢᵢ=1. Every aᵢᵢ is nonzero because A is invertible, so division gives cᵢᵢ=1/aᵢᵢ.',
    'Thus each inverse diagonal entry is the reciprocal of the original one. This statement concerns the diagonal; it does not say to take reciprocals of every entry in A.'
  ]});
  p7(30,'Show that if A is a symmetric n × n matrix and B is any n × m matrix, then the following products are symmetric:\nBᵀB, BBᵀ, BᵀAB.',{steps:[
    'A square matrix X is symmetric when Xᵀ=X. The products have sizes m × m, n × n and m × m respectively, so each can be tested for symmetry.',
    'Use the transpose rule (XY)ᵀ=YᵀXᵀ: reverse the order of factors and transpose each one. Also, (Bᵀ)ᵀ=B because exchanging rows and columns twice restores B.',
    'For the first product, (BᵀB)ᵀ=Bᵀ(Bᵀ)ᵀ=BᵀB. It equals its transpose, so it is symmetric.',
    'For the second, (BBᵀ)ᵀ=(Bᵀ)ᵀBᵀ=BBᵀ. It is also symmetric.',
    'For the third, (BᵀAB)ᵀ=BᵀAᵀ(Bᵀ)ᵀ=BᵀAB. The final equality uses Aᵀ=A, which is the given symmetry of A. All three required products are symmetric.'
  ]});
  p7(31,'Find a diagonal matrix A that satisfies the given condition.\n\nA⁵ =\n'+mat(diag([1,-1,-1])),{steps:[
    'Write A = diag(a,b,c). This means a,b,c are on the main diagonal and all other entries are zero.',
    'The fifth power is diag(a⁵,b⁵,c⁵), so compare entries: a⁵=1, b⁵=−1, c⁵=−1.',
    'For real numbers an odd power keeps the sign and has one real root. Therefore a=1, b=−1 and c=−1.',
    'Substitute back: 1⁵=1 and (−1)⁵=−1. Thus A=diag(1,−1,−1) satisfies the condition.'
  ]});
  p7(32,'Find a diagonal matrix A that satisfies the given condition.\n\nA⁻² =\n'+mat(diag([9,4,1])),{steps:[
    'Write A = diag(a,b,c), with nonzero entries because the negative power requires an inverse. Then A⁻² = diag(1/a²,1/b²,1/c²).',
    'Compare diagonal entries: 1/a²=9, 1/b²=4 and 1/c²=1. Taking reciprocals gives a²=1/9, b²=1/4 and c²=1.',
    'Both positive and negative square roots work: a=±1/3, b=±1/2 and c=±1. The signs can be chosen independently.',
    'One requested example is A=diag(1/3,1/2,1). More generally all eight independent sign choices work, because squaring removes their signs.'
  ]});
  p7(33,'Verify Theorem 1.7.1(b) for the matrix product AB and Theorem 1.7.1(d) for the matrix A, where\n\n'+named('A',[[-1,2,5],[0,1,3],[0,0,-4]])+'\n\n'+named('B',[[2,-8,0],[0,2,1],[0,0,3]]),{reference:'Theorem 1.7.1(b): a product of upper triangular matrices is upper triangular, and a product of lower triangular matrices is lower triangular. Part (d): the inverse of an invertible triangular matrix is triangular of the same type.'});
  p7(34,'Let A be an n × n symmetric matrix.\n(a) Show that A² is symmetric.\n(b) Show that 2A² − 3A + I is symmetric.',{steps:[
    'The assumption “A is symmetric” means Aᵀ=A. To show a new matrix is symmetric, calculate its transpose and show that it is unchanged.',
    '(a) Since A²=AA, the product rule gives (A²)ᵀ=AᵀAᵀ. Substitute Aᵀ=A to obtain (A²)ᵀ=AA=A². This proves the first claim.',
    '(b) Transposition distributes over sums and scalar multiples: (2A²−3A+I)ᵀ=2(A²)ᵀ−3Aᵀ+Iᵀ.',
    'Use part (a), the assumption Aᵀ=A, and Iᵀ=I. The result is 2A²−3A+I again. Therefore the second matrix also equals its transpose and is symmetric.'
  ]});
  p7(35,'Verify Theorem 1.7.4 for the given matrix A.\n\n'+parts([named('A',[[2,-1],[-1,3]]),named('A',[[1,-2,3],[-2,1,-7],[3,-7,4]])]),{reference:'Theorem 1.7.4: if A is an invertible symmetric matrix, then A⁻¹ is symmetric.'});
  p7(36,'Find all 3 × 3 diagonal matrices A that satisfy A² − 3A − 4I = 0.',{steps:[
    'Let the three diagonal entries be a,b,c. Since A is diagonal, the matrix equation gives the same scalar equation for each entry: t²−3t−4=0.',
    'Factor: t²−3t−4=(t−4)(t+1). A product is zero only if at least one factor is zero, so t=4 or t=−1.',
    'Choose independently for each diagonal position. The possibilities are diag(−1,−1,−1), diag(−1,−1,4), diag(−1,4,−1), diag(−1,4,4), diag(4,−1,−1), diag(4,−1,4), diag(4,4,−1), diag(4,4,4).',
    'There are 2×2×2=8 matrices. Check either possible entry: 4²−3×4−4=0 and (−1)²−3×(−1)−4=0, so every listed diagonal matrix satisfies the original equation.'
  ]});
  p7(37,'Let A = [aᵢⱼ] be an n × n matrix. Determine whether A is symmetric.\n\n'+parts(['aᵢⱼ = i² + j²','aᵢⱼ = i² − j²','aᵢⱼ = 2i + 2j','aᵢⱼ = 2i² + 2j³']),{steps:[
    'The subscripts i,j mean row i, column j. Symmetry requires aᵢⱼ=aⱼᵢ: entries reflected across the main diagonal must agree. Swap i and j in each formula to test that requirement.',
    '(a) Swapping gives j²+i². Addition can be performed in either order, so j²+i²=i²+j² for every pair. The matrix is symmetric.',
    '(b) Swapping gives j²−i², which is generally different. For n≥2, take i=1,j=2: a₁₂=1−4=−3, but a₂₁=4−1=3. One unequal pair proves the matrix is not symmetric.',
    '(c) Swapping gives 2j+2i=2i+2j. The entries agree for every pair, so the matrix is symmetric.',
    '(d) For n≥2, a₁₂=2×1²+2×2³=2+16=18, whereas a₂₁=2×2²+2×1³=8+2=10. These reflected entries differ, so the matrix is not symmetric.',
    'If n=1, only a₁₁ exists; there are no different off-diagonal positions to compare. Every 1 × 1 matrix is symmetric, so all four formulas give symmetric matrices in that special case.'
  ]});
  p7(38,'On the basis of your experience with Exercise 37, devise a general test that can be applied to a formula for aᵢⱼ to determine whether A = [aᵢⱼ] is symmetric.',{reference:'Exercise 37 compares the formulas aᵢⱼ=i²+j², i²−j², 2i+2j and 2i²+2j³ when the two indices are interchanged.',steps:[
    'The first subscript i tells you the row, and j tells you the column. The reflected entry across the main diagonal has the indices exchanged: aⱼᵢ.',
    'Take the proposed formula for aᵢⱼ and swap every i with j and every j with i. This produces the formula for aⱼᵢ.',
    'If the two formulas have equal values for every allowed pair i,j from 1 to n, then A is symmetric. For example i²+j² becomes j²+i², the same number.',
    'To disprove symmetry, one unequal pair is enough. For i²−j², positions (1,2) and (2,1) give −3 and 3 when n≥2, so that matrix fails the test.'
  ]});
  p7(39,'Find an upper triangular matrix that satisfies\n\nA³ =\n'+mat([[1,30],[0,-8]]),{steps:[
    'An upper triangular 2 × 2 matrix has the form A=[a t; 0 d]. We need to find the three unknown entries a,t,d.',
    'When triangular matrices multiply, their diagonal entries multiply position by position. Therefore the diagonal of A³ is a³,d³. Comparing with the given matrix gives a³=1 and d³=−8, so a=1 and d=−2 over the real numbers.',
    'Now A=[1 t; 0 −2]. Multiply A by itself: the upper-right entry is 1×t+t×(−2)=−t. Thus A²=[1 −t; 0 4].',
    'Multiply A² by A. The upper-right entry is 1×t+(−t)×(−2)=3t; the diagonal is 1,−8. Hence A³=[1 3t; 0 −8].',
    'Match the remaining entry: 3t=30, so t=10. Substituting gives A=[1 10; 0 −2], whose cube is exactly the required matrix.'
  ]});
  p7(40,'If the n × n matrix A can be expressed as A = LU, where L is a lower triangular matrix and U is an upper triangular matrix, then the linear system Ax = b can be expressed as LUx = b and can be solved in two steps:\nStep 1. Let Ux = y, so that LUx = b can be expressed as Ly = b. Solve this system.\nStep 2. Solve the system Ux = y for x.\nIn each part, use this two-step method to solve the given system.\n\n'+parts([
    mat([[1,0,0],[-2,3,0],[2,4,1]])+'\n×\n'+mat([[2,-1,3],[0,1,2],[0,0,4]])+'\n×\n'+mat([['x₁'],['x₂'],['x₃']])+'\n=\n'+mat([[1],[-2],[0]]),
    mat([[2,0,0],[4,1,0],[-3,-2,3]])+'\n×\n'+mat([[3,-5,2],[0,4,1],[0,0,2]])+'\n×\n'+mat([['x₁'],['x₂'],['x₃']])+'\n=\n'+mat([[4],[-5],[2]])
  ]));
  const skewDefinition='In the text we defined a matrix A to be symmetric if Aᵀ = A. Analogously, a matrix A is said to be skew-symmetric if Aᵀ = −A. Exercises 41–45 are concerned with matrices of this type.';
  p7(41,'Fill in the missing entries (marked with ×) so the matrix A is skew-symmetric.\n\n'+parts([named('A',[['×','×',4],[0,'×','×'],['×',-1,'×']]),named('A',[['×',0,'×'],['×','×',-4],[8,'×','×']])]),{reference:skewDefinition,steps:[
    'Skew-symmetric means that reflected entries are opposites: aᵢⱼ = −aⱼᵢ. A diagonal entry reflects onto itself, so it must satisfy aᵢᵢ = −aᵢᵢ. Hence every diagonal entry is 0.',
    '(a) Opposite the given 0, put 0; opposite 4, put −4; opposite −1, put 1. The rows become [0 0 4], [0 0 1], [−4 −1 0].',
    '(b) Opposite the given 0, put 0; opposite 8, put −8; opposite −4, put 4. The rows become [0 0 −8], [0 0 −4], [8 4 0].',
    'Check by exchanging rows and columns in either result: every entry becomes the negative of its original value, exactly as Aᵀ = −A requires.'
  ]});
  p7(42,'Find all values of a, b, c, and d for which A is skew-symmetric.\n\n'+named('A',[[0,'2a − 3b + c','3a − 5b + 5c'],[-2,0,'5a − 8b + 6c'],[-3,-5,'d']]),{reference:skewDefinition,steps:[
    'For skew-symmetry, reflected entries must be opposites and every diagonal entry must be zero. The last diagonal entry therefore gives d=0.',
    'Compare the three off-diagonal pairs. Opposite −2 we need 2, opposite −3 we need 3, and opposite −5 we need 5. This gives (1) 2a−3b+c=2; (2) 3a−5b+5c=3; (3) 5a−8b+6c=5.',
    'Add equations (1) and (2): the result is exactly equation (3), on both sides. Thus equation (3) imposes no new condition, and we only need to solve the first two.',
    'Eliminate a by taking twice equation (2) minus three times equation (1). The a-terms are 6a−6a=0, the b-terms are −10b−(−9b)=−b, and the c-terms are 10c−3c=7c. The right side is 6−6=0. Therefore −b+7c=0, or b=7c.',
    'Substitute b=7c into equation (1): 2a−3(7c)+c=2, so 2a−20c=2. Add 20c to both sides and divide by 2 to obtain a=1+10c.',
    'No equation restricts c, so write c=t for any real number t. All solutions are (a,b,c,d)=(1+10t,7t,t,0). Here a “free parameter” simply means a number you may choose.',
    'Check the reflected entries: 2(1+10t)−3(7t)+t=2; 3(1+10t)−5(7t)+5t=3; 5(1+10t)−8(7t)+6t=5. All terms containing t cancel, so every real choice works.'
  ]});
  p7(43,'We showed in the text that the product of symmetric matrices is symmetric if and only if the matrices commute. Is the product of commuting skew-symmetric matrices skew-symmetric? Explain.',{reference:skewDefinition,steps:[
    '“Commute” means AB=BA. Skew-symmetry means Aᵀ=−A and Bᵀ=−B. We test the product by calculating (AB)ᵀ.',
    'Transposing a product reverses its order: (AB)ᵀ=BᵀAᵀ=(−B)(−A)=BA. The two minus signs cancel. Because the matrices commute, BA=AB.',
    'Thus AB equals its transpose, which makes it symmetric. To be skew-symmetric as well, it would need AB=−AB. Adding AB to both sides gives 2AB=0, so this happens only when AB is the zero matrix.',
    'For a concrete counterexample, take A=B=[0 1; −1 0]. Both are skew-symmetric, and a matrix commutes with itself. Their product is [−1 0; 0 −1]=−I₂.',
    'This nonzero diagonal product equals its transpose but does not equal its negative. Hence the answer is no in general; a commuting product is skew-symmetric only in the special case AB=0.'
  ]});
  p7(44,'Prove that every square matrix A can be expressed as the sum of a symmetric matrix and a skew-symmetric matrix. [Hint: Note the identity A = ½(A + Aᵀ) + ½(A − Aᵀ).]',{reference:skewDefinition,steps:[
    'The hint proposes two pieces. Name them S=(A+Aᵀ)/2 and K=(A−Aᵀ)/2. We must check their symmetry types and that they add to A.',
    'Add them: S+K=(A+Aᵀ+A−Aᵀ)/2=2A/2=A. The transpose terms cancel.',
    'Transpose S: Sᵀ=(Aᵀ+(Aᵀ)ᵀ)/2=(Aᵀ+A)/2=S. Here (Aᵀ)ᵀ=A means that swapping rows and columns twice restores the matrix. Thus S is symmetric.',
    'Transpose K: Kᵀ=(Aᵀ−A)/2=−(A−Aᵀ)/2=−K. Thus K is skew-symmetric.',
    'We have constructed the required two matrices and verified both properties for any square A, which proves the claim.'
  ]});
  p7(45,'Prove the following facts about skew-symmetric matrices.\n(a) If A is an invertible skew-symmetric matrix, then A⁻¹ is skew-symmetric.\n(b) If A and B are skew-symmetric matrices, then so are Aᵀ, A + B, A − B, and kA for any scalar k.',{reference:skewDefinition,steps:[
    'Use the defining equalities Aᵀ=−A and Bᵀ=−B. For each requested expression X, our goal is to show Xᵀ=−X.',
    '(a) Transpose the inverse: (A⁻¹)ᵀ=(Aᵀ)⁻¹=(−A)⁻¹=−A⁻¹. The last equality follows because (−A)(−A⁻¹)=I. Thus A⁻¹ is skew-symmetric.',
    '(b), transpose: (Aᵀ)ᵀ=A. Since Aᵀ=−A, we also have A=−Aᵀ. Hence (Aᵀ)ᵀ=−Aᵀ.',
    '(b), sum: (A+B)ᵀ=Aᵀ+Bᵀ=−A−B=−(A+B).',
    '(b), difference: (A−B)ᵀ=Aᵀ−Bᵀ=−A+B=−(A−B). Notice the sign change before B.',
    '(b), scalar multiple: (kA)ᵀ=kAᵀ=k(−A)=−kA. This works even for k=0. Every requested expression is therefore skew-symmetric.'
  ]});
  p7(46,'Prove: If the matrices A and B are both upper triangular or both lower triangular, then the diagonal entries of both AB and BA are the products of the diagonal entries of A and B.',{steps:[
    'The entry (i,i) of AB is obtained from row i of A and column i of B: (AB)ᵢᵢ = Σₖ aᵢₖbₖᵢ. The symbol Σ means add the terms for k=1 through n.',
    'Suppose both matrices are upper triangular. If k<i, aᵢₖ lies below A’s diagonal and is 0. If k>i, bₖᵢ lies below B’s diagonal and is 0.',
    'Every term except k=i therefore vanishes. The surviving term is aᵢᵢbᵢᵢ.',
    'For two lower triangular matrices, k>i makes aᵢₖ=0 and k<i makes bₖᵢ=0. Again only k=i survives.',
    'Repeat with A and B exchanged to get (BA)ᵢᵢ=bᵢᵢaᵢᵢ. These entries are ordinary numbers, so the two products are equal. This proves the claim for every diagonal position.'
  ]});
  p7(47,'Prove: If AᵀA = A, then A is symmetric and A² = A.',{steps:[
    'Start with the given equality AᵀA=A. Transpose both sides; transposing a product reverses the factors: (XY)ᵀ=YᵀXᵀ.',
    'Thus (AᵀA)ᵀ=Aᵀ(Aᵀ)ᵀ=AᵀA, while the right-hand side becomes Aᵀ. We obtain AᵀA=Aᵀ.',
    'The same left-hand side equals A by the hypothesis. Therefore Aᵀ=A, which is exactly the definition of symmetry.',
    'Replace Aᵀ with A in the original equality. It becomes AA=A, or A²=A. Both conclusions are established.'
  ]});
  p7('TF','In parts (a)–(m) determine whether the statement is true or false, and justify your answer.\n\n'+parts([
    'The transpose of a diagonal matrix is a diagonal matrix.',
    'The transpose of an upper triangular matrix is an upper triangular matrix.',
    'The sum of an upper triangular matrix and a lower triangular matrix is a diagonal matrix.',
    'All entries of a symmetric matrix are determined by the entries occurring on and above the main diagonal.',
    'All entries of an upper triangular matrix are determined by the entries occurring on and above the main diagonal.',
    'The inverse of an invertible lower triangular matrix is an upper triangular matrix.',
    'A diagonal matrix is invertible if and only if all of its diagonal entries are positive.',
    'The sum of a diagonal matrix and a lower triangular matrix is a lower triangular matrix.',
    'A matrix that is both symmetric and upper triangular must be a diagonal matrix.',
    'If A and B are n × n matrices such that A + B is symmetric, then A and B are symmetric.',
    'If A and B are n × n matrices such that A + B is upper triangular, then A and B are upper triangular.',
    'If A² is a symmetric matrix, then A is a symmetric matrix.',
    'If kA is a symmetric matrix for some k ≠ 0, then A is a symmetric matrix.'
  ]),{steps:[
    '(a) True. Transposition leaves diagonal entries in place and swaps off-diagonal zero pairs, so a diagonal matrix stays diagonal.',
    '(b) False. The upper triangular matrix [1 2; 0 3] transposes to [1 0; 2 3], which has a nonzero entry below the diagonal.',
    '(c) False. Add the upper triangular matrix [1 2; 0 3] to the lower triangular matrix [4 0; 5 6]. The result [5 2; 5 9] has nonzero entries off the diagonal.',
    '(d) True. For symmetry, every entry below the diagonal must equal its reflected partner above it. The given upper half therefore determines the rest.',
    '(e) True. An upper triangular matrix has all entries below the diagonal equal to 0, so only the on-diagonal and above-diagonal entries need to be specified.',
    '(f) False. A lower triangular inverse is lower triangular. For example [1 0; 2 1] has inverse [1 0; −2 1], which is not upper triangular.',
    '(g) False. The diagonal entries must be nonzero, but may be negative. For example diag(−1,2) is invertible, with inverse diag(−1,1/2).',
    '(h) True. Both matrices have zeros above the diagonal. Adding corresponding entries leaves zeros there, so the sum is lower triangular.',
    '(i) True. Upper triangular gives zeros below the diagonal. Symmetry copies those zeros to the reflected positions above it. Only diagonal entries can remain nonzero.',
    '(j) False. Let A=[0 0; 1 0] and B=[0 0; −1 0]. Neither is symmetric, but A+B=0 is symmetric.',
    '(k) False. The same A and B have nonzero entries below the diagonal, so neither is upper triangular. Their zero sum is upper triangular.',
    '(l) False. A=[0 1; 0 0] is not symmetric, but A²=0 is symmetric.',
    '(m) True. Symmetry of kA gives kAᵀ=kA. Since k≠0, divide both sides by k to get Aᵀ=A.'
  ]});
  p7('T1','Starting with the formula stated in Exercise T1 of Section 1.5, derive a formula for the inverse of the “block diagonal” matrix\n[ D₁   0  ]\n[  0   D₂ ]\nin which D₁ and D₂ are invertible, and use your result to compute the inverse of the matrix\n\n'+named('M',[[1.24,2.37,0,0],[3.08,-1.01,0,0],[0,0,2.76,4.92],[0,0,3.23,5.54]]),{reference:blockFormula,steps:[
    'In the referenced block formula, substitute A=D₁, D=D₂, B=0 and C=0. The letters here represent whole rectangular groups of entries, called blocks.',
    'Then S=D−CA⁻¹B=D₂ because the product containing a zero block is zero. The correction A⁻¹BS⁻¹CA⁻¹ is also zero, as are both off-diagonal inverse blocks.',
    'The formula therefore reduces to diag(D₁⁻¹,D₂⁻¹): put the inverse of each original block in the same diagonal position, with zero blocks elsewhere. This derives the required rule from the given formula.',
    'For the first numeric block, det(D₁)=1.24×(−1.01)−2.37×3.08=−8.552. Hence D₁⁻¹=(1/−8.552)[−1.01 −2.37; −3.08 1.24].',
    'For the second block, det(D₂)=2.76×5.54−4.92×3.23=−0.6012. Hence D₂⁻¹=(1/−0.6012)[5.54 −4.92; −3.23 2.76]. Both denominators are nonzero, so both inverses exist.',
    'Place these two blocks into the 4 × 4 result shown below. To check, multiply by M: each diagonal block gives DᵢDᵢ⁻¹=I₂ and each off-diagonal block remains zero. The full product is I₄. Rounded decimal entries may produce tiny rounding differences.'
  ]});

  window.EmberMathQuestions=window.EmberMathQuestions||{};
  Object.assign(window.EmberMathQuestions,sets);
})();
