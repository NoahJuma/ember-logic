# Memory, storage, and text references

Created by Noah J.G TELTA Student MIUN 2026.

## Mathematics and physics video references

The video collection was checked on 7 November 2026. `study-video-data.js` records each exact video URL, publisher/teacher, original title, spoken language, topic mapping and source page. It includes 37 mathematics resources and 22 physics resources (36 English and 23 Swedish). Titles and short bilingual viewing suggestions are editorial guidance; changing the interface language does not change the video's audio. No claim is made about subtitle availability or the length of a video unless stated by its source.

Mathematics selections cover sections 1.1–1.11 of Anton and Kaul, including elimination, matrix operations, elementary matrices, inverses, solution structure, special matrices, transformations, composition, applications and Leontief models. Separate application links address interpolation/curve fitting, network flows, electrical circuits and chemical balancing. Three calculus prerequisites are clearly separated from the core linear algebra topics and offered where a technology or review question calls for them.

Physics selections cover the ten beginner lessons corresponding to Young and Freedman's Chapter 1: scientific method, problem-solving, units and dimensions, measurement uncertainty, estimation, vectors, components, unit vectors, dot products and cross products. Spoken Swedish is available for many topics; numerical problem-solving and Fermi estimation currently use explicitly labelled English resources.

Primary sources include:

- [Linköping University, TATA24: Axel's video catalogue](https://courses.mai.liu.se/GU/TATA24/Kursmaterial/Axel/) and the course's Tomas Sjödin videos: Swedish matrix, system and transformation explanations.
- [Mathispower4u's linear algebra video index](https://mathispower4u.com/linear-alg.php): worked matrix procedures and applications.
- [3Blue1Brown](https://www.3blue1brown.com/topics/linear-algebra): geometric explanations of transformations, inverses, dot products and cross products.
- [MIT OpenCourseWare, 8.01SC Classical Mechanics](https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/): vector foundations, components and unit vectors.
- [Khan Academy](https://www.khanacademy.org/): specific video lessons on significant figures, scientific method, interpolation and the calculus prerequisites.
- Creator teaching pages and publisher video metadata for Flipping Physics, TED-Ed, Jonas Månsson, Lars Filipsson, Tomas Rönnåbakk Sverin, Magnus Hummelgård, Jimmy Gustafsson, Johan Falk, PS fysik and the other individual teachers credited on each link. The catalogue preserves their exact per-video source URLs.

Verification used the creator's catalogue, published description or transcript to establish topic relevance, and direct HTTP/video metadata checks to confirm the resource identity and availability. Direct university MP4 links returned video content types; YouTube identities were checked with YouTube's oEmbed metadata. The videos were not all watched from beginning to end. Metadata and link checks do not guarantee future availability or playback on every device.

The study pages do not embed, copy or auto-play these videos. Optional help is outside the hidden solutions, links open in a new tab, and drafts remain on the original study page. Videos teach a relevant method or concept; they are not represented as the publisher's solutions to each specific textbook question. DOM tests check topic coverage, useful routing, accessible external links, language changes, and preservation of drafts, vector attempts and disclosure state.

## Computer science · Data Storage, Chapter 1

Source: J. Glenn Brookshear and Dennis Brylow, *Computer Science: An Overview*, 13th edition, Global Edition, Pearson (2020), the user-supplied textbook. Chapter 1 begins on page 39; sections 1.1–1.10 occupy pages 40–101, review problems pages 102–107, and social discussion questions pages 107–108. The answer bank includes all 63 numbered section exercises, all 61 review problems and all seven discussion questions. English question wording follows the supplied book, with readable line breaks and mathematical symbols. Necessary question diagrams are cropped from the supplied PDF and embedded in standalone SVG files under `assets/computer-science/questions/`; Swedish versions translate the prose labels while preserving the circuit topology. The NAND-only solution diagram is an original redraw. The original PDF and full textbook pages are not published. Swedish questions and figure labels are translations. The ten lessons, worked solutions, interactive experiments and 120 quiz questions are original teaching material, not a publisher-issued solution manual or translation.

Solutions use small, explicit steps and distinguish a calculation from its meaning. Every question can be read without revealing its answer. Optional writing and worked solutions are independently controlled; saved drafts remain in the browser, not on a server. Written reasoning and discussion answers are not automatically graded. The previous English workbench remains available separately, preserving its existing storage keys and links.

Chapter-specific conventions:

- The floating-point experiment follows **the book’s eight-bit format**, not IEEE 754: one sign bit, three excess-four exponent bits, and four fraction bits interpreted as `.bbbb`. Normalized nonzero values have a leading fraction bit of 1; the canonical zero is `00000000`. Encoding discards extra fraction bits unless a question explicitly asks for the closest value. The smallest positive normalized value is 1/32, and the largest stored positive value is 7.5. Raw, unnormalized patterns are decoded as written. This model has no IEEE infinities, NaNs or subnormal convention. Review problem 40 explicitly considers nearest approximations.
- Signed-magnitude, excess notation and two’s complement are separate representations. Arithmetic uses exact intermediate values, fixed-width bit results and explicit overflow checks. A discarded carry is not by itself signed overflow.
- The memory experiment is a tiny byte-addressed teaching model. Its spatial layers explain addresses and bits; they are not a measured chip layout. Power loss means unknown volatile contents, not a promise of zero. Controls and a textual byte table provide alternatives to rotating the 3D view.
- ASCII uses seven data bits. An eighth high-order bit can be supplied for parity. Curly printed quotation marks are normalized to straight ASCII quotes where the exercise explicitly asks for ASCII; solution text explains that choice and any spaces. UTF-8 is explained separately. Image and audio payload calculations exclude compression and file overhead unless stated.
- The book’s “LZW” example adds whole-word dictionary entries at word boundaries. It is a simplified teaching example; standard LZW builds character sequences. The compression experiment uses explicitly described run-length records. A shorter example is not a universal compression guarantee.
- Figure 1.27 uses eight six-bit codewords with minimum Hamming distance three. A one-bit error can be corrected. Codeword membership detects up to two errors, but blindly correcting a two-bit error can select the wrong codeword. Parity detects every odd count of flips and can miss even counts; it does not identify the flipped position.
- Storage-size assumptions distinguish decimal MB from binary MiB when the wording is ambiguous. Calculations using a stated average rotational delay do not divide that average by two again.

The printed question statements were checked independently of the appendix. Section 1.2 retains the four question numbers printed on page 51 even where appendix grouping differs. For 1.6 question 7(b), `3 − (−2)` is 5; the explanation identifies the conflicting printed answer. Odd-parity strings in 1.10 question 4 are recalculated from the requested parity rule. Review 17 uses the supplied average rotational delay and gives 19 ms. Worked answers explain assumptions instead of silently replacing contradictory data.

Review questions about currency use dated illustrative rates and a runnable example for obtaining a fresh table. Reference data checked for 6 November 2026: [European Central Bank euro reference rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html). Rates quoted per euro are converted to rates per US dollar by division. Currency symbols are checked against the [Unicode currency symbols chart](https://www.unicode.org/charts/PDF/U20A0.pdf). These examples teach data representation and programming; a saved rate table does not update itself.

Validation includes independent coverage of all source question IDs, bilingual field parity, every normalized eight-bit float round trip, all four-bit two’s-complement additions, single-bit parity/Hamming errors, UTF-8 byte comparisons, memory power behavior, and DOM interactions for drafts, hidden solutions, filters, language, quiz scoring and legacy navigation. Automated checks do not replace a real-browser layout review or testing on a physical phone.

## Original workbench references

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

The mathematics companion offers English and an independent Swedish translation of every included question, reference, worked step, final answer and beginner guide. The Swedish versions preserve exercise numbering, subparts, formulas, units and numerical data; original book titles and proper names remain unchanged. Swedish figure variants retain the original mathematical geometry and values while translating their accessible descriptions and any prose labels. This is not a publisher-issued Swedish edition. Both languages run the same calculations and share the existing saved-answer identifiers.
