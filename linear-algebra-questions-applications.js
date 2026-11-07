(() => {
  'use strict';
  const q = text => ({text});
  const data = {
    '1.10': {
      '1': q(`The accompanying figure shows a network in which the flow rate and direction of flow in certain branches are known. Find the flow rates and directions of flow in the remaining branches.`),
      '2': q(`The accompanying figure shows known flow rates of hydrocarbons into and out of a network of pipes at an oil refinery.
(a) Set up a linear system whose solution provides the unknown flow rates.
(b) Solve the system for the unknown flow rates.
(c) Find the flow rates and directions of flow if x₄ = 50 and x₆ = 0.`),
      '3': q(`The accompanying figure shows a network of one-way streets with traffic flowing in the directions indicated. The flow rates along the streets are measured as the average number of vehicles per hour.
(a) Set up a linear system whose solution provides the unknown flow rates.
(b) Solve the system for the unknown flow rates.
(c) If the flow along the road from A to B must be reduced for construction, what is the minimum flow that is required to keep traffic flowing on all roads?`),
      '4': q(`The accompanying figure shows a network of one-way streets with traffic flowing in the directions indicated. The flow rates along the streets are measured as the average number of vehicles per hour.
(a) Set up a linear system whose solution provides the unknown flow rates.
(b) Solve the system for the unknown flow rates.
(c) Is it possible to close the road from A to B for construction and keep traffic flowing on the other streets? Explain.`),
      '5': q(`Analyze the given electrical circuit by finding the unknown currents.`),
      '6': q(`Analyze the given electrical circuit by finding the unknown currents.`),
      '7': q(`Analyze the given electrical circuit by finding the unknown currents.`),
      '8': q(`Analyze the given electrical circuit by finding the unknown currents.`),
      '9': q(`Write a balanced equation for the given chemical reaction.
C₃H₈ + O₂ → CO₂ + H₂O [propane combustion]`),
      '10': q(`Write a balanced equation for the given chemical reaction.
C₆H₁₂O₆ → CO₂ + C₂H₅OH [fermentation of sugar]`),
      '11': q(`Write a balanced equation for the given chemical reaction.
CH₃COF + H₂O → CH₃COOH + HF`),
      '12': q(`Write a balanced equation for the given chemical reaction.
CO₂ + H₂O → C₆H₁₂O₆ + O₂ [photosynthesis]`),
      '13': q(`Find the quadratic polynomial whose graph passes through the points (1, 1), (2, 2), and (3, 5).`),
      '14': q(`Find the quadratic polynomial whose graph passes through the points (0, 0), (−1, 1), and (1, 1).`),
      '15': q(`Find the cubic polynomial whose graph passes through the points (−1, −1), (0, 1), (1, 3), (4, −1).`),
      '16': q(`The accompanying figure shows the graph of a cubic polynomial. Find the polynomial.`),
      '17': q(`(a) Find an equation that represents the family of all second-degree polynomials that pass through the points (0, 1) and (1, 2). [Hint: The equation will involve one arbitrary parameter that produces the members of the family when varied.]
(b) By hand, or with the help of a graphing utility, sketch four curves in the family.`),
      '18': q(`In this section we have selected only a few applications of linear systems. Using the Internet as a search tool, try to find some more real-world applications of such systems. Select one that is of interest to you and write a paragraph about it.`),
      'TF': q(`In parts (a)–(e) determine whether the statement is true or false, and justify your answer.
(a) In any network, the sum of the flows out of a node must equal the sum of the flows into a node.
(b) When a current passes through a resistor, there is an increase in the electrical potential in a circuit.
(c) Kirchhoff’s current law states that the sum of the currents flowing into a node equals the sum of the currents flowing out of the node.
(d) A chemical equation is called balanced if the total number of atoms on each side of the equation is the same.
(e) Given any n points in the xy-plane, there is a unique polynomial of degree n − 1 or less whose graph passes through those points.`),
      'T1': q(`The following table shows the lifting force on an aircraft wing measured in a wind tunnel at various wind velocities. Model the data with an interpolating polynomial of degree 5, and use that polynomial to estimate the lifting force at 2000 ft/s.
Velocity (100 ft/s): 1, 2, 4, 8, 16, 32.
Lifting force (100 lb), in the same order: 0, 3.12, 15.86, 33.7, 81.5, 123.0.`),
      'T2': q(`(Calculus required) Use the method of Example 7 to approximate the integral
∫₀¹ e^(x²) dx
by subdividing the interval of integration into five equal parts and using an interpolating polynomial to approximate the integrand. Compare your answer to that obtained using the numerical integration capability of your technology utility.`),
      'T3': q(`Use the method of Example 5 to balance the chemical equation
Fe₂O₃ + Al → Al₂O₃ + Fe
(Fe = iron, Al = aluminum, O = oxygen)`),
      'T4': q(`Determine the currents in the accompanying circuit.`)
    },
    '1.11': {
      '1': q(`An automobile mechanic (M) and a body shop (B) use each other’s services. For each $1.00 of business that M does, it uses $0.50 of its own services and $0.25 of B’s services, and for each $1.00 of business that B does it uses $0.10 of its own services and $0.25 of M’s services.
(a) Construct a consumption matrix for this economy.
(b) How much must M and B each produce to provide customers with $7000 worth of mechanical work and $14,000 worth of body work?`),
      '2': q(`A simple economy produces food (F) and housing (H). The production of $1.00 worth of food requires $0.30 worth of food and $0.10 worth of housing, and the production of $1.00 worth of housing requires $0.20 worth of food and $0.60 worth of housing.
(a) Construct a consumption matrix for this economy.
(b) What dollar value of food and housing must be produced for the economy to provide consumers $130,000 worth of food and $130,000 worth of housing?`),
      '3': q(`Consider the open economy described by the accompanying table, where the input is in dollars needed for $1.00 of output.
Table Ex-3: Input required per dollar output. Columns: Housing, Food, Utilities.
Provider Housing: $0.10, $0.60, $0.40.
Provider Food: $0.30, $0.20, $0.30.
Provider Utilities: $0.40, $0.10, $0.20.
(a) Find the consumption matrix for the economy.
(b) Suppose that the open sector has a demand for $1930 worth of housing, $3860 worth of food, and $5790 worth of utilities. Use row reduction to find a production vector that will meet this demand exactly.`),
      '4': q(`A company produces Web design, software, and networking services. View the company as an open economy described by the accompanying table, where input is in dollars needed for $1.00 of output.
Table Ex-4: Input required per dollar output. Columns: Web Design, Software, Networking.
Provider Web Design: $0.40, $0.20, $0.45.
Provider Software: $0.30, $0.35, $0.30.
Provider Networking: $0.15, $0.10, $0.20.
(a) Find the consumption matrix for the company.
(b) Suppose that the customers (the open sector) have a demand for $5400 worth of Web design, $2700 worth of software, and $900 worth of networking. Use row reduction to find a production vector that will meet this demand exactly.`),
      '5': q(`Use matrix inversion to find the production vector x that meets the demand d for the consumption matrix C.
C =
[0.1  0.3]
[0.5  0.4]
d =
[50]
[60]`),
      '6': q(`Use matrix inversion to find the production vector x that meets the demand d for the consumption matrix C.
C =
[0.3  0.1]
[0.3  0.7]
d =
[22]
[14]`),
      '7': q(`Consider an open economy with consumption matrix
C =
[1/2  0]
[ 0   1]
(a) Show that the economy can meet a demand of d₁ = 2 units from the first sector and d₂ = 0 units from the second sector, but it cannot meet a demand of d₁ = 2 units from the first sector and d₂ = 1 unit from the second sector.
(b) Give both a mathematical and an economic explanation of the result in part (a).`),
      '8': q(`Consider an open economy with consumption matrix
C =
[1/2  1/4  1/4]
[1/2  1/8  1/4]
[1/2  1/4  1/8]
If the open sector demands the same dollar value from each product-producing sector, which such sector must produce the greatest dollar value to meet the demand?`),
      '9': q(`Consider an open economy with consumption matrix
C =
[c₁₁  c₁₂]
[c₂₁   0 ]
Show that the Leontief equation x − Cx = d has a unique solution for every demand vector d if c₂₁c₁₂ < 1 − c₁₁.`),
      '10': q(`(a) Consider an open economy with a consumption matrix C whose column sums are less than 1, and let x be the production vector that satisfies an outside demand d; that is, (I − C)⁻¹d = x. Let dⱼ be the demand vector that is obtained by increasing the jth entry of d by 1 and leaving the other entries fixed. Prove that the production vector xⱼ that meets this demand is
xⱼ = x + jth column vector of (I − C)⁻¹.
(b) In words, what is the economic significance of the jth column vector of (I − C)⁻¹? [Hint: Look at xⱼ − x.]`),
      '11': q(`Prove: If C is an n × n matrix whose entries are nonnegative and whose row sums are less than 1, then I − C is invertible and has nonnegative entries. [Hint: (Aᵀ)⁻¹ = (A⁻¹)ᵀ for any invertible matrix A.]`),
      'TF': q(`In parts (a)–(e) determine whether the statement is true or false, and justify your answer.
(a) Sectors of an economy that produce outputs are called open sectors.
(b) A closed economy is an economy that has no open sectors.
(c) The rows of a consumption matrix represent the outputs in a sector of an economy.
(d) If the column sums of the consumption matrix are all less than 1, then the Leontief matrix is invertible.
(e) The Leontief equation relates the production vector for an economy to the outside demand vector.`),
      'T1': q(`The following table describes an open economy with three sectors in which the table entries are the dollar inputs required to produce one dollar of output. The outside demand during a 1-week period if $50,000 of coal, $75,000 of electricity, and $1,250,000 of manufacturing. Determine whether the economy can meet the demand.
Input Required per Dollar Output. Columns: Electricity, Coal, Manufacturing.
Provider Electricity: $0.1, $0.25, $0.2.
Provider Coal: $0.3, $0.4, $0.5.
Provider Manufacturing: $0.1, $0.15, $0.1.`)
    },
    review: {
      '1': q(`The given matrix represents an augmented matrix for a linear system. Write the corresponding set of linear equations for the system, and use Gaussian elimination to solve the linear system. Introduce free parameters as necessary.
[3  −1  0  4 |  1]
[2   0  3  3 | −1]`),
      '2': q(`The given matrix represents an augmented matrix for a linear system. Write the corresponding set of linear equations for the system, and use Gaussian elimination to solve the linear system. Introduce free parameters as necessary.
[ 1   4 | −1]
[−2  −8 |  2]
[ 3  12 | −3]
[ 0   0 |  0]`),
      '3': q(`The given matrix represents an augmented matrix for a linear system. Write the corresponding set of linear equations for the system, and use Gaussian elimination to solve the linear system. Introduce free parameters as necessary.
[ 2  −4   1 |  6]
[−4   0   3 | −1]
[ 0   1  −1 |  3]`),
      '4': q(`The given matrix represents an augmented matrix for a linear system. Write the corresponding set of linear equations for the system, and use Gaussian elimination to solve the linear system. Introduce free parameters as necessary.
[ 3   1 | −2]
[−9  −3 |  6]
[ 6   2 |  1]`),
      '5': q(`Use Gauss–Jordan elimination to solve for x′ and y′ in terms of x and y.
x = (3/5)x′ − (4/5)y′
y = (4/5)x′ + (3/5)y′`),
      '6': q(`Use Gauss–Jordan elimination to solve for x′ and y′ in terms of x and y.
x = x′ cos θ − y′ sin θ
y = x′ sin θ + y′ cos θ`),
      '7': q(`Find positive integers that satisfy
x + y + z = 9
x + 5y + 10z = 44.`),
      '8': q(`A box containing pennies, nickels, and dimes has 13 coins with a total value of 83 cents. How many coins of each type are in the box? Is the economy productive?`),
      '9': q(`Let
[a  0  b | 2]
[a  a  4 | 4]
[0  a  2 | b]
be the augmented matrix for a linear system. Find for what values of a and b the system has
(a) a unique solution.
(b) a one-parameter solution.
(c) a two-parameter solution.
(d) no solution.`),
      '10': q(`For which value(s) of a does the following system have zero solutions? One solution? Infinitely many solutions?
x₁ + x₂ + x₃ = 4
x₃ = 2
(a² − 4)x₃ = a − 2`),
      '11': q(`Find a matrix K such that AKB = C given that
A =
[ 1   4]
[−2   3]
[ 1  −2]
B =
[2  0   0]
[0  1  −1]
C =
[ 8   6  −6]
[ 6  −1   1]
[−4   0   0]`),
      '12': q(`How should the coefficients a, b, and c be chosen so that the system
ax + by − 3z = −3
−2x − by + cz = −1
ax + 3y − cz = −3
has the solution x = 1, y = −1, and z = 2?`),
      '13': q(`In each part, solve the matrix equation for X.
(a) XB = C, where
B =
[−1  0   1]
[ 1  1   0]
[ 3  1  −1]
C =
[ 1  2  0]
[−3  1  5]
(b) XB = C, where
B =
[1  −1  2]
[3   0  1]
C =
[−5  −1  0]
[ 6  −3  7]
(c) AX − XB = C, where
A =
[ 3  1]
[−1  2]
B =
[1  4]
[2  0]
C =
[2  −2]
[5   4]`),
      '14': q(`Let A be a square matrix.
(a) Show that (I − A)⁻¹ = I + A + A² + A³ if A⁴ = 0.
(b) Show that (I − A)⁻¹ = I + A + A² + ⋯ + Aⁿ if Aⁿ⁺¹ = 0.`),
      '15': q(`Find values of a, b, and c such that the graph of the polynomial p(x) = ax² + bx + c passes through the points (1, 2), (−1, 6), and (2, 3).`),
      '16': q(`(Calculus required) Find values of a, b, and c such that the graph of p(x) = ax² + bx + c passes through the point (−1, 0) and has a horizontal tangent at (2, −9).`),
      '17': q(`Let Jₙ be the n × n matrix each of whose entries is 1. Show that if n > 1, then
(I − Jₙ)⁻¹ = I − [1/(n − 1)]Jₙ.`),
      '18': q(`Show that if a square matrix A satisfies
A³ + 4A² − 2A + 7I = 0
then so does Aᵀ.`),
      '19': q(`Prove: If B is invertible, then AB⁻¹ = B⁻¹A if and only if AB = BA.`),
      '20': q(`Prove: If A is invertible, then A + B and I + BA⁻¹ are both invertible or both not invertible.`),
      '21': q(`Prove: If A is an m × n matrix and B is the n × 1 matrix each of whose entries is 1/n, then
AB =
[r₁]
[r₂]
[ ⋮]
[rₘ]
where rᵢ is the average of the entries in the ith row of A.`),
      '22': q(`(Calculus required) If the entries of the matrix
C =
[c₁₁(x)  c₁₂(x)  ⋯  c₁ₙ(x)]
[c₂₁(x)  c₂₂(x)  ⋯  c₂ₙ(x)]
[   ⋮        ⋮    ⋱     ⋮  ]
[cₘ₁(x)  cₘ₂(x)  ⋯  cₘₙ(x)]
are differentiable functions of x, then we define
dC/dx =
[c′₁₁(x)  c′₁₂(x)  ⋯  c′₁ₙ(x)]
[c′₂₁(x)  c′₂₂(x)  ⋯  c′₂ₙ(x)]
[    ⋮         ⋮    ⋱      ⋮  ]
[c′ₘ₁(x)  c′ₘ₂(x)  ⋯  c′ₘₙ(x)]
Show that if the entries in A and B are differentiable functions of x and the sizes of the matrices are such that the stated operations can be performed, then
(a) d(kA)/dx = k(dA/dx).
(b) d(A + B)/dx = dA/dx + dB/dx.
(c) d(AB)/dx = (dA/dx)B + A(dB/dx).`),
      '23': q(`(Calculus required) Use part (c) of Exercise 22 to show that
d(A⁻¹)/dx = −A⁻¹(dA/dx)A⁻¹.
State all the assumptions you make in obtaining this formula.
Referenced formula from Exercise 22(c): d(AB)/dx = (dA/dx)B + A(dB/dx).`),
      '24': q(`Assuming that the stated inverses exist, prove the following equalities.
(a) (C⁻¹ + D⁻¹)⁻¹ = C(C + D)⁻¹D.
(b) (I + CD)⁻¹C = C(I + DC)⁻¹.
(c) (C + DDᵀ)⁻¹D = C⁻¹D(I + DᵀC⁻¹D)⁻¹.`),
      '25': q(`Partitioned matrices can be multiplied by the row-column rule just as if the matrix entries were numbers provided that the sizes of all matrices are such that the necessary operations can be performed. Thus, for example, if A is partitioned into a 2 × 2 matrix and B into a 2 × 1 matrix, then
AB =
[A₁₁  A₁₂] [B₁] = [A₁₁B₁ + A₁₂B₂]
[A₂₁  A₂₂] [B₂]   [A₂₁B₁ + A₂₂B₂]     (*)
provided that the sizes are such that AB, the two sums, and the four products are all defined.
Let A and B be the following partitioned matrices.
A =
[1   0  2 | 1   4]
[4   1  0 | 3  −1]
[---------+------]
[0  −3  4 | 2  −2]
= [A₁₁ A₁₂; A₂₁ A₂₂], with the horizontal partition after row 2 and vertical partition after column 3.
B =
[3   0]
[2   1]
[4  −1]
[-----]
[0   3]
[2   5]
= [B₁; B₂], with the horizontal partition after row 3.
(a) Confirm that the sizes of all matrices are such that the product AB can be obtained using Formula (*).
(b) Confirm that the result obtained using Formula (*) agrees with that obtained using ordinary matrix multiplication.`),
      '26': q(`Suppose that an invertible matrix A is partitioned as
A =
[A₁₁  A₁₂]
[A₂₁  A₂₂]
Show that
A⁻¹ =
[B₁₁  B₁₂]
[B₂₁  B₂₂]
where
B₁₁ = (A₁₁ − A₁₂A₂₂⁻¹A₂₁)⁻¹,
B₁₂ = −B₁₁A₁₂A₂₂⁻¹,
B₂₁ = −A₂₂⁻¹A₂₁B₁₁,
B₂₂ = (A₂₂ − A₂₁A₁₁⁻¹A₁₂)⁻¹,
provided all the inverses in these formulas exist.`),
      '27': q(`In the special case where matrix A₂₁ in Exercise 26 is zero, the matrix A simplifies to
A =
[A₁₁  A₁₂]
[ 0   A₂₂]
which is said to be in block upper triangular form. Use the result of Exercise 26 to show that in this case
A⁻¹ =
[A₁₁⁻¹  −A₁₁⁻¹A₁₂A₂₂⁻¹]
[   0           A₂₂⁻¹   ]
Referenced result from Exercise 26: B₁₁ = (A₁₁ − A₁₂A₂₂⁻¹A₂₁)⁻¹; B₁₂ = −B₁₁A₁₂A₂₂⁻¹; B₂₁ = −A₂₂⁻¹A₂₁B₁₁; B₂₂ = (A₂₂ − A₂₁A₁₁⁻¹A₁₂)⁻¹, whenever these inverses exist.`),
      '28': q(`A linear system whose coefficient matrix has a pivot position in every row must be consistent. Explain why this must be so.`),
      '29': q(`What can you say about the consistency or inconsistency of a linear system of three equations in five unknowns whose coefficient matrix has three pivot columns?`)
    }
  };

  // Keep the book's question separate from the teacher's worked explanation.
  const existing = (section, number) => window.EmberTextbook.solutions[section].find(p => p.number === String(number));
  const teach = (section, number, steps, answer) => {
    const item = data[section][String(number)];
    item.steps = steps;
    item.answer = answer === undefined ? existing(section, number).answer : answer;
  };
  const extend = (section, number, before, after, answer) => teach(section, number,
    [...before, ...existing(section, number).steps, ...after], answer);

  const figures = {
    '1': ['algebra-1-10-1.svg', 'Figure Ex-1', 'Four-node flow network: 50 enters the top, 40 enters the bottom, 30 leaves the left, 60 leaves the right, and 50 flows from the bottom to the right.'],
    '2': ['algebra-1-10-2.svg', 'Figure Ex-2', 'Refinery network with six unknown flows, inflows 200, 25 and 150, and outflows 175 and 200; arrows show the assumed directions.'],
    '3': ['algebra-1-10-3.svg', 'Figure Ex-3', 'Four one-way intersections with boundary traffic rates. A to B is the upper-right to lower-right road carrying x₄.'],
    '4': ['algebra-1-10-4.svg', 'Figure Ex-4', 'Six one-way intersections with seven internal flows and all boundary traffic rates. The upper-left road A to B carries x₁.'],
    '5': ['algebra-1-10-5.svg', 'Exercise 5 circuit', 'Two 2 Ω resistors, one 4 Ω resistor, 6 V and 8 V sources, and current arrows I₁, I₂ and I₃.'],
    '6': ['algebra-1-10-6.svg', 'Exercise 6 circuit', 'The central 4 Ω branch carries I₁ upward, the left 6 Ω branch carries I₂ downward, and the right 2 Ω branch carries I₃ upward. Battery polarities are shown.'],
    '7': ['algebra-1-10-7.svg', 'Exercise 7 circuit', 'Four 20 Ω resistors, two 10 V sources with opposite polarities, and arrows I₁ through I₆.'],
    '8': ['algebra-1-10-8.svg', 'Exercise 8 circuit', 'Three parallel branches: 5 V and 3 Ω at the top, 4 V and 4 Ω in the middle, 3 V and 5 Ω below. I₁ points left; I₂ and I₃ point right.'],
    '16': ['algebra-1-10-16.svg', 'Figure Ex-16', 'Cubic graph on a unit grid, passing through the origin, (2,5), (4,8) and (6,3).'],
    'T4': ['algebra-1-10-t4.svg', 'Technology exercise T4 circuit', 'Parallel branches with 20 V and 3 Ω above, 470 Ω in the middle, and 12 V and 2 Ω below. The diagram shows each battery polarity and the I₁, I₂ and I₃ arrows.']
  };
  for (const [number, [file, caption, alt]] of Object.entries(figures)) data['1.10'][number].figures = [{file, caption, alt}];

  extend('1.10', '1', [
    'A flow rate tells us how much passes a point per unit of time. At a junction with no storage, everything entering must also leave. Start at a junction with only one unknown branch so that one subtraction finds its flow.'
  ], [], 'Top → left: 40; top → right: 10; left → bottom: 10, in the flow-rate units of the diagram. All four junctions balance.');
  teach('1.10', '2', [
    'Part (a): each dot is a junction. Write “total entering = total leaving.” We assume that hydrocarbons do not collect at a junction. The labels x₁,…,x₆ are the unknown amounts flowing per unit time in the drawn directions.',
    'At the upper-left junction, 200 arrives and x₁+x₃ leaves, giving x₁+x₃=200. At the lower-left junction, x₁ and 25 arrive while x₂ leaves, giving x₁+25=x₂.',
    'At the upper-middle junction, x₃+150=x₄+x₅. At the lower-middle junction, x₂+x₄=x₆+175. At the rightmost junction, x₅+x₆=200. These five equations form the required system.',
    'Part (b): two flows can be chosen freely. Call x₄=s and x₆=t. The outlet equation gives x₅=200−t. Substitute this into x₃+150=s+x₅ to get x₃=50+s−t.',
    'Now x₁=200−x₃=150−s+t, and x₂=x₁+25=175−s+t. Check the remaining junction: x₂+x₄=175−s+t+s=175+t=x₆+175. It introduces no new restriction.',
    'Part (c): insert s=50 and t=0 into all six formulas, giving x₁=100, x₂=125, x₃=100, x₄=50, x₅=200 and x₆=0. A positive value follows its arrow. A zero value means no flow in that pipe.',
    'Check the numerical balances: 100+100=200; 100+25=125; 100+150=50+200; 125+50=0+175; and 200+0=200. Thus the chosen flows satisfy every junction.'
  ], '(a) x₁+x₃=200, x₁+25=x₂, x₃+150=x₄+x₅, x₂+x₄=x₆+175, x₅+x₆=200.\n(b) (x₁,x₂,x₃,x₄,x₅,x₆)=(150−s+t,175−s+t,50+s−t,s,200−t,t). To keep all flows in the drawn directions, require s≥0, 0≤t≤200, and t−50≤s≤150+t.\n(c) (100,125,100,50,200,0); all nonzero flows follow the arrows and pipe x₆ has no flow.');
  teach('1.10', '3', [
    'Part (a): count vehicles entering and leaving each intersection. A flow rate is an average per hour, so it may be a non-integer number. At the upper-left corner, x₂+300=x₃+400. At A, x₃+750=x₄+250.',
    'At the lower-left corner, x₁+100=x₂+400. At B, x₄+200=x₁+300. Together these four balances are the linear system.',
    'Part (b): choose the road we want to reduce, x₄, as the free parameter s. The balance at B gives x₁=s−100.',
    'Move to the lower-left intersection: x₂=x₁−300=s−400. Then the upper-left intersection gives x₃=x₂−100=s−500.',
    'Check A: x₃+750=(s−500)+750=s+250=x₄+250. This equation is satisfied for every value of s; it does not determine another unknown.',
    'Part (c): a one-way road cannot carry a negative flow. The four inequalities are s−100≥0, s−400≥0, s−500≥0 and s≥0. The strongest one is s≥500.',
    'At the boundary s=500, the rates are (400,100,0,500), so road x₃ has stopped. If “flowing on all roads” means strictly positive flow, require s>500. There is no smallest real number greater than 500. Under an additional whole-number restriction, the smallest choice is 501.'
  ], '(a) x₂+300=x₃+400; x₃+750=x₄+250; x₁+100=x₂+400; x₄+200=x₁+300.\n(b) (x₁,x₂,x₃,x₄)=(s−100,s−400,s−500,s).\n(c) 500 vehicles/hour is the lower boundary for nonnegative flows. To keep every road carrying positive traffic, x₄ must be greater than 500 vehicles/hour; 501 is the smallest choice only if whole-number rates are required.');
  teach('1.10', '4', [
    'Part (a): use one equation per intersection, with incoming traffic on the left and outgoing traffic on the right. Along the top row, these equations are x₁+x₃=800, x₁+x₄=x₂+200, and x₂+100=x₅+600.',
    'Along the bottom row, the equations are x₃+x₆=750, x₇+600=x₆+x₄, and x₅+450=x₇+400. The numbers 800 and 750 combine the two boundary arrows at their respective intersections.',
    'Part (b): let x₁=s and x₅=t. From the rightmost intersections, x₂=t+500 and x₇=t+50.',
    'At A, x₃=800−s. Then the lower-left balance gives x₆=750−x₃=s−50. At B, x₄=x₂+200−x₁=700+t−s.',
    'Check the unused lower-middle balance: x₇+600=t+650, and x₆+x₄=(s−50)+(700+t−s)=t+650. Thus the formulas satisfy all six equations.',
    'Part (c): closing A → B means x₁=s=0. But the formula x₆=s−50 would give x₆=−50. A negative flow would mean 50 vehicles per hour traveling against that one-way arrow, so closure is incompatible with the given traffic pattern.',
    'For a feasible nonnegative flow in every drawn direction, x₃≥0 requires s≤800, x₆≥0 requires s≥50, and x₄≥0 requires t≥s−700. Together with t≥0, these describe the allowed choices.'
  ], '(a) x₁+x₃=800; x₁+x₄=x₂+200; x₂+100=x₅+600; x₃+x₆=750; x₇+600=x₆+x₄; x₅+450=x₇+400.\n(b) (x₁,…,x₇)=(s,500+t,800−s,700+t−s,t,s−50,t+50), with 50≤s≤800 and t≥max(0,s−700) for nonnegative flows.\n(c) No. Closing A → B forces x₆=−50, against a one-way street.');
  extend('1.10', '5', [], [
    'Interpret the signs: I₁=13/5=2.6 A travels downward, I₂=−2/5 A means 0.4 A upward instead of downward, and I₃=11/5=2.2 A travels upward. Check the junction: 2.6−0.4=2.2.'
  ], 'I₁=13/5 A=2.6 A downward; I₂=−2/5 A relative to its arrow, so 0.4 A upward; I₃=11/5 A=2.2 A upward.');
  teach('1.10', '6', [
    'Read the labels carefully: I₁ is the upward arrow in the central 4 Ω resistor; I₂ is the downward arrow in the left 6 Ω branch; I₃ is the upward arrow in the right 2 Ω branch. A negative answer will mean that the actual direction is reversed.',
    'Balance the top junction. Currents I₁ and I₃ enter it, while I₂ leaves it, so I₁+I₃=I₂.',
    'Call the top-minus-bottom electrical potential V. A resistor drops voltage by resistance × current when followed in the current direction. In the central branch the upward arrow means V=−4I₁. On the left, the resistor and the 1 V source give V=6I₂−1. On the right, the 2 V source and resistor give V=2−2I₃.',
    'Equate these three descriptions of the same voltage: −4I₁=6I₂−1 gives 4I₁+6I₂=1; and −4I₁=2−2I₃ gives −4I₁+2I₃=2.',
    'Use the last equation first: divide by 2 to get I₃=1+2I₁. Substitute into the junction equation to get I₂=I₁+(1+2I₁)=1+3I₁.',
    'Substitute that expression for I₂ into 4I₁+6I₂=1. This gives 4I₁+6(1+3I₁)=1, so 22I₁=−5 and I₁=−5/22 A.',
    'Work back: I₂=1+3(−5/22)=7/22 A; I₃=1+2(−5/22)=12/22=6/11 A. The central current is negative relative to its upward arrow, so it actually travels downward.',
    'Check the junction: −5/22+12/22=7/22. Check all three voltages: −4(−5/22)=10/11; 6(7/22)−1=10/11; 2−2(6/11)=10/11 volts. The results agree.'
  ], 'I₁=−5/22 A (about 0.2273 A downward, opposite its arrow); I₂=7/22 A (about 0.3182 A down the left branch); I₃=6/11 A (about 0.5455 A up the right branch).');
  extend('1.10', '7', [], [
    'Read zero literally: neither central vertical resistor carries current. The positive currents I₁, I₄, I₅ and I₆ all follow their drawn arrows. Their value is 1/2 A=0.5 A. Both central resistors have voltage drop 20×0=0 V, which agrees with the equal top and bottom rail voltages.'
  ], 'I₁=I₄=I₅=I₆=1/2 A, each in its drawn direction. I₂=I₃=0 A, so there is no current through the two central vertical resistors.');
  extend('1.10', '8', [], [
    'All three answers are positive: I₁ follows the leftward top arrow, while I₂ and I₃ follow the rightward arrows. The junction check is 77/47=48/47+29/47.'
  ], 'I₁=77/47 A≈1.6383 A leftward; I₂=48/47 A≈1.0213 A rightward; I₃=29/47 A≈0.6170 A rightward.');

  teach('1.10', '9', [
    'Balancing a reaction means counting each kind of atom separately. A small subscript belongs to the molecule and stays fixed; a number placed before a formula tells us how many whole molecules to use.',
    'Start with one C₃H₈ molecule. It contains 3 carbon atoms, so put 3 before CO₂ on the right.',
    'The propane molecule also contains 8 hydrogen atoms. Each H₂O contains 2, so put 8÷2=4 before H₂O.',
    'Now count oxygen on the right: 3CO₂ contains 3×2=6 oxygen atoms and 4H₂O contains 4×1=4. There are 10 in total, so the left needs 10÷2=5 O₂ molecules.',
    'Check each element: carbon 3=3, hydrogen 8=8, and oxygen 10=6+4. The coefficients 1,5,3,4 are whole numbers with no common factor.'
  ], 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.');
  teach('1.10', '10', [
    'Start with one glucose molecule C₆H₁₂O₆. Call the unknown counts of CO₂ and C₂H₅OH a and b. Notice that C₂H₅OH contains 6 hydrogen atoms in total: 5 in H₅ and 1 in OH.',
    'Balance hydrogen first because only ethanol contains hydrogen on the right. The equation is 12=6b, so b=2.',
    'Balance carbon: glucose supplies 6 carbon atoms; the products contain a+2b. Thus 6=a+2(2), giving a=2.',
    'Check oxygen independently: 2CO₂ contains 4 oxygen atoms and 2C₂H₅OH contains 2, totaling the 6 in glucose. Carbon and hydrogen also match, so no adjustment is needed.'
  ], 'C₆H₁₂O₆ → 2CO₂ + 2C₂H₅OH.');
  teach('1.10', '11', [
    'Expand the atom counts mentally without changing the chemical formulas. CH₃COF has C₂H₃OF; CH₃COOH has C₂H₄O₂. The extra H in OH counts as a hydrogen atom.',
    'Use one molecule of CH₃COF. Its two carbon atoms fit one CH₃COOH, and its one fluorine atom fits one HF. Begin with coefficient 1 for these three substances.',
    'The products now need 4+1=5 hydrogen atoms, but CH₃COF supplies only 3. One H₂O supplies the missing 2.',
    'Check oxygen: CH₃COF contributes 1 and H₂O contributes 1, matching the 2 in CH₃COOH. Check the complete totals: C=2, H=5, O=2, F=1 on each side.'
  ], 'CH₃COF + H₂O → CH₃COOH + HF. All four coefficients are 1.');
  teach('1.10', '12', [
    'Choose one glucose molecule, C₆H₁₂O₆, as the product. We will supply the atoms it needs by choosing the numbers of whole reactant molecules.',
    'Glucose has 6 carbon atoms. Each CO₂ supplies 1, so use 6CO₂.',
    'Glucose has 12 hydrogen atoms. Each water molecule supplies 2, so use 12÷2=6H₂O.',
    'The reactants now contain 6×2+6×1=18 oxygen atoms. Six belong in glucose, leaving 18−6=12 oxygen atoms for O₂. Because each O₂ contains 2, its coefficient is 12÷2=6.',
    'Check the counts on both sides: carbon 6; hydrogen 12; oxygen 18. All coefficients are whole numbers and the glucose coefficient is 1, so they cannot all be reduced.'
  ], '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.');
  extend('1.10', '13', ['A quadratic has the shape p(x)=ax²+bx+c. The coordinates of the three points are known; the three coefficients a,b,c are the unknowns. “Passes through (1,1)” means putting x=1 into the formula must give 1.'], ['Check the resulting polynomial directly: p(1)=1−2+2=1, p(2)=4−4+2=2, and p(3)=9−6+2=5.'], 'p(x)=x²−2x+2; the coefficients are a=1, b=−2 and c=2.');
  teach('1.10', '14', [
    'Start with the general quadratic p(x)=ax²+bx+c. We seek its coefficients, not the already-given point coordinates.',
    'Use (0,0): p(0)=c=0. This immediately removes the constant term.',
    'Use (1,1): a+b=1. Use (−1,1): a−b=1, because (−1)²=1 but b(−1)=−b.',
    'Add the two equations. The b terms cancel, leaving 2a=2, so a=1. Substitute into a+b=1 to find b=0.',
    'Check p(x)=x²: p(0)=0, p(−1)=1, and p(1)=1. It passes through all three points.'
  ], 'p(x)=x², with a=1, b=0 and c=0.');
  extend('1.10', '15', ['A cubic has four coefficients: p(x)=ax³+bx²+cx+d. Each of the four given points supplies one equation for these unknown coefficients. In particular, the point (0,1) immediately gives d=1.'], ['Check p(x)=−x³/6+13x/6+1: p(−1)=1/6−13/6+1=−1; p(0)=1; p(1)=−1/6+13/6+1=3; p(4)=−64/6+52/6+1=−1.'], 'p(x)=−x³/6+13x/6+1. The coefficients of x³,x²,x,1 are −1/6,0,13/6,1.');
  extend('1.10', '16', ['The graph supplies the data instead of a written table. A cubic p(x)=ax³+bx²+cx+d has four coefficients, so choose four clearly readable grid points.'], [], 'p(x)=−x³/8+x²/2+2x.');
  extend('1.10', '17', ['There are three unknown coefficients but only two points. We therefore expect one coefficient to remain free; choosing it gives different curves that share those two points.'], [
    'For the four example curves, substitute t=−2,−1,1,2. They are −2x²+3x+1, −x²+2x+1, x²+1, and 2x²−x+1. Each gives 1 at x=0 and 2 at x=1.',
    'The special choice t=0 gives the straight line p(x)=x+1. It passes through the points but has degree 1, so exclude it when the question asks for second-degree polynomials.'
  ], '(a) p(x)=tx²+(1−t)x+1, where t is any nonzero real number.\n(b) Four examples to sketch are p(x)=−2x²+3x+1, p(x)=−x²+2x+1, p(x)=x²+1, and p(x)=2x²−x+1. Their four sketches are shown with the solution.');
  teach('1.10', '18', [
    'Choose one practical problem: estimating the temperature at points inside a thin metal plate whose boundary temperatures are known. The task is to find many unknown temperatures at once.',
    'Use a uniform square grid. Under a steady, source-free heat model, each interior temperature is approximated by the average of its four neighboring temperatures. If the unknown temperature is T and the neighbors are N,S,E,W, write 4T−N−S−E−W=0.',
    'Write one such equation for every interior point. Insert known boundary temperatures as constants. When neighboring temperatures are also unknown, keep their letters in the same system.',
    'Solve the equations together, using elimination or a numerical linear-system solver. The model produces an approximate temperature map. A finer grid gives more equations and can improve the approximation.',
    'Source checked: Technical University of Denmark, “The Poisson Problem,” describes a grid-based heat model and a five-point averaging formula. The paragraph below is an original explanation of its source-free case.'
  ], 'Linear systems can help estimate temperatures inside a thin metal plate. Engineers divide the plate into a square grid and treat each interior temperature as an unknown. When the temperature has settled and there is no internal heat source, a simple model makes each interior value the average of its four neighbors. This produces one linear equation per interior point. Known boundary temperatures provide the constants, while neighboring unknown temperatures connect the equations. Solving the whole system gives an approximate temperature map that can help reveal where the plate will be hottest or coolest.');
  teach('1.10', 'TF', [
    'Part (a): the word “any” makes the statement too broad. A tank can be filling, so 10 liters per minute may enter while only 6 leave; the other 4 are stored. Equal inflow and outflow requires a steady network with no accumulation or uncounted source or sink. Therefore (a) is false.',
    'Part (b): moving through a resistor in the direction of conventional current produces a voltage drop RI, not a voltage rise. A battery can provide a rise. Therefore (b) is false in the usual circuit convention.',
    'Part (c): Kirchhoff’s current law is exactly the junction balance rule: total current entering equals total current leaving. Therefore (c) is true.',
    'Part (d): equal total atom counts are insufficient; the count of each element must agree separately. For example, H₂ → O₂ has two atoms on each side but changes the element, so it is not balanced. Therefore (d) is false.',
    'Part (e): the x-coordinates must be distinct. For example, no function can pass through both (0,0) and (0,1), because it cannot have two different values at x=0. Therefore the statement about any n points is false.'
  ], '(a) False. (b) False. (c) True. (d) False. (e) False.');
  teach('1.10', 'T1', [
    'Read the units before calculating. Let x be speed in hundreds of feet per second and p(x) force in hundreds of pounds. The target 2000 ft/s is therefore x=20, not x=2000.',
    'A polynomial of degree at most 5 has six coefficients: p(x)=c₀+c₁x+c₂x²+c₃x³+c₄x⁴+c₅x⁵. The six data pairs are (1,0), (2,3.12), (4,15.86), (8,33.7), (16,81.5), and (32,123). Each gives an equation by substituting its x and y values.',
    'Here is an explicit way to construct the solution of those six equations. For each speed xᵢ, form Lᵢ(x)=∏ⱼ≠ᵢ(x−xⱼ)/(xᵢ−xⱼ), using the other five speeds in the product. At x=xᵢ every numerator equals its denominator, so Lᵢ=1. At any other data speed one numerator is zero, so Lᵢ=0. These are called Lagrange basis polynomials.',
    'Multiply each basis polynomial by its measured force and add. The zero force at x=1 contributes nothing. The full polynomial is\np(x) = 3.12(x−1)(x−4)(x−8)(x−16)(x−32)/5040\n+ 15.86(x−1)(x−2)(x−8)(x−16)(x−32)/(−8064)\n+ 33.7(x−1)(x−2)(x−4)(x−16)(x−32)/32256\n+ 81.5(x−1)(x−2)(x−4)(x−8)(x−32)/(−322560)\n+ 123(x−1)(x−2)(x−4)(x−8)(x−16)/9999360.',
    'For example, the denominator 5040 is (2−1)(2−4)(2−8)(2−16)(2−32). At x=2 the first term becomes 3.12 and every other term becomes zero. The same reasoning verifies all six observations without rounding large powers.',
    'Evaluate the five nonzero terms at x=20. They are approximately −108.397714286, 387.437142857, −274.414285714, 199.092857143, and 3.230875576, in hundreds of pounds.',
    'Add those terms to obtain p(20)≈206.948875576 hundreds of pounds. Multiply by 100 to return to pounds: 206.948875576×100≈20694.8875576 lb.',
    'Round only the final force to the requested practical precision. This is the estimate from the specified fifth-degree interpolation model; its high value comes from the curve fitted through all six measurements.'
  ], 'The interpolating polynomial is\np(x)≈2.194769073221−5.867226190476x+4.241351686508x²−0.600660342262x³+0.032309089782x⁴−0.000543316772273x⁵,\nwith x in hundreds of ft/s and p(x) in hundreds of lb. The factored form in the steps uses the data without rounded coefficients. At 2000 ft/s the estimated lifting force is 20,694.89 lb.');
  data['1.10']['T2'].reference = 'Example 7 uses polynomial interpolation for numerical integration: sample the integrand at equally spaced points, fit a polynomial through those samples, and integrate that polynomial instead of the original function.';
  teach('1.10', 'T2', [
    'An integral here measures the area under the curve. The method replaces the difficult curve f(x)=e^(x²) with a polynomial that we can integrate term by term. Five equal subintervals of [0,1] have width 1/5=0.2 and six endpoints: 0,0.2,0.4,0.6,0.8,1.',
    'Calculate f at those endpoints, keeping extra digits: f(0)=1; f(0.2)≈1.040810774192; f(0.4)≈1.173510870992; f(0.6)≈1.433329414560; f(0.8)≈1.896480879305; f(1)≈2.718281828459.',
    'Write p(x)=c₀+c₁x+c₂x²+c₃x³+c₄x⁴+c₅x⁵. Set p equal to each sampled value. For example, the first equation is c₀=1 and the second is c₀+0.2c₁+0.04c₂+0.008c₃+0.0016c₄+0.00032c₅≈1.040810774192. The four remaining equations use x=0.4,0.6,0.8,1 in exactly the same way.',
    'An explicit interpolation construction solves all six equations at once: for xᵢ=i/5, define Lᵢ(x)=∏ⱼ≠ᵢ(x−xⱼ)/(xᵢ−xⱼ), then p(x)=Σᵢ₌₀⁵ f(xᵢ)Lᵢ(x). Each Lᵢ equals 1 at its own sample and 0 at the other five samples, so p takes precisely the six sampled values.',
    'Expanding the products gives approximately\np(x)=1+0.019930822157x+0.780826925227x²+0.842820652342x³−0.917919971827x⁴+0.992623400561x⁵.\nUse full calculator precision internally; the displayed coefficients are rounded.',
    'Use the power rule for area on [0,1]: the integral of xᵏ is 1/(k+1). Therefore the approximate area is 1+0.019930822157/2+0.780826925227/3+0.842820652342/4−0.917919971827/5+0.992623400561/6≈1.462799455390.',
    'For an independent numerical comparison, use composite Simpson integration directly on f. With h=0.001, calculate (h/3)[f(0)+f(1)+4Σ f(ih) over odd i from 1 to 999+2Σ f(ih) over even i from 2 to 998]. This gives approximately 1.462651745908.',
    'Subtract the two results: 1.462799455390−1.462651745908≈0.000147709482. The interpolation result is about 0.0101% higher. This comparison measures the approximation; it does not claim that the original function is exactly the polynomial.'
  ], 'The degree-5 interpolation estimate is ∫₀¹e^(x²)dx≈1.462799455390. Direct numerical integration gives approximately 1.462651745908. The interpolation estimate is higher by about 0.000147709482 (0.0101%).');
  data['1.10']['T3'].reference = 'Example 5 introduces one unknown coefficient per chemical substance, equates the count of each element on the two sides, and solves the resulting homogeneous linear system for the smallest positive integer coefficients.';
  teach('1.10', 'T3', [
    'Assign an unknown number of molecules to each substance: aFe₂O₃+bAl → cAl₂O₃+dFe. We may change a,b,c,d, but we must not change the subscripts inside the formulas.',
    'Balance iron: each Fe₂O₃ contains 2 iron atoms, so 2a=d. Balance oxygen: each oxide contains 3 oxygen atoms, so 3a=3c. Balance aluminum: b=2c.',
    'Rewrite these as the linear equations 2a−d=0, 3a−3c=0, and b−2c=0. Their right-hand sides are zero because no element has a net gain or loss.',
    'From 3a=3c, obtain c=a. Then b=2c=2a and d=2a. Thus every positive solution is a multiple of (1,2,1,2).',
    'Choose a=1 to get the smallest positive whole-number coefficients: a=1,b=2,c=1,d=2. Check the atoms: iron 2=2, oxygen 3=3, aluminum 2=2.'
  ], 'Fe₂O₃ + 2Al → Al₂O₃ + 2Fe.');
  extend('1.10', 'T4', [], [
    'The negative I₁ means the lower branch actually carries 49/31 A from left to right, opposite the given arrows. I₂=50/31 A travels right to left along the top; I₃=1/31 A travels left to right in the middle.',
    'Check the common voltage: 20−3(50/31)=470/31 V; 470(1/31)=470/31 V; and 12−2(−49/31)=470/31 V. All three branches give the same difference.'
  ], 'I₁=−49/31 A (about 1.5806 A opposite its arrows); I₂=50/31 A (about 1.6129 A along its arrows); I₃=1/31 A (about 0.03226 A along its arrows).');

  const economyIntro = 'Let x list total production, including what the sectors themselves use. Let d list orders from outside the economy. The entry cᵢⱼ of C means the input supplied by sector i to produce one unit of sector j output. Thus Cx is internal use, and total production must satisfy x=Cx+d.';
  extend('1.11', '1', [economyIntro, 'Use the same order for rows and columns: mechanic M first, body shop B second. A column is a recipe for producing $1 of that column’s service. The mechanic column is (0.50,0.25), and the body-shop column is (0.25,0.10).'], [
    'Interpret the coordinates in the original order. The mechanic produces 784000/31≈$25,290.32 and the body shop 700000/31≈$22,580.65. These totals exceed the outside orders because some work is used by the businesses themselves.',
    'Check with exact fractions: 0.50x₁−0.25x₂=217000/31=7000, and −0.25x₁+0.90x₂=434000/31=14000. After internal use, the required outside amounts remain.'
  ], '(a) In the order (M,B), C=[0.50  0.25; 0.25  0.10].\n(b) M must produce 784000/31≈$25,290.32 of service and B must produce 700000/31≈$22,580.65. Currency figures are rounded to cents.');
  extend('1.11', '2', [economyIntro, 'Choose the order food F, then housing H. Producing $1 of food needs the column (0.30,0.10); producing $1 of housing needs (0.20,0.60). Do not swap provider rows with output columns.'], [
    'Check food: internal use is 0.30(300000)+0.20(400000)=170000, leaving 300000−170000=130000 for consumers. Check housing: internal use is 0.10(300000)+0.60(400000)=270000, leaving 400000−270000=130000.'
  ], '(a) In the order (F,H), C=[0.30  0.20; 0.10  0.60].\n(b) Produce $300,000 of food and $400,000 of housing. After internal use, each sector supplies $130,000 to consumers.');
  extend('1.11', '3', [economyIntro, 'Keep the table’s sector order: housing, food, utilities. Each provider row becomes the corresponding row of C, and the outside demand is d=(1930,3860,5790).'], [
    'Verify the plan by subtracting internal use. Housing: 31500−(3150+15900+10520)=1930. Food: 26500−(9450+5300+7890)=3860. Utilities: 26300−(12600+2650+5260)=5790. These are exactly the three outside orders.'
  ], '(a) C=[0.10  0.60  0.40; 0.30  0.20  0.30; 0.40  0.10  0.20], in the order housing, food, utilities.\n(b) x=($31,500,$26,500,$26,300) in that same order.');
  extend('1.11', '4', [economyIntro, 'Use the order Web design, software, networking throughout. The given outside demand is d=(5400,2700,900). For example, 0.45 in row 1, column 3 means $0.45 of Web design is required per $1 of networking output.'], [
    'Read the solution in the sector order: Web design approximately $19,578.29, software approximately $16,346.56, and networking approximately $6,839.25. Keep more digits during the calculations; rounding the final money amounts introduces only rounding differences in the demand checks.'
  ], '(a) C=[0.40  0.20  0.45; 0.30  0.35  0.30; 0.15  0.10  0.20], in the order Web design, software, networking.\n(b) The exact production vector in dollars is (9378000/479,7830000/479,3276000/479). This is approximately ($19,578.29,$16,346.56,$6,839.25), rounded to cents.');
  extend('1.11', '5', [economyIntro, 'The question requests matrix inversion. After rearranging to (I−C)x=d, find the inverse of I−C and multiply it by d. We invert I−C, because it measures what remains after internal consumption.'], [
    'Check using exact values: (9/10)(1600/13)−(3/10)(7900/39)=50, and −(1/2)(1600/13)+(3/5)(7900/39)=60. Thus the net available production meets both demand entries.'
  ], 'x=(I−C)⁻¹d=(1600/13,7900/39)≈(123.076923,202.564103), in the units used for d.');
  extend('1.11', '6', [economyIntro, 'Rearrange x=Cx+d to (I−C)x=d. The production vector is x=(I−C)⁻¹d, so first calculate the inverse of the net-production matrix.'], [
    'Check: (7/10)(400/9)−(1/10)(820/9)=22, and −(3/10)(400/9)+(3/10)(820/9)=14. These are the two requested outside demands.'
  ], 'x=(I−C)⁻¹d=(400/9,820/9)≈(44.444444,91.111111), in the units used for d.');
  teach('1.11', '7', [
    'The diagonal entries tell a simple story. Sector 1 uses half its own output; sector 2 uses all of its own output. The zero off-diagonal entries mean neither sector requires the other’s product.',
    'Form I−C=[1/2  0; 0  0]. The production equations (I−C)x=d are therefore x₁/2=d₁ and 0=d₂.',
    'Part (a), first demand: put d₁=2,d₂=0. The first equation gives x₁=4. The second says 0=0, so it is satisfied by any x₂≥0. For example, x=(4,0) is a valid plan.',
    'Part (a), second demand: put d₁=2,d₂=1. Now the second equation says 0=1, which is impossible. No choice of production can satisfy this demand.',
    'Part (b), mathematical explanation: the second row of I−C is zero, so its left side always remains zero. It can match a zero right-hand side but cannot match 1.',
    'Part (b), economic explanation: sector 2 consumes every unit it produces. Even doubling its output doubles its own consumption, leaving no surplus for an outside customer. Sector 1 only needs to double its outside order because it keeps half internally.'
  ], '(a) Demand (2,0) is met by every x=(4,t), t≥0. Demand (2,1) has no solution.\n(b) Mathematically the second equation is 0=d₂; economically sector 2 consumes all of its output and cannot supply positive outside demand.');
  extend('1.11', '8', [economyIntro], [
    'For one unit of demand from each sector, the solution is x=(18,16,16). For a common demand q, multiply the entire vector by q to get x=(18q,16q,16q). This scaling works because all equations are linear.',
    'If q>0, then 18q>16q, so sector 1 has the greatest output. If the common demand is zero, all three outputs are zero and they tie.'
  ], 'For equal positive outside demand q, production is x=(18q,16q,16q), so sector 1 must produce the most. If q=0, all outputs are zero.');
  teach('1.11', '9', [
    'A unique production plan for every demand means the matrix multiplying x must be invertible. Rearrange x−Cx=d into (I−C)x=d.',
    'Subtract C entry by entry from the 2×2 identity matrix. This gives I−C=[1−c₁₁  −c₁₂; −c₂₁  1].',
    'For a 2×2 matrix [a b; c d], the determinant is ad−bc. Here it is Δ=(1−c₁₁)×1−(−c₁₂)(−c₂₁)=1−c₁₁−c₁₂c₂₁.',
    'The assumption c₂₁c₁₂<1−c₁₁ says exactly that Δ>0. In particular Δ is not zero, so the 2×2 inverse formula is allowed.',
    'The inverse is (I−C)⁻¹=(1/Δ)[1  c₁₂; c₂₁  1−c₁₁]. For any d, multiplying by this fixed inverse produces x. There cannot be two different solutions because applying the same inverse to (I−C)x=d always gives the same vector.'
  ], 'The determinant is Δ=1−c₁₁−c₁₂c₂₁>0. Hence I−C is invertible, and every demand vector has exactly one solution x=(1/Δ)[1  c₁₂; c₂₁  1−c₁₁]d.');
  teach('1.11', '10', [
    'Part (a): call the inverse matrix L=(I−C)⁻¹ to shorten the notation. Its existence is guaranteed by the stated consumption assumptions. The original production is x=Ld.',
    'Let eⱼ be a column vector containing 1 in position j and 0 everywhere else. Adding eⱼ increases only the jth demand by one, so the new demand is dⱼ=d+eⱼ.',
    'Apply the same production formula to the new demand: xⱼ=L(d+eⱼ). Matrix multiplication distributes over addition, so xⱼ=Ld+Leⱼ=x+Leⱼ.',
    'Why is Leⱼ column j of L? Multiplication by a column vector forms a weighted sum of L’s columns. The weights in eⱼ are all zero except the jth weight, which is 1. Therefore only column j remains.',
    'Part (b): subtract the original production: xⱼ−x=Leⱼ. Entry i of this column is the extra production required from sector i when outside demand for sector j increases by one unit. It includes production needed directly for the order and indirectly to supply the other sectors.'
  ], '(a) xⱼ=x+column j of (I−C)⁻¹.\n(b) That column lists the additional output needed from every sector to meet a one-unit increase in outside demand for sector j, including internal supply requirements.');
  teach('1.11', '11', [
    'First inspect the exact statement. As printed, it says I−C has nonnegative entries. That part is false: subtracting a positive off-diagonal entry of C from zero makes a negative entry. We cannot prove a false statement.',
    'For a counterexample take C=[0  1/2; 0  0]. Its entries are nonnegative and its row sums are 1/2 and 0, both less than 1. But I−C=[1  −1/2; 0  1] has a negative entry. Its inverse is [1  1/2; 0  1], which is nonnegative.',
    'The intended true claim is that I−C is invertible and its inverse (I−C)⁻¹ has nonnegative entries. To prove it, let r be the largest row sum of C. Then 0≤r<1.',
    'All entries of every power Cᵏ remain nonnegative, because they are sums of products of nonnegative numbers. The row sums of C² are at most r²: row i sums to Σⱼcᵢⱼ(row sum j of C)≤rΣⱼcᵢⱼ≤r². Repeating the same calculation gives a bound rᵏ for Cᵏ.',
    'Consider S=I+C+C²+C³+⋯. Each entry is a sum of nonnegative numbers bounded by the numerical series 1+r+r²+⋯=1/(1−r). This bound means each entry approaches a finite value; thus S exists and every entry is nonnegative.',
    'For the finite sum Sₙ=I+C+⋯+Cⁿ, multiply by I−C. Terms cancel: (I−C)Sₙ=I−Cⁿ⁺¹. The same identity holds in the other order. Since every entry of Cⁿ⁺¹ is at most rⁿ⁺¹ and r<1, this remaining term tends to zero.',
    'Taking the limit gives (I−C)S=S(I−C)=I. That is the definition of an inverse, so S=(I−C)⁻¹ and the inverse has nonnegative entries. This proves the corrected theorem while preserving the original question above.'
  ], 'As printed, the claim that I−C has nonnegative entries is false; C=[0  1/2; 0  0] is a counterexample. The correct theorem is: I−C is invertible and (I−C)⁻¹=I+C+C²+⋯ has nonnegative entries.');
  teach('1.11', 'TF', [
    'Part (a): false. The open sector consumes the goods or services produced by the modeled production sectors. It is not the name for those output-producing sectors.',
    'Part (b): true. By definition, a closed economy has no open sector; an open economy includes at least one.',
    'Part (c): false in the consumption-table convention. A column gives the input recipe for one unit of a sector’s output. A row follows a provider and shows how much of its product the different output sectors need per unit.',
    'Part (d): true. For a nonnegative consumption matrix, column sums below 1 guarantee that powers of the matrix shrink sufficiently for I+C+C²+⋯ to converge. That sum is the inverse of the Leontief matrix I−C.',
    'Part (e): true. The Leontief equation x=Cx+d, or equivalently (I−C)x=d, says that total production x covers internal consumption Cx and the outside demand d.'
  ], '(a) False. (b) True. (c) False. (d) True. (e) True.');
  extend('1.11', 'T1', [economyIntro, 'Align the demand with the table rather than the order in the sentence. The table order is electricity, coal, manufacturing, so d=(75000,50000,1250000). Putting coal first by mistake would solve a different problem.'], [
    'The resulting weekly production is positive in every sector. Using unrounded values, (I−C)x equals (75000,50000,1250000). The displayed dollar figures are rounded to cents.',
    'As an additional feasibility check, the column sums of C are 0.5, 0.8 and 0.8, each below 1. The model is productive and can meet this nonnegative outside demand.'
  ], 'Yes. In the order electricity, coal, manufacturing, the exact weekly production vector in dollars is (141550000/127,280400000/127,238850000/127). This is approximately ($1,114,566.93,$2,207,874.02,$1,880,708.66). These outputs cover both internal consumption and the stated outside demand.');

  for (const n of ['23', '27']) {
    const split = data.review[n].text.indexOf('\nReferenced');
    if (split >= 0) {
      data.review[n].reference = data.review[n].text.slice(split + 1);
      data.review[n].text = data.review[n].text.slice(0, split);
    }
  }
  const augmentedIntro = 'Each row is one equation. The columns before the vertical bar contain coefficients of the unknowns; the last column is the number on the other side of the equals sign. A zero coefficient means that unknown is absent. Gaussian elimination replaces equations by equivalent ones, then solves from the last nonzero row upward.';
  extend('review', '1', [augmentedIntro], [
    'There are four unknowns but only two pivot columns. Write x₃=s and x₄=t to name the two choices we may make freely. The other two coordinates then depend on s and t.',
    'Check the first equation symbolically: 3(−1/2−3s/2−3t/2)−(−5/2−9s/2−t/2)+4t=1. Check the second: 2(−1/2−3s/2−3t/2)+3s+3t=−1. Both hold for every real s,t.'
  ], 'The equations are 3x₁−x₂+4x₄=1 and 2x₁+3x₃+3x₄=−1.\nAll solutions are x₁=−1/2−3s/2−3t/2, x₂=−5/2−9s/2−t/2, x₃=s, x₄=t, for arbitrary real s,t.');
  extend('review', '2', [augmentedIntro], [
    'Only the first equation adds information: the next two are its multiples and the last equation says 0=0. Let x₂=s. Then x₁+4s=−1 gives x₁=−1−4s.'
  ], 'The equations are x₁+4x₂=−1; −2x₁−8x₂=2; 3x₁+12x₂=−3; and 0=0.\nAll solutions are (x₁,x₂)=(−1−4s,s), for any real s.');
  extend('review', '3', [augmentedIntro], [], 'The equations are 2x₁−4x₂+x₃=6, −4x₁+3x₃=−1, and x₂−x₃=3.\nThe unique solution is (x₁,x₂,x₃)=(−17/2,−26/3,−35/3).');
  extend('review', '4', [augmentedIntro], [
    'The inconsistency is visible without finishing every elimination step: twice the first equation would require 6x₁+2x₂=−4, while the third equation requires the same left side to equal 1. Subtracting gives the impossible equation 0=5.'
  ], 'The equations are 3x₁+x₂=−2, −9x₁−3x₂=6, and 6x₁+2x₂=1. They have no solution: row 3 minus twice row 1 gives 0=5.');
  teach('review', '5', [
    'Treat x and y as known quantities and x′,y′ as the unknowns. Multiply both equations by 5 to remove the fractions: 3x′−4y′=5x and 4x′+3y′=5y.',
    'Write the augmented matrix in the unknown order x′,y′:\n[3  −4 | 5x]\n[4   3 | 5y].\nDivide row 1 by 3, obtaining [1  −4/3 | 5x/3]. This creates the first pivot, a leading 1.',
    'Clear the 4 below the first pivot: replace row 2 by row 2−4(row 1). Its entries become [0  25/3 | 5y−20x/3]. The x′ term is now eliminated from that row.',
    'Multiply row 2 by 3/25 to turn its leading coefficient into 1. It now says y′=(3y−4x)/5.',
    'Clear y′ from row 1 by adding 4/3 times row 2. The new right side is 5x/3+4(3y−4x)/15=(25x+12y−16x)/15=(3x+4y)/5. Thus row 1 now says x′=(3x+4y)/5.',
    'Check by substituting back: (3/5)x′−(4/5)y′=[9x+12y+16x−12y]/25=x. The other equation gives [12x+16y−12x+9y]/25=y.'
  ], 'x′=(3x+4y)/5 and y′=(−4x+3y)/5.');
  teach('review', '6', [
    'Shorten the notation: c=cos θ and s=sin θ. The trigonometric identity c²+s²=1 will simplify the elimination. With unknowns x′,y′, the augmented matrix is\n[c  −s | x]\n[s   c | y].',
    'First suppose c≠0, so division by c is allowed. Divide row 1 by c. It becomes [1  −s/c | x/c].',
    'Replace row 2 by row 2−s(row 1). The second coefficient becomes c+s²/c=(c²+s²)/c=1/c; the right side is y−sx/c.',
    'Multiply row 2 by c. It now says y′=cy−sx. Then add s/c times row 2 to row 1. Its right side becomes x/c+(s/c)(cy−sx)=[(1−s²)/c]x+sy=cx+sy. Thus x′=cx+sy.',
    'Handle the case we could not divide by: if c=0, then s²=1, so s is 1 or −1. The original equations are −sy′=x and sx′=y, giving y′=−sx and x′=sy. These are exactly the same formulas with c=0.',
    'Substitute the formulas into the original equations: c(cx+sy)−s(−sx+cy)=(c²+s²)x=x, and s(cx+sy)+c(−sx+cy)=(s²+c²)y=y. Thus the answer works for every angle.'
  ], 'x′=x cos θ+y sin θ and y′=−x sin θ+y cos θ, for every real angle θ.');
  teach('review', '7', [
    'Positive integers are whole numbers greater than zero. Ordinary elimination may give a family of real solutions, so we must also use the whole-number restriction.',
    'Subtract x+y+z=9 from x+5y+10z=44. The x terms cancel, giving 4y+9z=35.',
    'Because y≥1, the term 4y is at least 4. Thus 9z≤31, which limits the positive integer z to 1,2,3.',
    'Test those three possibilities in 4y=35−9z. For z=1, y=26/4 is not an integer. For z=2, y=17/4 is not an integer. For z=3, y=8/4=2.',
    'Use the first original equation to recover x: x=9−2−3=4. Check both equations: 4+2+3=9 and 4+5(2)+10(3)=44. We checked every possible z, so this is the only positive-integer solution.'
  ], 'The unique positive-integer solution is x=4, y=2, z=3.');
  teach('review', '8', [
    'Let p,n,d be the numbers of pennies, nickels and dimes. Each must be a nonnegative integer. The coin count gives p+n+d=13; the value in cents gives p+5n+10d=83.',
    'Subtract the count equation from the value equation to remove p. This leaves 4n+9d=70.',
    'Because n≥0, we have 9d≤70, so d can be one of 0,1,2,3,4,5,6,7. Also 4n=70−9d must be divisible by 4. Since 70 leaves remainder 2 and 9 leaves remainder 1 on division by 4, d must leave remainder 2. Only d=2 or d=6 can work.',
    'Try d=2: n=(70−18)/4=13 and p=13−13−2=−2. A negative number of coins is impossible, so reject this case.',
    'Try d=6: n=(70−54)/4=4, then p=13−4−6=3. Check the count: 3+4+6=13. Check the value: 3+5(4)+10(6)=83 cents.',
    'The final sentence “Is the economy productive?” appears in the printed exercise but supplies no economy or consumption matrix. It is unrelated to the coin data and cannot be answered from this question.'
  ], '3 pennies, 4 nickels and 6 dimes. The printed sentence about a productive economy has no supporting economic data, so that separate sentence cannot be answered from the exercise.');
  teach('review', '9', [
    'Read the augmented rows as ax+bz=2, ax+ay+4z=4, and ay+2z=b. We must distinguish cases because dividing by a or 2−b is allowed only when that number is nonzero.',
    'Subtract the first and third equations from the second. The x and y terms cancel, leaving (2−b)z=2−b.',
    'If a≠0 and b≠2, divide the last equation by 2−b to get z=1. Then x=(2−b)/a and y=(b−2)/a. All three variables are fixed, so there is a unique solution.',
    'If a≠0 and b=2, the last equation is 0=0. Choose z=t freely. The first equation gives x=(2−2t)/a, and the third gives y=(2−2t)/a. One parameter remains.',
    'If a=0, the middle original equation is 4z=4, forcing z=1. The other rows become bz=2 and 2z=b, so both require b=2.',
    'When a=0,b=2, the equations place no restriction on x or y; choose x=s,y=t,z=1. When a=0,b≠2, the required z=1 contradicts the other rows, so there is no solution. These cases cover all possibilities.'
  ], '(a) Unique solution: a≠0 and b≠2; (x,y,z)=((2−b)/a,(b−2)/a,1).\n(b) One parameter: a≠0 and b=2; (x,y,z)=((2−2t)/a,(2−2t)/a,t).\n(c) Two parameters: a=0 and b=2; (x,y,z)=(s,t,1).\n(d) No solution: a=0 and b≠2. Parameters s,t are arbitrary real numbers.');
  teach('review', '10', [
    'Start with the equation that already fixes a variable: x₃=2. Any solution of the whole system must use that value.',
    'Insert x₃=2 into the third equation. It becomes 2(a²−4)=a−2. Move all terms to the left: 2a²−a−6=0.',
    'Factor: 2a²−a−6=(a−2)(2a+3). A product of two real numbers is zero only if at least one factor is zero, giving a=2 or a=−3/2.',
    'For every other value of a, the third equation disagrees with x₃=2, so no solution exists.',
    'For either allowed value, the third equation adds no new restriction. The first becomes x₁+x₂=2. Choose x₂=t, then x₁=2−t. Thus there are infinitely many solutions, and a unique solution never occurs.'
  ], 'Zero solutions when a is neither 2 nor −3/2. Infinitely many solutions when a=2 or a=−3/2: (x₁,x₂,x₃)=(2−t,t,2), t∈ℝ. There is no value of a giving exactly one solution.');
  teach('review', '11', [
    'Check the sizes. A is 3×2, B is 2×3, and C is 3×3, so K must be 2×2. Write Y=AK, a 3×2 matrix, to simplify the product YB=C.',
    'The columns of B are (2,0), (0,1), and (0,−1). Therefore the columns of YB are 2Y₁, Y₂, and −Y₂, where Y₁,Y₂ are the columns of Y.',
    'Match the columns of C: Y₁=(8,6,−4)/2=(4,3,−2), and Y₂=(6,−1,0). The last column of C, (−6,1,0), is indeed −Y₂.',
    'Find the first column (u,v) of K by solving A(u,v)=(4,3,−2). Rows 1 and 3 give u+4v=4 and u−2v=−2. Subtract the second from the first: 6v=6, so v=1 and u=0. Row 2 checks −2(0)+3(1)=3.',
    'For the second column, solve A(u,v)=(6,−1,0). Rows 1 and 3 give u+4v=6 and u−2v=0. Subtract: 6v=6, so v=1 and u=2. Row 2 checks −2(2)+3(1)=−1.',
    'Put the two columns together: K=[0  2; 1  1]. Then AK=[4  6; 3  −1; −2  0]. Multiplication by B gives [8  6  −6; 6  −1  1; −4  0  0], exactly C.'
  ], 'K=\n[0  2]\n[1  1].');
  teach('review', '12', [
    'Here the requested solution x=1,y=−1,z=2 is known; the unknowns are the coefficients a,b,c. Substitute that triple into each equation.',
    'First equation: a(1)+b(−1)−3(2)=−3 gives a−b=3. Second equation: −2(1)−b(−1)+c(2)=−1 gives b+2c=1. Third equation: a(1)+3(−1)−c(2)=−3 gives a−2c=0.',
    'From the third equation, a=2c. Add the first two equations to eliminate b: a+2c=4.',
    'Replace a by 2c in a+2c=4: 4c=4, so c=1. Then a=2c=2, and a−b=3 gives b=−1.',
    'Check the original equations using both the coefficients and the target solution: 2+1−6=−3; −2−1+2=−1; and 2−3−2=−3. All three right-hand sides match.'
  ], 'Choose a=2, b=−1, and c=1.');
  extend('review', '13', [
    'A matrix equation means every corresponding entry must match. Keep multiplication order: matrices generally cannot be swapped. In part (a) the factor next to X is square and invertible; in part (b) it is rectangular, so solve entry equations instead; part (c) contains X on both sides.'
  ], [
    'Check part (a) by multiplying the two rows of X by B: (−1,3,−1)B=(1,2,0) and (6,0,1)B=(−3,1,5). Check part (b): (1,−2)B=(−5,−1,0) and (3,1)B=(6,−3,7).',
    'Check part (c) without rounding fractions: AX=(1/37)[−359  −526; 73  68], and XB=(1/37)[−433  −452; −112  −80]. Subtracting gives (1/37)[74  −74; 185  148]=[2  −2; 5  4], the required C.'
  ], '(a) X=\n[−1  3  −1]\n[ 6  0   1]\n(b) X=\n[1  −2]\n[3   1]\n(c) X=(1/37)\n[−113  −160]\n[ −20   −46].');
  teach('review', '14', [
    'To prove that a matrix S is the inverse of I−A, multiply and show that both (I−A)S and S(I−A) equal I. We will use the suggested finite sum for S.',
    'Part (a): set S=I+A+A²+A³. Expand (I−A)S=(I+A+A²+A³)−(A+A²+A³+A⁴). The terms A,A²,A³ cancel, leaving I−A⁴.',
    'The assumption A⁴=0 turns this into I. Expanding S(I−A) gives the same cancellation, because all factors are powers of the same matrix A. Thus S is the inverse.',
    'Part (b): repeat with S=I+A+⋯+Aⁿ. The product is (I+A+⋯+Aⁿ)−(A+A²+⋯+Aⁿ⁺¹)=I−Aⁿ⁺¹.',
    'Now Aⁿ⁺¹=0 makes both product orders equal I. This cancellation proof also shows why the series stops after Aⁿ rather than continuing indefinitely.'
  ], '(a) If A⁴=0, then (I−A)⁻¹=I+A+A²+A³.\n(b) If Aⁿ⁺¹=0, then (I−A)⁻¹=I+A+⋯+Aⁿ.');
  extend('review', '15', ['The point (x,y) lies on the graph exactly when substituting x into p gives y. Here x and y come from the question; a,b,c are the unknowns. Use all three points to get three linear equations.'], ['Check p(1)=1−2+3=2, p(−1)=1+2+3=6, and p(2)=4−4+3=3.'], 'a=1, b=−2, c=3; therefore p(x)=x²−2x+3.');
  extend('review', '16', [
    'A tangent is the straight-line direction of the curve at one point. “Horizontal tangent at (2,−9)” supplies two facts: the curve passes through (2,−9), and its slope at x=2 is zero. Along with (−1,0), this gives three equations for a,b,c.'
  ], ['Verify all three requirements: p(−1)=1+4−5=0; p(2)=4−8−5=−9; and p′(x)=2x−4 gives p′(2)=0.'], 'a=1, b=−4, c=−5. Thus p(x)=x²−4x−5, with a horizontal tangent at (2,−9).');
  teach('review', '17', [
    'Write J for Jₙ and S=I−J/(n−1). The condition n>1 ensures that n−1 is not zero, so the proposed formula is defined.',
    'First calculate J². Each entry is the dot product of a row of n ones with a column of n ones: 1+⋯+1=n. Thus every entry of J² is n, which means J²=nJ.',
    'Expand the proposed inverse product: (I−J)(I−J/(n−1))=I−J/(n−1)−J+J²/(n−1).',
    'Replace J² by nJ and combine coefficients of J. The coefficient is −1/(n−1)−1+n/(n−1)=[−1−(n−1)+n]/(n−1)=0. The product is therefore I.',
    'Reverse the factors and expand again. The same four terms appear because I commutes with J and the only other product is J². Both orders give I, so S is the inverse.'
  ], 'For n>1, (I−Jₙ)⁻¹=I−Jₙ/(n−1).');
  teach('review', '18', [
    'The transpose turns rows into columns. Apply it to both sides of A³+4A²−2A+7I=0. Equal matrices still have equal transposes.',
    'Transpose distributes over addition and preserves scalar coefficients, giving (A³)ᵀ+4(A²)ᵀ−2Aᵀ+7Iᵀ=0ᵀ.',
    'For products, transposing reverses the factor order: (AB)ᵀ=BᵀAᵀ. All factors in A³ are the same A, so reversing them still gives (Aᵀ)³. Likewise (A²)ᵀ=(Aᵀ)².',
    'The identity and zero matrices do not change under transposing. Substitute these facts to obtain (Aᵀ)³+4(Aᵀ)²−2Aᵀ+7I=0. This is exactly the original equation with A replaced by Aᵀ.'
  ], '(Aᵀ)³+4(Aᵀ)²−2Aᵀ+7I=0, so Aᵀ satisfies the same polynomial equation.');
  teach('review', '19', [
    '“If and only if” asks for two implications. The only inverse used is B⁻¹, which exists by assumption. We will multiply on specified sides, preserving factor order.',
    'First assume AB⁻¹=B⁻¹A. Multiply both sides on the left by B: BAB⁻¹=A. Then multiply both sides on the right by B: BA=AB, since B⁻¹B=I.',
    'For the converse assume AB=BA. Multiply on the left by B⁻¹: B⁻¹AB=A. Multiply on the right by B⁻¹: B⁻¹A=AB⁻¹.',
    'The last equality is the same as AB⁻¹=B⁻¹A with its two sides exchanged. We have proved both implications, so commuting with B and commuting with its inverse are equivalent.'
  ], 'AB⁻¹=B⁻¹A if and only if AB=BA, whenever B is invertible.');
  teach('review', '20', [
    'Let P=I+BA⁻¹. Multiply it on the right by A: PA=(I+BA⁻¹)A=A+B. This order matters: BA⁻¹A simplifies to B.',
    'If P is invertible, then A+B=PA is a product of invertible matrices, so it is invertible. Its inverse is A⁻¹P⁻¹, as direct multiplication verifies.',
    'For the reverse implication, suppose A+B is invertible. From PA=A+B, multiply on the right by A⁻¹ to obtain P=(A+B)A⁻¹.',
    'Both factors on this right side are invertible, so P is invertible, with inverse A(A+B)⁻¹. Thus invertibility of either matrix forces invertibility of the other. If one fails to be invertible, the other must fail too.'
  ], 'A+B is invertible exactly when I+BA⁻¹ is invertible. Therefore they are either both invertible or both singular.');
  teach('review', '21', [
    'An arithmetic average means “sum the values and divide by how many values there are.” Row i of A contains n values, so its average is rᵢ=(aᵢ₁+⋯+aᵢₙ)/n.',
    'Check the product size: A is m×n and B is n×1, so AB is m×1. It has one entry for each row of A.',
    'Calculate entry i by the row-column rule: (AB)ᵢ₁=aᵢ₁(1/n)+aᵢ₂(1/n)+⋯+aᵢₙ(1/n).',
    'Factor out 1/n. The result is (aᵢ₁+⋯+aᵢₙ)/n=rᵢ. This works for every row i, so the entire product is the column of row averages.'
  ], 'AB=(r₁,…,rₘ)ᵀ, where rᵢ=(aᵢ₁+⋯+aᵢₙ)/n is the average of row i.');
  teach('review', '22', [
    'A matrix derivative means differentiating each entry separately. A prime denotes differentiation with respect to x. To prove equality of two matrices, show their entries agree at every position (i,j). In part (a), k is a constant.',
    'Part (a): entry (i,j) of kA is kaᵢⱼ. The ordinary constant-multiple rule gives (kaᵢⱼ)′=ka′ᵢⱼ. These are precisely the entries of kA′, so (kA)′=kA′.',
    'Part (b): entry (i,j) of A+B is aᵢⱼ+bᵢⱼ. The ordinary sum rule gives (aᵢⱼ+bᵢⱼ)′=a′ᵢⱼ+b′ᵢⱼ. Thus (A+B)′=A′+B′.',
    'Part (c): if A has r columns and B has r rows, the product entry is (AB)ᵢⱼ=Σₖ₌₁ʳaᵢₖbₖⱼ. This is a finite sum of ordinary scalar products.',
    'Differentiate each product using the scalar product rule: (aᵢₖbₖⱼ)′=a′ᵢₖbₖⱼ+aᵢₖb′ₖⱼ. Summing gives Σa′ᵢₖbₖⱼ+Σaᵢₖb′ₖⱼ.',
    'The first sum is entry (i,j) of A′B; the second is entry (i,j) of AB′. Therefore (AB)′=A′B+AB′. The order of the matrix factors stays fixed throughout.'
  ], '(a) d(kA)/dx=k(dA/dx), for constant k.\n(b) d(A+B)/dx=dA/dx+dB/dx.\n(c) d(AB)/dx=(dA/dx)B+A(dB/dx).');
  teach('review', '23', [
    'State the assumptions: A=A(x) is square, its entries are differentiable on an open interval, and A(x) is invertible throughout that interval. Its inverse has differentiable entries there: the inverse formula expresses each entry as a polynomial in the entries of A divided by the nonzero determinant.',
    'Start from a true identity, A(x)A(x)⁻¹=I. We use the product rule from Exercise 22(c), because both factors can change with x.',
    'Differentiate: A′A⁻¹+A(A⁻¹)′=0. The right side is zero because I is a constant matrix.',
    'Subtract A′A⁻¹ from both sides: A(A⁻¹)′=−A′A⁻¹. To remove the A on the left of the unknown derivative, multiply both sides on the left by A⁻¹.',
    'The left becomes A⁻¹A(A⁻¹)′=(A⁻¹)′. The right becomes −A⁻¹A′A⁻¹. Do not reorder these factors: matrix multiplication need not commute.',
    'As a familiar one-variable check, if A is the 1×1 matrix [a(x)], the formula becomes (1/a)′=−a′/a², the ordinary reciprocal derivative.'
  ], 'd(A⁻¹)/dx=−A⁻¹(dA/dx)A⁻¹, assuming A is square, differentiable and invertible throughout the interval considered.');
  teach('review', '24', [
    'For each part, every displayed inverse is assumed to exist and matrix sizes must allow the products. Two useful rules are (PQ)⁻¹=Q⁻¹P⁻¹ and “multiply an equality on the same side by the same matrix.” Preserve factor order.',
    'Part (a): expand D⁻¹(C+D)C⁻¹. The two terms are D⁻¹CC⁻¹=D⁻¹ and D⁻¹DC⁻¹=C⁻¹. Thus C⁻¹+D⁻¹=D⁻¹(C+D)C⁻¹.',
    'Invert that three-factor product in reverse order: [D⁻¹(C+D)C⁻¹]⁻¹=C(C+D)⁻¹D. This proves part (a).',
    'Part (b): expand both (I+CD)C and C(I+DC). Each is C+CDC, so (I+CD)C=C(I+DC).',
    'Multiply this equality on the left by (I+CD)⁻¹ and on the right by (I+DC)⁻¹. The left simplifies to C(I+DC)⁻¹ and the right to (I+CD)⁻¹C. Exchange the two sides to match the requested formula.',
    'Part (c): expand (C+DDᵀ)C⁻¹D. It is D+DDᵀC⁻¹D. Factor the D on the left to obtain D(I+DᵀC⁻¹D).',
    'Multiply that equality on the left by (C+DDᵀ)⁻¹ and on the right by (I+DᵀC⁻¹D)⁻¹. The identity factors cancel, leaving C⁻¹D(I+DᵀC⁻¹D)⁻¹=(C+DDᵀ)⁻¹D. This is part (c), with the sides reversed.'
  ], '(a) (C⁻¹+D⁻¹)⁻¹=C(C+D)⁻¹D.\n(b) (I+CD)⁻¹C=C(I+DC)⁻¹.\n(c) (C+DDᵀ)⁻¹D=C⁻¹D(I+DᵀC⁻¹D)⁻¹. All three hold under the stated inverse and size assumptions.');
  extend('review', '25', [
    'The partition lines divide a matrix into rectangular blocks. Block multiplication uses the same row-column idea as ordinary multiplication, but now the “entries” are smaller matrices. Every product must have matching inner dimensions, and every sum must add equal-sized matrices.'
  ], [
    'The top block is [11  −2; 14  1]+[8  23; −2  4]=[19  21; 12  5]. The bottom block is [10  −7]+[−4  −4]=[6  −11]. Stacking them gives the same 3×2 product as all six direct dot products.'
  ], '(a) A₁₁ is 2×3, A₁₂ is 2×2, A₂₁ is 1×3, A₂₂ is 1×2; B₁ is 3×2 and B₂ is 2×2. The top products are both 2×2 and the bottom products both 1×2, so Formula (*) is valid.\n(b) Both methods give AB=\n[19   21]\n[12    5]\n[ 6  −11].');
  teach('review', '26', [
    'Let B=A⁻¹ and partition B into the four unknown blocks B₁₁,B₁₂,B₂₁,B₂₂. Since B is the inverse, AB=I and BA=I. The identity matrix has identity blocks on its diagonal and zero blocks elsewhere.',
    'Use the first block column of AB=I. Its top and bottom equations are A₁₁B₁₁+A₁₂B₂₁=I and A₂₁B₁₁+A₂₂B₂₁=0.',
    'Solve the bottom equation by multiplying on the left by A₂₂⁻¹: B₂₁=−A₂₂⁻¹A₂₁B₁₁. Substitute into the top equation to obtain (A₁₁−A₁₂A₂₂⁻¹A₂₁)B₁₁=I.',
    'The factor in parentheses is invertible by the question’s assumption. Multiply by its inverse to get B₁₁=(A₁₁−A₁₂A₂₂⁻¹A₂₁)⁻¹. The previous step already gives the required B₂₁ formula.',
    'For B₁₂, use the upper-right block of BA=I: B₁₁A₁₂+B₁₂A₂₂=0. Move the first term to the right and multiply on the right by A₂₂⁻¹, giving B₁₂=−B₁₁A₁₂A₂₂⁻¹.',
    'For B₂₂, use the second block column of AB=I: A₁₁B₁₂+A₁₂B₂₂=0 and A₂₁B₁₂+A₂₂B₂₂=I. The first gives B₁₂=−A₁₁⁻¹A₁₂B₂₂.',
    'Substitute that expression into the second equation: (A₂₂−A₂₁A₁₁⁻¹A₁₂)B₂₂=I. Multiply on the left by the assumed inverse to obtain B₂₂=(A₂₂−A₂₁A₁₁⁻¹A₁₂)⁻¹. All four blocks have now been derived from the defining inverse identities.'
  ], 'A⁻¹=[B₁₁  B₁₂; B₂₁  B₂₂], where\nB₁₁=(A₁₁−A₁₂A₂₂⁻¹A₂₁)⁻¹,\nB₁₂=−B₁₁A₁₂A₂₂⁻¹,\nB₂₁=−A₂₂⁻¹A₂₁B₁₁,\nB₂₂=(A₂₂−A₂₁A₁₁⁻¹A₁₂)⁻¹.\nThese formulas require all the stated inverses to exist.');
  teach('review', '27', [
    'Use the formulas from Exercise 26 with A₂₁=0. Multiplication by a zero block gives a zero block whenever the sizes match.',
    'The top-left inverse block becomes B₁₁=(A₁₁−A₁₂A₂₂⁻¹0)⁻¹=A₁₁⁻¹. The bottom-right becomes B₂₂=(A₂₂−0A₁₁⁻¹A₁₂)⁻¹=A₂₂⁻¹.',
    'The lower-left block becomes B₂₁=−A₂₂⁻¹0B₁₁=0. The upper-right block is B₁₂=−B₁₁A₁₂A₂₂⁻¹=−A₁₁⁻¹A₁₂A₂₂⁻¹.',
    'Check by multiplying A by the proposed inverse. The diagonal blocks become A₁₁A₁₁⁻¹=I and A₂₂A₂₂⁻¹=I. The lower-left remains zero. The upper-right is −A₁₂A₂₂⁻¹+A₁₂A₂₂⁻¹=0.',
    'In the reverse order, the upper-right is A₁₁⁻¹A₁₂−A₁₁⁻¹A₁₂=0 and the other blocks again form the identity. Thus the displayed block matrix is indeed the inverse.'
  ], 'A⁻¹=\n[A₁₁⁻¹  −A₁₁⁻¹A₁₂A₂₂⁻¹]\n[   0           A₂₂⁻¹   ].');
  teach('review', '28', [
    'A consistent system is one with at least one solution. In row-echelon form, inconsistency appears as an equation 0=b with b≠0, represented by a row [0 … 0 | b].',
    'A pivot position in every coefficient row means each row has a nonzero leading coefficient after elimination. Thus no row can have all zero coefficients.',
    'Consequently an impossible row [0 … 0 | b] cannot occur, regardless of the right-hand-side values. Each equation can be used to solve for its pivot variable.',
    'If there are free variables, choose their values and solve for the pivot variables by back-substitution. If there are none, back-substitution fixes every variable. Either way, at least one solution exists.'
  ], 'The system is consistent for every right-hand side because a coefficient pivot in every row prevents a contradictory zero-coefficient row.');
  teach('review', '29', [
    'Three equations mean the coefficient matrix has three rows. Five unknowns mean it has five columns.',
    'Three pivot columns contain three pivots, and distinct pivots lie in distinct rows. With only three rows available, every row has a pivot.',
    'Therefore there is no zero-coefficient row that could become an impossible equation 0=b with b≠0. The system is consistent for any right-hand side.',
    'Of the five variable columns, three are pivot columns and 5−3=2 are free columns. Choose those two variables freely; the pivot variables are determined from them. Over the real numbers this gives infinitely many solutions, described by two parameters.'
  ], 'The system is consistent and has infinitely many real solutions, with two free parameters.');

  window.EmberMathQuestions = window.EmberMathQuestions || {};
  Object.assign(window.EmberMathQuestions, data);
})();
