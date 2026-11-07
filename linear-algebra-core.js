(function (root) {
  'use strict';
  const tr=(en,sv)=>root.EmberMathI18n?.t(en,sv)??en;

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
    record(tr('Start with the matrix below. Read one row at a time, from left to right.',"Börja med matrisen nedan. Läs en rad i taget, från vänster till höger.") +
      (variableCount < rows[0].length ? tr(' The bar separates the coefficient columns on the left from the extra column(s) on the right.'," Strecket skiljer koefficientkolumnerna till vänster från de extra kolumnerna till höger.") : tr(' There are no extra right-hand columns here.'," Här finns inga extra kolumner med högerled.")));
    steps.push(tr('A row operation must change every entry in that row, including anything after the bar. Swapping rows, dividing a row by a nonzero number, or adding a multiple of another row can all be undone. They keep the same solutions. A pivot is the entry we use to clear a column.',"En radoperation måste utföras på varje element i raden, även efter strecket. Att byta plats på rader, dela en rad med ett tal som inte är noll eller lägga till en multipel av en annan rad är operationer som går att göra ogjorda. Lösningarna förblir därför desamma. Ett pivotelement är det element vi använder för att skapa nollor i en kolumn."));
    steps.push(above ? tr('Our goal is reduced row echelon form: make each pivot 1, then make every other entry in its column 0. Each completed pivot column singles out one variable.',"Målet är reducerad trappstegsform: gör varje pivotelement till 1 och sedan alla andra element i samma kolumn till 0. Varje färdig pivotkolumn pekar ut en variabel.") : tr('Our goal is row echelon form: make each pivot 1 and clear the entries below it. We leave the entries above it for now; back-substitution will use the lower equations first.',"Målet är trappstegsform: gör varje pivotelement till 1 och elementen under det till nollor. Elementen ovanför lämnar vi tills vidare. Vid bakåtsubstitution börjar vi med de nedersta ekvationerna."));
    for (let col = 0; col < variableCount && pivots.length < rows.length; col++) {
      const next = pivots.length;
      let best = next;
      for (let i = next + 1; i < rows.length; i++) {
        if (Math.abs(rows[i][col]) > Math.abs(rows[best][col])) best = i;
      }
      if (zero(rows[best][col])) {
        steps.push(tr('In column ',"I kolumn ") + (col + 1) + tr(', every entry from row '," är varje element från rad ") + (next + 1) + tr(' down is zero. There is no pivot to use here, so move to the next column. A column without a pivot may give a free variable if the whole system is consistent.'," och nedåt noll. Här finns inget pivotelement att använda, så gå vidare till nästa kolumn. En kolumn utan pivot kan ge en fri variabel om hela systemet är konsistent, alltså har minst en lösning."));
        continue;
      }
      if (next !== best) {
        [rows[next], rows[best]] = [rows[best], rows[next]];
        operations.push({type:"swap", i:next, j:best});
        record(tr('Swap rows ',"Byt plats på rad ") + (next + 1) + tr(' and '," och ") + (best + 1) + tr(' to use '," för att använda ") + format(rows[next][col]) + tr(' as the pivot in column '," som pivotelement i kolumn ") + (col + 1) + tr('. It has the largest absolute value (size ignoring its sign) among the available entries. Exchanging the order of equations does not change their solutions.',". Det har störst absolutbelopp, alltså storlek utan hänsyn till tecknet, av de tillgängliga elementen. Att byta ekvationernas ordning ändrar inte deras lösningar."));
      }
      const pivot = rows[next][col];
      if (!zero(pivot - 1)) {
        const before = [...rows[next]];
        rows[next] = rows[next].map(x => x / pivot);
        operations.push({type:"scale", i:next, factor:1/pivot});
        record(tr('Divide row ',"Dela rad ") + (next + 1) + tr(' by '," med ") + format(pivot) + tr(' so the pivot is 1. A coefficient of 1 means one copy of that variable. Divide every entry, including the right side, to keep the equation balanced.\n'," så att pivotelementet blir 1. Koefficienten 1 betyder en gång variabeln. Dela varje element, även högerledet, så att ekvationen behåller balansen.\n") +
          before.map((n, j) => tr('Entry ',"Element ") + (j + 1) + ': (' + format(n) + ') ÷ (' + format(pivot) + ') = ' + format(rows[next][j])).join('; ') + tr('.\nThe matrix is now:',".\nMatrisen är nu:"));
      }
      rows.forEach((row, i) => {
        const factor = row[col];
        if (i === next || (!above && i < next) || zero(factor)) return;
        rows[i] = row.map((x, j) => x - factor * rows[next][j]);
        operations.push({type:"add", i, j:next, factor:-factor});
        record(tr('Replace row ',"Ersätt rad ") + (i + 1) + tr(' with row '," med rad ") + (i + 1) + tr(' minus ('," minus (") + format(factor) + tr(') × row ',") × rad ") + (next + 1) + tr('. This makes a zero in column ',". Detta ger en nolla i kolumn ") + (col + 1) + ': (' + format(factor) + ') − (' + format(factor) + ') × 1 = 0.' +
          (factor < 0 ? tr(' Subtracting a negative multiple means adding: here we add '," Att subtrahera en negativ multipel betyder att addera: här lägger vi till ") + format(-factor) + tr(' times row '," gånger rad ") + (next + 1) + '.' : '') + '\n' +
          row.map((n, j) => tr('Entry ',"Element ") + (j + 1) + ': (' + format(n) + ') − (' + format(factor) + ') × (' + format(rows[next][j]) + ') = ' + format(rows[i][j])).join('; ') + tr('.\nThe matrix is now:',".\nMatrisen är nu:"));
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
      steps.push(tr('A row says 0 = ',"En rad säger 0 = ") + format(contradiction[n]) + tr('. This is impossible, so no point satisfies every equation.',". Detta är omöjligt, så ingen punkt uppfyller alla ekvationer."));
      return {kind:'none', steps};
    }
    rows.forEach((row,i)=>{
      if (row.every(zero)) steps.push(tr('Row ',"Rad ") + (i + 1) + tr(' contains only zeros, so it says 0 = 0. This is always true and adds no new condition. It does not mean that every unknown must be zero.'," innehåller bara nollor och säger därför 0 = 0. Detta är alltid sant och tillför inget nytt villkor. Det betyder inte att varje obekant måste vara noll."));
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
      steps.push(tr('There ',"Det ") + (basis.length === 1 ? tr('is 1 free variable.',"finns 1 fri variabel.") : tr('are ',"finns ") + basis.length + tr(' free variables.'," fria variabler.")) +
        tr(' A free variable has no pivot and can be any real number. Write x₁, x₂, … for the unknowns in their original column order. Let '," En fri variabel saknar pivot och kan vara vilket reellt tal som helst. Skriv x₁, x₂, … för de obekanta i deras ursprungliga kolumnordning. Sätt ") +
        free.map((j, i) => 'x' + (j + 1) + ' = t' + (i + 1)).join(', ') + tr('. Each t is an independent choice.',". Varje t väljs oberoende av de andra."));
      pivots.forEach((p, i) => steps.push(tr('Row ',"Rad ") + (i + 1) + tr(': keep x',": behåll x") + (p + 1) + tr(' on the left and subtract the free-variable terms from both sides. This gives x'," i vänsterledet och subtrahera termerna med fria variabler från båda leden. Då får vi x") + (p + 1) + ' = ' + format(point[p]) +
        free.map((j, k) => zero(rows[i][j]) ? '' : ' + (' + format(-rows[i][j]) + ')t' + (k + 1)).join('') + '.'));
      steps.push(tr('Set all parameters to 0 to get the starting vector ',"Sätt alla parametrar till 0 för att få startvektorn ") + vector(point) + tr('. The coefficients of t1, t2, … form the direction vectors ',". Koefficienterna framför t1, t2, … bildar riktningsvektorerna ") + basis.map(vector).join(', ') +
        tr('. Add the starting vector to any weighted sum of these directions. Parameter names such as s, t or t1 are only labels; renaming them does not change the solutions.',". Lägg till en valfri viktad summa av dessa riktningar till startvektorn. Parameternamn som s, t eller t1 är bara beteckningar. Om vi byter namn på dem ändras inte lösningarna."));
      steps.push(tr('Check the family: the original coefficient matrix times the starting vector gives ',"Kontrollera lösningsfamiljen: den ursprungliga koefficientmatrisen gånger startvektorn ger ") + vector(augmented.map(row => dot(row.slice(0,n), point))) +
        tr(', the original right-hand side. Multiplying it by each direction gives the zero vector, so any choice of parameters keeps the equations true.',", det ursprungliga högerledet. Multiplikation med varje riktningsvektor ger nollvektorn. Därför förblir ekvationerna sanna oavsett hur parametrarna väljs."));
      basis.forEach((direction,i)=>steps.push(tr('Check direction t',"Kontrollera riktningen t") + (i + 1) + tr(': multiply the original coefficient matrix by ',": multiplicera den ursprungliga koefficientmatrisen med ") + vector(direction) + tr(' to obtain '," för att få ") + vector(augmented.map(row=>dot(row.slice(0,n),direction))) + tr('. Adding any multiple of this direction changes every equation’s left side by 0, so the required totals stay the same.',". Om vi lägger till en valfri multipel av denna riktning ändras varje ekvations vänsterled med 0. De nödvändiga totalsummorna förblir alltså desamma.")));
    } else {
      steps.push(tr('Read the right-hand column. Each pivot row now fixes one unknown: ',"Läs kolumnen längst till höger. Varje pivotrad bestämmer nu en obekant: ") + point.map((v,i) => tr('variable ',"variabel ") + (i + 1) + ' = ' + format(v)).join(', ') + tr('. In the original variable order, the solution is ',". I den ursprungliga variabelordningen är lösningen ") + vector(point) + '.');
      augmented.forEach((row, i) => steps.push(tr('Check original equation ',"Kontrollera ursprunglig ekvation ") + (i + 1) + ': ' + row.slice(0,n).map((v,j) => '(' + format(v) + ' × ' + format(point[j]) + ')').join(' + ') +
        ' = ' + format(dot(row.slice(0,n),point)) + tr('. The required right-hand side is ',". Det högerled som ska uppnås är ") + format(row[n]) + '.'));
      steps.push(tr('Check it in the original equations. The left sides give ',"Kontrollera i de ursprungliga ekvationerna. Vänsterleden ger ") + vector(augmented.map(row => dot(row.slice(0, n), point))) + tr(', matching the right sides.',", vilket stämmer med högerleden."));
    }
    return {kind:basis.length ? 'infinite' : 'one', point, basis, steps};
  }

  function inverse(matrix) {
    const n = matrix.length;
    const augmented = matrix.map((row, i) => [...row, ...identity(n)[i]]);
    const {rows, pivots, steps} = reduce(augmented, n);
    steps[0] = tr('Put the identity matrix to the right of the original matrix. The identity has 1 on its main diagonal and 0 elsewhere. The bar separates A from I. Apply every row operation to both sides of the bar.\n',"Skriv enhetsmatrisen till höger om den ursprungliga matrisen. Enhetsmatrisen har 1 på huvuddiagonalen och 0 överallt annars. Strecket skiljer A från I. Utför varje radoperation på båda sidor om strecket.\n") + matrixBlock(augmented,n);
    steps.splice(1,0,tr('Why this works: call the combined effect of all row operations E. Applying them to [A | I] gives [EA | EI]. If the left block becomes I, then EA = I. The right block is EI = E, so it records the matrix that undoes A: its inverse.',"Varför fungerar detta? Kalla den sammanlagda effekten av radoperationerna E. När de tillämpas på [A | I] får vi [EA | EI]. Om det vänstra blocket blir I gäller EA = I. Det högra blocket är EI = E och visar därför matrisen som gör A:s verkan ogjord: inversen."));
    const value = pivots.length === n ? rows.map(row => row.slice(n)) : null;
    steps.push(value ? tr('The left side is now the identity. The right side records how to undo A, so it is A⁻¹:\n',"Vänster sida är nu enhetsmatrisen. Höger sida visar hur A:s verkan görs ogjord och är därför A⁻¹:\n") + matrixBlock(value) : tr('A pivot is missing on the left. We cannot turn A into the identity, so this matrix has no inverse (it is singular).',"Det saknas ett pivotelement på vänster sida. Vi kan inte omvandla A till enhetsmatrisen. Matrisen har därför ingen invers, vilket betyder att den är singulär."));
    if (value) steps.push(tr('Check by multiplying the original matrix by this inverse. The result should be the identity:\n',"Kontrollera genom att multiplicera den ursprungliga matrisen med inversen. Resultatet ska vara enhetsmatrisen:\n") + matrixBlock(multiply(matrix,value)));
    if (value) steps.push(tr('Check the reverse order too: A⁻¹A must also equal I. This confirms that the inverse restores the original coordinates in either order:\n',"Kontrollera även omvänd ordning: A⁻¹A måste också vara I. Detta bekräftar att inversen återställer de ursprungliga koordinaterna i båda ordningarna:\n") + matrixBlock(multiply(value,matrix)));
    return {value, steps};
  }

  const api = {reduce, zero, tidy, format, vector, matrixText, matrixBlock, dot, multiply, apply, solve, inverse};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.EmberAlgebra = api;
})(globalThis);
