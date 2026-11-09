/* CELLARIS — shared data
   Specs below are taken from public datasheets for the respective platforms
   (CT-4000 / CT-9000 series pages). Values marked "config." are configuration dependent. */

const MODELS = [
  {
    id: "ct-4008q-5v6a",
    model: "CT-4008Q-5V6A",
    series: "CT-4000",
    family: "cell",
    familyLabel: "Cell",
    dut: "Coin / pouch / cylindrical / prismatic cells",
    volt: "0–5 V",
    curr: "0.5 mA – 6 A",
    ranges: "4 auto-ranges",
    channels: "8 per module",
    accuracy: "±0.02% FS",
    response: "≤1.5 ms",
    dataRate: "10 Hz",
    regen: "—",
    img: "assets/img/cell-4000.webp",
    image: "cell-4000",
    blurb: "The workhorse of materials research: four current ranges from 0.5 mA to 6 A with ±0.02% FS on every range, so small-current detail is not lost when the test moves to amps.",
    tags: ["4 ranges", "8 ch/module", "254-step programs"]
  },
  {
    id: "ct-4008tn-5v50ma",
    model: "CT-4008Tn-5V50mA",
    series: "CT-4000",
    family: "cell",
    familyLabel: "Cell",
    dut: "Coin cells, half cells, thin-film electrodes",
    volt: "0–5 V",
    curr: "10 µA – 50 mA",
    ranges: "3 auto-ranges",
    channels: "8 per module",
    accuracy: "±0.02% FS",
    response: "≤2 ms",
    dataRate: "10 Hz",
    regen: "—",
    img: "assets/img/cell-4000.webp",
    image: "cell-4000",
    blurb: "Built for the microamp regime: three ranges down to 10 µA for coin-cell and half-cell studies where coulombic efficiency is measured in fractions of a percent.",
    tags: ["µA range", "coin cells", "Coulombic efficiency"]
  },
  {
    id: "ct-9000-5v15a",
    model: "CT-9000-5V15A",
    series: "CT-9000",
    family: "cell",
    familyLabel: "Cell",
    dut: "High-precision single cells",
    volt: "0–5 V",
    curr: "15 µA – 15 A",
    ranges: "4 auto-ranges",
    channels: "8 per module",
    accuracy: "±0.02% FS · ±3 µA (range 1)",
    response: "≤150 µs",
    dataRate: "up to 10 kHz",
    regen: "—",
    img: "assets/img/cell-9000.webp",
    image: "cell-9000",
    blurb: "The reference instrument: 15 µA to 15 A across four ranges, ±0.02% FS per range, and 150 µs current response for pulse, DCIR and HPPC work that premium platforms are usually specified for.",
    tags: ["150 µs response", "±3 µA accuracy", "Pulse / DCIR / HPPC"]
  },
  {
    id: "ct-9008-5v300ma",
    model: "CT-9008-5V300mA",
    series: "CT-9000",
    family: "cell",
    familyLabel: "Cell",
    dut: "Micro-electrodes, thin films, small-format cells",
    volt: "0–5 V",
    curr: "1 µA – 300 mA",
    ranges: "4 auto-ranges",
    channels: "8 per module",
    accuracy: "±0.02% FS",
    response: "≤300 µs",
    dataRate: "up to 10 kHz",
    regen: "—",
    img: "assets/img/cell-9000.webp",
    image: "cell-9000",
    blurb: "A high-resolution front end for small-format work, with microamp resolution at the low end and kHz-class logging when the electrochemistry moves fast.",
    tags: ["Microamp", "10 kHz logging", "Thin films"]
  },
  {
    id: "ce-4008d-5v30a",
    model: "CE-4008D-5V30A",
    series: "CE-4000",
    family: "cell",
    familyLabel: "Cell",
    dut: "Large-format single cells",
    volt: "0–5 V",
    curr: "— 30 A per channel",
    ranges: "4 auto-ranges",
    channels: "8 per module",
    accuracy: "±0.02% FS",
    response: "≤1.5 ms",
    dataRate: "10 Hz",
    regen: "Regenerative",
    img: "assets/img/pro-6004.jpg",
    image: "pro-6004",
    blurb: "Energy-regenerative cycling for high-capacity cells: discharged energy is returned to the grid instead of burned off as heat, which matters at 30 A per channel.",
    tags: ["Regenerative", "30 A/ch", "High-capacity cells"]
  },
  {
    id: "ce-6016-pro-5v300a",
    model: "CE-6016-Pro-5V300A",
    series: "CE-6000",
    family: "cell",
    familyLabel: "Cell",
    dut: "High-current cells, tabs, modules",
    volt: "0–5 V",
    curr: "— 300 A per channel",
    ranges: "4 auto-ranges",
    channels: "— 4–8 per cabinet (config.)",
    accuracy: "±0.02% FS",
    response: "≤2 ms",
    dataRate: "10 Hz",
    regen: "Regenerative",
    img: "assets/img/pro-6004.jpg",
    image: "pro-6004",
    blurb: "For cells that draw hundreds of amps: regenerative 300 A channels with the same four-range front end, used for power-cell and tab-level validation.",
    tags: ["300 A/ch", "Regenerative", "Power cells"]
  },
  {
    id: "ce-6008n-100v100a",
    model: "CE-6008N-100V100A",
    series: "CE-6000",
    family: "module",
    familyLabel: "Module",
    dut: "Modules, small packs, 48 V / 96 V systems",
    volt: "0–100 V",
    curr: "— 100 A per channel",
    ranges: "4 auto-ranges",
    channels: "config.",
    accuracy: "±0.02% FS",
    response: "≤2 ms",
    dataRate: "10 Hz",
    regen: "Regenerative",
    img: "assets/img/pack-6000.webp",
    image: "pack-6000",
    blurb: "Module-level validation at 100 V / 100 A, with the auxiliary channels needed to log cell voltages and temperatures alongside the main channel.",
    tags: ["100 V / 100 A", "Aux channels", "48–96 V packs"]
  },
  {
    id: "ce-6002-1500v200a",
    model: "CE-6002-1500V200A",
    series: "CE-6000",
    family: "pack",
    familyLabel: "Pack",
    dut: "EV packs, BESS racks, 800 V–1500 V architectures",
    volt: "0–1500 V",
    curr: "— 200 A per channel",
    ranges: "4 auto-ranges",
    channels: "config.",
    accuracy: "±0.02% FS",
    response: "≤2 ms",
    dataRate: "10 Hz",
    regen: "Regenerative",
    img: "assets/img/pack-6000.webp",
    image: "pack-6000",
    blurb: "1500 V, regenerative pack testing for 800 V EV platforms and battery-energy-storage racks, with energy recovery to the grid.",
    tags: ["1500 V", "Regenerative", "BESS / EV packs"]
  },
  {
    id: "ce-6001n-3000v200a",
    model: "CE-6001N-3000V200A",
    series: "CE-6000",
    family: "pack",
    familyLabel: "Pack",
    dut: "High-voltage stacks and container-scale systems",
    volt: "0–3000 V",
    curr: "— 200 A per channel",
    ranges: "4 auto-ranges",
    channels: "config.",
    accuracy: "±0.02% FS",
    response: "≤2 ms",
    dataRate: "10 Hz",
    regen: "Regenerative",
    img: "assets/img/pack-6000.webp",
    image: "pack-6000",
    blurb: "For container-scale and MV-class stacks where 1500 V is not enough: 3000 V regenerative channels with full safety interlocking.",
    tags: ["3000 V", "Container scale", "Safety interlock"]
  },
  {
    id: "whw-25l-s-16ch",
    model: "WHW-25L-S-16CH",
    series: "WHW",
    family: "chamber",
    familyLabel: "Chamber",
    dut: "Coin / small pouch cells under controlled temperature",
    volt: "—",
    curr: "—",
    ranges: "—",
    channels: "16 integrated",
    accuracy: "±0.3 °C (chamber)",
    response: "—",
    dataRate: "1 Hz",
    regen: "—",
    img: "assets/img/aio.webp",
    image: "aio",
    blurb: "A benchtop all-in-one: 25 L chamber and 16 test channels in one unit, so temperature-controlled cycling fits on a lab bench instead of a rack.",
    tags: ["All-in-one", "25 L", "16 channels"]
  },
  {
    id: "whw-200l-2z",
    model: "WHW-200L-2Z",
    series: "WHW",
    family: "chamber",
    familyLabel: "Chamber",
    dut: "Module and pack testing with dual temperature zones",
    volt: "—",
    curr: "—",
    ranges: "—",
    channels: "config.",
    accuracy: "±0.5 °C (per zone)",
    response: "—",
    dataRate: "1 Hz",
    regen: "—",
    img: "assets/img/chamber.webp",
    image: "chamber",
    blurb: "Two independent zones in a 200 L cabinet: run a control group and an aged group in parallel without buying two chambers.",
    tags: ["Dual zone", "200 L", "Module / pack"]
  },
  {
    id: "wgdw-20l",
    model: "WGDW-20L",
    series: "WGDW",
    family: "chamber",
    familyLabel: "Chamber",
    dut: "Small-format cells, temperature characterisation",
    volt: "—",
    curr: "—",
    ranges: "—",
    channels: "—",
    accuracy: "±0.3 °C",
    response: "—",
    dataRate: "—",
    regen: "—",
    img: "assets/img/chamber.webp",
    image: "chamber",
    blurb: "A 20 L benchtop high/low temperature chamber for temperature-dependent characterisation, designed to sit next to the cycler rather than in a separate room.",
    tags: ["−40…+150 °C", "20 L", "Benchtop"]
  },
  {
    id: "wfb-220l-2k",
    model: "WFB-220L-2K",
    series: "WFB",
    family: "chamber",
    familyLabel: "Chamber",
    dut: "Abuse and safety testing",
    volt: "—",
    curr: "—",
    ranges: "—",
    channels: "—",
    accuracy: "—",
    response: "—",
    dataRate: "—",
    regen: "—",
    img: "assets/img/explosion.webp",
    image: "explosion",
    blurb: "Explosion-proof 220 L chamber with pressure relief and gas exhaust, for the abuse tests that a standard chamber should not be asked to survive.",
    tags: ["Explosion-proof", "Pressure relief", "Abuse testing"]
  },
  {
    id: "ptf-zj-f-600a",
    model: "PTF-ZJ-F-600A",
    series: "Fixtures",
    family: "fixture",
    familyLabel: "Fixture",
    dut: "Prismatic cells, 1 channel per fixture",
    volt: "—",
    curr: "600 A",
    ranges: "—",
    channels: "1",
    accuracy: "—",
    response: "—",
    dataRate: "—",
    regen: "—",
    img: "assets/img/clamp.webp",
    image: "clamp",
    blurb: "A 600 A prismatic clamp with adjustable pressure and four-wire sensing, so the current path and the voltage sense path stay separate.",
    tags: ["600 A", "4-wire", "Adjustable pressure"]
  },
  {
    id: "ca-4008n-1u-t",
    model: "CA-4008N-1U-T",
    series: "Auxiliary",
    family: "fixture",
    familyLabel: "Auxiliary",
    dut: "Temperature / voltage auxiliary channels",
    volt: "0–5 V aux",
    curr: "—",
    ranges: "—",
    channels: "8 aux per unit",
    accuracy: "±0.1 °C (NTC)",
    response: "—",
    dataRate: "1 Hz",
    regen: "—",
    img: "assets/img/clamp.webp",
    image: "clamp",
    blurb: "Adds eight temperature or auxiliary voltage channels to a 1U slot, logged in the same time base as the main channels.",
    tags: ["8 aux channels", "NTC / PT100", "1U"]
  }
];

const FAMILIES = [
  { id: "all", label: "All instruments" },
  { id: "cell", label: "Cell" },
  { id: "module", label: "Module" },
  { id: "pack", label: "Pack" },
  { id: "chamber", label: "Chambers" },
  { id: "fixture", label: "Fixtures & auxiliary" }
];

const FAMILY_LABELS = {
  en: ["All instruments", "Cell", "Module", "Pack", "Chambers", "Fixtures & auxiliary"],
  ru: ["Все приборы", "Ячейки", "Модули", "Сборки", "Камеры", "Оснастка"],
  es: ["Todos", "Celdas", "Módulos", "Packs", "Cámaras", "Utillaje"]
};

/* model mapping — application-based, not a claim of equivalence */
const MAPPING = [
  ["Arbin LBT benchtop / MSTAT", "Benchtop research cycling, pulse and DCIR", "CT-9000 · CT-4000"],
  ["Arbin LBT rack systems", "High-channel-count lab racks", "CT-9000 · CE-6000"],
  ["Maccor 4200 / 4300", "Research cycling with external chambers", "CT-4000 · CT-9000"],
  ["BioLogic BCS-800", "EIS-coupled cycling for materials work", "CT-8000 · CT-9000"],
  ["Chroma 17010", "Module and pack cycling", "CE-6000 module / pack"],
  ["Any premium platform", "Pack testing above 800 V", "CE-6002 · CE-6001N"]
];

const NAV = {
  en: {
    lang: "EN",
    base: "",
    items: [
      ["Instruments", "products.html"],
      ["Applications", "applications.html"],
      ["Compare", "compare.html"],
      ["Science", "science.html"],
      ["Software", "software.html"],
      ["Support", "support.html"],
      ["Company", "about.html"]
    ],
    cta: "Request a consultation",
    ctaHref: "contact.html",
    langs: [["EN", ""], ["RU", "ru/"], ["ES", "es/"]]
  },
  ru: {
    lang: "RU",
    base: "",
    items: [
      ["Приборы", "products.html"],
      ["Сравнение", "compare.html"],
      ["Применения (EN)", "../applications.html"],
      ["Наука (EN)", "../science.html"],
      ["Поддержка (EN)", "../support.html"],
      ["Компания (EN)", "../about.html"]
    ],
    cta: "Запросить консультацию",
    ctaHref: "contact.html",
    langs: [["EN", "../"], ["RU", ""], ["ES", "../es/"]]
  },
  es: {
    lang: "ES",
    base: "",
    items: [
      ["Instrumentos", "products.html"],
      ["Comparativa", "compare.html"],
      ["Aplicaciones (EN)", "../applications.html"],
      ["Ciencia (EN)", "../science.html"],
      ["Soporte (EN)", "../support.html"],
      ["Compañía (EN)", "../about.html"]
    ],
    cta: "Solicitar consulta",
    ctaHref: "contact.html",
    langs: [["EN", "../"], ["RU", "../ru/"], ["ES", ""]]
  }
};

const FOOTER = {
  en: {
    tag: "Research-grade battery test systems. Engineered and manufactured by Neware Technology (est. 1998), configured for laboratory use by Cellaris.",
    cols: [
      ["Instruments", [["Cell testers", "products.html"], ["Module & pack", "products.html"], ["Chambers", "products.html"], ["Fixtures", "products.html"]]],
      ["Resources", [["Application notes", "science.html"], ["Compare", "compare.html"], ["Software & data", "software.html"], ["Downloads", "support.html"]]],
      ["Company", [["About", "about.html"], ["Quality & compliance", "about.html"], ["Contact", "contact.html"]]]
    ],
    legal: "© 2026 Cellaris Instruments. Specifications subject to change; verify against the current datasheet before ordering."
  },
  ru: {
    tag: "Испытательные системы для аккумуляторов исследовательского класса. Производство Neware Technology (осн. 1998), конфигурация для лабораторий — Cellaris.",
    cols: [
      ["Приборы", [["Тестеры ячеек", "products.html"], ["Модули и сборки", "products.html"], ["Климатические камеры", "products.html"], ["Оснастка", "products.html"]]],
      ["Материалы", [["Прикладные заметки", "../science.html"], ["Сравнение", "compare.html"], ["ПО и данные", "../software.html"], ["Загрузки", "../support.html"]]],
      ["Компания", [["О нас", "../about.html"], ["Качество и соответствие", "../about.html"], ["Контакты", "../contact.html"]]]
    ],
    legal: "© 2026 Cellaris Instruments. Характеристики могут изменяться; перед заказом сверяйтесь с актуальным datasheet."
  },
  es: {
    tag: "Sistemas de ensayo de baterías de grado científico. Fabricados por Neware Technology (desde 1998) y configurados para laboratorio por Cellaris.",
    cols: [
      ["Instrumentos", [["Probadores de celda", "products.html"], ["Módulos y packs", "products.html"], ["Cámaras", "products.html"], ["Utillaje", "products.html"]]],
      ["Recursos", [["Notas de aplicación", "../science.html"], ["Comparativa", "compare.html"], ["Software y datos", "../software.html"], ["Descargas", "../support.html"]]],
      ["Compañía", [["Sobre nosotros", "../about.html"], ["Calidad y cumplimiento", "../about.html"], ["Contacto", "../contact.html"]]]
    ],
    legal: "© 2026 Cellaris Instruments. Las especificaciones pueden cambiar; verifique la ficha técnica vigente antes de comprar."
  }
};
