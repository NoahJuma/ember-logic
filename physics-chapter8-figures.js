/* Figure excerpts from the user's supplied Young and Freedman book, Chapter 8. */
(function(root){'use strict';const descriptions={
3:['Tre föremål på x-axeln: A rör sig nedåt, B snett uppåt åt höger i 60° och C åt vänster; massor och farter är markerade.','Three objects on the x-axis: A moves downward, B moves up and right at 60°, and C moves left; masses and speeds are marked.'],
13:['Kraften är 2,50 kN från 15,0 till 16,0 ms och noll annars.','Force is 2.50 kN from 15.0 to 16.0 ms and zero otherwise.'],
24:['Block på 1,00 och 3,00 kg med sammanpressad fjäder mellan sig.','Blocks of 1.00 and 3.00 kg with a compressed spring between them.'],
30:['Asteroid A kommer från vänster med 40,0 m/s; efter stöten går A 30° ovanför och B 45° nedanför den ursprungliga riktningen.','Asteroid A approaches from the left at 40.0 m/s; after collision A travels 30° above and B 45° below the original direction.'],
41:['Två fordon närmar sig en korsning från väster och söder; vraket rör sig 24° öster om norr med 16,0 m/s.','Two vehicles approach an intersection from west and south; wreckage moves 24° east of north at 16.0 m/s.'],
44:['En sten på 3,00 kg rör sig åt höger med 8,00 m/s mot ett block på 15,0 kg kopplat till en fjäder.','A 3.00 kg stone moves right at 8.00 m/s toward a 15.0 kg block attached to a spring.'],
48:['En kula på 30,0 g rör sig åt höger med 0,200 m/s mot en kula på 10,0 g som rör sig åt vänster med 0,400 m/s.','A 30.0 g marble moves right at 0.200 m/s toward a 10.0 g marble moving left at 0.400 m/s.'],
54:['En SUV och en bil kör åt höger med 12,0 respektive 20,0 m/s; deras massor är 1200 och 1800 kg och avståndet 40,0 m.','An SUV and a car move right at 12.0 and 20.0 m/s; their masses are 1200 and 1800 kg, separated by 40.0 m.'],
69:['Kula A närmar sig origo från +x; B närmar sig origo nedåt och vänster längs linjen 60° från +x; C kommer underifrån vänster.','Sphere A approaches the origin from +x; B approaches down and left along the line 60° above +x; C approaches from below left.'],
73:['Ett block glider åt höger med 12,0 m/s mot ett stillastående block innan dalbotten stiger.','A block slides right at 12.0 m/s toward a stationary block before the valley floor rises.'],
78:['En ram hänger i en fjäder; en lerklump släpps 30,0 cm ovanför ramen.','A frame hangs from a spring; a lump of putty is dropped 30.0 cm above the frame.'],
79:['En kula träffar ett block kopplat till en fjäder som pressas ihop 15,0 cm.','A bullet hits a block attached to a spring, compressing it 15.0 cm.'],
81:['En stuntperson svingar sig 5,0 m ned mot en person på golvet.','A stunt performer swings down 5.0 m toward a person on the floor.'],
82:['Två lika massor ligger vid kanten och botten av en friktionsfri halvcirkelformad skål med radien R.','Two equal masses are at the rim and bottom of a frictionless semicircular bowl of radius R.'],
87:['Ett paket lämnar en ränna som lutar 37° och faller 4,00 m ned till en vagn som rullar åt vänster.','A package leaves a chute at 37° and falls 4.00 m into a cart rolling left.'],
92:['En person går 3,00 m relativt en 5,00 m lång kanot, från 1,00 m från ena änden till 1,00 m från den andra.','A person walks 3.00 m relative to a 5.00 m canoe, from 1.00 m from one end to 1.00 m from the other.'],
99:['En vagn rullar nedför en 50 m lång backe med lutningen 6°; två personer faller ned i vagnen 40 m före ett stup.','A wagon rolls down a 50 m slope at 6°; two people drop into it 40 m before a cliff.'],
100:['Kraft–tid-graf: 7500 N till 1,50 s, linjärt ned till 3500 N vid 3,00 s och därefter konstant till 4,50 s.','Force–time graph: 7500 N to 1.50 s, falling linearly to 3500 N at 3.00 s and then constant to 4.50 s.'],
105:['En halvcirkelformad platta med radien a; x-axeln ligger längs diametern och y-axeln går mot bågen.','A semicircular plate of radius a; the x-axis lies along the diameter and the y-axis points toward the curved edge.']};
for(const [n,[sv,en]] of Object.entries(descriptions)){const item=root.EmberChapter8Exercises.find(e=>e.id==='8.'+n);if(!item)throw new Error('Missing figure exercise '+n);item.figure=[41,92,99].includes(Number(n))?'figure-8-'+n+'.svg':'book-8-'+n+'.png';item.alt={sv,en};}
const graph=root.EmberChapter8Exercises.find(e=>e.id==='8.70');graph.solutionFigure='solution-8-70.svg';graph.solutionAlt={sv:'Kraften ökar linjärt till 5 N vid 4 s och minskar linjärt till noll vid 10 s.',en:'Force rises linearly to 5 N at 4 s and falls linearly to zero at 10 s.'};
})(window);
