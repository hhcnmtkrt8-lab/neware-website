// Knowledge Base - Document Categories & Index
// Extracted from newarebattery.com technical documentation

export type CategorySlug =
  | "getting-started"
  | "bts4000"
  | "bts9000"
  | "btsda"
  | "test-profiles"
  | "standards"
  | "troubleshooting"
  | "ce6000"
  | "igbt"
  | "hardware";

export type Document = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  category: CategorySlug;
  tags: string[];
  tagsEn: string[];
  lastUpdated: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  readingTime: number; // minutes
  relatedDocIds?: string[];
  software?: "BTS7" | "BTS8" | "BTS9" | "BTSDA" | "N/A";
};

export type Category = {
  slug: CategorySlug;
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  color: string;
  documentCount: number;
};

export const categories: Category[] = [
  {
    slug: "getting-started",
    label: "入门指南",
    labelEn: "Getting Started",
    description: "BTS软件安装、网络连接、硬件接线的基础操作指南",
    descriptionEn: "Guides for software installation, network setup, and hardware wiring",
    icon: "BookOpen",
    color: "#2563eb",
    documentCount: 3,
  },
  {
    slug: "bts4000",
    label: "BTS4000 使用指南",
    labelEn: "BTS4000 Operation Guide",
    description: "BTS4000 系列电池检测系统的完整操作教程，包含软件设置、步骤编辑、测试流程配置",
    descriptionEn: "Complete operation guides for BTS4000 battery testing systems, including software setup, step editing, and test procedure configuration",
    icon: "Settings",
    color: "#059669",
    documentCount: 4,
  },
  {
    slug: "bts9000",
    label: "BTS9000 使用指南",
    labelEn: "BTS9000 Operation Guide",
    description: "BTS9000 高端旗舰系统的操作指南",
    descriptionEn: "Operation guides for the BTS9000 high-end flagship system",
    icon: "Cpu",
    color: "#dc2626",
    documentCount: 2,
  },
  {
    slug: "btsda",
    label: "BTSDA 数据分析",
    labelEn: "BTSDA Data Analysis",
    description: "BTSDA 数据分析工具的使用教程，包括曲线图自定义、dQ/dV 分析、超级电容测试等",
    descriptionEn: "BTSDA data analysis tool guides, including curve customization, dQ/dV analysis, supercapacitor testing",
    icon: "BarChart3",
    color: "#7c3aed",
    documentCount: 3,
  },
  {
    slug: "test-profiles",
    label: "测试工艺文件",
    labelEn: "Test Profiles & Recipes",
    description: "恒流充放电、DCIR、脉冲、循环寿命等典型测试工艺的配置文件和设置说明",
    descriptionEn: "Configuration files and instructions for typical test profiles: CC charge/discharge, DCIR, pulse, cycle life",
    icon: "FileText",
    color: "#d97706",
    documentCount: 5,
  },
  {
    slug: "standards",
    label: "测试标准",
    labelEn: "Testing Standards",
    description: "IEC 62133、UN 38.3、UL 1642 等国际标准在 Neware 设备上的应用指南",
    descriptionEn: "Guides for applying IEC 62133, UN 38.3, UL 1642 and other international standards on Neware equipment",
    icon: "Shield",
    color: "#0891b2",
    documentCount: 3,
  },
  {
    slug: "troubleshooting",
    label: "故障排查",
    labelEn: "Troubleshooting",
    description: "硬件连接故障、软件连接问题、通道进入保护模式等常见问题的解决方案",
    descriptionEn: "Solutions for common issues: hardware connection, software connection, channel protection mode",
    icon: "Wrench",
    color: "#dc2626",
    documentCount: 2,
  },
  {
    slug: "ce6000",
    label: "CE6000 使用指南",
    labelEn: "CE6000 Operation Guide",
    description: "CE6000 能量回馈型电池测试系统的操作教程",
    descriptionEn: "Operation guides for the CE6000 energy feedback battery testing system",
    icon: "Zap",
    color: "#059669",
    documentCount: 1,
  },
  {
    slug: "igbt",
    label: "IGBT 大功率系统",
    labelEn: "IGBT High Power Systems",
    description: "IGBT 大功率电池 PACK 测试系统的操作教程",
    descriptionEn: "Operation guides for IGBT high-power battery PACK testing systems",
    icon: "Gauge",
    color: "#7c3aed",
    documentCount: 1,
  },
  {
    slug: "hardware",
    label: "硬件连接与维护",
    labelEn: "Hardware & Maintenance",
    description: "设备接线、圆柱电池夹具使用、环境试验箱集成等硬件相关操作",
    descriptionEn: "Equipment wiring, cylindrical battery fixtures, environmental chamber integration",
    icon: "Cable",
    color: "#4f46e5",
    documentCount: 3,
  },
];

export const documents: Document[] = [
  // ── Getting Started ───────────────────────────────────────────────
  {
    id: "bts4000-quickstart",
    slug: "bts4000-quickstart",
    title: "BTS4000 快速入门指南（BTS8.0）",
    titleEn: "BTS4000 Quick Start Guide (BTS8.0)",
    summary:
      "新威尔官方发布的 BTS4000、BTS8000、CE6000 系列设备的完整开机指南，包含硬件接线、中继机设置、电脑网络配置、软件安装及首次测试的全部步骤。",
    summaryEn:
      "Neware official complete startup guide for BTS4000, BTS8000, and CE6000 series, covering hardware wiring, middle machine setup, PC network configuration, software installation, and first test procedure.",
    category: "getting-started",
    tags: ["BTS8.0", "快速入门", "安装", "接线", "网络设置"],
    tagsEn: ["BTS8.0", "quickstart", "installation", "wiring", "network"],
    lastUpdated: "2026-03-10",
    difficulty: "beginner",
    readingTime: 15,
    relatedDocIds: ["bts4000-test-profiles", "bts8-troubleshooting"],
    software: "BTS8",
  },
  {
    id: "bts9000-quickstart",
    slug: "bts9000-quickstart",
    title: "BTS9000 快速入门指南",
    titleEn: "BTS9000 Quick Start Guide",
    summary:
      "新威尔官方发布的 BTS9000、BTS3000n 系列设备的入门指南，1-2-3 步骤快速上手 BTS9 软件。",
    summaryEn:
      "Neware official quick start guide for BTS9000 and BTS3000n series with 1-2-3 step BTS9 software onboarding.",
    category: "getting-started",
    tags: ["BTS9", "BTS9000", "入门", "快速开始"],
    tagsEn: ["BTS9", "BTS9000", "getting started", "quick start"],
    lastUpdated: "2025-08-08",
    difficulty: "beginner",
    readingTime: 10,
    relatedDocIds: ["bts9000-dcir"],
    software: "BTS9",
  },

  // ── BTS4000 ────────────────────────────────────────────────────────
  {
    id: "bts4000-test-profiles",
    slug: "bts4000-test-profiles",
    title: "BTS4000 测试步骤设置详解",
    titleEn: "BTS4000 Test Profile Step-by-Step Configuration",
    summary:
      "详细介绍 BTS4000 软件中各种测试步骤类型的设置方法，包括标准恒流/恒压充放电、C-rate 模式、恒流恒压组合（CCCV）、IF 条件判断、专业模式等，以及数据记录时间和安全限值的配置。",
    summaryEn:
      "Detailed explanation of all test step types in BTS4000 software: standard CC/CCV charge/discharge, C-rate mode, CCCV combination, IF conditional steps, professional mode, data record time, and safety limits configuration.",
    category: "bts4000",
    tags: [
      "测试步骤",
      "恒流",
      "恒压",
      "C-rate",
      "CCCV",
      "IF条件",
      "专业模式",
    ],
    tagsEn: [
      "test steps",
      "constant current",
      "constant voltage",
      "C-rate",
      "CCCV",
      "IF condition",
      "professional mode",
    ],
    lastUpdated: "2020-08-13",
    difficulty: "intermediate",
    readingTime: 20,
    relatedDocIds: ["bts4000-dcir", "bts4000-pulse", "bts4000-cycle-life"],
    software: "BTS8",
  },
  {
    id: "bts4000-dcir",
    slug: "bts4000-dcir-test",
    title: "BTS4000 DCIR 测试方法",
    titleEn: "BTS4000 DCIR Test Method",
    summary:
      "按照 IEC 标准，使用 0.2C 放电 10 秒和 1C 放电 1 秒两个步骤组合获取电池直流内阻（DCIR）值。包含可下载的 XML 测试工艺文件和 BTSDA 分析教程。",
    summaryEn:
      "Per IEC standard: use 0.2C discharge for 10s + 1C discharge for 1s to calculate DCIR. Includes downloadable XML test profile and BTSDA analysis tutorial.",
    category: "bts4000",
    tags: ["DCIR", "直流内阻", "IEC标准", "0.2C", "1C", "脉冲放电"],
    tagsEn: ["DCIR", "internal resistance", "IEC standard", "pulse discharge"],
    lastUpdated: "2018-12-29",
    difficulty: "advanced",
    readingTime: 12,
    relatedDocIds: ["bts4000-pulse", "bts9000-dcir"],
    software: "BTS8",
  },
  {
    id: "bts4000-pulse",
    slug: "bts4000-pulse-test",
    title: "BTS4000 脉冲测试方法",
    titleEn: "BTS4000 Pulse Test Method",
    summary:
      "使用 BuildTest 软件创建脉冲测试步骤的完整流程。BTS7.6.x 用户需要 BuildTest 软件，BTS8.0 用户可直接使用内置步骤编辑器。需要快速采样率（0.1s），电压范围 3V-4.2V 为例。",
    summaryEn:
      "Complete workflow for creating pulse test steps using BuildTest software. BTS7.6.x requires BuildTest; BTS8.0 has built-in step editor. Requires fast sampling rate (0.1s). Example with 3V-4.2V battery.",
    category: "bts4000",
    tags: ["脉冲测试", "BuildTest", "采样率", "快速放电"],
    tagsEn: ["pulse test", "BuildTest", "sampling rate", "fast discharge"],
    lastUpdated: "2020-06-03",
    difficulty: "advanced",
    readingTime: 18,
    relatedDocIds: ["bts4000-dcir"],
    software: "BTS8",
  },
  {
    id: "bts4000-triple-range",
    slug: "bts4000-triple-range",
    title: "BTS4000 三量程测试器详解",
    titleEn: "BTS4000 Triple Range Testers Explained",
    summary:
      "BTS4000 三量程（Triple Range）系列的特点和应用场景。三量程设计允许设备在同一通道内自动切换不同电流量程，实现宽范围高精度测试。",
    summaryEn:
      "Overview of the BTS4000 Triple Range series features and applications. Triple range design enables automatic current range switching within the same channel for wide-range high-accuracy testing.",
    category: "bts4000",
    tags: ["三量程", "Triple Range", "电流量程", "高精度"],
    tagsEn: ["triple range", "current range", "high accuracy"],
    lastUpdated: "2021-01-01",
    difficulty: "intermediate",
    readingTime: 8,
    relatedDocIds: ["bts4000-quickstart"],
    software: "N/A",
  },

  // ── BTS9000 ────────────────────────────────────────────────────────
  {
    id: "bts9000-dcir",
    slug: "bts9000-dcir-test",
    title: "BTS9000 DCIR 测试（内置功能）",
    titleEn: "BTS9000 DCIR Test (Built-in Function)",
    summary:
      "BTS9000 软件内置 DCIR 测量功能（基于 IEC 标准），称为\"测量电阻\"步骤类型。BTS9000 相比 BTS4000 的一大优势，无需手动配置步骤即可完成 DCIR 测试。",
    summaryEn:
      "BTS9000 software has a built-in DCIR measurement function (IEC standard) called 'measuring resistance' step type. Major advantage over BTS4000: no manual step configuration needed for DCIR testing.",
    category: "bts9000",
    tags: ["DCIR", "测量电阻", "IEC标准", "BTS9000"],
    tagsEn: ["DCIR", "resistance measurement", "IEC standard", "BTS9000"],
    lastUpdated: "2020-01-01",
    difficulty: "intermediate",
    readingTime: 10,
    relatedDocIds: ["bts4000-dcir", "bts9000-quickstart"],
    software: "BTS9",
  },
  {
    id: "bts9000-crate",
    slug: "bts9000-crate-mode",
    title: "BTS9000 C-Rate 模式",
    titleEn: "BTS9000 C-Rate Mode",
    summary:
      "BTS9000 软件支持直接输入 C-rate 倍率进行测试，无需手动换算电池容量和电流值。系统自动根据电池标称容量计算实际充放电电流。",
    summaryEn:
      "BTS9000 software supports direct C-rate input for testing without manual capacity-current conversion. System automatically calculates actual charge/discharge current based on battery nominal capacity.",
    category: "bts9000",
    tags: ["C-Rate", "倍率", "容量", "自动计算"],
    tagsEn: ["C-rate", "倍率", "capacity", "auto calculation"],
    lastUpdated: "2020-01-01",
    difficulty: "beginner",
    readingTime: 6,
    relatedDocIds: ["bts4000-test-profiles"],
    software: "BTS9",
  },

  // ── BTSDA Data Analysis ────────────────────────────────────────────
  {
    id: "btsda-customize-curves",
    slug: "btsda-customize-curves",
    title: "BTSDA 曲线图自定义设置",
    titleEn: "BTSDA Curve and Plot Customization",
    summary:
      "BTSDA 数据分析工具中如何自定义曲线图的显示方式，包括添加多条曲线、设置坐标轴范围、切换图表类型、保存模板等操作。",
    summaryEn:
      "How to customize curve display in BTSDA data analysis tool, including adding multiple curves, setting axis ranges, switching chart types, saving templates.",
    category: "btsda",
    tags: ["BTSDA", "曲线图", "自定义", "图表"],
    tagsEn: ["BTSDA", "curves", "customization", "plots"],
    lastUpdated: "2019-01-01",
    difficulty: "intermediate",
    readingTime: 8,
    relatedDocIds: ["btsda-dqdv", "btsda-export"],
    software: "BTSDA",
  },
  {
    id: "btsda-dqdv",
    slug: "btsda-dqdv-analysis",
    title: "BTSDA dQ/dV 分析功能",
    titleEn: "BTSDA dQ/dV Analysis",
    summary:
      "使用 BTSDA 对电池充放电数据进行 dQ/dV 微分容量分析，帮助识别电池相变峰、SEI 形成等关键电化学过程。",
    summaryEn:
      "Using BTSDA for dQ/dV differential capacity analysis of battery charge/discharge data to identify key electrochemical processes like phase transitions and SEI formation.",
    category: "btsda",
    tags: ["dQ/dV", "微分容量", "相变", "SEI", "电化学分析"],
    tagsEn: ["dQ/dV", "differential capacity", "phase transition", "SEI", "electrochemical analysis"],
    lastUpdated: "2019-06-01",
    difficulty: "advanced",
    readingTime: 12,
    relatedDocIds: ["btsda-customize-curves", "bts4000-dcir"],
    software: "BTSDA",
  },
  {
    id: "btsda-supercapacitor",
    slug: "btsda-supercapacitor-capacitance",
    title: "BTSDA 超级电容容值计算",
    titleEn: "BTSDA Supercapacitor Capacitance Calculation",
    summary:
      "在 BTSDA 中计算超级电容的电容值（F）和等效串联电阻（ESR）的操作步骤，适用于 CE 系列和超级电容专用测试设备。",
    summaryEn:
      "Calculating supercapacitor capacitance (F) and ESR in BTSDA. For CE series and supercapacitor-dedicated test equipment.",
    category: "btsda",
    tags: ["超级电容", "电容值", "ESR", "BTSDA"],
    tagsEn: ["supercapacitor", "capacitance", "ESR", "BTSDA"],
    lastUpdated: "2020-01-01",
    difficulty: "intermediate",
    readingTime: 8,
    relatedDocIds: ["btsda-customize-curves"],
    software: "BTSDA",
  },

  // ── Test Profiles & Recipes ────────────────────────────────────────
  {
    id: "bts4000-cycle-life",
    slug: "bts4000-cycle-life-recipe",
    title: "BTS4000 循环寿命测试工艺",
    titleEn: "BTS4000 Cycle Life Test Recipe",
    summary:
      "经典的锂电池循环寿命测试工艺，包含 CC-CV 恒流恒压充电、CC 恒流放电、循环次数设置。可下载 XML 文件直接导入 BTS 软件使用。",
    summaryEn:
      "Classic lithium battery cycle life test recipe with CC-CV charge, CC discharge, and cycle count settings. Downloadable XML file can be imported directly into BTS software.",
    category: "test-profiles",
    tags: ["循环寿命", "CC-CV", "恒流恒压", "XML"],
    tagsEn: ["cycle life", "CC-CV", "constant current constant voltage", "XML"],
    lastUpdated: "2020-08-13",
    difficulty: "intermediate",
    readingTime: 10,
    relatedDocIds: ["bts4000-test-profiles", "bts4000-retention"],
    software: "BTS8",
  },
  {
    id: "bts4000-retention",
    slug: "bts4000-retention-capacity",
    title: "BTS4000 容量保持率测试（自放电测试）",
    titleEn: "BTS4000 Capacity Retention / Self-Discharge Test",
    summary:
      "测量满电态电池在搁置一定时间（如 24 小时）后的剩余容量，即自放电率或漏电流测试。IEC 标准中的连续低速率充电测试方法。",
    summaryEn:
      "Measuring remaining capacity after a battery rests at full charge for a set time (e.g. 24h) — self-discharge or leak current test. IEC standard continuous low-rate charge test method.",
    category: "test-profiles",
    tags: ["容量保持率", "自放电", "漏电流", "IEC", "搁置"],
    tagsEn: ["capacity retention", "self-discharge", "leak current", "IEC", "rest"],
    lastUpdated: "2019-01-01",
    difficulty: "intermediate",
    readingTime: 8,
    relatedDocIds: ["bts4000-cycle-life"],
    software: "BTS8",
  },
  {
    id: "bts9000-usabc-hppc",
    slug: "bts9000-usabc-hppc-recipe",
    title: "USABC C3 HPPC 功率特性测试",
    titleEn: "USABC C3 HPPC Power Characterization Test",
    summary:
      "USABC 混合动力脉冲功率特性（HPPC）测试工艺，用于测定电池在不同 SOC 下的脉冲功率能力。是电池功率特性评估的标准测试方法。",
    summaryEn:
      "USABC Hybrid Pulse Power Characterization (HPPC) test profile for measuring battery pulse power capability at different SOCs. Standard method for battery power characterization.",
    category: "test-profiles",
    tags: ["USABC", "HPPC", "功率特性", "SOC", "混合动力"],
    tagsEn: ["USABC", "HPPC", "power characterization", "SOC", "hybrid power"],
    lastUpdated: "2020-01-01",
    difficulty: "advanced",
    readingTime: 15,
    relatedDocIds: ["bts4000-dcir", "bts9000-dcir"],
    software: "BTS9",
  },

  // ── Standards ─────────────────────────────────────────────────────
  {
    id: "iec-62133",
    slug: "iec-62133-guide",
    title: "IEC 62133 测试标准应用指南",
    titleEn: "IEC 62133 Testing Standard Application Guide",
    summary:
      "IEC 62133 便携式密封二次锂电池安全标准在 Neware 设备上的测试方法，包括连续低速率充电、温度循环、过充、强制放电等测试步骤在新威尔软件中的配置。",
    summaryEn:
      "IEC 62133 portable sealed secondary lithium battery safety standard applied to Neware equipment: continuous low-rate charge, thermal cycling, overcharge, forced discharge test configurations in Neware software.",
    category: "standards",
    tags: ["IEC 62133", "安全标准", "锂电池", "便携式"],
    tagsEn: ["IEC 62133", "safety standard", "lithium battery", "portable"],
    lastUpdated: "2020-01-01",
    difficulty: "advanced",
    readingTime: 18,
    relatedDocIds: ["un383", "ul1642"],
    software: "BTS8",
  },
  {
    id: "un383",
    slug: "un383-transport-guide",
    title: "UN 38.3 锂电池运输安全测试",
    titleEn: "UN 38.3 Lithium Battery Transport Safety Testing",
    summary:
      "UN 38.3 和 IEC 62281 是全球最常用的锂电池运输安全评估标准。介绍在新威尔设备上执行 UN 38.3 测试的方法。",
    summaryEn:
      "UN 38.3 and IEC 62281 are the world's most common standards for lithium battery transport safety assessment. Methods for running UN 38.3 tests on Neware equipment.",
    category: "standards",
    tags: ["UN 38.3", "运输安全", "锂电池", "IEC 62281"],
    tagsEn: ["UN 38.3", "transport safety", "lithium battery", "IEC 62281"],
    lastUpdated: "2020-01-01",
    difficulty: "advanced",
    readingTime: 15,
    relatedDocIds: ["iec-62133"],
    software: "BTS8",
  },
  {
    id: "ul1642",
    slug: "ul1642-guide",
    title: "UL 1642 锂电池安全标准应用",
    titleEn: "UL 1642 Lithium Battery Safety Standard Application",
    summary:
      "UL 1642 是锂电池安全标准，新威尔设备可执行其中部分测试项目。介绍如何在 BTS 软件中配置相关测试步骤。",
    summaryEn:
      "UL 1642 is the safety standard for lithium batteries. Neware equipment can perform some tests specified in UL 1642. How to configure test steps in BTS software.",
    category: "standards",
    tags: ["UL 1642", "安全标准", "锂电池"],
    tagsEn: ["UL 1642", "safety standard", "lithium battery"],
    lastUpdated: "2020-01-01",
    difficulty: "advanced",
    readingTime: 12,
    relatedDocIds: ["iec-62133", "un383"],
    software: "BTS8",
  },

  // ── Troubleshooting ────────────────────────────────────────────────
  {
    id: "bts8-troubleshooting",
    slug: "bts4000-connection-troubleshooting",
    title: "BTS4000 连接故障排查指南",
    titleEn: "BTS4000 Connection Troubleshooting Guide",
    summary:
      "当 BTS4000 与电脑连接失败时的完整排查流程，包括网络 IP 设置、中继机配置、软件识别不到设备、通道进入保护模式等常见问题的解决方案。",
    summaryEn:
      "Complete troubleshooting workflow for BTS4000 connection failures: network IP settings, middle machine configuration, software failing to detect device, channel entering protection mode.",
    category: "troubleshooting",
    tags: ["连接故障", "IP设置", "中继机", "保护模式", "排查"],
    tagsEn: ["connection failure", "IP settings", "middle machine", "protection mode", "troubleshooting"],
    lastUpdated: "2026-03-10",
    difficulty: "intermediate",
    readingTime: 15,
    relatedDocIds: ["bts4000-quickstart", "hardware-wiring"],
    software: "BTS8",
  },
  {
    id: "long-cycling-data",
    slug: "long-cycling-data-retrieval",
    title: "长时间循环测试后获取数据的方法",
    titleEn: "Retrieving Data After Long-Term Cycling Tests",
    summary:
      "经过长时间循环寿命测试后如何获取设备中的历史数据，包括 BTS8.0 批量备份功能的使用方法，支持按中继机、测试仪、单通道多层级选择备份范围。",
    summaryEn:
      "How to retrieve historical data after long-term cycling tests. BTS8.0 batch backup function supports multi-level selection: by middle machine, tester, or single channel.",
    category: "troubleshooting",
    tags: ["数据获取", "备份", "历史数据", "BTS8.0"],
    tagsEn: ["data retrieval", "backup", "historical data", "BTS8.0"],
    lastUpdated: "2021-07-17",
    difficulty: "intermediate",
    readingTime: 10,
    relatedDocIds: ["bts8-troubleshooting"],
    software: "BTS8",
  },

  // ── CE6000 ──────────────────────────────────────────────────────
  {
    id: "ce6000-guide",
    slug: "ce6000-complete-guide",
    title: "CE6000 完整使用指南",
    titleEn: "CE6000 Complete Operation Guide",
    summary:
      "新威尔官方 CE6000 系列能量回馈型电池模组和 PACK 测试系统的完整操作指南，包含设备特点、软件设置、测试步骤配置、数据分析方法。",
    summaryEn:
      "Neware official complete operation guide for CE6000 series energy feedback battery module and PACK testing system, covering features, software setup, test configuration, and data analysis.",
    category: "ce6000",
    tags: ["CE6000", "能量回馈", "PACK测试", "模组测试"],
    tagsEn: ["CE6000", "energy feedback", "PACK testing", "module testing"],
    lastUpdated: "2024-01-01",
    difficulty: "intermediate",
    readingTime: 20,
    software: "BTS8",
  },

  // ── IGBT ────────────────────────────────────────────────────────
  {
    id: "igbt-guide",
    slug: "igbt-high-power-guide",
    title: "IGBT 大功率电池 PACK 测试系统",
    titleEn: "IGBT High Power Battery PACK Testing System",
    summary:
      "IGBT 大功率系列是可再生（回馈型）测试系统，适用于高电压大电流电池 PACK 测试。2 通道可并联输出双倍电流。常见型号包括 60V1000A、100V500A、500V300A、600V400A 等。",
    summaryEn:
      "IGBT high power series are regenerative (feedback-type) testing systems for high voltage and current battery PACK testing. 2 channels can be paralleled for double current output. Common models: 60V1000A, 100V500A, 500V300A, 600V400A.",
    category: "igbt",
    tags: ["IGBT", "大功率", "回馈型", "PACK", "高电压"],
    tagsEn: ["IGBT", "high power", "regenerative", "PACK", "high voltage"],
    lastUpdated: "2024-01-01",
    difficulty: "intermediate",
    readingTime: 15,
    relatedDocIds: ["ce6000-guide"],
    software: "BTS8",
  },

  // ── Hardware ────────────────────────────────────────────────────
  {
    id: "hardware-wiring",
    slug: "hardware-connection-guide",
    title: "设备硬件接线指南",
    titleEn: "Hardware Connection Guide",
    summary:
      "新威尔电池测试系统的完整硬件接线说明，包括电脑与中继机（中控机）的 TCP/IP 连接、中继机与测试仪的 RS-485 连接、多台测试仪串联、电池夹具正确接线方法。",
    summaryEn:
      "Complete hardware wiring guide for Neware battery testing systems: PC to middle machine TCP/IP, middle machine to tester RS-485, multiple testers in series, battery fixture wiring.",
    category: "hardware",
    tags: ["接线", "硬件", "TCP/IP", "RS-485", "中继机"],
    tagsEn: ["wiring", "hardware", "TCP/IP", "RS-485", "middle machine"],
    lastUpdated: "2026-03-10",
    difficulty: "beginner",
    readingTime: 12,
    relatedDocIds: ["bts4000-quickstart", "bts8-troubleshooting"],
    software: "N/A",
  },
  {
    id: "chamber-integration",
    slug: "chamber-integration-guide",
    title: "环境试验箱与 BTS 连接指南",
    titleEn: "Environmental Chamber Integration Guide",
    summary:
      "新威尔环境试验箱（高低温箱）与 BTS4000 等测试系统的集成方法，实现温度与充放电联合测试。",
    summaryEn:
      "How to integrate Neware environmental test chambers (temperature chambers) with BTS4000 and other testing systems for combined thermal-electrical testing.",
    category: "hardware",
    tags: ["环境试验箱", "高低温箱", "温度测试", "集成"],
    tagsEn: ["environmental chamber", "temperature chamber", "thermal testing", "integration"],
    lastUpdated: "2020-01-01",
    difficulty: "intermediate",
    readingTime: 10,
    relatedDocIds: ["hardware-wiring", "bts4000-quickstart"],
    software: "BTS8",
  },
  {
    id: "cylindrical-holder",
    slug: "cylindrical-holder-guide",
    title: "圆柱电池夹具正确使用方法",
    titleEn: "Correct Cylindrical Battery Holder Usage",
    summary:
      "正确使用新威尔圆柱电池夹具的方法，包括极性匹配、接触良好、避免短路、安全操作规程。可适配 18650、21700 等标准圆柱电池。",
    summaryEn:
      "Correct usage of Neware cylindrical battery holders: polarity matching, good contact, short circuit prevention, safety procedures. Compatible with 18650, 21700 standard cylindrical batteries.",
    category: "hardware",
    tags: ["圆柱电池", "夹具", "18650", "21700", "安全"],
    tagsEn: ["cylindrical cell", "holder", "18650", "21700", "safety"],
    lastUpdated: "2020-01-01",
    difficulty: "beginner",
    readingTime: 5,
    relatedDocIds: ["hardware-wiring"],
    software: "N/A",
  },

  // ── BTS8 Data Management ──────────────────────────────────────────
  {
    id: "bts8-data-export",
    slug: "bts8-data-export-guide",
    title: "BTS8.0 数据导出与文件管理",
    titleEn: "BTS8.0 Data Export and File Management",
    summary:
      "BTS8.0 软件中如何导出测试数据为 Excel 格式、NDA 格式，以及如何压缩测试数据文件以节省存储空间。BTS8.0 支持导出 .xls、.txt、.nda 等多种格式。",
    summaryEn:
      "How to export test data in BTS8.0 to Excel, NDA formats, and how to compress test data files to save storage. BTS8.0 supports .xls, .txt, .nda formats.",
    category: "btsda",
    tags: ["数据导出", "Excel", "NDA", "文件管理", "压缩"],
    tagsEn: ["data export", "Excel", "NDA", "file management", "compression"],
    lastUpdated: "2021-07-17",
    difficulty: "beginner",
    readingTime: 8,
    relatedDocIds: ["long-cycling-data", "btsda-customize-curves"],
    software: "BTS8",
  },
];

// ── Utility functions ──────────────────────────────────────────────

export function getDocumentsByCategory(
  categorySlug: CategorySlug
): Document[] {
  return documents.filter((doc) => doc.category === categorySlug);
}

export function getDocumentById(id: string): Document | undefined {
  return documents.find((doc) => doc.id === id);
}

export function getCategoryBySlug(
  slug: CategorySlug
): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function searchDocuments(query: string): Document[] {
  const q = query.toLowerCase();
  return documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(q) ||
      doc.titleEn.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q) ||
      doc.summaryEn.toLowerCase().includes(q) ||
      doc.tags.some((t) => t.toLowerCase().includes(q)) ||
      doc.tagsEn.some((t) => t.toLowerCase().includes(q))
  );
}

export function getDocumentsBySoftware(
  software: Document["software"]
): Document[] {
  return documents.filter((doc) => doc.software === software);
}
