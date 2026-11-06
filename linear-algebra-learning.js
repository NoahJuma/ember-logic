(function (root) {
  'use strict';
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  // Preserve each matrix row on its own line, including older hand-written solutions.
  const readable = text => String(text).replace(/\][ \t]+\[/g, ']\n[');
  const steps = items => items.flatMap(item => item.split(/(?<=\.)\s+(?=[a-z](?: and [a-z])?:\s)/)).map(item => '<li>'+escape(readable(item))+'</li>').join('');
  const guides = {
    '1.1': ['Equations are balance statements',
      'An unknown is a number we want to find. In 2x + y = 7, 2x means 2 × x. An answer must make every equation true at the same time.',
      'Keep an equation balanced: add, subtract, multiply or divide both sides by the same number (never divide by zero). For 2x + 3 = 7: subtract 3 to get 2x = 4, then divide by 2 to get x = 2.',
      'A parameter names a number you may choose freely. For x + y = 5, let y = t and write x = 5 − t. Choosing t = 2 gives (3,2); choosing t = 0 gives (5,0). Both work.'],
    '1.2': ['Turn a difficult system into an easier one',
      'A row is an equation written using only its coefficients. For 2x + 3y = 8, write [2  3 | 8]. The bar means “the equals sign goes here.”',
      'R₂ ← R₂ − 2R₁ means replace row 2 using its old entries minus twice row 1. For R₁ = [1 2 | 3] and R₂ = [2 5 | 8], calculate [2−2×1, 5−2×2 | 8−2×3] = [0 1 | 2]. This says y = 2.',
      'Work upward: x + 2y = 3 becomes x + 4 = 3, so x = −1. Check both original equations. A row saying 0 = 1 means no solution; 0 = 0 adds no restriction.',
      'Gaussian elimination clears below each pivot, then solves upward. Gauss–Jordan also clears above pivots so the answers can be read directly.'],
    '1.3': ['Read a matrix as a table of numbers',
      'The size m × n means m rows and n columns. Entry (i,j) means row i, column j, counting from 1. Addition and subtraction combine matching positions.',
      'For AB, A’s column count must equal B’s row count. One output entry uses one row of A and one column of B: [2 3] times [4 5] as a column gives 2×4 + 3×5 = 23.',
      'Aᵀ means transpose: turn rows into columns. tr(A) means trace: add the main diagonal of a square matrix. For [2 3], [4 5], the trace is 2 + 5 = 7.'],
    '1.4': ['An inverse undoes a matrix',
      'I is the identity matrix: multiplying by I changes nothing. A⁻¹ is the inverse: AA⁻¹ = A⁻¹A = I. It is not obtained by taking the reciprocal of every entry.',
      'For rows [a b], [c d], calculate ad − bc. If this is zero there is no inverse. Otherwise the inverse has rows [d −b], [−c a], all divided by ad − bc.',
      'Order matters: AB can differ from BA. To undo AB, undo A first and then B, so (AB)⁻¹ = B⁻¹A⁻¹. Powers mean repeated matrix multiplication; a constant in a matrix polynomial multiplies I.'],
    '1.5': ['Record reversible row changes',
      'An elementary matrix comes from making exactly one allowed row operation on I. Multiplying it on the left of A makes that same row change in A.',
      'To find A⁻¹, write [A | I]. Apply every operation across the whole row. If the left side becomes I, the right side is A⁻¹. If the left side cannot become I, the inverse does not exist.',
      'Undo a swap by swapping again. Undo multiplication by 3 by dividing by 3. Undo adding twice another row by subtracting twice that row. Undo a sequence from last to first.'],
    '1.6': ['Connect equations to invertibility',
      'Ax = b is a compact way to write several equations. A contains coefficients, x contains unknowns, and b contains the required totals. Ax = 0 is called homogeneous and always allows x = 0.',
      'If A is square and invertible, multiplying both sides by A⁻¹ gives x = A⁻¹b. Every b then has exactly one answer.',
      'A singular matrix has no inverse. A singular system can have infinitely many answers or none, depending on b. Check for a contradiction before choosing free variables.'],
    '1.7': ['Use the pattern of entries',
      'The main diagonal runs from top left to bottom right. Diagonal matrices are zero everywhere else. Upper triangular means zero below that diagonal; lower triangular means zero above it.',
      'A triangular matrix has an inverse exactly when all diagonal entries are nonzero. For a diagonal matrix, invert by taking just the diagonal reciprocals.',
      'Symmetric means reflected positions match: aᵢⱼ = aⱼᵢ. Skew-symmetric means they are opposites, so every diagonal entry is zero. Check the pairs one by one.'],
    '1.8': ['A matrix is a rule for moving coordinates',
      'A point (x,y,z) tells you how far to travel along the x, y and z axes. A transformation takes input coordinates and produces output coordinates.',
      'Each matrix row calculates one output. For [2 0], [0 3], the point (1,2) becomes (2×1 + 0×2, 0×1 + 3×2) = (2,6).',
      'A basis vector has one coordinate equal to 1 and the others 0. Its image is the corresponding matrix column. ℝ² means all real coordinate pairs; ℝ³ means all real triples.',
      'A matrix transformation preserves addition and scaling. In particular it sends zero to zero. Passing only the zero test is not enough to prove a map is linear.'],
    '1.9': ['Follow the actions in order',
      'In T₂(T₁(x)), do the inside action T₁ first. If A represents T₁ and B represents T₂, the combined matrix is BA.',
      'For example, start at (1,2). Double x to get (2,2), then swap coordinates to get (2,2). Reverse the actions: swap to (2,1), then double x to get (4,1). The order changes the result.',
      'An inverse restores the original input. A rotation can be undone by turning back. A projection discards a coordinate, so many inputs become the same output and cannot be recovered uniquely.'],
    '1.10': ['Translate a real situation into equations',
      'First name each unknown and its unit. For a network with no accumulation, incoming flow equals outgoing flow at each junction. Write one equation per balance.',
      'For a circuit, balance current at junctions and voltage around loops. For a chemical reaction, count each element separately on both sides. Negative flow means the true direction is opposite your chosen arrow.',
      'To fit a curve, the unknowns are its coefficients. For y = ax² + bx + c, the known point (2,5) gives 4a + 2b + c = 5. Repeat for each point, then solve the equations.',
      'Some technology exercises also use calculus. A derivative measures slope or rate of change; an integral measures accumulated area. Those extra rules are identified in their worked solutions.'],
    '1.11': ['Production must cover two kinds of demand',
      'A sector supplies goods to other sectors as well as outside customers. x is total production, Cx is internal use, and d is outside demand.',
      'So x = Cx + d. Subtract Cx from both sides and factor x: (I − C)x = d. If I − C is invertible, x = (I − C)⁻¹d.',
      'In a one-sector example, 20% is used internally and customers need 80 units: x = 0.2x + 80, so 0.8x = 80 and x = 100. Check: 20 internal units + 80 outside units = 100.'],
    review: ['Choose a method before calculating',
      'For equations, isolate unknowns using reversible row operations. For matrix products, check sizes and multiply rows by columns. For inverse questions, look for a product equal to I.',
      'A proof explains why a claim holds for every allowed case. A counterexample is one allowed case that makes a claim false. Testing one numerical example cannot prove a general claim.',
      'Σ means “add the listed terms.” For example, Σ from k=1 to 3 of aₖbₖ means a₁b₁ + a₂b₂ + a₃b₃. An index such as i or j labels a row or column.',
      'The derivative exercises use calculus: differentiate each entry, use the product rule, and retain matrix factor order. Review those rules before attempting that group.']
  };
  function guide(topic) {
    const [title,...items] = guides[topic] || guides.review;
    return '<details class="solution-guide"><summary>Need the basics? '+escape(title)+'</summary><ol class="steps">'+steps(items)+'</ol></details>';
  }
  function read(storage,key) {
    try { return storage.getItem('ember-linear-algebra:'+key) || ''; } catch { return ''; }
  }
  function save(storage,key,value) {
    try { storage.setItem('ember-linear-algebra:'+key,value); return true; } catch { return false; }
  }
  function card(problem,key,label,topic,attempt='',id='',extra='') {
    const inputId='attempt-'+key.replace(/[^a-z0-9-]/gi,'-');
    return '<article class="exercise"'+(id?' id="'+escape(id)+'" tabindex="-1"':'')+'><p class="kicker">'+escape(label)+'</p><h3>'+escape(problem.title)+'</h3>'+
      '<p>'+escape(readable(problem.prompt))+'</p><p class="caption exercise-choice">Choose either option. You do not need to enter an answer to see the solution.</p>'+
      '<details class="attempt-panel"'+(attempt?' open':'')+'><summary>Write my answer <span>(optional)</span></summary>'+
      '<label class="attempt-label" for="'+inputId+'">Your answer and working</label><textarea id="'+inputId+'" data-attempt="'+escape(key)+'" rows="5" maxlength="20000" placeholder="Write your answer, calculations, or questions here…">'+escape(attempt)+'</textarea>'+
      '<p class="caption save-status" role="status">'+(attempt?'Your saved answer is restored.':'Your writing is saved on this browser when storage is available.')+'</p></details>'+
      '<details class="solution-panel"><summary>Show worked solution</summary>'+guide(topic)+
      '<div class="answer comparison"><div class="attempt-comparison"'+(attempt.trim()?'':' hidden')+'><strong>Your answer</strong><p class="attempt-copy">'+escape(attempt)+'</p></div>'+
      '<div><strong>Worked answer</strong><p class="worked-result">'+escape(readable(problem.answer))+'</p></div></div>'+
      '<h4>Follow the reasoning</h4><ol class="steps">'+steps(problem.steps)+'</ol>'+extra+
      '<div class="compare-help"><strong>How to check your work</strong><p>Compare one step at a time. Check the signs, the order of the variables, and every part of the question. Different methods or parameter names can give the same correct answer. Substitute your result into the original question when possible.</p>'+
      '<p class="caption">This is a comparison space. Your written answer is not automatically graded. You can edit it while the solution is open.</p></div></details></article>';
  }
  function syncAttempt(article) {
    const value=article.querySelector('textarea').value;
    article.querySelector('.attempt-copy').textContent=value;
    article.querySelector('.attempt-comparison').hidden=!value.trim();
  }
  const api={escape,readable,steps,guides,guide,read,save,card,syncAttempt};
  if (typeof module==='object' && module.exports) module.exports=api;
  else root.EmberLearning=api;
})(globalThis);
