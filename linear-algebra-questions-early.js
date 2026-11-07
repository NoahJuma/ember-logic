(() => {
  'use strict';
  const sections={'1.1':{},'1.2':{}};
  let section=sections['1.1'];
  const put=(number,text,extra={})=>section[String(number)]={text,...extra};
  const matrix=rows=>rows.map(row=>'[ '+row.join('  ')+' ]').join('\n');
  const parts=items=>items.map((text,i)=>'('+String.fromCharCode(97+i)+') '+text).join('\n\n');
  put(1,'In each part, determine whether the equation is linear in x₁, x₂, and x₃.\n'+parts([
    'x₁ + 5x₂ − √2 x₃ = 1','x₁ + 3x₂ + x₁x₃ = 2','x₁ = −7x₂ + 3x₃','x₁⁻² + x₂ + 8x₃ = 5','x₁^(3/5) − 2x₂ + x₃ = 4','πx₁ − √2 x₂ = 7^(1/3)'
  ]),{steps:[
    'Use the definition: a linear equation is a sum of constants multiplied by individual unknowns. Every unknown has power 1. Unknowns must not multiply one another, appear in denominators, or sit inside roots.',
    'Part (a): the coefficients are 1, 5 and −√2. A coefficient may be irrational; √2 is just a fixed number. The equation is linear.',
    'Part (b): x₁x₃ multiplies two unknowns. This violates the definition, so it is not linear.',
    'Part (c): add 7x₂ and subtract 3x₃ on both sides. This gives x₁ + 7x₂ − 3x₃ = 0, which is linear.',
    'Part (d): x₁⁻² means 1/x₁². Its exponent is −2, not 1, so it is not linear.',
    'Part (e): x₁^(3/5) has exponent 3/5, not 1, so it is not linear.',
    'Part (f): π, √2 and 7^(1/3) are constants. The missing x₃ term has coefficient 0. The equation is linear.'
  ]});
  put(2,'In each part, determine whether the equation is linear in x and y.\n'+parts([
    '2^(1/3)x + √3 y = 1','2x^(1/3) + 3√y = 1','cos(π/7)x − 4y = log 3','(π/7)cos x − 4y = 0','xy = 1','y + 7 = x'
  ]),{steps:[
    'Separate constants from unknowns. Linear means that x and y appear only as constant multiples of x and y.',
    'Part (a): the cube root of 2 and the square root of 3 are constants multiplying x and y. This is linear.',
    'Part (b): the root signs act on the unknowns themselves. The powers are 1/3 and 1/2, so this is not linear.',
    'Part (c): cos(π/7) and log 3 are fixed numbers. The equation has the form ax + by = c and is linear.',
    'Part (d): cos x changes nonlinearly with the unknown x. Multiplying it by π/7 does not remove that problem.',
    'Part (e): xy multiplies the unknowns, so this is not linear.',
    'Part (f): subtract y from both sides to get x − y = 7. This is linear.'
  ]});
  put(3,'Using the notation of Formula (7), write down a general linear system of\n'+parts(['two equations in two unknowns.','three equations in three unknowns.','two equations in four unknowns.'])+'\n\nNotation from Formula (7): aᵢⱼ is the coefficient of unknown xⱼ in equation i; bᵢ is the right-hand side of that equation.',{answer:'(a) a₁₁x₁ + a₁₂x₂ = b₁; a₂₁x₁ + a₂₂x₂ = b₂.\n(b) a₁₁x₁ + a₁₂x₂ + a₁₃x₃ = b₁; a₂₁x₁ + a₂₂x₂ + a₂₃x₃ = b₂; a₃₁x₁ + a₃₂x₂ + a₃₃x₃ = b₃.\n(c) a₁₁x₁ + a₁₂x₂ + a₁₃x₃ + a₁₄x₄ = b₁; a₂₁x₁ + a₂₂x₂ + a₂₃x₃ + a₂₄x₄ = b₂.'});
  put(4,'Write down the augmented matrix for each of the linear systems in Exercise 3.\n\nExercise 3 asks for (a) two equations in two unknowns; (b) three equations in three unknowns; (c) two equations in four unknowns. Use aᵢⱼ for the coefficient of xⱼ in equation i, and bᵢ for its right-hand side.',{answer:'(a)\n[a₁₁ a₁₂ | b₁]\n[a₂₁ a₂₂ | b₂]\n\n(b)\n[a₁₁ a₁₂ a₁₃ | b₁]\n[a₂₁ a₂₂ a₂₃ | b₂]\n[a₃₁ a₃₂ a₃₃ | b₃]\n\n(c)\n[a₁₁ a₁₂ a₁₃ a₁₄ | b₁]\n[a₂₁ a₂₂ a₂₃ a₂₄ | b₂]'});
  const fromMatrix='In each part, find a system of linear equations in the unknowns x₁, x₂, x₃, …, that corresponds to the given augmented matrix.\n';
  put(5,fromMatrix+parts([matrix([[2,0,0],[3,-4,0],[0,1,1]]),matrix([[3,0,-2,5],[7,1,4,-3],[0,-2,1,7]])]),{answer:'(a) 2x₁ = 0; 3x₁ − 4x₂ = 0; x₂ = 1.\n(b) 3x₁ − 2x₃ = 5; 7x₁ + x₂ + 4x₃ = −3; −2x₂ + x₃ = 7.'});
  put(6,fromMatrix+parts([matrix([[0,3,-1,-1,-1],[5,2,0,-3,-6]]),matrix([[3,0,1,-4,3],[-4,0,4,1,-3],[-1,3,0,-2,-9],[0,0,0,-1,-2]])]),{answer:'(a) 3x₂ − x₃ − x₄ = −1; 5x₁ + 2x₂ − 3x₄ = −6.\n(b) 3x₁ + x₃ − 4x₄ = 3; −4x₁ + 4x₃ + x₄ = −3; −x₁ + 3x₂ − 2x₄ = −9; −x₄ = −2.'});
  const toMatrix='In each part, find the augmented matrix for the linear system.\n';
  put(7,toMatrix+parts(['−2x₁ = 6\n3x₁ = 8\n9x₁ = −3','6x₁ − x₂ + 3x₃ = 4\n5x₂ − x₃ = 1','2x₂ − 3x₄ + x₅ = 0\n−3x₁ − x₂ + x₃ = −1\n6x₁ + 2x₂ − x₃ + 2x₄ − 3x₅ = 6']),{answer:'(a)\n[−2 | 6]\n[3 | 8]\n[9 | −3]\n\n(b)\n[6 −1 3 | 4]\n[0 5 −1 | 1]\n\n(c)\n[0 2 0 −3 1 | 0]\n[−3 −1 1 0 0 | −1]\n[6 2 −1 2 −3 | 6]'});
  put(8,toMatrix+parts(['3x₁ − 2x₂ = −1\n4x₁ + 5x₂ = 3\n7x₁ + 3x₂ = 2','2x₁ + 2x₃ = 1\n3x₁ − x₂ + 4x₃ = 7\n6x₁ + x₂ − x₃ = 0','x₁ = 1\nx₂ = 2\nx₃ = 3']),{answer:'(a)\n[3 −2 | −1]\n[4 5 | 3]\n[7 3 | 2]\n\n(b)\n[2 0 2 | 1]\n[3 −1 4 | 7]\n[6 1 −1 | 0]\n\n(c)\n[1 0 0 | 1]\n[0 1 0 | 2]\n[0 0 1 | 3]'});
  put(9,'In each part, determine whether the given 3-tuple is a solution of the linear system\n2x₁ − 4x₂ − x₃ = 1\nx₁ − 3x₂ + x₃ = 1\n3x₁ − 5x₂ − 3x₃ = 1\n\n'+parts(['(3, 1, 1)','(3, −1, 1)','(13, 5, 2)','(13/2, 5/2, 2)','(17, 7, 5)']));
  put(10,'In each part, determine whether the given 3-tuple is a solution of the linear system\nx + 2y − 2z = 3\n3x − y + z = 1\n−x + 5y − 5z = 5\n\n'+parts(['(5/7, 8/7, 1)','(5/7, 8/7, 0)','(5, 8, 1)','(5/7, 10/7, 2/7)','(5/7, 22/7, 2)']));
  put(11,'In each part, solve the linear system, if possible, and use the result to determine whether the lines represented by the equations in the system have zero, one, or infinitely many points of intersection. If there is a single point of intersection, give its coordinates, and if there are infinitely many, find parametric equations for them.\n'+parts(['3x − 2y = 4\n6x − 4y = 9','2x − 4y = 1\n4x − 8y = 2','x − 2y = 0\nx − 4y = 8']));
  put(12,'Under what conditions on a and b will the linear system have no solutions, one solution, infinitely many solutions?\n2x − 3y = a\n4x − 6y = b');
  const param='In each part, use parametric equations to describe the solution set of the linear equation.\n';
  put(13,param+parts(['7x − 5y = 3','3x₁ − 5x₂ + 4x₃ = 7','−8x₁ + 2x₂ − 5x₃ + 6x₄ = 1','3v − 8w + 2x − y + 4z = 0']));
  put(14,param+parts(['x + 10y = 2','x₁ + 3x₂ − 12x₃ = 3','4x₁ + 2x₂ + 3x₃ + x₄ = 20','v + w + x − 5y + 7z = 0']));
  const infinite='Each linear system has infinitely many solutions. Use parametric equations to describe its solution set.\n';
  put(15,infinite+parts(['2x − 3y = 1\n6x − 9y = 3','x₁ + 3x₂ − x₃ = −4\n3x₁ + 9x₂ − 3x₃ = −12\n−x₁ − 3x₂ + x₃ = 4']));
  put(16,infinite+parts(['6x₁ + 2x₂ = −8\n3x₁ + x₂ = −4','2x − y + 2z = −4\n6x − 3y + 6z = −12\n−4x + 2y − 4z = 8']));
  const firstPivot='Find a single elementary row operation that will create a 1 in the upper left corner of the given augmented matrix and will not create any fractions in its first row.\n';
  put(17,firstPivot+parts([matrix([[-3,-1,2,4],[2,-3,3,2],[0,2,-3,1]]),matrix([[0,-1,-5,0],[2,-9,3,2],[1,4,-3,3]])]));
  put(18,firstPivot+parts([matrix([[2,4,-6,8],[7,1,4,3],[-5,4,2,7]]),matrix([[7,-4,-2,2],[3,-1,8,1],[-6,3,-1,4]])]));
  const consistent='Find all values of k for which the given augmented matrix corresponds to a consistent linear system.\n';
  put(19,consistent+parts([matrix([[1,'k',-4],[4,8,2]]),matrix([[1,'k',-1],[4,8,-4]])]));
  put(20,consistent+parts([matrix([[3,-4,'k'],[-6,8,5]]),matrix([['k',1,-2],[4,-1,2]])]));
  put(21,'The curve y = ax² + bx + c shown in the accompanying figure passes through the points (x₁, y₁), (x₂, y₂), and (x₃, y₃). Show that the coefficients a, b, and c form a solution of the system of linear equations whose augmented matrix is\n[x₁²  x₁  1  y₁]\n[x₂²  x₂  1  y₂]\n[x₃²  x₃  1  y₃]',{figures:[{file:'figure-1-1-21.svg',caption:'Figure Ex-21 · Exercise Set 1.1',alt:'A parabola y = ax² + bx + c passes through the three labeled points (x₁,y₁), (x₂,y₂), and (x₃,y₃).'}]});
  put(22,'Explain why each of the three elementary row operations does not affect the solution set of a linear system.');
  put(23,'Show that if the linear equations\nx₁ + kx₂ = c and x₁ + lx₂ = d\nhave the same solution set, then the two equations are identical (i.e., k = l and c = d).');
  put(24,'Consider the system of equations\nax + by = k\ncx + dy = l\nex + fy = m\nDiscuss the relative positions of the lines ax + by = k, cx + dy = l, and ex + fy = m when\n'+parts(['the system has no solutions.','the system has exactly one solution.','the system has infinitely many solutions.']));
  put(25,'Suppose that a certain diet calls for 7 units of fat, 9 units of protein, and 16 units of carbohydrates for the main meal, and suppose that an individual has three possible foods to choose from to meet these requirements:\nFood 1: Each ounce contains 2 units of fat, 2 units of protein, and 4 units of carbohydrates.\nFood 2: Each ounce contains 3 units of fat, 1 unit of protein, and 2 units of carbohydrates.\nFood 3: Each ounce contains 1 unit of fat, 3 units of protein, and 5 units of carbohydrates.\nLet x, y, and z denote the number of ounces of the first, second, and third foods that the dieter will consume at the main meal. Find (but do not solve) a linear system in x, y, and z whose solution tells how many ounces of each food must be consumed to meet the diet requirements.',{steps:[
    'Keep the meaning of the unknowns: x, y and z are ounces of foods 1, 2 and 3. We are building equations, so we do not solve for those amounts.',
    'Balance fat. Food 1 contributes 2x units, food 2 contributes 3y, and food 3 contributes z. The total must be 7: 2x + 3y + z = 7.',
    'Balance protein. The contributions are 2x, y and 3z, and the required total is 9: 2x + y + 3z = 9.',
    'Balance carbohydrates. The contributions are 4x, 2y and 5z, with total 16: 4x + 2y + 5z = 16.',
    'Check the units: nutrient units per ounce × ounces gives nutrient units, matching each right-hand side. A physically meaningful food plan also requires x, y and z to be nonnegative.'
  ]});
  put(26,'Suppose that you want to find values for a, b, and c such that the parabola y = ax² + bx + c passes through the points (1, 1), (2, 4), and (−1, 1). Find (but do not solve) a system of linear equations whose solutions provide values for a, b, and c. How many solutions would you expect this system of equations to have, and why?',{steps:[
    'The unknowns here are the coefficients a, b and c. Each given point supplies known numbers for x and y.',
    'Use (1,1): substitute x = 1 and y = 1 into y = ax² + bx + c. This gives a + b + c = 1.',
    'Use (2,4): 2² = 4, so the equation is 4a + 2b + c = 4.',
    'Use (−1,1): (−1)² = 1, so the equation is a − b + c = 1.',
    'Expect one solution. Subtracting the first equation from the third isolates b; subtracting the first from the second then determines a once b is known; the first equation then determines c. Thus no coefficient can vary freely. We stop at the system, as requested, without finding their values.'
  ]});
  put(27,'Suppose you are asked to find three real numbers such that the sum of the numbers is 12, the sum of two times the first plus the second plus two times the third is 5, and the third number is one more than the first. Find (but do not solve) a linear system whose equations describe the three conditions.',{steps:[
    'Name the first, second and third numbers x, y and z, in that order.',
    'Translate “the sum of the numbers is 12” into x + y + z = 12.',
    'Translate the weighted sum into 2x + y + 2z = 5. Only the first and third numbers are doubled.',
    'Translate “the third number is one more than the first” into z = x + 1. Subtract x to write it in standard form: −x + z = 1.',
    'All three conditions must hold together, so keep the three equations as one system. The question asks us to set it up, not solve it.'
  ]});
  put('TF','In parts (a)–(h) determine whether the statement is true or false, and justify your answer.\n'+parts([
    'A linear system whose equations are all homogeneous must be consistent.',
    'Multiplying a row of an augmented matrix through by zero is an acceptable elementary row operation.',
    'The linear system x − y = 3, 2x − 2y = k cannot have a unique solution, regardless of the value of k.',
    'A single linear equation with two or more unknowns must have infinitely many solutions.',
    'If the number of equations in a linear system exceeds the number of unknowns, then the system must be inconsistent.',
    'If each equation in a consistent linear system is multiplied through by a constant c, then all solutions to the new system can be obtained by multiplying solutions from the original system by c.',
    'Elementary row operations permit one row of an augmented matrix to be subtracted from another.',
    'The linear system with corresponding augmented matrix\n[2  −1  4]\n[0  0  −1]\nis consistent.'
  ]),{steps:[
    '(a) True. Homogeneous means every right-hand side is zero. Set every unknown to zero: each equation becomes 0 = 0, so at least one solution exists.',
    '(b) False. Multiplying by zero erases an equation and cannot be undone. For example, x = 1 would become 0 = 0 and would wrongly allow any x.',
    '(c) True. Twice the first equation has left side 2x − 2y and right side 6. If k = 6 the two lines coincide; if k ≠ 6 they are parallel and distinct. Neither case has exactly one intersection.',
    '(d) True under the book’s definition of a linear equation, which has at least one nonzero variable coefficient. Choose values freely for the other unknowns, then solve for the unknown with that nonzero coefficient.',
    '(e) False. More equations can repeat existing information. For example, x = 1, 2x = 2 and 3x = 3 are three equations in one unknown, all satisfied by x = 1.',
    '(f) False. Multiplying an equation by a nonzero constant preserves its solutions; it does not scale them. With x = 1 and c = 2, the new equation is 2x = 2, whose solution is still 1, not 2. If c = 0, all equations instead lose their restrictions.',
    '(g) True. Subtracting another row is the permitted operation of adding −1 times that row.',
    '(h) False. The bottom row reads 0x₁ + 0x₂ = −1, or 0 = −1. No values can make this true.'
  ]});
  put('T1','Solve the linear systems in Examples 2, 3, and 4 to see how your technology utility handles the three types of systems.\n\nReferenced systems:\nExample 2: x − y = 1; 2x + y = 6.\nExample 3: x + y = 4; 3x + 3y = 6.\nExample 4: 4x − 2y = 1; 16x − 8y = 4.');
  put('T2','Use the result in Exercise 21 to find values of a, b, and c for which the curve y = ax² + bx + c passes through the points (−1, 1, 4), (0, 0, 8), and (1, 1, 7).\n\nReferenced result in Exercise 21: a point (xᵢ,yᵢ) gives the equation xᵢ²a + xᵢb + c = yᵢ.',{reference:'The uploaded edition prints three entries in each “point” although this is a two-coordinate curve. The worked solution explicitly states its interpretation; the original printed data above are preserved.'});

  section=sections['1.2'];
  const echelon='Determine whether the matrix is in row echelon form, reduced row echelon form, both, or neither.\n';
  put(1,echelon+parts([
    matrix([[1,0,0],[0,1,0],[0,0,1]]),matrix([[1,0,0],[0,1,0],[0,0,0]]),matrix([[0,1,0],[0,0,1],[0,0,0]]),matrix([[1,0,3,1],[0,1,2,4]]),matrix([[1,2,0,3,0],[0,0,1,1,0],[0,0,0,0,1],[0,0,0,0,0]]),matrix([[0,0],[0,0],[0,0]]),matrix([[1,-7,5,5],[0,1,3,2]])
  ]));
  put(2,echelon+parts([
    matrix([[1,2,0],[0,1,0],[0,0,0]]),matrix([[1,0,0],[0,1,0],[0,2,0]]),matrix([[1,3,4],[0,0,1],[0,0,0]]),matrix([[1,5,-3],[0,1,1],[0,0,0]]),matrix([[1,2,3],[0,0,0],[0,0,1]]),matrix([[1,2,3,4,5],[1,0,7,1,3],[0,0,0,0,1],[0,0,0,0,0]]),matrix([[1,-2,0,1],[0,0,1,-2]])
  ]));
  const reducedSystem='Suppose that the augmented matrix for a linear system has been reduced by row operations to the given row echelon form. Identify the pivot rows and columns and solve the system.\n';
  put(3,reducedSystem+parts([matrix([[1,-3,4,7],[0,1,2,2],[0,0,1,5]]),matrix([[1,0,8,-5,6],[0,1,4,-9,3],[0,0,1,1,2]]),matrix([[1,7,-2,0,-8,-3],[0,0,1,1,6,5],[0,0,0,1,3,9],[0,0,0,0,0,0]]),matrix([[1,-3,7,1],[0,1,4,0],[0,0,0,1]])]));
  put(4,reducedSystem+parts([matrix([[1,0,0,-3],[0,1,0,0],[0,0,1,7]]),matrix([[1,0,0,-7,8],[0,1,0,3,2],[0,0,1,1,-5]]),matrix([[1,-6,0,0,3,-2],[0,0,1,0,4,7],[0,0,0,1,5,8],[0,0,0,0,0,0]]),matrix([[1,-3,0,0],[0,0,1,0],[0,0,0,1]])]));
  const systems=[
    'x₁ + x₂ + 2x₃ = 8\n−x₁ − 2x₂ + 3x₃ = 1\n3x₁ − 7x₂ + 4x₃ = 10',
    '2x₁ + 2x₂ + 2x₃ = 0\n−2x₁ + 5x₂ + 2x₃ = 1\n8x₁ + x₂ + 4x₃ = −1',
    'x − y + 2z − w = −1\n2x + y − 2z − 2w = −2\n−x + 2y − 4z + w = 1\n3x − 3w = −3',
    '−2b + 3c = 1\n3a + 6b − 3c = −2\n6a + 6b + 3c = 5'
  ];
  systems.forEach((system,i)=>{
    put(i+5,'Solve the system by Gaussian elimination.\n'+system);
    put(i+9,'Solve the system by Gauss–Jordan elimination.\nExercise '+(i+5)+'.\n\nThe referenced system is:\n'+system);
  });
  const inspect='Determine whether the homogeneous system has nontrivial solutions by inspection (without pencil and paper).\n';
  put(13,inspect+'2x₁ − 3x₂ + 4x₃ − x₄ = 0\n7x₁ + x₂ − 8x₃ + 9x₄ = 0\n2x₁ + 8x₂ + x₃ − x₄ = 0');
  put(14,inspect+'x₁ + 3x₂ − x₃ = 0\nx₂ − 8x₃ = 0\n4x₃ = 0');
  const any='Solve the given linear system by any method.\n';
  [
    '2x₁ + x₂ + 3x₃ = 0\nx₁ + 2x₂ = 0\nx₂ + x₃ = 0',
    '2x − y − 3z = 0\n−x + 2y − 3z = 0\nx + y + 4z = 0',
    '3x₁ + x₂ + x₃ + x₄ = 0\n5x₁ − x₂ + x₃ − x₄ = 0',
    'v + 3w − 2x = 0\n2u + v − 4w + 3x = 0\n2u + 3v + 2w − x = 0\n−4u − 3v + 5w − 4x = 0',
    '2x + 2y + 4z = 0\nw − y − 3z = 0\n2w + 3x + y + z = 0\n−2w + x + 3y − 2z = 0',
    'x₁ + 3x₂ + x₄ = 0\nx₁ + 4x₂ + 2x₃ = 0\n−2x₂ − 2x₃ − x₄ = 0\n2x₁ − 4x₂ + x₃ + x₄ = 0\nx₁ − 2x₂ − x₃ + x₄ = 0',
    '2I₁ − I₂ + 3I₃ + 4I₄ = 9\nI₁ − 2I₃ + 7I₄ = 11\n3I₁ − 3I₂ + I₃ + 5I₄ = 8\n2I₁ + I₂ + 4I₃ + 4I₄ = 10',
    'Z₃ + Z₄ + Z₅ = 0\n−Z₁ − Z₂ + 2Z₃ − 3Z₄ + Z₅ = 0\nZ₁ + Z₂ − 2Z₃ − Z₅ = 0\n2Z₁ + 2Z₂ − Z₃ + Z₅ = 0'
  ].forEach((system,i)=>put(15+i,any+system));
  const stars='In each part, the augmented matrix for a linear system is given in which the asterisk represents an unspecified real number. Determine whether the system is consistent, and if so whether the solution is unique. Answer “inconclusive” if there is not enough information to make a decision.\n';
  put(23,stars+parts([matrix([[1,'*','*','*'],[0,1,'*','*'],[0,0,1,'*']]),matrix([[1,'*','*','*'],[0,1,'*','*'],[0,0,0,0]]),matrix([[1,'*','*','*'],[0,1,'*','*'],[0,0,0,1]]),matrix([[1,'*','*','*'],[0,0,'*',0],[0,0,1,'*']])]));
  put(24,stars+parts([matrix([[1,'*','*','*'],[0,1,'*','*'],[0,0,1,1]]),matrix([[1,0,0,'*'],['*',1,0,'*'],['*','*',1,'*']]),matrix([[1,0,0,0],[1,0,0,1],[1,'*','*','*']]),matrix([[1,'*','*','*'],[1,0,0,1],[1,0,0,1]])]));
  const cases='Determine the values of a for which the system has no solutions, exactly one solution, or infinitely many solutions.\n';
  put(25,cases+'x + 2y − 3z = 4\n3x − y + 5z = 2\n4x + y + (a² − 14)z = a + 2');
  put(26,cases+'x + 2y + z = 2\n2x − 2y + 3z = 1\nx + 2y − (a² − 3)z = a');
  const condition='What condition, if any, must a, b, and c satisfy for the linear system to be consistent?\n';
  put(27,condition+'x + 3y − z = a\nx + y + 2z = b\n2y − 3z = c');
  put(28,condition+'x + 3y + z = a\n−x − 2y + z = b\n3x + 7y − z = c');
  put(29,'Solve the following system, where a, b, and c are constants.\n2x + y = a\n3x + 6y = b');
  put(30,'Solve the following system, where a, b, and c are constants.\nx₁ + x₂ + x₃ = a\n2x₁ + 2x₃ = b\n3x₂ + 3x₃ = c');
  put(31,'Find two different row echelon forms of\n[1  3]\n[2  7]\nThis exercise shows that a matrix can have multiple row echelon forms.');
  put(32,'Reduce\n[2  1  3]\n[0  −2  −29]\n[3  4  5]\nto reduced row echelon form without introducing fractions at any intermediate stage.');
  put(33,'Show that the following nonlinear system has 18 solutions if 0 ≤ α ≤ 2π, 0 ≤ β ≤ 2π, and 0 ≤ γ ≤ 2π.\nsin α + 2cos β + 3tan γ = 0\n2sin α + 5cos β + 3tan γ = 0\n−sin α − 5cos β + 5tan γ = 0\n[Hint: Begin by making the substitutions x = sin α, y = cos β, and z = tan γ.]');
  put(34,'Solve the following system of nonlinear equations for the unknown angles α, β, and γ, where 0 ≤ α ≤ 2π, 0 ≤ β ≤ 2π, and 0 ≤ γ < π.\n2sin α − cos β + 3tan γ = 3\n4sin α + 2cos β − 2tan γ = 2\n6sin α − 3cos β + tan γ = 9');
  put(35,'Solve the following system of nonlinear equations for x, y, and z.\nx² + y² + z² = 6\nx² − y² + 2z² = 2\n2x² + y² − z² = 3\n[Hint: Begin by making the substitutions X = x², Y = y², Z = z².]');
  put(36,'Solve the following system for x, y, and z.\n1/x + 2/y − 4/z = 1\n2/x + 3/y + 8/z = 0\n−1/x + 9/y + 10/z = 5');
  put(37,'Find the coefficients a, b, c, and d so that the curve shown in the accompanying figure is the graph of the equation y = ax³ + bx² + cx + d.',{figures:[{file:'figure-1-2-37.svg',caption:'Figure Ex-37 · Exercise Set 1.2',alt:'A cubic curve passes through (0,10), (1,7), (3,−11), and (4,−14).'}]});
  put(38,'Find the coefficients a, b, c, and d so that the circle shown in the accompanying figure is given by the equation ax² + ay² + bx + cy + d = 0.',{figures:[{file:'figure-1-2-38.svg',caption:'Figure Ex-38 · Exercise Set 1.2',alt:'A circle passes through (−2,7), (−4,5), and (4,−3).'}]});
  put(39,'If the linear system\na₁x + b₁y + c₁z = 0\na₂x − b₂y + c₂z = 0\na₃x + b₃y − c₃z = 0\nhas only the trivial solution, what can be said about the solutions of the following system?\na₁x + b₁y + c₁z = 3\na₂x − b₂y + c₂z = 7\na₃x + b₃y − c₃z = 11');
  put(40,parts([
    'If A is a matrix with three rows and five columns, then what is the maximum possible number of leading 1’s in its reduced row echelon form?',
    'If B is a matrix with three rows and six columns, then what is the maximum possible number of parameters in the general solution of the linear system with augmented matrix B?',
    'If C is a matrix with five rows and three columns, then what is the minimum possible number of rows of zeros in any row echelon form of C?'
  ]));
  put(41,'Describe all possible reduced row echelon forms of\n'+parts(['[a  b  c]\n[d  e  f]\n[g  h  i]','[a  b  c  d]\n[e  f  g  h]\n[i  j  k  l]\n[m  n  p  q]']));
  put(42,'Consider the system of equations\nax + by = 0\ncx + dy = 0\nex + fy = 0\nDiscuss the relative positions of the lines ax + by = 0, cx + dy = 0, and ex + fy = 0 when the system has only the trivial solution and when it has nontrivial solutions.');
  put(43,parts(['Prove that if ad − bc ≠ 0, then the reduced row echelon form of\n[a  b]\n[c  d]\nis\n[1  0]\n[0  1]','Use the result in part (a) to prove that if ad − bc ≠ 0, then the linear system\nax + by = k\ncx + dy = l\nhas exactly one solution.']));
  put('TF','In parts (a)–(i) determine whether the statement is true or false, and justify your answer.\n'+parts([
    'If a matrix is in reduced row echelon form, then it is also in row echelon form.',
    'If an elementary row operation is applied to a matrix that is in row echelon form, the resulting matrix will still be in row echelon form.',
    'Every matrix has a unique row echelon form.',
    'A homogeneous linear system in n unknowns whose corresponding augmented matrix has a reduced row echelon form with r leading 1’s has n − r free variables.',
    'All leading 1’s in a matrix in row echelon form must occur in different columns.',
    'If every column of a matrix in row echelon form has a leading 1, then all entries that are not leading 1’s are zero.',
    'If a homogeneous linear system of n equations in n unknowns has a corresponding augmented matrix with a reduced row echelon form containing n leading 1’s, then the linear system has only the trivial solution.',
    'If the reduced row echelon form of the augmented matrix for a linear system has a row of zeros, then the system must have infinitely many solutions.',
    'If a linear system has more unknowns than equations, then it must have infinitely many solutions.'
  ]));
  put('T1','Find the reduced row echelon form of the augmented matrix for the linear system\n6x₁ + x₂ + 4x₄ = −3\n−9x₁ + 2x₂ + 3x₃ − 8x₄ = 1\n7x₁ − 4x₃ + 5x₄ = 2\nUse your result to determine whether the system is consistent and, if so, find its solution.');
  put('T2','Find values of the constants A, B, C, and D that make the following equation an identity (i.e., true for all values of x).\n(3x³ + 4x² − 6x)/[(x² + 2x + 2)(x² − 1)] = (Ax + B)/(x² + 2x + 2) + C/(x − 1) + D/(x + 1)\n[Hint: Obtain a common denominator on the right, and then equate corresponding coefficients of the various powers of x in the two numerators. Students of calculus will recognize this as a problem in partial fractions.]');

  // Explanations below are original teaching notes, separate from the book text.
  const explain=(set,number,steps,answer)=>Object.assign(sections[set][String(number)],{steps,...(answer===undefined?{}:{answer})});
  const original=(set,number)=>window.EmberTextbook.solutions[set].find(item=>item.number===String(number));
  explain('1.1',6,[
    'An augmented matrix stores an equation in each row. The final column is the number after the equals sign. The four earlier columns multiply x₁, x₂, x₃ and x₄, in that order.',
    'Part (a), first row: [0, 3, −1, −1 | −1] means 0x₁ + 3x₂ − x₃ − x₄ = −1. The term 0x₁ contributes nothing, so omit it.',
    'Part (a), second row: [5, 2, 0, −3 | −6] means 5x₁ + 2x₂ − 3x₄ = −6. Keep the x₄ label even though the x₃ coefficient is zero.',
    'Part (b), first and second rows: 3x₁ + x₃ − 4x₄ = 3 and −4x₁ + 4x₃ + x₄ = −3. Each negative matrix entry becomes a negative term.',
    'Part (b), third and fourth rows: −x₁ + 3x₂ − 2x₄ = −9 and −x₄ = −2. Check that four matrix rows produced four equations.'
  ]);
  [7,8].forEach(number=>explain('1.1',number,[
    'Make one row for each equation. Reserve a column for every unknown in its written order, then a final column for the right-hand side. A missing unknown gets coefficient 0; it does not lose its column.',
    ...original('1.1',number).steps,
    'Read each completed row back as an equation. Every coefficient, sign and right-hand number must match the corresponding original equation.'
  ]));
  explain('1.1',12,[
    'Look at the left sides: 4x − 6y is exactly twice 2x − 3y. The two equations therefore cannot provide two independent restrictions on x and y.',
    'Subtract twice the first equation from the second: (4x − 6y) − 2(2x − 3y) = b − 2a. All unknowns cancel, leaving 0 = b − 2a.',
    'If b ≠ 2a, this claims that zero equals a nonzero number. That is impossible, so there are no solutions.',
    'If b = 2a, the new equation is 0 = 0. Only 2x − 3y = a remains. Choose any real number t for y, add 3t to both sides, and divide by 2: x = (a + 3t)/2.',
    'Every choice of t gives a solution in the second case, so there are infinitely many. Neither case gives exactly one solution.'
  ]);
  explain('1.1',13,[
    'A parameter is a freely chosen number. Since each part contains one equation, choose all but one unknown freely and use the equation to calculate the remaining unknown.',
    'Part (a): choose y = t. Then 7x − 5t = 3. Add 5t and divide by 7: x = (3 + 5t)/7.',
    'Part (b): choose x₂ = s and x₃ = t. Then 3x₁ − 5s + 4t = 7. Add 5s, subtract 4t, and divide by 3: x₁ = (7 + 5s − 4t)/3.',
    'Part (c): choose x₂ = r, x₃ = s and x₄ = t. Then −8x₁ = 1 − 2r + 5s − 6t. Divide every term by −8: x₁ = (−1 + 2r − 5s + 6t)/8. Dividing by a negative number reverses each numerator sign.',
    'Part (d): choose w = q, x = r, y = s and z = t. Then 3v = 8q − 2r + s − 4t, so v = (8q − 2r + s − 4t)/3.',
    'Every parameter can be any real number, independently of the others. Substitution cancels the parameter terms in each original equation, so these formulas describe all solutions.'
  ]);
  explain('1.1',14,[
    'Use a different parameter for each freely chosen unknown. We then isolate the first unknown by doing the same addition, subtraction or division to both sides.',
    'Part (a): choose y = t. From x + 10t = 2, subtract 10t: x = 2 − 10t.',
    'Part (b): choose x₂ = s and x₃ = t. From x₁ + 3s − 12t = 3, subtract 3s and add 12t: x₁ = 3 − 3s + 12t.',
    'Part (c): choose x₂ = r, x₃ = s and x₄ = t. Subtract 2r + 3s + t from 4x₁ + 2r + 3s + t = 20, then divide by 4: x₁ = (20 − 2r − 3s − t)/4.',
    'Part (d): choose w = q, x = r, y = s and z = t. Subtract q and r, add 5s, and subtract 7t: v = −q − r + 5s − 7t.',
    'All parameters range independently over the real numbers. Each formula was obtained by reversible operations, so it includes every solution.'
  ]);
  explain('1.1',15,[
    'Part (a): equation 2 is three times equation 1, including its right-hand side. It adds no new restriction, so solve just 2x − 3y = 1.',
    'Choose y = t freely. Substitute to get 2x − 3t = 1. Add 3t, then divide by 2: x = (1 + 3t)/2.',
    'Check: 2((1 + 3t)/2) − 3t = 1. Multiplying this equality by 3 also verifies equation 2.',
    'Part (b): equations 2 and 3 are respectively 3 times and −1 times equation 1. Only x₁ + 3x₂ − x₃ = −4 supplies new information.',
    'Choose x₂ = s and x₃ = t independently. Then x₁ + 3s − t = −4. Subtract 3s and add t: x₁ = −4 − 3s + t.',
    'The first equation now reads (−4 − 3s + t) + 3s − t = −4. The other two follow by their multiples. Every real s and t is allowed.'
  ]);
  explain('1.1',16,[
    'Part (a): the first equation is twice the second. Work with the simpler equation 3x₁ + x₂ = −4.',
    'Choose x₂ = t. Subtract t from 3x₁ + t = −4, then divide by 3: x₁ = (−4 − t)/3.',
    'Check: 3((−4 − t)/3) + t = −4. Twice this equality verifies the other equation, for every real t.',
    'Part (b): equations 2 and 3 are 3 times and −2 times equation 1. Thus all solutions are exactly the solutions of 2x − y + 2z = −4.',
    'Choose y = s and z = t. Then 2x − s + 2t = −4. Add s, subtract 2t, and divide by 2: x = −2 + s/2 − t.',
    'Check: 2(−2 + s/2 − t) − s + 2t = −4. The other equations follow by multiplying this equality. Both s and t may be any real numbers.'
  ]);
  explain('1.1',17,[
    'We need the first entry of row 1 to become 1 while keeping all entries of that row integers. A permitted row operation changes the whole row, including the final column.',
    'Part (a): −3 + 2×2 = 1 suggests R₁ ← R₁ + 2R₂. Here Rᵢ means row i, and the arrow means replace that row.',
    'Apply it to all four entries: [−3 + 4, −1 − 6, 2 + 6, 4 + 4] = [1, −7, 8, 8]. The first entry is 1 and no fraction appears.',
    'Part (b): row 3 already begins with 1. Swap rows 1 and 3 in one operation. The new first row is [1, 4, −3, 3], which meets both requirements.'
  ]);
  explain('1.1',18,[
    'Part (a): every entry of row 1 is even. Therefore dividing the whole row by 2 can make its first entry 1 without introducing fractions.',
    'Use R₁ ← R₁/2: [2/2, 4/2, −6/2, 8/2] = [1, 2, −3, 4]. The other rows stay as they are.',
    'Part (b): the first entries 7 and 3 satisfy 7 − 2×3 = 1. Use the single permitted replacement R₁ ← R₁ − 2R₂.',
    'Calculate the whole row: [7 − 6, −4 − 2(−1), −2 − 16, 2 − 2] = [1, −2, −18, 0]. It starts with 1 and contains only integers.'
  ]);
  explain('1.1',19,[
    'A system is consistent when at least one set of values satisfies all its equations. A row [0, 0 | nonzero number] would be a contradiction.',
    'Part (a): replace row 2 by row 2 minus 4 times row 1. Its entries become [4 − 4, 8 − 4k | 2 − 4(−4)] = [0, 8 − 4k | 18].',
    'If k = 2, this says 0x₁ + 0x₂ = 18, which is impossible. If k ≠ 2, divide by 8 − 4k to find x₂; then row 1 gives x₁. Thus precisely k ≠ 2 is allowed.',
    'Part (b): the same operation gives [0, 8 − 4k | −4 − 4(−1)] = [0, 8 − 4k | 0].',
    'If k = 2, this row is 0 = 0 and row 1 allows infinitely many solutions. If k ≠ 2, it forces x₂ = 0 and row 1 gives x₁ = −1. Both cases are consistent, so every real k is allowed.'
  ]);
  explain('1.1',20,[
    'Part (a): add twice row 1 to row 2. The new row is [−6 + 6, 8 − 8 | 5 + 2k] = [0, 0 | 5 + 2k].',
    'The unknowns have vanished, so consistency requires 0 = 5 + 2k. Subtract 5 and divide by 2: k = −5/2.',
    'At that value the second row is redundant and the first row still describes a line of solutions. Every other value of k creates a contradiction.',
    'Part (b): add row 1 to row 2 to get [k + 4, 0 | 0]. If k ≠ −4, it gives x₁ = 0; the original first row then gives x₂ = −2.',
    'If k = −4, the new row is zero. Choose x₁ = t freely and use −4t + x₂ = −2 to obtain x₂ = 4t − 2. Therefore every real k gives at least one solution.'
  ]);
  explain('1.1',21,[
    'A point lies on a curve when its coordinates make the curve equation true. For the first point, substitute x = x₁ and y = y₁ into y = ax² + bx + c.',
    'This gives x₁²a + x₁b + 1c = y₁. Its unknowns are a, b and c; x₁ and y₁ are known coordinates. Its augmented row is [x₁², x₁, 1 | y₁].',
    'Repeat with the second point to get x₂²a + x₂b + c = y₂, and with the third to get x₃²a + x₃b + c = y₃.',
    'Stack the three rows in the same order as the points. They give exactly the matrix in the question. Therefore the curve coefficients satisfy the displayed linear system.'
  ]);
  explain('1.1',23,[
    'Having the same solution set means every pair (x₁,x₂) that satisfies one equation also satisfies the other. We can test convenient choices of x₂.',
    'Choose x₂ = 0. The first equation gives x₁ = c. The pair (c,0) must satisfy the second equation too, so c = d.',
    'Choose x₂ = 1. The first equation gives x₁ = c − k. Insert this same pair into the second equation: c − k + l = d.',
    'Use c = d to cancel those terms, leaving −k + l = 0. Thus k = l. Both the coefficient and the right-hand side agree, so the equations are identical.'
  ]);
  explain('1.1','T1',[
    'Example 2: subtract twice x − y = 1 from 2x + y = 6. The new equation is 3y = 4, so y = 4/3.',
    'Substitute into x − y = 1: x = 1 + 4/3 = 7/3. Both original equations hold, so the utility should report one solution, (7/3,4/3).',
    'Example 3: subtract three copies of x + y = 4 from 3x + 3y = 6. This gives 0 = 6 − 12 = −6. No numbers satisfy that, so the utility should report no solution.',
    'Example 4: subtract four copies of 4x − 2y = 1 from 16x − 8y = 4. This gives 0 = 0, so the second equation repeats the first.',
    'Choose y = t. From 4x − 2t = 1, add 2t and divide by 4: x = 1/4 + t/2. Any real t works, so the utility should report infinitely many solutions.',
    'Different software may use a different parameter name or an equivalent formula. Check by substitution rather than expecting identical text.'
  ]);
  explain('1.1','T2',[
    'First address the printed data: a graph y = ax² + bx + c uses two-coordinate points, but this edition prints triples. A consistent interpretation is that each triple lists (x, x², y), since the middle entries are 1, 0 and 1. The following answer is conditional on that interpretation.',
    'The interpreted points are (−1,4), (0,8) and (1,7). Substitute them into the curve equation: a − b + c = 4, c = 8, and a + b + c = 7.',
    'Use c = 8 in the first and third equations. Subtract 8 from both sides to obtain a − b = −4 and a + b = −1.',
    'Add these two equations. The b terms cancel: 2a = −5, so a = −5/2. Put this into a + b = −1: b = −1 + 5/2 = 3/2.',
    'Check the interpreted points in y = −(5/2)x² + (3/2)x + 8: at x = −1 the result is 4; at 0 it is 8; at 1 it is 7. The printed triples themselves are not ordinary points of this two-dimensional graph.'
  ],'Under the stated interpretation (x, x², y): a = −5/2, b = 3/2, c = 8; y = −(5/2)x² + (3/2)x + 8. The source’s three-entry point notation needs that interpretation.');

  explain('1.2',2,[
    'For row echelon form, each nonzero row must begin with 1, those leading 1’s must move strictly right as you go down, and zero rows must be at the bottom. Reduced form also requires zeros above each leading 1.',
    'Part (a): the pivots are in columns 1 and 2, in staircase order. The 2 above the second pivot prevents reduced form. Echelon only.',
    'Part (b): rows 2 and 3 both begin in column 2, and the third row begins with 2. The staircase condition fails. Neither.',
    'Part (c): the pivots are in columns 1 and 3. The 4 above the column-3 pivot is nonzero, so the form is echelon but not reduced.',
    'Part (d): the staircase is correct, but the 5 above the second pivot is nonzero. Echelon only.',
    'Part (e): a zero row sits above a nonzero row. Zero rows must come last. Neither.',
    'Part (f): rows 1 and 2 both start in column 1; the second leading entry has not moved right. Neither.',
    'Part (g): the pivots are in columns 1 and 3, and both pivot columns are zero everywhere else. Both echelon and reduced echelon.'
  ],'(a) Echelon only. (b) Neither. (c) Echelon only. (d) Echelon only. (e) Neither. (f) Neither. (g) Both.');
  sections['1.2']['3'].answer='(a) Pivot rows: 1, 2, 3; pivot columns: 1, 2, 3. (x₁,x₂,x₃) = (−37,−8,5).\n(b) Pivot rows: 1, 2, 3; pivot columns: 1, 2, 3. x₁ = −10 + 13t, x₂ = −5 + 13t, x₃ = 2 − t, x₄ = t.\n(c) Pivot rows: 1, 2, 3; pivot columns: 1, 3, 4. x₁ = −11 − 7s + 2t, x₂ = s, x₃ = −4 − 3t, x₄ = 9 − 3t, x₅ = t.\n(d) Pivot rows: 1, 2, 3; pivot columns: 1, 2, 4 (column 4 is the augmented column). No solution because the last row says 0 = 1. All parameters in (b) and (c) are arbitrary real numbers.';
  sections['1.2']['4'].answer='(a) Pivot rows: 1, 2, 3; pivot columns: 1, 2, 3. (x₁,x₂,x₃) = (−3,0,7).\n(b) Pivot rows: 1, 2, 3; pivot columns: 1, 2, 3. x₁ = 8 + 7t, x₂ = 2 − 3t, x₃ = −5 − t, x₄ = t.\n(c) Pivot rows: 1, 2, 3; pivot columns: 1, 3, 4. x₁ = −2 + 6s − 3t, x₂ = s, x₃ = 7 − 4t, x₄ = 8 − 5t, x₅ = t.\n(d) Pivot rows: 1, 2, 3; pivot columns: 1, 3, 4 (column 4 is the augmented column). No solution because the last row says 0 = 1. All parameters in (b) and (c) are arbitrary real numbers.';
  explain('1.2',13,[
    'Homogeneous means every right-hand side is zero. Therefore setting all four unknowns to zero always gives a solution. The question asks whether a different, nonzero solution exists.',
    'There are only three equations but four unknowns. Each equation can supply at most one pivot, so row reduction can create at most three pivot variables.',
    'At least one of the four unknowns must therefore be free. Give that free unknown a nonzero value, for example 1, and solve the pivot equations for the others.',
    'Because the system is homogeneous there is no contradictory row, and the chosen nonzero coordinate makes the whole solution nonzero. Thus nontrivial solutions exist without doing the row calculations.'
  ]);
  explain('1.2',23,[
    'The last column is the right-hand side; the first three columns belong to the unknowns. A consistent system with three pivots is unique; a consistent system with a free unknown has infinitely many solutions.',
    'Part (a): the last row fixes x₃, the second then fixes x₂, and the first fixes x₁. This works for every choice of the asterisks, giving a unique solution.',
    'Part (b): the final row is 0 = 0. Choose x₃ freely, use row 2 for x₂, and row 1 for x₁. The system is consistent with infinitely many solutions.',
    'Part (c): the last row says 0 = 1. No unknowns can repair that contradiction, so it is inconsistent.',
    'Part (d): write row 2 as c x₃ = 0 and row 3 as x₃ = d. If c = 0, these agree for any d. If c ≠ 0 and d ≠ 0, they conflict. Thus consistency is inconclusive from the stars alone. Whenever consistent, x₂ is free, so the solution is never unique.'
  ],'(a) Consistent, unique solution. (b) Consistent, infinitely many solutions. (c) Inconsistent. (d) Consistency is inconclusive; if consistent, infinitely many solutions.');
  explain('1.2',24,[
    'Part (a): the last row gives x₃ = 1. Substitute that into row 2 to calculate x₂, then into row 1 to calculate x₁. Each step has coefficient 1, so it always works and the solution is unique.',
    'Part (b): work from the top down. Write the rows as x₁ = p, a x₁ + x₂ = q, and b x₁ + c x₂ + x₃ = r. Here a, b, c, p, q and r stand for the six asterisks.',
    'The first row gives x₁ = p. The second gives x₂ = q − ap. The third then gives x₃ = r − bp − c(q − ap). These exist for every choice of the stars, so this system is always consistent and unique.',
    'Part (c): row 1 says x₁ = 0 and row 2 says x₁ = 1. They cannot both be true. Subtracting them would produce 0 = 1, so it is inconsistent.',
    'Part (d): the last two rows both say x₁ = 1. After substituting into row 1, one equation in x₂ and x₃ remains. If at least one of its coefficients is nonzero, it has infinitely many solutions.',
    'If both those coefficients are zero, row 1 may say 1 = 1 (infinitely many solutions) or 1 = a different number (no solution). Thus consistency is inconclusive; a unique solution is impossible because at most two independent equations constrain three unknowns.'
  ],'(a) Consistent, unique solution. (b) Consistent, unique solution. (c) Inconsistent. (d) Consistency is inconclusive; if consistent, infinitely many solutions.');
  explain('1.2',25,[
    'The first two left sides add to 4x + y + 2z. Subtract both equations from the third. Its new z coefficient is (a² − 14) − 2 = a² − 16, and its right side is (a + 2) − 4 − 2 = a − 4.',
    'We therefore need (a² − 16)z = a − 4. Factor a² − 16 = (a − 4)(a + 4). Before dividing, separate the values a = 4 and a = −4, where division would be by zero.',
    'If a ≠ ±4, divide to get z = 1/(a + 4). Once z is known, the first two equations read x + 2y = 4 + 3z and 3x − y = 2 − 5z. Subtract three times the first from the second: −7y = −10 − 14z, which fixes y, and then x. There is exactly one solution.',
    'If a = 4, the last equation is 0 = 0, so z can be chosen freely. The same first two equations determine x and y for each choice. There are infinitely many solutions.',
    'If a = −4, the last equation becomes 0 = −8. That is impossible, so there is no solution.'
  ]);
  explain('1.2',26,[
    'Rewrite the third z coefficient as −(a² − 3) = 3 − a². Subtract the first equation from the third: x and 2y cancel, leaving (2 − a²)z = a − 2.',
    'The coefficient of z is zero precisely when a² = 2, that is, a = √2 or a = −√2. Separate those cases before dividing.',
    'If a ≠ ±√2, divide to get z = (a − 2)/(2 − a²). Then subtract twice the first original equation from the second: −6y + z = −3, so y = (3 + z)/6. The first equation gives x = 2 − 2y − z. Each is fixed uniquely.',
    'At a = √2 or a = −√2, the reduced equation says 0 = a − 2. Neither value equals 2, so both produce a contradiction and no solution.',
    'Infinitely many solutions would need the reduced equation to be 0 = 0. That would require both a² = 2 and a = 2, which is impossible. There is no infinite-solution case.'
  ]);
  explain('1.2',27,[
    'Subtract equation 2 from equation 1. On the left, (x + 3y − z) − (x + y + 2z) = 2y − 3z. On the right, the result is a − b.',
    'This left side is exactly the left side of equation 3. For the two statements to agree, their right sides must agree: c = a − b. Otherwise subtraction gives 0 = c − a + b, a contradiction.',
    'Check that this condition is sufficient. Choose z = t. Then 2y − 3t = a − b gives y = (a − b + 3t)/2.',
    'Use x + y + 2t = b to get x = b − y − 2t. These values satisfy the first two equations, and equation 3 follows when c = a − b. Thus no further restriction is needed.'
  ]);
  explain('1.2',28,[
    'Form equation 1 minus twice equation 2. Its left side is (x + 3y + z) − 2(−x − 2y + z) = 3x + 7y − z.',
    'That is exactly equation 3’s left side. The right sides must therefore satisfy c = a − 2b. If they differ, the equations contradict one another.',
    'To see that the condition is enough, choose z = t. Adding equations 1 and 2 gives y + 2t = a + b, hence y = a + b − 2t.',
    'Equation 1 now gives x = a − 3y − t. This satisfies the first two equations for any a and b. Their combination automatically satisfies equation 3 when c = a − 2b.'
  ]);
  explain('1.2',29,[
    'To eliminate y, make its coefficients match. Multiply 2x + y = a by 6 to obtain 12x + 6y = 6a.',
    'Subtract 3x + 6y = b from that equation. The y terms cancel: 9x = 6a − b. Divide by 9: x = (6a − b)/9.',
    'Rearrange the first original equation as y = a − 2x. Substitute the value of x: y = a − 2(6a − b)/9 = (9a − 12a + 2b)/9 = (2b − 3a)/9.',
    'Check equation 2: 3x + 6y = (18a − 3b + 12b − 18a)/9 = b. The solution works for every real a and b.'
  ]);
  explain('1.2',30,[
    'Divide the second equation by 2 and the third by 3. They become x₁ + x₃ = b/2 and x₂ + x₃ = c/3.',
    'Subtract x₂ + x₃ = c/3 from x₁ + x₂ + x₃ = a. The common terms cancel, giving x₁ = a − c/3.',
    'Subtract x₁ + x₃ = b/2 from the first equation instead. This gives x₂ = a − b/2.',
    'Use x₁ + x₃ = b/2 to obtain x₃ = b/2 − x₁ = b/2 + c/3 − a.',
    'Check the sums: x₁ + x₂ + x₃ = a; 2(x₁ + x₃) = b; 3(x₂ + x₃) = c. All three original equations hold for every a, b and c.'
  ]);
  explain('1.2',31,[
    'Begin with rows [1,3] and [2,7]. Eliminate the 2 below the first pivot by replacing row 2 with row 2 minus twice row 1.',
    'The new second row is [2 − 2×1, 7 − 2×3] = [0,1]. The matrix with rows [1,3] and [0,1] is in echelon form: its leading 1’s form a staircase.',
    'Continue with another legal operation: replace row 1 by row 1 minus 3 times row 2. It becomes [1 − 0, 3 − 3] = [1,0].',
    'The result is the identity matrix with rows [1,0] and [0,1]. It is a different echelon form, and is also reduced. Both came from the original matrix by permitted row operations.'
  ],'Two possible row echelon forms are\n[1  3]\n[0  1]\nand\n[1  0]\n[0  1].');
  explain('1.2',32,[
    'The aim is the identity matrix, while keeping every intermediate entry an integer. Rᵢ denotes row i. First multiply row 3 by 2: [3,4,5] becomes [6,8,10].',
    'Subtract 3 times row 1 from row 3: [6,8,10] − [6,3,9] = [0,5,1].',
    'Add twice row 2 to row 3: [0,5,1] + [0,−4,−58] = [0,1,−57]. This creates a second-column 1 without fractions.',
    'Add twice this new row 3 to row 2: [0,−2,−29] + [0,2,−114] = [0,0,−143]. Swap rows 2 and 3 to put the pivots in staircase order.',
    'Divide row 3 by −143. Its entries [0,0,−143] become [0,0,1], all integers. Add 57 times row 3 to row 2 to get [0,1,0].',
    'Subtract 3 times row 3 from row 1: [2,1,3] becomes [2,1,0]. Subtract row 2 from row 1 to get [2,0,0].',
    'Finally divide row 1 by 2 to obtain [1,0,0]. The three rows now form I₃. The only divisions were of rows whose entries were exactly divisible, so no intermediate fraction appeared.'
  ]);
  sections['1.2']['33'].answer='All combinations α ∈ {0, π, 2π}, β ∈ {π/2, 3π/2}, γ ∈ {0, π, 2π} solve the system. There are 3 × 2 × 3 = 18 triples.';
  sections['1.2']['36'].title='Solve for the reciprocals first';
  explain('1.2',36,[
    'The unknowns occur in denominators, so x, y and z must all be nonzero. Introduce U = 1/x, V = 1/y and W = 1/z. The equations become U + 2V − 4W = 1; 2U + 3V + 8W = 0; −U + 9V + 10W = 5.',
    'Eliminate U from the second equation by subtracting twice the first: (2U + 3V + 8W) − 2(U + 2V − 4W) = 0 − 2. This gives −V + 16W = −2, or V = 2 + 16W.',
    'Eliminate U from the third equation by adding the first: (−U + 9V + 10W) + (U + 2V − 4W) = 5 + 1. This gives 11V + 6W = 6.',
    'Substitute V = 2 + 16W into that equation: 11(2 + 16W) + 6W = 6. Expand to 22 + 182W = 6. Subtract 22 and divide by 182: W = −16/182 = −8/91.',
    'Calculate V = 2 + 16(−8/91) = (182 − 128)/91 = 54/91. Then use U = 1 − 2V + 4W: U = (91 − 108 − 32)/91 = −49/91 = −7/13.',
    'Return to the original unknowns by taking reciprocals: 1/x = −7/13 gives x = −13/7; 1/y = 54/91 gives y = 91/54; 1/z = −8/91 gives z = −91/8. All are nonzero as required.',
    'Check the first equation using the reciprocals: (−49 + 108 + 32)/91 = 91/91 = 1. Check the second: (−98 + 162 − 64)/91 = 0. Check the third: (49 + 486 − 80)/91 = 455/91 = 5.',
    'The transformed system fixed U, V and W uniquely, and each is nonzero. Taking reciprocals therefore gives exactly one valid original solution.'
  ],'(x,y,z) = (−13/7, 91/54, −91/8).');
  sections['1.2']['37'].answer='a = 1, b = −6, c = 2, d = 10. The curve is y = x³ − 6x² + 2x + 10.';
  explain('1.2',38,[
    'For a circle, a must be nonzero; if a were zero the squared terms would disappear. Dividing the whole equation by a preserves the circle. Choose the convenient normalization a = 1.',
    'Insert (−2,7): (−2)² + 7² − 2b + 7c + d = 0, so −2b + 7c + d = −53. Insert (−4,5): −4b + 5c + d = −41. Insert (4,−3): 4b − 3c + d = −25.',
    'Subtract the second equation from the first: 2b + 2c = −12, so b + c = −6. Subtract the second from the third: 8b − 8c = 16, so b − c = 2.',
    'Add b + c = −6 and b − c = 2 to get 2b = −4, hence b = −2. Substitute into b + c = −6 to get c = −4.',
    'Use −4b + 5c + d = −41: 8 − 20 + d = −41. Add 12 to both sides to obtain d = −29.',
    'The equation is x² + y² − 2x − 4y − 29 = 0. Complete the squares: (x − 1)² + (y − 2)² = 34. This is a circle centered at (1,2), with radius √34.',
    'Check the three points: their squared distances from (1,2) are 9 + 25, 25 + 9, and 9 + 25, each 34. Multiplying all four coefficients by the same nonzero number preserves this circle.'
  ],'One choice is (a,b,c,d) = (1,−2,−4,−29), giving (x − 1)² + (y − 2)² = 34. All choices are λ(1,−2,−4,−29), with λ ≠ 0.');
  explain('1.2',39,[
    'The trivial solution means x = y = z = 0. If it is the only solution of the homogeneous system, there can be no free variable; a free variable could be chosen nonzero.',
    'Thus each of the three variable columns must have a pivot. There are three rows, so the coefficient matrix reduces to the 3 × 3 identity matrix.',
    'The new system has exactly the same coefficients. Apply the same row operations to its augmented matrix, including the right-hand values 3, 7 and 11.',
    'The left side becomes the identity, so the rows read x = a certain number, y = a certain number and z = a certain number. There is no zero coefficient row that could produce a contradiction. Therefore the new system has exactly one solution, although its numbers depend on the given coefficients.'
  ]);
  explain('1.2',42,[
    'Each equation represents a line through (0,0), since substituting x = y = 0 makes its left side zero. Therefore the system always has the trivial solution.',
    'If at least two lines are distinct, they meet only at the origin: two different straight lines cannot share two distinct points. Any solution of all three equations must lie on those two, so only (0,0) remains.',
    'If a nonzero point also satisfies all three equations, then every line contains both that point and the origin. There is only one line through two distinct points, so all three lines must coincide.',
    'Conversely, if all three lines coincide, every point on that line satisfies the system. That includes infinitely many nonzero points. Thus nontrivial solutions occur exactly when the three lines are the same.'
  ]);
  const allReducedPatterns=n=>Array.from({length:2**n},(_,mask)=>{
    const pivotColumns=Array.from({length:n},(_,j)=>j).filter(j=>mask&(1<<j));
    const rows=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>{
      if(i>=pivotColumns.length)return 0;
      if(pivotColumns.includes(j))return Number(j===pivotColumns[i]);
      return j>pivotColumns[i]?'*':0;
    }));
    return 'Pivot columns '+(pivotColumns.length?pivotColumns.map(j=>j+1).join(', '):'none')+':\n'+matrix(rows);
  }).join('\n\n');
  explain('1.2',41,[
    'A reduced row echelon form is determined by where its leading 1’s, or pivots, occur, together with any allowed free entries. First choose a subset of the column numbers as pivot columns.',
    'List the chosen columns in increasing order. Place a leading 1 in the first chosen column of row 1, the second chosen column of row 2, and so on. This makes the staircase move right.',
    'Each pivot must be the only nonzero entry in its column. Also put zeros to the left of each row’s pivot, and fill every row below the last pivot with zeros.',
    'A nonpivot entry to the right of a row’s pivot may be any real number. We mark each such entry with *. Each * can be chosen independently, including zero.',
    'For a 3 × 3 matrix there are 2³ = 8 subsets of columns, giving the eight patterns below. For a 4 × 4 matrix there are 2⁴ = 16 subsets, giving sixteen patterns. The empty subset gives the zero matrix; choosing every column gives the identity. These are patterns, not just eight or sixteen numerical matrices, because the stars may vary.'
  ],'Every * below is an arbitrary real number.\n\n(a) All 3 × 3 patterns:\n'+allReducedPatterns(3)+'\n\n(b) All 4 × 4 patterns:\n'+allReducedPatterns(4));
  explain('1.2','TF',[
    '(a) True. Reduced echelon form satisfies every echelon condition and also requires zeros above the pivots.',
    '(b) False. Begin with rows [1,0] and [0,0], which are in echelon form. Swapping them puts a zero row above a nonzero row and destroys echelon form.',
    '(c) False. Exercise 31 gives two echelon forms of the same matrix: rows [1,3],[0,1] and rows [1,0],[0,1]. Only the reduced echelon form is unique.',
    '(d) True. In a homogeneous system the right-hand column is zero, so all r pivots belong to unknowns. Of n unknowns, r are pivot variables and the other n − r are free.',
    '(e) True. Each leading 1 must lie strictly to the right of the one above. Two cannot occupy the same column.',
    '(f) False. The echelon matrix with rows [1,2] and [0,1] has a leading 1 in every column, but the 2 is nonzero. Echelon form allows nonzero entries above pivots.',
    '(g) True. There are n variable pivots for n unknowns, so none is free. The reduced equations are x₁ = 0 through xₙ = 0, giving only the trivial solution.',
    '(h) False. The augmented matrix with rows [1 | 1] and [0 | 0] has a zero row but still fixes its only unknown at x = 1. A zero row does not automatically create a free variable.',
    '(i) False. More unknowns than equations guarantees a free variable only after consistency is known. For example, x + y + z = 0 and x + y + z = 1 has three unknowns and two equations, yet subtraction gives 0 = 1, so no solution exists.'
  ]);
  sections['1.2']['T1'].answer='Reduced row echelon form:\n[1  0  0  7/9 | −34/63]\n[0  1  0  −2/3 | 5/21]\n[0  0  1  1/9 | −13/9]\nThe system is consistent with infinitely many solutions:\nx₁ = −34/63 − 7t/9, x₂ = 5/21 + 2t/3, x₃ = −13/9 − t/9, x₄ = t, for any real t.';
  sections['1.2']['T2'].answer='A = 32/5, B = 36/5, C = 1/10, D = −7/2. The identity holds for every real x for which the original fractions are defined: x ≠ −1 and x ≠ 1.';

  window.EmberMathQuestions=window.EmberMathQuestions||{};
  Object.assign(window.EmberMathQuestions,sections);
})();
