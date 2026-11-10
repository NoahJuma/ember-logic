(function(){
  const items = {
  "1.61": {
    "title": "Två lika stora dragkrafter",
    "steps": [
      "Låt varje kraft ha beloppet F. Den ena vertikala komponenten pekar uppåt och den andra nedåt, så Fsin32°−Fsin32°=0.",
      "De horisontella komponenterna pekar båda utåt. Var och en är Fcos32°, så tillsammans blir de 2Fcos32°.",
      "Sätt 2Fcos32°=5.52. Dividera med 2cos32°: F=5.52/(2cos32°)≈3.255 N.",
      "Kontrollera: varje horisontell komponent är 2.76 N, och 2.76+2.76=5.52 N. De vertikala komponenterna är ±1.725 N och tar ut varandra.",
      "Detta är ett idealiserat kraftdiagram från uppgiften."
    ],
    "answer": "Varje dragkraft är ungefär 3.25 N",
    "interactive": [
      {
        "label": "Sammanlagd dragkraft",
        "units": "N"
      }
    ],
    "question": {
      "text": "Axel ur led. En patient med en axel ur led placeras i en sträckapparat enligt figur P1.61. Dragkrafterna vec(A) och vec(B) har lika stora belopp och ska tillsammans ge en utåtriktad sträckkraft på 5.52 N på patientens arm. Hur stora ska dessa dragkrafter vara?",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-p1-61.svg",
        "caption": "Figur P1.61",
        "alt": "Två lika stora dragkrafter på en arm. A pekar 32° ovanför den utåtriktade horisontella riktningen; B pekar 32° nedanför den."
      },
      "reference": null
    }
  },
  "1.62": {
    "title": "Tillbaka genom Schweiz",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "En bäring mäts från norr och ökar medurs. Detta skiljer sig från den vanliga matematiska vinkeln som mäts från öster.",
      "För bäringar använder du x=Lsin(bäring), y=Lcos(bäring). När du har adderat flygsträckornas vektorer byter du riktning på summan för att flyga tillbaka.",
      "Delsträcka 1 har komponenterna (79.59, 62.18, 0) km.",
      "Delsträcka 2 har komponenterna (28.65, -162.5, 0) km.",
      "Delsträcka 3 har komponenterna (-121.3, 25.78, 0) km.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (-13.05, -74.53, 0) km.",
      "Det önskade slutläget är (0, 0, 0) km. Återstående förskjutning = önskat läge − nuvarande läge = (13.05, 74.53, 0) km.",
      "Resultat: (13.05, 74.53, 0) km. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(13.05)² + (74.53)² + (0)²] = √(5725.07) ≈ 75.66 km.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 80.07° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten.",
      "Den efterfrågade riktningen i förhållande till norr är en bäring: atan2(x,y), omräknad till intervallet 0°–360°, ger 9.931° medurs från norr."
    ],
    "answer": "(a) Återresans längd ≈ 75.66 km.\n(b) Bäring ≈ 9.931° medurs från norr.\nKomponenter: (13.05, 74.53, 0) km.",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "Under en övningsflygning i Schweiz flyger en pilotelev från Bern till Zürich, vidare till Lugano och sedan till Sion (figur P1.62). Riktningarna anges i förhållande till norr: 0° är norr, 90° är öster, 180° är söder och 270° är väster. Använd komponentmetoden för att bestämma\n(a) hur långt hon måste flyga från Sion för att komma tillbaka till Bern, och\n(b) i vilken riktning (i förhållande till norr) hon måste flyga för att komma dit.\nIllustrera dina lösningar med ett vektordiagram.",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-p1-62.svg",
        "caption": "Figur P1.62",
        "alt": "Bern till Zürich: 101 km med bäringen 52°. Zürich till Lugano: 165 km med bäringen 170°. Lugano till Sion: 124 km med bäringen 282°. Bäringarna mäts medurs från norr."
      },
      "reference": null
    }
  },
  "1.63": {
    "title": "Nå ett annat landningsfält",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Använd (−32,0,0) km som målets läge. Blanda inte ihop detta slutläge med den återstående förskjutningen.",
      "Delsträcka 1 har komponenterna (19.07, -12.86, 0) km.",
      "Delsträcka 2 har komponenterna (0, 46, 0) km.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (19.07, 33.14, 0) km.",
      "Det önskade slutläget är (-32, 0, 0) km. Återstående förskjutning = önskat läge − nuvarande läge = (-51.07, -33.14, 0) km.",
      "Resultat: (-51.07, -33.14, 0) km. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-51.07)² + (-33.14)² + (0)²] = √(3706.09) ≈ 60.88 km.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 213° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten."
    ],
    "answer": "(-51.07, -33.14, 0) km; belopp ≈ 60.88 km; θ ≈ 213° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "Du lämnar flygplatsen i Wagga Wagga och flyger 23.0 km i riktningen 34.0° söder om öster. Därefter flyger du 46.0 km rakt norrut. Hur långt och i vilken riktning måste du sedan flyga för att nå ett privat landningsfält som ligger 32.0 km rakt väster om flygplatsen i Wagga Wagga?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.64": {
    "title": "Hjälp upptäcktsresanden hem",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Alla steg är lika långa, så ”steg” kan användas som längdenhet.",
      "Nordost har standardvinkeln 45°. Riktningen 60° norr om väster har vinkeln 180°−60°=120°.",
      "Delsträcka 1 har komponenterna (30.41, 30.41, 0) steg.",
      "Delsträcka 2 har komponenterna (-40, 69.28, 0) steg.",
      "Delsträcka 3 har komponenterna (0, -52, 0) steg.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (-9.594, 47.69, 0) steg.",
      "Det önskade slutläget är (0, 0, 0) steg. Återstående förskjutning = önskat läge − nuvarande läge = (9.594, -47.69, 0) steg.",
      "Resultat: (9.594, -47.69, 0) steg. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(9.594)² + (-47.69)² + (0)²] = √(2366.16) ≈ 48.64 steg.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 281.4° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten."
    ],
    "answer": "(9.594, -47.69, 0) steg; belopp ≈ 48.64 steg; θ ≈ 281.4° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "steg"
      }
    ],
    "question": {
      "text": "Tillbaka till skyddet. En upptäcktsresande i Antarktis lämnar sitt skydd under en snöstorm där sikten är helt vit. Han tar 43 steg åt nordost, därefter 80 steg i riktningen 60° norr om väster och sedan 52 steg rakt söderut. Anta att alla hans steg är lika långa.\n(a) Skissa de tre vektorerna och deras resultant, ungefär skalenligt.\n(b) Rädda upptäcktsresanden från att gå vilse genom att med komponentmetoden beräkna den förskjutning som tar honom tillbaka till skyddet.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.65": {
    "title": "Den kortaste vägen till myntet",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Väster om söder betyder åt sydväst. Den sista delsträckan har standardvinkeln 270°−33°=237° och två negativa komponenter.",
      "Den direkta förskjutningen är den kortaste vägen över ett fält utan hinder.",
      "Delsträcka 1 har komponenterna (0, 20.8, 0) m.",
      "Delsträcka 2 har komponenterna (38, 0, 0) m.",
      "Delsträcka 3 har komponenterna (-9.804, -15.1, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (28.2, 5.704, 0) m.",
      "Resultat: (28.2, 5.704, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(28.2)² + (5.704)² + (0)²] = √(827.577) ≈ 28.77 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 11.44° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten."
    ],
    "answer": "(28.2, 5.704, 0) m; belopp ≈ 28.77 m; θ ≈ 11.44° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "För att pröva era orienteringskunskaper ordnar fysikklassen en tävling på ett stort, öppet fält. Varje deltagare får instruktionen att gå 20.8 m rakt norrut från startpunkten, sedan 38.0 m rakt österut och till sist 18.0 m i riktningen 33.0° väster om söder. Efter dessa förskjutningar hittar deltagaren ett silvermynt gömt under en sten. Den som snabbast tar sig till silvermyntet vinner. Du minns vad du lärde dig på lektionen och springer i en rak linje från startpunkten till det gömda myntet. Hur långt och i vilken riktning springer du?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.66": {
    "title": "En byggnad i tre dimensioner",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Använd z för höjden. Förflyttningarna åt väster och öster tar delvis ut varandra, medan norrut och uppåt förblir separata komponenter.",
      "Delsträcka 1 har komponenterna (-14, 0, 0) m.",
      "Delsträcka 2 har komponenterna (0, 0, 22) m.",
      "Delsträcka 3 har komponenterna (0, 12, 0) m.",
      "Delsträcka 4 har komponenterna (6, 0, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (-8, 12, 22) m.",
      "Resultat: (-8, 12, 22) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-8)² + (12)² + (22)²] = √(692) ≈ 26.31 m.",
      "I 3D anger du riktningen med enhetsvektorn (-0.3041, 0.4562, 0.8363). Dessa tre komponenter anger riktningen utan att ange beloppet.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten.",
      "Avståndet fågelvägen är √(8²+12²+22²)=√692≈26.3 m. Den väg du tog var 54 m, vilket är längre."
    ],
    "answer": "(-8, 12, 22) m; belopp ≈ 26.31 m",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "Du står i ett gathörn tillsammans med din vän. Du går sedan 14.0 m rakt västerut över gatan och in i ditt bostadshus. Du åker hiss 22.0 m uppåt till din våning, går 12.0 m norrut till lägenhetsdörren och sedan 6.0 m rakt österut till din balkong som vetter mot gatan. Din vän står kvar där du lämnade henne. Hur långt ifrån din vän är du nu?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.67": {
    "title": "Tillbaka till bilen efter en omväg",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Placera bilen i origo. Den angivna riktningen beskriver var du befinner dig i förhållande till bilen, så ditt första läge är sydost om den.",
      "Öster om söder ger x=122sin58°, y=−122cos58°. Subtrahera 72 från x för promenaden västerut. Byt sedan riktning på den återstående lägesvektorn för att komma tillbaka till bilen.",
      "Delsträcka 1 har komponenterna (103.5, -64.65, 0) m.",
      "Delsträcka 2 har komponenterna (-72, 0, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (31.46, -64.65, 0) m.",
      "Det önskade slutläget är (0, 0, 0) m. Återstående förskjutning = önskat läge − nuvarande läge = (-31.46, 64.65, 0) m.",
      "Resultat: (-31.46, 64.65, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-31.46)² + (64.65)² + (0)²] = √(5169.49) ≈ 71.9 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 115.9° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten."
    ],
    "answer": "(-31.46, 64.65, 0) m; belopp ≈ 71.9 m; θ ≈ 115.9° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "Du har gått vilse på ett stort, öppet fält på natten. Din GPS visar att du är 122.0 m från bilen, i riktningen 58.0° öster om söder. Du går 72.0 m rakt västerut längs ett dike. Hur mycket längre och i vilken riktning måste du gå för att nå bilen?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.68": {
    "title": "Två vägar till samma affär",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Lördagens andra vinkel, mätt från öster, är 90°+60°=150°. Söndagens första vinkel är 180°−50°=130°.",
      "Delsträcka 1 har komponenterna (0, 0.6, 0) km.",
      "Delsträcka 2 har komponenterna (-1.212, 0.7, 0) km.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (-1.212, 1.3, 0) km.",
      "Resultat: (-1.212, 1.3, 0) km. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-1.212)² + (1.3)² + (0)²] = √(3.16) ≈ 1.778 km.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 133° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten.",
      "(b) Lördagens färdsträcka är 0.60+1.40=2.00 km. Söndagens första förskjutning är (-0.5142, 0.6128, 0) km.",
      "Söndagens återstående förskjutning = affärens läge − den första förskjutningen = (-0.6982, 0.6872, 0) km, med beloppet 0.9796 km.",
      "Söndagens totala sträcka = 0.80+0.9796≈1.78 km. Lördagens sträcka är ungefär 0.2204 km längre.",
      "Båda vägarna ger samma förskjutning eftersom start- och slutpunkterna är desamma; de tillryggalagda sträckorna skiljer sig åt."
    ],
    "answer": "(a) Avståndet fågelvägen ≈ 1.778 km.\n(b) Lördag: 2.00 km. Söndag: 1.78 km. Lördagens sträcka är ungefär 0.2204 km längre.",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "Du bor i en stad där gatorna är raka men går i många olika riktningar. På lördagen kör du från din lägenhet till mataffären genom att först köra 0.60 km rakt norrut och sedan 1.40 km i riktningen 60.0° väster om norr. På söndagen åker du åter från lägenheten till samma affär, men denna gång kör du 0.80 km i riktningen 50.0° norr om väster och sedan i en rak linje till affären.\n(a) Hur långt från din lägenhet ligger affären?\n(b) Vilken dag färdas du den längsta sträckan, och hur mycket längre är den? Eller är sträckan till affären lika lång längs båda vägarna?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.69": {
    "title": "Tillbaka från skatten",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Omvandla 825 m till 0.825 km innan du adderar. Standardvinklarna för de följande delsträckorna är 120° och 32°.",
      "Delsträcka 1 har komponenterna (0, -0.825, 0) km.",
      "Delsträcka 2 har komponenterna (-0.625, 1.083, 0) km.",
      "Delsträcka 3 har komponenterna (0.848, 0.5299, 0) km.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (0.223, 0.7875, 0) km.",
      "Det önskade slutläget är (0, 0, 0) km. Återstående förskjutning = önskat läge − nuvarande läge = (-0.223, -0.7875, 0) km.",
      "Resultat: (-0.223, -0.7875, 0) km. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-0.223)² + (-0.7875)² + (0)²] = √(0.66983) ≈ 0.8184 km.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 254.2° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten."
    ],
    "answer": "(-0.223, -0.7875, 0) km; belopp ≈ 0.8184 km; θ ≈ 254.2° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "km"
      }
    ],
    "question": {
      "text": "Du följer en skattkarta och börjar vid en gammal ek. Först går du 825 m rakt söderut, sedan svänger du och går 1.25 km i riktningen 30.0° väster om norr, och till sist går du 1.00 km i riktningen 32.0° norr om öster. Där hittar du skatten: en biografi om Isaac Newton!\n(a) I vilken riktning ska du gå och hur långt blir det för att komma tillbaka till den gamla eken? Lös uppgiften med komponenter.\n(b) Kontrollera om din beräkning i del (a) är rimlig genom att jämföra den med en grafisk lösning ritad ungefär skalenligt.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.70": {
    "title": "Bestäm den andra stängselstolpens läge",
    "steps": [
      "Välj din position som (0,0). Den första stolpen ligger i (59cos38°,59sin38°)≈(46.49, 36.32, 0) m.",
      "Låt d vara ditt positiva avstånd söderut till den andra stolpen. Dess koordinater är (0,−d).",
      "Mellan stolparna är avståndet i horisontell led 46.49 och avståndet i vertikal led 36.32+d.",
      "Använd Pythagoras sats: 70²=(46.49)²+(36.32+d)².",
      "Ta den positiva kvadratroten eftersom avståndet i vertikal led är positivt: 36.32+d=√[70²−(46.49)²]. Subtrahera 36.32 för att få d≈16.01 m.",
      "Den andra algebraiska roten skulle placera stolpen norrut, vilket strider mot den angivna riktningen."
    ],
    "answer": "Den andra stolpen: 16.01 m rakt söderut",
    "interactive": [
      {
        "label": "Den andra stolpens läge",
        "units": "m"
      }
    ],
    "question": {
      "text": "En stängselstolpe står 59.0 m från platsen där du befinner dig, i riktningen 38.0° norr om öster. En andra stängselstolpe står rakt söder om dig. Hur långt har du till den andra stolpen om avståndet mellan de två stolparna är 70.0 m?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.71": {
    "title": "Hundens sista löpsträcka",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Den andra löpsträckans vinkel är 90°+50°=140°. Slutmålet är (0,−10,0) m.",
      "Delsträcka 1 har komponenterna (12, 0, 0) m.",
      "Delsträcka 2 har komponenterna (-21.45, 18, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (-9.449, 18, 0) m.",
      "Det önskade slutläget är (0, -10, 0) m. Återstående förskjutning = önskat läge − nuvarande läge = (9.449, -28, 0) m.",
      "Resultat: (9.449, -28, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(9.449)² + (-28)² + (0)²] = √(873.179) ≈ 29.55 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 288.6° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten."
    ],
    "answer": "(9.449, -28, 0) m; belopp ≈ 29.55 m; θ ≈ 288.6° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "En hund på ett öppet fält springer 12.0 m österut och sedan 28.0 m i riktningen 50.0° väster om norr. I vilken riktning och hur långt måste hunden därefter springa för att hamna 10.0 m söder om sin ursprungliga startpunkt?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.72": {
    "title": "Från en person till en annan",
    "steps": [
      "Använd trädet som origo. Ricardos läge är (-25.98, 15, 0) m och Janes läge är (-12.99, -7.5, 0) m.",
      "Förskjutning från Ricardo till Jane = Janes läge − Ricardos läge. Om du byter ordning får du fel gångriktning.",
      "Ricardo → Jane: börja med A = (-12.99, -7.5, 0) och B = (-25.98, 15, 0).",
      "Beräkna en riktning i taget: (-12.99 − (-25.98), -7.5 − (15), 0 − (0)). Att subtrahera B betyder att addera den motsatt riktade pilen −B.",
      "Ricardo → Jane: (12.99, -22.5, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(12.99)² + (-22.5)² + (0)²] = √(675) ≈ 25.98 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 300° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten."
    ],
    "answer": "Ricardo → Jane: (12.99, -22.5, 0) m; belopp ≈ 25.98 m; θ ≈ 300°",
    "interactive": [
      {
        "label": "Ricardo → Jane",
        "units": "m"
      }
    ],
    "question": {
      "text": "Ricardo och Jane står under ett träd mitt i en hage. De börjar gräla och går iväg åt olika håll. Ricardo går 30.0 m i riktningen 60.0° väster om norr. Jane går 15.0 m i riktningen 30.0° söder om väster. Sedan stannar de och vänder sig mot varandra.\n(a) Hur långt är det mellan dem?\n(b) I vilken riktning ska Ricardo gå för att gå direkt mot Jane?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.73": {
    "title": "Avståndet mellan två tält",
    "steps": [
      "Använd ditt eget tält som origo. Joes vinkel är −23° och Karls vinkel är +37°.",
      "Subtrahera deras lägesvektorer för att få pilen mellan dem. Dess belopp är det efterfrågade avståndet.",
      "Joe → Karl: börja med A = (25.56, 19.26, 0) och B = (19.33, -8.205, 0).",
      "Beräkna en riktning i taget: (25.56 − (19.33), 19.26 − (-8.205), 0 − (0)). Att subtrahera B betyder att addera den motsatt riktade pilen −B.",
      "Joe → Karl: (6.226, 27.46, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(6.226)² + (27.46)² + (0)²] = √(793) ≈ 28.16 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 77.23° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "En andra kontroll använder vinkeln 60° mellan de två lägesvektorerna: avstånd²=21²+32²−2×21×32×cos60°=793."
    ],
    "answer": "Joe → Karl: (6.226, 27.46, 0) m; belopp ≈ 28.16 m; θ ≈ 77.23°",
    "interactive": [
      {
        "label": "Joe → Karl",
        "units": "m"
      }
    ],
    "question": {
      "text": "Du campar med Joe och Karl. Eftersom ni alla tre tycker om att ha avskildhet sätter ni inte upp tälten nära varandra. Joes tält står 21.0 m från ditt, i riktningen 23.0° söder om öster. Karls tält står 32.0 m från ditt, i riktningen 37.0° norr om öster. Hur långt är det mellan Karls och Joes tält?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.74": {
    "title": "Varför metan har bindningsvinkeln 109°",
    "steps": [
      "En riktningsvektor behöver inte vara en enhetsvektor; dess belopp förkortas bort i vinkelformeln.",
      "Rotera detta vektorpar i 3D-laborationen för att se varför en plan skiss kan vara missvisande.",
      "De två bindningarna: A = (1, 1, 1); B = (1, -1, -1). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (1)×(1) + (1)×(-1) + (1)×(-1) = -1 .",
      "Beloppen är 1.732 och 1.732. Använd A·B = |A||B| cos θ och dividera med deras produkt: cos θ = -1/(1.732×1.732) = -0.3333.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 109.5°. En negativ skalärprodukt innebär en vinkel större än 90°.",
      "Svaret är arccos(−1/3)≈109.47°. Bindningarna är inte vinkelräta."
    ],
    "answer": "De två bindningarna: A·B ≈ -1 ; vinkel ≈ 109.5°",
    "interactive": [
      {
        "label": "De två bindningarna",
        "units": ""
      }
    ],
    "question": {
      "text": "Bindningsvinkeln i metan. I metanmolekylen CH₄ ligger varje väteatom i ett hörn av en regelbunden tetraeder, med kolatomen i centrum. I ett koordinatsystem där en av C–H-bindningarna ligger i riktningen î + ĵ + k̂ ligger en intilliggande C–H-bindning i riktningen î − ĵ − k̂. Beräkna vinkeln mellan dessa två bindningar.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.75": {
    "title": "Arbete från en snett riktad kraft",
    "steps": [
      "Arbete betyder här kraftens komponent längs rörelsen × sträckan. Formeln är W=F·s.",
      "60° ovanför −x betyder en vinkel på 120° från +x. Kraftens x-komponent är 5cos120°=−2.5 N.",
      "Kraft och förskjutning: A = (-2.5, 4.33, 0); B = (0.8, 0, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (-2.5)×(0.8) + (4.33)×(0) + (0)×(0) = -2 J.",
      "Beloppen är 5 och 0.8. Använd A·B = |A||B| cos θ och dividera med deras produkt: cos θ = -2/(5×0.8) = -0.5.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 120°. En negativ skalärprodukt innebär en vinkel större än 90°.",
      "Alltså är W=(−2.5 N)(0.800 m)=−2.00 J. Minustecknet betyder att kraften motverkar förskjutningen."
    ],
    "answer": "Kraft och förskjutning: A·B ≈ -2 J; vinkel ≈ 120°",
    "interactive": [
      {
        "label": "Kraft och förskjutning",
        "units": "J"
      }
    ],
    "question": {
      "text": "Arbetet W som en konstant kraft vec(F) utför på ett föremål som genomgår förskjutningen vec(s) från punkt 1 till punkt 2 är W = vec(F) · vec(s). När F anges i newton (N) och s i meter (m) anges W i joule (J). Om vec(F) under föremålets förskjutning har den konstanta riktningen 60.0° ovanför −x-axeln och det konstanta beloppet 5.00 N, och förskjutningen är 0.800 m i +x-riktningen, vilket arbete utför då kraften vec(F)?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.76": {
    "title": "En negativ laddning vänder kraftens riktning",
    "steps": [
      "Använd F=q(v×B). Beräkna först kryssprodukten och multiplicera sedan med laddningen, inklusive dess tecken.",
      "v×B=(0,0,(3.00×10⁴)(−5.00))=(0,0,−1.50×10⁵). Högerhandsregeln ger −z.",
      "Multiplicera varje komponent med −8.00×10⁻⁶. Två minustecken ger en positiv z-komponent: F=(0,0,+1.20) N.",
      "Kontrollera beloppet separat: |q|vBsin90°=(8×10⁻⁶)(3×10⁴)(5)=1.20 N."
    ],
    "answer": "1.20 N längs +z",
    "interactive": [
      {
        "label": "Kraften F",
        "units": "N"
      }
    ],
    "question": {
      "text": "Magnetfält skapas av rörliga laddningar och utövar krafter på rörliga laddningar. När en partikel med laddningen q rör sig med hastigheten vec(v) i ett magnetfält vec(B) ges kraften vec(F) som fältet utövar på partikeln av vec(F) = qvec(v) × vec(B). SI-enheterna är följande: för laddning coulomb (C), för magnetfält tesla (T), för kraft newton (N) och för hastighet m/s. Om q = −8.00 × 10⁻⁶ C, vec(v) är 3.00 × 10⁴ m/s i +x-riktningen och vec(B) är 5.00 T i −y-riktningen, vilket belopp och vilken riktning har kraften som magnetfältet utövar på den laddade partikeln?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.77": {
    "title": "Bestäm en trubbig vinkel",
    "steps": [
      "Låt K=|A||B|>0. Då gäller Kcosθ=−7 och Ksinθ=9.",
      "Det negativa cosinusvärdet placerar θ mellan 90° och 180°. Att bara använda arctan(9/−7) skulle ge fel kvadrant.",
      "Använd atan2(9,−7), eller beräkna 180°−arctan(9/7). Resultatet är 127.9°.",
      "Kontrollera: cosinus är negativ och sinus positiv, precis som tecknen för de två produkterna kräver."
    ],
    "answer": "θ ≈ 127.9°",
    "interactive": [],
    "question": {
      "text": "Vektorerna vec(A) och vec(B) har skalärprodukten −7.00, och deras kryssprodukt har beloppet +9.00. Vilken är vinkeln mellan dessa två vektorer?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.78": {
    "title": "Vridmoment som en kryssprodukt",
    "steps": [
      "Vridmoment mäter kraftens vridande verkan. Formeln använder lägesvektorn från rotationsaxeln till den punkt där kraften angriper.",
      "r har standardvinkeln 126°, så rx=−4sin36°. z-komponenten är rxFy−ryFx=(−4sin36°)(−22)−0.",
      "Vridmomentet r×F: börja med A = (-2.351, 3.236, 0) och B = (0, -22, 0).",
      "Regeln för kryssprodukten: (AyBz−AzBy, AzBx−AxBz, AxBy−AyBx). Här blir det (3.236×0−0×-22, 0×0−-2.351×0, -2.351×-22−3.236×0). Resultatet är vinkelrätt mot båda ingående vektorerna.",
      "Vridmomentet r×F: (0, 0, 51.73) N·m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(0)² + (0)² + (51.73)²] = √(2675.49) ≈ 51.73 N·m.",
      "I 3D anger du riktningen med enhetsvektorn (0, 0, 1). Dessa tre komponenter anger riktningen utan att ange beloppet.",
      "Vridmomentet är riktat längs +z. Dess belopp är ungefär 52 N·m med den noggrannhet som anges av 4.0 m."
    ],
    "answer": "Vridmomentet r×F: (0, 0, 51.73) N·m; belopp ≈ 51.73 N·m",
    "interactive": [
      {
        "label": "Vridmomentet r×F",
        "units": "N·m"
      }
    ],
    "question": {
      "text": "Vridmoment är en vektorstorhet som beskriver hur effektivt en kraft får ett föremål att rotera. Vridmomentet som en kraft vec(F) utövar på en stel kropp beror på var kraften angriper och var rotationsaxeln ligger. Om vec(r) är lägesvektorn från axeln till kraftens angreppspunkt är vridmomentet vec(r) × vec(F). Om vec(F) är 22.0 N i −y-riktningen och vec(r) ligger i xy-planet i en vinkel på 36° från +y-axeln mot −x-axeln och har beloppet 4.0 m, vilket belopp och vilken riktning har vridmomentet som vec(F) utövar?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.79": {
    "title": "Produkter med bokstäver",
    "steps": [
      "(a) Skalärprodukt: multiplicera motsvarande komponenter och addera: a×0+0×(−c)+(−b)×d=−bd.",
      "Kryssproduktens x-komponent = AyBz−AzBy = 0×d−(−b)(−c)=−bc.",
      "Kryssproduktens y-komponent = AzBx−AxBz = (−b)×0−ad=−ad.",
      "Kryssproduktens z-komponent = AxBy−AyBx = a(−c)−0=−ac. Därför är A×B=(−bc,−ad,−ac).",
      "(b) Sätt c=0. Skalärprodukten är fortfarande −bd, så dess belopp är bd. Kryssprodukten blir (0,−ad,0), med beloppet ad längs −y.",
      "Nu pekar B längs +z och har beloppet d. A:s parallella komponent med tecken är −b, så skalärprodukten är d(−b). Dess vinkelräta komponent har beloppet a, så kryssproduktens belopp är da.",
      "Kontroll med högerhandsregeln: +x kryssat med +z pekar längs −y. A:s z-komponent ger inget bidrag till kryssprodukten med B."
    ],
    "answer": "(a) A·B=−bd; A×B=(−bc,−ad,−ac). (b) |A·B|=bd; |A×B|=ad, riktning −y.",
    "interactive": [
      {
        "label": "Utforska a=3, b=2, c=0, d=4",
        "units": "enheter²"
      }
    ],
    "question": {
      "text": "Vektorn vec(A) = aî − bk̂ och vektorn vec(B) = −cĵ + dk̂.\n(a) Uttryck vec(A) · vec(B) och vec(A) × vec(B) med hjälp av de positiva skalärerna a, b, c och d.\n(b) Om c = 0, vilket belopp har vec(A) · vec(B), och vilket belopp och vilken riktning har vec(A) × vec(B)? Stämmer din riktning för vec(A) × vec(B) med det resultat du får om du skissar vec(A) och vec(B) i xz-planet och använder högerhandsregeln? Skalärprodukten kan beskrivas som beloppet av vec(B) multiplicerat med den komponent av vec(A) som är parallell med vec(B). Stämmer detta med ditt resultat? Kryssproduktens belopp kan beskrivas som beloppet av vec(B) multiplicerat med den komponent av vec(A) som är vinkelrät mot vec(B). Stämmer detta med ditt resultat?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.80": {
    "title": "Vinklar som maximerar respektive produkt",
    "steps": [
      "(a) |A·B|=AB|cosθ| är störst när |cosθ|=1: θ=0° eller 180°. Vid båda vinklarna är sinθ=0, så |A×B|=0.",
      "(b) |A×B|=ABsinθ är störst vid θ=90°. Då är skalärprodukten noll.",
      "(c) A·B=2|A×B| betyder ABcosθ=2ABsinθ. Förkorta bort AB. Vänsterledet måste vara icke-negativt, så θ ligger i första kvadranten.",
      "Dividera med cosθ: tanθ=1/2. Alltså är θ=arctan(1/2)≈26.565°."
    ],
    "answer": "(a) 0° eller 180°, kryssproduktens belopp 0; (b) 90°, skalärprodukt 0; (c) 26.6°",
    "interactive": [],
    "question": {
      "text": "Vektorerna vec(A) och vec(B) ligger i xy-planet. Vektorn vec(A) är riktad längs +x, och vektorn vec(B) har riktningen θ från +x-axeln, mätt mot +y-axeln.\n(a) Om θ ligger i intervallet 0° ≤ θ ≤ 180°, vid vilka två värden på θ har skalärprodukten vec(A) · vec(B) sitt största belopp? Vilket belopp har kryssprodukten vec(A) × vec(B) vid vart och ett av dessa värden på θ?\n(b) Om θ ligger i intervallet 0° ≤ θ ≤ 180°, vid vilket värde på θ har kryssprodukten vec(A) × vec(B) sitt största värde? Vilket belopp har skalärprodukten vec(A) · vec(B) vid detta värde på θ?\n(c) Vilken vinkel θ i intervallet 0° ≤ θ ≤ 180° ger vec(A) · vec(B) som är dubbelt så stor som |vec(A) × vec(B)|?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.81": {
    "title": "Bestäm den andra produkten",
    "steps": [
      "Använd sin²θ+cos²θ=1. Multiplicera med (AB)² för att få |A×B|²+(A·B)²=(AB)².",
      "AB=12.0×12.0=144 m².",
      "Kryssproduktens belopp=√(144²−76²)=√14960≈122.311 m².",
      "Ett belopp kan inte vara negativt, så välj den positiva kvadratroten."
    ],
    "answer": "|A×B| ≈122 m²",
    "interactive": [],
    "question": {
      "text": "Vektorn vec(A) har beloppet 12.0 m och vektorn vec(B) har beloppet 12.0 m. Skalärprodukten vec(A) · vec(B) är 76.0 m². Vilket belopp har kryssprodukten mellan dessa två vektorer?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.82": {
    "title": "Bestäm kryssproduktens riktning",
    "steps": [
      "För B i planet med vinkeln β gäller (A×B)z=ABsin(β−53°)=40sin(β−53°) m².",
      "(a) Det största positiva värdet kräver β−53°=90°. Välj β=143°, vilket ger +40 m².",
      "(b) Det mest negativa värdet kräver β−53°=−90°. Välj β=−37°=323°, vilket ger −40 m².",
      "(c) För att kryssprodukten ska bli noll måste pilarna vara parallella: β=53° eller 233°.",
      "En komponent av B utanför xy-planet kan inte öka det största z-värdet, eftersom den minskar den tillgängliga längden i planet."
    ],
    "answer": "B:s vinklar från +x: (a) 143°; (b) 323°; (c) 53° eller 233°",
    "interactive": [
      {
        "label": "Prova det största positiva z-värdet",
        "units": "m²"
      }
    ],
    "question": {
      "text": "Vektorn vec(A) har beloppet 5.00 m och ligger i xy-planet i riktningen 53.0° från +x-axeln, mätt mot +y-axeln. Vektorn vec(B) har beloppet 8.00 m och en riktning som du kan ändra.\n(a) Du vill att kryssprodukten vec(A) × vec(B) ska ha en positiv z-komponent med så stort belopp som möjligt. Vilken riktning ska du välja för vektorn vec(B)?\n(b) Vilken riktning ska vec(B) ha för att vec(A) × vec(B) ska få den mest negativa z-komponenten?\n(c) Vilka två riktningar för vec(B) gör att vec(A) × vec(B) blir noll?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.83": {
    "title": "Belopp från en skalärprodukt",
    "steps": [
      "A:s standardvinkel är 270°−28°=242°. B:s är 360°−39°=321°.",
      "Vinkeln mellan dem är 321°−242°=79°.",
      "Formeln för skalärprodukten ger 59.0=(9.00)Bcos79°. Dividera med 9cos79°: B≈34.36 m.",
      "cos79° är positivt, vilket stämmer med den positiva skalärprodukten. Använd inte 101° genom att välja fel referensriktning."
    ],
    "answer": "|B| ≈34.36 m",
    "interactive": [
      {
        "label": "Undersök vinkeln",
        "units": "m²"
      }
    ],
    "question": {
      "text": "Skalärprodukten av vektorerna vec(A) och vec(B) är +59.0 m². Vektorn vec(A) har beloppet 9.00 m och riktningen 28.0° väster om söder. Om vektorn vec(B) har riktningen 39.0° söder om öster, vilket belopp har vec(B)?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.84": {
    "title": "En enhetsvektor vinkelrät mot två vektorer",
    "steps": [
      "En kryssprodukt är vinkelrät mot båda ingående vektorerna. A×B=(3×(−3)−4×1,4×3−(−2)×(−3),(−2)×1−3×3)=(-13, 6, -11).",
      "Dess belopp är √(326) = 18.06. Dividera med detta belopp för att få en enhetsvektor.",
      "En enhetsnormal: börja med A = (-13, 6, -11) och B = (0, 0, 0).",
      "Beloppet av A = 18.06. Dividera varje komponent med detta belopp för att få en pil med längden 1.",
      "En enhetsnormal: (-0.72, 0.3323, -0.6092) . Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-0.72)² + (0.3323)² + (-0.6092)²] = √(1) ≈ 1 .",
      "I 3D anger du riktningen med enhetsvektorn (-0.72, 0.3323, -0.6092). Dessa tre komponenter anger riktningen utan att ange beloppet.",
      "Den motsatt riktade enhetsvektorn är också ett giltigt svar. Kontrollera båda genom att ta skalärprodukten med A och B: båda produkterna måste bli noll."
    ],
    "answer": "En enhetsnormal: (-0.72, 0.3323, -0.6092) ; belopp ≈ 1 ",
    "interactive": [
      {
        "label": "En enhetsnormal",
        "units": ""
      }
    ],
    "question": {
      "text": "Bestäm en enhetsvektor som är vinkelrät mot de två vektorerna i uppgift 1.39.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Vektorerna från uppgift 1.39: vec(A) = −2.00î + 3.00ĵ + 4.00k̂; vec(B) = 3.00î + 1.00ĵ − 3.00k̂."
    }
  },
  "1.85": {
    "title": "Bestäm en vektor utifrån två villkor",
    "steps": [
      "Låt C=(x,y,0). Vinkelräta vektorer har skalärprodukten noll, så 5x−6.5y=0.",
      "Dividera den första ekvationen med 5: x=1.3y.",
      "Det andra villkoret för skalärprodukten ger 3.5x−7y=15. Sätt in x=1.3y: 3.5(1.3y)−7y=15.",
      "Samla liknande termer: (4.55−7)y=15, så −2.45y=15 och y=−15/2.45≈−6.12245.",
      "Då är x=1.3y≈−7.95918. Kontrollera: 5x−6.5y=0 och 3.5x−7y=15."
    ],
    "answer": "C ≈ (−7.96,−6.12,0)",
    "interactive": [
      {
        "label": "C",
        "units": "enheter"
      }
    ],
    "question": {
      "text": "Du har vektorerna vec(A) = 5.0î − 6.5ĵ och vec(B) = 3.5î − 7.0ĵ. En tredje vektor, vec(C), ligger i xy-planet. Vektorn vec(C) är vinkelrät mot vektorn vec(A), och skalärprodukten av vec(C) och vec(B) är 15.0. Bestäm komponenterna i vektorn vec(C) utifrån denna information.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.86": {
    "title": "Kryssproduktens belopp ger två möjligheter",
    "steps": [
      "Kryssproduktens belopp = √(2²+0²+(−5)²)=√29≈5.38516.",
      "Använd |A×B|=ABsinθ: sinθ=√29/(3×3)=√29/9≈0.59835.",
      "En vinkel är arcsin(√29/9)≈36.75°. Sinus har samma värde vid 180°−θ, vilket ger 143.2°.",
      "Den angivna normalriktningen bestämmer planets orientering, men den bestämmer inte skalärproduktens tecken. Både den spetsiga och den trubbiga vinkeln är fortfarande möjliga."
    ],
    "answer": "θ ≈36.75° eller 143.2°",
    "interactive": [],
    "question": {
      "text": "Två vektorer vec(A) och vec(B) har beloppen A = 3.00 och B = 3.00. Deras kryssprodukt är vec(A) × vec(B) = −5.00k̂ + 2.00î. Vilken är vinkeln mellan vec(A) och vec(B)?",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.87": {
    "title": "Jämför densiteter med olika enheter",
    "steps": [
      "Använd 1 kg=1000 g; 1 mg=10⁻³ g; 1 µg=10⁻⁶ g; 1 ng=10⁻⁹ g. För volymer gäller 1 m³=10⁶ cm³; 1 mm³=10⁻³ cm³; 1 µm³=10⁻¹² cm³.",
      "A: massa 8.00 g; volym 1.67×10⁻⁶ m³=1.67 cm³. Densitet=8/1.67≈4.79 g/cm³.",
      "B: massa 6.00 µg=6.00×10⁻⁶ g; volym 9.38×10⁶ µm³=9.38×10⁻⁶ cm³. Densitet≈0.640 g/cm³.",
      "C: massa 8.00 mg=0.00800 g; volym 2.50×10⁻³ cm³. Densitet=3.20 g/cm³.",
      "D: massa 9.00×10⁻⁴ kg=0.900 g; volym 2.81×10³ mm³=2.81 cm³. Densitet≈0.320 g/cm³.",
      "E: massa 9.00×10⁴ ng=9.00×10⁻⁵ g; volym 1.59×10⁻² mm³=1.59×10⁻⁵ cm³. Densitet≈5.66 g/cm³.",
      "F: massa 6.00×10⁻² mg=6.00×10⁻⁵ g; volym 1.25×10⁻⁴ cm³. Densitet=0.480 g/cm³.",
      "Sortera de beräknade densiteterna, inte de ursprungliga massvärdena."
    ],
    "answer": "Ökande densitet: D, F, B, C, A, E",
    "interactive": [],
    "question": {
      "text": "Du är gruppledare på ett läkemedelsföretag. Flera tekniker förbereder prover, och du vill jämföra provernas densiteter (densitet = massa/volym) med hjälp av de massor och volymer som de har rapporterat. Tyvärr angav du inte vilka enheter de skulle använda. Teknikerna har därför rapporterat sina värden i olika enheter, enligt tabellen nedan.\nLista provens ID i ordning efter ökande densitet.",
      "passage": null,
      "table": {
        "caption": "Mätvärden för proverna",
        "headers": [
          "Prov-ID",
          "Massa",
          "Volym"
        ],
        "rows": [
          [
            "A",
            "8.00 g",
            "1.67 × 10⁻⁶ m³"
          ],
          [
            "B",
            "6.00 µg",
            "9.38 × 10⁶ µm³"
          ],
          [
            "C",
            "8.00 mg",
            "2.50 × 10⁻³ cm³"
          ],
          [
            "D",
            "9.00 × 10⁻⁴ kg",
            "2.81 × 10³ mm³"
          ],
          [
            "E",
            "9.00 × 10⁴ ng",
            "1.59 × 10⁻² mm³"
          ],
          [
            "F",
            "6.00 × 10⁻² mg",
            "1.25 × 10⁻⁴ cm³"
          ]
        ],
        "afterParagraph": 0
      },
      "figure": null,
      "reference": null
    }
  },
  "1.88": {
    "title": "Bestäm krafterna utan att mäta dem direkt",
    "steps": [
      "Låt krafternas belopp vara a och b. När de är likriktade gäller a+b=8.00.",
      "Formeln för resultanten är R²=a²+b²+2abcosθ. Vid 60° är R²=49=a²+b²+ab.",
      "Kvadrera ekvationen för de likriktade krafterna: 64=a²+b²+2ab. Subtrahera ekvationen för 60°: ab=15.",
      "Sätt in b=8−a: a(8−a)=15. Omforma: a²−8a+15=0=(a−5)(a−3). De två krafterna är 5 N och 3 N.",
      "Kontrollera de avrundade mätvärdena: vid 90° blir √(25+9)=5.83095 N →5.83; vid 45° blir √(34+30cos45°)=7.43056 N →7.43.",
      "Vid 30° är R=√(34+30cos30°)≈7.745 N."
    ],
    "answer": "Den större kraften: 5.00 N. Vid 30° är resultanten ungefär 7.74 N.",
    "interactive": [
      {
        "label": "Resultant vid 30°",
        "units": "N"
      }
    ],
    "question": {
      "text": "Du arbetar som maskiningenjör på ett tillverkningsföretag. Två krafter, vec(F)₁ och vec(F)₂, verkar på en del i en utrustning. Din chef har bett dig bestämma beloppet av den större av dessa två krafter. Du kan ändra vinkeln mellan vec(F)₁ och vec(F)₂ från 0° till 90°, medan varje krafts belopp förblir konstant. Du kan också mäta beloppet av den resulterande kraften (deras vektorsumma), men du kan inte mäta varje enskild krafts belopp direkt. Du mäter den resulterande kraftens belopp för fyra vinklar θ mellan de två krafternas riktningar enligt följande:\n(a) Vilket belopp har den större av de två krafterna?\n(b) När utrustningen används i produktionslinjen är vinkeln mellan krafterna 30.0°. Vilket belopp har den resulterande kraften i detta fall?",
      "passage": null,
      "table": {
        "caption": "Uppmätt resulterande kraft",
        "headers": [
          "θ",
          "Resulterande kraft (N)"
        ],
        "rows": [
          [
            "0.0°",
            "8.00"
          ],
          [
            "45.0°",
            "7.43"
          ],
          [
            "60.0°",
            "7.00"
          ],
          [
            "90.0°",
            "5.83"
          ]
        ],
        "afterParagraph": 0
      },
      "figure": null,
      "reference": null
    }
  },
  "1.89": {
    "title": "Jorden, Mars och observationspunkten",
    "steps": [
      "(a) Placera solen i (0,0,0). Markera jorden och Mars med hjälp av deras koordinater. Mars ligger något under xy-planet eftersom dess z-värde är negativt.",
      "(b-i) Avståndet solen–jorden = √(0.3182²+0.9329²) ≈ 0.98567 AU.",
      "(b-ii) Avståndet solen–Mars = √(1.3087²+(−0.4423)²+(−0.0414)²) ≈ 1.382 AU.",
      "(b-iii) Jorden→Mars = Mars−jorden = (0.9905, -1.375, -0.0414) AU. Beloppet är 1.6953 AU.",
      "(c) Från jorden använder du jorden→solen=(-0.3182, -0.9329, 0), inte solen→jorden. Ta skalärprodukten med jorden→Mars och dividera med produkten av deras belopp. Invers cosinus ger 54.61°.",
      "(d) I den förenklade midnattsskissen är blickriktningen utåt vänd bort från solen, och Mars ligger på sidan mot solen (vinkelavståndet från solen är mindre än 90°). Det avsedda svaret är därför att Mars inte är synlig vid midnatt.",
      "För att avgöra exakt om Mars befinner sig ovanför horisonten på en verklig plats behövs också latitud, årstid och lokala himmelskoordinater; geometrin vid höga latituder kan göra det förenklade midnattsresonemanget ogiltigt."
    ],
    "answer": "Avstånd ≈0.98567, 1.382, 1.6953 AU; vinkeln mellan solen och Mars sedd från jorden ≈54.61°.",
    "interactive": [
      {
        "label": "Jorden → Mars",
        "units": "AU"
      },
      {
        "label": "Vinkel sedd från jorden",
        "units": "AU²"
      }
    ],
    "question": {
      "text": "Navigering i solsystemet. Rymdsonden Mars Polar Lander sköts upp den 3 januari 1999. Den 3 december 1999, dagen då Mars Polar Lander träffade Mars yta med hög hastighet och sannolikt slogs sönder, hade jorden och Mars följande koordinater:\nI detta koordinatsystem ligger solen i origo och jordens bana i xy-planet. Jorden passerar +x-axeln en gång om året vid höstdagjämningen, höstens första dag på norra halvklotet (omkring den 22 september). En AU, eller astronomisk enhet, är lika med 1.496 × 10⁸ km, medelavståndet från jorden till solen.\n(a) Rita solens, jordens och Mars lägen den 3 december 1999.\n(b) Bestäm följande avstånd i AU den 3 december 1999: från (i) solen till jorden; (ii) solen till Mars; (iii) jorden till Mars.\n(c) Vilken var vinkeln mellan riktningen mot solen och riktningen mot Mars, sedd från jorden den 3 december 1999?\n(d) Förklara om Mars var synlig från din nuvarande plats vid midnatt den 3 december 1999. (När det är midnatt befinner sig solen på motsatt sida av jorden från dig.)",
      "passage": null,
      "table": {
        "caption": "Lägen den 3 december 1999",
        "headers": [
          "",
          "x",
          "y",
          "z"
        ],
        "rows": [
          [
            "Jorden",
            "0.3182 AU",
            "0.9329 AU",
            "−0.0000 AU"
          ],
          [
            "Mars",
            "1.3087 AU",
            "−0.4423 AU",
            "−0.0414 AU"
          ]
        ],
        "afterParagraph": 0
      },
      "figure": null,
      "reference": null
    }
  },
  "1.90": {
    "title": "Planera drönarens sista delsträcka",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Den första pilen anger startläget i förhållande till kontrollcentralen, inte en extra flygsträcka. Ta med den när du beräknar slutläget.",
      "Nuvarande x=10+90+0−60+120=160 m; nuvarande y=−50+0+110+40+180=280 m.",
      "Delsträcka 1 har komponenterna (10, -50, 0) m.",
      "Delsträcka 2 har komponenterna (90, 0, 0) m.",
      "Delsträcka 3 har komponenterna (0, 110, 0) m.",
      "Delsträcka 4 har komponenterna (-60, 40, 0) m.",
      "Delsträcka 5 har komponenterna (120, 180, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (160, 280, 0) m.",
      "Det önskade slutläget är (0, -70, 0) m. Återstående förskjutning = önskat läge − nuvarande läge = (-160, -350, 0) m.",
      "Resultat: (-160, -350, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-160)² + (-350)² + (0)²] = √(148100) ≈ 384.8 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 245.4° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten."
    ],
    "answer": "(-160, -350, 0) m; belopp ≈ 384.8 m; θ ≈ 245.4° moturs från öster",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "Leverans med drönare. Du testar paketleveranser med drönare i ett projekt. Gruppen registrerar drönarens färdväg med vektorförskjutningar och väljer kontrollcentralens läge som origo. Under ett test börjar drönaren flygningen vid +10î − 50ĵ, där enheterna är meter, î pekar österut och ĵ norrut. Drönarens följande förskjutningar är +90î, +110ĵ, −60î + 40ĵ och +120î + 180ĵ. Om drönarens slutmål är −70ĵ, hur långt och i vilken riktning måste den flyga? (Rita gärna situationen innan du löser uppgiften numeriskt.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.91": {
    "title": "Karlavagnen på djupet",
    "steps": [
      "Placera solen i (0,0), Merak i (77,0) och Alkaid i (138cos25.6°,138sin25.6°). Ett ljusår är en sträcka, inte en tid.",
      "Alkaids koordinater är (124.5, 59.63, 0) ly. Merak→Alkaid = (47.45, 59.63, 0) ly.",
      "(a) Avståndet = beloppet av denna differens ≈76.21 ly. Ett likvärdigt uttryck är d²=77²+138²−2×77×138×cos25.6°.",
      "(b) Flytta observationspunkten till Merak. Merak→solen=(-77, 0, 0); Merak→Alkaid=(47.45, 59.63, 0).",
      "Deras skalärprodukt är -3653.87 ly². Dividera med 77×76.21 och ta invers cosinus: vinkeln ≈128.5°.",
      "Den mycket större vinkeln vid Merak visar varför stjärnornas skenbara lägen förändras när observationspunkten ändras."
    ],
    "answer": "(a) ≈76.21 ly; (b) ≈128.5°",
    "interactive": [
      {
        "label": "Merak → Alkaid",
        "units": "ly"
      },
      {
        "label": "Stjärnhimlen från Merak",
        "units": "ly²"
      }
    ],
    "question": {
      "text": "Navigering i Karlavagnen. Alla stjärnorna i Karlavagnen (en del av stjärnbilden Stora björnen) kan se ut att ligga lika långt från jorden, men i själva verket ligger de mycket långt från varandra. Figur P1.91 visar avstånden från jorden till var och en av dessa stjärnor. Avstånden anges i ljusår (ly), den sträcka ljuset färdas under ett år. Ett ljusår är lika med 9.461 × 10¹⁵ m.\n(a) Alkaid och Merak ligger 25.6° från varandra på jordens stjärnhimmel. Visa Alkaids, Meraks och vår sols relativa lägen i ett diagram. Bestäm avståndet i ljusår från Alkaid till Merak.\n(b) Hur många grader skulle skilja Alkaid och vår sol åt på himlen för en invånare på en planet som kretsar kring Merak?",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-p1-91.svg",
        "caption": "Figur P1.91",
        "alt": "Avstånd från jorden till stjärnorna i Karlavagnen: Alkaid 138 ly, Mizar 73 ly, Alioth 64 ly, Megrez 81 ly, Phad 80 ly, Merak 77 ly, Dubhe 105 ly."
      },
      "reference": null
    }
  },
  "1.92": {
    "title": "Alveolernas totala volym",
    "steps": [
      "Total volym = antal × volym per blåsa = (480×10⁶)(4.2×10⁶)=2.016×10¹⁵ µm³.",
      "Eftersom 1 µm=10⁻⁶ m är 1 µm³=10⁻¹⁸ m³. Multiplicera för att få 2.016×10⁻³ m³.",
      "En kubikmeter är 1000 L. Därför är den totala volymen=2.016 L≈2.0 L."
    ],
    "answer": "Alternativ (c): 2.0 L",
    "interactive": [],
    "question": {
      "text": "Vilken är den totala volymen av den del av lungorna där gasutbytet sker?\n(a) 2000 µm³;\n(b) 2 m³;\n(c) 2.0 L;\n(d) 120 L.",
      "passage": "Beräkna lungvolymen hos människor. Hos människor utbyts syre och koldioxid med blodet i många små blåsor i lungorna som kallas alveoler. Alveolerna ger en stor yta för gasutbyte. Nya noggranna mätningar visar att det totala antalet alveoler i ett typiskt par lungor är ungefär 480 × 10⁶ och att medelvolymen för en enda alveol är 4.2 × 10⁶ µm³. (Volymen av ett klot är V = (4/3)πr³, och klotets ytarea är A = 4πr².)",
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.93": {
    "title": "Diametern hos en lungblåsa",
    "steps": [
      "Formeln för ett klots volym är V=(4/3)πr³. Lös ut r: r=∛(3V/4π).",
      "r=∛[3(4.2×10⁶)/(4π)]≈100.1 µm.",
      "Diameter=2r≈200.2 µm. Eftersom 1000 µm=1 mm blir diametern≈0.2002 mm.",
      "Ange inte radien när frågan gäller diametern."
    ],
    "answer": "Alternativ (a): 0.20 mm",
    "interactive": [],
    "question": {
      "text": "Om vi antar att alveolerna är klotformade, vilken diameter har då en typisk alveol?\n(a) 0.20 mm;\n(b) 2 mm;\n(c) 20 mm;\n(d) 200 mm.",
      "passage": "Beräkna lungvolymen hos människor. Hos människor utbyts syre och koldioxid med blodet i många små blåsor i lungorna som kallas alveoler. Alveolerna ger en stor yta för gasutbyte. Nya noggranna mätningar visar att det totala antalet alveoler i ett typiskt par lungor är ungefär 480 × 10⁶ och att medelvolymen för en enda alveol är 4.2 × 10⁶ µm³. (Volymen av ett klot är V = (4/3)πr³, och klotets ytarea är A = 4πr².)",
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "1.94": {
    "title": "Tolka mönstret i spridningsdiagrammet",
    "steps": [
      "Den horisontella axeln visar total lungvolym; den vertikala axeln visar medelvolymen för en alveol.",
      "Punkterna ligger utspridda kring en liknande vertikal nivå i stället för att visa en tydlig uppåtgående eller nedåtgående trend.",
      "Den totala volymen för gasutbyte är ungefär antal × medelvolym per alveol. Om den genomsnittliga storleken förblir ungefär konstant innebär en större total volym fler alveoler.",
      "”Konstant” betyder här ungefär oförändrad inom spridningen, inte exakt lika för alla sex personerna."
    ],
    "answer": "Bästa alternativet är (c): ungefär konstant volym per alveol och ökande antal alveoler",
    "interactive": [],
    "question": {
      "text": "Den totala lungvolymen varierar avsevärt mellan individer. Figur P1.94 visar resultaten av mätningar av total lungvolym och genomsnittlig alveolvolym hos sex individer. Vad kan du utifrån dessa data dra för slutsats om sambandet mellan alveolernas storlek, den totala lungvolymen och antalet alveoler per individ? När lungornas totala volym ökar\n(a) ökar både antalet alveoler och de enskilda alveolernas volym;\n(b) ökar antalet alveoler och de enskilda alveolernas volym minskar;\n(c) förblir de enskilda alveolernas volym konstant och antalet alveoler ökar;\n(d) förblir både antalet alveoler och de enskilda alveolernas volym konstanta.",
      "passage": "Beräkna lungvolymen hos människor. Hos människor utbyts syre och koldioxid med blodet i många små blåsor i lungorna som kallas alveoler. Alveolerna ger en stor yta för gasutbyte. Nya noggranna mätningar visar att det totala antalet alveoler i ett typiskt par lungor är ungefär 480 × 10⁶ och att medelvolymen för en enda alveol är 4.2 × 10⁶ µm³. (Volymen av ett klot är V = (4/3)πr³, och klotets ytarea är A = 4πr².)",
      "table": null,
      "figure": {
        "file": "figure-p1-94.svg",
        "caption": "Figur P1.94",
        "alt": "Spridningsdiagram för sex personer. Horisontell axel: total lungvolym i 10⁻⁶ m³. Vertikal axel: genomsnittlig alveolvolym i 10⁶ µm³. Ungefärliga punkter (horisontellt, vertikalt): (1000, 5.0), (1100, 4.0), (1300, 3.8), (1500, 4.6), (1950, 4.4), (2400, 4.0)."
      },
      "reference": null
    }
  },
  "VP1.7.1": {
    "title": "Slut färdvägen från exemplet",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Den saknade pilen D måste uppfylla A+B+C+D=0, så D=−(A+B+C).",
      "Delsträcka 1 har komponenterna (38.37, 61.4, 0) m.",
      "Delsträcka 2 har komponenterna (-46.36, -33.68, 0) m.",
      "Delsträcka 3 har komponenterna (0, -17.8, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (-7.991, 9.919, 0) m.",
      "Det önskade slutläget är (0, 0, 0) m. Återstående förskjutning = önskat läge − nuvarande läge = (7.991, -9.919, 0) m.",
      "Resultat: (7.991, -9.919, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(7.991)² + (-9.919)² + (0)²] = √(162.227) ≈ 12.74 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 308.9° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten.",
      "x-komponenten är positiv och y-komponenten är negativ, så riktningen ligger i kvadrant IV. Detta besvarar uttryckligen den del av frågan som gäller kvadranten."
    ],
    "answer": "(7.991, -9.919, 0) m; belopp ≈ 12.74 m; θ ≈ 308.9° moturs från öster; kvadrant IV.",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "Betrakta de tre vektorerna vec(A), vec(B) och vec(C) i exempel 1.7. Om en fjärde vektor vec(D) adderas till vec(A) + vec(B) + vec(C) blir resultatet noll: vec(A) + vec(B) + vec(C) + vec(D) = 0. Bestäm beloppet och riktningen för vec(D). Ange riktningen för vec(D) som en vinkel mätt moturs från den positiva x-axeln och ange i vilken kvadrant vinkeln ligger.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Givet i exempel 1.7: vec(A) är 72.4 m i riktningen 32.0° öster om norr; vec(B) är 57.3 m i riktningen 36.0° söder om väster; vec(C) är 17.8 m rakt söderut. Standardvinklarna från +x är 58°, 216° respektive 270°."
    }
  },
  "VP1.7.2": {
    "title": "Vänd bara den mittersta pilen",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Bokens uttryck är A−B+C. Vänd B, behåll A och C oförändrade och addera sedan de tre pilarna.",
      "Delsträcka 1 har komponenterna (38.37, 61.4, 0) m.",
      "Delsträcka 2 har komponenterna (46.36, 33.68, 0) m.",
      "Delsträcka 3 har komponenterna (0, -17.8, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (84.72, 77.28, 0) m.",
      "Resultat: (84.72, 77.28, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(84.72)² + (77.28)² + (0)²] = √(13150) ≈ 114.7 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 42.37° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten.",
      "Både x- och y-komponenten är positiva, så riktningen ligger i kvadrant I. Detta besvarar uttryckligen den del av frågan som gäller kvadranten."
    ],
    "answer": "(84.72, 77.28, 0) m; belopp ≈ 114.7 m; θ ≈ 42.37° moturs från öster; kvadrant I.",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "Betrakta de tre vektorerna vec(A), vec(B) och vec(C) i exempel 1.7. Beräkna beloppet och riktningen för vektorn vec(S) = vec(A) − vec(B) + vec(C). Ange riktningen för vec(S) som en vinkel mätt moturs från den positiva x-axeln och ange i vilken kvadrant vinkeln ligger. (Ledtråd: komponenterna i −vec(B) är helt enkelt komponenterna i vec(B) med omvända tecken.)",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Givet i exempel 1.7: vec(A) är 72.4 m i riktningen 32.0° öster om norr; vec(B) är 57.3 m i riktningen 36.0° söder om väster; vec(C) är 17.8 m rakt söderut. Standardvinklarna från +x är 58°, 216° respektive 270°."
    }
  },
  "VP1.7.3": {
    "title": "Fördubbla delsträckan söderut",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "När C fördubblas ändras dess komponent söderut från −17.8 till −35.6 m.",
      "Delsträcka 1 har komponenterna (38.37, 61.4, 0) m.",
      "Delsträcka 2 har komponenterna (-46.36, -33.68, 0) m.",
      "Delsträcka 3 har komponenterna (0, -35.6, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (-7.991, -7.881, 0) m.",
      "Resultat: (-7.991, -7.881, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-7.991)² + (-7.881)² + (0)²] = √(125.965) ≈ 11.22 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 224.6° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten.",
      "Både x- och y-komponenten är negativa, så riktningen ligger i kvadrant III. Detta besvarar uttryckligen den del av frågan som gäller kvadranten."
    ],
    "answer": "(-7.991, -7.881, 0) m; belopp ≈ 11.22 m; θ ≈ 224.6° moturs från öster; kvadrant III.",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "Betrakta de tre vektorerna vec(A), vec(B) och vec(C) i exempel 1.7.\n(a) Bestäm komponenterna i vektorn vec(T) = vec(A) + vec(B) + 2vec(C).\n(b) Bestäm beloppet och riktningen för vec(T). Ange riktningen för vec(T) som en vinkel mätt moturs från den positiva x-axeln och ange i vilken kvadrant vinkeln ligger.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Givet i exempel 1.7: vec(A) är 72.4 m i riktningen 32.0° öster om norr; vec(B) är 57.3 m i riktningen 36.0° söder om väster; vec(C) är 17.8 m rakt söderut. Standardvinklarna från +x är 58°, 216° respektive 270°."
    }
  },
  "VP1.7.4": {
    "title": "Avsluta nordväst om startpunkten",
    "steps": [
      "Välj +x åt öster, +y åt norr och +z uppåt. En färdvägs förskjutning är den raka pilen från startpunkten till slutpunkten.",
      "Målets vinkel är 90°+37°=127°. Den andra förskjutningen är målets lägesvektor−A.",
      "Delsträcka 1 har komponenterna (38.37, 61.4, 0) m.",
      "Addera x-komponenterna, y-komponenterna och z-komponenterna var för sig: nuvarande förskjutning = (38.37, 61.4, 0) m.",
      "Det önskade slutläget är (-22.87, 30.35, 0) m. Återstående förskjutning = önskat läge − nuvarande läge = (-61.24, -31.05, 0) m.",
      "Resultat: (-61.24, -31.05, 0) m. Komponenterna anger värdena i x-, y- och z-led. En negativ komponent pekar längs axelns negativa riktning.",
      "Beräkna beloppet med Pythagoras sats: √[(-61.24)² + (-31.05)² + (0)²] = √(4713.88) ≈ 68.66 m.",
      "För riktningen väljer du kvadrant med hjälp av tecknen och använder sedan atan2(y,x): θ ≈ 206.9° moturs från +x. ”atan2” är en invers tangensfunktion som även tar hänsyn till kvadranten.",
      "Rita delsträckornas vektorer med varje pils början vid den föregående pilens spets. Resultanten går direkt från startpunkten till slutpunkten (eller från den nuvarande punkten till målet när en återstående delsträcka efterfrågas). På så sätt kontrollerar du tecknen och kvadranten.",
      "Både x- och y-komponenten är negativa, så riktningen ligger i kvadrant III. Detta besvarar uttryckligen den del av frågan som gäller kvadranten."
    ],
    "answer": "(-61.24, -31.05, 0) m; belopp ≈ 68.66 m; θ ≈ 206.9° moturs från öster; kvadrant III.",
    "interactive": [
      {
        "label": "Förskjutning",
        "units": "m"
      }
    ],
    "question": {
      "text": "En vandrare genomgår förskjutningen vec(A) som visas i exempel 1.7. Därefter gör hon en andra förskjutning så att hon hamnar 38.0 m från startpunkten, i riktningen 37.0° väster om norr räknat från startpunkten. Bestäm beloppet och riktningen för denna andra förskjutning. Ange riktningen som en vinkel mätt moturs från den positiva x-axeln och ange i vilken kvadrant vinkeln ligger.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": "Givet i exempel 1.7: vec(A) är 72.4 m i riktningen 32.0° öster om norr; vec(B) är 57.3 m i riktningen 36.0° söder om väster; vec(C) är 17.8 m rakt söderut. Standardvinklarna från +x är 58°, 216° respektive 270°."
    }
  },
  "VP1.10.1": {
    "title": "Beräkna en skalärprodukt från kompassriktningar",
    "steps": [
      "Omvandla A med vinkeln −36.9° och B med vinkeln 110° med hjälp av x=Lcosθ och y=Lsinθ. Dessa komponenter besvarar del (a); beräkningen av skalärprodukten besvarar del (b).",
      "A och B: A = (3.998, -3.002, 0); B = (-2.189, 6.014, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (3.998)×(-2.189) + (-3.002)×(6.014) + (0)×(0) = -26.81 .",
      "Beloppen är 5 och 6.4. Använd A·B = |A||B| cos θ och dividera med deras produkt: cos θ = -26.81/(5×6.4) = -0.8377.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 146.9°. En negativ skalärprodukt innebär en vinkel större än 90°."
    ],
    "answer": "A och B: A·B ≈ -26.81 ; vinkel ≈ 146.9°",
    "interactive": [
      {
        "label": "A och B",
        "units": ""
      }
    ],
    "question": {
      "text": "Vektorn vec(A) har beloppet 5.00 och riktningen 36.9° söder om öster. Vektorn vec(B) har beloppet 6.40 och riktningen 20.0° väster om norr.\n(a) Välj den positiva x-riktningen åt öster och den positiva y-riktningen åt norr. Bestäm komponenterna i vec(A) och vec(B).\n(b) Beräkna skalärprodukten vec(A) · vec(B).",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "VP1.10.2": {
    "title": "Kombinera polär form och komponentform",
    "steps": [
      "Omvandla först C till komponenter. D är redan angiven i komponentform.",
      "C och D: A = (3.728, 5.324, 0); B = (4.8, -8.4, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (3.728)×(4.8) + (5.324)×(-8.4) + (0)×(0) = -26.83 .",
      "Beloppen är 6.5 och 9.675. Använd A·B = |A||B| cos θ och dividera med deras produkt: cos θ = -26.83/(6.5×9.675) = -0.4266.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 115.3°. En negativ skalärprodukt innebär en vinkel större än 90°."
    ],
    "answer": "C och D: A·B ≈ -26.83 ; vinkel ≈ 115.3°",
    "interactive": [
      {
        "label": "C och D",
        "units": ""
      }
    ],
    "question": {
      "text": "Vektorn vec(C) har beloppet 6.50 och vinkeln 55.0° mätt moturs från +x-axeln mot +y-axeln. Vektorn vec(D) har komponenterna Dₓ = +4.80 och Dᵧ = −8.40.\n(a) Beräkna skalärprodukten vec(C) · vec(D).\n(b) Bestäm vinkeln φ mellan vektorerna vec(C) och vec(D).",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "VP1.10.3": {
    "title": "En nästan rät vinkel i 3D",
    "steps": [
      "Ta med alla tre komponentprodukterna även när en av dem är noll. Den lilla negativa skalärprodukten innebär en något trubbig vinkel.",
      "A och B: A = (-5, 3, 0); B = (2.5, 4, -1.5). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (-5)×(2.5) + (3)×(4) + (0)×(-1.5) = -0.5 .",
      "Beloppen är 5.831 och 4.95. Använd A·B = |A||B| cos θ och dividera med deras produkt: cos θ = -0.5/(5.831×4.95) = -0.01732.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 90.99°. En negativ skalärprodukt innebär en vinkel större än 90°."
    ],
    "answer": "A och B: A·B ≈ -0.5 ; vinkel ≈ 90.99°",
    "interactive": [
      {
        "label": "A och B",
        "units": ""
      }
    ],
    "question": {
      "text": "Vektorn vec(A) har komponenterna Aₓ = −5.00, Aᵧ = 3.00 och A_z = 0. Vektorn vec(B) har komponenterna Bₓ = 2.50, Bᵧ = 4.00 och B_z = −1.50. Bestäm vinkeln mellan de två vektorerna.",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "VP1.10.4": {
    "title": "Bestäm en okänd kraftkomponent",
    "steps": [
      "W=F·s=Fx sx+Fy sy. Sätt in de kända storheterna: 26=(−12)(4)+5Fy.",
      "26=−48+5Fy. Addera 48 till båda leden: 74=5Fy. Dividera med 5: Fy=14.8 N.",
      "Använd nu F=(−12,14.8,0) N för att bestämma vinkeln mot s.",
      "Kraft och förskjutning: A = (-12, 14.8, 0); B = (4, 5, 0). En skalärprodukt är ett enda tal, inte en pil.",
      "Multiplicera motsvarande komponenter och addera: (-12)×(4) + (14.8)×(5) + (0)×(0) = 26 J.",
      "Beloppen är 19.05 och 6.403. Använd A·B = |A||B| cos θ och dividera med deras produkt: cos θ = 26/(19.05×6.403) = 0.2131.",
      "Invers cosinus besvarar frågan ”vilken vinkel ger detta cosinusvärde?” θ ≈ 77.7°. En negativ skalärprodukt innebär en vinkel större än 90°."
    ],
    "answer": "(a) Fy = 14.8 N.\n(b) Vinkeln ≈ 77.7°.",
    "interactive": [
      {
        "label": "Kraft och förskjutning",
        "units": "J"
      }
    ],
    "question": {
      "text": "Om en kraft vec(F) verkar på ett föremål medan föremålet genomgår en förskjutning vec(s) är arbetet som kraften utför lika med skalärprodukten av vec(F) och vec(s): W = vec(F) · vec(s). Ett föremål genomgår förskjutningen vec(s) = (4.00 m)î + (5.00 m)ĵ. Under rörelsen påverkas det av kraften vec(F), vars x-komponent är Fₓ = −12.0 N (1 N = 1 newton är SI-enheten för kraft). Arbetet som denna kraft utför är 26.0 N·m = 26.0 J (1 J = 1 joule = 1 newtonmeter är SI-enheten för arbete).\n(a) Bestäm y-komponenten av vec(F).\n(b) Bestäm vinkeln mellan vec(F) och vec(s).",
      "passage": null,
      "table": null,
      "figure": null,
      "reference": null
    }
  },
  "Bridge": {
    "title": "Vektorer på taket",
    "steps": [
      "Tyngdkraften pekar lodrätt nedåt. Dela upp den i en del som trycker in mot taket och en del som drar nedför taklutningen.",
      "Den vinkelräta komponenten är Wcos35°. Vid den tillåtna gränsen gäller Wcos35°=425 N.",
      "Dividera med cos35°: W=425/cos35°≈518.8 N, eller ungefär 5.2×10² N.",
      "Komponenten nedför taklutningen är Wsin35°≈297.6 N. Bara denna komponent utför arbete under rörelsen längs taket.",
      "Arbete=(Wsin35°)(1.50 m)≈446.4 J≈4.5×10² J.",
      "Alternativt är vinkeln mellan den nedåtriktade tyngdkraften och rörelsen nedför taket 55°, så W×1.50×cos55° ger samma resultat. Arbetet är positivt eftersom tyngdkraften hjälper glidningen."
    ],
    "answer": "Största tyngd ≈5.2×10² N; arbete ≈4.5×10² J",
    "interactive": [
      {
        "label": "Tyngdkraft och förskjutning vid glidning",
        "units": "J"
      }
    ],
    "question": {
      "text": "Vektorer på taket. Ett luftkonditioneringsaggregat är fastsatt på ett tak som lutar 35° över horisontalplanet (figur 1.33). Dess tyngd är en kraft vec(F) på aggregatet som är riktad lodrätt nedåt. För att aggregatet inte ska krossa takpannorna får tyngdkraftens komponent vinkelrätt mot taket inte överstiga 425 N. (En newton, eller 1 N, är SI-enheten för kraft.)\n(a) Vilken är aggregatets största tillåtna tyngd?\n(b) Om fästena lossnar glider aggregatet 1.50 m längs taket innan det stannar mot en kant. Hur stort arbete utför tyngdkraften på aggregatet under glidningen om dess tyngd är den som beräknades i del (a)?\nArbetet som en kraft vec(F) utför på ett föremål som genomgår förskjutningen vec(s) är W = vec(F) · vec(s).",
      "passage": null,
      "table": null,
      "figure": {
        "file": "figure-1-33.svg",
        "caption": "Figur 1.33 — Ett luftkonditioneringsaggregat på ett lutande tak",
        "alt": "Taket lutar 35° över horisontalplanet. Tyngdkraften F pekar lodrätt nedåt. Glidsträckan längs taket är 1.50 m; x är parallell med taket och y vinkelrät mot det."
      },
      "reference": null
    }
  }
};
  Object.assign(window.PhysicsLocales.sv.items, items);
})();
