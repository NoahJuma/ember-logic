(function (root) {
  'use strict';

  const EPS = 1e-9;
  const zero = n => Math.abs(n) < EPS;
  const tidy = n => zero(n) ? 0 : Number(n.toFixed(5));
  function format(n) {
    if (zero(n) || Math.abs(n - Math.round(n)) < EPS) return String(Math.round(n));
    for (let d = 2; d <= 120; d++) {
      const p = Math.round(n * d);
      if (Math.abs(n - p / d) < EPS) return p + '/' + d;
    }
    // Five decimal places can erase small, meaningful coefficients. Keep six
    // significant digits for these values; the solver's zero tolerance remains unchanged.
    if (Math.abs(n) < 1e-4) return String(Number(n.toPrecision(6)));
    return String(tidy(n));
  }
  const vector = v => '(' + v.map(format).join(', ') + ')';
  const rowText = row => '[' + row.map(format).join('  ') + ']';
  const matrixText = rows => rows.map(rowText).join('  ');
  const matrixBlock = (rows, split = rows[0].length) => rows.map(row => '[' +
    row.map((n, i) => (i === split ? '|  ' : '') + format(n)).join('  ') + ']').join('\n');
  const dot = (a, b) => a.reduce((sum, n, i) => sum + n * b[i], 0);
  const multiply = (a, b) => a.map(row => b[0].map((_, j) => dot(row, b.map(r => r[j]))));
  const apply = (a, v) => a.map(row => dot(row, v));
  const identity = n => Array.from({length:n}, (_, i) => Array.from({length:n}, (_, j) => Number(i === j)));

  function reduce(matrix, variableCount = matrix[0].length, above = true) {
    const rows = matrix.map(row => [...row]);
    const pivots = [];
    const steps = [];
    const operations = [];
    const record = description => steps.push(description + '\n' + matrixBlock(rows, variableCount));
    record('Start with the matrix below. Read one row at a time, from left to right.' +
      (variableCount < rows[0].length ? ' The bar separates the coefficient columns on the left from the extra column(s) on the right.' : ' There are no extra right-hand columns here.'));
    steps.push('A row operation must change every entry in that row, including anything after the bar. Swapping rows, dividing a row by a nonzero number, or adding a multiple of another row can all be undone. They keep the same solutions. A pivot is the entry we use to clear a column.');
    steps.push(above ? 'Our goal is reduced row echelon form: make each pivot 1, then make every other entry in its column 0. Each completed pivot column singles out one variable.' : 'Our goal is row echelon form: make each pivot 1 and clear the entries below it. We leave the entries above it for now; back-substitution will use the lower equations first.');
    for (let col = 0; col < variableCount && pivots.length < rows.length; col++) {
      const next = pivots.length;
      let best = next;
      for (let i = next + 1; i < rows.length; i++) {
        if (Math.abs(rows[i][col]) > Math.abs(rows[best][col])) best = i;
      }
      if (zero(rows[best][col])) {
        steps.push('In column ' + (col + 1) + ', every entry from row ' + (next + 1) + ' down is zero. There is no pivot to use here, so move to the next column. A column without a pivot may give a free variable if the whole system is consistent.');
        continue;
      }
      if (next !== best) {
        [rows[next], rows[best]] = [rows[best], rows[next]];
        operations.push({type:"swap", i:next, j:best});
        record('Swap rows ' + (next + 1) + ' and ' + (best + 1) + ' to use ' + format(rows[next][col]) + ' as the pivot in column ' + (col + 1) + '. It has the largest absolute value (size ignoring its sign) among the available entries. Exchanging the order of equations does not change their solutions.');
      }
      const pivot = rows[next][col];
      if (!zero(pivot - 1)) {
        const before = [...rows[next]];
        rows[next] = rows[next].map(x => x / pivot);
        operations.push({type:"scale", i:next, factor:1/pivot});
        record('Divide row ' + (next + 1) + ' by ' + format(pivot) + ' so the pivot is 1. A coefficient of 1 means one copy of that variable. Divide every entry, including the right side, to keep the equation balanced.\n' +
          before.map((n, j) => 'Entry ' + (j + 1) + ': (' + format(n) + ') ÷ (' + format(pivot) + ') = ' + format(rows[next][j])).join('; ') + '.\nThe matrix is now:');
      }
      rows.forEach((row, i) => {
        const factor = row[col];
        if (i === next || (!above && i < next) || zero(factor)) return;
        rows[i] = row.map((x, j) => x - factor * rows[next][j]);
        operations.push({type:"add", i, j:next, factor:-factor});
        record('Replace row ' + (i + 1) + ' with row ' + (i + 1) + ' minus (' + format(factor) + ') × row ' + (next + 1) + '. This makes a zero in column ' + (col + 1) + ': (' + format(factor) + ') − (' + format(factor) + ') × 1 = 0.' +
          (factor < 0 ? ' Subtracting a negative multiple means adding: here we add ' + format(-factor) + ' times row ' + (next + 1) + '.' : '') + '\n' +
          row.map((n, j) => 'Entry ' + (j + 1) + ': (' + format(n) + ') − (' + format(factor) + ') × (' + format(rows[next][j]) + ') = ' + format(rows[i][j])).join('; ') + '.\nThe matrix is now:');
      });
      pivots.push(col);
    }
    return {rows, pivots, steps, operations};
  }

  function solve(augmented) {
    const n = augmented[0].length - 1;
    const {rows, pivots, steps} = reduce(augmented, n);
    const contradiction = rows.find(row => row.slice(0, n).every(zero) && !zero(row[n]));
    if (contradiction) {
      steps.push('A row says 0 = ' + format(contradiction[n]) + '. This is impossible, so no point satisfies every equation.');
      return {kind:'none', steps};
    }
    rows.forEach((row,i)=>{
      if (row.every(zero)) steps.push('Row ' + (i + 1) + ' contains only zeros, so it says 0 = 0. This is always true and adds no new condition. It does not mean that every unknown must be zero.');
    });
    const point = Array(n).fill(0);
    pivots.forEach((p, i) => { point[p] = rows[i][n]; });
    const basis = Array.from({length:n}, (_, i) => i).filter(i => !pivots.includes(i)).map(i => {
      const direction = Array(n).fill(0);
      direction[i] = 1;
      pivots.forEach((p, j) => { direction[p] = -rows[j][i]; });
      return direction;
    });
    if (basis.length) {
      const free = Array.from({length:n}, (_, i) => i).filter(i => !pivots.includes(i));
      steps.push('There ' + (basis.length === 1 ? 'is 1 free variable.' : 'are ' + basis.length + ' free variables.') +
        ' A free variable has no pivot and can be any real number. Write x₁, x₂, … for the unknowns in their original column order. Let ' +
        free.map((j, i) => 'x' + (j + 1) + ' = t' + (i + 1)).join(', ') + '. Each t is an independent choice.');
      pivots.forEach((p, i) => steps.push('Row ' + (i + 1) + ': keep x' + (p + 1) + ' on the left and subtract the free-variable terms from both sides. This gives x' + (p + 1) + ' = ' + format(point[p]) +
        free.map((j, k) => zero(rows[i][j]) ? '' : ' + (' + format(-rows[i][j]) + ')t' + (k + 1)).join('') + '.'));
      steps.push('Set all parameters to 0 to get the starting vector ' + vector(point) + '. The coefficients of t1, t2, … form the direction vectors ' + basis.map(vector).join(', ') +
        '. Add the starting vector to any weighted sum of these directions. Parameter names such as s, t or t1 are only labels; renaming them does not change the solutions.');
      steps.push('Check the family: the original coefficient matrix times the starting vector gives ' + vector(augmented.map(row => dot(row.slice(0,n), point))) +
        ', the original right-hand side. Multiplying it by each direction gives the zero vector, so any choice of parameters keeps the equations true.');
      basis.forEach((direction,i)=>steps.push('Check direction t' + (i + 1) + ': multiply the original coefficient matrix by ' + vector(direction) + ' to obtain ' + vector(augmented.map(row=>dot(row.slice(0,n),direction))) + '. Adding any multiple of this direction changes every equation’s left side by 0, so the required totals stay the same.'));
    } else {
      steps.push('Read the right-hand column. Each pivot row now fixes one unknown: ' + point.map((v,i) => 'variable ' + (i + 1) + ' = ' + format(v)).join(', ') + '. In the original variable order, the solution is ' + vector(point) + '.');
      augmented.forEach((row, i) => steps.push('Check original equation ' + (i + 1) + ': ' + row.slice(0,n).map((v,j) => '(' + format(v) + ' × ' + format(point[j]) + ')').join(' + ') +
        ' = ' + format(dot(row.slice(0,n),point)) + '. The required right-hand side is ' + format(row[n]) + '.'));
      steps.push('Check it in the original equations. The left sides give ' + vector(augmented.map(row => dot(row.slice(0, n), point))) + ', matching the right sides.');
    }
    return {kind:basis.length ? 'infinite' : 'one', point, basis, steps};
  }

  function inverse(matrix) {
    const n = matrix.length;
    const augmented = matrix.map((row, i) => [...row, ...identity(n)[i]]);
    const {rows, pivots, steps} = reduce(augmented, n);
    steps[0] = 'Put the identity matrix to the right of the original matrix. The identity has 1 on its main diagonal and 0 elsewhere. The bar separates A from I. Apply every row operation to both sides of the bar.\n' + matrixBlock(augmented,n);
    steps.splice(1,0,'Why this works: call the combined effect of all row operations E. Applying them to [A | I] gives [EA | EI]. If the left block becomes I, then EA = I. The right block is EI = E, so it records the matrix that undoes A: its inverse.');
    const value = pivots.length === n ? rows.map(row => row.slice(n)) : null;
    steps.push(value ? 'The left side is now the identity. The right side records how to undo A, so it is A⁻¹:\n' + matrixBlock(value) : 'A pivot is missing on the left. We cannot turn A into the identity, so this matrix has no inverse (it is singular).');
    if (value) steps.push('Check by multiplying the original matrix by this inverse. The result should be the identity:\n' + matrixBlock(multiply(matrix,value)));
    if (value) steps.push('Check the reverse order too: A⁻¹A must also equal I. This confirms that the inverse restores the original coordinates in either order:\n' + matrixBlock(multiply(value,matrix)));
    return {value, steps};
  }

  const api = {reduce, zero, tidy, format, vector, matrixText, matrixBlock, dot, multiply, apply, solve, inverse};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.EmberAlgebra = api;
})(globalThis);
