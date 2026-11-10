# Ember Logic

**Created by Noah J.G TELTA Student MIUN 2026.**

A warm, interactive study kit for learning computer science, mathematics and physics by experimenting. The home page lets visitors choose a subject.

## Video help for mathematics and physics

Both Chapter 1 pages include a **Videos** collection and optional **Need another explanation? Watch a video** panels beside the questions. Video help is available before opening a worked answer. Physics lessons also include matching videos, and mathematics practice cards use the same topic recommendations as the textbook questions.

The collection contains 59 verified resources: 37 for mathematics and 22 for physics, including 23 Swedish and 36 English videos or specific video lesson pages. It covers all eleven linear algebra sections and all ten physics lessons. A small, clearly labelled calculus prerequisite group supports the mathematics technology and review exercises. Application questions distinguish curve fitting, network flow, circuits and chemical balancing; vector questions distinguish components, unit vectors, dot products and cross products.

Every link names the teacher or publisher, identifies the spoken language, and explains what to practise. The page language determines the guidance and preferred ordering; it does not dub or translate external videos. Swedish alternatives are preferred when available, and English-only help is explicitly labelled. Links open in a new tab and do not start video downloads or embedded players on the study page. Written work and open help panels survive language changes.

`study-video-data.js` stores the curated catalogue and source pages. `study-videos.js` selects relevant resources and renders both page collections; `study-videos.css` provides the responsive cards. Sources and video identity/availability were checked on 7 November 2026 using publisher pages, transcripts and video metadata. The videos teach relevant concepts and methods; they are not recordings of the solutions to each exact textbook problem. External resources can change availability. See [SOURCES.md](SOURCES.md).

## Computer science · Chapter 1

Open `computer-science.html` for **Data Storage**, Chapter 1 of Brookshear and Brylow, *Computer Science: An Overview*, 13th Global Edition (2020). Ten short lessons follow sections 1.1–1.10: bits, memory, storage, information encoding, binary numbers, signed integers, fractions, programming, compression and error control. Every lesson includes a worked example, a check of understanding and a link to a relevant experiment.

The book bank contains all **131 entries**: 63 section exercises, 61 review problems and seven discussion questions. Full source questions and necessary diagrams appear before separate **Write my answer** and **Show worked solution** panels. Original explanations label each step, explain why it is useful and finish with the final answer. Written work stays editable and appears beside the solution for comparison. Discussion responses are examples of reasoned answers, not unique correct conclusions. Drafts and lesson progress are stored in this browser when storage is available; written answers are not automatically graded.

The six experiment tabs cover bits and addressed memory, number representations, the book’s eight-bit floating-point format, text and raw media sizes, compression, and error control. The memory model has an interactive 3D view with touch, keyboard, rotation, tilt, layer separation and a full-screen workspace, alongside an exact textual byte table. Each model explains its assumptions. The quiz has 120 original questions covering all ten sections, four difficulty levels and three types: problems, terminology and computer-science language. Revealing an answer earns no point.

The language selector switches lessons, questions, worked steps, figures, experiments, quizzes, feedback and accessibility text between English and Swedish. Direct links can use `?lang=en` or `?lang=sv`. Changing language preserves the lesson, writing, open answer panels, quiz order and results, and experiment values and camera. Search accepts either language. The chapter uses the independent `ember-cs-chapter1:` storage prefix.

`cs-chapter-base.js` manages language, the content modules provide lessons and exercise records, and `cs-chapter.js` renders the learning interface. `cs-chapter-models.js` contains independently testable calculations; `cs-chapter-labs.js` connects the experiments. The earlier English logic workbench remains at `computer-science-labs.html`; existing links with its section hashes redirect there. See [SOURCES.md](SOURCES.md) for source scope, numerical conventions and corrections to printed answers.

## Physics · Chapter 2

Open `physics-chapter2.html` for **Motion Along a Straight Line**, sections 2.1–2.6 of the user-supplied Young and Freedman SI textbook. Six bilingual lessons build from position and signed displacement through velocity, acceleration, constant acceleration, free fall, and integration. Each includes mathematical prerequisites, examples, misconceptions and a check. The motion lab lets learners change the initial conditions, predict a velocity and compare position, velocity and acceleration graphs; it offers reset and full screen where supported.

The searchable source bank contains 134 cards: 92 numbered questions, 22 discussion questions, 12 guided variations, the bridging problem, six section checks and the opening question. Each has independent writing, hint, solution and video panels. Written reasoning is compared by the learner; it is not automatically graded. Drafts, disclosures, language and quiz state are stored locally when browser storage is available.

The 132-question bilingual quiz combines 72 numerical variants, 48 conceptual questions, six graph questions and six labelled textbook questions. It offers four levels and learning, topic, mixed and chapter-test modes; feedback separates independent answers, hints, revealed solutions and remaining questions. Numerical tolerance is the greater of 1% or 0.01 in the requested unit. Links to videos name their language and teacher or publisher; they are topic guidance, not recordings of these exact solutions. See [PHYSICS-CHAPTER-2-COVERAGE.md](PHYSICS-CHAPTER-2-COVERAGE.md) and [SOURCES.md](SOURCES.md).

## Physics

Open `physics.html` for the Physics course overview and choose a chapter. Chapter 1 is available at `physics-chapter1.html` and follows Young and Freedman, *University Physics with Modern Physics in SI Units*, 15th edition (2019): units, physical quantities and vectors. Ten beginner lessons introduce the concepts, notation and calculations. A unit machine explains length, area and volume conversions; a block-cube experiment shows why area and volume scale differently.

The language selector at the top switches the complete physics experience between English and Swedish: lessons, glossary, all 136 textbook questions and solutions, the 72 quiz questions, measurements, vector-lab controls, feedback, accessibility labels and question diagrams. `?lang=sv` and `?lang=en` provide direct links. An explicit URL choice takes priority over the saved browser preference, then the browser language; other browser languages default to English. Switching preserves the current lesson, book filters and page, written work, vector attempts, lab view/fullscreen and active quiz state. Search accepts either language. Drafts also remain in memory during the current visit when persistent browser storage is unavailable.

`physics-i18n.js` manages language and stable content objects; `physics-language.js` initializes after the Swedish data modules load. `physics-sv-ui.js`, `physics-sv-content.js` and the three `physics-sv-book-*` modules contain the translations. Source values and formulas remain the same. Swedish diagrams live under `assets/physics/questions/sv/`; diagrams with English prose labels are redrawn with the same data and directions. The original English source diagrams remain available in English mode.

The answer bank contains 136 worked entries: numbered problems 1.1–1.94, discussion questions Q1.1–Q1.26, eight guided variations, the bridging roof problem, the chapter-opening question and six understanding checks. Each displays the complete textbook question before its optional writing area and independent hidden solution. Required figures, data tables, the shared lung passage and referenced values are included. Solutions explicitly label Step 1, Step 2 and so on, then finish with “The final answer is…” beside the user's answer. Vector answers accept components or a dragged 2D arrow, offer feedback, and retain the user's attempt when the solution is revealed. Both normal directions are accepted for 1.84. Writing is not automatically graded. Attempts are saved locally under `ember-physics:` when storage is available.

The vector lab supports addition, subtraction, components, unit vectors, dot products, projection, cross products and textbook routes. Edit exact components or sliders; drag arrow tips in 2D; orbit, pan and pinch in 3D. A full-screen dialog and collapsible controls give the scene room on a phone. Camera buttons and keyboard arrows, +/− and 0 provide alternatives. The cross-product direction arrow uses a display scale; its actual magnitude and product units are stated separately. The 72-question quiz covers calculations, terminology, graphical interpretation and mathematical language across four levels and four modes. It distinguishes hints and revealed solutions, offers topic review, and retains a quiz across language changes and reloads. Revealing a solution is recorded as viewed rather than correct.

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

`index.html` is the subject hub. `computer-science.html` contains the bilingual textbook chapter, while `computer-science-labs.html` contains the original workbench shell. `app.js` and `logic.js` provide its logic lessons. `numbers.js` and `number-ui.js` provide number conversion and its learning interface. `circuit.js` and `circuit-ui.js` provide the connected-gate simulator. The stylesheets define the responsive design.

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

The home page lets you choose Mathematics, Computer Science or Physics. Computer Science opens the textbook chapter; the original logic workbench is at `computer-science-labs.html`. Old home-page and computer-science links with a workbench section hash still reach the original workshop.

Mathematics opens a Chapter 1 linear algebra lab based on the topic order in Howard Anton and Anton Kaul's *Elementary Linear Algebra*, 12th edition. It includes an editable 3D plane intersection and matrix transformation visualizer, original worked practice for all eleven sections, worked solutions for every numbered exercise, true/false set, technology exercise, and supplementary exercise in Chapter 1, and configurable quizzes. Written attempts are saved only in the current browser when local storage is available. Quiz problems use self-marking after showing the worked solution.

Both `mathematics.html` and `linear-algebra.html` have a Swedish/English selector. It covers all 437 textbook entries and complete worked steps, 44 glossary items, generated practice and every quiz type/difficulty, the introductory guides, figure descriptions and labels, and every 3D lab control and explanation. `?lang=sv` or `?lang=en` overrides the stored preference; otherwise Swedish browser language selects Swedish on a first visit. Written attempts keep their original keys. Changing language preserves open writing/solution panels, draft text even when storage is unavailable, current quiz choices/results, and the 3D model, camera and fullscreen state.

`mathematics-i18n.js` coordinates language selection and registered content builders; `mathematics-sv-ui.js` localizes static text while retaining form elements. Bilingual generated calculations reuse the same numerical engine. Question and solution modules rebuild their wording in the selected language, preserving entry IDs and numerical data. Swedish figure assets are in `assets/mathematics/questions/sv/`.

## Physics · Chapter 8

`physics-chapter8.html` covers momentum, impulse, conservation, collisions, center of mass and rocket propulsion, in Swedish and English. It includes 155 bilingual source-based exercises and checks, 100 quiz questions and variants, and separate one-dimensional collision and two-dimensional momentum-vector labs. Attempts and settings are retained locally when storage is available. See [PHYSICS_CHAPTER8_COVERAGE.md](PHYSICS_CHAPTER8_COVERAGE.md) for the source inventory, diagrams, assumptions and learning goals.

## Physics · Chapter 9

`physics-chapter9.html` covers rotation of rigid bodies in Swedish and English. It includes 137 source-based exercises and checks, 100 quiz questions and variants, and a rotation lab. See [PHYSICS_CHAPTER9_COVERAGE.md](PHYSICS_CHAPTER9_COVERAGE.md) for the source inventory, diagrams and assumptions.

## Physics · Chapter 10

`physics-chapter10.html` covers torque, rolling, rotational work, angular momentum and gyroscopes in Swedish and English. It includes 148 source-based exercises and checks, 112 quiz questions and variants, and a torque lab. See [PHYSICS_CHAPTER10_COVERAGE.md](PHYSICS_CHAPTER10_COVERAGE.md) for coverage, figures and assumptions.

## Physics · Chapter 11

`physics-chapter11.html` covers equilibrium and elasticity in Swedish and English, with 139 source-based exercises and checks, 80 quiz questions and variants, and interactive beam and wire models. See [PHYSICS_CHAPTER11_COVERAGE.md](PHYSICS_CHAPTER11_COVERAGE.md) for source coverage, diagrams and assumptions.

## Physics · Chapter 12

Fluid mechanics has six bilingual lessons, 142 adapted textbook entries, a four-mode quiz and an interactive fluid lab. See [Chapter 12 coverage](PHYSICS_CHAPTER12_COVERAGE.md) for source mapping and assumptions.

## Physics · Chapter 13

Gravitation has eight bilingual lessons, 127 adapted textbook entries, a four-mode quiz and an interactive orbit lab. See [Chapter 13 coverage](PHYSICS_CHAPTER13_COVERAGE.md) for source mapping and assumptions.
