(function () {
  "use strict";
  const items = {
  "Q1.1": {
    "title": "Kan ett experiment bevisa en teori?",
    "steps": [
      "En teori förutsäger vad som bör hända under angivna förutsättningar.",
      "Ett enda tillförlitligt resultat som går att upprepa och som motsäger en sådan förutsägelse räcker för att visa att teorin inte är helt korrekt inom det området. Uteslut först mätfel och kontrollera att antagandena är uppfyllda.",
      "Många lyckade tester stärker tilliten till teorin, men de kan inte undersöka alla tänkbara situationer. Ett senare test kan visa en begränsning."
    ],
    "answer": "Ett enda välgrundat motexempel kan motbevisa en förutsägelse. Inget ändligt antal lyckade tester bevisar att en fysikalisk teori gäller i alla situationer.",
    "interactive": [],
    "question": {
      "text": "Hur många korrekt utförda experiment behöver vi för att motbevisa en teori? Hur många behöver vi för att bevisa en teori? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.2": {
    "title": "Varför tan(5 m) inte fungerar",
    "steps": [
      "Tangens jämför två sidor i en rätvinklig triangel: motstående katets längd ÷ närliggande katets längd.",
      "Längderna har samma enhet, så enheterna förkortas bort. Själva vinkeln är dimensionslös när den anges i radianer.",
      "5 m är en längd, inte en vinkel. Du behöver först ytterligare en längd eller annan information för att bestämma en vinkel."
    ],
    "answer": "tan(5 m) är inte ett meningsfullt fysikaliskt uttryck.",
    "interactive": [],
    "question": {
      "text": "Anta att du blir ombedd att beräkna tangens av 5.00 meter. Är det möjligt? Varför eller varför inte?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.3": {
    "title": "Ett tal behöver en enhet",
    "steps": [
      "140 cm betyder en kroppslängd på 1.40 m, vilket är möjligt för en vuxen.",
      "140 kg är också en möjlig massa för en vuxen, även om det inte är ett typiskt värde för personen som beskrivs i uppgiften.",
      "En rimlighetsbedömning kan varna för ett fel, men den kan inte säkert återskapa en saknad enhet. Anteckna storheten och enheten tillsammans."
    ],
    "answer": "En kroppslängd på 140 cm är den mer sannolika avsedda tolkningen. Enbart talet kan inte avgöra vilken mätning det gäller.",
    "interactive": [],
    "question": {
      "text": "En ganska vanlig medelålders kvinna är på sjukhuset för en rutinkontroll. Sjuksköterskan skriver ”140” i patientens journal men glömmer att ange enheten. Vilken av följande storheter skulle 140 rimligen kunna avse: patientens massa i kilogram? Hennes kroppslängd i centimeter?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.4": {
    "title": "En massnormal som förändras",
    "steps": [
      "Symbolen µ betyder en miljondel. 25 µg = 0.000025 g = 0.000000025 kg.",
      "I förhållande till 1 kg är förändringen 2.5 × 10^−8, eller 0.0000025%. Den är mycket liten i vardagliga sammanhang.",
      "En normal används för att kalibrera andra mätningar. Även en mycket liten förändring spelar roll när laboratorier behöver jämförbara resultat med hög precision.",
      "Frågan gäller den fysiska kilogramprototyp som användes före maj 2019; boken anger detta historiska sammanhang."
    ],
    "answer": "Ja, vid noggrann kalibrering, även om förändringen är försumbar vid de flesta vardagliga vägningar.",
    "interactive": [],
    "question": {
      "text": "Flera länder förvarar noggranna kopior av den cylinder av platina och iridium som användes som internationell kilogramnormal fram till maj 2019. Den första omgången av dessa kopior, tillverkad 1889, har i genomsnitt ökat med 25 µg per århundrade, trots noggrann rengöring. Har denna skenbara ökning någon betydelse? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.5": {
    "title": "Bygg en klocka",
    "steps": [
      "En klocka behöver en händelse som upprepas. Räkna upprepningarna och tilldela varje upprepning en viss tid.",
      "Exempel är svängningar i en kvartskristall, en lämplig atomär övergång i ett annat ämne än cesium och jordens rotation.",
      "Jämför stabiliteten: temperaturförändringar kan påverka en kristall; jordens rotation är inte helt jämn. En användbar klocka måste ta hänsyn till sådana förändringar."
    ],
    "answer": "En stabil process som upprepas ger klockans tickningar; genom att räkna dem mäter vi hur lång tid som har gått.",
    "interactive": [],
    "question": {
      "text": "Vilka fysikaliska fenomen, förutom en pendel eller en cesiumklocka, skulle du kunna använda för att definiera en tidsnormal?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.6": {
    "title": "Mät ett ark med hjälp av många",
    "steps": [
      "Stapla ett känt antal pappersark, till exempel 100. Tryck försiktigt ihop bunten för att minska luftmellanrummen.",
      "Mät buntens tjocklek. Om 100 ark upptar 10 mm, dividerar du 10 mm med 100.",
      "Varje ark är ungefär 0.10 mm tjockt. Upprepa med en annan bunt för att kontrollera att resultaten stämmer överens; resultatet är ett medelvärde."
    ],
    "answer": "Genomsnittlig arktjocklek = buntens tjocklek ÷ antalet ark.",
    "interactive": [],
    "question": {
      "text": "Beskriv hur du skulle kunna mäta tjockleken på ett pappersark med en vanlig linjal.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.7": {
    "title": "Tal utan enhet",
    "steps": [
      "Dividera en längd med en annan längd: 2 m ÷ 4 m = 0.5. Enheten meter förkortas bort.",
      "En vinkel i radianer är båglängden ÷ radien och är därför dimensionslös.",
      "En relativ förlängning är längdförändringen ÷ den ursprungliga längden. Relativ densitet är en densitet ÷ en annan densitet. I båda kvoterna förkortas enheterna bort."
    ],
    "answer": "Längdkvoter, vinklar i radianer, relativ töjning och relativ densitet är dimensionslösa.",
    "interactive": [],
    "question": {
      "text": "Storheten π = 3.14159… är ett dimensionslöst tal eftersom den är en kvot mellan två längder. Beskriv två eller tre andra geometriska eller fysikaliska storheter som är dimensionslösa.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.8": {
    "title": "Upptäck ett formelfel med hjälp av enheter",
    "steps": [
      "Volym mäter ett tredimensionellt utrymme, så enheten måste vara m³ eller en annan längdenhet upphöjd till tre.",
      "r³h har enheten m³ × m = m⁴. Multiplikation med π ändrar inte enheten.",
      "En cylinder har en cirkulär basyta med arean πr². När arean multipliceras med höjden får vi πr²h, med enheten m² × m = m³."
    ],
    "answer": "πr³h har fel dimension. Cylinderns volym är πr²h.",
    "interactive": [],
    "question": {
      "text": "Vilka enheter används för volym? Anta att en annan elev säger att en cylinder med radien r och höjden h har volymen πr³h. Förklara varför detta inte kan stämma.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.9": {
    "title": "Riktighet och precision",
    "steps": [
      "Riktighet handlar om hur nära resultatet ligger målvärdet. Precision handlar om hur tätt upprepade resultat ligger samlade.",
      "Joes skott ligger i genomsnitt kring målets centrum men är utspridda: god riktighet i genomsnitt, men låg precision.",
      "Moes skott ligger nära varandra men långt från målets centrum: hög precision, men dålig riktighet.",
      "Flos skott ligger nära både varandra och målets centrum: både god riktighet och hög precision."
    ],
    "answer": "Joe: god riktighet i genomsnitt. Moe: hög precision. Flo: både god riktighet och hög precision.",
    "interactive": [],
    "question": {
      "text": "Tre bågskyttar skjuter fyra pilar var mot en måltavla. Joes fyra pilar träffar punkter som är utspridda i ett område som sträcker sig 10 cm ovanför, 10 cm nedanför, 10 cm till vänster och 10 cm till höger om måltavlans centrum. Alla Moes fyra pilar träffar inom 1 cm från en punkt som ligger 20 cm från centrum, och Flos fyra pilar träffar inom 1 cm från centrum. Tävlingsdomaren säger att en av bågskyttarna har hög precision men dålig riktighet, att en annan har god riktighet men låg precision och att den tredje har både god riktighet och hög precision. Vilken beskrivning gäller för vilken bågskytt? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.10": {
    "title": "Är det verkligen en enhetsvektor?",
    "steps": [
      "En enhetsvektor är en pil vars längd är exakt 1; dess enskilda komponenter behöver inte alla vara 1.",
      "Längden av (1,1,1) = √(1² + 1² + 1²) = √3 ≈ 1.732.",
      "Längden av (3,−2,0) = √(3² + (−2)²) = √13 ≈ 3.606. Ett negativt tal i kvadrat ger ett positivt resultat."
    ],
    "answer": "Ingen av vektorerna har längden 1, så ingen av dem är en enhetsvektor.",
    "interactive": [],
    "question": {
      "text": "Är vektorn (î + ĵ + k̂) en enhetsvektor? Är vektorn (3.0î − 2.0ĵ) en enhetsvektor? Motivera dina svar.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.11": {
    "title": "Sträcka är inte samma sak som förskjutning",
    "steps": [
      "Förskjutningen pekar direkt från startpositionen till slutpositionen; den tar inte hänsyn till vägen däremellan.",
      "Från den norra kanten till den södra kanten är förskjutningen en diameter söderut. Diameter = 2 × radie = 1000 m.",
      "Efter ett helt varv sammanfaller slutpositionen med startpositionen. Förskjutning = 0, medan den tillryggalagda sträckan är 2π × 500 ≈ 3142 m."
    ],
    "answer": "Ett halvt varv: 1000 m söderut. Ett helt varv: förskjutningen är noll.",
    "interactive": [],
    "question": {
      "text": "En cirkelformad tävlingsbana har radien 500 m. Hur stor är en cyklists förskjutning när hon följer banan från den norra sidan till den södra sidan? När hon cyklar ett helt varv runt banan? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.12": {
    "title": "När pilar kan ta ut varandra",
    "steps": [
      "Två pilar kan föra dig tillbaka till starten bara om den andra exakt går tillbaka längs den första. Deras längder måste vara lika.",
      "Tre pilar kan bilda en sluten triangel när ingen längd överstiger summan av de två andra.",
      "Likhet ger en tillplattad triangel: alla tre ligger på en linje. För en triangel som inte är tillplattad måste varje längd vara strikt mindre än summan av de två andra."
    ],
    "answer": "Två: lika långa och motriktade. Tre: den största längden får inte överstiga summan av de två andra.",
    "interactive": [],
    "question": {
      "text": "Kan du hitta två vektorer med olika längder som har vektorsumman noll? Vilka begränsningar måste gälla för längderna för att tre vektorer ska ha vektorsumman noll? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.13": {
    "title": "Har tiden en vektorriktning?",
    "steps": [
      "En vektor i rummet behöver ett belopp och en riktning i rummet som följer reglerna för vektoraddition.",
      "Uttrycket beskriver händelsernas ordning, inte en riktning mot norr, söder eller uppåt.",
      "I det här kapitlet är förfluten tid en skalär: ett antal sekunder utan riktning i rummet."
    ],
    "answer": "Nej. I det här kapitlet är tid en skalär.",
    "interactive": [],
    "question": {
      "text": "”Tidens riktning” sägs gå från det förflutna mot framtiden. Betyder det att tid är en vektorstorhet? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.14": {
    "title": "En kurs är bara en del av en vektor",
    "steps": [
      "En kurs talar om för piloten åt vilket håll flygplanet ska riktas eller färdas.",
      "Hastighet behöver också ett belopp, till exempel 200 km/h. Två flygplan kan ha samma kurs men olika fart.",
      "En riktning kan beskrivas med en enhetsvektor, men riktningen ensam anger inte en fullständig hastighet."
    ],
    "answer": "En kurs anger riktningen; en hastighetsvektor behöver också en fart.",
    "interactive": [],
    "question": {
      "text": "Flygledare ger instruktioner som kallas ”vektorer” för att tala om för trafikpiloter i vilken riktning de ska flyga. Om detta är de enda instruktionerna som ges, används då benämningen ”vektor” korrekt? Varför eller varför inte?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.15": {
    "title": "Kan komponenter dölja en längd?",
    "steps": [
      "Längden i kvadrat är Ax² + Ay² + Az². Varje kvadrat är icke-negativ.",
      "Summan kan vara noll bara om varje komponent är noll.",
      "Summan är minst lika stor som vilken som helst av de enskilda kvadraterna. När vi tar kvadratroten får vi |A| ≥ |Ax|, |Ay|, |Az|."
    ],
    "answer": "Nej på båda frågorna.",
    "interactive": [],
    "question": {
      "text": "Kan du hitta en vektorstorhet som har beloppet noll men komponenter som inte är noll? Förklara. Kan en vektors belopp vara mindre än beloppet av någon av dess komponenter? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.16": {
    "title": "Vad betyder en negativ pil?",
    "steps": [
      "För vektorer finns ingen allmän ordning som anger större än eller mindre än noll. Komponenterna beror på vilka axlar som har valts.",
      "−A är väldefinierad: byt tecken på varje komponent, så att längden behålls och riktningen blir den motsatta.",
      "Om exempelvis A = (3,2,0), så är −A = (−3,−2,0). Adderar vi dem får vi (0,0,0)."
    ],
    "answer": "Ordet ”negativ” behöver ett sammanhang; −A betyder alltid den lika långa, motriktade vektorn.",
    "interactive": [],
    "question": {
      "text": "(a) Är det meningsfullt att säga att en vektor är negativ? Varför?\n(b) Är det meningsfullt att säga att en vektor är en annan vektors negativa motsvarighet? Varför? Motsäger ditt svar här det du sa i del (a)?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.17": {
    "title": "När längder kan adderas direkt",
    "steps": [
      "Om två pilar som inte är noll pekar åt samma håll, ger de summan av sina längder när den enas start placeras vid den andras spets.",
      "Om de pekar i vinkel mot varandra bidrar inte hela längden i samma riktning, och resultatets raka sträcka blir kortare än summan av längderna.",
      "För att summan ska bli noll måste pilarna vara lika långa och motriktade. En ingående nollvektor är ett trivialt specialfall."
    ],
    "answer": "Största möjliga summa: parallella och åt samma håll. Nollsumma: lika långa och motriktade.",
    "interactive": [],
    "question": {
      "text": "Om vec(C) = vec(A) + vec(B), vad måste då gälla för riktningarna och beloppen hos vec(A) och vec(B) om C = A + B? Vad måste gälla för riktningarna och beloppen hos vec(A) och vec(B) om C = 0?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Beteckningar: vec(A), vec(B) och vec(C) betecknar vektorer. A, B och C utan pilar betecknar deras belopp."
    }
  },
  "Q1.18": {
    "title": "Kan båda produkterna bli noll?",
    "steps": [
      "A·B = |A||B| cos θ. Skalärprodukten är noll när vektorerna är vinkelräta, θ = 90°.",
      "|A×B| = |A||B| sin θ. Kryssproduktens belopp är noll när vektorerna är parallella eller motriktat parallella, θ = 0° eller 180°.",
      "En och samma vinkel kan inte uppfylla båda villkoren. Antagandet att vektorerna inte är noll är viktigt."
    ],
    "answer": "Nej: vektorer som inte är noll kan inte samtidigt ha skalärprodukten noll och kryssprodukten noll.",
    "interactive": [],
    "question": {
      "text": "Om vec(A) och vec(B) är vektorer som inte är noll, är det då möjligt att både vec(A) · vec(B) och vec(A) × vec(B) är noll? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.19": {
    "title": "Multiplicera en vektor med sig själv",
    "steps": [
      "Vinkeln mellan en pil och samma pil är 0°.",
      "cos 0° = 1, så A·A = |A|². Uttryckt med komponenter är detta Ax² + Ay² + Az².",
      "sin 0° = 0, så A×A är nollvektorn. Parallella pilar spänner inte upp någon area."
    ],
    "answer": "A·A = |A|²; A×A = (0,0,0).",
    "interactive": [],
    "question": {
      "text": "Vad ger vec(A) · vec(A), skalärprodukten av en vektor med sig själv? Vad ger vec(A) × vec(A), vektorprodukten av en vektor med sig själv?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.20": {
    "title": "Behåll riktningen och gör längden till ett",
    "steps": [
      "För en vektor A som inte är noll dividerar du varje komponent med vektorns positiva längd. Alla komponenter skalas med samma faktor.",
      "Den nya längden är |A|/|A| = 1; riktningen är oförändrad.",
      "Skalärprodukten av denna enhetsvektor och î = (1,0,0) väljer ut Ax/|A|. Den rätvinkliga triangeln för x-komponenten ger Ax/|A| = cos θ."
    ],
    "answer": "A/|A| är en enhetsvektor i A:s riktning; dess x-komponent är cos θ.",
    "interactive": [],
    "question": {
      "text": "Låt vec(A) beteckna en godtycklig vektor som inte är noll. Varför är vec(A)/A en enhetsvektor, och vilken riktning har den? Om θ är vinkeln mellan vec(A) och den positiva x-axeln, förklara varför (vec(A)/A) · î kallas riktningscosinus för den axeln.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Beteckningar: A utan pil betecknar det icke-negativa beloppet av vec(A)."
    }
  },
  "Q1.21": {
    "title": "En liten procentandel kan vara ett viktigt fel",
    "steps": [
      "Uttryck båda längderna i meter: 890 km = 890000 m.",
      "Procentuellt fel = (10.0/890000) × 100% ≈ 0.00112%. Även en liten andel kan få allvarliga fysiska konsekvenser.",
      "Att skriva 890010 m antyder att den ursprungliga resans längd är känd på meternivå. Den angivna sträckan 890 km ger inte stöd för en sådan precision."
    ],
    "answer": "Ungefär 0.00112%; den angivna summan får inte antyda en precision som underlaget inte stöder.",
    "interactive": [],
    "question": {
      "text": "Figur 1.6 visar följden av ett oacceptabelt fel i ett tågs stoppunkt. Om ett tåg färdas 890 km från Berlin till Paris och sedan kör 10.0 m förbi spårets slut, hur stort är då det procentuella felet i den totala tillryggalagda sträckan? Är det korrekt att skriva tågets totala tillryggalagda sträcka som 890,010 m? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Figur 1.6 är ett fotografi som visar ett tåg som har kört förbi sin stoppunkt. Avstånden som behövs för beräkningen anges i frågan."
    }
  },
  "Q1.22": {
    "title": "Kontrollera vilken typ varje operation ger",
    "steps": [
      "(a) A·(B−C): B−C är en vektor; skalärprodukten med A ger en skalär. Giltigt.",
      "(b) (A−B)×C: två vektorer ger en vektor. Giltigt.",
      "(c) A·(B×C): resultatet i parentesen är en vektor, så den avslutande skalärprodukten ger en skalär. Giltigt.",
      "(d) A×(B×C): resultatet i parentesen och A är vektorer. Giltigt.",
      "(e) A×(B·C): B·C är en skalär. Kryssprodukten kräver två vektorer, så detta är inte definierat."
    ],
    "answer": "(a)–(d) är giltiga; (e) är inte giltigt.",
    "interactive": [],
    "question": {
      "text": "Vilka av följande är giltiga matematiska operationer:\n(a) vec(A) · (vec(B) − vec(C));\n(b) (vec(A) − vec(B)) × vec(C);\n(c) vec(A) · (vec(B) × vec(C));\n(d) vec(A) × (vec(B) × vec(C));\n(e) vec(A) × (vec(B) · vec(C))?\nMotivera ditt svar i varje fall.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.23": {
    "title": "Parenteser spelar roll i kryssprodukter",
    "steps": [
      "Välj A = î, B = î och C = ĵ. Först är B×C = k̂, så A×(B×C) = î×k̂ = −ĵ.",
      "Med den andra grupperingen är A×B = î×î = 0. Då blir (A×B)×C = 0.",
      "−ĵ är inte noll, så uttrycken är inte lika i allmänhet.",
      "De kan vara lika i specialfall: välj A = B = C = î; då är båda leden noll."
    ],
    "answer": "Kryssprodukten är inte associativ; parenteserna kan i allmänhet inte flyttas.",
    "interactive": [],
    "question": {
      "text": "Betrakta vektorprodukterna vec(A) × (vec(B) × vec(C)) och (vec(A) × vec(B)) × vec(C). Ge ett exempel som illustrerar den allmänna regeln att dessa två vektorprodukter inte har samma belopp eller riktning. Kan du välja vektorerna vec(A), vec(B) och vec(C) så att de två vektorprodukterna är lika? Ge i så fall ett exempel.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.24": {
    "title": "En vinkelrät pil saknar komponent längs den andra",
    "steps": [
      "Om A×B inte är noll, är dess riktning vinkelrät mot A.",
      "Skalärprodukten med A innehåller därför faktorn cos 90° = 0.",
      "Om A×B redan är noll, ger även skalärprodukten av denna nollvektor och A värdet noll."
    ],
    "answer": "Resultatet är alltid noll.",
    "interactive": [],
    "question": {
      "text": "Visa att vec(A) · (vec(A) × vec(B)) = 0, oavsett vilka vec(A) och vec(B) är. (Ledtråd: Sök inte efter ett komplicerat matematiskt bevis. Utgå från definitionen av kryssproduktens riktning.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.25": {
    "title": "En nollprodukt kräver inte en ingående nollvektor",
    "steps": [
      "Välj î = (1,0,0) och ĵ = (0,1,0). Deras skalärprodukt är 0, men båda har längden 1.",
      "Välj î och 2î. De är parallella, så deras kryssprodukt är noll, trots att ingen av dem är noll.",
      "Skalärprodukten noll kan betyda vinkelrätt; kryssprodukten noll kan betyda parallellt."
    ],
    "answer": "Inget av påståendena kräver att någon av de ingående vektorerna är noll.",
    "interactive": [],
    "question": {
      "text": "(a) Om vec(A) · vec(B) = 0, följer det då nödvändigtvis att A = 0 eller B = 0? Förklara.\n(b) Om vec(A) × vec(B) = 0, följer det då nödvändigtvis att A = 0 eller B = 0? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Q1.26": {
    "title": "Nollvektorn och tal som tar ut varandra",
    "steps": [
      "x- och y-riktningarna är olika riktningar; deras tal tar inte ut varandra.",
      "A = (0,0,0) kräver att Ax = 0 och Ay = 0 var för sig.",
      "Ax = −Ay är då sant eftersom båda är noll, men den likheten ensam räcker inte: (3,−3,0) är inte en nollvektor."
    ],
    "answer": "Ax = Ay = 0.",
    "interactive": [],
    "question": {
      "text": "Om vec(A) = 0 för en vektor i xy-planet, följer det då att Aₓ = −Aᵧ? Vad kan du säga om Aₓ och Aᵧ?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.1": {
    "title": "En miljard sekunder",
    "steps": [
      "”Giga” betyder 10⁹, så 1.00 Gs = 1.00 × 10⁹ s.",
      "Ett år innehåller 365 × 24 × 60 × 60 = 31536000 s.",
      "Dividera det totala antalet sekunder med antalet sekunder per år: 1000000000/31536000 = 31.7098 år.",
      "Behåll tre värdesiffror, så att precisionen motsvarar den i 1.00 Gs."
    ],
    "answer": "31.7 år",
    "interactive": [],
    "question": {
      "text": "Hur många år äldre kommer du att vara om 1.00 gigasekund? (Anta att ett år har 365 dagar.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.2": {
    "title": "Omvandla en area",
    "steps": [
      "Börja med de givna omvandlingarna: 1 acre = 43560 ft²; 1 ft = 0.3048 m.",
      "En area har två längdfaktorer. Därför är 1 ft² = (0.3048 m)² = 0.09290304 m², inte 0.3048 m².",
      "Area = 265 × 43560 × 0.09290304 = 1072416.95 m².",
      "En km² = 1000000 m², så dividera med 1000000 för att få 1.07241695 km².",
      "En hektar = 10000 m², så dividera med 10000 för att få 107.241695 ha. Avrunda till tre värdesiffror."
    ],
    "answer": "1.07 × 10⁶ m² = 1.07 km² = 107 ha",
    "interactive": [],
    "question": {
      "text": "Du läser i en broschyr att Kensington Gardens, en av Londons åtta kungliga parker, har en area på 265 acres. Acre är en brittisk enhet som används mycket vid mätning av mark i Storbritannien (1 acre = 43,560 ft² och 1 ft = 0.3048 m, se bilaga C). Hur stor är Kensington Gardens area i kvadratmeter? I kvadratkilometer? I hektar (en hektar är en areaenhet som motsvarar 10,000 m² och används vid mätning av mark)?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.3": {
    "title": "Ljus som färdas en kort sträcka",
    "steps": [
      "Fart anger hur lång sträcka något färdas varje sekund. Använd c ≈ 3.0 × 10⁸ m/s.",
      "Tid = sträcka/fart = 0.3/(3.0 × 10⁸) s = 1 × 10⁻⁹ s.",
      "Nano betyder 10⁻⁹, så detta är ungefär en nanosekund."
    ],
    "answer": "Ungefär 1 ns",
    "interactive": [],
    "question": {
      "text": "Hur många nanosekunder tar det för ljus att färdas 0.3 m i vakuum?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Referensvärde: ljusets fart i vakuum c ≈ 3.00 × 10⁸ m/s."
    }
  },
  "1.4": {
    "title": "Omvandla densitet",
    "steps": [
      "Täljaren omvandlas med 1 g = 0.001 kg.",
      "Nämnaren omvandlas med 1 cm³ = (0.01 m)³ = 0.000001 m³.",
      "Därför är 1 g/cm³ = 0.001/0.000001 = 1000 kg/m³.",
      "Multiplicera 10.5 med 1000. Både den mindre massenheten och den mindre volymenheten måste omvandlas."
    ],
    "answer": "1.05 × 10⁴ kg/m³",
    "interactive": [],
    "question": {
      "text": "Silvers densitet är 10.5 g/cm³. Vad är detta värde i kilogram per kubikmeter?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.5": {
    "title": "Följ en kedja av antika måttenheter",
    "steps": [
      "(a) En miliarum innehåller 8 stadia × 125 passus per stadium × 5 pes per passus = 5000 pes.",
      "Omvandla: 5000 × 0.296 m = 1480 m. Antalen i indelningen mellan enheterna är exakta.",
      "(b) En pes innehåller 4 × 4 = 16 digitus. Alltså är en digitus 0.296/16 = 0.0185 m.",
      "Multiplicera antalet meter med 100 för att få centimeter: 0.0185 × 100 = 1.85 cm."
    ],
    "answer": "(a) 1.48 × 10³ m; (b) 1.85 cm",
    "interactive": [],
    "question": {
      "text": "I det antika romarriket mättes stora avstånd i miliarum. En miliarum delades in i 8 stadia, 1 stadium i 125 passus, 1 passus i 5 pes, 1 pes i 4 palmus och 1 palmus i 4 digitus. Med vetskapen att 1 pes = 0.296 m ska du bestämma antalet (a) meter i 1.00 miliarum och (b) centimeter i 1.00 digitus.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.6": {
    "title": "Jämför de historiska hastighetsgränserna",
    "steps": [
      "En mile = 5280 × 30.48 cm = 160934.4 cm = 1.609344 km.",
      "(a) 30 mi/h × 1.609344 = 48.28032 km/h. Den angivna nya gränsen på 50 km/h är ungefär 1.72 km/h högre.",
      "(b) 120 km/h ÷ 1.609344 = 74.5645 mi/h. Detta är ungefär 4.56 mi/h över den angivna gamla gränsen på 70 mi/h.",
      "Jämförelserna gäller de historiska värden som anges i uppgiften."
    ],
    "answer": "(a) ≈48.3 km/h; (b) ≈74.6 mi/h",
    "interactive": [],
    "question": {
      "text": "Hastighetsgränserna på Irland ändrades från brittiska enheter (miles per timme, mi/h) till metriska enheter (kilometer per timme, km/h) den 20 januari 2005. Använd 1 mi = 5280 ft och 1 ft = 30.48 cm för att:\n(a) omvandla den tidigare hastighetsgränsen på 30 mi/h i tätbebyggda områden till km/h och jämföra resultatet med den nya hastighetsgränsen på 50 km/h;\n(b) omvandla den nya hastighetsgränsen på 120 km/h på motorvägar till mi/h och jämföra resultatet med den gamla hastighetsgränsen på 70 mi/h.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.7": {
    "title": "Bränsleåtgång för en resa",
    "steps": [
      "(a) 1200 km innehåller 1200/100 = 12 sträckor på 100 km. Bränsleåtgång = 12 × 5.5 = 66 L.",
      "Antal tankvolymer = 66/40 = 1.65. Det motsvarar 1 full tank plus 26 L, så bränslet i två fulla tankar räcker.",
      "(b) 30.5 miles = 30.5 × 1.609 = 49.0745 km med 4.546 L.",
      "Bränsleåtgång per 100 km = (4.546/49.0745) × 100 = 9.2635 L/100 km.",
      "Den äldre bilens värde är ungefär 9.26/5.5 = 1.68 gånger den nyare bilens, alltså ungefär 68% mer bränsle per körd sträcka."
    ],
    "answer": "(a) 1.65 tankvolymer; (b) 9.26 L/100 km",
    "interactive": [],
    "question": {
      "text": "En bils bränsleförbrukning är mängden bränsle som används per sträckenhet. Det är vanligt att ange bränsleförbrukningen i liter per 100 km (L/100 km). Till exempel har Austin Mini Cooper av årsmodell 2019 en bränsleförbrukning på 5.5 L/100 km, vilket betyder att den använder 5.5 liter bensin för varje körd sträcka på 100 km.\n(a) Om bilens bensintank rymmer 40 L, hur många tankar bensin använder du då för att köra 1200 km?\n(b) Du läser i en engelsk biltidning att den klassiska Austin Mini Cooper av årsmodell 1964 har en uppskattad genomsnittlig ”körsträcka på 30.5 miles per gallon” (där 1 mile = 1.609 km är en brittisk längdenhet och 1 gallon (UK) = 4.546 L är en brittisk volymenhet, se bilaga C). Bestäm bilens bränsleförbrukning och jämför den med årsmodell 2019.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.8": {
    "title": "Små massor och förkortning av enheter",
    "steps": [
      "(a) 1 mg = 1000 µg. Därför är 410 mg/dygn × 1000 = 410000 µg/dygn.",
      "(b) 12 mg/kg × 77 kg = 924 mg. Enheterna kg förkortas bort. Dividera med 1000: 0.924 g/dygn (ungefär 0.92 g/dygn med två värdesiffror).",
      "(c) Omvandla 0.0030 g till 3.0 mg. Dividera med 2.0 mg per tablett: 3.0/2.0 = 1.5 tablettmängder.",
      "(d) 0.000070 g × 1000 mg/g = 0.070 mg.",
      "Detta är enhetsberäkningar med de mängder som uppgiften anger, inte en rekommendation om kosttillskott."
    ],
    "answer": "(a) 4.10 × 10⁵ µg/dygn; (b) 0.924 g/dygn före avrundning; (c) 1.5 tablettmängder; (d) 0.070 mg/dygn",
    "interactive": [],
    "question": {
      "text": "(a) Det rekommenderade dagliga intaget (RDA) av spårmetallen magnesium är 410 mg/dygn för män. Uttryck denna mängd i µg/dygn.\n(b) För vuxna är RDA för aminosyran lysin 12 mg per kg kroppsmassa. Hur många gram per dag bör en vuxen person med massan 77 kg få i sig?\n(c) En vanlig multivitamintablett kan innehålla 2.0 mg vitamin B₂ (riboflavin), och RDA är 0.0030 g/dygn. Hur många sådana tabletter bör en person ta varje dag för att få rätt mängd av vitaminet, om personen inte får något från andra källor?\n(d) RDA för spårämnet selen är 0.000070 g/dygn. Uttryck denna dos i mg/dygn.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.9": {
    "title": "Radie från massa och densitet",
    "steps": [
      "Densitet anger massa per volym: ρ = m/V. Lös ut volymen: V = m/ρ.",
      "Omvandla massan till gram: 60 kg = 60000 g. Volym = 60000/19.5 = 3076.92 cm³.",
      "För ett klot är V = (4/3)πr³. Multiplicera med 3/(4π): r³ = 3V/(4π).",
      "Kubikroten upphäver upphöjning till tre: r = ∛[3 × 3076.92/(4π)] ≈ 9.02 cm."
    ],
    "answer": "Radie ≈9.0 cm",
    "interactive": [],
    "question": {
      "text": "Neptunium. Hösten 2002 fastställde forskare vid Los Alamos National Laboratory att den kritiska massan för neptunium-237 är ungefär 60 kg. Den kritiska massan för ett klyvbart material är den minsta mängd som måste samlas för att en kärnkedjereaktion ska starta. Neptunium-237 har en densitet på 19.5 g/cm³. Vilken radie skulle ett klot av detta material ha om dess massa motsvarar den kritiska massan?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Referensformler: densitet ρ = massa/volym; klotets volym V = (4/3)πr³."
    }
  },
  "1.10": {
    "title": "Ett mikroskopiskt klot",
    "steps": [
      "Radien är halva diametern: r = 1.0 µm. En mikrometer är 10⁻⁶ m.",
      "För volymen använder vi r = 1.0 × 10⁻⁴ cm. V = (4/3)πr³ = 4.18879 × 10⁻¹² cm³.",
      "För ytarean använder vi r = 1.0 × 10⁻³ mm. S = 4πr² = 1.25664 × 10⁻⁵ mm².",
      "Avrunda båda resultaten till två värdesiffror. Arean beräknas med radien i kvadrat; volymen med radien upphöjd till tre."
    ],
    "answer": "V ≈4.2 × 10⁻¹² cm³; ytarea ≈1.3 × 10⁻⁵ mm²",
    "interactive": [],
    "question": {
      "text": "Bakterier. Bakterier varierar i storlek, men en diameter på 2.0 µm är inte ovanlig. Hur stor volym (i kubikcentimeter) och ytarea (i kvadratmillimeter) har en klotformad bakterie av den storleken? (Se bilaga D för relevanta formler.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Referensformler för ett klot: V = (4/3)πr³; ytarea A = 4πr²; diameter d = 2r."
    }
  },
  "1.11": {
    "title": "Hur mycket precision finns kvar?",
    "steps": [
      "Vid multiplikation och division använder vi det minsta antalet värdesiffror: 12 har två och 5.98 har tre, så vi använder två.",
      "(a) Area = 12 × 5.98 = 71.76 mm² → 72 mm².",
      "(b) Bredd/längd = 5.98/12 = 0.4983… → 0.50. Den avslutande nollan visar att talet har två värdesiffror.",
      "Vid addition och subtraktion anpassar vi avrundningen till den minst precisa decimalpositionen: längden mättes i hela millimeter.",
      "(c) Omkrets = 2(12 + 5.98) = 35.96 mm → ungefär 36 mm. Behåll extra siffror i mellanberäkningarna fram till den slutliga avrundningen.",
      "(d) Skillnad = 12 − 5.98 = 6.02 mm → 6 mm.",
      "(e) Längd/bredd = 12/5.98 = 2.0067… → 2.0. Kvoter mellan längder saknar enhet."
    ],
    "answer": "(a) 72 mm²; (b) 0.50; (c) 36 mm; (d) 6 mm; (e) 2.0",
    "interactive": [],
    "question": {
      "text": "Med en trälinjal mäter du längden på en rektangulär plåtbit till 12 mm. Med en mikrometer mäter du rektangelns bredd till 5.98 mm. Använd rätt antal värdesiffror: Hur stora är\n(a) rektangelns area;\n(b) kvoten mellan rektangelns bredd och längd;\n(c) rektangelns omkrets;\n(d) skillnaden mellan längden och bredden; samt\n(e) kvoten mellan längden och bredden?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.12": {
    "title": "Volymen av en tunn tråd",
    "steps": [
      "En cylinder kan ses som cirkelskivor staplade till en viss höjd: V = πr²h.",
      "Sätt in värdena: π × (0.036)² × 12.1 ≈ 0.0492652 cm³.",
      "Eftersom 1 cm = 10 mm är 1 cm³ = 1000 mm³. Volym ≈49.2652 mm³.",
      "Radien har två värdesiffror, så ange svaret med två. De inledande nollorna räknas inte som värdesiffror."
    ],
    "answer": "49 mm³",
    "interactive": [],
    "question": {
      "text": "Volymen av en massiv cylinder ges av V = πr²h, där r är radien och h är höjden. Du mäter radien och höjden på en tunn cylindrisk tråd och får resultaten r = 0.036 cm och h = 12.1 cm. Vilken volym i mm³ ger dina mätningar för tråden? Använd rätt antal värdesiffror i svaret.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.13": {
    "title": "Hur bra är π × 10⁷?",
    "steps": [
      "Referensvärde = 365.24 × 86400 = 31556736 s.",
      "Närmevärde = π × 10⁷ ≈ 31415926.54 s.",
      "Skillnad = närmevärde − referensvärde ≈ −140809.46 s.",
      "Procentuellt fel = skillnad/referensvärde × 100% ≈ −0.4462%. Minustecknet betyder att uppskattningen är för låg."
    ],
    "answer": "Ungefär 0.446% för litet",
    "interactive": [],
    "question": {
      "text": "Ett användbart och lättmemorerat närmevärde för antalet sekunder på ett år är π × 10⁷. Bestäm det procentuella felet i detta närmevärde. (Ett år innehåller 365.24 dagar.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.14": {
    "title": "Två närmevärden för π",
    "steps": [
      "22/7 = 3.142857… → 3.14286 med sex värdesiffror.",
      "355/113 = 3.14159292… → 3.14159.",
      "π = 3.14159265… → 3.14159. Det andra bråket ger rätt avrundning till sex värdesiffror; det första gör det inte."
    ],
    "answer": "(a) 3.14286, inte korrekt med sex värdesiffror; (b) 3.14159, korrekt med sex värdesiffror",
    "interactive": [],
    "question": {
      "text": "Uttryck varje närmevärde för π med sex värdesiffror:\n(a) 22/7 och\n(b) 355/113.\n(c) Är dessa närmevärden korrekta med den precisionen?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.15": {
    "title": "Kontrollera om storleken är rimlig",
    "steps": [
      "En fullvuxen giraffhane är mycket högre än en människa; 5 m är därför det rimliga alternativet för höjden, snarare än 2 m.",
      "1500 kg är det rimliga alternativet för massan; 5000 kg är i samma storleksordning som en stor elefant.",
      "15 m/s × 3.6 = 54 km/h; 45 m/s × 3.6 = 162 km/h. Den första farten är det rimliga alternativet.",
      "Detta är en bedömning av storleksordningen, inte en exakt biologisk mätning."
    ],
    "answer": "5 m; 1500 kg; 15 m/s",
    "interactive": [],
    "question": {
      "text": "Vilka av värdena nedan är rimliga för en genomsnittlig vuxen giraffhane:\n(a) en höjd på 2 m eller 5 m?\n(b) en massa på 1500 kg eller 5000 kg?\n(c) en maximal fart på 15 m/s eller 45 m/s?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.16": {
    "title": "Ett lands dagliga bensinförbrukning",
    "steps": [
      "Antal bilar = 60 miljoner människor × 2 bilar/3 människor = 40 miljoner bilar.",
      "En bil använder (10000 km/år) × (8 L/100 km) = 800 L/år.",
      "Alla bilar använder 40 miljoner × 800 = 32 miljarder L/år.",
      "Dividera med 365 dagar: ungefär 8.77 × 10⁷ L/dygn. Antagandena är grova, så ungefär 9 × 10⁷ L/dygn är ett lämpligt svar."
    ],
    "answer": "Ungefär 90 miljoner liter per dag med de angivna antagandena",
    "interactive": [],
    "question": {
      "text": "Hur många liter bensin används i Italien under en dag? Anta att det finns två bilar per tre personer, att varje bil körs i genomsnitt 10,000 kilometer per år och att en genomsnittlig bil förbrukar 8 liter bensin per 100 kilometer. Anta att Italien har ungefär 60 miljoner invånare.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.17": {
    "title": "Uppskatta värdet av en guldhög",
    "steps": [
      "En uppskattning behöver tydliga antaganden. Modellera högen som ett massivt block som är 1.7 m högt, 0.50 m brett och 0.30 m djupt.",
      "Volym = 1.7 × 0.50 × 0.30 = 0.255 m³ = 255000 cm³.",
      "Massa = densitet × volym = 19.3 × 255000 = 4921500 g.",
      "Med det pris som antas i uppgiften blir värdet ≈ 4921500 × $40 = $196860000.",
      "En djupare hög kostar mer, och mellanrum mellan guldstyckena minskar högens massa. Olika rimliga former ger olika uppskattningar."
    ],
    "answer": "En rimligt motiverad uppskattning: ungefär $2 × 10⁸, med det pris som boken antar",
    "interactive": [],
    "question": {
      "text": "I Wagners opera Das Rheingold friköps gudinnan Freia för en guldhög som är precis så hög och bred att den döljer henne. Uppskatta högens penningvärde. Guldets densitet är 19.3 g/cm³, och anta att dess värde är ungefär $40 per gram.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  }
};
  Object.assign(window.PhysicsLocales.sv.items, items);
})();
