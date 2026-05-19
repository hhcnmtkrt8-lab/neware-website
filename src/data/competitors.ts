export interface CompetitorFlag {
  value: string;
  numeric: number;
  unit: string;
  winner: boolean;
}

export interface Competitor {
  id: string;
  name: string;
  website: string;
  founded: number;
  headquarters: string;
  tagline: string;
  flags: {
    accuracy: CompetitorFlag;
    samplingRate: CompetitorFlag;
    energyRecovery: CompetitorFlag;
    channels: CompetitorFlag;
    voltage: CompetitorFlag;
    current: CompetitorFlag;
    productSeries: CompetitorFlag;
    countries: CompetitorFlag;
    customers: CompetitorFlag;
    softwareFree: CompetitorFlag;
    dataMigration: CompetitorFlag;
    support: CompetitorFlag;
    warranty: CompetitorFlag;
    priceRange: CompetitorFlag;
  };
  pros: string[];
  cons: string[];
  certifications: string[];
  logo: string;
}

export const competitors: Competitor[] = [
  {
    id: "neware",
    name: "NEWARE",
    website: "https://www.neware.com.cn",
    founded: 1998,
    headquarters: "Shenzhen, China",
    tagline: "Precision Battery Testing Equipment Manufacturer",
    flags: {
      accuracy: { value: "0.02% FS", numeric: 0.02, unit: "% FS", winner: true },
      samplingRate: { value: "1000Hz", numeric: 1000, unit: "Hz", winner: true },
      energyRecovery: { value: "70%+", numeric: 70, unit: "%", winner: true },
      channels: { value: "Up to 96CH", numeric: 96, unit: "CH", winner: false },
      voltage: { value: "Up to 1000V", numeric: 1000, unit: "V", winner: false },
      current: { value: "Up to 3000A", numeric: 3000, unit: "A", winner: false },
      productSeries: { value: "8 series", numeric: 8, unit: "", winner: true },
      countries: { value: "150+", numeric: 150, unit: "", winner: true },
      customers: { value: "32,000+", numeric: 32000, unit: "", winner: true },
      softwareFree: { value: "Lifetime Free", numeric: 1, unit: "", winner: true },
      dataMigration: { value: "Free Support", numeric: 1, unit: "", winner: true },
      support: { value: "7×24h", numeric: 24, unit: "h", winner: true },
      warranty: { value: "12 months", numeric: 12, unit: "mo", winner: false },
      priceRange: { value: "$$", numeric: 2, unit: "", winner: false },
    },
    pros: ["Highest accuracy in class", "Free lifetime software upgrades", "7×24h global support", "Free data migration from competitors"],
    cons: ["Premium pricing", "Complex for beginners"],
    certifications: ["ISO9001", "CE", "UL"],
    logo: "/images/competitors/neware-logo.svg",
  },
  {
    id: "arbin",
    name: "Arbin Instruments",
    website: "https://www.arbin.com",
    founded: 1997,
    headquarters: "College Station, Texas, USA",
    tagline: "Electrochemical Test Equipment",
    flags: {
      accuracy: { value: "0.05% FS", numeric: 0.05, unit: "% FS", winner: false },
      samplingRate: { value: "10Hz", numeric: 10, unit: "Hz", winner: false },
      energyRecovery: { value: "Not supported", numeric: 0, unit: "", winner: false },
      channels: { value: "Up to 64CH", numeric: 64, unit: "CH", winner: false },
      voltage: { value: "Up to 500V", numeric: 500, unit: "V", winner: false },
      current: { value: "Up to 500A", numeric: 500, unit: "A", winner: false },
      productSeries: { value: "3 series", numeric: 3, unit: "", winner: false },
      countries: { value: "40+", numeric: 40, unit: "", winner: false },
      customers: { value: "5,000+", numeric: 5000, unit: "", winner: false },
      softwareFree: { value: "Annual license fee", numeric: 0, unit: "", winner: false },
      dataMigration: { value: "Not available", numeric: 0, unit: "", winner: false },
      support: { value: "Business hours", numeric: 8, unit: "h", winner: false },
      warranty: { value: "12 months", numeric: 12, unit: "mo", winner: false },
      priceRange: { value: "$$$", numeric: 3, unit: "", winner: false },
    },
    pros: ["US-based company", "Established reputation in US market", "Good for academic research"],
    cons: ["Low sampling rate", "No energy recovery", "Annual software license fees", "Limited global support"],
    certifications: ["ISO9001"],
    logo: "/images/competitors/arbin-logo.png",
  },
  {
    id: "maccor",
    name: "Maccor Technologies",
    website: "https://www.maccor.com",
    founded: 1986,
    headquarters: "Tulsa, Oklahoma, USA",
    tagline: "Battery Test Equipment Since 1986",
    flags: {
      accuracy: { value: "0.05% FS", numeric: 0.05, unit: "% FS", winner: false },
      samplingRate: { value: "10Hz", numeric: 10, unit: "Hz", winner: false },
      energyRecovery: { value: "Limited", numeric: 20, unit: "%", winner: false },
      channels: { value: "Up to 48CH", numeric: 48, unit: "CH", winner: false },
      voltage: { value: "Up to 600V", numeric: 600, unit: "V", winner: false },
      current: { value: "Up to 300A", numeric: 300, unit: "A", winner: false },
      productSeries: { value: "4 series", numeric: 4, unit: "", winner: false },
      countries: { value: "30+", numeric: 30, unit: "", winner: false },
      customers: { value: "3,000+", numeric: 3000, unit: "", winner: false },
      softwareFree: { value: "Included", numeric: 1, unit: "", winner: false },
      dataMigration: { value: "Not available", numeric: 0, unit: "", winner: false },
      support: { value: "Business hours", numeric: 8, unit: "h", winner: false },
      warranty: { value: "12 months", numeric: 12, unit: "mo", winner: false },
      priceRange: { value: "$$$", numeric: 3, unit: "", winner: false },
    },
    pros: ["Longest history in the industry", "Strong US academic market presence", "Rugged hardware design"],
    cons: ["Outdated software UI", "Very low sampling rate", "Limited international support", "Expensive maintenance"],
    certifications: ["ISO9001"],
    logo: "/images/competitors/maccor-logo.png",
  },
  {
    id: "biologic",
    name: "Bio-Logic Science Instruments",
    website: "https://www.biologicscience.com",
    founded: 1991,
    headquarters: "Seyssinet-Pariset, France",
    tagline: "Electrochemical Research Instruments",
    flags: {
      accuracy: { value: "0.02% FS", numeric: 0.02, unit: "% FS", winner: true },
      samplingRate: { value: "10Hz", numeric: 10, unit: "Hz", winner: false },
      energyRecovery: { value: "Not supported", numeric: 0, unit: "", winner: false },
      channels: { value: "Up to 16CH", numeric: 16, unit: "CH", winner: false },
      voltage: { value: "Up to 15V", numeric: 15, unit: "V", winner: false },
      current: { value: "Up to 80A", numeric: 80, unit: "A", winner: false },
      productSeries: { value: "5 series", numeric: 5, unit: "", winner: false },
      countries: { value: "50+", numeric: 50, unit: "", winner: false },
      customers: { value: "8,000+", numeric: 8000, unit: "", winner: false },
      softwareFree: { value: "Included", numeric: 1, unit: "", winner: false },
      dataMigration: { value: "Limited", numeric: 0, unit: "", winner: false },
      support: { value: "Business hours", numeric: 8, unit: "h", winner: false },
      warranty: { value: "12 months", numeric: 12, unit: "mo", winner: false },
      priceRange: { value: "$$$$", numeric: 4, unit: "", winner: false },
    },
    pros: ["Excellent for low-voltage research applications", "Strong in European academic market", "EC-Lab software is comprehensive"],
    cons: ["Very limited current/voltage range", "Not suitable for EV/power battery testing", "Small channel count", "High cost per channel"],
    certifications: ["ISO9001", "CE"],
    logo: "/images/competitors/biologic-logo.png",
  },
];

export const comparisonMetrics = [
  { key: "accuracy", labelKey: "metricAccuracy" as const },
  { key: "samplingRate", labelKey: "metricSamplingRate" as const },
  { key: "energyRecovery", labelKey: "metricEnergyRecovery" as const },
  { key: "channels", labelKey: "metricChannels" as const },
  { key: "voltage", labelKey: "metricVoltage" as const },
  { key: "current", labelKey: "metricCurrent" as const },
  { key: "productSeries", labelKey: "metricProductSeries" as const },
  { key: "countries", labelKey: "metricCountries" as const },
  { key: "customers", labelKey: "metricCustomers" as const },
  { key: "softwareFree", labelKey: "metricSoftware" as const },
  { key: "dataMigration", labelKey: "metricMigration" as const },
  { key: "support", labelKey: "metricSupport" as const },
  { key: "warranty", labelKey: "metricWarranty" as const },
  { key: "priceRange", labelKey: "metricPrice" as const },
] as const;
