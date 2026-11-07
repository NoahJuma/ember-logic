/* Chapter 1 foundations. Source questions: Brookshear & Brylow, Computer Science: An Overview, 13th Global Edition, pp. 47–64 and 102–104. Original bilingual worked solutions. */
window.CSChapter.exercises.push(...[
  {
    "id": "section-1.1-1",
    "section": "1.1",
    "number": "1",
    "kind": "section",
    "page": 47,
    "title": {
      "en": "When does the circuit output 1?",
      "sv": "När ger kretsen utsignalen 1?"
    },
    "question": {
      "en": "What input bit patterns will cause the following circuit to produce an output of 1?",
      "sv": "Vilka bitmönster på ingångarna får följande krets att ge utsignalen 1?"
    },
    "steps": {
      "en": [
        "Name the three inputs A, B and C, from top to bottom. A bit is one value, either 0 or 1. The curved gate with an extra curved line is XOR; the last, rounded gate is AND.",
        "Start at the output. AND gives 1 only if BOTH of its inputs are 1. Its lower input is C, so C must be 1. Its upper input comes from XOR, so that result must also be 1.",
        "XOR gives 1 when its two inputs are different. Therefore (A, B) must be (0, 1) or (1, 0). Equal inputs, 00 or 11, would give XOR = 0 and would fail at the AND gate.",
        "Attach the required final bit C = 1. Check 011: (0 XOR 1) AND 1 = 1 AND 1 = 1. Check 101: (1 XOR 0) AND 1 = 1. No other pattern satisfies both requirements."
      ],
      "sv": [
        "Kalla de tre ingångarna A, B och C, uppifrån och ned. En bit är ett värde: antingen 0 eller 1. Den böjda grinden med en extra böjd linje är XOR. Den sista, rundade grinden är AND.",
        "Börja vid utgången. AND ger 1 endast när BÅDA dess ingångar är 1. Den nedre ingången är C, så C måste vara 1. Den övre kommer från XOR, så även det resultatet måste vara 1.",
        "XOR ger 1 när dess två ingångar är olika. Därför måste (A, B) vara (0, 1) eller (1, 0). Lika ingångar, 00 eller 11, skulle ge XOR = 0 och därmed 0 från AND-grinden.",
        "Lägg till den nödvändiga sista biten C = 1. Kontrollera 011: (0 XOR 1) AND 1 = 1 AND 1 = 1. Kontrollera 101: (1 XOR 0) AND 1 = 1. Inget annat mönster uppfyller båda kraven."
      ]
    },
    "answer": {
      "en": "011 and 101, read from the top input to the bottom input.",
      "sv": "011 och 101, lästa från den översta ingången till den nedersta."
    },
    "figures": [
      {
        "file": {
          "en": "foundations-q1-en.svg",
          "sv": "foundations-q1-sv.svg"
        },
        "caption": {
          "en": "Section 1.1, question 1: three inputs.",
          "sv": "Avsnitt 1.1, uppgift 1: tre ingångar."
        },
        "alt": {
          "en": "The upper two inputs enter XOR. Its output and the bottom input enter AND.",
          "sv": "De två översta ingångarna går till XOR. Dess utgång och den nedersta ingången går till AND."
        }
      }
    ]
  },
  {
    "id": "section-1.1-2",
    "section": "1.1",
    "number": "2",
    "kind": "section",
    "page": 47,
    "title": {
      "en": "Reset a stored bit",
      "sv": "Nollställ en lagrad bit"
    },
    "question": {
      "en": "In the text, we claimed that placing a 1 on the lower input of the flip-flop in Figure 1.3 (while holding the upper input at 0) will force the flip-flop’s output to be 0. Describe the sequence of events that occurs within the flip-flop in this case.",
      "sv": "I texten hävdade vi att en 1:a på den nedre ingången till vippan i figur 1.3, medan den övre ingången hålls på 0, tvingar vippans utsignal till 0. Beskriv händelseförloppet inne i vippan i detta fall."
    },
    "steps": {
      "en": [
        "A flip-flop is a small circuit that remembers one bit. Feedback means that an output is led back to an input. In this drawing the visible output comes from the upper OR gate.",
        "Set the lower external input to 1. It first enters NOT, which reverses a bit: NOT 1 = 0. This 0 reaches one input of the lower AND gate.",
        "AND needs two 1s to give 1. Because one input is now 0, its output becomes 0 regardless of the old stored value on its other input. That 0 travels up to OR.",
        "The upper external input is also 0, so OR receives 0 and 0. OR gives 1 only when at least one input is 1; here its output is 0. The feedback wire now carries 0 as well.",
        "If the lower input returns to 0, NOT becomes 1, but AND still receives the feedback 0. Thus AND stays 0 and OR stays 0. The circuit remembers the reset after the pulse ends."
      ],
      "sv": [
        "En vippa är en liten krets som minns en bit. Återkoppling betyder att en utsignal leds tillbaka till en ingång. I den här bilden kommer den synliga utsignalen från den övre OR-grinden.",
        "Sätt den nedre yttre ingången till 1. Den går först till NOT, som vänder på biten: NOT 1 = 0. Denna 0:a når en ingång till den nedre AND-grinden.",
        "AND behöver två 1:or för att ge 1. Eftersom en ingång nu är 0 blir utsignalen 0 oavsett det gamla lagrade värdet på den andra ingången. Denna 0:a går upp till OR.",
        "Den övre yttre ingången är också 0, så OR tar emot 0 och 0. OR ger 1 om minst en ingång är 1. Här blir utsignalen 0. Även återkopplingsledningen bär nu 0.",
        "Om den nedre ingången återgår till 0 blir NOT-utgången 1, men AND tar fortfarande emot återkopplingens 0. Därför förblir AND 0 och OR 0. Kretsen minns nollställningen även när pulsen har upphört."
      ]
    },
    "answer": {
      "en": "Lower input 1 → NOT 0 → AND 0 → OR output 0. With both external inputs subsequently 0, the stored output remains 0.",
      "sv": "Nedre ingång 1 → NOT 0 → AND 0 → OR-utgång 0. Om båda yttre ingångarna därefter är 0 förblir den lagrade utsignalen 0."
    },
    "figures": [
      {
        "file": {
          "en": "foundations-fig13-en.svg",
          "sv": "foundations-fig13-sv.svg"
        },
        "caption": {
          "en": "Figure 1.3: the feedback circuit used in the question.",
          "sv": "Figur 1.3: återkopplingskretsen som uppgiften hänvisar till."
        },
        "alt": {
          "en": "Upper input goes to OR. Lower input goes through NOT and AND into OR. OR output feeds back to AND.",
          "sv": "Övre ingången går till OR. Nedre ingången går genom NOT och AND till OR. OR-utgången återkopplas till AND."
        }
      }
    ]
  },
  {
    "id": "section-1.1-3",
    "section": "1.1",
    "number": "3",
    "kind": "section",
    "page": 47,
    "title": {
      "en": "Set a flip-flop",
      "sv": "Sätt en vippa till 1"
    },
    "question": {
      "en": "Assuming that both inputs to the flip-flop in Figure 1.5 begin as 0, describe the sequence of events that occurs when the upper input is temporarily set to 1.",
      "sv": "Anta att båda ingångarna till vippan i figur 1.5 från början är 0. Beskriv händelseförloppet när den övre ingången tillfälligt sätts till 1."
    },
    "steps": {
      "en": [
        "There are two OR gates, each followed by NOT. The output of each pair feeds the other pair. The visible stored output is at the LOWER NOT gate. Having both external inputs 0 means “keep the previous bit”; it does not tell us which bit was previously stored.",
        "Temporarily change the upper external input to 1. The upper OR must then output 1, whatever its feedback input is. Its following NOT changes that 1 to 0.",
        "That 0 reaches the lower OR. Its other, external input is still 0. Therefore lower OR = 0 OR 0 = 0, and lower NOT = 1. The visible output becomes 1.",
        "The lower output 1 feeds back into the upper OR. When the upper external input returns to 0, upper OR still sees the feedback 1, so it remains 1. The remaining values therefore stay unchanged."
      ],
      "sv": [
        "Det finns två OR-grindar, var och en följd av NOT. Utgången från varje par återkopplas till det andra paret. Den synliga lagrade utsignalen finns vid den NEDRE NOT-grinden. Två yttre ingångar med värdet 0 betyder ”behåll föregående bit”; det säger inte vilken bit som var lagrad.",
        "Ändra tillfälligt den övre yttre ingången till 1. Då måste den övre OR-grinden ge 1 oavsett återkopplingens värde. Efterföljande NOT ändrar denna 1:a till 0.",
        "Denna 0:a når den nedre OR-grinden. Dess andra, yttre ingång är fortfarande 0. Därför blir nedre OR = 0 OR 0 = 0 och nedre NOT = 1. Den synliga utsignalen blir 1.",
        "Den nedre utgångens 1:a återkopplas till den övre OR-grinden. När den övre yttre ingången återgår till 0 har övre OR fortfarande återkopplingens 1:a och fortsätter att ge 1. Övriga värden förblir därför oförändrade."
      ]
    },
    "answer": {
      "en": "The pulse sets and stores output 1. The feedback maintains it after the upper input returns to 0.",
      "sv": "Pulsen sätter och lagrar utsignalen 1. Återkopplingen behåller den när den övre ingången återgår till 0."
    },
    "figures": [
      {
        "file": {
          "en": "foundations-fig15-en.svg",
          "sv": "foundations-fig15-sv.svg"
        },
        "caption": {
          "en": "Figure 1.5: two cross-coupled OR–NOT pairs.",
          "sv": "Figur 1.5: två korskopplade OR–NOT-par."
        },
        "alt": {
          "en": "Two OR gates each followed by NOT, with crossed feedback wires. Output is taken from the lower NOT. The crossing wires are not connected.",
          "sv": "Två OR-grindar följs av var sin NOT och har korsande återkopplingsledningar. Utgången tas från nedre NOT. Ledningarna är inte förbundna där de korsas."
        }
      }
    ]
  },
  {
    "id": "section-1.1-4",
    "section": "1.1",
    "number": "4",
    "kind": "section",
    "page": 47,
    "title": {
      "en": "Recognize combined gates",
      "sv": "Känn igen kombinerade grindar"
    },
    "question": {
      "en": "a. If the output of an AND gate is passed through a NOT gate, the combination computes the Boolean operation called NAND, which has an output of 0 only when both its inputs are 1. The symbol for a NAND gate is the same as an AND gate except that it has a circle at its output. The following is a circuit containing a NAND gate. What Boolean operation does the circuit compute?\n\nb. If the output of an OR gate is passed through a NOT gate, the combination computes the Boolean operation called NOR that has an output of 1 only when both its inputs are 0. The symbol for a NOR gate is the same as an OR gate except that it has a circle at its output. The following is a circuit containing an AND gate and two NOR gates. What Boolean operation does the circuit compute?",
      "sv": "a. Om utsignalen från en AND-grind leds genom en NOT-grind beräknar kombinationen den booleska operationen NAND, som ger utsignalen 0 endast när båda ingångarna är 1. Symbolen för NAND är densamma som för AND, men har en cirkel vid utgången. Följande krets innehåller en NAND-grind. Vilken boolesk operation beräknar kretsen?\n\nb. Om utsignalen från en OR-grind leds genom en NOT-grind beräknar kombinationen den booleska operationen NOR, som ger utsignalen 1 endast när båda ingångarna är 0. Symbolen för NOR är densamma som för OR, men har en cirkel vid utgången. Följande krets innehåller en AND-grind och två NOR-grindar. Vilken boolesk operation beräknar kretsen?"
    },
    "steps": {
      "en": [
        "Call the external inputs A and B. To identify a circuit, test all four possible input pairs: 00, 01, 10 and 11. A truth table is simply a list of these tests and their results.",
        "Part a first reverses each input, then applies NAND. For 00 the reversed inputs are 11 and NAND gives 0. For 01 they are 10 and NAND gives 1. For 10 they are 01 and NAND gives 1. For 11 they are 00 and NAND gives 1.",
        "The outputs in part a are therefore 0, 1, 1, 1. This is OR: the result is 1 whenever at least one original input is 1. In symbols: NOT((NOT A) AND (NOT B)) = A OR B.",
        "Part b computes an upper result P = A AND B and a lower result R = NOT(A OR B), then outputs NOT(P OR R). Follow every case: 00 → P = 0, R = 1 → output 0; 01 → P = 0, R = 0 → output 1; 10 → P = 0, R = 0 → output 1; 11 → P = 1, R = 0 → output 0.",
        "The outputs in part b are 0, 1, 1, 0. This is XOR, because exactly one original input must be 1. Unlike OR, XOR gives 0 when both inputs are 1."
      ],
      "sv": [
        "Kalla de yttre ingångarna A och B. För att identifiera en krets testar vi alla fyra möjliga ingångspar: 00, 01, 10 och 11. En sanningstabell är helt enkelt en lista över dessa tester och deras resultat.",
        "I del a vänds först varje ingång, och därefter används NAND. För 00 blir de omvända ingångarna 11 och NAND ger 0. För 01 blir de 10 och NAND ger 1. För 10 blir de 01 och NAND ger 1. För 11 blir de 00 och NAND ger 1.",
        "Utsignalerna i del a är alltså 0, 1, 1, 1. Det är OR: resultatet är 1 när minst en ursprunglig ingång är 1. Med symboler: NOT((NOT A) AND (NOT B)) = A OR B.",
        "I del b beräknas ett övre resultat P = A AND B och ett nedre resultat R = NOT(A OR B). Därefter blir utsignalen NOT(P OR R). Följ varje fall: 00 → P = 0, R = 1 → utsignal 0; 01 → P = 0, R = 0 → utsignal 1; 10 → P = 0, R = 0 → utsignal 1; 11 → P = 1, R = 0 → utsignal 0.",
        "Utsignalerna i del b är 0, 1, 1, 0. Det är XOR, eftersom exakt en ursprunglig ingång måste vara 1. Till skillnad från OR ger XOR 0 när båda ingångarna är 1."
      ]
    },
    "answer": {
      "en": "a. OR. b. XOR (exclusive OR).",
      "sv": "a. OR (eller). b. XOR (exklusivt eller)."
    },
    "figures": [
      {
        "file": {
          "en": "foundations-q4a-en.svg",
          "sv": "foundations-q4a-sv.svg"
        },
        "caption": {
          "en": "Part a: two NOT gates followed by NAND.",
          "sv": "Del a: två NOT-grindar följda av NAND."
        },
        "alt": {
          "en": "Each input is inverted and the two inverted values enter NAND.",
          "sv": "Varje ingång inverteras och de två inverterade värdena går till NAND."
        }
      },
      {
        "file": {
          "en": "foundations-q4b-en.svg",
          "sv": "foundations-q4b-sv.svg"
        },
        "caption": {
          "en": "Part b: an AND branch and a NOR branch feed a final NOR.",
          "sv": "Del b: en AND-gren och en NOR-gren går till en sista NOR."
        },
        "alt": {
          "en": "Both original inputs feed AND and NOR. The outputs of these two gates feed a final NOR gate.",
          "sv": "Båda ursprungliga ingångarna går till AND och NOR. Utgångarna från dessa två grindar går till en sista NOR-grind."
        }
      }
    ]
  },
  {
    "id": "section-1.1-5",
    "section": "1.1",
    "number": "5",
    "kind": "section",
    "page": 48,
    "title": {
      "en": "Binary to hexadecimal",
      "sv": "Binärt till hexadecimalt"
    },
    "question": {
      "en": "Use hexadecimal notation to represent the following bit patterns:\na. 0110101011110010\nb. 111010000101010100010111\nc. 01001000",
      "sv": "Använd hexadecimal notation för att representera följande bitmönster:\na. 0110101011110010\nb. 111010000101010100010111\nc. 01001000"
    },
    "steps": {
      "en": [
        "One hexadecimal digit stands for exactly four bits. Group the bits in fours from the right. Within a group, the places are worth 8, 4, 2 and 1. Add the places containing 1. Values 10–15 are written A, B, C, D, E, F.",
        "a. 0110 | 1010 | 1111 | 0010 → (4 + 2) | (8 + 2) | (8 + 4 + 2 + 1) | 2 → 6 | A | F | 2. Keep the groups in the same order.",
        "b. 1110 | 1000 | 0101 | 0101 | 0001 | 0111 → 14 | 8 | 5 | 5 | 1 | 7 → E | 8 | 5 | 5 | 1 | 7.",
        "c. 0100 | 1000 → 4 | 8. The prefix 0x tells the reader that the following digits are hexadecimal; it is not an extra stored digit."
      ],
      "sv": [
        "En hexadecimal siffra motsvarar exakt fyra bitar. Dela in bitarna i grupper om fyra från höger. Platserna i en grupp är värda 8, 4, 2 och 1. Addera värdena där det står 1. Värdena 10–15 skrivs A, B, C, D, E, F.",
        "a. 0110 | 1010 | 1111 | 0010 → (4 + 2) | (8 + 2) | (8 + 4 + 2 + 1) | 2 → 6 | A | F | 2. Behåll gruppernas ordning.",
        "b. 1110 | 1000 | 0101 | 0101 | 0001 | 0111 → 14 | 8 | 5 | 5 | 1 | 7 → E | 8 | 5 | 5 | 1 | 7.",
        "c. 0100 | 1000 → 4 | 8. Prefixet 0x talar om att siffrorna som följer är hexadecimala. Det är inte en extra lagrad siffra."
      ]
    },
    "answer": {
      "en": "a. 0x6AF2\nb. 0xE85517\nc. 0x48",
      "sv": "a. 0x6AF2\nb. 0xE85517\nc. 0x48"
    }
  },
  {
    "id": "section-1.1-6",
    "section": "1.1",
    "number": "6",
    "kind": "section",
    "page": 48,
    "title": {
      "en": "Hexadecimal to bits",
      "sv": "Hexadecimalt till bitar"
    },
    "question": {
      "en": "What bit patterns are represented by the following hexadecimal patterns?\na. 0x5FD97\nb. 0x610A\nc. 0xABCD\nd. 0x0100",
      "sv": "Vilka bitmönster representeras av följande hexadecimala mönster?\na. 0x5FD97\nb. 0x610A\nc. 0xABCD\nd. 0x0100"
    },
    "steps": {
      "en": [
        "Ignore the notation prefix 0x. Replace each hexadecimal digit with four bits, using place values 8, 4, 2, 1. Keep leading zeros within each four-bit group so that digit boundaries remain correct.",
        "a. 5 = 4 + 1 → 0101; F = 15 → 1111; D = 13 = 8 + 4 + 1 → 1101; 9 = 8 + 1 → 1001; 7 = 4 + 2 + 1 → 0111. Join these groups in order.",
        "b. 6 → 0110; 1 → 0001; 0 → 0000; A = 10 → 1010. The zero digit contributes four zero bits, not an empty space.",
        "c. A = 10 → 1010; B = 11 → 1011; C = 12 → 1100; D = 13 → 1101.",
        "d. 0 → 0000; 1 → 0001; 0 → 0000; 0 → 0000. Retain the first zero group because the question asks for the represented bit pattern."
      ],
      "sv": [
        "Bortse från notationens prefix 0x. Ersätt varje hexadecimal siffra med fyra bitar med platsvärdena 8, 4, 2, 1. Behåll inledande nollor inom varje grupp så att gränserna mellan siffrorna blir rätt.",
        "a. 5 = 4 + 1 → 0101; F = 15 → 1111; D = 13 = 8 + 4 + 1 → 1101; 9 = 8 + 1 → 1001; 7 = 4 + 2 + 1 → 0111. Sätt samman grupperna i ordning.",
        "b. 6 → 0110; 1 → 0001; 0 → 0000; A = 10 → 1010. Nollsiffran bidrar med fyra nollbitar, inte ett tomt utrymme.",
        "c. A = 10 → 1010; B = 11 → 1011; C = 12 → 1100; D = 13 → 1101.",
        "d. 0 → 0000; 1 → 0001; 0 → 0000; 0 → 0000. Behåll den första nollgruppen eftersom uppgiften frågar efter det representerade bitmönstret."
      ]
    },
    "answer": {
      "en": "a. 0101 1111 1101 1001 0111\nb. 0110 0001 0000 1010\nc. 1010 1011 1100 1101\nd. 0000 0001 0000 0000",
      "sv": "a. 0101 1111 1101 1001 0111\nb. 0110 0001 0000 1010\nc. 1010 1011 1100 1101\nd. 0000 0001 0000 0000"
    }
  },
  {
    "id": "section-1.2-1",
    "section": "1.2",
    "number": "1",
    "kind": "section",
    "page": 51,
    "title": {
      "en": "An address is not its contents",
      "sv": "En adress är inte dess innehåll"
    },
    "question": {
      "en": "If the memory cell whose address is 5 contains the value 8, what is the difference between writing the value 5 into cell number 6 and moving the contents of cell number 5 into cell number 6?",
      "sv": "Om minnescellen med adress 5 innehåller värdet 8, vad är skillnaden mellan att skriva värdet 5 i cell nummer 6 och att flytta innehållet i cell nummer 5 till cell nummer 6?"
    },
    "steps": {
      "en": [
        "Think of memory cells as numbered boxes. The address is the number on a box; its contents are what is inside. Box 5 contains the value 8, so address 5 and stored value 8 play different roles.",
        "“Write the value 5 into cell 6” gives the value directly. Put 5 in box 6 without looking inside box 5. Cell 6 then contains 5.",
        "“Move the contents of cell 5 into cell 6” first uses 5 as an address. Read box 5, obtaining 8, and put that value in box 6. Cell 6 then contains 8. Here a memory move copies the value; it does not empty the source cell."
      ],
      "sv": [
        "Tänk på minnesceller som numrerade lådor. Adressen är numret på lådan; innehållet är det som ligger inuti. Låda 5 innehåller värdet 8, så adressen 5 och det lagrade värdet 8 har olika roller.",
        "”Skriv värdet 5 i cell 6” anger värdet direkt. Lägg 5 i låda 6 utan att titta i låda 5. Cell 6 innehåller då 5.",
        "”Flytta innehållet i cell 5 till cell 6” använder först 5 som adress. Läs låda 5, vilket ger 8, och lägg det värdet i låda 6. Cell 6 innehåller då 8. Här kopierar en minnesflytt värdet; källcellen töms inte."
      ]
    },
    "answer": {
      "en": "Writing the literal value gives cell 6 = 5. Copying the contents at address 5 gives cell 6 = 8.",
      "sv": "Att skriva det direkta värdet ger cell 6 = 5. Att kopiera innehållet på adress 5 ger cell 6 = 8."
    }
  },
  {
    "id": "section-1.2-2",
    "section": "1.2",
    "number": "2",
    "kind": "section",
    "page": 51,
    "title": {
      "en": "Why the attempted swap fails",
      "sv": "Varför det tänkta bytet misslyckas"
    },
    "question": {
      "en": "Suppose you want to interchange the values stored in memory cells 2 and 3. What is wrong with the following sequence of steps:\nStep 1. Move the contents of cell number 2 to cell number 3.\nStep 2. Move the contents of cell number 3 to cell number 2.",
      "sv": "Anta att du vill byta plats på värdena i minnescellerna 2 och 3. Vad är fel med följande steg:\nSteg 1. Flytta innehållet i cell nummer 2 till cell nummer 3.\nSteg 2. Flytta innehållet i cell nummer 3 till cell nummer 2."
    },
    "steps": {
      "en": [
        "Use concrete starting values: cell 2 = 7 and cell 3 = 9. A successful swap would end with cell 2 = 9 and cell 3 = 7.",
        "The first instruction copies 7 from cell 2 into cell 3. Cell 3 previously contained 9, but writing 7 replaces it. The memory is now cell 2 = 7 and cell 3 = 7. The only copy of 9 has been lost.",
        "The second instruction reads the CURRENT value of cell 3, which is now 7, and copies it to cell 2. It cannot recover the old 9. Both cells remain 7.",
        "The same problem occurs for any two different starting values. Before overwriting a value that you still need, save it somewhere else. The next question constructs that correct swap."
      ],
      "sv": [
        "Använd konkreta startvärden: cell 2 = 7 och cell 3 = 9. Ett lyckat byte skulle ge cell 2 = 9 och cell 3 = 7.",
        "Den första instruktionen kopierar 7 från cell 2 till cell 3. Cell 3 innehöll 9, men när 7 skrivs dit ersätts det. Nu gäller cell 2 = 7 och cell 3 = 7. Den enda kopian av 9 har gått förlorad.",
        "Den andra instruktionen läser det NUVARANDE värdet i cell 3, som nu är 7, och kopierar det till cell 2. Den kan inte återställa den gamla 9:an. Båda cellerna förblir 7.",
        "Samma problem uppstår för vilka två olika startvärden som helst. Innan du skriver över ett värde som du fortfarande behöver måste du spara det någon annanstans. Nästa uppgift konstruerar ett korrekt byte."
      ]
    },
    "answer": {
      "en": "The first step destroys the original contents of cell 3. The two steps leave both cells containing the original contents of cell 2.",
      "sv": "Det första steget förstör det ursprungliga innehållet i cell 3. Efter båda stegen innehåller båda cellerna det ursprungliga innehållet i cell 2."
    }
  },
  {
    "id": "section-1.2-3",
    "section": "1.2",
    "number": "3",
    "kind": "section",
    "page": 51,
    "title": {
      "en": "Swap values safely",
      "sv": "Byt plats på värden utan att förlora dem"
    },
    "question": {
      "en": "Design a sequence of steps that correctly interchanges the contents of these cells. If needed, you may use additional cells.\n\nReference from question 2: the two cells are memory cells 2 and 3.",
      "sv": "Utforma en följd av steg som korrekt byter plats på innehållet i dessa celler. Du får använda ytterligare celler om det behövs.\n\nHänvisningen i uppgift 2 gäller minnescellerna 2 och 3."
    },
    "steps": {
      "en": [
        "Choose a spare memory cell, for example cell 1, whose previous contents may safely be replaced. It will be a temporary holding box. Start with cell 2 = A and cell 3 = B; A and B mean the original values.",
        "Copy cell 2 to cell 1. Now cell 1 = A, cell 2 = A, cell 3 = B. Saving A means we can next overwrite cell 2 without losing A.",
        "Copy cell 3 to cell 2. Now cell 1 = A, cell 2 = B, cell 3 = B. The first destination has its correct final value.",
        "Copy cell 1 to cell 3. Now cell 2 = B and cell 3 = A. Both original values are preserved and their positions are exchanged. For starting values 7 and 9, the result is 9 and 7."
      ],
      "sv": [
        "Välj en ledig minnescell, till exempel cell 1, vars tidigare innehåll får ersättas. Den blir en tillfällig förvaringslåda. Börja med cell 2 = A och cell 3 = B; A och B betecknar ursprungsvärdena.",
        "Kopiera cell 2 till cell 1. Nu är cell 1 = A, cell 2 = A och cell 3 = B. Genom att spara A kan vi sedan skriva över cell 2 utan att förlora A.",
        "Kopiera cell 3 till cell 2. Nu är cell 1 = A, cell 2 = B och cell 3 = B. Den första målcellen har sitt rätta slutvärde.",
        "Kopiera cell 1 till cell 3. Nu är cell 2 = B och cell 3 = A. Båda ursprungsvärdena finns kvar och har bytt plats. Om startvärdena var 7 och 9 blir resultatet 9 och 7."
      ]
    },
    "answer": {
      "en": "1. Copy cell 2 → spare cell 1.\n2. Copy cell 3 → cell 2.\n3. Copy spare cell 1 → cell 3.",
      "sv": "1. Kopiera cell 2 → ledig cell 1.\n2. Kopiera cell 3 → cell 2.\n3. Kopiera ledig cell 1 → cell 3."
    }
  },
  {
    "id": "section-1.2-4",
    "section": "1.2",
    "number": "4",
    "kind": "section",
    "page": 51,
    "title": {
      "en": "Convert memory capacity to bits",
      "sv": "Omvandla minneskapacitet till bitar"
    },
    "question": {
      "en": "How many bits would be in the memory of a computer with 4KB memory?",
      "sv": "Hur många bitar finns i minnet på en dator med 4 KB minne?"
    },
    "steps": {
      "en": [
        "First identify the units. One byte contains 8 bits. The book uses the historical memory convention 1 KB = 1,024 bytes, explicitly illustrated in this section.",
        "Convert kilobytes to bytes: 4 × 1,024 = 4,096 bytes. We multiply because each of the four units contains 1,024 bytes.",
        "Convert bytes to bits: 4,096 × 8 = 32,768 bits. Check the unit chain: KB → bytes → bits.",
        "Unit clarification: today the unambiguous binary unit is KiB, so 4 KiB = 32,768 bits. If 4 kB instead means 4,000 bytes in decimal notation, it equals 32,000 bits. The textbook question uses the first convention."
      ],
      "sv": [
        "Identifiera först enheterna. En byte innehåller 8 bitar. Boken använder den historiska minneskonventionen 1 KB = 1 024 byte, vilket förklaras i avsnittet.",
        "Omvandla kilobyte till byte: 4 × 1 024 = 4 096 byte. Vi multiplicerar eftersom var och en av de fyra enheterna innehåller 1 024 byte.",
        "Omvandla byte till bitar: 4 096 × 8 = 32 768 bitar. Kontrollera enhetskedjan: KB → byte → bitar.",
        "Enhetsförtydligande: den entydiga binära enheten är KiB, så 4 KiB = 32 768 bitar. Om 4 kB i stället betyder 4 000 byte enligt decimal notation blir det 32 000 bitar. Bokens uppgift använder den första konventionen."
      ]
    },
    "answer": {
      "en": "32,768 bits using the book’s 1 KB = 1,024 bytes convention.",
      "sv": "32 768 bitar med bokens konvention 1 KB = 1 024 byte."
    }
  },
  {
    "id": "section-1.3-1",
    "section": "1.3",
    "number": "1",
    "kind": "section",
    "page": 56,
    "title": {
      "en": "Why spin a disk faster?",
      "sv": "Varför låta en skiva snurra snabbare?"
    },
    "question": {
      "en": "What is gained by increasing the rotation speed of a disk or CD?",
      "sv": "Vad vinner man på att öka rotationshastigheten hos en hårddisk eller CD-skiva?"
    },
    "steps": {
      "en": [
        "The stored data travels past a reading point as the disk spins. Even after the reader reaches the right track, it may have to wait for the requested data to come around. This is rotational delay.",
        "A faster rotation makes one full turn take less time. Therefore the average waiting time for the right sector becomes shorter. For example, halving the time per revolution halves the average rotational wait.",
        "With the same data layout, more recorded bits pass the reader each second. If the drive electronics can keep up, the data transfer rate increases. Spinning faster does not by itself shorten the time needed to move a hard-disk head to another track."
      ],
      "sv": [
        "De lagrade uppgifterna passerar en läspunkt när skivan snurrar. Även när läsaren har nått rätt spår kan den behöva vänta på att önskad data ska komma runt. Det kallas rotationsfördröjning.",
        "Snabbare rotation gör att ett varv tar kortare tid. Därför minskar den genomsnittliga väntetiden på rätt sektor. Om tiden per varv halveras, halveras även den genomsnittliga rotationsväntan.",
        "Med samma datalayout passerar fler lagrade bitar läsaren varje sekund. Om elektroniken hinner med ökar dataöverföringshastigheten. Snabbare rotation minskar däremot inte i sig tiden för att flytta ett hårddiskhuvud till ett annat spår."
      ]
    },
    "answer": {
      "en": "Shorter rotational delay and, with the same layout and suitable electronics, faster data transfer.",
      "sv": "Kortare rotationsfördröjning och, med samma layout och tillräcklig elektronik, snabbare dataöverföring."
    }
  },
  {
    "id": "section-1.3-2",
    "section": "1.3",
    "number": "2",
    "kind": "section",
    "page": 56,
    "title": {
      "en": "Choose the next place to write",
      "sv": "Välj nästa plats att skriva på"
    },
    "question": {
      "en": "When recording data on a multiple-disk storage system, should we fill a complete disk surface before starting on another surface, or should we first fill an entire cylinder before starting on another cylinder?",
      "sv": "När data skrivs i ett lagringssystem med flera skivor, bör man fylla en hel skivyta innan man börjar på en annan yta, eller först fylla en hel cylinder innan man börjar på en annan cylinder?"
    },
    "steps": {
      "en": [
        "A track is a circle on one disk surface. A cylinder is the collection of tracks at the same radius on all surfaces. Imagine a stack of circular tracks directly above one another.",
        "In the book’s model, the read/write heads move together. Moving them to a new radius takes mechanical seek time. Switching to the head on another surface at the same radius avoids that movement.",
        "Fill the tracks in the current cylinder first, changing surfaces while staying at the same radius. Move the heads only when that cylinder is full. Filling a whole surface first would repeatedly move through radii and then repeat those movements on the next surface."
      ],
      "sv": [
        "Ett spår är en cirkel på en skivyta. En cylinder är samlingen av spår med samma radie på alla ytor. Föreställ dig en stapel cirkulära spår rakt ovanför varandra.",
        "I bokens modell rör sig läs- och skrivhuvudena tillsammans. Att flytta dem till en ny radie kräver mekanisk söktid. Att välja huvudet på en annan yta med samma radie undviker den förflyttningen.",
        "Fyll först spåren i den aktuella cylindern och byt yta medan radien är densamma. Flytta huvudena först när cylindern är full. Om en hel yta fylldes först skulle huvudena flyttas genom många radier och sedan behöva upprepa detta på nästa yta."
      ]
    },
    "answer": {
      "en": "Fill a cylinder before moving to the next cylinder; in the textbook model this reduces head movement and seek time.",
      "sv": "Fyll en cylinder innan nästa påbörjas; i bokens modell minskar det huvudenas förflyttning och söktiden."
    }
  },
  {
    "id": "section-1.3-3",
    "section": "1.3",
    "number": "3",
    "kind": "section",
    "page": 56,
    "title": {
      "en": "Store frequently changing reservations",
      "sv": "Lagra bokningar som ändras ofta"
    },
    "question": {
      "en": "Why should the data in a reservation system that is constantly being updated be stored on a magnetic disk instead of a CD or DVD?",
      "sv": "Varför bör data i ett bokningssystem som uppdateras hela tiden lagras på en magnetisk disk i stället för på en CD- eller DVD-skiva?"
    },
    "steps": {
      "en": [
        "A reservation system must quickly change small records: a seat becomes booked, a booking is cancelled, or a passenger’s details change. The needed record may be anywhere in storage.",
        "A magnetic disk supports repeated rewriting and direct access to the relevant sectors. The system can locate and update a small part without rewriting the entire stored collection.",
        "A pressed CD-ROM or DVD-ROM cannot be rewritten, and recordable write-once media cannot simply overwrite an old record. Rewritable optical formats do exist, but the optical systems discussed in the book are less suited to frequent small random updates than magnetic disks."
      ],
      "sv": [
        "Ett bokningssystem måste snabbt ändra små poster: en plats bokas, en bokning avbokas eller en resenärs uppgifter ändras. Den aktuella posten kan ligga var som helst i lagringen.",
        "En magnetisk disk stöder upprepad omskrivning och direkt åtkomst till aktuella sektorer. Systemet kan hitta och uppdatera en liten del utan att skriva om hela den lagrade samlingen.",
        "En pressad CD-ROM eller DVD-ROM kan inte skrivas om. På skivor för engångsskrivning kan en gammal post inte bara skrivas över. Det finns omskrivbara optiska format, men de optiska systemen i boken lämpar sig sämre för täta, små uppdateringar på skilda platser än magnetiska diskar."
      ]
    },
    "answer": {
      "en": "Magnetic disks allow efficient repeated updates and random access; the optical media discussed are less suitable for constantly changing reservation records.",
      "sv": "Magnetiska diskar medger effektiv upprepad uppdatering och direkt åtkomst. De optiska medier som diskuteras passar sämre för bokningsposter som hela tiden ändras."
    }
  },
  {
    "id": "section-1.3-4",
    "section": "1.3",
    "number": "4",
    "kind": "section",
    "page": 57,
    "title": {
      "en": "One drive, several optical formats",
      "sv": "En läsare, flera optiska format"
    },
    "question": {
      "en": "What factors allow CD, DVD, and Blu-ray disks all to be read by the same drive?",
      "sv": "Vilka faktorer gör att CD-, DVD- och Blu-ray-skivor kan läsas av samma enhet?"
    },
    "steps": {
      "en": [
        "All three formats store information optically on rotating discs. The standard discs have a compatible physical size and use a spiral track, so one loading and spinning mechanism can hold them.",
        "Their recorded details are not equally small. A drive supporting all three must provide the appropriate laser wavelengths and focusing arrangements for each format, rather than use one unchanged reading setting for everything.",
        "The drive identifies the disc type and uses matching optics and decoding electronics. Physical compatibility plus support for each recording format makes a multi-format drive possible. A CD-only drive cannot therefore be assumed to read Blu-ray."
      ],
      "sv": [
        "Alla tre formaten lagrar information optiskt på roterande skivor. Standardskivorna har kompatibel fysisk storlek och använder ett spiralspår, så en gemensam inmatnings- och rotationsmekanism kan hantera dem.",
        "De lagrade detaljerna är inte lika små. En läsare som stöder alla tre måste ha lämpliga laservåglängder och fokuseringslösningar för respektive format, i stället för en enda oförändrad läsinställning.",
        "Enheten identifierar skivtypen och använder passande optik och avkodningselektronik. Fysisk kompatibilitet tillsammans med stöd för varje inspelningsformat möjliggör en flerformatsläsare. Man kan därför inte anta att en läsare endast för CD kan läsa Blu-ray."
      ]
    },
    "answer": {
      "en": "Compatible disc mechanics, combined with the appropriate lasers, focus and decoding support for each format.",
      "sv": "Kompatibel skivmekanik tillsammans med rätt laser, fokusering och avkodningsstöd för varje format."
    }
  },
  {
    "id": "section-1.3-5",
    "section": "1.3",
    "number": "5",
    "kind": "section",
    "page": 57,
    "title": {
      "en": "The advantage of flash storage",
      "sv": "Fördelarna med flashminne"
    },
    "question": {
      "en": "What advantage do flash drives have over the other mass storage systems introduced in this section?",
      "sv": "Vilken fördel har flashminnen jämfört med de andra masslagringssystemen som presenterats i detta avsnitt?"
    },
    "steps": {
      "en": [
        "The magnetic and optical systems in this section retrieve data using physical movement, such as spinning media or moving a head. Waiting for motion takes time.",
        "Flash stores bits as electrical charge and accesses them electronically. There is no spinning disk and no head that must travel to a track, so flash avoids mechanical seek and rotational delays.",
        "Having no moving mechanism also makes compact, portable storage possible and avoids damage from mechanical moving parts. Flash keeps data without continuous power. This does not mean unlimited durability: its memory cells have a finite number of erase/write cycles."
      ],
      "sv": [
        "De magnetiska och optiska systemen i avsnittet hämtar data med hjälp av fysisk rörelse, exempelvis roterande skivor eller ett rörligt huvud. Att vänta på rörelse tar tid.",
        "Flash lagrar bitar som elektrisk laddning och kommer åt dem elektroniskt. Ingen skiva behöver snurra och inget huvud behöver flyttas till ett spår. Därför undviker flash mekanisk söktid och rotationsfördröjning.",
        "Utan en rörlig mekanism kan lagringen bli liten och lätt att bära och slipper skador på mekaniska rörliga delar. Flash behåller data utan kontinuerlig ström. Det betyder inte obegränsad livslängd: minnescellerna klarar ett begränsat antal raderings- och skrivcykler."
      ]
    },
    "answer": {
      "en": "Flash has no moving parts, so it avoids mechanical access delays and supports compact, portable, non-volatile storage.",
      "sv": "Flash saknar rörliga delar och undviker därför mekaniska åtkomstfördröjningar samtidigt som det möjliggör liten, bärbar och beständig lagring."
    }
  },
  {
    "id": "section-1.3-6",
    "section": "1.3",
    "number": "6",
    "kind": "section",
    "page": 57,
    "title": {
      "en": "Why magnetic disks remain useful",
      "sv": "Varför magnetiska diskar är användbara"
    },
    "question": {
      "en": "What advantages continue to make magnetic hard disk drives competitive?",
      "sv": "Vilka fördelar fortsätter att göra magnetiska hårddiskar konkurrenskraftiga?"
    },
    "steps": {
      "en": [
        "Consider what a storage user needs: enough capacity, an affordable cost per stored byte, and the ability to read and rewrite data. Access speed is only one part of that comparison.",
        "In the book’s comparison, magnetic hard disks offer large storage capacities at relatively low cost per byte. Many platters, tracks and sectors can hold a large collection of data.",
        "They can be rewritten many times and directly access different sectors. This combines practical updating with large capacity. Their trade-off is mechanical movement and its delays. The question describes a technology comparison, not a guarantee about every product or current price."
      ],
      "sv": [
        "Fundera på vad en lagringsanvändare behöver: tillräcklig kapacitet, rimlig kostnad per lagrad byte och möjlighet att läsa och skriva om data. Åtkomsthastighet är bara en del av jämförelsen.",
        "I bokens jämförelse erbjuder magnetiska hårddiskar stor lagringskapacitet till relativt låg kostnad per byte. Många skivor, spår och sektorer kan lagra en stor datamängd.",
        "De kan skrivas om många gånger och nå olika sektorer direkt. Det kombinerar praktisk uppdatering med stor kapacitet. Nackdelen är mekaniska rörelser och deras fördröjningar. Uppgiften beskriver en teknikjämförelse, inte en garanti om varje produkt eller dagens pris."
      ]
    },
    "answer": {
      "en": "Large capacity, relatively low cost per byte in the book’s comparison, and rewritable storage with direct access.",
      "sv": "Stor kapacitet, relativt låg kostnad per byte i bokens jämförelse samt omskrivbar lagring med direkt åtkomst."
    }
  },
  {
    "id": "section-1.4-1",
    "section": "1.4",
    "number": "1",
    "kind": "section",
    "page": 63,
    "title": {
      "en": "Read a message stored as bits",
      "sv": "Läs ett meddelande lagrat som bitar"
    },
    "question": {
      "en": "Here is a message encoded in ASCII using 8 bits per symbol. What does it say? (See Appendix A.)\n01000011 01101111 01101101 01110000 01110101 01110100\n01100101 01110010 00100000 01010011 01100011 01101001\n01100101 01101110 01100011 01100101",
      "sv": "Här är ett meddelande kodat i ASCII med 8 bitar per tecken. Vad står det? (Se bilaga A.)\n01000011 01101111 01101101 01110000 01110101 01110100\n01100101 01110010 00100000 01010011 01100011 01101001\n01100101 01101110 01100011 01100101"
    },
    "steps": {
      "en": [
        "ASCII is a shared list that assigns a number to each character, including letters, punctuation and a space. Read one eight-bit group at a time; do not treat the entire line as one enormous number.",
        "To decode a byte, use place values 128, 64, 32, 16, 8, 4, 2, 1. For the first byte 01000011, add 64 + 2 + 1 = 67. ASCII number 67 is uppercase C.",
        "Decode every byte in order. This list shows character → decimal code → original byte:\nC → 67 → 01000011\no → 111 → 01101111\nm → 109 → 01101101\np → 112 → 01110000\nu → 117 → 01110101\nt → 116 → 01110100\ne → 101 → 01100101\nr → 114 → 01110010\nspace → 32 → 00100000\nS → 83 → 01010011\nc → 99 → 01100011\ni → 105 → 01101001\ne → 101 → 01100101\nn → 110 → 01101110\nc → 99 → 01100011\ne → 101 → 01100101",
        "Join the characters without adding anything between them. The byte 00100000 supplies the one space. Uppercase C and S must stay uppercase because their codes differ from lowercase c and s."
      ],
      "sv": [
        "ASCII är en gemensam lista som tilldelar varje tecken ett tal, inklusive bokstäver, skiljetecken och mellanslag. Läs en grupp om åtta bitar i taget. Tolka inte hela raden som ett enda enormt tal.",
        "För att avkoda en byte använder du platsvärdena 128, 64, 32, 16, 8, 4, 2, 1. För första byten 01000011 adderar du 64 + 2 + 1 = 67. ASCII-talet 67 motsvarar stort C.",
        "Avkoda varje byte i ordning. Listan visar tecken → decimal kod → ursprunglig byte:\nC → 67 → 01000011\no → 111 → 01101111\nm → 109 → 01101101\np → 112 → 01110000\nu → 117 → 01110101\nt → 116 → 01110100\ne → 101 → 01100101\nr → 114 → 01110010\nmellanslag → 32 → 00100000\nS → 83 → 01010011\nc → 99 → 01100011\ni → 105 → 01101001\ne → 101 → 01100101\nn → 110 → 01101110\nc → 99 → 01100011\ne → 101 → 01100101",
        "Sätt ihop tecknen utan att lägga till något mellan dem. Byten 00100000 ger det enda mellanslaget. Stort C och stort S ska behållas eftersom deras koder skiljer sig från litet c och s."
      ]
    },
    "answer": {
      "en": "Computer Science",
      "sv": "Computer Science"
    }
  },
  {
    "id": "section-1.4-2",
    "section": "1.4",
    "number": "2",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "Uppercase and lowercase ASCII",
      "sv": "Stora och små ASCII-bokstäver"
    },
    "question": {
      "en": "In the ASCII code, what is the relationship between the codes for an uppercase letter and the same letter in lowercase? (See Appendix A.)",
      "sv": "Vilket samband finns i ASCII-koden mellan koden för en stor bokstav och koden för samma bokstav som liten? (Se bilaga A.)"
    },
    "steps": {
      "en": [
        "Compare a pair: uppercase A has decimal code 65 and binary code 01000001; lowercase a has decimal code 97 and binary code 01100001.",
        "Subtract: 97 − 65 = 32. In binary, the only changed place has value 32: 01000001 → 01100001. Counting places from the right starting at 1, this is the sixth bit. In zero-based programming notation it is bit 5.",
        "This same difference holds for all ASCII letters A–Z: for example Z = 90 and z = 122, again a difference of 32. To obtain the lowercase code, add 32, or set the 32-place bit to 1. To reverse the change for these letters, subtract 32.",
        "Keep the scope clear: this is a rule for the English alphabet in ASCII. It is not a general rule for every character or for letters such as å, ä and ö in Unicode."
      ],
      "sv": [
        "Jämför ett par: stort A har decimalkoden 65 och binärkoden 01000001; litet a har decimalkoden 97 och binärkoden 01100001.",
        "Subtrahera: 97 − 65 = 32. I binär form är den enda ändrade platsen värd 32: 01000001 → 01100001. Räknat från höger med start på 1 är detta den sjätte biten. Med programmeringens nollbaserade numrering kallas den bit 5.",
        "Samma skillnad gäller alla ASCII-bokstäver A–Z: till exempel Z = 90 och z = 122, återigen en skillnad på 32. För att få koden för liten bokstav adderar du 32, eller sätter biten med platsvärdet 32 till 1. För att gå tillbaka för dessa bokstäver subtraherar du 32.",
        "Håll isär vad regeln gäller: detta är en regel för det engelska alfabetet i ASCII. Den gäller inte alla tecken eller bokstäver som å, ä och ö i Unicode."
      ]
    },
    "answer": {
      "en": "For ASCII A–Z, lowercase code = uppercase code + 32; the bit with value 32 changes from 0 to 1.",
      "sv": "För ASCII A–Z gäller: kod för liten bokstav = kod för stor bokstav + 32. Biten med värdet 32 ändras från 0 till 1."
    }
  },
  {
    "id": "section-1.4-3",
    "section": "1.4",
    "number": "3",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "Encode complete sentences in ASCII",
      "sv": "Koda hela meningar i ASCII"
    },
    "question": {
      "en": "Encode these sentences in ASCII:\na. “Stop!” Cheryl shouted.\nb. Does 2 + 3= 5 ?",
      "sv": "Koda dessa meningar i ASCII:\na. “Stop!” Cheryl shouted.\nb. Does 2 + 3= 5 ?\n\nMeningarnas engelska tecken behålls eftersom just dessa tecken ska kodas."
    },
    "steps": {
      "en": [
        "Decide exactly which characters to encode. Basic ASCII does not contain the book’s curly quotation marks. For a, use straight ASCII double quotes (\") in their place: \"Stop!\" Cheryl shouted. For b, use the printed text transcription “Does 2 + 3= 5 ?”: there is no space between 3 and =, and there is a space before ?. Spaces are data and affect the answer.",
        "Look up each character’s ASCII number and express that number with eight bits. Example: S = 83 = 64 + 16 + 2 + 1, so S → 01010011. A space has code 32 → 00100000; it must not be omitted.",
        "Encode a in order, including both quotes, the exclamation mark, two spaces and the final period:\n\" → 34 → 00100010\nS → 83 → 01010011\nt → 116 → 01110100\no → 111 → 01101111\np → 112 → 01110000\n! → 33 → 00100001\n\" → 34 → 00100010\nspace → 32 → 00100000\nC → 67 → 01000011\nh → 104 → 01101000\ne → 101 → 01100101\nr → 114 → 01110010\ny → 121 → 01111001\nl → 108 → 01101100\nspace → 32 → 00100000\ns → 115 → 01110011\nh → 104 → 01101000\no → 111 → 01101111\nu → 117 → 01110101\nt → 116 → 01110100\ne → 101 → 01100101\nd → 100 → 01100100\n. → 46 → 00101110",
        "Encode b in order. The digit 2 is a text character with code 50, not the binary number 00000010. The plus and equals signs are characters too:\nD → 68 → 01000100\no → 111 → 01101111\ne → 101 → 01100101\ns → 115 → 01110011\nspace → 32 → 00100000\n2 → 50 → 00110010\nspace → 32 → 00100000\n+ → 43 → 00101011\nspace → 32 → 00100000\n3 → 51 → 00110011\n= → 61 → 00111101\nspace → 32 → 00100000\n5 → 53 → 00110101\nspace → 32 → 00100000\n? → 63 → 00111111",
        "Check by decoding the bytes back to the exact strings. Part a has 23 bytes; part b has 15 bytes. If you choose a space before = as typographical normalization, insert the additional byte 00100000 there and state that convention."
      ],
      "sv": [
        "Bestäm exakt vilka tecken som ska kodas. Grundläggande ASCII innehåller inte bokens typografiska citattecken. I a används raka ASCII-citattecken (\") i deras ställe: \"Stop!\" Cheryl shouted. I b används textavskriften ”Does 2 + 3= 5 ?”: det finns inget mellanslag mellan 3 och =, och det finns ett mellanslag före ?. Mellanslag är data och påverkar svaret.",
        "Slå upp varje teckens ASCII-tal och skriv talet med åtta bitar. Exempel: S = 83 = 64 + 16 + 2 + 1, alltså S → 01010011. Ett mellanslag har koden 32 → 00100000 och får inte utelämnas.",
        "Koda a i ordning, inklusive båda citattecknen, utropstecknet, två mellanslag och den avslutande punkten:\n\" → 34 → 00100010\nS → 83 → 01010011\nt → 116 → 01110100\no → 111 → 01101111\np → 112 → 01110000\n! → 33 → 00100001\n\" → 34 → 00100010\nmellanslag → 32 → 00100000\nC → 67 → 01000011\nh → 104 → 01101000\ne → 101 → 01100101\nr → 114 → 01110010\ny → 121 → 01111001\nl → 108 → 01101100\nmellanslag → 32 → 00100000\ns → 115 → 01110011\nh → 104 → 01101000\no → 111 → 01101111\nu → 117 → 01110101\nt → 116 → 01110100\ne → 101 → 01100101\nd → 100 → 01100100\n. → 46 → 00101110",
        "Koda b i ordning. Siffran 2 är ett texttecken med koden 50, inte det binära talet 00000010. Även plus- och likhetstecknen är tecken:\nD → 68 → 01000100\no → 111 → 01101111\ne → 101 → 01100101\ns → 115 → 01110011\nmellanslag → 32 → 00100000\n2 → 50 → 00110010\nmellanslag → 32 → 00100000\n+ → 43 → 00101011\nmellanslag → 32 → 00100000\n3 → 51 → 00110011\n= → 61 → 00111101\nmellanslag → 32 → 00100000\n5 → 53 → 00110101\nmellanslag → 32 → 00100000\n? → 63 → 00111111",
        "Kontrollera genom att avkoda byten tillbaka till exakt samma strängar. Del a har 23 byte och del b har 15 byte. Om du väljer att normalisera typografin med ett mellanslag före =, lägger du till byten 00100000 där och anger den konventionen."
      ]
    },
    "answer": {
      "en": "a. 00100010 01010011 01110100 01101111 01110000 00100001 00100010 00100000 01000011 01101000 01100101 01110010 01111001 01101100 00100000 01110011 01101000 01101111 01110101 01110100 01100101 01100100 00101110\n\nb. 01000100 01101111 01100101 01110011 00100000 00110010 00100000 00101011 00100000 00110011 00111101 00100000 00110101 00100000 00111111",
      "sv": "a. 00100010 01010011 01110100 01101111 01110000 00100001 00100010 00100000 01000011 01101000 01100101 01110010 01111001 01101100 00100000 01110011 01101000 01101111 01110101 01110100 01100101 01100100 00101110\n\nb. 01000100 01101111 01100101 01110011 00100000 00110010 00100000 00101011 00100000 00110011 00111101 00100000 00110101 00100000 00111111"
    }
  },
  {
    "id": "section-1.4-4",
    "section": "1.4",
    "number": "4",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "Store a letter using everyday objects",
      "sv": "Lagra en bokstav med vardagsföremål"
    },
    "question": {
      "en": "Describe a device from everyday life that can be in either of two states, such as a flag on a flagpole that is either up or down. Assign the symbol 1 to one of the states and 0 to the other, and show how the ASCII representation for the letter b would appear when stored with such bits.",
      "sv": "Beskriv en vardaglig anordning som kan vara i ett av två tillstånd, till exempel en flagga på en flaggstång som antingen är hissad eller nedhalad. Tilldela symbolen 1 till det ena tillståndet och 0 till det andra, och visa hur ASCII-representationen för bokstaven b skulle se ut om den lagrades med sådana bitar."
    },
    "steps": {
      "en": [
        "Choose a lamp with an on/off switch. Define the convention before using it: on means 1, off means 0. Many other examples work, provided there are two clearly distinguishable states.",
        "Lowercase b has ASCII code 98. Decompose 98 = 64 + 32 + 2. Under the eight place values 128, 64, 32, 16, 8, 4, 2, 1 this gives 0, 1, 1, 0, 0, 0, 1, 0.",
        "Use eight lamps in an agreed left-to-right order. Set them to off, on, on, off, off, off, on, off. A reader who knows both the bit convention and ASCII can recover b."
      ],
      "sv": [
        "Välj en lampa med strömbrytare. Bestäm konventionen innan du använder den: tänd betyder 1 och släckt betyder 0. Många andra exempel fungerar om de har två tydligt urskiljbara tillstånd.",
        "Litet b har ASCII-koden 98. Dela upp talet: 98 = 64 + 32 + 2. Under de åtta platsvärdena 128, 64, 32, 16, 8, 4, 2, 1 ger detta 0, 1, 1, 0, 0, 0, 1, 0.",
        "Använd åtta lampor i en överenskommen ordning från vänster till höger. Ställ in dem som släckt, tänd, tänd, släckt, släckt, släckt, tänd, släckt. Den som känner till både bitkonventionen och ASCII kan återskapa b."
      ]
    },
    "answer": {
      "en": "Example: eight lamps, on = 1 and off = 0. b = 01100010 → off, on, on, off, off, off, on, off.",
      "sv": "Exempel: åtta lampor, tänd = 1 och släckt = 0. b = 01100010 → släckt, tänd, tänd, släckt, släckt, släckt, tänd, släckt."
    }
  },
  {
    "id": "section-1.4-5",
    "section": "1.4",
    "number": "5",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "Binary numbers in base ten",
      "sv": "Binära tal i bas tio"
    },
    "question": {
      "en": "Convert each of the following binary representations to its equivalent base ten form:\na. 0101\nb. 1001\nc. 1011\nd. 0110\ne. 10000\nf. 10010",
      "sv": "Omvandla var och en av följande binära representationer till motsvarande form i bas tio:\na. 0101\nb. 1001\nc. 1011\nd. 0110\ne. 10000\nf. 10010"
    },
    "steps": {
      "en": [
        "Write the binary place values from right to left: 1, 2, 4, 8, 16, and so on. Each place is twice the previous one. A 1 means “include this value”; a 0 means “include nothing from this place.”",
        "a. 0101₂ = 4 + 1 = 5.",
        "b. 1001₂ = 8 + 1 = 9.",
        "c. 1011₂ = 8 + 2 + 1 = 11.",
        "d. 0110₂ = 4 + 2 = 6.",
        "e. 10000₂ = 16 = 16.",
        "f. 10010₂ = 16 + 2 = 18."
      ],
      "sv": [
        "Skriv de binära platsvärdena från höger till vänster: 1, 2, 4, 8, 16 och så vidare. Varje plats är värd dubbelt så mycket som den föregående. En 1:a betyder ”ta med värdet”; en 0:a betyder ”ta inte med något från denna plats”.",
        "a. 0101₂ = 4 + 1 = 5.",
        "b. 1001₂ = 8 + 1 = 9.",
        "c. 1011₂ = 8 + 2 + 1 = 11.",
        "d. 0110₂ = 4 + 2 = 6.",
        "e. 10000₂ = 16 = 16.",
        "f. 10010₂ = 16 + 2 = 18."
      ]
    },
    "answer": {
      "en": "a. 5; b. 9; c. 11; d. 6; e. 16; f. 18.",
      "sv": "a. 5; b. 9; c. 11; d. 6; e. 16; f. 18."
    }
  },
  {
    "id": "section-1.4-6",
    "section": "1.4",
    "number": "6",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "Base-ten numbers in binary",
      "sv": "Tal i bas tio skrivna binärt"
    },
    "question": {
      "en": "Convert each of the following base ten representations to its equivalent binary form:\na. 6\nb. 13\nc. 11\nd. 18\ne. 27\nf. 4",
      "sv": "Omvandla var och en av följande representationer i bas tio till motsvarande binära form:\na. 6\nb. 13\nc. 11\nd. 18\ne. 27\nf. 4"
    },
    "steps": {
      "en": [
        "Use the available place values 16, 8, 4, 2, 1. Choose the largest one that fits, subtract it, and continue. Put 1 at each chosen place and 0 at each skipped place.",
        "a. 6: take 4, leaving 2; take 2, leaving 0; skip 1. Under 4, 2, 1 write 1, 1, 0 → 110. Check: 4 + 2 = 6.",
        "b. 13: take 8, leaving 5; take 4, leaving 1; skip 2; take 1. Under 8, 4, 2, 1 write 1, 1, 0, 1 → 1101. Check: 8 + 4 + 1 = 13.",
        "c. 11: take 8, leaving 3; skip 4; take 2, leaving 1; take 1. The bits are 1011. Check: 8 + 2 + 1 = 11.",
        "d. 18: take 16, leaving 2; skip 8 and 4; take 2; skip 1. The bits are 10010. Check: 16 + 2 = 18.",
        "e. 27: take 16, leaving 11; take 8, leaving 3; skip 4; take 2, leaving 1; take 1. The bits are 11011. Check: 16 + 8 + 2 + 1 = 27.",
        "f. 4: take 4, leaving 0; skip 2 and 1. The bits are 100. Check: 4 = 4. Leading zeros could be added without changing any of these positive values."
      ],
      "sv": [
        "Använd platsvärdena 16, 8, 4, 2, 1. Välj det största som ryms i talet, subtrahera det och fortsätt. Skriv 1 på varje vald plats och 0 på varje överhoppad plats.",
        "a. 6: ta 4, vilket lämnar 2; ta 2, vilket lämnar 0; hoppa över 1. Under 4, 2, 1 skriver du 1, 1, 0 → 110. Kontroll: 4 + 2 = 6.",
        "b. 13: ta 8, vilket lämnar 5; ta 4, vilket lämnar 1; hoppa över 2; ta 1. Under 8, 4, 2, 1 skriver du 1, 1, 0, 1 → 1101. Kontroll: 8 + 4 + 1 = 13.",
        "c. 11: ta 8, vilket lämnar 3; hoppa över 4; ta 2, vilket lämnar 1; ta 1. Bitarna blir 1011. Kontroll: 8 + 2 + 1 = 11.",
        "d. 18: ta 16, vilket lämnar 2; hoppa över 8 och 4; ta 2; hoppa över 1. Bitarna blir 10010. Kontroll: 16 + 2 = 18.",
        "e. 27: ta 16, vilket lämnar 11; ta 8, vilket lämnar 3; hoppa över 4; ta 2, vilket lämnar 1; ta 1. Bitarna blir 11011. Kontroll: 16 + 8 + 2 + 1 = 27.",
        "f. 4: ta 4, vilket lämnar 0; hoppa över 2 och 1. Bitarna blir 100. Kontroll: 4 = 4. Inledande nollor kan läggas till utan att ändra något av dessa positiva värden."
      ]
    },
    "answer": {
      "en": "a. 110; b. 1101; c. 1011; d. 10010; e. 11011; f. 100.",
      "sv": "a. 110; b. 1101; c. 1011; d. 10010; e. 11011; f. 100."
    }
  },
  {
    "id": "section-1.4-7",
    "section": "1.4",
    "number": "7",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "Same storage, different number ranges",
      "sv": "Samma utrymme, olika talområden"
    },
    "question": {
      "en": "What is the largest numeric value that could be represented with three bytes if each digit were encoded using one ASCII pattern per byte? What if binary notation were used?",
      "sv": "Vilket är det största talvärde som kan representeras med tre byte om varje siffra kodas med ett ASCII-mönster per byte? Vad händer om binär notation används?"
    },
    "steps": {
      "en": [
        "For the ASCII version, each whole byte stores one decimal digit as a character. Three bytes therefore hold exactly three digits. The largest digit is 9, so the largest three-digit text is 999.",
        "For the binary version, use all bits together as one unsigned whole number: 3 bytes × 8 bits per byte = 24 bits. “Unsigned” means no bit is reserved for a minus sign.",
        "Each extra bit doubles the number of possible patterns, so 24 bits provide 2²⁴ = 16,777,216 patterns. One represents zero. The positive maximum is therefore one less: 2²⁴ − 1 = 16,777,215, written as twenty-four 1s.",
        "The storage size has not changed. The interpretation has: ASCII uses eight bits to describe each written decimal digit, while unsigned binary directly uses every bit’s place value."
      ],
      "sv": [
        "I ASCII-versionen lagrar varje hel byte en decimalsiffra som ett tecken. Tre byte rymmer därför exakt tre siffror. Den största siffran är 9, så den största tresiffriga texten är 999.",
        "I den binära versionen används alla bitar tillsammans som ett enda heltal utan tecken: 3 byte × 8 bitar per byte = 24 bitar. ”Utan tecken” betyder att ingen bit reserveras för ett minustecken.",
        "Varje ytterligare bit fördubblar antalet möjliga mönster, så 24 bitar ger 2²⁴ = 16 777 216 mönster. Ett mönster representerar noll. Det största positiva värdet blir därför ett mindre: 2²⁴ − 1 = 16 777 215, skrivet som tjugofyra 1:or.",
        "Lagringsutrymmet har inte ändrats. Det är tolkningen som har ändrats: ASCII använder åtta bitar för varje skriven decimalsiffra, medan binär form utan tecken direkt använder varje bits platsvärde."
      ]
    },
    "answer": {
      "en": "ASCII decimal digits: 999. Unsigned 24-bit binary: 16,777,215.",
      "sv": "Decimala ASCII-siffror: 999. Binärt heltal med 24 bitar utan tecken: 16 777 215."
    }
  },
  {
    "id": "section-1.4-8",
    "section": "1.4",
    "number": "8",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "Read bytes as dotted decimal",
      "sv": "Läs byte i punktseparerad decimal notation"
    },
    "question": {
      "en": "An alternative to hexadecimal notation for representing bit patterns is dotted decimal notation in which each byte in the pattern is represented by its base ten equivalent. In turn, these byte representations are separated by periods. For example, 12.5 represents the pattern 0000110000000101 (the byte 00001100 is represented by 12, and 00000101 is represented by 5), and the pattern 100010000001000000000111 is represented by 136.16.7. Represent each of the following bit patterns in dotted decimal notation.\na. 0000111100001111\nb. 001100110000000010000000\nc. 0000101010100000",
      "sv": "Ett alternativ till hexadecimal notation för bitmönster är punktseparerad decimal notation, där varje byte i mönstret representeras av sitt motsvarande värde i bas tio. Dessa bytevärden skiljs åt med punkter. Exempelvis representerar 12.5 mönstret 0000110000000101 (byten 00001100 representeras av 12 och 00000101 av 5), och mönstret 100010000001000000000111 representeras av 136.16.7. Representera följande bitmönster i punktseparerad decimal notation.\na. 0000111100001111\nb. 001100110000000010000000\nc. 0000101010100000"
    },
    "steps": {
      "en": [
        "Split each pattern into eight-bit bytes from the left. Convert each byte separately with place values 128, 64, 32, 16, 8, 4, 2, 1. The separating dots are not decimal fraction marks.",
        "a. 00001111 | 00001111. Each byte is 8 + 4 + 2 + 1 = 15. Write the two values with one dot between them: 15.15.",
        "b. 00110011 | 00000000 | 10000000. The first byte is 32 + 16 + 2 + 1 = 51; the second is 0; the third is 128. Keep the zero byte: 51.0.128.",
        "c. 00001010 | 10100000. The first byte is 8 + 2 = 10; the second is 128 + 32 = 160. Write 10.160. Each result is between 0 and 255, as an eight-bit byte must be."
      ],
      "sv": [
        "Dela varje mönster i åttabitars byte från vänster. Omvandla varje byte för sig med platsvärdena 128, 64, 32, 16, 8, 4, 2, 1. Punkterna är avskiljare, inte decimaltecken.",
        "a. 00001111 | 00001111. Varje byte är 8 + 4 + 2 + 1 = 15. Skriv de två värdena med en punkt mellan: 15.15.",
        "b. 00110011 | 00000000 | 10000000. Den första byten är 32 + 16 + 2 + 1 = 51; den andra är 0; den tredje är 128. Behåll nollbyten: 51.0.128.",
        "c. 00001010 | 10100000. Den första byten är 8 + 2 = 10; den andra är 128 + 32 = 160. Skriv 10.160. Varje värde ligger mellan 0 och 255, vilket krävs för en byte med åtta bitar."
      ]
    },
    "answer": {
      "en": "a. 15.15\nb. 51.0.128\nc. 10.160",
      "sv": "a. 15.15\nb. 51.0.128\nc. 10.160"
    }
  },
  {
    "id": "section-1.4-9",
    "section": "1.4",
    "number": "9",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "Choose vector or bitmap graphics",
      "sv": "Välj vektor- eller bitmappsgrafik"
    },
    "question": {
      "en": "What is an advantage of representing images via geometric structures as opposed to bit maps? What about bit map techniques as opposed to geometric structures?",
      "sv": "Vilken fördel finns med att representera bilder med geometriska strukturer i stället för bitmönster? Vilken fördel har bitmappstekniker jämfört med geometriska strukturer?"
    },
    "steps": {
      "en": [
        "A geometric, or vector, description stores objects such as “draw a circle with this centre, radius and colour.” A bitmap, or raster image, stores a grid of pixels and a colour value for each pixel.",
        "For a logo or diagram, a few geometric objects can describe many visible pixels. The description can be compact, individual shapes are easy to edit, and a renderer can draw them sharply at a new size. Enlarging the shape does not require stretching a fixed grid of old pixels.",
        "A photograph has irregular textures, shadows and gradual colour changes. Recording the measured colour at each pixel represents such detail directly; describing every patch as geometric objects could be very complicated. This is a strength of bitmaps.",
        "Choose according to the image: geometric graphics suit scalable shapes, text and diagrams; bitmaps suit sampled imagery such as photographs. A bitmap can become visibly pixelated when greatly enlarged because its original grid contains limited detail."
      ],
      "sv": [
        "En geometrisk beskrivning, eller vektorbild, lagrar objekt som ”rita en cirkel med denna mittpunkt, radie och färg”. En bitmapp, eller rasterbild, lagrar ett rutnät av bildpunkter och ett färgvärde för varje bildpunkt.",
        "För en logotyp eller ett diagram kan ett fåtal geometriska objekt beskriva många synliga bildpunkter. Beskrivningen kan bli kompakt, enskilda former är lätta att redigera och de kan ritas skarpt i en ny storlek. Att förstora formen kräver inte att ett fast rutnät av gamla bildpunkter sträcks ut.",
        "Ett fotografi har oregelbundna strukturer, skuggor och gradvisa färgförändringar. Att registrera den uppmätta färgen i varje bildpunkt beskriver sådana detaljer direkt. Att beskriva varje liten yta som geometriska objekt kan bli mycket komplicerat. Detta är en styrka hos bitmappar.",
        "Välj utifrån bilden: geometrisk grafik passar skalbara former, text och diagram; bitmappar passar samplade bilder som fotografier. En bitmapp kan bli synligt pixlig vid kraftig förstoring eftersom det ursprungliga rutnätet innehåller begränsad detaljinformation."
      ]
    },
    "answer": {
      "en": "Geometric graphics scale and edit well and can be compact for shapes. Bitmaps directly represent detailed, irregular colour patterns such as photographs.",
      "sv": "Geometrisk grafik är lätt att skala och redigera och kan vara kompakt för former. Bitmappar representerar direkt detaljerade, oregelbundna färgmönster som fotografier."
    }
  },
  {
    "id": "section-1.4-10",
    "section": "1.4",
    "number": "10",
    "kind": "section",
    "page": 64,
    "title": {
      "en": "How much storage does an hour of music need?",
      "sv": "Hur mycket lagring behöver en timmes musik?"
    },
    "question": {
      "en": "Suppose a stereo recording of one hour of music is encoded using a sample rate of 44,100 samples per second, as discussed in the text. How does the size of the encoded version compare to the storage capacity of a CD?",
      "sv": "Anta att en stereoinspelning av en timmes musik kodas med en samplingsfrekvens på 44 100 samplingar per sekund, som i texten. Hur förhåller sig storleken på den kodade versionen till lagringskapaciteten hos en CD-skiva?"
    },
    "steps": {
      "en": [
        "Use the encoding discussed in the text: 44,100 samples per second PER channel, 16 bits per sample, and two channels for stereo. A sample is one measured sound value. This calculation is for uncompressed sample data.",
        "For one second, multiply samples × bits per sample × channels: 44,100 × 16 × 2 = 1,411,200 bits. Divide by 8 bits per byte: 1,411,200 ÷ 8 = 176,400 bytes each second.",
        "One hour contains 60 × 60 = 3,600 seconds. Total size = 176,400 × 3,600 = 635,040,000 bytes. The time unit cancels the “per second” in the data rate.",
        "Express the size clearly: 635.04 decimal MB, or about 605.62 MiB when dividing by 1,048,576. The book describes CDs as roughly 600–700 MB. The recording therefore occupies most of a CD and fits a disc with at least this payload capacity, such as a nominal 650 or 700 MB data CD. A disc below the required capacity would not fit it.",
        "This counts the sound samples themselves. File headers and filesystem overhead add some space, and audio-CD sector formatting differs from data-CD formatting. The useful comparison here is the scale: one hour of uncompressed CD-rate stereo is a little over 600 million bytes."
      ],
      "sv": [
        "Använd kodningen som beskrivs i texten: 44 100 samplingar per sekund OCH kanal, 16 bitar per sampling och två kanaler för stereo. En sampling är ett uppmätt ljudvärde. Beräkningen gäller okomprimerade samplingsdata.",
        "För en sekund multiplicerar du samplingar × bitar per sampling × kanaler: 44 100 × 16 × 2 = 1 411 200 bitar. Dividera med 8 bitar per byte: 1 411 200 ÷ 8 = 176 400 byte per sekund.",
        "En timme innehåller 60 × 60 = 3 600 sekunder. Total storlek = 176 400 × 3 600 = 635 040 000 byte. Tidsenheten tar ut ”per sekund” i datahastigheten.",
        "Skriv storleken tydligt: 635,04 decimala MB, eller ungefär 605,62 MiB om man dividerar med 1 048 576. Boken beskriver CD-skivor som ungefär 600–700 MB. Inspelningen upptar alltså större delen av en CD och ryms på en skiva med minst denna nyttokapacitet, exempelvis en data-CD märkt 650 eller 700 MB. Den ryms inte på en skiva vars kapacitet är mindre än datamängden.",
        "Detta räknar själva ljudsamplingarna. Filhuvuden och filsystem kräver lite ytterligare utrymme, och ljud-CD har annan sektorformatering än data-CD. Den viktiga jämförelsen här är storleksordningen: en timmes okomprimerat stereoljud med CD-samplingsfrekvens kräver lite mer än 600 miljoner byte."
      ]
    },
    "answer": {
      "en": "635,040,000 bytes ≈ 635.04 MB ≈ 605.62 MiB, before overhead; most of a typical 650–700 MB CD.",
      "sv": "635 040 000 byte ≈ 635,04 MB ≈ 605,62 MiB före extra lagringskostnader; större delen av en typisk CD på 650–700 MB."
    }
  },
  {
    "id": "review-1",
    "section": "review",
    "number": "1",
    "kind": "review",
    "page": 102,
    "title": {
      "en": "Trace three logic circuits",
      "sv": "Följ tre logiska kretsar"
    },
    "question": {
      "en": "Determine the output of each of the following circuits, assuming that the upper input is 1 and the lower input is 0. What would be the output when the upper input is 0 and the lower input is 1?",
      "sv": "Bestäm utsignalen från var och en av följande kretsar när den övre ingången är 1 och den nedre är 0. Vad blir utsignalen när den övre ingången är 0 och den nedre är 1?"
    },
    "steps": {
      "en": [
        "Call the upper input A and the lower input B. NOT reverses a bit. OR gives 1 when at least one input is 1. AND gives 1 only when both are 1. XOR gives 1 only when the inputs differ. Follow wires from left to right.",
        "Circuit a computes A XOR (NOT B). For (A, B) = (1, 0), NOT B = 1, so 1 XOR 1 = 0. For (0, 1), NOT B = 0, so 0 XOR 0 = 0.",
        "Circuit b first computes A OR B. Its output and the original B enter AND. For (1, 0), OR = 1 and the final result is 1 AND 0 = 0. For (0, 1), OR = 1 and the result is 1 AND 1 = 1.",
        "Circuit c first computes A XOR B, then combines that with the original A in another XOR. For (1, 0), the first XOR = 1; the second gives 1 XOR 1 = 0. For (0, 1), the first XOR = 1; the second gives 0 XOR 1 = 1."
      ],
      "sv": [
        "Kalla den övre ingången A och den nedre B. NOT vänder en bit. OR ger 1 när minst en ingång är 1. AND ger 1 endast när båda är 1. XOR ger 1 endast när ingångarna är olika. Följ ledningarna från vänster till höger.",
        "Krets a beräknar A XOR (NOT B). För (A, B) = (1, 0) är NOT B = 1, så 1 XOR 1 = 0. För (0, 1) är NOT B = 0, så 0 XOR 0 = 0.",
        "Krets b beräknar först A OR B. Det resultatet och det ursprungliga B går till AND. För (1, 0) är OR = 1 och slutresultatet blir 1 AND 0 = 0. För (0, 1) är OR = 1 och resultatet blir 1 AND 1 = 1.",
        "Krets c beräknar först A XOR B och kombinerar sedan det resultatet med det ursprungliga A i ytterligare en XOR. För (1, 0) ger första XOR = 1; den andra ger 1 XOR 1 = 0. För (0, 1) ger första XOR = 1; den andra ger 0 XOR 1 = 1."
      ]
    },
    "answer": {
      "en": "Upper/lower inputs 1/0: a = 0, b = 0, c = 0.\nUpper/lower inputs 0/1: a = 0, b = 1, c = 1.",
      "sv": "Övre/nedre ingångar 1/0: a = 0, b = 0, c = 0.\nÖvre/nedre ingångar 0/1: a = 0, b = 1, c = 1."
    },
    "figures": [
      {
        "file": "foundations-review1.svg",
        "caption": {
          "en": "Review 1: circuits a, b and c from top to bottom.",
          "sv": "Repetition 1: kretsarna a, b och c uppifrån och ned."
        },
        "alt": {
          "en": "a: upper input XOR inverted lower input. b: OR of both inputs AND lower input. c: XOR of both inputs XOR upper input.",
          "sv": "a: övre ingången XOR inverterad nedre ingång. b: OR av båda ingångarna AND nedre ingången. c: XOR av båda ingångarna XOR övre ingången."
        }
      }
    ]
  },
  {
    "id": "review-2",
    "section": "review",
    "number": "2",
    "kind": "review",
    "page": 102,
    "title": {
      "en": "Identify two equivalent operations",
      "sv": "Identifiera två likvärdiga operationer"
    },
    "question": {
      "en": "a. What Boolean operation does the circuit compute?\n\nb. What Boolean operation does the circuit compute?",
      "sv": "a. Vilken boolesk operation beräknar kretsen?\n\nb. Vilken boolesk operation beräknar kretsen?"
    },
    "steps": {
      "en": [
        "Name the original inputs A and B. In a, both inputs pass through NOT, then through NOR. NOR gives 1 only when both of its own inputs are 0. Therefore both original inputs must be 1 for this circuit to give 1.",
        "Check a for all input pairs: 00 → inverted 11 → NOR 0; 01 → 10 → 0; 10 → 01 → 0; 11 → 00 → 1. The sequence 0, 0, 0, 1 is the truth table of AND.",
        "In b, each gate is NAND. Label the first output N = NOT(A AND B), the upper middle output P = NOT(A AND N), and the lower middle output R = NOT(B AND N). The final output is NOT(P AND R). A NAND is 0 only for inputs 11.",
        "Trace b completely:\nA B → N → P R → output\n0 0 → 1 → 1 1 → 0\n0 1 → 1 → 1 0 → 1\n1 0 → 1 → 0 1 → 1\n1 1 → 0 → 1 1 → 0.\nFor example, in the 01 row, N = NAND(0,1) = 1; P = NAND(0,1) = 1; R = NAND(1,1) = 0; final NAND(1,0) = 1.",
        "The output of b is 1 exactly when A and B differ. That operation is XOR, also called exclusive OR."
      ],
      "sv": [
        "Kalla de ursprungliga ingångarna A och B. I a går båda ingångarna genom NOT och sedan genom NOR. NOR ger 1 endast när båda dess egna ingångar är 0. Därför måste båda ursprungliga ingångarna vara 1 för att kretsen ska ge 1.",
        "Kontrollera a för alla ingångspar: 00 → inverterat 11 → NOR 0; 01 → 10 → 0; 10 → 01 → 0; 11 → 00 → 1. Följden 0, 0, 0, 1 är sanningstabellen för AND.",
        "I b är varje grind en NAND. Kalla den första utgången N = NOT(A AND B), den övre mittenutgången P = NOT(A AND N) och den nedre mittenutgången R = NOT(B AND N). Slutresultatet är NOT(P AND R). En NAND ger 0 endast för ingångarna 11.",
        "Följ b fullständigt:\nA B → N → P R → utsignal\n0 0 → 1 → 1 1 → 0\n0 1 → 1 → 1 0 → 1\n1 0 → 1 → 0 1 → 1\n1 1 → 0 → 1 1 → 0.\nExempelvis gäller i raden 01: N = NAND(0,1) = 1; P = NAND(0,1) = 1; R = NAND(1,1) = 0; slutlig NAND(1,0) = 1.",
        "Utsignalen i b är 1 exakt när A och B är olika. Den operationen är XOR, även kallad exklusivt eller."
      ]
    },
    "answer": {
      "en": "a. AND. b. XOR.",
      "sv": "a. AND (och). b. XOR (exklusivt eller)."
    },
    "figures": [
      {
        "file": {
          "en": "foundations-review2a-en.svg",
          "sv": "foundations-review2a-sv.svg"
        },
        "caption": {
          "en": "Part a: NOT on each input, then NOR.",
          "sv": "Del a: NOT på varje ingång, sedan NOR."
        },
        "alt": {
          "en": "Two inverted inputs feed a NOR gate.",
          "sv": "Två inverterade ingångar går till en NOR-grind."
        }
      },
      {
        "file": {
          "en": "foundations-review2b-en.svg",
          "sv": "foundations-review2b-sv.svg"
        },
        "caption": {
          "en": "Part b: a network of four NAND gates.",
          "sv": "Del b: ett nät av fyra NAND-grindar."
        },
        "alt": {
          "en": "The first NAND receives both inputs; its output and each original input feed two further NAND gates, whose outputs enter the last NAND.",
          "sv": "Den första NAND-grinden tar emot båda ingångarna. Dess utsignal och var sin ursprunglig ingång går till ytterligare två NAND-grindar. Deras utsignaler går till den sista NAND-grinden."
        }
      }
    ]
  },
  {
    "id": "review-3",
    "section": "review",
    "number": "3",
    "kind": "review",
    "page": 102,
    "title": {
      "en": "Count clock pulses with stored bits",
      "sv": "Räkna klockpulser med lagrade bitar"
    },
    "question": {
      "en": "a. If we were to purchase a flip-flop circuit from an electronic component store, we may find that it has an additional input called flip. When this input changes from a 0 to 1, the output flips state (i.e., if it was 0, it is now 1 and vice versa). However, when the flip input changes from 1 to a 0, nothing happens. Even though we may not know the details of the circuitry needed to accomplish this behavior, we could still use this device as an abstract tool in other circuits. Consider the circuitry using two of the following flip-flops. If a pulse were sent on the circuit’s input, the bottom flip-flop would change state. However, the second flip-flop would not change, since its input (received from the output of the NOT gate) went from a 1 to a 0. As a result, this circuit would now produce the outputs 0 and 1. A second pulse would flip the state of both flip-flops, producing an output of 1 and 0. What would be the output after a third pulse? After a fourth pulse?\n\nb. It is often necessary to coordinate activities of various components within a computer. This is accomplished by connecting a pulsating signal (called a clock) to circuitry similar to part a. Additional gates (as shown) send signals in a coordinated fashion to other connected circuits. On studying this circuit, you should be able to confirm that on the 1st, 5th, 9th … pulses of the clock, a 1 will be sent on output A. On what pulses of the clock will a 1 be sent on output B? On what pulses of the clock will a 1 be sent on output C? On which output is a 1 sent on the 4th pulse of the clock?",
      "sv": "a. Om vi köper en vippkrets i en butik för elektronikkomponenter kan den ha en extra ingång kallad flip. När denna ingång ändras från 0 till 1 växlar utsignalen tillstånd, det vill säga från 0 till 1 eller tvärtom. När flip-ingången ändras från 1 till 0 händer däremot ingenting. Även utan att känna till detaljerna i kretsen som åstadkommer detta kan vi använda enheten som ett abstrakt verktyg i andra kretsar. Betrakta den visade kretsen med två sådana vippor. Om en puls skickas till kretsens ingång växlar den nedre vippan tillstånd. Den andra vippan ändras däremot inte, eftersom dess ingång, som kommer från NOT-grindens utgång, går från 1 till 0. Kretsen ger då utsignalerna 0 och 1. En andra puls växlar båda vippornas tillstånd och ger utsignalerna 1 och 0. Vad blir utsignalerna efter en tredje puls? Efter en fjärde puls?\n\nb. Det är ofta nödvändigt att samordna aktiviteterna hos olika komponenter i en dator. Detta görs genom att ansluta en pulserande signal, kallad en klocka, till kretsar som liknar den i del a. Ytterligare grindar, som i bilden, skickar samordnade signaler till andra anslutna kretsar. Genom att undersöka kretsen bör du kunna bekräfta att en 1:a skickas på utgång A vid klockans 1:a, 5:e, 9:e … puls. Vid vilka klockpulser skickas en 1:a på utgång B? Vid vilka klockpulser skickas en 1:a på utgång C? På vilken utgång skickas en 1:a vid den 4:e klockpulsen?"
    },
    "steps": {
      "en": [
        "For a, call the upper stored bit H and the lower bit L; write the output as HL. The drawing starts at 00. A rising edge means a change 0 → 1. Only a rising edge on a flip input changes that flip-flop’s stored bit.",
        "Every input pulse toggles L. When L changes 0 → 1, NOT L changes 1 → 0, which does not toggle H. When L changes 1 → 0, NOT L changes 0 → 1, which does toggle H. Thus H changes on every second pulse.",
        "Follow the states: initially 00; pulse 1 gives 01; pulse 2 gives 10; pulse 3 changes only L and gives 11; pulse 4 changes L from 1 to 0 and toggles H from 1 to 0, giving 00. The four-state cycle then repeats.",
        "For b, inspect each AND gate. A = (NOT H) AND L, B = H AND (NOT L), C = H AND L. These select the states 01, 10 and 11 respectively. An AND output is 1 only when both conditions at that gate hold.",
        "Match the states to pulse numbers: 01 occurs on 1, 5, 9, … and activates A. State 10 occurs on 2, 6, 10, … and activates B. State 11 occurs on 3, 7, 11, … and activates C. State 00 occurs on 4, 8, 12, … and makes all three outputs 0.",
        "We are describing the settled logical state after each pulse, as the exercise does. The repeating sequence is useful because different operations can be assigned different turns in a four-pulse cycle."
      ],
      "sv": [
        "För a kallar vi den övre lagrade biten H och den nedre L och skriver utsignalen som HL. Bilden börjar i 00. En stigande flank betyder en ändring 0 → 1. Endast en stigande flank på en flip-ingång ändrar den vippans lagrade bit.",
        "Varje ingångspuls växlar L. När L ändras 0 → 1 ändras NOT L 1 → 0, vilket inte växlar H. När L ändras 1 → 0 ändras NOT L 0 → 1, vilket växlar H. Alltså ändras H vid varannan puls.",
        "Följ tillstånden: från början 00; puls 1 ger 01; puls 2 ger 10; puls 3 ändrar bara L och ger 11; puls 4 ändrar L från 1 till 0 och växlar H från 1 till 0, vilket ger 00. Därefter upprepas cykeln med fyra tillstånd.",
        "För b undersöker vi varje AND-grind. A = (NOT H) AND L, B = H AND (NOT L), C = H AND L. Dessa väljer tillstånden 01, 10 respektive 11. En AND-utgång blir 1 endast när båda villkoren vid grinden är uppfyllda.",
        "Koppla tillstånden till pulsnumren: 01 inträffar vid 1, 5, 9, … och aktiverar A. Tillstånd 10 inträffar vid 2, 6, 10, … och aktiverar B. Tillstånd 11 inträffar vid 3, 7, 11, … och aktiverar C. Tillstånd 00 inträffar vid 4, 8, 12, … och gör alla tre utsignalerna till 0.",
        "Vi beskriver det stabila logiska tillståndet efter varje puls, precis som uppgiften. Den återkommande följden är användbar eftersom olika operationer kan få olika turer i en cykel med fyra pulser."
      ]
    },
    "answer": {
      "en": "a. Third pulse: 11. Fourth pulse: 00.\nb. B: pulses 2, 6, 10, …; C: pulses 3, 7, 11, …; on pulse 4, none of A, B or C outputs 1.",
      "sv": "a. Tredje pulsen: 11. Fjärde pulsen: 00.\nb. B: puls 2, 6, 10, …; C: puls 3, 7, 11, …; vid puls 4 ger ingen av A, B eller C utsignalen 1."
    },
    "figures": [
      {
        "file": {
          "en": "foundations-review3a-en.svg",
          "sv": "foundations-review3a-sv.svg"
        },
        "caption": {
          "en": "Part a: the two-bit pulse counter, initially 00.",
          "sv": "Del a: pulsräknaren med två bitar, från början 00."
        },
        "alt": {
          "en": "Lower flip-flop receives pulses. Its output is inverted into the upper flip-flop’s flip input. Both stored output bits initially equal zero.",
          "sv": "Nedre vippan tar emot pulser. Dess utsignal inverteras och går till den övre vippans flip-ingång. Båda lagrade utgångsbitarna är från början noll."
        }
      },
      {
        "file": {
          "en": "foundations-review3b-en.svg",
          "sv": "foundations-review3b-sv.svg"
        },
        "caption": {
          "en": "Part b: the counter and three output gates.",
          "sv": "Del b: räknaren och tre utgångsgrindar."
        },
        "alt": {
          "en": "The two-bit counter feeds AND gates: A combines inverted upper bit and lower bit; B upper bit and inverted lower bit; C both bits directly.",
          "sv": "Tvåbitsräknaren går till AND-grindar: A kombinerar inverterad övre bit med nedre bit; B kombinerar övre bit med inverterad nedre bit; C kombinerar båda bitarna direkt."
        }
      }
    ]
  },
  {
    "id": "review-4",
    "section": "review",
    "number": "4",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "An active-low memory circuit",
      "sv": "En minneskrets som styrs med nollpulser"
    },
    "question": {
      "en": "Assume that both of the inputs in the following circuit are 1. Describe what would happen if the upper input were temporarily changed to 0. Describe what would happen if the lower input were temporarily changed to 0. Redraw the circuit using NAND gates.",
      "sv": "Anta att båda ingångarna i följande krets är 1. Beskriv vad som händer om den övre ingången tillfälligt ändras till 0. Beskriv vad som händer om den nedre ingången tillfälligt ändras till 0. Rita om kretsen med NAND-grindar."
    },
    "steps": {
      "en": [
        "The visible output Q comes from the upper NOT gate. Each branch has AND followed by NOT. The output of each branch feeds back into the other branch. Both external inputs at 1 preserve the previously stored state; they do not by themselves specify whether Q starts at 0 or 1.",
        "First case: pulse the UPPER input to 0 while the lower remains 1. The upper AND becomes 0 because one input is 0. Upper NOT therefore becomes 1, so Q = 1. This 1 enters the lower AND with the lower external 1, giving lower AND = 1 and lower NOT = 0.",
        "Return the upper external input to 1. The upper AND still receives the feedback 0 from the lower branch, so it stays 0 and Q stays 1. The pulse has set the stored bit to 1.",
        "Second case: pulse the LOWER input to 0 while the upper remains 1. Lower AND becomes 0 and lower NOT becomes 1. Upper AND now receives 1 and 1, so it becomes 1; upper NOT gives Q = 0. Feedback then keeps the lower branch’s output at 1 even when the lower external input returns to 1. The stored bit remains 0.",
        "To redraw, replace each AND–NOT pair with one NAND gate: NAND means exactly NOT(AND). Preserve the two external input wires, both crossed feedback paths, and the output from the upper gate. The solution diagram shows this equivalent two-NAND circuit."
      ],
      "sv": [
        "Den synliga utsignalen Q kommer från den övre NOT-grinden. Varje gren har AND följd av NOT. Varje grens utgång återkopplas till den andra grenen. Två yttre ingångar på 1 behåller det tidigare lagrade tillståndet; de bestämmer inte i sig om Q börjar på 0 eller 1.",
        "Första fallet: ge den ÖVRE ingången en puls till 0 medan den nedre förblir 1. Övre AND blir 0 eftersom en ingång är 0. Övre NOT blir därför 1, så Q = 1. Denna 1:a går till nedre AND tillsammans med den nedre yttre 1:an, vilket ger nedre AND = 1 och nedre NOT = 0.",
        "Låt den övre yttre ingången återgå till 1. Övre AND tar fortfarande emot återkopplingens 0 från nedre grenen och förblir därför 0. Q förblir 1. Pulsen har satt den lagrade biten till 1.",
        "Andra fallet: ge den NEDRE ingången en puls till 0 medan den övre förblir 1. Nedre AND blir 0 och nedre NOT blir 1. Övre AND tar nu emot 1 och 1 och blir därför 1. Övre NOT ger Q = 0. Återkopplingen behåller sedan nedre grenens utgång på 1 även när den nedre yttre ingången återgår till 1. Den lagrade biten förblir 0.",
        "Rita om genom att ersätta varje AND–NOT-par med en NAND-grind: NAND betyder exakt NOT(AND). Behåll de två yttre ingångsledningarna, båda korsande återkopplingsvägarna och utgången från den övre grinden. Lösningsbilden visar denna likvärdiga krets med två NAND-grindar."
      ]
    },
    "answer": {
      "en": "An upper-input 0 pulse sets and stores Q = 1. A lower-input 0 pulse resets and stores Q = 0. The equivalent circuit consists of two cross-coupled NAND gates.",
      "sv": "En 0-puls på övre ingången sätter och lagrar Q = 1. En 0-puls på nedre ingången nollställer och lagrar Q = 0. Den likvärdiga kretsen består av två korskopplade NAND-grindar."
    },
    "figures": [
      {
        "file": "foundations-review4.svg",
        "caption": {
          "en": "Review 4: the original AND–NOT feedback circuit.",
          "sv": "Repetition 4: den ursprungliga återkopplingskretsen med AND–NOT."
        },
        "alt": {
          "en": "Two cross-coupled branches each contain AND followed by NOT. The external output is from the upper NOT.",
          "sv": "Två korskopplade grenar innehåller var sin AND följd av NOT. Den yttre utsignalen tas från den övre NOT-grinden."
        }
      }
    ],
    "solutionFigures": [
      {
        "file": {
          "en": "foundations-review4-solution-en.svg",
          "sv": "foundations-review4-solution-sv.svg"
        },
        "caption": {
          "en": "Equivalent circuit: each AND–NOT pair becomes NAND.",
          "sv": "Likvärdig krets: varje AND–NOT-par blir NAND."
        },
        "alt": {
          "en": "Two NAND gates with crossed feedback. Upper external input and lower output feed upper NAND; lower external input and upper output feed lower NAND. Q is the upper output.",
          "sv": "Två NAND-grindar med korsad återkoppling. Övre yttre ingången och nedre utgången går till övre NAND. Nedre yttre ingången och övre utgången går till nedre NAND. Q är den övre utgången."
        }
      }
    ]
  },
  {
    "id": "review-5",
    "section": "review",
    "number": "5",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "Track changing memory contents",
      "sv": "Följ hur minnesinnehåll ändras"
    },
    "question": {
      "en": "The following table represents the addresses and contents (using hexadecimal notation) of some cells in a machine’s main memory. Starting with this memory arrangement, follow the sequence of instructions and record the final contents of each of these memory cells:\nAddress  Contents\n0x00  0xAB\n0x01  0x53\n0x02  0xD6\n0x03  0x02\n\nStep 1. Move the contents of the cell whose address is 0x03 to the cell at address 0x00.\nStep 2. Move the value 0x01 into the cell at address 0x02.\nStep 3. Move the value stored at address 0x01 into the cell at address 0x03.",
      "sv": "Följande tabell visar adresserna och innehållet, med hexadecimal notation, för några celler i en dators primärminne. Utgå från detta minnesinnehåll, följ instruktionerna och skriv det slutliga innehållet i var och en av cellerna:\nAdress  Innehåll\n0x00  0xAB\n0x01  0x53\n0x02  0xD6\n0x03  0x02\n\nSteg 1. Flytta innehållet i cellen med adress 0x03 till cellen med adress 0x00.\nSteg 2. Flytta värdet 0x01 till cellen med adress 0x02.\nSteg 3. Flytta värdet som lagras på adress 0x01 till cellen med adress 0x03."
    },
    "steps": {
      "en": [
        "Separate addresses from values. An address tells us which box to use. “Contents at address” means read that box. “The value 0x01” means the literal value, with no lookup. Each move here copies data and leaves the source unchanged.",
        "Instruction 1 reads address 0x03, whose contents are 0x02, then writes 0x02 at address 0x00. State, in address order 00, 01, 02, 03: 02, 53, D6, 02. The old AB at address 00 is replaced.",
        "Instruction 2 writes the literal value 0x01 at address 0x02. It does not copy the contents of address 0x01. State: 02, 53, 01, 02.",
        "Instruction 3 reads address 0x01, still holding 0x53, and copies 0x53 to address 0x03. State: 02, 53, 01, 53. No instruction changes address 0x01, so its contents stay 0x53 throughout."
      ],
      "sv": [
        "Skilj adresser från värden. En adress säger vilken låda vi ska använda. ”Innehållet på adress” betyder att läsa den lådan. ”Värdet 0x01” betyder själva värdet, utan uppslagning. Varje flytt här kopierar data och lämnar källan oförändrad.",
        "Instruktion 1 läser adress 0x03, vars innehåll är 0x02, och skriver sedan 0x02 på adress 0x00. Tillstånd i adressordningen 00, 01, 02, 03: 02, 53, D6, 02. Det gamla AB på adress 00 ersätts.",
        "Instruktion 2 skriver själva värdet 0x01 på adress 0x02. Den kopierar inte innehållet på adress 0x01. Tillstånd: 02, 53, 01, 02.",
        "Instruktion 3 läser adress 0x01, som fortfarande innehåller 0x53, och kopierar 0x53 till adress 0x03. Tillstånd: 02, 53, 01, 53. Ingen instruktion ändrar adress 0x01, så dess innehåll förblir 0x53 hela tiden."
      ]
    },
    "answer": {
      "en": "Address → final contents\n0x00 → 0x02\n0x01 → 0x53\n0x02 → 0x01\n0x03 → 0x53",
      "sv": "Adress → slutligt innehåll\n0x00 → 0x02\n0x01 → 0x53\n0x02 → 0x01\n0x03 → 0x53"
    }
  },
  {
    "id": "review-6",
    "section": "review",
    "number": "6",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "How many addresses are possible?",
      "sv": "Hur många adresser är möjliga?"
    },
    "question": {
      "en": "How many cells can be in a computer’s main memory if each cell’s address can be represented by two hexadecimal digits? What if four hexadecimal digits are used?",
      "sv": "Hur många celler kan en dators primärminne innehålla om varje cells adress kan representeras med två hexadecimala siffror? Hur många om fyra hexadecimala siffror används?"
    },
    "steps": {
      "en": [
        "One hexadecimal digit has 16 possibilities: 0–9 and A–F. Each memory cell needs its own address, so the number of available address patterns is the maximum number of addressable cells.",
        "For two digits, choose the first in 16 ways and the second in 16 ways. Every first choice can pair with every second choice: 16 × 16 = 256 addresses, from 0x00 through 0xFF.",
        "For four digits, multiply four factors of 16: 16 × 16 × 16 × 16 = 65,536 addresses, from 0x0000 through 0xFFFF. Equivalently, four hexadecimal digits contain 16 bits, giving 2¹⁶ patterns.",
        "Do not subtract one from these counts. Although the largest two-digit address has numeric value 255, address zero also names a cell: 0 through 255 contains 256 addresses."
      ],
      "sv": [
        "En hexadecimal siffra har 16 möjligheter: 0–9 och A–F. Varje minnescell behöver en egen adress. Antalet tillgängliga adressmönster är därför det största antalet celler som kan adresseras.",
        "För två siffror kan den första väljas på 16 sätt och den andra på 16 sätt. Varje första val kan kombineras med varje andra val: 16 × 16 = 256 adresser, från 0x00 till och med 0xFF.",
        "För fyra siffror multiplicerar du fyra faktorer 16: 16 × 16 × 16 × 16 = 65 536 adresser, från 0x0000 till och med 0xFFFF. Fyra hexadecimala siffror innehåller även 16 bitar, vilket ger 2¹⁶ mönster.",
        "Dra inte bort ett från dessa antal. Den största tvåsiffriga adressen har visserligen talvärdet 255, men även adress noll betecknar en cell: 0 till och med 255 innehåller 256 adresser."
      ]
    },
    "answer": {
      "en": "Two hexadecimal digits: 256 cells. Four hexadecimal digits: 65,536 cells.",
      "sv": "Två hexadecimala siffror: 256 celler. Fyra hexadecimala siffror: 65 536 celler."
    }
  },
  {
    "id": "review-7",
    "section": "review",
    "number": "7",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "Expand hexadecimal patterns",
      "sv": "Utveckla hexadecimala mönster"
    },
    "question": {
      "en": "What bit patterns are represented by the following hexadecimal notations?\na. 0x8A9\nb. 0xDCB\nc. 0xEF3\nd. 0xA01\ne. 0xC99",
      "sv": "Vilka bitmönster representeras av följande hexadecimala beteckningar?\na. 0x8A9\nb. 0xDCB\nc. 0xEF3\nd. 0xA01\ne. 0xC99"
    },
    "steps": {
      "en": [
        "Each hexadecimal digit becomes exactly four bits. Use 8, 4, 2, 1 as the place values in each group, and remember A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Keep the digit order and retain all four bits per digit.",
        "a. 8 = 8 → 1000; A = 10 → 1010; 9 = 9 → 1001.",
        "b. D = 13 → 1101; C = 12 → 1100; B = 11 → 1011.",
        "c. E = 14 → 1110; F = 15 → 1111; 3 = 3 → 0011.",
        "d. A = 10 → 1010; 0 = 0 → 0000; 1 = 1 → 0001.",
        "e. C = 12 → 1100; 9 = 9 → 1001; 9 = 9 → 1001."
      ],
      "sv": [
        "Varje hexadecimal siffra blir exakt fyra bitar. Använd 8, 4, 2, 1 som platsvärden i varje grupp och kom ihåg A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Behåll siffrornas ordning och alla fyra bitar per siffra.",
        "a. 8 = 8 → 1000; A = 10 → 1010; 9 = 9 → 1001.",
        "b. D = 13 → 1101; C = 12 → 1100; B = 11 → 1011.",
        "c. E = 14 → 1110; F = 15 → 1111; 3 = 3 → 0011.",
        "d. A = 10 → 1010; 0 = 0 → 0000; 1 = 1 → 0001.",
        "e. C = 12 → 1100; 9 = 9 → 1001; 9 = 9 → 1001."
      ]
    },
    "answer": {
      "en": "a. 1000 1010 1001\nb. 1101 1100 1011\nc. 1110 1111 0011\nd. 1010 0000 0001\ne. 1100 1001 1001",
      "sv": "a. 1000 1010 1001\nb. 1101 1100 1011\nc. 1110 1111 0011\nd. 1010 0000 0001\ne. 1100 1001 1001"
    }
  },
  {
    "id": "review-8",
    "section": "review",
    "number": "8",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "Find the rightmost bit",
      "sv": "Hitta biten längst till höger"
    },
    "question": {
      "en": "What is the value of the least significant bit in the bit patterns represented by the following hexadecimal notations?\na. 0x9A\nb. 0x90\nc. 0x1B\nd. 0x6E",
      "sv": "Vilket värde har den minst signifikanta biten i bitmönstren som representeras av följande hexadecimala beteckningar?\na. 0x9A\nb. 0x90\nc. 0x1B\nd. 0x6E"
    },
    "steps": {
      "en": [
        "The least significant bit is the rightmost bit, the one with place value 1. Only the final hexadecimal digit can contain that bit. Earlier digits cannot change it.",
        "a. The final digit is A = 10 = 8 + 2 → 1010. Its rightmost bit is 0.",
        "b. The final digit is 0 → 0000. Its rightmost bit is 0.",
        "c. The final digit is B = 11 = 8 + 2 + 1 → 1011. Its rightmost bit is 1.",
        "d. The final digit is E = 14 = 8 + 4 + 2 → 1110. Its rightmost bit is 0. As a check, even integers end in binary 0 and odd integers end in binary 1."
      ],
      "sv": [
        "Den minst signifikanta biten är biten längst till höger, den med platsvärdet 1. Endast den sista hexadecimala siffran innehåller den biten. Tidigare siffror kan inte ändra den.",
        "a. Sista siffran är A = 10 = 8 + 2 → 1010. Biten längst till höger är 0.",
        "b. Sista siffran är 0 → 0000. Biten längst till höger är 0.",
        "c. Sista siffran är B = 11 = 8 + 2 + 1 → 1011. Biten längst till höger är 1.",
        "d. Sista siffran är E = 14 = 8 + 4 + 2 → 1110. Biten längst till höger är 0. Som kontroll slutar jämna heltal med binär 0 och udda heltal med binär 1."
      ]
    },
    "answer": {
      "en": "a. 0; b. 0; c. 1; d. 0.",
      "sv": "a. 0; b. 0; c. 1; d. 0."
    }
  },
  {
    "id": "review-9",
    "section": "review",
    "number": "9",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "Compress bits into hexadecimal notation",
      "sv": "Skriv bitar med hexadecimal notation"
    },
    "question": {
      "en": "Express the following bit patterns in hexadecimal notation:\na. 10110100101101001011\nb. 000111100001\nc. 1111111011011011",
      "sv": "Skriv följande bitmönster med hexadecimal notation:\na. 10110100101101001011\nb. 000111100001\nc. 1111111011011011"
    },
    "steps": {
      "en": [
        "Group the pattern into four-bit blocks from the right. One block becomes one hexadecimal digit. Add place values 8, 4, 2, 1 within a block; use A–F for values 10–15. This changes the notation, not the stored information.",
        "a. 1011 | 0100 | 1011 | 0100 | 1011. Here 1011 = 8 + 2 + 1 = 11 = B, and 0100 = 4. The digits become B, 4, B, 4, B → 0xB4B4B.",
        "b. 0001 | 1110 | 0001 → 1 | (8 + 4 + 2) | 1 → 1 | E | 1 → 0x1E1.",
        "c. 1111 | 1110 | 1101 | 1011 → 15 | 14 | 13 | 11 → F | E | D | B → 0xFEDB. To check, expand each hexadecimal digit back into its four-bit block."
      ],
      "sv": [
        "Dela mönstret i fyrabitarsgrupper från höger. En grupp blir en hexadecimal siffra. Addera platsvärdena 8, 4, 2, 1 inom gruppen och använd A–F för värdena 10–15. Detta ändrar skrivsättet, inte den lagrade informationen.",
        "a. 1011 | 0100 | 1011 | 0100 | 1011. Här är 1011 = 8 + 2 + 1 = 11 = B och 0100 = 4. Siffrorna blir B, 4, B, 4, B → 0xB4B4B.",
        "b. 0001 | 1110 | 0001 → 1 | (8 + 4 + 2) | 1 → 1 | E | 1 → 0x1E1.",
        "c. 1111 | 1110 | 1101 | 1011 → 15 | 14 | 13 | 11 → F | E | D | B → 0xFEDB. Kontrollera genom att utveckla varje hexadecimal siffra tillbaka till sin fyrabitarsgrupp."
      ]
    },
    "answer": {
      "en": "a. 0xB4B4B\nb. 0x1E1\nc. 0xFEDB",
      "sv": "a. 0xB4B4B\nb. 0x1E1\nc. 0xFEDB"
    }
  },
  {
    "id": "review-10",
    "section": "review",
    "number": "10",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "Count photographs that fit",
      "sv": "Räkna fotografierna som får plats"
    },
    "question": {
      "en": "Suppose a digital camera has a storage capacity of 500MB. How many black-and-white photographs could be stored in the camera if each consisted of 512 pixels per row and 512 pixels per column if each pixel required one bit of storage?",
      "sv": "Anta att en digitalkamera har lagringskapaciteten 500 MB. Hur många svartvita fotografier kan lagras i kameran om varje bild består av 512 bildpunkter per rad och 512 bildpunkter per kolumn, och varje bildpunkt kräver en bit lagring?"
    },
    "steps": {
      "en": [
        "A picture is a rectangular grid. Multiply rows by columns to count its pixels: 512 × 512 = 262,144 pixels. At one bit per pixel, one photograph contains 262,144 bits.",
        "Convert the picture size to bytes so it matches the capacity unit: 262,144 ÷ 8 = 32,768 bytes per photograph. This model uses two colours only, no grey levels, headers or compression.",
        "Using the book’s binary convention for MB, capacity = 500 × 1,024 × 1,024 = 524,288,000 bytes. Divide capacity by picture size: 524,288,000 ÷ 32,768 = 16,000 photographs exactly.",
        "The notation matters: if 500 MB means the decimal 500,000,000 bytes, the quotient is about 15,258.79. Only whole pictures fit, so round DOWN to 15,258. The precise binary unit for the first calculation is MiB. Both results are valid under their stated capacity conventions."
      ],
      "sv": [
        "En bild är ett rektangulärt rutnät. Multiplicera antalet rader med antalet kolumner för att räkna bildpunkterna: 512 × 512 = 262 144 bildpunkter. Med en bit per bildpunkt innehåller ett fotografi 262 144 bitar.",
        "Omvandla bildstorleken till byte så att enheten stämmer med kapaciteten: 262 144 ÷ 8 = 32 768 byte per fotografi. Modellen använder bara två färger och räknar inte gråtoner, filhuvuden eller komprimering.",
        "Med bokens binära MB-konvention blir kapaciteten 500 × 1 024 × 1 024 = 524 288 000 byte. Dividera kapaciteten med bildstorleken: 524 288 000 ÷ 32 768 = exakt 16 000 fotografier.",
        "Notationen spelar roll: om 500 MB betyder decimala 500 000 000 byte blir kvoten ungefär 15 258,79. Bara hela bilder får plats, så avrunda NEDÅT till 15 258. Den exakta binära enheten för första beräkningen är MiB. Båda resultaten är riktiga med respektive angiven kapacitetskonvention."
      ]
    },
    "answer": {
      "en": "Book’s binary MB convention: 16,000 photographs. Decimal 500 MB convention: 15,258 complete photographs. Both ignore file overhead.",
      "sv": "Bokens binära MB-konvention: 16 000 fotografier. Decimal kapacitet på 500 MB: 15 258 hela fotografier. Båda bortser från extra filinformation."
    }
  },
  {
    "id": "review-11",
    "section": "review",
    "number": "11",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "Combine colour and intensity storage",
      "sv": "Kombinera lagring för färg och intensitet"
    },
    "question": {
      "en": "Suppose an image is represented on a display screen by a square array containing 256 columns and 256 rows of pixels. If for each pixel, 3 bytes are required to encode the color and 8 bits to encode the intensity, how many byte-size memory cells are required to hold the entire picture?",
      "sv": "Anta att en bild visas på en skärm som ett kvadratiskt rutnät med 256 kolumner och 256 rader av bildpunkter. Om varje bildpunkt kräver 3 byte för färgen och 8 bitar för intensiteten, hur många minnesceller på en byte krävs för att lagra hela bilden?"
    },
    "steps": {
      "en": [
        "First count pixels: 256 columns × 256 rows = 65,536 pixels. Every position in the grid requires its own stored description.",
        "Use one unit for all parts. The intensity requires 8 bits, and 8 bits = 1 byte. The question asks for this IN ADDITION to the 3 bytes of colour data.",
        "One pixel therefore requires 3 + 1 = 4 bytes. Multiply by all pixels: 65,536 × 4 = 262,144 bytes. Since one memory cell holds one byte, the number of cells is the same as the number of bytes."
      ],
      "sv": [
        "Räkna först bildpunkterna: 256 kolumner × 256 rader = 65 536 bildpunkter. Varje position i rutnätet behöver en egen lagrad beskrivning.",
        "Använd en gemensam enhet för alla delar. Intensiteten kräver 8 bitar, och 8 bitar = 1 byte. Uppgiften anger att detta behövs UTÖVER färgdatans 3 byte.",
        "En bildpunkt kräver därför 3 + 1 = 4 byte. Multiplicera med alla bildpunkter: 65 536 × 4 = 262 144 byte. Eftersom en minnescell rymmer en byte är antalet celler lika med antalet byte."
      ]
    },
    "answer": {
      "en": "262,144 byte-size cells, equal to 262,144 bytes or 256 KiB.",
      "sv": "262 144 minnesceller på en byte, vilket är 262 144 byte eller 256 KiB."
    }
  },
  {
    "id": "review-12",
    "section": "review",
    "number": "12",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "Disk zones and access time",
      "sv": "Skivzoner och åtkomsttid"
    },
    "question": {
      "en": "a. What are the advantages, if any, of using zoned-bit recording for disk storage systems?\nb. What is the difference between seek time and access time?",
      "sv": "a. Vilka fördelar, om några, finns med att använda zonindelad bitlagring i disksystem?\nb. Vad är skillnaden mellan söktid och åtkomsttid?"
    },
    "steps": {
      "en": [
        "For a, picture two circular tracks: one near the centre and one near the edge. The outer track is longer. If both had the same number of sectors, the outer track would use its available length less efficiently.",
        "Zoned-bit recording groups nearby tracks into zones and places more sectors per track in outer zones. It uses the longer outer tracks to store more data, increasing disk capacity. With a fixed rotation speed, those tracks can also pass more data under the head per second.",
        "For b, seek time is the time spent moving the read/write head to the correct track. That is only the first part of reaching a requested item.",
        "After seeking, the disk may need to rotate until the requested sector reaches the head. In the book’s model, average access time = average seek time + average rotational delay. Transferring the data is a further operation; access time here describes getting to it."
      ],
      "sv": [
        "För a föreställer du dig två cirkulära spår: ett nära mitten och ett nära kanten. Det yttre spåret är längre. Om båda hade lika många sektorer skulle det yttre spåret utnyttja sin tillgängliga längd sämre.",
        "Zonindelad bitlagring grupperar närliggande spår i zoner och placerar fler sektorer per spår i de yttre zonerna. De längre yttre spåren används då för mer data, vilket ökar diskens kapacitet. Med fast rotationshastighet kan dessa spår också föra mer data under huvudet varje sekund.",
        "För b är söktid den tid som går åt för att flytta läs- och skrivhuvudet till rätt spår. Det är bara den första delen av att nå önskad data.",
        "Efter sökningen kan skivan behöva rotera tills önskad sektor når huvudet. I bokens modell gäller genomsnittlig åtkomsttid = genomsnittlig söktid + genomsnittlig rotationsfördröjning. Själva överföringen av data är ytterligare en operation; åtkomsttiden här beskriver att nå datan."
      ]
    },
    "answer": {
      "en": "a. More efficient use of outer tracks gives greater capacity and can give faster outer-track transfer.\nb. Seek time moves the head; access time also includes rotational waiting.",
      "sv": "a. Effektivare användning av yttre spår ger större kapacitet och kan ge snabbare överföring på yttre spår.\nb. Söktiden avser huvudets förflyttning; åtkomsttiden omfattar även väntan på rotationen."
    }
  },
  {
    "id": "review-13",
    "section": "review",
    "number": "13",
    "kind": "review",
    "page": 103,
    "title": {
      "en": "Choose enough optical discs for a backup",
      "sv": "Välj tillräckligt många optiska skivor för en säkerhetskopia"
    },
    "question": {
      "en": "Suppose that you want to create a backup of your entire data which is around 10GB. Would it be reasonable to use DVDs for the purpose of creating this backup? What about BDs (Blu-ray Disks)?",
      "sv": "Anta att du vill säkerhetskopiera alla dina data, som uppgår till ungefär 10 GB. Är det rimligt att använda DVD-skivor för säkerhetskopian? Hur är det med BD-skivor, det vill säga Blu-ray?"
    },
    "steps": {
      "en": [
        "Compare the total data size with the capacity of the chosen disc type. DVD and Blu-ray have several layer configurations, so “one DVD” does not specify a unique capacity. State the type before calculating.",
        "For an illustrative 4.7 GB single-layer DVD, 10 ÷ 4.7 ≈ 2.13 discs. A fraction of a disc still requires another whole disc, so at least 3 such DVDs are needed. For an 8.5 GB dual-layer DVD, 10 ÷ 8.5 ≈ 1.18, so at least 2 are needed. These figures use decimal GB consistently and ignore small formatting overheads.",
        "A 25 GB single-layer Blu-ray has more capacity than the entire 10 GB collection: 10 < 25. One disc can hold it, assuming the drive and writing software support the chosen medium.",
        "Therefore DVDs are feasible if the backup can be split across several discs, but Blu-ray can be more convenient because it can hold the collection on one disc. The book’s general point is the larger capacity of Blu-ray; exact disc counts depend on the actual disc capacities."
      ],
      "sv": [
        "Jämför hela datamängden med kapaciteten hos den valda skivtypen. DVD och Blu-ray finns med olika antal lager, så ”en DVD” anger inte en enda bestämd kapacitet. Ange typen innan du räknar.",
        "För en DVD med ett lager och 4,7 GB blir 10 ÷ 4,7 ≈ 2,13 skivor. En del av en skiva kräver ändå ytterligare en hel skiva, så minst 3 sådana DVD-skivor behövs. För en DVD med två lager och 8,5 GB blir 10 ÷ 8,5 ≈ 1,18, så minst 2 behövs. Siffrorna använder decimala GB konsekvent och bortser från mindre formateringskostnader.",
        "En Blu-ray-skiva med ett lager och 25 GB rymmer mer än hela samlingen på 10 GB: 10 < 25. En skiva räcker, förutsatt att enheten och skrivprogrammet stöder det valda mediet.",
        "DVD är alltså möjligt om säkerhetskopian kan delas mellan flera skivor, men Blu-ray kan vara smidigare eftersom hela samlingen ryms på en skiva. Bokens allmänna poäng är Blu-rays större kapacitet. Det exakta antalet skivor beror på deras faktiska kapacitet."
      ]
    },
    "answer": {
      "en": "DVD is possible across multiple discs: for example 3 × 4.7 GB or 2 × 8.5 GB DVDs. A single 25 GB Blu-ray can hold about 10 GB.",
      "sv": "DVD fungerar med flera skivor: exempelvis 3 DVD à 4,7 GB eller 2 DVD à 8,5 GB. En enda Blu-ray på 25 GB rymmer ungefär 10 GB."
    }
  },
  {
    "id": "review-14",
    "section": "review",
    "number": "14",
    "kind": "review",
    "page": 104,
    "title": {
      "en": "Count disk sectors for integer data",
      "sv": "Räkna disksektorer för heltalsdata"
    },
    "question": {
      "en": "If each sector on a magnetic disk can store 512 bytes of data, how many sectors are required to store two pages of integers, where each page contains 10 lines, each line contains 100 integers, and every integer is represented by using four bytes?",
      "sv": "Om varje sektor på en magnetisk disk kan lagra 512 byte data, hur många sektorer krävs för att lagra två sidor med heltal, när varje sida innehåller 10 rader, varje rad innehåller 100 heltal och varje heltal representeras med fyra byte?"
    },
    "steps": {
      "en": [
        "Count the integers before counting bytes: 2 pages × 10 lines per page × 100 integers per line = 2,000 integers. The page and line units cancel, leaving a count of integers.",
        "Each integer takes 4 bytes, so total data = 2,000 × 4 = 8,000 bytes. We are using the storage size supplied by the question, with no additional page or line metadata.",
        "Divide by sector capacity: 8,000 ÷ 512 = 15.625 sectors. You cannot allocate just part of a sector as a whole sector count, so round UP to 16.",
        "Check: 15 sectors hold 15 × 512 = 7,680 bytes, which is not enough. The remaining 8,000 − 7,680 = 320 bytes need a sixteenth sector. That last sector has 512 − 320 = 192 unused bytes."
      ],
      "sv": [
        "Räkna heltalen innan du räknar byte: 2 sidor × 10 rader per sida × 100 heltal per rad = 2 000 heltal. Enheterna sida och rad tar ut varandra och lämnar ett antal heltal.",
        "Varje heltal kräver 4 byte, så hela datamängden är 2 000 × 4 = 8 000 byte. Vi använder lagringsstorleken i uppgiften utan extra information om sidor eller rader.",
        "Dividera med sektorkapaciteten: 8 000 ÷ 512 = 15,625 sektorer. Antalet sektorer måste vara ett heltal, så avrunda UPPÅT till 16.",
        "Kontroll: 15 sektorer rymmer 15 × 512 = 7 680 byte, vilket inte räcker. De återstående 8 000 − 7 680 = 320 byten kräver en sextonde sektor. Den sista sektorn har då 512 − 320 = 192 oanvända byte."
      ]
    },
    "answer": {
      "en": "16 sectors.",
      "sv": "16 sektorer."
    }
  },
  {
    "id": "review-15",
    "section": "review",
    "number": "15",
    "kind": "review",
    "page": 104,
    "title": {
      "en": "Calculate document storage",
      "sv": "Beräkna ett dokuments lagringsbehov"
    },
    "question": {
      "en": "How many bytes of storage space would be required to store a 20-page document containing details of employees, in which each page contains 100 records and every record is of 200 characters, if two-byte Unicode characters were used?",
      "sv": "Hur många byte lagringsutrymme krävs för ett dokument på 20 sidor med uppgifter om anställda, om varje sida innehåller 100 poster och varje post består av 200 tecken, när Unicode-tecken på två byte används?"
    },
    "steps": {
      "en": [
        "A record is one collection of details about an employee. Count all records: 20 pages × 100 records per page = 2,000 records.",
        "Each record contains 200 characters. Total characters = 2,000 × 200 = 400,000 characters.",
        "The question explicitly assigns 2 bytes to each character. Multiply: 400,000 × 2 = 800,000 bytes. The complete unit chain is pages × records/page × characters/record × bytes/character.",
        "This follows the exercise’s fixed two-byte assumption and counts the character data only. It does not claim that every possible Unicode character always uses two bytes in every encoding."
      ],
      "sv": [
        "En post är en samling uppgifter om en anställd. Räkna alla poster: 20 sidor × 100 poster per sida = 2 000 poster.",
        "Varje post innehåller 200 tecken. Totalt antal tecken = 2 000 × 200 = 400 000 tecken.",
        "Uppgiften anger uttryckligen 2 byte per tecken. Multiplicera: 400 000 × 2 = 800 000 byte. Hela enhetskedjan är sidor × poster/sida × tecken/post × byte/tecken.",
        "Detta följer uppgiftens antagande om exakt två byte per tecken och räknar bara teckendatan. Det betyder inte att varje möjligt Unicode-tecken alltid använder två byte i varje kodning."
      ]
    },
    "answer": {
      "en": "800,000 bytes of character data.",
      "sv": "800 000 byte teckendata."
    }
  },
  {
    "id": "review-16",
    "section": "review",
    "number": "16",
    "kind": "review",
    "page": 104,
    "title": {
      "en": "Why transfer speed changes across a disk",
      "sv": "Varför överföringshastigheten varierar över en skiva"
    },
    "question": {
      "en": "In zoned-bit recording, why does the rate of data transfer vary depending on the portion of the disk being used?",
      "sv": "Varför varierar dataöverföringshastigheten beroende på vilken del av skivan som används vid zonindelad bitlagring?"
    },
    "steps": {
      "en": [
        "In zoned-bit recording, tracks in outer zones hold more sectors than tracks in inner zones, because outer tracks have a greater circumference. A sector stores a fixed amount of data in this model.",
        "The disk rotates at a fixed number of revolutions per second. One full outer-track revolution and one full inner-track revolution therefore take the same amount of time.",
        "Data rate = bytes per revolution × revolutions per second. Outer tracks pass more sectors, and therefore more bytes, under the head during that same time. For example, twice as many equal-size sectors per track means twice as many bytes per revolution."
      ],
      "sv": [
        "Vid zonindelad bitlagring innehåller spår i yttre zoner fler sektorer än spår i inre zoner, eftersom yttre spår har större omkrets. I denna modell lagrar en sektor en bestämd datamängd.",
        "Skivan roterar med ett fast antal varv per sekund. Ett helt varv på ett yttre spår och ett helt varv på ett inre spår tar därför lika lång tid.",
        "Datahastighet = byte per varv × varv per sekund. Yttre spår för fler sektorer, och därmed fler byte, under huvudet under samma tid. Exempelvis betyder dubbelt så många lika stora sektorer per spår dubbelt så många byte per varv."
      ]
    },
    "answer": {
      "en": "Outer zones contain more data per revolution, so at fixed rotation speed they have a higher transfer rate than inner zones.",
      "sv": "Yttre zoner innehåller mer data per varv och ger därför högre överföringshastighet än inre zoner vid fast rotationshastighet."
    }
  },
  {
    "id": "review-17",
    "section": "review",
    "number": "17",
    "kind": "review",
    "page": 104,
    "title": {
      "en": "Add the parts of access time",
      "sv": "Addera åtkomsttidens delar"
    },
    "question": {
      "en": "What is the average access time for a hard disk which has a rotation delay of 10 milliseconds and a seek time of 9 milliseconds?",
      "sv": "Vilken är den genomsnittliga åtkomsttiden för en hårddisk med rotationsfördröjningen 10 millisekunder och söktiden 9 millisekunder?"
    },
    "steps": {
      "en": [
        "First move the head to the requested track. That step takes the given seek time of 9 milliseconds. A millisecond is one thousandth of a second.",
        "Then wait for the requested sector to rotate under the head. The problem gives this rotational delay as 10 milliseconds. These are consecutive waits, so add them.",
        "Average access time = seek time + rotational delay = 9 + 10 = 19 milliseconds. Do not halve the 10 milliseconds: it is already described as a delay, not the time for one complete revolution. No transfer time is provided or included."
      ],
      "sv": [
        "Först flyttas huvudet till det önskade spåret. Det tar den angivna söktiden 9 millisekunder. En millisekund är en tusendels sekund.",
        "Sedan väntar man på att önskad sektor ska rotera fram under huvudet. Uppgiften anger denna rotationsfördröjning till 10 millisekunder. Väntetiderna kommer efter varandra och ska därför adderas.",
        "Genomsnittlig åtkomsttid = söktid + rotationsfördröjning = 9 + 10 = 19 millisekunder. Halvera inte de 10 millisekunderna: de anges redan som en fördröjning, inte som tiden för ett helt varv. Ingen överföringstid anges eller räknas med."
      ]
    },
    "answer": {
      "en": "19 milliseconds (0.019 seconds).",
      "sv": "19 millisekunder (0,019 sekunder)."
    }
  },
  {
    "id": "review-18",
    "section": "review",
    "number": "18",
    "kind": "review",
    "page": 104,
    "title": {
      "en": "Build disk capacity from its parts",
      "sv": "Bygg upp diskkapaciteten från dess delar"
    },
    "question": {
      "en": "Suppose a disk storage system consists of 5 platters with 10 tracks on each side and 8 sectors in each track. What is the capacity of the system? Assume every sector contains 512 bytes and data can be stored on both surfaces of each platter.",
      "sv": "Anta att ett disklagringssystem består av 5 skivor med 10 spår på varje sida och 8 sektorer på varje spår. Vilken kapacitet har systemet? Anta att varje sektor innehåller 512 byte och att data kan lagras på båda ytorna av varje skiva."
    },
    "steps": {
      "en": [
        "Count usable surfaces first. There are 5 platters, and BOTH sides can store data, so 5 × 2 = 10 surfaces. Missing this factor of two would halve the answer.",
        "Each surface has 10 tracks, so total tracks = 10 surfaces × 10 tracks per surface = 100 tracks.",
        "Each track has 8 sectors, so total sectors = 100 × 8 = 800 sectors.",
        "Each sector stores 512 bytes. Capacity = 800 × 512 = 409,600 bytes. In one line: 5 × 2 × 10 × 8 × 512 = 409,600. Divide by 1,024 to express the same amount as 400 KiB."
      ],
      "sv": [
        "Räkna först de användbara ytorna. Det finns 5 skivor och BÅDA sidorna kan lagra data, så 5 × 2 = 10 ytor. Om faktorn två glöms bort halveras svaret.",
        "Varje yta har 10 spår, så totalt antal spår = 10 ytor × 10 spår per yta = 100 spår.",
        "Varje spår har 8 sektorer, så totalt antal sektorer = 100 × 8 = 800 sektorer.",
        "Varje sektor lagrar 512 byte. Kapaciteten blir 800 × 512 = 409 600 byte. På en rad: 5 × 2 × 10 × 8 × 512 = 409 600. Dividera med 1 024 för att uttrycka samma mängd som 400 KiB."
      ]
    },
    "answer": {
      "en": "409,600 bytes = 400 KiB (or 409.6 decimal kB).",
      "sv": "409 600 byte = 400 KiB (eller 409,6 decimala kB)."
    }
  },
  {
    "id": "review-19",
    "section": "review",
    "number": "19",
    "kind": "review",
    "page": 104,
    "title": {
      "en": "Decode a complete ASCII message",
      "sv": "Avkoda ett helt ASCII-meddelande"
    },
    "question": {
      "en": "Here is a message in ASCII. What does it say?\n01000011 01101111 01101101 01110000\n01110101 01110100 01100101 01110010\n00100000 01010011 01100011 01101001\n01100101 01101110 01100011 01100101\n00100001",
      "sv": "Här är ett meddelande i ASCII. Vad står det?\n01000011 01101111 01101101 01110000\n01110101 01110100 01100101 01110010\n00100000 01010011 01100011 01101001\n01100101 01101110 01100011 01100101\n00100001"
    },
    "steps": {
      "en": [
        "Each eight-bit group is one byte and represents one ASCII character. Start with place values 128, 64, 32, 16, 8, 4, 2, 1. For example, 01000011 = 64 + 2 + 1 = 67, which is C.",
        "Decode all 17 bytes in their given order. The list shows character → decimal ASCII number → byte:\nC → 67 → 01000011\no → 111 → 01101111\nm → 109 → 01101101\np → 112 → 01110000\nu → 117 → 01110101\nt → 116 → 01110100\ne → 101 → 01100101\nr → 114 → 01110010\nspace → 32 → 00100000\nS → 83 → 01010011\nc → 99 → 01100011\ni → 105 → 01101001\ne → 101 → 01100101\nn → 110 → 01101110\nc → 99 → 01100011\ne → 101 → 01100101\n! → 33 → 00100001",
        "The ninth byte 00100000 is 32, a space. The final byte 00100001 is 32 + 1 = 33, an exclamation mark. These are real characters; do not discard them as separators.",
        "Join the decoded characters. Preserve the uppercase C and S and the final exclamation mark."
      ],
      "sv": [
        "Varje grupp med åtta bitar är en byte och representerar ett ASCII-tecken. Börja med platsvärdena 128, 64, 32, 16, 8, 4, 2, 1. Exempelvis är 01000011 = 64 + 2 + 1 = 67, vilket är C.",
        "Avkoda alla 17 byte i den givna ordningen. Listan visar tecken → decimalt ASCII-tal → byte:\nC → 67 → 01000011\no → 111 → 01101111\nm → 109 → 01101101\np → 112 → 01110000\nu → 117 → 01110101\nt → 116 → 01110100\ne → 101 → 01100101\nr → 114 → 01110010\nmellanslag → 32 → 00100000\nS → 83 → 01010011\nc → 99 → 01100011\ni → 105 → 01101001\ne → 101 → 01100101\nn → 110 → 01101110\nc → 99 → 01100011\ne → 101 → 01100101\n! → 33 → 00100001",
        "Den nionde byten 00100000 är 32, ett mellanslag. Den sista byten 00100001 är 32 + 1 = 33, ett utropstecken. Dessa är riktiga tecken och får inte kastas bort som avskiljare.",
        "Sätt ihop de avkodade tecknen. Behåll stort C, stort S och det avslutande utropstecknet."
      ]
    },
    "answer": {
      "en": "Computer Science!",
      "sv": "Computer Science!"
    }
  },
  {
    "id": "review-20",
    "section": "review",
    "number": "20",
    "kind": "review",
    "page": 104,
    "title": {
      "en": "Compare two hexadecimal messages",
      "sv": "Jämför två hexadecimala meddelanden"
    },
    "question": {
      "en": "The following two messages are encoded in ASCII using one byte per character and then represented in hexadecimal notation. Are both the messages same?\n436F6D7075746572 436F6D7075736572",
      "sv": "Följande två meddelanden är kodade i ASCII med en byte per tecken och därefter skrivna med hexadecimal notation. Är båda meddelandena likadana?\n436F6D7075746572 436F6D7075736572"
    },
    "steps": {
      "en": [
        "One byte is eight bits and one hexadecimal digit is four bits. Therefore split each message into PAIRS of hexadecimal digits. The space in the question separates two messages; it is not an encoded character inside either one.",
        "First message: 43 | 6F | 6D | 70 | 75 | 74 | 65 | 72. Convert each byte to its ASCII character: 0x43 = 67 → C; 0x6F = 111 → o; 0x6D = 109 → m; 0x70 = 112 → p; 0x75 = 117 → u; 0x74 = 116 → t; 0x65 = 101 → e; 0x72 = 114 → r. This spells Computer.",
        "Second message: 43 | 6F | 6D | 70 | 75 | 73 | 65 | 72. All bytes match except the sixth: 0x73 = 115 → s, whereas the first message has 0x74 = 116 → t. The second spells Compuser.",
        "A message matches only if every character at every position matches. A one-byte difference is enough to make these messages different."
      ],
      "sv": [
        "En byte är åtta bitar och en hexadecimal siffra är fyra bitar. Dela därför varje meddelande i PAR av hexadecimala siffror. Mellanslaget i uppgiften skiljer två meddelanden åt. Det är inte ett kodat tecken inne i något av dem.",
        "Första meddelandet: 43 | 6F | 6D | 70 | 75 | 74 | 65 | 72. Omvandla varje byte till sitt ASCII-tecken: 0x43 = 67 → C; 0x6F = 111 → o; 0x6D = 109 → m; 0x70 = 112 → p; 0x75 = 117 → u; 0x74 = 116 → t; 0x65 = 101 → e; 0x72 = 114 → r. Det bildar Computer.",
        "Andra meddelandet: 43 | 6F | 6D | 70 | 75 | 73 | 65 | 72. Alla byte stämmer utom den sjätte: 0x73 = 115 → s, medan första meddelandet har 0x74 = 116 → t. Det andra bildar Compuser.",
        "Två meddelanden är lika endast om varje tecken på varje position stämmer. En skillnad på en byte räcker för att dessa meddelanden ska vara olika."
      ]
    },
    "answer": {
      "en": "No. The first is “Computer”; the second is “Compuser”. Their sixth characters are t and s.",
      "sv": "Nej. Det första är ”Computer” och det andra är ”Compuser”. Deras sjätte tecken är t respektive s."
    }
  }
]);
