# Memory, storage, and text references

Created by Noah J.G TELTA Student MIUN 2026.

References checked 24 October 2026. The app links to these sources in its reference disclosures. Its diagrams and ASCII tiles are original HTML/SVG, not reproduced source charts. Standard ASCII assignments are stable; an updated Unicode version does not create a new ASCII version.

- [RFC 20: ASCII](https://www.rfc-editor.org/rfc/rfc20) — seven-bit US-ASCII, embedded in an eight-bit byte with the high bit zero.
- [RFC 3629: UTF-8](https://www.rfc-editor.org/rfc/rfc3629) — ASCII preservation, one to four bytes per Unicode scalar, and rejection of overlongs, surrogate encodings, and invalid sequences.
- [Unicode C0 Controls and Basic Latin reference](https://www.unicode.org/charts/PDF/U0000.pdf) — code assignments and control names. The app generates its own table for 0–127; it does not copy the PDF chart or chart fonts.
- [IBM: DRAM history and construction](https://www.ibm.com/history/dram) — dynamic storage using a transistor and a capacitor.
- [KIOXIA NAND device documentation](https://americas.kioxia.com/content/dam/kioxia/newidr/productinfo/datasheet/201910/DST_TC58CVG0S3HRAIJ-TDE_EN_36001.pdf) — example of page read/program and block erase organization. Its geometry is not used as a universal specification.
- [Intel: page faults](https://www.intel.com/content/www/us/en/docs/vtune-profiler/cookbook/2024-1/page-faults.html) — translation, residency, and fault distinctions. A TLB miss is not necessarily a page fault; a page fault does not always require storage I/O.
- [SD Association: SD Express](https://www.sdcard.org/developers/sd-standard-overview/sd-express-overview-in-short-videos-and-articles/) — PCIe/NVMe in supporting cards and hosts; ordinary SD and SD Express interfaces differ.

## Model assumptions

- **Cells:** common six-transistor SRAM is represented by two feedback inverters and two access devices; classic DRAM by 1T1C. Initial known values are supplied by the demonstration. Power loss in volatile models produces unknown data, not guaranteed zero. Four DRAM steps are an illustrative retention window, not real timing. A valid read senses/restores; refresh cannot recover already lost data. Mask ROM is fixed. The SLC NAND convention uses erased 1 and programmed 0, and restores 1 through containing-block erase.
- **Addressing:** four independent one-byte words, two address bits, eight data bits, explicit read/write controls. This is a conceptual SRAM bank.
- **Cache:** 32 byte-addressed RAM bytes, four direct-mapped lines, four bytes per line; tag/index/offset are 1/2/2 bits. Reads only; no writes, coherency, latency, or multilevel timing model.
- **Paging:** six virtual pages, three physical frames, four bytes per page, read-only backing data and FIFO replacement. Each absent page is loaded from the model's backing store. The text explains other real fault causes. No TLB simulation, dirty pages, or measured storage delays.
- **Managed NAND:** three blocks of four one-byte pages, four logical pages, out-of-place writes, logical invalidation, and garbage collection that copies live pages before erasing a whole block. Lower recorded erase counts guide free-page selection; this is not a production wear-leveling algorithm. Completed writes and mapping updates are atomic/durable in this toy model. Power failure during a partial write is not simulated. Discard is a conceptual action; device commands and unmapped-read guarantees vary. SLC/MLC/TLC/QLC state labels illustrate counts, not a universal voltage-to-bit mapping.
- **HDD:** three tracks of four one-byte sectors, three explicit seek/rotation/transfer steps. No real timing, error, geometry, or mechanical engineering claims. Completed magnetic writes persist; unfinished requests are cancelled on power loss.
- **Atlas:** a broad reference of 48 core, specialist, historical, and system concepts. Roles, cell technologies, protocols, and form factors are labelled separately. Specialist entries link to related principles, not exact simulations of every technology ever made.
- **Text:** ASCII 0–127 only; UTF-8 is a separate strict encoding. All controls including NUL and DEL round-trip without executing terminal actions. Visible control labels and escaped decoded text are display annotations. UTF-8 counts scalar values/code points rather than grapheme clusters. Inputs are limited to 256 encoded bytes for an inspectable workbench. A visible character can span multiple code points.
- **Training:** mission completion is checked against model results and saved in the current browser. It is not a certified mastery grade. Simulated memory contents reset on reload; mission records and existing quiz statistics remain local.

## Signed arithmetic and media studio

- [Cornell: two’s complement](https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html) — fixed-width signed interpretation and invert/add-one negation.
- [MDN: ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) — browser raster data and RGBA channels.
- [MDN: AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) — in-memory PCM sample buffers for Web Audio.
- [MDN: video processing concepts](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API/Video_processing_concepts) — frame sequences, key/delta concepts, codecs, and timing.
- [W3C: PNG specification](https://www.w3.org/TR/png-3/#3PNGsignature) — the PNG signature and structured image format.

The signed arithmetic lab accepts explicit widths, uses arbitrary-precision integer arithmetic, and reports exact versus wrapped results. Carry-out is unsigned; subtraction carry means no borrow. Division truncates toward zero. Shift counts 0 through width are an explicit teaching rule. These are not claims about every CPU’s flags, exceptions, or instruction semantics.

Media pixel payloads are packed raw values, excluding row padding and file overhead. Grayscale uses a simple average of encoded channels, not a color-managed luminance transform. Signed PCM is quantized, clipped, and played from the actual sample sequence; the source is a sine wave. There is no antialias/reconstruction filter model. WAV exports mono signed 16-bit PCM containing the current quantized values, including when the educational quantizer uses 4 or 8 bits.

The video model is a custom lossless delta format with 8 × 8 RGB frames. Each changed-pixel record uses one index byte and three RGB bytes, excluding any container overhead. Tests reconstruct every frame from its predecessor. It is not H.264/AV1 and does not model motion compensation or audio muxing. Float interpretation uses JavaScript DataView’s IEEE-754 binary32 conversion. JSON is parsed as data without evaluation.

3D scenes contain spatial meshes, perspective, full orbit, underside views, zoom, layer separation, covers, and selectable components. Values are derived from the actual lab state. Geometry, shading, chip packaging, and temporal spacing are illustrations. The logical and byte-level models remain authoritative; the renderer does not simulate electrons, manufacturing tolerances, analog timing, or actual codec hardware.

## Physics · Chapter 1

Source: Hugh D. Young and Roger A. Freedman, *University Physics with Modern Physics in SI Units*, 15th edition, Pearson (2019), the user-supplied textbook. Chapter 1, “Units, Physical Quantities, and Vectors,” occupies printed pages 29–61 (PDF pages 31–63). The chapter-end question sets are on printed pages 54–61.

The site contains original explanations and worked solutions keyed to all 94 numbered exercises/problems, 26 discussion questions, eight key-example variations and the bridging roof problem. At the user's request, `physics-questions.js` includes the complete wording of these questions from the uploaded book, with screen-friendly line wrapping and Unicode mathematical notation. It also supplies the three data tables, shared lung passage and referenced values needed to solve the questions independently. Question figures are cropped from the supplied PDF and stored as embedded PNG images in standalone SVG files under `assets/physics/questions/`; their captions and text descriptions accompany them. Full textbook pages and the PDF itself are not published. Interactive lab diagrams and quizzes are original code. Internal “Test Your Understanding” checkpoints in the narrative are not separately indexed in this answer bank; the beginner lessons include their own understanding checks.

Questions are always visible. The optional writing panel and solution panel are independent. Solutions present explicitly numbered steps followed by the final answer, and saved attempts retain their existing storage keys. Search includes complete question text, shared passages and referenced information.

The Swedish version is a translation of the source questions and our teaching explanations. It includes every subpart, solution step, figure description, table, beginner lesson and quiz. Equation values and vector configurations are preserved; English `/day` and `/year` in Swedish explanatory unit expressions are rendered as `/dygn` and `/år`. The four question figures containing English prose labels are recreated as Swedish vector diagrams from the source geometry and values; the other seven retain their source images with Swedish accessible descriptions. The title of the original textbook and proper names remain in their original form. This is an independent study companion, not a publisher-issued Swedish edition. Language selection and written attempts stay in the browser, and changing language does not restart the quiz or clear work.

Source-sensitive details were checked against rendered pages: micro-units, vector signs, the orientations in Figures E1.21, E1.22, E1.33, E1.37 and P1.56, sample B’s micrograms in 1.87, the alveolar units and graph, and the distinct distances in 1.23 versus 1.57. Guided-practice numerical results are tested against the printed answer key. The site’s solutions are independently developed, not an official publisher solution manual.

The vector lab uses right-handed coordinates and an orthographic 3D view. In map examples, x points east, y north, and z up. Standard angles are counterclockwise from +x; compass bearings are clockwise from north. The cross-product arrow is scaled for visual clarity because it has product units; its actual components and magnitude are reported separately. A 2D view of a 3D vector is explicitly an xy projection. Route examples preserve their fixed textbook legs; other presets permit editing every component.

Estimation questions state their geometric and numerical assumptions. Nutrition and traction examples calculate the supplied textbook quantities. Uncertainty in 1.52 is treated as a first-order worst-case bound, with exact endpoint checks. The midnight interpretation in 1.89 distinguishes the textbook’s simplified geometry from actual local horizon visibility. Vector decimals include guard digits; users should round measured results to justified precision.

Attempts are stored only in the current browser under an independent `ember-physics:` prefix. Written reasoning is not automatically graded. Vector checks compare all three components with a rounding tolerance, and the unit-normal question accepts either normal direction. Revealing a quiz solution counts as viewed, not correct.

Validation: `npm ci && npm test`. Pure numerical tests check conversions, identities, route closure, textbook signs and guided answers. DOM tests run the actual page controllers in jsdom, including disclosure, storage, vector checking, fullscreen lifecycle, pointer events and quiz scoring. They do not replace visual testing or real mobile touch and native-dialog testing.

## Mathematics · Linear algebra, Chapter 1

Source questions: Howard Anton and Anton Kaul, *Elementary Linear Algebra*, 12th edition, the user-supplied `MAT1503_-_Prescribed_book.pdf`. Chapter 1 covers systems of linear equations and matrices. The answer bank contains 437 entries across sections 1.1–1.11 and the supplementary exercises, including true/false groups and technology problems. Question numbering and existing saved-answer identifiers are retained.

At the user's request, the full question wording, subparts, systems, matrices and relevant tables are included. Mathematical notation and line wrapping are normalized for the screen. Information needed from referenced questions, examples and theorems is identified alongside the question. Required figures are cropped from the supplied book and stored as embedded PNG images in standalone SVGs under `assets/mathematics/questions/`, with captions and text descriptions. The complete PDF and full textbook pages are not published.

The solutions are independently written teaching explanations, not a publisher's solution manual. Numbered steps explain the operation, its purpose and intermediate calculations; checks use the original equations or matrix identities where applicable. The final result appears after the steps. Where a printed statement is ambiguous or mathematically false, the explanation distinguishes the literal statement from a possible intended version rather than presenting a false proof.

Row reduction uses numerical pivoting and a zero tolerance of 10⁻⁹. Display formatting favors small rational values when close within that tolerance, otherwise rounded decimals; small nonzero displayed values retain significant digits. Technology exercises may need calculus, which is identified in the explanation. Written attempts are optional and saved in the current browser under the existing `ember-linear-algebra:` keys; comparison does not automatically grade a learner's reasoning.
