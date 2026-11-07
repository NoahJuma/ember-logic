(() => {
  'use strict';
  const q13={},q14={};
  const put=(set,n,text,extra={})=>set[String(n)]={text,...extra};
  const sizes='Suppose that A, B, C, D, and E are matrices with the following sizes:\nA: 4 × 5; B: 4 × 5; C: 5 × 2; D: 4 × 2; E: 5 × 4.\nIn each part, determine whether the given matrix expression is defined. For those that are defined, give the size of the resulting matrix.';
  put(q13,1,sizes+'\n(a) BA\n(b) ABᵀ\n(c) AC + D\n(d) E(AC)\n(e) A − 3Eᵀ\n(f) E(5B + A)');
  put(q13,2,sizes+'\n(a) CDᵀ\n(b) DC\n(c) BC − 3D\n(d) Dᵀ(BE)\n(e) BᵀD + ED\n(f) BAᵀ + D');
  const given36=`Use the following matrices to compute the indicated expression if it is defined.
A =
[ 3  0 ]
[−1  2 ]
[ 1  1 ]
B =
[4 −1]
[0  2]
C =
[1 4 2]
[3 1 5]
D =
[ 1 5 2]
[−1 0 1]
[ 3 2 4]
E =
[ 6 1 3]
[−1 1 2]
[ 4 1 3]`;
  const parts36=[
    ['D + E','D − E','5A','−7C','2B − C','4E − 2D','−3(D + 2E)','A − A','tr(D)','tr(D − 3E)','4 tr(7B)','tr(A)'],
    ['2Aᵀ + C','Dᵀ − Eᵀ','(D − E)ᵀ','Bᵀ + 5Cᵀ','(1/2)Cᵀ − (1/4)A','B − Bᵀ','2Eᵀ − 3Dᵀ','(2Eᵀ − 3Dᵀ)ᵀ','(CD)E','C(BA)','tr(DEᵀ)','tr(BC)'],
    ['AB','BA','(3E)D','(AB)C','A(BC)','CCᵀ','(DA)ᵀ','(CᵀB)Aᵀ','tr(DDᵀ)','tr(4Eᵀ − D)','tr(CᵀAᵀ + 2Eᵀ)','tr((ECᵀ)ᵀA)'],
    ['(2Dᵀ − E)A','(4B)C + 2B','(−AC)ᵀ + 5Dᵀ','(BAᵀ − 2C)ᵀ','Bᵀ(CCᵀ − AᵀA)','DᵀEᵀ − (ED)ᵀ']
  ];
  const parts=(list)=>list.map((s,i)=>'('+String.fromCharCode(97+i)+') '+s).join('\n');
  parts36.forEach((list,i)=>put(q13,i+3,given36+'\n'+parts(list)));
  const givenAB=`A =
[3 −2 7]
[6  5 4]
[0  4 9]
B =
[6 −2 4]
[0  1 3]
[7  7 5]`;
  put(q13,7,'Use the following matrices and either the row method or the column method, as appropriate, to find the indicated row or column.\n'+givenAB+'\n'+parts(['the first row of AB','the third row of AB','the second column of AB','the first column of BA','the third row of AA','the third column of AA']));
  put(q13,8,'Use the following matrices and either the row method or the column method, as appropriate, to find the indicated row or column.\n'+givenAB+'\n'+parts(['the first column of AB','the third column of BB','the second row of BB','the first column of AA','the third column of AB','the first row of BA']));
  put(q13,9,'Use matrices A and B from Exercises 7–8.\n'+givenAB+'\n(a) Express each column vector of AA as a linear combination of the column vectors of A.\n(b) Express each column vector of BB as a linear combination of the column vectors of B.');
  put(q13,10,'Use matrices A and B from Exercises 7–8.\n'+givenAB+'\n(a) Express each column vector of AB as a linear combination of the column vectors of A.\n(b) Express each column vector of BA as a linear combination of the column vectors of B.');
  const toMatrix='In each part, find matrices A, x, and b that express the given linear system as a single matrix equation Ax = b, and write out this matrix equation.';
  put(q13,11,toMatrix+`
(a)
2x₁ − 3x₂ + 5x₃ = 7
9x₁ − x₂ + x₃ = −1
x₁ + 5x₂ + 4x₃ = 0
(b)
4x₁ − 3x₃ + x₄ = 1
5x₁ + x₂ − 8x₄ = 3
2x₁ − 5x₂ + 9x₃ − x₄ = 0
3x₂ − x₃ + 7x₄ = 2`);
  put(q13,12,toMatrix+`
(a)
x₁ − 2x₂ + 3x₃ = −3
2x₁ + x₂ = 0
−3x₂ + 4x₃ = 1
x₁ + x₃ = 5
(b)
3x₁ + 3x₂ + 3x₃ = −3
−x₁ − 5x₂ − 2x₃ = 3
−4x₂ + x₃ = 0`);
  const fromMatrix='In each part, express the matrix equation as a system of linear equations. Column vectors are written as transposed rows.';
  put(q13,13,fromMatrix+`
(a)
[ 5  6 −7]
[−1 −2  3] (x₁, x₂, x₃)ᵀ = (2, 0, 3)ᵀ
[ 0  4 −1]
(b)
[1  1  1]
[2  3  0] (x, y, z)ᵀ = (2, 2, −9)ᵀ
[5 −3 −6]`);
  put(q13,14,fromMatrix+`
(a)
[ 3 −1 2]
[ 4  3 7] (x₁, x₂, x₃)ᵀ = (2, −1, 4)ᵀ
[−2  1 5]
(b)
[ 3 −2 0  1]
[ 5  0 2 −2] (w, x, y, z)ᵀ = (0, 0, 0, 0)ᵀ
[ 3  1 4  7]
[−2  5 1  6]`);
  put(q13,15,`Find all values of k, if any, that satisfy the equation.
             [1 1  0]
[k 1 1] × [1 0  2] × (k, 1, 1)ᵀ = 0
             [0 2 −3]`);
  put(q13,16,`Find all values of k, if any, that satisfy the equation.
             [1 2 0]
[2 2 k] × [2 0 3] × (2, 2, k)ᵀ = 0
             [0 3 1]`);
  const outer='Use the column-row expansion of AB to express this product as a sum of matrix products.';
  put(q13,17,outer+'\nA =\n[4 −3]\n[2 −1]\nB =\n[ 0 1 2]\n[−2 3 1]');
  put(q13,18,outer+'\nA =\n[0 −2]\n[4 −3]\nB =\n[ 1 4 1]\n[−3 0 2]');
  put(q13,19,outer+'\nA =\n[1 2 3]\n[4 5 6]\nB =\n[1 2]\n[3 4]\n[5 6]');
  put(q13,20,outer+'\nA =\n[0  4 2]\n[1 −2 5]\nB =\n[2 −1]\n[4  0]\n[1 −1]');
  const example5=`Referenced system from Example 5 of Section 1.2:
x₁ + 3x₂ − 2x₃ + 2x₅ = 0
2x₁ + 6x₂ − 5x₃ − 2x₄ + 4x₅ − 3x₆ = −1
5x₃ + 10x₄ + 15x₆ = 5
2x₁ + 6x₂ + 8x₄ + 4x₅ + 18x₆ = 6`;
  put(q13,21,`For the linear system in Example 5 of Section 1.2, express the general solution that we obtained in that example as a linear combination of column vectors that contain only numerical entries. [Suggestion: Rewrite the general solution as a single column vector, then write that column vector as a sum of column vectors each of which contains at most one parameter, and then factor out the parameters.]
${example5}`);
  put(q13,22,`Follow the directions of Exercise 21 for the linear system in Example 6 of Section 1.2.
Directions from Exercise 21: Express the general solution as a linear combination of column vectors that contain only numerical entries. Rewrite it as a single column vector, split the constant and parameter terms, and factor out the parameters.
Referenced system from Example 6:
x₁ + 3x₂ − 2x₃ + 2x₅ = 0
2x₁ + 6x₂ − 5x₃ − 2x₄ + 4x₅ − 3x₆ = 0
5x₃ + 10x₄ + 15x₆ = 0
2x₁ + 6x₂ + 8x₄ + 4x₅ + 18x₆ = 0`);
  put(q13,23,'Solve the matrix equation for a, b, c, and d.\n[a     3  ] = [4        d − 2c]\n[−1 a + b]   [d + 2c     −2 ]');
  put(q13,24,'Solve the matrix equation for a, b, c, and d.\n[a − b  b + a] = [8 1]\n[3d + c 2d − c]   [7 6]');
  put(q13,25,'(a) Show that if A has a row of zeros and B is any matrix for which AB is defined, then AB also has a row of zeros.\n(b) Find a similar result involving a column of zeros.');
  put(q13,26,'In each part, find a 6 × 6 matrix [aᵢⱼ] that satisfies the stated condition. Make your answers as general as possible by using letters rather than specific numbers for the nonzero entries.\n(a) aᵢⱼ = 0 if i ≠ j\n(b) aᵢⱼ = 0 if i > j\n(c) aᵢⱼ = 0 if i < j\n(d) aᵢⱼ = 0 if |i − j| > 1');
  put(q13,27,'How many 3 × 3 matrices A can you find for which the equation is satisfied for all choices of x, y, and z?\nA(x, y, z)ᵀ = (x + y, x − y, 0)ᵀ');
  put(q13,28,'How many 3 × 3 matrices A can you find for which the equation is satisfied for all choices of x, y, and z?\nA(x, y, z)ᵀ = (xy, 0, 0)ᵀ');
  put(q13,29,`A matrix B is said to be a square root of a matrix A if BB = A.
(a) Find two square roots of A =
[2 2]
[2 2].
(b) How many different square roots can you find of A =
[5 0]
[0 9]?
(c) Do you think that every 2 × 2 matrix has at least one square root? Explain your reasoning.`);
  put(q13,30,'Let 0 denote a 2 × 2 matrix, each of whose entries is zero.\n(a) Is there a 2 × 2 matrix A such that A ≠ 0 and AA = 0? Justify your answer.\n(b) Is there a 2 × 2 matrix A such that A ≠ 0 and AA = A? Justify your answer.');
  put(q13,31,'Establish Formula (11) by using Formula (5) to show that\n(AB)ᵢⱼ = (c₁r₁ + c₂r₂ + ⋯ + cᵣrᵣ)ᵢⱼ.\nReferenced notation: A is m × r and B is r × n; cₖ is column k of A and rₖ is row k of B. Formula (5): (AB)ᵢⱼ = Σₖ₌₁ʳ aᵢₖbₖⱼ. Formula (11): AB = c₁r₁ + ⋯ + cᵣrᵣ.');
  put(q13,32,'Find a 4 × 4 matrix A = [aᵢⱼ] whose entries satisfy the stated condition.\n(a) aᵢⱼ = i + j\n(b) aᵢⱼ = iʲ⁻¹\n(c) aᵢⱼ = 1 if |i − j| > 1, and aᵢⱼ = −1 if |i − j| ≤ 1.');
  put(q13,33,`Suppose that type I items cost $1 each, type II items cost $2 each, and type III items cost $3 each. Also, suppose that the accompanying table describes the number of items of each type purchased during the first four months of the year.
Table Ex-33: columns Type I, Type II, Type III.
Jan.: 3, 4, 3
Feb.: 5, 6, 0
Mar.: 2, 9, 4
Apr.: 1, 1, 7
What information is represented by the following product?
[3 4 3]
[5 6 0] × (1, 2, 3)ᵀ
[2 9 4]
[1 1 7]`);
  put(q13,34,`The accompanying table shows a record of May and June unit sales for a clothing store. Let M denote the 4 × 3 matrix of May sales and J the 4 × 3 matrix of June sales.
(a) What does the matrix M + J represent?
(b) What does the matrix M − J represent?
(c) Find a column vector x for which Mx provides a list of the number of shirts, jeans, suits, and raincoats sold in May.
(d) Find a row vector y for which yM provides a list of the number of small, medium, and large items sold in May.
(e) Using the matrices x and y that you found in parts (c) and (d), what does yMx represent?
Table Ex-34: columns Small, Medium, Large.
May sales:
Shirts: 45, 60, 75
Jeans: 30, 30, 40
Suits: 12, 65, 45
Raincoats: 15, 40, 35
June sales:
Shirts: 30, 33, 40
Jeans: 21, 23, 25
Suits: 9, 12, 11
Raincoats: 8, 10, 9`);
  put(q13,35,'Prove: If A and B are n × n matrices, then\ntr(A + B) = tr(A) + tr(B).');
  put(q13,36,'(a) Prove: If AB and BA are both defined, then AB and BA are square matrices.\n(b) Prove: If A is an m × n matrix and A(BA) is defined, then B is an n × m matrix.');
  put(q13,'TF','In parts (a)–(o) determine whether the statement is true or false, and justify your answer.\n'+parts([
    'The matrix\n[1 2 3]\n[4 5 6]\nhas no main diagonal.',
    'An m × n matrix has m column vectors and n row vectors.',
    'If A and B are 2 × 2 matrices, then AB = BA.',
    'The ith row vector of a matrix product AB can be computed by multiplying A by the ith row vector of B.',
    'For every matrix A, it is true that (Aᵀ)ᵀ = A.',
    'If A and B are square matrices of the same order, then tr(AB) = tr(A)tr(B).',
    'If A and B are square matrices of the same order, then (AB)ᵀ = AᵀBᵀ.',
    'For every square matrix A, it is true that tr(Aᵀ) = tr(A).',
    'If A is a 6 × 4 matrix and B is an m × n matrix such that BᵀAᵀ is a 2 × 6 matrix, then m = 4 and n = 2.',
    'If A is an n × n matrix and c is a scalar, then tr(cA) = c tr(A).',
    'If A, B, and C are matrices of the same size such that A − C = B − C, then A = B.',
    'If A, B, and C are square matrices of the same order such that AC = BC, then A = B.',
    'If AB + BA is defined, then A and B are square matrices of the same size.',
    'If B has a column of zeros, then so does AB if this product is defined.',
    'If B has a column of zeros, then so does BA if this product is defined.'
  ]));
  put(q13,'T1',`(a) Compute the product AB of the matrices in Example 5, and compare your answer to that in the text.
(b) Use your technology utility to extract the columns of A and the rows of B, and then calculate the product AB by a column-row expansion.
Matrices from Example 5:
A =
[1 2 4]
[2 6 0]
B =
[4  1 4 3]
[0 −1 3 1]
[2  7 5 2]`);

  // Section 1.4: original questions, with their common data included.
  const data14=`A =
[3 −1]
[2  4]
B =
[0  2]
[1 −4]
C =
[ 4  1]
[−3 −2]
a = 4, b = −7.`;
  put(q14,1,'Verify that the following matrices and scalars satisfy the stated properties of Theorem 1.4.1.\n'+data14+'\n'+parts(['The associative law for matrix addition.','The associative law for matrix multiplication.','The left distributive law.','(a + b)C = aC + bC']),{reference:'Associative addition: A+(B+C)=(A+B)+C. Associative multiplication: A(BC)=(AB)C. Left distributive law: A(B+C)=AB+AC.'});
  put(q14,2,'Verify that the following matrices and scalars satisfy the stated properties of Theorem 1.4.1.\n'+data14+'\n'+parts(['a(BC) = (aB)C = B(aC)','A(B − C) = AB − AC','(B + C)A = BA + CA','a(bC) = (ab)C']));
  put(q14,3,'Verify that the matrices and scalars in Exercise 1 satisfy the stated properties.\n'+data14+'\n'+parts(['(Aᵀ)ᵀ = A','(AB)ᵀ = BᵀAᵀ']));
  put(q14,4,'Verify that the matrices and scalars in Exercise 1 satisfy the stated properties.\n'+data14+'\n'+parts(['(A + B)ᵀ = Aᵀ + Bᵀ','(aC)ᵀ = aCᵀ']));
  const inverseData=['A =\n[2 −3]\n[4  4]','B =\n[3 1]\n[5 2]','C =\n[2 0]\n[0 3]','D =\n[ 6  4]\n[−2 −1]'];
  const inverseRule='Theorem 1.4.5: A 2 × 2 matrix [a b; c d] is invertible exactly when ad − bc ≠ 0. Its inverse is (1/(ad − bc))[d −b; −c a].';
  inverseData.forEach((v,i)=>put(q14,i+5,'Use Theorem 1.4.5 to compute the inverse of the matrix.\n'+v,{reference:inverseRule}));
  put(q14,9,'Find the inverse of\n[(eˣ + e⁻ˣ)/2  (eˣ − e⁻ˣ)/2]\n[(eˣ − e⁻ˣ)/2  (eˣ + e⁻ˣ)/2]');
  put(q14,10,'Find the inverse of\n[ cos θ  sin θ]\n[−sin θ  cos θ]');
  ['(Aᵀ)⁻¹ = (A⁻¹)ᵀ','(A⁻¹)⁻¹ = A','(ABC)⁻¹ = C⁻¹B⁻¹A⁻¹','(ABC)ᵀ = CᵀBᵀAᵀ'].forEach((v,i)=>put(q14,i+11,'Verify that the equation is valid for the matrices in Exercises 5–8.\n'+v,{reference:inverseData.join('\n')}));
  ['(7A)⁻¹ =\n[−3  7]\n[ 1 −2]','(5Aᵀ)⁻¹ =\n[−3 −1]\n[ 5  2]','(I + 2A)⁻¹ =\n[−1 2]\n[ 4 5]','A⁻¹ =\n[2 −1]\n[3  5]'].forEach((v,i)=>put(q14,i+15,'Use the given information to find A.\n'+v));
  const powerData=['A =\n[3 1]\n[2 1]','A =\n[2 0]\n[4 1]'];
  powerData.forEach((v,i)=>{
    put(q14,i+19,'Compute the following using the given matrix A.\n'+v+'\n'+parts(['A³','A⁻³','A² − 2A + I']));
    put(q14,i+21,'Compute p(A) for the given matrix A and the following polynomials.\n'+v+'\n'+parts(['p(x) = x − 2','p(x) = 2x² − x + 1','p(x) = x³ − 2x + 1']));
  });
  const commuteData='Let\nA =\n[a b]\n[c d]\nB =\n[0 1]\n[0 0]\nC =\n[0 0]\n[1 0]';
  put(q14,23,commuteData+'\nFind all values of a, b, c, and d (if any) for which the matrices A and B commute.');
  put(q14,24,commuteData+'\nFind all values of a, b, c, and d (if any) for which the matrices A and C commute.');
  ['3x₁ − 2x₂ = −1\n4x₁ + 5x₂ = 3','−x₁ + 5x₂ = 4\n−x₁ − 3x₂ = 1','6x₁ + x₂ = 0\n4x₁ − 3x₂ = −2','2x₁ − 2x₂ = 4\nx₁ + 4x₂ = 4'].forEach((v,i)=>put(q14,i+25,'Use the method of Example 8 to find the unique solution of the given linear system.\n'+v,{reference:'Example 8 uses the inverse method: write the system as Ax = b, calculate A⁻¹, and multiply to obtain x = A⁻¹b.'}));
  const factorData='If a polynomial p(x) can be factored as a product of lower degree polynomials, say p(x) = p₁(x)p₂(x), and if A is a square matrix, then it can be proved that p(A) = p₁(A)p₂(A).\nVerify this statement for the stated matrix A and polynomials p(x) = x² − 9, p₁(x) = x + 3, p₂(x) = x − 3.';
  put(q14,29,factorData+'\nThe matrix A in Exercise 21.',{reference:powerData[0]});
  put(q14,30,factorData+'\nAn arbitrary square matrix A.');
  put(q14,31,'(a) Give an example of two 2 × 2 matrices such that (A + B)(A − B) ≠ A² − B².\n(b) State a valid formula for multiplying out (A + B)(A − B).\n(c) What condition can you impose on A and B that will allow you to write (A + B)(A − B) = A² − B²?');
  put(q14,32,'The numerical equation a² = 1 has exactly two solutions. Find at least eight solutions of the matrix equation A² = I₃. [Hint: Look for solutions in which all entries off the main diagonal are zero.]');
  put(q14,33,'(a) Show that if a square matrix A satisfies the equation A² + 2A + I = 0, then A must be invertible. What is the inverse?\n(b) Show that if p(x) is a polynomial with a nonzero constant term, and if A is a square matrix for which p(A) = 0, then A is invertible.');
  put(q14,34,'Is it possible for A³ to be an identity matrix without A being invertible? Explain.');
  put(q14,35,'Can a matrix with a row of zeros or a column of zeros have an inverse? Explain.');
  put(q14,36,'Can a matrix with two identical rows or two identical columns have an inverse? Explain.');
  ['A =\n[1 0 1]\n[1 1 0]\n[0 1 1]','A =\n[1 1 1]\n[1 0 0]\n[0 1 1]'].forEach((v,i)=>put(q14,i+37,'Determine whether A is invertible, and if so, find the inverse. [Hint: Solve AX = I for X by equating corresponding entries on the two sides.]\n'+v));
  ['(AB)⁻¹(AC⁻¹)(D⁻¹C⁻¹)⁻¹D⁻¹','(AC⁻¹)⁻¹(AC⁻¹)(AC⁻¹)⁻¹AD⁻¹'].forEach((v,i)=>put(q14,i+39,'Simplify the expression assuming that A, B, C, and D are invertible.\n'+v));
  put(q14,41,'Show that if R is a 1 × n matrix and C is an n × 1 matrix, then RC = tr(CR).');
  put(q14,42,'If A is a square matrix and n is a positive integer, is it true that (Aⁿ)ᵀ = (Aᵀ)ⁿ? Justify your answer.');
  put(q14,43,'(a) Show that if A is invertible and AB = AC, then B = C.\n(b) Explain why part (a) and Example 3 do not contradict one another.',{reference:'Example 3 uses A = [0 1; 0 2], B = [1 1; 3 4], C = [2 5; 3 4]. Here AB = AC = [3 4; 6 8], even though B ≠ C.'});
  put(q14,44,'Show that if A is invertible and k is any nonzero scalar, then (kA)ⁿ = kⁿAⁿ for all integer values of n.');
  put(q14,45,'(a) Show that if A, B, and A + B are invertible matrices with the same size, then A(A⁻¹ + B⁻¹)B(A + B)⁻¹ = I.\n(b) What does the result in part (a) tell you about the matrix A⁻¹ + B⁻¹?');
  put(q14,46,'A square matrix A is said to be idempotent if A² = A.\n(a) Show that if A is idempotent, then so is I − A.\n(b) Show that if A is idempotent, then 2A − I is invertible and is its own inverse.');
  put(q14,47,'Show that if A is a square matrix such that Aᵏ = 0 for some positive integer k, then the matrix I − A is invertible and (I − A)⁻¹ = I + A + A² + ⋯ + Aᵏ⁻¹.');
  put(q14,48,'Show that the matrix\nA =\n[a b]\n[c d]\nsatisfies the equation A² − (a + d)A + (ad − bc)I = 0.');
  put(q14,49,'Assuming that all matrices are n × n and invertible, solve for D.\nCᵀB⁻¹A²BAC⁻¹DA⁻²BᵀC⁻² = Cᵀ');
  put(q14,50,'Assuming that all matrices are n × n and invertible, solve for D.\nABCᵀDBAᵀC = ABᵀ');
  [['1.4.1(a)','A + B = B + A.'],['1.4.1(b)','A + (B + C) = (A + B) + C.'],['1.4.1(f)','A(B − C) = AB − AC.'],['1.4.1(c)','A(BC) = (AB)C.'],['1.4.2(c)','A − A = A + (−A) = 0.'],['1.4.2(b)','A − 0 = A.'],['1.4.8(d)','(kA)ᵀ = kAᵀ, where k is a scalar.'],['1.4.8(e)','(AB)ᵀ = BᵀAᵀ.']].forEach(([n,v],i)=>put(q14,i+51,'Prove the stated result: Theorem '+n+'.',{reference:'Theorem '+n+': '+v+' Assume that the matrix sizes make the indicated operations valid.'}));
  put(q14,'TF','In parts (a)–(k) determine whether the statement is true or false, and justify your answer.\n'+parts([
    'Two n × n matrices, A and B, are inverses of one another if and only if AB = BA = 0.',
    'For all square matrices A and B of the same size, it is true that (A + B)² = A² + 2AB + B².',
    'For all square matrices A and B of the same size, it is true that A² − B² = (A − B)(A + B).',
    'If A and B are invertible matrices of the same size, then AB is invertible and (AB)⁻¹ = A⁻¹B⁻¹.',
    'If A and B are matrices such that AB is defined, then it is true that (AB)ᵀ = AᵀBᵀ.',
    'The matrix A =\n[a b]\n[c d]\nis invertible if and only if ad − bc ≠ 0.',
    'If A and B are matrices of the same size and k is a constant, then (kA + B)ᵀ = kAᵀ + Bᵀ.',
    'If A is an invertible matrix, then so is Aᵀ.',
    'If p(x) = a₀ + a₁x + a₂x² + ⋯ + aₘxᵐ and I is an identity matrix, then p(I) = a₀ + a₁ + a₂ + ⋯ + aₘ.',
    'A square matrix containing a row or column of zeros cannot be invertible.',
    'The sum of two invertible matrices of the same size must be invertible.'
  ]));
  put(q14,'T1','Let A be the matrix\nA =\n[ 0   1/2 1/3]\n[1/4   0  1/5]\n[1/6  1/7  0 ]\nDiscuss the behavior of Aᵏ as k increases indefinitely, that is, as k → ∞.');
  put(q14,'T2','In each part use your technology utility to make a conjecture about the form of Aⁿ for positive integer powers of n.\n(a) A =\n[a 1]\n[0 a]\n(b) A =\n[ cos θ  sin θ]\n[−sin θ  cos θ]');
  put(q14,'T3',`The Fibonacci sequence (named for the Italian mathematician Leonardo Fibonacci 1170–1250) is
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …
the terms of which are commonly denoted as F₀, F₁, F₂, F₃, …, Fₙ, … .
After the initial terms F₀ = 0 and F₁ = 1, each term is the sum of the previous two; that is, Fₙ = Fₙ₋₁ + Fₙ₋₂.
Confirm that if
Q =
[F₂ F₁] = [1 1]
[F₁ F₀]   [1 0]
then
Qⁿ =
[Fₙ₊₁ Fₙ]
[Fₙ   F₀]`);

  // The explanations below are original teaching notes, separate from the book's wording.
  const teach=(set,n,steps,answer)=>Object.assign(set[n],{steps,...(answer===undefined?{}:{answer})});
  const existing=(section,n)=>window.EmberTextbook?.solutions?.[section]?.find(q=>String(q.number)===String(n));
  const q4=existing('1.3',4);
  if(q4){
    const start=q4.steps.indexOf('Part a:'),end=q4.steps.indexOf('Part c:');
    q13[4].steps=[...q4.steps.slice(0,start),
      'Part a: A has size 3 × 2, so Aᵀ has size 2 × 3. Transpose first: Aᵀ = [3 −1 1; 0 2 1]. This has the same size as C, so the addition is allowed.',
      'Double each entry: 2Aᵀ = [6 −2 2; 0 4 2]. Add the matching entries of C: [6+1, −2+4, 2+2; 0+3, 4+1, 2+5] = [7 2 4; 3 5 7].',
      'Part b: Turn each row of D and E into a column. Dᵀ = [1 −1 3; 5 0 2; 2 1 4] and Eᵀ = [6 −1 4; 1 1 1; 3 2 3].',
      'Subtract matching entries: Dᵀ−Eᵀ = [−5 0 −1; 4 −1 1; −1 −1 1]. As a check, this must equal (D−E)ᵀ in part c.',
      ...q4.steps.slice(end)];
    q13[4].answer=q4.answer.split('\n').map((line,i)=>i===0?'a: [7 2 4; 3 5 7]':i===1?'b: [−5 0 −1; 4 −1 1; −1 −1 1]':line).join('\n');
  }
  teach(q13,15,[
    'Begin on the right: multiply the 3 × 3 matrix by the column (k,1,1)ᵀ. One row at a time gives k+1, k+2, and 2−3=−1. The result is (k+1,k+2,−1)ᵀ.',
    'Multiply the remaining row by that column: k(k+1)+1(k+2)+1(−1). The result is a single number, which the question requires to be zero.',
    'Expand and collect like terms: k²+k+k+2−1 = k²+2k+1 = (k+1)².',
    'A square equals zero only when the number being squared is zero. Therefore k+1=0, giving k=−1. Check: at k=−1 the intermediate column is (0,1,−1)ᵀ and the final product is 0+1−1=0.'
  ],'k = −1.');
  teach(q13,16,[
    'Start with the matrix times the right column. Its rows give 2+4=6, 4+3k, and 6+k. Thus the intermediate column is (6,4+3k,6+k)ᵀ.',
    'Multiply by the left row (2,2,k): 2·6 + 2(4+3k) + k(6+k). Set this scalar equal to zero.',
    'Expand: 12+8+6k+6k+k² = k²+12k+20. We need two numbers whose sum is 12 and product is 20: 2 and 10. Hence (k+2)(k+10)=0.',
    'A product of real numbers is zero when at least one factor is zero. Solve k+2=0 or k+10=0. Substitution gives 4−24+20=0 and 100−120+20=0, so both values check.'
  ],'k = −2 or k = −10.');
  [21,22].forEach(n=>{
    const h=n===22,constant=h?'0':'1/3';
    const vector=(h?'':'(0,0,0,0,0,1/3)ᵀ + ')+'r(−3,1,0,0,0,0)ᵀ + s(−4,0,−2,1,0,0)ᵀ + t(−2,0,0,0,1,0)ᵀ';
    teach(q13,n,[
      'The example reduces the system to x₁+3x₂+4x₄+2x₅=0, x₃+2x₄=0, and x₆='+constant+'. The variables x₂, x₄, and x₅ are free: choosing them determines the others.',
      'Call the free choices r, s, and t: x₂=r, x₄=s, x₅=t. Solve the first two equations for x₁=−3r−4s−2t and x₃=−2s. Keep x₆='+constant+'.',
      'Put these six coordinates in their original order: x=(−3r−4s−2t, r, −2s, s, t, '+constant+')ᵀ. The superscript T means that the listed coordinates form a column.',
      'Collect the coefficient of r from each position: (−3,1,0,0,0,0)ᵀ. Do the same for s and t, obtaining (−4,0,−2,1,0,0)ᵀ and (−2,0,0,0,1,0)ᵀ. Each of these vectors now contains numbers only.',
      h?'There is no constant vector because every coordinate is zero when r=s=t=0. Multiply each numerical vector by its parameter and add them.':'The sixth coordinate 1/3 does not contain a parameter. Keep it in the constant vector (0,0,0,0,0,1/3)ᵀ, with coefficient 1, then add the three parameter vectors.',
      'Check the construction by reading its first coordinate: it is −3r−4s−2t. Its second, fourth, and fifth coordinates are r, s, and t. This recovers exactly the general solution, for every real choice of the three parameters.'
    ],'x = '+vector+', where r, s, t are arbitrary real numbers.');
  });
  teach(q13,23,[
    'Equal matrices have equal entries in each matching position. Reading top-left, top-right, bottom-left, and bottom-right gives a=4, d−2c=3, d+2c=−1, and a+b=−2.',
    'Substitute a=4 into a+b=−2. Subtract 4 from both sides to get b=−6.',
    'Add d−2c=3 and d+2c=−1. The c terms cancel, leaving 2d=2, so d=1.',
    'Put d=1 into d+2c=−1: 1+2c=−1, so 2c=−2 and c=−1. Check the other equation: 1−2(−1)=3.'
  ],'a=4, b=−6, c=−1, d=1.');
  teach(q13,24,[
    'Match the four positions to obtain a−b=8, a+b=1, 3d+c=7, and 2d−c=6. This creates two independent pairs of equations.',
    'Add a−b=8 and a+b=1. The b terms cancel, giving 2a=9 and a=9/2. Then b=1−a=−7/2.',
    'Add 3d+c=7 and 2d−c=6. The c terms cancel, giving 5d=13 and d=13/5. Then c=7−3d=35/5−39/5=−4/5.',
    'Check all four positions: 9/2−(−7/2)=8; 9/2+(−7/2)=1; 39/5−4/5=7; and 26/5−(−4/5)=6.'
  ],'a=9/2, b=−7/2, c=−4/5, d=13/5.');
  teach(q13,25,[
    'Part a: call the zero row of A row i. To calculate any entry in row i of AB, multiply that row by a column of B and add the results.',
    'Every multiplication has a zero from A: 0·b₁ⱼ+0·b₂ⱼ+⋯=0. This is true for every column j, so the whole ith row of AB is zero.',
    'Part b: the matching statement is about a zero column in the RIGHT factor B. Suppose its jth column is zero. The jth column of AB is A times that zero column.',
    'Every resulting entry is a sum aᵢ₁·0+aᵢ₂·0+⋯=0. Therefore the jth column of AB is zero. The side matters: a zero column of A alone does not guarantee a zero column in AB.'
  ],'(a) Every zero row of A remains a zero row in AB. (b) Every zero column of B remains a zero column in AB.');
  const patterns=[['a','diagonal',(i,j)=>i===j],['b','upper triangular',(i,j)=>i<=j],['c','lower triangular',(i,j)=>i>=j],['d','tridiagonal',(i,j)=>Math.abs(i-j)<=1]];
  q13[26].answer=patterns.map(([letter,name,allow])=>'('+letter+') '+name+':\n'+Array.from({length:6},(_,i)=>'['+Array.from({length:6},(_,j)=>allow(i,j)?'a'+(i+1)+(j+1):'0').join(' ')+']').join('\n')).join('\n\n')+'\nEvery displayed aᵢⱼ can be chosen independently, including zero.';
  teach(q13,26,[
    'Read aᵢⱼ as the entry in row i, column j. For example a₂₅ means row 2, column 5. A condition tells us where a zero is compulsory; every other position can contain an independent letter.',
    'Part a: i≠j means the row and column numbers differ. Put zero everywhere except a₁₁,a₂₂,…,a₆₆, the main diagonal.',
    'Part b: i>j means the row number is greater, so the position lies below the diagonal. Set these positions to zero; leave the diagonal and everything above it free.',
    'Part c: i<j means a position above the diagonal. Set these positions to zero; leave the diagonal and everything below it free.',
    'Part d: |i−j| is the distance in index numbers from the diagonal. Keep a letter when that distance is 0 or 1; use zero when it is 2 or more. For instance a₂₃ is allowed but a₂₅ must be zero.'
  ]);
  teach(q13,27,[
    'A matrix acts on a column by taking one weighted sum per row. Its first output must therefore have the form a₁₁x+a₁₂y+a₁₃z.',
    'Compare that with x+y. The coefficients must be 1 for x, 1 for y, and 0 for z, so the first row is (1,1,0).',
    'Repeat for x−y to get row 2=(1,−1,0). The last output is always zero, so row 3=(0,0,0).',
    'To check uniqueness, use the inputs (1,0,0), (0,1,0), and (0,0,1). They reveal the three columns separately. Thus every entry is forced, and the constructed matrix works for every x,y,z.'
  ]);
  teach(q13,28,[
    'Suppose a matrix could do this. Write its first row as (a,b,c). Its first output would be ax+by+cz, and this would have to equal xy for every input.',
    'Try (x,y,z)=(1,0,0). The desired output is 0, so a=0. Try (0,1,0) to get b=0, and (0,0,1) to get c=0.',
    'These tests force the entire first row to zero, so its output would always be zero.',
    'Now test (1,1,0). The question requires xy=1, while the forced row gives 0. This contradiction proves that no matrix works. A fixed matrix can add weighted coordinates, but it cannot multiply two input coordinates together.'
  ]);
  teach(q13,31,[
    'To prove two matrices equal, show that an arbitrary matching entry is equal. Choose row i and column j; the word arbitrary means the argument works for every permitted i and j.',
    'Formula (5) gives (AB)ᵢⱼ=aᵢ₁b₁ⱼ+aᵢ₂b₂ⱼ+⋯+aᵢᵣbᵣⱼ. The symbol Σ is a short way to write this repeated sum.',
    'Column cₖ of A has entry aᵢₖ in row i. Row rₖ of B has entry bₖⱼ in column j. Their column-times-row product has entry (cₖrₖ)ᵢⱼ=aᵢₖbₖⱼ.',
    'Add these products for k=1,…,r. The entry becomes exactly the sum from Formula (5). Thus every entry agrees and AB=c₁r₁+⋯+cᵣrᵣ.'
  ],'AB = c₁r₁ + c₂r₂ + ⋯ + cᵣrᵣ.');
  teach(q13,33,[
    'Each row lists quantities for one month. The price column gives the price of one item of each type, in the same order. A quantity times its price is money spent on that type.',
    'For January multiply the matching entries and add: 3·$1 + 4·$2 + 3·$3 = $3+$8+$9 = $20.',
    'Repeat for February: 5·$1+6·$2+0·$3=$17. March: 2·$1+9·$2+4·$3=$32. April: 1·$1+1·$2+7·$3=$24.',
    'The product has four rows and one column, one dollar total for each month. Its order stays January, February, March, April; it records spending, not the number of items.'
  ],'The product is ($20, $17, $32, $24)ᵀ: total spending in January, February, March, and April, respectively.');
  teach(q13,35,[
    'The trace means adding the main diagonal of a square matrix. Write tr(A)=a₁₁+⋯+aₙₙ and tr(B)=b₁₁+⋯+bₙₙ.',
    'Matrix addition combines matching positions, so the ith diagonal entry of A+B is aᵢᵢ+bᵢᵢ.',
    'Add those diagonal entries: tr(A+B)=(a₁₁+b₁₁)+⋯+(aₙₙ+bₙₙ).',
    'Rearrange this finite sum of ordinary numbers to (a₁₁+⋯+aₙₙ)+(b₁₁+⋯+bₙₙ). These are precisely tr(A) and tr(B), proving the identity.'
  ]);
  teach(q13,36,[
    'Part a: let A have m rows and n columns, and B have p rows and q columns. Matrix multiplication requires the column count of the left matrix to match the row count of the right matrix.',
    'AB exists, so n=p. BA exists, so q=m. Substitute these equalities: AB has size m × m and BA has size n × n. Each therefore has equally many rows and columns.',
    'Part b: start inside the brackets of A(BA). If B is p × q, the product BA can exist only when q=m, since A is m × n. The product BA then has size p × n.',
    'For A times this p × n product to exist, A’s n columns must match its p rows. Hence p=n. With q=m, B has the required size n × m.'
  ]);
  const M=window.EmberAlgebra;
  const show=a=>a.map(row=>'['+row.map(v=>M.format(v)).join(' ')+']').join('\n');
  [[[2,-3],[4,4]],[[3,1],[5,2]],[[2,0],[0,3]],[[6,4],[-2,-1]]].forEach((a,i)=>{
    const [[u,v],[w,z]]=a,det=u*z-v*w,inv=[[z/det,-v/det],[-w/det,u/det]],name='ABCD'[i];
    teach(q14,i+5,[
      'An inverse undoes multiplication by the original matrix: '+name+'·'+name+'⁻¹ must equal I₂=[1 0; 0 1]. For a 2 × 2 matrix we can use the formula given in the reference.',
      'Read the four entries in row order as a='+u+', b='+v+', c='+w+', d='+z+'. Compute the determinant ad−bc=('+u+')('+z+')−('+v+')('+w+')='+det+'. It is nonzero, so division is allowed and the inverse exists.',
      'Swap the diagonal entries a and d. Change the signs of b and c. Before dividing, the matrix is '+show([[z,-v],[-w,u]])+'.',
      'Divide EVERY entry by '+det+' to obtain '+show(inv)+'. For instance, the top-left entry becomes '+z+'/'+det+'='+M.format(z/det)+'.',
      'Check by row-times-column multiplication. The product of the original matrix and this candidate is '+show(M.multiply(a,inv))+'. Reversing the factors also gives '+show(M.multiply(inv,a))+', so this candidate really is the inverse.'
    ],name+'⁻¹ =\n'+show(inv));
  });
  teach(q14,10,[
    'Use the inverse formula for a 2 × 2 matrix. Here a=d=cos θ, b=sin θ, and c=−sin θ. The angle θ can be any real angle.',
    'Calculate ad−bc = cos²θ−(sin θ)(−sin θ) = cos²θ+sin²θ = 1. The last equality is the basic trigonometric identity, so the determinant is never zero.',
    'Swap a and d; they are equal, so the diagonal stays unchanged. Negate b and c, giving top-right −sin θ and bottom-left sin θ. Dividing by 1 changes nothing.',
    'Check the product: each diagonal entry is cos²θ+sin²θ=1, and each off-diagonal entry cancels to 0. The inverse therefore reverses the original rotation.'
  ],'Inverse = [cos θ −sin θ; sin θ cos θ].');
  teach(q14,23,[
    'Commute means that switching the multiplication order leaves the result unchanged: AB=BA. We must calculate both products because this is not true for matrices in general.',
    'Multiply rows of A by columns of B. This gives AB=[0 a; 0 c]. In the other order, BA=[c d; 0 0].',
    'Match the four positions. Top-left gives 0=c; top-right gives a=d; bottom-left gives 0=0; bottom-right repeats c=0.',
    'No equation restricts a or b. Thus choose any real a,b and set c=0,d=a. Substitution gives AB=BA=[0 a; 0 0], confirming that every such choice works.'
  ],'All solutions: A=[a b; 0 a], with a and b arbitrary real numbers. Equivalently, c=0 and d=a.');
  teach(q14,24,[
    'The matrices commute exactly when AC=CA. Calculate both orders using row-times-column multiplication.',
    'AC=[b 0; d 0], whereas CA=[0 0; a b]. Equal matrices must agree in each of their four positions.',
    'Top-left gives b=0, bottom-left gives d=a, bottom-right repeats b=0, and top-right gives the automatic equality 0=0.',
    'There is no condition on a or c. Choose them freely, put b=0,d=a, and check: both products become [0 0; a 0].'
  ],'All solutions: A=[a 0; c a], with a and c arbitrary real numbers. Equivalently, b=0 and d=a.');
  teach(q14,30,[
    'A constant in a matrix polynomial means that constant times the identity. Therefore p(A)=A²−9I, p₁(A)=A+3I, and p₂(A)=A−3I.',
    'Expand (A+3I)(A−3I) by multiplying each term in the first bracket by each term in the second, keeping the order: A²−3AI+3IA−9I².',
    'The identity acts like 1 in multiplication: AI=IA=A and I²=I. Substitute these facts to obtain A²−3A+3A−9I.',
    'The middle terms cancel because they are opposites of the same matrix. What remains is A²−9I, exactly p(A). This argument works for every square A.'
  ]);
  teach(q14,31,[
    'Part a: choose A=[1 0; 0 0] and B=[0 1; 0 0]. Squaring gives A²=A and B²=0. Their mixed products are AB=B and BA=0, so the order matters.',
    'For this example, (A+B)(A−B)=[1 −1; 0 0], but A²−B²=[1 0; 0 0]. Their top-right entries differ, giving the requested counterexample.',
    'Part b: expand in order: A·A + A·(−B) + B·A + B·(−B) = A²−AB+BA−B². Do not combine AB with BA unless they are equal.',
    'Part c: the extra terms disappear exactly when −AB+BA=0, that is, AB=BA. This condition is called commutativity of these two matrices.'
  ],'(a) A=[1 0; 0 0], B=[0 1; 0 0] gives unequal products. (b) (A+B)(A−B)=A²−AB+BA−B². (c) Require AB=BA.');
  teach(q14,32,[
    'Follow the hint and let A be diagonal: A=diag(r,s,t). This notation means r,s,t on the diagonal and zeros in all other positions.',
    'Squaring a diagonal matrix squares each diagonal entry: A²=diag(r²,s²,t²). To obtain I₃, each of r²,s²,t² must be 1.',
    'Each of r,s,t may independently be +1 or −1. There are 2 choices for the first, 2 for the second, and 2 for the third: 2·2·2=8 matrices.',
    'List the eight sign choices shown in the answer. Squaring any one gives diagonal entries 1,1,1 and still-zero off-diagonal entries. These provide eight solutions; the question does not ask us to classify every possible solution.'
  ],'Eight solutions are diag(1,1,1), diag(1,1,−1), diag(1,−1,1), diag(1,−1,−1), diag(−1,1,1), diag(−1,1,−1), diag(−1,−1,1), and diag(−1,−1,−1).');
  teach(q14,33,[
    'Part a: an inverse is a matrix X for which AX=XA=I. Start from A²+2A+I=0 and move I to the right: A²+2A=−I.',
    'Multiply by −1: −A²−2A=I. Factor A out to get A(−A−2I)=I. Factoring it on the other side also gives (−A−2I)A=I because IA=AI=A.',
    'Therefore the candidate −A−2I is the inverse. We established both defining products without first assuming that an inverse exists.',
    'Part b: write p(A)=a₀I+a₁A+a₂A²+⋯+aₘAᵐ=0, with a₀≠0. Separate the constant: A(a₁I+a₂A+⋯+aₘAᵐ⁻¹)=−a₀I.',
    'Divide by the nonzero number −a₀. The matrix X=−(1/a₀)(a₁I+a₂A+⋯+aₘAᵐ⁻¹) then satisfies AX=I.',
    'Every term in X is a power of A or a multiple of I, so AX=XA. Hence XA=I as well. This proves invertibility and gives an explicit inverse.'
  ],'(a) A⁻¹=−A−2I. (b) If p(x)=a₀+a₁x+⋯+aₘxᵐ and a₀≠0, then A⁻¹=−(1/a₀)(a₁I+a₂A+⋯+aₘAᵐ⁻¹).');
  teach(q14,34,[
    'To be invertible, A needs a matrix that multiplies it to I in both orders. We are told that multiplying three copies of A gives I.',
    'Group the three copies as A(A²). This shows A·A²=I, so A² is already a candidate for the inverse.',
    'Group them instead as (A²)A. This gives A²·A=I as well. The candidate passes both checks.',
    'Consequently A³=I forces A to be invertible, with A⁻¹=A². The situation asked about is impossible.'
  ]);
  teach(q14,35,[
    'Suppose an inverse B existed. Then both AB and BA would have to equal the identity, whose diagonal entries are all 1.',
    'If A has a zero row, the matching row of AB is zero: every row-times-column calculation contains only 0 times another entry.',
    'A zero row cannot be a row of the identity because each identity row has a 1. Thus a zero row makes AB=I impossible.',
    'If instead A has a zero column, examine BA. That column of BA is B times the zero column, hence zero. Every identity column has a 1, so BA=I is impossible too.'
  ],'No. A zero row prevents AB=I; a zero column prevents BA=I.');
  teach(q14,36,[
    'An inverse B must produce both AB=I and BA=I. Compare what multiplication does to repeated rows or columns.',
    'If rows i and j of A are identical, multiplying either by each column of B gives the same numbers. Therefore rows i and j of AB remain identical.',
    'Different rows of I are never identical: their 1s are in different positions. Thus AB cannot be I when A has two equal rows.',
    'If columns i and j of A are identical, B times either column gives the same result, so columns i and j of BA are identical. Different columns of I have their 1s in different positions. Therefore this case also prevents an inverse.'
  ],'No. Repeated rows or columns remain repeated in the appropriate product, whereas the identity has no repeated rows or columns.');
  teach(q14,39,[
    'Use (XY)⁻¹=Y⁻¹X⁻¹. It reverses the order because the inverse must undo the last factor first. Thus (AB)⁻¹=B⁻¹A⁻¹ and (D⁻¹C⁻¹)⁻¹=CD.',
    'Substitute without changing any other order: B⁻¹A⁻¹AC⁻¹CDD⁻¹.',
    'The adjacent A⁻¹A equals I, leaving B⁻¹C⁻¹CDD⁻¹. Next the adjacent C⁻¹C equals I, leaving B⁻¹DD⁻¹.',
    'Finally DD⁻¹=I, so the result is B⁻¹. All cancellations used neighboring inverse pairs; no unlicensed factor swaps were needed.'
  ]);
  teach(q14,40,[
    'Call AC⁻¹ by the shorter name X. The expression is X⁻¹XX⁻¹AD⁻¹. This makes the first adjacent inverse pair easy to identify.',
    'Cancel X⁻¹X=I. What remains is X⁻¹AD⁻¹=(AC⁻¹)⁻¹AD⁻¹.',
    'Reverse the factor order when taking the inverse: (AC⁻¹)⁻¹=CA⁻¹. Substitute to obtain CA⁻¹AD⁻¹.',
    'Cancel the adjacent A⁻¹A=I. The remaining product is CD⁻¹, in that order.'
  ]);
  teach(q14,41,[
    'Write R=(r₁,…,rₙ) and C=(c₁,…,cₙ)ᵀ. Their product RC has size 1 × 1, so we identify it with its single numerical entry.',
    'Row-times-column multiplication gives RC=r₁c₁+⋯+rₙcₙ.',
    'In the other order, CR has size n × n. Its diagonal entry in position (i,i) is cᵢrᵢ. The trace adds these diagonal entries: tr(CR)=c₁r₁+⋯+cₙrₙ.',
    'Ordinary real numbers commute: cᵢrᵢ=rᵢcᵢ. Thus the two sums are identical, proving the claimed equality.'
  ]);
  teach(q14,42,[
    'A positive integer power Aⁿ means a product of n copies of A. For instance A³=AAA.',
    'Transposing a product reverses the factor order and transposes each factor: (AB)ᵀ=BᵀAᵀ. For three copies this gives (AAA)ᵀ=AᵀAᵀAᵀ.',
    'Apply the same rule repeatedly to n copies. The order reverses, but every factor is the same A, so the result is still n copies of Aᵀ.',
    'A product of n copies of Aᵀ is exactly (Aᵀ)ⁿ. Hence the statement is true for every positive integer n.'
  ]);
  teach(q14,43,[
    'Part a: multiply both sides of AB=AC on the LEFT by A⁻¹. This is allowed because A is assumed invertible, and using the same operation preserves equality.',
    'Regroup to get (A⁻¹A)B=(A⁻¹A)C. Since A⁻¹A=I, this becomes IB=IC and then B=C.',
    'Part b: Example 3 uses A=[0 1; 0 2]. Its determinant is 0·2−1·0=0, so it is not invertible.',
    'The proof in part a cannot be applied to that example because there is no A⁻¹. Indeed its different B and C give the same product [3 4; 6 8]. The example and the theorem have different assumptions, so they are consistent.'
  ],'(a) B=C when A is invertible. (b) The common factor A in Example 3 is not invertible, so part (a) does not apply.');
  teach(q14,44,[
    'Split all integer exponents into three cases: positive, zero, and negative. This is necessary because negative powers involve an inverse.',
    'If n>0, expand (kA)ⁿ as n factors (kA). Scalars may be moved past matrices, so collect the n copies of k to obtain kⁿ and the n copies of A to obtain Aⁿ.',
    'If n=0, the left side is I, and the right side is k⁰A⁰=1·I=I.',
    'If n<0, put m=−n>0. Since k≠0 and A is invertible, (kA)⁻¹=k⁻¹A⁻¹: multiplying these in either order gives I.',
    'Now (kA)ⁿ=[(kA)⁻¹]ᵐ=(k⁻¹A⁻¹)ᵐ=k⁻ᵐA⁻ᵐ=kⁿAⁿ. The positive-power result was applied to the inverse, so all integer cases are covered.'
  ]);
  teach(q14,45,[
    'Part a: distribute in A(A⁻¹+B⁻¹)B while preserving factor order: AA⁻¹B+AB⁻¹B.',
    'Cancel the neighboring inverse pairs. The first term becomes B and the second becomes A, so this part of the product is A+B.',
    'Multiplying by the remaining (A+B)⁻¹ gives (A+B)(A+B)⁻¹=I. This proves part a.',
    'Part b: to expose an inverse for the sum, factor it as A⁻¹+B⁻¹=A⁻¹(A+B)B⁻¹. Expanding the right side confirms the equality.',
    'All three factors are invertible by the assumptions. Reverse them and invert each: the inverse of A⁻¹(A+B)B⁻¹ is B(A+B)⁻¹A. Thus the sum of these two inverses is invertible under the stated assumptions.'
  ]);
  teach(q14,46,[
    'Idempotent means that doing the same matrix operation twice has the same result as doing it once: A²=A. Use this given equality whenever A² appears.',
    'Part a: expand (I−A)²=I²−IA−AI+A². Since I²=I and IA=AI=A, this is I−2A+A².',
    'Replace A² by A to obtain I−A. Therefore (I−A)²=I−A, precisely the definition of idempotence for I−A.',
    'Part b: expand (2A−I)²=4A²−2AI−2IA+I²=4A²−4A+I. Again substitute A²=A to get I.',
    'A matrix whose square is I multiplies itself to the identity in both orders. It therefore has an inverse, and that inverse is itself.'
  ]);
  teach(q14,47,[
    'To prove that I−A is invertible, test the suggested matrix S=I+A+A²+⋯+Aᵏ⁻¹. It contains k terms, ending one power before the known zero power Aᵏ.',
    'Multiply (I−A)S by distributing: S−AS. The first sum is I+A+⋯+Aᵏ⁻¹. The second is A+A²+⋯+Aᵏ.',
    'Subtract. Every middle power occurs once with a plus sign and once with a minus sign, so all cancel. The result is I−Aᵏ=I because Aᵏ=0.',
    'Check the other order too: S(I−A)=S−SA gives exactly the same cancellation because each term in S is a power of A. Thus both products equal I, proving S=(I−A)⁻¹. When k=1, the sum is just I, which also works.'
  ]);
  teach(q14,48,[
    'Compute the square by row-times-column multiplication: A²=[a²+bc, ab+bd; ac+cd, bc+d²]. For example, the upper-left entry is a·a+b·c.',
    'Multiply every entry of A by a+d: (a+d)A=[a²+ad, ab+bd; ac+cd, ad+d²].',
    'Subtract matching entries. Both off-diagonal entries become zero; each diagonal becomes bc−ad. Hence A²−(a+d)A=(bc−ad)I.',
    'Add (ad−bc)I. Its diagonal entries are the opposites of the remaining diagonal entries, so all four positions become zero. The required identity is proved.'
  ]);
  teach(q14,49,[
    'Group the known factors around D. Let L=CᵀB⁻¹A²BAC⁻¹ and R=A⁻²BᵀC⁻². Then the equation is LDR=Cᵀ. This grouping helps us isolate the unknown without changing factor order.',
    'Multiply on the left by L⁻¹ and on the right by R⁻¹. The neighboring pairs cancel, giving D=L⁻¹CᵀR⁻¹. Matrix division is performed this way because multiplying on the wrong side would generally give a different result.',
    'Invert L by reversing all its factors: L⁻¹=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹. Similarly, R⁻¹=C²(Bᵀ)⁻¹A².',
    'Substitute both expressions: D=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹CᵀC²(Bᵀ)⁻¹A². Cancel only the neighboring (Cᵀ)⁻¹Cᵀ pair.',
    'This leaves CA⁻¹B⁻¹A⁻²BC²(Bᵀ)⁻¹A². To check, insert D=L⁻¹CᵀR⁻¹ into LDR; the product becomes LL⁻¹CᵀR⁻¹R=Cᵀ, exactly the original right side.'
  ]);
  teach(q14,50,[
    'Group the equation as LDR=ABᵀ with L=ABCᵀ and R=BAᵀC. Keep the order within each group.',
    'Multiply by L⁻¹ on the left and R⁻¹ on the right, giving D=L⁻¹ABᵀR⁻¹. These are allowed because all given matrices are invertible.',
    'Reverse the factor order inside each inverse: L⁻¹=(Cᵀ)⁻¹B⁻¹A⁻¹ and R⁻¹=C⁻¹(Aᵀ)⁻¹B⁻¹.',
    'Substitute and cancel the adjacent A⁻¹A. The remaining product is (Cᵀ)⁻¹B⁻¹BᵀC⁻¹(Aᵀ)⁻¹B⁻¹. B⁻¹Bᵀ cannot generally be cancelled, since Bᵀ is not necessarily B.',
    'Check using the grouped expression: L(L⁻¹ABᵀR⁻¹)R=ABᵀ. This verifies the proposed D without assuming that any nonadjacent factors commute.'
  ]);
  teach(q14,51,[
    'Matrix equality means that every pair of matching entries is equal. Choose any row i and column j of A and B; these matrices must have the same size for addition.',
    'By the definition of addition, the (i,j) entry of A+B is aᵢⱼ+bᵢⱼ.',
    'The same entry of B+A is bᵢⱼ+aᵢⱼ. Ordinary real-number addition is commutative, so this equals aᵢⱼ+bᵢⱼ.',
    'The argument works at every position, so every entry agrees. Therefore A+B=B+A.'
  ]);
  teach(q14,52,[
    'Assume A,B,C have the same size. We will compare one arbitrary entry, because equal entries at every position prove that two matrices are equal.',
    'At position (i,j), A+(B+C) contains aᵢⱼ+(bᵢⱼ+cᵢⱼ): first add the B and C entries, then add the A entry.',
    'At the same position, (A+B)+C contains (aᵢⱼ+bᵢⱼ)+cᵢⱼ. These are the same three ordinary numbers with different brackets.',
    'Real-number addition is associative, so both grouped sums are equal. Since i,j were arbitrary, A+(B+C)=(A+B)+C.'
  ]);
  teach(q14,53,[
    'Let A be m × r, and let B,C both be r × n. These sizes ensure that B−C and all the products in the statement exist.',
    'The (i,j) entry of A(B−C) is aᵢ₁(b₁ⱼ−c₁ⱼ)+⋯+aᵢᵣ(bᵣⱼ−cᵣⱼ). This is the row-times-column rule.',
    'Distribute each ordinary numerical multiplication over its subtraction. For example aᵢ₁(b₁ⱼ−c₁ⱼ)=aᵢ₁b₁ⱼ−aᵢ₁c₁ⱼ.',
    'Collect all the b terms and all the c terms: (aᵢ₁b₁ⱼ+⋯+aᵢᵣbᵣⱼ)−(aᵢ₁c₁ⱼ+⋯+aᵢᵣcᵣⱼ). These are exactly the (i,j) entries of AB and AC.',
    'Thus every entry of A(B−C) equals the matching entry of AB−AC. This proves the rule for matrices of every compatible size.'
  ]);
  teach(q14,54,[
    'Let A be m × r, B be r × s, and C be s × n. Both groupings produce an m × n matrix. We prove equality by comparing an arbitrary entry (i,j).',
    'First calculate BC. Its entry (k,j) is Σₗ₌₁ˢ bₖₗcₗⱼ. The symbol Σ means add the listed terms over the stated index range.',
    'Multiplying by A on the left gives (A(BC))ᵢⱼ=Σₖ₌₁ʳ Σₗ₌₁ˢ aᵢₖbₖₗcₗⱼ. This adds one term for every pair (k,l).',
    'For the other grouping, (AB)ᵢₗ=Σₖ₌₁ʳ aᵢₖbₖₗ. Multiplying by C gives ((AB)C)ᵢⱼ=Σₗ₌₁ˢ Σₖ₌₁ʳ aᵢₖbₖₗcₗⱼ.',
    'The two expressions contain exactly the same finite collection of real-number products; they only add them in a different order. Finite addition may be regrouped, so the entries agree. Therefore A(BC)=(AB)C.'
  ]);
  teach(q14,55,[
    'The negative matrix −A has entries −aᵢⱼ. Matrix subtraction is defined as adding this negative matrix, so A−A=A+(−A).',
    'Choose any position (i,j). At this position the sum is aᵢⱼ+(−aᵢⱼ).',
    'A real number plus its opposite is zero. Thus every entry of the sum is zero, whatever the original entries of A were.',
    'A matrix whose entries are all zero is the zero matrix of that size. Hence A−A=A+(−A)=0.'
  ]);
  teach(q14,56,[
    'Use a zero matrix with exactly the same size as A, so subtraction is defined.',
    'At each position (i,j), subtract the entry of the zero matrix from the entry of A. This gives aᵢⱼ−0.',
    'Subtracting zero leaves an ordinary number unchanged, so the result at that position is aᵢⱼ.',
    'Every position agrees with A, which proves A−0=A.'
  ]);
  teach(q14,57,[
    'A transpose swaps row and column indices: the entry (i,j) of Aᵀ is aⱼᵢ. Scalar multiplication multiplies every entry by the number k.',
    'On the left, first multiply A by k and then transpose. The entry (i,j) of (kA)ᵀ is the old entry (j,i) of kA, namely kaⱼᵢ.',
    'On the right, first transpose A and then multiply by k. The entry (i,j) of kAᵀ is again kaⱼᵢ.',
    'Both matrices have the same size and the same entry at every position, so (kA)ᵀ=kAᵀ.'
  ]);
  teach(q14,58,[
    'Let A be m × r and B be r × n. Then (AB)ᵀ is n × m. BᵀAᵀ is also n × m, so the sizes agree; reversing the order is essential.',
    'The entry (i,j) of (AB)ᵀ is entry (j,i) of AB. By the multiplication rule, it is aⱼ₁b₁ᵢ+⋯+aⱼᵣbᵣᵢ.',
    'In BᵀAᵀ, row i of Bᵀ has entries b₁ᵢ,…,bᵣᵢ, while column j of Aᵀ has entries aⱼ₁,…,aⱼᵣ. Their dot product is b₁ᵢaⱼ₁+⋯+bᵣᵢaⱼᵣ.',
    'Each pair of ordinary scalar factors can be reversed: bₖᵢaⱼₖ=aⱼₖbₖᵢ. Thus both entry sums agree. This proves (AB)ᵀ=BᵀAᵀ; it does not assume that whole matrices commute.'
  ]);
  teach(q14,'TF',[
    '(a) False. Inverses multiply to I, not to 0. For example I·I=I, although I is its own inverse.',
    '(b) False. Expanding gives A²+AB+BA+B². Take A=[1 0; 0 0], B=[0 1; 0 0]. Then AB=B and BA=0, so (A+B)²=A+B while the proposed expression is A+2B.',
    '(c) False. Expansion gives (A−B)(A+B)=A²+AB−BA−B². For the matrices in (b), this is A+B but A²−B²=A.',
    '(d) False. AB is invertible, but the general rule is (AB)⁻¹=B⁻¹A⁻¹. For a counterexample to the printed order, take A=[1 1; 0 1], B=[2 0; 0 1]. Then (AB)⁻¹=[1/2 −1/2; 0 1], whereas A⁻¹B⁻¹=[1/2 −1; 0 1].',
    '(e) False. The correct rule is (AB)ᵀ=BᵀAᵀ. For the matrices in (b), (AB)ᵀ=Bᵀ is nonzero but AᵀBᵀ=0.',
    '(f) True. The 2 × 2 inverse formula divides by ad−bc. When this is nonzero, multiplying the resulting matrix by A gives I; when it is zero, A is singular and has no inverse.',
    '(g) True. At position (i,j), both sides contain kaⱼᵢ+bⱼᵢ. Transposing only changes where each entry is placed.',
    '(h) True. Transpose AA⁻¹=I and A⁻¹A=I. These identities show that (A⁻¹)ᵀ is an inverse for Aᵀ.',
    '(i) False as a matrix statement. Every power of I equals I, and the constant term is a₀I. Thus p(I)=(a₀+a₁+⋯+aₘ)I. The printed right side omits the identity factor.',
    '(j) True. A zero row stays zero in AX; a zero column stays zero in XA. Neither product can be the identity in the required case, since each identity row and column has a 1.',
    '(k) False. I and −I both have inverses, but I+(−I)=0, and the zero matrix is not invertible.'
  ]);
  teach(q14,'T2',[
    'Part a: compute small powers to look for a pattern. A²=[a² 2a; 0 a²] and A³=[a³ 3a²; 0 a³]. The diagonal is a power of a, and the upper-right entry appears to be n·aⁿ⁻¹.',
    'For a≠0, test the candidate [aⁿ,naⁿ⁻¹;0,aⁿ]. Multiplying it by A gives diagonal aⁿ⁺¹ and upper-right aⁿ+naⁿ=(n+1)aⁿ. This is exactly the same formula with n replaced by n+1.',
    'The candidate works at n=1, and the multiplication proves that each next power follows. If a=0, handle the small case directly: A=[0 1;0 0], A²=0, and every higher positive power is zero. This avoids ambiguous 0⁰ notation.',
    'Part b: multiply A by itself. The diagonal is cos²θ−sin²θ=cos(2θ), and the upper-right is 2sinθcosθ=sin(2θ); the lower-left is its negative.',
    'These are the entries of the same rotation with angle 2θ. More generally, the angle-addition identities turn multiplication of the nθ matrix by the θ matrix into the (n+1)θ matrix. Since the formula starts correctly at n=1, it holds for every positive integer n.'
  ]);
  teach(q14,'T3',[
    'First check the statement as printed. It has F₀ in the bottom-right position for every n. But Q²=[2 1; 1 1], whose bottom-right entry is 1, while F₀=0. Therefore the printed formula cannot be confirmed for all n.',
    'The corrected bottom-right entry is Fₙ₋₁. We will prove Qⁿ=[Fₙ₊₁ Fₙ; Fₙ Fₙ₋₁] for positive integers n. This correction preserves the useful Fibonacci pattern.',
    'Start at n=1. Since F₂=1, F₁=1, and F₀=0, the formula gives [1 1;1 0], exactly Q.',
    'Assume the corrected formula holds for some n. Multiply that matrix on the right by Q=[1 1;1 0]. Its new first column is the sum of its two old columns; its new second column is its old first column.',
    'The new matrix is [Fₙ₊₁+Fₙ, Fₙ₊₁; Fₙ+Fₙ₋₁, Fₙ]. By the Fibonacci rule, the two sums are Fₙ₊₂ and Fₙ₊₁.',
    'Thus Qⁿ⁺¹=[Fₙ₊₂ Fₙ₊₁;Fₙ₊₁ Fₙ], which is the corrected formula at n+1. Starting from n=1 and repeating this implication proves every positive integer case.'
  ],'As printed, the formula is false for n≥2. The corrected identity is Qⁿ=[Fₙ₊₁ Fₙ; Fₙ Fₙ₋₁] for every positive integer n.');
  teach(q13,30,[
    'Part a asks whether a nonzero matrix can become zero when squared. Try A=[0 1;0 0], which is nonzero because its upper-right entry is 1.',
    'Multiply explicitly: A²=[0·0+1·0, 0·1+1·0; 0·0+0·0, 0·1+0·0]=[0 0;0 0]. Thus the answer to part a is yes.',
    'Part b asks for a nonzero matrix whose square stays the same. Try A=[1 0;0 0]. Multiplying gives A²=[1 0;0 0]=A.',
    'As a check using a general input, the first example sends (x,y) to (y,0), then to (0,0). The second sends (x,y) to (x,0), and doing it again leaves (x,0). These actions explain the different squaring results.'
  ]);
  teach(q13,32,[
    'There are four rows and four columns, numbered 1 through 4. For each position substitute its row number for i and its column number for j.',
    'Part a: in row 1 the entries are 1+1,1+2,1+3,1+4, giving 2,3,4,5. Row 2 gives 3,4,5,6; row 3 gives 4,5,6,7; row 4 gives 5,6,7,8.',
    'Part b: the exponent j−1 runs through 0,1,2,3 across each row. Hence row i is (1,i,i²,i³). Substituting i=1,2,3,4 gives (1,1,1,1), (1,2,4,8), (1,3,9,27), and (1,4,16,64).',
    'Part c: compute the distance |i−j| between the two indices. Put −1 when the distance is 0 or 1, and put 1 otherwise. For example (1,2) has distance 1 and gives −1, while (1,3) has distance 2 and gives 1. Apply this to all sixteen positions.'
  ]);
  teach(q13,'TF',[
    '(a) True under this textbook’s convention: it defines a main diagonal for square matrices, and this one is 2 × 3. Some other texts also call the positions (1,1),(2,2),… a diagonal of a rectangular matrix; the answer here follows the supplied book’s definition.',
    '(b) False. In m × n, m counts rows and n counts columns. There are m row vectors and n column vectors, the reverse of the statement.',
    '(c) False. For A=[1 0;0 0] and B=[0 1;0 0], AB=B but BA=0. Therefore the order of matrix multiplication can change its result.',
    '(d) False. The correct row rule is row i of AB = (row i of A)·B. The suggested product A times a row of B may not even have compatible dimensions.',
    '(e) True. Transposition moves entry (i,j) to (j,i); doing it again moves that entry back to (i,j). Every entry returns to its original position.',
    '(f) False. Let A=B=I₂. Then tr(AB)=tr(I₂)=2, whereas tr(A)tr(B)=2·2=4.',
    '(g) False. A transpose reverses factor order: (AB)ᵀ=BᵀAᵀ. For the matrices in (c), (AB)ᵀ=Bᵀ is nonzero, but AᵀBᵀ=0.',
    '(h) True. Diagonal positions (i,i) do not move when transposed. Their sum, the trace, therefore stays the same.',
    '(i) True. Aᵀ has size 4 × 6. Bᵀ must have 4 columns to multiply it and 2 rows to produce a 2 × 6 result. Thus Bᵀ is 2 × 4 and B is 4 × 2: m=4,n=2.',
    '(j) True. The diagonal of cA consists of ca₁₁,…,caₙₙ. Adding and factoring out c gives c(a₁₁+⋯+aₙₙ)=c tr(A).',
    '(k) True. Add C to both sides, entry by entry. Then A−C+C=B−C+C reduces to A=B.',
    '(l) False. Take C=0, A=I, and B=0. Both AC and BC are zero even though A≠B. Cancelling a matrix factor requires an appropriate inverse.',
    '(m) True. If A is m × n, the existence of both AB and BA forces B to be n × m. Their sizes are m × m and n × n. Adding them requires equal sizes, so m=n and both factors are square of the same size.',
    '(n) True. The zero column of B is multiplied by A to form the corresponding column of AB. Every term contains a zero, so that column remains zero.',
    '(o) False. Take B=[1 0;0 0] and A=[1 1;0 1]. B has a zero second column, but BA=[1 1;0 0] has no zero column. Here B is on the left, so the column rule from (n) does not apply.'
  ]);
  {
    const old=existing('1.3','T1');
    q13.T1.answer='(a) AB=[12 27 30 13;8 −4 26 12], agreeing with Example 5.\n(b) The column-row expansion gives the same matrix:\n'+old.answer;
    q13.T1.steps=[...old.steps,'Check the result by ordinary row-times-column multiplication: the top-left entry is 1·4+2·0+4·2=12, and the bottom-right is 2·3+6·1+0·2=12. The complete product [12 27 30 13;8 −4 26 12] agrees with the book’s Example 5.'];
  }
  teach(q14,11,[
    'Compute the left side first. Aᵀ=[2 4;−3 4]. Its determinant is 2·4−4(−3)=20.',
    'Apply the 2 × 2 inverse formula to Aᵀ: swap its diagonal entries, negate its off-diagonal entries, and divide by 20. This gives (Aᵀ)⁻¹=[1/5 −1/5;3/20 1/10].',
    'Now compute the right side independently. A⁻¹=(1/20)[4 3;−4 2]=[1/5 3/20;−1/5 1/10]. Turn its rows into columns.',
    'The result is (A⁻¹)ᵀ=[1/5 −1/5;3/20 1/10]. Every entry matches the left side, verifying the equation for the given A.'
  ],'(Aᵀ)⁻¹=(A⁻¹)ᵀ=[1/5 −1/5;3/20 1/10].');
  teach(q14,12,[
    'First calculate A⁻¹. The determinant of A is 2·4−(−3)·4=20, so A⁻¹=[1/5 3/20;−1/5 1/10].',
    'To invert this new matrix, compute its determinant: (1/5)(1/10)−(3/20)(−1/5)=1/50+3/100=1/20.',
    'Swap its diagonal entries and negate the off-diagonal entries, then divide by 1/20. Dividing by 1/20 means multiplying by 20, giving 20[1/10 −3/20;1/5 1/5]=[2 −3;4 4].',
    'This is exactly the original matrix A. Thus the numerical calculation confirms that taking an inverse twice restores A.'
  ],'(A⁻¹)⁻¹=[2 −3;4 4]=A.');
  teach(q14,13,[
    'Compute the product inside the left inverse. First AB=[−9 −4;32 12]. Multiplying by C=diag(2,3) scales its first column by 2 and its second by 3, giving ABC=[−18 −12;64 36].',
    'Its determinant is (−18)·36−(−12)·64=120. The inverse formula therefore gives (ABC)⁻¹=(1/120)[36 12;−64 −18]=[3/10 1/10;−8/15 −3/20].',
    'Compute the separate inverses: C⁻¹=[1/2 0;0 1/3], B⁻¹=[2 −1;−5 3], and A⁻¹=[1/5 3/20;−1/5 1/10].',
    'Multiply in the stated reversed order. First C⁻¹B⁻¹=[1 −1/2;−5/3 1]. Multiplying this by A⁻¹ gives [3/10 1/10;−8/15 −3/20].',
    'The matrices from the two sides are identical. As an entry check, the right-hand product’s upper-left entry is 1·(1/5)+(−1/2)(−1/5)=3/10.'
  ],'(ABC)⁻¹=C⁻¹B⁻¹A⁻¹=[3/10 1/10;−8/15 −3/20].');
  teach(q14,14,[
    'Calculate AB=[−9 −4;32 12], then ABC=[−18 −12;64 36]. Transpose this product by turning rows into columns: (ABC)ᵀ=[−18 64;−12 36].',
    'Separately transpose each factor: Cᵀ=[2 0;0 3], Bᵀ=[3 5;1 2], and Aᵀ=[2 4;−3 4]. The stated right side uses these in reverse order.',
    'Multiply CᵀBᵀ=[6 10;3 6]. Then multiply by Aᵀ: [6·2+10(−3),6·4+10·4;3·2+6(−3),3·4+6·4]=[−18 64;−12 36].',
    'Both sides give the same four entries, so the transpose identity is verified for the supplied matrices.'
  ],'(ABC)ᵀ=CᵀBᵀAᵀ=[−18 64;−12 36].');
  teach(q14,29,[
    'A constant in a matrix polynomial multiplies the identity. Thus p(A)=A²−9I, p₁(A)=A+3I, and p₂(A)=A−3I.',
    'Compute A²=[11 4;8 3]. Subtracting 9I changes the diagonal only: p(A)=[2 4;8 −6].',
    'For the other side, A+3I=[6 1;2 4] and A−3I=[0 1;2 −2]. Multiply these matrices using rows and columns.',
    'Their product is [6·0+1·2,6·1+1(−2);2·0+4·2,2·1+4(−2)]=[2 4;8 −6]. Every entry agrees with p(A), as required.'
  ],'p(A)=p₁(A)p₂(A)=[2 4;8 −6].');
  teach(q14,37,[
    'Write one unknown column of X as (u,v,w)ᵀ and the matching column of I as (p,q,r)ᵀ. From AX=I the row equations are u+w=p, u+v=q, v+w=r.',
    'Add the first two equations and subtract the third. This cancels v,w and gives 2u=p+q−r. Therefore u=(p+q−r)/2, v=q−u=(−p+q+r)/2, and w=p−u=(p−q+r)/2.',
    'For the first identity column (p,q,r)=(1,0,0), obtain (u,v,w)=(1/2,−1/2,1/2). For the second, (0,1,0), obtain (1/2,1/2,−1/2). For the third, (0,0,1), obtain (−1/2,1/2,1/2).',
    'Place these answers as columns, not rows: X=(1/2)[1 1 −1;−1 1 1;1 −1 1]. Each column was chosen to produce the corresponding identity column, so AX=I.',
    'Multiplication in the other order also gives XA=I. Thus the constructed X is the inverse and A is invertible.'
  ],'A is invertible, with A⁻¹=(1/2)[1 1 −1;−1 1 1;1 −1 1].');
  teach(q14,38,[
    'Compare the rows of A: row 1=(1,1,1), row 2=(1,0,0), row 3=(0,1,1). The first is the sum of the other two.',
    'Multiplying by any X preserves this relation. Each row of AX is the same combination of rows of X specified by its row of A, so row 1 of AX must equal row 2 plus row 3.',
    'For the identity I₃, row 1 is (1,0,0), but row 2 plus row 3 is (0,1,1). These are unequal.',
    'Therefore no X can satisfy AX=I₃. By the definition of an inverse, A is not invertible.'
  ]);
  {
    const a=[[0,1/2,1/3],[1/4,0,1/5],[1/6,1/7,0]],a2=M.multiply(a,a),a3=M.multiply(a2,a);
    teach(q14,'T1',[
      'Compute sample powers to investigate: A²='+show(a2)+' and A³='+show(a3)+'. Numerical samples suggest a limiting behavior, but we need a bound to establish what happens to all later powers.',
      'All entries are nonnegative. Add each row of A: the totals are 5/6, 9/20, and 13/42. Thus every row sum is at most 5/6, a number smaller than 1.',
      'Suppose all row sums of Aᵏ are at most (5/6)ᵏ. A row sum of Aᵏ⁺¹=AᵏA is obtained by weighting the row sums of A with a row of Aᵏ. Because these weights are nonnegative, it is at most (5/6) times that row sum of Aᵏ.',
      'Therefore all row sums of Aᵏ⁺¹ are at most (5/6)ᵏ⁺¹. Starting from the first power and repeating this argument proves the bound for every positive integer k.',
      'Each entry lies between 0 and its row sum, hence between 0 and (5/6)ᵏ. Repeatedly multiplying by 5/6 makes this upper bound tend to 0. Consequently every matrix entry tends to 0, so Aᵏ approaches the zero matrix.'
    ],'As k → ∞, Aᵏ approaches the 3 × 3 zero matrix; every entry tends to zero.');
  }
  put(q13,'T2',`Suppose that a manufacturer uses Type I items at $1.35 each, Type II items at $2.15 each, and Type III items at $3.95 each. Suppose also that the accompanying table describes the purchases of those items (in thousands of units) for the first quarter of the year. Find a matrix product, the computation of which produces a matrix that lists the manufacturer’s expenditure in each month of the first quarter. Compute that product.
Table: columns Type I, Type II, Type III; quantities in thousands of units.
Jan.: 3.1, 4.2, 3.5
Feb.: 5.1, 6.8, 0
Mar.: 2.2, 9.5, 4.0
Apr.: 1.0, 1.0, 7.4`,{
    title:'Convert quantities and prices into monthly spending',
    reference:'The question continues on printed page 40. The printed prompt asks for the first quarter (January–March), but its table also includes April. The solution identifies this inconsistency and reports both the requested quarter and the extra printed row.',
    steps:[
      'Choose rows for months and columns for item types. For the first quarter, the quantity matrix is P=[3.1 4.2 3.5;5.1 6.8 0;2.2 9.5 4.0]. The price column is c=(1.35,2.15,3.95)ᵀ, ordered by the same item types.',
      'P has size 3 × 3 and c has size 3 × 1, so Pc is a 3 × 1 column: one total per month. Each entry multiplies quantities by their corresponding prices and adds the three costs.',
      'January: 3.1·1.35+4.2·2.15+3.5·3.95=4.185+9.030+13.825=27.040. February: 5.1·1.35+6.8·2.15+0·3.95=6.885+14.620+0=21.505.',
      'March: 2.2·1.35+9.5·2.15+4.0·3.95=2.970+20.425+15.800=39.195. Since the quantities are in thousands of units, these totals are in thousands of dollars. Multiply by 1000 to obtain dollar spending.',
      'The requested first-quarter product is therefore 1000Pc=(27040,21505,39195)ᵀ dollars. Keep the January, February, March row order so each total is attached to the correct month.',
      'The printed table also includes April, which is outside the first quarter. If all four printed rows are used, its extra total is 1000(1.0·1.35+1.0·2.15+7.4·3.95)=1000(32.730)=$32,730. This is an additional fourth row, not part of the quarter requested.'
    ],
    answer:'First quarter: 1000[3.1 4.2 3.5;5.1 6.8 0;2.2 9.5 4.0](1.35,2.15,3.95)ᵀ = ($27,040,$21,505,$39,195)ᵀ.\nIf all four printed table rows are included, the result is ($27,040,$21,505,$39,195,$32,730)ᵀ; the last entry is April.'
  });
  // Keep supporting references distinct from the original exercise wording.
  q13[21].text=q13[21].text.split('\nReferenced system')[0];
  q13[21].reference=example5;
  q13[22].text='Follow the directions of Exercise 21 for the linear system in Example 6 of Section 1.2.';
  q13[22].reference='Directions from Exercise 21: Express the general solution as a linear combination of column vectors that contain only numerical entries. Rewrite the solution as a column, separate its constant and parameter terms, and factor out each parameter.\nExample 6 system:\nx₁+3x₂−2x₃+2x₅=0\n2x₁+6x₂−5x₃−2x₄+4x₅−3x₆=0\n5x₃+10x₄+15x₆=0\n2x₁+6x₂+8x₄+4x₅+18x₆=0';
  const proofReference=q13[31].text.split('\nReferenced notation: ');
  q13[31].text=proofReference[0];q13[31].reference=proofReference[1];
  const technologyReference=q13.T1.text.split('\nMatrices from Example 5:');
  q13.T1.text=technologyReference[0];q13.T1.reference='Matrices from Example 5:'+technologyReference[1];
  window.EmberMathQuestions=window.EmberMathQuestions||{};
  Object.assign(window.EmberMathQuestions,{'1.3':q13,'1.4':q14});
})();
