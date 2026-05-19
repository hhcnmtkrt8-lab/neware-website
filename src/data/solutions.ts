export interface Solution {
  id: string;
  title: { zh: string; en: string };
  desc: { zh: string; en: string };
  features: { zh: string[]; en: string[] };
  products: { zh: string; en: string };
  productLinks: { zh: string[]; en: string[] };
}

export const solutionsData: Solution[] = [
  {
    id: "rd",
    title: { zh: "研发与实验室", en: "Research & Development Labs" },
    desc: {
      zh: "新威尔为高校实验室、科研机构和电池材料研发企业提供高精度的测试设备，支持扣式电芯到软包电芯的全品类测试需求。CT-9000系列0.02%精度和1000Hz采样率为前沿研究提供可靠数据支持。",
      en: "Neware provides high-precision testing equipment for university labs, research institutions, and battery material R&D companies. The CT-9000 series with 0.02% accuracy and 1000Hz sampling provides reliable data for cutting-edge research.",
    },
    features: {
      zh: ["0.02% FS 高精度测量", "1000Hz 高速采样", "支持多量程自动切换", "BTS9.0 专业分析软件", "温控箱集成支持", "DCIR / 脉冲测试"],
      en: ["0.02% FS High Precision", "1000Hz High-Speed Sampling", "Multi-range Auto-switching", "BTS9.0 Professional Analysis Software", "Thermal Chamber Integration", "DCIR / Pulse Testing"],
    },
    products: { zh: "推荐产品", en: "Recommended Products" },
    productLinks: {
      zh: ["CT-9000 系列", "CT-4000 系列 (高精度版)"],
      en: ["CT-9000 Series", "CT-4000 Series (High Precision)"],
    },
  },
  {
    id: "mfg",
    title: { zh: "动力电池制造", en: "EV Battery Manufacturing" },
    desc: {
      zh: "新威尔的化成分容系统和产线测试设备帮助动力电池制造商实现高效、精准的电芯分选和质量控制。支持方型、软包、圆柱电芯全品类，支持产线自动化集成。",
      en: "Neware's formation & grading systems and production line testing equipment help EV battery manufacturers achieve efficient and precise cell sorting and quality control.",
    },
    features: {
      zh: ["自动化产线集成", "电芯化成分容", "高效通道扩展", "能量回馈节能", "MES/ERP 对接", "数据全程可追溯"],
      en: ["Automated Production Line Integration", "Cell Formation & Grading", "Efficient Channel Expansion", "Energy Recovery & Saving", "MES/ERP Integration", "Full Data Traceability"],
    },
    products: { zh: "推荐产品", en: "Recommended Products" },
    productLinks: {
      zh: ["化成分容系统", "CT-4000 系列", "CE-6000 系列"],
      en: ["Formation & Grading Systems", "CT-4000 Series", "CE-6000 Series"],
    },
  },
  {
    id: "ev",
    title: { zh: "电动汽车电池测试", en: "Electric Vehicle Battery Testing" },
    desc: {
      zh: "新威尔为电动汽车制造商提供全面的电池测试解决方案，覆盖从电芯到电池包的全流程测试，支持UDDS/ECUDrive等工况仿真，支持大功率充放电测试。",
      en: "Neware provides comprehensive battery testing solutions for EV manufacturers, covering cell-to-pack testing with drive cycle simulation and high-power cycling support.",
    },
    features: {
      zh: ["驾驶循环仿真", "电池包大功率测试", "热管理测试", "寿命预测分析", "能量回馈系统", "多通道并行测试"],
      en: ["Drive Cycle Simulation", "Battery Pack High-Power Testing", "Thermal Management Testing", "Lifetime Prediction Analysis", "Energy Feedback System", "Multi-channel Parallel Testing"],
    },
    products: { zh: "推荐产品", en: "Recommended Products" },
    productLinks: {
      zh: ["CT-8000 系列", "CE-6000 系列", "CT-4000 高电流版"],
      en: ["CT-8000 Series", "CE-6000 Series", "CT-4000 High Current"],
    },
  },
  {
    id: "ess",
    title: { zh: "储能系统", en: "Energy Storage Systems" },
    desc: {
      zh: "新威尔为大中小型储能系统提供全面的测试解决方案，支持电网级储能、家庭储能和工商业储能的电池测试需求，设备稳定性高，适合长期运行测试。",
      en: "Neware provides comprehensive testing solutions for energy storage systems of all sizes, supporting grid-scale, residential, and commercial ESS battery testing needs.",
    },
    features: {
      zh: ["长周期循环测试", "电网模拟接口", "高效率能量回收", "多类型电池支持", "远程监控管理", "大数据分析"],
      en: ["Long-cycle Testing", "Grid Simulation Interface", "High-Efficiency Energy Recovery", "Multi-type Battery Support", "Remote Monitoring & Management", "Big Data Analysis"],
    },
    products: { zh: "推荐产品", en: "Recommended Products" },
    productLinks: {
      zh: ["CE-6000 系列", "CT-4000 系列", "环境试验箱"],
      en: ["CE-6000 Series", "CT-4000 Series", "Environmental Test Chambers"],
    },
  },
];
