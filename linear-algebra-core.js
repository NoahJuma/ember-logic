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
    return String(tidy(n));
  }
  const vector = v => '(' + v.map(format).join(', ') + ')';
  const rowText = row => '[' + row.map(format).join('  ') + ']';
  const matrixText = rows => rows.map(rowText).join('  ');
  const dot = (a, b) => a.reduce((sum, n, i) => sum + n * b[i], 0);
  const multiply = (a, b) => a.map(row => b[0].map((_, j) => dot(row, b.map(r => r[j]))));
  const apply = (a, v) => a.map(row => dot(row, v));
  const identity = n => Array.from({length:n}, (_, i) => Array.from({length:n}, (_, j) => Number(i === j)));

  function reduce(matrix, variableCount = matrix[0].length, above = true) {
    const rows = matrix.map(row => [...row]);
    const pivots = [];
    const steps = [];
    const operations = [];
    const record = description => steps.push(description + '\n' + matrixText(rows));
    record('Start by writing each equation as a row.');
    for (let col = 0; col < variableCount && pivots.length < rows.length; col++) {
      const next = pivots.length;
      let best = next;
      for (let i = next + 1; i < rows.length; i++) {
        if (Math.abs(rows[i][col]) > Math.abs(rows[best][col])) best = i;
      }
      if (zero(rows[best][col])) continue;
      if (next !== best) {
        [rows[next], rows[best]] = [rows[best], rows[next]];
        operations.push({type:"swap", i:next, j:best});
        record('Swap rows ' + (next + 1) + ' and ' + (best + 1) + ' to move a nonzero number into the pivot position.');
      }
      const pivot = rows[next][col];
      if (!zero(pivot - 1)) {
        rows[next] = rows[next].map(x => x / pivot);
        operations.push({type:"scale", i:next, factor:1/pivot});
        record('Divide row ' + (next + 1) + ' by ' + format(pivot) + ' so the pivot is 1.');
      }
      rows.forEach((row, i) => {
        const factor = row[col];
        if (i === next || (!above && i < next) || zero(factor)) return;
        rows[i] = row.map((x, j) => x - factor * rows[next][j]);
        operations.push({type:"add", i, j:next, factor:-factor});
        record('Replace row ' + (i + 1) + ' with row ' + (i + 1) + ' minus (' + format(factor) + ') × row ' + (next + 1) + '. This makes a zero in column ' + (col + 1) + '.');
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
    const point = Array(n).fill(0);
    pivots.forEach((p, i) => { point[p] = rows[i][n]; });
    const basis = Array.from({length:n}, (_, i) => i).filter(i => !pivots.includes(i)).map(i => {
      const direction = Array(n).fill(0);
      direction[i] = 1;
      pivots.forEach((p, j) => { direction[p] = -rows[j][i]; });
      return direction;
    });
    if (basis.length) {
      steps.push('There ' + (basis.length === 1 ? 'is 1 free variable.' : 'are ' + basis.length + ' free variables.') + ' Set them all to 0 to get ' + vector(point) + '. Vary each free variable to get direction vectors ' + basis.map(vector).join(', ') + '.');
    } else {
      steps.push('Read the right-hand column. The solution is ' + vector(point) + '.');
      steps.push('Check it in the original equations. The left sides give ' + vector(augmented.map(row => dot(row.slice(0, n), point))) + ', matching the right sides.');
    }
    return {kind:basis.length ? 'infinite' : 'one', point, basis, steps};
  }

  function inverse(matrix) {
    const n = matrix.length;
    const augmented = matrix.map((row, i) => [...row, ...identity(n)[i]]);
    const {rows, pivots, steps} = reduce(augmented, n);
    steps[0] = 'Put the identity matrix to the right of the original matrix.\n' + matrixText(augmented);
    const value = pivots.length === n ? rows.map(row => row.slice(n)) : null;
    steps.push(value ? 'The left side is now the identity. Read the inverse on the right.\n' + matrixText(value) : 'A pivot is missing on the left, so this matrix has no inverse.');
    return {value, steps};
  }

  const api = {reduce, zero, tidy, format, vector, matrixText, dot, multiply, apply, solve, inverse};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.EmberAlgebra = api;
})(globalThis);
