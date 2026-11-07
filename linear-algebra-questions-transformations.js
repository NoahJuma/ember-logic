(function(){
  'use strict';
  const sets={'1.8':{},'1.9':{}};
  const put=(set,n,text,extra={})=>sets[set][String(n)]={text,...extra};
  const p=(n,text,extra)=>put('1.8',n,text,extra);
  const q=(n,text,extra)=>put('1.9',n,text,extra);
  const matrix=a=>a.map(row=>'['+row.join('  ')+']').join('\n');
  const domains='Find the domain and codomain of the transformation ';
  p(1,domains+'Tₐ(x) = Ax.\n(a) A has size 3 × 2.\n(b) A has size 2 × 3.\n(c) A has size 3 × 3.\n(d) A has size 1 × 6.');
  p(2,domains+'Tₐ(x) = Ax.\n(a) A has size 4 × 5.\n(b) A has size 5 × 4.\n(c) A has size 4 × 4.\n(d) A has size 3 × 1.');
  p(3,domains+'defined by the equations.\n(a) w₁ = 4x₁ + 5x₂\nw₂ = x₁ − 8x₂\n(b) w₁ = 5x₁ − 7x₂\nw₂ = 6x₁ + x₂\nw₃ = 2x₁ + 3x₂');
  p(4,domains+'defined by the equations.\n(a) w₁ = x₁ − 4x₂ + 8x₃\nw₂ = −x₁ + 4x₂ + 2x₃\nw₃ = −3x₁ + 2x₂ − 5x₃\n(b) w₁ = 2x₁ + 7x₂ − 4x₃\nw₂ = 4x₁ − 3x₂ + 2x₃');
  p(5,domains+'defined by the matrix product.\n(a)\n'+matrix([[3,1,2],[6,7,1]])+'\n×\n'+matrix([['x₁'],['x₂'],['x₃']])+'\n(b)\n'+matrix([[2,-1],[4,3],[2,-5]])+'\n×\n'+matrix([['x₁'],['x₂']]));
  p(6,domains+'defined by the matrix product.\n(a)\n'+matrix([[6,3],[-1,7]])+'\n×\n'+matrix([['x₁'],['x₂']])+'\n(b)\n'+matrix([[2,1,-6],[3,7,-4],[1,0,3]])+'\n×\n'+matrix([['x₁'],['x₂'],['x₃']]));
  p(7,domains+'T defined by the formula.\n(a) T(x₁, x₂) = (2x₁ − x₂, x₁ + x₂)\n(b) T(x₁, x₂, x₃) = (4x₁ + x₂, x₁ + x₂)');
  p(8,domains+'T defined by the formula.\n(a) T(x₁, x₂, x₃, x₄) = (x₁, x₂)\n(b) T(x₁, x₂, x₃) = (x₁, x₂ − x₃, x₂)');
  p(9,domains+'T defined by the formula.\nT(\n'+matrix([['x₁'],['x₂']])+'\n) =\n'+matrix([['4x₁'],['x₁ − x₂'],['3x₂']]));
  p(10,domains+'T defined by the formula.\nT(\n'+matrix([['x₁'],['x₂'],['x₃']])+'\n) =\n'+matrix([['x₁'],['x₂'],['x₁ − x₃'],[0]]));
  const standard='Find the standard matrix for the transformation defined by the equations.\n';
  p(11,standard+'(a) w₁ = 2x₁ − 3x₂ + x₃\nw₂ = 3x₁ + 5x₂ − x₃\n(b) w₁ = 7x₁ + 2x₂ − 8x₃\nw₂ = −x₂ + 5x₃\nw₃ = 4x₁ + 7x₂ − x₃');
  p(12,standard+'(a) w₁ = −x₁ + x₂\nw₂ = 3x₁ − 2x₂\nw₃ = 5x₁ − 7x₂\n(b) w₁ = x₁\nw₂ = x₁ + x₂\nw₃ = x₁ + x₂ + x₃\nw₄ = x₁ + x₂ + x₃ + x₄');
  p(13,'Find the standard matrix for the transformation T defined by the formula.\n(a) T(x₁, x₂) = (x₂, −x₁, x₁ + 3x₂, x₁ − x₂)\n(b) T(x₁, x₂, x₃, x₄) = (7x₁ + 2x₂ − x₃ + x₄, x₂ + x₃, −x₁)\n(c) T(x₁, x₂, x₃) = (0, 0, 0, 0, 0)\n(d) T(x₁, x₂, x₃, x₄) = (x₄, x₁, x₃, x₂, x₁ − x₃)');
  p(14,'Find the standard matrix for the operator T defined by the formula.\n(a) T(x₁, x₂) = (2x₁ − x₂, x₁ + x₂)\n(b) T(x₁, x₂) = (x₁, x₂)\n(c) T(x₁, x₂, x₃) = (x₁ + 2x₂ + x₃, x₁ + 5x₂, x₃)\n(d) T(x₁, x₂, x₃) = (4x₁, 7x₂, −8x₃)');
  p(15,'Find the standard matrix for the operator T: ℝ³ → ℝ³ defined by\nw₁ = 3x₁ + 5x₂ − x₃\nw₂ = 4x₁ − x₂ + x₃\nw₃ = 3x₁ + 2x₂ − x₃\nand then compute T(−1, 2, 4) by directly substituting in the equations and then by matrix multiplication.');
  p(16,'Find the standard matrix for the transformation T: ℝ⁴ → ℝ² defined by\nw₁ = 2x₁ + 3x₂ − 5x₃ − x₄\nw₂ = x₁ − 5x₂ + 2x₃ − 3x₄\nand then compute T(1, −1, 2, 4) by directly substituting in the equations and then by matrix multiplication.');
  const apply='Find the standard matrix for the transformation and use it to compute T(x). Check your result by substituting directly in the formula for T.\n';
  p(17,apply+'(a) T(x₁, x₂) = (−x₁ + x₂, x₂); x = (−1, 4)\n(b) T(x₁, x₂, x₃) = (2x₁ − x₂ + x₃, x₂ + x₃, 0); x = (2, 1, −3)');
  p(18,apply+'(a) T(x₁, x₂) = (2x₁ − x₂, x₁ + x₂); x = (−2, 2)\n(b) T(x₁, x₂, x₃) = (x₁, x₂ − x₃, x₂); x = (1, 0, 5)');
  const applyMatrix='Find Tₐ(x), and express your answer in matrix form.\n';
  p(19,applyMatrix+'(a) A =\n'+matrix([[1,2],[3,4]])+'\nx =\n'+matrix([[3],[-2]])+'\n(b) A =\n'+matrix([[-1,2,0],[3,1,5]])+'\nx =\n'+matrix([[-1],[1],[3]]));
  p(20,applyMatrix+'(a) A =\n'+matrix([[-2,1,4],[3,5,7],[6,0,-1]])+'\nx =\n'+matrix([['x₁'],['x₂'],['x₃']])+'\n(b) A =\n'+matrix([[-1,1],[2,4],[7,8]])+'\nx =\n'+matrix([['x₁'],['x₂']]));
  const theorem='Referenced Theorem 1.8.2: T: ℝⁿ → ℝᵐ is a matrix transformation if and only if T(u + v) = T(u) + T(v) and T(cu) = cT(u) for all u, v in ℝⁿ and every scalar c.';
  p(21,'Use Theorem 1.8.2 to show that T is a matrix transformation.\n(a) T(x, y) = (2x + y, x − y)\n(b) T(x₁, x₂, x₃) = (x₁, x₃, x₁ + x₂)\n\n'+theorem);
  p(22,'Use Theorem 1.8.2 to show that T is a matrix transformation.\n(a) T(x, y, z) = (x + y, y + z, x)\n(b) T(x₁, x₂) = (x₂, x₁)\n\n'+theorem);
  p(23,'Use Theorem 1.8.2 to show that T is not a matrix transformation.\n(a) T(x, y) = (x², y)\n(b) T(x, y, z) = (x, y, xz)\n\n'+theorem);
  p(24,'Use Theorem 1.8.2 to show that T is not a matrix transformation.\n(a) T(x, y) = (x, y + 1)\n(b) T(x₁, x₂, x₃) = (x₁, x₂, √x₃)\n\n'+theorem);
  p(25,'A function of the form f(x) = mx + b is commonly called a “linear function” because the graph of y = mx + b is a line. Is f a matrix transformation on ℝ?');
  p(26,'Show that T(x, y) = (0, 0) defines a matrix operator on ℝ² but T(x, y) = (1, 1) does not.');
  const basis='The images of the standard basis vectors for ℝ³ are given for a linear transformation T: ℝ³ → ℝ³. Find the standard matrix for the transformation, and find T(x).\n';
  p(27,basis+'T(e₁) =\n'+matrix([[1],[3],[0]])+'\nT(e₂) =\n'+matrix([[0],[0],[1]])+'\nT(e₃) =\n'+matrix([[4],[-3],[-1]])+'\nx =\n'+matrix([[2],[1],[0]]));
  p(28,basis+'T(e₁) =\n'+matrix([[2],[1],[3]])+'\nT(e₂) =\n'+matrix([[-3],[-1],[0]])+'\nT(e₃) =\n'+matrix([[1],[0],[2]])+'\nx =\n'+matrix([[3],[2],[1]]));
  for(const [n,v]of [[29,'(−1, 2)'],[30,'(a, b)']])p(n,'Use matrix multiplication to find the reflection of '+v+' about the\n(a) x-axis.\n(b) y-axis.\n(c) line y = x.');
  for(const [n,v]of [[31,'(2, −5, 3)'],[32,'(a, b, c)']])p(n,'Use matrix multiplication to find the reflection of '+v+' about the\n(a) xy-plane.\n(b) xz-plane.\n(c) yz-plane.');
  for(const [n,v]of [[33,'(2, −5)'],[34,'(a, b)']])p(n,'Use matrix multiplication to find the orthogonal projection of '+v+' onto the\n(a) x-axis.\n(b) y-axis.');
  for(const [n,v]of [[35,'(−2, 1, 3)'],[36,'(a, b, c)']])p(n,'Use matrix multiplication to find the orthogonal projection of '+v+' onto the\n(a) xy-plane.\n(b) xz-plane.\n(c) yz-plane.');
  p(37,'Use matrix multiplication to find the image of the vector (3, −4) when it is rotated about the origin through an angle of\n(a) θ = 30°.\n(b) θ = −60°.\n(c) θ = 45°.\n(d) θ = 90°.');
  p(38,'Use matrix multiplication to find the image of the nonzero vector v = (v₁, v₂) when it is rotated about the origin through\n(a) a positive angle α.\n(b) a negative angle −α.');
  p(39,'Let T: ℝ² → ℝ² be a linear operator for which the images of the standard basis vectors for ℝ² are T(e₁) = (a, b) and T(e₂) = (c, d). Find T(1, 1).');
  p(40,'Let Tₐ: ℝ² → ℝ² be multiplication by\nA =\n'+matrix([['a','b'],['c','d']])+'\nand let e₁ and e₂ be the standard basis vectors for ℝ². Find the following vectors by inspection.\n(a) Tₐ(ke₁)\n(b) Tₐ(ke₁ + le₂)');
  p(41,'Let Tₐ: ℝ³ → ℝ³ be multiplication by\nA =\n'+matrix([[-1,3,0],[2,1,2],[4,5,-3]])+'\nand let e₁, e₂, and e₃ be the standard basis vectors for ℝ³. Find the following vectors by inspection.\n(a) Tₐ(e₁), Tₐ(e₂), and Tₐ(e₃)\n(b) Tₐ(e₁ + e₂ + e₃)\n(c) Tₐ(7e₃)');
  p(42,'For each orthogonal projection operator in Table 4 use the standard matrix to compute T(1, 2, 3), and convince yourself that your result makes sense geometrically.\n\nReferenced Table 4 — Orthogonal projections in ℝ³:\nOnto the xy-plane:\n'+matrix([[1,0,0],[0,1,0],[0,0,0]])+'\nOnto the xz-plane:\n'+matrix([[1,0,0],[0,0,0],[0,0,1]])+'\nOnto the yz-plane:\n'+matrix([[0,0,0],[0,1,0],[0,0,1]]));
  p(43,'For each reflection operator in Table 2 use the standard matrix to compute T(1, 2, 3), and convince yourself that your result makes sense geometrically.\n\nReferenced Table 2 — Reflections in ℝ³:\nAbout the xy-plane:\n'+matrix([[1,0,0],[0,1,0],[0,0,-1]])+'\nAbout the xz-plane:\n'+matrix([[1,0,0],[0,-1,0],[0,0,1]])+'\nAbout the yz-plane:\n'+matrix([[-1,0,0],[0,1,0],[0,0,1]]));
  p(44,'If multiplication by A rotates a vector x in the xy-plane through an angle θ, what is the effect of multiplying x by Aᵀ? Explain your reasoning.');
  p(45,'Find the standard matrix A for the linear transformation T: ℝ² → ℝ² for which\nT(\n'+matrix([[1],[1]])+'\n) =\n'+matrix([[1],[-2]])+'\nT(\n'+matrix([[2],[3]])+'\n) =\n'+matrix([[-2],[5]]));
  p(46,'Find the standard matrix A for the linear transformation T: ℝ³ → ℝ³ for which\nT(\n'+matrix([[1],[0],[2]])+'\n) =\n'+matrix([[2],[-3],[10]])+'\nT(\n'+matrix([[1],[1],[1]])+'\n) =\n'+matrix([[1],[3],[8]])+'\nT(\n'+matrix([[-3],[-1],[2]])+'\n) =\n'+matrix([[-5],[-11],[7]]));
  p(47,'Let x₀ be a nonzero column vector in ℝ², and suppose that T: ℝ² → ℝ² is the transformation defined by the formula T(x) = x₀ + Rθx, where Rθ is the standard matrix of the rotation of ℝ² about the origin through the angle θ. Give a geometric description of this transformation. Is it a matrix transformation? Explain.');
  p(48,'In each part of the accompanying figure, find the standard matrix for the pictured operator.',{figures:[{file:'figure-1-8-ex48.svg',caption:'Section 1.8 · Figure Ex-48',alt:'Three coordinate interchanges. (a) The point (x,y,z) moves to (x,z,y). (b) It moves to (z,y,x). (c) It moves to (y,x,z).'}]});
  const doubleAngle='A =\n'+matrix([['cos²θ − sin²θ','−2 sinθ cosθ'],['2 sinθ cosθ','cos²θ − sin²θ']]);
  p(49,'In a sentence, describe the geometric effect of multiplying a vector x by the matrix\n'+doubleAngle);
  p(50,'(a) Prove: If T: ℝⁿ → ℝᵐ is a matrix transformation, then T(0) = 0; that is, T maps the zero vector in ℝⁿ into the zero vector in ℝᵐ.\n(b) The converse of this is not true. Find an example of a mapping T: ℝⁿ → ℝᵐ for which T(0) = 0 but which is not a matrix transformation.');
  p('TF','In parts (a)–(g) determine whether the statement is true or false, and justify your answer.\n(a) If A is a 2 × 3 matrix, then the domain of the transformation Tₐ is ℝ².\n(b) If A is an m × n matrix, then the codomain of the transformation Tₐ is ℝⁿ.\n(c) There is at least one linear transformation T: ℝⁿ → ℝᵐ for which T(2x) = 4T(x) for some vector x in ℝⁿ.\n(d) There are linear transformations from ℝⁿ to ℝᵐ that are not matrix transformations.\n(e) If Tₐ: ℝⁿ → ℝⁿ and if Tₐ(x) = 0 for every vector x in ℝⁿ, then A is the n × n zero matrix.\n(f) There is only one matrix transformation T: ℝⁿ → ℝᵐ such that T(−x) = −T(x) for every vector x in ℝⁿ.\n(g) If b is a nonzero vector in ℝⁿ, then T(x) = x + b is a matrix operator on ℝⁿ.');

  const commute='Determine whether the operators T₁ and T₂ commute; that is, whether T₁ ∘ T₂ = T₂ ∘ T₁.\n';
  q(1,commute+'(a) T₁: ℝ² → ℝ² is the reflection about the line y = x, and T₂: ℝ² → ℝ² is the orthogonal projection onto the x-axis.\n(b) T₁: ℝ² → ℝ² is the reflection about the x-axis, and T₂: ℝ² → ℝ² is the reflection about the line y = x.');
  q(2,commute+'(a) T₁: ℝ² → ℝ² is the orthogonal projection onto the x-axis, and T₂: ℝ² → ℝ² is the orthogonal projection onto the y-axis.\n(b) T₁: ℝ² → ℝ² is the rotation about the origin through an angle of π/4, and T₂: ℝ² → ℝ² is the reflection about the y-axis.');
  q(3,commute+'T₁: ℝ³ → ℝ³ is the reflection about the xy-plane and T₂: ℝ³ → ℝ³ is the orthogonal projection onto the yz-plane.');
  q(4,commute+'T₁: ℝ³ → ℝ³ is the reflection about the xy-plane and T₂: ℝ³ → ℝ³ is given by the formula T(x, y, z) = (2x, 3y, z).');
  const compose='Let Tₐ and Tᵦ be the operators whose standard matrices are given. Find the standard matrices for Tᵦ ∘ Tₐ and Tₐ ∘ Tᵦ.\n';
  q(5,compose+'A =\n'+matrix([[1,-2],[4,1]])+'\nB =\n'+matrix([[2,-3],[5,0]]));
  q(6,compose+'A =\n'+matrix([[6,3,-1],[2,0,1],[4,-3,6]])+'\nB =\n'+matrix([[4,0,4],[-1,5,2],[2,-3,8]]));
  q(7,'Find the standard matrix for the stated composition in ℝ².\n(a) A rotation of 90°, followed by a reflection about the line y = x.\n(b) An orthogonal projection onto the y-axis, followed by a 45° degree rotation about the origin.\n(c) A reflection about the x-axis, followed by a rotation about the origin of 60°.');
  q(8,'Find the standard matrix for the stated composition in ℝ².\n(a) A rotation about the origin of 60°, followed by an orthogonal projection onto the x-axis, followed by a reflection about the line y = x.\n(b) An orthogonal projection onto the x-axis, followed by a rotation about the origin of 45°, followed by a reflection about the y-axis.\n(c) A rotation about the origin of 15°, followed by a rotation about the origin of 105°, followed by a rotation about the origin of 60°.');
  q(9,'Find the standard matrix for the stated composition in ℝ³.\n(a) A reflection about the yz-plane, followed by an orthogonal projection onto the xz-plane.\n(b) A reflection about the xy-plane, followed by an orthogonal projection onto the xy-plane.\n(c) An orthogonal projection onto the xy-plane, followed by a reflection about the yz-plane.');
  q(10,'Find the standard matrix for the stated composition in ℝ³.\n(a) A reflection about the xy-plane, followed by an orthogonal projection onto the xz-plane, followed by the transformation that sends each vector x to the vector −x.\n(b) A reflection about the xy-plane, followed by a reflection about the xz-plane, followed by an orthogonal projection onto the yz-plane.\n(c) An orthogonal projection onto the yz-plane, followed by the transformation that maps each vector x to the vector 2x, followed by a reflection about the xy-plane.');
  const pairParts='\n(a) Find the standard matrices for T₁ and T₂.\n(b) Find the standard matrices for T₂ ∘ T₁ and T₁ ∘ T₂.\n(c) Use the matrices obtained in part (b) to find formulas for ';
  q(11,'Let T₁(x₁, x₂) = (x₁ + x₂, x₁ − x₂) and T₂(x₁, x₂) = (3x₁, 2x₁ + 4x₂).'+pairParts+'T₁(T₂(x₁, x₂)) and T₂(T₁(x₁, x₂)).');
  q(12,'Let T₁(x₁, x₂, x₃) = (4x₁, −2x₁ + x₂, −x₁ − 3x₂) and T₂(x₁, x₂, x₃) = (x₁ + 2x₂, −x₃, 4x₁ − x₃).'+pairParts+'T₁(T₂(x₁, x₂, x₃)) and T₂(T₁(x₁, x₂, x₃)).');
  q(13,'Let T₁(x₁, x₂) = (x₁ − x₂, 2x₂ − x₁, 3x₁) and T₂(x₁, x₂, x₃) = (4x₂, x₁ + 2x₂).'+pairParts+'T₁(T₂(x₁, x₂, x₃)) and T₂(T₁(x₁, x₂)).');
  q(14,'Let T₁(x₁, x₂, x₃, x₄) = (x₁ + 2x₂ + 3x₃, x₂ − x₄) and T₂(x₁, x₂) = (−x₁, 0, x₁ + x₂, 3x₂).'+pairParts+'T₁(T₂(x₁, x₂)) and T₂(T₁(x₁, x₂, x₃, x₄)).');
  const dimensionParts='\n(a) Find the standard matrices for T₁ and T₂.\n(b) Find the standard matrices for T₂ ∘ T₁.\n(c) Explain why T₁ ∘ T₂ is not defined.\n(d) Use the matrix found in part (b) to find a formula for (T₂ ∘ T₁)(x, y).';
  q(15,'Let T₁: ℝ² → ℝ⁴ and T₂: ℝ⁴ → ℝ³ be given by:\nT₁(x, y) = (y, x, x + y, x − y)\nT₂(x, y, z, w) = (x + w, y + w, z + w).'+dimensionParts);
  q(16,'Let T₁: ℝ² → ℝ³ and T₂: ℝ³ → ℝ⁴ be given by:\nT₁(x, y) = (x + 2y, 0, 2x + y)\nT₂(x, y, z) = (3z, x − y, 3z, y − x).'+dimensionParts);
  const equationInverse='Express the equations in matrix form, and then use Theorem 1.5.3(c) to determine whether the operator defined by the equations is invertible.\n';
  q(17,equationInverse+'(a) w₁ = 8x₁ + 4x₂\nw₂ = 2x₁ + x₂\n(b) w₁ = −x₁ + 3x₂ + 2x₃\nw₂ = 2x₁ + 4x₃\nw₃ = x₁ + 3x₂ + 6x₃');
  q(18,equationInverse+'(a) w₁ = 2x₁ − 3x₂\nw₂ = 5x₁ + x₂\n(b) w₁ = x₁ + 2x₂ + 3x₃\nw₂ = 2x₁ + 5x₂ + 3x₃\nw₃ = x₁ + 8x₃');
  q(19,'Determine whether the matrix operator T: ℝ² → ℝ² defined by the equations is invertible; if so, find the standard matrix for the inverse operator, and find T⁻¹(w₁, w₂).\n(a) w₁ = x₁ + 2x₂\nw₂ = −x₁ + x₂\n(b) w₁ = 4x₁ − 6x₂\nw₂ = −2x₁ + 3x₂');
  q(20,'Determine whether the matrix operator T: ℝ³ → ℝ³ defined by the equations is invertible; if so, find the standard matrix for the inverse operator, and find T⁻¹(w₁, w₂, w₃).\n(a) w₁ = x₁ − 2x₂ + 2x₃\nw₂ = 2x₁ + x₂ + x₃\nw₃ = x₁ + x₂\n(b) w₁ = x₁ − 3x₂ + 4x₃\nw₂ = −x₁ + x₂ + x₃\nw₃ = −2x₂ + 5x₃');
  const inverseWords='Determine whether the matrix operator is invertible. If so, describe in words the effect of its inverse.\n';
  q(21,inverseWords+'(a) Reflection about the x-axis in ℝ².\n(b) A 60° rotation about the origin in ℝ².\n(c) Orthogonal projection onto the x-axis in ℝ².');
  q(22,inverseWords+'(a) Reflection about the line y = x.\n(b) Orthogonal projection onto the y-axis.\n(c) Reflection about the origin.');
  const inverseImage='Determine whether Tₐ is invertible. If so, compute Tₐ⁻¹(x).\n';
  q(23,inverseImage+'(a) A =\n'+matrix([[1,2],[1,1]])+'\nx =\n'+matrix([[1],[2]])+'\n(b) A =\n'+matrix([[1,1],[1,1]])+'\nx =\n'+matrix([[1],[2]]));
  q(24,inverseImage+'(a) A =\n'+matrix([[1,2,0],[1,1,1],[2,3,1]])+'\nx =\n'+matrix([[1],[2],[3]])+'\n(b) A =\n'+matrix([[1,1,0],[0,1,1],[1,0,1]])+'\nx =\n'+matrix([[1],[2],[3]]));
  const geometricParts='\n(a) What is the geometric effect of applying this transformation to a vector x in ℝ²?\n(b) Express the operator Tₐ as a composition of two linear operators on ℝ².';
  q(25,'Let Tₐ: ℝ² → ℝ² be multiplication by\nA =\n'+matrix([[0,-1],[-1,0]])+geometricParts);
  q(26,'Let Tₐ: ℝ² → ℝ² be multiplication by\n'+doubleAngle+geometricParts);
  q(27,'Prove that the matrix transformations Tₐ and Tᵦ commute if and only if the matrices A and B commute.');
  q(28,'Let Tₐ and Tᵦ be matrix operators on ℝⁿ. Prove that Tₐ ∘ Tᵦ is invertible if and only if both Tₐ and Tᵦ are invertible.');
  q(29,'Prove that the matrix operator Tₐ on ℝⁿ is invertible if and only if for every b in ℝⁿ there exists a unique vector x in ℝⁿ such that Tₐ(x) = b.');
  q('TF','In parts (a)–(g) determine whether the statement is true or false, and justify your answer.\n(a) If Tₐ and Tᵦ are matrix operators on ℝⁿ, then Tₐ(Tᵦ(x)) = Tᵦ(Tₐ(x)) for every vector x in ℝⁿ.\n(b) If Tₐ and Tᵦ are matrix operators on ℝⁿ and x is a vector in ℝⁿ, then Tᵦ ∘ Tₐ(x) = BAx.\n(c) A composition of two rotation operators about the origin of ℝ² is another rotation about the origin.\n(d) A composition of two reflection operators in ℝ² is another reflection operator.\n(e) The inverse transformation for a reflection in ℝ² about the line y = x is the reflection about the line y = x.\n(f) The inverse transformation for a 90° rotation about the origin in ℝ² is a 90° rotation about the origin.\n(g) The inverse transformation for a reflection about the origin in ℝ² is a reflection about the origin.');
  q('T1','(a) Find the standard matrix for the linear operator on ℝ² that performs a counterclockwise rotation of 47° about the origin, followed by a reflection about the y-axis, followed by a counterclockwise rotation of 33° about the origin.\n(b) Find the image of the point (1, 1) under the operator in part (a).');

  // Keep the existing exact arithmetic traces, then expand the explanations that
  // need more intermediate work. This script loads after the solution engine.
  for (const [section,entries] of Object.entries(sets)) {
    for (const old of window.EmberTextbook.solutions[section]) {
      if (entries[old.number]) Object.assign(entries[old.number],{steps:old.steps.slice(),answer:old.answer});
    }
  }
  const improve=(section,n,steps,answer)=>Object.assign(sets[section][String(n)],{steps,...(answer===undefined?{}:{answer})});
  const s=(n,steps,answer)=>improve('1.8',n,steps,answer);
  const t=(n,steps,answer)=>improve('1.9',n,steps,answer);
  const letter=i=>'abcdefghijklmnopqrstuvwxyz'[i];
  const col=v=>matrix(v.map(x=>[x]));
  const tuple=v=>'('+v.join(', ')+')';
  const mul=(a,b)=>a.map(row=>b[0].map((_,j)=>row.reduce((sum,x,k)=>sum+x*b[k][j],0)));
  const dot=(row,v)=>row.map((x,k)=>'('+x+') × ('+v[k]+')').join(' + ');
  const expression=(row,names)=>{
    const parts=[];
    row.forEach((c,i)=>{if(c){const term=(Math.abs(c)===1?'':Math.abs(c))+names[i];parts.push((parts.length?(c<0?' − ':' + '):(c<0?'−':''))+term);}});
    return parts.join('')||'0';
  };
  for(const n of [21,22,23,24,42,43]){
    const entry=sets['1.8'][n],at=entry.text.indexOf('\n\nReferenced');
    if(at!==-1){entry.reference=entry.text.slice(at+2);entry.text=entry.text.slice(0,at);}
  }
  sets['1.8'][48].figures[0].file='figure-1-8-ex48.svg';
  for(const n of [17,18])sets['1.9'][n].reference='Theorem 1.5.3(c), together with part (a): a square matrix A is invertible exactly when its reduced row echelon form is the identity matrix Iₙ. The identity has 1 on its main diagonal and 0 everywhere else.';

  const dimensions={1:[[3,2],[2,3],[3,3],[1,6]],2:[[4,5],[5,4],[4,4],[3,1]],3:[[2,2],[3,2]],4:[[3,3],[2,3]],5:[[2,3],[3,2]],6:[[2,2],[3,3]],7:[[2,2],[2,3]],8:[[2,4],[3,3]],9:[[3,2]],10:[[4,3]]};
  for(const [n,parts]of Object.entries(dimensions)){
    const steps=['A vector is an ordered list of numbers. ℝⁿ means the collection of all lists with n real-number coordinates. The domain describes the allowed inputs; the codomain describes the space in which the outputs are written.',
      'Count input coordinates first, then output coordinates. For an m × n matrix, the input column must have n entries so multiplication fits, and its m rows produce m output entries. Thus the map goes from ℝⁿ to ℝᵐ.'];
    parts.forEach(([m,n],i)=>steps.push((parts.length>1?'Part '+letter(i)+': ':'')+'There are '+n+' input coordinates and '+m+' output coordinates. The domain is ℝ^'+n+' and the codomain is ℝ^'+m+'. Writing ℝ^'+n+' → ℝ^'+m+' records input space first, output space second.'));
    if(+n===7||+n===8)steps.push('Keep every coordinate named in the input, even if the output formula ignores one of them. Ignoring a coordinate does not remove it from the domain.');
    if(+n===10)steps.push('The fourth output is always 0, but it still occupies a fourth coordinate. The codomain is therefore ℝ⁴; the possible outputs form a smaller subset inside ℝ⁴.');
    s(n,steps);
  }
  for(const n of [11,12,13,14])sets['1.8'][n].steps.push('Check the construction by multiplying each matrix row by the input column. A coefficient 1 copies that coordinate, −1 changes its sign, and 0 ignores it. This reproduces every output formula in the question.');
  sets['1.8'][15].steps.push('Check by direct substitution, independently of the row layout: T(−1,2,4) = (−3+10−4, −4−2+4, −3+4−4) = (3,−2,−3). Both methods give the same three coordinates.');
  sets['1.8'][16].steps.push('Check directly in the original equations: w₁ = 2−3−10−4 = −15 and w₂ = 1+5+4−12 = −2. These agree with the matrix product, so T(1,−1,2,4) = (−15,−2).');
  sets['1.8'][17].steps.push('Check the original formulas: (a) T(−1,4) = (−(−1)+4,4) = (5,4). (b) T(2,1,−3) = (4−1−3,1−3,0) = (0,−2,0).');
  sets['1.8'][18].steps.push('Check the original formulas: (a) T(−2,2) = (−4−2,−2+2) = (−6,0). (b) T(1,0,5) = (1,0−5,0) = (1,−5,0).');
  s(19,[
    'Tₐ(x) means multiply A by the input column x. Each output entry is the sum of the products of matching entries in one row of A and the column x.',
    'Part a, first output: 1 × 3 + 2 × (−2) = 3−4 = −1. Second output: 3 × 3 + 4 × (−2) = 9−8 = 1.',
    'Part b, first output: (−1) × (−1) + 2 × 1 + 0 × 3 = 1+2+0 = 3. Second output: 3 × (−1) + 1 × 1 + 5 × 3 = −3+1+15 = 13.',
    'Place the outputs in a column, in the same order as the matrix rows. Each original matrix has two rows, so each answer must have exactly two entries.'
  ],'(a) Tₐ(x) =\n'+col([-1,1])+'\n(b) Tₐ(x) =\n'+col([3,13]));
  s(20,[
    'The input coordinates are symbols because we want one formula that works for every input. Multiply each row by the input column; do not choose particular values for x₁, x₂ or x₃.',
    'Part a, row 1: (−2)x₁ + 1x₂ + 4x₃ = −2x₁+x₂+4x₃.',
    'Part a, row 2: 3x₁+5x₂+7x₃. Row 3: 6x₁+0x₂−x₃ = 6x₁−x₃.',
    'Part b, row 1: (−1)x₁+1x₂ = −x₁+x₂. Row 2: 2x₁+4x₂. Row 3: 7x₁+8x₂.',
    'Write one output per row in a column matrix. Check the sizes: a 3 × 3 matrix times a 3-entry column and a 3 × 2 matrix times a 2-entry column both produce a 3-entry column.'
  ],'(a) Tₐ(x) =\n'+col(['−2x₁+x₂+4x₃','3x₁+5x₂+7x₃','6x₁−x₃'])+'\n(b) Tₐ(x) =\n'+col(['−x₁+x₂','2x₁+4x₂','7x₁+8x₂']));
  s(21,[
    'Theorem 1.8.2 gives two tests: adding inputs must add their outputs, and multiplying an input by any real number c must multiply its output by c. We must prove these for arbitrary inputs, not just a few examples.',
    'Part a: let u=(u₁,u₂) and v=(v₁,v₂). Then T(u+v) = (2(u₁+v₁)+(u₂+v₂), (u₁+v₁)−(u₂+v₂)).',
    'Expand and regroup: T(u+v) = (2u₁+u₂,u₁−u₂) + (2v₁+v₂,v₁−v₂) = T(u)+T(v). This proves the addition test.',
    'For any scalar c, T(cu) = (2cu₁+cu₂,cu₁−cu₂) = c(2u₁+u₂,u₁−u₂) = cT(u). Both tests hold, so part a is a matrix transformation.',
    'Part b: let u=(u₁,u₂,u₃) and v=(v₁,v₂,v₃). Substitution gives T(u+v) = (u₁+v₁,u₃+v₃,u₁+v₁+u₂+v₂).',
    'Group the u-terms and v-terms: T(u+v) = (u₁,u₃,u₁+u₂)+(v₁,v₃,v₁+v₂) = T(u)+T(v).',
    'Also T(cu) = (cu₁,cu₃,cu₁+cu₂) = c(u₁,u₃,u₁+u₂) = cT(u). Thus part b also passes both tests.',
    'As a check, put the coefficients of each output into a row. The resulting standard matrices reproduce the two given formulas.'
  ],'(a) Matrix transformation; A =\n'+matrix([[2,1],[1,-1]])+'\n(b) Matrix transformation; A =\n'+matrix([[1,0,0],[0,0,1],[1,1,0]]));
  s(22,[
    'Use both parts of Theorem 1.8.2: T(u+v)=T(u)+T(v), and T(cu)=cT(u), for every input pair and scalar c. Here a scalar is simply a real number multiplying a vector.',
    'Part a: take u=(u₁,u₂,u₃), v=(v₁,v₂,v₃). Then T(u+v) = (u₁+v₁+u₂+v₂,u₂+v₂+u₃+v₃,u₁+v₁).',
    'Regroup each coordinate: T(u+v) = (u₁+u₂,u₂+u₃,u₁)+(v₁+v₂,v₂+v₃,v₁) = T(u)+T(v).',
    'Next T(cu) = (cu₁+cu₂,cu₂+cu₃,cu₁) = c(u₁+u₂,u₂+u₃,u₁) = cT(u). Therefore part a is a matrix transformation.',
    'Part b: take u=(u₁,u₂), v=(v₁,v₂). Swapping the coordinates of u+v gives T(u+v) = (u₂+v₂,u₁+v₁) = (u₂,u₁)+(v₂,v₁) = T(u)+T(v).',
    'Swapping the coordinates of cu gives T(cu) = (cu₂,cu₁) = c(u₂,u₁) = cT(u). Therefore part b is also a matrix transformation.',
    'Check by reading the coefficients of the outputs into rows: multiplying the final matrices by their input columns recovers the original formulas.'
  ],'(a) Matrix transformation; A =\n'+matrix([[1,1,0],[0,1,1],[1,0,0]])+'\n(b) Matrix transformation; A =\n'+matrix([[0,1],[1,0]]));
  s(23,[
    'A matrix transformation must satisfy T(cu)=cT(u) for every c and u. One counterexample is enough to prove that a proposed transformation fails this requirement.',
    'Part a: choose u=(1,0) and c=2. First transform u: T(1,0)=(1²,0)=(1,0). Doubling this output gives 2T(u)=(2,0).',
    'Now double the input first: 2u=(2,0), so T(2u)=(2²,0)=(4,0). Since (4,0) is not (2,0), the scalar test fails.',
    'Part b: choose u=(1,0,1) and c=2. T(u)=(1,0,1×1)=(1,0,1), so 2T(u)=(2,0,2).',
    'But T(2u)=T(2,0,2)=(2,0,2×2)=(2,0,4). The last coordinates differ: 4≠2. Part b fails the same test.'
  ],'Neither (a) nor (b) is a matrix transformation.');
  s(24,[
    'A matrix transformation must pass the scalar test T(cu)=cT(u). Putting c=0 shows in particular that every matrix transformation must take the zero vector to the zero vector.',
    'Part a: T(0,0)=(0,0+1)=(0,1). This is not (0,0), so the zero-input test fails. Equivalently, T(2(0,0))=(0,1) whereas 2T(0,0)=(0,2).',
    'Part b: choose u=(0,0,1) and c=4, so that both square roots are real. T(u)=(0,0,1), and therefore 4T(u)=(0,0,4).',
    'Transform the multiplied input instead: T(4u)=T(0,0,4)=(0,0,√4)=(0,0,2). Since 2≠4, the scalar test fails.',
    'There is a further domain problem in part b: √x₃ is not a real number for negative x₃, so the displayed rule cannot define a real-valued transformation on all of ℝ³. The positive-input counterexample already proves the required failure of linearity.'
  ],'Neither (a) nor (b) is a matrix transformation.');
  s(25,[
    'A matrix transformation on ℝ uses a 1 × 1 matrix, say [a]. Its output is ax. There is no extra constant term.',
    'Test zero in the given rule: f(0)=m×0+b=b. Every matrix transformation sends 0 to 0, so b must equal 0.',
    'Conversely, when b=0, f(x)=mx=[m]x for every real x. This explicitly supplies the required matrix.',
    'A straight-line graph can have a nonzero intercept b. In linear algebra, a linear transformation must also preserve the origin; this is why the two uses of “linear” differ here.'
  ],'f is a matrix transformation if and only if b=0. In that case its standard matrix is [m].');
  s(26,[
    'To show the first rule is a matrix operator, construct a matrix that produces it for every input. Use the 2 × 2 zero matrix.',
    'Its product with (x,y) is (0x+0y,0x+0y)=(0,0). Thus the zero-output rule is exactly matrix multiplication.',
    'For the second rule, test input (0,0). It produces (1,1). But multiplying any matrix by a zero column gives a zero column, because every product in each row is zero.',
    'Therefore no matrix can produce the constant nonzero output (1,1) for all inputs.'
  ],'T(x,y)=(0,0) has matrix\n'+matrix([[0,0],[0,0]])+'\nT(x,y)=(1,1) is not a matrix operator.');
  for(const [n,a,v]of [[27,[[1,0,4],[3,0,-3],[0,1,-1]],[2,1,0]],[28,[[2,-3,1],[1,-1,0],[3,0,2]],[3,2,1]]]){
    const out=mul(a,v.map(x=>[x])).map(r=>r[0]);
    s(n,['The standard basis vectors are e₁=(1,0,0), e₂=(0,1,0), e₃=(0,0,1). Multiplying A by eⱼ selects column j, so the given T(e₁), T(e₂), T(e₃) must become the first, second and third columns.',
      'Place the given output columns side by side, without rearranging their entries:\nA =\n'+matrix(a),
      'The input is '+tuple(v)+' = '+v[0]+'e₁ + '+v[1]+'e₂ + '+v[2]+'e₃. By linearity, T(x) is the same weighted sum of the three given output vectors.',
      ...a.map((row,i)=>'Output coordinate '+(i+1)+': '+dot(row,v)+' = '+out[i]+'.'),
      'Check each column of A against its corresponding given T(eⱼ). This verifies the standard matrix; the row calculations verify the requested image.'
    ],'A =\n'+matrix(a)+'\nT(x) =\n'+col(out));
  }
  const fx=[[1,0],[0,-1]],fy=[[-1,0],[0,1]],swap=[[0,1],[1,0]],px=[[1,0],[0,0]],py=[[0,0],[0,1]];
  const fxy=[[1,0,0],[0,1,0],[0,0,-1]],fxz=[[1,0,0],[0,-1,0],[0,0,1]],fyz=[[-1,0,0],[0,1,0],[0,0,1]];
  const pxy=[[1,0,0],[0,1,0],[0,0,0]],pxz=[[1,0,0],[0,0,0],[0,0,1]],pyz=[[0,0,0],[0,1,0],[0,0,1]];
  function geometry(n,v,matrices,descriptions,kind){
    const symbolic=typeof v[0]==='string';
    const results=matrices.map(a=>symbolic?a.map(row=>expression(row,v)):mul(a,v.map(x=>[x])).map(r=>r[0]));
    const steps=[kind==='reflection'?'A reflection places a point the same perpendicular distance on the opposite side of the mirror. Coordinates parallel to the mirror stay unchanged.':'An orthogonal projection drops a point straight onto the chosen axis or plane. Coordinates along that axis or plane stay; perpendicular coordinates become zero.',
      'Use one row for each output coordinate. Multiply the entries in that row by the matching input coordinates, then add.'];
    matrices.forEach((a,i)=>{
      const label='Part '+letter(i)+': ';
      steps.push(label+descriptions[i]+' Use the matrix\n'+matrix(a));
      steps.push(label+'the row products are\n'+a.map((r,j)=>dot(r,v)+' = '+results[i][j]).join('\n')+'\nso the image is '+tuple(results[i])+'.');
    });
    steps.push(kind==='reflection'?'Check the geometry: applying the same reflection twice restores each coordinate. The distance from the mirror is unchanged; only its side changes.':'Check the geometry: each answer lies on the specified axis or plane because the perpendicular coordinates are zero. Projecting the answer again leaves it unchanged.');
    s(n,steps,results.map((v,i)=>'('+letter(i)+') '+tuple(v)).join('\n'));
  }
  const reflection2=['The x-axis is the mirror: keep x and negate y.','The y-axis is the mirror: negate x and keep y.','The line y=x is the mirror: exchange x and y.'];
  const reflection3=['The xy-plane has z=0: keep x,y and negate z.','The xz-plane has y=0: keep x,z and negate y.','The yz-plane has x=0: keep y,z and negate x.'];
  const projection2=['Onto the x-axis, keep x and set y=0.','Onto the y-axis, set x=0 and keep y.'];
  const projection3=['Onto the xy-plane, keep x,y and set z=0.','Onto the xz-plane, keep x,z and set y=0.','Onto the yz-plane, keep y,z and set x=0.'];
  geometry(29,[-1,2],[fx,fy,swap],reflection2,'reflection');
  geometry(30,['a','b'],[fx,fy,swap],reflection2,'reflection');
  geometry(31,[2,-5,3],[fxy,fxz,fyz],reflection3,'reflection');
  geometry(32,['a','b','c'],[fxy,fxz,fyz],reflection3,'reflection');
  geometry(33,[2,-5],[px,py],projection2,'projection');
  geometry(34,['a','b'],[px,py],projection2,'projection');
  geometry(35,[-2,1,3],[pxy,pxz,pyz],projection3,'projection');
  geometry(36,['a','b','c'],[pxy,pxz,pyz],projection3,'projection');
  s(37,[
    'A counterclockwise rotation through θ has matrix Rθ =\n'+matrix([['cosθ','−sinθ'],['sinθ','cosθ']])+'. A negative θ turns clockwise. Multiply this matrix by the column (3,−4).',
    'The row products give the formula (3cosθ+4sinθ, 3sinθ−4cosθ). The plus sign in the first coordinate comes from (−sinθ)×(−4).',
    'Part a: cos30°=√3/2 and sin30°=1/2. First coordinate: 3√3/2+4/2=(3√3+4)/2. Second: 3/2−4√3/2=(3−4√3)/2.',
    'Part b: cos(−60°)=1/2 and sin(−60°)=−√3/2. First coordinate: 3/2−4√3/2=(3−4√3)/2. Second: −3√3/2−4/2=(−3√3−4)/2.',
    'Part c: cos45°=sin45°=√2/2. The output is ((3+4)√2/2,(3−4)√2/2)=(7√2/2,−√2/2).',
    'Part d: cos90°=0 and sin90°=1. The output is (3×0+4×1,3×1−4×0)=(4,3).',
    'A rotation preserves length. The original squared length is 3²+(−4)²=25. For example, part c gives (7√2/2)²+(−√2/2)²=49/2+1/2=25; part d gives 4²+3²=25. The same identity cos²θ+sin²θ=1 verifies the other two results.'
  ],'(a) ((3√3+4)/2, (3−4√3)/2)\n(b) ((3−4√3)/2, (−3√3−4)/2)\n(c) (7√2/2, −√2/2)\n(d) (4, 3)');
  s(38,[
    'For a positive angle α, use the counterclockwise rotation matrix Rα =\n'+matrix([['cosα','−sinα'],['sinα','cosα']]),
    'Multiply its first row by the column v: v₁cosα−v₂sinα. Multiply the second row: v₁sinα+v₂cosα. These two expressions form the image in part a.',
    'For part b replace α by −α. The identities cos(−α)=cosα and sin(−α)=−sinα change the matrix to\n'+matrix([['cosα','sinα'],['−sinα','cosα']]),
    'The two row products are v₁cosα+v₂sinα and −v₁sinα+v₂cosα. This is a clockwise turn of size α.',
    'Check the signs using α=90°: part a becomes (−v₂,v₁), and part b becomes (v₂,−v₁), the familiar opposite quarter-turns.'
  ],'(a) (v₁cosα−v₂sinα, v₁sinα+v₂cosα)\n(b) (v₁cosα+v₂sinα, −v₁sinα+v₂cosα)');
  s(39,[
    'The standard basis vectors in ℝ² are e₁=(1,0) and e₂=(0,1). Their sum is e₁+e₂=(1,1).',
    'Because T is linear, it preserves addition: T(1,1)=T(e₁+e₂)=T(e₁)+T(e₂).',
    'Insert the two given images and add corresponding coordinates: (a,b)+(c,d)=(a+c,b+d).',
    'Check with the standard matrix: its columns are (a,b) and (c,d), so multiplying by (1,1) adds those columns.'
  ],'T(1,1) = (a+c, b+d).');
  s(40,[
    'Multiplying A by e₁=(1,0) selects its first column (a,c). Multiplying by e₂=(0,1) selects its second column (b,d).',
    'Part a: ke₁=(k,0), so A(ke₁)=(ak+b×0,ck+d×0)=k(a,c)=(ka,kc).',
    'Part b: ke₁+le₂=(k,l). By linearity its image is k(a,c)+l(b,d).',
    'Add the coordinates: k(a,c)+l(b,d)=(ka+lb,kc+ld). Setting l=0 recovers part a, which checks the formula.'
  ],'(a) (ka, kc)\n(b) (ka+lb, kc+ld)');
  s(41,[
    'Multiplying by a standard basis vector selects the matching matrix column: its single 1 keeps that column, while its zeros remove the other columns.',
    'Part a: read column 1 to get Tₐ(e₁)=(−1,2,4); column 2 gives Tₐ(e₂)=(3,1,5); column 3 gives Tₐ(e₃)=(0,2,−3).',
    'Part b: linearity says to add these three images. Coordinate by coordinate: (−1+3+0,2+1+2,4+5−3)=(2,5,6).',
    'Part c: linearity also allows a scalar to pass through Tₐ. Thus Tₐ(7e₃)=7Tₐ(e₃)=7(0,2,−3)=(0,14,−21).',
    'Check part b directly: e₁+e₂+e₃=(1,1,1), so multiplying A by this column indeed adds the entries across each row.'
  ],'(a) Tₐ(e₁)=(−1,2,4), Tₐ(e₂)=(3,1,5), Tₐ(e₃)=(0,2,−3).\n(b) (2,5,6).\n(c) (0,14,−21).');
  geometry(42,[1,2,3],[pxy,pxz,pyz],projection3,'projection');
  geometry(43,[1,2,3],[fxy,fxz,fyz],reflection3,'reflection');
  s(44,[
    'A rotation by θ has matrix A =\n'+matrix([['cosθ','−sinθ'],['sinθ','cosθ']]),
    'To transpose a matrix, turn its rows into columns. The diagonal entries stay put and the two off-diagonal entries exchange places:\nAᵀ =\n'+matrix([['cosθ','sinθ'],['−sinθ','cosθ']]),
    'Use cos(−θ)=cosθ and sin(−θ)=−sinθ. Then Aᵀ has exactly the standard rotation form with angle −θ.',
    'Thus Aᵀ rotates the original vector through −θ. It reverses the direction of the original rotation. As a check, doing A and then Aᵀ adds the angles θ+(−θ)=0 and restores every vector.'
  ],'Multiplication by Aᵀ rotates x through −θ about the origin.');
  sets['1.8'][45].steps.push('Carry out A=YX⁻¹: row 1 gives (1×3+(−2)×(−1), 1×(−2)+(−2)×1)=(5,−4); row 2 gives ((−2)×3+5×(−1), (−2)×(−2)+5×1)=(−11,9).');
  sets['1.8'][45].steps.push('Verify both givens: A(1,1)=(5−4,−11+9)=(1,−2), and A(2,3)=(10−12,−22+27)=(−2,5).');
  sets['1.8'][45].answer='A =\n'+matrix([[5,-4],[-11,9]]);
  sets['1.8'][46].steps.push('Complete YX⁻¹ using its columns. Row 1 gives ((6−2+10)/7,(−10+8−5)/7,(4+1−5)/7)=(2,−1,0). Row 2 gives ((−9−6+22)/7,(15+24−11)/7,(−6+3−11)/7)=(1,4,−2). Row 3 gives ((30−16−14)/7,(−50+64+7)/7,(20+8+7)/7)=(0,3,5).');
  sets['1.8'][46].steps.push('Check all three inputs: A(1,0,2)=(2,1−4,10)=(2,−3,10); A(1,1,1)=(2−1,1+4−2,3+5)=(1,3,8); A(−3,−1,2)=(−6+1,−3−4−4,−3+10)=(−5,−11,7).');
  sets['1.8'][46].answer='A =\n'+matrix([[2,-1,0],[1,4,-2],[0,3,5]]);
  s(47,[
    'Read the expression in the order it acts on x. First Rθx rotates x about the origin through θ. Then adding x₀ moves the resulting point by the fixed displacement x₀.',
    'This second action is a translation: every point moves the same distance and direction, described by x₀. The rotation occurs before that translation.',
    'Test the origin: Rθ0=0, so T(0)=x₀+0=x₀. The question states that x₀ is nonzero.',
    'Every matrix transformation sends the zero vector to zero. Since this transformation moves it to x₀≠0, it cannot be a matrix transformation.'
  ],'Rotate by θ about the origin, then translate by x₀. This is not a matrix transformation because x₀≠0.');
  s(48,[
    'Read the labelled image in each diagram. To create a matrix, make each row pick the input coordinate required for that output: a 1 selects it, and zeros ignore the other coordinates.',
    'Part a: (x,y,z) becomes (x,z,y). The first output picks x, the second picks z, and the third picks y. The rows are [1,0,0], [0,0,1], [0,1,0].',
    'Part b: (x,y,z) becomes (z,y,x). The rows selecting z, y, x are [0,0,1], [0,1,0], [1,0,0].',
    'Part c: (x,y,z) becomes (y,x,z). The rows selecting y, x, z are [0,1,0], [1,0,0], [0,0,1].',
    'Check by multiplying each displayed matrix by the symbolic column (x,y,z). The results reproduce all three labels in the textbook figure. Each operation swaps two coordinates, so repeating it restores the original vector.'
  ],'(a)\n'+matrix([[1,0,0],[0,0,1],[0,1,0]])+'\n(b)\n'+matrix([[0,0,1],[0,1,0],[1,0,0]])+'\n(c)\n'+matrix([[0,1,0],[1,0,0],[0,0,1]]));
  s(49,[
    'Compare the given matrix with the rotation pattern: the diagonal entries are a cosine, the bottom-left entry is a sine, and the top-right is its negative.',
    'Use the double-angle identities cos(2θ)=cos²θ−sin²θ and sin(2θ)=2sinθcosθ.',
    'Replacing those expressions gives A =\n'+matrix([['cos(2θ)','−sin(2θ)'],['sin(2θ)','cos(2θ)']])+'. This is the standard rotation matrix for the angle 2θ.',
    'Check a familiar angle: θ=45° gives 2θ=90° and the matrix sends (x,y) to (−y,x), a quarter-turn.'
  ],'Multiplication by A rotates x through 2θ about the origin (counterclockwise for a positive angle).');
  s(50,[
    'Part a: being a matrix transformation means there is a fixed m × n matrix A such that T(x)=Ax for every input x.',
    'Set x=0. In each row of A0, every term is an entry of A multiplied by 0, so each row sum is 0. Hence T(0)=A0=0 in ℝᵐ.',
    'Part b asks about the converse: whether sending zero to zero alone guarantees a matrix transformation. To disprove that, one example passing the zero test but failing linearity is enough.',
    'Choose n=m=1 and T(x)=x². It does send 0 to 0 because 0²=0.',
    'But T(2×1)=4 while 2T(1)=2. The scalar test fails, so this rule is not a matrix transformation. The zero test is necessary, but it is not sufficient.'
  ],'(a) T(0)=0 for every matrix transformation.\n(b) Counterexample: T:ℝ→ℝ, T(x)=x². It fixes zero but is not a matrix transformation.');
  s('TF',[
    'Part a: false. A 2 × 3 matrix needs an input column with 3 entries. Its domain is ℝ³; its two rows produce an output in ℝ².',
    'Part b: false in general. An m × n matrix has m rows, so its codomain is ℝᵐ. The stated ℝⁿ is the domain; the two spaces coincide only when m=n.',
    'Part c: true. Choose the zero transformation T(x)=0. For every x, T(2x)=0 and 4T(x)=4×0=0. The statement only asks for at least one transformation and some vector.',
    'Part d: false. For a linear map on ℝⁿ, use T(e₁),…,T(eₙ) as the columns of A. Since x=x₁e₁+⋯+xₙeₙ, linearity gives T(x)=x₁T(e₁)+⋯+xₙT(eₙ)=Ax. Thus every such linear transformation has a matrix.',
    'Part e: true. Test each basis vector eⱼ. Aeⱼ is column j, and the hypothesis says Aeⱼ=0. Every column of A is therefore zero.',
    'Part f: false. Every matrix transformation satisfies T(−x)=A(−x)=−Ax=−T(x). There are many matrices with the required size, including the zero matrix and a matrix with a single nonzero entry.',
    'Part g: false. T(0)=b≠0, whereas matrix multiplication always sends 0 to 0. A nonzero translation is not a matrix operator.'
  ],'(a) False; (b) False; (c) True; (d) False; (e) True; (f) False; (g) False.');

  t(1,[
    'Two operators commute when doing them in either order gives the same result for every input. Read T₁∘T₂ from right to left: apply T₂ first, then T₁.',
    'Part a: T₁(x,y)=(y,x), because reflection in y=x swaps coordinates. T₂(x,y)=(x,0), because projection onto the x-axis removes y.',
    'Apply T₂ then T₁: (x,y) → (x,0) → (0,x). Reverse the order: (x,y) → (y,x) → (y,0). The resulting formulas differ.',
    'For a concrete check, input (1,0) gives (0,1) in the first order and (0,0) in the reverse order. Therefore the operators in part a do not commute.',
    'Part b: T₁(x,y)=(x,−y) and T₂(x,y)=(y,x). Applying T₂ then T₁ gives (y,−x); applying T₁ then T₂ gives (−y,x).',
    'At input (1,0), these are (0,−1) and (0,1). One counterexample disproves equality for every vector, so part b also does not commute.'
  ],'(a) Do not commute.\n(b) Do not commute.');
  t(2,[
    'To prove commutation, show both orders agree for a general input. To disprove it, find one input for which they disagree.',
    'Part a: T₁ projects onto x and T₂ projects onto y. For any (x,y), applying T₂ then T₁ gives (x,y) → (0,y) → (0,0).',
    'Reverse the order: (x,y) → (x,0) → (0,0). Both orders are the zero operator, so these projections commute.',
    'Part b: π/4 radians is 45°. Test e₁=(1,0). Reflecting in the y-axis first gives (−1,0), then a 45° rotation gives (−√2/2,−√2/2).',
    'Rotate first instead: (1,0) → (√2/2,√2/2). Reflecting that in the y-axis gives (−√2/2,√2/2). The second coordinates have opposite signs, so these operators do not commute.'
  ],'(a) Commute; both compositions send every vector to (0,0).\n(b) Do not commute.');
  t(3,[
    'Reflection in the xy-plane keeps x,y and negates z, so T₁(x,y,z)=(x,y,−z). Projection onto the yz-plane removes x, so T₂(x,y,z)=(0,y,z).',
    'Apply T₂ first: (x,y,z) → (0,y,z) → (0,y,−z). Thus T₁(T₂(x,y,z))=(0,y,−z).',
    'Reverse the order: (x,y,z) → (x,y,−z) → (0,y,−z). Thus T₂(T₁(x,y,z)) has exactly the same formula.',
    'Since x,y,z were arbitrary, equality holds for every vector. Geometrically one action changes x while the other changes z, so neither action interferes with the other.'
  ],'They commute. Both compositions send (x,y,z) to (0,y,−z).');
  t(4,[
    'Write the operations as coordinate rules: T₁(x,y,z)=(x,y,−z), and T₂(x,y,z)=(2x,3y,z).',
    'Apply T₂ then T₁: (x,y,z) → (2x,3y,z) → (2x,3y,−z).',
    'Apply T₁ then T₂: (x,y,z) → (x,y,−z) → (2x,3y,−z).',
    'The two formulas agree for every input. Scaling the x and y coordinates does not affect the z-coordinate reflection, so the operators commute.'
  ],'They commute. Both compositions send (x,y,z) to (2x,3y,−z).');

  function productSteps(left,right,label){
    const result=mul(left,right);
    return left.flatMap((row,i)=>[
      label+', row '+(i+1)+': use the row '+tuple(row)+' from the left matrix. Pair it with each column of the right matrix, multiply matching entries and add.',
      ...right[0].map((_,j)=>'Entry ('+(i+1)+','+(j+1)+'): '+dot(row,right.map(r=>r[j]))+' = '+result[i][j]+'.')
    ]);
  }
  function composeMatrices(n,a,b,formulas=false,reverse=true,names=['x₁','x₂','x₃','x₄']){
    const ba=mul(b,a),ab=reverse?mul(a,b):null;
    const steps=[formulas?'Part a: a standard matrix has one row per output and one column per input. Read each coefficient in input order, using 0 for an input absent from that output.':'A is the matrix for Tₐ and B is the matrix for Tᵦ. A composition performs one whole transformation and then feeds its result into the next.',
      'The two matrices are\nA =\n'+matrix(a)+'\nB =\n'+matrix(b)+'. Their sizes are '+a.length+' × '+a[0].length+' and '+b.length+' × '+b[0].length+'.',
      'For '+(formulas?'T₂∘T₁':'Tᵦ∘Tₐ')+', apply A first and B second: x → Ax → B(Ax)=(BA)x. The matrix for the first action is on the right. The product BA has size '+b.length+' × '+a[0].length+'.',
      ...productSteps(b,a,'BA'),
      'Collect those entries, keeping their row and column positions:\nBA =\n'+matrix(ba)];
    if(reverse){
      steps.push('For the reverse order, x → Bx → A(Bx)=(AB)x. Multiply A on the left of B. The resulting matrix has size '+a.length+' × '+b[0].length+'.',...productSteps(a,b,'AB'),'Collect the reverse-order entries:\nAB =\n'+matrix(ab));
    }else{
      steps.push('Part c: the reverse composition T₁∘T₂ would feed the '+b.length+' coordinates from T₂ into T₁, which accepts exactly '+a[0].length+' coordinates. Those sizes do not match. Equivalently, AB cannot be multiplied because '+a[0].length+'≠'+b.length+'.');
    }
    if(formulas){
      steps.push('For the requested coordinate formula, multiply each row of the composite matrix by the input column. This turns each row of coefficients back into one output expression.',
        'T₂(T₁('+names.slice(0,a[0].length).join(',')+')) = '+tuple(ba.map(r=>expression(r,names)))+'.');
      if(reverse)steps.push('T₁(T₂('+names.slice(0,b[0].length).join(',')+')) = '+tuple(ab.map(r=>expression(r,names)))+'.');
      steps.push('Check with direct substitution at the first standard basis vector: T₁(e₁) is column 1 of A; applying B to it gives column 1 of BA, '+tuple(ba.map(r=>r[0]))+'. This agrees with the first-input coefficients in the final formula.');
    }
    const answer=(formulas?'(a) A =\n'+matrix(a)+'\nB =\n'+matrix(b)+'\n(b) ':'')+(formulas?'[T₂∘T₁]':'[Tᵦ∘Tₐ]')+' = BA =\n'+matrix(ba)+(reverse?'\n'+(formulas?'[T₁∘T₂]':'[Tₐ∘Tᵦ]')+' = AB =\n'+matrix(ab):'\n(c) T₁∘T₂ is not defined: the input and output dimensions do not match.')+(formulas?'\n'+(reverse?'(c) ':'(d) ')+'T₂(T₁('+names.slice(0,a[0].length).join(',')+')) = '+tuple(ba.map(r=>expression(r,names)))+(reverse?'\nT₁(T₂('+names.slice(0,b[0].length).join(',')+')) = '+tuple(ab.map(r=>expression(r,names))):''):'');
    t(n,steps,answer);
  }
  composeMatrices(5,[[1,-2],[4,1]],[[2,-3],[5,0]]);
  composeMatrices(6,[[6,3,-1],[2,0,1],[4,-3,6]],[[4,0,4],[-1,5,2],[2,-3,8]]);
  composeMatrices(11,[[1,1],[1,-1]],[[3,0],[2,4]],true);
  composeMatrices(12,[[4,0,0],[-2,1,0],[-1,-3,0]],[[1,2,0],[0,0,-1],[4,0,-1]],true);
  composeMatrices(13,[[1,-1],[-1,2],[3,0]],[[0,4,0],[1,2,0]],true);
  composeMatrices(14,[[1,2,3,0],[0,1,0,-1]],[[-1,0],[0,0],[1,1],[0,3]],true);
  composeMatrices(15,[[0,1],[1,0],[1,1],[1,-1]],[[1,0,0,1],[0,1,0,1],[0,0,1,1]],true,false,['x','y']);
  composeMatrices(16,[[1,2],[0,0],[2,1]],[[0,0,3],[1,-1,0],[0,0,3],[-1,1,0]],true,false,['x','y']);
  const readRows='To turn a coordinate rule into its standard matrix, put the coefficients of x,y (and z in space) into successive rows. A missing variable has coefficient 0.';
  t(7,[
    'Follow the geometric operations in the stated order. For a rotation use (x,y) → (xcosθ−ysinθ, xsinθ+ycosθ). '+readRows,
    'Part a: a 90° rotation sends (x,y) to (−y,x). Reflection in y=x then swaps these coordinates, giving (x,−y).',
    'The first output x has coefficients [1,0], and the second output −y has coefficients [0,−1]. These are the two matrix rows.',
    'Part b: projection onto the y-axis gives (0,y). At 45°, cos45°=sin45°=√2/2. Rotate: (0×√2/2−y√2/2,0×√2/2+y√2/2)=(−y√2/2,y√2/2).',
    'These outputs have x,y coefficient rows [0,−√2/2] and [0,√2/2]. The zero first column records that projection erased the original x-coordinate.',
    'Part c: reflecting in the x-axis gives (x,−y). With cos60°=1/2 and sin60°=√3/2, rotation gives (x/2−(−y)√3/2,x√3/2+(−y)/2).',
    'Simplify to (x/2+y√3/2,x√3/2−y/2). Read off rows [1/2,√3/2] and [√3/2,−1/2].',
    'Check by multiplying each answer matrix by the generic input column (x,y). It must reproduce the corresponding two-stage coordinate result.'
  ],'(a)\n'+matrix([[1,0],[0,-1]])+'\n(b)\n'+matrix([[0,'−√2/2'],[0,'√2/2']])+'\n(c)\n'+matrix([['1/2','√3/2'],['√3/2','−1/2']]));
  t(8,[
    'Track a general point through all three actions, keeping intermediate coordinates so that the order is clear. '+readRows,
    'Part a: a 60° rotation produces (x/2−y√3/2,x√3/2+y/2). Call the first coordinate u=x/2−y√3/2.',
    'Projection onto the x-axis gives (u,0), and reflection in y=x swaps this to (0,u). Thus the final rule is (0,x/2−y√3/2). Its matrix rows are [0,0] and [1/2,−√3/2].',
    'Part b: projection onto the x-axis gives (x,0). A 45° rotation gives (x√2/2,x√2/2). Reflection in the y-axis negates only the first coordinate, giving (−x√2/2,x√2/2).',
    'The rows are [−√2/2,0] and [√2/2,0]. Neither output depends on the original y because the first projection removed it.',
    'Part c: all three rotations have the same centre, so add their angles: 15°+105°+60°=180°. A half-turn sends (x,y) to (−x,−y).',
    'The coefficient rows for that half-turn are [−1,0] and [0,−1]. As a check, the matrices in a and b send every input to a single line, while c preserves length and reverses direction.'
  ],'(a)\n'+matrix([[0,0],['1/2','−√3/2']])+'\n(b)\n'+matrix([['−√2/2',0],['√2/2',0]])+'\n(c)\n'+matrix([[-1,0],[0,-1]]));
  t(9,[
    'A reflection in a coordinate plane negates the perpendicular coordinate; a projection onto that plane sets the perpendicular coordinate to 0. '+readRows,
    'Part a: reflect in yz, so (x,y,z) → (−x,y,z). Then project onto xz by removing y: (−x,0,z).',
    'The outputs −x, 0, z have coefficient rows [−1,0,0], [0,0,0], [0,0,1].',
    'Part b: reflect in xy, so (x,y,z) → (x,y,−z). Project onto xy and remove the third coordinate: (x,y,0). Its rows are [1,0,0], [0,1,0], [0,0,0].',
    'Part c: project onto xy first: (x,y,z) → (x,y,0). Then reflect in yz by negating x: (−x,y,0). Its rows are [−1,0,0], [0,1,0], [0,0,0].',
    'Check that each zero output in the final coordinate rules corresponds to a whole zero row. This is essential: a projection really does remove that coordinate.'
  ],'(a)\n'+matrix([[-1,0,0],[0,0,0],[0,0,1]])+'\n(b)\n'+matrix(pxy)+'\n(c)\n'+matrix([[-1,0,0],[0,1,0],[0,0,0]]));
  t(10,[
    'Work from the first stated action to the last, recording the coordinates after every action. '+readRows,
    'Part a: (x,y,z) → (x,y,−z) after reflection in xy; → (x,0,−z) after projection onto xz; → (−x,0,z) after negating the whole vector.',
    'The last negation changes −z back to z. Read the final coefficients into rows: [−1,0,0], [0,0,0], [0,0,1].',
    'Part b: (x,y,z) → (x,y,−z) after reflection in xy; → (x,−y,−z) after reflection in xz; → (0,−y,−z) after projection onto yz.',
    'This gives rows [0,0,0], [0,−1,0], [0,0,−1]. The projection removes x, while both reflected signs remain.',
    'Part c: (x,y,z) → (0,y,z) after projection onto yz; → (0,2y,2z) after doubling; → (0,2y,−2z) after reflection in xy.',
    'The rows are [0,0,0], [0,2,0], [0,0,−2]. Check by multiplying the final matrix by (x,y,z); both the doubling and the last sign change must appear.'
  ],'(a)\n'+matrix([[-1,0,0],[0,0,0],[0,0,1]])+'\n(b)\n'+matrix([[0,0,0],[0,-1,0],[0,0,-1]])+'\n(c)\n'+matrix([[0,0,0],[0,2,0],[0,0,-2]]));
  t(17,[
    'Write w=Ax, where the rows of A contain the coefficients of x₁,x₂,… in the output equations. Theorem 1.5.3(c) says this square matrix is invertible exactly when its reduced row echelon form is the identity.',
    'Part a, matrix form:\n'+col(['w₁','w₂'])+' =\n'+matrix([[8,4],[2,1]])+' ×\n'+col(['x₁','x₂']),
    'Divide row 1 by 8: [8,4] becomes [1,1/2]. Then replace row 2 by row 2−2(row 1): [2−2,1−2×(1/2)]=[0,0].',
    'The reduced row echelon form is\n'+matrix([[1,'1/2'],[0,0]])+'. It is not I₂ because its second row is zero. Therefore part a is not invertible.',
    'Part b, matrix form:\n'+col(['w₁','w₂','w₃'])+' =\n'+matrix([[-1,3,2],[2,0,4],[1,3,6]])+' ×\n'+col(['x₁','x₂','x₃']),
    'Swap rows 1 and 2, then divide the new row 1 by 2. This gives\n'+matrix([[1,0,2],[-1,3,2],[1,3,6]]),
    'Add row 1 to row 2: [−1+1,3+0,2+2]=[0,3,4]. Subtract row 1 from row 3: [1−1,3−0,6−2]=[0,3,4]. The last two rows are identical.',
    'Subtract row 2 from row 3, then divide row 2 by 3. The reduced row echelon form is\n'+matrix([[1,0,2],[0,1,'4/3'],[0,0,0]])+'. It is not I₃, so part b is not invertible.',
    'A geometric check: a zero row in the reduced square matrix means some input information cannot be recovered uniquely. Neither operator can have an inverse.'
  ],'(a) w=Ax with A=\n'+matrix([[8,4],[2,1]])+'\nNot invertible.\n(b) w=Ax with A=\n'+matrix([[-1,3,2],[2,0,4],[1,3,6]])+'\nNot invertible.');
  t(18,[
    'Theorem 1.5.3(c) asks whether row reduction turns the coefficient matrix into the identity. An identity row has one 1 in its own coordinate and 0 in every other coordinate.',
    'Part a, matrix form:\n'+col(['w₁','w₂'])+' =\n'+matrix([[2,-3],[5,1]])+' ×\n'+col(['x₁','x₂']),
    'Divide row 1 by 2 to obtain [1,−3/2]. Replace row 2 by row 2−5(row 1): [5−5,1−5×(−3/2)]=[0,17/2].',
    'Multiply row 2 by 2/17 to make [0,1]. Add (3/2) times row 2 to row 1 to make [1,0]. The result is I₂, so part a is invertible.',
    'Part b, matrix form:\n'+col(['w₁','w₂','w₃'])+' =\n'+matrix([[1,2,3],[2,5,3],[1,0,8]])+' ×\n'+col(['x₁','x₂','x₃']),
    'Replace row 2 by row 2−2(row 1): [0,1,−3]. Replace row 3 by row 3−row 1: [0,−2,5]. The matrix is now\n'+matrix([[1,2,3],[0,1,-3],[0,-2,5]]),
    'Add twice row 2 to row 3: [0,−2+2,5−6]=[0,0,−1]. Multiply row 3 by −1 to obtain [0,0,1].',
    'Add 3 times row 3 to row 2, making [0,1,0]. Subtract 3 times row 3 from row 1, making [1,2,0]. Finally subtract twice row 2 from row 1, making [1,0,0].',
    'The final matrix is I₃. Both matrices reduced to identities, so each output has exactly one recoverable input and both operators are invertible.'
  ],'(a) w=Ax with A=\n'+matrix([[2,-3],[5,1]])+'\nInvertible; reduced row echelon form I₂.\n(b) w=Ax with A=\n'+matrix([[1,2,3],[2,5,3],[1,0,8]])+'\nInvertible; reduced row echelon form I₃.');
  sets['1.9'][19].steps.push('Part a: multiply the inverse by the output column. Its rows give x₁=(w₁−2w₂)/3 and x₂=(w₁+w₂)/3. Substitution checks both original equations: x₁+2x₂=(w₁−2w₂+2w₁+2w₂)/3=w₁; −x₁+x₂=(−w₁+2w₂+w₁+w₂)/3=w₂.');
  sets['1.9'][19].steps.push('Part b has no inverse because different inputs collapse to the same output. For example (0,0) and (3,2) both give (0,0): 4×3−6×2=0 and −2×3+3×2=0.');
  sets['1.9'][19].answer='(a) Invertible; A⁻¹ =\n'+matrix([['1/3','−2/3'],['1/3','1/3']])+'\nT⁻¹(w₁,w₂)=((w₁−2w₂)/3,(w₁+w₂)/3).\n(b) Not invertible; no inverse operator exists.';
  sets['1.9'][20].steps.push('Part a: the rows of A⁻¹ give x₁=w₁−2w₂+4w₃, x₂=−w₁+2w₂−3w₃, x₃=−w₁+3w₂−5w₃. These are the three coordinates of T⁻¹(w₁,w₂,w₃).');
  sets['1.9'][20].steps.push('Check by substituting those expressions into the original equations. For w₁, the coefficients become (1+2−2)w₁+(−2−4+6)w₂+(4+6−10)w₃=w₁. For w₂ they become (2−1−1)w₁+(−4+2+3)w₂+(8−3−5)w₃=w₂. Finally x₁+x₂=(1−1)w₁+(−2+2)w₂+(4−3)w₃=w₃.');
  sets['1.9'][20].steps.push('Part b: row 3 equals row 1+row 2. One output equation repeats information already in the other two; row reduction confirms the missing pivot and the absence of an inverse.');
  sets['1.9'][20].answer='(a) Invertible; A⁻¹ =\n'+matrix([[1,-2,4],[-1,2,-3],[-1,3,-5]])+'\nT⁻¹(w₁,w₂,w₃)=(w₁−2w₂+4w₃,−w₁+2w₂−3w₃,−w₁+3w₂−5w₃).\n(b) Not invertible; no inverse operator exists.';
  t(21,[
    'An inverse must undo the transformation and recover the original point from every output. If two different points have the same output, this is impossible.',
    'Part a: reflection in the x-axis sends (x,y) to (x,−y). Reflect again: (x,−y) → (x,−(−y))=(x,y). It undoes itself for every point.',
    'Part b: the original rotation turns counterclockwise by 60°. A clockwise turn of 60°, that is a rotation by −60°, cancels it because 60°+(−60°)=0°.',
    'Part c: projection onto the x-axis sends (x,y) to (x,0), losing the original y-coordinate. For example, (1,0) and (1,2) both become (1,0). An inverse would have to choose two different answers for the same output, so it cannot exist.'
  ],'(a) Invertible; its inverse is reflection in the x-axis again.\n(b) Invertible; its inverse is a clockwise 60° rotation about the origin.\n(c) Not invertible.');
  t(22,[
    'To find an inverse, seek an operation that restores every starting point. To show there is none, find two starting points that become indistinguishable.',
    'Part a: reflection in y=x swaps the coordinates: (x,y) → (y,x). Swapping again gives (x,y), so the same reflection is the inverse.',
    'Part b: projection onto the y-axis gives (0,y), erasing x. The distinct points (0,1) and (2,1) both become (0,1). There is no unique way to recover the input, so no inverse exists.',
    'Part c: reflection about the origin gives (−x,−y). Apply it again: (−(−x),−(−y))=(x,y). Thus this operator is also its own inverse.'
  ],'(a) Invertible; reflect in y=x again.\n(b) Not invertible.\n(c) Invertible; reflect about the origin again.');
  sets['1.9'][23].steps.push('Part a: now apply the inverse to the requested vector, rather than stopping at the inverse matrix. The row products give (−1)×1+2×2=3 and 1×1+(−1)×2=−1. Thus Tₐ⁻¹(x)=(3,−1). Check: A(3,−1)=(3−2,3−1)=(1,2)=x.');
  sets['1.9'][23].steps.push('Part b: every output has equal coordinates (u+v,u+v). In particular the requested vector (1,2) is not even an output. The singular matrix has no inverse operator.');
  sets['1.9'][23].answer='(a) Invertible; Tₐ⁻¹(x)=\n'+col([3,-1])+'\n(b) Not invertible; Tₐ⁻¹ does not exist.';
  sets['1.9'][24].steps.push('Part b: apply A⁻¹ to (1,2,3). First row: (1−2+3)/2=1. Second row: (1+2−3)/2=0. Third row: (−1+2+3)/2=2. Thus the inverse image is (1,0,2).');
  sets['1.9'][24].steps.push('Check with the original matrix in part b: A(1,0,2)=(1+0,0+2,1+2)=(1,2,3), exactly the requested x. Part a has no inverse because its third row is the sum of its first two rows.');
  sets['1.9'][24].answer='(a) Not invertible; Tₐ⁻¹ does not exist.\n(b) Invertible; Tₐ⁻¹(x)=\n'+col([1,0,2]);
  t(25,[
    'Multiply the matrix by a general input: the first output is 0x−y=−y; the second is −x+0y=−x. Hence Tₐ(x,y)=(−y,−x).',
    'To identify its mirror line, take a point on y=−x, say (r,−r). Its image is (r,−r), so every point on that line is fixed.',
    'A vector perpendicular to that line has the form (r,r); it is sent to (−r,−r), reversing its direction. Keeping the mirror-line component and reversing the perpendicular component is reflection across y=−x.',
    'For part b, first swap the coordinates by reflection in y=x: S(x,y)=(y,x). Then reflect about the origin: N(u,v)=(−u,−v). The composite N(S(x,y))=(−y,−x) is exactly Tₐ.',
    'Both steps are linear. Their matrices multiply in the same order: [N][S] = (−I₂) ×\n'+matrix(swap)+' =\n'+matrix([[0,-1],[-1,0]])+'. This verifies the composition.'
  ],'(a) Reflection across the line y=−x.\n(b) Tₐ=N∘S, where S reflects in y=x and N reflects about the origin.');
  t(26,[
    'Use cos(2θ)=cos²θ−sin²θ and sin(2θ)=2sinθcosθ to rewrite the given matrix as\n'+matrix([['cos(2θ)','−sin(2θ)'],['sin(2θ)','cos(2θ)']]),
    'This is the standard rotation matrix R₂θ. Therefore applying it to any vector rotates that vector through 2θ about the origin.',
    'For part b, choose two successive rotations through θ about the same origin. Their angles add, giving θ+θ=2θ.',
    'Verify by multiplication: RθRθ has entries cosθcosθ−sinθsinθ, −cosθsinθ−sinθcosθ, sinθcosθ+cosθsinθ, and −sinθsinθ+cosθcosθ.',
    'Simplifying those four entries produces precisely the matrix in the question. Thus the proposed composition works for every vector, not just for one example.'
  ],'(a) Rotation through 2θ about the origin.\n(b) Tₐ=Rθ∘Rθ: perform two rotations through θ.');
  t(27,[
    '“If and only if” asks for two directions. Matrices commute means AB=BA. Transformations commute means doing them in either order gives the same output for every input.',
    'First assume AB=BA. For any x, Tₐ(Tᵦ(x))=A(Bx)=(AB)x. Since AB=BA, this equals (BA)x=B(Ax)=Tᵦ(Tₐ(x)). The transformations therefore commute.',
    'Now assume the transformations commute. Replacing each transformation by its matrix product gives (AB)x=(BA)x for every x.',
    'Choose x=e₁, then e₂, and so on. Multiplying a matrix by eⱼ selects its jth column, so column j of AB equals column j of BA for every j.',
    'Matrices with identical corresponding columns are equal. Hence AB=BA, which proves the converse and completes both directions.'
  ],'Tₐ and Tᵦ commute if and only if AB=BA.');
  t(28,[
    'The composite Tₐ∘Tᵦ has standard matrix AB because B acts first. Therefore the question is whether AB is invertible exactly when both square matrices A and B are invertible.',
    'First assume A and B are invertible. Undo A first and then B; the candidate inverse matrix is B⁻¹A⁻¹.',
    'Check both sides: (AB)(B⁻¹A⁻¹)=A(BB⁻¹)A⁻¹=AIA⁻¹=I, and (B⁻¹A⁻¹)(AB)=B⁻¹(A⁻¹A)B=B⁻¹IB=I. Thus AB is invertible.',
    'For the reverse direction, assume AB is invertible. If Bx=0, then (AB)x=A(Bx)=A0=0. Multiply by (AB)⁻¹ to conclude x=0.',
    'Thus Bx=0 has only the zero solution. For a square matrix, Theorem 1.5.3 says this is equivalent to invertibility. So B is invertible.',
    'Recover A as A=(AB)B⁻¹. Both factors on the right are invertible, so their product is invertible by the first direction just proved. Explicitly, A has inverse B(AB)⁻¹.',
    'Both A and B are therefore invertible. Translating back to transformations proves the required equivalence; the inverse of the composition performs the two inverse operations in reverse order.'
  ],'Tₐ∘Tᵦ is invertible if and only if both Tₐ and Tᵦ are invertible. When they are, (Tₐ∘Tᵦ)⁻¹=Tᵦ⁻¹∘Tₐ⁻¹.');
  t(29,[
    'The equation Tₐ(x)=b is the same as Ax=b. An inverse would recover the input x from any output b. We must prove both directions of the statement.',
    'Assume Tₐ is invertible, so A⁻¹ exists. For any b choose x=A⁻¹b. Then Ax=AA⁻¹b=Ib=b, so a solution exists.',
    'To prove uniqueness, suppose y is another solution: Ay=b. Multiply by A⁻¹ to obtain y=A⁻¹b=x. Thus there cannot be a second different solution.',
    'Conversely, assume that for every b there is exactly one x satisfying Ax=b. In particular, choose b=0. The vector x=0 is already a solution, so uniqueness says it is the only solution.',
    'Theorem 1.5.3 says that a square matrix with only the zero solution to Ax=0 is invertible. Therefore A is invertible and Tₐ has the inverse Tₐ⁻¹(b)=A⁻¹b.',
    'Existence means no requested output is missing; uniqueness means no two inputs compete for that output. Together they give precisely the ability to undo the transformation.'
  ],'Tₐ is invertible exactly when Ax=b has one and only one solution x for every b∈ℝⁿ.');
  t('TF',[
    'Part a: false. Choose A as reflection in y=x and B as projection onto the x-axis. At x=(1,0), ABx=(0,1), whereas BAx=(0,0). Composition order can change the result.',
    'Part b: true. Tₐ acts first, giving Ax; Tᵦ then gives B(Ax)=(BA)x=BAx. The rightmost matrix acts first.',
    'Part c: true. Rotations about the same origin add angles: RαRβ=R(α+β). A sum of 0° gives the identity, which is the zero-angle rotation.',
    'Part d: false. Reflect first in the x-axis and then in the line y=x: (x,y) → (x,−y) → (−y,x). This is a 90° rotation. It is neither a reflection in a line nor reflection about the origin. For example, doing this quarter-turn twice sends (1,0) to (−1,0), whereas doing any reflection twice restores the original point.',
    'Part e: true. Reflection in y=x swaps the coordinates. Swapping twice sends (x,y) → (y,x) → (x,y), so it is its own inverse.',
    'Part f: false. Two positive 90° rotations add to 180°, not 0°. The inverse of a positive 90° rotation is a −90° rotation, equivalently a positive 270° rotation.',
    'Part g: true. Reflection about the origin negates both coordinates. Applying it twice gives (−(−x),−(−y))=(x,y), so it is its own inverse.'
  ],'(a) False; (b) True; (c) True; (d) False; (e) True; (f) False; (g) True.');
  t('T1',[
    'Use degree mode on the calculator because the angles are in degrees. Write Rα=[[cosα,−sinα],[sinα,cosα]] and F=[[-1,0],[0,1]] for reflection in the y-axis.',
    'The operations act in the order R47°, then F, then R33°. Therefore the standard matrix is A=R33° F R47°; the first action is the rightmost factor.',
    'First multiply F R47°. Reflection negates its first row, giving\n'+matrix([['−cos47°','sin47°'],['sin47°','cos47°']]),
    'Now multiply R33° on the left. Entry (1,1) is −cos33°cos47°−sin33°sin47°=−cos(47°−33°)=−cos14°. Entry (1,2) is cos33°sin47°−sin33°cos47°=sin14°.',
    'Entry (2,1) is −sin33°cos47°+cos33°sin47°=sin14°. Entry (2,2) is sin33°sin47°+cos33°cos47°=cos14°. Thus A=[[-cos14°,sin14°],[sin14°,cos14°]].',
    'Evaluate only at the end: cos14°≈0.9702957263 and sin14°≈0.2419218956. Hence A≈[[-0.97029573,0.24192190],[0.24192190,0.97029573]].',
    'Part b: multiply by (1,1). The first coordinate is −cos14°+sin14°≈−0.7283738307; the second is sin14°+cos14°≈1.2122176219.',
    'Check the length: rotations and reflections preserve it. The original squared length is 1²+1²=2; the exact output has squared length (−c+s)²+(s+c)²=2(c²+s²)=2, where c=cos14° and s=sin14°.'
  ],'(a) A =\n'+matrix([['−cos14°','sin14°'],['sin14°','cos14°']])+'\n≈\n'+matrix([['−0.97029573','0.24192190'],['0.24192190','0.97029573']])+'\n(b) T(1,1)=(−cos14°+sin14°,sin14°+cos14°)≈(−0.72837383,1.21221762).');

  const standardAnswers={
    11:[[[2,-3,1],[3,5,-1]],[[7,2,-8],[0,-1,5],[4,7,-1]]],
    12:[[[-1,1],[3,-2],[5,-7]],[[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,1,1,1]]],
    13:[[[0,1],[-1,0],[1,3],[1,-1]],[[7,2,-1,1],[0,1,1,0],[-1,0,0,0]],[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[[0,0,0,1],[1,0,0,0],[0,0,1,0],[0,1,0,0],[1,0,-1,0]]],
    14:[[[2,-1],[1,1]],[[1,0],[0,1]],[[1,2,1],[1,5,0],[0,0,1]],[[4,0,0],[0,7,0],[0,0,-8]]]
  };
  for(const [n,matrices]of Object.entries(standardAnswers))sets['1.8'][n].answer=matrices.map((a,i)=>'('+letter(i)+') A =\n'+matrix(a)).join('\n');
  sets['1.8'][15].answer='A =\n'+matrix([[3,5,-1],[4,-1,1],[3,2,-1]])+'\nT(−1,2,4)=(3,−2,−3).';
  sets['1.8'][16].answer='A =\n'+matrix([[2,3,-5,-1],[1,-5,2,-3]])+'\nT(1,−1,2,4)=(−15,−2).';
  sets['1.8'][17].answer='(a) A =\n'+matrix([[-1,1],[0,1]])+'\nT(−1,4)=(5,4).\n(b) A =\n'+matrix([[2,-1,1],[0,1,1],[0,0,0]])+'\nT(2,1,−3)=(0,−2,0).';
  sets['1.8'][18].answer='(a) A =\n'+matrix([[2,-1],[1,1]])+'\nT(−2,2)=(−6,0).\n(b) A =\n'+matrix([[1,0,0],[0,1,-1],[0,1,0]])+'\nT(1,0,5)=(1,−5,0).';
  for(const n of [45,46]){
    // These traces invert the input-column matrix X, not the unknown answer A.
    const steps=sets['1.8'][n].steps;
    for(let i=2;i<steps.length-3;i++)steps[i]=steps[i].replaceAll('A⁻¹','X⁻¹').replaceAll('undo A','undo X').replaceAll('A from I','X from I').replaceAll('turn A into','turn X into');
  }

  window.EmberMathQuestions=window.EmberMathQuestions||{};
  Object.assign(window.EmberMathQuestions,sets);
})();
