"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Battery, Zap, Cpu, Shield, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  locale: string;
  messages: Record<string, unknown>;
}

interface ConfigState {
  application: string;
  voltage: string;
  current: string;
  channels: number;
  accuracy: string;
  sampling: string;
  options: string[];
  name: string;
  email: string;
  company: string;
  message: string;
}

const initialState: ConfigState = {
  application: "",
  voltage: "",
  current: "",
  channels: 32,
  accuracy: "",
  sampling: "",
  options: [],
  name: "",
  email: "",
  company: "",
  message: "",
};

function t(zh: string, vi: string, en: string, locale: string): string {
  if (locale === "zh") return zh;
  if (locale === "vi") return vi;
  return en;
}

function getRecommendation(state: ConfigState, locale: string) {
  if (state.accuracy === "0.02%" || state.sampling === "1000Hz") {
    return {
      series: "NEWARE BTS9000 (CT-9000)",
      description: t(
        "高精度研究级系统。0.02% FS精度，1000Hz采样率，专为DCIR、脉冲测试和下一代电池研发设计。",
        "Hệ thống cấp nghiên cứu độ chính xác cao. Độ chính xác 0.02% FS, tốc độ lấy mẫu 1000Hz, được thiết kế cho DCIR, thử nghiệm xung và R&D pin thế hệ tiếp theo.",
        "High-precision research-grade system. 0.02% FS accuracy, 1000Hz sampling, designed for DCIR, pulse testing, and next-generation battery R&D.",
        locale
      ),
      priceRange: "$35,000 - $85,000 USD",
      color: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
      icon: Cpu,
    };
  }
  if (state.options.includes("energy-recovery")) {
    return {
      series: "NEWARE CE-6000",
      description: t(
        "工业级成型和测试系统，带IGBT能量回收技术。70%以上放电能量回收，显著降低电费成本。",
        "Hệ thống tạo hình và thử nghiệm cấp công nghiệp với công nghệ thu hồi năng lượng IGBT. Thu hồi trên 70% năng lượng xả, giảm đáng kể chi phí điện.",
        "Industrial-grade formation and testing system with IGBT energy recovery technology. 70%+ discharged energy recovery, significantly reducing electricity costs.",
        locale
      ),
      priceRange: "$25,000 - $65,000 USD",
      color: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
      icon: Zap,
    };
  }
  if (state.application === "production" || state.channels >= 64) {
    return {
      series: "NEWARE CT-8000",
      description: t(
        "高通道数生产测试系统。每主机最高384通道，专为大规模生产和质量控制设计。",
        "Hệ thống thử nghiệm sản xuất số kênh cao. Lên đến 384 kênh mỗi mainframe, được thiết kế cho sản xuất quy mô lớn và kiểm soát chất lượng.",
        "High-channel-count production testing system. Up to 384 channels per mainframe, designed for large-scale production and quality control.",
        locale
      ),
      priceRange: "$40,000 - $120,000 USD",
      color: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
      icon: Package,
    };
  }
  return {
    series: "NEWARE CT-4000",
    description: t(
      "精准研究与生产的理想平衡。0.05% FS精度，灵活通道配置，性价比最高的R&D解决方案。",
      "Cân bằng lý tưởng giữa nghiên cứu chính xác và sản xuất. Độ chính xác 0.05% FS, cấu hình kênh linh hoạt, giải pháp R&D giá trị tốt nhất.",
      "Ideal balance of precision and production. 0.05% FS accuracy, flexible channel configuration, best-value R&D solution.",
      locale
    ),
    priceRange: "$8,000 - $48,000 USD",
    color: "bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-700",
    icon: Battery,
  };
}

export function CalculatorClient({ locale }: Props) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ConfigState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const updateConfig = (updates: Partial<ConfigState>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const toggleOption = (option: string) => {
    setConfig((prev) => ({
      ...prev,
      options: prev.options.includes(option)
        ? prev.options.filter((o) => o !== option)
        : [...prev.options, option],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;
  const recommendation = step === 4 ? getRecommendation(config, locale) : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            {t("产品配置器", "Cấu hình sản phẩm", "Product Configurator", locale)}
          </h1>
          <p className="text-blue-100">
            {t(
              "回答几个简单问题，找到最适合您需求的NEWARE设备",
              "Trả lời một vài câu hỏi đơn giản để tìm thiết bị NEWARE phù hợp nhất với nhu cầu của bạn",
              "Answer a few questions to find the NEWARE equipment best suited to your needs",
              locale
            )}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>
              {t("步骤", "Bước", "Step", locale)} {step} / {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step 1: Application */}
        {step === 1 && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                {t("您的应用场景是什么？", "Ứng dụng của bạn là gì?", "What is your application?", locale)}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "rd",
                    label: t("科研实验室", "Phòng thí nghiệm R&D", "R&D Lab", locale),
                    desc: t("学术研究、材料科学、新电池开发", "Nghiên cứu học thuật, khoa học vật liệu", "Academic research, material science", locale),
                  },
                  {
                    id: "production",
                    label: t("生产测试", "Thử nghiệm sản xuất", "Production Testing", locale),
                    desc: t("电池成型、分容、质量控制", "Tạo hình pin, phân loại, QC", "Formation, grading, QC", locale),
                  },
                  {
                    id: "academic",
                    label: t("大学研究", "Nghiên cứu đại học", "Academic Research", locale),
                    desc: t("教学、论文、实验室建设", "Giảng dạy, luận văn", "Teaching, thesis, lab setup", locale),
                  },
                  {
                    id: "qa",
                    label: t("质量保证", "Đảm bảo chất lượng", "Quality Assurance", locale),
                    desc: t("安全测试、合规验证", "Thử nghiệm an toàn, xác nhận", "Safety testing, compliance", locale),
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      updateConfig({ application: item.id });
                      setStep(2);
                    }}
                    className={`text-left p-4 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5 ${
                      config.application === item.id ? "border-primary bg-primary/5" : "border-slate-200"
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-sm text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Technical Requirements */}
        {step === 2 && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                {t("技术要求", "Yêu cầu kỹ thuật", "Technical Requirements", locale)}
              </h2>
              <div className="space-y-6">
                {/* Accuracy */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    {t("测量精度要求", "Yêu cầu độ chính xác", "Accuracy Requirement", locale)}
                  </Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => updateConfig({ accuracy: "0.05%" })}
                      className={`p-3 rounded-lg border-2 text-left ${
                        config.accuracy === "0.05%" ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold">Standard — 0.05% FS</div>
                      <div className="text-sm text-slate-500">
                        {t("生产级，适合大多数研发", "Cấp sản xuất, phù hợp hầu hết R&D", "Production-grade, suitable for most R&D", locale)}
                      </div>
                    </button>
                    <button
                      onClick={() => updateConfig({ accuracy: "0.02%" })}
                      className={`p-3 rounded-lg border-2 text-left ${
                        config.accuracy === "0.02%" ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"
                      }`}
                    >
                      <div className="font-semibold">High Precision — 0.02% FS</div>
                      <div className="text-sm text-slate-500">
                        {t("研究级，DCIR/脉冲测试必需", "Cấp nghiên cứu, cần thiết cho DCIR/xung", "Research-grade, required for DCIR/pulse", locale)}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Sampling */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    {t("采样率要求", "Yêu cầu tốc độ lấy mẫu", "Sampling Rate", locale)}
                  </Label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { id: "10Hz", label: "10 Hz", desc: t("标准循环", "Chu kỳ tiêu chuẩn", "Standard cycling", locale) },
                      { id: "100Hz", label: "100 Hz", desc: t("脉冲表征", "Đặc tính xung", "Pulse characterization", locale) },
                      { id: "1000Hz", label: "1000 Hz", desc: t("DCIR/HPPC必需", "Cần cho DCIR/HPPC", "Required for DCIR/HPPC", locale) },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => updateConfig({ sampling: item.id })}
                        className={`p-3 rounded-lg border-2 text-left ${
                          config.sampling === item.id ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-sm text-slate-500">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Channels */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    {t("需要多少通道？", "Bạn cần bao nhiêu kênh?", "How many channels?", locale)} — {config.channels}
                  </Label>
                  <input
                    type="range"
                    min={4}
                    max={384}
                    step={4}
                    value={config.channels}
                    onChange={(e) => updateConfig({ channels: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm text-slate-500 mt-1">
                    <span>4</span>
                    <span>192</span>
                    <span>384+</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {t("上一步", "Quay lại", "Back", locale)}
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="gap-2"
                    disabled={!config.accuracy || !config.sampling}
                  >
                    {t("下一步", "Tiếp theo", "Next", locale)}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Options */}
        {step === 3 && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                {t("附加选项（可选）", "Tùy chọn bổ sung (tùy chọn)", "Additional Options (Optional)", locale)}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "energy-recovery",
                    label: t("能量回收", "Thu hồi năng lượng", "Energy Recovery", locale),
                    desc: t("CE-6000，节省70%电费", "CE-6000, tiết kiệm 70% điện", "CE-6000, save 70% on electricity", locale),
                    icon: Zap,
                  },
                  {
                    id: "chamber",
                    label: t("环境箱", "Buồng môi trường", "Environmental Chamber", locale),
                    desc: t("温湿度控制测试", "Thử nghiệm kiểm soát nhiệt độ/độ ẩm", "Temperature/humidity controlled testing", locale),
                    icon: Cpu,
                  },
                  {
                    id: "training",
                    label: t("现场培训", "Đào tạo tại chỗ", "On-site Training", locale),
                    desc: t("设备安装和软件培训", "Cài đặt thiết bị và đào tạo phần mềm", "Equipment installation and software training", locale),
                    icon: Shield,
                  },
                  {
                    id: "extended-warranty",
                    label: t("延长保修", "Bảo hành mở rộng", "Extended Warranty", locale),
                    desc: t("2-3年延保服务", "Dịch vụ bảo hành 2-3 năm", "2-3 year warranty extension", locale),
                    icon: Package,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleOption(item.id)}
                      className={`text-left p-4 rounded-lg border-2 transition-all hover:border-primary ${
                        config.options.includes(item.id) ? "border-primary bg-primary/5" : "border-slate-200"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${config.options.includes(item.id) ? "text-primary" : "text-slate-400"}`} />
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-sm text-slate-500">{item.desc}</div>
                      {config.options.includes(item.id) && (
                        <Check className="w-5 h-5 text-primary mt-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {t("上一步", "Quay lại", "Back", locale)}
                </Button>
                <Button onClick={() => setStep(4)} className="gap-2">
                  {t("获取推荐", "Nhận đề xuất", "Get Recommendation", locale)}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Recommendation */}
        {step === 4 && !submitted && (
          <Card className={recommendation?.color}>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-6 h-6 text-primary" />
                <span className="bg-primary text-white px-2 py-0.5 rounded text-xs font-bold">
                  {t("推荐", "Đề xuất", "Recommended", locale)}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{recommendation?.series}</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{recommendation?.description}</p>

              <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-4 mb-6">
                <div className="text-sm text-slate-500 mb-1">
                  {t("预估价格范围", "Phạm vi giá ước tính", "Estimated Price Range", locale)}
                </div>
                <div className="text-2xl font-bold text-primary">{recommendation?.priceRange}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {t("*实际价格取决于具体配置", "*Giá thực tế phụ thuộc vào cấu hình cụ thể", "*Actual price depends on specific configuration", locale)}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("您的姓名", "Tên của bạn", "Your Name", locale)} *</Label>
                    <Input id="name" required value={config.name} onChange={(e) => updateConfig({ name: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("邮箱", "Email", "Email", locale)} *</Label>
                    <Input id="email" type="email" required value={config.email} onChange={(e) => updateConfig({ email: e.target.value })} className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">{t("公司/机构", "Công ty/Tổ chức", "Company / Organization", locale)} *</Label>
                  <Input id="company" required value={config.company} onChange={(e) => updateConfig({ company: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">{t("其他需求或问题", "Yêu cầu hoặc câu hỏi khác", "Additional requirements or questions", locale)}</Label>
                  <textarea
                    id="message"
                    value={config.message}
                    onChange={(e) => updateConfig({ message: e.target.value })}
                    className="mt-1 w-full border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-800"
                    rows={3}
                    placeholder={t("请描述您的具体需求...", "Vui lòng mô tả nhu cầu cụ thể của bạn...", "Please describe your specific needs...", locale)}
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outline" type="button" onClick={() => setStep(3)} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {t("修改配置", "Sửa cấu hình", "Modify", locale)}
                  </Button>
                  <Button type="submit" className="gap-2 bg-primary hover:bg-primary/90">
                    {t("获取详细报价", "Nhận báo giá chi tiết", "Get Detailed Quote", locale)}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Success */}
        {step === 4 && submitted && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                {t("谢谢！", "Cảm ơn bạn!", "Thank You!", locale)}
              </h2>
              <p className="text-green-700 dark:text-green-300 mb-6">
                {t("我们的团队将在4小时内回复您的详细报价请求。", "Đội ngũ của chúng tôi sẽ trả lời yêu cầu báo giá chi tiết của bạn trong 4 giờ.", "Our team will respond to your detailed quote request within 4 hours.", locale)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mb-6">
                {t("推荐配置：", "Cấu hình đề xuất:", "Recommended configuration:", locale)} <strong>{recommendation?.series}</strong> ({recommendation?.priceRange})
              </p>
              <Button
                onClick={() => {
                  setStep(1);
                  setConfig(initialState);
                  setSubmitted(false);
                }}
                className="gap-2"
              >
                {t("重新开始", "Bắt đầu lại", "Start Over", locale)}
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
