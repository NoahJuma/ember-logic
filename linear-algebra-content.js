(function (root) {
  'use strict';

  const M = root.EmberAlgebra;
  const topics = [
    ['1.1','Introduction to linear systems',2,8],
    ['1.2','Gaussian elimination',11,22],
    ['1.3','Matrices and matrix operations',25,37],
    ['1.4','Inverses and matrix algebra',40,51],
    ['1.5','Elementary matrices and finding an inverse',53,60],
    ['1.6','Linear systems and invertibility',62,67],
    ['1.7','Diagonal, triangular and symmetric matrices',69,74],
    ['1.8','Introduction to linear transformations',76,88],
    ['1.9','Composition of matrix transformations',90,96],
    ['1.10','Applications of linear systems',98,108],
    ['1.11','Leontief input–output models',110,114]
  ];

  const names = ['x','y','z','w','v'];
  function equation(row) {
    const terms = row.slice(0,-1).flatMap((value,i) => value === 0 ? [] : [[value,names[i]]]);
    return (terms.map(([value,name],i) => (value < 0 ? (i ? ' − ' : '−') : (i ? ' + ' : '')) +
      (Math.abs(value) === 1 ? '' : Math.abs(value)) + name).join('') || '0') + ' = ' + row.at(-1);
  }

  function solutionText(result) {
    if (result.kind === 'none') return 'No solution';
    if (result.kind === 'one') return M.vector(result.point);
    return M.vector(result.point) + ' + ' + result.basis.map((v,i) => ['s','t','u','v'][i] + M.vector(v)).join(' + ') + ', with arbitrary real parameters';
  }

  function system(title, a, intro = 'Solve the system.') {
    const solved = M.solve(a);
    return {title, prompt:intro+'\n'+a.map(equation).join('\n'), answer:solutionText(solved), steps:solved.steps};
  }

  function product(title,a,b) {
    const value=M.multiply(a,b);
    return {title,prompt:'Calculate AB.\nA = '+M.matrixText(a)+'\nB = '+M.matrixText(b),answer:M.matrixText(value),
      steps:['Each output entry uses one row of A and one column of B. Multiply matching entries and add.',...a.flatMap((row,i)=>b[0].map((_,j)=>'Entry ('+(i+1)+', '+(j+1)+') = '+row.map((n,k)=>'('+n+' × '+b[k][j]+')').join(' + ')+' = '+value[i][j]+'.'))]};
  }

  function invert(title,a) {
    const result=M.inverse(a);
    return {title,prompt:'Find A⁻¹ if it exists.\nA = '+M.matrixText(a),answer:result.value ? M.matrixText(result.value) : 'No inverse',steps:result.steps};
  }

  function transform(title,a,v) {
    const answer=M.apply(a,v);
    return {title,prompt:'Apply matrix A to v.\nA = '+M.matrixText(a)+'\nv = '+M.vector(v),answer:M.vector(answer),
      steps:['Think of v as a column of coordinates. One row of A tells you how to calculate one new coordinate.',...a.map((row,i)=>'Coordinate '+(i+1)+' = '+row.map((n,j)=>'('+n+' × '+v[j]+')').join(' + ')+' = '+answer[i]+'.')]};
  }

  function compose(title,a,b,v) {
    const mid=transform(title,a,v), end=transform(title,b,M.apply(a,v));
    return {title,prompt:'Apply A first, then B. Find BAv.\nA = '+M.matrixText(a)+'\nB = '+M.matrixText(b)+'\nv = '+M.vector(v),answer:end.answer,
      steps:['Work from right to left in BAv. First compute Av.',...mid.steps.slice(1),'The intermediate vector is '+mid.answer+'. Multiply it by B.',...end.steps.slice(1)]};
  }

  function leontief(level,k) {
    const c=level===1 ? [[.2]] : level===2 ? [[.2,.1],[0,.5]] : level===3 ? [[.4,.2],[.1,.3]] : [[.2,.1,.2],[.1,.4,.1],[.2,.1,.3]];
    const output=c.map((_,i)=>100+20*i+10*k);
    const coefficients=c.map((row,i)=>row.map((value,j)=>Number(i===j)-value));
    const demand=M.apply(coefficients,output);
    const solved=M.solve(coefficients.map((row,i)=>[...row,demand[i]]));
    return {title:'Plan total production',prompt:'Find production x given the internal consumption matrix C and external demand d.\nC = '+M.matrixText(c)+'\nd = '+M.vector(demand),answer:solutionText(solved),
      steps:['Total production covers internal use Cx plus outside orders d, so x = Cx + d.','Move Cx to the left. This gives (I − C)x = d.','Subtract C from I entry by entry to get '+M.matrixText(coefficients)+'.',...solved.steps]};
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
        return system(['Crossing lines','Parallel lines','Three planes meet','Describe all common points'][level-1],
          [easy,[[1,2,4+k],[2,4,9+2*k]],unique,free][level-1]);
      case '1.2':
        return system(['Start with a pivot','Swap before you eliminate','Find the free variables','Spot a contradiction'][level-1],
          [[[1,2,5+k],[0,1,2]],[[0,1,t],[2,3,8+k]],[[1,2,0,1,5+k],[0,1,3,-2,4],[2,4,0,2,10+2*k]],impossible][level-1],
          'Use row operations to solve the system.');
      case '1.3':
        return level===1 ? product('A row times a column',[[2,t]],[[3],[4]]) :
          level===2 ? product('Multiply two small matrices',standard,[[2,0],[t,1]]) :
          level===3 ? product('Multiply rectangular matrices',[[1,t,0],[2,1,-1]],[[1,0],[t,2],[3,1]]) :
          product('Multiply with signs and zeroes',[[1,-t,0],[2,1,-1],[0,3,1]],[[1,0,2],[t,2,-2],[3,1,0]]);
      case '1.4':
        return invert(['Undo a scaling','Invert a 2 × 2 matrix','Recognize a singular matrix','Invert a 3 × 3 matrix'][level-1],
          [[[t+1,0],[0,4]],[[1,t],[2,2*t+1]],[[1,t],[3,3*t]],[[1,t,0],[2,2*t+1,1],[0,1,2]]][level-1]);
      case '1.5':
        return invert(['Undo a row addition','Undo a row swap','Invert an upper triangular matrix','Track every row operation'][level-1],
          [[[1,t],[0,1]],[[0,1],[1,t]],triangle,[[0,1,1],[1,t,2],[2,1,1]]][level-1]);
      case '1.6': {
        const exercise = system(['Solve a homogeneous system','Find the unique solution','A consistent singular system','A singular system can be inconsistent'][level-1],
          [[[1,t,0],[0,2,0]],easy,free,impossible][level-1],
          'Solve Ax = b and use the number of solutions to decide whether the square coefficient matrix is invertible.');
        const invertible = level <= 2;
        exercise.answer += invertible ? '. A is invertible.' : '. A is singular.';
        exercise.steps.push(invertible ? 'There is a pivot in every variable column, so the square matrix A has an inverse.' : 'A variable column is missing a pivot, so the square matrix A has no inverse.');
        return exercise;
      }
      case '1.7': {
        const a=[[[t,0],[0,2]],triangle,[[2,t,0],[t,1,-2],[0,-2,3]],[[1,0,0],[t,1,0],[0,2,4]]][level-1];
        if(level===4) return invert('Invert a lower triangular matrix',a);
        const labels=['Diagonal, upper triangular, lower triangular, and symmetric','Upper triangular only','Symmetric only'];
        return {title:'Identify the matrix structure',prompt:'Which of these labels apply: diagonal, upper triangular, lower triangular, symmetric?\nA = '+M.matrixText(a),answer:labels[level-1],
          steps:['Mark the main diagonal from top left to bottom right.','Upper triangular means all entries below it are zero. Lower triangular means all entries above it are zero. Diagonal means both conditions hold.','For symmetry, compare each entry with its reflection across the diagonal.', 'Applying these tests gives: '+labels[level-1]+'.']};
      }
      case '1.8':
        return transform(['Scale an arrow','Reflect a point','Mix three coordinates','Project onto a plane'][level-1],
          [[[2,0],[0,3]],[[1,0],[0,-1]],[[1,t,0],[0,1,1],[2,0,-1]],[[.5,.5,0],[.5,.5,0],[0,0,1]]][level-1],
          level<3?[t,2]:[t,3,-2]);
      case '1.9':
        return compose(['Scale then reflect','Rotate then shear','Two 3D transformations','Compose two maps that lose information'][level-1],
          [[[2,0],[0,1]],[[0,-1],[1,0]],[[1,t,0],[0,1,0],[0,0,1]],[[1,0,0],[0,1,0],[0,0,0]]][level-1],
          [[[-1,0],[0,1]],[[1,t],[0,1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,0],[1,1,0],[0,0,1]]][level-1],
          level<3?[t,2]:[t,3,2]);
      case '1.10': {
        const problems=[
          ['Two ticket types',[[1,1,7+k],[2,4,20+2*k]],'x child tickets and y adult tickets were sold. There were '+(7+k)+' tickets in all. Child tickets cost 2 credits and adult tickets cost 4 credits. The total was '+(20+2*k)+' credits.'],
          ['Find a line from two points',[[1,1,3+k],[3,1,7+k]],'A line y = mx + b passes through (1, '+(3+k)+') and (3, '+(7+k)+'). In the system below x means m and y means b.'],
          ['Find a quadratic from three points',[[0,0,1,2+k],[1,1,1,6+k],[4,2,1,12+k]],'The curve f(s) = x s² + y s + z passes through (0, '+(2+k)+'), (1, '+(6+k)+'), and (2, '+(12+k)+'). Use x, y and z as its coefficients.'],
          ['Flow with a free route',[[1,1,0,12+k],[-1,0,1,0],[0,1,1,12+k]],'At node A, '+(12+k)+' units arrive and leave on routes x and y. At node B, x arrives and z leaves. At node C, y and z arrive and '+(12+k)+' units leave. Flows are nonnegative.']
        ];
        const [title,m,prompt]=problems[level-1], exercise=system(title,m,prompt+' Solve the model below.');
        if(level===4){exercise.answer+=' with 0 ≤ s ≤ '+(12+k);exercise.steps.push('The free variable is z = s, so x = s and y = '+(12+k)+' − s. All flows are nonnegative exactly when 0 ≤ s ≤ '+(12+k)+'.');}
        return exercise;
      }
      case '1.11': return leontief(level,k);
    }
  }

  // Each item pairs the mathematical language with the term and its meaning.
  const glossary = [
    [['Linear equation','x + 2y = 5','Variables appear to the first power and are never multiplied together.'],['Augmented matrix','[1  2 | 5]','The final column stores the right side of each equation.'],['Inconsistent system','0 = 4','A contradiction means the equations have no common solution.'],['Free variable','x = 3 − t, y = t','A variable without a pivot can be chosen freely in a consistent system.']],
    [['Pivot','[0  1  3]','The leading entry is the first nonzero entry in a row.'],['Row replacement','R₂ ← R₂ − 3R₁','Change row 2 by subtracting three copies of row 1.'],['Row echelon form','[1  2; 0  3]','Leading entries move to the right as you go down, and entries below them are zero.'],['Reduced row echelon form','[1  0  2; 0  1  3]','Each pivot is 1 and is the only nonzero entry in its column.']],
    [['Matrix dimensions','A ∈ ℝ²ˣ³','Read dimensions as rows first, columns second.'],['Matrix entry','a₂₃','The first index gives the row and the second gives the column.'],['Compatible product','(2 × 3)(3 × 4)','The inner dimensions match and the result is 2 × 4.'],['Matrix transpose','(AB)ᵀ = BᵀAᵀ','The transpose swaps rows with columns and reverses the order of a product.']],
    [['Identity matrix','AI = A','The identity plays the role of 1 for matrix multiplication.'],['Matrix inverse','AA⁻¹ = A⁻¹A = I','Multiplying by the inverse undoes the matrix.'],['Singular matrix','A⁻¹ does not exist','A square matrix is singular when it has no inverse.'],['Inverse of a product','(AB)⁻¹ = B⁻¹A⁻¹','Undo the last action first, so the order reverses.']],
    [['Elementary matrix','E = I with two rows swapped','One elementary row operation applied to I makes E.'],['Left multiplication','EA','The row operation encoded in E acts on the rows of A.'],['Augmenting by the identity','[A | I]','Apply every row operation to both sides of the divider.'],['Product of row operations','E₃E₂E₁A = I','The rightmost elementary matrix acts first, and E₃E₂E₁ = A⁻¹.']],
    [['Homogeneous system','Ax = 0','Every right-hand side is zero.'],['Trivial solution','x = 0','The all-zero vector solves every homogeneous system.'],['Invertibility test','Ax = 0 has only x = 0','For square A, only the trivial homogeneous solution means A is invertible.'],['Unique solvability','For every b, there is exactly one x with Ax = b','For square A this is equivalent to invertibility.']],
    [['Diagonal matrix','aᵢⱼ = 0 when i ≠ j','Every entry outside the main diagonal is zero.'],['Upper triangular matrix','aᵢⱼ = 0 when i > j','Entries below the diagonal are zero.'],['Symmetric matrix','Aᵀ = A','The entries across the main diagonal match.'],['Invertible triangular matrix','All aᵢᵢ ≠ 0','A square triangular matrix is invertible precisely when every diagonal entry is nonzero.']],
    [['Matrix transformation','T(v) = Av','Multiply the input column by the matrix to get the output.'],['Image of a vector','T(v) = w','The output w is the image of v under T.'],['Standard matrix columns','A = [T(e₁)  T(e₂)]','Each column records where one coordinate direction goes.'],['Linearity','T(su + tv) = sT(u) + tT(v)','A linear map preserves weighted sums of vectors.']],
    [['Composition','(S ∘ T)(v)','Apply T first, then S.'],['Identity transformation','T(v) = v for all v','The identity sends every input back to itself.'],['Matrix of a composition','[S ∘ T] = [S][T]','The matrix of the second action is on the left.'],['Inverse transformation','S ∘ T = T ∘ S = id','Each map undoes the other, so composing in either order gives the identity.']],
    [['Flow conservation','total inflow = total outflow','At a node without storage, the amount coming in equals the amount leaving.'],['Interpolation','f(1) = 3, f(2) = 5','An interpolating curve goes through the supplied points.'],['Quadratic model linear in its coefficients','xᵢ²a + xᵢb + c = yᵢ','Known point coordinates are constants and the unknown coefficients occur to the first power.'],['Homogeneous balance equations','An = 0','For chemical balancing, n is the vector of molecule counts and each element has zero net change.']],
    [['External demand','d','This vector records orders from outside the model.'],['Consumption coefficient','cᵢⱼ','This is the input from sector i needed for one unit of sector j output.'],['Open Leontief equation','x = Cx + d','Total output covers internal use and external demand.'],['Production multiplier','(I − C)⁻¹','Column j gives the change in production when outside demand for sector j rises by one unit.']]
  ];

  root.EmberChapter = {topics,makeProblem,glossary,system,solutionText,invert,product};
})(globalThis);
