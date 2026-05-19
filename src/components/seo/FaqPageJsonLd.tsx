"use client";

import { useParams } from "next/navigation";

const SITE_URL = typeof window !== "undefined"
  ? window.location.origin
  : (process.env.SITE_URL ?? "https://www.neware.com.cn");

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  en: [
    {
      question: "What is the accuracy of NEWARE battery testers?",
      answer: "NEWARE BTS9000 series achieves 0.02% FS accuracy, far exceeding the industry average of 0.1%. CT-4000 series achieves 0.05% FS accuracy.",
    },
    {
      question: "Can NEWARE equipment migrate data from Arbin, Maccor or BioLogic?",
      answer: "Yes, NEWARE provides free data migration tools. Our engineers can help convert your existing test data to NEWARE format with minimal disruption.",
    },
    {
      question: "What is the warranty period?",
      answer: "NEWARE provides a 12-month warranty. Extended warranty plans are available. Software updates are free for life.",
    },
    {
      question: "How many channels can a single NEWARE system support?",
      answer: "A single NEWARE system supports up to 96 channels in parallel. For larger scale requirements, multiple systems can be networked together.",
    },
    {
      question: "Does NEWARE support energy recovery?",
      answer: "Yes, the CE-6000 IGBT series supports 70%+ energy feedback, significantly reducing operating costs for high-power testing applications.",
    },
  ],
  zh: [
    {
      question: "新威尔电池测试仪的精度是多少？",
      answer: "新威尔BTS9000系列精度达到0.02% FS，远超行业平均0.1%水平。CT-4000系列精度为0.05% FS。",
    },
    {
      question: "新威尔设备支持从Arbin、Maccor或BioLogic迁移数据吗？",
      answer: "是的，新威尔提供免费数据迁移工具。我们的工程师可以帮助将您的现有测试数据以最小中断的方式转换到新威尔格式。",
    },
    {
      question: "保修期是多久？",
      answer: "新威尔提供12个月保修期。也可购买延保服务。软件终身免费升级。",
    },
    {
      question: "单个新威尔系统支持多少通道？",
      answer: "单个新威尔系统最多支持96通道并行工作。如需更大规模，多台系统可联网使用。",
    },
    {
      question: "新威尔支持能量回收吗？",
      answer: "是的，CE-6000 IGBT系列支持70%以上能量回馈，大大降低大功率测试的运营成本。",
    },
  ],
  vi: [
    {
      question: "Độ chính xác của thiết bị kiểm tra pin NEWARE là bao nhiêu?",
      answer: "Dòng BTS9000 của NEWARE đạt độ chính xác 0,02% FS, vượt xa mức trung bình ngành 0,1%. Dòng CT-4000 đạt 0,05% FS.",
    },
    {
      question: "Thiết bị NEWARE có hỗ trợ di chuyển dữ liệu từ Arbin, Maccor hoặc BioLogic không?",
      answer: "Có, NEWARE cung cấp công cụ di chuyển dữ liệu miễn phí. Kỹ sư của chúng tôi có thể giúp chuyển đổi dữ liệu thử nghiệm hiện có sang định dạng NEWARE với ít gián đoạn nhất.",
    },
    {
      question: "Thời hạn bảo hành là bao lâu?",
      answer: "NEWARE cung cấp bảo hành 12 tháng. Dịch vụ bảo hành mở rộng cũng có sẵn. Cập nhật phần mềm miễn phí trọn đời.",
    },
    {
      question: "Một hệ thống NEWARE hỗ trợ bao nhiêu kênh?",
      answer: "Một hệ thống NEWARE hỗ trợ tối đa 96 kênh song song. Đối với yêu cầu quy mô lớn hơn, nhiều hệ thống có thể kết nối mạng.",
    },
    {
      question: "NEWARE có hỗ trợ phục hồi năng lượng không?",
      answer: "Có, dòng CE-6000 IGBT hỗ trợ hoàn lại năng lượng 70%+, giảm đáng kể chi phí vận hành cho các ứng dụng thử nghiệm công suất cao.",
    },
  ],
};

export function FaqPageJsonLd() {
  const params = useParams();
  const locale = (params.locale as string) || "zh";
  const faqs = faqData[locale] || faqData.en;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
