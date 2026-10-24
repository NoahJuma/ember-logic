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
