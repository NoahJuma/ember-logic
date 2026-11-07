(window.EmberMathI18n?.register || ((_id,build)=>build()))('questions-operations',()=>{
  'use strict';
  const tr=(en,sv)=>window.EmberMathI18n?.t(en,sv)??en;
  const q13={},q14={};
  const put=(set,n,text,extra={})=>set[String(n)]={text,...extra};
  const sizes=tr('Suppose that A, B, C, D, and E are matrices with the following sizes:\nA: 4 × 5; B: 4 × 5; C: 5 × 2; D: 4 × 2; E: 5 × 4.\nIn each part, determine whether the given matrix expression is defined. For those that are defined, give the size of the resulting matrix.',"Anta att A, B, C, D och E är matriser med följande storlekar:\nA: 4 × 5; B: 4 × 5; C: 5 × 2; D: 4 × 2; E: 5 × 4.\nAvgör i varje del om det givna matrisuttrycket är definierat. Ange storleken på resultatmatrisen när uttrycket är definierat.");
  put(q13,1,sizes+'\n(a) BA\n(b) ABᵀ\n(c) AC + D\n(d) E(AC)\n(e) A − 3Eᵀ\n(f) E(5B + A)');
  put(q13,2,sizes+'\n(a) CDᵀ\n(b) DC\n(c) BC − 3D\n(d) Dᵀ(BE)\n(e) BᵀD + ED\n(f) BAᵀ + D');
  const given36=tr(`Use the following matrices to compute the indicated expression if it is defined.
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
[ 4 1 3]`,"Använd följande matriser för att beräkna det angivna uttrycket om det är definierat.\nA =\n[ 3  0 ]\n[−1  2 ]\n[ 1  1 ]\nB =\n[4 −1]\n[0  2]\nC =\n[1 4 2]\n[3 1 5]\nD =\n[ 1 5 2]\n[−1 0 1]\n[ 3 2 4]\nE =\n[ 6 1 3]\n[−1 1 2]\n[ 4 1 3]");
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
  put(q13,7,tr('Use the following matrices and either the row method or the column method, as appropriate, to find the indicated row or column.\n',"Använd följande matriser och antingen radmetoden eller kolonnmetoden, beroende på vad som passar, för att bestämma den angivna raden eller kolonnen.\n")+givenAB+'\n'+parts([tr('the first row of AB',"den första raden i AB"),tr('the third row of AB',"den tredje raden i AB"),tr('the second column of AB',"den andra kolonnen i AB"),tr('the first column of BA',"den första kolonnen i BA"),tr('the third row of AA',"den tredje raden i AA"),tr('the third column of AA',"den tredje kolonnen i AA")]));
  put(q13,8,tr('Use the following matrices and either the row method or the column method, as appropriate, to find the indicated row or column.\n',"Använd följande matriser och antingen radmetoden eller kolonnmetoden, beroende på vad som passar, för att bestämma den angivna raden eller kolonnen.\n")+givenAB+'\n'+parts([tr('the first column of AB',"den första kolonnen i AB"),tr('the third column of BB',"den tredje kolonnen i BB"),tr('the second row of BB',"den andra raden i BB"),tr('the first column of AA',"den första kolonnen i AA"),tr('the third column of AB',"den tredje kolonnen i AB"),tr('the first row of BA',"den första raden i BA")]));
  put(q13,9,tr('Use matrices A and B from Exercises 7–8.\n',"Använd matriserna A och B från uppgifterna 7–8.\n")+givenAB+tr('\n(a) Express each column vector of AA as a linear combination of the column vectors of A.\n(b) Express each column vector of BB as a linear combination of the column vectors of B.',"\n(a) Skriv varje kolonnvektor i AA som en linjärkombination av kolonnvektorerna i A.\n(b) Skriv varje kolonnvektor i BB som en linjärkombination av kolonnvektorerna i B."));
  put(q13,10,tr('Use matrices A and B from Exercises 7–8.\n',"Använd matriserna A och B från uppgifterna 7–8.\n")+givenAB+tr('\n(a) Express each column vector of AB as a linear combination of the column vectors of A.\n(b) Express each column vector of BA as a linear combination of the column vectors of B.',"\n(a) Skriv varje kolonnvektor i AB som en linjärkombination av kolonnvektorerna i A.\n(b) Skriv varje kolonnvektor i BA som en linjärkombination av kolonnvektorerna i B."));
  const toMatrix=tr('In each part, find matrices A, x, and b that express the given linear system as a single matrix equation Ax = b, and write out this matrix equation.',"Bestäm i varje del matriserna A, x och b som uttrycker det givna linjära ekvationssystemet som en enda matrisekvation Ax = b, och skriv ut denna matrisekvation.");
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
  const fromMatrix=tr('In each part, express the matrix equation as a system of linear equations. Column vectors are written as transposed rows.',"Skriv i varje del matrisekvationen som ett system av linjära ekvationer. Kolonnvektorer skrivs som transponerade rader.");
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
  put(q13,15,tr(`Find all values of k, if any, that satisfy the equation.
             [1 1  0]
[k 1 1] × [1 0  2] × (k, 1, 1)ᵀ = 0
             [0 2 −3]`,"Bestäm alla värden på k, om det finns några, som uppfyller ekvationen.\n             [1 1  0]\n[k 1 1] × [1 0  2] × (k, 1, 1)ᵀ = 0\n             [0 2 −3]"));
  put(q13,16,tr(`Find all values of k, if any, that satisfy the equation.
             [1 2 0]
[2 2 k] × [2 0 3] × (2, 2, k)ᵀ = 0
             [0 3 1]`,"Bestäm alla värden på k, om det finns några, som uppfyller ekvationen.\n             [1 2 0]\n[2 2 k] × [2 0 3] × (2, 2, k)ᵀ = 0\n             [0 3 1]"));
  const outer=tr('Use the column-row expansion of AB to express this product as a sum of matrix products.',"Använd kolonn–rad-utvecklingen av AB för att skriva produkten som en summa av matrisprodukter.");
  put(q13,17,outer+'\nA =\n[4 −3]\n[2 −1]\nB =\n[ 0 1 2]\n[−2 3 1]');
  put(q13,18,outer+'\nA =\n[0 −2]\n[4 −3]\nB =\n[ 1 4 1]\n[−3 0 2]');
  put(q13,19,outer+'\nA =\n[1 2 3]\n[4 5 6]\nB =\n[1 2]\n[3 4]\n[5 6]');
  put(q13,20,outer+'\nA =\n[0  4 2]\n[1 −2 5]\nB =\n[2 −1]\n[4  0]\n[1 −1]');
  const example5=tr(`Referenced system from Example 5 of Section 1.2:
x₁ + 3x₂ − 2x₃ + 2x₅ = 0
2x₁ + 6x₂ − 5x₃ − 2x₄ + 4x₅ − 3x₆ = −1
5x₃ + 10x₄ + 15x₆ = 5
2x₁ + 6x₂ + 8x₄ + 4x₅ + 18x₆ = 6`,"Systemet som hänvisas till i exempel 5 i avsnitt 1.2:\nx₁ + 3x₂ − 2x₃ + 2x₅ = 0\n2x₁ + 6x₂ − 5x₃ − 2x₄ + 4x₅ − 3x₆ = −1\n5x₃ + 10x₄ + 15x₆ = 5\n2x₁ + 6x₂ + 8x₄ + 4x₅ + 18x₆ = 6");
  put(q13,21,tr(`For the linear system in Example 5 of Section 1.2, express the general solution that we obtained in that example as a linear combination of column vectors that contain only numerical entries. [Suggestion: Rewrite the general solution as a single column vector, then write that column vector as a sum of column vectors each of which contains at most one parameter, and then factor out the parameters.]
${example5}`,`För det linjära ekvationssystemet i exempel 5 i avsnitt 1.2: skriv den allmänna lösningen från exemplet som en linjärkombination av kolonnvektorer som endast innehåller tal. [Förslag: Skriv om den allmänna lösningen som en enda kolonnvektor. Skriv sedan denna som en summa av kolonnvektorer som var och en innehåller högst en parameter, och bryt därefter ut parametrarna.]
${example5}`));
  put(q13,22,tr(`Follow the directions of Exercise 21 for the linear system in Example 6 of Section 1.2.
Directions from Exercise 21: Express the general solution as a linear combination of column vectors that contain only numerical entries. Rewrite it as a single column vector, split the constant and parameter terms, and factor out the parameters.
Referenced system from Example 6:
x₁ + 3x₂ − 2x₃ + 2x₅ = 0
2x₁ + 6x₂ − 5x₃ − 2x₄ + 4x₅ − 3x₆ = 0
5x₃ + 10x₄ + 15x₆ = 0
2x₁ + 6x₂ + 8x₄ + 4x₅ + 18x₆ = 0`,"Följ anvisningarna i uppgift 21 för det linjära ekvationssystemet i exempel 6 i avsnitt 1.2.\nAnvisningar från uppgift 21: Skriv den allmänna lösningen som en linjärkombination av kolonnvektorer som endast innehåller tal. Skriv den som en enda kolonnvektor, skilj konstanttermerna från parametertermerna och bryt ut parametrarna.\nSystemet som hänvisas till i exempel 6:\nx₁ + 3x₂ − 2x₃ + 2x₅ = 0\n2x₁ + 6x₂ − 5x₃ − 2x₄ + 4x₅ − 3x₆ = 0\n5x₃ + 10x₄ + 15x₆ = 0\n2x₁ + 6x₂ + 8x₄ + 4x₅ + 18x₆ = 0"));
  put(q13,23,tr('Solve the matrix equation for a, b, c, and d.\n[a     3  ] = [4        d − 2c]\n[−1 a + b]   [d + 2c     −2 ]',"Lös matrisekvationen med avseende på a, b, c och d.\n[a     3  ] = [4        d − 2c]\n[−1 a + b]   [d + 2c     −2 ]"));
  put(q13,24,tr('Solve the matrix equation for a, b, c, and d.\n[a − b  b + a] = [8 1]\n[3d + c 2d − c]   [7 6]',"Lös matrisekvationen med avseende på a, b, c och d.\n[a − b  b + a] = [8 1]\n[3d + c 2d − c]   [7 6]"));
  put(q13,25,tr('(a) Show that if A has a row of zeros and B is any matrix for which AB is defined, then AB also has a row of zeros.\n(b) Find a similar result involving a column of zeros.',"(a) Visa att om A har en nollrad och B är en matris för vilken AB är definierad, så har även AB en nollrad.\n(b) Formulera ett liknande resultat för en nollkolonn."));
  put(q13,26,tr('In each part, find a 6 × 6 matrix [aᵢⱼ] that satisfies the stated condition. Make your answers as general as possible by using letters rather than specific numbers for the nonzero entries.\n(a) aᵢⱼ = 0 if i ≠ j\n(b) aᵢⱼ = 0 if i > j\n(c) aᵢⱼ = 0 if i < j\n(d) aᵢⱼ = 0 if |i − j| > 1',"Bestäm i varje del en 6 × 6-matris [aᵢⱼ] som uppfyller det angivna villkoret. Gör svaren så allmänna som möjligt genom att använda bokstäver i stället för bestämda tal för elementen som inte måste vara noll.\n(a) aᵢⱼ = 0 om i ≠ j\n(b) aᵢⱼ = 0 om i > j\n(c) aᵢⱼ = 0 om i < j\n(d) aᵢⱼ = 0 om |i − j| > 1"));
  put(q13,27,tr('How many 3 × 3 matrices A can you find for which the equation is satisfied for all choices of x, y, and z?\nA(x, y, z)ᵀ = (x + y, x − y, 0)ᵀ',"Hur många 3 × 3-matriser A kan du hitta för vilka ekvationen gäller för alla val av x, y och z?\nA(x, y, z)ᵀ = (x + y, x − y, 0)ᵀ"));
  put(q13,28,tr('How many 3 × 3 matrices A can you find for which the equation is satisfied for all choices of x, y, and z?\nA(x, y, z)ᵀ = (xy, 0, 0)ᵀ',"Hur många 3 × 3-matriser A kan du hitta för vilka ekvationen gäller för alla val av x, y och z?\nA(x, y, z)ᵀ = (xy, 0, 0)ᵀ"));
  put(q13,29,tr(`A matrix B is said to be a square root of a matrix A if BB = A.
(a) Find two square roots of A =
[2 2]
[2 2].
(b) How many different square roots can you find of A =
[5 0]
[0 9]?
(c) Do you think that every 2 × 2 matrix has at least one square root? Explain your reasoning.`,"En matris B kallas en kvadratrot till en matris A om BB = A.\n(a) Bestäm två kvadratrötter till A =\n[2 2]\n[2 2].\n(b) Hur många olika kvadratrötter kan du hitta till A =\n[5 0]\n[0 9]?\n(c) Tror du att varje 2 × 2-matris har minst en kvadratrot? Förklara hur du resonerar."));
  put(q13,30,tr('Let 0 denote a 2 × 2 matrix, each of whose entries is zero.\n(a) Is there a 2 × 2 matrix A such that A ≠ 0 and AA = 0? Justify your answer.\n(b) Is there a 2 × 2 matrix A such that A ≠ 0 and AA = A? Justify your answer.',"Låt 0 beteckna en 2 × 2-matris vars alla element är noll.\n(a) Finns det en 2 × 2-matris A sådan att A ≠ 0 och AA = 0? Motivera ditt svar.\n(b) Finns det en 2 × 2-matris A sådan att A ≠ 0 och AA = A? Motivera ditt svar."));
  put(q13,31,tr('Establish Formula (11) by using Formula (5) to show that\n(AB)ᵢⱼ = (c₁r₁ + c₂r₂ + ⋯ + cᵣrᵣ)ᵢⱼ.\nReferenced notation: A is m × r and B is r × n; cₖ is column k of A and rₖ is row k of B. Formula (5): (AB)ᵢⱼ = Σₖ₌₁ʳ aᵢₖbₖⱼ. Formula (11): AB = c₁r₁ + ⋯ + cᵣrᵣ.',"Härled formel (11) genom att använda formel (5) för att visa att\n(AB)ᵢⱼ = (c₁r₁ + c₂r₂ + ⋯ + cᵣrᵣ)ᵢⱼ.\nNotation som används: A är m × r och B är r × n; cₖ är kolonn k i A och rₖ är rad k i B. Formel (5): (AB)ᵢⱼ = Σₖ₌₁ʳ aᵢₖbₖⱼ. Formel (11): AB = c₁r₁ + ⋯ + cᵣrᵣ."));
  put(q13,32,tr('Find a 4 × 4 matrix A = [aᵢⱼ] whose entries satisfy the stated condition.\n(a) aᵢⱼ = i + j\n(b) aᵢⱼ = iʲ⁻¹\n(c) aᵢⱼ = 1 if |i − j| > 1, and aᵢⱼ = −1 if |i − j| ≤ 1.',"Bestäm en 4 × 4-matris A = [aᵢⱼ] vars element uppfyller det angivna villkoret.\n(a) aᵢⱼ = i + j\n(b) aᵢⱼ = iʲ⁻¹\n(c) aᵢⱼ = 1 om |i − j| > 1, och aᵢⱼ = −1 om |i − j| ≤ 1."));
  put(q13,33,tr(`Suppose that type I items cost $1 each, type II items cost $2 each, and type III items cost $3 each. Also, suppose that the accompanying table describes the number of items of each type purchased during the first four months of the year.
Table Ex-33: columns Type I, Type II, Type III.
Jan.: 3, 4, 3
Feb.: 5, 6, 0
Mar.: 2, 9, 4
Apr.: 1, 1, 7
What information is represented by the following product?
[3 4 3]
[5 6 0] × (1, 2, 3)ᵀ
[2 9 4]
[1 1 7]`,"Anta att varor av typ I kostar $1 styck, varor av typ II kostar $2 styck och varor av typ III kostar $3 styck. Anta också att tabellen anger antalet inköpta varor av varje typ under årets första fyra månader.\nTabell Ex-33: kolonnerna Typ I, Typ II, Typ III.\nJan.: 3, 4, 3\nFeb.: 5, 6, 0\nMar.: 2, 9, 4\nApr.: 1, 1, 7\nVilken information visar följande produkt?\n[3 4 3]\n[5 6 0] × (1, 2, 3)ᵀ\n[2 9 4]\n[1 1 7]"));
  put(q13,34,tr(`The accompanying table shows a record of May and June unit sales for a clothing store. Let M denote the 4 × 3 matrix of May sales and J the 4 × 3 matrix of June sales.
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
Raincoats: 8, 10, 9`,"Tabellen visar antalet sålda plagg i maj och juni i en klädbutik. Låt M beteckna 4 × 3-matrisen för försäljningen i maj och J beteckna 4 × 3-matrisen för försäljningen i juni.\n(a) Vad representerar matrisen M + J?\n(b) Vad representerar matrisen M − J?\n(c) Bestäm en kolonnvektor x så att Mx ger antalet skjortor, jeans, kostymer och regnrockar som såldes i maj.\n(d) Bestäm en radvektor y så att yM ger antalet små, medelstora och stora plagg som såldes i maj.\n(e) Använd matriserna x och y från delarna (c) och (d). Vad representerar yMx?\nTabell Ex-34: kolonnerna Liten, Mellan, Stor.\nFörsäljning i maj:\nSkjortor: 45, 60, 75\nJeans: 30, 30, 40\nKostymer: 12, 65, 45\nRegnrockar: 15, 40, 35\nFörsäljning i juni:\nSkjortor: 30, 33, 40\nJeans: 21, 23, 25\nKostymer: 9, 12, 11\nRegnrockar: 8, 10, 9"));
  put(q13,35,tr('Prove: If A and B are n × n matrices, then\ntr(A + B) = tr(A) + tr(B).',"Bevisa: Om A och B är n × n-matriser, så gäller\ntr(A + B) = tr(A) + tr(B)."));
  put(q13,36,tr('(a) Prove: If AB and BA are both defined, then AB and BA are square matrices.\n(b) Prove: If A is an m × n matrix and A(BA) is defined, then B is an n × m matrix.',"(a) Bevisa: Om både AB och BA är definierade, så är både AB och BA kvadratiska matriser.\n(b) Bevisa: Om A är en m × n-matris och A(BA) är definierad, så är B en n × m-matris."));
  put(q13,'TF',tr('In parts (a)–(o) determine whether the statement is true or false, and justify your answer.\n',"Avgör i delarna (a)–(o) om påståendet är sant eller falskt, och motivera ditt svar.\n")+parts([
    tr('The matrix\n[1 2 3]\n[4 5 6]\nhas no main diagonal.',"Matrisen\n[1 2 3]\n[4 5 6]\nsaknar huvuddiagonal."),
    tr('An m × n matrix has m column vectors and n row vectors.',"En m × n-matris har m kolonnvektorer och n radvektorer."),
    tr('If A and B are 2 × 2 matrices, then AB = BA.',"Om A och B är 2 × 2-matriser, så gäller AB = BA."),
    tr('The ith row vector of a matrix product AB can be computed by multiplying A by the ith row vector of B.',"Radvektor i i en matrisprodukt AB kan beräknas genom att multiplicera A med radvektor i i B."),
    tr('For every matrix A, it is true that (Aᵀ)ᵀ = A.',"För varje matris A gäller (Aᵀ)ᵀ = A."),
    tr('If A and B are square matrices of the same order, then tr(AB) = tr(A)tr(B).',"Om A och B är kvadratiska matriser av samma ordning, så gäller tr(AB) = tr(A)tr(B)."),
    tr('If A and B are square matrices of the same order, then (AB)ᵀ = AᵀBᵀ.',"Om A och B är kvadratiska matriser av samma ordning, så gäller (AB)ᵀ = AᵀBᵀ."),
    tr('For every square matrix A, it is true that tr(Aᵀ) = tr(A).',"För varje kvadratisk matris A gäller tr(Aᵀ) = tr(A)."),
    tr('If A is a 6 × 4 matrix and B is an m × n matrix such that BᵀAᵀ is a 2 × 6 matrix, then m = 4 and n = 2.',"Om A är en 6 × 4-matris och B är en m × n-matris sådan att BᵀAᵀ är en 2 × 6-matris, så är m = 4 och n = 2."),
    tr('If A is an n × n matrix and c is a scalar, then tr(cA) = c tr(A).',"Om A är en n × n-matris och c är en skalär, så gäller tr(cA) = c tr(A)."),
    tr('If A, B, and C are matrices of the same size such that A − C = B − C, then A = B.',"Om A, B och C är matriser av samma storlek och A − C = B − C, så gäller A = B."),
    tr('If A, B, and C are square matrices of the same order such that AC = BC, then A = B.',"Om A, B och C är kvadratiska matriser av samma ordning och AC = BC, så gäller A = B."),
    tr('If AB + BA is defined, then A and B are square matrices of the same size.',"Om AB + BA är definierat, så är A och B kvadratiska matriser av samma storlek."),
    tr('If B has a column of zeros, then so does AB if this product is defined.',"Om B har en nollkolonn, så har även AB det om produkten är definierad."),
    tr('If B has a column of zeros, then so does BA if this product is defined.',"Om B har en nollkolonn, så har även BA det om produkten är definierad.")
  ]));
  put(q13,'T1',tr(`(a) Compute the product AB of the matrices in Example 5, and compare your answer to that in the text.
(b) Use your technology utility to extract the columns of A and the rows of B, and then calculate the product AB by a column-row expansion.
Matrices from Example 5:
A =
[1 2 4]
[2 6 0]
B =
[4  1 4 3]
[0 −1 3 1]
[2  7 5 2]`,"(a) Beräkna produkten AB av matriserna i exempel 5 och jämför ditt svar med svaret i texten.\n(b) Använd ditt digitala matematikverktyg för att ta ut kolonnerna i A och raderna i B. Beräkna sedan produkten AB med en kolonn–rad-utveckling.\nMatriser från exempel 5:\nA =\n[1 2 4]\n[2 6 0]\nB =\n[4  1 4 3]\n[0 −1 3 1]\n[2  7 5 2]"));

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
  put(q14,1,tr('Verify that the following matrices and scalars satisfy the stated properties of Theorem 1.4.1.\n',"Kontrollera att följande matriser och skalärer uppfyller de angivna egenskaperna i sats 1.4.1.\n")+data14+'\n'+parts([tr('The associative law for matrix addition.',"Den associativa lagen för matrisaddition."),tr('The associative law for matrix multiplication.',"Den associativa lagen för matrismultiplikation."),tr('The left distributive law.',"Den vänstra distributiva lagen."),'(a + b)C = aC + bC']),{reference:tr('Associative addition: A+(B+C)=(A+B)+C. Associative multiplication: A(BC)=(AB)C. Left distributive law: A(B+C)=AB+AC.',"Associativ addition: A+(B+C)=(A+B)+C. Associativ multiplikation: A(BC)=(AB)C. Vänster distributiv lag: A(B+C)=AB+AC.")});
  put(q14,2,tr('Verify that the following matrices and scalars satisfy the stated properties of Theorem 1.4.1.\n',"Kontrollera att följande matriser och skalärer uppfyller de angivna egenskaperna i sats 1.4.1.\n")+data14+'\n'+parts(['a(BC) = (aB)C = B(aC)','A(B − C) = AB − AC','(B + C)A = BA + CA','a(bC) = (ab)C']));
  put(q14,3,tr('Verify that the matrices and scalars in Exercise 1 satisfy the stated properties.\n',"Kontrollera att matriserna och skalärerna i uppgift 1 uppfyller de angivna egenskaperna.\n")+data14+'\n'+parts(['(Aᵀ)ᵀ = A','(AB)ᵀ = BᵀAᵀ']));
  put(q14,4,tr('Verify that the matrices and scalars in Exercise 1 satisfy the stated properties.\n',"Kontrollera att matriserna och skalärerna i uppgift 1 uppfyller de angivna egenskaperna.\n")+data14+'\n'+parts(['(A + B)ᵀ = Aᵀ + Bᵀ','(aC)ᵀ = aCᵀ']));
  const inverseData=['A =\n[2 −3]\n[4  4]','B =\n[3 1]\n[5 2]','C =\n[2 0]\n[0 3]','D =\n[ 6  4]\n[−2 −1]'];
  const inverseRule=tr('Theorem 1.4.5: A 2 × 2 matrix [a b; c d] is invertible exactly when ad − bc ≠ 0. Its inverse is (1/(ad − bc))[d −b; −c a].',"Sats 1.4.5: En 2 × 2-matris [a b; c d] är inverterbar precis när ad − bc ≠ 0. Dess invers är (1/(ad − bc))[d −b; −c a].");
  inverseData.forEach((v,i)=>put(q14,i+5,tr('Use Theorem 1.4.5 to compute the inverse of the matrix.\n',"Använd sats 1.4.5 för att beräkna matrisens invers.\n")+v,{reference:inverseRule}));
  put(q14,9,tr('Find the inverse of\n[(eˣ + e⁻ˣ)/2  (eˣ − e⁻ˣ)/2]\n[(eˣ − e⁻ˣ)/2  (eˣ + e⁻ˣ)/2]',"Bestäm inversen till\n[(eˣ + e⁻ˣ)/2  (eˣ − e⁻ˣ)/2]\n[(eˣ − e⁻ˣ)/2  (eˣ + e⁻ˣ)/2]"));
  put(q14,10,tr('Find the inverse of\n[ cos θ  sin θ]\n[−sin θ  cos θ]',"Bestäm inversen till\n[ cos θ  sin θ]\n[−sin θ  cos θ]"));
  ['(Aᵀ)⁻¹ = (A⁻¹)ᵀ','(A⁻¹)⁻¹ = A','(ABC)⁻¹ = C⁻¹B⁻¹A⁻¹','(ABC)ᵀ = CᵀBᵀAᵀ'].forEach((v,i)=>put(q14,i+11,tr('Verify that the equation is valid for the matrices in Exercises 5–8.\n',"Kontrollera att ekvationen gäller för matriserna i uppgifterna 5–8.\n")+v,{reference:inverseData.join('\n')}));
  ['(7A)⁻¹ =\n[−3  7]\n[ 1 −2]','(5Aᵀ)⁻¹ =\n[−3 −1]\n[ 5  2]','(I + 2A)⁻¹ =\n[−1 2]\n[ 4 5]','A⁻¹ =\n[2 −1]\n[3  5]'].forEach((v,i)=>put(q14,i+15,tr('Use the given information to find A.\n',"Använd den givna informationen för att bestämma A.\n")+v));
  const powerData=['A =\n[3 1]\n[2 1]','A =\n[2 0]\n[4 1]'];
  powerData.forEach((v,i)=>{
    put(q14,i+19,tr('Compute the following using the given matrix A.\n',"Beräkna följande med den givna matrisen A.\n")+v+'\n'+parts(['A³','A⁻³','A² − 2A + I']));
    put(q14,i+21,tr('Compute p(A) for the given matrix A and the following polynomials.\n',"Beräkna p(A) för den givna matrisen A och följande polynom.\n")+v+'\n'+parts(['p(x) = x − 2','p(x) = 2x² − x + 1','p(x) = x³ − 2x + 1']));
  });
  const commuteData=tr('Let\nA =\n[a b]\n[c d]\nB =\n[0 1]\n[0 0]\nC =\n[0 0]\n[1 0]',"Låt\nA =\n[a b]\n[c d]\nB =\n[0 1]\n[0 0]\nC =\n[0 0]\n[1 0]");
  put(q14,23,commuteData+tr('\nFind all values of a, b, c, and d (if any) for which the matrices A and B commute.',"\nBestäm alla värden på a, b, c och d (om det finns några) för vilka matriserna A och B kommuterar."));
  put(q14,24,commuteData+tr('\nFind all values of a, b, c, and d (if any) for which the matrices A and C commute.',"\nBestäm alla värden på a, b, c och d (om det finns några) för vilka matriserna A och C kommuterar."));
  ['3x₁ − 2x₂ = −1\n4x₁ + 5x₂ = 3','−x₁ + 5x₂ = 4\n−x₁ − 3x₂ = 1','6x₁ + x₂ = 0\n4x₁ − 3x₂ = −2','2x₁ − 2x₂ = 4\nx₁ + 4x₂ = 4'].forEach((v,i)=>put(q14,i+25,tr('Use the method of Example 8 to find the unique solution of the given linear system.\n',"Använd metoden i exempel 8 för att bestämma den entydiga lösningen till det givna linjära ekvationssystemet.\n")+v,{reference:tr('Example 8 uses the inverse method: write the system as Ax = b, calculate A⁻¹, and multiply to obtain x = A⁻¹b.',"Exempel 8 använder inversmetoden: skriv systemet som Ax = b, beräkna A⁻¹ och multiplicera för att få x = A⁻¹b.")}));
  const factorData=tr('If a polynomial p(x) can be factored as a product of lower degree polynomials, say p(x) = p₁(x)p₂(x), and if A is a square matrix, then it can be proved that p(A) = p₁(A)p₂(A).\nVerify this statement for the stated matrix A and polynomials p(x) = x² − 9, p₁(x) = x + 3, p₂(x) = x − 3.',"Om ett polynom p(x) kan faktoriseras som en produkt av polynom av lägre grad, exempelvis p(x) = p₁(x)p₂(x), och A är en kvadratisk matris, kan man bevisa att p(A) = p₁(A)p₂(A).\nKontrollera detta påstående för den angivna matrisen A och polynomen p(x) = x² − 9, p₁(x) = x + 3, p₂(x) = x − 3.");
  put(q14,29,factorData+tr('\nThe matrix A in Exercise 21.',"\nMatrisen A i uppgift 21."),{reference:powerData[0]});
  put(q14,30,factorData+tr('\nAn arbitrary square matrix A.',"\nEn godtycklig kvadratisk matris A."));
  put(q14,31,tr('(a) Give an example of two 2 × 2 matrices such that (A + B)(A − B) ≠ A² − B².\n(b) State a valid formula for multiplying out (A + B)(A − B).\n(c) What condition can you impose on A and B that will allow you to write (A + B)(A − B) = A² − B²?',"(a) Ge ett exempel på två 2 × 2-matriser sådana att (A + B)(A − B) ≠ A² − B².\n(b) Ange en korrekt formel för att utveckla (A + B)(A − B).\n(c) Vilket villkor på A och B gör att du kan skriva (A + B)(A − B) = A² − B²?"));
  put(q14,32,tr('The numerical equation a² = 1 has exactly two solutions. Find at least eight solutions of the matrix equation A² = I₃. [Hint: Look for solutions in which all entries off the main diagonal are zero.]',"Talekvationen a² = 1 har exakt två lösningar. Bestäm minst åtta lösningar till matrisekvationen A² = I₃. [Ledning: Sök lösningar där alla element utanför huvuddiagonalen är noll.]"));
  put(q14,33,tr('(a) Show that if a square matrix A satisfies the equation A² + 2A + I = 0, then A must be invertible. What is the inverse?\n(b) Show that if p(x) is a polynomial with a nonzero constant term, and if A is a square matrix for which p(A) = 0, then A is invertible.',"(a) Visa att om en kvadratisk matris A uppfyller ekvationen A² + 2A + I = 0, så måste A vara inverterbar. Vilken är inversen?\n(b) Visa att om p(x) är ett polynom med en konstantterm som inte är noll och A är en kvadratisk matris för vilken p(A) = 0, så är A inverterbar."));
  put(q14,34,tr('Is it possible for A³ to be an identity matrix without A being invertible? Explain.',"Kan A³ vara en enhetsmatris utan att A är inverterbar? Förklara."));
  put(q14,35,tr('Can a matrix with a row of zeros or a column of zeros have an inverse? Explain.',"Kan en matris med en nollrad eller en nollkolonn ha en invers? Förklara."));
  put(q14,36,tr('Can a matrix with two identical rows or two identical columns have an inverse? Explain.',"Kan en matris med två identiska rader eller två identiska kolonner ha en invers? Förklara."));
  ['A =\n[1 0 1]\n[1 1 0]\n[0 1 1]','A =\n[1 1 1]\n[1 0 0]\n[0 1 1]'].forEach((v,i)=>put(q14,i+37,tr('Determine whether A is invertible, and if so, find the inverse. [Hint: Solve AX = I for X by equating corresponding entries on the two sides.]\n',"Avgör om A är inverterbar och bestäm i så fall inversen. [Ledning: Lös AX = I med avseende på X genom att sätta motsvarande element på de två sidorna lika.]\n")+v));
  ['(AB)⁻¹(AC⁻¹)(D⁻¹C⁻¹)⁻¹D⁻¹','(AC⁻¹)⁻¹(AC⁻¹)(AC⁻¹)⁻¹AD⁻¹'].forEach((v,i)=>put(q14,i+39,tr('Simplify the expression assuming that A, B, C, and D are invertible.\n',"Förenkla uttrycket under antagandet att A, B, C och D är inverterbara.\n")+v));
  put(q14,41,tr('Show that if R is a 1 × n matrix and C is an n × 1 matrix, then RC = tr(CR).',"Visa att om R är en 1 × n-matris och C är en n × 1-matris, så gäller RC = tr(CR)."));
  put(q14,42,tr('If A is a square matrix and n is a positive integer, is it true that (Aⁿ)ᵀ = (Aᵀ)ⁿ? Justify your answer.',"Om A är en kvadratisk matris och n är ett positivt heltal, är det sant att (Aⁿ)ᵀ = (Aᵀ)ⁿ? Motivera ditt svar."));
  put(q14,43,tr('(a) Show that if A is invertible and AB = AC, then B = C.\n(b) Explain why part (a) and Example 3 do not contradict one another.',"(a) Visa att om A är inverterbar och AB = AC, så gäller B = C.\n(b) Förklara varför del (a) och exempel 3 inte motsäger varandra."),{reference:tr('Example 3 uses A = [0 1; 0 2], B = [1 1; 3 4], C = [2 5; 3 4]. Here AB = AC = [3 4; 6 8], even though B ≠ C.',"Exempel 3 använder A = [0 1; 0 2], B = [1 1; 3 4], C = [2 5; 3 4]. Här är AB = AC = [3 4; 6 8], trots att B ≠ C.")});
  put(q14,44,tr('Show that if A is invertible and k is any nonzero scalar, then (kA)ⁿ = kⁿAⁿ for all integer values of n.',"Visa att om A är inverterbar och k är en skalär som inte är noll, så gäller (kA)ⁿ = kⁿAⁿ för alla heltalsvärden på n."));
  put(q14,45,tr('(a) Show that if A, B, and A + B are invertible matrices with the same size, then A(A⁻¹ + B⁻¹)B(A + B)⁻¹ = I.\n(b) What does the result in part (a) tell you about the matrix A⁻¹ + B⁻¹?',"(a) Visa att om A, B och A + B är inverterbara matriser av samma storlek, så gäller A(A⁻¹ + B⁻¹)B(A + B)⁻¹ = I.\n(b) Vad säger resultatet i del (a) om matrisen A⁻¹ + B⁻¹?"));
  put(q14,46,tr('A square matrix A is said to be idempotent if A² = A.\n(a) Show that if A is idempotent, then so is I − A.\n(b) Show that if A is idempotent, then 2A − I is invertible and is its own inverse.',"En kvadratisk matris A kallas idempotent om A² = A.\n(a) Visa att om A är idempotent, så är även I − A idempotent.\n(b) Visa att om A är idempotent, så är 2A − I inverterbar och sin egen invers."));
  put(q14,47,tr('Show that if A is a square matrix such that Aᵏ = 0 for some positive integer k, then the matrix I − A is invertible and (I − A)⁻¹ = I + A + A² + ⋯ + Aᵏ⁻¹.',"Visa att om A är en kvadratisk matris sådan att Aᵏ = 0 för något positivt heltal k, så är matrisen I − A inverterbar och (I − A)⁻¹ = I + A + A² + ⋯ + Aᵏ⁻¹."));
  put(q14,48,tr('Show that the matrix\nA =\n[a b]\n[c d]\nsatisfies the equation A² − (a + d)A + (ad − bc)I = 0.',"Visa att matrisen\nA =\n[a b]\n[c d]\nuppfyller ekvationen A² − (a + d)A + (ad − bc)I = 0."));
  put(q14,49,tr('Assuming that all matrices are n × n and invertible, solve for D.\nCᵀB⁻¹A²BAC⁻¹DA⁻²BᵀC⁻² = Cᵀ',"Anta att alla matriser är n × n och inverterbara. Lös med avseende på D.\nCᵀB⁻¹A²BAC⁻¹DA⁻²BᵀC⁻² = Cᵀ"));
  put(q14,50,tr('Assuming that all matrices are n × n and invertible, solve for D.\nABCᵀDBAᵀC = ABᵀ',"Anta att alla matriser är n × n och inverterbara. Lös med avseende på D.\nABCᵀDBAᵀC = ABᵀ"));
  [['1.4.1(a)','A + B = B + A.'],['1.4.1(b)','A + (B + C) = (A + B) + C.'],['1.4.1(f)','A(B − C) = AB − AC.'],['1.4.1(c)','A(BC) = (AB)C.'],['1.4.2(c)','A − A = A + (−A) = 0.'],['1.4.2(b)','A − 0 = A.'],['1.4.8(d)',tr('(kA)ᵀ = kAᵀ, where k is a scalar.',"(kA)ᵀ = kAᵀ, där k är en skalär.")],['1.4.8(e)','(AB)ᵀ = BᵀAᵀ.']].forEach(([n,v],i)=>put(q14,i+51,tr('Prove the stated result: Theorem ',"Bevisa det angivna resultatet: sats ")+n+'.',{reference:tr('Theorem ',"Sats ")+n+': '+v+tr(' Assume that the matrix sizes make the indicated operations valid.'," Anta att matrisernas storlekar gör de angivna operationerna möjliga.")}));
  put(q14,'TF',tr('In parts (a)–(k) determine whether the statement is true or false, and justify your answer.\n',"Avgör i delarna (a)–(k) om påståendet är sant eller falskt, och motivera ditt svar.\n")+parts([
    tr('Two n × n matrices, A and B, are inverses of one another if and only if AB = BA = 0.',"Två n × n-matriser, A och B, är inverser till varandra om och endast om AB = BA = 0."),
    tr('For all square matrices A and B of the same size, it is true that (A + B)² = A² + 2AB + B².',"För alla kvadratiska matriser A och B av samma storlek gäller (A + B)² = A² + 2AB + B²."),
    tr('For all square matrices A and B of the same size, it is true that A² − B² = (A − B)(A + B).',"För alla kvadratiska matriser A och B av samma storlek gäller A² − B² = (A − B)(A + B)."),
    tr('If A and B are invertible matrices of the same size, then AB is invertible and (AB)⁻¹ = A⁻¹B⁻¹.',"Om A och B är inverterbara matriser av samma storlek, så är AB inverterbar och (AB)⁻¹ = A⁻¹B⁻¹."),
    tr('If A and B are matrices such that AB is defined, then it is true that (AB)ᵀ = AᵀBᵀ.',"Om A och B är matriser sådana att AB är definierad, så gäller (AB)ᵀ = AᵀBᵀ."),
    tr('The matrix A =\n[a b]\n[c d]\nis invertible if and only if ad − bc ≠ 0.',"Matrisen A =\n[a b]\n[c d]\när inverterbar om och endast om ad − bc ≠ 0."),
    tr('If A and B are matrices of the same size and k is a constant, then (kA + B)ᵀ = kAᵀ + Bᵀ.',"Om A och B är matriser av samma storlek och k är en konstant, så gäller (kA + B)ᵀ = kAᵀ + Bᵀ."),
    tr('If A is an invertible matrix, then so is Aᵀ.',"Om A är en inverterbar matris, så är även Aᵀ inverterbar."),
    tr('If p(x) = a₀ + a₁x + a₂x² + ⋯ + aₘxᵐ and I is an identity matrix, then p(I) = a₀ + a₁ + a₂ + ⋯ + aₘ.',"Om p(x) = a₀ + a₁x + a₂x² + ⋯ + aₘxᵐ och I är en enhetsmatris, så är p(I) = a₀ + a₁ + a₂ + ⋯ + aₘ."),
    tr('A square matrix containing a row or column of zeros cannot be invertible.',"En kvadratisk matris som innehåller en nollrad eller en nollkolonn kan inte vara inverterbar."),
    tr('The sum of two invertible matrices of the same size must be invertible.',"Summan av två inverterbara matriser av samma storlek måste vara inverterbar.")
  ]));
  put(q14,'T1',tr('Let A be the matrix\nA =\n[ 0   1/2 1/3]\n[1/4   0  1/5]\n[1/6  1/7  0 ]\nDiscuss the behavior of Aᵏ as k increases indefinitely, that is, as k → ∞.',"Låt A vara matrisen\nA =\n[ 0   1/2 1/3]\n[1/4   0  1/5]\n[1/6  1/7  0 ]\nDiskutera hur Aᵏ beter sig när k växer obegränsat, det vill säga när k → ∞."));
  put(q14,'T2',tr('In each part use your technology utility to make a conjecture about the form of Aⁿ for positive integer powers of n.\n(a) A =\n[a 1]\n[0 a]\n(b) A =\n[ cos θ  sin θ]\n[−sin θ  cos θ]',"Använd i varje del ditt digitala matematikverktyg för att formulera en hypotes om formen på Aⁿ för positiva heltalsexponenter n.\n(a) A =\n[a 1]\n[0 a]\n(b) A =\n[ cos θ  sin θ]\n[−sin θ  cos θ]"));
  put(q14,'T3',tr(`The Fibonacci sequence (named for the Italian mathematician Leonardo Fibonacci 1170–1250) is
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
[Fₙ   F₀]`,"Fibonacciföljden (uppkallad efter den italienske matematikern Leonardo Fibonacci 1170–1250) är\n0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …\nDess termer brukar betecknas F₀, F₁, F₂, F₃, …, Fₙ, … .\nEfter de första termerna F₀ = 0 och F₁ = 1 är varje term summan av de två föregående, alltså Fₙ = Fₙ₋₁ + Fₙ₋₂.\nBekräfta att om\nQ =\n[F₂ F₁] = [1 1]\n[F₁ F₀]   [1 0]\nså gäller\nQⁿ =\n[Fₙ₊₁ Fₙ]\n[Fₙ   F₀]"));

  // The explanations below are original teaching notes, separate from the book's wording.
  const teach=(set,n,steps,answer)=>Object.assign(set[n],{steps,...(answer===undefined?{}:{answer})});
  const existing=(section,n)=>window.EmberTextbook?.solutions?.[section]?.find(q=>String(q.number)===String(n));
  const q4=existing('1.3',4);
  if(q4){
    const start=q4.steps.indexOf(tr('Part a:',"Del a:")),end=q4.steps.indexOf(tr('Part c:',"Del c:"));
    q13[4].steps=[...q4.steps.slice(0,start),
      tr('Part a: A has size 3 × 2, so Aᵀ has size 2 × 3. Transpose first: Aᵀ = [3 −1 1; 0 2 1]. This has the same size as C, so the addition is allowed.',"Del a: A har storleken 3 × 2, så Aᵀ har storleken 2 × 3. Transponera först: Aᵀ = [3 −1 1; 0 2 1]. Detta är samma storlek som C, så additionen är tillåten."),
      tr('Double each entry: 2Aᵀ = [6 −2 2; 0 4 2]. Add the matching entries of C: [6+1, −2+4, 2+2; 0+3, 4+1, 2+5] = [7 2 4; 3 5 7].',"Fördubbla varje element: 2Aᵀ = [6 −2 2; 0 4 2]. Addera motsvarande element i C: [6+1, −2+4, 2+2; 0+3, 4+1, 2+5] = [7 2 4; 3 5 7]."),
      tr('Part b: Turn each row of D and E into a column. Dᵀ = [1 −1 3; 5 0 2; 2 1 4] and Eᵀ = [6 −1 4; 1 1 1; 3 2 3].',"Del b: Gör varje rad i D och E till en kolonn. Dᵀ = [1 −1 3; 5 0 2; 2 1 4] och Eᵀ = [6 −1 4; 1 1 1; 3 2 3]."),
      tr('Subtract matching entries: Dᵀ−Eᵀ = [−5 0 −1; 4 −1 1; −1 −1 1]. As a check, this must equal (D−E)ᵀ in part c.',"Subtrahera motsvarande element: Dᵀ−Eᵀ = [−5 0 −1; 4 −1 1; −1 −1 1]. Som kontroll ska detta vara lika med (D−E)ᵀ i del c."),
      ...q4.steps.slice(end)];
    q13[4].answer=q4.answer.split('\n').map((line,i)=>i===0?'a: [7 2 4; 3 5 7]':i===1?'b: [−5 0 −1; 4 −1 1; −1 −1 1]':line).join('\n');
  }
  teach(q13,15,[
    tr('Begin on the right: multiply the 3 × 3 matrix by the column (k,1,1)ᵀ. One row at a time gives k+1, k+2, and 2−3=−1. The result is (k+1,k+2,−1)ᵀ.',"Börja till höger: multiplicera 3 × 3-matrisen med kolonnen (k,1,1)ᵀ. Raderna ger i tur och ordning k+1, k+2 och 2−3=−1. Resultatet är (k+1,k+2,−1)ᵀ."),
    tr('Multiply the remaining row by that column: k(k+1)+1(k+2)+1(−1). The result is a single number, which the question requires to be zero.',"Multiplicera den återstående raden med denna kolonn: k(k+1)+1(k+2)+1(−1). Resultatet är ett enda tal, som enligt uppgiften ska vara noll."),
    tr('Expand and collect like terms: k²+k+k+2−1 = k²+2k+1 = (k+1)².',"Utveckla och samla liknande termer: k²+k+k+2−1 = k²+2k+1 = (k+1)²."),
    tr('A square equals zero only when the number being squared is zero. Therefore k+1=0, giving k=−1. Check: at k=−1 the intermediate column is (0,1,−1)ᵀ and the final product is 0+1−1=0.',"En kvadrat är noll endast när talet som kvadreras är noll. Därför är k+1=0, vilket ger k=−1. Kontroll: när k=−1 blir mellankolonnen (0,1,−1)ᵀ och slutprodukten 0+1−1=0.")
  ],'k = −1.');
  teach(q13,16,[
    tr('Start with the matrix times the right column. Its rows give 2+4=6, 4+3k, and 6+k. Thus the intermediate column is (6,4+3k,6+k)ᵀ.',"Börja med matrisen gånger kolonnen till höger. Raderna ger 2+4=6, 4+3k och 6+k. Mellankolonnen är alltså (6,4+3k,6+k)ᵀ."),
    tr('Multiply by the left row (2,2,k): 2·6 + 2(4+3k) + k(6+k). Set this scalar equal to zero.',"Multiplicera med raden till vänster (2,2,k): 2·6 + 2(4+3k) + k(6+k). Sätt denna skalär lika med noll."),
    tr('Expand: 12+8+6k+6k+k² = k²+12k+20. We need two numbers whose sum is 12 and product is 20: 2 and 10. Hence (k+2)(k+10)=0.',"Utveckla: 12+8+6k+6k+k² = k²+12k+20. Vi behöver två tal med summan 12 och produkten 20: 2 och 10. Alltså är (k+2)(k+10)=0."),
    tr('A product of real numbers is zero when at least one factor is zero. Solve k+2=0 or k+10=0. Substitution gives 4−24+20=0 and 100−120+20=0, so both values check.',"En produkt av reella tal är noll när minst en faktor är noll. Lös k+2=0 eller k+10=0. Insättning ger 4−24+20=0 och 100−120+20=0, så båda värdena stämmer.")
  ],tr('k = −2 or k = −10.','k = −2 eller k = −10.'));
  [21,22].forEach(n=>{
    const h=n===22,constant=h?'0':'1/3';
    const vector=(h?'':'(0,0,0,0,0,1/3)ᵀ + ')+'r(−3,1,0,0,0,0)ᵀ + s(−4,0,−2,1,0,0)ᵀ + t(−2,0,0,0,1,0)ᵀ';
    teach(q13,n,[
      tr('The example reduces the system to x₁+3x₂+4x₄+2x₅=0, x₃+2x₄=0, and x₆=',"I exemplet reduceras systemet till x₁+3x₂+4x₄+2x₅=0, x₃+2x₄=0 och x₆=")+constant+tr('. The variables x₂, x₄, and x₅ are free: choosing them determines the others.',". Variablerna x₂, x₄ och x₅ är fria: när vi väljer dem bestäms de övriga."),
      tr('Call the free choices r, s, and t: x₂=r, x₄=s, x₅=t. Solve the first two equations for x₁=−3r−4s−2t and x₃=−2s. Keep x₆=',"Kalla de fria valen r, s och t: x₂=r, x₄=s, x₅=t. Lös de två första ekvationerna så att x₁=−3r−4s−2t och x₃=−2s. Behåll x₆=")+constant+'.',
      tr('Put these six coordinates in their original order: x=(−3r−4s−2t, r, −2s, s, t, ',"Skriv de sex koordinaterna i ursprunglig ordning: x=(−3r−4s−2t, r, −2s, s, t, ")+constant+tr(')ᵀ. The superscript T means that the listed coordinates form a column.',")ᵀ. Det upphöjda T betyder att de uppräknade koordinaterna bildar en kolonn."),
      tr('Collect the coefficient of r from each position: (−3,1,0,0,0,0)ᵀ. Do the same for s and t, obtaining (−4,0,−2,1,0,0)ᵀ and (−2,0,0,0,1,0)ᵀ. Each of these vectors now contains numbers only.',"Samla koefficienten framför r från varje position: (−3,1,0,0,0,0)ᵀ. Gör samma sak för s och t och få (−4,0,−2,1,0,0)ᵀ och (−2,0,0,0,1,0)ᵀ. Varje vektor innehåller nu endast tal."),
      h?tr('There is no constant vector because every coordinate is zero when r=s=t=0. Multiply each numerical vector by its parameter and add them.',"Det finns ingen konstantvektor eftersom alla koordinater är noll när r=s=t=0. Multiplicera varje talvektor med sin parameter och addera dem."):tr('The sixth coordinate 1/3 does not contain a parameter. Keep it in the constant vector (0,0,0,0,0,1/3)ᵀ, with coefficient 1, then add the three parameter vectors.',"Den sjätte koordinaten 1/3 innehåller ingen parameter. Behåll den i konstantvektorn (0,0,0,0,0,1/3)ᵀ med koefficienten 1 och addera sedan de tre parametervektorerna."),
      tr('Check the construction by reading its first coordinate: it is −3r−4s−2t. Its second, fourth, and fifth coordinates are r, s, and t. This recovers exactly the general solution, for every real choice of the three parameters.',"Kontrollera konstruktionen genom att läsa den första koordinaten: den är −3r−4s−2t. Den andra, fjärde och femte koordinaten är r, s och t. Detta återskapar exakt den allmänna lösningen för varje reellt val av de tre parametrarna.")
    ],'x = '+vector+tr(', where r, s, t are arbitrary real numbers.',", där r, s, t är godtyckliga reella tal."));
  });
  teach(q13,23,[
    tr('Equal matrices have equal entries in each matching position. Reading top-left, top-right, bottom-left, and bottom-right gives a=4, d−2c=3, d+2c=−1, and a+b=−2.',"Lika matriser har lika element i motsvarande positioner. Läs övre vänstra, övre högra, nedre vänstra och nedre högra positionen för att få a=4, d−2c=3, d+2c=−1 och a+b=−2."),
    tr('Substitute a=4 into a+b=−2. Subtract 4 from both sides to get b=−6.',"Sätt in a=4 i a+b=−2. Subtrahera 4 från båda sidor för att få b=−6."),
    tr('Add d−2c=3 and d+2c=−1. The c terms cancel, leaving 2d=2, so d=1.',"Addera d−2c=3 och d+2c=−1. Termerna med c tar ut varandra och kvar blir 2d=2, alltså d=1."),
    tr('Put d=1 into d+2c=−1: 1+2c=−1, so 2c=−2 and c=−1. Check the other equation: 1−2(−1)=3.',"Sätt in d=1 i d+2c=−1: 1+2c=−1, så 2c=−2 och c=−1. Kontrollera den andra ekvationen: 1−2(−1)=3.")
  ],'a=4, b=−6, c=−1, d=1.');
  teach(q13,24,[
    tr('Match the four positions to obtain a−b=8, a+b=1, 3d+c=7, and 2d−c=6. This creates two independent pairs of equations.',"Jämför de fyra positionerna för att få a−b=8, a+b=1, 3d+c=7 och 2d−c=6. Detta ger två oberoende ekvationspar."),
    tr('Add a−b=8 and a+b=1. The b terms cancel, giving 2a=9 and a=9/2. Then b=1−a=−7/2.',"Addera a−b=8 och a+b=1. Termerna med b tar ut varandra och ger 2a=9 och a=9/2. Därefter är b=1−a=−7/2."),
    tr('Add 3d+c=7 and 2d−c=6. The c terms cancel, giving 5d=13 and d=13/5. Then c=7−3d=35/5−39/5=−4/5.',"Addera 3d+c=7 och 2d−c=6. Termerna med c tar ut varandra och ger 5d=13 och d=13/5. Därefter är c=7−3d=35/5−39/5=−4/5."),
    tr('Check all four positions: 9/2−(−7/2)=8; 9/2+(−7/2)=1; 39/5−4/5=7; and 26/5−(−4/5)=6.',"Kontrollera alla fyra positionerna: 9/2−(−7/2)=8; 9/2+(−7/2)=1; 39/5−4/5=7; och 26/5−(−4/5)=6.")
  ],'a=9/2, b=−7/2, c=−4/5, d=13/5.');
  teach(q13,25,[
    tr('Part a: call the zero row of A row i. To calculate any entry in row i of AB, multiply that row by a column of B and add the results.',"Del a: kalla nollraden i A för rad i. För att beräkna ett element i rad i i AB multiplicerar vi den raden med en kolonn i B och adderar resultaten."),
    tr('Every multiplication has a zero from A: 0·b₁ⱼ+0·b₂ⱼ+⋯=0. This is true for every column j, so the whole ith row of AB is zero.',"Varje multiplikation innehåller en nolla från A: 0·b₁ⱼ+0·b₂ⱼ+⋯=0. Detta gäller för varje kolonn j, så hela rad i i AB blir noll."),
    tr('Part b: the matching statement is about a zero column in the RIGHT factor B. Suppose its jth column is zero. The jth column of AB is A times that zero column.',"Del b: motsvarande påstående gäller en nollkolonn i den HÖGRA faktorn B. Anta att kolonn j i B är noll. Kolonn j i AB är A gånger denna nollkolonn."),
    tr('Every resulting entry is a sum aᵢ₁·0+aᵢ₂·0+⋯=0. Therefore the jth column of AB is zero. The side matters: a zero column of A alone does not guarantee a zero column in AB.',"Varje element som bildas är en summa aᵢ₁·0+aᵢ₂·0+⋯=0. Därför är kolonn j i AB noll. Sidan spelar roll: en nollkolonn i A garanterar inte i sig en nollkolonn i AB.")
  ],tr('(a) Every zero row of A remains a zero row in AB. (b) Every zero column of B remains a zero column in AB.',"(a) Varje nollrad i A förblir en nollrad i AB. (b) Varje nollkolonn i B förblir en nollkolonn i AB."));
  const patterns=[['a',tr('diagonal',"diagonal"),(i,j)=>i===j],['b',tr('upper triangular',"övre triangulär"),(i,j)=>i<=j],['c',tr('lower triangular',"undre triangulär"),(i,j)=>i>=j],['d',tr('tridiagonal',"tridiagonal"),(i,j)=>Math.abs(i-j)<=1]];
  q13[26].answer=patterns.map(([letter,name,allow])=>'('+letter+') '+name+':\n'+Array.from({length:6},(_,i)=>'['+Array.from({length:6},(_,j)=>allow(i,j)?'a'+(i+1)+(j+1):'0').join(' ')+']').join('\n')).join('\n\n')+tr('\nEvery displayed aᵢⱼ can be chosen independently, including zero.',"\nVarje visat aᵢⱼ kan väljas oberoende, även som noll.");
  teach(q13,26,[
    tr('Read aᵢⱼ as the entry in row i, column j. For example a₂₅ means row 2, column 5. A condition tells us where a zero is compulsory; every other position can contain an independent letter.',"Läs aᵢⱼ som elementet i rad i, kolonn j. Exempelvis betyder a₂₅ rad 2, kolonn 5. Ett villkor anger var noll är obligatoriskt; alla övriga positioner kan innehålla oberoende bokstäver."),
    tr('Part a: i≠j means the row and column numbers differ. Put zero everywhere except a₁₁,a₂₂,…,a₆₆, the main diagonal.',"Del a: i≠j betyder att radnumret och kolonnnumret skiljer sig åt. Sätt noll överallt utom på a₁₁,a₂₂,…,a₆₆, alltså huvuddiagonalen."),
    tr('Part b: i>j means the row number is greater, so the position lies below the diagonal. Set these positions to zero; leave the diagonal and everything above it free.',"Del b: i>j betyder att radnumret är större, så positionen ligger under diagonalen. Sätt dessa positioner till noll och lämna diagonalen och allt ovanför den fritt."),
    tr('Part c: i<j means a position above the diagonal. Set these positions to zero; leave the diagonal and everything below it free.',"Del c: i<j betyder en position ovanför diagonalen. Sätt dessa positioner till noll och lämna diagonalen och allt nedanför den fritt."),
    tr('Part d: |i−j| is the distance in index numbers from the diagonal. Keep a letter when that distance is 0 or 1; use zero when it is 2 or more. For instance a₂₃ is allowed but a₂₅ must be zero.',"Del d: |i−j| är avståndet i indexnummer från diagonalen. Behåll en bokstav när avståndet är 0 eller 1; använd noll när det är 2 eller större. Exempelvis är a₂₃ tillåtet men a₂₅ måste vara noll.")
  ]);
  teach(q13,27,[
    tr('A matrix acts on a column by taking one weighted sum per row. Its first output must therefore have the form a₁₁x+a₁₂y+a₁₃z.',"En matris verkar på en kolonn genom att beräkna en viktad summa per rad. Det första resultatet måste därför ha formen a₁₁x+a₁₂y+a₁₃z."),
    tr('Compare that with x+y. The coefficients must be 1 for x, 1 for y, and 0 for z, so the first row is (1,1,0).',"Jämför detta med x+y. Koefficienterna måste vara 1 för x, 1 för y och 0 för z, så den första raden är (1,1,0)."),
    tr('Repeat for x−y to get row 2=(1,−1,0). The last output is always zero, so row 3=(0,0,0).',"Upprepa för x−y och få rad 2=(1,−1,0). Det sista resultatet är alltid noll, så rad 3=(0,0,0)."),
    tr('To check uniqueness, use the inputs (1,0,0), (0,1,0), and (0,0,1). They reveal the three columns separately. Thus every entry is forced, and the constructed matrix works for every x,y,z.',"Kontrollera entydigheten med indata (1,0,0), (0,1,0) och (0,0,1). De visar de tre kolonnerna var för sig. Alla element är alltså bestämda, och den konstruerade matrisen fungerar för alla x,y,z.")
  ]);
  teach(q13,28,[
    tr('Suppose a matrix could do this. Write its first row as (a,b,c). Its first output would be ax+by+cz, and this would have to equal xy for every input.',"Anta att en matris kunde göra detta. Skriv dess första rad som (a,b,c). Det första resultatet skulle vara ax+by+cz, vilket måste vara lika med xy för alla indata."),
    tr('Try (x,y,z)=(1,0,0). The desired output is 0, so a=0. Try (0,1,0) to get b=0, and (0,0,1) to get c=0.',"Prova (x,y,z)=(1,0,0). Det önskade resultatet är 0, så a=0. Prova (0,1,0) för att få b=0 och (0,0,1) för att få c=0."),
    tr('These tests force the entire first row to zero, so its output would always be zero.',"Dessa tester tvingar hela första raden att vara noll, så dess resultat skulle alltid vara noll."),
    tr('Now test (1,1,0). The question requires xy=1, while the forced row gives 0. This contradiction proves that no matrix works. A fixed matrix can add weighted coordinates, but it cannot multiply two input coordinates together.',"Testa nu (1,1,0). Uppgiften kräver xy=1, men den framtvingade raden ger 0. Motsägelsen bevisar att ingen matris fungerar. En fast matris kan addera viktade koordinater men kan inte multiplicera två indatakoordinater med varandra.")
  ]);
  teach(q13,31,[
    tr('To prove two matrices equal, show that an arbitrary matching entry is equal. Choose row i and column j; the word arbitrary means the argument works for every permitted i and j.',"För att bevisa att två matriser är lika visar vi att ett godtyckligt motsvarande element är lika. Välj rad i och kolonn j; godtyckligt betyder att resonemanget fungerar för alla tillåtna i och j."),
    tr('Formula (5) gives (AB)ᵢⱼ=aᵢ₁b₁ⱼ+aᵢ₂b₂ⱼ+⋯+aᵢᵣbᵣⱼ. The symbol Σ is a short way to write this repeated sum.',"Formel (5) ger (AB)ᵢⱼ=aᵢ₁b₁ⱼ+aᵢ₂b₂ⱼ+⋯+aᵢᵣbᵣⱼ. Symbolen Σ är ett kort sätt att skriva denna upprepade summa."),
    tr('Column cₖ of A has entry aᵢₖ in row i. Row rₖ of B has entry bₖⱼ in column j. Their column-times-row product has entry (cₖrₖ)ᵢⱼ=aᵢₖbₖⱼ.',"Kolonn cₖ i A har elementet aᵢₖ i rad i. Rad rₖ i B har elementet bₖⱼ i kolonn j. Deras kolonn-gånger-rad-produkt har elementet (cₖrₖ)ᵢⱼ=aᵢₖbₖⱼ."),
    tr('Add these products for k=1,…,r. The entry becomes exactly the sum from Formula (5). Thus every entry agrees and AB=c₁r₁+⋯+cᵣrᵣ.',"Addera dessa produkter för k=1,…,r. Elementet blir exakt summan från formel (5). Alla element stämmer därför överens och AB=c₁r₁+⋯+cᵣrᵣ.")
  ],'AB = c₁r₁ + c₂r₂ + ⋯ + cᵣrᵣ.');
  teach(q13,33,[
    tr('Each row lists quantities for one month. The price column gives the price of one item of each type, in the same order. A quantity times its price is money spent on that type.',"Varje rad anger antal för en månad. Priskolonnen anger priset på en vara av varje typ i samma ordning. Antalet gånger priset är kostnaden för den typen."),
    tr('For January multiply the matching entries and add: 3·$1 + 4·$2 + 3·$3 = $3+$8+$9 = $20.',"För januari multiplicerar vi motsvarande element och adderar: 3·$1 + 4·$2 + 3·$3 = $3+$8+$9 = $20."),
    tr('Repeat for February: 5·$1+6·$2+0·$3=$17. March: 2·$1+9·$2+4·$3=$32. April: 1·$1+1·$2+7·$3=$24.',"Upprepa för februari: 5·$1+6·$2+0·$3=$17. Mars: 2·$1+9·$2+4·$3=$32. April: 1·$1+1·$2+7·$3=$24."),
    tr('The product has four rows and one column, one dollar total for each month. Its order stays January, February, March, April; it records spending, not the number of items.',"Produkten har fyra rader och en kolonn: en totalsumma i dollar för varje månad. Ordningen är fortfarande januari, februari, mars, april. Den anger utgifter, inte antalet varor.")
  ],tr('The product is ($20, $17, $32, $24)ᵀ: total spending in January, February, March, and April, respectively.',"Produkten är ($20, $17, $32, $24)ᵀ: de totala utgifterna i januari, februari, mars respektive april."));
  teach(q13,35,[
    tr('The trace means adding the main diagonal of a square matrix. Write tr(A)=a₁₁+⋯+aₙₙ and tr(B)=b₁₁+⋯+bₙₙ.',"Spåret innebär att addera huvuddiagonalens element i en kvadratisk matris. Skriv tr(A)=a₁₁+⋯+aₙₙ och tr(B)=b₁₁+⋯+bₙₙ."),
    tr('Matrix addition combines matching positions, so the ith diagonal entry of A+B is aᵢᵢ+bᵢᵢ.',"Matrisaddition kombinerar motsvarande positioner, så diagonalelement i i A+B är aᵢᵢ+bᵢᵢ."),
    tr('Add those diagonal entries: tr(A+B)=(a₁₁+b₁₁)+⋯+(aₙₙ+bₙₙ).',"Addera dessa diagonalelement: tr(A+B)=(a₁₁+b₁₁)+⋯+(aₙₙ+bₙₙ)."),
    tr('Rearrange this finite sum of ordinary numbers to (a₁₁+⋯+aₙₙ)+(b₁₁+⋯+bₙₙ). These are precisely tr(A) and tr(B), proving the identity.',"Ordna om denna ändliga summa av vanliga tal till (a₁₁+⋯+aₙₙ)+(b₁₁+⋯+bₙₙ). Dessa är precis tr(A) och tr(B), vilket bevisar identiteten.")
  ]);
  teach(q13,36,[
    tr('Part a: let A have m rows and n columns, and B have p rows and q columns. Matrix multiplication requires the column count of the left matrix to match the row count of the right matrix.',"Del a: låt A ha m rader och n kolonner, och B ha p rader och q kolonner. Matrismultiplikation kräver att antalet kolonner i den vänstra matrisen är lika med antalet rader i den högra."),
    tr('AB exists, so n=p. BA exists, so q=m. Substitute these equalities: AB has size m × m and BA has size n × n. Each therefore has equally many rows and columns.',"AB existerar, så n=p. BA existerar, så q=m. Sätt in dessa likheter: AB har storleken m × m och BA har storleken n × n. Båda har därför lika många rader som kolonner."),
    tr('Part b: start inside the brackets of A(BA). If B is p × q, the product BA can exist only when q=m, since A is m × n. The product BA then has size p × n.',"Del b: börja inuti parentesen i A(BA). Om B är p × q kan produkten BA existera endast när q=m, eftersom A är m × n. Produkten BA har då storleken p × n."),
    tr('For A times this p × n product to exist, A’s n columns must match its p rows. Hence p=n. With q=m, B has the required size n × m.',"För att A gånger denna p × n-produkt ska existera måste A:s n kolonner motsvara produktens p rader. Alltså är p=n. Med q=m får B den nödvändiga storleken n × m.")
  ]);
  const M=window.EmberAlgebra;
  const show=a=>a.map(row=>'['+row.map(v=>M.format(v)).join(' ')+']').join('\n');
  [[[2,-3],[4,4]],[[3,1],[5,2]],[[2,0],[0,3]],[[6,4],[-2,-1]]].forEach((a,i)=>{
    const [[u,v],[w,z]]=a,det=u*z-v*w,inv=[[z/det,-v/det],[-w/det,u/det]],name='ABCD'[i];
    teach(q14,i+5,[
      tr('An inverse undoes multiplication by the original matrix: ',"En invers upphäver multiplikationen med den ursprungliga matrisen: ")+name+'·'+name+tr('⁻¹ must equal I₂=[1 0; 0 1]. For a 2 × 2 matrix we can use the formula given in the reference.',"⁻¹ måste vara lika med I₂=[1 0; 0 1]. För en 2 × 2-matris kan vi använda formeln i hänvisningen."),
      tr('Read the four entries in row order as a=',"Läs de fyra elementen radvis som a=")+u+', b='+v+', c='+w+', d='+z+tr('. Compute the determinant ad−bc=(',". Beräkna determinanten ad−bc=(")+u+')('+z+')−('+v+')('+w+')='+det+tr('. It is nonzero, so division is allowed and the inverse exists.',". Den är inte noll, så division är tillåten och inversen finns."),
      tr('Swap the diagonal entries a and d. Change the signs of b and c. Before dividing, the matrix is ',"Byt plats på diagonalelementen a och d. Byt tecken på b och c. Före divisionen är matrisen ")+show([[z,-v],[-w,u]])+'.',
      tr('Divide EVERY entry by ',"Dividera VARJE element med ")+det+tr(' to obtain '," för att få ")+show(inv)+tr('. For instance, the top-left entry becomes ',". Exempelvis blir elementet överst till vänster ")+z+'/'+det+'='+M.format(z/det)+'.',
      tr('Check by row-times-column multiplication. The product of the original matrix and this candidate is ',"Kontrollera med rad-gånger-kolonn-multiplikation. Produkten av den ursprungliga matrisen och denna kandidat är ")+show(M.multiply(a,inv))+tr('. Reversing the factors also gives ',". Omvänd faktorordning ger också ")+show(M.multiply(inv,a))+tr(', so this candidate really is the inverse.',", så kandidaten är verkligen inversen.")
    ],name+'⁻¹ =\n'+show(inv));
  });
  teach(q14,10,[
    tr('Use the inverse formula for a 2 × 2 matrix. Here a=d=cos θ, b=sin θ, and c=−sin θ. The angle θ can be any real angle.',"Använd inversformeln för en 2 × 2-matris. Här är a=d=cos θ, b=sin θ och c=−sin θ. Vinkeln θ kan vara vilken reell vinkel som helst."),
    tr('Calculate ad−bc = cos²θ−(sin θ)(−sin θ) = cos²θ+sin²θ = 1. The last equality is the basic trigonometric identity, so the determinant is never zero.',"Beräkna ad−bc = cos²θ−(sin θ)(−sin θ) = cos²θ+sin²θ = 1. Den sista likheten är den grundläggande trigonometriska identiteten, så determinanten är aldrig noll."),
    tr('Swap a and d; they are equal, so the diagonal stays unchanged. Negate b and c, giving top-right −sin θ and bottom-left sin θ. Dividing by 1 changes nothing.',"Byt plats på a och d; de är lika, så diagonalen ändras inte. Byt tecken på b och c för att få −sin θ överst till höger och sin θ nederst till vänster. Division med 1 ändrar ingenting."),
    tr('Check the product: each diagonal entry is cos²θ+sin²θ=1, and each off-diagonal entry cancels to 0. The inverse therefore reverses the original rotation.',"Kontrollera produkten: varje diagonalelement är cos²θ+sin²θ=1, och varje element utanför diagonalen tar ut sig till 0. Inversen upphäver alltså den ursprungliga rotationen.")
  ],tr('Inverse = [cos θ −sin θ; sin θ cos θ].',"Invers = [cos θ −sin θ; sin θ cos θ]."));
  teach(q14,23,[
    tr('Commute means that switching the multiplication order leaves the result unchanged: AB=BA. We must calculate both products because this is not true for matrices in general.',"Att kommutera betyder att resultatet är oförändrat om multiplikationsordningen byts: AB=BA. Vi måste beräkna båda produkterna eftersom detta inte gäller för matriser i allmänhet."),
    tr('Multiply rows of A by columns of B. This gives AB=[0 a; 0 c]. In the other order, BA=[c d; 0 0].',"Multiplicera raderna i A med kolonnerna i B. Detta ger AB=[0 a; 0 c]. I den andra ordningen är BA=[c d; 0 0]."),
    tr('Match the four positions. Top-left gives 0=c; top-right gives a=d; bottom-left gives 0=0; bottom-right repeats c=0.',"Jämför de fyra positionerna. Överst till vänster får vi 0=c; överst till höger a=d; nederst till vänster 0=0; nederst till höger upprepas c=0."),
    tr('No equation restricts a or b. Thus choose any real a,b and set c=0,d=a. Substitution gives AB=BA=[0 a; 0 0], confirming that every such choice works.',"Ingen ekvation begränsar a eller b. Välj därför godtyckliga reella a,b och sätt c=0,d=a. Insättning ger AB=BA=[0 a; 0 0], vilket bekräftar att alla sådana val fungerar.")
  ],tr('All solutions: A=[a b; 0 a], with a and b arbitrary real numbers. Equivalently, c=0 and d=a.',"Alla lösningar: A=[a b; 0 a], där a och b är godtyckliga reella tal. Likvärdigt: c=0 och d=a."));
  teach(q14,24,[
    tr('The matrices commute exactly when AC=CA. Calculate both orders using row-times-column multiplication.',"Matriserna kommuterar precis när AC=CA. Beräkna båda ordningarna med rad-gånger-kolonn-multiplikation."),
    tr('AC=[b 0; d 0], whereas CA=[0 0; a b]. Equal matrices must agree in each of their four positions.',"AC=[b 0; d 0], medan CA=[0 0; a b]. Lika matriser måste stämma överens i alla fyra positioner."),
    tr('Top-left gives b=0, bottom-left gives d=a, bottom-right repeats b=0, and top-right gives the automatic equality 0=0.',"Överst till vänster får vi b=0, nederst till vänster d=a, nederst till höger upprepas b=0 och överst till höger får vi den automatiska likheten 0=0."),
    tr('There is no condition on a or c. Choose them freely, put b=0,d=a, and check: both products become [0 0; a 0].',"Det finns inget villkor på a eller c. Välj dem fritt, sätt b=0,d=a och kontrollera: båda produkterna blir [0 0; a 0].")
  ],tr('All solutions: A=[a 0; c a], with a and c arbitrary real numbers. Equivalently, b=0 and d=a.',"Alla lösningar: A=[a 0; c a], där a och c är godtyckliga reella tal. Likvärdigt: b=0 och d=a."));
  teach(q14,30,[
    tr('A constant in a matrix polynomial means that constant times the identity. Therefore p(A)=A²−9I, p₁(A)=A+3I, and p₂(A)=A−3I.',"En konstant i ett matrispolynom betyder konstanten gånger enhetsmatrisen. Därför är p(A)=A²−9I, p₁(A)=A+3I och p₂(A)=A−3I."),
    tr('Expand (A+3I)(A−3I) by multiplying each term in the first bracket by each term in the second, keeping the order: A²−3AI+3IA−9I².',"Utveckla (A+3I)(A−3I) genom att multiplicera varje term i den första parentesen med varje term i den andra. Behåll ordningen: A²−3AI+3IA−9I²."),
    tr('The identity acts like 1 in multiplication: AI=IA=A and I²=I. Substitute these facts to obtain A²−3A+3A−9I.',"Enhetsmatrisen fungerar som 1 vid multiplikation: AI=IA=A och I²=I. Sätt in detta och få A²−3A+3A−9I."),
    tr('The middle terms cancel because they are opposites of the same matrix. What remains is A²−9I, exactly p(A). This argument works for every square A.',"De mittersta termerna tar ut varandra eftersom de är motsatta multiplar av samma matris. Kvar blir A²−9I, precis p(A). Resonemanget fungerar för varje kvadratisk A.")
  ]);
  teach(q14,31,[
    tr('Part a: choose A=[1 0; 0 0] and B=[0 1; 0 0]. Squaring gives A²=A and B²=0. Their mixed products are AB=B and BA=0, so the order matters.',"Del a: välj A=[1 0; 0 0] och B=[0 1; 0 0]. Kvadrering ger A²=A och B²=0. De blandade produkterna är AB=B och BA=0, så ordningen spelar roll."),
    tr('For this example, (A+B)(A−B)=[1 −1; 0 0], but A²−B²=[1 0; 0 0]. Their top-right entries differ, giving the requested counterexample.',"I detta exempel är (A+B)(A−B)=[1 −1; 0 0], men A²−B²=[1 0; 0 0]. Elementen överst till höger är olika, vilket ger det efterfrågade motexemplet."),
    tr('Part b: expand in order: A·A + A·(−B) + B·A + B·(−B) = A²−AB+BA−B². Do not combine AB with BA unless they are equal.',"Del b: utveckla i rätt ordning: A·A + A·(−B) + B·A + B·(−B) = A²−AB+BA−B². Slå inte ihop AB och BA om de inte är lika."),
    tr('Part c: the extra terms disappear exactly when −AB+BA=0, that is, AB=BA. This condition is called commutativity of these two matrices.',"Del c: de extra termerna försvinner precis när −AB+BA=0, alltså AB=BA. Detta villkor kallas att de två matriserna kommuterar.")
  ],tr('(a) A=[1 0; 0 0], B=[0 1; 0 0] gives unequal products. (b) (A+B)(A−B)=A²−AB+BA−B². (c) Require AB=BA.',"(a) A=[1 0; 0 0], B=[0 1; 0 0] ger olika produkter. (b) (A+B)(A−B)=A²−AB+BA−B². (c) Kräv AB=BA."));
  teach(q14,32,[
    tr('Follow the hint and let A be diagonal: A=diag(r,s,t). This notation means r,s,t on the diagonal and zeros in all other positions.',"Följ ledningen och låt A vara diagonal: A=diag(r,s,t). Notationen betyder r,s,t på diagonalen och noll i alla andra positioner."),
    tr('Squaring a diagonal matrix squares each diagonal entry: A²=diag(r²,s²,t²). To obtain I₃, each of r²,s²,t² must be 1.',"När en diagonalmatris kvadreras kvadreras varje diagonalelement: A²=diag(r²,s²,t²). För att få I₃ måste vart och ett av r²,s²,t² vara 1."),
    tr('Each of r,s,t may independently be +1 or −1. There are 2 choices for the first, 2 for the second, and 2 for the third: 2·2·2=8 matrices.',"Var och en av r,s,t får oberoende vara +1 eller −1. Det finns 2 val för det första, 2 för det andra och 2 för det tredje: 2·2·2=8 matriser."),
    tr('List the eight sign choices shown in the answer. Squaring any one gives diagonal entries 1,1,1 and still-zero off-diagonal entries. These provide eight solutions; the question does not ask us to classify every possible solution.',"Lista de åtta teckenkombinationerna i svaret. Kvadrering av vilken som helst ger diagonalelementen 1,1,1 och fortfarande noll utanför diagonalen. Detta ger åtta lösningar; uppgiften ber oss inte klassificera alla tänkbara lösningar.")
  ],tr('Eight solutions are diag(1,1,1), diag(1,1,−1), diag(1,−1,1), diag(1,−1,−1), diag(−1,1,1), diag(−1,1,−1), diag(−1,−1,1), and diag(−1,−1,−1).',"Åtta lösningar är diag(1,1,1), diag(1,1,−1), diag(1,−1,1), diag(1,−1,−1), diag(−1,1,1), diag(−1,1,−1), diag(−1,−1,1) och diag(−1,−1,−1)."));
  teach(q14,33,[
    tr('Part a: an inverse is a matrix X for which AX=XA=I. Start from A²+2A+I=0 and move I to the right: A²+2A=−I.',"Del a: en invers är en matris X för vilken AX=XA=I. Börja med A²+2A+I=0 och flytta I till höger: A²+2A=−I."),
    tr('Multiply by −1: −A²−2A=I. Factor A out to get A(−A−2I)=I. Factoring it on the other side also gives (−A−2I)A=I because IA=AI=A.',"Multiplicera med −1: −A²−2A=I. Bryt ut A och få A(−A−2I)=I. Utbrytning på andra sidan ger också (−A−2I)A=I eftersom IA=AI=A."),
    tr('Therefore the candidate −A−2I is the inverse. We established both defining products without first assuming that an inverse exists.',"Därför är kandidaten −A−2I inversen. Vi har visat båda produkterna i definitionen utan att först anta att en invers finns."),
    tr('Part b: write p(A)=a₀I+a₁A+a₂A²+⋯+aₘAᵐ=0, with a₀≠0. Separate the constant: A(a₁I+a₂A+⋯+aₘAᵐ⁻¹)=−a₀I.',"Del b: skriv p(A)=a₀I+a₁A+a₂A²+⋯+aₘAᵐ=0, där a₀≠0. Separera konstanten: A(a₁I+a₂A+⋯+aₘAᵐ⁻¹)=−a₀I."),
    tr('Divide by the nonzero number −a₀. The matrix X=−(1/a₀)(a₁I+a₂A+⋯+aₘAᵐ⁻¹) then satisfies AX=I.',"Dividera med talet −a₀, som inte är noll. Matrisen X=−(1/a₀)(a₁I+a₂A+⋯+aₘAᵐ⁻¹) uppfyller då AX=I."),
    tr('Every term in X is a power of A or a multiple of I, so AX=XA. Hence XA=I as well. This proves invertibility and gives an explicit inverse.',"Varje term i X är en potens av A eller en multipel av I, så AX=XA. Därför är även XA=I. Detta bevisar inverterbarheten och ger en explicit invers.")
  ],tr('(a) A⁻¹=−A−2I. (b) If p(x)=a₀+a₁x+⋯+aₘxᵐ and a₀≠0, then A⁻¹=−(1/a₀)(a₁I+a₂A+⋯+aₘAᵐ⁻¹).',"(a) A⁻¹=−A−2I. (b) Om p(x)=a₀+a₁x+⋯+aₘxᵐ och a₀≠0, så är A⁻¹=−(1/a₀)(a₁I+a₂A+⋯+aₘAᵐ⁻¹)."));
  teach(q14,34,[
    tr('To be invertible, A needs a matrix that multiplies it to I in both orders. We are told that multiplying three copies of A gives I.',"För att vara inverterbar behöver A en matris som multiplicerad med A ger I i båda ordningarna. Vi vet att tre kopior av A multiplicerade med varandra ger I."),
    tr('Group the three copies as A(A²). This shows A·A²=I, so A² is already a candidate for the inverse.',"Gruppera de tre kopiorna som A(A²). Detta visar A·A²=I, så A² är redan en kandidat till inversen."),
    tr('Group them instead as (A²)A. This gives A²·A=I as well. The candidate passes both checks.',"Gruppera dem i stället som (A²)A. Då får vi också A²·A=I. Kandidaten klarar båda kontrollerna."),
    tr('Consequently A³=I forces A to be invertible, with A⁻¹=A². The situation asked about is impossible.',"Alltså tvingar A³=I matrisen A att vara inverterbar, med A⁻¹=A². Situationen som frågan beskriver är omöjlig.")
  ]);
  teach(q14,35,[
    tr('Suppose an inverse B existed. Then both AB and BA would have to equal the identity, whose diagonal entries are all 1.',"Anta att en invers B finns. Då måste både AB och BA vara lika med enhetsmatrisen, vars diagonalelement alla är 1."),
    tr('If A has a zero row, the matching row of AB is zero: every row-times-column calculation contains only 0 times another entry.',"Om A har en nollrad är motsvarande rad i AB noll: varje rad-gånger-kolonn-beräkning innehåller bara 0 gånger ett annat element."),
    tr('A zero row cannot be a row of the identity because each identity row has a 1. Thus a zero row makes AB=I impossible.',"En nollrad kan inte vara en rad i enhetsmatrisen eftersom varje sådan rad har en 1:a. En nollrad gör alltså AB=I omöjligt."),
    tr('If instead A has a zero column, examine BA. That column of BA is B times the zero column, hence zero. Every identity column has a 1, so BA=I is impossible too.',"Om A i stället har en nollkolonn undersöker vi BA. Den kolonnen i BA är B gånger nollkolonnen och blir därför noll. Varje kolonn i enhetsmatrisen har en 1:a, så även BA=I är omöjligt.")
  ],tr('No. A zero row prevents AB=I; a zero column prevents BA=I.',"Nej. En nollrad förhindrar AB=I; en nollkolonn förhindrar BA=I."));
  teach(q14,36,[
    tr('An inverse B must produce both AB=I and BA=I. Compare what multiplication does to repeated rows or columns.',"En invers B måste ge både AB=I och BA=I. Jämför vad multiplikation gör med upprepade rader eller kolonner."),
    tr('If rows i and j of A are identical, multiplying either by each column of B gives the same numbers. Therefore rows i and j of AB remain identical.',"Om raderna i och j i A är identiska ger multiplikation av dem med varje kolonn i B samma tal. Raderna i och j i AB förblir därför identiska."),
    tr('Different rows of I are never identical: their 1s are in different positions. Thus AB cannot be I when A has two equal rows.',"Olika rader i I är aldrig identiska: deras 1:or står på olika platser. AB kan alltså inte vara I när A har två lika rader."),
    tr('If columns i and j of A are identical, B times either column gives the same result, so columns i and j of BA are identical. Different columns of I have their 1s in different positions. Therefore this case also prevents an inverse.',"Om kolonnerna i och j i A är identiska ger B gånger dem samma resultat, så kolonnerna i och j i BA är identiska. Olika kolonner i I har sina 1:or på olika platser. Därför förhindrar även detta fall en invers.")
  ],tr('No. Repeated rows or columns remain repeated in the appropriate product, whereas the identity has no repeated rows or columns.',"Nej. Upprepade rader eller kolonner förblir upprepade i motsvarande produkt, medan enhetsmatrisen inte har några upprepade rader eller kolonner."));
  teach(q14,39,[
    tr('Use (XY)⁻¹=Y⁻¹X⁻¹. It reverses the order because the inverse must undo the last factor first. Thus (AB)⁻¹=B⁻¹A⁻¹ and (D⁻¹C⁻¹)⁻¹=CD.',"Använd (XY)⁻¹=Y⁻¹X⁻¹. Ordningen vänds eftersom inversen först måste upphäva den sista faktorn. Alltså är (AB)⁻¹=B⁻¹A⁻¹ och (D⁻¹C⁻¹)⁻¹=CD."),
    tr('Substitute without changing any other order: B⁻¹A⁻¹AC⁻¹CDD⁻¹.',"Sätt in detta utan att ändra någon annan ordning: B⁻¹A⁻¹AC⁻¹CDD⁻¹."),
    tr('The adjacent A⁻¹A equals I, leaving B⁻¹C⁻¹CDD⁻¹. Next the adjacent C⁻¹C equals I, leaving B⁻¹DD⁻¹.',"De intilliggande A⁻¹A ger I och lämnar B⁻¹C⁻¹CDD⁻¹. Därefter ger de intilliggande C⁻¹C värdet I och lämnar B⁻¹DD⁻¹."),
    tr('Finally DD⁻¹=I, so the result is B⁻¹. All cancellations used neighboring inverse pairs; no unlicensed factor swaps were needed.',"Slutligen är DD⁻¹=I, så resultatet blir B⁻¹. Alla förkortningar använde intilliggande inverspar; vi behövde inte byta plats på faktorer utan stöd.")
  ]);
  teach(q14,40,[
    tr('Call AC⁻¹ by the shorter name X. The expression is X⁻¹XX⁻¹AD⁻¹. This makes the first adjacent inverse pair easy to identify.',"Ge AC⁻¹ det kortare namnet X. Uttrycket är X⁻¹XX⁻¹AD⁻¹. Då blir det första intilliggande inversparet lätt att hitta."),
    tr('Cancel X⁻¹X=I. What remains is X⁻¹AD⁻¹=(AC⁻¹)⁻¹AD⁻¹.',"Förkorta X⁻¹X=I. Kvar blir X⁻¹AD⁻¹=(AC⁻¹)⁻¹AD⁻¹."),
    tr('Reverse the factor order when taking the inverse: (AC⁻¹)⁻¹=CA⁻¹. Substitute to obtain CA⁻¹AD⁻¹.',"Vänd faktorordningen när inversen bildas: (AC⁻¹)⁻¹=CA⁻¹. Sätt in detta och få CA⁻¹AD⁻¹."),
    tr('Cancel the adjacent A⁻¹A=I. The remaining product is CD⁻¹, in that order.',"Förkorta de intilliggande A⁻¹A=I. Produkten som återstår är CD⁻¹, i den ordningen.")
  ]);
  teach(q14,41,[
    tr('Write R=(r₁,…,rₙ) and C=(c₁,…,cₙ)ᵀ. Their product RC has size 1 × 1, so we identify it with its single numerical entry.',"Skriv R=(r₁,…,rₙ) och C=(c₁,…,cₙ)ᵀ. Produkten RC har storleken 1 × 1, så vi identifierar den med sitt enda talvärde."),
    tr('Row-times-column multiplication gives RC=r₁c₁+⋯+rₙcₙ.',"Rad-gånger-kolonn-multiplikation ger RC=r₁c₁+⋯+rₙcₙ."),
    tr('In the other order, CR has size n × n. Its diagonal entry in position (i,i) is cᵢrᵢ. The trace adds these diagonal entries: tr(CR)=c₁r₁+⋯+cₙrₙ.',"I den andra ordningen har CR storleken n × n. Diagonalelementet på position (i,i) är cᵢrᵢ. Spåret adderar dessa diagonalelement: tr(CR)=c₁r₁+⋯+cₙrₙ."),
    tr('Ordinary real numbers commute: cᵢrᵢ=rᵢcᵢ. Thus the two sums are identical, proving the claimed equality.',"Vanliga reella tal kommuterar: cᵢrᵢ=rᵢcᵢ. De två summorna är därför identiska, vilket bevisar den påstådda likheten.")
  ]);
  teach(q14,42,[
    tr('A positive integer power Aⁿ means a product of n copies of A. For instance A³=AAA.',"En positiv heltalspotens Aⁿ betyder en produkt av n kopior av A. Exempelvis är A³=AAA."),
    tr('Transposing a product reverses the factor order and transposes each factor: (AB)ᵀ=BᵀAᵀ. For three copies this gives (AAA)ᵀ=AᵀAᵀAᵀ.',"Transponering av en produkt vänder faktorordningen och transponerar varje faktor: (AB)ᵀ=BᵀAᵀ. För tre kopior ger detta (AAA)ᵀ=AᵀAᵀAᵀ."),
    tr('Apply the same rule repeatedly to n copies. The order reverses, but every factor is the same A, so the result is still n copies of Aᵀ.',"Använd samma regel upprepade gånger på n kopior. Ordningen vänds, men varje faktor är samma A, så resultatet är fortfarande n kopior av Aᵀ."),
    tr('A product of n copies of Aᵀ is exactly (Aᵀ)ⁿ. Hence the statement is true for every positive integer n.',"En produkt av n kopior av Aᵀ är precis (Aᵀ)ⁿ. Påståendet gäller alltså för varje positivt heltal n.")
  ]);
  teach(q14,43,[
    tr('Part a: multiply both sides of AB=AC on the LEFT by A⁻¹. This is allowed because A is assumed invertible, and using the same operation preserves equality.',"Del a: multiplicera båda sidor av AB=AC från VÄNSTER med A⁻¹. Detta är tillåtet eftersom A antas vara inverterbar, och samma operation på båda sidor bevarar likheten."),
    tr('Regroup to get (A⁻¹A)B=(A⁻¹A)C. Since A⁻¹A=I, this becomes IB=IC and then B=C.',"Gruppera om till (A⁻¹A)B=(A⁻¹A)C. Eftersom A⁻¹A=I blir detta IB=IC och sedan B=C."),
    tr('Part b: Example 3 uses A=[0 1; 0 2]. Its determinant is 0·2−1·0=0, so it is not invertible.',"Del b: exempel 3 använder A=[0 1; 0 2]. Determinanten är 0·2−1·0=0, så matrisen är inte inverterbar."),
    tr('The proof in part a cannot be applied to that example because there is no A⁻¹. Indeed its different B and C give the same product [3 4; 6 8]. The example and the theorem have different assumptions, so they are consistent.',"Beviset i del a kan inte användas på det exemplet eftersom A⁻¹ inte finns. Dess olika B och C ger faktiskt samma produkt [3 4; 6 8]. Exemplet och satsen bygger på olika antaganden och är därför förenliga.")
  ],tr('(a) B=C when A is invertible. (b) The common factor A in Example 3 is not invertible, so part (a) does not apply.',"(a) B=C när A är inverterbar. (b) Den gemensamma faktorn A i exempel 3 är inte inverterbar, så del (a) kan inte tillämpas."));
  teach(q14,44,[
    tr('Split all integer exponents into three cases: positive, zero, and negative. This is necessary because negative powers involve an inverse.',"Dela upp alla heltalsexponenter i tre fall: positiva, noll och negativa. Detta behövs eftersom negativa potenser innehåller en invers."),
    tr('If n>0, expand (kA)ⁿ as n factors (kA). Scalars may be moved past matrices, so collect the n copies of k to obtain kⁿ and the n copies of A to obtain Aⁿ.',"Om n>0 utvecklar vi (kA)ⁿ som n faktorer (kA). Skalärer får flyttas förbi matriser, så samla de n kopiorna av k till kⁿ och de n kopiorna av A till Aⁿ."),
    tr('If n=0, the left side is I, and the right side is k⁰A⁰=1·I=I.',"Om n=0 är vänsterledet I, och högerledet är k⁰A⁰=1·I=I."),
    tr('If n<0, put m=−n>0. Since k≠0 and A is invertible, (kA)⁻¹=k⁻¹A⁻¹: multiplying these in either order gives I.',"Om n<0 sätter vi m=−n>0. Eftersom k≠0 och A är inverterbar gäller (kA)⁻¹=k⁻¹A⁻¹: multiplikation i vilken ordning som helst ger I."),
    tr('Now (kA)ⁿ=[(kA)⁻¹]ᵐ=(k⁻¹A⁻¹)ᵐ=k⁻ᵐA⁻ᵐ=kⁿAⁿ. The positive-power result was applied to the inverse, so all integer cases are covered.',"Nu är (kA)ⁿ=[(kA)⁻¹]ᵐ=(k⁻¹A⁻¹)ᵐ=k⁻ᵐA⁻ᵐ=kⁿAⁿ. Resultatet för positiva potenser användes på inversen, så alla heltalsfall är behandlade.")
  ]);
  teach(q14,45,[
    tr('Part a: distribute in A(A⁻¹+B⁻¹)B while preserving factor order: AA⁻¹B+AB⁻¹B.',"Del a: använd distributiva lagen i A(A⁻¹+B⁻¹)B och behåll faktorordningen: AA⁻¹B+AB⁻¹B."),
    tr('Cancel the neighboring inverse pairs. The first term becomes B and the second becomes A, so this part of the product is A+B.',"Förkorta de intilliggande inversparen. Den första termen blir B och den andra A, så denna del av produkten är A+B."),
    tr('Multiplying by the remaining (A+B)⁻¹ gives (A+B)(A+B)⁻¹=I. This proves part a.',"Multiplikation med den återstående (A+B)⁻¹ ger (A+B)(A+B)⁻¹=I. Detta bevisar del a."),
    tr('Part b: to expose an inverse for the sum, factor it as A⁻¹+B⁻¹=A⁻¹(A+B)B⁻¹. Expanding the right side confirms the equality.',"Del b: synliggör en invers till summan genom faktoriseringen A⁻¹+B⁻¹=A⁻¹(A+B)B⁻¹. Utveckling av högerledet bekräftar likheten."),
    tr('All three factors are invertible by the assumptions. Reverse them and invert each: the inverse of A⁻¹(A+B)B⁻¹ is B(A+B)⁻¹A. Thus the sum of these two inverses is invertible under the stated assumptions.',"Alla tre faktorerna är inverterbara enligt antagandena. Vänd ordningen och invertera varje faktor: inversen till A⁻¹(A+B)B⁻¹ är B(A+B)⁻¹A. Summan av dessa två inverser är alltså inverterbar under de angivna antagandena.")
  ]);
  teach(q14,46,[
    tr('Idempotent means that doing the same matrix operation twice has the same result as doing it once: A²=A. Use this given equality whenever A² appears.',"Idempotent betyder att samma matrisoperation två gånger ger samma resultat som en gång: A²=A. Använd denna givna likhet när A² dyker upp."),
    tr('Part a: expand (I−A)²=I²−IA−AI+A². Since I²=I and IA=AI=A, this is I−2A+A².',"Del a: utveckla (I−A)²=I²−IA−AI+A². Eftersom I²=I och IA=AI=A är detta I−2A+A²."),
    tr('Replace A² by A to obtain I−A. Therefore (I−A)²=I−A, precisely the definition of idempotence for I−A.',"Ersätt A² med A för att få I−A. Alltså är (I−A)²=I−A, precis definitionen av idempotens för I−A."),
    tr('Part b: expand (2A−I)²=4A²−2AI−2IA+I²=4A²−4A+I. Again substitute A²=A to get I.',"Del b: utveckla (2A−I)²=4A²−2AI−2IA+I²=4A²−4A+I. Sätt åter in A²=A och få I."),
    tr('A matrix whose square is I multiplies itself to the identity in both orders. It therefore has an inverse, and that inverse is itself.',"En matris vars kvadrat är I ger enhetsmatrisen när den multipliceras med sig själv i båda ordningarna. Den har därför en invers, och inversen är matrisen själv.")
  ]);
  teach(q14,47,[
    tr('To prove that I−A is invertible, test the suggested matrix S=I+A+A²+⋯+Aᵏ⁻¹. It contains k terms, ending one power before the known zero power Aᵏ.',"För att visa att I−A är inverterbar testar vi den föreslagna matrisen S=I+A+A²+⋯+Aᵏ⁻¹. Den innehåller k termer och slutar en potens före den kända nollpotensen Aᵏ."),
    tr('Multiply (I−A)S by distributing: S−AS. The first sum is I+A+⋯+Aᵏ⁻¹. The second is A+A²+⋯+Aᵏ.',"Utveckla (I−A)S med distributiva lagen: S−AS. Den första summan är I+A+⋯+Aᵏ⁻¹. Den andra är A+A²+⋯+Aᵏ."),
    tr('Subtract. Every middle power occurs once with a plus sign and once with a minus sign, so all cancel. The result is I−Aᵏ=I because Aᵏ=0.',"Subtrahera. Varje mellanliggande potens förekommer en gång med plustecken och en gång med minustecken, så alla tar ut varandra. Resultatet är I−Aᵏ=I eftersom Aᵏ=0."),
    tr('Check the other order too: S(I−A)=S−SA gives exactly the same cancellation because each term in S is a power of A. Thus both products equal I, proving S=(I−A)⁻¹. When k=1, the sum is just I, which also works.',"Kontrollera också den andra ordningen: S(I−A)=S−SA ger exakt samma förkortning eftersom varje term i S är en potens av A. Båda produkterna är alltså I, vilket bevisar S=(I−A)⁻¹. När k=1 är summan bara I, vilket också fungerar.")
  ]);
  teach(q14,48,[
    tr('Compute the square by row-times-column multiplication: A²=[a²+bc, ab+bd; ac+cd, bc+d²]. For example, the upper-left entry is a·a+b·c.',"Beräkna kvadraten med rad-gånger-kolonn-multiplikation: A²=[a²+bc, ab+bd; ac+cd, bc+d²]. Exempelvis är elementet överst till vänster a·a+b·c."),
    tr('Multiply every entry of A by a+d: (a+d)A=[a²+ad, ab+bd; ac+cd, ad+d²].',"Multiplicera varje element i A med a+d: (a+d)A=[a²+ad, ab+bd; ac+cd, ad+d²]."),
    tr('Subtract matching entries. Both off-diagonal entries become zero; each diagonal becomes bc−ad. Hence A²−(a+d)A=(bc−ad)I.',"Subtrahera motsvarande element. Båda elementen utanför diagonalen blir noll; båda diagonalelementen blir bc−ad. Alltså är A²−(a+d)A=(bc−ad)I."),
    tr('Add (ad−bc)I. Its diagonal entries are the opposites of the remaining diagonal entries, so all four positions become zero. The required identity is proved.',"Addera (ad−bc)I. Dess diagonalelement är motsatserna till de återstående diagonalelementen, så alla fyra positionerna blir noll. Den efterfrågade identiteten är bevisad.")
  ]);
  teach(q14,49,[
    tr('Group the known factors around D. Let L=CᵀB⁻¹A²BAC⁻¹ and R=A⁻²BᵀC⁻². Then the equation is LDR=Cᵀ. This grouping helps us isolate the unknown without changing factor order.',"Gruppera de kända faktorerna runt D. Låt L=CᵀB⁻¹A²BAC⁻¹ och R=A⁻²BᵀC⁻². Då är ekvationen LDR=Cᵀ. Grupperingen hjälper oss att isolera den obekanta utan att ändra faktorordningen."),
    tr('Multiply on the left by L⁻¹ and on the right by R⁻¹. The neighboring pairs cancel, giving D=L⁻¹CᵀR⁻¹. Matrix division is performed this way because multiplying on the wrong side would generally give a different result.',"Multiplicera från vänster med L⁻¹ och från höger med R⁻¹. De intilliggande paren tar ut varandra och ger D=L⁻¹CᵀR⁻¹. Division med matriser görs på detta sätt eftersom multiplikation på fel sida i allmänhet skulle ge ett annat resultat."),
    tr('Invert L by reversing all its factors: L⁻¹=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹. Similarly, R⁻¹=C²(Bᵀ)⁻¹A².',"Invertera L genom att vända ordningen på alla faktorer: L⁻¹=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹. På samma sätt är R⁻¹=C²(Bᵀ)⁻¹A²."),
    tr('Substitute both expressions: D=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹CᵀC²(Bᵀ)⁻¹A². Cancel only the neighboring (Cᵀ)⁻¹Cᵀ pair.',"Sätt in båda uttrycken: D=CA⁻¹B⁻¹A⁻²B(Cᵀ)⁻¹CᵀC²(Bᵀ)⁻¹A². Förkorta endast det intilliggande paret (Cᵀ)⁻¹Cᵀ."),
    tr('This leaves CA⁻¹B⁻¹A⁻²BC²(Bᵀ)⁻¹A². To check, insert D=L⁻¹CᵀR⁻¹ into LDR; the product becomes LL⁻¹CᵀR⁻¹R=Cᵀ, exactly the original right side.',"Kvar blir CA⁻¹B⁻¹A⁻²BC²(Bᵀ)⁻¹A². Kontrollera genom att sätta in D=L⁻¹CᵀR⁻¹ i LDR; produkten blir LL⁻¹CᵀR⁻¹R=Cᵀ, exakt det ursprungliga högerledet.")
  ]);
  teach(q14,50,[
    tr('Group the equation as LDR=ABᵀ with L=ABCᵀ and R=BAᵀC. Keep the order within each group.',"Gruppera ekvationen som LDR=ABᵀ med L=ABCᵀ och R=BAᵀC. Behåll ordningen inom varje grupp."),
    tr('Multiply by L⁻¹ on the left and R⁻¹ on the right, giving D=L⁻¹ABᵀR⁻¹. These are allowed because all given matrices are invertible.',"Multiplicera med L⁻¹ från vänster och R⁻¹ från höger för att få D=L⁻¹ABᵀR⁻¹. Detta är tillåtet eftersom alla givna matriser är inverterbara."),
    tr('Reverse the factor order inside each inverse: L⁻¹=(Cᵀ)⁻¹B⁻¹A⁻¹ and R⁻¹=C⁻¹(Aᵀ)⁻¹B⁻¹.',"Vänd faktorordningen inom varje invers: L⁻¹=(Cᵀ)⁻¹B⁻¹A⁻¹ och R⁻¹=C⁻¹(Aᵀ)⁻¹B⁻¹."),
    tr('Substitute and cancel the adjacent A⁻¹A. The remaining product is (Cᵀ)⁻¹B⁻¹BᵀC⁻¹(Aᵀ)⁻¹B⁻¹. B⁻¹Bᵀ cannot generally be cancelled, since Bᵀ is not necessarily B.',"Sätt in och förkorta de intilliggande A⁻¹A. Produkten som återstår är (Cᵀ)⁻¹B⁻¹BᵀC⁻¹(Aᵀ)⁻¹B⁻¹. B⁻¹Bᵀ kan i allmänhet inte förkortas eftersom Bᵀ inte nödvändigtvis är B."),
    tr('Check using the grouped expression: L(L⁻¹ABᵀR⁻¹)R=ABᵀ. This verifies the proposed D without assuming that any nonadjacent factors commute.',"Kontrollera med det grupperade uttrycket: L(L⁻¹ABᵀR⁻¹)R=ABᵀ. Detta verifierar det föreslagna D utan att anta att några icke intilliggande faktorer kommuterar.")
  ]);
  teach(q14,51,[
    tr('Matrix equality means that every pair of matching entries is equal. Choose any row i and column j of A and B; these matrices must have the same size for addition.',"Matrislikhet betyder att varje par av motsvarande element är lika. Välj valfri rad i och kolonn j i A och B; matriserna måste ha samma storlek för att kunna adderas."),
    tr('By the definition of addition, the (i,j) entry of A+B is aᵢⱼ+bᵢⱼ.',"Enligt definitionen av addition är element (i,j) i A+B lika med aᵢⱼ+bᵢⱼ."),
    tr('The same entry of B+A is bᵢⱼ+aᵢⱼ. Ordinary real-number addition is commutative, so this equals aᵢⱼ+bᵢⱼ.',"Samma element i B+A är bᵢⱼ+aᵢⱼ. Vanlig addition av reella tal är kommutativ, så detta är lika med aᵢⱼ+bᵢⱼ."),
    tr('The argument works at every position, so every entry agrees. Therefore A+B=B+A.',"Resonemanget fungerar i varje position, så alla element stämmer överens. Därför är A+B=B+A.")
  ]);
  teach(q14,52,[
    tr('Assume A,B,C have the same size. We will compare one arbitrary entry, because equal entries at every position prove that two matrices are equal.',"Anta att A,B,C har samma storlek. Vi jämför ett godtyckligt element, eftersom lika element i varje position visar att två matriser är lika."),
    tr('At position (i,j), A+(B+C) contains aᵢⱼ+(bᵢⱼ+cᵢⱼ): first add the B and C entries, then add the A entry.',"På position (i,j) innehåller A+(B+C) värdet aᵢⱼ+(bᵢⱼ+cᵢⱼ): addera först elementen i B och C och sedan elementet i A."),
    tr('At the same position, (A+B)+C contains (aᵢⱼ+bᵢⱼ)+cᵢⱼ. These are the same three ordinary numbers with different brackets.',"På samma position innehåller (A+B)+C värdet (aᵢⱼ+bᵢⱼ)+cᵢⱼ. Detta är samma tre vanliga tal med olika parenteser."),
    tr('Real-number addition is associative, so both grouped sums are equal. Since i,j were arbitrary, A+(B+C)=(A+B)+C.',"Addition av reella tal är associativ, så de båda grupperade summorna är lika. Eftersom i,j var godtyckliga gäller A+(B+C)=(A+B)+C.")
  ]);
  teach(q14,53,[
    tr('Let A be m × r, and let B,C both be r × n. These sizes ensure that B−C and all the products in the statement exist.',"Låt A vara m × r och låt både B,C vara r × n. Dessa storlekar garanterar att B−C och alla produkter i påståendet existerar."),
    tr('The (i,j) entry of A(B−C) is aᵢ₁(b₁ⱼ−c₁ⱼ)+⋯+aᵢᵣ(bᵣⱼ−cᵣⱼ). This is the row-times-column rule.',"Element (i,j) i A(B−C) är aᵢ₁(b₁ⱼ−c₁ⱼ)+⋯+aᵢᵣ(bᵣⱼ−cᵣⱼ). Detta följer av regeln rad gånger kolonn."),
    tr('Distribute each ordinary numerical multiplication over its subtraction. For example aᵢ₁(b₁ⱼ−c₁ⱼ)=aᵢ₁b₁ⱼ−aᵢ₁c₁ⱼ.',"Använd distributiva lagen på varje vanlig talmultiplikation över subtraktionen. Exempelvis är aᵢ₁(b₁ⱼ−c₁ⱼ)=aᵢ₁b₁ⱼ−aᵢ₁c₁ⱼ."),
    tr('Collect all the b terms and all the c terms: (aᵢ₁b₁ⱼ+⋯+aᵢᵣbᵣⱼ)−(aᵢ₁c₁ⱼ+⋯+aᵢᵣcᵣⱼ). These are exactly the (i,j) entries of AB and AC.',"Samla alla termer med b och alla med c: (aᵢ₁b₁ⱼ+⋯+aᵢᵣbᵣⱼ)−(aᵢ₁c₁ⱼ+⋯+aᵢᵣcᵣⱼ). Detta är exakt elementen (i,j) i AB respektive AC."),
    tr('Thus every entry of A(B−C) equals the matching entry of AB−AC. This proves the rule for matrices of every compatible size.',"Varje element i A(B−C) är alltså lika med motsvarande element i AB−AC. Detta bevisar regeln för matriser av alla storlekar som passar ihop.")
  ]);
  teach(q14,54,[
    tr('Let A be m × r, B be r × s, and C be s × n. Both groupings produce an m × n matrix. We prove equality by comparing an arbitrary entry (i,j).',"Låt A vara m × r, B vara r × s och C vara s × n. Båda grupperingarna ger en m × n-matris. Vi bevisar likheten genom att jämföra ett godtyckligt element (i,j)."),
    tr('First calculate BC. Its entry (k,j) is Σₗ₌₁ˢ bₖₗcₗⱼ. The symbol Σ means add the listed terms over the stated index range.',"Beräkna först BC. Dess element (k,j) är Σₗ₌₁ˢ bₖₗcₗⱼ. Symbolen Σ betyder att de angivna termerna ska adderas över det angivna indexintervallet."),
    tr('Multiplying by A on the left gives (A(BC))ᵢⱼ=Σₖ₌₁ʳ Σₗ₌₁ˢ aᵢₖbₖₗcₗⱼ. This adds one term for every pair (k,l).',"Multiplikation med A från vänster ger (A(BC))ᵢⱼ=Σₖ₌₁ʳ Σₗ₌₁ˢ aᵢₖbₖₗcₗⱼ. Detta adderar en term för varje par (k,l)."),
    tr('For the other grouping, (AB)ᵢₗ=Σₖ₌₁ʳ aᵢₖbₖₗ. Multiplying by C gives ((AB)C)ᵢⱼ=Σₗ₌₁ˢ Σₖ₌₁ʳ aᵢₖbₖₗcₗⱼ.',"För den andra grupperingen är (AB)ᵢₗ=Σₖ₌₁ʳ aᵢₖbₖₗ. Multiplikation med C ger ((AB)C)ᵢⱼ=Σₗ₌₁ˢ Σₖ₌₁ʳ aᵢₖbₖₗcₗⱼ."),
    tr('The two expressions contain exactly the same finite collection of real-number products; they only add them in a different order. Finite addition may be regrouped, so the entries agree. Therefore A(BC)=(AB)C.',"De två uttrycken innehåller exakt samma ändliga samling produkter av reella tal; de adderas bara i olika ordning. Ändlig addition får grupperas om, så elementen stämmer överens. Därför är A(BC)=(AB)C.")
  ]);
  teach(q14,55,[
    tr('The negative matrix −A has entries −aᵢⱼ. Matrix subtraction is defined as adding this negative matrix, so A−A=A+(−A).',"Den negativa matrisen −A har elementen −aᵢⱼ. Matrissubtraktion definieras som addition av denna negativa matris, så A−A=A+(−A)."),
    tr('Choose any position (i,j). At this position the sum is aᵢⱼ+(−aᵢⱼ).',"Välj valfri position (i,j). På denna position är summan aᵢⱼ+(−aᵢⱼ)."),
    tr('A real number plus its opposite is zero. Thus every entry of the sum is zero, whatever the original entries of A were.',"Ett reellt tal plus sitt motsatta tal är noll. Alla element i summan blir därför noll, oavsett vilka element A ursprungligen hade."),
    tr('A matrix whose entries are all zero is the zero matrix of that size. Hence A−A=A+(−A)=0.',"En matris vars alla element är noll är nollmatrisen av den storleken. Alltså är A−A=A+(−A)=0.")
  ]);
  teach(q14,56,[
    tr('Use a zero matrix with exactly the same size as A, so subtraction is defined.',"Använd en nollmatris med exakt samma storlek som A, så att subtraktionen är definierad."),
    tr('At each position (i,j), subtract the entry of the zero matrix from the entry of A. This gives aᵢⱼ−0.',"På varje position (i,j) subtraherar vi nollmatrisens element från A:s element. Detta ger aᵢⱼ−0."),
    tr('Subtracting zero leaves an ordinary number unchanged, so the result at that position is aᵢⱼ.',"Att subtrahera noll lämnar ett vanligt tal oförändrat, så resultatet på den positionen är aᵢⱼ."),
    tr('Every position agrees with A, which proves A−0=A.',"Varje position stämmer överens med A, vilket bevisar A−0=A.")
  ]);
  teach(q14,57,[
    tr('A transpose swaps row and column indices: the entry (i,j) of Aᵀ is aⱼᵢ. Scalar multiplication multiplies every entry by the number k.',"Transponering byter radindex och kolonnindex: element (i,j) i Aᵀ är aⱼᵢ. Skalärmultiplikation multiplicerar varje element med talet k."),
    tr('On the left, first multiply A by k and then transpose. The entry (i,j) of (kA)ᵀ is the old entry (j,i) of kA, namely kaⱼᵢ.',"I vänsterledet multiplicerar vi först A med k och transponerar sedan. Element (i,j) i (kA)ᵀ är det tidigare elementet (j,i) i kA, alltså kaⱼᵢ."),
    tr('On the right, first transpose A and then multiply by k. The entry (i,j) of kAᵀ is again kaⱼᵢ.',"I högerledet transponerar vi först A och multiplicerar sedan med k. Element (i,j) i kAᵀ är återigen kaⱼᵢ."),
    tr('Both matrices have the same size and the same entry at every position, so (kA)ᵀ=kAᵀ.',"Båda matriserna har samma storlek och samma element i varje position, så (kA)ᵀ=kAᵀ.")
  ]);
  teach(q14,58,[
    tr('Let A be m × r and B be r × n. Then (AB)ᵀ is n × m. BᵀAᵀ is also n × m, so the sizes agree; reversing the order is essential.',"Låt A vara m × r och B vara r × n. Då är (AB)ᵀ en n × m-matris. Även BᵀAᵀ är n × m, så storlekarna stämmer; det är avgörande att vända ordningen."),
    tr('The entry (i,j) of (AB)ᵀ is entry (j,i) of AB. By the multiplication rule, it is aⱼ₁b₁ᵢ+⋯+aⱼᵣbᵣᵢ.',"Element (i,j) i (AB)ᵀ är element (j,i) i AB. Enligt multiplikationsregeln är det aⱼ₁b₁ᵢ+⋯+aⱼᵣbᵣᵢ."),
    tr('In BᵀAᵀ, row i of Bᵀ has entries b₁ᵢ,…,bᵣᵢ, while column j of Aᵀ has entries aⱼ₁,…,aⱼᵣ. Their dot product is b₁ᵢaⱼ₁+⋯+bᵣᵢaⱼᵣ.',"I BᵀAᵀ har rad i i Bᵀ elementen b₁ᵢ,…,bᵣᵢ, medan kolonn j i Aᵀ har elementen aⱼ₁,…,aⱼᵣ. Deras skalärprodukt är b₁ᵢaⱼ₁+⋯+bᵣᵢaⱼᵣ."),
    tr('Each pair of ordinary scalar factors can be reversed: bₖᵢaⱼₖ=aⱼₖbₖᵢ. Thus both entry sums agree. This proves (AB)ᵀ=BᵀAᵀ; it does not assume that whole matrices commute.',"Varje par av vanliga skalära faktorer får byta ordning: bₖᵢaⱼₖ=aⱼₖbₖᵢ. De båda elementsummorna stämmer därför överens. Detta bevisar (AB)ᵀ=BᵀAᵀ; det förutsätter inte att hela matriser kommuterar.")
  ]);
  teach(q14,'TF',[
    tr('(a) False. Inverses multiply to I, not to 0. For example I·I=I, although I is its own inverse.',"(a) Falskt. Inverser multipliceras till I, inte till 0. Exempelvis är I·I=I, trots att I är sin egen invers."),
    tr('(b) False. Expanding gives A²+AB+BA+B². Take A=[1 0; 0 0], B=[0 1; 0 0]. Then AB=B and BA=0, so (A+B)²=A+B while the proposed expression is A+2B.',"(b) Falskt. Utveckling ger A²+AB+BA+B². Välj A=[1 0; 0 0], B=[0 1; 0 0]. Då är AB=B och BA=0, så (A+B)²=A+B medan det föreslagna uttrycket är A+2B."),
    tr('(c) False. Expansion gives (A−B)(A+B)=A²+AB−BA−B². For the matrices in (b), this is A+B but A²−B²=A.',"(c) Falskt. Utveckling ger (A−B)(A+B)=A²+AB−BA−B². För matriserna i (b) är detta A+B, men A²−B²=A."),
    tr('(d) False. AB is invertible, but the general rule is (AB)⁻¹=B⁻¹A⁻¹. For a counterexample to the printed order, take A=[1 1; 0 1], B=[2 0; 0 1]. Then (AB)⁻¹=[1/2 −1/2; 0 1], whereas A⁻¹B⁻¹=[1/2 −1; 0 1].',"(d) Falskt. AB är inverterbar, men den allmänna regeln är (AB)⁻¹=B⁻¹A⁻¹. Som motexempel till den tryckta ordningen väljer vi A=[1 1; 0 1], B=[2 0; 0 1]. Då är (AB)⁻¹=[1/2 −1/2; 0 1], medan A⁻¹B⁻¹=[1/2 −1; 0 1]."),
    tr('(e) False. The correct rule is (AB)ᵀ=BᵀAᵀ. For the matrices in (b), (AB)ᵀ=Bᵀ is nonzero but AᵀBᵀ=0.',"(e) Falskt. Den korrekta regeln är (AB)ᵀ=BᵀAᵀ. För matriserna i (b) är (AB)ᵀ=Bᵀ skild från noll, men AᵀBᵀ=0."),
    tr('(f) True. The 2 × 2 inverse formula divides by ad−bc. When this is nonzero, multiplying the resulting matrix by A gives I; when it is zero, A is singular and has no inverse.',"(f) Sant. Inversformeln för en 2 × 2-matris dividerar med ad−bc. När detta tal inte är noll ger den resulterande matrisen multiplicerad med A värdet I. När talet är noll är A singulär och saknar invers."),
    tr('(g) True. At position (i,j), both sides contain kaⱼᵢ+bⱼᵢ. Transposing only changes where each entry is placed.',"(g) Sant. På position (i,j) innehåller båda sidorna kaⱼᵢ+bⱼᵢ. Transponering ändrar bara var varje element placeras."),
    tr('(h) True. Transpose AA⁻¹=I and A⁻¹A=I. These identities show that (A⁻¹)ᵀ is an inverse for Aᵀ.',"(h) Sant. Transponera AA⁻¹=I och A⁻¹A=I. Dessa identiteter visar att (A⁻¹)ᵀ är en invers till Aᵀ."),
    tr('(i) False as a matrix statement. Every power of I equals I, and the constant term is a₀I. Thus p(I)=(a₀+a₁+⋯+aₘ)I. The printed right side omits the identity factor.',"(i) Falskt som matrispåstående. Varje potens av I är I, och konstanttermen är a₀I. Alltså är p(I)=(a₀+a₁+⋯+aₘ)I. Det tryckta högerledet saknar enhetsmatrisen som faktor."),
    tr('(j) True. A zero row stays zero in AX; a zero column stays zero in XA. Neither product can be the identity in the required case, since each identity row and column has a 1.',"(j) Sant. En nollrad förblir noll i AX; en nollkolonn förblir noll i XA. Ingen av produkterna kan vara enhetsmatrisen i respektive fall eftersom varje rad och kolonn i enhetsmatrisen har en 1:a."),
    tr('(k) False. I and −I both have inverses, but I+(−I)=0, and the zero matrix is not invertible.',"(k) Falskt. Både I och −I har inverser, men I+(−I)=0, och nollmatrisen är inte inverterbar.")
  ]);
  teach(q14,'T2',[
    tr('Part a: compute small powers to look for a pattern. A²=[a² 2a; 0 a²] and A³=[a³ 3a²; 0 a³]. The diagonal is a power of a, and the upper-right entry appears to be n·aⁿ⁻¹.',"Del a: beräkna små potenser för att hitta ett mönster. A²=[a² 2a; 0 a²] och A³=[a³ 3a²; 0 a³]. Diagonalen är en potens av a, och elementet överst till höger verkar vara n·aⁿ⁻¹."),
    tr('For a≠0, test the candidate [aⁿ,naⁿ⁻¹;0,aⁿ]. Multiplying it by A gives diagonal aⁿ⁺¹ and upper-right aⁿ+naⁿ=(n+1)aⁿ. This is exactly the same formula with n replaced by n+1.',"För a≠0 testar vi kandidaten [aⁿ,naⁿ⁻¹;0,aⁿ]. Multiplikation med A ger diagonalen aⁿ⁺¹ och elementet överst till höger aⁿ+naⁿ=(n+1)aⁿ. Detta är exakt samma formel med n ersatt av n+1."),
    tr('The candidate works at n=1, and the multiplication proves that each next power follows. If a=0, handle the small case directly: A=[0 1;0 0], A²=0, and every higher positive power is zero. This avoids ambiguous 0⁰ notation.',"Kandidaten stämmer för n=1, och multiplikationen visar att varje följande potens stämmer. Om a=0 behandlar vi specialfallet direkt: A=[0 1;0 0], A²=0 och alla högre positiva potenser är noll. Då undviker vi den tvetydiga notationen 0⁰."),
    tr('Part b: multiply A by itself. The diagonal is cos²θ−sin²θ=cos(2θ), and the upper-right is 2sinθcosθ=sin(2θ); the lower-left is its negative.',"Del b: multiplicera A med sig själv. Diagonalen är cos²θ−sin²θ=cos(2θ), och elementet överst till höger är 2sinθcosθ=sin(2θ); elementet nederst till vänster är dess negativa värde."),
    tr('These are the entries of the same rotation with angle 2θ. More generally, the angle-addition identities turn multiplication of the nθ matrix by the θ matrix into the (n+1)θ matrix. Since the formula starts correctly at n=1, it holds for every positive integer n.',"Detta är elementen i samma rotation med vinkeln 2θ. Mer allmänt gör additionsformlerna för vinklar att multiplikation av nθ-matrisen med θ-matrisen ger (n+1)θ-matrisen. Eftersom formeln stämmer från början vid n=1 gäller den för varje positivt heltal n.")
  ]);
  teach(q14,'T3',[
    tr('First check the statement as printed. It has F₀ in the bottom-right position for every n. But Q²=[2 1; 1 1], whose bottom-right entry is 1, while F₀=0. Therefore the printed formula cannot be confirmed for all n.',"Kontrollera först det tryckta påståendet. Där står F₀ nederst till höger för varje n. Men Q²=[2 1; 1 1], vars nedre högra element är 1, medan F₀=0. Den tryckta formeln kan därför inte bekräftas för alla n."),
    tr('The corrected bottom-right entry is Fₙ₋₁. We will prove Qⁿ=[Fₙ₊₁ Fₙ; Fₙ Fₙ₋₁] for positive integers n. This correction preserves the useful Fibonacci pattern.',"Det korrigerade elementet nederst till höger är Fₙ₋₁. Vi ska bevisa Qⁿ=[Fₙ₊₁ Fₙ; Fₙ Fₙ₋₁] för positiva heltal n. Korrigeringen bevarar det användbara Fibonaccimönstret."),
    tr('Start at n=1. Since F₂=1, F₁=1, and F₀=0, the formula gives [1 1;1 0], exactly Q.',"Börja vid n=1. Eftersom F₂=1, F₁=1 och F₀=0 ger formeln [1 1;1 0], precis Q."),
    tr('Assume the corrected formula holds for some n. Multiply that matrix on the right by Q=[1 1;1 0]. Its new first column is the sum of its two old columns; its new second column is its old first column.',"Anta att den korrigerade formeln gäller för något n. Multiplicera matrisen från höger med Q=[1 1;1 0]. Dess nya första kolonn är summan av de två gamla kolonnerna; den nya andra kolonnen är den gamla första kolonnen."),
    tr('The new matrix is [Fₙ₊₁+Fₙ, Fₙ₊₁; Fₙ+Fₙ₋₁, Fₙ]. By the Fibonacci rule, the two sums are Fₙ₊₂ and Fₙ₊₁.',"Den nya matrisen är [Fₙ₊₁+Fₙ, Fₙ₊₁; Fₙ+Fₙ₋₁, Fₙ]. Enligt Fibonacciregeln är de två summorna Fₙ₊₂ och Fₙ₊₁."),
    tr('Thus Qⁿ⁺¹=[Fₙ₊₂ Fₙ₊₁;Fₙ₊₁ Fₙ], which is the corrected formula at n+1. Starting from n=1 and repeating this implication proves every positive integer case.',"Alltså är Qⁿ⁺¹=[Fₙ₊₂ Fₙ₊₁;Fₙ₊₁ Fₙ], vilket är den korrigerade formeln vid n+1. Genom att börja vid n=1 och upprepa denna slutsats bevisas varje positivt heltalsfall.")
  ],tr('As printed, the formula is false for n≥2. The corrected identity is Qⁿ=[Fₙ₊₁ Fₙ; Fₙ Fₙ₋₁] for every positive integer n.',"Som den är tryckt är formeln falsk för n≥2. Den korrigerade identiteten är Qⁿ=[Fₙ₊₁ Fₙ; Fₙ Fₙ₋₁] för varje positivt heltal n."));
  teach(q13,30,[
    tr('Part a asks whether a nonzero matrix can become zero when squared. Try A=[0 1;0 0], which is nonzero because its upper-right entry is 1.',"Del a frågar om en matris som inte är noll kan bli noll när den kvadreras. Prova A=[0 1;0 0], som inte är noll eftersom elementet överst till höger är 1."),
    tr('Multiply explicitly: A²=[0·0+1·0, 0·1+1·0; 0·0+0·0, 0·1+0·0]=[0 0;0 0]. Thus the answer to part a is yes.',"Multiplicera uttryckligen: A²=[0·0+1·0, 0·1+1·0; 0·0+0·0, 0·1+0·0]=[0 0;0 0]. Svaret på del a är alltså ja."),
    tr('Part b asks for a nonzero matrix whose square stays the same. Try A=[1 0;0 0]. Multiplying gives A²=[1 0;0 0]=A.',"Del b efterfrågar en matris som inte är noll och vars kvadrat är oförändrad. Prova A=[1 0;0 0]. Multiplikation ger A²=[1 0;0 0]=A."),
    tr('As a check using a general input, the first example sends (x,y) to (y,0), then to (0,0). The second sends (x,y) to (x,0), and doing it again leaves (x,0). These actions explain the different squaring results.',"Kontrollera med allmänna indata: det första exemplet skickar (x,y) till (y,0) och sedan till (0,0). Det andra skickar (x,y) till (x,0), och en upprepning lämnar (x,0) oförändrad. Detta förklarar de olika resultaten vid kvadrering.")
  ]);
  teach(q13,32,[
    tr('There are four rows and four columns, numbered 1 through 4. For each position substitute its row number for i and its column number for j.',"Det finns fyra rader och fyra kolonner, numrerade 1 till 4. Sätt i varje position in radnumret för i och kolonnnumret för j."),
    tr('Part a: in row 1 the entries are 1+1,1+2,1+3,1+4, giving 2,3,4,5. Row 2 gives 3,4,5,6; row 3 gives 4,5,6,7; row 4 gives 5,6,7,8.',"Del a: i rad 1 är elementen 1+1,1+2,1+3,1+4, vilket ger 2,3,4,5. Rad 2 ger 3,4,5,6; rad 3 ger 4,5,6,7; rad 4 ger 5,6,7,8."),
    tr('Part b: the exponent j−1 runs through 0,1,2,3 across each row. Hence row i is (1,i,i²,i³). Substituting i=1,2,3,4 gives (1,1,1,1), (1,2,4,8), (1,3,9,27), and (1,4,16,64).',"Del b: exponenten j−1 går genom 0,1,2,3 längs varje rad. Rad i är alltså (1,i,i²,i³). Insättning av i=1,2,3,4 ger (1,1,1,1), (1,2,4,8), (1,3,9,27) och (1,4,16,64)."),
    tr('Part c: compute the distance |i−j| between the two indices. Put −1 when the distance is 0 or 1, and put 1 otherwise. For example (1,2) has distance 1 and gives −1, while (1,3) has distance 2 and gives 1. Apply this to all sixteen positions.',"Del c: beräkna avståndet |i−j| mellan de två indexen. Sätt −1 när avståndet är 0 eller 1, annars 1. Exempelvis har (1,2) avståndet 1 och ger −1, medan (1,3) har avståndet 2 och ger 1. Gör detta i alla sexton positioner.")
  ]);
  teach(q13,'TF',[
    tr('(a) True under this textbook’s convention: it defines a main diagonal for square matrices, and this one is 2 × 3. Some other texts also call the positions (1,1),(2,2),… a diagonal of a rectangular matrix; the answer here follows the supplied book’s definition.',"(a) Sant enligt denna läroboks konvention: den definierar en huvuddiagonal för kvadratiska matriser, och denna matris är 2 × 3. Vissa andra böcker kallar även positionerna (1,1),(2,2),… för en diagonal i en rektangulär matris. Svaret här följer den uppladdade bokens definition."),
    tr('(b) False. In m × n, m counts rows and n counts columns. There are m row vectors and n column vectors, the reverse of the statement.',"(b) Falskt. I m × n anger m antalet rader och n antalet kolonner. Det finns m radvektorer och n kolonnvektorer, alltså tvärtom mot påståendet."),
    tr('(c) False. For A=[1 0;0 0] and B=[0 1;0 0], AB=B but BA=0. Therefore the order of matrix multiplication can change its result.',"(c) Falskt. För A=[1 0;0 0] och B=[0 1;0 0] är AB=B men BA=0. Ordningen vid matrismultiplikation kan alltså ändra resultatet."),
    tr('(d) False. The correct row rule is row i of AB = (row i of A)·B. The suggested product A times a row of B may not even have compatible dimensions.',"(d) Falskt. Den korrekta radregeln är rad i i AB = (rad i i A)·B. Den föreslagna produkten A gånger en rad i B behöver inte ens ha förenliga dimensioner."),
    tr('(e) True. Transposition moves entry (i,j) to (j,i); doing it again moves that entry back to (i,j). Every entry returns to its original position.',"(e) Sant. Transponering flyttar element (i,j) till (j,i). En upprepning flyttar tillbaka elementet till (i,j). Alla element återgår till sina ursprungliga positioner."),
    tr('(f) False. Let A=B=I₂. Then tr(AB)=tr(I₂)=2, whereas tr(A)tr(B)=2·2=4.',"(f) Falskt. Låt A=B=I₂. Då är tr(AB)=tr(I₂)=2, medan tr(A)tr(B)=2·2=4."),
    tr('(g) False. A transpose reverses factor order: (AB)ᵀ=BᵀAᵀ. For the matrices in (c), (AB)ᵀ=Bᵀ is nonzero, but AᵀBᵀ=0.',"(g) Falskt. Transponering vänder faktorordningen: (AB)ᵀ=BᵀAᵀ. För matriserna i (c) är (AB)ᵀ=Bᵀ skild från noll, men AᵀBᵀ=0."),
    tr('(h) True. Diagonal positions (i,i) do not move when transposed. Their sum, the trace, therefore stays the same.',"(h) Sant. Diagonalpositionerna (i,i) flyttas inte vid transponering. Deras summa, spåret, är därför oförändrad."),
    tr('(i) True. Aᵀ has size 4 × 6. Bᵀ must have 4 columns to multiply it and 2 rows to produce a 2 × 6 result. Thus Bᵀ is 2 × 4 and B is 4 × 2: m=4,n=2.',"(i) Sant. Aᵀ har storleken 4 × 6. Bᵀ måste ha 4 kolonner för att kunna multipliceras med Aᵀ och 2 rader för att ge ett 2 × 6-resultat. Alltså är Bᵀ 2 × 4 och B är 4 × 2: m=4,n=2."),
    tr('(j) True. The diagonal of cA consists of ca₁₁,…,caₙₙ. Adding and factoring out c gives c(a₁₁+⋯+aₙₙ)=c tr(A).',"(j) Sant. Diagonalen i cA består av ca₁₁,…,caₙₙ. Addition och utbrytning av c ger c(a₁₁+⋯+aₙₙ)=c tr(A)."),
    tr('(k) True. Add C to both sides, entry by entry. Then A−C+C=B−C+C reduces to A=B.',"(k) Sant. Addera C på båda sidor, element för element. Då förenklas A−C+C=B−C+C till A=B."),
    tr('(l) False. Take C=0, A=I, and B=0. Both AC and BC are zero even though A≠B. Cancelling a matrix factor requires an appropriate inverse.',"(l) Falskt. Välj C=0, A=I och B=0. Både AC och BC är noll trots att A≠B. Att förkorta en matrisfaktor kräver en lämplig invers."),
    tr('(m) True. If A is m × n, the existence of both AB and BA forces B to be n × m. Their sizes are m × m and n × n. Adding them requires equal sizes, so m=n and both factors are square of the same size.',"(m) Sant. Om A är m × n tvingar existensen av både AB och BA matrisen B att vara n × m. Produkterna har storlekarna m × m och n × n. Addition kräver samma storlek, så m=n och båda faktorerna är kvadratiska av samma storlek."),
    tr('(n) True. The zero column of B is multiplied by A to form the corresponding column of AB. Every term contains a zero, so that column remains zero.',"(n) Sant. Nollkolonnen i B multipliceras med A och bildar motsvarande kolonn i AB. Varje term innehåller en nolla, så kolonnen förblir noll."),
    tr('(o) False. Take B=[1 0;0 0] and A=[1 1;0 1]. B has a zero second column, but BA=[1 1;0 0] has no zero column. Here B is on the left, so the column rule from (n) does not apply.',"(o) Falskt. Välj B=[1 0;0 0] och A=[1 1;0 1]. B har en andra kolonn som är noll, men BA=[1 1;0 0] saknar nollkolonn. Här står B till vänster, så kolonnregeln i (n) gäller inte.")
  ]);
  {
    const old=existing('1.3','T1');
    q13.T1.answer=tr('(a) AB=[12 27 30 13;8 −4 26 12], agreeing with Example 5.\n(b) The column-row expansion gives the same matrix:\n',"(a) AB=[12 27 30 13;8 −4 26 12], vilket stämmer med exempel 5.\n(b) Kolonn–rad-utvecklingen ger samma matris:\n")+old.answer;
    q13.T1.steps=[...old.steps,tr('Check the result by ordinary row-times-column multiplication: the top-left entry is 1·4+2·0+4·2=12, and the bottom-right is 2·3+6·1+0·2=12. The complete product [12 27 30 13;8 −4 26 12] agrees with the book’s Example 5.',"Kontrollera resultatet med vanlig rad-gånger-kolonn-multiplikation: elementet överst till vänster är 1·4+2·0+4·2=12, och nederst till höger är det 2·3+6·1+0·2=12. Hela produkten [12 27 30 13;8 −4 26 12] stämmer med bokens exempel 5.")];
  }
  teach(q14,11,[
    tr('Compute the left side first. Aᵀ=[2 4;−3 4]. Its determinant is 2·4−4(−3)=20.',"Beräkna vänsterledet först. Aᵀ=[2 4;−3 4]. Dess determinant är 2·4−4(−3)=20."),
    tr('Apply the 2 × 2 inverse formula to Aᵀ: swap its diagonal entries, negate its off-diagonal entries, and divide by 20. This gives (Aᵀ)⁻¹=[1/5 −1/5;3/20 1/10].',"Använd inversformeln för 2 × 2-matriser på Aᵀ: byt plats på diagonalelementen, byt tecken på elementen utanför diagonalen och dividera med 20. Detta ger (Aᵀ)⁻¹=[1/5 −1/5;3/20 1/10]."),
    tr('Now compute the right side independently. A⁻¹=(1/20)[4 3;−4 2]=[1/5 3/20;−1/5 1/10]. Turn its rows into columns.',"Beräkna nu högerledet oberoende. A⁻¹=(1/20)[4 3;−4 2]=[1/5 3/20;−1/5 1/10]. Gör dess rader till kolonner."),
    tr('The result is (A⁻¹)ᵀ=[1/5 −1/5;3/20 1/10]. Every entry matches the left side, verifying the equation for the given A.',"Resultatet är (A⁻¹)ᵀ=[1/5 −1/5;3/20 1/10]. Alla element stämmer med vänsterledet, vilket verifierar ekvationen för den givna A.")
  ],'(Aᵀ)⁻¹=(A⁻¹)ᵀ=[1/5 −1/5;3/20 1/10].');
  teach(q14,12,[
    tr('First calculate A⁻¹. The determinant of A is 2·4−(−3)·4=20, so A⁻¹=[1/5 3/20;−1/5 1/10].',"Beräkna först A⁻¹. Determinanten av A är 2·4−(−3)·4=20, så A⁻¹=[1/5 3/20;−1/5 1/10]."),
    tr('To invert this new matrix, compute its determinant: (1/5)(1/10)−(3/20)(−1/5)=1/50+3/100=1/20.',"För att invertera den nya matrisen beräknar vi dess determinant: (1/5)(1/10)−(3/20)(−1/5)=1/50+3/100=1/20."),
    tr('Swap its diagonal entries and negate the off-diagonal entries, then divide by 1/20. Dividing by 1/20 means multiplying by 20, giving 20[1/10 −3/20;1/5 1/5]=[2 −3;4 4].',"Byt plats på diagonalelementen och byt tecken på elementen utanför diagonalen. Dividera sedan med 1/20. Att dividera med 1/20 betyder att multiplicera med 20, vilket ger 20[1/10 −3/20;1/5 1/5]=[2 −3;4 4]."),
    tr('This is exactly the original matrix A. Thus the numerical calculation confirms that taking an inverse twice restores A.',"Detta är exakt den ursprungliga matrisen A. Den numeriska beräkningen bekräftar alltså att två inverteringar återger A.")
  ],'(A⁻¹)⁻¹=[2 −3;4 4]=A.');
  teach(q14,13,[
    tr('Compute the product inside the left inverse. First AB=[−9 −4;32 12]. Multiplying by C=diag(2,3) scales its first column by 2 and its second by 3, giving ABC=[−18 −12;64 36].',"Beräkna produkten inuti inversen i vänsterledet. Först är AB=[−9 −4;32 12]. Multiplikation med C=diag(2,3) skalar första kolonnen med 2 och andra kolonnen med 3 och ger ABC=[−18 −12;64 36]."),
    tr('Its determinant is (−18)·36−(−12)·64=120. The inverse formula therefore gives (ABC)⁻¹=(1/120)[36 12;−64 −18]=[3/10 1/10;−8/15 −3/20].',"Dess determinant är (−18)·36−(−12)·64=120. Inversformeln ger därför (ABC)⁻¹=(1/120)[36 12;−64 −18]=[3/10 1/10;−8/15 −3/20]."),
    tr('Compute the separate inverses: C⁻¹=[1/2 0;0 1/3], B⁻¹=[2 −1;−5 3], and A⁻¹=[1/5 3/20;−1/5 1/10].',"Beräkna de separata inverserna: C⁻¹=[1/2 0;0 1/3], B⁻¹=[2 −1;−5 3] och A⁻¹=[1/5 3/20;−1/5 1/10]."),
    tr('Multiply in the stated reversed order. First C⁻¹B⁻¹=[1 −1/2;−5/3 1]. Multiplying this by A⁻¹ gives [3/10 1/10;−8/15 −3/20].',"Multiplicera i den angivna omvända ordningen. Först är C⁻¹B⁻¹=[1 −1/2;−5/3 1]. Multiplikation med A⁻¹ ger sedan [3/10 1/10;−8/15 −3/20]."),
    tr('The matrices from the two sides are identical. As an entry check, the right-hand product’s upper-left entry is 1·(1/5)+(−1/2)(−1/5)=3/10.',"Matriserna från de båda sidorna är identiska. Som elementkontroll är högerledsproduktens övre vänstra element 1·(1/5)+(−1/2)(−1/5)=3/10.")
  ],'(ABC)⁻¹=C⁻¹B⁻¹A⁻¹=[3/10 1/10;−8/15 −3/20].');
  teach(q14,14,[
    tr('Calculate AB=[−9 −4;32 12], then ABC=[−18 −12;64 36]. Transpose this product by turning rows into columns: (ABC)ᵀ=[−18 64;−12 36].',"Beräkna AB=[−9 −4;32 12] och sedan ABC=[−18 −12;64 36]. Transponera produkten genom att göra raderna till kolonner: (ABC)ᵀ=[−18 64;−12 36]."),
    tr('Separately transpose each factor: Cᵀ=[2 0;0 3], Bᵀ=[3 5;1 2], and Aᵀ=[2 4;−3 4]. The stated right side uses these in reverse order.',"Transponera varje faktor separat: Cᵀ=[2 0;0 3], Bᵀ=[3 5;1 2] och Aᵀ=[2 4;−3 4]. Det angivna högerledet använder dessa i omvänd ordning."),
    tr('Multiply CᵀBᵀ=[6 10;3 6]. Then multiply by Aᵀ: [6·2+10(−3),6·4+10·4;3·2+6(−3),3·4+6·4]=[−18 64;−12 36].',"Multiplicera CᵀBᵀ=[6 10;3 6]. Multiplicera sedan med Aᵀ: [6·2+10(−3),6·4+10·4;3·2+6(−3),3·4+6·4]=[−18 64;−12 36]."),
    tr('Both sides give the same four entries, so the transpose identity is verified for the supplied matrices.',"Båda sidorna ger samma fyra element, så identiteten för transponering är verifierad för de givna matriserna.")
  ],'(ABC)ᵀ=CᵀBᵀAᵀ=[−18 64;−12 36].');
  teach(q14,29,[
    tr('A constant in a matrix polynomial multiplies the identity. Thus p(A)=A²−9I, p₁(A)=A+3I, and p₂(A)=A−3I.',"En konstant i ett matrispolynom multiplicerar enhetsmatrisen. Alltså är p(A)=A²−9I, p₁(A)=A+3I och p₂(A)=A−3I."),
    tr('Compute A²=[11 4;8 3]. Subtracting 9I changes the diagonal only: p(A)=[2 4;8 −6].',"Beräkna A²=[11 4;8 3]. Subtraktion av 9I ändrar bara diagonalen: p(A)=[2 4;8 −6]."),
    tr('For the other side, A+3I=[6 1;2 4] and A−3I=[0 1;2 −2]. Multiply these matrices using rows and columns.',"För den andra sidan är A+3I=[6 1;2 4] och A−3I=[0 1;2 −2]. Multiplicera dessa matriser med hjälp av rader och kolonner."),
    tr('Their product is [6·0+1·2,6·1+1(−2);2·0+4·2,2·1+4(−2)]=[2 4;8 −6]. Every entry agrees with p(A), as required.',"Produkten är [6·0+1·2,6·1+1(−2);2·0+4·2,2·1+4(−2)]=[2 4;8 −6]. Alla element stämmer med p(A), som vi skulle visa.")
  ],'p(A)=p₁(A)p₂(A)=[2 4;8 −6].');
  teach(q14,37,[
    tr('Write one unknown column of X as (u,v,w)ᵀ and the matching column of I as (p,q,r)ᵀ. From AX=I the row equations are u+w=p, u+v=q, v+w=r.',"Skriv en obekant kolonn i X som (u,v,w)ᵀ och motsvarande kolonn i I som (p,q,r)ᵀ. Från AX=I får vi radekvationerna u+w=p, u+v=q, v+w=r."),
    tr('Add the first two equations and subtract the third. This cancels v,w and gives 2u=p+q−r. Therefore u=(p+q−r)/2, v=q−u=(−p+q+r)/2, and w=p−u=(p−q+r)/2.',"Addera de två första ekvationerna och subtrahera den tredje. Då försvinner v,w och vi får 2u=p+q−r. Därför är u=(p+q−r)/2, v=q−u=(−p+q+r)/2 och w=p−u=(p−q+r)/2."),
    tr('For the first identity column (p,q,r)=(1,0,0), obtain (u,v,w)=(1/2,−1/2,1/2). For the second, (0,1,0), obtain (1/2,1/2,−1/2). For the third, (0,0,1), obtain (−1/2,1/2,1/2).',"För enhetsmatrisens första kolonn (p,q,r)=(1,0,0) får vi (u,v,w)=(1/2,−1/2,1/2). För den andra, (0,1,0), får vi (1/2,1/2,−1/2). För den tredje, (0,0,1), får vi (−1/2,1/2,1/2)."),
    tr('Place these answers as columns, not rows: X=(1/2)[1 1 −1;−1 1 1;1 −1 1]. Each column was chosen to produce the corresponding identity column, so AX=I.',"Placera dessa svar som kolonner, inte rader: X=(1/2)[1 1 −1;−1 1 1;1 −1 1]. Varje kolonn valdes för att ge motsvarande kolonn i enhetsmatrisen, så AX=I."),
    tr('Multiplication in the other order also gives XA=I. Thus the constructed X is the inverse and A is invertible.',"Multiplikation i den andra ordningen ger också XA=I. Den konstruerade X är alltså inversen, och A är inverterbar.")
  ],tr('A is invertible, with A⁻¹=(1/2)[1 1 −1;−1 1 1;1 −1 1].',"A är inverterbar med A⁻¹=(1/2)[1 1 −1;−1 1 1;1 −1 1]."));
  teach(q14,38,[
    tr('Compare the rows of A: row 1=(1,1,1), row 2=(1,0,0), row 3=(0,1,1). The first is the sum of the other two.',"Jämför raderna i A: rad 1=(1,1,1), rad 2=(1,0,0), rad 3=(0,1,1). Den första är summan av de två andra."),
    tr('Multiplying by any X preserves this relation. Each row of AX is the same combination of rows of X specified by its row of A, so row 1 of AX must equal row 2 plus row 3.',"Multiplikation med valfri X bevarar sambandet. Varje rad i AX är den kombination av X:s rader som anges av motsvarande rad i A. Rad 1 i AX måste alltså vara lika med rad 2 plus rad 3."),
    tr('For the identity I₃, row 1 is (1,0,0), but row 2 plus row 3 is (0,1,1). These are unequal.',"I enhetsmatrisen I₃ är rad 1 lika med (1,0,0), men rad 2 plus rad 3 är (0,1,1). Dessa är olika."),
    tr('Therefore no X can satisfy AX=I₃. By the definition of an inverse, A is not invertible.',"Alltså kan ingen X uppfylla AX=I₃. Enligt definitionen av en invers är A inte inverterbar.")
  ]);
  {
    const a=[[0,1/2,1/3],[1/4,0,1/5],[1/6,1/7,0]],a2=M.multiply(a,a),a3=M.multiply(a2,a);
    teach(q14,'T1',[
      tr('Compute sample powers to investigate: A²=',"Beräkna några potenser för att undersöka: A²=")+show(a2)+tr(' and A³='," och A³=")+show(a3)+tr('. Numerical samples suggest a limiting behavior, but we need a bound to establish what happens to all later powers.',". Numeriska exempel antyder ett gränsbeteende, men vi behöver en gräns för att fastställa vad som händer med alla senare potenser."),
      tr('All entries are nonnegative. Add each row of A: the totals are 5/6, 9/20, and 13/42. Thus every row sum is at most 5/6, a number smaller than 1.',"Alla element är icke-negativa. Addera varje rad i A: summorna är 5/6, 9/20 och 13/42. Varje radsumma är alltså högst 5/6, ett tal mindre än 1."),
      tr('Suppose all row sums of Aᵏ are at most (5/6)ᵏ. A row sum of Aᵏ⁺¹=AᵏA is obtained by weighting the row sums of A with a row of Aᵏ. Because these weights are nonnegative, it is at most (5/6) times that row sum of Aᵏ.',"Anta att alla radsummor i Aᵏ är högst (5/6)ᵏ. En radsumma i Aᵏ⁺¹=AᵏA bildas genom att vikta radsummorna i A med en rad i Aᵏ. Eftersom vikterna är icke-negativa är den högst (5/6) gånger denna radsumma i Aᵏ."),
      tr('Therefore all row sums of Aᵏ⁺¹ are at most (5/6)ᵏ⁺¹. Starting from the first power and repeating this argument proves the bound for every positive integer k.',"Därför är alla radsummor i Aᵏ⁺¹ högst (5/6)ᵏ⁺¹. Genom att börja med första potensen och upprepa resonemanget bevisas gränsen för varje positivt heltal k."),
      tr('Each entry lies between 0 and its row sum, hence between 0 and (5/6)ᵏ. Repeatedly multiplying by 5/6 makes this upper bound tend to 0. Consequently every matrix entry tends to 0, so Aᵏ approaches the zero matrix.',"Varje element ligger mellan 0 och sin radsumma, alltså mellan 0 och (5/6)ᵏ. Upprepad multiplikation med 5/6 gör att denna övre gräns går mot 0. Alla matriselement går därför mot 0, så Aᵏ närmar sig nollmatrisen.")
    ],tr('As k → ∞, Aᵏ approaches the 3 × 3 zero matrix; every entry tends to zero.',"När k → ∞ närmar sig Aᵏ nollmatrisen av storlek 3 × 3; varje element går mot noll."));
  }
  put(q13,'T2',tr(`Suppose that a manufacturer uses Type I items at $1.35 each, Type II items at $2.15 each, and Type III items at $3.95 each. Suppose also that the accompanying table describes the purchases of those items (in thousands of units) for the first quarter of the year. Find a matrix product, the computation of which produces a matrix that lists the manufacturer’s expenditure in each month of the first quarter. Compute that product.
Table: columns Type I, Type II, Type III; quantities in thousands of units.
Jan.: 3.1, 4.2, 3.5
Feb.: 5.1, 6.8, 0
Mar.: 2.2, 9.5, 4.0
Apr.: 1.0, 1.0, 7.4`,"Anta att en tillverkare använder varor av typ I för $1.35 styck, typ II för $2.15 styck och typ III för $3.95 styck. Anta också att tabellen beskriver inköpen av dessa varor (i tusental) under årets första kvartal. Bestäm en matrisprodukt vars beräkning ger en matris som anger tillverkarens utgifter under varje månad i första kvartalet. Beräkna produkten.\nTabell: kolonnerna Typ I, Typ II, Typ III; antal i tusental.\nJan.: 3.1, 4.2, 3.5\nFeb.: 5.1, 6.8, 0\nMar.: 2.2, 9.5, 4.0\nApr.: 1.0, 1.0, 7.4"),{
    title:tr('Convert quantities and prices into monthly spending',"Omvandla antal och priser till månatliga utgifter"),
    reference:tr('The question continues on printed page 40. The printed prompt asks for the first quarter (January–March), but its table also includes April. The solution identifies this inconsistency and reports both the requested quarter and the extra printed row.',"Frågan fortsätter på tryckt sida 40. Den tryckta frågan efterfrågar första kvartalet (januari–mars), men tabellen innehåller även april. Lösningen påpekar denna inkonsekvens och redovisar både det efterfrågade kvartalet och den extra tryckta raden."),
    steps:[
      tr('Choose rows for months and columns for item types. For the first quarter, the quantity matrix is P=[3.1 4.2 3.5;5.1 6.8 0;2.2 9.5 4.0]. The price column is c=(1.35,2.15,3.95)ᵀ, ordered by the same item types.',"Välj rader för månader och kolonner för varutyper. För första kvartalet är antalsmatrisen P=[3.1 4.2 3.5;5.1 6.8 0;2.2 9.5 4.0]. Priskolonnen är c=(1.35,2.15,3.95)ᵀ, ordnad efter samma varutyper."),
      tr('P has size 3 × 3 and c has size 3 × 1, so Pc is a 3 × 1 column: one total per month. Each entry multiplies quantities by their corresponding prices and adds the three costs.',"P har storleken 3 × 3 och c har storleken 3 × 1, så Pc är en 3 × 1-kolonn: en totalsumma per månad. Varje element multiplicerar antalen med motsvarande priser och adderar de tre kostnaderna."),
      tr('January: 3.1·1.35+4.2·2.15+3.5·3.95=4.185+9.030+13.825=27.040. February: 5.1·1.35+6.8·2.15+0·3.95=6.885+14.620+0=21.505.',"Januari: 3.1·1.35+4.2·2.15+3.5·3.95=4.185+9.030+13.825=27.040. Februari: 5.1·1.35+6.8·2.15+0·3.95=6.885+14.620+0=21.505."),
      tr('March: 2.2·1.35+9.5·2.15+4.0·3.95=2.970+20.425+15.800=39.195. Since the quantities are in thousands of units, these totals are in thousands of dollars. Multiply by 1000 to obtain dollar spending.',"Mars: 2.2·1.35+9.5·2.15+4.0·3.95=2.970+20.425+15.800=39.195. Eftersom antalen anges i tusental blir totalsummorna tusentals dollar. Multiplicera med 1000 för att få utgifterna i dollar."),
      tr('The requested first-quarter product is therefore 1000Pc=(27040,21505,39195)ᵀ dollars. Keep the January, February, March row order so each total is attached to the correct month.',"Den efterfrågade produkten för första kvartalet är alltså 1000Pc=(27040,21505,39195)ᵀ dollar. Behåll radordningen januari, februari, mars så att varje totalsumma hör till rätt månad."),
      tr('The printed table also includes April, which is outside the first quarter. If all four printed rows are used, its extra total is 1000(1.0·1.35+1.0·2.15+7.4·3.95)=1000(32.730)=$32,730. This is an additional fourth row, not part of the quarter requested.',"Den tryckta tabellen innehåller även april, som ligger utanför första kvartalet. Om alla fyra tryckta rader används blir den extra totalsumman 1000(1.0·1.35+1.0·2.15+7.4·3.95)=1000(32.730)=$32,730. Detta är en extra fjärde rad och ingår inte i det efterfrågade kvartalet.")
    ],
    answer:tr('First quarter: 1000[3.1 4.2 3.5;5.1 6.8 0;2.2 9.5 4.0](1.35,2.15,3.95)ᵀ = ($27,040,$21,505,$39,195)ᵀ.\nIf all four printed table rows are included, the result is ($27,040,$21,505,$39,195,$32,730)ᵀ; the last entry is April.',"Första kvartalet: 1000[3.1 4.2 3.5;5.1 6.8 0;2.2 9.5 4.0](1.35,2.15,3.95)ᵀ = ($27,040,$21,505,$39,195)ᵀ.\nOm alla fyra tryckta tabellrader tas med blir resultatet ($27,040,$21,505,$39,195,$32,730)ᵀ; det sista elementet gäller april.")
  });
  // Keep supporting references distinct from the original exercise wording.
  q13[21].text=q13[21].text.split(tr('\nReferenced system',"\nSystemet som hänvisas till"))[0];
  q13[21].reference=example5;
  q13[22].text=tr('Follow the directions of Exercise 21 for the linear system in Example 6 of Section 1.2.',"Följ anvisningarna i uppgift 21 för det linjära ekvationssystemet i exempel 6 i avsnitt 1.2.");
  q13[22].reference=tr('Directions from Exercise 21: Express the general solution as a linear combination of column vectors that contain only numerical entries. Rewrite the solution as a column, separate its constant and parameter terms, and factor out each parameter.\nExample 6 system:\nx₁+3x₂−2x₃+2x₅=0\n2x₁+6x₂−5x₃−2x₄+4x₅−3x₆=0\n5x₃+10x₄+15x₆=0\n2x₁+6x₂+8x₄+4x₅+18x₆=0',"Anvisningar från uppgift 21: Skriv den allmänna lösningen som en linjärkombination av kolonnvektorer som endast innehåller tal. Skriv lösningen som en kolonn, skilj konstanttermerna från parametertermerna och bryt ut varje parameter.\nSystemet i exempel 6:\nx₁+3x₂−2x₃+2x₅=0\n2x₁+6x₂−5x₃−2x₄+4x₅−3x₆=0\n5x₃+10x₄+15x₆=0\n2x₁+6x₂+8x₄+4x₅+18x₆=0");
  const proofReference=q13[31].text.split(tr('\nReferenced notation: ',"\nNotation som används: "));
  q13[31].text=proofReference[0];q13[31].reference=proofReference[1];
  const technologyReference=q13.T1.text.split(tr('\nMatrices from Example 5:',"\nMatriser från exempel 5:"));
  q13.T1.text=technologyReference[0];q13.T1.reference=tr('Matrices from Example 5:',"Matriser från exempel 5:")+technologyReference[1];
  window.EmberMathQuestions=window.EmberMathQuestions||{};
  Object.assign(window.EmberMathQuestions,{'1.3':q13,'1.4':q14});
});
