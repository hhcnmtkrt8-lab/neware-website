export type DownloadItem = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: "software" | "manual" | "catalog" | "certificate";
  version?: string;
  size: string;
  fileType: "ZIP" | "PDF" | "EXE";
  // 使用外部 URL（占位数据，后续替换为真实文件）
  url: string;
  lastUpdated: string;
};

export type DownloadCategory = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  items: DownloadItem[];
};

export const downloadCategories: DownloadCategory[] = [
  {
    id: "software",
    name: "软件",
    nameEn: "Software",
    description: "BTS 电池测试系统控制软件",
    descriptionEn: "BTS Battery Testing System Control Software",
    icon: "Monitor",
    items: [
      {
        id: "bts9",
        name: "BTS-9.0 软件包",
        nameEn: "BTS-9.0 Software Package",
        description: "最新版本电池测试控制软件，支持 CT-9000、CT-4000 系列。含安装程序、驱动和用户手册。",
        descriptionEn:
          "Latest battery testing control software for CT-9000 and CT-4000 series. Includes installer, drivers, and user guide.",
        category: "software",
        version: "9.0.2024.10",
        size: "1.2 GB",
        fileType: "ZIP",
        url: "https://www.neware.com.cn/downloads/bts9.zip",
        lastUpdated: "2024-10-15",
      },
      {
        id: "bts8",
        name: "BTS-8.0 软件包",
        nameEn: "BTS-8.0 Software Package",
        description: "经典版软件，支持 BTS-3000、CT-4000 系列。稳定可靠，适合产线使用。",
        descriptionEn:
          "Classic software for BTS-3000 and CT-4000 series. Stable and reliable, ideal for production lines.",
        category: "software",
        version: "8.0.2023.06",
        size: "850 MB",
        fileType: "ZIP",
        url: "https://www.neware.com.cn/downloads/bts8.zip",
        lastUpdated: "2023-06-20",
      },
      {
        id: "bts7",
        name: "BTS-7.0 软件包",
        nameEn: "BTS-7.0 Software Package",
        description: "BTS-3000 经典款配套软件，界面简洁，适合教学和基础测试。",
        descriptionEn:
          "Classic BTS-3000 companion software. Simple interface, suitable for education and basic testing.",
        category: "software",
        version: "7.2.2019.03",
        size: "420 MB",
        fileType: "ZIP",
        url: "https://www.neware.com.cn/downloads/bts7.zip",
        lastUpdated: "2019-03-10",
      },
      {
        id: "lims",
        name: "LIMS 客户端",
        nameEn: "LIMS Client Software",
        description: "LIMS 智慧实验室管理系统客户端，含服务端和客户端安装包。",
        descriptionEn:
          "LIMS Smart Lab Management System client. Includes server and client installers.",
        category: "software",
        version: "3.1.2024.01",
        size: "680 MB",
        fileType: "ZIP",
        url: "https://www.neware.com.cn/downloads/lims.zip",
        lastUpdated: "2024-01-08",
      },
    ],
  },
  {
    id: "manuals",
    name: "产品手册",
    nameEn: "Product Manuals",
    description: "各系列产品的详细技术手册和操作指南",
    descriptionEn: "Detailed technical manuals and operation guides for all product series",
    icon: "BookOpen",
    items: [
      {
        id: "manual-ct9000",
        name: "CT-9000 系列操作手册",
        nameEn: "CT-9000 Series Operation Manual",
        description: "CT-9000 高端旗舰系列完整操作手册，含硬件介绍、软件操作、数据分析和故障排除。",
        descriptionEn:
          "Complete operation manual for CT-9000 flagship series. Covers hardware, software, data analysis, and troubleshooting.",
        category: "manual",
        size: "25 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/manual-ct9000.pdf",
        lastUpdated: "2024-08-01",
      },
      {
        id: "manual-ct4000",
        name: "CT-4000 系列操作手册",
        nameEn: "CT-4000 Series Operation Manual",
        description: "CT-4000 经典款系列完整操作手册，适合现场工程师和维护人员。",
        descriptionEn:
          "Complete operation manual for CT-4000 classic series. Suitable for field engineers and maintenance staff.",
        category: "manual",
        size: "22 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/manual-ct4000.pdf",
        lastUpdated: "2024-05-15",
      },
      {
        id: "manual-ce6000",
        name: "CE-6000 IGBT 系列操作手册",
        nameEn: "CE-6000 / IGBT Series Operation Manual",
        description: "CE-6000 能量回馈型测试系统操作手册，含能量回收配置和安全说明。",
        descriptionEn:
          "CE-6000 energy feedback cycler operation manual. Includes energy recovery configuration and safety instructions.",
        category: "manual",
        size: "18 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/manual-ce6000.pdf",
        lastUpdated: "2024-03-20",
      },
      {
        id: "manual-bts8000",
        name: "CTE-8000 系列操作手册",
        nameEn: "CTE-8000 Series Operation Manual",
        description: "CTE-8000 驱动仿真测试系统操作手册，含工况模拟配置和 UDDS/ECUDrive 使用指南。",
        descriptionEn:
          "CTE-8000 driving simulation testing system manual. Includes drive cycle profile configuration guide.",
        category: "manual",
        size: "20 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/manual-cte8000.pdf",
        lastUpdated: "2024-02-10",
      },
      {
        id: "manual-chamber",
        name: "环境试验箱操作手册",
        nameEn: "Environmental Chamber Operation Manual",
        description: "高低温试验箱完整操作手册，含温度控制编程和与测试系统联动配置。",
        descriptionEn:
          "High/low temperature chamber complete manual. Includes temperature programming and cycler integration guide.",
        category: "manual",
        size: "15 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/manual-chamber.pdf",
        lastUpdated: "2023-11-05",
      },
    ],
  },
  {
    id: "catalogs",
    name: "产品目录",
    nameEn: "Product Catalogs",
    description: "产品综合目录和技术规格表",
    descriptionEn: "Comprehensive product catalogs and technical specification sheets",
    icon: "FileText",
    items: [
      {
        id: "catalog-full",
        name: "NEWARE 综合产品目录 2024",
        nameEn: "NEWARE Full Product Catalog 2024",
        description:
          "涵盖所有产品系列的完整目录，含详细技术参数、选型指南和应用案例。",
        descriptionEn:
          "Complete catalog covering all product series with detailed specs, selection guide, and application cases.",
        category: "catalog",
        size: "45 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/catalog-2024.pdf",
        lastUpdated: "2024-09-01",
      },
      {
        id: "catalog-ct9000",
        name: "CT-9000 系列专用目录",
        nameEn: "CT-9000 Series Product Sheet",
        description: "CT-9000 高端旗舰系列单页，含核心技术指标和选型表。",
        descriptionEn:
          "CT-9000 flagship series single-sheet. Key technical specs and model selection table.",
        category: "catalog",
        size: "5 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/catalog-ct9000.pdf",
        lastUpdated: "2024-08-15",
      },
      {
        id: "catalog-ev",
        name: "EV 电池测试解决方案册",
        nameEn: "EV Battery Testing Solutions Brochure",
        description: "针对电动汽车电池制造商的完整测试解决方案，含产线集成方案和案例。",
        descriptionEn:
          "Complete testing solution brochure for EV battery manufacturers. Includes production line integration and case studies.",
        category: "catalog",
        size: "12 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/catalog-ev.pdf",
        lastUpdated: "2024-07-20",
      },
    ],
  },
  {
    id: "certificates",
    name: "资质证书",
    nameEn: "Certificates",
    description: "ISO、CE 等国际认证证书",
    descriptionEn: "ISO, CE and other international certification documents",
    icon: "Award",
    items: [
      {
        id: "cert-iso9001",
        name: "ISO9001:2015 质量管理体系认证",
        nameEn: "ISO9001:2015 Quality Management System Certificate",
        description: "ISO9001:2015 质量管理体系认证证书（英文版）。",
        descriptionEn: "ISO9001:2015 Quality Management System Certificate (English).",
        category: "certificate",
        size: "2 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/cert-iso9001.pdf",
        lastUpdated: "2024-01-01",
      },
      {
        id: "cert-ce",
        name: "CE 认证证书",
        nameEn: "CE Certification",
        description: "CE 认证证书，证明产品符合欧盟安全、健康和环境保护要求。",
        descriptionEn:
          "CE certification proving product compliance with EU safety, health, and environmental requirements.",
        category: "certificate",
        size: "3 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/cert-ce.pdf",
        lastUpdated: "2023-12-01",
      },
      {
        id: "cert-hightech",
        name: "国家高新技术企业证书",
        nameEn: "National High-Tech Enterprise Certificate",
        description: "国家高新技术企业认定证书。",
        descriptionEn: "National High-Tech Enterprise certification issued by Chinese government.",
        category: "certificate",
        size: "1.5 MB",
        fileType: "PDF",
        url: "https://www.neware.com.cn/downloads/cert-hightech.pdf",
        lastUpdated: "2023-10-01",
      },
    ],
  },
];
