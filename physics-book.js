(function(root,factory){
  const common=typeof module==='object'&&module.exports;
  const api=factory(common?require('./physics-core.js'):root.Physics,common?require('./physics-questions.js'):root.PhysicsQuestions);
  if(typeof module==='object'&&module.exports) module.exports=api; else root.PhysicsBook=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(P,Q){
  'use strict';
  const items=[];
  const {fmt:f,tuple:t,polar:pol,add,sub,scale,sum,norm,dot,cross,angle,direction,unit}=P;
  const topics={units:'Units & measurement',precision:'Uncertainty & estimation',vectors:'Vectors & components',products:'Dot & cross products',reasoning:'Scientific thinking'};
  function entry(id,title,topic,prompt,steps,answer,extra={}){
    const n=Number(id.replace('1.',''));
    const page=id.startsWith('Q')?55:id.startsWith('VP')||id==='Bridge'?54:n<=6?55:n<=25?56:n<=49?57:n<=62?58:n<=81?59:n<=91?60:61;
    if(!Q.get(id))throw new Error(`Missing textbook question ${id}`);
    const item={id,title,topic,prompt:Q.text[id],steps,answer,page,level:n>=90?4:n>=49?3:n>=21?2:1,...extra};
    items.push(item); return item;
  }
  const q=(n,title,topic,prompt,steps,answer)=>entry('Q1.'+n,title,topic,prompt,steps,answer,{level: n>=18?3:1});
  q(1,'Can an experiment prove a theory?','reasoning','Think about what a prediction and a test can establish.',[
    'A theory makes predictions about what should happen under stated conditions.',
    'One reliable, reproducible result that contradicts such a prediction is enough to show that the theory is not completely correct in that domain. First rule out measurement mistakes and unmet assumptions.',
    'Many successful tests build confidence, but they cannot check every possible situation. A later test may reveal a limitation.'
  ],'One sound counterexample can refute a prediction. No finite number of successful tests proves a physical theory universally.');
  q(2,'Why tan(5 m) does not work','units','Can a length be put directly into a tangent function?',[
    'Tangent compares two sides of a right triangle: opposite length ÷ adjacent length.',
    'The lengths have the same units, so those units cancel. The angle itself is dimensionless when written in radians.',
    '5 m is a length, not an angle. You need another length or other information to determine an angle first.'
  ],'tan(5 m) is not a meaningful physical expression.');
  q(3,'A number needs a unit','units','A measurement is recorded as “140”. Consider height in cm and mass in kg.',[
    '140 cm means a height of 1.40 m, which is possible for an adult.',
    '140 kg is also a possible adult mass, although it is not a typical value for the person described in the exercise.',
    'Plausibility can flag a mistake; it cannot recover a missing unit with certainty. Record the quantity and unit together.'
  ],'Height of 140 cm is the more plausible intended reading. The number alone cannot identify the measurement.');
  q(4,'A drifting mass standard','precision','The historical kilogram copies changed by 25 µg per century. Does that matter?',[
    'The symbol µ means one millionth. 25 µg = 0.000025 g = 0.000000025 kg.',
    'Relative to 1 kg, the change is 2.5 × 10^−8, or 0.0000025%. It is tiny in everyday use.',
    'A standard is used to calibrate other measurements. Even a tiny drift matters when laboratories need comparable high-precision results.',
    'This question concerns the physical kilogram artefact used before May 2019; the book identifies that historical context.'
  ],'Yes for precise calibration, even though the change is negligible for most everyday weighing.');
  q(5,'Build a clock','reasoning','What repeating phenomena could be used to measure time?',[
    'A clock needs a repeatable event. Count repetitions and assign a time to each repetition.',
    'Examples include vibrations of a quartz crystal, a suitable atomic transition other than cesium, and the rotation of Earth.',
    'Compare stability: temperature changes can affect a crystal; Earth’s rotation is not perfectly uniform. A useful clock must account for such changes.'
  ],'A stable repeating process provides the ticks; counting ticks measures elapsed time.');
  q(6,'Measure one sheet using many','precision','How can a ruler measure paper too thin for one reliable reading?',[
    'Stack a known number of sheets, for example 100. Press the stack gently to reduce air gaps.',
    'Measure its thickness. If 100 sheets occupy 10 mm, divide 10 mm by 100.',
    'Each sheet is about 0.10 mm thick. Repeat with another stack to check consistency; the result is an average.'
  ],'Average sheet thickness = stack thickness ÷ number of sheets.');
  q(7,'Numbers with no units','units','Give examples of dimensionless quantities.',[
    'Divide one length by another length: 2 m ÷ 4 m = 0.5. The metres cancel.',
    'An angle in radians is arc length ÷ radius, so it is dimensionless.',
    'A fractional stretch is change in length ÷ original length. Relative density is one density ÷ another density. Both ratios cancel their units.'
  ],'Length ratios, angles in radians, fractional strain and relative density are dimensionless.');
  q(8,'Catch a formula error with units','units','Check the proposed cylinder-volume expression πr³h.',[
    'Volume counts three-dimensional space, so its unit must be m³ (or another length cubed).',
    'r³h has units m³ × m = m⁴. Multiplying by π does not change the units.',
    'A cylinder has circular base area πr². Multiplying that area by height gives πr²h, with units m² × m = m³.'
  ],'πr³h has the wrong dimensions. Cylinder volume is πr²h.');
  q(9,'Accuracy versus precision','precision','Compare Joe’s spread around the centre, Moe’s tight off-centre group, and Flo’s tight central group.',[
    'Accuracy asks how close the result is to the target. Precision asks how closely repeated results cluster.',
    'Joe’s shots are centred on the target on average but widely spread: accurate on average, not precise.',
    'Moe’s shots are close to each other but far from the target: precise, not accurate.',
    'Flo’s shots are close to each other and to the target: both accurate and precise.'
  ],'Joe: accurate on average. Moe: precise. Flo: both.');
  q(10,'Is it really a unit vector?','vectors','Check (1,1,1) and (3,−2,0).',[
    'A unit vector is an arrow whose length is exactly 1; its individual entries need not all be 1.',
    'Length of (1,1,1) = √(1² + 1² + 1²) = √3 ≈ 1.732.',
    'Length of (3,−2,0) = √(3² + (−2)²) = √13 ≈ 3.606. Squaring a negative number gives a positive result.'
  ],'Neither vector has length 1, so neither is a unit vector.');
  q(11,'Distance is not displacement','vectors','A circular track has radius 500 m. Compare half a lap and one full lap.',[
    'Displacement points directly from the starting position to the finishing position; it ignores the route.',
    'North edge to south edge is one diameter south. Diameter = 2 × radius = 1000 m.',
    'After a full lap the final and initial positions coincide. Displacement = 0, while the distance travelled is 2π × 500 ≈ 3142 m.'
  ],'Half lap: 1000 m south. Full lap: zero displacement.');
  q(12,'When arrows can cancel','vectors','Can unequal arrows add to zero? What changes with three arrows?',[
    'Two arrows can return you to the start only if the second exactly reverses the first. Their lengths must match.',
    'Three arrows can close a triangle when no length exceeds the sum of the other two.',
    'Equality gives a flattened triangle: all three lie on a line. For a non-flat triangle, each length must be strictly less than the sum of the other two.'
  ],'Two: equal and opposite. Three: the longest length must be no larger than the sum of the other two.');
  q(13,'Does time have a vector direction?','reasoning','Does the phrase “direction of time” make time a spatial vector?',[
    'A spatial vector needs a magnitude and a direction in space that obey vector-addition rules.',
    'The phrase describes the ordering of events, not a north/south/up direction.',
    'In this chapter elapsed time is a scalar: a number of seconds without a spatial direction.'
  ],'No. In this chapter, time is a scalar.');
  q(14,'A heading is only part of a vector','vectors','Is an aircraft heading alone a complete velocity vector?',[
    'A heading tells the pilot which way to point or travel.',
    'Velocity also needs a magnitude, such as 200 km/h. Two aircraft can have the same heading and different speeds.',
    'A direction can be represented by a unit vector, but it does not by itself specify a full velocity.'
  ],'A heading specifies direction; a velocity vector also requires speed.');
  q(15,'Can components hide a length?','vectors','Can a zero-length vector have nonzero components? Can a component be larger than its length?',[
    'Length squared is Ax² + Ay² + Az². Each square is nonnegative.',
    'The sum can be zero only if every component is zero.',
    'The sum is at least as large as any one square. Taking square roots gives |A| ≥ |Ax|, |Ay|, |Az|.'
  ],'No to both questions.');
  q(16,'What does a negative arrow mean?','vectors','Distinguish “a negative vector” from “the negative of A”.',[
    'A vector has no universal greater-than or less-than-zero ordering. Its components depend on the chosen axes.',
    '−A is well defined: reverse every component, keeping the same length and reversing the direction.',
    'For example, if A = (3,2,0), then −A = (−3,−2,0). Adding them gives (0,0,0).'
  ],'“Negative” alone needs context; −A always means the equal-length opposite vector.');
  q(17,'When lengths add directly','vectors','For C = A + B, when is |C| = |A| + |B|, and when is C zero?',[
    'If two nonzero arrows point the same way, placing them head to tail gives the sum of their lengths.',
    'If they point at an angle, some of one direction is lost and the straight-line result is shorter than the sum of lengths.',
    'To obtain zero, the arrows must have equal lengths and opposite directions. A zero input is a trivial special case.'
  ],'Maximum sum: parallel, same direction. Zero sum: equal and opposite.');
  q(18,'Can both products vanish?','products','Assume both input vectors are nonzero.',[
    'A·B = |A||B| cos θ. It is zero when the vectors are perpendicular, θ = 90°.',
    '|A×B| = |A||B| sin θ. It is zero when they are parallel or antiparallel, θ = 0° or 180°.',
    'One angle cannot satisfy both conditions. The nonzero assumption matters.'
  ],'No: nonzero vectors cannot have both zero dot product and zero cross product.');
  q(19,'Multiply a vector by itself','products','Compare A·A and A×A.',[
    'The angle from an arrow to itself is 0°.',
    'cos 0° = 1, so A·A = |A|². In components this is Ax² + Ay² + Az².',
    'sin 0° = 0, so A×A is the zero vector. Parallel arrows span no area.'
  ],'A·A = |A|²; A×A = (0,0,0).');
  q(20,'Keep the direction, make length one','vectors','Why does A/|A| define a unit vector? What is its x direction cosine?',[
    'For nonzero A, divide every component by its positive length. Every part shrinks by the same factor.',
    'The new length is |A|/|A| = 1; its direction is unchanged.',
    'Dotting this unit vector with î = (1,0,0) picks out Ax/|A|. The right triangle for the x component gives Ax/|A| = cos θ.'
  ],'A/|A| is a unit vector in A’s direction; its x component is cos θ.');
  q(21,'Small percentage, important error','precision','Compare a 10.0 m overshoot with a stated journey of 890 km.',[
    'Put both lengths in metres: 890 km = 890000 m.',
    'Percent error = (10.0/890000) × 100% ≈ 0.00112%. A small fraction can still have a serious physical consequence.',
    'Writing 890010 m suggests metre-level knowledge of the original journey. The stated 890 km does not establish that precision.'
  ],'About 0.00112%; the displayed sum must not imply unsupported precision.');
  q(22,'Check the type of each operation','products','Classify the five expressions in the book: which accept vector inputs?',[
    '(a) A·(B−C): B−C is a vector; dot with A gives a scalar. Valid.',
    '(b) (A−B)×C: two vector inputs give a vector. Valid.',
    '(c) A·(B×C): the inner result is a vector, so the final dot gives a scalar. Valid.',
    '(d) A×(B×C): the inner result and A are vectors. Valid.',
    '(e) A×(B·C): B·C is a scalar. The cross product requires two vectors, so this is not defined.'
  ],'(a)–(d) are valid; (e) is not.');
  q(23,'Brackets matter in cross products','products','Compare A×(B×C) with (A×B)×C.',[
    'Choose A = î, B = î and C = ĵ. First B×C = k̂, so A×(B×C) = î×k̂ = −ĵ.',
    'For the other grouping, A×B = î×î = 0. Then (A×B)×C = 0.',
    '−ĵ is not zero, so the expressions are not generally equal.',
    'They can be equal in special cases: choose A = B = C = î; both sides are zero.'
  ],'Cross products are not associative; parentheses cannot generally be moved.');
  q(24,'A perpendicular arrow has no along-component','products','Explain why A·(A×B) = 0.',[
    'If A×B is nonzero, its direction is perpendicular to A.',
    'The dot product with A therefore contains cos 90° = 0.',
    'If A×B is already zero, dotting that zero vector with A also gives zero.'
  ],'The result is always zero.');
  q(25,'A zero product need not mean a zero input','products','Give nonzero counterexamples for zero dot and cross products.',[
    'Choose î = (1,0,0) and ĵ = (0,1,0). Their dot product is 0, yet each has length 1.',
    'Choose î and 2î. They are parallel, so their cross product is zero, yet both are nonzero.',
    'Dot zero can mean perpendicular; cross zero can mean parallel.'
  ],'Neither statement forces one of the input vectors to be zero.');
  q(26,'Zero vector versus cancelling numbers','vectors','If A = 0 in the xy-plane, what must Ax and Ay be?',[
    'The x and y directions are different directions; their numbers do not cancel one another.',
    'A = (0,0,0) requires Ax = 0 and Ay = 0 separately.',
    'Ax = −Ay is then true because both are zero, but that equality alone is insufficient: (3,−3,0) is not a zero vector.'
  ],'Ax = Ay = 0.');
  entry('1.1','A billion seconds','units','Convert 1.00 gigasecond to years, using 365 days per year.',[
    '“Giga” means 10⁹, so 1.00 Gs = 1.00 × 10⁹ s.',
    'One year contains 365 × 24 × 60 × 60 = 31536000 s.',
    'Divide the total seconds by seconds per year: 1000000000/31536000 = 31.7098 years.',
    'Keep three significant figures, matching 1.00 Gs.'
  ],'31.7 years');
  entry('1.2','Convert an area','units','Convert the book’s 265-acre area to m², km² and hectares.',[
    'Start with the supplied chain: 1 acre = 43560 ft²; 1 ft = 0.3048 m.',
    'Area has two length factors. Thus 1 ft² = (0.3048 m)² = 0.09290304 m², not 0.3048 m².',
    'Area = 265 × 43560 × 0.09290304 = 1072416.95 m².',
    'One km² = 1000000 m², so divide by 1000000 to get 1.07241695 km².',
    'One hectare = 10000 m², so divide by 10000 to get 107.241695 ha. Round to three significant figures.'
  ],'1.07 × 10⁶ m² = 1.07 km² = 107 ha');
  entry('1.3','Light crossing a small gap','units','How long does light take to travel 0.3 m?',[
    'Speed means distance travelled each second. Use c ≈ 3.0 × 10⁸ m/s.',
    'Time = distance/speed = 0.3/(3.0 × 10⁸) s = 1 × 10⁻⁹ s.',
    'Nano means 10⁻⁹, so this is approximately one nanosecond.'
  ],'About 1 ns');
  entry('1.4','Convert density','units','Convert 10.5 g/cm³ to kg/m³.',[
    'The numerator changes by 1 g = 0.001 kg.',
    'The denominator changes by 1 cm³ = (0.01 m)³ = 0.000001 m³.',
    'Therefore 1 g/cm³ = 0.001/0.000001 = 1000 kg/m³.',
    'Multiply 10.5 by 1000. Smaller mass units and smaller volume units must both be converted.'
  ],'1.05 × 10⁴ kg/m³');
  entry('1.5','Follow an ancient unit chain','units','Use the supplied Roman unit relationships and 1 pes = 0.296 m.',[
    '(a) One miliarum contains 8 stadia × 125 passus per stadium × 5 pes per passus = 5000 pes.',
    'Convert: 5000 × 0.296 m = 1480 m. The subdivision counts are exact.',
    '(b) One pes contains 4 × 4 = 16 digitus. Thus one digitus is 0.296/16 = 0.0185 m.',
    'Multiply metres by 100 to get centimetres: 0.0185 × 100 = 1.85 cm.'
  ],'(a) 1.48 × 10³ m; (b) 1.85 cm');
  entry('1.6','Compare the historical speed limits','units','Convert the speeds supplied in the exercise between mi/h and km/h.',[
    'One mile = 5280 × 30.48 cm = 160934.4 cm = 1.609344 km.',
    '(a) 30 mi/h × 1.609344 = 48.28032 km/h. The given replacement of 50 km/h is about 1.72 km/h higher.',
    '(b) 120 km/h ÷ 1.609344 = 74.5645 mi/h. This is about 4.56 mi/h above the stated old 70 mi/h.',
    'These are comparisons of the historical values in the problem.'
  ],'(a) ≈48.3 km/h; (b) ≈74.6 mi/h');
  entry('1.7','Fuel per journey','units','Use 5.5 L/100 km, a 40 L tank, and 30.5 miles per UK gallon for the older car.',[
    '(a) 1200 km contains 1200/100 = 12 groups of 100 km. Fuel = 12 × 5.5 = 66 L.',
    'Tank-equivalents = 66/40 = 1.65. That means 1 full tank plus 26 L, so two tankfuls provide enough fuel.',
    '(b) 30.5 miles = 30.5 × 1.609 = 49.0745 km for 4.546 L.',
    'Fuel per 100 km = (4.546/49.0745) × 100 = 9.2635 L/100 km.',
    'The older figure is about 9.26/5.5 = 1.68 times the newer one, or about 68% more fuel per distance.'
  ],'(a) 1.65 tank-equivalents; (b) 9.26 L/100 km');
  entry('1.8','Small masses and unit cancellation','units','Convert and combine the quantities supplied in the book’s nutrition arithmetic exercise.',[
    '(a) 1 mg = 1000 µg. Therefore 410 mg/day × 1000 = 410000 µg/day.',
    '(b) 12 mg/kg × 77 kg = 924 mg. The kg units cancel. Divide by 1000: 0.924 g/day (about 0.92 g/day to two significant figures).',
    '(c) Convert 0.0030 g to 3.0 mg. Divide by 2.0 mg per tablet: 3.0/2.0 = 1.5 tablet-equivalents.',
    '(d) 0.000070 g × 1000 mg/g = 0.070 mg.',
    'These are unit calculations using the exercise’s supplied quantities, not a recommendation about supplements.'
  ],'(a) 4.10 × 10⁵ µg/day; (b) 0.924 g/day before rounding; (c) 1.5 tablet-equivalents; (d) 0.070 mg/day');
  entry('1.9','Radius from mass and density','units','Find the radius of the ideal sphere specified by mass 60 kg and density 19.5 g/cm³.',[
    'Density tells us mass per volume: ρ = m/V. Rearrange to V = m/ρ.',
    'Convert the mass to grams: 60 kg = 60000 g. Volume = 60000/19.5 = 3076.92 cm³.',
    'For a sphere V = (4/3)πr³. Multiply by 3/(4π): r³ = 3V/(4π).',
    'The cube root reverses cubing: r = ∛[3 × 3076.92/(4π)] ≈ 9.02 cm.'
  ],'Radius ≈9.0 cm');
  entry('1.10','A microscopic sphere','units','The bacterium’s diameter is 2.0 µm. Find its volume in cm³ and area in mm².',[
    'Radius is half the diameter: r = 1.0 µm. A micrometre is 10⁻⁶ m.',
    'For volume, use r = 1.0 × 10⁻⁴ cm. V = (4/3)πr³ = 4.18879 × 10⁻¹² cm³.',
    'For surface area, use r = 1.0 × 10⁻³ mm. S = 4πr² = 1.25664 × 10⁻⁵ mm².',
    'Round both results to two significant figures. Area uses a square; volume uses a cube.'
  ],'V ≈4.2 × 10⁻¹² cm³; surface area ≈1.3 × 10⁻⁵ mm²');
  entry('1.11','How much precision survives?','precision','Use length 12 mm and width 5.98 mm.',[
    'For multiplication/division, keep the fewest significant figures: 12 has two and 5.98 has three, so use two.',
    '(a) Area = 12 × 5.98 = 71.76 mm² → 72 mm².',
    '(b) Width/length = 5.98/12 = 0.4983… → 0.50. The trailing zero shows two significant figures.',
    'For addition/subtraction, match the least precise decimal place: the length was measured to whole millimetres.',
    '(c) Perimeter = 2(12 + 5.98) = 35.96 mm → about 36 mm. Keep guard digits until the final rounding.',
    '(d) Difference = 12 − 5.98 = 6.02 mm → 6 mm.',
    '(e) Length/width = 12/5.98 = 2.0067… → 2.0. Ratios of lengths have no units.'
  ],'(a) 72 mm²; (b) 0.50; (c) 36 mm; (d) 6 mm; (e) 2.0');
  entry('1.12','Volume of a thin wire','precision','A cylinder has r = 0.036 cm and h = 12.1 cm. Give its volume in mm³.',[
    'A cylinder is a circle stacked through a height: V = πr²h.',
    'Substitute: π × (0.036)² × 12.1 ≈ 0.0492652 cm³.',
    'Since 1 cm = 10 mm, 1 cm³ = 1000 mm³. Volume ≈49.2652 mm³.',
    'The radius has two significant figures, so report two. The leading zeros are not significant.'
  ],'49 mm³');
  entry('1.13','How good is π × 10⁷?','precision','Compare π × 10⁷ seconds with a year of 365.24 days.',[
    'Reference value = 365.24 × 86400 = 31556736 s.',
    'Approximation = π × 10⁷ ≈ 31415926.54 s.',
    'Difference = approximation − reference ≈ −140809.46 s.',
    'Percent error = difference/reference × 100% ≈ −0.4462%. The negative sign means the estimate is low.'
  ],'About 0.446% too small');
  entry('1.14','Two approximations of π','precision','Round 22/7 and 355/113 to six significant figures, then compare with π.',[
    '22/7 = 3.142857… → 3.14286 at six significant figures.',
    '355/113 = 3.14159292… → 3.14159.',
    'π = 3.14159265… → 3.14159. The second fraction rounds correctly to six significant figures; the first does not.'
  ],'(a) 3.14286, not accurate to six figures; (b) 3.14159, accurate to six figures');
  entry('1.15','A sensible size check','precision','Choose the more plausible giraffe height, mass and maximum speed from the book’s alternatives.',[
    'A full-grown male giraffe is much taller than a person; 5 m is the plausible height choice rather than 2 m.',
    '1500 kg is the plausible mass choice; 5000 kg is on the scale of a large elephant.',
    '15 m/s × 3.6 = 54 km/h; 45 m/s × 3.6 = 162 km/h. The first speed is the plausible choice.',
    'This is an order-of-magnitude judgment, not an exact biological measurement.'
  ],'5 m; 1500 kg; 15 m/s');
  entry('1.16','A country’s daily fuel use','precision','Use the supplied population, car ownership, distance and consumption assumptions.',[
    'Cars = 60 million people × 2 cars/3 people = 40 million cars.',
    'One car uses (10000 km/year) × (8 L/100 km) = 800 L/year.',
    'All cars use 40 million × 800 = 32 billion L/year.',
    'Divide by 365 days: about 8.77 × 10⁷ L/day. The assumptions are rough, so about 9 × 10⁷ L/day is appropriate.'
  ],'Approximately 90 million litres per day under the stated assumptions');
  entry('1.17','Estimate a pile of gold','precision','Estimate a human-sized pile using 19.3 g/cm³ and the book’s assumed $40/g.',[
    'An estimate needs stated assumptions. Model the pile as a solid block 1.7 m high, 0.50 m wide and 0.30 m deep.',
    'Volume = 1.7 × 0.50 × 0.30 = 0.255 m³ = 255000 cm³.',
    'Mass = density × volume = 19.3 × 255000 = 4921500 g.',
    'At the exercise’s assumed price, value ≈ 4921500 × $40 = $196860000.',
    'A deeper pile costs more, and gaps between pieces reduce its mass. Different reasonable geometries give different estimates.'
  ],'One defensible estimate: about $2 × 10⁸, using the book’s assumed price');
  entry('1.18','A year of breathing','precision','Estimate air breathed by four astronauts, then the diameter of a sphere containing that volume.',[
    'Assume 12 breaths per minute per person and a 365-day year. Each breath is 500 cm³ = 0.0005 m³.',
    'There are 365 × 24 × 60 = 525600 minutes in a year.',
    'Total volume = 4 × 12 × 525600 × 0.0005 = 12614.4 m³.',
    'Solve V = (4/3)πr³: r = ∛(3V/4π) ≈ 14.44 m. Diameter = 2r ≈ 28.9 m.',
    'This counts inhaled volume with repeated breathing. A real station recycles air; this is the idealised storage calculation in the question.'
  ],'With 12 breaths/min: about 1.3 × 10⁴ m³; diameter about 29 m');
  entry('1.19','How many drops in a litre?','precision','Make a size assumption for a drop and estimate its count.',[
    'Assume a spherical drop with diameter 4 mm, so radius r = 2 mm.',
    'Volume per drop = (4/3)π(2 mm)³ ≈ 33.51 mm³ = 0.03351 mL.',
    'One litre is 1000 mL. Number of drops ≈ 1000/0.03351 ≈ 29842.',
    'Report about 30000 drops. This depends strongly on the drop diameter because volume scales with diameter cubed.'
  ],'About 3 × 10⁴ drops for an assumed 4 mm diameter');
  entry('1.20','Count a lifetime of heartbeats','precision','Estimate beats and pumped volume; use the book’s 50 cm³ per beat.',[
    'State assumptions: 70 beats per minute and an 80-year life, with 365 days/year.',
    'Minutes = 80 × 365 × 24 × 60 = 42048000.',
    'Beats = 70 × 42048000 = 2943360000, roughly 3 billion.',
    '50 cm³ = 0.050 L. Total pumped volume = 2943360000 × 0.050 = 147168000 L.',
    'The same blood circulates repeatedly; this is cumulative pumped volume, not the amount of blood in the body.'
  ],'About 3 × 10⁹ beats and 1.5 × 10⁸ L, under the stated assumptions');

  // Vector problems below use numerical components computed from the checked page images.
  const fig22={A:[0,-8,0],B:pol(15,60),C:pol(12,205),D:pol(10,143)};
  const fig33={A:pol(2.8,60),B:pol(1.9,-60)};
  const fig37={A:pol(3.6,70),B:pol(2.4,210)};
  const A36=[4,7,0],B36=[5,-2,0],A39=[-2,3,4],B39=[3,1,-3];
  function vectorSteps(v,units,label='Result') {
    const a=P.vec(v), len=norm(a),theta=direction(a);
    return [`${label}: ${t(a)} ${units}. Entries mean x, y and z amounts. A negative entry points along the negative axis.`,
      `Find length by Pythagoras: √[(${f(a[0])})² + (${f(a[1])})² + (${f(a[2])})²] = √(${f(dot(a,a),6)}) ≈ ${f(len)} ${units}.`,
      len<1e-10?'A zero vector has no unique direction.':Math.abs(a[2])<1e-10?`For direction, use the signs to choose the quadrant, then atan2(y,x): θ ≈ ${f(theta)}° counterclockwise from +x. “atan2” is inverse tangent with the quadrant included.`:`In 3D, specify the direction with the unit vector ${t(unit(a))}. These three components give the direction without the length.`];
  }
  function part(label,a,b,mode='add',units='m') {
    a=P.vec(a); b=P.vec(b);
    const expected=mode==='subtract'?sub(a,b):mode==='cross'?cross(a,b):mode==='components'?a:mode==='unit'?unit(a):add(a,b);
    return {label,a,b,mode,units,expected};
  }
  function vectorEntry(id,title,prompt,parts,lead=[],tail=[]){
    const steps=[...lead];
    for(const p of parts){
      steps.push(`${p.label}: start with A = ${t(p.a)} and B = ${t(p.b)}.`);
      if(p.mode==='cross') steps.push(`Cross product rule: (AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Here that is (${f(p.a[1])}×${f(p.b[2])}−${f(p.a[2])}×${f(p.b[1])}, ${f(p.a[2])}×${f(p.b[0])}−${f(p.a[0])}×${f(p.b[2])}, ${f(p.a[0])}×${f(p.b[1])}−${f(p.a[1])}×${f(p.b[0])}). The result is perpendicular to both inputs.`);
      else if(p.mode==='unit') steps.push(`Length of A = ${f(norm(p.a))}. Divide each component by that length to make an arrow of length 1.`);
      else if(p.mode!=='components') steps.push(`Work one direction at a time: (${p.a.map((x,i)=>`${f(x)} ${p.mode==='subtract'?'−':'+'} (${f(p.b[i])})`).join(', ')}). ${p.mode==='subtract'?'Subtracting B means adding the reversed arrow −B.':'Adding arrows combines each of the three component amounts.'}`);
      steps.push(...vectorSteps(p.expected,p.units,p.label));
    }
    steps.push(...tail);
    return entry(id,title,parts.some(x=>x.mode==='cross')?'products':'vectors',prompt,steps,parts.map(p=>`${p.label}: ${t(p.expected)} ${p.units}; length ≈ ${f(norm(p.expected))} ${p.units}${Math.abs(p.expected[2])<1e-10&&norm(p.expected)>1e-10?`; θ ≈ ${f(direction(p.expected))}°`:''}`).join('\n'),{interactive:parts});
  }
  function route(id,title,prompt,legs,units='m',destination=null,lead=[],tail=[]){
    const pos=sum(legs),r=destination?sub(destination,pos):pos;
    return entry(id,title,'vectors',prompt,[
      'Choose +x east, +y north and +z up. A route’s displacement is the straight arrow from its start to its finish.',
      ...lead,
      ...legs.map((v,i)=>`Leg ${i+1} has components ${t(v)} ${units}.`),
      `Add x entries, y entries and z entries separately: current displacement = ${t(pos)} ${units}.`,
      ...(destination?[`The desired final position is ${t(destination)} ${units}. Remaining displacement = desired position − current position = ${t(r)} ${units}.`]:[]),
      ...vectorSteps(r,units),
      'Draw the legs head to tail. The result runs directly from the start to the endpoint (or from the current point to the destination when a remaining leg is requested). This checks the signs and quadrant.',...tail
    ],`${t(r)} ${units}; length ≈ ${f(norm(r))} ${units}${Math.abs(r[2])<1e-10?`; θ ≈ ${f(direction(r))}° counterclockwise from east`:''}`,{
      interactive:[{label:'Displacement',a:pos,b:[0,0,0],mode:'route',units,expected:r,legs,destination}]
    });
  }
  function productEntry(id,title,prompt,pairs,lead=[],tail=[]){
    const steps=[...lead];
    for(const [label,a,b,units] of pairs){
      steps.push(`${label}: A = ${t(a)}; B = ${t(b)}. A dot product is a single number, not an arrow.`,
        `Multiply matching components and add: (${f(a[0])})×(${f(b[0])}) + (${f(a[1])})×(${f(b[1])}) + (${f(a[2]||0)})×(${f(b[2]||0)}) = ${f(dot(a,b))} ${units}.`,
        `The lengths are ${f(norm(a))} and ${f(norm(b))}. Using A·B = |A||B| cos θ, divide by their product: cos θ = ${f(dot(a,b))}/(${f(norm(a))}×${f(norm(b))}) = ${f(dot(a,b)/(norm(a)*norm(b)))}.`,
        `Inverse cosine asks “which angle gives that cosine?” θ ≈ ${f(angle(a,b))}°. A negative dot product means an angle greater than 90°.`);
    }
    return entry(id,title,'products',prompt,[...steps,...tail],pairs.map(([label,a,b,u])=>`${label}: A·B ≈ ${f(dot(a,b))} ${u}; angle ≈ ${f(angle(a,b))}°`).join('\n'),{interactive:pairs.map(([label,a,b,units])=>({label,a:P.vec(a),b:P.vec(b),mode:'dot',units,check:false}))});
  }
  const post=[[0,2.6,0],[4,0,0],pol(3.1,45)];
  route('1.21','The delivery route','Read Fig. E1.21: 2.6 km north, 4.0 km east, then 3.1 km at 45° north of east.',post,'km',null,['For a scale drawing, let 1 cm represent 1 km. Draw 2.6 cm up, then 4.0 cm right, then 3.1 cm at 45°.','The diagonal leg has x = 3.1 cos45° and y = 3.1 sin45°, both ≈2.192 km. Components below check the graphical measurement.']);
  vectorEntry('1.22','Add and reverse the figure’s arrows','Fig. E1.22 has A = 8.00 m south and B = 15.0 m at 30° east of north.',[
    part('(a) A+B',fig22.A,fig22.B),part('(b) A−B',fig22.A,fig22.B,'subtract'),part('(c) −A−B',scale(fig22.A,-1),scale(fig22.B,-1)),part('(d) B−A',fig22.B,fig22.A,'subtract')
  ],['Use 1 cm for 5 m on paper. Draw the two arrows head to tail. For subtraction, reverse the arrow being subtracted.','B’s angle from +x is 90°−30° = 60°, so B = (15 cos60°,15 sin60°,0). The numerical calculation checks the scale drawing.']);
  route('1.23','Close the cave route','Use 180 m west, 210 m at 45° east of south, and 280 m at 30° east of north.',[[-180,0,0],pol(210,315),pol(280,60)],'m',[0,0,0],['Choose a paper scale such as 1 cm = 50 m. The angle directions from east are 180°, 315° and 60°.','Draw the closing arrow from the third endpoint back to the start. Its components must be the negatives of the first three legs’ sum.']);
  vectorEntry('1.24','Choose the correct quadrant','Find the angles for (2,−1), (2,1), (−2,1), (−2,−1) in metres.',[[2,-1,0],[2,1,0],[-2,1,0],[-2,-1,0]].map((a,i)=>part('('+['a','b','c','d'][i]+')',a,[0,0,0],'components')),['The small reference angle is arctan(1/2) ≈26.565°. The signs place the four arrows in quadrants IV, I, II and III.']);
  vectorEntry('1.25','Read all four arrows as components','Use Fig. E1.22. A points south; B is 30° east of north; C is 25° south of west; D is 53° west of north.',Object.entries(fig22).map(([k,v])=>part(k,v,[0,0,0],'components')),['Angles counterclockwise from +x: A = 270°, B = 60°, C = 205°, D = 143°.','Use x = length × cos(angle) and y = length × sin(angle). These are the arrow’s signed horizontal and vertical shadows.']);
  const v26=pol(20/Math.sin(P.rad(40)),230),v27=pol(13/Math.cos(P.rad(32)),122);
  vectorEntry('1.26','A southwest-pointing vector','Ax = −20.0 m; A points 40° clockwise from −y.',[part('A',v26,[0,0,0],'components')],['The angle from +x is 270°−40° = 230°, in the southwest quadrant. Both components are negative.','|Ax| = |A| sin40°, so |A| = 20/sin40°. Then Ay = −|A| cos40°.']);
  vectorEntry('1.27','An angle measured from north','Ay = +13.0 m; direction is 32° counterclockwise from +y.',[part('A',v27,[0,0,0],'components')],['32° counterclockwise from north points northwest. Standard angle = 90°+32° = 122°.','Ay = |A| cos32°. Divide by cos32° to get |A|; Ax = −|A| sin32°.']);
  route('1.28','Delivery route using components','Solve the same route as 1.21 using signed horizontal and vertical amounts.',post,'km',null,['The first two legs are (0,2.6) and (4.0,0) km.','For the diagonal leg, x = 3.1 cos45° and y = 3.1 sin45°. Both signs are positive.']);
  vectorEntry('1.29','Addition order and subtraction order','Use A and B in Fig. E1.22.',[part('(a) A+B',fig22.A,fig22.B),part('(b) B+A',fig22.B,fig22.A),part('(c) A−B',fig22.A,fig22.B,'subtract'),part('(d) B−A',fig22.B,fig22.A,'subtract')],['A = (0,−8,0) m and B = (15 cos60°,15 sin60°,0) m.'],['A+B and B+A agree. A−B and B−A are opposites, with equal lengths and directions 180° apart.']);
  vectorEntry('1.30','Length and direction from components','Convert each supplied component pair into length and angle.',[part('(a)',[-8.6,5.2,0],[0,0,0],'components','cm'),part('(b)',[-9.7,-2.45,0],[0,0,0],'components','m'),part('(c)',[7.75,-2.7,0],[0,0,0],'components','km')],['Use √(x²+y²) for length. Keep each part’s unit; they differ. Signs determine the quadrant before you use inverse tangent.']);
  route('1.31','North, west, then south','Combine 3.25 km north, 2.20 km west and 1.50 km south.',[[0,3.25,0],[-2.2,0,0],[0,-1.5,0]],'km',null,['North and south partly cancel: 3.25−1.50 = 1.75 km north remains.']);
  vectorEntry('1.32','Find the missing arrow','A has length 8.00 m at 127°. A+B must be 12.0 m due south.',[part('B',[0,-12,0],pol(8,127),'subtract')],['A = (8 cos127°,8 sin127°,0). The required total R is (0,−12,0).','From A+B=R, subtract A from both sides to get B=R−A. In the calculation below, the two input arrows are R and A.']);
  vectorEntry('1.33','Two arrows around the x-axis','A is 2.80 cm at +60°; B is 1.90 cm at −60°.',[part('(a) A+B',fig33.A,fig33.B,'add','cm'),part('(b) A−B',fig33.A,fig33.B,'subtract','cm'),part('(c) B−A',fig33.B,fig33.A,'subtract','cm')],['Convert each arrow using x=Lcosθ and y=Lsinθ. B’s y component is negative because it points below the x-axis.']);
  vectorEntry('1.34','Translate î and ĵ into numbers','Read coefficients of î and ĵ; in (d), multiply every component of B by 5.',[[3.2,-6.5,0],[-7.91,18.2,0],[-12,21.2,0],[40,-20,0]].map((a,i)=>part('('+['a','b','c','d'][i]+')',a,[0,0,0],'components','units')),['î means one step along +x; ĵ means one step along +y. Their coefficients are the components even if the terms appear in a different order.','(d) B = (8,−4,0), so 5B = (5×8,5×(−4),0).']);
  vectorEntry('1.35','Write the figure using unit vectors','Express every arrow in Fig. E1.22 as Ax î + Ay ĵ.',Object.entries(fig22).map(([k,v])=>part(k,v,[0,0,0],'components')),['Use the same components as 1.25. For example A = 0î−8ĵ m. The tuple (x,y,z) means xî+yĵ+zk̂.','B uses 60°, C uses 205°, and D uses 143°, all measured counterclockwise from +x.']);
  vectorEntry('1.36','Subtract vectors in unit notation','Use A = (4,7,0) and B = (5,−2,0).',[part('A−B',A36,B36,'subtract','units')],[`(a) |A| = √(4²+7²) = √65 ≈ ${f(norm(A36))}; |B| = √(5²+(−2)²) = √29 ≈ ${f(norm(B36))}.`,'(b) Subtract each matching component. Subtracting −2 adds 2.'],['(d) A−B points almost straight up, slightly left; your sketch should show that.']);
  vectorEntry('1.37','Scale before adding','Fig. E1.37: A is 3.60 m at 70°, B is 2.4 m at 210°. Find C = 3A−4B.',[part('C',scale(fig37.A,3),scale(fig37.B,4),'subtract')],[`(a) A = (3.6 cos70°,3.6 sin70°,0) = ${t(fig37.A)} m. B = (2.4 cos210°,2.4 sin210°,0) = ${t(fig37.B)} m.`,'(b) Multiply every component of A by 3 and every component of B by 4. Then subtract 4B from 3A. The inputs below are the scaled arrows.']);
  vectorEntry('1.38','Directions of two arrows and their sum','Use A = (−3,6,0), B = (7,2,0), and C = A+B.',[part('(a) A',[-3,6,0],[0,0,0],'components','units'),part('(b) B',[7,2,0],[0,0,0],'components','units'),part('(c) C',[-3,6,0],[7,2,0],'add','units')],['A lies in quadrant II, B in quadrant I, and their sum also in quadrant I.']);
  vectorEntry('1.39','Three-dimensional subtraction','Use A = (−2,3,4) and B = (3,1,−3).',[part('A−B',A39,B39,'subtract','units')],[`(a) |A| = √29 ≈ ${f(norm(A39))}; |B| = √19 ≈ ${f(norm(B39))}.`,'(b) Work independently along x, y and z. For z, 4−(−3)=7.'],['Reversing the subtraction negates every component but leaves the length unchanged, so |B−A| = |A−B|.']);
  productEntry('1.40','Dot product and angle','Use the vectors from 1.36.',[['A and B',A36,B36,'units²']]);
  productEntry('1.41','Dot products from the diagram','Use Fig. E1.22 with the component values calculated in 1.25.',[['(a) A·B',fig22.A,fig22.B,'m²'],['(b) B·C',fig22.B,fig22.C,'m²'],['(c) A·C',fig22.A,fig22.C,'m²']]);
  vectorEntry('1.42','A cross product points out of the plane','Use A = (4,7,0), B = (5,−2,0).',[part('A×B',A36,B36,'cross','units²')],['Because both inputs lie in the xy-plane, only the z component of their cross product can be nonzero.']);
  productEntry('1.43','Angles between component vectors','Use the three pairs supplied in the exercise.',[['(a)',[-2,6,0],[2,3,0],'units²'],['(b)',[3,5,0],[10,6,0],'units²'],['(c)',[-4,2,0],[7,14,0],'units²']]);
  vectorEntry('1.44','Reverse the order, reverse the normal','Find A×B and B×A for Fig. E1.33.',[part('(a) A×B',fig33.A,fig33.B,'cross','cm²'),part('(b) B×A',fig33.B,fig33.A,'cross','cm²')],['The smaller angle between the arrows is 120°. The length is AB sin120°. The right-hand rule gives the direction.']);
  vectorEntry('1.45','A and D in three dimensions','Find cross products of A and D in Fig. E1.22.',[part('(a) A×D',fig22.A,fig22.D,'cross','m²'),part('(b) D×A',fig22.D,fig22.A,'cross','m²')],['A points south. D has angle 143° from +x. Inspect the z sign, not just the positive length.']);
  vectorEntry('1.46','Dot and cross from one pair','Use Fig. E1.37: A = 3.6 m at 70°, B = 2.4 m at 210°.',[part('(b) A×B',fig37.A,fig37.B,'cross','m²')],[`(a) The angle between them is 140°. Dot product = 3.6×2.4×cos140° ≈ ${f(dot(fig37.A,fig37.B))} m².`]);
  vectorEntry('1.47','Recover a vector from a cross product','A = (−8,0,0) m; A×B = (0,0,16) m²; Bx=0.',[part('B',[0,-2,0],[0,0,0],'components')],['Write B=(0,By,Bz). The cross product becomes (0,8Bz,−8By).','Match the requested result component by component: 8Bz=0 gives Bz=0; −8By=16 gives By=−2.','The minus sign is essential: −x crossed with −y gives +z.']);
  entry('1.48','Compare the two products','products','Compare product magnitudes at 30°, then find equality angles.',[
    'For nonzero arrows, |A·B|=AB|cosθ| and |A×B|=AB sinθ for 0°≤θ≤180°.',
    '(a) At 30°, cos30°≈0.866 and sin30°=0.500, so the scalar-product magnitude is larger.',
    '(b) Cancel the common positive factor AB. Equality requires |cosθ|=sinθ, which holds at 45° and 135°.',
    'If either input is zero, both products are zero at every angle; a direction for the zero vector is undefined.'
  ],'(a) Dot-product magnitude; (b) 45° or 135° for nonzero vectors');

  // Measurement, estimation and more advanced vector applications.
  entry('1.49','Density on astronomical scales','units','Compare a spherical Earth, a 15000 km diameter white dwarf and a 20 km diameter neutron star.',[
    'Density = mass/volume. Use V=(4/3)πr³ and radius = half the diameter.',
    'Use approximate astronomical data: Earth mass 5.97×10²⁴ kg, Earth radius 6.37×10⁶ m, Sun mass 1.99×10³⁰ kg.',
    '(a) Earth: V≈1.083×10²¹ m³. Density≈5514 kg/m³ = 5.51 g/cm³.',
    '(b) White dwarf: r=7.50×10⁶ m, V≈1.767×10²¹ m³. Density≈1.126×10⁹ kg/m³ = 1.13×10⁶ g/cm³.',
    '(c) Neutron star: r=1.00×10⁴ m, V≈4.189×10¹² m³. Density≈4.75×10¹⁷ kg/m³ = 4.75×10¹⁴ g/cm³.',
    'To convert kg/m³ to g/cm³, divide by 1000. Compressing the same mass into a smaller radius makes density grow as 1/r³.'
  ],'Approximately 5.51, 1.13×10⁶ and 4.75×10¹⁴ g/cm³, respectively');
  entry('1.50','Ticks of a hydrogen-maser clock','units','Use f = 1420405751.786 cycles/s and a drift of 1 s per 100000 years.',[
    '(a) Frequency counts cycles per second; time per cycle is its reciprocal: T=1/f≈7.04×10⁻¹⁰ s.',
    '(b) An hour has 3600 s. Cycles=f×3600≈5.11×10¹².',
    '(c) Use 365.24 days/year: 4.6×10⁹ years≈1.45161×10¹⁷ s. Multiply by f to get ≈2.06×10²⁶ cycles.',
    '(d) The number of 100000-year intervals is 4.6×10⁹/100000=46000. At 1 s drift per interval, total drift magnitude is 4.60×10⁴ s.',
    'Three significant figures are displayed as requested by the exercise; the age itself is only an estimate.'
  ],'(a) 7.04×10⁻¹⁰ s; (b) 5.11×10¹² cycles; (c) 2.06×10²⁶ cycles; (d) 4.60×10⁴ s');
  entry('1.51','Radius of a low-density planet','units','Use mass 5.5 Earth masses and density 1.76 g/cm³.',[
    'Take Earth mass≈5.97×10²⁴ kg. Planet mass=5.5×5.97×10²⁴≈3.2835×10²⁵ kg.',
    'Convert density: 1.76 g/cm³=1760 kg/m³.',
    'Volume=mass/density≈1.8656×10²² m³.',
    'Radius=∛(3V/4π)≈1.645×10⁷ m=16450 km.',
    'Divide by Earth’s radius≈6370 km: 16450/6370≈2.58. Given the rough mass, report about 1.6×10⁴ km and 2.6 Earth radii.'
  ],'Radius about 1.6×10⁴ km, or 2.6 Earth radii');
  entry('1.52','An area with uncertainty','precision','Length is 7.60±0.01 cm and width is 1.50±0.01 cm.',[
    'Best estimate of area: A=LW=7.60×1.50=11.40 cm².',
    'Check the extreme allowed values: Amax=7.61×1.51=11.4911; Amin=7.59×1.49=11.3091 cm².',
    'The possible shifts are about ±0.091 cm², so report A≈11.40±0.09 cm².',
    'For small worst-case uncertainties, ΔA≈WΔL+LΔW=1.50×0.01+7.60×0.01=0.091 cm².',
    'Divide by LW: ΔA/A≈ΔL/L+ΔW/W=0.01/7.60+0.01/1.50≈0.00798, or 0.798%.',
    'The sum is a first-order worst-case rule; the tiny product ΔLΔW=0.0001 cm² explains the slight asymmetry of the exact limits. Independent statistical uncertainties use a different combination rule.'
  ],'A ≈ (11.40±0.09) cm²; fractional worst-case uncertainty ≈0.80%');
  entry('1.53','Estimate the number of atoms','precision','Build an order-of-magnitude estimate for a human body.',[
    'Choose a body mass, for example 70 kg. State that we approximate its composition as water for a rough estimate.',
    'A water molecule contains three atoms and has mass about 18 atomic mass units. Use 1 u≈1.66×10⁻²⁷ kg.',
    'Mass per molecule≈18×1.66×10⁻²⁷=2.99×10⁻²⁶ kg.',
    'Number of molecules≈70/(2.99×10⁻²⁶)=2.34×10²⁷. Multiply by three atoms per molecule: ≈7.0×10²⁷ atoms.',
    'Real tissue contains carbon and other elements too. The purpose is the scale of the answer, not an exact count.'
  ],'For a 70 kg water-like body: roughly 7×10²⁷ atoms, of order 10²⁸');
  entry('1.54','Estimate the mass of living objects','precision','Use water-like density 1000 kg/m³; the cell’s diameter is 0.5 µm.',[
    'Mass=density×volume. State geometric assumptions whenever dimensions are not supplied.',
    '(a) Model a heart as an ellipsoid with full dimensions 12×8×6 cm. Semiaxes are 6,4,3 cm, so V=(4/3)π×6×4×3≈302 cm³. At 1 g/cm³, mass≈0.30 kg.',
    '(b) Cell radius=0.25 µm=2.5×10⁻⁷ m. V=(4/3)πr³≈6.54×10⁻²⁰ m³. Mass≈6.5×10⁻¹⁷ kg.',
    '(c) Model a bee as a cylinder 1 cm long and 0.35 cm in diameter. V=π(0.175)²×1≈0.096 cm³; mass≈0.096 g≈1×10⁻⁴ kg.',
    'The heart and bee estimates depend on the assumed dimensions. The microscopic cell result uses the diameter supplied in the book.'
  ],'One estimate: (a) 0.30 kg; (b) 6.5×10⁻¹⁷ kg; (c) 1×10⁻⁴ kg');
  vectorEntry('1.55','Build parallel and perpendicular unit vectors','Use A=(3,0,−4). Find unit vectors along A, opposite A, and perpendicular to A in the xz-plane.',[
    part('(a) Along A',[3,0,-4],[0,0,0],'unit',''),part('(b) Opposite A',[-3,0,4],[0,0,0],'unit',''),
    part('(c) First perpendicular',[4,0,3],[0,0,0],'unit',''),part('(c) Second perpendicular',[-4,0,-3],[0,0,0],'unit','')
  ],['|A|=√(3²+(−4)²)=5. Parallel unit vectors come from dividing by 5.','For a perpendicular vector (x,0,z), require A·u=3x−4z=0. The simple choice (4,0,3) works; its negative works too. Divide each by its length 5.'],['Check: 3×0.8−4×0.6=0 and √(0.8²+0.6²)=1. Both conditions are necessary.']);
  const forces56=[pol(100,30),pol(80,120),pol(40,233)];
  vectorEntry('1.56','Balance three rope forces','Fig. P1.56: forces 100 N at 30°, 80 N at 120°, and 40 N at 233° from +x.',[part('Fourth force',[0,0,0],sum(forces56),'subtract','N')],[
    'To balance the forces, their vector sum must be zero. The fourth force must be the negative of the first three combined.',
    ...forces56.map((v,i)=>`Force ${i+1}: x=Fcosθ, y=Fsinθ gives ${t(v)} N.`),
    `Sum of the first three forces = ${t(sum(forces56))} N. Now calculate zero minus that sum.`
  ]);
  route('1.57','The second cave survey','This question uses 177 m west, 215 m at 45° east of south, and 271 m at 30° east of north.',[[-177,0,0],pol(215,315),pol(271,60)],'m',[0,0,0],['These distances differ from 1.23 in this edition. Use the values here, not the earlier route.','Convert the second and third legs with angles 315° and 60° from +x. The closing leg reverses the sum.']);
  route('1.58','A direct rescue flight','Combine 145 km at 68° east of north with 250 km at 48° south of east.',[pol(145,22),pol(250,312)],'km',null,['The first angle from +x is 90°−68°=22°. The second is −48° (or 312°).','Use x=Lcosθ, y=Lsinθ for each. The second leg has a negative y component.']);
  vectorEntry('1.59','Combine electric fields','E₁ is 450 N/C north; E₂ is 600 N/C at 36.9° west of south.',[part('E₁+E₂',[0,450,0],pol(600,233.1),'add','N/C')],[
    'An electric field here is just another vector. You can add its components without studying how the charges produce it.',
    'E₂ points southwest: its standard angle is 270°−36.9°=233.1°. Thus E₂x=−600 sin36.9° and E₂y=−600 cos36.9°.'
  ]);
  route('1.60','Find a sailor’s third leg','Sail 2.00 km east, then 3.50 km southeast; end 5.80 km east of the start.',[[2,0,0],pol(3.5,315)],'km',[5.8,0,0],['Southeast is 45° south of east. Its components are (3.5cos45°,−3.5sin45°,0).']);
  const pull=5.52/(2*Math.cos(P.rad(32)));
  entry('1.61','Two equal pulls','vectors','The two model forces are equally strong, at +32° and −32°, with a combined outward force of 5.52 N.',[
    'Let each force have magnitude F. One vertical component points up and the other down, so Fsin32°−Fsin32°=0.',
    'The horizontal components both point outward. Each is Fcos32°, so together they make 2Fcos32°.',
    `Set 2Fcos32°=5.52. Divide by 2cos32°: F=5.52/(2cos32°)≈${f(pull)} N.`,
    `Check: each horizontal component is 2.76 N, and 2.76+2.76=5.52 N. Each vertical component is ±${f(pull*Math.sin(P.rad(32)))} N and cancels.`,
    'This is an idealised force diagram from the exercise.'
  ],'Each pull is about 3.25 N',{interactive:[part('Combined pull',pol(pull,32),pol(pull,-32),'add','N')]});
  const legs62=[P.bearingVector(101,52),P.bearingVector(165,170),P.bearingVector(124,282)],back62=scale(sum(legs62),-1);
  route('1.62','Return across Switzerland','Use bearings 52°, 170° and 282°, with distances 101, 165 and 124 km.',legs62,'km',[0,0,0],[
    'A bearing starts at north and increases clockwise. This differs from the usual mathematical angle from east.',
    'For bearings use x=Lsin(bearing), y=Lcos(bearing). After adding the flight legs, reverse the sum to return.'
  ],[`The requested direction relative to north is a bearing: atan2(x,y), adjusted to 0°–360°, gives ${f(P.bearing(back62))}° clockwise from north.`]);
  route('1.63','Reach a different landing strip','Fly 23.0 km at 34° south of east, then 46.0 km north. The destination is 32.0 km west of the original airport.',[pol(23,326),[0,46,0]],'km',[-32,0,0],['Use (−32,0,0) km for the destination. Do not confuse that final position with the remaining displacement.']);
  route('1.64','Bring the explorer home','Walk 43 steps northeast, 80 steps at 60° north of west, then 52 steps south.',[pol(43,45),pol(80,120),[0,-52,0]],'steps',[0,0,0],['All steps have the same length, so “steps” can be the distance unit.','Northeast has standard angle 45°. North of west by 60° has angle 180°−60°=120°.']);
  route('1.65','The shortest route to the coin','Combine 20.8 m north, 38.0 m east and 18.0 m at 33° west of south.',[[0,20.8,0],[38,0,0],pol(18,237)],'m',null,['West of south means southwest. The last leg has standard angle 270°−33°=237° and two negative components.','The direct displacement is the shortest route across an unobstructed field.']);
  route('1.66','A building in three dimensions','Move 14.0 m west, 22.0 m up, 12.0 m north and 6.0 m east.',[[-14,0,0],[0,0,22],[0,12,0],[6,0,0]],'m',null,['Use z for height. The west/east movements partly cancel, while north and upward remain separate components.'],['The straight-line separation is √(8²+12²+22²)=√692≈26.3 m. The walking route was 54 m, which is longer.']);
  route('1.67','Back to the car after a detour','Your position relative to the car is 122.0 m at 58° east of south. You then walk 72.0 m west.',[pol(122,328),[-72,0,0]],'m',[0,0,0],[
    'Put the car at the origin. The stated direction describes where you are relative to the car, so your first position is southeast of it.',
    'East of south gives x=122sin58°, y=−122cos58°. Subtract 72 from x for the westward walk. Then reverse the remaining position to get back to the car.'
  ]);
  const saturday=[pol(.6,90),pol(1.4,150)],store=sum(saturday),sundayFirst=pol(.8,130),sundayLast=sub(store,sundayFirst);
  route('1.68','Two routes to one store','Saturday: 0.60 km north then 1.40 km at 60° west of north. Sunday: 0.80 km at 50° north of west, then straight to the store.',saturday,'km',null,[
    'Saturday’s second angle from east is 90°+60°=150°. Sunday’s first angle is 180°−50°=130°.'
  ],[
    `(b) Saturday’s route length is 0.60+1.40=2.00 km. Sunday’s first displacement is ${t(sundayFirst)} km.`,
    `Sunday’s remaining displacement = store position − first displacement = ${t(sundayLast)} km, with length ${f(norm(sundayLast))} km.`,
    `Sunday’s total distance = 0.80+${f(norm(sundayLast))}≈${f(.8+norm(sundayLast))} km. Saturday is longer by about ${f(2-.8-norm(sundayLast))} km.`,
    'Both routes have the same displacement because the endpoints match; their distances travelled differ.'
  ]);
  route('1.69','Return from the treasure','Travel 0.825 km south, 1.25 km at 30° west of north, then 1.00 km at 32° north of east.',[[0,-.825,0],pol(1.25,120),pol(1,32)],'km',[0,0,0],['Convert 825 m to 0.825 km before adding. Standard angles of the next legs are 120° and 32°.']);
  const fence=pol(59,38),south=Math.sqrt(70**2-fence[0]**2)-fence[1];
  entry('1.70','Locate a second fence post','vectors','The first post is 59.0 m at 38° north of east; the second is due south. They are 70.0 m apart.',[
    `Choose your position as (0,0). The first post is (59cos38°,59sin38°)≈${t(fence)} m.`,
    'Let d be your positive distance south to the second post. Its coordinates are (0,−d).',
    `The separation between posts has horizontal amount ${f(fence[0])} and vertical amount ${f(fence[1])}+d.`,
    `Use Pythagoras: 70²=(${f(fence[0])})²+(${f(fence[1])}+d)².`,
    `Take the positive square root because the vertical separation is positive: ${f(fence[1])}+d=√[70²−(${f(fence[0])})²]. Subtract ${f(fence[1])} to obtain d≈${f(south)} m.`,
    'The other algebraic root would place the post north, contradicting the specified direction.'
  ],`Second post: ${f(south)} m due south`,{interactive:[part('Position of second post',[0,-south,0],[0,0,0],'components','m')]});
  route('1.71','A dog’s final run','Run 12.0 m east then 28.0 m at 50° west of north. Finish 10.0 m south of the start.',[[12,0,0],pol(28,140)],'m',[0,-10,0],['The second run’s angle is 90°+50°=140°. The final destination is (0,−10,0) m.']);
  const ricardo=pol(30,150),jane=pol(15,210);
  vectorEntry('1.72','From one person to another','Ricardo walks 30.0 m at 60° west of north; Jane walks 15.0 m at 30° south of west.',[part('Ricardo → Jane',jane,ricardo,'subtract')],[
    `Use the tree as origin. Ricardo’s position is ${t(ricardo)} m and Jane’s position is ${t(jane)} m.`,
    'Displacement from Ricardo to Jane = Jane’s position − Ricardo’s position. Reversing that order gives the wrong walking direction.'
  ]);
  vectorEntry('1.73','Distance between two tents','Joe is 21.0 m at 23° south of east; Karl is 32.0 m at 37° north of east.',[part('Joe → Karl',pol(32,37),pol(21,337),'subtract')],[
    'Use your own tent as origin. Joe’s angle is −23° and Karl’s angle is +37°.',
    'Subtract their position vectors to find the arrow joining them. Its length is the requested separation.'
  ],['A second check uses the 60° angle between the two positions: distance²=21²+32²−2×21×32×cos60°=793.']);
  productEntry('1.74','Why methane has a 109° bond angle','Compare bond directions (1,1,1) and (1,−1,−1).',[['Bond pair',[1,1,1],[1,-1,-1],'']],['A direction vector need not be a unit vector; its length cancels in the angle formula.','Rotate this pair in the 3D lab to see why a flat sketch can be misleading.'],['The answer is arccos(−1/3)≈109.47°. The bonds are not perpendicular.']);
  productEntry('1.75','Work from a slanting force','A 5.00 N force points 60° above −x. The displacement is 0.800 m along +x.',[['Force and displacement',pol(5,120),[.8,0,0],'J']],[
    'Work here means force component along motion × distance. The formula is W=F·s.',
    '60° above −x means a 120° angle from +x. The force’s x component is 5cos120°=−2.5 N.'
  ],['Thus W=(−2.5 N)(0.800 m)=−2.00 J. The negative sign means the force opposes the displacement.']);
  const magneticForce=scale(cross([3e4,0,0],[0,-5,0]),-8e-6);
  entry('1.76','A negative charge reverses the force','products','Use q=−8.00×10⁻⁶ C, v=(3.00×10⁴,0,0) m/s and B=(0,−5.00,0) T.',[
    'Use F=q(v×B). First calculate the cross product, then multiply by the signed charge.',
    'v×B=(0,0,(3.00×10⁴)(−5.00))=(0,0,−1.50×10⁵). The right-hand rule gives −z.',
    'Multiply every component by −8.00×10⁻⁶. Two negative signs make a positive z component: F=(0,0,+1.20) N.',
    'Check the magnitude separately: |q|vBsin90°=(8×10⁻⁶)(3×10⁴)(5)=1.20 N.'
  ],'1.20 N along +z',{interactive:[part('Force F',magneticForce,[0,0,0],'components','N')]});
  const theta77=P.deg(Math.atan2(9,-7));
  entry('1.77','Recover an obtuse angle','products','The dot product is −7.00 and the cross-product magnitude is 9.00.',[
    'Let K=|A||B|>0. Then Kcosθ=−7 and Ksinθ=9.',
    'The negative cosine puts θ between 90° and 180°. A simple arctan(9/−7) would return the wrong quadrant.',
    `Use atan2(9,−7), or find 180°−arctan(9/7). The result is ${f(theta77)}°.`,
    'Check: the cosine is negative and the sine positive, as the two product signs require.'
  ],`θ ≈ ${f(theta77)}°`);
  vectorEntry('1.78','Torque as a cross product','Use r=4.0 m at 36° west of north and F=(0,−22.0,0) N.',[part('Torque r×F',pol(4,126),[0,-22,0],'cross','N·m')],[
    'Torque measures a force’s turning effect. The formula uses the position arrow from the rotation axis to where the force acts.',
    'r has standard angle 126°, so rx=−4sin36°. The z component is rxFy−ryFx=(−4sin36°)(−22)−0.'
  ],['The torque is along +z. Its magnitude is about 52 N·m at the precision of 4.0 m.']);
  entry('1.79','Products with letters','products','Use A=(a,0,−b), B=(0,−c,d), with a,b,c,d positive.',[
    '(a) Dot product: multiply corresponding entries and add: a×0+0×(−c)+(−b)×d=−bd.',
    'Cross x component = AyBz−AzBy = 0×d−(−b)(−c)=−bc.',
    'Cross y component = AzBx−AxBz = (−b)×0−ad=−ad.',
    'Cross z component = AxBy−AyBx = a(−c)−0=−ac. Therefore A×B=(−bc,−ad,−ac).',
    '(b) Set c=0. The dot product remains −bd, so its magnitude is bd. The cross product becomes (0,−ad,0), with magnitude ad along −y.',
    'Now B points +z with length d. A’s signed parallel component is −b, so the dot product is d(−b). Its perpendicular component has length a, so the cross-product magnitude is da.',
    'Right-hand check: +x crossed with +z points −y. The z component of A contributes no cross product with B.'
  ],'(a) A·B=−bd; A×B=(−bc,−ad,−ac). (b) |A·B|=bd; |A×B|=ad, direction −y.',{interactive:[{label:'Explore a=3, b=2, c=0, d=4',a:[3,0,-2],b:[0,0,4],mode:'cross',units:'units²',check:false}]});
  entry('1.80','Angles that maximise each product','products','Let the angle θ range from 0° to 180°, with fixed nonzero vector lengths.',[
    '(a) |A·B|=AB|cosθ| is largest when |cosθ|=1: θ=0° or 180°. At either angle sinθ=0, so |A×B|=0.',
    '(b) |A×B|=ABsinθ is largest at θ=90°. Then the dot product is zero.',
    '(c) A·B=2|A×B| means ABcosθ=2ABsinθ. Cancel AB. The left side must be nonnegative, so θ is in the first quadrant.',
    'Divide by cosθ: tanθ=1/2. Hence θ=arctan(1/2)≈26.565°.'
  ],'(a) 0° or 180°, cross magnitude 0; (b) 90°, dot 0; (c) 26.6°');
  entry('1.81','Find the other product','products','Both vector lengths are 12.0 m; their dot product is 76.0 m².',[
    'Use sin²θ+cos²θ=1. Multiplying by (AB)² gives |A×B|²+(A·B)²=(AB)².',
    'AB=12.0×12.0=144 m².',
    'Cross magnitude=√(144²−76²)=√14960≈122.311 m².',
    'A magnitude cannot be negative, so take the positive square root.'
  ],'|A×B| ≈122 m²');
  entry('1.82','Aim the cross product','products','A has length 5.00 m at 53°. B has length 8.00 m and adjustable direction.',[
    'For in-plane B at angle β, (A×B)z=ABsin(β−53°)=40sin(β−53°) m².',
    '(a) Maximum positive value requires β−53°=90°. Choose β=143°, giving +40 m².',
    '(b) Most negative value requires β−53°=−90°. Choose β=−37°=323°, giving −40 m².',
    '(c) Zero cross product requires parallel arrows: β=53° or 233°.',
    'A B component outside the xy-plane cannot improve the z maximum because it reduces the available in-plane length.'
  ],'B angles from +x: (a) 143°; (b) 323°; (c) 53° or 233°',{interactive:[
    {label:'Try the largest positive z result',a:pol(5,53),b:pol(8,143),mode:'cross',units:'m²',check:false}
  ]});
  const b83=59/(9*Math.cos(P.rad(79)));
  entry('1.83','Magnitude from a dot product','products','A is 9.00 m at 28° west of south; B is 39° south of east; A·B=+59.0 m².',[
    'A’s standard angle is 270°−28°=242°. B’s is 360°−39°=321°.',
    'The angle between them is 321°−242°=79°.',
    `Dot formula: 59.0=(9.00)Bcos79°. Divide by 9cos79°: B≈${f(b83)} m.`,
    'cos79° is positive, consistent with the positive dot product. Do not use 101° by choosing the wrong reference direction.'
  ],`|B| ≈${f(b83)} m`,{interactive:[{label:'Inspect the angle',a:pol(9,242),b:pol(b83,321),mode:'dot',units:'m²',check:false}]});
  const normal84=cross(A39,B39);
  vectorEntry('1.84','A unit vector normal to two vectors','Use A=(−2,3,4), B=(3,1,−3) from 1.39.',[part('One unit normal',normal84,[0,0,0],'unit','')],[
    `A cross product is perpendicular to both inputs. A×B=(3×(−3)−4×1,4×3−(−2)×(−3),(−2)×1−3×3)=${t(normal84)}.`,
    `Its length is √(${f(dot(normal84,normal84))}) = ${f(norm(normal84))}. Divide by this length to make a unit vector.`
  ],['The negative of this unit vector is also a valid answer. Check each by dotting with A and B: both products must be zero.']);
  const c85=[-390/49,-300/49,0];
  entry('1.85','Find a vector from two conditions','products','A=(5,−6.5,0), B=(3.5,−7,0); C is perpendicular to A and C·B=15.',[
    'Let C=(x,y,0). Perpendicular means zero dot product, so 5x−6.5y=0.',
    'Divide the first equation by 5: x=1.3y.',
    'The second dot condition gives 3.5x−7y=15. Substitute x=1.3y: 3.5(1.3y)−7y=15.',
    'Combine like terms: (4.55−7)y=15, so −2.45y=15 and y=−15/2.45≈−6.12245.',
    'Then x=1.3y≈−7.95918. Check: 5x−6.5y=0 and 3.5x−7y=15.'
  ],'C ≈ (−7.96,−6.12,0)',{interactive:[part('C',c85,[0,0,0],'components','units')]});
  const acute86=P.deg(Math.asin(Math.sqrt(29)/9));
  entry('1.86','A cross magnitude leaves two possibilities','products','|A|=|B|=3.00 and A×B=(2,0,−5). Find possible angles.',[
    'Cross-product length = √(2²+0²+(−5)²)=√29≈5.38516.',
    'Use |A×B|=ABsinθ: sinθ=√29/(3×3)=√29/9≈0.59835.',
    `One angle is arcsin(√29/9)≈${f(acute86)}°. Sine has the same value at 180°−θ, giving ${f(180-acute86)}°.`,
    'The supplied normal direction fixes the orientation of the plane, but it does not determine the dot-product sign. Both the acute and obtuse angles remain possible.'
  ],`θ ≈${f(acute86)}° or ${f(180-acute86)}°`);
  entry('1.87','Compare densities with mixed units','units','Convert each row of the sample table to grams and cubic centimetres before ranking.',[
    'Use 1 kg=1000 g; 1 mg=10⁻³ g; 1 µg=10⁻⁶ g; 1 ng=10⁻⁹ g. For volumes: 1 m³=10⁶ cm³; 1 mm³=10⁻³ cm³; 1 µm³=10⁻¹² cm³.',
    'A: mass 8.00 g; volume 1.67×10⁻⁶ m³=1.67 cm³. Density=8/1.67≈4.79 g/cm³.',
    'B: mass 6.00 µg=6.00×10⁻⁶ g; volume 9.38×10⁶ µm³=9.38×10⁻⁶ cm³. Density≈0.640 g/cm³.',
    'C: mass 8.00 mg=0.00800 g; volume 2.50×10⁻³ cm³. Density=3.20 g/cm³.',
    'D: mass 9.00×10⁻⁴ kg=0.900 g; volume 2.81×10³ mm³=2.81 cm³. Density≈0.320 g/cm³.',
    'E: mass 9.00×10⁴ ng=9.00×10⁻⁵ g; volume 1.59×10⁻² mm³=1.59×10⁻⁵ cm³. Density≈5.66 g/cm³.',
    'F: mass 6.00×10⁻² mg=6.00×10⁻⁵ g; volume 1.25×10⁻⁴ cm³. Density=0.480 g/cm³.',
    'Order the resulting density numbers, not the original mass numbers.'
  ],'Increasing density: D, F, B, C, A, E');
  entry('1.88','Separate forces without measuring them directly','products','Resultant lengths are 8.00 N at 0°, 7.43 N at 45°, 7.00 N at 60°, and 5.83 N at 90°.',[
    'Let force lengths be a and b. When aligned, a+b=8.00.',
    'The resultant formula is R²=a²+b²+2abcosθ. At 60°, R²=49=a²+b²+ab.',
    'Square the aligned equation: 64=a²+b²+2ab. Subtract the 60° equation: ab=15.',
    'Substitute b=8−a: a(8−a)=15. Rearrange: a²−8a+15=0=(a−5)(a−3). The two forces are 5 N and 3 N.',
    'Check the rounded measurements: at 90°, √(25+9)=5.83095 N →5.83; at 45°, √(34+30cos45°)=7.43056 N →7.43.',
    `At 30°, R=√(34+30cos30°)≈${f(Math.sqrt(34+30*Math.cos(P.rad(30))))} N.`
  ],'Larger force: 5.00 N. At 30° the resultant is about 7.74 N.',{interactive:[part('30° resultant',[5,0,0],pol(3,30),'add','N')]});
  const earth=[.3182,.9329,0],mars=[1.3087,-.4423,-.0414],em=sub(mars,earth),es=scale(earth,-1),elong=angle(es,em);
  entry('1.89','Earth, Mars and the viewpoint','vectors','Use the book’s 3D positions in AU: Earth=(0.3182,0.9329,0), Mars=(1.3087,−0.4423,−0.0414).',[
    '(a) Put the Sun at (0,0,0). Plot Earth and Mars from their coordinates. Mars lies slightly below the xy-plane because its z value is negative.',
    `(b-i) Sun–Earth distance = √(0.3182²+0.9329²) ≈ ${f(norm(earth),5)} AU.`,
    `(b-ii) Sun–Mars distance = √(1.3087²+(−0.4423)²+(−0.0414)²) ≈ ${f(norm(mars),5)} AU.`,
    `(b-iii) Earth→Mars = Mars−Earth = ${t(em)} AU. Its length is ${f(norm(em),5)} AU.`,
    `(c) From Earth, use Earth→Sun=${t(es)}, not Sun→Earth. Dot this with Earth→Mars and divide by the product of their lengths. Inverse cosine gives ${f(elong)}°.`,
    '(d) In the simplified midnight sketch, your outward view points away from the Sun, and Mars is on the Sunward side (elongation below 90°), so the intended answer is not visible at midnight.',
    'For a precise horizon claim at a real location, latitude, season and local sky coordinates are also needed; high-latitude geometry can invalidate that simplified midnight argument.'
  ],`Distances ≈${f(norm(earth),5)}, ${f(norm(mars),5)}, ${f(norm(em),5)} AU; Earth-view Sun–Mars angle ≈${f(elong)}°.`,{interactive:[
    {label:'Earth → Mars',a:mars,b:earth,mode:'subtract',units:'AU',expected:em},
    {label:'Angle seen from Earth',a:es,b:em,mode:'dot',units:'AU²',check:false}
  ]});
  route('1.90','Plan the drone’s final leg','Start at (10,−50) m; move (90,0), (0,110), (−60,40), (120,180). Destination is (0,−70) m.',[[10,-50,0],[90,0,0],[0,110,0],[-60,40,0],[120,180,0]],'m',[0,-70,0],['The first arrow represents the initial position from the control centre, not an extra flight leg. Include it when calculating the final position.','Current x=10+90+0−60+120=160 m; current y=−50+0+110+40+180=280 m.']);
  const merak=[77,0,0],alkaid=pol(138,25.6),ma=sub(alkaid,merak),ms=scale(merak,-1);
  entry('1.91','The Big Dipper in depth','vectors','Treat Earth and Sun as coincident on this scale. Merak is 77 ly away, Alkaid 138 ly away, separated by 25.6° in our sky.',[
    'Place the Sun at (0,0), Merak at (77,0), and Alkaid at (138cos25.6°,138sin25.6°). A light-year is a distance, not a time.',
    `Alkaid’s coordinates are ${t(alkaid)} ly. Merak→Alkaid = ${t(ma)} ly.`,
    `(a) Separation = length of that difference ≈${f(norm(ma))} ly. Equivalently d²=77²+138²−2×77×138×cos25.6°.`,
    `(b) Move the viewpoint to Merak. Merak→Sun=${t(ms)}; Merak→Alkaid=${t(ma)}.`,
    `Their dot product is ${f(dot(ms,ma),6)} ly². Divide by 77×${f(norm(ma))} and take inverse cosine: angle ≈${f(angle(ms,ma))}°.`,
    'The much larger angle at Merak shows why changing viewpoint changes the apparent arrangement of stars.'
  ],`(a) ≈${f(norm(ma))} ly; (b) ≈${f(angle(ms,ma))}°`,{interactive:[part('Merak → Alkaid',alkaid,merak,'subtract','ly'),{label:'Merak’s sky',a:ms,b:ma,mode:'dot',units:'ly²',check:false}]});
  entry('1.92','Total alveolar volume','units','Use 480×10⁶ alveoli, each averaging 4.2×10⁶ µm³.',[
    'Total volume = number × volume per sac = (480×10⁶)(4.2×10⁶)=2.016×10¹⁵ µm³.',
    'Because 1 µm=10⁻⁶ m, 1 µm³=10⁻¹⁸ m³. Multiply to obtain 2.016×10⁻³ m³.',
    'One cubic metre is 1000 L. Thus total volume=2.016 L≈2.0 L.'
  ],'Choice (c): 2.0 L');
  entry('1.93','Diameter of one air sac','units','Assume a sphere of volume 4.2×10⁶ µm³.',[
    'The sphere formula is V=(4/3)πr³. Solve for r: r=∛(3V/4π).',
    'r=∛[3(4.2×10⁶)/(4π)]≈100.1 µm.',
    'Diameter=2r≈200.2 µm. Since 1000 µm=1 mm, diameter≈0.2002 mm.',
    'Do not report the radius when the question asks for the diameter.'
  ],'Choice (a): 0.20 mm');
  entry('1.94','Read the pattern in the scatter plot','reasoning','Interpret Fig. P1.94: total lung volume changes substantially while mean alveolar size stays around 4–5 million µm³.',[
    'The horizontal axis is total lung volume; the vertical axis is the average volume of one alveolus.',
    'The points scatter around a similar vertical level rather than showing a strong upward or downward trend.',
    'Total gas-exchanging volume is approximately number × average volume per alveolus. If average size stays roughly constant, more total volume means more alveoli.',
    '“Constant” here means approximately unchanged within the scatter, not exactly equal for all six people.'
  ],'Best choice (c): approximately constant individual volume, increasing number of alveoli');

  const guideA=pol(72.4,58),guideB=pol(57.3,216),guideC=[0,-17.8,0];
  route('VP1.7.1','Close the example route','Use Example 1.7: A=72.4 m at 58°, B=57.3 m at 216°, C=17.8 m south.',[guideA,guideB,guideC],'m',[0,0,0],['The missing arrow D must satisfy A+B+C+D=0, so D=−(A+B+C).']);
  route('VP1.7.2','Reverse only the middle arrow','Using Example 1.7, find S=A−B+C.',[guideA,scale(guideB,-1),guideC],'m',null,['The book’s expression is A−B+C. Reverse B, keep A and C unchanged, then add the three arrows.']);
  route('VP1.7.3','Double the southward leg','Using Example 1.7, find T=A+B+2C.',[guideA,guideB,scale(guideC,2)],'m',null,['Doubling C changes its southward component from −17.8 to −35.6 m.']);
  route('VP1.7.4','Finish northwest of the starting point','First walk A=72.4 m at 58°. End 38.0 m at 37° west of north.',[guideA],'m',pol(38,127),['The target angle is 90°+37°=127°. The second displacement is target−A.']);
  productEntry('VP1.10.1','Build a dot product from compass directions','A=5.00 at 36.9° south of east; B=6.40 at 20° west of north.',[['A and B',pol(5,-36.9),pol(6.4,110),'']],['Convert A at −36.9° and B at 110° using x=Lcosθ and y=Lsinθ. These components answer part (a); the dot calculation answers part (b).']);
  productEntry('VP1.10.2','Mix polar and component descriptions','C has length 6.50 at 55°; D=(4.80,−8.40,0).',[['C and D',pol(6.5,55),[4.8,-8.4,0],'']],['Convert C to components first. D is already in component form.']);
  productEntry('VP1.10.3','An almost right angle in 3D','Use A=(−5,3,0), B=(2.5,4,−1.5).',[['A and B',[-5,3,0],[2.5,4,-1.5],'']],['Include all three component products even when one is zero. The small negative dot product means a slightly obtuse angle.']);
  productEntry('VP1.10.4','Recover an unknown force component','s=(4,5,0) m, Fx=−12 N, and W=26 J.',[['Force and displacement',[-12,14.8,0],[4,5,0],'J']],[
    'W=F·s=Fx sx+Fy sy. Substitute the known quantities: 26=(−12)(4)+5Fy.',
    '26=−48+5Fy. Add 48 to both sides: 74=5Fy. Divide by 5: Fy=14.8 N.',
    'Now use F=(−12,14.8,0) N to find the angle with s.'
  ]);
  const weight=425/Math.cos(P.rad(35));
  entry('Bridge','Vectors on the roof','vectors','A roof slopes at 35°. The allowed perpendicular weight component is 425 N; sliding distance is 1.50 m.',[
    'Weight points vertically down. Split it into a part pushing into the roof and a part pulling down the slope.',
    'The perpendicular component is Wcos35°. At the allowed maximum, Wcos35°=425 N.',
    `Divide by cos35°: W=425/cos35°≈${f(weight)} N, or about 5.2×10² N.`,
    `The downslope component is Wsin35°≈${f(weight*Math.sin(P.rad(35)))} N. Only this component does work during motion along the roof.`,
    `Work=(Wsin35°)(1.50 m)≈${f(weight*Math.sin(P.rad(35))*1.5)} J≈4.5×10² J.`,
    'Alternatively, the angle between downward weight and downslope motion is 55°, so W×1.50×cos55° gives the same result. The work is positive because the weight helps the slide.'
  ],'Maximum weight ≈5.2×10² N; work ≈4.5×10² J',{interactive:[{label:'Weight and sliding displacement',a:[0,-weight,0],b:pol(1.5,215),mode:'dot',units:'J',check:false}]});
  // Keep multi-part summary boxes as complete as the step-by-step explanations.
  const byId=id=>items.find(item=>item.id===id);
  byId('1.36').answer=`(a) |A| ≈ ${f(norm(A36))}, |B| ≈ ${f(norm(B36))}.\n(b–c) ${byId('1.36').answer}`;
  byId('1.39').answer=`(a) |A| ≈ ${f(norm(A39))}, |B| ≈ ${f(norm(B39))}.\n(b–c) ${byId('1.39').answer}\n|B−A| has the same value.`;
  byId('1.46').answer=`(a) A·B ≈ ${f(dot(fig37.A,fig37.B))} m².\n${byId('1.46').answer}`;
  byId('1.62').answer=`(a) Return distance ≈ ${f(norm(back62))} km.\n(b) Bearing ≈ ${f(P.bearing(back62))}° clockwise from north.\nComponents: ${t(back62)} km.`;
  byId('1.68').answer=`(a) Straight-line distance ≈ ${f(norm(store))} km.\n(b) Saturday: 2.00 km. Sunday: ${f(.8+norm(sundayLast))} km. Saturday is about ${f(2-.8-norm(sundayLast))} km longer.`;
  byId('VP1.10.4').answer=`(a) Fy = 14.8 N.\n(b) Angle ≈ ${f(angle([-12,14.8,0],[4,5,0]))}°.`;
  return {items,topics,fig22,fig33,fig37};
});
