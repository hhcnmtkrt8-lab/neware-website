"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ArrowRight, Zap, Battery, Cpu, Settings } from "lucide-react";

interface GlossaryTerm {
  id: string;
  term: string;
  termZh: string;
  termVi: string;
  definition: string;
  definitionZh: string;
  definitionVi: string;
  category: "general" | "testing" | "equipment" | "battery";
  relatedProducts?: string[];
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    id: "accuracy",
    term: "Accuracy",
    termZh: "精度",
    termVi: "Độ chính xác",
    definition: "The degree to which a measurement conforms to the true value. NEWARE battery testers achieve accuracy levels of up to 0.01% FS (Full Scale), ensuring precise battery characterization data.",
    definitionZh: "测量值与真实值相符的程度。NEWARE电池测试仪达到0.01% FS（满量程）的精度水平，确保精确的电池特性数据。",
    definitionVi: "Mức độ mà một phép đo phù hợp với giá trị thực. Thiết bị kiểm tra pin NEWARE đạt mức độ chính xác lên đến 0.01% FS (Thang đo đầy đủ), đảm bảo dữ liệu đặc tính pin chính xác.",
    category: "testing",
    relatedProducts: ["BTS9000", "CT-4000"],
    relatedTerms: ["Full Scale", "Sampling Rate"],
  },
  {
    id: "cccv",
    term: "CCCV (Constant Current Constant Voltage)",
    termZh: "恒流恒压 (CCCV)",
    termVi: "Dòng không đổi Điện áp không đổi",
    definition: "A charging method that first applies constant current until the battery reaches a target voltage, then maintains constant voltage while the current decreases. This is the most common lithium-ion charging protocol.",
    definitionZh: "一种充电方法，首先施加恒定电流直到电池达到目标电压，然后保持恒定电压同时电流下降。这是最常见的锂离子充电协议。",
    definitionVi: "Phương pháp sạc đầu tiên áp dụng dòng không đổi cho đến khi pin đạt điện áp mục tiêu, sau đó duy trì điện áp không đổi trong khi dòng giảm. Đây là giao thức sạc lithium-ion phổ biến nhất.",
    category: "testing",
    relatedProducts: ["CT-4000", "CE-6000"],
    relatedTerms: ["C-Rate", "Cycle Life"],
  },
  {
    id: "channel",
    term: "Channel",
    termZh: "通道",
    termVi: "Kênh",
    definition: "An independent testing unit within a battery cycler that can control one battery cell or module. Each channel has its own voltage and current control, allowing parallel testing of multiple samples.",
    definitionZh: "电池充放电测试仪内的一个独立测试单元，可以控制一个电池单体或模组。每个通道都有独立的电压和电流控制，允许并行测试多个样品。",
    definitionVi: "Một đơn vị thử nghiệm độc lập trong thiết bị kiểm tra pin có thể điều khiển một ô pin hoặc module. Mỗi kênh có điều khiển điện áp và dòng riêng, cho phép thử nghiệm song song nhiều mẫu.",
    category: "equipment",
    relatedProducts: ["CT-4000", "CT-9000"],
    relatedTerms: ["Full Scale"],
  },
  {
    id: "c-rate",
    term: "C-Rate",
    termZh: "C倍率",
    termVi: "Tốc độ C",
    definition: "A measure of the rate at which a battery is charged or discharged relative to its capacity. 1C means the battery charges/discharges in 1 hour; 2C means 30 minutes. Higher C-rates generate more heat and stress.",
    definitionZh: "衡量电池相对于其容量充电或放电速率的指标。1C表示电池在1小时内充电/放电；2C表示30分钟。更高的C倍率会产生更多热量和压力。",
    definitionVi: "Thước đo tốc độ sạc hoặc xả của pin so với dung lượng của nó. 1C có nghĩa là pin sạc/xả trong 1 giờ; 2C có nghĩa là 30 phút. Tốc độ C cao hơn tạo ra nhiều nhiệt hơn và gây stress.",
    category: "testing",
    relatedTerms: ["CCCV", "Cycle Life"],
  },
  {
    id: "cycle-life",
    term: "Cycle Life",
    termZh: "循环寿命",
    termVi: "Tuổi thọ chu kỳ",
    definition: "The number of complete charge-discharge cycles a battery can undergo before its capacity falls below a specified level (typically 80% of original capacity). Critical for EV and energy storage applications.",
    definitionZh: "电池在容量降至规定水平（通常为原始容量的80%）之前可以完成的完整充放电循环次数。对EV和储能应用至关重要。",
    definitionVi: "Số chu kỳ sạc-xả đầy đủ mà pin có thể trải qua trước khi dung lượng giảm xuống dưới mức quy định (thường là 80% dung lượng ban đầu). Quan trọng cho các ứng dụng EV và lưu trữ năng lượng.",
    category: "testing",
    relatedTerms: ["C-Rate", "SOC", "HPPC"],
  },
  {
    id: "dcir",
    term: "DCIR (Direct Current Internal Resistance)",
    termZh: "直流内阻 (DCIR)",
    termVi: "Điện trở nội một chiều",
    definition: "The opposition to current flow within a battery when direct current is applied. DCIR = ΔV/ΔI during a current pulse. Key indicator of battery health, power capability, and remaining useful life.",
    definitionZh: "施加直流电时电池内部对电流流动的阻碍。DCIR = 脉冲期间的 ΔV/ΔI。电池健康状况、功率能力和剩余使用寿命的关键指标。",
    definitionVi: "Sự cản trở dòng điện trong pin khi áp dụng dòng một chiều. DCIR = ΔV/ΔI trong xung dòng. Chỉ số quan trọng về tình trạng pin, công suất và tuổi thọ còn lại.",
    category: "testing",
    relatedProducts: ["BTS9000", "CT-4000"],
    relatedTerms: ["Internal Resistance", "HPPC", "Pulse Test"],
  },
  {
    id: "energy-recovery",
    term: "Energy Recovery",
    termZh: "能量回收",
    termVi: "Thu hồi năng lượng",
    definition: "Technology that captures and returns discharge energy back to the power grid rather than dissipating it as heat. NEWARE's CE-6000 series features up to 70% energy recovery efficiency, significantly reducing operational costs.",
    definitionZh: "将放电能量捕获并返回电网而非作为热量散发的技术。NEWARE的CE-6000系列具有高达70%的能量回收效率，显著降低运营成本。",
    definitionVi: "Công nghệ thu hồi và hoàn trả năng lượng xả về lưới điện thay vì tiêu tán thành nhiệt. Dòng CE-6000 của NEWARE có hiệu suất thu hồi năng lượng lên đến 70%, giảm đáng kể chi phí vận hành.",
    category: "equipment",
    relatedProducts: ["CE-6000"],
    relatedTerms: ["Grid-tied", "Power Factor"],
  },
  {
    id: "formation",
    term: "Formation",
    termZh: "成型",
    termVi: "Tạo hình",
    definition: "The initial charging process for newly manufactured lithium-ion cells that forms the stable SEI layer and activates the battery. NEWARE offers dedicated formation systems with precision cycling protocols.",
    definitionZh: "新制造的锂离子电芯的初始充电过程，形成稳定的SEI层并激活电池。NEWARE提供配备精密循环协议的专用成型系统。",
    definitionVi: "Quá trình sạc ban đầu cho các tế bào lithium-ion mới sản xuất để tạo lớp SEI ổn định và kích hoạt pin. NEWARE cung cấp các hệ thống tạo hình chuyên dụng với các giao thức lặp chính xác.",
    category: "testing",
    relatedProducts: ["CT-8000", "CE-6000"],
    relatedTerms: ["SEI Layer", "CCCV", "Cycle Life"],
  },
  {
    id: "full-scale",
    term: "Full Scale (FS)",
    termZh: "满量程 (FS)",
    termVi: "Thang đo đầy đủ (FS)",
    definition: "The maximum measurement range of an instrument. Accuracy specifications like 0.05% FS are expressed as a percentage of the full scale range, meaning the error is relative to the maximum range, not the measured value.",
    definitionZh: "仪器的最大测量范围。0.05% FS等精度规格表示为满量程范围的百分比，意味着误差是相对于最大范围而非测量值的。",
    definitionVi: "Phạm vi đo tối đa của thiết bị. Các thông số độ chính xác như 0.05% FS được biểu thị dưới dạng phần trăm của phạm vi thang đo đầy đủ, nghĩa là sai số được tính tương đối so với phạm vi tối đa.",
    category: "equipment",
    relatedProducts: ["BTS9000"],
    relatedTerms: ["Accuracy", "Channel"],
  },
  {
    id: "gigafactory",
    term: "Gigafactory",
    termZh: "超级工厂",
    termVi: "Nhà máy gigafactory",
    definition: "Large-scale battery manufacturing facility, typically producing more than 10 GWh of battery capacity per year. These facilities require extensive battery testing infrastructure for quality control.",
    definitionZh: "大型电池制造设施，通常每年生产超过10 GWh的电池容量。这些设施需要大量的电池测试基础设施来进行质量控制。",
    definitionVi: "Cơ sở sản xuất pin quy mô lớn, thường sản xuất hơn 10 GWh dung lượng pin mỗi năm. Các cơ sở này yêu cầu cơ sở hạ tầng thử nghiệm pin mở rộng để kiểm soát chất lượng.",
    category: "general",
    relatedProducts: ["CT-8000", "CE-6000"],
    relatedTerms: ["Formation", "Cycle Life"],
  },
  {
    id: "grid-tied",
    term: "Grid-tied",
    termZh: "并网",
    termVi: "Kết nối lưới",
    definition: "A power system connection where battery testing equipment feeds excess energy back to the electrical grid. Enables energy recovery and reduces grid load during large-scale battery testing.",
    definitionZh: "电池测试设备将多余能量反馈回电网的电力系统连接。实现能量回收并减少大规模电池测试期间的电网负荷。",
    definitionVi: "Kết nối hệ thống điện nơi thiết bị kiểm tra pin cấp năng lượng dư trở lại lưới điện. Cho phép thu hồi năng lượng và giảm tải lưới trong quá trình thử nghiệm pin quy mô lớn.",
    category: "equipment",
    relatedProducts: ["CE-6000"],
    relatedTerms: ["Energy Recovery", "Power Factor"],
  },
  {
    id: "hppe",
    term: "HPPC (Hybrid Pulse Power Characterization)",
    termZh: "脉冲功率特性 (HPPC)",
    termVi: "Đặc tính công suất xung",
    definition: "A standardized test protocol (from PNGV) that measures battery power capability at various states of charge. Involves 10-second discharge pulses and 40-second rest periods to determine DC resistance.",
    definitionZh: "一种标准化测试协议（来自PNGV），用于测量电池在不同荷电状态下的功率能力。包括10秒放电脉冲和40秒静置期以确定直流电阻。",
    definitionVi: "Giao thức thử nghiệm tiêu chuẩn (từ PNGV) đo khả năng công suất của pin ở các trạng thái sạc khác nhau. Bao gồm các xung xả 10 giây và thời gian nghỉ 40 giây để xác định điện trở một chiều.",
    category: "testing",
    relatedTerms: ["DCIR", "SOC", "Pulse Test"],
  },
  {
    id: "igbt",
    term: "IGBT (Insulated Gate Bipolar Transistor)",
    termZh: "绝缘栅双极晶体管 (IGBT)",
    termVi: "Transistor lưỡng cực cổng cách ly",
    definition: "A semiconductor switch used in high-power battery testing equipment. IGBTs enable efficient power conversion and bidirectional current flow, essential for energy recovery systems.",
    definitionZh: "用于大功率电池测试设备的半导体开关。IGBT实现高效电力转换和双向电流流动，对能量回收系统至关重要。",
    definitionVi: "Một công tắc bán dẫn được sử dụng trong thiết bị kiểm tra pin công suất cao. IGBT cho phép chuyển đổi công suất hiệu quả và dòng điện hai chiều, cần thiết cho các hệ thống thu hồi năng lượng.",
    category: "equipment",
    relatedProducts: ["CE-6000"],
    relatedTerms: ["Energy Recovery", "Power Factor"],
  },
  {
    id: "internal-resistance",
    term: "Internal Resistance",
    termZh: "内阻",
    termVi: "Điện trở nội",
    definition: "The total opposition to current flow within a battery, consisting of ohmic resistance and polarization resistance. Increases with battery aging and directly affects efficiency and heat generation.",
    definitionZh: "电池内部对电流流动的总阻碍，由欧姆电阻和极化电阻组成。随电池老化而增加，直接影响效率和热量产生。",
    definitionVi: "Tổng sự cản trở dòng điện trong pin, bao gồm điện trở ohm và điện trở phân cực. Tăng theo tuổi thọ pin và ảnh hưởng trực tiếp đến hiệu suất và sinh nhiệt.",
    category: "battery",
    relatedTerms: ["DCIR", "Pulse Test", "HPPC"],
  },
  {
    id: "ocv",
    term: "OCV (Open Circuit Voltage)",
    termZh: "开路电压 (OCV)",
    termVi: "Điện áp hở mạch",
    definition: "The voltage across a battery's terminals when no external load is connected. OCV correlates with state of charge and can be used to estimate battery SOC without applying current.",
    definitionZh: "电池两端在未连接外部负载时的电压。OCV与荷电状态相关，可用于估算电池SOC而无需施加电流。",
    definitionVi: "Điện áp giữa hai cực của pin khi không có tải bên ngoài được kết nối. OCV liên quan đến trạng thái sạc và có thể được sử dụng để ước tính SOC pin mà không cần áp dụng dòng.",
    category: "battery",
    relatedTerms: ["SOC", "DCIR"],
  },
  {
    id: "power-factor",
    term: "Power Factor",
    termZh: "功率因数",
    termVi: "Hệ số công suất",
    definition: "The ratio of real power to apparent power in an AC electrical system, ranging from 0 to 1. Higher power factor indicates more efficient power usage. Critical for energy recovery systems in battery testing.",
    definitionZh: "交流电力系统中实际功率与视在功率的比率，范围从0到1。功率因数越高表示电力使用效率越高。对电池测试中的能量回收系统至关重要。",
    definitionVi: "Tỷ số giữa công suất thực và công suất biểu kiến trong hệ thống điện xoay chiều, dao động từ 0 đến 1. Hệ số công suất cao hơn cho thấy sử dụng năng lượng hiệu quả hơn. Quan trọng cho các hệ thống thu hồi năng lượng trong kiểm tra pin.",
    category: "equipment",
    relatedProducts: ["CE-6000"],
    relatedTerms: ["Energy Recovery", "Grid-tied"],
  },
  {
    id: "pulse-test",
    term: "Pulse Test",
    termZh: "脉冲测试",
    termVi: "Thử nghiệm xung",
    definition: "A diagnostic test that applies short current pulses to measure battery response. Used to determine DCIR, power capability, and battery health without fully cycling the cell.",
    definitionZh: "施加短电流脉冲以测量电池响应的诊断测试。用于确定DCIR、功率能力和电池健康状况，而无需完全循环电芯。",
    definitionVi: "Bài kiểm tra chẩn đoán áp dụng các xung dòng ngắn để đo phản ứng của pin. Được sử dụng để xác định DCIR, khả năng công suất và tình trạng pin mà không cần lặp đầy đủ ô.",
    category: "testing",
    relatedTerms: ["DCIR", "HPPC", "Internal Resistance"],
  },
  {
    id: "sampling-rate",
    term: "Sampling Rate",
    termZh: "采样率",
    termVi: "Tốc độ lấy mẫu",
    definition: "The frequency at which a battery tester records voltage and current measurements during testing. Higher sampling rates (e.g., 10ms or faster) capture more detail in fast-changing events like voltage dips during pulse tests.",
    definitionZh: "电池测试仪在测试期间记录电压和电流测量的频率。更高的采样率（如10ms或更快）可捕获快速变化事件（如脉冲测试期间的电压降）中的更多细节。",
    definitionVi: "Tần số mà thiết bị kiểm tra pin ghi lại các phép đo điện áp và dòng trong quá trình thử nghiệm. Tốc độ lấy mẫu cao hơn (ví dụ: 10ms hoặc nhanh hơn) ghi lại nhiều chi tiết hơn trong các sự kiện thay đổi nhanh.",
    category: "equipment",
    relatedProducts: ["BTS9000", "CT-4000"],
    relatedTerms: ["Accuracy", "Pulse Test"],
  },
  {
    id: "sei-layer",
    term: "SEI Layer (Solid Electrolyte Interphase)",
    termZh: "SEI层 (固体电解质界面)",
    termVi: "Lớp SEI (Giao diện điện phân rắn)",
    definition: "A passivation layer that forms on the anode surface during initial formation cycling. The SEI layer is crucial for battery stability, cycle life, and safety. Its quality directly impacts battery performance.",
    definitionZh: "在初始成型循环期间在阳极表面形成的钝化层。SEI层对电池稳定性、循环寿命和安全性至关重要。其质量直接影响电池性能。",
    definitionVi: "Lớp thụ động hóa hình thành trên bề mặt anot trong quá trình tạo hình ban đầu. Lớp SEI rất quan trọng cho sự ổn định của pin, tuổi thọ chu kỳ và an toàn. Chất lượng của nó ảnh hưởng trực tiếp đến hiệu suất pin.",
    category: "battery",
    relatedTerms: ["Formation", "Cycle Life"],
  },
  {
    id: "soc",
    term: "State of Charge (SOC)",
    termZh: "荷电状态 (SOC)",
    termVi: "Trạng thái sạc (SOC)",
    definition: "The remaining capacity of a battery expressed as a percentage of its total capacity. SOC 100% means fully charged; SOC 0% means fully discharged. Accurate SOC estimation is critical for battery management systems.",
    definitionZh: "电池剩余容量相对于其总容量的百分比表示。SOC 100%表示充满电；SOC 0%表示完全放电。准确的SOC估算对电池管理系统至关重要。",
    definitionVi: "Dung lượng còn lại của pin được biểu thị bằng phần trăm tổng dung lượng. SOC 100% có nghĩa là đầy; SOC 0% có nghĩa là xả hết. Ước tính SOC chính xác rất quan trọng cho các hệ thống quản lý pin.",
    category: "battery",
    relatedTerms: ["OCV", "HPPC", "C-Rate"],
  },
];

function TermCard({ term, locale }: { term: GlossaryTerm; locale: string }) {
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const displayTerm = isZh ? term.termZh : isVi ? term.termVi : term.term;
  const displayDef = isZh ? term.definitionZh : isVi ? term.definitionVi : term.definition;

  const categoryColors: Record<string, string> = {
    testing: "bg-blue-100 text-blue-700",
    equipment: "bg-purple-100 text-purple-700",
    battery: "bg-green-100 text-green-700",
    general: "bg-slate-100 text-slate-700",
  };

  const categoryLabels: Record<string, { en: string; zh: string; vi: string }> = {
    testing: { en: "Testing", zh: "测试", vi: "Thử nghiệm" },
    equipment: { en: "Equipment", zh: "设备", vi: "Thiết bị" },
    battery: { en: "Battery", zh: "电池", vi: "Pin" },
    general: { en: "General", zh: "通用", vi: "Chung" },
  };

  return (
    <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">
            {displayTerm}
          </h3>
          <Badge variant="secondary" className={`text-xs ${categoryColors[term.category]}`}>
            {categoryLabels[term.category]?.[locale as keyof typeof categoryLabels[typeof term.category]] || term.category}
          </Badge>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {displayDef}
        </p>
        {(term.relatedProducts || term.relatedTerms) && (
          <div className="space-y-2">
            {term.relatedProducts && term.relatedProducts.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400">Products:</span>
                {term.relatedProducts.map((product) => (
                  <Link
                    key={product}
                    href={`/${locale}/products/${product.toLowerCase().replace("-", "")}`}
                    className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {product}
                  </Link>
                ))}
              </div>
            )}
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400">Related:</span>
                {term.relatedTerms.map((related) => (
                  <span
                    key={related}
                    className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                  >
                    {related}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface Props {
  locale: string;
  messages: Record<string, unknown>;
}

export function GlossaryClient({ locale, messages }: Props) {
  const params = useParams();
  const currentLocale = (params.locale as string) || locale;
  const isZh = currentLocale === "zh";
  const isVi = currentLocale === "vi";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: isZh ? "全部" : isVi ? "Tất cả" : "All" },
    { id: "testing", label: isZh ? "测试" : isVi ? "Thử nghiệm" : "Testing" },
    { id: "equipment", label: isZh ? "设备" : isVi ? "Thiết bị" : "Equipment" },
    { id: "battery", label: isZh ? "电池" : isVi ? "Pin" : "Battery" },
    { id: "general", label: isZh ? "通用" : isVi ? "Chung" : "General" },
  ];

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchesSearch =
        !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.termZh.includes(search) ||
        term.termVi.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase()) ||
        term.definitionZh.includes(search) ||
        term.definitionVi.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || term.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  // Group by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = isZh
        ? term.termZh.charAt(0)
        : isVi
        ? term.termVi.charAt(0)
        : term.term.charAt(0);
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredTerms, isZh, isVi]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-7 w-7 text-blue-200" />
            <span className="text-blue-200 font-medium">
              {isZh ? "技术术语表" : isVi ? "Bảng thuật ngữ kỹ thuật" : "Technical Glossary"}
            </span>
          </div>
          <h1 className="text-4xl font-heading font-bold mb-3">
            {isZh ? "电池测试术语表" : isVi ? "Bảng thuật ngữ kiểm tra pin" : "Battery Testing Glossary"}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {isZh
              ? "NEWARE电池测试设备专业术语表，包含DCIR、精度、采样率、能量回收等核心概念的详细定义。"
              : isVi
              ? "Bảng thuật ngữ thiết bị kiểm tra pin NEWARE với định nghĩa chi tiết về DCIR, độ chính xác, tốc độ lấy mẫu, thu hồi năng lượng."
              : "NEWARE battery testing equipment glossary with detailed definitions for DCIR, accuracy, sampling rate, energy recovery, and core concepts."}
          </p>
          <div className="flex items-center gap-4 mt-4 text-blue-200 text-sm">
            <span className="flex items-center gap-1">
              <Battery className="h-4 w-4" />
              {isZh ? `${glossaryTerms.length} 个术语` : isVi ? `${glossaryTerms.length} thuật ngữ` : `${glossaryTerms.length} terms`}
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="h-4 w-4" />
              {isZh ? "多语言支持" : isVi ? "Đa ngôn ngữ" : "Multi-language"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={isZh ? "搜索术语..." : isVi ? "Tìm kiếm thuật ngữ..." : "Search terms..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 border-slate-200 focus:border-primary/50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          {search && (
            <p className="text-sm text-slate-500 mt-3">
              {isZh ? "找到" : isVi ? "Tìm thấy" : "Found"}{" "}
              <strong className="text-primary">{filteredTerms.length}</strong>{" "}
              {isZh ? "个术语" : isVi ? "thuật ngữ" : "terms"}
            </p>
          )}
        </div>

        {/* Alphabetical Groups */}
        {groupedTerms.length > 0 ? (
          <div className="space-y-10">
            {groupedTerms.map(([letter, terms]) => (
              <div key={letter}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl">
                    {letter}
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {terms.map((term) => (
                    <TermCard key={term.id} term={term} locale={currentLocale} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>{isZh ? "未找到相关术语" : isVi ? "Không tìm thấy thuật ngữ nào" : "No terms found"}</p>
          </div>
        )}

        {/* Related Resources */}
        <div className="mt-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-8 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            {isZh ? "相关资源" : isVi ? "Tài nguyên liên quan" : "Related Resources"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href={`/${currentLocale}/blog`}>
              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                <div className="h-1 w-full bg-gradient-to-r from-primary to-blue-400" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-xs text-primary font-medium">
                      {isZh ? "技术博客" : isVi ? "Blog kỹ thuật" : "Technical Blog"}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-primary transition-colors">
                    {isZh ? "阅读最新技术文章" : isVi ? "Đọc các bài viết kỹ thuật mới nhất" : "Read the latest technical articles"}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isZh
                      ? "了解电池测试方法、充放电曲线分析等实战经验"
                      : isVi
                      ? "Tìm hiểu về phương pháp thử nghiệm pin, phân tích đường cong sạc/xả"
                      : "Learn battery testing methods, charge/discharge curve analysis"}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/${currentLocale}/products`}>
              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-pink-400" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="h-4 w-4 text-purple-500" />
                    <span className="text-xs text-purple-500 font-medium">
                      {isZh ? "产品系列" : isVi ? "Dòng sản phẩm" : "Products"}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-purple-500 transition-colors">
                    {isZh ? "探索NEWARE产品" : isVi ? "Khám phá sản phẩm NEWARE" : "Explore NEWARE products"}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isZh
                      ? "CT-4000、BTS9000、CE-6000等全系列电池测试设备"
                      : isVi
                      ? "CT-4000, BTS9000, CE-6000 và các thiết bị kiểm tra pin khác"
                      : "CT-4000, BTS9000, CE-6000 battery testing equipment"}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href={`/${currentLocale}/knowledge-base`}>
              <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                <div className="h-1 w-full bg-gradient-to-r from-green-400 to-teal-400" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-500 font-medium">
                      {isZh ? "知识库" : isVi ? "Cơ sở kiến thức" : "Knowledge Base"}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-green-500 transition-colors">
                    {isZh ? "访问知识库" : isVi ? "Truy cập cơ sở kiến thức" : "Visit Knowledge Base"}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {isZh
                      ? "获取更多电池测试技术文档和应用指南"
                      : isVi
                      ? "Truy cập tài liệu kỹ thuật và hướng dẫn ứng dụng pin"
                      : "Access more battery testing technical docs and application guides"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlossaryClient;
