(function(){
  const items = {
  "1.18": {
    "id": "1.18",
    "title": "Ett års andning",
    "steps": [
      "Anta 12 andetag per minut och person samt ett år med 365 dagar. Varje andetag är 500 cm³ = 0.0005 m³.",
      "Ett år innehåller 365 × 24 × 60 = 525600 minuter.",
      "Total volym = 4 × 12 × 525600 × 0.0005 = 12614.4 m³.",
      "Lös V = (4/3)πr³: r = ∛(3V/4π) ≈ 14.44 m. Diameter = 2r ≈ 28.9 m.",
      "Här räknas den inandade volymen vid upprepad andning. En verklig station återvinner luften; detta är den idealiserade lagringsberäkning som efterfrågas i uppgiften."
    ],
    "answer": "Med 12 andetag/min: ungefär 1.3 × 10⁴ m³; diameter ungefär 29 m",
    "interactive": [],
    "question": {
      "text": "Fyra astronauter befinner sig i en klotformad rymdstation.\n(a) Om var och en, som är normalt, andas in ungefär 500 cm³ luft vid varje andetag, ungefär hur stor luftvolym (i kubikmeter) andas dessa astronauter in under ett år?\n(b) Vilken diameter (i meter) skulle rymdstationen behöva ha för att rymma all denna luft?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.19": {
    "id": "1.19",
    "title": "Hur många droppar ryms i en liter?",
    "steps": [
      "Anta en klotformad droppe med diametern 4 mm, alltså radien r = 2 mm.",
      "Volym per droppe = (4/3)π(2 mm)³ ≈ 33.51 mm³ = 0.03351 mL.",
      "En liter är 1000 mL. Antal droppar ≈ 1000/0.03351 ≈ 29842.",
      "Ange ungefär 30000 droppar. Svaret beror starkt på droppens diameter, eftersom volymen är proportionell mot diametern i kubik."
    ],
    "answer": "Ungefär 3 × 10⁴ droppar med den antagna diametern 4 mm",
    "interactive": [],
    "question": {
      "text": "Du använder vatten för att späda ut små mängder kemikalier i laboratoriet, droppe för droppe. Hur många vattendroppar ryms i en flaska på 1.0 L? (Ledtråd: Börja med att uppskatta diametern hos en vattendroppe.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.20": {
    "id": "1.20",
    "title": "Räkna en livstids hjärtslag",
    "steps": [
      "Ange antagandena: 70 slag per minut och en livslängd på 80 år, med 365 dagar/år.",
      "Minuter = 80 × 365 × 24 × 60 = 42048000.",
      "Slag = 70 × 42048000 = 2943360000, ungefär 3 miljarder.",
      "50 cm³ = 0.050 L. Total pumpad volym = 2943360000 × 0.050 = 147168000 L.",
      "Samma blod cirkulerar om och om igen; detta är den sammanlagda pumpade volymen, inte mängden blod i kroppen."
    ],
    "answer": "Ungefär 3 × 10⁹ slag och 1.5 × 10⁸ L, med de angivna antagandena",
    "interactive": [],
    "question": {
      "text": "Hur många gånger slår en människas hjärta under hennes livstid? Hur många liter blod pumpar det? (Uppskatta att hjärtat pumpar 50 cm³ blod vid varje slag och anta att ett år har 365 dagar.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.21": {
    "id": "1.21",
    "title": "Utdelningsrutten",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En rutts förskjutning är den raka pilen från dess start till dess slut.",
      "För en skalenlig ritning låter du 1 cm motsvara 1 km. Rita 2.6 cm uppåt, sedan 4.0 cm åt höger och därefter 3.1 cm med vinkeln 45°.",
      "Den diagonala delsträckan har x = 3.1 cos45° och y = 3.1 sin45°, båda ≈2.192 km. Komponenterna nedan kontrollerar mätningen i diagrammet.",
      "Delsträcka 1 har komponenterna (0, 2.6, 0) km.",
      "Delsträcka 2 har komponenterna (4, 0, 0) km.",
      "Delsträcka 3 har komponenterna (2.192, 2.192, 0) km.",
      "Addera x-, y- och z-komponenterna var för sig: aktuell förskjutning = (6.192, 4.792, 0) km.",
      "Resultat: (6.192, 4.792, 0) km. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(6.192)² + (4.792)² + (0)²] = √(61.3048) ≈ 7.83 km.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 37.74° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "Rita delsträckorna så att varje pils början ligger vid den föregående pilens spets. Resultatet går direkt från starten till slutpunkten (eller från den aktuella punkten till målet när en återstående delsträcka efterfrågas). Detta kontrollerar tecknen och kvadranten."
    ],
    "answer": "(6.192, 4.792, 0) km; längd ≈ 7.83 km; θ ≈ 37.74° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "En postanställd kör en distributionsbil längs rutten som visas i figur E1.21. Bestäm den resulterande förskjutningens belopp och riktning genom att rita ett skalenligt diagram. (Se även uppgift 1.28 för en annan metod.)",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-21.svg",
        "caption": "Figur E1.21",
        "alt": "Distributionsbilens rutt: start, 2.6 km norrut, 4.0 km österut och sedan 3.1 km i riktningen 45° norr om öster till slutpunkten."
      },
      "reference": null
    }
  },
  "1.22": {
    "id": "1.22",
    "title": "Addera och vänd figurens pilar",
    "steps": [
      "Låt 1 cm på papperet motsvara 5 m. Rita de två pilarna så att den andra börjar vid den förstas spets. Vid subtraktion vänder du pilen som ska subtraheras.",
      "B:s vinkel från +x är 90°−30° = 60°, så B = (15 cos60°,15 sin60°,0). Den numeriska beräkningen kontrollerar den skalenliga ritningen.",
      "(a) A+B: börja med A = (0, -8, 0) och B = (7.5, 12.99, 0).",
      "Arbeta med en riktning i taget: (0 + (7.5), -8 + (12.99), 0 + (0)). När pilar adderas läggs värdena i var och en av de tre komponentriktningarna ihop.",
      "(a) A+B: (7.5, 4.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7.5)² + (4.99)² + (0)²] = √(81.1539) ≈ 9.009 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 33.64° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(b) A−B: börja med A = (0, -8, 0) och B = (7.5, 12.99, 0).",
      "Arbeta med en riktning i taget: (0 − (7.5), -8 − (12.99), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "(b) A−B: (-7.5, -20.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-7.5)² + (-20.99)² + (0)²] = √(496.846) ≈ 22.29 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 250.3° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(c) −A−B: börja med A = (0, 8, 0) och B = (-7.5, -12.99, 0).",
      "Arbeta med en riktning i taget: (0 + (-7.5), 8 + (-12.99), 0 + (0)). När pilar adderas läggs värdena i var och en av de tre komponentriktningarna ihop.",
      "(c) −A−B: (-7.5, -4.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-7.5)² + (-4.99)² + (0)²] = √(81.1539) ≈ 9.009 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 213.6° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(d) B−A: börja med A = (7.5, 12.99, 0) och B = (0, -8, 0).",
      "Arbeta med en riktning i taget: (7.5 − (0), 12.99 − (-8), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "(d) B−A: (7.5, 20.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7.5)² + (20.99)² + (0)²] = √(496.846) ≈ 22.29 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 70.34° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "(a) A+B: (7.5, 4.99, 0) m; längd ≈ 9.009 m; θ ≈ 33.64°\n(b) A−B: (-7.5, -20.99, 0) m; längd ≈ 22.29 m; θ ≈ 250.3°\n(c) −A−B: (-7.5, -4.99, 0) m; längd ≈ 9.009 m; θ ≈ 213.6°\n(d) B−A: (7.5, 20.99, 0) m; längd ≈ 22.29 m; θ ≈ 70.34°",
    "interactive": [
      {
        "label": "(a) A+B",
        "units": "m"
      },
      {
        "label": "(b) A−B",
        "units": "m"
      },
      {
        "label": "(c) −A−B",
        "units": "m"
      },
      {
        "label": "(d) B−A",
        "units": "m"
      }
    ],
    "question": {
      "text": "Använd en skalenlig ritning för att bestämma belopp och riktning för följande, utifrån vektorerna vec(A) och vec(B) i figur E1.22:\n(a) vektorsumman vec(A) + vec(B) och\n(b) vektordifferensen vec(A) − vec(B).\nAnvänd dina svar för att bestämma belopp och riktning för\n(c) −vec(A) − vec(B) och\n(d) vec(B) − vec(A).\n(Se även uppgift 1.29 för en annan metod.)",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-22.svg",
        "caption": "Figur E1.22",
        "alt": "Fyra vektorer från origo. A: 8.00 m nedåt. B: 15.0 m, 30.0° öster om norr. C: 12.0 m, 25.0° söder om väster. D: 10.0 m, 53.0° väster om norr."
      },
      "reference": null
    }
  },
  "1.23": {
    "id": "1.23",
    "title": "Slut rutten genom grottan",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En rutts förskjutning är den raka pilen från dess start till dess slut.",
      "Välj en skala på papperet, till exempel 1 cm = 50 m. Riktningarnas vinklar från öster är 180°, 315° och 60°.",
      "Rita pilen som sluter rutten från den tredje delsträckans slutpunkt tillbaka till starten. Dess komponenter måste vara de negativa värdena av summan av de tre första delsträckorna.",
      "Delsträcka 1 har komponenterna (-180, 0, 0) m.",
      "Delsträcka 2 har komponenterna (148.5, -148.5, 0) m.",
      "Delsträcka 3 har komponenterna (140, 242.5, 0) m.",
      "Addera x-, y- och z-komponenterna var för sig: aktuell förskjutning = (108.5, 93.99, 0) m.",
      "Den önskade slutpositionen är (0, 0, 0) m. Återstående förskjutning = önskad position − aktuell position = (-108.5, -93.99, 0) m.",
      "Resultat: (-108.5, -93.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-108.5)² + (-93.99)² + (0)²] = √(20605.6) ≈ 143.5 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 220.9° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "Rita delsträckorna så att varje pils början ligger vid den föregående pilens spets. Resultatet går direkt från starten till slutpunkten (eller från den aktuella punkten till målet när en återstående delsträcka efterfrågas). Detta kontrollerar tecknen och kvadranten."
    ],
    "answer": "(-108.5, -93.99, 0) m; längd ≈ 143.5 m; θ ≈ 220.9° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "En grottforskare kartlägger en grotta. Hon följer en passage 180 m rakt västerut, sedan 210 m i riktningen 45° öster om söder och därefter 280 m i riktningen 30° öster om norr. Efter en fjärde förskjutning är hon tillbaka där hon började. Använd en skalenlig ritning för att bestämma den fjärde förskjutningens belopp och riktning. (Se även problem 1.57 för en annan metod.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.24": {
    "id": "1.24",
    "title": "Välj rätt kvadrant",
    "steps": [
      "Den lilla referensvinkeln är arctan(1/2) ≈26.565°. Tecknen placerar de fyra pilarna i kvadranterna IV, I, II och III.",
      "(a): börja med A = (2, -1, 0) och B = (0, 0, 0).",
      "(a): (2, -1, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(2)² + (-1)² + (0)²] = √(5) ≈ 2.236 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 333.4° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(b): börja med A = (2, 1, 0) och B = (0, 0, 0).",
      "(b): (2, 1, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(2)² + (1)² + (0)²] = √(5) ≈ 2.236 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 26.57° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(c): börja med A = (-2, 1, 0) och B = (0, 0, 0).",
      "(c): (-2, 1, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-2)² + (1)² + (0)²] = √(5) ≈ 2.236 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 153.4° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(d): börja med A = (-2, -1, 0) och B = (0, 0, 0).",
      "(d): (-2, -1, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-2)² + (-1)² + (0)²] = √(5) ≈ 2.236 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 206.6° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "(a): (2, -1, 0) m; längd ≈ 2.236 m; θ ≈ 333.4°\n(b): (2, 1, 0) m; längd ≈ 2.236 m; θ ≈ 26.57°\n(c): (-2, 1, 0) m; längd ≈ 2.236 m; θ ≈ 153.4°\n(d): (-2, -1, 0) m; längd ≈ 2.236 m; θ ≈ 206.6°",
    "interactive": [
      {
        "label": "(a)",
        "units": "m"
      },
      {
        "label": "(b)",
        "units": "m"
      },
      {
        "label": "(c)",
        "units": "m"
      },
      {
        "label": "(d)",
        "units": "m"
      }
    ],
    "question": {
      "text": "Låt θ vara vinkeln som vektorn vec(A) bildar med +x-axeln, mätt moturs från denna axel. Bestäm vinkeln θ för en vektor som har följande komponenter:\n(a) Aₓ = 2.00 m, Aᵧ = −1.00 m;\n(b) Aₓ = 2.00 m, Aᵧ = 1.00 m;\n(c) Aₓ = −2.00 m, Aᵧ = 1.00 m;\n(d) Aₓ = −2.00 m, Aᵧ = −1.00 m.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.25": {
    "id": "1.25",
    "title": "Läs av alla fyra pilar som komponenter",
    "steps": [
      "Vinklar moturs från +x: A = 270°, B = 60°, C = 205°, D = 143°.",
      "Använd x = längd × cos(vinkel) och y = längd × sin(vinkel). Dessa är pilens horisontella och vertikala projektioner, med tecken.",
      "A: börja med A = (0, -8, 0) och B = (0, 0, 0).",
      "A: (0, -8, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (-8)² + (0)²] = √(64) ≈ 8 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 270° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "B: börja med A = (7.5, 12.99, 0) och B = (0, 0, 0).",
      "B: (7.5, 12.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7.5)² + (12.99)² + (0)²] = √(225) ≈ 15 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 60° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "C: börja med A = (-10.88, -5.071, 0) och B = (0, 0, 0).",
      "C: (-10.88, -5.071, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-10.88)² + (-5.071)² + (0)²] = √(144) ≈ 12 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 205° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "D: börja med A = (-7.986, 6.018, 0) och B = (0, 0, 0).",
      "D: (-7.986, 6.018, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-7.986)² + (6.018)² + (0)²] = √(100) ≈ 10 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 143° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "A: (0, -8, 0) m; längd ≈ 8 m; θ ≈ 270°\nB: (7.5, 12.99, 0) m; längd ≈ 15 m; θ ≈ 60°\nC: (-10.88, -5.071, 0) m; längd ≈ 12 m; θ ≈ 205°\nD: (-7.986, 6.018, 0) m; längd ≈ 10 m; θ ≈ 143°",
    "interactive": [
      {
        "label": "A",
        "units": "m"
      },
      {
        "label": "B",
        "units": "m"
      },
      {
        "label": "C",
        "units": "m"
      },
      {
        "label": "D",
        "units": "m"
      }
    ],
    "question": {
      "text": "Beräkna x- och y-komponenterna för vektorerna vec(A), vec(B), vec(C) och vec(D) i figur E1.22.",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-22.svg",
        "caption": "Figur E1.22",
        "alt": "Fyra vektorer från origo. A: 8.00 m nedåt. B: 15.0 m, 30.0° öster om norr. C: 12.0 m, 25.0° söder om väster. D: 10.0 m, 53.0° väster om norr."
      },
      "reference": null
    }
  },
  "1.26": {
    "id": "1.26",
    "title": "En vektor som pekar mot sydväst",
    "steps": [
      "Vinkeln från +x är 270°−40° = 230°, i kvadranten åt sydväst. Båda komponenterna är negativa.",
      "|Ax| = |A| sin40°, så |A| = 20/sin40°. Därefter blir Ay = −|A| cos40°.",
      "A: börja med A = (-20, -23.84, 0) och B = (0, 0, 0).",
      "A: (-20, -23.84, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-20)² + (-23.84)² + (0)²] = √(968.111) ≈ 31.11 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 230° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "A: (-20, -23.84, 0) m; längd ≈ 31.11 m; θ ≈ 230°",
    "interactive": [
      {
        "label": "A",
        "units": "m"
      }
    ],
    "question": {
      "text": "Vektorn vec(A) har riktningen 40.0° medurs från −y-axeln. Vektorns x-komponent är Aₓ = −20.0 m.\n(a) Vilken är vec(A):s y-komponent?\n(b) Vilket belopp har vec(A)?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.27": {
    "id": "1.27",
    "title": "En vinkel mätt från norr",
    "steps": [
      "32° moturs från norr pekar mot nordväst. Standardvinkeln = 90°+32° = 122°.",
      "Ay = |A| cos32°. Dividera med cos32° för att få |A|; Ax = −|A| sin32°.",
      "A: börja med A = (-8.123, 13, 0) och B = (0, 0, 0).",
      "A: (-8.123, 13, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-8.123)² + (13)² + (0)²] = √(234.988) ≈ 15.33 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 122° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "A: (-8.123, 13, 0) m; längd ≈ 15.33 m; θ ≈ 122°",
    "interactive": [
      {
        "label": "A",
        "units": "m"
      }
    ],
    "question": {
      "text": "Vektorn vec(A) har y-komponenten Aᵧ = +13.0 m. vec(A) bildar vinkeln 32.0° moturs från +y-axeln.\n(a) Vilken är vec(A):s x-komponent?\n(b) Vilket belopp har vec(A)?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.28": {
    "id": "1.28",
    "title": "Utdelningsrutten med komponentmetoden",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En rutts förskjutning är den raka pilen från dess start till dess slut.",
      "De två första delsträckorna är (0,2.6) och (4.0,0) km.",
      "För den diagonala delsträckan gäller x = 3.1 cos45° och y = 3.1 sin45°. Båda tecknen är positiva.",
      "Delsträcka 1 har komponenterna (0, 2.6, 0) km.",
      "Delsträcka 2 har komponenterna (4, 0, 0) km.",
      "Delsträcka 3 har komponenterna (2.192, 2.192, 0) km.",
      "Addera x-, y- och z-komponenterna var för sig: aktuell förskjutning = (6.192, 4.792, 0) km.",
      "Resultat: (6.192, 4.792, 0) km. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(6.192)² + (4.792)² + (0)²] = √(61.3048) ≈ 7.83 km.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 37.74° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "Rita delsträckorna så att varje pils början ligger vid den föregående pilens spets. Resultatet går direkt från starten till slutpunkten (eller från den aktuella punkten till målet när en återstående delsträcka efterfrågas). Detta kontrollerar tecknen och kvadranten."
    ],
    "answer": "(6.192, 4.792, 0) km; längd ≈ 7.83 km; θ ≈ 37.74° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "En postanställd kör en distributionsbil längs rutten som visas i figur E1.21. Använd komponentmetoden för att bestämma hennes resulterande förskjutnings belopp och riktning. Visa i ett diagram över vektoradditionen (ungefär skalenligt) att den resulterande förskjutningen i ditt diagram kvalitativt stämmer överens med resultatet från komponentmetoden.",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-21.svg",
        "caption": "Figur E1.21",
        "alt": "Distributionsbilens rutt: start, 2.6 km norrut, 4.0 km österut och sedan 3.1 km i riktningen 45° norr om öster till slutpunkten."
      },
      "reference": null
    }
  },
  "1.29": {
    "id": "1.29",
    "title": "Ordning vid addition och subtraktion",
    "steps": [
      "A = (0,−8,0) m och B = (15 cos60°,15 sin60°,0) m.",
      "(a) A+B: börja med A = (0, -8, 0) och B = (7.5, 12.99, 0).",
      "Arbeta med en riktning i taget: (0 + (7.5), -8 + (12.99), 0 + (0)). När pilar adderas läggs värdena i var och en av de tre komponentriktningarna ihop.",
      "(a) A+B: (7.5, 4.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7.5)² + (4.99)² + (0)²] = √(81.1539) ≈ 9.009 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 33.64° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(b) B+A: börja med A = (7.5, 12.99, 0) och B = (0, -8, 0).",
      "Arbeta med en riktning i taget: (7.5 + (0), 12.99 + (-8), 0 + (0)). När pilar adderas läggs värdena i var och en av de tre komponentriktningarna ihop.",
      "(b) B+A: (7.5, 4.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7.5)² + (4.99)² + (0)²] = √(81.1539) ≈ 9.009 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 33.64° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(c) A−B: börja med A = (0, -8, 0) och B = (7.5, 12.99, 0).",
      "Arbeta med en riktning i taget: (0 − (7.5), -8 − (12.99), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "(c) A−B: (-7.5, -20.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-7.5)² + (-20.99)² + (0)²] = √(496.846) ≈ 22.29 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 250.3° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(d) B−A: börja med A = (7.5, 12.99, 0) och B = (0, -8, 0).",
      "Arbeta med en riktning i taget: (7.5 − (0), 12.99 − (-8), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "(d) B−A: (7.5, 20.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7.5)² + (20.99)² + (0)²] = √(496.846) ≈ 22.29 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 70.34° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "A+B och B+A är lika. A−B och B−A är varandras motsatta vektorer, med lika längder och riktningar som skiljer sig med 180°."
    ],
    "answer": "(a) A+B: (7.5, 4.99, 0) m; längd ≈ 9.009 m; θ ≈ 33.64°\n(b) B+A: (7.5, 4.99, 0) m; längd ≈ 9.009 m; θ ≈ 33.64°\n(c) A−B: (-7.5, -20.99, 0) m; längd ≈ 22.29 m; θ ≈ 250.3°\n(d) B−A: (7.5, 20.99, 0) m; längd ≈ 22.29 m; θ ≈ 70.34°",
    "interactive": [
      {
        "label": "(a) A+B",
        "units": "m"
      },
      {
        "label": "(b) B+A",
        "units": "m"
      },
      {
        "label": "(c) A−B",
        "units": "m"
      },
      {
        "label": "(d) B−A",
        "units": "m"
      }
    ],
    "question": {
      "text": "Använd komponentmetoden för att bestämma belopp och riktning för följande, utifrån vektorerna vec(A) och vec(B) i figur E1.22:\n(a) vektorsumman vec(A) + vec(B);\n(b) vektorsumman vec(B) + vec(A);\n(c) vektordifferensen vec(A) − vec(B);\n(d) vektordifferensen vec(B) − vec(A).",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-22.svg",
        "caption": "Figur E1.22",
        "alt": "Fyra vektorer från origo. A: 8.00 m nedåt. B: 15.0 m, 30.0° öster om norr. C: 12.0 m, 25.0° söder om väster. D: 10.0 m, 53.0° väster om norr."
      },
      "reference": null
    }
  },
  "1.30": {
    "id": "1.30",
    "title": "Längd och riktning från komponenter",
    "steps": [
      "Använd √(x²+y²) för längden. Behåll enheten i varje deluppgift; enheterna skiljer sig åt. Tecknen bestämmer kvadranten innan du använder invers tangens.",
      "(a): börja med A = (-8.6, 5.2, 0) och B = (0, 0, 0).",
      "(a): (-8.6, 5.2, 0) cm. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-8.6)² + (5.2)² + (0)²] = √(101) ≈ 10.05 cm.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 148.8° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(b): börja med A = (-9.7, -2.45, 0) och B = (0, 0, 0).",
      "(b): (-9.7, -2.45, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-9.7)² + (-2.45)² + (0)²] = √(100.092) ≈ 10 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 194.2° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(c): börja med A = (7.75, -2.7, 0) och B = (0, 0, 0).",
      "(c): (7.75, -2.7, 0) km. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7.75)² + (-2.7)² + (0)²] = √(67.3525) ≈ 8.207 km.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 340.8° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "(a): (-8.6, 5.2, 0) cm; längd ≈ 10.05 cm; θ ≈ 148.8°\n(b): (-9.7, -2.45, 0) m; längd ≈ 10 m; θ ≈ 194.2°\n(c): (7.75, -2.7, 0) km; längd ≈ 8.207 km; θ ≈ 340.8°",
    "interactive": [
      {
        "label": "(a)",
        "units": "cm"
      },
      {
        "label": "(b)",
        "units": "m"
      },
      {
        "label": "(c)",
        "units": "km"
      }
    ],
    "question": {
      "text": "Bestäm belopp och riktning för den vektor som beskrivs av vart och ett av följande komponentpar:\n(a) Aₓ = −8.60 cm, Aᵧ = 5.20 cm;\n(b) Aₓ = −9.70 m, Aᵧ = −2.45 m;\n(c) Aₓ = 7.75 km, Aᵧ = −2.70 km.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.31": {
    "id": "1.31",
    "title": "Norrut, västerut och sedan söderut",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En rutts förskjutning är den raka pilen från dess start till dess slut.",
      "Norr och söder tar delvis ut varandra: 3.25−1.50 = 1.75 km norrut återstår.",
      "Delsträcka 1 har komponenterna (0, 3.25, 0) km.",
      "Delsträcka 2 har komponenterna (-2.2, 0, 0) km.",
      "Delsträcka 3 har komponenterna (0, -1.5, 0) km.",
      "Addera x-, y- och z-komponenterna var för sig: aktuell förskjutning = (-2.2, 1.75, 0) km.",
      "Resultat: (-2.2, 1.75, 0) km. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-2.2)² + (1.75)² + (0)²] = √(7.9025) ≈ 2.811 km.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 141.5° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "Rita delsträckorna så att varje pils början ligger vid den föregående pilens spets. Resultatet går direkt från starten till slutpunkten (eller från den aktuella punkten till målet när en återstående delsträcka efterfrågas). Detta kontrollerar tecknen och kvadranten."
    ],
    "answer": "(-2.2, 1.75, 0) km; längd ≈ 2.811 km; θ ≈ 141.5° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "En fysikprofessor som har tappat orienteringen kör 3.25 km norrut, sedan 2.20 km västerut och därefter 1.50 km söderut. Bestäm den resulterande förskjutningens belopp och riktning med komponentmetoden. Visa i ett diagram över vektoradditionen (ungefär skalenligt) att den resulterande förskjutningen i ditt diagram kvalitativt stämmer överens med resultatet från komponentmetoden.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.32": {
    "id": "1.32",
    "title": "Bestäm den saknade pilen",
    "steps": [
      "A = (8 cos127°,8 sin127°,0). Den önskade summan R är (0,−12,0).",
      "Utgå från A+B=R och subtrahera A från båda sidor för att få B=R−A. I beräkningen nedan är de två ingående pilarna R och A.",
      "B: börja med A = (0, -12, 0) och B = (-4.815, 6.389, 0).",
      "Arbeta med en riktning i taget: (0 − (-4.815), -12 − (6.389), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "B: (4.815, -18.39, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(4.815)² + (-18.39)² + (0)²] = √(361.338) ≈ 19.01 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 284.7° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "B: (4.815, -18.39, 0) m; längd ≈ 19.01 m; θ ≈ 284.7°",
    "interactive": [
      {
        "label": "B",
        "units": "m"
      }
    ],
    "question": {
      "text": "Vektorn vec(A) har beloppet 8.00 m och ligger i xy-planet med vinkeln 127° moturs från +x-axeln (37° förbi +y-axeln). Vilket belopp och vilken riktning har vektorn vec(B) om summan vec(A) + vec(B) är riktad i −y-riktningen och har beloppet 12.0 m?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.33": {
    "id": "1.33",
    "title": "Två pilar på var sin sida om x-axeln",
    "steps": [
      "Omvandla varje pil med x=Lcosθ och y=Lsinθ. B:s y-komponent är negativ eftersom den pekar nedanför x-axeln.",
      "(a) A+B: börja med A = (1.4, 2.425, 0) och B = (0.95, -1.645, 0).",
      "Arbeta med en riktning i taget: (1.4 + (0.95), 2.425 + (-1.645), 0 + (0)). När pilar adderas läggs värdena i var och en av de tre komponentriktningarna ihop.",
      "(a) A+B: (2.35, 0.7794, 0) cm. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(2.35)² + (0.7794)² + (0)²] = √(6.13) ≈ 2.476 cm.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 18.35° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(b) A−B: börja med A = (1.4, 2.425, 0) och B = (0.95, -1.645, 0).",
      "Arbeta med en riktning i taget: (1.4 − (0.95), 2.425 − (-1.645), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "(b) A−B: (0.45, 4.07, 0) cm. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0.45)² + (4.07)² + (0)²] = √(16.77) ≈ 4.095 cm.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 83.69° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(c) B−A: börja med A = (0.95, -1.645, 0) och B = (1.4, 2.425, 0).",
      "Arbeta med en riktning i taget: (0.95 − (1.4), -1.645 − (2.425), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "(c) B−A: (-0.45, -4.07, 0) cm. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-0.45)² + (-4.07)² + (0)²] = √(16.77) ≈ 4.095 cm.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 263.7° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "(a) A+B: (2.35, 0.7794, 0) cm; längd ≈ 2.476 cm; θ ≈ 18.35°\n(b) A−B: (0.45, 4.07, 0) cm; längd ≈ 4.095 cm; θ ≈ 83.69°\n(c) B−A: (-0.45, -4.07, 0) cm; längd ≈ 4.095 cm; θ ≈ 263.7°",
    "interactive": [
      {
        "label": "(a) A+B",
        "units": "cm"
      },
      {
        "label": "(b) A−B",
        "units": "cm"
      },
      {
        "label": "(c) B−A",
        "units": "cm"
      }
    ],
    "question": {
      "text": "Vektorn vec(A) är 2.80 cm lång och ligger 60.0° ovanför x-axeln i första kvadranten. Vektorn vec(B) är 1.90 cm lång och ligger 60.0° nedanför x-axeln i fjärde kvadranten (figur E1.33). Använd komponenter för att bestämma belopp och riktning för\n(a) vec(A) + vec(B);\n(b) vec(A) − vec(B);\n(c) vec(B) − vec(A).\nSkissa vektoradditionen eller vektorsubtraktionen i varje fall och visa att dina numeriska svar kvalitativt stämmer överens med skissen.",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-33.svg",
        "caption": "Figur E1.33",
        "alt": "A: 2.80 cm, 60.0° ovanför +x. B: 1.90 cm, 60.0° nedanför +x."
      },
      "reference": null
    }
  },
  "1.34": {
    "id": "1.34",
    "title": "Översätt î och ĵ till tal",
    "steps": [
      "î betyder ett steg längs +x; ĵ betyder ett steg längs +y. Deras koefficienter är komponenterna, även om termerna står i en annan ordning.",
      "(d) B = (8,−4,0), så 5B = (5×8,5×(−4),0).",
      "(a): börja med A = (3.2, -6.5, 0) och B = (0, 0, 0).",
      "(a): (3.2, -6.5, 0) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(3.2)² + (-6.5)² + (0)²] = √(52.49) ≈ 7.245 enheter.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 296.2° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(b): börja med A = (-7.91, 18.2, 0) och B = (0, 0, 0).",
      "(b): (-7.91, 18.2, 0) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-7.91)² + (18.2)² + (0)²] = √(393.808) ≈ 19.84 enheter.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 113.5° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(c): börja med A = (-12, 21.2, 0) och B = (0, 0, 0).",
      "(c): (-12, 21.2, 0) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-12)² + (21.2)² + (0)²] = √(593.44) ≈ 24.36 enheter.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 119.5° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(d): börja med A = (40, -20, 0) och B = (0, 0, 0).",
      "(d): (40, -20, 0) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(40)² + (-20)² + (0)²] = √(2000) ≈ 44.72 enheter.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 333.4° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "(a): (3.2, -6.5, 0) enheter; längd ≈ 7.245 enheter; θ ≈ 296.2°\n(b): (-7.91, 18.2, 0) enheter; längd ≈ 19.84 enheter; θ ≈ 113.5°\n(c): (-12, 21.2, 0) enheter; längd ≈ 24.36 enheter; θ ≈ 119.5°\n(d): (40, -20, 0) enheter; längd ≈ 44.72 enheter; θ ≈ 333.4°",
    "interactive": [
      {
        "label": "(a)",
        "units": "enheter"
      },
      {
        "label": "(b)",
        "units": "enheter"
      },
      {
        "label": "(c)",
        "units": "enheter"
      },
      {
        "label": "(d)",
        "units": "enheter"
      }
    ],
    "question": {
      "text": "Bestäm vektorn vec(A):s x- och y-komponenter i varje fall:\n(a) vec(A) = 3.20î − 6.50ĵ;\n(b) vec(A) = 18.2ĵ − 7.91î;\n(c) vec(A) = −12.0î + 21.2ĵ;\n(d) vec(A) = 5.0vec(B), där vec(B) = 8î − 4ĵ.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.35": {
    "id": "1.35",
    "title": "Skriv figurens vektorer med enhetsvektorer",
    "steps": [
      "Använd samma komponenter som i 1.25. Till exempel A = 0î−8ĵ m. Taltrippeln (x,y,z) betyder xî+yĵ+zk̂.",
      "För B används 60°, för C används 205° och för D används 143°, alla mätta moturs från +x.",
      "A: börja med A = (0, -8, 0) och B = (0, 0, 0).",
      "A: (0, -8, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (-8)² + (0)²] = √(64) ≈ 8 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 270° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "B: börja med A = (7.5, 12.99, 0) och B = (0, 0, 0).",
      "B: (7.5, 12.99, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7.5)² + (12.99)² + (0)²] = √(225) ≈ 15 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 60° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "C: börja med A = (-10.88, -5.071, 0) och B = (0, 0, 0).",
      "C: (-10.88, -5.071, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-10.88)² + (-5.071)² + (0)²] = √(144) ≈ 12 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 205° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "D: börja med A = (-7.986, 6.018, 0) och B = (0, 0, 0).",
      "D: (-7.986, 6.018, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-7.986)² + (6.018)² + (0)²] = √(100) ≈ 10 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 143° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "A: (0, -8, 0) m; längd ≈ 8 m; θ ≈ 270°\nB: (7.5, 12.99, 0) m; längd ≈ 15 m; θ ≈ 60°\nC: (-10.88, -5.071, 0) m; längd ≈ 12 m; θ ≈ 205°\nD: (-7.986, 6.018, 0) m; längd ≈ 10 m; θ ≈ 143°",
    "interactive": [
      {
        "label": "A",
        "units": "m"
      },
      {
        "label": "B",
        "units": "m"
      },
      {
        "label": "C",
        "units": "m"
      },
      {
        "label": "D",
        "units": "m"
      }
    ],
    "question": {
      "text": "Skriv varje vektor i figur E1.22 med hjälp av enhetsvektorerna î och ĵ.",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-22.svg",
        "caption": "Figur E1.22",
        "alt": "Fyra vektorer från origo. A: 8.00 m nedåt. B: 15.0 m, 30.0° öster om norr. C: 12.0 m, 25.0° söder om väster. D: 10.0 m, 53.0° väster om norr."
      },
      "reference": null
    }
  },
  "1.36": {
    "id": "1.36",
    "title": "Subtrahera vektorer skrivna med enhetsvektorer",
    "steps": [
      "(a) |A| = √(4²+7²) = √65 ≈ 8.062; |B| = √(5²+(−2)²) = √29 ≈ 5.385.",
      "(b) Subtrahera motsvarande komponenter från varandra. Att subtrahera −2 innebär att addera 2.",
      "A−B: börja med A = (4, 7, 0) och B = (5, -2, 0).",
      "Arbeta med en riktning i taget: (4 − (5), 7 − (-2), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "A−B: (-1, 9, 0) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-1)² + (9)² + (0)²] = √(82) ≈ 9.055 enheter.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 96.34° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(d) A−B pekar nästan rakt uppåt, men lite åt vänster; din skiss bör visa detta."
    ],
    "answer": "(a) |A| ≈ 8.062, |B| ≈ 5.385.\n(b–c) A−B: (-1, 9, 0) enheter; längd ≈ 9.055 enheter; θ ≈ 96.34°",
    "interactive": [
      {
        "label": "A−B",
        "units": "enheter"
      }
    ],
    "question": {
      "text": "Två vektorer är givna: vec(A) = 4.00î + 7.00ĵ och vec(B) = 5.00î − 2.00ĵ.\n(a) Bestäm varje vektors belopp.\n(b) Använd enhetsvektorer för att skriva ett uttryck för vektordifferensen vec(A) − vec(B).\n(c) Bestäm belopp och riktning för vektordifferensen vec(A) − vec(B).\n(d) Visa vec(A), vec(B) och vec(A) − vec(B) i ett vektordiagram och visa att diagrammet kvalitativt stämmer överens med ditt svar på del (c).",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.37": {
    "id": "1.37",
    "title": "Skala vektorerna före additionen",
    "steps": [
      "(a) A = (3.6 cos70°,3.6 sin70°,0) = (1.231, 3.383, 0) m. B = (2.4 cos210°,2.4 sin210°,0) = (-2.078, -1.2, 0) m.",
      "(b) Multiplicera varje komponent i A med 3 och varje komponent i B med 4. Subtrahera sedan 4B från 3A. Vektorerna som används nedan är de skalade pilarna.",
      "C: börja med A = (3.694, 10.15, 0) och B = (-8.314, -4.8, 0).",
      "Arbeta med en riktning i taget: (3.694 − (-8.314), 10.15 − (-4.8), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "C: (12.01, 14.95, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(12.01)² + (14.95)² + (0)²] = √(367.647) ≈ 19.17 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 51.23° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "C: (12.01, 14.95, 0) m; längd ≈ 19.17 m; θ ≈ 51.23°",
    "interactive": [
      {
        "label": "C",
        "units": "m"
      }
    ],
    "question": {
      "text": "(a) Skriv varje vektor i figur E1.37 med hjälp av enhetsvektorerna î och ĵ.\n(b) Använd enhetsvektorer för att uttrycka vektorn vec(C), där vec(C) = 3.00vec(A) − 4.00vec(B).\n(c) Bestäm vec(C):s belopp och riktning.",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-37.svg",
        "caption": "Figur E1.37",
        "alt": "A: 3.60 m, 70.0° moturs från +x. B: 2.4 m, 30.0° nedanför −x."
      },
      "reference": null
    }
  },
  "1.38": {
    "id": "1.38",
    "title": "Riktningarna för två pilar och deras summa",
    "steps": [
      "A ligger i kvadrant II, B i kvadrant I och deras summa ligger också i kvadrant I.",
      "(a) A: börja med A = (-3, 6, 0) och B = (0, 0, 0).",
      "(a) A: (-3, 6, 0) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-3)² + (6)² + (0)²] = √(45) ≈ 6.708 enheter.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 116.6° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(b) B: börja med A = (7, 2, 0) och B = (0, 0, 0).",
      "(b) B: (7, 2, 0) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(7)² + (2)² + (0)²] = √(53) ≈ 7.28 enheter.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 15.95° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "(c) C: börja med A = (-3, 6, 0) och B = (7, 2, 0).",
      "Arbeta med en riktning i taget: (-3 + (7), 6 + (2), 0 + (0)). När pilar adderas läggs värdena i var och en av de tre komponentriktningarna ihop.",
      "(c) C: (4, 8, 0) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(4)² + (8)² + (0)²] = √(80) ≈ 8.944 enheter.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 63.43° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "(a) A: (-3, 6, 0) enheter; längd ≈ 6.708 enheter; θ ≈ 116.6°\n(b) B: (7, 2, 0) enheter; längd ≈ 7.28 enheter; θ ≈ 15.95°\n(c) C: (4, 8, 0) enheter; längd ≈ 8.944 enheter; θ ≈ 63.43°",
    "interactive": [
      {
        "label": "(a) A",
        "units": "enheter"
      },
      {
        "label": "(b) B",
        "units": "enheter"
      },
      {
        "label": "(c) C",
        "units": "enheter"
      }
    ],
    "question": {
      "text": "Du får två vektorer: vec(A) = −3.00î + 6.00ĵ och vec(B) = 7.00î + 2.00ĵ. Låt vinklar mätta moturs vara positiva.\n(a) Vilken vinkel bildar vec(A) med +x-axeln?\n(b) Vilken vinkel bildar vec(B) med +x-axeln?\n(c) Vektorn vec(C) är summan av vec(A) och vec(B), alltså vec(C) = vec(A) + vec(B). Vilken vinkel bildar vec(C) med +x-axeln?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.39": {
    "id": "1.39",
    "title": "Subtraktion i tre dimensioner",
    "steps": [
      "(a) |A| = √29 ≈ 5.385; |B| = √19 ≈ 4.359.",
      "(b) Arbeta oberoende i x-, y- och z-led. För z gäller 4−(−3)=7.",
      "A−B: börja med A = (-2, 3, 4) och B = (3, 1, -3).",
      "Arbeta med en riktning i taget: (-2 − (3), 3 − (1), 4 − (-3)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "A−B: (-5, 2, 7) enheter. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-5)² + (2)² + (7)²] = √(78) ≈ 8.832 enheter.",
      "I 3D anger du riktningen med enhetsvektorn (-0.5661, 0.2265, 0.7926). Dessa tre komponenter anger riktningen utan längden.",
      "Om du vänder på subtraktionens ordning byter varje komponent tecken, men längden förblir oförändrad, så |B−A| = |A−B|."
    ],
    "answer": "(a) |A| ≈ 5.385, |B| ≈ 4.359.\n(b–c) A−B: (-5, 2, 7) enheter; längd ≈ 8.832 enheter\n|B−A| har samma värde.",
    "interactive": [
      {
        "label": "A−B",
        "units": "enheter"
      }
    ],
    "question": {
      "text": "Två vektorer är givna: vec(A) = −2.00î + 3.00ĵ + 4.00k̂ och vec(B) = 3.00î + 1.00ĵ − 3.00k̂.\n(a) Bestäm varje vektors belopp.\n(b) Använd enhetsvektorer för att skriva ett uttryck för vektordifferensen vec(A) − vec(B).\n(c) Bestäm beloppet av vektordifferensen vec(A) − vec(B). Är detta lika stort som beloppet av vec(B) − vec(A)? Förklara.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.40": {
    "id": "1.40",
    "title": "Skalärprodukt och vinkel",
    "steps": [
      "A och B: A = (4, 7, 0); B = (5, -2, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (4)×(5) + (7)×(-2) + (0)×(0) = 6 enheter².",
      "Längderna är 8.062 och 5.385. Använd A·B = |A||B| cos θ och dividera med längdernas produkt: cos θ = 6/(8.062×5.385) = 0.1382.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 82.06°. En negativ skalärprodukt betyder att vinkeln är större än 90°."
    ],
    "answer": "A och B: A·B ≈ 6 enheter²; vinkel ≈ 82.06°",
    "interactive": [
      {
        "label": "A och B",
        "units": "enheter²"
      }
    ],
    "question": {
      "text": "(a) Bestäm skalärprodukten av vektorerna vec(A) och vec(B) som ges i uppgift 1.36.\n(b) Bestäm vinkeln mellan dessa två vektorer.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Vektorer från uppgift 1.36: vec(A) = 4.00î + 7.00ĵ; vec(B) = 5.00î − 2.00ĵ."
    }
  },
  "1.41": {
    "id": "1.41",
    "title": "Skalärprodukter från diagrammet",
    "steps": [
      "(a) A·B: A = (0, -8, 0); B = (7.5, 12.99, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (0)×(7.5) + (-8)×(12.99) + (0)×(0) = -103.9 m².",
      "Längderna är 8 och 15. Använd A·B = |A||B| cos θ och dividera med längdernas produkt: cos θ = -103.9/(8×15) = -0.866.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 150°. En negativ skalärprodukt betyder att vinkeln är större än 90°.",
      "(b) B·C: A = (7.5, 12.99, 0); B = (-10.88, -5.071, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (7.5)×(-10.88) + (12.99)×(-5.071) + (0)×(0) = -147.4 m².",
      "Längderna är 15 och 12. Använd A·B = |A||B| cos θ och dividera med längdernas produkt: cos θ = -147.4/(15×12) = -0.8192.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 145°. En negativ skalärprodukt betyder att vinkeln är större än 90°.",
      "(c) A·C: A = (0, -8, 0); B = (-10.88, -5.071, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (0)×(-10.88) + (-8)×(-5.071) + (0)×(0) = 40.57 m².",
      "Längderna är 8 och 12. Använd A·B = |A||B| cos θ och dividera med längdernas produkt: cos θ = 40.57/(8×12) = 0.4226.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 65°. En negativ skalärprodukt betyder att vinkeln är större än 90°."
    ],
    "answer": "(a) A·B: A·B ≈ -103.9 m²; vinkel ≈ 150°\n(b) B·C: A·B ≈ -147.4 m²; vinkel ≈ 145°\n(c) A·C: A·B ≈ 40.57 m²; vinkel ≈ 65°",
    "interactive": [
      {
        "label": "(a) A·B",
        "units": "m²"
      },
      {
        "label": "(b) B·C",
        "units": "m²"
      },
      {
        "label": "(c) A·C",
        "units": "m²"
      }
    ],
    "question": {
      "text": "Bestäm följande skalärprodukter för vektorerna vec(A), vec(B) och vec(C) i figur E1.22:\n(a) vec(A) · vec(B);\n(b) vec(B) · vec(C);\n(c) vec(A) · vec(C).",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-22.svg",
        "caption": "Figur E1.22",
        "alt": "Fyra vektorer från origo. A: 8.00 m nedåt. B: 15.0 m, 30.0° öster om norr. C: 12.0 m, 25.0° söder om väster. D: 10.0 m, 53.0° väster om norr."
      },
      "reference": null
    }
  },
  "1.42": {
    "id": "1.42",
    "title": "En kryssprodukt pekar ut ur planet",
    "steps": [
      "Eftersom båda ingående vektorerna ligger i xy-planet kan bara kryssproduktens z-komponent vara skild från noll.",
      "A×B: börja med A = (4, 7, 0) och B = (5, -2, 0).",
      "Regeln för kryssprodukten: (AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Här blir det (7×0−0×-2, 0×5−4×0, 4×-2−7×5). Resultatet är vinkelrätt mot båda ingående vektorerna.",
      "A×B: (0, 0, -43) enheter². Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (0)² + (-43)²] = √(1849) ≈ 43 enheter².",
      "I 3D anger du riktningen med enhetsvektorn (0, 0, -1). Dessa tre komponenter anger riktningen utan längden."
    ],
    "answer": "A×B: (0, 0, -43) enheter²; längd ≈ 43 enheter²",
    "interactive": [
      {
        "label": "A×B",
        "units": "enheter²"
      }
    ],
    "question": {
      "text": "Bestäm kryssprodukten vec(A) × vec(B) (uttryckt med enhetsvektorer) av de två vektorer som ges i uppgift 1.36. Vilket belopp har kryssprodukten?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Vektorer från uppgift 1.36: vec(A) = 4.00î + 7.00ĵ; vec(B) = 5.00î − 2.00ĵ."
    }
  },
  "1.43": {
    "id": "1.43",
    "title": "Vinklar mellan vektorer givna med komponenter",
    "steps": [
      "(a): A = (-2, 6, 0); B = (2, 3, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (-2)×(2) + (6)×(3) + (0)×(0) = 14 enheter².",
      "Längderna är 6.325 och 3.606. Använd A·B = |A||B| cos θ och dividera med längdernas produkt: cos θ = 14/(6.325×3.606) = 0.6139.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 52.13°. En negativ skalärprodukt betyder att vinkeln är större än 90°.",
      "(b): A = (3, 5, 0); B = (10, 6, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (3)×(10) + (5)×(6) + (0)×(0) = 60 enheter².",
      "Längderna är 5.831 och 11.66. Använd A·B = |A||B| cos θ och dividera med längdernas produkt: cos θ = 60/(5.831×11.66) = 0.8824.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 28.07°. En negativ skalärprodukt betyder att vinkeln är större än 90°.",
      "(c): A = (-4, 2, 0); B = (7, 14, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (-4)×(7) + (2)×(14) + (0)×(0) = 0 enheter².",
      "Längderna är 4.472 och 15.65. Använd A·B = |A||B| cos θ och dividera med längdernas produkt: cos θ = 0/(4.472×15.65) = 0.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 90°. En negativ skalärprodukt betyder att vinkeln är större än 90°."
    ],
    "answer": "(a): A·B ≈ 14 enheter²; vinkel ≈ 52.13°\n(b): A·B ≈ 60 enheter²; vinkel ≈ 28.07°\n(c): A·B ≈ 0 enheter²; vinkel ≈ 90°",
    "interactive": [
      {
        "label": "(a)",
        "units": "enheter²"
      },
      {
        "label": "(b)",
        "units": "enheter²"
      },
      {
        "label": "(c)",
        "units": "enheter²"
      }
    ],
    "question": {
      "text": "Bestäm vinkeln mellan vektorerna i vart och ett av följande par:\n(a) vec(A) = −2.00î + 6.00ĵ och vec(B) = 2.00î + 3.00ĵ\n(b) vec(A) = 3.00î + 5.00ĵ och vec(B) = 10.00î + 6.00ĵ\n(c) vec(A) = −4.00î + 2.00ĵ och vec(B) = 7.00î + 14.00ĵ",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.44": {
    "id": "1.44",
    "title": "Omvänd ordning ger motsatt normalriktning",
    "steps": [
      "Den mindre vinkeln mellan pilarna är 120°. Längden är AB sin120°. Högerhandsregeln ger riktningen.",
      "(a) A×B: börja med A = (1.4, 2.425, 0) och B = (0.95, -1.645, 0).",
      "Regeln för kryssprodukten: (AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Här blir det (2.425×0−0×-1.645, 0×0.95−1.4×0, 1.4×-1.645−2.425×0.95). Resultatet är vinkelrätt mot båda ingående vektorerna.",
      "(a) A×B: (0, 0, -4.607) cm². Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (0)² + (-4.607)²] = √(21.2268) ≈ 4.607 cm².",
      "I 3D anger du riktningen med enhetsvektorn (0, 0, -1). Dessa tre komponenter anger riktningen utan längden.",
      "(b) B×A: börja med A = (0.95, -1.645, 0) och B = (1.4, 2.425, 0).",
      "Regeln för kryssprodukten: (AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Här blir det (-1.645×0−0×2.425, 0×1.4−0.95×0, 0.95×2.425−-1.645×1.4). Resultatet är vinkelrätt mot båda ingående vektorerna.",
      "(b) B×A: (0, 0, 4.607) cm². Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (0)² + (4.607)²] = √(21.2268) ≈ 4.607 cm².",
      "I 3D anger du riktningen med enhetsvektorn (0, 0, 1). Dessa tre komponenter anger riktningen utan längden."
    ],
    "answer": "(a) A×B: (0, 0, -4.607) cm²; längd ≈ 4.607 cm²\n(b) B×A: (0, 0, 4.607) cm²; längd ≈ 4.607 cm²",
    "interactive": [
      {
        "label": "(a) A×B",
        "units": "cm²"
      },
      {
        "label": "(b) B×A",
        "units": "cm²"
      }
    ],
    "question": {
      "text": "Bestäm belopp och riktning för följande, utifrån de två vektorerna i figur E1.33:\n(a) kryssprodukten vec(A) × vec(B);\n(b) kryssprodukten vec(B) × vec(A).",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-33.svg",
        "caption": "Figur E1.33",
        "alt": "A: 2.80 cm, 60.0° ovanför +x. B: 1.90 cm, 60.0° nedanför +x."
      },
      "reference": null
    }
  },
  "1.45": {
    "id": "1.45",
    "title": "A och D i tre dimensioner",
    "steps": [
      "A pekar söderut. D har vinkeln 143° från +x. Kontrollera z-komponentens tecken, inte bara den positiva längden.",
      "(a) A×D: börja med A = (0, -8, 0) och B = (-7.986, 6.018, 0).",
      "Regeln för kryssprodukten: (AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Här blir det (-8×0−0×6.018, 0×-7.986−0×0, 0×6.018−-8×-7.986). Resultatet är vinkelrätt mot båda ingående vektorerna.",
      "(a) A×D: (0, 0, -63.89) m². Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (0)² + (-63.89)²] = √(4082.04) ≈ 63.89 m².",
      "I 3D anger du riktningen med enhetsvektorn (0, 0, -1). Dessa tre komponenter anger riktningen utan längden.",
      "(b) D×A: börja med A = (-7.986, 6.018, 0) och B = (0, -8, 0).",
      "Regeln för kryssprodukten: (AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Här blir det (6.018×0−0×-8, 0×0−-7.986×0, -7.986×-8−6.018×0). Resultatet är vinkelrätt mot båda ingående vektorerna.",
      "(b) D×A: (0, 0, 63.89) m². Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (0)² + (63.89)²] = √(4082.04) ≈ 63.89 m².",
      "I 3D anger du riktningen med enhetsvektorn (0, 0, 1). Dessa tre komponenter anger riktningen utan längden."
    ],
    "answer": "(a) A×D: (0, 0, -63.89) m²; längd ≈ 63.89 m²\n(b) D×A: (0, 0, 63.89) m²; längd ≈ 63.89 m²",
    "interactive": [
      {
        "label": "(a) A×D",
        "units": "m²"
      },
      {
        "label": "(b) D×A",
        "units": "m²"
      }
    ],
    "question": {
      "text": "Bestäm belopp och riktning för följande, utifrån vektorerna vec(A) och vec(D) i figur E1.22:\n(a) kryssprodukten vec(A) × vec(D);\n(b) kryssprodukten vec(D) × vec(A).",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-22.svg",
        "caption": "Figur E1.22",
        "alt": "Fyra vektorer från origo. A: 8.00 m nedåt. B: 15.0 m, 30.0° öster om norr. C: 12.0 m, 25.0° söder om väster. D: 10.0 m, 53.0° väster om norr."
      },
      "reference": null
    }
  },
  "1.46": {
    "id": "1.46",
    "title": "Skalärprodukt och kryssprodukt av samma par",
    "steps": [
      "(a) Vinkeln mellan dem är 140°. Skalärprodukt = 3.6×2.4×cos140° ≈ -6.619 m².",
      "(b) A×B: börja med A = (1.231, 3.383, 0) och B = (-2.078, -1.2, 0).",
      "Regeln för kryssprodukten: (AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Här blir det (3.383×0−0×-1.2, 0×-2.078−1.231×0, 1.231×-1.2−3.383×-2.078). Resultatet är vinkelrätt mot båda ingående vektorerna.",
      "(b) A×B: (0, 0, 5.554) m². Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (0)² + (5.554)²] = √(30.8434) ≈ 5.554 m².",
      "I 3D anger du riktningen med enhetsvektorn (0, 0, 1). Dessa tre komponenter anger riktningen utan längden."
    ],
    "answer": "(a) A·B ≈ -6.619 m².\n(b) A×B: (0, 0, 5.554) m²; längd ≈ 5.554 m²",
    "interactive": [
      {
        "label": "(b) A×B",
        "units": "m²"
      }
    ],
    "question": {
      "text": "Bestäm följande för vektorerna vec(A) och vec(B) i figur E1.37:\n(a) skalärprodukten vec(A) · vec(B);\n(b) belopp och riktning för kryssprodukten vec(A) × vec(B).",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-e1-37.svg",
        "caption": "Figur E1.37",
        "alt": "A: 3.60 m, 70.0° moturs från +x. B: 2.4 m, 30.0° nedanför −x."
      },
      "reference": null
    }
  },
  "1.47": {
    "id": "1.47",
    "title": "Återskapa en vektor från en kryssprodukt",
    "steps": [
      "Skriv B=(0,By,Bz). Kryssprodukten blir (0,8Bz,−8By).",
      "Jämför med det önskade resultatet komponent för komponent: 8Bz=0 ger Bz=0; −8By=16 ger By=−2.",
      "Minustecknet är avgörande: −x kryss −y ger +z.",
      "B: börja med A = (0, -2, 0) och B = (0, 0, 0).",
      "B: (0, -2, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0)² + (-2)² + (0)²] = √(4) ≈ 2 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 270° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "B: (0, -2, 0) m; längd ≈ 2 m; θ ≈ 270°",
    "interactive": [
      {
        "label": "B",
        "units": "m"
      }
    ],
    "question": {
      "text": "Kryssprodukten av vektorerna vec(A) och vec(B) har beloppet 16.0 m² och är riktad i +z-riktningen. Om vektorn vec(A) har beloppet 8.0 m och är riktad i −x-riktningen, vilket belopp och vilken riktning har då vektorn vec(B) om den saknar x-komponent?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.48": {
    "id": "1.48",
    "title": "Jämför de två produkterna",
    "steps": [
      "För vektorer som inte är noll gäller |A·B|=AB|cosθ| och |A×B|=AB sinθ för 0°≤θ≤180°.",
      "(a) Vid 30° är cos30°≈0.866 och sin30°=0.500, så skalärproduktens belopp är större.",
      "(b) Förkorta bort den gemensamma positiva faktorn AB. Likhet kräver |cosθ|=sinθ, vilket gäller vid 45° och 135°.",
      "Om någon av de ingående vektorerna är noll är båda produkterna noll vid varje vinkel; nollvektorns riktning är odefinierad."
    ],
    "answer": "(a) Skalärproduktens belopp; (b) 45° eller 135° för vektorer som inte är noll",
    "interactive": [],
    "question": {
      "text": "Vinkeln mellan två vektorer är θ.\n(a) Om θ = 30.0°, vilken har störst belopp: vektorernas skalärprodukt eller deras kryssprodukt?\n(b) För vilket värde (eller vilka värden) på θ är skalärproduktens och kryssproduktens belopp lika stora?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.49": {
    "id": "1.49",
    "title": "Densitet på astronomiska skalor",
    "steps": [
      "Densitet = massa/volym. Använd V=(4/3)πr³ och radie = halva diametern.",
      "Använd ungefärliga astronomiska data: jordens massa 5.97×10²⁴ kg, jordens radie 6.37×10⁶ m, solens massa 1.99×10³⁰ kg.",
      "(a) Jorden: V≈1.083×10²¹ m³. Densitet≈5514 kg/m³ = 5.51 g/cm³.",
      "(b) Vit dvärg: r=7.50×10⁶ m, V≈1.767×10²¹ m³. Densitet≈1.126×10⁹ kg/m³ = 1.13×10⁶ g/cm³.",
      "(c) Neutronstjärna: r=1.00×10⁴ m, V≈4.189×10¹² m³. Densitet≈4.75×10¹⁷ kg/m³ = 4.75×10¹⁴ g/cm³.",
      "För att omvandla kg/m³ till g/cm³ dividerar du med 1000. Om samma massa pressas samman till en mindre radie ökar densiteten proportionellt mot 1/r³."
    ],
    "answer": "Ungefär 5.51, 1.13×10⁶ respektive 4.75×10¹⁴ g/cm³",
    "interactive": [],
    "question": {
      "text": "Vita dvärgar och neutronstjärnor. Kom ihåg att densitet är massa dividerad med volym och använd bilaga D vid behov.\n(a) Beräkna jordens medeldensitet i g/cm³ under antagandet att vår planet är ett perfekt klot.\n(b) Om ungefär 5 miljarder år, vid slutet av sin livstid, kommer solen att bli en vit dvärg med ungefär samma massa som den har nu, men med en diameter som har minskat till ungefär 15,000 km. Vilken densitet kommer den då att ha?\n(c) En neutronstjärna är vad som återstår efter vissa supernovor (explosioner av jättestjärnor). Neutronstjärnor har vanligtvis en diameter på ungefär 20 km och ungefär samma massa som solen. Vilken är en typisk densitet för en neutronstjärna, uttryckt i g/cm³?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Ungefärliga referensdata som används här: jordens massa 5.97 × 10²⁴ kg; jordens radie 6.37 × 10⁶ m; solens massa 1.99 × 10³⁰ kg. Klotets volym: V = (4/3)πr³."
    }
  },
  "1.50": {
    "id": "1.50",
    "title": "Vätemaserklockans tick",
    "steps": [
      "(a) Frekvens anger antalet svängningar per sekund; tiden per svängning är dess invers: T=1/f≈7.04×10⁻¹⁰ s.",
      "(b) En timme innehåller 3600 s. Antal svängningar=f×3600≈5.11×10¹².",
      "(c) Använd 365.24 dagar/år: 4.6×10⁹ år≈1.45161×10¹⁷ s. Multiplicera med f för att få ≈2.06×10²⁶ svängningar.",
      "(d) Antalet intervall på 100000 år är 4.6×10⁹/100000=46000. Med en avvikelse på 1 s per intervall blir den sammanlagda avvikelsens belopp 4.60×10⁴ s.",
      "Tre värdesiffror visas enligt uppgiftens instruktion; själva åldern är endast en uppskattning."
    ],
    "answer": "(a) 7.04×10⁻¹⁰ s; (b) 5.11×10¹² svängningar; (c) 2.06×10²⁶ svängningar; (d) 4.60×10⁴ s",
    "interactive": [],
    "question": {
      "text": "Vätemasern. En maser är en laserliknande anordning som alstrar elektromagnetiska vågor inom det elektromagnetiska spektrumets mikrovågs- och radiovågsområden. Radiovågorna från en vätemaser kan användas som frekvensnormal. Dessa vågor har frekvensen 1,420,405,751.786 hertz. (En hertz är ett annat namn för en svängning per sekund.) En klocka som styrs av en vätemaser går fel med endast 1 s på 100,000 år. Använd endast tre värdesiffror i följande frågor. (Det stora antalet värdesiffror i den angivna frekvensen visar bara den anmärkningsvärda noggrannhet med vilken frekvensen har uppmätts.)\n(a) Hur lång tid tar en svängning hos radiovågen?\n(b) Hur många svängningar inträffar under 1 h?\n(c) Hur många svängningar skulle ha inträffat under jordens ålder, som uppskattas till 4.6 × 10⁹ år?\n(d) Hur många sekunder skulle en vätemaserklocka gå fel efter ett tidsintervall lika långt som jordens ålder?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.51": {
    "id": "1.51",
    "title": "Radien hos en planet med låg densitet",
    "steps": [
      "Använd jordens massa≈5.97×10²⁴ kg. Planetens massa=5.5×5.97×10²⁴≈3.2835×10²⁵ kg.",
      "Omvandla densiteten: 1.76 g/cm³=1760 kg/m³.",
      "Volym=massa/densitet≈1.8656×10²² m³.",
      "Radie=∛(3V/4π)≈1.645×10⁷ m=16450 km.",
      "Dividera med jordens radie≈6370 km: 16450/6370≈2.58. Eftersom massan är ungefärligt angiven blir svaret ungefär 1.6×10⁴ km och 2.6 jordradier."
    ],
    "answer": "Radie ungefär 1.6×10⁴ km, eller 2.6 jordradier",
    "interactive": [],
    "question": {
      "text": "En jordliknande planet. I januari 2006 rapporterade astronomer upptäckten av en planet som är jämförbar med jorden i storlek, kretsar kring en annan stjärna och har ungefär 5.5 gånger jordens massa. Man tror att den består av en blandning av sten och is, likt Neptunus. Om planeten har samma densitet som Neptunus (1.76 g/cm³), vilken är dess radie uttryckt\n(a) i kilometer och\n(b) som en multipel av jordens radie?\nAnvänd de astronomiska uppgifterna längst bak i boken.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Ungefärliga referensdata som används här: jordens massa 5.97 × 10²⁴ kg; jordens radie 6.37 × 10⁶ m. Klotets volym: V = (4/3)πr³."
    }
  },
  "1.52": {
    "id": "1.52",
    "title": "En area med osäkerhet",
    "steps": [
      "Bästa uppskattningen av arean: A=LW=7.60×1.50=11.40 cm².",
      "Kontrollera de yttersta tillåtna värdena: Amax=7.61×1.51=11.4911; Amin=7.59×1.49=11.3091 cm².",
      "De möjliga avvikelserna är ungefär ±0.091 cm², så ange A≈11.40±0.09 cm².",
      "För små osäkerheter i värsta fall gäller ΔA≈WΔL+LΔW=1.50×0.01+7.60×0.01=0.091 cm².",
      "Dividera med LW: ΔA/A≈ΔL/L+ΔW/W=0.01/7.60+0.01/1.50≈0.00798, eller 0.798%.",
      "Summan är en regel av första ordningen för osäkerheten i värsta fall; den mycket lilla produkten ΔLΔW=0.0001 cm² förklarar den svaga asymmetrin hos de exakta gränserna. Oberoende statistiska osäkerheter kombineras enligt en annan regel."
    ],
    "answer": "A ≈ (11.40±0.09) cm²; relativ osäkerhet i värsta fall ≈0.80%",
    "interactive": [],
    "question": {
      "text": "En rektangulär aluminiumbit är 7.60 ± 0.01 cm lång och 1.50 ± 0.01 cm bred.\n(a) Bestäm rektangelns area och osäkerheten i arean.\n(b) Kontrollera att den relativa osäkerheten i arean är lika med summan av de relativa osäkerheterna i längden och bredden. (Detta är ett generellt resultat.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.53": {
    "id": "1.53",
    "title": "Uppskatta antalet atomer",
    "steps": [
      "Välj en kroppsmassa, till exempel 70 kg. Ange att vi för en grov uppskattning approximerar kroppens sammansättning med vatten.",
      "En vattenmolekyl innehåller tre atomer och har massan ungefär 18 atommassenheter. Använd 1 u≈1.66×10⁻²⁷ kg.",
      "Massa per molekyl≈18×1.66×10⁻²⁷=2.99×10⁻²⁶ kg.",
      "Antal molekyler≈70/(2.99×10⁻²⁶)=2.34×10²⁷. Multiplicera med tre atomer per molekyl: ≈7.0×10²⁷ atomer.",
      "Verklig vävnad innehåller även kol och andra grundämnen. Syftet är att uppskatta svarets storleksordning, inte att räkna exakt."
    ],
    "answer": "För en kropp på 70 kg med vattenliknande sammansättning: ungefär 7×10²⁷ atomer, av storleksordningen 10²⁸",
    "interactive": [],
    "question": {
      "text": "Uppskatta antalet atomer i din kropp. (Ledtråd: Vilka atomslag är vanligast i kroppen, utifrån det du vet om biologi och kemi? Vilken massa har varje atomslag? Bilaga F anger olika grundämnens atommassor i atommassenheter; värdet av en atommassenhet, eller 1 u, finns i bilaga B.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Ungefärliga referensdata: 1 u = 1.66 × 10⁻²⁷ kg; väte ≈1 u, syre ≈16 u, kol ≈12 u. Ange dina antaganden om kroppsmassa och sammansättning."
    }
  },
  "1.54": {
    "id": "1.54",
    "title": "Uppskatta massan hos biologiska föremål",
    "steps": [
      "Massa=densitet×volym. Ange dina geometriska antaganden när måtten inte är givna.",
      "(a) Modellera ett hjärta som en ellipsoid med de fulla måtten 12×8×6 cm. Halvaxlarna är 6,4,3 cm, så V=(4/3)π×6×4×3≈302 cm³. Vid 1 g/cm³ blir massan≈0.30 kg.",
      "(b) Cellens radie=0.25 µm=2.5×10⁻⁷ m. V=(4/3)πr³≈6.54×10⁻²⁰ m³. Massa≈6.5×10⁻¹⁷ kg.",
      "(c) Modellera ett bi som en cylinder med längden 1 cm och diametern 0.35 cm. V=π(0.175)²×1≈0.096 cm³; massa≈0.096 g≈1×10⁻⁴ kg.",
      "Uppskattningarna för hjärtat och biet beror på de antagna måtten. Resultatet för den mikroskopiska cellen använder diametern som anges i boken."
    ],
    "answer": "En uppskattning: (a) 0.30 kg; (b) 6.5×10⁻¹⁷ kg; (c) 1×10⁻⁴ kg",
    "interactive": [],
    "question": {
      "text": "Biologisk vävnad består vanligtvis av 98% vatten. Använd vattnets densitet, 1.0 × 10³ kg/m³, för att uppskatta massan hos\n(a) hjärtat hos en vuxen människa;\n(b) en cell med diametern 0.5 µm;\n(c) ett honungsbi.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.55": {
    "id": "1.55",
    "title": "Konstruera parallella och vinkelräta enhetsvektorer",
    "steps": [
      "|A|=√(3²+(−4)²)=5. Parallella enhetsvektorer fås genom att dividera med 5.",
      "För en vinkelrät vektor (x,0,z) krävs A·u=3x−4z=0. Det enkla valet (4,0,3) fungerar; dess motsatta vektor fungerar också. Dividera var och en med sin längd 5.",
      "(a) Längs A: börja med A = (3, 0, -4) och B = (0, 0, 0).",
      "Längden av A = 5. Dividera varje komponent med denna längd för att få en pil med längden 1.",
      "(a) Längs A: (0.6, 0, -0.8) . Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0.6)² + (0)² + (-0.8)²] = √(1) ≈ 1 .",
      "I 3D anger du riktningen med enhetsvektorn (0.6, 0, -0.8). Dessa tre komponenter anger riktningen utan längden.",
      "(b) Motsatt A: börja med A = (-3, 0, 4) och B = (0, 0, 0).",
      "Längden av A = 5. Dividera varje komponent med denna längd för att få en pil med längden 1.",
      "(b) Motsatt A: (-0.6, 0, 0.8) . Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-0.6)² + (0)² + (0.8)²] = √(1) ≈ 1 .",
      "I 3D anger du riktningen med enhetsvektorn (-0.6, 0, 0.8). Dessa tre komponenter anger riktningen utan längden.",
      "(c) Första vinkelräta vektorn: börja med A = (4, 0, 3) och B = (0, 0, 0).",
      "Längden av A = 5. Dividera varje komponent med denna längd för att få en pil med längden 1.",
      "(c) Första vinkelräta vektorn: (0.8, 0, 0.6) . Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(0.8)² + (0)² + (0.6)²] = √(1) ≈ 1 .",
      "I 3D anger du riktningen med enhetsvektorn (0.8, 0, 0.6). Dessa tre komponenter anger riktningen utan längden.",
      "(c) Andra vinkelräta vektorn: börja med A = (-4, 0, -3) och B = (0, 0, 0).",
      "Längden av A = 5. Dividera varje komponent med denna längd för att få en pil med längden 1.",
      "(c) Andra vinkelräta vektorn: (-0.8, 0, -0.6) . Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-0.8)² + (0)² + (-0.6)²] = √(1) ≈ 1 .",
      "I 3D anger du riktningen med enhetsvektorn (-0.8, 0, -0.6). Dessa tre komponenter anger riktningen utan längden.",
      "Kontroll: 3×0.8−4×0.6=0 och √(0.8²+0.6²)=1. Båda villkoren måste vara uppfyllda."
    ],
    "answer": "(a) Längs A: (0.6, 0, -0.8) ; längd ≈ 1 \n(b) Motsatt A: (-0.6, 0, 0.8) ; längd ≈ 1 \n(c) Första vinkelräta vektorn: (0.8, 0, 0.6) ; längd ≈ 1 \n(c) Andra vinkelräta vektorn: (-0.8, 0, -0.6) ; längd ≈ 1 ",
    "interactive": [
      {
        "label": "(a) Längs A",
        "units": ""
      },
      {
        "label": "(b) Motsatt A",
        "units": ""
      },
      {
        "label": "(c) Första vinkelräta vektorn",
        "units": ""
      },
      {
        "label": "(c) Andra vinkelräta vektorn",
        "units": ""
      }
    ],
    "question": {
      "text": "Vektorn vec(A) = 3.0î − 4.0k̂.\n(a) Konstruera en enhetsvektor som är parallell med vec(A).\n(b) Konstruera en enhetsvektor som är antiparallell med vec(A).\n(c) Konstruera två enhetsvektorer som är vinkelräta mot vec(A) och som saknar y-komponent.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.56": {
    "id": "1.56",
    "title": "Balansera tre repkrafter",
    "steps": [
      "För att krafterna ska balansera varandra måste deras vektorsumma vara noll. Den fjärde kraften måste vara den motsatta vektorn till summan av de tre första.",
      "Kraft 1: x=Fcosθ, y=Fsinθ ger (86.6, 50, 0) N.",
      "Kraft 2: x=Fcosθ, y=Fsinθ ger (-40, 69.28, 0) N.",
      "Kraft 3: x=Fcosθ, y=Fsinθ ger (-24.07, -31.95, 0) N.",
      "Summan av de tre första krafterna = (22.53, 87.34, 0) N. Beräkna nu noll minus denna summa.",
      "Fjärde kraften: börja med A = (0, 0, 0) och B = (22.53, 87.34, 0).",
      "Arbeta med en riktning i taget: (0 − (22.53), 0 − (87.34), 0 − (0)). Att subtrahera B innebär att addera den omvända pilen −B.",
      "Fjärde kraften: (-22.53, -87.34, 0) N. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-22.53)² + (-87.34)² + (0)²] = √(8135.28) ≈ 90.2 N.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 255.5° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "Fjärde kraften: (-22.53, -87.34, 0) N; längd ≈ 90.2 N; θ ≈ 255.5°",
    "interactive": [
      {
        "label": "Fjärde kraften",
        "units": "N"
      }
    ],
    "question": {
      "text": "Tre horisontella rep drar i en stor sten som sitter fast i marken och ger upphov till vektorkrafterna vec(A), vec(B) och vec(C) som visas i figur P1.56. Bestäm belopp och riktning för en fjärde kraft på stenen som gör att vektorsumman av de fyra krafterna blir noll.",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-p1-56.svg",
        "caption": "Figur P1.56",
        "alt": "Krafter från origo. A: 100.0 N, 30.0° ovanför +x. B: 80.0 N, 30.0° väster om +y. C: 40.0 N, 53.0° nedanför −x."
      },
      "reference": null
    }
  },
  "1.57": {
    "id": "1.57",
    "title": "Den andra kartläggningen av grottan",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En rutts förskjutning är den raka pilen från dess start till dess slut.",
      "Dessa avstånd skiljer sig från dem i 1.23 i den här upplagan. Använd värdena här, inte dem från den tidigare rutten.",
      "Omvandla den andra och tredje delsträckan med vinklarna 315° och 60° från +x. Den avslutande delsträckan som sluter rutten är motsatsen till summan.",
      "Delsträcka 1 har komponenterna (-177, 0, 0) m.",
      "Delsträcka 2 har komponenterna (152, -152, 0) m.",
      "Delsträcka 3 har komponenterna (135.5, 234.7, 0) m.",
      "Addera x-, y- och z-komponenterna var för sig: aktuell förskjutning = (110.5, 82.66, 0) m.",
      "Den önskade slutpositionen är (0, 0, 0) m. Återstående förskjutning = önskad position − aktuell position = (-110.5, -82.66, 0) m.",
      "Resultat: (-110.5, -82.66, 0) m. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-110.5)² + (-82.66)² + (0)²] = √(19049.9) ≈ 138 m.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 216.8° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "Rita delsträckorna så att varje pils början ligger vid den föregående pilens spets. Resultatet går direkt från starten till slutpunkten (eller från den aktuella punkten till målet när en återstående delsträcka efterfrågas). Detta kontrollerar tecknen och kvadranten."
    ],
    "answer": "(-110.5, -82.66, 0) m; längd ≈ 138 m; θ ≈ 216.8° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "Som nämndes i uppgift 1.23 kartlägger en grottforskare en grotta. Hon följer en passage 177 m rakt västerut, sedan 215 m i riktningen 45° öster om söder och därefter 271 m i riktningen 30° öster om norr. Efter en fjärde förskjutning är hon tillbaka där hon började. Använd komponentmetoden för att bestämma den fjärde förskjutningens belopp och riktning. Rita diagrammet över vektoradditionen och visa att det kvalitativt stämmer överens med din numeriska lösning.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.58": {
    "id": "1.58",
    "title": "En direkt räddningsflygning",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En rutts förskjutning är den raka pilen från dess start till dess slut.",
      "Den första vinkeln från +x är 90°−68°=22°. Den andra är −48° (eller 312°).",
      "Använd x=Lcosθ, y=Lsinθ för var och en. Den andra delsträckan har en negativ y-komponent.",
      "Delsträcka 1 har komponenterna (134.4, 54.32, 0) km.",
      "Delsträcka 2 har komponenterna (167.3, -185.8, 0) km.",
      "Addera x-, y- och z-komponenterna var för sig: aktuell förskjutning = (301.7, -131.5, 0) km.",
      "Resultat: (301.7, -131.5, 0) km. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(301.7)² + (-131.5)² + (0)²] = √(108321) ≈ 329.1 km.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 336.5° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "Rita delsträckorna så att varje pils början ligger vid den föregående pilens spets. Resultatet går direkt från starten till slutpunkten (eller från den aktuella punkten till målet när en återstående delsträcka efterfrågas). Detta kontrollerar tecknen och kvadranten."
    ],
    "answer": "(301.7, -131.5, 0) km; längd ≈ 329.1 km; θ ≈ 336.5° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "Nödlandning. Ett flygplan lämnar flygplatsen i Galisteo och flyger 145 km i riktningen 68.0° öster om norr. Sedan ändrar det riktning och flyger 250 km i riktningen 48.0° söder om öster, varefter det omedelbart nödlandar i en beteshage. När flygplatsen skickar ut en räddningsstyrka, i vilken riktning och hur långt ska den flyga för att ta sig direkt till planet?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.59": {
    "id": "1.59",
    "title": "Addera elektriska fält",
    "steps": [
      "Ett elektriskt fält är här helt enkelt ytterligare en vektor. Du kan addera dess komponenter utan att först studera hur laddningarna alstrar fältet.",
      "E₂ pekar mot sydväst: dess standardvinkel är 270°−36.9°=233.1°. Därför är E₂x=−600 sin36.9° och E₂y=−600 cos36.9°.",
      "E₁+E₂: börja med A = (0, 450, 0) och B = (-360.3, -479.8, 0).",
      "Arbeta med en riktning i taget: (0 + (-360.3), 450 + (-479.8), 0 + (0)). När pilar adderas läggs värdena i var och en av de tre komponentriktningarna ihop.",
      "E₁+E₂: (-360.3, -29.81, 0) N/C. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(-360.3)² + (-29.81)² + (0)²] = √(130670) ≈ 361.5 N/C.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 184.7° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten."
    ],
    "answer": "E₁+E₂: (-360.3, -29.81, 0) N/C; längd ≈ 361.5 N/C; θ ≈ 184.7°",
    "interactive": [
      {
        "label": "E₁+E₂",
        "units": "N/C"
      }
    ],
    "question": {
      "text": "Ett laddat föremål med elektrisk laddning q alstrar ett elektriskt fält. SI-enheten för elektriskt fält är N/C, där N är SI-enheten för kraft och C är SI-enheten för laddning. Om det i punkten P finns elektriska fält från två eller flera laddade föremål, är det resulterande fältet vektorsumman av fälten från varje föremål. I punkten P är det elektriska fältet vec(E)₁ från laddningen q₁ 450 N/C i +y-riktningen, och det elektriska fältet vec(E)₂ från laddningen q₂ är 600 N/C i riktningen 36.9° från −y-axeln mot −x-axeln. Vilket belopp och vilken riktning har det resulterande fältet vec(E) = vec(E)₁ + vec(E)₂ i punkten P från dessa två laddningar?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.60": {
    "id": "1.60",
    "title": "Bestäm seglarens tredje delsträcka",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En rutts förskjutning är den raka pilen från dess start till dess slut.",
      "Sydost är 45° söder om öster. Dess komponenter är (3.5cos45°,−3.5sin45°,0).",
      "Delsträcka 1 har komponenterna (2, 0, 0) km.",
      "Delsträcka 2 har komponenterna (2.475, -2.475, 0) km.",
      "Addera x-, y- och z-komponenterna var för sig: aktuell förskjutning = (4.475, -2.475, 0) km.",
      "Den önskade slutpositionen är (5.8, 0, 0) km. Återstående förskjutning = önskad position − aktuell position = (1.325, 2.475, 0) km.",
      "Resultat: (1.325, 2.475, 0) km. Talen anger komponenterna i x-, y- och z-led. Ett negativt värde betyder att komponenten pekar längs den negativa axelriktningen.",
      "Bestäm längden med Pythagoras sats: √[(1.325)² + (2.475)² + (0)²] = √(7.88096) ≈ 2.807 km.",
      "För riktningen använder du tecknen för att välja kvadrant och därefter atan2(y,x): θ ≈ 61.83° moturs från +x. ”atan2” är invers tangens som även tar hänsyn till kvadranten.",
      "Rita delsträckorna så att varje pils början ligger vid den föregående pilens spets. Resultatet går direkt från starten till slutpunkten (eller från den aktuella punkten till målet när en återstående delsträcka efterfrågas). Detta kontrollerar tecknen och kvadranten."
    ],
    "answer": "(1.325, 2.475, 0) km; längd ≈ 2.807 km; θ ≈ 61.83° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "En seglare i en liten segelbåt möter skiftande vindar. Hon seglar 2.00 km österut, därefter 3.50 km åt sydost och sedan ytterligare en sträcka i en okänd riktning. Slutligen befinner hon sig 5.80 km rakt öster om startpunkten (figur P1.60). Bestäm den tredje delsträckans längd och riktning. Rita diagrammet över vektoradditionen och visa att det kvalitativt stämmer överens med din numeriska lösning.",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-p1-60.svg",
        "caption": "Figur P1.60",
        "alt": "Segelbåtens rutt: 2.00 km österut, 3.50 km åt sydost med vinkeln 45.0° och sedan en okänd tredje delsträcka till en punkt 5.80 km öster om starten."
      },
      "reference": null
    }
  }
};
  Object.assign(window.PhysicsLocales.sv.items,items);
})();
