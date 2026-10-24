# Ember Logic

**Created by Noah J.G TELTA Student MIUN 2026.**

A warm, interactive study kit for learning digital logic by experimenting.

## Inside the kit

- **Gate playground:** AND, OR, XOR, NOT, NAND, NOR, and XNOR gates with animated signals, input switches, and live truth tables.
- **Circuit workbench:** combine up to 10 gates, connect branches and constants, trace every intermediate result, inspect a complete truth table, save locally, and undo edits. Includes NAND-only XOR, half-adder, full-adder, and ten-gate examples.
- **Boolean studio:** expression tracing, intermediate results, truth tables, Boolean laws, and equivalence checking.
- **Memory lab:** ideal rising-edge D, T, JK, and active-high synchronous SR flip-flops, with clock controls and timing diagrams.
- **Number systems:** exact unsigned binary, octal, decimal, and hexadecimal conversion from 0 through 18,446,744,073,709,551,615; 8-, 16-, 32-, and 64-bit views; an interactive byte inspector; three-/four-bit grouping; exact place values; and repeated division.
- **Memory & storage:** an A–Z atlas of 48 technologies, devices, interfaces, and system concepts. Six workshops illustrate SRAM/DRAM/NAND/ROM cells, addressed bytes, direct-mapped cache, virtual paging, SSD/SD flash translation, and HDD mechanics.
- **ASCII & text:** all 128 standard codes, control names, searchable base representations, editable character bits, strict ASCII and UTF-8 encoding/decoding, and byte/bit counts.
- **Training room:** 12 guided experiments that check actual simulated results, 77 explained exam questions, and existing free-response conversion challenges.
- **Pocket guide:** printable revision notes and creator attribution.

## Use it

Open the GitHub Pages website linked in this repository’s About section, or download the repository and open `index.html` in a browser. A local static web server also works.

The kit has no server or account dependencies. Learning progress is stored locally in the current browser and does not sync between devices. Optional web fonts fall back to system fonts when unavailable.

## Learning conventions

Boolean expressions use explicit operators and this precedence: parentheses, NOT, AND/NAND, XOR/XNOR, OR/NOR. Equal-precedence operations run left to right; parentheses preserve grouping. Expressions accept A–D and up to 10 operations. Flip-flops are ideal rising-edge models with stable inputs and no asynchronous controls. The SR model is active-high; its 11 input is forbidden. Number-system examples use unsigned whole numbers, not signed values, fractions, or encryption. The separate ASCII & text workshop covers text encoding.

## Files

`index.html` contains the shared app shell. `app.js` and `logic.js` provide the logic lessons. `numbers.js` and `number-ui.js` provide number conversion and its learning interface. `circuit.js` and `circuit-ui.js` provide the connected-gate simulator. The stylesheets define the responsive design.

The conversion checks exhaust all values from 0 to 65,535 across all four bases, then cover large unsigned 64-bit boundaries and representative patterns. Logic-gate, flip-flop, and browser interaction checks also pass.

Run all checks with `node --test tests/*.test.cjs`. They cover all seven gate truth tables, the ten-operation limit, mixed-gate grouping, prevention of feedback loops, NAND-only XOR, arithmetic sum/carry for both adders, randomly branched circuits, and regression checks for memory and number conversions.

The number engine uses BigInt throughout value arithmetic. Number conversion is limited to individual digits, byte values (0–255), bit counts, and display positions. The number tests exhaust all 65,536 low values across all four bases, then test exact large boundary values, deterministic 64-bit samples, all individual bit toggles, byte order, octal alignment, invalid input, and overflow rejection. Signed values and fractions are outside the unsigned integer lab; text encoding has its own workshop.

## Memory and text implementation

`memory-models.js` contains deterministic, immutable teaching models; `memory-catalog.js` supplies the atlas and reference links; `memory-ui.js` provides the workshops. `ascii.js` validates and converts text/bytes; `ascii-ui.js` presents the chart and encoder. `training-ui.js` checks mission completion against the model state. `learning.css` supplies responsive layouts and touch-friendly controls. All of this runs in the browser.

These are deliberately tiny conceptual models, not hardware specifications or timing predictions. Specialist technologies are defined in the atlas; only selected core mechanisms have interactive models. See [SOURCES.md](SOURCES.md) for research references and model assumptions.

The tests include all ASCII codes, invalid UTF-8 sequences, refresh/power loss, cache conflict and page residency, flash garbage collection with live-data preservation, deterministic mixed flash operations, disk access stages, and all twelve mission checks.
