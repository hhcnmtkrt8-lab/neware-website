"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Globe, Shield, Database, TrendingUp, BarChart3, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const advantages = [
  {
    icon: BarChart3,
    titleKey: "accuracy" as const,
    titleZh: "测量精度",
    titleEn: "Measurement Accuracy",
    metric: "0.02% FS",
    metricLabel: "行业平均通常为 0.1%–0.5%",
    metricLabelEn: "Industry average is typically 0.1%–0.5%",
    newareValue: "0.02%",
    industryAvg: "0.1%–0.5%",
    delta: "+80% 更精确",
    deltaEn: "+80% more accurate",
    color: "#2563eb",
  },
  {
    icon: Zap,
    titleKey: "samplingRate" as const,
    titleZh: "采样率",
    titleEn: "Sampling Rate",
    metric: "1000Hz",
    metricLabel: "多数竞品仅公开 ≤100Hz",
    metricLabelEn: "Most competitors only publish ≤100Hz",
    newareValue: "1000Hz",
    industryAvg: "≤100Hz",
    delta: "+10x 采样密度",
    deltaEn: "+10x sampling density",
    color: "#dc2626",
  },
  {
    icon: TrendingUp,
    titleKey: "energyRecovery" as const,
    titleZh: "能量回收",
    titleEn: "Energy Recovery",
    metric: "70%+ 节能",
    metricLabel: "行业公开数据极少",
    metricLabelEn: "Few competitors publish this data",
    newareValue: "70%+",
    industryAvg: "未公开",
    delta: "大幅降低运营成本",
    deltaEn: "Dramatically reduces operating cost",
    color: "#059669",
  },
  {
    icon: Globe,
    titleKey: "countries" as const,
    titleZh: "全球覆盖",
    titleEn: "Global Coverage",
    metric: "150+ 国家",
    metricLabel: "国内厂商平均覆盖 20–50 个国家",
    metricLabelEn: "Domestic manufacturers average 20–50 countries",
    newareValue: "150+",
    industryAvg: "20–50",
    delta: "+3x 覆盖范围",
    deltaEn: "+3x coverage",
    color: "#7c3aed",
  },
  {
    icon: Database,
    titleKey: "dataExport" as const,
    titleZh: "数据导出",
    titleEn: "Data Export",
    metric: "CSV + API + ERP/MES",
    metricLabel: "多数厂商仅支持 CSV",
    metricLabelEn: "Most only support CSV",
    newareValue: "CSV + REST API + ERP/MES",
    industryAvg: "CSV only",
    delta: "无缝系统集成",
    deltaEn: "Seamless system integration",
    color: "#0891b2",
  },
  {
    icon: Shield,
    titleKey: "support" as const,
    titleZh: "技术支持",
    titleEn: "Technical Support",
    metric: "4 小时响应",
    metricLabel: "行业平均 24–72 小时",
    metricLabelEn: "Industry average 24–72 hours",
    newareValue: "4h response",
    industryAvg: "24–72h",
    delta: "优先高级工程师",
    deltaEn: "Priority senior engineer access",
    color: "#d97706",
  },
];

const industryFacts = [
  {
    icon: Award,
    stat: "500+",
    label: "型号覆盖",
    labelEn: "Models Available",
    desc: "从 50μA 扣式电池到 3000A EV 动力电池测试",
    descEn: "From 50μA coin cells to 3000A EV power battery testing",
  },
  {
    icon: Users,
    stat: "32,000+",
    label: "全球客户",
    labelEn: "Global Clients",
    desc: "包括特斯拉、CATL、LG、三星SDI、MIT、清华等",
    descEn: "Including Tesla, CATL, LG, Samsung SDI, MIT, Tsinghua",
  },
  {
    icon: Shield,
    stat: "400,000+",
    label: "设备部署",
    labelEn: "Units Deployed",
    desc: "全球 150+ 国家稳定运行，部分设备连续工作 10 年以上",
    descEn: "Stably operating in 150+ countries, some units running 10+ years",
  },
  {
    icon: TrendingUp,
    stat: "26 年",
    label: "行业深耕",
    labelEn: "Years of Excellence",
    desc: "始于 1998 年，持续研发投入，精度指标不断提升",
    descEn: "Since 1998, continuous R&D investment, improving accuracy",
  },
];

interface Props {
  locale: string;
}

export function WhyNewarePageClient({ locale }: Props) {
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-primary text-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              {isZh ? "行业数据说话" : "Data Speaks for Itself"}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              {isZh ? "为什么 32,000+ 客户选择了新威尔" : "Why 32,000+ Clients Chose Neware"}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              {isZh
                ? "我们不靠营销话术——每一个数据均基于公开参数和内部实测。以下是与行业平均水平的真实对比。"
                : "We don't rely on marketing claims — every data point is based on published specs and internal testing. Here is the real comparison with industry averages."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/products`}>
                <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold shadow-xl">
                  {isZh ? "浏览产品" : "Browse Products"}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 font-semibold">
                  {isZh ? "免费获取对比报告" : "Get Free Comparison Report"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Industry Stats */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {industryFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-primary mb-1">{fact.stat}</div>
                <div className="text-sm font-semibold text-slate-600 mb-1">
                  {isZh ? fact.label : fact.labelEn}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  {isZh ? fact.desc : fact.descEn}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Comparison */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {isZh ? "核心指标对比" : "Core Metric Comparison"}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {isZh
              ? "新威尔 vs 行业公开平均水平（数据来源：行业公开信息）"
              : "Neware vs. Published Industry Averages (Data Source: Public Industry Information)"}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: adv.color }} />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: adv.color }}
                    >
                      <adv.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {isZh ? adv.titleZh : adv.titleEn}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isZh ? adv.metricLabel : adv.metricLabelEn}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/5 rounded-lg p-3 text-center border border-primary/10">
                      <div className="text-xl font-extrabold text-primary mb-0.5">
                        {adv.newareValue}
                      </div>
                      <div className="text-[10px] text-primary/70 font-semibold uppercase tracking-wider">
                        {isZh ? "新威尔" : "Neware"}
                      </div>
                    </div>
                    <div className="bg-slate-100 rounded-lg p-3 text-center">
                      <div className="text-xl font-extrabold text-slate-500 mb-0.5">
                        {adv.industryAvg}
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        {isZh ? "行业平均" : "Industry Avg"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2.5 border border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm font-semibold text-green-700">
                      {isZh ? adv.delta : adv.deltaEn}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator />

      {/* How We Compare */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {isZh ? "不只是更好——而是全方位领先" : "Not Just Better — Leading Across All Dimensions"}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            {isZh
              ? "对比维度覆盖技术参数、服务能力、全球覆盖和数据兼容性"
              : "Comparison across technical specs, service capability, global coverage and data compatibility"}
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900">
                  <th className="text-left px-6 py-4 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                    {isZh ? "对比维度" : "Comparison Dimension"}
                  </th>
                  <th className="text-center px-6 py-4 text-primary font-bold">
                    {isZh ? "新威尔" : "Neware"}
                  </th>
                  <th className="text-center px-6 py-4 text-slate-500 font-medium">
                    {isZh ? "行业平均" : "Industry Average"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  [isZh ? "最高采样率" : "Max Sampling Rate", "1000Hz (BTS9000)", "≤100Hz (大多数未公开)"],
                  [isZh ? "精度范围" : "Accuracy Range", "0.02%–0.05% FS", "0.1%–0.5% FS"],
                  [isZh ? "能量回收" : "Energy Recovery", "70%+ (CE-6000 IGBT)", "通常未公开或 <30%"],
                  [isZh ? "电压范围" : "Voltage Range", "5V–1500V", "5V–60V (常见)"],
                  [isZh ? "最大电流" : "Max Current", "3000A", "100A–500A"],
                  [isZh ? "产品型号" : "Product Models", "500+ 型号 / 8大系列", "50–200 型号 / 3–6系列"],
                  [isZh ? "数据接口" : "Data Interfaces", "CSV + REST API + WebSocket + ERP/MES", "CSV 为主"],
                  [isZh ? "软件平台" : "Software Platform", "BTS8.0 + BTS9.0 (跨平台)", "Windows 专有软件"],
                  [isZh ? "全球覆盖" : "Global Coverage", "150+ 国家", "20–50 国家"],
                  [isZh ? "技术响应" : "Tech Support Response", "4 小时（高级工程师）", "24–72 小时"],
                  [isZh ? "校准认证" : "Calibration Certification", "ISO/IEC 17025 认证", "通常无专业校准认证"],
                ].map(([dim, neware, avg], i) => (
                  <tr key={dim as string} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-3.5 font-medium text-slate-700">{dim}</td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-primary">
                        <CheckCircle className="h-3.5 w-3.5" />
                        {neware}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center text-slate-500">{avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            {isZh ? "准备好亲眼见证了吗？" : "Ready to See It for Yourself?"}
          </h3>
          <p className="text-blue-100">
            {isZh
              ? "联系我们的应用工程师，获取针对您具体需求的个性化参数对比报告和免费样机测试。"
              : "Contact our application engineers for a personalized parameter comparison report and free prototype testing tailored to your needs."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50 font-bold shadow-xl">
                {isZh ? "获取免费评估" : "Get a Free Assessment"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/resources`}>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 font-semibold">
                {isZh ? "下载选型指南 →" : "Download Selection Guide →"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
