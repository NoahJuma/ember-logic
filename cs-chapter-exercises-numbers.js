/* Computer Science: An Overview, 13th Global ed., Chapter 1.
 * Questions transcribed from the supplied book; solutions independently worked.
 * This file owns sections 1.5–1.7 and review problems 21–40 only.
 */
(() => {
  'use strict';
  const items = [];
  const bi = (en, sv) => ({ en, sv });
  const letter = i => String.fromCharCode(97 + i);
  const binary = (n, width = 1) => n.toString(2).padStart(width, '0');
  const unsigned = bits => parseInt(bits, 2);
  const signed = bits => unsigned(bits) - (bits[0] === '1' ? 2 ** bits.length : 0);
  const twos = (n, width) => binary((n + 2 ** width) % 2 ** width, width);
  const invert = bits => [...bits].map(b => b === '0' ? '1' : '0').join('');
  const decimal = (n, language = 'en') => String(n).replace('-', '−').replace('.', language === 'sv' ? ',' : '.');
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const fraction = (n, d) => {
    if (n === 0) return '0';
    const g = gcd(Math.abs(n), d);
    return d / g === 1 ? decimal(n / g) : `${decimal(n / g)}/${d / g}`;
  };
  const parts = values => values.map((v, i) => `${letter(i)}. ${v}`).join('\n');
  const add = (section, number, page, title, question, steps, answer) => {
    items.push({
      id: section === 'review' ? `review-${number}` : `section-${section}-${number}`,
      section, number: String(number), kind: section === 'review' ? 'review' : 'section',
      page, title, question,
      steps: { en: steps.map(s => s.en), sv: steps.map(s => s.sv) }, answer
    });
  };
  const answers = (en, sv = en) => bi(parts(en), parts(sv));
  const qParts = (en, sv, values) => bi(`${en}\n${parts(values)}`, `${sv}\n${parts(values)}`);
  const weightSum = bits => [...bits].flatMap((b, i) => b === '1' ? [2 ** (bits.length - 1 - i)] : []).join(' + ') || '0';
  const placeIntro = bi(
    'A binary digit is called a bit. Starting at the right, the places are worth 1, 2, 4, 8, 16, 32, 64, … . Each step left doubles the value. A 1 means “include this value”; a 0 means “leave it out”. Add the included values.',
    'En binär siffra kallas en bit. Från höger är platserna värda 1, 2, 4, 8, 16, 32, 64, … . Varje steg åt vänster fördubblar värdet. En 1:a betyder ”ta med värdet” och en 0:a betyder ”ta inte med det”. Lägg ihop värdena som tas med.'
  );
  const decimalToBinaryStep = (n, i, width = 1) => {
    const bits = binary(n, width);
    let remaining = n;
    const en = [], sv = [];
    [...bits].forEach((b, j) => {
      const value = 2 ** (bits.length - 1 - j);
      if (b === '1') {
        en.push(`${remaining} ≥ ${value}: write 1; ${remaining} − ${value} = ${remaining - value}`);
        sv.push(`${remaining} ≥ ${value}: skriv 1; ${remaining} − ${value} = ${remaining - value}`);
        remaining -= value;
      } else {
        en.push(`${remaining} < ${value}: write 0`);
        sv.push(`${remaining} < ${value}: skriv 0`);
      }
    });
    return bi(`${letter(i)}) ${n}: ${en.join('; ')}. Reading these bits left to right gives ${bits}. Check: ${weightSum(bits)} = ${n}.`, `${letter(i)}) ${n}: ${sv.join('; ')}. Läs bitarna från vänster till höger: ${bits}. Kontroll: ${weightSum(bits)} = ${n}.`);
  };
  const signedIntro = width => bi(
    `Two’s complement uses a fixed width: here ${width} bits. Read the bits first as an unsigned number U. If the first bit is 0, the answer is U. If it is 1, subtract 2^${width} = ${2 ** width}. That subtraction gives the negative value; the first bit is not a separate minus sign.`,
    `Tvåkomplement använder en bestämd bredd: här ${width} bitar. Läs först bitarna som ett tal U utan tecken. Om första biten är 0 är svaret U. Om den är 1 drar du bort 2^${width} = ${2 ** width}. Då får du det negativa värdet; första biten är alltså inte ett separat minustecken.`
  );
  const signedDecodeSteps = values => [signedIntro(values[0].length), ...values.map((bits, i) => bi(
    `${letter(i)}) ${bits}: the ordinary place-value sum is ${weightSum(bits)} = ${unsigned(bits)}. ${bits[0] === '1' ? `The first bit is 1, so ${unsigned(bits)} − ${2 ** bits.length} = ${decimal(signed(bits))}.` : `The first bit is 0, so keep ${unsigned(bits)}.`}`,
    `${letter(i)}) ${bits}: den vanliga positionssumman är ${weightSum(bits)} = ${unsigned(bits)}. ${bits[0] === '1' ? `Första biten är 1, alltså ${unsigned(bits)} − ${2 ** bits.length} = ${decimal(signed(bits))}.` : `Första biten är 0, så behåll ${unsigned(bits)}.`}`
  ))];
  const signedEncodeSteps = (values, width) => [bi(
    `First write the positive magnitude in ${width} bits. For a negative number, change every 0 to 1 and every 1 to 0, then add 1. Keep exactly ${width} bits. For zero and positive numbers, keep the ordinary binary pattern with leading zeros.`,
    `Skriv först talets positiva storlek med ${width} bitar. För ett negativt tal byter du varje 0:a mot 1 och varje 1:a mot 0 och adderar sedan 1. Behåll exakt ${width} bitar. För noll och positiva tal behåller du det vanliga binära mönstret med inledande nollor.`
  ), ...values.flatMap((n, i) => {
    const magnitude = binary(Math.abs(n), width), result = twos(n, width);
    return [bi(
      `${letter(i)}) ${decimal(n)}: ${Math.abs(n)} = ${weightSum(magnitude)}, so its positive magnitude is ${magnitude}. ${n < 0 ? `Flip the bits: ${invert(magnitude)}. Add 1: ${invert(magnitude)} + ${binary(1, width)} = ${result}. Check: ${unsigned(result)} − ${2 ** width} = ${decimal(n)}.` : `No sign change is needed, so the stored pattern is ${result}.`}`,
      `${letter(i)}) ${decimal(n)}: ${Math.abs(n)} = ${weightSum(magnitude)}, så den positiva storleken är ${magnitude}. ${n < 0 ? `Vänd bitarna: ${invert(magnitude)}. Addera 1: ${invert(magnitude)} + ${binary(1, width)} = ${result}. Kontroll: ${unsigned(result)} − ${2 ** width} = ${decimal(n)}.` : `Inget teckenbyte behövs, så bitmönstret blir ${result}.`}`
    )];
  })];
  const fractionIntro = bi(
    'The binary point separates whole-number places from fractional places. To its left the places are 1, 2, 4, 8, … . To its right they are 1/2, 1/4, 1/8, 1/16, … . Each step right halves the value. Add only the places marked 1.',
    'Binärpunkten skiljer heltalsdelen från bråkdelen. Till vänster är platserna värda 1, 2, 4, 8, … . Till höger är de värda 1/2, 1/4, 1/8, 1/16, … . Varje steg åt höger halverar värdet. Lägg bara ihop platser som har en 1:a.'
  );
  const binaryFractionValue = bits => {
    const [whole, frac = ''] = bits.split('.');
    return unsigned(whole) + (frac ? unsigned(frac) / 2 ** frac.length : 0);
  };
  const fractionDecodeSteps = values => [fractionIntro, ...values.map((bits, i) => {
    const [whole, frac = ''] = bits.split('.');
    const fractional = [...frac].flatMap((b, j) => b === '1' ? [`1/${2 ** (j + 1)}`] : []);
    const denominator = 2 ** frac.length;
    const numerator = Math.round(binaryFractionValue(bits) * denominator);
    return bi(
      `${letter(i)}) ${bits}: whole part ${whole} = ${weightSum(whole)} = ${unsigned(whole)}. Fractional part .${frac} = ${fractional.join(' + ') || '0'}. Together: ${unsigned(whole)} + ${fraction(unsigned(frac || '0'), denominator)} = ${fraction(numerator, denominator)} = ${decimal(binaryFractionValue(bits))}.`,
      `${letter(i)}) ${bits}: heltalsdelen ${whole} = ${weightSum(whole)} = ${unsigned(whole)}. Bråkdelen .${frac} = ${fractional.join(' + ') || '0'}. Tillsammans: ${unsigned(whole)} + ${fraction(unsigned(frac || '0'), denominator)} = ${fraction(numerator, denominator)} = ${decimal(binaryFractionValue(bits), 'sv')}.`
    );
  })];
  const fractionEncodeSteps = values => [fractionIntro, ...values.map(([label, bits], i) => {
    const [whole, frac] = bits.split('.');
    const slots = [...frac].map((b, j) => `1/${2 ** (j + 1)} → ${b}`).join(', ');
    const included = [...frac].flatMap((b, j) => b === '1' ? [`1/${2 ** (j + 1)}`] : []).join(' + ') || '0';
    const denominator = 2 ** frac.length;
    const commonFractions = [...frac].flatMap((b, j) => b === '1' ? [`${denominator / 2 ** (j + 1)}/${denominator}`] : []).join(' + ') || '0';
    return bi(
      `${letter(i)}) ${label}: split into whole and fractional parts. The whole part is ${unsigned(whole)} = ${weightSum(whole)}, so write ${whole}. Split the fraction into matching pieces: ${unsigned(frac)}/${denominator} = ${commonFractions} = ${included}. For the fractional places, ${slots}. Put the parts together: ${bits}. Check by adding the selected place values: ${unsigned(whole)} + ${included} = ${decimal(binaryFractionValue(bits))}.`,
      `${letter(i)}) ${label}: dela upp talet i heltalsdel och bråkdel. Heltalsdelen är ${unsigned(whole)} = ${weightSum(whole)}, så skriv ${whole}. Dela bråket i passande delar: ${unsigned(frac)}/${denominator} = ${commonFractions} = ${included}. På bråkplatserna gäller ${slots}. Sätt ihop delarna: ${bits}. Kontrollera genom att addera de valda positionsvärdena: ${unsigned(whole)} + ${included} = ${decimal(binaryFractionValue(bits), 'sv')}.`
    );
  })];
  const addTrace = (left, right) => {
    const n = Math.max(left.length, right.length), a = left.padStart(n, '0'), b = right.padStart(n, '0');
    let carry = 0, out = '';
    const en = [], sv = [];
    for (let j = n - 1; j >= 0; j--) {
      const x = Number(a[j]), y = Number(b[j]), total = x + y + carry, bit = total % 2, next = Math.floor(total / 2);
      en.push(`column ${n - j} from the right: ${x} + ${y} + carry ${carry} = ${total}; write ${bit}, carry ${next}`);
      sv.push(`kolumn ${n - j} från höger: ${x} + ${y} + minnessiffran ${carry} = ${total}; skriv ${bit}, för ${next} vidare`);
      out = bit + out; carry = next;
    }
    return {en: en.join('; '), sv: sv.join('; '), bits: out, carry, full: (carry ? '1' : '') + out};
  };
  const addIntro = width => bi(
    `Add right to left, just as in ordinary written addition. In binary, 1 + 1 = 10: write 0 and carry 1. With an incoming carry, 1 + 1 + 1 = 11: write 1 and carry 1. Keep ${width} result bits and discard a carry beyond that width. Then check whether the true answer lies between ${-(2 ** (width - 1))} and ${2 ** (width - 1) - 1}. Discarding a carry and signed overflow are different things.`,
    `Addera från höger till vänster, precis som i vanlig uppställd addition. Binärt är 1 + 1 = 10: skriv 0 och för 1 vidare som minnessiffra. Med en extra minnessiffra blir 1 + 1 + 1 = 11: skriv 1 och för 1 vidare. Behåll ${width} resultatbitar och ta bort en eventuell extra bit till vänster. Kontrollera sedan att det riktiga svaret ligger mellan ${-(2 ** (width - 1))} och ${2 ** (width - 1) - 1}. En borttagen extra bit är inte samma sak som tecknat overflow, alltså att talområdet överskrids.`
  );
  const signedAddSteps = values => [addIntro(values[0][0].length), ...values.flatMap(([a, b], i) => {
    const trace = addTrace(a, b), n = a.length, sum = signed(a) + signed(b), overflow = sum < -(2 ** (n - 1)) || sum > 2 ** (n - 1) - 1;
    return [bi(
      `${letter(i)}) Add ${a} + ${b}. ${trace.en}. The complete unsigned addition is ${trace.full}; retain ${trace.bits}${trace.carry ? ' after dropping the extra leftmost carry' : ''}.`,
      `${letter(i)}) Addera ${a} + ${b}. ${trace.sv}. Hela den teckenlösa additionen ger ${trace.full}; behåll ${trace.bits}${trace.carry ? ' efter att den extra biten längst till vänster tagits bort' : ''}.`
    ), bi(
      `${letter(i)}) Check the meaning: ${decimal(signed(a))} + (${decimal(signed(b))}) = ${decimal(sum)}. The result bits ${trace.bits} mean ${decimal(signed(trace.bits))}. ${overflow ? `Overflow: ${decimal(sum)} is outside the ${n}-bit range, so these bits do not represent the correct answer.` : 'The values agree and the answer is in range, so there is no overflow.'}`,
      `${letter(i)}) Kontrollera betydelsen: ${decimal(signed(a))} + (${decimal(signed(b))}) = ${decimal(sum)}. Resultatbitarna ${trace.bits} betyder ${decimal(signed(trace.bits))}. ${overflow ? `Overflow: ${decimal(sum)} ligger utanför området för ${n} bitar, så bitarna visar inte det riktiga svaret.` : 'Värdena stämmer överens och svaret ryms i talområdet, så inget overflow uppstår.'}`
    )];
  })];
  const signedAddAnswers = values => answers(values.map(([a, b]) => {
    const sum = signed(a) + signed(b), bits = twos(sum, a.length), overflow = signed(bits) !== sum;
    return `${bits}${overflow ? ` — overflow; true sum ${decimal(sum)}` : ` = ${decimal(sum)}`}`;
  }), values.map(([a, b]) => {
    const sum = signed(a) + signed(b), bits = twos(sum, a.length), overflow = signed(bits) !== sum;
    return `${bits}${overflow ? ` — overflow; riktig summa ${decimal(sum)}` : ` = ${decimal(sum)}`}`;
  }));

  // Section 1.5: binary numbers and binary fractions.
  {
    const values = ['101010', '100001', '10111', '0110', '11111'];
    add('1.5', 1, 70, bi('Read binary place values', 'Läs binära positionsvärden'), qParts('Convert each of the following binary representations to its equivalent base ten form:', 'Omvandla var och en av följande binära representationer till motsvarande tal i bas tio:', values), [placeIntro, ...values.map((bits, i) => bi(`${letter(i)}) ${bits}: include ${weightSum(bits)}. Their sum is ${unsigned(bits)}. A leading zero does not add anything.`, `${letter(i)}) ${bits}: ta med ${weightSum(bits)}. Summan är ${unsigned(bits)}. En inledande nolla tillför inget värde.`))], answers(values.map(bits => String(unsigned(bits)))));
  }
  {
    const values = [32, 64, 96, 15, 27];
    add('1.5', 2, 70, bi('Build a binary number', 'Bygg ett binärt tal'), qParts('Convert each of the following base ten representations to its equivalent binary form:', 'Omvandla var och en av följande representationer i bas tio till motsvarande binära form:', values), [placeIntro, bi('Choose the largest power of 2 that fits in the number. Test each smaller place in turn: if it fits in the remainder, write 1 and subtract it; otherwise write 0. Stop after the 1-place.', 'Välj den största tvåpotens som ryms i talet. Pröva därefter varje mindre positionsvärde: om det ryms i resten skriver du 1 och drar bort det; annars skriver du 0. Sluta efter entalsplatsen.'), ...values.map((n, i) => decimalToBinaryStep(n, i))], answers(values.map(n => binary(n))));
  }
  {
    const values = ['11.01', '101.111', '10.1', '110.011', '0.101'];
    add('1.5', 3, 70, bi('Read binary fractions', 'Läs binära bråk'), qParts('Convert each of the following binary representations to its equivalent base ten form:', 'Omvandla var och en av följande binära representationer till motsvarande tal i bas tio:', values), fractionDecodeSteps(values), answers(values.map(v => decimal(binaryFractionValue(v))), values.map(v => decimal(binaryFractionValue(v), 'sv'))));
  }
  {
    const values = [['4½', '100.1'], ['2¾', '10.11'], ['1⅛', '1.001'], ['5/16', '0.0101'], ['5⅝', '101.101']];
    add('1.5', 4, 70, bi('Write fractions in binary', 'Skriv bråk binärt'), qParts('Express the following values in binary notation:', 'Skriv följande värden i binär notation:', values.map(v => v[0])), fractionEncodeSteps(values), answers(values.map(v => v[1])));
  }
  {
    const values = [['11011', '1100'], ['1010.001', '1.101'], ['11111', '0001'], ['111.11', '00.01']];
    const result = ['100111', '1011.110', '100000', '1000.00'];
    const steps = [bi('Align the binary points, then fill missing places with zeros. Add from right to left. Whenever a column totals 2, write 0 and carry 1; whenever it totals 3, write 1 and carry 1. There is no fixed word size here, so keep a new leftmost carry.', 'Ställ binärpunkterna under varandra och fyll tomma platser med nollor. Addera från höger till vänster. Om en kolumn blir 2 skriver du 0 och för 1 vidare; om den blir 3 skriver du 1 och för 1 vidare. Här finns ingen bestämd bitbredd, så behåll en ny bit längst till vänster.')];
    values.forEach(([a, b], i) => {
      const [aw, af = ''] = a.split('.'), [bw, bf = ''] = b.split('.');
      const wholeWidth = Math.max(aw.length, bw.length), fracWidth = Math.max(af.length, bf.length);
      const ap = aw.padStart(wholeWidth, '0') + af.padEnd(fracWidth, '0'), bp = bw.padStart(wholeWidth, '0') + bf.padEnd(fracWidth, '0');
      const trace = addTrace(ap, bp);
      steps.push(bi(`${letter(i)}) ${a} + ${b}: use ${fracWidth} fractional places. Temporarily ignore the aligned points and add ${ap} + ${bp}. ${trace.en}. Keep the final carry if there is one: ${trace.full}. Put the point back ${fracWidth} places from the right: ${result[i]}.`, `${letter(i)}) ${a} + ${b}: använd ${fracWidth} bråkplatser. Bortse tillfälligt från de justerade punkterna och addera ${ap} + ${bp}. ${trace.sv}. Behåll en eventuell sista minnessiffra: ${trace.full}. Sätt tillbaka punkten ${fracWidth} platser från höger: ${result[i]}.`));
      steps.push(bi(`${letter(i)}) Decimal check: ${decimal(binaryFractionValue(a))} + ${decimal(binaryFractionValue(b))} = ${decimal(binaryFractionValue(result[i]))}.`, `${letter(i)}) Kontroll i bas tio: ${decimal(binaryFractionValue(a), 'sv')} + ${decimal(binaryFractionValue(b), 'sv')} = ${decimal(binaryFractionValue(result[i]), 'sv')}.`));
    });
    add('1.5', 5, 70, bi('Add binary numbers', 'Addera binära tal'), qParts('Perform the following additions in binary notation:', 'Utför följande additioner i binär notation:', values.map(v => v.join(' + '))), steps, answers(result));
  }

  // Section 1.6: fixed-width signed integers and biased notation.
  {
    const values = ['00011', '01111', '11100', '11010', '00000', '10000'];
    add('1.6', 1, 76, bi('Decode two’s complement', 'Avkoda tvåkomplement'), qParts('Convert each of the following two’s complement representations to its equivalent base ten form:', 'Omvandla var och en av följande tvåkomplementsrepresentationer till motsvarande tal i bas tio:', values), signedDecodeSteps(values), answers(values.map(v => decimal(signed(v)))));
  }
  {
    const values = [6, -6, -17, 13, -1, 0];
    add('1.6', 2, 76, bi('Encode signed integers', 'Koda heltal med tecken'), qParts('Convert each of the following base ten representations to its equivalent two’s complement form using patterns of 8 bits:', 'Omvandla var och en av följande representationer i bas tio till motsvarande tvåkomplementsform med 8 bitar:', values.map(v => decimal(v))), signedEncodeSteps(values, 8), answers(values.map(v => twos(v, 8))));
  }
  {
    const values = ['00000001', '01010101', '11111100', '11111110', '00000000', '01111111'];
    add('1.6', 3, 76, bi('Change the sign of a number', 'Byt tecken på ett tal'), qParts('Suppose the following bit patterns represent values stored in two’s complement notation. Find the two’s complement representation of the negative of each value:', 'Anta att följande bitmönster representerar värden lagrade i tvåkomplementsnotation. Bestäm tvåkomplementsrepresentationen av det motsatta talet till varje värde:', values), [bi('The negative of a value means its opposite: 4 becomes −4, and −4 becomes 4. For a fixed-width two’s complement pattern, invert every bit and add 1. Retain eight bits. Zero is its own opposite.', 'Det motsatta talet betyder att tecknet byts: 4 blir −4 och −4 blir 4. Med en fast bitbredd i tvåkomplement vänder du varje bit och adderar 1. Behåll åtta bitar. Noll är sitt eget motsatta tal.'), ...values.map((bits, i) => bi(`${letter(i)}) ${bits} means ${decimal(signed(bits))}. Flip all bits: ${invert(bits)}. Add 1: ${invert(bits)} + 00000001 = ${binary(unsigned(invert(bits)) + 1, 8)}. Keep eight bits: ${twos(-signed(bits), 8)}. This means ${decimal(-signed(bits))}, as required.`, `${letter(i)}) ${bits} betyder ${decimal(signed(bits))}. Vänd alla bitar: ${invert(bits)}. Addera 1: ${invert(bits)} + 00000001 = ${binary(unsigned(invert(bits)) + 1, 8)}. Behåll åtta bitar: ${twos(-signed(bits), 8)}. Det betyder ${decimal(-signed(bits))}, precis som det ska.`))], answers(values.map(v => twos(-signed(v), 8))));
  }
  {
    const widths = [4, 6, 8];
    add('1.6', 4, 76, bi('Find the signed range', 'Bestäm talområdet'), bi('Suppose a machine stores numbers in two’s complement notation. What are the largest and smallest numbers that can be stored if the machine uses bit patterns of the following lengths?\na. four\nb. six\nc. eight', 'Anta att en dator lagrar tal i tvåkomplementsnotation. Vilka är de största och minsta talen som kan lagras om datorn använder bitmönster med följande längder?\na. fyra\nb. sex\nc. åtta'), [bi('With n bits there are 2^n patterns. Half describe negative numbers; the other half describe zero and positive numbers. Zero uses one place in the nonnegative half, so there is one more negative integer than positive integer. The range is −2^(n−1) through 2^(n−1) − 1.', 'Med n bitar finns 2^n bitmönster. Hälften beskriver negativa tal och den andra hälften beskriver noll och positiva tal. Noll tar en plats i den icke-negativa halvan, så det finns ett negativt heltal mer än positiva heltal. Området går från −2^(n−1) till 2^(n−1) − 1.'), ...widths.map((n, i) => bi(`${letter(i)}) ${n} bits: 2^(${n}−1) = ${2 ** (n - 1)}. Smallest: ${binary(2 ** (n - 1), n)} = −${2 ** (n - 1)}. Largest: ${binary(2 ** (n - 1) - 1, n)} = ${2 ** (n - 1)} − 1 = ${2 ** (n - 1) - 1}.`, `${letter(i)}) ${n} bitar: 2^(${n}−1) = ${2 ** (n - 1)}. Minst: ${binary(2 ** (n - 1), n)} = −${2 ** (n - 1)}. Störst: ${binary(2 ** (n - 1) - 1, n)} = ${2 ** (n - 1)} − 1 = ${2 ** (n - 1) - 1}.`))], answers(['largest 7; smallest −8', 'largest 31; smallest −32', 'largest 127; smallest −128'], ['störst 7; minst −8', 'störst 31; minst −32', 'störst 127; minst −128']));
  }
  {
    const values = [['0101', '0010'], ['0011', '0001'], ['0101', '1010'], ['1110', '0011'], ['1010', '1110']];
    add('1.6', 5, 76, bi('Add and check signed values', 'Addera och kontrollera tecknade tal'), qParts('In the following problems, each bit pattern represents a value stored in two’s complement notation. Find the answer to each problem in two’s complement notation by performing the addition process described in the text. Then check your work by translating the problem and your answer into base ten notation.', 'I följande uppgifter representerar varje bitmönster ett värde lagrat i tvåkomplementsnotation. Bestäm svaret på varje uppgift i tvåkomplementsnotation genom att utföra additionsprocessen som beskrivs i texten. Kontrollera sedan ditt arbete genom att omvandla uppgiften och ditt svar till bas tio.', values.map(v => v.join(' + '))), signedAddSteps(values), signedAddAnswers(values));
  }
  {
    const values = [['0100', '0011'], ['0101', '0110'], ['1010', '1010'], ['1010', '0111'], ['0111', '0001']];
    add('1.6', 6, 77, bi('Recognize signed overflow', 'Känn igen overflow'), qParts('Solve each of the following problems in two’s complement notation, but this time, watch for overflow and indicate which answers are incorrect because of this phenomenon.', 'Lös var och en av följande uppgifter i tvåkomplementsnotation, men var denna gång uppmärksam på overflow och ange vilka svar som blir felaktiga på grund av detta fenomen.', values.map(v => v.join(' + '))), signedAddSteps(values), signedAddAnswers(values));
  }
  const subtractionSteps = (values, width) => [bi(
    `Subtraction means adding the opposite: a − b = a + (−b). In particular, subtracting a negative number adds a positive number. Encode the operands with ${width} bits. To negate the second operand, flip its bits and add 1; then perform ordinary binary addition and check the signed range.`,
    `Subtraktion betyder att addera det motsatta talet: a − b = a + (−b). Att dra bort ett negativt tal innebär alltså att lägga till ett positivt tal. Koda talen med ${width} bitar. Byt tecken på det andra talet genom att vända bitarna och addera 1. Utför sedan vanlig binär addition och kontrollera talområdet.`
  ), ...values.flatMap(([a, operator, b], i) => {
    const second = operator === '−' ? -b : b, left = twos(a, width), originalRight = twos(b, width), right = twos(second, width), sum = a + second, trace = addTrace(left, right), overflow = signed(trace.bits) !== sum;
    return [bi(
      `${letter(i)}) ${a} ${operator} (${decimal(b)}): ${a} is ${left}; ${decimal(b)} is ${originalRight}. ${operator === '−' ? `Negate the second operand: flip ${originalRight} to ${invert(originalRight)}, then add 1 to obtain ${right} (keep ${width} bits). Thus this is ${a} + (${decimal(second)}).` : 'This is already an addition, so keep both operands.'}`,
      `${letter(i)}) ${a} ${operator} (${decimal(b)}): ${a} är ${left}; ${decimal(b)} är ${originalRight}. ${operator === '−' ? `Byt tecken på det andra talet: vänd ${originalRight} till ${invert(originalRight)} och addera 1 för att få ${right} (behåll ${width} bitar). Uppgiften blir alltså ${a} + (${decimal(second)}).` : 'Uppgiften är redan en addition, så behåll båda talen.'}`
    ), bi(
      `${letter(i)}) ${left} + ${right}: ${trace.en}. Keep ${trace.bits}. Decimal check: ${a} + (${decimal(second)}) = ${decimal(sum)}. ${overflow ? `Overflow: the true result is outside −${2 ** (width - 1)}…${2 ** (width - 1) - 1}; ${trace.bits} decodes as ${decimal(signed(trace.bits))}, which is wrong.` : `${trace.bits} decodes as ${decimal(signed(trace.bits))}, so the result is correct.`}`,
      `${letter(i)}) ${left} + ${right}: ${trace.sv}. Behåll ${trace.bits}. Kontroll i bas tio: ${a} + (${decimal(second)}) = ${decimal(sum)}. ${overflow ? `Overflow: det riktiga resultatet ligger utanför −${2 ** (width - 1)}…${2 ** (width - 1) - 1}; ${trace.bits} avkodas som ${decimal(signed(trace.bits))}, vilket är fel.` : `${trace.bits} avkodas som ${decimal(signed(trace.bits))}, så resultatet är korrekt.`}`
    )];
  })];
  {
    const values = [[6, '−', -1], [3, '−', -2], [4, '−', 6], [2, '−', -4], [1, '−', 5]];
    add('1.6', 7, 77, bi('Subtract by adding the opposite', 'Subtrahera genom att addera motsatsen'), qParts('Translate each of the following problems from base ten notation into two’s complement notation using bit patterns of length four, then convert each problem to an equivalent addition problem (as a machine might do), and perform the addition. Check your answers by converting them back to base ten notation.', 'Översätt var och en av följande uppgifter från bas tio till tvåkomplementsnotation med fyra bitar. Skriv sedan om varje uppgift till en likvärdig addition (som en dator kan göra) och utför additionen. Kontrollera svaren genom att omvandla dem tillbaka till bas tio.', ['6 − (−1)', '3 − (−2)', '4 − 6', '2 − (−4)', '1 − 5']), subtractionSteps(values, 4), answers(values.map(([a, , b]) => `${twos(a - b, 4)} = ${decimal(a - b)}`)));
  }
  add('1.6', 8, 77, bi('Can opposite signs overflow?', 'Kan olika tecken ge overflow?'), bi('Can overflow ever occur when values are added in two’s complement notation with one value positive and the other negative? Explain your answer.', 'Kan overflow någonsin uppstå när värden adderas i tvåkomplementsnotation och det ena värdet är positivt och det andra negativt? Förklara ditt svar.'), [bi('Overflow means that the true mathematical result does not fit within the available signed range. We assume both original values already fit in the same bit width.', 'Overflow betyder att det riktiga matematiska resultatet inte ryms i det tillgängliga talområdet. Vi antar att båda ursprungliga talen redan ryms i samma bitbredd.'), bi('Imagine a number line. Starting at a positive number and adding a negative number moves left. Starting at the negative number and adding the positive number moves right. The sum is therefore between the two original numbers.', 'Tänk dig en tallinje. Om du börjar vid ett positivt tal och lägger till ett negativt tal går du åt vänster. Om du börjar vid det negativa talet och lägger till det positiva går du åt höger. Summan ligger därför mellan de två ursprungliga talen.'), bi('For example, with four bits, 7 + (−8) = −1. The result remains in −8…7. Since every number between two in-range endpoints is also in range, opposite-sign addition cannot cause signed overflow. An extra carry may still be discarded.', 'Till exempel är 7 + (−8) = −1 med fyra bitar. Resultatet ligger fortfarande i −8…7. Eftersom varje tal mellan två tillåtna ändpunkter också ryms i området kan addition med olika tecken inte orsaka tecknat overflow. En extra minnessiffra kan ändå behöva tas bort.')], bi('No. Adding one positive and one negative in-range value cannot cause signed overflow.', 'Nej. Addition av ett positivt och ett negativt värde som båda ryms i talområdet kan inte orsaka tecknat overflow.'));
  const excessDecodeSteps = (values, bias) => [placeIntro, bi(`Excess ${bias} stores a shifted number. First read the bits as an ordinary unsigned number U, then undo the shift: actual value = U − ${bias}. The first bit is not a minus sign.`, `Excess-${bias} lagrar ett förskjutet tal. Läs först bitarna som ett vanligt tal U utan tecken och ta sedan bort förskjutningen: verkligt värde = U − ${bias}. Första biten är inte ett minustecken.`), ...values.map((bits, i) => bi(`${letter(i)}) ${bits}: U = ${weightSum(bits)} = ${unsigned(bits)}. Undo the bias: ${unsigned(bits)} − ${bias} = ${decimal(unsigned(bits) - bias)}. Check by adding ${bias} back.`, `${letter(i)}) ${bits}: U = ${weightSum(bits)} = ${unsigned(bits)}. Ta bort förskjutningen: ${unsigned(bits)} − ${bias} = ${decimal(unsigned(bits) - bias)}. Kontrollera genom att lägga tillbaka ${bias}.`))];
  const excessEncodeSteps = (values, bias, width) => [bi(`Excess ${bias} adds a fixed offset before storage. For each value x, calculate U = x + ${bias}, then write U as an unsigned ${width}-bit number. The stored number must lie between 0 and ${2 ** width - 1}.`, `Excess-${bias} lägger till en fast förskjutning före lagringen. För varje värde x räknar du ut U = x + ${bias} och skriver sedan U som ett ${width}-bitars tal utan tecken. Det lagrade talet måste ligga mellan 0 och ${2 ** width - 1}.`), ...values.map((n, i) => bi(`${letter(i)}) ${decimal(n)} + ${bias} = ${n + bias}. Split ${n + bias} into binary place values: ${weightSum(binary(n + bias, width))}. Store ${binary(n + bias, width)}. Check: ${n + bias} − ${bias} = ${decimal(n)}.`, `${letter(i)}) ${decimal(n)} + ${bias} = ${n + bias}. Dela upp ${n + bias} i binära positionsvärden: ${weightSum(binary(n + bias, width))}. Lagra ${binary(n + bias, width)}. Kontroll: ${n + bias} − ${bias} = ${decimal(n)}.`))];
  {
    const values = ['1110', '0111', '1000', '0010', '0000', '1001'];
    add('1.6', 9, 77, bi('Decode excess-eight notation', 'Avkoda excess-8'), qParts('Convert each of the following excess eight representations to its equivalent base ten form without referring to the table in the text:', 'Omvandla var och en av följande excess-8-representationer till motsvarande tal i bas tio utan att använda tabellen i texten:', values), excessDecodeSteps(values, 8), answers(values.map(v => decimal(unsigned(v) - 8))));
  }
  {
    const values = [5, -5, 3, 0, 7, -8];
    add('1.6', 10, 77, bi('Encode excess-eight notation', 'Koda med excess-8'), qParts('Convert each of the following base ten representations to its equivalent excess eight form without referring to the table in the text:', 'Omvandla var och en av följande representationer i bas tio till motsvarande excess-8-form utan att använda tabellen i texten:', values.map(v => decimal(v))), excessEncodeSteps(values, 8, 4), answers(values.map(v => binary(v + 8, 4))));
  }
  add('1.6', 11, 77, bi('Check whether the code has room', 'Kontrollera om talet ryms'), bi('Can the value 9 be represented in excess eight notation? What about representing 6 in excess four notation? Explain your answer.', 'Kan värdet 9 representeras med excess-8? Kan värdet 6 representeras med excess-4? Förklara ditt svar.'), [bi('In this chapter, excess eight uses four bits. Four bits store unsigned values 0…15. Subtracting the bias 8 gives actual values −8…7.', 'I detta kapitel använder excess-8 fyra bitar. Fyra bitar lagrar teckenlösa värden 0…15. När förskjutningen 8 dras bort blir de verkliga värdena −8…7.'), bi('To encode 9, we would need 9 + 8 = 17 = 10001. That requires five bits, so it does not fit the four-bit excess-eight format.', 'För att koda 9 skulle vi behöva 9 + 8 = 17 = 10001. Det kräver fem bitar och ryms därför inte i det fyrbitars excess-8-formatet.'), bi('Excess four uses three bits: unsigned 0…7, hence actual −4…3. To encode 6, we would need 6 + 4 = 10 = 1010. That requires four bits, so it does not fit this three-bit format.', 'Excess-4 använder tre bitar: teckenlöst 0…7 och därmed verkliga värden −4…3. För att koda 6 skulle vi behöva 6 + 4 = 10 = 1010. Det kräver fyra bitar och ryms därför inte i detta trebitarsformat.')], bi('Neither fits: 9 is outside excess eight’s −8…7 range; 6 is outside excess four’s −4…3 range.', 'Inget av talen ryms: 9 ligger utanför excess-8:s område −8…7 och 6 utanför excess-4:s område −4…3.'));

  // The book's teaching format is sign | excess-four exponent | four fraction bits.
  // It has no hidden leading 1 and is not IEEE 754.
  const floatIntro = [bi(
    'Use the book’s eight-bit format: s | eee | mmmm. The first bit s is the sign: 0 means positive, 1 means negative. The next three bits store an exponent with bias 4. The last four bits are the mantissa, the binary fraction .mmmm. There is no hidden leading 1.',
    'Använd bokens åttabitarsformat: s | eee | mmmm. Första biten s anger tecknet: 0 betyder positivt och 1 negativt. Nästa tre bitar lagrar en exponent med förskjutningen 4. De sista fyra bitarna är mantissan, det binära bråket .mmmm. Det finns ingen dold inledande etta.'
  ), bi(
    'Read eee as an unsigned integer E, then calculate the actual exponent e = E − 4. Read mmmm as an unsigned integer M; its fraction is M/16 because four fractional binary places divide a whole into 16 equal parts. The magnitude is (M/16) × 2^e. A negative exponent means division: 2^(−1) = 1/2, 2^(−2) = 1/4, and so on. Apply the sign last.',
    'Läs eee som ett heltal E utan tecken och beräkna sedan den verkliga exponenten e = E − 4. Läs mmmm som ett heltal M utan tecken; bråkvärdet är M/16 eftersom fyra binära bråkplatser delar en hel i 16 lika delar. Storleken är (M/16) × 2^e. En negativ exponent betyder division: 2^(−1) = 1/2, 2^(−2) = 1/4 och så vidare. Lägg till tecknet sist.'
  )];
  const floatDecode = bits => {
    const E = unsigned(bits.slice(1, 4)), M = unsigned(bits.slice(4)), e = E - 4;
    return {E, M, e, value: (bits[0] === '1' ? -1 : 1) * (M / 16) * 2 ** e};
  };
  const floatDecodeSteps = values => [...floatIntro, ...values.flatMap((bits, i) => {
    const {E, M, e, value} = floatDecode(bits), mantissa = bits.slice(4);
    const terms = [...mantissa].flatMap((b, j) => b === '1' ? [`1/${2 ** (j + 1)}`] : []).join(' + ') || '0';
    return [bi(
      `${letter(i)}) Split ${bits} into ${bits[0]} | ${bits.slice(1, 4)} | ${mantissa}. Sign ${bits[0]} means ${bits[0] === '1' ? 'negative' : 'positive'}. Exponent bits ${bits.slice(1, 4)} give E = ${E}, so e = ${E} − 4 = ${decimal(e)}. Mantissa .${mantissa} = ${terms} = ${M}/16.`,
      `${letter(i)}) Dela ${bits} i ${bits[0]} | ${bits.slice(1, 4)} | ${mantissa}. Teckenbiten ${bits[0]} betyder ${bits[0] === '1' ? 'negativt' : 'positivt'}. Exponentbitarna ${bits.slice(1, 4)} ger E = ${E}, så e = ${E} − 4 = ${decimal(e)}. Mantissan .${mantissa} = ${terms} = ${M}/16.`
    ), bi(
      `${letter(i)}) Move the binary point ${Math.abs(e)} places ${e < 0 ? 'left (divide)' : 'right (multiply)'}${e === 0 ? '; with exponent zero it stays where it is' : ''}. The magnitude is (${M}/16) × 2^(${decimal(e)}) = ${decimal(Math.abs(value))}. Apply the sign: ${decimal(value)} = ${fraction(Math.round(value * 256), 256)}.`,
      `${letter(i)}) Flytta binärpunkten ${Math.abs(e)} platser åt ${e < 0 ? 'vänster (dividera)' : 'höger (multiplicera)'}${e === 0 ? '; med exponent noll stannar den där den är' : ''}. Storleken är (${M}/16) × 2^(${decimal(e)}) = ${decimal(Math.abs(value), 'sv')}. Lägg till tecknet: ${decimal(value, 'sv')} = ${fraction(Math.round(value * 256), 256)}.`
    )];
  })];
  const floatEncode = value => {
    const magnitude = Math.abs(value), e = Math.floor(Math.log2(magnitude)) + 1, E = e + 4;
    const M = Math.floor(magnitude / 2 ** e * 16), sign = value < 0 ? '1' : '0';
    const bits = sign + binary(E, 3) + binary(M, 4), stored = floatDecode(bits).value;
    const raw = magnitude.toString(2), significant = raw.replace('.', '').replace(/^0+/, '');
    return {e, E, M, sign, bits, stored, raw, significant, truncated: stored !== value};
  };
  const floatEncodeSteps = values => [...floatIntro, bi(
    'To encode a nonzero value, write its magnitude in binary and move the point just before its first 1. This normalized mantissa starts .1…. Count how many places the point moved; the power of 2 restores the original size. Keep four mantissa bits, adding trailing zeros if needed. Truncation means dropping extra bits, without rounding up.',
    'För att koda ett värde som inte är noll skriver du dess storlek binärt och flyttar punkten precis före första 1:an. Denna normaliserade mantissa börjar .1…. Räkna hur många platser punkten flyttades; tvåpotensen återställer den ursprungliga storleken. Behåll fyra mantissabitar och lägg till nollor sist om det behövs. Trunkering betyder att extra bitar tas bort utan avrundning uppåt.'
  ), ...values.flatMap(([label, value], i) => {
    const f = floatEncode(value);
    return [bi(
      `${letter(i)}) ${label}: the magnitude is ${decimal(Math.abs(value))} = ${f.raw} in binary. Normalize it as .${f.significant} × 2^(${decimal(f.e)}). The sign bit is ${f.sign}. The exponent is ${decimal(f.e)}, so store E = ${decimal(f.e)} + 4 = ${f.E} as ${binary(f.E, 3)}.`,
      `${letter(i)}) ${label}: storleken är ${decimal(Math.abs(value), 'sv')} = ${f.raw} binärt. Normalisera till .${f.significant} × 2^(${decimal(f.e)}). Teckenbiten är ${f.sign}. Exponenten är ${decimal(f.e)}, så lagra E = ${decimal(f.e)} + 4 = ${f.E} som ${binary(f.E, 3)}.`
    ), bi(
      `${letter(i)}) Keep mantissa ${binary(f.M, 4)}${f.significant.length > 4 ? `; the discarded bits are ${f.significant.slice(4)}` : '; any added zeros do not change its value'}. Join the fields: ${f.sign} | ${binary(f.E, 3)} | ${binary(f.M, 4)} → ${f.bits}. Decode to check: ${f.sign === '1' ? '−' : ''}(${f.M}/16) × 2^(${decimal(f.e)}) = ${decimal(f.stored)}. ${f.truncated ? `Truncation changes the requested value ${decimal(value)} by ${decimal(f.stored - value)}; the absolute error is ${decimal(Math.abs(f.stored - value))}.` : 'This is exactly the requested value, so there is no truncation error.'}`,
      `${letter(i)}) Behåll mantissan ${binary(f.M, 4)}${f.significant.length > 4 ? `; de borttagna bitarna är ${f.significant.slice(4)}` : '; eventuella tillagda nollor ändrar inte värdet'}. Sätt ihop fälten: ${f.sign} | ${binary(f.E, 3)} | ${binary(f.M, 4)} → ${f.bits}. Avkoda för att kontrollera: ${f.sign === '1' ? '−' : ''}(${f.M}/16) × 2^(${decimal(f.e)}) = ${decimal(f.stored, 'sv')}. ${f.truncated ? `Trunkeringen ändrar det önskade värdet ${decimal(value, 'sv')} med ${decimal(f.stored - value, 'sv')}; felets storlek är ${decimal(Math.abs(f.stored - value), 'sv')}.` : 'Detta är exakt det önskade värdet, så inget trunkeringsfel uppstår.'}`
    )];
  })];
  const floatEncodeAnswers = values => answers(values.map(([, value]) => {
    const f = floatEncode(value);
    return `${f.bits} = ${decimal(f.stored)} (${f.truncated ? 'truncation error' : 'exact'})`;
  }), values.map(([, value]) => {
    const f = floatEncode(value);
    return `${f.bits} = ${decimal(f.stored, 'sv')} (${f.truncated ? 'trunkeringsfel' : 'exakt'})`;
  }));

  // Section 1.7: the book's small floating-point format.
  {
    const values = ['01001010', '01101101', '00111001', '11011100', '10101011'];
    add('1.7', 1, 82, bi('Decode a floating-point byte', 'Avkoda en flyttalsbyte'), qParts('Decode the following bit patterns using the floating-point format discussed in the text:', 'Avkoda följande bitmönster med flyttalsformatet som beskrivs i texten:', values), floatDecodeSteps(values), answers(values.map(v => `${fraction(Math.round(floatDecode(v).value * 256), 256)} = ${decimal(floatDecode(v).value)}`), values.map(v => `${fraction(Math.round(floatDecode(v).value * 256), 256)} = ${decimal(floatDecode(v).value, 'sv')}`)));
  }
  {
    const values = [['2¾', 2.75], ['5¼', 5.25], ['¾', .75], ['−3½', -3.5], ['−4⅜', -4.375]];
    add('1.7', 2, 82, bi('Encode and identify lost precision', 'Koda och upptäck förlorad precision'), qParts('Encode the following values into the floating-point format discussed in the text. Indicate the occurrence of truncation errors.', 'Koda följande värden med flyttalsformatet som beskrivs i texten. Ange när trunkeringsfel uppstår.', values.map(v => v[0])), floatEncodeSteps(values), floatEncodeAnswers(values));
  }
  add('1.7', 3, 83, bi('Compare floating-point values', 'Jämför flyttalsvärden'), bi('In terms of the floating-point format discussed in the text, which of the patterns 01001001 and 00111101 represents the larger value? Describe a simple procedure for determining which of two patterns represents the larger value.', 'Vilket av mönstren 01001001 och 00111101 representerar det större värdet i flyttalsformatet som beskrivs i texten? Beskriv en enkel metod för att avgöra vilket av två mönster som representerar det större värdet.'), [...floatDecodeSteps(['01001001', '00111101']), bi('Compare the fractions using a common denominator: 9/16 = 18/32, which is greater than 13/32. Therefore the first pattern is larger.', 'Jämför bråken med samma nämnare: 9/16 = 18/32, vilket är större än 13/32. Det första mönstret är därför större.'), bi('For nonzero normalized patterns, compare signs first: a positive value is larger than a negative value. If both are positive, compare exponent bits from left to right, then mantissa bits if exponents match. At the first different bit, the pattern with 1 is larger. If both values are negative, reverse that ordering: the greater magnitude is the smaller number.', 'För normaliserade mönster som inte är noll jämför du först tecknen: ett positivt värde är större än ett negativt. Om båda är positiva jämför du exponentbitarna från vänster till höger och sedan mantissabitarna om exponenterna är lika. Vid den första olika biten är mönstret med 1 störst. Om båda talen är negativa vänder du ordningen: större storlek betyder då ett mindre tal.'), bi('Why normalization matters: .1mmm is always at least 1/2 and less than 1, so a larger exponent places the magnitude in a larger interval. Handle zero by its value, and decode before comparing if unnormalized patterns are allowed; different unnormalized patterns can represent the same value.', 'Därför är normalisering viktig: .1mmm är alltid minst 1/2 och mindre än 1, så en större exponent placerar storleken i ett större intervall. Hantera noll efter dess värde och avkoda före jämförelsen om onormaliserade mönster tillåts; olika onormaliserade mönster kan representera samma värde.')], bi('01001001 is larger: 9/16 (0.5625) > 13/32 (0.40625).', '01001001 är större: 9/16 (0,5625) > 13/32 (0,40625).'));
  add('1.7', 4, 83, bi('Largest and smallest floating-point values', 'Största och minsta flyttalsvärden'), bi('When using the floating-point format discussed in the text, what is the largest value that can be represented? What is the smallest positive value that can be represented?', 'Vilket är det största värdet som kan representeras med flyttalsformatet som beskrivs i texten? Vilket är det minsta positiva värdet som kan representeras?'), [...floatIntro, bi('To maximize a positive value, choose sign 0, the largest exponent bits 111, and the largest mantissa 1111. The exponent is 7 − 4 = 3, and the fraction is 15/16. Thus (15/16) × 2³ = (15/16) × 8 = 15/2 = 7.5. The pattern is 01111111.', 'För att maximera ett positivt värde väljer du tecken 0, största exponentbitarna 111 och största mantissan 1111. Exponenten är 7 − 4 = 3 och bråket är 15/16. Alltså (15/16) × 2³ = (15/16) × 8 = 15/2 = 7,5. Mönstret är 01111111.'), bi('For the smallest positive normalized value, use the smallest exponent 000, meaning −4, and the smallest permitted normalized mantissa 1000, meaning 8/16 = 1/2. Then (1/2) × 2^(−4) = (1/2) × (1/16) = 1/32. The pattern is 00001000.', 'För det minsta positiva normaliserade värdet använder du minsta exponenten 000, som betyder −4, och den minsta tillåtna normaliserade mantissan 1000, som betyder 8/16 = 1/2. Då blir (1/2) × 2^(−4) = (1/2) × (1/16) = 1/32. Mönstret är 00001000.'), bi('If unnormalized mantissas are also permitted, 0001 is smaller than 1000 but still nonzero. With exponent −4 it gives (1/16) × (1/16) = 1/256, pattern 00000001. State which convention you use: these are two different valid interpretations of the question.', 'Om även onormaliserade mantissor tillåts är 0001 mindre än 1000 men fortfarande skilt från noll. Med exponent −4 får vi (1/16) × (1/16) = 1/256, mönstret 00000001. Ange vilken regel du använder: detta är två olika giltiga tolkningar av frågan.')], bi('Largest: 7.5 (01111111). Smallest positive normalized: 1/32 (00001000). With unnormalized values allowed: 1/256 (00000001).', 'Störst: 7,5 (01111111). Minsta positiva normaliserade: 1/32 (00001000). Om onormaliserade värden tillåts: 1/256 (00000001).'));

  // Chapter review 21–40.
  const sentenceA = 'Is 1 byte = 8 bits?';
  const sentenceB = 'Yes, a byte contains 8 bits!';
  const asciiBits = text => [...text].map(c => binary(c.charCodeAt(0), 8)).join(' ');
  const asciiHex = text => [...text].map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' ');
  const asciiMap = (text, language) => [...text].map(c => `${c === ' ' ? (language === 'sv' ? '[mellanslag]' : '[space]') : c} → ${c.charCodeAt(0)} → ${binary(c.charCodeAt(0), 8)}`).join('\n');
  add('review', 21, 104, bi('Encode complete sentences in ASCII', 'Koda hela meningar med ASCII'), bi(`Encode the following sentences in ASCII using one byte per character.\na. ${sentenceA}\nb. ${sentenceB}`, `Koda följande meningar med ASCII och använd en byte per tecken.\na. ${sentenceA}\nb. ${sentenceB}\nMeningarna betyder ”Är 1 byte = 8 bitar?” och ”Ja, en byte innehåller 8 bitar!”. Koda de engelska originaltecknen ovan, även när gränssnittet är på svenska.`), [bi('ASCII gives each character a numeric code. A byte contains eight bits, so write each character’s code as an eight-bit binary number. Spaces and punctuation count as characters; capital and lowercase letters have different codes. Do not add the a./b. labels or quotation marks.', 'ASCII ger varje tecken en sifferkod. En byte innehåller åtta bitar, så skriv varje teckenkod som ett åttabitars binärt tal. Mellanslag och skiljetecken räknas som tecken, och stora och små bokstäver har olika koder. Lägg inte till deluppgiftsmarkeringarna a./b. eller citationstecken.'), bi('For example, I has code 73 = 64 + 8 + 1, giving 01001001. A space has code 32 = 00100000. The character 1 has code 49 = 32 + 16 + 1, giving 00110001; it is not the numeric byte 00000001.', 'Till exempel har I koden 73 = 64 + 8 + 1, alltså 01001001. Ett mellanslag har koden 32 = 00100000. Tecknet 1 har koden 49 = 32 + 16 + 1, alltså 00110001; det är inte den numeriska byten 00000001.'), bi(`a) Match each character to its code, in order. Preserve one space on each side of =.\n${asciiMap(sentenceA, 'en')}`, `a) Koppla varje tecken till dess kod, i ordning. Behåll ett mellanslag på varje sida om =.\n${asciiMap(sentenceA, 'sv')}`), bi(`b) Repeat for the second sentence, including the comma and exclamation mark.\n${asciiMap(sentenceB, 'en')}`, `b) Gör samma sak för den andra meningen, inklusive kommatecknet och utropstecknet.\n${asciiMap(sentenceB, 'sv')}`), bi(`Check the byte counts: sentence a has ${sentenceA.length} characters and needs ${sentenceA.length} bytes; sentence b has ${sentenceB.length} characters and needs ${sentenceB.length} bytes. Read each byte back through the mapping to recover the original sentence.`, `Kontrollera antalet byte: mening a har ${sentenceA.length} tecken och behöver ${sentenceA.length} byte; mening b har ${sentenceB.length} tecken och behöver ${sentenceB.length} byte. Läs tillbaka varje byte med kodningen för att återskapa originalmeningen.`)], answers([asciiBits(sentenceA), asciiBits(sentenceB)]));
  add('review', 22, 104, bi('Express the combined message in hexadecimal', 'Skriv den sammanslagna texten hexadecimalt'), bi(`Combine the two sentences of the previous problem and express it in hexadecimal notation.\nThe previous problem’s sentences are:\na. ${sentenceA}\nb. ${sentenceB}`, `Slå ihop de två meningarna i föregående uppgift och uttryck texten i hexadecimal notation.\nMeningarna i föregående uppgift är:\na. ${sentenceA}\nb. ${sentenceB}\nKoda de engelska originaltecknen ovan.`), [bi(`Join the sentences with one ordinary space, so the text reads: ${sentenceA} ${sentenceB} This makes the joining convention explicit; a line break would have a different code.`, `Sätt ihop meningarna med ett vanligt mellanslag, så att texten blir: ${sentenceA} ${sentenceB} Därmed är det tydligt hur de fogas ihop; en radbrytning skulle ha en annan kod.`), bi('Keep each ASCII byte unchanged. Only its written representation changes. Split each eight-bit byte into two groups of four bits. Each group becomes one hexadecimal digit: 0…9, then A=10, B=11, C=12, D=13, E=14, F=15.', 'Behåll varje ASCII-byte oförändrad. Endast sättet att skriva den ändras. Dela varje åttabitarsbyte i två grupper om fyra bitar. Varje grupp blir en hexadecimal siffra: 0…9 och sedan A=10, B=11, C=12, D=13, E=14, F=15.'), bi('Example: I is 01001001. Split it as 0100 | 1001 = 4 | 9, so write 49. A space is 0010 | 0000 = 20. The question mark is 0011 | 1111 = 3F. The final exclamation mark is 0010 | 0001 = 21.', 'Exempel: I är 01001001. Dela som 0100 | 1001 = 4 | 9, alltså 49. Ett mellanslag är 0010 | 0000 = 20. Frågetecknet är 0011 | 1111 = 3F. Det avslutande utropstecknet är 0010 | 0001 = 21.'), bi(`The first sentence becomes ${asciiHex(sentenceA)}. Insert 20 for the joining space. The second becomes ${asciiHex(sentenceB)}. There are ${sentenceA.length + sentenceB.length + 1} bytes in all; spaces between displayed hex pairs are visual separators, not extra stored spaces.`, `Första meningen blir ${asciiHex(sentenceA)}. Lägg till 20 för mellanslaget mellan meningarna. Den andra blir ${asciiHex(sentenceB)}. Totalt blir det ${sentenceA.length + sentenceB.length + 1} byte; mellanslagen mellan de visade hexparen är läshjälp och inte extra lagrade mellanslag.`), bi('If “combine” is instead interpreted as direct concatenation with no separating character, omit only the 20 between the first sentence’s 3F and the second sentence’s 59. Both conventions must preserve all spaces inside each sentence.', 'Om ”slå ihop” i stället tolkas som direkt sammanfogning utan något avskiljande tecken tar du bara bort 20 mellan första meningens 3F och andra meningens 59. Båda reglerna ska behålla alla mellanslag inne i varje mening.')], bi(asciiHex(`${sentenceA} ${sentenceB}`), asciiHex(`${sentenceA} ${sentenceB}`)));
  add('review', 23, 104, bi('Count in hexadecimal', 'Räkna hexadecimalt'), bi('List the hexadecimal representations of the integers from 20 to 27.', 'Lista de hexadecimala representationerna av heltalen från 20 till 27.'), [bi('Hexadecimal is base 16. A two-digit hexadecimal number has a sixteens place and a ones place. Divide each decimal integer into one group of 16 plus a remainder.', 'Hexadecimal notation har basen 16. Ett tvåsiffrigt hexadecimalt tal har en sextontalsplats och en entalsplats. Dela upp varje decimalt heltal i en grupp om 16 och en rest.'), ...Array.from({length: 8}, (_, i) => {
    const n = i + 20, h = n.toString(16).toUpperCase();
    return bi(`${n} = 1 × 16 + ${n - 16}. The remainder ${n - 16} is written ${h[1]} in hexadecimal, so the result is ${h}.`, `${n} = 1 × 16 + ${n - 16}. Resten ${n - 16} skrivs ${h[1]} hexadecimalt, så resultatet blir ${h}.`);
  })], bi('20→14, 21→15, 22→16, 23→17, 24→18, 25→19, 26→1A, 27→1B (hexadecimal).', '20→14, 21→15, 22→16, 23→17, 24→18, 25→19, 26→1A, 27→1B (hexadecimalt).'));
  add('review', 24, 104, bi('Distinguish text from a numeric value', 'Skilj text från ett numeriskt värde'), bi('a. Write the number 100 by representing 1 and 0 in ASCII.\nb. Write the number 255 in binary representation.', 'a. Skriv talet 100 genom att representera 1 och 0 med ASCII.\nb. Skriv talet 255 i binär representation.'), [bi('a) ASCII stores the written characters. The text 100 contains three characters: 1, 0, 0. The character 1 has ASCII code 49 and the character 0 has code 48.', 'a) ASCII lagrar de skrivna tecknen. Texten 100 består av tre tecken: 1, 0, 0. Tecknet 1 har ASCII-koden 49 och tecknet 0 har koden 48.'), bi('a) Convert the codes: 49 = 32 + 16 + 1 → 00110001. Also 48 = 32 + 16 → 00110000. Write the zero byte twice: 00110001 00110000 00110000. This is three bytes of text.', 'a) Omvandla koderna: 49 = 32 + 16 + 1 → 00110001. Dessutom är 48 = 32 + 16 → 00110000. Skriv byten för noll två gånger: 00110001 00110000 00110000. Detta är tre byte text.'), bi('b) Here we store the number itself. Add the eight binary place values: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255. Every place is needed, so every bit is 1: 11111111. This is an unsigned value; the same eight bits would mean −1 in two’s complement.', 'b) Här lagrar vi själva talet. Lägg ihop de åtta binära positionsvärdena: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255. Varje plats behövs, så varje bit är 1: 11111111. Detta är ett tal utan tecken; samma åtta bitar skulle betyda −1 i tvåkomplement.')], answers(['00110001 00110000 00110000', '11111111 (unsigned)'], ['00110001 00110000 00110000', '11111111 (utan tecken)']));
  add('review', 25, 104, bi('Recognize powers of two', 'Känn igen tvåpotenser'), bi('What values have binary representations in which only one of the bits is 1? List the binary representations for the smallest six values with this property.', 'Vilka värden har binära representationer där endast en av bitarna är 1? Lista de binära representationerna för de sex minsta värdena med denna egenskap.'), [placeIntro, bi('If exactly one bit is 1, only one place contributes. Its value must be a power of two. For positive integers these are 2⁰, 2¹, 2², 2³, … . Moving the single 1 one place left doubles the value.', 'Om exakt en bit är 1 bidrar bara en enda plats. Värdet måste vara en tvåpotens. För positiva heltal är dessa 2⁰, 2¹, 2², 2³, … . När den ensamma 1:an flyttas ett steg åt vänster fördubblas värdet.'), bi('Start at 2⁰ = 1: 1. Double repeatedly: 2 → 10; 4 → 100; 8 → 1000; 16 → 10000; 32 → 100000. Zero does not qualify because it contains no 1-bit.', 'Börja vid 2⁰ = 1: 1. Fördubbla sedan upprepade gånger: 2 → 10; 4 → 100; 8 → 1000; 16 → 10000; 32 → 100000. Noll räknas inte eftersom det saknar en 1-bit.'), bi('“Smallest six” assumes positive integers, as in the surrounding integer exercises. If arbitrary binary fractions were also allowed, 1/2, 1/4, 1/8, … would qualify too and there would be no smallest positive value.', '”De sex minsta” förutsätter positiva heltal, som i de omgivande heltalsuppgifterna. Om godtyckliga binära bråk också tilläts skulle 1/2, 1/4, 1/8, … räknas, och då skulle det inte finnas något minsta positivt värde.')], bi('Powers of two. The six smallest positive integer examples are 1, 10, 100, 1000, 10000, 100000 (values 1, 2, 4, 8, 16, 32).', 'Tvåpotenser. De sex minsta positiva heltalsexemplen är 1, 10, 100, 1000, 10000, 100000 (värdena 1, 2, 4, 8, 16, 32).'));

  {
    const hexes = ['A', '14', '1E', '28', '32', '3C', '46', '65', 'CA', '12F', '194', '1F9'];
    const steps = [bi('The prefix 0x labels hexadecimal; it is not part of the number. One hexadecimal digit corresponds to exactly four binary bits because 16 = 2⁴. Replace each hex digit by four bits, keep their order, and then add the binary place values marked 1. A=10, B=11, C=12, D=13, E=14, F=15.', 'Prefixet 0x anger hexadecimal notation; det är inte en del av talet. En hexadecimal siffra motsvarar exakt fyra binära bitar eftersom 16 = 2⁴. Ersätt varje hexsiffra med fyra bitar, behåll ordningen och addera sedan de binära positionsvärden som har en 1:a. A=10, B=11, C=12, D=13, E=14, F=15.'), ...hexes.map((hex, i) => {
      const groups = [...hex].map(h => binary(parseInt(h, 16), 4)), bits = groups.join(''), value = parseInt(hex, 16);
      const mapping = [...hex].map((h, j) => `${h} → ${groups[j]}`).join(', ');
      return bi(`${letter(i)}) 0x${hex}: ${mapping}, giving ${groups.join(' ')} in binary. Add its 1-bit places: ${weightSum(bits)} = ${value}. Leading zeros only preserve the four-bit groups; they do not change the value.`, `${letter(i)}) 0x${hex}: ${mapping}, vilket ger ${groups.join(' ')} binärt. Addera platserna med 1-bitar: ${weightSum(bits)} = ${value}. Inledande nollor bevarar bara fyrbitarsgrupperna och ändrar inte värdet.`);
    })];
    add('review', 26, 104, bi('Convert hexadecimal to binary and decimal', 'Omvandla hexadecimalt till binärt och decimalt'), qParts('Convert each of the following hexadecimal representations to binary representation and then to its equivalent base 10 representation:', 'Omvandla var och en av följande hexadecimala representationer till binär representation och sedan till motsvarande representation i bas 10:', hexes.map(h => `0x${h}`)), steps, answers(hexes.map(h => `${[...h].map(d => binary(parseInt(d, 16), 4)).join(' ')} → ${parseInt(h, 16)}`)));
  }
  {
    const values = [110, 99, 72, 81, 36];
    add('review', 27, 104, bi('Convert decimal integers to binary', 'Omvandla decimala heltal till binärt'), qParts('Convert each of the following base 10 representations to its equivalent binary representation:', 'Omvandla var och en av följande representationer i bas 10 till motsvarande binära representation:', values), [placeIntro, bi('Work from the largest place down to 1. A place gets 1 if its value fits in what remains; subtract that value. Otherwise the place gets 0. Keep zero places between ones so that the other bits do not move.', 'Arbeta från det största positionsvärdet ner till 1. En plats får 1 om dess värde ryms i det som återstår; dra då bort värdet. Annars får platsen 0. Behåll nollplatser mellan ettor så att de andra bitarna inte flyttas.'), ...values.map((n, i) => decimalToBinaryStep(n, i))], answers(values.map(n => binary(n))));
  }
  {
    const values = ['011111', '100110', '111000', '000101', '010101'];
    add('review', 28, 104, bi('Decode excess-32 values', 'Avkoda excess-32'), qParts('Convert each of the following excess 32 representations to its equivalent base 10 representation:', 'Omvandla var och en av följande excess-32-representationer till motsvarande representation i bas 10:', values), excessDecodeSteps(values, 32), answers(values.map(v => decimal(unsigned(v) - 32))));
  }
  {
    const values = [-12, 0, 10, -8, 9];
    add('review', 29, 104, bi('Encode excess-sixteen values', 'Koda med excess-16'), qParts('Convert each of the following base 10 representations to its equivalent excess sixteen representation:', 'Omvandla var och en av följande representationer i bas 10 till motsvarande excess-16-representation:', values.map(v => decimal(v))), excessEncodeSteps(values, 16, 5), answers(values.map(v => binary(v + 16, 5))));
  }
  {
    const values = ['010101', '101010', '110110', '011011', '111001'];
    add('review', 30, 104, bi('Read six-bit signed integers', 'Läs sexbitars heltal med tecken'), qParts('Convert each of the following two’s complement representations to its equivalent base 10 representation:', 'Omvandla var och en av följande tvåkomplementsrepresentationer till motsvarande representation i bas 10:', values), signedDecodeSteps(values), answers(values.map(v => decimal(signed(v)))));
  }
  {
    const values = [-27, 3, 21, 8, -18];
    add('review', 31, 104, bi('Write eight-bit signed integers', 'Skriv åttabitars heltal med tecken'), qParts('Convert each of the following base 10 representations to its equivalent two’s complement representation in which each value is represented in 8 bits:', 'Omvandla var och en av följande representationer i bas 10 till motsvarande tvåkomplementsrepresentation där varje värde representeras med 8 bitar:', values.map(v => decimal(v))), signedEncodeSteps(values, 8), answers(values.map(v => twos(v, 8))));
  }
  {
    const values = [['00101', '01000'], ['11111', '00001'], ['01111', '00001'], ['10111', '11010'], ['11111', '11111'], ['00111', '01100']];
    add('review', 32, 105, bi('Add five-bit signed values safely', 'Addera fem bitar och kontrollera overflow'), qParts('Perform each of the following additions assuming the bit strings represent values in two’s complement notation. Identify each case in which the answer is incorrect because of overflow.', 'Utför var och en av följande additioner och anta att bitsträngarna representerar värden i tvåkomplementsnotation. Identifiera varje fall där svaret blir felaktigt på grund av overflow.', values.map(v => v.join(' + '))), signedAddSteps(values), signedAddAnswers(values));
  }
  {
    const values = [[5, '+', 1], [5, '−', 1], [12, '−', 5], [8, '−', 7], [12, '+', 5], [5, '−', 11]];
    const result = language => values.map(([a, op, b]) => {
      const sum = op === '+' ? a + b : a - b, bits = twos(sum, 5);
      return `${bits}${signed(bits) === sum ? ` = ${decimal(sum)}` : language === 'en' ? ` — overflow; true answer ${sum}, stored interpretation ${signed(bits)}` : ` — overflow; riktigt svar ${sum}, lagrad tolkning ${signed(bits)}`}`;
    });
    add('review', 33, 105, bi('Turn subtraction into machine addition', 'Gör om subtraktion till datoraddition'), qParts('Solve each of the following problems by translating the values into two’s complement notation (using patterns of 5 bits), converting any subtraction problem to an equivalent addition problem, and performing that addition. Check your work by converting your answer to base ten notation. (Watch out for overflow.)', 'Lös var och en av följande uppgifter genom att översätta värdena till tvåkomplementsnotation (med 5 bitar), göra om varje subtraktion till en likvärdig addition och utföra additionen. Kontrollera ditt arbete genom att omvandla svaret till bas tio. (Var uppmärksam på overflow.)', values.map(([a, op, b]) => `${a} ${op} ${b}`)), subtractionSteps(values, 5), answers(result('en'), result('sv')));
  }
  {
    const values = ['11.11', '100.0101', '0.1101', '1.0', '10.01'];
    add('review', 34, 105, bi('Convert fractional binary values', 'Omvandla binära tal med bråkdel'), qParts('Convert each of the following binary representations into its equivalent base ten representation:', 'Omvandla var och en av följande binära representationer till motsvarande representation i bas tio:', values), fractionDecodeSteps(values), answers(values.map(v => decimal(binaryFractionValue(v))), values.map(v => decimal(binaryFractionValue(v), 'sv'))));
  }
  {
    const values = [['5¾', '101.11'], ['15 15/16', '1111.1111'], ['5⅜', '101.011'], ['1¼', '1.01'], ['6⅝', '110.101']];
    add('review', 35, 105, bi('Build binary mixed numbers', 'Bygg binära tal i blandad form'), qParts('Express each of the following values in binary notation:', 'Skriv vart och ett av följande värden i binär notation:', values.map(v => v[0])), fractionEncodeSteps(values), answers(values.map(v => v[1])));
  }
  {
    const values = ['01011001', '11001000', '10101100', '00111001'];
    add('review', 36, 105, bi('Decode the book’s floating-point format', 'Avkoda bokens flyttalsformat'), qParts('Decode the following bit patterns using the floating-point format described in Figure 1.24:', 'Avkoda följande bitmönster med flyttalsformatet som beskrivs i figur 1.24:', values), floatDecodeSteps(values), answers(values.map(v => `${fraction(Math.round(floatDecode(v).value * 256), 256)} = ${decimal(floatDecode(v).value)}`), values.map(v => `${fraction(Math.round(floatDecode(v).value * 256), 256)} = ${decimal(floatDecode(v).value, 'sv')}`)));
  }
  {
    const values = [['−7½', -7.5], ['½', .5], ['−3¾', -3.75], ['7/32', 7 / 32], ['31/32', 31 / 32]];
    add('review', 37, 105, bi('Store fractions with four mantissa bits', 'Lagra bråk med fyra mantissabitar'), qParts('Encode the following values using the 8-bit floating-point format described in Figure 1.24. Indicate each case in which a truncation error occurs.', 'Koda följande värden med det 8-bitars flyttalsformat som beskrivs i figur 1.24. Ange varje fall där ett trunkeringsfel uppstår.', values.map(v => v[0])), floatEncodeSteps(values), floatEncodeAnswers(values));
  }
  add('review', 38, 105, bi('Find every encoding of the same fraction', 'Hitta alla kodningar av samma bråk'), bi('Assuming you are not restricted to using normalized form, list all the bit patterns that could be used to represent the value 3/8 using the floating-point format described in Figure 1.24.', 'Anta att du inte är begränsad till normaliserad form. Lista alla bitmönster som skulle kunna representera värdet 3/8 med flyttalsformatet som beskrivs i figur 1.24.'), [...floatIntro, bi('The value 3/8 is positive, so the sign bit must be 0. Its binary form is .011. The normalized form is .1100 × 2^(−1): shifting the point one place right doubles the fraction, and multiplying by 1/2 restores its value. The exponent field is −1 + 4 = 3 = 011. This gives 0 | 011 | 1100 = 00111100.', 'Värdet 3/8 är positivt, så teckenbiten måste vara 0. Dess binära form är .011. Den normaliserade formen är .1100 × 2^(−1): när punkten flyttas ett steg åt höger fördubblas bråket, och multiplikation med 1/2 återställer värdet. Exponentfältet är −1 + 4 = 3 = 011. Det ger 0 | 011 | 1100 = 00111100.'), bi('Now halve the mantissa and increase the exponent by 1, so the changes cancel. .0110 × 2⁰ = (6/16) × 1 = 3/8. The exponent field is 0 + 4 = 4 = 100. This gives 0 | 100 | 0110 = 01000110.', 'Halvera nu mantissan och öka exponenten med 1, så att ändringarna tar ut varandra. .0110 × 2⁰ = (6/16) × 1 = 3/8. Exponentfältet är 0 + 4 = 4 = 100. Det ger 0 | 100 | 0110 = 01000110.'), bi('Repeat once more: .0011 × 2¹ = (3/16) × 2 = 3/8. The exponent field is 1 + 4 = 5 = 101. This gives 0 | 101 | 0011 = 01010011.', 'Upprepa en gång till: .0011 × 2¹ = (3/16) × 2 = 3/8. Exponentfältet är 1 + 4 = 5 = 101. Det ger 0 | 101 | 0011 = 01010011.'), bi('Check that none are missing. Solving (M/16) × 2^e = 3/8 gives M = 6 / 2^e. For e = −4, −3, −2, −1, 0, 1, 2, 3, the required M values are 96, 48, 24, 12, 6, 3, 1.5, 0.75. Four bits can store only whole M values from 0 to 15. Only 12, 6, and 3 qualify.', 'Kontrollera att ingen saknas. Ekvationen (M/16) × 2^e = 3/8 ger M = 6 / 2^e. För e = −4, −3, −2, −1, 0, 1, 2, 3 behövs M-värdena 96, 48, 24, 12, 6, 3, 1,5, 0,75. Fyra bitar kan bara lagra heltalsvärden på M från 0 till 15. Bara 12, 6 och 3 fungerar.')], bi('00111100, 01000110, 01010011. Only the first is normalized.', '00111100, 01000110, 01010011. Bara det första är normaliserat.'));
  add('review', 39, 105, bi('Approximate and square √2', 'Approximera och kvadrera √2'), bi('What is the best approximation to the square root of 2 that can be expressed in the 8-bit floating-point format described in Figure 1.24? What value is actually obtained if this approximation is squared by a machine using this floating-point format?', 'Vilken är den bästa approximationen av kvadratroten ur 2 som kan uttryckas med det 8-bitars flyttalsformat som beskrivs i figur 1.24? Vilket värde får man faktiskt om approximationen kvadreras av en dator som använder detta flyttalsformat?'), [...floatIntro, bi('The square root of 2, written √2, is the positive number that gives 2 when multiplied by itself. Its decimal value begins 1.41421356…. “Best approximation” means the representable value with the smallest distance from this number.', 'Kvadratroten ur 2, skriven √2, är det positiva tal som ger 2 när det multipliceras med sig självt. Dess decimalvärde börjar 1,41421356…. ”Bästa approximation” betyder det representerbara värde som ligger närmast detta tal.'), bi('Numbers from 1 up to (but not including) 2 use actual exponent 1, because a normalized mantissa lies from 1/2 up to 1. Their values are (M/16) × 2 = M/8, in steps of 1/8 = 0.125. Around √2 the neighboring values are 11/8 = 1.375 and 12/8 = 1.5.', 'Tal från 1 upp till (men inte inklusive) 2 använder den verkliga exponenten 1 eftersom en normaliserad mantissa ligger från 1/2 upp till 1. Värdena är (M/16) × 2 = M/8, med avståndet 1/8 = 0,125. Runt √2 är grannvärdena 11/8 = 1,375 och 12/8 = 1,5.'), bi('Compare errors: √2 − 1.375 ≈ 0.03921356, while 1.5 − √2 ≈ 0.08578644. The smaller error belongs to 1.375. Encode it with sign 0, exponent 1 + 4 = 5 = 101, and mantissa 11 = 1011: 01011011.', 'Jämför felen: √2 − 1,375 ≈ 0,03921356, medan 1,5 − √2 ≈ 0,08578644. Det mindre felet hör till 1,375. Koda det med tecken 0, exponent 1 + 4 = 5 = 101 och mantissan 11 = 1011: 01011011.'), bi('Square the stored approximation, not the original exact √2: (11/8) × (11/8) = 121/64 = 1.890625. In binary this is 1.111001 = .1111001 × 2¹. Multiplication has produced more than four mantissa bits.', 'Kvadrera den lagrade approximationen, inte det ursprungliga exakta √2: (11/8) × (11/8) = 121/64 = 1,890625. Binärt är detta 1.111001 = .1111001 × 2¹. Multiplikationen har skapat fler än fyra mantissabitar.'), bi('Apply the chapter’s truncation rule: keep 1111 and discard 001. The stored result is 0 | 101 | 1111 = 01011111, which is (15/16) × 2 = 15/8 = 1.875. Rounding this product to the nearest representable value also gives 1.875, but the format alone does not prescribe a rounding policy; we have used the chapter’s truncation policy.', 'Använd kapitlets trunkeringsregel: behåll 1111 och ta bort 001. Det lagrade resultatet blir 0 | 101 | 1111 = 01011111, vilket är (15/16) × 2 = 15/8 = 1,875. Även avrundning av denna produkt till närmaste representerbara värde ger 1,875, men formatet i sig bestämmer ingen avrundningsregel; här har vi använt kapitlets trunkering.')], bi('Best approximation: 11/8 = 1.375 (01011011). Stored square: 15/8 = 1.875 (01011111).', 'Bästa approximation: 11/8 = 1,375 (01011011). Lagrad kvadrat: 15/8 = 1,875 (01011111).'));
  add('review', 40, 105, bi('Find the closest stored value to one tenth', 'Hitta det lagrade värde som ligger närmast en tiondel'), bi('What is the best approximation to the value one-tenth that can be represented using the 8-bit floating-point format described in Figure 1.24?', 'Vilken är den bästa approximationen av värdet en tiondel som kan representeras med det 8-bitars flyttalsformat som beskrivs i figur 1.24?'), [...floatIntro, bi('One tenth is 1/10 = 0.1. To find the best approximation, compare nearby stored values and choose the one with the smallest error. This asks for the closest value, which can differ from simply dropping bits.', 'En tiondel är 1/10 = 0,1. För att hitta den bästa approximationen jämför du närliggande lagrade värden och väljer det som ger minst fel. Frågan gäller det närmaste värdet, vilket kan skilja sig från att bara ta bort bitar.'), bi('Choose actual exponent −3 because 0.1 × 8 = 0.8, which lies in the normalized mantissa interval [1/2, 1). Thus stored values near 0.1 are (M/16) × (1/8) = M/128. The ideal mantissa integer would be 0.1 × 128 = 12.8, but M must be a whole number.', 'Välj den verkliga exponenten −3 eftersom 0,1 × 8 = 0,8, vilket ligger i den normaliserade mantissans intervall [1/2, 1). Lagrade värden nära 0,1 är alltså (M/16) × (1/8) = M/128. Det ideala mantissaheltalet vore 0,1 × 128 = 12,8, men M måste vara ett heltal.'), bi('Compare M=12 and M=13. For 12/128 = 0.09375, the error is 0.1 − 0.09375 = 0.00625. For 13/128 = 0.1015625, the error is 0.1015625 − 0.1 = 0.0015625. The second error is smaller, so choose M=13.', 'Jämför M=12 och M=13. För 12/128 = 0,09375 är felet 0,1 − 0,09375 = 0,00625. För 13/128 = 0,1015625 är felet 0,1015625 − 0,1 = 0,0015625. Det andra felet är mindre, så välj M=13.'), bi('Encode the fields: positive sign 0; exponent −3 + 4 = 1 → 001; mantissa 13 → 1101. Join them: 0 | 001 | 1101 = 00011101. Decode to verify: (13/16) × 2^(−3) = 13/128.', 'Koda fälten: positivt tecken 0; exponent −3 + 4 = 1 → 001; mantissan 13 → 1101. Sätt ihop dem: 0 | 001 | 1101 = 00011101. Avkoda för att kontrollera: (13/16) × 2^(−3) = 13/128.'), bi('If an implementation instead follows the chapter’s truncate-only conversion, 0.1 has repeating binary form .0001100110011… = .1100110011… × 2^(−3). Keeping only 1100 gives 00011100 = 12/128 = 0.09375. That is the truncated encoding, but it is not the best (nearest) approximation asked for here.', 'Om en implementation i stället följer kapitlets omvandling med enbart trunkering har 0,1 den periodiska binära formen .0001100110011… = .1100110011… × 2^(−3). Om bara 1100 behålls blir det 00011100 = 12/128 = 0,09375. Det är den trunkerade kodningen, men inte den bästa (närmaste) approximation som efterfrågas här.')], bi('Best approximation: 13/128 = 0.1015625, encoded as 00011101. Truncation alone would give 00011100 = 0.09375.', 'Bästa approximation: 13/128 = 0,1015625, kodat som 00011101. Enbart trunkering skulle ge 00011100 = 0,09375.'));

  // Keep the referenced bit-field definition visible before a solution is opened.
  const formatReference = bi(
    '\nFormat reference (Figure 1.24): eight bits are arranged as s | eee | mmmm. The sign bit is 0 for positive and 1 for negative. If E is the unsigned value of eee and M is the unsigned value of mmmm, the represented value is (−1)^s × (M/16) × 2^(E−4). The actual exponent ranges from −4 to 3. A nonzero normalized mantissa starts with 1; there is no hidden leading bit. When truncating, keep the first four mantissa bits and discard the rest.',
    '\nFormatbeskrivning (figur 1.24): åtta bitar ordnas som s | eee | mmmm. Teckenbiten är 0 för positivt och 1 för negativt. Om E är det teckenlösa värdet av eee och M är det teckenlösa värdet av mmmm representeras värdet (−1)^s × (M/16) × 2^(E−4). Den verkliga exponenten går från −4 till 3. En normaliserad mantissa som inte är noll börjar med 1; det finns ingen dold inledande bit. Vid trunkering behålls de första fyra mantissabitarna och resten tas bort.'
  );
  for (const item of items) {
    if (item.section === '1.7' || (item.section === 'review' && Number(item.number) >= 36)) {
      item.question.en += formatReference.en;
      item.question.sv += formatReference.sv;
    }
  }
  window.CSChapter.exercises.push(...items);
})();
