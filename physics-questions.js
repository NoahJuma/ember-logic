(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;else root.PhysicsQuestions=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  // Complete question wording from the user-supplied 2019 SI edition.
  // Line wrapping, vector arrows, subscripts and superscripts are normalised for the screen.
  const text={
    'Q1.1':`How many correct experiments do we need to disprove a theory? How many do we need to prove a theory? Explain.`,
    'Q1.2':`Suppose you are asked to compute the tangent of 5.00 meters. Is this possible? Why or why not?`,
    'Q1.3':`A rather ordinary middle-aged woman is in the hospital for a routine checkup. The nurse writes “140” on the patient’s medical chart but forgets to include the units. Which of these quantities could the 140 plausibly represent: the patient’s mass in kilograms? her height in centimeters?`,
    'Q1.4':`Several countries maintain accurate copies of the platinum-irydium cylinder used as the international standard of kilogram up until May 2019. The first batch of these copies, made in 1889, has on average gained 25 µg per century, in spite of careful cleaning. Does this apparent increase have any importance? Explain.`,
    'Q1.5':`What physical phenomena (other than a pendulum or cesium clock) could you use to define a time standard?`,
    'Q1.6':`Describe how you could measure the thickness of a sheet of paper with an ordinary ruler.`,
    'Q1.7':`The quantity π = 3.14159… is a number with no dimensions, since it is a ratio of two lengths. Describe two or three other geometrical or physical quantities that are dimensionless.`,
    'Q1.8':`What are the units of volume? Suppose another student tells you that a cylinder of radius r and height h has volume given by πr³h. Explain why this cannot be right.`,
    'Q1.9':`Three archers each fire four arrows at a target. Joe’s four arrows hit points that are spread around in a region that goes 10 cm above, 10 cm below, 10 cm to the left, and 10 cm to the right of the center of the target. All four of Moe’s arrows hit within 1 cm of a point 20 cm from the center, and Flo’s four arrows hit within 1 cm of the center. The contest judge says that one of the archers is precise but not accurate, another archer is accurate but not precise, and the third archer is both accurate and precise. Which description applies to which archer? Explain.`,
    'Q1.10':`Is the vector (î + ĵ + k̂) a unit vector? Is the vector (3.0î − 2.0ĵ) a unit vector? Justify your answers.`,
    'Q1.11':`A circular racetrack has a radius of 500 m. What is the displacement of a bicyclist when she travels around the track from the north side to the south side? When she makes one complete circle around the track? Explain.`,
    'Q1.12':`Can you find two vectors with different lengths that have a vector sum of zero? What length restrictions are required for three vectors to have a vector sum of zero? Explain.`,
    'Q1.13':`The “direction of time” is said to proceed from past to future. Does this mean that time is a vector quantity? Explain.`,
    'Q1.14':`Air traffic controllers give instructions called “vectors” to tell airline pilots in which direction they are to fly. If these are the only instructions given, is the name “vector” used correctly? Why or why not?`,
    'Q1.15':`Can you find a vector quantity that has a magnitude of zero but components that are not zero? Explain. Can the magnitude of a vector be less than the magnitude of any of its components? Explain.`,
    'Q1.16':`(a) Does it make sense to say that a vector is negative? Why?
(b) Does it make sense to say that one vector is the negative of another? Why? Does your answer here contradict what you said in part (a)?`,
    'Q1.17':`If vec(C) = vec(A) + vec(B), what must be true about the directions and magnitudes of vec(A) and vec(B) if C = A + B? What must be true about the directions and magnitudes of vec(A) and vec(B) if C = 0?`,
    'Q1.18':`If vec(A) and vec(B) are nonzero vectors, is it possible for both vec(A) · vec(B) and vec(A) × vec(B) to be zero? Explain.`,
    'Q1.19':`What does vec(A) · vec(A), the scalar product of a vector with itself, give? What about vec(A) × vec(A), the vector product of a vector with itself?`,
    'Q1.20':`Let vec(A) represent any nonzero vector. Why is vec(A)/A a unit vector, and what is its direction? If θ is the angle that vec(A) makes with the +x-axis, explain why (vec(A)/A) · î is called the direction cosine for that axis.`,
    'Q1.21':`Figure 1.6 shows the result of an unacceptable error in the stopping position of a train. If a train travels 890 km from Berlin to Paris and then overshoots the end of the track by 10.0 m, what is the percent error in the total distance covered? Is it correct to write the total distance covered by the train as 890,010 m? Explain.`,
    'Q1.22':`Which of the following are legitimate mathematical operations:
(a) vec(A) · (vec(B) − vec(C));
(b) (vec(A) − vec(B)) × vec(C);
(c) vec(A) · (vec(B) × vec(C));
(d) vec(A) × (vec(B) × vec(C));
(e) vec(A) × (vec(B) · vec(C))?
In each case, give the reason for your answer.`,
    'Q1.23':`Consider the vector products vec(A) × (vec(B) × vec(C)) and (vec(A) × vec(B)) × vec(C). Give an example that illustrates the general rule that these two vector products do not have the same magnitude or direction. Can you choose vectors vec(A), vec(B), and vec(C) such that these two vector products are equal? If so, give an example.`,
    'Q1.24':`Show that, no matter what vec(A) and vec(B) are, vec(A) · (vec(A) × vec(B)) = 0. (Hint: Do not look for an elaborate mathematical proof. Consider the definition of the direction of the cross product.)`,
    'Q1.25':`(a) If vec(A) · vec(B) = 0, does it necessarily follow that A = 0 or B = 0? Explain.
(b) If vec(A) × vec(B) = 0, does it necessarily follow that A = 0 or B = 0? Explain.`,
    'Q1.26':`If vec(A) = 0 for a vector in the xy-plane, does it follow that Aₓ = −Aᵧ? What can you say about Aₓ and Aᵧ?`,
    '1.1':`How many years older will you be 1.00 gigasecond from now? (Assume a 365-day year.)`,
    '1.2':`You read in a brochure that Kensington Gardens, one of London’s eight Royal Parks, covers an area of 265 acres. An acre is a British unit widely used in land measurement in the UK (1 acre = 43,560 ft² and 1 ft = 0.3048 m, see Appendix C). What is the area of Kensington Gardens in square meters? in square kilometers? in hectares (a hectare is a unit of area equal to 10,000 m² used in land measurement)?`,
    '1.3':`How many nanoseconds does it take light to travel 0.3 m in vacuum?`,
    '1.4':`The density of silver is 10.5 g/cm³. What is this value in kilograms per cubic meter?`,
    '1.5':`In the ancient Roman Empire, large distances were measured in miliarum. A miliarum was subdivided into 8 stadia, 1 stadium into 125 passus, 1 passus into 5 pes, 1 pes into 4 palmus, 1 palmus into 4 digitus. Knowing that 1 pes = 0.296 m, find the number of (a) meters in 1.00 miliarum and (b) centimeters in 1.00 digitus.`,
    '1.6':`The speed limits in Ireland were changed from imperial (miles per hour, mi/h) to metric (kilometers per hour, km/h) on 20 January 2005. Use 1 mi = 5280 ft and 1 ft = 30.48 cm to:
(a) convert the former 30 mi/h speed limit for build-up areas to units of km/h and compare this result with the new 50 km/h speed limit;
(b) convert the new 120 km/h speed limit for motorways to units of mi/h and compare this result with the old 70 mi/h speed limit.`,
    '1.7':`Fuel consumption of a car is the amount of fuel used per unit distance. It is customary to give fuel consumption in liters per 100 km (L/100 km). For example, the 2019 Austin Mini Cooper has a fuel consumption of 5.5 L/100 km, that is, it uses 5.5 liters of petrol per every 100 km driven.
(a) If this car’s petrol tank holds 40 L, how many tanks of petrol will you use to drive 1200 km?
(b) You read in an English car magazine that the classic 1964 Austin Mini Cooper has an average estimated “mileage of 30.5 miles per gallon” (where 1 mile = 1.609 km is a British unit of distance and 1 gallon (UK) = 4.546 L is a British unit of capacity, see Appendix C). Find the fuel consumption of this car and compare it with the 2019 model.`,
    '1.8':`(a) The recommended daily allowance (RDA) of the trace metal magnesium is 410 mg/day for males. Express this quantity in µg/day.
(b) For adults, the RDA of the amino acid lysine is 12 mg per kg of body weight. How many grams per day should a 77-kg adult receive?
(c) A typical multivitamin tablet can contain 2.0 mg of vitamin B₂ (riboflavin), and the RDA is 0.0030 g/day. How many such tablets should a person take each day to get the proper amount of this vitamin, if he gets none from other sources?
(d) The RDA for the trace element selenium is 0.000070 g/day. Express this dose in mg/day.`,
    '1.9':`Neptunium. In the fall of 2002, scientists at Los Alamos National Laboratory determined that the critical mass of neptunium-237 is about 60 kg. The critical mass of a fissionable material is the minimum amount that must be brought together to start a nuclear chain reaction. Neptunium-237 has a density of 19.5 g/cm³. What would be the radius of a sphere of this material that has a critical mass?`,
    '1.10':`Bacteria. Bacteria vary in size, but a diameter of 2.0 µm is not unusual. What are the volume (in cubic centimeters) and surface area (in square millimeters) of a spherical bacterium of that size? (Consult Appendix D for relevant formulas.)`,
    '1.11':`With a wooden ruler, you measure the length of a rectangular piece of sheet metal to be 12 mm. With micrometer calipers, you measure the width of the rectangle to be 5.98 mm. Use the correct number of significant figures: What are
(a) the area of the rectangle;
(b) the ratio of the rectangle’s width to its length;
(c) the perimeter of the rectangle;
(d) the difference between the length and the width; and
(e) the ratio of the length to the width?`,
    '1.12':`The volume of a solid cylinder is given by V = πr²h, where r is the radius and h is the height. You measure the radius and height of a thin cylindrical wire and obtain the results r = 0.036 cm and h = 12.1 cm. What do your measurements give for the volume of the wire in mm³? Use the correct number of significant figures in your answer.`,
    '1.13':`A useful and easy-to-remember approximate value for the number of seconds in a year is π × 10⁷. Determine the percent error in this approximate value. (There are 365.24 days in one year.)`,
    '1.14':`Express each approximation of π to six significant figures:
(a) 22/7 and
(b) 355/113.
(c) Are these approximations accurate to that precision?`,
    '1.15':`Which of the values given below are plausible for an average adult male giraffe:
(a) height of 2 m or 5 m?
(b) mass of 1500 kg or 5000 kg?
(c) maximal speed of 15 m/s or 45 m/s?`,
    '1.16':`How many liters of petrol are used in Italy in one day? Assume that there are two cars for every three people, that each car is driven an average of 10,000 kilometers per year, and that the petrol consumption of an average car is 8 liters per 100 kilometers. Assume that the population of Italy is approximately 60 million.`,
    '1.17':`In Wagner’s opera Das Rheingold, the goddess Freia is ransomed for a pile of gold just tall enough and wide enough to hide her from sight. Estimate the monetary value of this pile. The density of gold is 19.3 g/cm³, and take its value to be about $40 per gram.`,
    '1.18':`Four astronauts are in a spherical space station.
(a) If, as is typical, each of them breathes about 500 cm³ of air with each breath, approximately what volume of air (in cubic meters) do these astronauts breathe in a year?
(b) What would the diameter (in meters) of the space station have to be to contain all this air?`,
    '1.19':`You are using water to dilute small amounts of chemicals in the laboratory, drop by drop. How many drops of water are in a 1.0 L bottle? (Hint: Start by estimating the diameter of a drop of water.)`,
    '1.20':`How many times does a human heart beat during a person’s lifetime? How many liters of blood does it pump? (Estimate that the heart pumps 50 cm³ of blood with each beat and assume a 365-day year.)`,
    '1.21':`A postal employee drives a delivery truck along the route shown in Fig. E1.21. Determine the magnitude and direction of the resultant displacement by drawing a scale diagram. (See also Exercise 1.28 for a different approach.)`,
    '1.22':`For the vectors vec(A) and vec(B) in Fig. E1.22, use a scale drawing to find the magnitude and direction of
(a) the vector sum vec(A) + vec(B) and
(b) the vector difference vec(A) − vec(B).
Use your answers to find the magnitude and direction of
(c) −vec(A) − vec(B) and
(d) vec(B) − vec(A).
(See also Exercise 1.29 for a different approach.)`,
    '1.23':`A spelunker is surveying a cave. She follows a passage 180 m straight west, then 210 m in a direction 45° east of south, and then 280 m at 30° east of north. After a fourth displacement, she finds herself back where she started. Use a scale drawing to determine the magnitude and direction of the fourth displacement. (See also Problem 1.57 for a different approach.)`,
    '1.24':`Let θ be the angle that the vector vec(A) makes with the +x-axis, measured counterclockwise from that axis. Find angle θ for a vector that has these components:
(a) Aₓ = 2.00 m, Aᵧ = −1.00 m;
(b) Aₓ = 2.00 m, Aᵧ = 1.00 m;
(c) Aₓ = −2.00 m, Aᵧ = 1.00 m;
(d) Aₓ = −2.00 m, Aᵧ = −1.00 m.`,
    '1.25':`Compute the x- and y-components of the vectors vec(A), vec(B), vec(C), and vec(D) in Fig. E1.22.`,
    '1.26':`Vector vec(A) is in the direction 40.0° clockwise from the −y-axis. The x-component of vec(A) is Aₓ = −20.0 m.
(a) What is the y-component of vec(A)?
(b) What is the magnitude of vec(A)?`,
    '1.27':`Vector vec(A) has y-component Aᵧ = +13.0 m. vec(A) makes an angle of 32.0° counterclockwise from the +y-axis.
(a) What is the x-component of vec(A)?
(b) What is the magnitude of vec(A)?`,
    '1.28':`A postal employee drives a delivery truck over the route shown in Fig. E1.21. Use the method of components to determine the magnitude and direction of her resultant displacement. In a vector-addition diagram (roughly to scale), show that the resultant displacement found from your diagram is in qualitative agreement with the result you obtained by using the method of components.`,
    '1.29':`For the vectors vec(A) and vec(B) in Fig. E1.22, use the method of components to find the magnitude and direction of
(a) the vector sum vec(A) + vec(B);
(b) the vector sum vec(B) + vec(A);
(c) the vector difference vec(A) − vec(B);
(d) the vector difference vec(B) − vec(A).`,
    '1.30':`Find the magnitude and direction of the vector represented by the following pairs of components:
(a) Aₓ = −8.60 cm, Aᵧ = 5.20 cm;
(b) Aₓ = −9.70 m, Aᵧ = −2.45 m;
(c) Aₓ = 7.75 km, Aᵧ = −2.70 km.`,
    '1.31':`A disoriented physics professor drives 3.25 km north, then 2.20 km west, and then 1.50 km south. Find the magnitude and direction of the resultant displacement, using the method of components. In a vector-addition diagram (roughly to scale), show that the resultant displacement found from your diagram is in qualitative agreement with the result you obtained by using the method of components.`,
    '1.32':`Vector vec(A) has magnitude 8.00 m and is in the xy-plane at an angle of 127° counterclockwise from the +x-axis (37° past the +y-axis). What are the magnitude and direction of vector vec(B) if the sum vec(A) + vec(B) is in the −y-direction and has magnitude 12.0 m?`,
    '1.33':`Vector vec(A) is 2.80 cm long and is 60.0° above the x-axis in the first quadrant. Vector vec(B) is 1.90 cm long and is 60.0° below the x-axis in the fourth quadrant (Fig. E1.33). Use components to find the magnitude and direction of
(a) vec(A) + vec(B);
(b) vec(A) − vec(B);
(c) vec(B) − vec(A).
In each case, sketch the vector addition or subtraction and show that your numerical answers are in qualitative agreement with your sketch.`,
    '1.34':`In each case, find the x- and y-components of vector vec(A):
(a) vec(A) = 3.20î − 6.50ĵ;
(b) vec(A) = 18.2ĵ − 7.91î;
(c) vec(A) = −12.0î + 21.2ĵ;
(d) vec(A) = 5.0vec(B), where vec(B) = 8î − 4ĵ.`,
    '1.35':`Write each vector in Fig. E1.22 in terms of the unit vectors î and ĵ.`,
    '1.36':`Given two vectors vec(A) = 4.00î + 7.00ĵ and vec(B) = 5.00î − 2.00ĵ,
(a) find the magnitude of each vector;
(b) use unit vectors to write an expression for the vector difference vec(A) − vec(B); and
(c) find the magnitude and direction of the vector difference vec(A) − vec(B).
(d) In a vector diagram show vec(A), vec(B), and vec(A) − vec(B), and show that your diagram agrees qualitatively with your answer to part (c).`,
    '1.37':`(a) Write each vector in Fig. E1.37 in terms of the unit vectors î and ĵ.
(b) Use unit vectors to express vector vec(C), where vec(C) = 3.00vec(A) − 4.00vec(B).
(c) Find the magnitude and direction of vec(C).`,
    '1.38':`You are given two vectors vec(A) = −3.00î + 6.00ĵ and vec(B) = 7.00î + 2.00ĵ. Let counterclockwise angles be positive.
(a) What angle does vec(A) make with the +x-axis?
(b) What angle does vec(B) make with the +x-axis?
(c) Vector vec(C) is the sum of vec(A) and vec(B), so vec(C) = vec(A) + vec(B). What angle does vec(C) make with the +x-axis?`,
    '1.39':`Given two vectors vec(A) = −2.00î + 3.00ĵ + 4.00k̂ and vec(B) = 3.00î + 1.00ĵ − 3.00k̂,
(a) find the magnitude of each vector;
(b) use unit vectors to write an expression for the vector difference vec(A) − vec(B); and
(c) find the magnitude of the vector difference vec(A) − vec(B). Is this the same as the magnitude of vec(B) − vec(A)? Explain.`,
    '1.40':`(a) Find the scalar product of the vectors vec(A) and vec(B) given in Exercise 1.36.
(b) Find the angle between these two vectors.`,
    '1.41':`For the vectors vec(A), vec(B), and vec(C) in Fig. E1.22, find the scalar products
(a) vec(A) · vec(B);
(b) vec(B) · vec(C);
(c) vec(A) · vec(C).`,
    '1.42':`Find the vector product vec(A) × vec(B) (expressed in unit vectors) of the two vectors given in Exercise 1.36. What is the magnitude of the vector product?`,
    '1.43':`Find the angle between each of these pairs of vectors:
(a) vec(A) = −2.00î + 6.00ĵ and vec(B) = 2.00î + 3.00ĵ
(b) vec(A) = 3.00î + 5.00ĵ and vec(B) = 10.00î + 6.00ĵ
(c) vec(A) = −4.00î + 2.00ĵ and vec(B) = 7.00î + 14.00ĵ`,
    '1.44':`For the two vectors in Fig. E1.33, find the magnitude and direction of
(a) the vector product vec(A) × vec(B);
(b) the vector product vec(B) × vec(A).`,
    '1.45':`For the two vectors vec(A) and vec(D) in Fig. E1.22, find the magnitude and direction of
(a) the vector product vec(A) × vec(D);
(b) the vector product vec(D) × vec(A).`,
    '1.46':`For the two vectors vec(A) and vec(B) in Fig. E1.37, find
(a) the scalar product vec(A) · vec(B);
(b) the magnitude and direction of the vector product vec(A) × vec(B).`,
    '1.47':`The vector product of vectors vec(A) and vec(B) has magnitude 16.0 m² and is in the +z-direction. If vector vec(A) has magnitude 8.0 m and is in the −x-direction, what are the magnitude and direction of vector vec(B) if it has no x-component?`,
    '1.48':`The angle between two vectors is θ.
(a) If θ = 30.0°, which has the greater magnitude: the scalar product or the vector product of the two vectors?
(b) For what value (or values) of θ are the magnitudes of the scalar product and the vector product equal?`,
    '1.49':`White Dwarfs and Neutron Stars. Recall that density is mass divided by volume, and consult Appendix D as needed.
(a) Calculate the average density of the earth in g/cm³, assuming our planet is a perfect sphere.
(b) In about 5 billion years, at the end of its lifetime, our sun will end up as a white dwarf that has about the same mass as it does now but is reduced to about 15,000 km in diameter. What will be its density at that stage?
(c) A neutron star is the remnant of certain supernovae (explosions of giant stars). Typically, neutron stars are about 20 km in diameter and have about the same mass as our sun. What is a typical neutron star density in g/cm³?`,
    '1.50':`The Hydrogen Maser. A maser is a laser-type device that produces electromagnetic waves with frequencies in the microwave and radio-wave bands of the electromagnetic spectrum. You can use the radio waves generated by a hydrogen maser as a standard of frequency. The frequency of these waves is 1,420,405,751.786 hertz. (A hertz is another name for one cycle per second.) A clock controlled by a hydrogen maser is off by only 1 s in 100,000 years. For the following questions, use only three significant figures. (The large number of significant figures given for the frequency simply illustrates the remarkable accuracy to which it has been measured.)
(a) What is the time for one cycle of the radio wave?
(b) How many cycles occur in 1 h?
(c) How many cycles would have occurred during the age of the earth, which is estimated to be 4.6 × 10⁹ years?
(d) By how many seconds would a hydrogen maser clock be off after a time interval equal to the age of the earth?`,
    '1.51':`An Earthlike Planet. In January 2006 astronomers reported the discovery of a planet, comparable in size to the earth, orbiting another star and having a mass about 5.5 times the earth’s mass. It is believed to consist of a mixture of rock and ice, similar to Neptune. If this planet has the same density as Neptune (1.76 g/cm³), what is its radius expressed
(a) in kilometers and
(b) as a multiple of earth’s radius?
Consult the back of the book for astronomical data.`,
    '1.52':`A rectangular piece of aluminum is 7.60 ± 0.01 cm long and 1.50 ± 0.01 cm wide.
(a) Find the area of the rectangle and the uncertainty in the area.
(b) Verify that the fractional uncertainty in the area is equal to the sum of the fractional uncertainties in the length and in the width. (This is a general result.)`,
    '1.53':`Estimate the number of atoms in your body. (Hint: Based on what you know about biology and chemistry, what are the most common types of atom in your body? What is the mass of each type of atom? Appendix F gives the atomic masses of different elements, measured in atomic mass units; you can find the value of an atomic mass unit, or 1 u, in Appendix B.)`,
    '1.54':`Biological tissues are typically made up of 98% water. Given that the density of water is 1.0 × 10³ kg/m³, estimate the mass of
(a) the heart of an adult human;
(b) a cell with a diameter of 0.5 µm;
(c) a honeybee.`,
    '1.55':`Vector vec(A) = 3.0î − 4.0k̂.
(a) Construct a unit vector that is parallel to vec(A).
(b) Construct a unit vector that is antiparallel to vec(A).
(c) Construct two unit vectors that are perpendicular to vec(A) and that have no y-component.`,
    '1.56':`Three horizontal ropes pull on a large stone stuck in the ground, producing the vector forces vec(A), vec(B), and vec(C) shown in Fig. P1.56. Find the magnitude and direction of a fourth force on the stone that will make the vector sum of the four forces zero.`,
    '1.57':`As noted in Exercise 1.23, a spelunker is surveying a cave. She follows a passage 177 m straight west, then 215 m in a direction 45° east of south, and then 271 m at 30° east of north. After a fourth displacement, she finds herself back where she started. Use the method of components to determine the magnitude and direction of the fourth displacement. Draw the vector-addition diagram and show that it is in qualitative agreement with your numerical solution.`,
    '1.58':`Emergency Landing. A plane leaves the airport in Galisteo and flies 145 km at 68.0° east of north; then it changes direction to fly 250 km at 48.0° south of east, after which it makes an immediate emergency landing in a pasture. When the airport sends out a rescue crew, in which direction and how far should this crew fly to go directly to this plane?`,
    '1.59':`A charged object with electric charge q produces an electric field. The SI unit for electric field is N/C, where N is the SI unit for force and C is the SI unit for charge. If at point P there are electric fields from two or more charged objects, then the resultant field is the vector sum of the fields from each object. At point P the electric field vec(E)₁ from charge q₁ is 450 N/C in the +y-direction, and the electric field vec(E)₂ from charge q₂ is 600 N/C in the direction 36.9° from the −y-axis toward the −x-axis. What are the magnitude and direction of the resultant field vec(E) = vec(E)₁ + vec(E)₂ at point P due to these two charges?`,
    '1.60':`A sailor in a small sailboat encounters shifting winds. She sails 2.00 km east, next 3.50 km southeast, and then an additional distance in an unknown direction. Her final position is 5.80 km directly east of the starting point (Fig. P1.60). Find the magnitude and direction of the third leg of the journey. Draw the vector-addition diagram and show that it is in qualitative agreement with your numerical solution.`,
    '1.61':`Dislocated Shoulder. A patient with a dislocated shoulder is put into a traction apparatus as shown in Fig. P1.61. The pulls vec(A) and vec(B) have equal magnitudes and must combine to produce an outward traction force of 5.52 N on the patient’s arm. How large should these pulls be?`,
    '1.62':`On a training flight in Switzerland, a student pilot flies from Bern to Zurich, next to Lugano, and then to Sion (Fig. P1.62). The directions are shown relative to north: 0° is north, 90° is east, 180° is south, and 270° is west. Use the method of components to find
(a) the distance she has to fly from Sion to get back to Bern, and
(b) the direction (relative to north) she must fly to get there.
Illustrate your solutions with a vector diagram.`,
    '1.63':`You leave the airport in Wagga Wagga and fly 23.0 km in a direction 34.0° south of east. You then fly 46.0 km due north. How far and in what direction must you then fly to reach a private landing strip that is 32.0 km due west of the Wagga Wagga airport?`,
    '1.64':`Getting Back. An explorer in Antarctica leaves his shelter during a whiteout. He takes 43 steps northeast, next 80 steps at 60° north of west, and then 52 steps due south. Assume all of his steps are equal in length.
(a) Sketch, roughly to scale, the three vectors and their resultant.
(b) Save the explorer from becoming hopelessly lost by giving him the displacement, calculated by using the method of components, that will return him to his shelter.`,
    '1.65':`As a test of orienteering skills, your physics class holds a contest in a large, open field. Each contestant is told to travel 20.8 m due north from the starting point, then 38.0 m due east, and finally 18.0 m in the direction 33.0° west of south. After the specified displacements, a contestant will find a silver coin hidden under a rock. The winner is the person who takes the shortest time to reach the location of the silver coin. Remembering what you learned in class, you run on a straight line from the starting point to the hidden coin. How far and in what direction do you run?`,
    '1.66':`You are standing on a street corner with your friend. You then travel 14.0 m due west across the street and into your apartment building. You travel in the lift 22.0 m upward to your floor, walk 12.0 m north to the door of your apartment, and then walk 6.0 m due east to your balcony that overlooks the street. Your friend is standing where you left her. Now how far are you from your friend?`,
    '1.67':`You are lost at night in a large, open field. Your GPS tells you that you are 122.0 m from your car, in a direction 58.0° east of south. You walk 72.0 m due west along a ditch. How much farther, and in what direction, must you walk to reach your car?`,
    '1.68':`You live in a town where the streets are straight but are in a variety of directions. On Saturday you go from your apartment to the grocery store by driving 0.60 km due north and then 1.40 km in the direction 60.0° west of north. On Sunday you again travel from your apartment to the same store but this time by driving 0.80 km in the direction 50.0° north of west and then in a straight line to the store.
(a) How far is the store from your apartment?
(b) On which day do you travel the greater distance, and how much farther do you travel? Or, do you travel the same distance on each route to the store?`,
    '1.69':`While following a treasure map, you start at an old oak tree. You first walk 825 m directly south, then turn and walk 1.25 km at 30.0° west of north, and finally walk 1.00 km at 32.0° north of east, where you find the treasure: a biography of Isaac Newton!
(a) To return to the old oak tree, in what direction should you head and how far will you walk? Use components to solve this problem.
(b) To see whether your calculation in part (a) is reasonable, compare it with a graphical solution drawn roughly to scale.`,
    '1.70':`A fence post is 59.0 m from where you are standing, in a direction 38.0° north of east. A second fence post is due south from you. How far are you from the second post if the distance between the two posts is 70.0 m?`,
    '1.71':`A dog in an open field runs 12.0 m east and then 28.0 m in a direction 50.0° west of north. In what direction and how far must the dog then run to end up 10.0 m south of her original starting point?`,
    '1.72':`Ricardo and Jane are standing under a tree in the middle of a pasture. An argument ensues, and they walk away in different directions. Ricardo walks 30.0 m in a direction 60.0° west of north. Jane walks 15.0 m in a direction 30.0° south of west. They then stop and turn to face each other.
(a) What is the distance between them?
(b) In what direction should Ricardo walk to go directly toward Jane?`,
    '1.73':`You are camping with Joe and Karl. Since all three of you like your privacy, you don’t pitch your tents close together. Joe’s tent is 21.0 m from yours, in the direction 23.0° south of east. Karl’s tent is 32.0 m from yours, in the direction 37.0° north of east. What is the distance between Karl’s tent and Joe’s tent?`,
    '1.74':`Bond Angle in Methane. In the methane molecule, CH₄, each hydrogen atom is at a corner of a regular tetrahedron with the carbon atom at the center. In coordinates for which one of the C–H bonds is in the direction of î + ĵ + k̂, an adjacent C–H bond is in the î − ĵ − k̂ direction. Calculate the angle between these two bonds.`,
    '1.75':`The work W done by a constant force vec(F) on an object that undergoes displacement vec(s) from point 1 to point 2 is W = vec(F) · vec(s). For F in newtons (N) and s in meters (m), W is in joules (J). If, during a displacement of the object, vec(F) has constant direction 60.0° above the −x-axis and constant magnitude 5.00 N and if the displacement is 0.800 m in the +x-direction, what is the work done by the force vec(F)?`,
    '1.76':`Magnetic fields are produced by moving charges and exert forces on moving charges. When a particle with charge q is moving with velocity vec(v) in a magnetic field vec(B), the force vec(F) that the field exerts on the particle is given by vec(F) = qvec(v) × vec(B). The SI units are as follows: For charge it is the coulomb (C), for magnetic field it is tesla (T), for force it is newton (N), and for velocity it is m/s. If q = −8.00 × 10⁻⁶ C, vec(v) is 3.00 × 10⁴ m/s in the +x-direction, and vec(B) is 5.00 T in the −y-direction, what are the magnitude and direction of the force that the magnetic field exerts on the charged particle?`,
    '1.77':`Vectors vec(A) and vec(B) have scalar product −7.00, and their vector product has magnitude +9.00. What is the angle between these two vectors?`,
    '1.78':`Torque is a vector quantity that specifies the effectiveness of a force in causing the rotation of an object. The torque that a force vec(F) exerts on a rigid object depends on the point where the force acts and on the location of the axis of rotation. If vec(r) is the length vector from the axis to the point of application of the force, then the torque is vec(r) × vec(F). If vec(F) is 22.0 N in the −y-direction and if vec(r) is in the xy-plane at an angle of 36° from the +y-axis toward the −x-axis and has magnitude 4.0 m, what are the magnitude and direction of the torque exerted by vec(F)?`,
    '1.79':`Vector vec(A) = aî − bk̂ and vector vec(B) = −cĵ + dk̂.
(a) In terms of the positive scalar quantities a, b, c, and d, what are vec(A) · vec(B) and vec(A) × vec(B)?
(b) If c = 0, what is the magnitude of vec(A) · vec(B) and what are the magnitude and direction of vec(A) × vec(B)? Does your result for the direction for vec(A) × vec(B) agree with the result you get if you sketch vec(A) and vec(B) in the xz-plane and apply the right-hand rule? The scalar product can be described as the magnitude of vec(B) times the component of vec(A) that is parallel to vec(B). Does this agree with your result? The magnitude of the vector product can be described as the magnitude of vec(B) times the component of vec(A) that is perpendicular to vec(B). Does this agree with your result?`,
    '1.80':`Vectors vec(A) and vec(B) are in the xy-plane. Vector vec(A) is in the +x-direction, and the direction of vector vec(B) is at an angle θ from the +x-axis measured toward the +y-axis.
(a) If θ is in the range 0° ≤ θ ≤ 180°, for what two values of θ does the scalar product vec(A) · vec(B) have its maximum magnitude? For each of these values of θ, what is the magnitude of the vector product vec(A) × vec(B)?
(b) If θ is in the range 0° ≤ θ ≤ 180°, for what value of θ does the vector product vec(A) × vec(B) have its maximum value? For this value of θ, what is the magnitude of the scalar product vec(A) · vec(B)?
(c) What is the angle θ in the range 0° ≤ θ ≤ 180° for which vec(A) · vec(B) is twice |vec(A) × vec(B)|?`,
    '1.81':`Vector vec(A) has magnitude 12.0 m, and vector vec(B) has magnitude 12.0 m. The scalar product vec(A) · vec(B) is 76.0 m². What is the magnitude of the vector product between these two vectors?`,
    '1.82':`Vector vec(A) has magnitude 5.00 m and lies in the xy-plane in a direction 53.0° from the +x-axis axis measured toward the +y-axis. Vector vec(B) has magnitude 8.00 m and a direction you can adjust.
(a) You want the vector product vec(A) × vec(B) to have a positive z-component of the largest possible magnitude. What direction should you select for vector vec(B)?
(b) What is the direction of vec(B) for which vec(A) × vec(B) has the most negative z-component?
(c) What are the two directions of vec(B) for which vec(A) × vec(B) is zero?`,
    '1.83':`The scalar product of vectors vec(A) and vec(B) is +59.0 m². Vector vec(A) has magnitude 9.00 m and direction 28.0° west of south. If vector vec(B) has direction 39.0° south of east, what is the magnitude of vec(B)?`,
    '1.84':`Obtain a unit vector perpendicular to the two vectors given in Exercise 1.39.`,
    '1.85':`You are given vectors vec(A) = 5.0î − 6.5ĵ and vec(B) = 3.5î − 7.0ĵ. A third vector, vec(C), lies in the xy-plane. Vector vec(C) is perpendicular to vector vec(A), and the scalar product of vec(C) with vec(B) is 15.0. From this information, find the components of vector vec(C).`,
    '1.86':`Two vectors vec(A) and vec(B) have magnitudes A = 3.00 and B = 3.00. Their vector product is vec(A) × vec(B) = −5.00k̂ + 2.00î. What is the angle between vec(A) and vec(B)?`,
    '1.87':`You are a team leader at a pharmaceutical company. Several technicians are preparing samples, and you want to compare the densities of the samples (density = mass/volume) by using the mass and volume values they have reported. Unfortunately, you did not specify what units to use. The technicians used a variety of units in reporting their values, as shown in the following table.
List the sample IDs in order of increasing density of the sample.`,
    '1.88':`You are a mechanical engineer working for a manufacturing company. Two forces, vec(F)₁ and vec(F)₂, act on a component part of a piece of equipment. Your boss asked you to find the magnitude of the larger of these two forces. You can vary the angle between vec(F)₁ and vec(F)₂ from 0° to 90° while the magnitude of each force stays constant. And, you can measure the magnitude of the resultant force they produce (their vector sum), but you cannot directly measure the magnitude of each separate force. You measure the magnitude of the resultant force for four angles θ between the directions of the two forces as follows:
(a) What is the magnitude of the larger of the two forces?
(b) When the equipment is used on the production line, the angle between the two forces is 30.0°. What is the magnitude of the resultant force in this case?`,
    '1.89':`Navigating in the Solar System. The Mars Polar Lander spacecraft was launched on January 3, 1999. On December 3, 1999, the day Mars Polar Lander impacted the Martian surface at high velocity and probably disintegrated, the positions of the earth and Mars were given by these coordinates:
With these coordinates, the sun is at the origin and the earth’s orbit is in the xy-plane. The earth passes through the +x-axis once a year on the autumnal equinox, the first day of autumn in the northern hemisphere (on or about September 22). One AU, or astronomical unit, is equal to 1.496 × 10⁸ km, the average distance from the earth to the sun.
(a) Draw the positions of the sun, the earth, and Mars on December 3, 1999.
(b) Find these distances in AU on December 3, 1999: from (i) the sun to the earth; (ii) the sun to Mars; (iii) the earth to Mars.
(c) As seen from the earth, what was the angle between the direction to the sun and the direction to Mars on December 3, 1999?
(d) Explain whether Mars was visible from your current location at midnight on December 3, 1999. (When it is midnight, the sun is on the opposite side of the earth from you.)`,
    '1.90':`Drone Delivery. You are testing parcel delivery by drone for a project. Your team uses vector displacements to record the route of the drone, with the origin taken to be the position of the control centre. During one test, the drone starts its flight at +10î − 50ĵ, where the units are meters, î is to the east, and ĵ is to the north. Subsequent displacements of the drone are +90î, +110ĵ, −60î + 40ĵ, and +120î + 180ĵ. If the final destination of the drone is −70ĵ, how far and in which direction must the drone fly? (You are well advised to diagram the situation before solving this numerically.)`,
    '1.91':`Navigating in the Big Dipper. All of the stars of the Big Dipper (part of the constellation Ursa Major) may appear to be the same distance from the earth, but in fact they are very far from each other. Figure P1.91 shows the distances from the earth to each of these stars. The distances are given in light-years (ly), the distance that light travels in one year. One light-year equals 9.461 × 10¹⁵ m.
(a) Alkaid and Merak are 25.6° apart in the earth’s sky. In a diagram, show the relative positions of Alkaid, Merak, and our sun. Find the distance in light-years from Alkaid to Merak.
(b) To an inhabitant of a planet orbiting Merak, how many degrees apart in the sky would Alkaid and our sun be?`,
    '1.92':`What is total volume of the gas-exchanging region of the lungs?
(a) 2000 µm³;
(b) 2 m³;
(c) 2.0 L;
(d) 120 L.`,
    '1.93':`If we assume that alveoli are spherical, what is the diameter of a typical alveolus?
(a) 0.20 mm;
(b) 2 mm;
(c) 20 mm;
(d) 200 mm.`,
    '1.94':`Individuals vary considerably in total lung volume. Figure P1.94 shows the results of measuring the total lung volume and average alveolar volume of six individuals. From these data, what can you infer about the relationship among alveolar size, total lung volume, and number of alveoli per individual? As the total volume of the lungs increases,
(a) the number and volume of individual alveoli increase;
(b) the number of alveoli increases and the volume of individual alveoli decreases;
(c) the volume of the individual alveoli remains constant and the number of alveoli increases;
(d) both the number of alveoli and the volume of individual alveoli remain constant.`,
    'VP1.7.1':`Consider the three vectors vec(A), vec(B), and vec(C) in Example 1.7. If a fourth vector vec(D) is added to vec(A) + vec(B) + vec(C), the result is zero: vec(A) + vec(B) + vec(C) + vec(D) = 0. Find the magnitude and direction of vec(D). State the direction of vec(D) in terms of an angle measured counterclockwise from the positive x-axis, and state in which quadrant this angle lies.`,
    'VP1.7.2':`Consider the three vectors vec(A), vec(B), and vec(C) in Example 1.7. Calculate the magnitude and direction of the vector vec(S) = vec(A) − vec(B) + vec(C). State the direction of vec(S) in terms of an angle measured counterclockwise from the positive x-axis, and state in which quadrant this angle lies. (Hint: The components of −vec(B) are just the negatives of the components of vec(B).)`,
    'VP1.7.3':`Consider the three vectors vec(A), vec(B), and vec(C) in Example 1.7.
(a) Find the components of the vector vec(T) = vec(A) + vec(B) + 2vec(C).
(b) Find the magnitude and direction of vec(T). State the direction of vec(T) in terms of an angle measured counterclockwise from the positive x-axis, and state in which quadrant this angle lies.`,
    'VP1.7.4':`A hiker undergoes the displacement vec(A) shown in Example 1.7. The hiker then undergoes a second displacement such that she ends up 38.0 m from her starting point, in a direction from her starting point that is 37.0° west of north. Find the magnitude and direction of this second displacement. State the direction in terms of an angle measured counterclockwise from the positive x-axis, and state in which quadrant this angle lies.`,
    'VP1.10.1':`Vector vec(A) has magnitude 5.00 and is at an angle of 36.9° south of east. Vector vec(B) has magnitude 6.40 and is at an angle of 20.0° west of north.
(a) Choose the positive x-direction to the east and the positive y-direction to the north. Find the components of vec(A) and vec(B).
(b) Calculate the scalar product vec(A) · vec(B).`,
    'VP1.10.2':`Vector vec(C) has magnitude 6.50 and is at an angle of 55.0° measured counterclockwise from the +x-axis toward the +y-axis. Vector vec(D) has components Dₓ = +4.80 and Dᵧ = −8.40.
(a) Calculate the scalar product vec(C) · vec(D).
(b) Find the angle φ between the vectors vec(C) and vec(D).`,
    'VP1.10.3':`Vector vec(A) has components Aₓ = −5.00, Aᵧ = 3.00, and A_z = 0. Vector vec(B) has components Bₓ = 2.50, Bᵧ = 4.00, and B_z = −1.50. Find the angle between the two vectors.`,
    'VP1.10.4':`If a force vec(F) acts on an object as that object moves through a displacement vec(s), the work done by that force equals the scalar product of vec(F) and vec(s): W = vec(F) · vec(s). A certain object moves through displacement vec(s) = (4.00 m)î + (5.00 m)ĵ. As it moves it is acted on by force vec(F), which has x-component Fₓ = −12.0 N (1 N = 1 newton is the SI unit of force). The work done by this force is 26.0 N·m = 26.0 J (1 J = 1 joule = 1 newton-meter is the SI unit of work).
(a) Find the y-component of vec(F).
(b) Find the angle between vec(F) and vec(s).`,
    'Bridge':`Vectors on the Roof. An air-conditioning unit is fastened to a roof that slopes at an angle of 35° above the horizontal (Fig. 1.33). Its weight is a force vec(F) on the air conditioner that is directed vertically downward. In order that the unit not crush the roof tiles, the component of the unit’s weight perpendicular to the roof cannot exceed 425 N. (One newton, or 1 N, is the SI unit of force.)
(a) What is the maximum allowed weight of the unit?
(b) If the fasteners fail, the unit slides 1.50 m along the roof before it comes to a halt against a ledge. How much work does the weight force do on the unit during its slide if the unit has the weight calculated in part (a)?
The work done by a force vec(F) on an object that undergoes a displacement vec(s) is W = vec(F) · vec(s).`
  };
  const passage=`Calculating Lung Volume in Humans. In humans, oxygen and carbon dioxide are exchanged in the blood within many small sacs called alveoli in the lungs. Alveoli provide a large surface area for gas exchange. Recent careful measurements show that the total number of alveoli in a typical pair of lungs is about 480 × 10⁶ and that the average volume of a single alveolus is 4.2 × 10⁶ µm³. (The volume of a sphere is V = (4/3)πr³, and the area of a sphere is A = 4πr².)`;
  const tables={
    '1.87':{caption:'Sample measurements',headers:['Sample ID','Mass','Volume'],rows:[['A','8.00 g','1.67 × 10⁻⁶ m³'],['B','6.00 µg','9.38 × 10⁶ µm³'],['C','8.00 mg','2.50 × 10⁻³ cm³'],['D','9.00 × 10⁻⁴ kg','2.81 × 10³ mm³'],['E','9.00 × 10⁴ ng','1.59 × 10⁻² mm³'],['F','6.00 × 10⁻² mg','1.25 × 10⁻⁴ cm³']],afterParagraph:0},
    '1.88':{caption:'Measured resultant force',headers:['θ','Resultant force (N)'],rows:[['0.0°','8.00'],['45.0°','7.43'],['60.0°','7.00'],['90.0°','5.83']],afterParagraph:0},
    '1.89':{caption:'Positions on December 3, 1999',headers:['','x','y','z'],rows:[['Earth','0.3182 AU','0.9329 AU','−0.0000 AU'],['Mars','1.3087 AU','−0.4423 AU','−0.0414 AU']],afterParagraph:0}
  };
  const figures={
    'E1.21':{file:'figure-e1-21.svg',caption:'Figure E1.21',alt:'Truck route: start, 2.6 km north, 4.0 km east, then 3.1 km at 45° north of east to the stop.'},
    'E1.22':{file:'figure-e1-22.svg',caption:'Figure E1.22',alt:'Four vectors from the origin. A: 8.00 m down. B: 15.0 m, 30.0° east of north. C: 12.0 m, 25.0° south of west. D: 10.0 m, 53.0° west of north.'},
    'E1.33':{file:'figure-e1-33.svg',caption:'Figure E1.33',alt:'A: 2.80 cm, 60.0° above +x. B: 1.90 cm, 60.0° below +x.'},
    'E1.37':{file:'figure-e1-37.svg',caption:'Figure E1.37',alt:'A: 3.60 m, 70.0° counterclockwise from +x. B: 2.4 m, 30.0° below −x.'},
    'P1.56':{file:'figure-p1-56.svg',caption:'Figure P1.56',alt:'Forces from the origin. A: 100.0 N, 30.0° above +x. B: 80.0 N, 30.0° west of +y. C: 40.0 N, 53.0° below −x.'},
    'P1.60':{file:'figure-p1-60.svg',caption:'Figure P1.60',alt:'Sailboat route: 2.00 km east, 3.50 km southeast at 45.0°, then an unknown third leg to a point 5.80 km east of the start.'},
    'P1.61':{file:'figure-p1-61.svg',caption:'Figure P1.61',alt:'Two equal pulls on an arm. A points 32° above the outward horizontal direction; B points 32° below it.'},
    'P1.62':{file:'figure-p1-62.svg',caption:'Figure P1.62',alt:'Bern to Zurich: 101 km at bearing 52°. Zurich to Lugano: 165 km at bearing 170°. Lugano to Sion: 124 km at bearing 282°. Bearings are clockwise from north.'},
    'P1.91':{file:'figure-p1-91.svg',caption:'Figure P1.91',alt:'Big Dipper distances from Earth: Alkaid 138 ly, Mizar 73 ly, Alioth 64 ly, Megrez 81 ly, Phad 80 ly, Merak 77 ly, Dubhe 105 ly.'},
    'P1.94':{file:'figure-p1-94.svg',caption:'Figure P1.94',alt:'Scatter plot for six people. Horizontal axis: total lung volume in 10⁻⁶ m³. Vertical axis: average alveolar volume in 10⁶ µm³. Approximate points (horizontal, vertical): (1000, 5.0), (1100, 4.0), (1300, 3.8), (1500, 4.6), (1950, 4.4), (2400, 4.0).'},
    '1.33':{file:'figure-1-33.svg',caption:'Figure 1.33 — An air-conditioning unit on a slanted roof',alt:'Roof slopes at 35° above horizontal. Weight F points vertically down. The slide along the roof is 1.50 m; x is parallel to the roof, y perpendicular to it.'}
  };
  const figureFor={
    '1.21':'E1.21','1.28':'E1.21',
    '1.22':'E1.22','1.25':'E1.22','1.29':'E1.22','1.35':'E1.22','1.41':'E1.22','1.45':'E1.22',
    '1.33':'E1.33','1.44':'E1.33','1.37':'E1.37','1.46':'E1.37',
    '1.56':'P1.56','1.60':'P1.60','1.61':'P1.61','1.62':'P1.62','1.91':'P1.91','1.94':'P1.94','Bridge':'1.33'
  };
  const references={
    'Q1.17':'Notation: vec(A), vec(B) and vec(C) denote vectors. A, B and C without arrows denote their magnitudes.',
    'Q1.20':'Notation: A without an arrow denotes the nonnegative magnitude of vec(A).',
    'Q1.21':'Figure 1.6 is a photograph illustrating a train that overshot its stopping point. The distances for this calculation are given in the question.',
    '1.3':'Reference value: speed of light in vacuum c ≈ 3.00 × 10⁸ m/s.',
    '1.9':'Reference formulas: density ρ = mass/volume; sphere volume V = (4/3)πr³.',
    '1.10':'Reference formulas from the sphere geometry: V = (4/3)πr³; surface area A = 4πr²; diameter d = 2r.',
    '1.40':'Vectors from Exercise 1.36: vec(A) = 4.00î + 7.00ĵ; vec(B) = 5.00î − 2.00ĵ.',
    '1.42':'Vectors from Exercise 1.36: vec(A) = 4.00î + 7.00ĵ; vec(B) = 5.00î − 2.00ĵ.',
    '1.49':'Approximate reference data used here: Earth mass 5.97 × 10²⁴ kg; Earth radius 6.37 × 10⁶ m; Sun mass 1.99 × 10³⁰ kg. Sphere volume: V = (4/3)πr³.',
    '1.51':'Approximate reference data used here: Earth mass 5.97 × 10²⁴ kg; Earth radius 6.37 × 10⁶ m. Sphere volume: V = (4/3)πr³.',
    '1.53':'Approximate reference data: 1 u = 1.66 × 10⁻²⁷ kg; hydrogen ≈1 u, oxygen ≈16 u, carbon ≈12 u. State your body-mass and composition assumptions.',
    '1.84':'Vectors from Exercise 1.39: vec(A) = −2.00î + 3.00ĵ + 4.00k̂; vec(B) = 3.00î + 1.00ĵ − 3.00k̂.'
  };
  for(const id of ['VP1.7.1','VP1.7.2','VP1.7.3','VP1.7.4'])references[id]='Given in Example 1.7: vec(A) is 72.4 m at 32.0° east of north; vec(B) is 57.3 m at 36.0° south of west; vec(C) is 17.8 m due south. The standard angles from +x are 58°, 216° and 270°, respectively.';
  function get(id){return text[id]===undefined?null:{text:text[id],passage:['1.92','1.93','1.94'].includes(id)?passage:null,table:tables[id]||null,figure:figures[figureFor[id]]||null,reference:references[id]||null};}
  return {text,tables,figures,figureFor,references,passage,get};
});
