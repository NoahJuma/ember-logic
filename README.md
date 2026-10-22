# Ember Logic

**Created by Noah J.G TELTA Student MIUN 2026.**

A warm, interactive study kit for learning digital logic by experimenting.

## Inside the kit

- **Gate playground:** AND, OR, XOR, NOT, NAND, NOR, and XNOR gates with animated signals, input switches, and live truth tables.
- **Circuit workbench:** combine up to 10 gates, connect branches and constants, trace every intermediate result, inspect a complete truth table, save locally, and undo edits. Includes NAND-only XOR, half-adder, full-adder, and ten-gate examples.
- **Boolean studio:** expression tracing, intermediate results, truth tables, Boolean laws, and equivalence checking.
- **Memory lab:** ideal rising-edge D, T, JK, and active-high synchronous SR flip-flops, with clock controls and timing diagrams.
- **Number systems:** unsigned binary, decimal, and hexadecimal conversion for 0–65,535; 8-bit and 16-bit patterns; four-bit grouping; place values; and repeated division.
- **Practice:** 46 explained exam questions plus free-response conversion challenges.
- **Pocket guide:** printable revision notes and creator attribution.

## Use it

Open the GitHub Pages website linked in this repository’s About section, or download the repository and open `index.html` in a browser. A local static web server also works.

The kit has no server or account dependencies. Learning progress is stored locally in the current browser and does not sync between devices. Optional web fonts fall back to system fonts when unavailable.

## Learning conventions

Boolean expressions use explicit operators and this precedence: parentheses, NOT, AND/NAND, XOR/XNOR, OR/NOR. Equal-precedence operations run left to right; parentheses preserve grouping. Expressions accept A–D and up to 10 operations. Flip-flops are ideal rising-edge models with stable inputs and no asynchronous controls. The SR model is active-high; its 11 input is forbidden. Number-system examples use unsigned whole numbers, not signed values, fractions, text encoding, or encryption.

## Files

`index.html` contains the shared app shell. `app.js` and `logic.js` provide the logic lessons. `numbers.js` and `number-ui.js` provide number conversion and its learning interface. `circuit.js` and `circuit-ui.js` provide the connected-gate simulator. The stylesheets define the responsive design.

The conversion engine was checked across every supported value from 0 to 65,535, alongside logic-gate and flip-flop checks and browser interaction checks.

Run the core checks with `node --test tests/core.test.cjs`. They cover all seven gate truth tables, the ten-operation limit, mixed-gate grouping, prevention of feedback loops, NAND-only XOR, arithmetic sum/carry for both adders, randomly branched circuits, and regression checks for memory and number conversions.
