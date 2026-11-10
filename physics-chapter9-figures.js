/* Accessible, language-neutral diagrams redrawn for Chapter 9. */
(function(root){'use strict';const rows=[
[['9.18'],'lift.svg','En hiss och motvikt hänger i ett rep över en stor skiva.','A lift and counterweight hang on a rope over a large disk.'],
[['9.30'],'square-masses.svg','Fyra punktmassor sitter i hörnen av en kvadrat; axeln AB delar två sidor och O är centrum.','Four point masses sit at square corners; axis AB bisects opposite sides and O is the center.'],
[['9.35'],'wagon-wheel.svg','Ett hjul med åtta ekrar och tunn fälg; radien är 0,300 m.','A wheel with eight spokes and a thin rim; radius is 0.300 m.'],
[['9.47','9.48','9.49','9.63','9.64','9.69','9.71','9.80','9.81'],'pulley-single.svg','Ett hängande föremål är kopplat med en lätt lina till en trissa kring en fast axel.','A hanging object is connected by a light cable to a pulley about a fixed axis.'],
[['9.65','9.77'],'pulley-table.svg','Kloss A ligger på ett bord och är kopplad över en trissa till den hängande klossen B.','Block A lies on a table and is connected over a pulley to hanging block B.'],
[['9.78'],'pulley-two.svg','Massorna 4,00 och 2,00 kg hänger på vardera sidan av trissan; den tyngre faller 5,00 m.','Masses 4.00 and 2.00 kg hang on opposite sides of the pulley; the heavier falls 5.00 m.'],
[['9.79'],'two-disks.svg','Två skivor med olika radier är fästa vid samma axel; en vikt hänger i en lina.','Two disks of different radii share an axle; a mass hangs from a string.'],
[['9.82'],'cylinder-pulley.svg','Ett rep löper från en cylinder över en trissa till en hängande låda.','A rope runs from a cylinder over a pulley to a hanging box.'],
[['9.61'],'disk-string.svg','Ett snöre med en kula dras tangentiellt från kanten på en skiva.','A string with a ball is pulled tangentially from a disk’s rim.'],
[['9.87'],'graph-87.svg','Vinkelaccelerationen ökar linjärt från 0 till 6 rad/s² mellan 0 och 5 s.','Angular acceleration increases linearly from 0 to 6 rad/s² between 0 and 5 s.'],
[['9.89'],'graph-89.svg','Fallsträckan är d = 165t² cm; vid 1 s är d 165 cm.','Falling distance is d = 165t² cm; at 1 s d is 165 cm.'],
[['9.90'],'cone.svg','En kon med radie R och höjd h har en rotationsaxel längs symmetriaxeln.','A cone of radius R and height h has a rotation axis along its symmetry axis.'],
[['Q9.2'],'q9-2.svg','Två punktmassor ligger på y-axeln; x- och z-axlarna går genom origo.','Two point masses lie on the y-axis; the x- and z-axes pass through the origin.'],
[['Q9.4','Q9.5'],'q9-4.svg','Två drev med olika radier är kopplade med en kedja.','Two sprockets with different radii are connected by a chain.'],
[['Q9.18'],'q9-18.svg','Fyra kulor på ekrar är kopplade till en trumma med ett hängande block.','Four balls on spokes connect to a drum with a hanging block.'],
[['BR9'],'rod.svg','En tunn stav med längden L roterar kring en axel genom en punkt h från ena änden.','A thin rod of length L rotates about an axis through a point h from one end.']];
for(const [ids,file,sv,en] of rows)for(const id of ids){const item=root.EmberChapter9Exercises.find(x=>x.id===id);if(!item)throw Error('Missing exercise '+id);item.figure=file;item.alt={sv,en}}
for(const [id,file,sv,en] of [['9.88','solution-88.svg','Mätpunkterna för a² mot Δθ² med en linjär anpassning.','Measured a² versus Δθ² with a linear fit.'],['9.91','solution-91.svg','Två grafer: ω minskar och α går mot noll under 74 minuter.','Two graphs: ω decreases and α approaches zero over 74 minutes.']]){const item=root.EmberChapter9Exercises.find(x=>x.id===id);item.solutionFigure=file;item.solutionAlt={sv,en}}
})(window);
