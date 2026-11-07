(() => {
  'use strict';
  Object.assign(window.PhysicsLocales.sv, {content: {
  "lessons": [
    {
      "id": "nature",
      "section": "1.1",
      "title": "Fysik börjar med en fråga",
      "tag": "Inga ekvationer behövs",
      "intro": "Fysik handlar om hur den fysiska världen fungerar. Du använder redan lite fysik när du undrar varför en boll faller eller varför en cykel saktar in.",
      "steps": [
        [
          "Lägg märke till något",
          "Välj något som går att observera: en leksaksbil rullar längre på ett underlag än på ett annat."
        ],
        [
          "Gör ett antagande som går att testa",
          "Kanske påverkar underlaget hur snabbt bilen saktar in. Använd samma bil och samma knuff i starten, men byt underlag."
        ],
        [
          "Mät, jämför och upprepa",
          "Mät sträckan flera gånger. En modell är en förenklad beskrivning som hjälper oss att förutsäga ett resultat. Om tillförlitliga resultat inte stämmer med modellen behöver modellen eller dess antaganden förbättras."
        ]
      ],
      "example": "En modell är som en karta: den är användbar för ett visst syfte, och vissa detaljer har medvetet utelämnats.",
      "check": "Om en förutsägelse inte stämmer med ett noggrant försök som går att upprepa, ska vi då ändra mätvärdena så att de passar?",
      "answer": "Nej. Kontrollera metoden och antagandena igen. Ändra sedan modellen om skillnaden finns kvar."
    },
    {
      "id": "method",
      "section": "1.2",
      "title": "Ett lugnt sätt att lösa en uppgift",
      "tag": "Fyra små steg",
      "intro": "Du behöver inte veta svaret direkt. Börja med att dela upp frågan i mindre delar.",
      "steps": [
        [
          "Identifiera",
          "Skriv ner det du vet, tillsammans med enheterna. Skriv också vad du vill ta reda på. Rita en enkel bild av situationen."
        ],
        [
          "Ställ upp",
          "Välj ett samband. Fart betyder sträcka per tid, så sträcka = fart × tid. En bokstav är bara ett kort namn på en storhet: d för sträcka och t för tid."
        ],
        [
          "Beräkna",
          "Om du går med farten 2 m/s i 3 s blir sträckan d = (2 m/s) × (3 s) = 6 m. Sekunderna förkortas bort."
        ],
        [
          "Kontrollera",
          "Är 6 m rimligt? Är enheten en längdenhet? Om du går dubbelt så länge med samma fart, borde sträckan då bli dubbelt så lång? Ja."
        ]
      ],
      "example": "Läs ”=” som ”har samma värde som”. Tecknet visar en balans, inte en uppmaning att gissa nästa steg.",
      "check": "Varför blir svaret i meter när du beräknar 2 m/s × 3 s?",
      "answer": "”Per sekund” betyder att vi dividerar med sekunder. När vi sedan multiplicerar med sekunder förkortas de bort. Bara meter återstår."
    },
    {
      "id": "units",
      "section": "1.3–1.4",
      "title": "Ett tal behöver en enhet",
      "tag": "Prova enhetsverktyget nedan",
      "intro": "”Bordet är 2 långt” är ofullständigt. Två meter och två centimeter är väldigt olika längder. Ett fysikaliskt mätvärde består av ett tal och en enhet.",
      "steps": [
        [
          "Lär känna enheterna",
          "Meter (m) mäter längd, kilogram (kg) mäter massa och sekunder (s) mäter tid. Ett prefix ändrar skalan: kilo = 1000, centi = 1/100, milli = 1/1000, mikro (µ) = 1/1000000."
        ],
        [
          "Byt enhet men behåll storleken",
          "1 m och 100 cm beskriver samma längd. Därför gäller 2.5 m × (100 cm/1 m) = 250 cm. Att multiplicera med en omvandlingsfaktor som är lika med 1 ändrar enheten, inte föremålet."
        ],
        [
          "Kvadrater och kuber",
          "En kvadrat med sidan 1 cm har arean 1 cm² = (0.01 m)×(0.01 m) = 0.0001 m². En kub med sidan 1 cm har volymen 0.000001 m³. Omvandla varje längdfaktor."
        ],
        [
          "Läs tiopotenser",
          "10³ betyder 10×10×10 = 1000. 10⁻³ betyder 1/1000. I grundpotensform skriver man ett tal som en hanterbar faktor multiplicerad med en tiopotens."
        ]
      ],
      "example": "”m/s” betyder meter per sekund. ”m²” betyder kvadratmeter. Symbolerna beskriver olika slags storheter.",
      "check": "Är 1 cm³ lika med 0.01 m³?",
      "answer": "Nej. Upphöj omvandlingsfaktorn till tre: (0.01)³ = 0.000001. Alltså är 1 cm³ = 0.000001 m³."
    },
    {
      "id": "uncertainty",
      "section": "1.5",
      "title": "Mätningar är inte oändligt exakta",
      "tag": "Ange en rimlig precision",
      "intro": "En linjal med millimeterstreck kan inte motivera ett resultat med hur många decimaler som helst. Mätosäkerheten beskriver hur väl vi känner ett mätvärde.",
      "steps": [
        [
          "Tolka ett osäkerhetsintervall",
          "12.3 ± 0.1 cm betyder att det rapporterade värdet är 12.3 cm med en angiven osäkerhet på 0.1 cm. Det anger osäkerhetens storlek. Den statistiska betydelsen beror på mätmetoden."
        ],
        [
          "Skilj mellan riktighet och precision",
          "Riktighet handlar om hur nära det sanna värdet en mätning ligger. Precision handlar om hur nära upprepade mätvärden ligger varandra. En felaktig våg kan visa nästan samma fel varje gång: hög precision men låg riktighet."
        ],
        [
          "Behåll meningsfulla siffror",
          "Vid multiplikation och division är en vanlig grundregel att använda lika många värdesiffror som det uppmätta ingångsvärde som har minst antal värdesiffror. 2.0 × 3.14 = 6.28, vilket rapporteras som 6.3."
        ],
        [
          "Avrunda på slutet",
          "Vid addition och subtraktion följer du den minst precisa decimalpositionen: 12 + 5.98 = 17.98, vilket rapporteras som 18. Behåll extra siffror i mellanberäkningar. Exakta antal och definierade omvandlingsfaktorer begränsar inte precisionen."
        ]
      ],
      "example": "0.00450 har tre värdesiffror: 4, 5 och den sista 0. Nollorna i början visar bara decimaltecknets placering.",
      "check": "Räcker det att upprepa en mätning för att rätta till ett instrument som alltid visar 2 cm för mycket?",
      "answer": "Nej. Upprepning kan visa slumpmässig variation, men ett systematiskt fel behöver kalibrering eller någon annan korrigering."
    },
    {
      "id": "estimates",
      "section": "1.6",
      "title": "Gör en användbar uppskattning",
      "tag": "Tänk i rimliga storlekar",
      "intro": "Ibland finns det inte ett enda exakt svar. En uppskattning använder tydliga antaganden för att hitta en rimlig storleksordning.",
      "steps": [
        [
          "Välj enkla antaganden",
          "Hur många steg går det på en kilometer? Anta att den genomsnittliga steglängden är 0.70 m."
        ],
        [
          "Ställ upp beräkningen",
          "En kilometer är 1000 m. Antal steg ≈ 1000/0.70 ≈ 1429."
        ],
        [
          "Ange storleksordningen",
          "Säg ”ungefär 1400 steg”, inte ”exakt 1428.571”. Om steglängden ligger mellan 0.60 och 0.80 m blir uppskattningen ungefär 1250–1670 steg."
        ],
        [
          "Kontrollera vad som påverkar",
          "En annan steglängd ändrar svaret. Ange därför ditt antagande så att någon annan kan förbättra uppskattningen. En storleksordning beskriver storleken med hjälp av tiopotenser."
        ]
      ],
      "example": "En liter innehåller många tusen vanliga vattendroppar, inte tio droppar och inte en biljon. En grov rimlighetskontroll kan avslöja ett enhetsfel.",
      "check": "Måste två bra uppskattningar alltid ge samma tal?",
      "answer": "Nej. De kan bygga på olika rimliga antaganden. Jämför antagandena och resultatens storleksordning."
    },
    {
      "id": "arrows",
      "section": "1.7",
      "title": "En vektor är en pil med ett uppdrag",
      "tag": "Dra i pilspetsarna i 2D",
      "intro": "”Gå 3 meter” anger en sträcka. ”Gå 3 meter österut” anger både en sträcka och en riktning. Den andra instruktionen kan vi visa med en vektorpil.",
      "steps": [
        [
          "Skilj mellan skalär och vektor",
          "En skalär behöver ett tal och en enhet, till exempel 5 s eller 20 kg. En vektor behöver också en riktning, som en förskjutning eller en kraft. Vektorns belopp är dess längd och kan inte vara negativt."
        ],
        [
          "Addera spets mot början",
          "Gå 3 m österut och sedan 4 m norrut. Placera den andra pilens början vid den första pilens spets. Den totala förskjutningen går direkt från startpunkten till slutpunkten."
        ],
        [
          "Beräkna genvägens längd",
          "De två vinkelräta sträckorna bildar en rätvinklig triangel. Pythagoras sats ger genvägens längd² = 3² + 4² = 25. Kvadratroten upphäver kvadreringen, så genvägen är 5 m."
        ],
        [
          "Vänd en instruktion",
          "−A har samma längd som A men motsatt riktning. A−B betyder A+(−B): vänd på B och addera sedan."
        ]
      ],
      "example": "Den gångna sträckan är 3+4 = 7 m. Förskjutningens längd är 5 m. Sträckan följer vägen, medan förskjutningen förbinder ändpunkterna.",
      "check": "Du går runt kvarteret och kommer tillbaka till starten. Är förskjutningen lika stor som sträckan du har gått?",
      "answer": "Nej. Förskjutningen är noll eftersom startpunkten och slutpunkten sammanfaller. Den gångna sträckan är positiv.",
      "preset": "walk"
    },
    {
      "id": "components",
      "section": "1.8",
      "title": "Dela upp en pil i enkla riktningar",
      "tag": "Pilens skuggor",
      "intro": "Komponenterna anger hur mycket av en pil som ligger längs valda axlar. Tänk på dem som instruktioner för förflyttning i sidled, i kartans höjdled och uppåt i rummet.",
      "steps": [
        [
          "Välj axlar",
          "På en karta kan +x vara österut och +y norrut. I 3D lägger vi till +z uppåt. Negativt x betyder västerut, negativt y söderut och negativt z nedåt."
        ],
        [
          "Läs en koordinatgrupp",
          "(3,4,0) betyder 3 enheter längs x, 4 längs y och ingen längs z. Det beskriver en pil, inte tre svar som saknar samband."
        ],
        [
          "Lär känna sinus och cosinus",
          "För en pil med längden L och vinkeln θ från +x gäller x=Lcosθ och y=Lsinθ. Cosinus ger andelen i sidled och sinus andelen i höjdled. Vid 0° är hela pilen horisontell och vid 90° är hela pilen vertikal."
        ],
        [
          "Bestäm vinkeln säkert",
          "För (3,4) är tanθ=4/3, så invers tangens ger θ≈53.1°. Andra kombinationer av tecken kräver andra kvadranter. atan2(y,x) hanterar tecknen korrekt. En vinkel mätt från norr kräver en annan omvandling."
        ]
      ],
      "example": "Addera komponenterna var för sig: (3,1,0)+(−2,4,0)=(1,5,0). Öst–väst-komponenter adderas med varandra och nord–syd-komponenter med varandra.",
      "check": "Är (3,−3,0) lika med noll eftersom 3−3=0?",
      "answer": "Nej. Komponenterna ligger längs olika axlar. Pilen pekar åt sydost och har längden √18.",
      "preset": "components"
    },
    {
      "id": "unit",
      "section": "1.9",
      "title": "Enhetspilar är våra byggstenar",
      "tag": "Lär dig î, ĵ och k̂",
      "intro": "En enhetsvektor är en pil med längden 1. Den anger en riktning utan att lägga till en fysikalisk storlek.",
      "steps": [
        [
          "Tre byggstenar",
          "î=(1,0,0), ĵ=(0,1,0), k̂=(0,0,1). De pekar längs de positiva x-, y- och z-axlarna."
        ],
        [
          "Läs beteckningen högt",
          "3î+4ĵ betyder ”tre längs x, fyra längs y”. Det är ett annat sätt att skriva (3,4,0)."
        ],
        [
          "Gör en pil som inte är noll en enhet lång",
          "Längden av (3,4,0) är 5. Dividera varje komponent med 5: (0.6,0.8,0). Kontrollera att √(0.6²+0.8²)=1."
        ],
        [
          "Kom ihåg undantaget",
          "Nollvektorn har ingen riktning och kan inte normaliseras: division med noll är inte definierad."
        ]
      ],
      "example": "(1,1,1) är inte en enhetsvektor. Dess längd är √3 eftersom den har ett bidrag längs alla tre axlarna.",
      "check": "Vilken är enhetsvektorn i riktningen (0,0,−7)?",
      "answer": "Längden är 7. Dividera med 7 för att få (0,0,−1): rakt nedåt.",
      "preset": "space"
    },
    {
      "id": "dot",
      "section": "1.10",
      "title": "Skalärprodukt: hur mycket ligger längs riktningen?",
      "tag": "Ett tal, inte en pil",
      "intro": "En skalärprodukt beskriver hur två vektorers riktningar stämmer överens och tar också hänsyn till deras längder. Den är användbar när bara den del av en vektor som ligger längs en viss riktning spelar roll.",
      "steps": [
        [
          "Multiplicera motsvarande komponenter",
          "A·B = AxBx + AyBy + AzBz. För A=(3,4,0) och B=(2,0,0) blir resultatet 3×2+4×0=6."
        ],
        [
          "Koppla till vinkeln",
          "A·B=|A||B|cosθ. Samma riktning ger ett positivt värde, vinkelräta riktningar ger noll och en vinkel större än 90° ger ett negativt värde."
        ],
        [
          "Se projektionen",
          "Projektionen av A på B är den del av A som ligger längs B. Dess längd med tecken är (A·B)/|B|. Ett negativt tecken betyder att den pekar i motsatt riktning mot B."
        ],
        [
          "Ett fysikaliskt exempel: arbete",
          "Om kraften F verkar under förskjutningen s är arbetet W=F·s. En kraft på 10 N längs en förflyttning på 2 m utför arbetet 20 J. En vinkelrät kraft bidrar med noll arbete under just den förskjutningen."
        ]
      ],
      "example": "Skalärprodukten av två längdvektorer har enheten längd i kvadrat. Skalärprodukten av kraft och förskjutning har enheten N·m, som kallas joule.",
      "check": "Två vektorer som inte är noll har skalärprodukten noll. Måste någon av dem ändå vara noll?",
      "answer": "Nej. De kan vara vinkelräta, som (1,0,0) och (0,1,0).",
      "preset": "dot"
    },
    {
      "id": "cross",
      "section": "1.10",
      "title": "Kryssprodukt: en ny vinkelrät pil",
      "tag": "Här hjälper 3D oss",
      "intro": "Två pilar spänner upp ett plant område. Deras kryssprodukt pekar vinkelrätt mot området, så här behövs naturligt en tredje dimension.",
      "steps": [
        [
          "Förstå längden",
          "|A×B|=|A||B|sinθ. När båda vektorerna beskriver längder är detta arean av parallellogrammen som pilarna bildar. Parallella pilar ger arean noll."
        ],
        [
          "Välj rätt sida",
          "Använd höger hand: böj fingrarna från A mot B genom den mindre vinkeln. Tummen visar riktningen för A×B. Om du byter ordning vänder resultatets riktning."
        ],
        [
          "Börja med axlarna",
          "î×ĵ=k̂. Därför är (3,0,0)×(0,2,0)=(0,0,6). Rotera 3D-vyn för att se den nya pilen sticka ut ur xy-planet."
        ],
        [
          "Beräkna med komponenter",
          "A×B=(AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Varje komponent är skillnaden mellan två produkter. Resultatet ska vara vinkelrätt mot båda ursprungsvektorerna. Det kan du kontrollera med skalärprodukter."
        ]
      ],
      "example": "Vridmomentet r×F beskriver en krafts vridande verkan. Dess riktning anger en rotationsaxel, inte den bana som ett föremål följer.",
      "check": "Om A×B pekar uppåt, åt vilket håll pekar då B×A?",
      "answer": "Nedåt, med samma belopp. Om du byter ordning på vektorerna byter kryssprodukten tecken.",
      "preset": "cross"
    }
  ],
  "glossary": [
    [
      "Skalär",
      "En storhet som beskrivs av ett tal och en enhet, utan någon riktning i rummet."
    ],
    [
      "Vektor",
      "En storhet med både belopp och riktning."
    ],
    [
      "Belopp |A|",
      "En vektors längd, som inte kan vara negativ."
    ],
    [
      "Komponent Ax",
      "Den del av A som ligger längs x-axeln, med tecken som anger riktningen."
    ],
    [
      "Förskjutning",
      "Slutposition minus startposition."
    ],
    [
      "Resultant",
      "Den enda vektor som fås genom att addera andra vektorer."
    ],
    [
      "Enhetsvektor",
      "En vektor med längden 1 som används för att ange en riktning."
    ],
    [
      "θ (theta)",
      "En vanlig symbol för en vinkel. I laborationen börjar vinklarna vid +x och mäts moturs."
    ],
    [
      "sin, cos, tan",
      "Förhållanden som hör ihop med vinklar i rätvinkliga trianglar. De kopplar samman längder och riktningar."
    ],
    [
      "√ och ∛",
      "Kvadratrot och kubikrot: operationer som upphäver upphöjning till två respektive tre."
    ],
    [
      "Skalärprodukt ·",
      "En produkt av vektorer vars resultat är en skalär."
    ],
    [
      "Kryssprodukt ×",
      "En produkt av vektorer vars resultat är en vinkelrät vektor i 3D."
    ],
    [
      "ρ (rho)",
      "En vanlig symbol för densitet: massa dividerad med volym."
    ],
    [
      "≈",
      "Ungefär lika med. En avrundning eller uppskattning ingår."
    ],
    [
      "±",
      "Plus eller minus. Används för att ange en osäkerhet eller två algebraiska möjligheter."
    ],
    [
      "AU och ly",
      "Astronomisk enhet och ljusår: båda är längdenheter."
    ]
  ],
  "quiz": [
    {
      "id": "quiz-0",
      "level": 1,
      "type": "problems",
      "prompt": "Hur många centimeter är 2.5 m?",
      "options": [
        "250 cm",
        "25 cm",
        "0.025 cm",
        "2500 cm"
      ],
      "answer": 0,
      "why": "Varje meter innehåller 100 centimeter. Multiplicera antalet meter med 100: 2.5×100=250 cm."
    },
    {
      "id": "quiz-1",
      "level": 1,
      "type": "problems",
      "prompt": "Gå 3 m österut och 4 m norrut. Hur lång är förskjutningen?",
      "options": [
        "5 m",
        "7 m",
        "1 m",
        "12 m"
      ],
      "answer": 0,
      "why": "Sträckorna är vinkelräta: längden=√(3²+4²)=√25=5 m."
    },
    {
      "id": "quiz-2",
      "level": 1,
      "type": "problems",
      "prompt": "Du återvänder till startpunkten efter att ha gått 40 m. Hur stor är förskjutningen?",
      "options": [
        "0 m",
        "40 m",
        "80 m",
        "20 m"
      ],
      "answer": 0,
      "why": "Slutposition minus startposition är noll. Den gångna sträckan är fortfarande 40 m."
    },
    {
      "id": "quiz-3",
      "level": 1,
      "type": "problems",
      "prompt": "Vad är 3×10³?",
      "options": [
        "3000",
        "30",
        "0.003",
        "300"
      ],
      "answer": 0,
      "why": "Exponenten 3 betyder att tre tior multipliceras: 10×10×10=1000. Sedan är 3×1000=3000."
    },
    {
      "id": "quiz-4",
      "level": 1,
      "type": "terms",
      "prompt": "Vilken storhet behöver en riktning i rummet?",
      "options": [
        "Förskjutning",
        "Massa",
        "Förfluten tid",
        "Temperatur"
      ],
      "answer": 0,
      "why": "En förskjutning behöver både belopp och riktning. De andra storheterna är skalärer."
    },
    {
      "id": "quiz-5",
      "level": 1,
      "type": "terms",
      "prompt": "Vad betyder en vektors belopp?",
      "options": [
        "Dess längd",
        "Dess färg",
        "Bara dess x-komponent",
        "Dess negativa riktning"
      ],
      "answer": 0,
      "why": "Beloppet är pilens längd och kan inte vara negativt."
    },
    {
      "id": "quiz-6",
      "level": 1,
      "type": "terms",
      "prompt": "Upprepade mätvärden ligger nära varandra men är alltid för höga. Mätningen har…",
      "options": [
        "Hög precision men låg riktighet",
        "Hög riktighet men låg precision",
        "Nödvändigtvis både hög precision och hög riktighet",
        "Nödvändigtvis varken hög precision eller hög riktighet"
      ],
      "answer": 0,
      "why": "Upprepade mätvärden som ligger tätt har hög precision. Det systematiska felet gör att riktigheten är låg."
    },
    {
      "id": "quiz-7",
      "level": 1,
      "type": "terms",
      "prompt": "Vad gäller för en enhetsvektor?",
      "options": [
        "Längden är 1",
        "Varje komponent är lika med 1",
        "Den saknar riktning",
        "Längden är 0"
      ],
      "answer": 0,
      "why": "Det är bara den totala längden som måste vara 1. Till exempel är (0.6,0.8,0) en enhetsvektor."
    },
    {
      "id": "quiz-8",
      "level": 1,
      "type": "language",
      "prompt": "Hur läser du ”m/s”?",
      "options": [
        "Meter per sekund",
        "Meter gånger sekunder",
        "Kvadratmeter",
        "Sekunder per meter"
      ],
      "answer": 0,
      "why": "Snedstrecket betyder dividerat med, eller ”per”."
    },
    {
      "id": "quiz-9",
      "level": 1,
      "type": "language",
      "prompt": "Vad betyder en negativ x-komponent?",
      "options": [
        "Längs den negativa x-axeln",
        "Negativ fysikalisk längd",
        "Alltid söderut",
        "Ingen rörelse"
      ],
      "answer": 0,
      "why": "Tecknet anger riktningen längs den valda axeln. Beloppet är fortfarande inte negativt."
    },
    {
      "id": "quiz-10",
      "level": 1,
      "type": "language",
      "prompt": "Vad betyder ”≈”?",
      "options": [
        "Ungefär lika med",
        "Exakt identiskt",
        "Mindre än",
        "Multiplicera"
      ],
      "answer": 0,
      "why": "Det markerar ett närmevärde, till exempel 22/7≈3.14."
    },
    {
      "id": "quiz-11",
      "level": 1,
      "type": "language",
      "prompt": "Vilken beteckning beskriver area?",
      "options": [
        "m²",
        "m",
        "m³",
        "m/s"
      ],
      "answer": 0,
      "why": "Area innehåller två längdfaktorer, till exempel bredd×höjd."
    },
    {
      "id": "quiz-12",
      "level": 2,
      "type": "problems",
      "prompt": "Vad är 1 cm³ i m³?",
      "options": [
        "10⁻⁶ m³",
        "10⁻² m³",
        "10⁻³ m³",
        "10⁶ m³"
      ],
      "answer": 0,
      "why": "Upphöj längdfaktorn till tre: (10⁻² m)³=10⁻⁶ m³."
    },
    {
      "id": "quiz-13",
      "level": 2,
      "type": "problems",
      "prompt": "A=(3,−2,0), B=(−1,5,0). Bestäm A+B.",
      "options": [
        "(2,3,0)",
        "(4,−7,0)",
        "(2,−7,0)",
        "(−3,−10,0)"
      ],
      "answer": 0,
      "why": "Addera motsvarande komponenter: 3+(−1)=2, −2+5=3, z=0."
    },
    {
      "id": "quiz-14",
      "level": 2,
      "type": "problems",
      "prompt": "Vilken är enhetsvektorn i riktningen (0,−3,4)?",
      "options": [
        "(0,−0.6,0.8)",
        "(0,−1,1)",
        "(0,−3,4)",
        "(0,0.6,−0.8)"
      ],
      "answer": 0,
      "why": "Längden=√(9+16)=5. Dividera varje komponent med 5."
    },
    {
      "id": "quiz-15",
      "level": 2,
      "type": "problems",
      "prompt": "Avrunda 2.0×3.14 till lämpligt antal värdesiffror.",
      "options": [
        "6.3",
        "6.28",
        "6",
        "6.2800"
      ],
      "answer": 0,
      "why": "Produkten är 6.28, men det uppmätta ingångsvärdet 2.0 har bara två värdesiffror."
    },
    {
      "id": "quiz-16",
      "level": 2,
      "type": "terms",
      "prompt": "Vilken storhet följer hela vägen?",
      "options": [
        "Sträcka",
        "Förskjutning",
        "Enhetsriktningen",
        "Bara skillnaden mellan två positioner"
      ],
      "answer": 0,
      "why": "Sträckan summerar längderna längs vägen. Förskjutningen beror bara på de två ändpunkterna."
    },
    {
      "id": "quiz-17",
      "level": 2,
      "type": "terms",
      "prompt": "Vad är resultanten av två vektorer?",
      "options": [
        "Deras vektorsumma",
        "Summan av deras längder i alla situationer",
        "Deras medelvinkel",
        "Deras skalärprodukt"
      ],
      "answer": 0,
      "why": "Resultanten kombinerar komponenterna och innehåller även en riktning."
    },
    {
      "id": "quiz-18",
      "level": 2,
      "type": "terms",
      "prompt": "En riktningscosinus är…",
      "options": [
        "En komponent i en enhetsvektor som anger riktning",
        "En komponent i meter",
        "Alltid större än 1",
        "Vektorns längd"
      ],
      "answer": 0,
      "why": "Ax/|A|=cosθx. Eftersom det är ett cosinusvärde ligger det mellan −1 och 1."
    },
    {
      "id": "quiz-19",
      "level": 2,
      "type": "terms",
      "prompt": "Varför behåller man extra siffror i mellanberäkningar?",
      "options": [
        "För att undvika fel från för tidig avrundning",
        "För att påstå att noggrannheten är större",
        "För att byta enheter",
        "För att slippa kontrollera resultat"
      ],
      "answer": 0,
      "why": "Behåll siffrorna i mellanberäkningarna och avrunda slutresultatet till en motiverad precision."
    },
    {
      "id": "quiz-20",
      "level": 2,
      "type": "language",
      "prompt": "Vilket uttryck är likvärdigt med A−B?",
      "options": [
        "A+(−B)",
        "B−A",
        "−(A+B)",
        "A+B"
      ],
      "answer": 0,
      "why": "Subtraktion innebär att addera motsatsen till den vektor som dras bort."
    },
    {
      "id": "quiz-21",
      "level": 2,
      "type": "language",
      "prompt": "3î−2ĵ motsvarar…",
      "options": [
        "(3,−2,0)",
        "(−2,3,0)",
        "(3,2,0)",
        "(1,0,0)"
      ],
      "answer": 0,
      "why": "Koefficienterna framför î, ĵ och k̂ anger x-, y- och z-komponenterna."
    },
    {
      "id": "quiz-22",
      "level": 2,
      "type": "language",
      "prompt": "En riktning ligger 30° väster om norr. Vilken är standardvinkeln från +x?",
      "options": [
        "120°",
        "30°",
        "60°",
        "300°"
      ],
      "answer": 0,
      "why": "Börja vid norr, 90°, och vrid sedan 30° mot väster: 120°."
    },
    {
      "id": "quiz-23",
      "level": 2,
      "type": "language",
      "prompt": "Vilket uttryck har dimensionen volym?",
      "options": [
        "πr²h",
        "πr³h",
        "2πr",
        "r/h"
      ],
      "answer": 0,
      "why": "r²h innehåller tre längdfaktorer. π är dimensionslöst."
    },
    {
      "id": "quiz-24",
      "level": 3,
      "type": "problems",
      "prompt": "A=(2,3,0), B=(−3,2,0). Vad är deras skalärprodukt?",
      "options": [
        "0",
        "12",
        "−12",
        "13"
      ],
      "answer": 0,
      "why": "2(−3)+3(2)=−6+6=0, så dessa vektorer som inte är noll är vinkelräta."
    },
    {
      "id": "quiz-25",
      "level": 3,
      "type": "problems",
      "prompt": "Beräkna (2,0,0)×(0,3,0).",
      "options": [
        "(0,0,6)",
        "(0,0,−6)",
        "6",
        "(2,3,0)"
      ],
      "answer": 0,
      "why": "î×ĵ=k̂; beloppet=2×3=6. Resultatet är en vektor."
    },
    {
      "id": "quiz-26",
      "level": 3,
      "type": "problems",
      "prompt": "Starta i (4,−2,1) och sluta i (−1,3,5). Vilken är förskjutningen?",
      "options": [
        "(−5,5,4)",
        "(3,1,6)",
        "(5,−5,−4)",
        "(−1,3,5)"
      ],
      "answer": 0,
      "why": "Slutposition minus startposition: −1−4=−5; 3−(−2)=5; 5−1=4."
    },
    {
      "id": "quiz-27",
      "level": 3,
      "type": "problems",
      "prompt": "En kraft på 10 N bildar vinkeln 60° med en förskjutning på 2 m. Hur stort arbete utför den?",
      "options": [
        "10 J",
        "20 J",
        "0 J",
        "−10 J"
      ],
      "answer": 0,
      "why": "Bara delen längs rörelsen bidrar. Den delen är 10cos60°=5 N. Arbetet = 5 N×2 m=10 J."
    },
    {
      "id": "quiz-28",
      "level": 3,
      "type": "terms",
      "prompt": "Vad säger en negativ skalärprodukt om två vektorer som inte är noll?",
      "options": [
        "Vinkeln mellan dem är större än 90°",
        "En längd är negativ",
        "Deras kryssprodukt måste vara noll",
        "De är alltid motsatt riktade"
      ],
      "answer": 0,
      "why": "A·B=ABcosθ. Ett negativt cosinusvärde innebär här en vinkel större än en rät vinkel, upp till och med 180°."
    },
    {
      "id": "quiz-29",
      "level": 3,
      "type": "terms",
      "prompt": "Vad beskriver kryssproduktens riktning?",
      "options": [
        "Vinkelrätt mot båda ursprungsvektorerna, enligt högerhandsregeln",
        "Längs den större ursprungsvektorn",
        "Alltid uppåt",
        "Längs summan"
      ],
      "answer": 0,
      "why": "Planets normal kan peka åt två håll. Vektorernas ordning och högerhandsregeln avgör vilket."
    },
    {
      "id": "quiz-30",
      "level": 3,
      "type": "terms",
      "prompt": "Projektionen av A på B är…",
      "options": [
        "Den del av A som ligger längs B:s linje",
        "Alltid A självt",
        "Kryssprodukten",
        "Alltid positiv i B:s riktning"
      ],
      "answer": 0,
      "why": "Projektionen=(A·B)/(B·B) B när B inte är noll. Den kan peka i motsatt riktning mot B."
    },
    {
      "id": "quiz-31",
      "level": 3,
      "type": "terms",
      "prompt": "Kan två vektorer med olika längder ta ut varandra?",
      "options": [
        "Nej",
        "Ja, om de är vinkelräta",
        "Alltid",
        "Bara i 3D"
      ],
      "answer": 0,
      "why": "A+B=0 innebär B=−A, så längderna måste vara lika."
    },
    {
      "id": "quiz-32",
      "level": 3,
      "type": "language",
      "prompt": "Vilket uttryck är inte definierat i vanlig vektoralgebra?",
      "options": [
        "A×(B·C)",
        "A·(B×C)",
        "A×(B×C)",
        "(A−B)·C"
      ],
      "answer": 0,
      "why": "B·C är en skalär. En kryssprodukt kräver två vektorer."
    },
    {
      "id": "quiz-33",
      "level": 3,
      "type": "language",
      "prompt": "För bäringen β, mätt medurs från norr, vilka komponenter är korrekta?",
      "options": [
        "x=Lsinβ, y=Lcosβ",
        "x=Lcosβ, y=Lsinβ",
        "x=−Lsinβ, y=Lcosβ",
        "x=L, y=β"
      ],
      "answer": 0,
      "why": "Vid bäringen 0° betyder norr att x=0 och y=L. Ordningen mellan sinus och cosinus måste stämma med den kontrollen."
    },
    {
      "id": "quiz-34",
      "level": 3,
      "type": "language",
      "prompt": "Vilken identitet gäller alltid?",
      "options": [
        "A×B=−(B×A)",
        "A×B=B×A",
        "A·B=−(B·A)",
        "|A+B|=|A|+|B|"
      ],
      "answer": 0,
      "why": "Kryssprodukten är antisymmetrisk. Att direkt addera längder fungerar bara för parallella vektorer med samma riktning."
    },
    {
      "id": "quiz-35",
      "level": 3,
      "type": "language",
      "prompt": "Vilken enhet har kryssprodukten av en längdvektor och en kraftvektor?",
      "options": [
        "N·m",
        "N/m",
        "m/s",
        "Ingen enhet"
      ],
      "answer": 0,
      "why": "Multiplicera ursprungsvektorernas enheter. Den här kombinationen förekommer i vridmoment."
    },
    {
      "id": "quiz-36",
      "level": 4,
      "type": "problems",
      "prompt": "A och B är inte noll. Deras skalärprodukt är −3 och kryssproduktens belopp är 4. Vilken är vinkeln mellan dem?",
      "options": [
        "126.9°",
        "53.1°",
        "−53.1°",
        "90°"
      ],
      "answer": 0,
      "why": "Skalärprodukten är negativ, så vinkeln är trubbig. atan2(4,−3)=126.87°."
    },
    {
      "id": "quiz-37",
      "level": 4,
      "type": "problems",
      "prompt": "A=(1,1,1), B=(1,−1,−1). Vad är cosθ?",
      "options": [
        "−1/3",
        "1/3",
        "−1",
        "0"
      ],
      "answer": 0,
      "why": "Skalärprodukten=−1. Båda längderna är √3, så dividera −1 med √3×√3=3."
    },
    {
      "id": "quiz-38",
      "level": 4,
      "type": "problems",
      "prompt": "A=(1,0,0), B=(1,2,0). C ligger i xy-planet, är vinkelrät mot A och uppfyller C·B=6. Bestäm C.",
      "options": [
        "(0,3,0)",
        "(3,0,0)",
        "(0,6,0)",
        "(6,−3,0)"
      ],
      "answer": 0,
      "why": "A·C=Cx=0. Då är B·C=2Cy=6, så Cy=3."
    },
    {
      "id": "quiz-39",
      "level": 4,
      "type": "problems",
      "prompt": "En rektangel är 10.0±0.1 cm gånger 2.0±0.1 cm. Hur stor är areans osäkerhet i värsta fall, i första ordningens approximation?",
      "options": [
        "1.2 cm²",
        "0.2 cm²",
        "0.01 cm²",
        "6 cm²"
      ],
      "answer": 0,
      "why": "ΔA≈WΔL+LΔW=2×0.1+10×0.1=1.2 cm²."
    },
    {
      "id": "quiz-40",
      "level": 4,
      "type": "terms",
      "prompt": "Om bara |A×B| och vektorernas längder, som inte är noll, är kända, vilken tvetydighet finns ofta kvar?",
      "options": [
        "En spetsig vinkel eller dess trubbiga supplementvinkel",
        "Det finns ingen information alls om vinkeln",
        "Bara vinkeln noll är möjlig",
        "Längderna måste ändras"
      ],
      "answer": 0,
      "why": "sinθ=sin(180°−θ). Skalärproduktens tecken skiljer de två möjligheterna åt."
    },
    {
      "id": "quiz-41",
      "level": 4,
      "type": "terms",
      "prompt": "Varför går det inte att normalisera en nollvektor?",
      "options": [
        "Den saknar riktning och skulle kräva division med noll",
        "Den är för kort för att ritas noggrant",
        "Den pekar alltid längs +x",
        "Dess längd är negativ"
      ],
      "answer": 0,
      "why": "A/|A| är inte definierat när |A|=0. Det finns ingen entydig riktning att bevara."
    },
    {
      "id": "quiz-42",
      "level": 4,
      "type": "terms",
      "prompt": "Vad beskriver summan av de relativa osäkerheterna i första ordningens approximation här?",
      "options": [
        "En gräns för värsta fallet för en produkt när osäkerheterna är små",
        "En exakt statistisk lag för varje situation",
        "Summan av enheterna",
        "Ett bevis på perfekt noggrannhet"
      ],
      "answer": 0,
      "why": "Vid uppskattning av värsta fallet adderas små relativa bidrag till osäkerheten. För oberoende slumpmässiga osäkerheter används vanligtvis kvadratisk summering."
    },
    {
      "id": "quiz-43",
      "level": 4,
      "type": "terms",
      "prompt": "Tre vektorer med längder som inte är noll kan bilda en sluten väg om…",
      "options": [
        "Den längsta inte är längre än summan av de andra två",
        "Den längsta är längre än de andra två tillsammans",
        "Alla måste vara lika långa",
        "Bara två får ha en längd som inte är noll"
      ],
      "answer": 0,
      "why": "Detta är triangelvillkoret. Likhet tillåter en sluten väg där alla vektorer ligger längs samma linje."
    },
    {
      "id": "quiz-44",
      "level": 4,
      "type": "language",
      "prompt": "Vilket samband kontrollerar en beräknad kryssprodukt C=A×B?",
      "options": [
        "A·C=0 och B·C=0",
        "A·C=1 och B·C=1",
        "C=A+B",
        "|C|=|A|+|B|"
      ],
      "answer": 0,
      "why": "En kryssprodukt är vinkelrät mot båda ursprungsvektorerna. Kontrollerna är nödvändiga, men de bestämmer inte ensamma produktens storlek och tecken."
    },
    {
      "id": "quiz-45",
      "level": 4,
      "type": "language",
      "prompt": "Vad gäller i allmänhet när A×(B×C) jämförs med (A×B)×C?",
      "options": [
        "De behöver inte vara lika",
        "De är alltid lika",
        "De har alltid samma längd",
        "De är alltid motsatta"
      ],
      "answer": 0,
      "why": "Kryssprodukten är inte associativ. För A=B=î och C=ĵ är det första uttrycket −ĵ och det andra noll."
    },
    {
      "id": "quiz-46",
      "level": 4,
      "type": "language",
      "prompt": "Vilken identitet är korrekt för vilka två 3D-vektorer som helst?",
      "options": [
        "|A×B|²+(A·B)²=|A|²|B|²",
        "|A×B|+(A·B)=|A||B|",
        "A·B=A×B",
        "|A×B|=A·B"
      ],
      "answer": 0,
      "why": "Kvadrera ABsinθ och ABcosθ och addera sedan. Då används sin²θ+cos²θ=1."
    },
    {
      "id": "quiz-47",
      "level": 4,
      "type": "language",
      "prompt": "När B inte är noll är projektionsvektorn av A på B…",
      "options": [
        "[(A·B)/(B·B)]B",
        "(A×B)/|B|",
        "[(A·B)/|A|]A",
        "A+B"
      ],
      "answer": 0,
      "why": "Koefficienten anger vilken multipel av B som behövs. Skalärprodukten av resten A−projektionen och B blir noll."
    }
  ]
}});
})();
