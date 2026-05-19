"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, CheckCircle, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const resources = [
  {
    id: "selection-guide",
    icon: FileText,
    title: "电池测试设备选型指南",
    titleEn: "Battery Testing Equipment Selection Guide",
    desc: "从扣式电池到EV电池包——如何根据电压、电流量程、精度需求和预算选择最合适的测试系统。包含 500+ 型号对照表。",
    descEn: "From coin cells to EV battery packs — how to select the most suitable testing system based on voltage, current range, accuracy requirements and budget. Includes 500+ model reference table.",
    category: "Guide",
    categoryZh: "选型指南",
    color: "#2563eb",
    pages: "32页 / 32 pages",
  },
  {
    id: "energy-roi",
    icon: FileText,
    title: "能量回收技术ROI白皮书",
    titleEn: "Energy Recovery Technology ROI Whitepaper",
    desc: "CE-6000 IGBT系列能量回收系统如何在大规模动力电池测试中实现70%+节能。本白皮书提供详细的ROI计算模型和回报周期分析。",
    descEn: "How CE-6000 IGBT series energy recovery system achieves 70%+ energy savings in large-scale EV battery testing. Includes detailed ROI calculation model and payback period analysis.",
    category: "Whitepaper",
    categoryZh: "白皮书",
    color: "#059669",
    pages: "24页 / 24 pages",
  },
  {
    id: "precision-rd",
    icon: FileText,
    title: "高精度测试对R&D的影响",
    titleEn: "Impact of High-Precision Testing on R&D",
    desc: "为什么0.02%的精度差异对电池材料研发至关重要？本白皮书分析采样率和精度对DCIR测量、循环寿命预测和老化研究的影响。",
    descEn: "Why does a 0.02% accuracy difference matter for battery material R&D? This whitepaper analyzes the impact of sampling rate and accuracy on DCIR measurement, cycle life prediction and aging research.",
    category: "Whitepaper",
    categoryZh: "白皮书",
    color: "#7c3aed",
    pages: "20页 / 20 pages",
  },
];

interface Props {
  locale: string;
}

export function ResourcesPageClient({ locale }: Props) {
  const isZh = locale === "zh";
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownload = async (resourceId: string) => {
    setSelectedResource(resourceId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          resourceId: selectedResource,
          locale,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setName("");
        setCompany("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-primary-dark text-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              <Download className="h-3.5 w-3.5" />
              {isZh ? "免费资源" : "Free Resources"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
              {isZh ? "技术资源中心" : "Technical Resource Center"}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {isZh
                ? "免费下载新威尔独家白皮书、选型指南和技术文档，深入了解电池测试设备的技术细节和选型要点。"
                : "Download free Neware whitepapers, selection guides and technical documents. Gain in-depth understanding of battery testing equipment technical details and selection criteria."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, i) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="h-1" style={{ backgroundColor: resource.color }} />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: resource.color }}
                    >
                      <resource.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: resource.color }}>
                      {resource.categoryZh}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">
                      {isZh ? resource.title : resource.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400">{resource.pages}</p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {isZh ? resource.desc : resource.descEn}
                  </p>

                  {selectedResource === resource.id && status === "idle" ? (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <p className="text-xs text-slate-500 mb-3 font-medium">
                        {isZh ? "填写邮箱，立即免费下载：" : "Enter your email to download free:"}
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                          <Input
                            placeholder={isZh ? "您的邮箱" : "Your email"}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            placeholder={isZh ? "您的姓名（可选）" : "Your name (optional)"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder={isZh ? "公司名称（可选）" : "Company (optional)"}
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                        </div>
                        <Button type="submit" size="sm" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (isZh ? "提交中..." : "Submitting...") : (isZh ? "确认下载" : "Confirm Download")}
                        </Button>
                        <button
                          type="button"
                          onClick={() => setSelectedResource(null)}
                          className="w-full text-xs text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {isZh ? "取消" : "Cancel"}
                        </button>
                      </form>
                    </div>
                  ) : status === "success" && selectedResource === resource.id ? (
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center space-y-2">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                      <p className="text-sm font-semibold text-green-700">
                        {isZh ? "下载链接已发送到您的邮箱！" : "Download link sent to your email!"}
                      </p>
                      <p className="text-xs text-green-600">
                        {isZh ? "请查收邮件中的下载链接" : "Please check your email for the download link"}
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleDownload(resource.id)}
                      variant="outline"
                      className="w-full font-semibold group"
                    >
                      {isZh ? "免费下载" : "Download Free"}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {status === "error" && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 max-w-md mx-auto">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">
              {isZh ? "提交失败，请稍后重试。" : "Submission failed. Please try again."}
            </p>
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {isZh ? "需要更详细的技术咨询？" : "Need More Detailed Technical Consultation?"}
              </h3>
              <p className="text-slate-500 text-sm">
                {isZh
                  ? "我们的应用工程师可以为您提供一对一的技术选型支持"
                  : "Our application engineers can provide one-on-one technical selection support"}
              </p>
            </div>
            <a href={`/${locale}/contact`}>
              <Button size="lg" className="shrink-0 font-semibold">
                {isZh ? "联系应用工程师" : "Contact an Application Engineer"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
