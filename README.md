# Ember Logic

**Created by Noah J.G TELTA Student MIUN 2026.**

A warm, interactive study kit for learning computer science, mathematics and physics by experimenting. The home page lets visitors choose a subject.

## Physics

Open `physics.html` for Chapter 1 of Young and Freedman, *University Physics with Modern Physics in SI Units*, 15th edition (2019): units, physical quantities and vectors. Ten beginner lessons introduce the concepts, notation and calculations. A unit machine explains length, area and volume conversions; a block-cube experiment shows why area and volume scale differently.

The language selector at the top switches the complete physics experience between English and Swedish: lessons, glossary, all 129 textbook questions and solutions, the 48 quiz questions, measurements, vector-lab controls, feedback, accessibility labels and question diagrams. `?lang=sv` and `?lang=en` provide direct links. An explicit URL choice takes priority over the saved browser preference, then the browser language; other browser languages default to English. Switching preserves the current lesson, book filters and page, written work, vector attempts, lab view/fullscreen and active quiz state. Search accepts either language. Drafts also remain in memory during the current visit when persistent browser storage is unavailable.

`physics-i18n.js` manages language and stable content objects; `physics-language.js` initializes after the Swedish data modules load. `physics-sv-ui.js`, `physics-sv-content.js` and the three `physics-sv-book-*` modules contain the translations. Source values and formulas remain the same. Swedish diagrams live under `assets/physics/questions/sv/`; diagrams with English prose labels are redrawn with the same data and directions. The original English source diagrams remain available in English mode.

The answer bank contains 129 worked entries: numbered problems 1.1–1.94, discussion questions Q1.1–Q1.26, eight guided variations and the bridging roof problem. Each displays the complete textbook question before its optional writing area and independent hidden solution. Required figures, data tables, the shared lung passage and referenced values are included. Solutions explicitly label Step 1, Step 2 and so on, then finish with “The final answer is…” beside the user's answer. Vector answers accept components or a dragged 2D arrow, offer feedback, and retain the user's attempt when the solution is revealed. Both normal directions are accepted for 1.84. Writing is not automatically graded. Attempts are saved locally under `ember-physics:` when storage is available.

The vector lab supports addition, subtraction, components, unit vectors, dot products, projection, cross products and textbook routes. Edit exact components or sliders; drag arrow tips in 2D; orbit, pan and pinch in 3D. A full-screen dialog and collapsible controls give the scene room on a phone. Camera buttons and keyboard arrows, +/− and 0 provide alternatives. The cross-product direction arrow uses a display scale; its actual magnitude and product units are stated separately. The 48 original quiz questions cover problems, terminology and mathematical language across four levels. Revealing a solution is recorded as viewed rather than correct.

The site remains a static app with no runtime package dependencies. Install the development-only DOM test dependency with `npm ci`, then run all tests with `npm test`. Numerical checks and jsdom interaction tests do not replace visual inspection in a real browser or testing on a physical phone. See [SOURCES.md](SOURCES.md) for textbook scope and modelling assumptions.

## Linear algebra

Open `linear-algebra.html` for the Chapter 1 companion to Anton and Kaul, *Elementary Linear Algebra*, 12th edition. The 437 worked entries cover the numbered, true-or-false, technology and supplementary exercises. Each card includes the full question from the uploaded book, with its subparts, matrices, referenced information and necessary diagrams. The accompanying worked explanations are original and distinguish errors in the printed statement from an intended interpretation when needed.

Each card has independent **Write my answer** and **Show worked solution** disclosures. Writing is optional and stays editable after revealing the solution. Solutions explicitly label Step 1, Step 2 and so on, explain the operations and their purpose, and finish with “The final answer is…”. Attempts are saved in the current browser when storage is available; they do not sync to another device and are not automatically graded. Existing saved-answer keys are retained. Topic introductions explain notation and basic methods. Row-reduction solutions show each changed entry and checks against the original equations. Numerical outputs may be rounded.

The 3D lab has a full-screen workspace with a collapsible controls drawer. Drag with one finger to rotate; use two fingers to zoom and move the view. Camera buttons and keyboard arrows, +/−, Home and F provide alternatives. Plane sliders control distance and tilt; transformation examples animate stretching, rotation, shear, reflection and flattening. A tracked point connects the model to its coordinate calculation. The planes are clipped to a finite viewing box; hiding a plane only changes the drawing, not the system of equations. Rotation is interpolated by angle; other transformations use a straight matrix transition from the identity.

`linear-algebra-learning.js` handles answer cards, storage and topic introductions. The five `linear-algebra-questions-*` content modules hold source questions and explanation improvements; `linear-algebra-questions.js` attaches them to stable exercise IDs. `linear-algebra-scene.js` handles geometry and interaction. Tests cover exercise coverage, complete question rendering, solution order, independent answer choices, storage failure, numerical residuals, geometry, and controller events. These automated checks do not replace a browser or real-device layout and touch review.

## Inside the kit

- **Gate playground:** AND, OR, XOR, NOT, NAND, NOR, and XNOR gates with animated signals, input switches, and live truth tables.
- **Circuit workbench:** combine up to 10 gates, connect branches and constants, trace every intermediate result, inspect a complete truth table, save locally, and undo edits. Includes NAND-only XOR, half-adder, full-adder, and ten-gate examples.
- **Boolean studio:** expression tracing, intermediate results, truth tables, Boolean laws, and equivalence checking.
- **Memory lab:** ideal rising-edge D, T, JK, and active-high synchronous SR flip-flops, with clock controls and timing diagrams.
- **Number systems:** exact unsigned binary, octal, decimal, and hexadecimal conversion from 0 through 18,446,744,073,709,551,615; 8-, 16-, 32-, and 64-bit views; an interactive byte inspector; three-/four-bit grouping; exact place values; and repeated division.
- **Memory & storage:** an A–Z atlas of 48 technologies, devices, interfaces, and system concepts. Six workshops illustrate SRAM/DRAM/NAND/ROM cells, addressed bytes, direct-mapped cache, virtual paging, SSD/SD flash translation, and HDD mechanics.
- **ASCII & text:** all 128 standard codes, control names, searchable base representations, editable character bits, strict ASCII and UTF-8 encoding/decoding, and byte/bit counts.
- **Training room:** 16 guided experiments that check actual simulated results, 97 explained exam questions, and existing free-response conversion challenges.
- **Pocket guide:** printable revision notes and creator attribution.

## Use it

Open the GitHub Pages website linked in this repository’s About section, or download the repository and open `index.html` in a browser. A local static web server also works.

The kit has no server or account dependencies. Learning progress is stored locally in the current browser and does not sync between devices. Optional web fonts fall back to system fonts when unavailable.

## Learning conventions

Boolean expressions use explicit operators and this precedence: parentheses, NOT, AND/NAND, XOR/XNOR, OR/NOR. Equal-precedence operations run left to right; parentheses preserve grouping. Expressions accept A–D and up to 10 operations. Flip-flops are ideal rising-edge models with stable inputs and no asynchronous controls. The SR model is active-high; its 11 input is forbidden. Number-system examples use unsigned whole numbers, not signed values, fractions, or encryption. The separate ASCII & text workshop covers text encoding.

## Files

`index.html` contains the shared app shell. `app.js` and `logic.js` provide the logic lessons. `numbers.js` and `number-ui.js` provide number conversion and its learning interface. `circuit.js` and `circuit-ui.js` provide the connected-gate simulator. The stylesheets define the responsive design.

The conversion checks exhaust all values from 0 to 65,535 across all four bases, then cover large unsigned 64-bit boundaries and representative patterns. Logic-gate, flip-flop, and browser interaction checks also pass.

Run all checks with `npm ci && npm test`. They cover all seven gate truth tables, the ten-operation limit, mixed-gate grouping, prevention of feedback loops, NAND-only XOR, arithmetic sum/carry for both adders, randomly branched circuits, and regression checks for memory and number conversions, as well as the mathematics and physics sections.

The number engine uses BigInt throughout value arithmetic. Number conversion is limited to individual digits, byte values (0–255), bit counts, and display positions. The number tests exhaust all 65,536 low values across all four bases, then test exact large boundary values, deterministic 64-bit samples, all individual bit toggles, byte order, octal alignment, invalid input, and overflow rejection. Signed values and fractions are outside the unsigned integer lab; text encoding has its own workshop.

## Memory and text implementation

`memory-models.js` contains deterministic, immutable teaching models; `memory-catalog.js` supplies the atlas and reference links; `memory-ui.js` provides the workshops. `ascii.js` validates and converts text/bytes; `ascii-ui.js` presents the chart and encoder. `training-ui.js` checks mission completion against the model state. `learning.css` supplies responsive layouts and touch-friendly controls. All of this runs in the browser.

These are deliberately tiny conceptual models, not hardware specifications or timing predictions. Specialist technologies are defined in the atlas; only selected core mechanisms have interactive models. See [SOURCES.md](SOURCES.md) for research references and model assumptions.

The tests include all ASCII codes, invalid UTF-8 sequences, refresh/power loss, cache conflict and page residency, flash garbage collection with live-data preservation, deterministic mixed flash operations, disk access stages, and all sixteen mission checks.

## Mobile and 3D studio

The mobile-first layer adds a compact lab picker, readable form controls, touch-friendly actions, and Clear buttons on editable text/number fields. Desktop layouts progressively add columns. Clear removes an input without silently replacing the last calculated result.

Every simulation workshop has a shared 3D inspector linked to its current model values: gates, connected circuits, expressions, flip-flops, unsigned numbers, signed arithmetic, memory workshop modes, ASCII/text, and media/data modes. Orbit with a pointer or touch drag; pinch or use zoom buttons; inspect the underside; separate layers; hide covers; select parts. Keyboard arrows rotate, +/− zoom, and R resets. The original diagrams and tables remain available for exact reasoning.

`binary.js` uses exact fixed-width BigInt operations up to 64 bits, with two’s complement, carries, signed overflow, sign extension, shifts, integer division, and bitwise operations. `binary-ui.js` provides worked traces and recall challenges. `media-models.js` and `media-ui.js` supply editable raster pixels, actual quantized PCM playback and WAV export, a reconstructable toy delta-video format, and integer/IEEE-754/text/JSON interpretation.

`space3d.js` projects real 3D meshes using a small dependency-free Canvas renderer; `space-models.js` maps live simulation state into geometry. It does not need WebGL, a GPU library, a model download, or a server. Models are conceptual and labelled accordingly: no measured semiconductor behavior, photorealistic construction, or industrial codec implementation is claimed.

## Subject hub and mathematics

The home page lets you choose Mathematics, Computer Science or Physics. The original logic workbench is at `computer-science.html`. Old home-page links with a workbench section hash redirect there.

Mathematics opens a Chapter 1 linear algebra lab based on the topic order in Howard Anton and Anton Kaul's *Elementary Linear Algebra*, 12th edition. It includes an editable 3D plane intersection and matrix transformation visualizer, original worked practice for all eleven sections, worked solutions for every numbered exercise, true/false set, technology exercise, and supplementary exercise in Chapter 1, and configurable quizzes. Written attempts are saved only in the current browser when local storage is available. Quiz problems use self-marking after showing the worked solution.

Both `mathematics.html` and `linear-algebra.html` have a Swedish/English selector. It covers all 437 textbook entries and complete worked steps, 44 glossary items, generated practice and every quiz type/difficulty, the introductory guides, figure descriptions and labels, and every 3D lab control and explanation. `?lang=sv` or `?lang=en` overrides the stored preference; otherwise Swedish browser language selects Swedish on a first visit. Written attempts keep their original keys. Changing language preserves open writing/solution panels, draft text even when storage is unavailable, current quiz choices/results, and the 3D model, camera and fullscreen state.

`mathematics-i18n.js` coordinates language selection and registered content builders; `mathematics-sv-ui.js` localizes static text while retaining form elements. Bilingual generated calculations reuse the same numerical engine. Question and solution modules rebuild their wording in the selected language, preserving entry IDs and numerical data. Swedish figure assets are in `assets/mathematics/questions/sv/`.
