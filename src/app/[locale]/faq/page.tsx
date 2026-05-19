import { setRequestLocale } from "next-intl/server";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";
import { FaqClient } from "@/components/faq/FaqClient";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = process.env.SITE_URL ?? "https://www.neware.com.cn";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";
  const isVi = locale === "vi";
  const isRu = locale === "ru";
  const ogImage = locale === "zh" ? "/og-zh.png" : locale === "vi" ? "/og-vi.png" : "/og-en.png";

  return {
    title: isZh
      ? "常见问题 — 电池测试设备 | 新威尔 NEWARE"
      : isVi
      ? "Câu hỏi thường gặp — Thiết bị kiểm tra pin | NEWARE"
      : isRu
      ? "Часто задаваемые вопросы — Оборудование для тестирования аккумуляторов | NEWARE"
      : "Frequently Asked Questions — Battery Testing Equipment | NEWARE",
    description: isZh
      ? "查找关于新威尔电池测试设备的常见问题答案，包括产品选型、技术支持、数据迁移和价格订购。"
      : isVi
      ? "Tìm câu trả lời cho các câu hỏi phổ biến về thiết bị kiểm tra pin NEWARE, bao gồm lựa chọn sản phẩm, hỗ trợ kỹ thuật, di chuyển dữ liệu và giá cả."
      : isRu
      ? "Ответы на популярные вопросы об оборудовании NEWARE для тестирования аккумуляторов: подбор продукции, техническая поддержка, миграция данных и цены."
      : "Find answers to common questions about NEWARE battery testing equipment, including product selection, technical support, data migration, and pricing.",
    keywords: isZh
      ? ["常见问题", "FAQ", "电池测试", "产品选型", "技术支持", "数据迁移", "新威尔"]
      : isVi
      ? ["Câu hỏi thường gặp", "FAQ", "kiểm tra pin", "lựa chọn sản phẩm", "hỗ trợ kỹ thuật", "NEWARE"]
      : isRu
      ? ["FAQ", "часто задаваемые вопросы", "тестирование аккумуляторов", "подбор продукции", "техническая поддержка", "NEWARE"]
      : ["FAQ", "frequently asked questions", "battery testing", "product selection", "technical support", "NEWARE"],
    alternates: {
      canonical: `/${locale}/faq`,
      languages: {
        en: "/en/faq",
        zh: "/zh/faq",
        vi: "/vi/faq",
        ru: "/ru/faq",
        "x-default": "/en/faq",
      },
    },
    openGraph: {
      title: isZh
        ? "常见问题 | 新威尔 NEWARE"
        : isVi
        ? "Câu hỏi thường gặp | NEWARE"
        : isRu
        ? "Часто задаваемые вопросы | NEWARE"
        : "Frequently Asked Questions | NEWARE",
      description: isZh
        ? "查找关于新威尔电池测试设备的常见问题答案"
        : isVi
        ? "Tìm câu trả lời cho các câu hỏi phổ biến về thiết bị kiểm tra pin NEWARE"
        : isRu
        ? "Ответы на популярные вопросы об оборудовании NEWARE для тестирования аккумуляторов"
        : "Find answers to common questions about NEWARE battery testing equipment",
      url: `${SITE_URL}/${locale}/faq`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: isRu ? "NEWARE Часто задаваемые вопросы" : "NEWARE FAQ" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : isRu ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      title: isZh
        ? "常见问题 | 新威尔 NEWARE"
        : isVi
        ? "Câu hỏi thường gặp | NEWARE"
        : "Frequently Asked Questions | NEWARE",
      description: isZh
        ? "查找关于新威尔电池测试设备的常见问题答案"
        : isVi
        ? "Tìm câu trả lời cho các câu hỏi phổ biến về thiết bị kiểm tra pin NEWARE"
        : "Find answers to common questions about NEWARE battery testing equipment",
      images: [ogImage],
    },
  };
}

const faqData = {
  productSelection: [
    {
      question: "What NEWARE product should I choose for coin cell R&D?",
      answer: "For coin cell and material research, the BTS9000-5V5A-4CH is the best choice with 0.02% FS accuracy and 1000Hz sampling rate for DCIR measurements.",
      questionZh: "扣式电池研发应该选择哪款新威尔产品？",
      answerZh: "扣式电池和材料研究推荐使用 BTS9000-5V5A-4CH，具备0.02% FS精度和1000Hz采样率，适合DCIR测量。",
      questionVi: "Tôi nên chọn sản phẩm NEWARE nào cho R&D pin cúc áo?",
      answerVi: "Cho nghiên cứu pin cúc áo và vật liệu, BTS9000-5V5A-4CH là lựa chọn tốt nhất với độ chính xác 0,02% FS và tần số lấy mẫu 1000Hz cho phép đo DCIR.",
    },
    {
      question: "What's the difference between CT-4000 and CT-9000 series?",
      answer: "CT-4000: 0.05% FS accuracy, 10Hz sampling, cost-effective. CT-9000: 0.02% FS accuracy, 1000Hz sampling, for advanced R&D requiring high data resolution.",
      questionZh: "CT-4000和CT-9000系列有什么区别？",
      answerZh: "CT-4000：0.05% FS精度，10Hz采样，性价比高。CT-9000：0.02% FS精度，1000Hz采样，适合需要高数据分辨率的高级研发。",
      questionVi: "Sự khác biệt giữa dòng CT-4000 và CT-9000 là gì?",
      answerVi: "CT-4000: Độ chính xác 0,05% FS, lấy mẫu 10Hz, tiết kiệm chi phí. CT-9000: Độ chính xác 0,02% FS, lấy mẫu 1000Hz, cho R&D nâng cao yêu cầu độ phân giải dữ liệu cao.",
    },
    {
      question: "Can I use NEWARE equipment for supercapacitor testing?",
      answer: "Yes. All NEWARE cyclers support supercapacitor testing. For high-power applications, the CE-6000 IGBT series with energy recovery is recommended.",
      questionZh: "新威尔设备可以用于超级电容测试吗？",
      answerZh: "可以。所有新威尔电池测试仪都支持超级电容测试。大功率应用推荐使用CE-6000 IGBT系列，具备能量回收功能。",
      questionVi: "Tôi có thể sử dụng thiết bị NEWARE để thử nghiệm siêu tụ điện không?",
      answerVi: "Có. Tất cả các thiết bị kiểm tra pin NEWARE đều hỗ trợ thử nghiệm siêu tụ điện. Cho các ứng dụng công suất cao, dòng CE-6000 IGBT với phục hồi năng lượng được khuyến nghị.",
    },
    {
      question: "What's the maximum voltage and current NEWARE supports?",
      answer: "NEWARE supports up to 1000V and 3000A. Contact our team for custom high-voltage or high-current configurations.",
      questionZh: "新威尔支持的最大电压和电流是多少？",
      answerZh: "新威尔支持最高1000V电压和3000A电流。如需定制高电压或大电流配置，请联系我们的团队。",
      questionVi: "NEWARE hỗ trợ điện áp và dòng điện tối đa bao nhiêu?",
      answerVi: "NEWARE hỗ trợ lên đến 1000V và 3000A. Liên hệ đội ngũ của chúng tôi để được cấu hình tùy chỉnh điện áp cao hoặc dòng điện cao.",
    },
  ],
  technicalSupport: [
    {
      question: "How do I get technical support?",
      answer: "NEWARE provides 7×24h global technical support. Contact: info@batteryxlab.shop (global/APAC), jason@batteryxlab.shop (North America), support@batteryxlab.shop (Europe).",
      questionZh: "如何获得技术支持？",
      answerZh: "新威尔提供7×24小时全球技术支持。联系方式：info@batteryxlab.shop（全球/亚太），jason@batteryxlab.shop（北美），support@batteryxlab.shop（欧洲）。",
      questionVi: "Làm thế nào để nhận được hỗ trợ kỹ thuật?",
      answerVi: "NEWARE cung cấp hỗ trợ kỹ thuật toàn cầu 7×24h. Liên hệ: info@batteryxlab.shop (toàn cầu/Châu Á-Thái Bình Dương), jason@batteryxlab.shop (Bắc Mỹ), support@batteryxlab.shop (Châu Âu).",
    },
    {
      question: "Is software included? Are updates free?",
      answer: "Yes, NEWARE BTSDA software is included with all equipment purchases. Software updates are free for the lifetime of the equipment.",
      questionZh: "软件是否包含？更新免费吗？",
      answerZh: "是的，新威尔BTSDA软件随所有设备购买附带。设备使用寿命内软件更新免费。",
      questionVi: "Phần mềm có được bao gồm không? Các bản cập nhật có miễn phí không?",
      answerVi: "Có, phần mềm BTSDA của NEWARE được bao gồm với tất cả các gói mua thiết bị. Các bản cập nhật phần mềm miễn phí trong suốt vòng đời của thiết bị.",
    },
    {
      question: "Do you offer on-site training?",
      answer: "NEWARE offers on-site installation and training services. Remote training and video tutorials are also available.",
      questionZh: "你们提供现场培训吗？",
      answerZh: "新威尔提供现场安装和培训服务。远程培训和视频教程也可提供。",
      questionVi: "Bạn có cung cấp đào tạo tại chỗ không?",
      answerVi: "NEWARE cung cấp dịch vụ lắp đặt và đào tạo tại chỗ. Đào tạo từ xa và video hướng dẫn cũng có sẵn.",
    },
  ],
  dataMigration: [
    {
      question: "Can I migrate data from Arbin, Maccor, or BioLogic?",
      answer: "Yes. NEWARE provides free data migration support. Our engineers will convert your existing test data to NEWARE format, preserving all parameters and metadata.",
      questionZh: "可以从Arbin、Maccor或BioLogic迁移数据吗？",
      answerZh: "可以。新威尔提供免费数据迁移支持。我们的工程师会将您现有的测试数据转换为新威尔格式，保留所有参数和元数据。",
      questionVi: "Tôi có thể di chuyển dữ liệu từ Arbin, Maccor hoặc BioLogic không?",
      answerVi: "Có. NEWARE cung cấp hỗ trợ di chuyển dữ liệu miễn phí. Các kỹ sư của chúng tôi sẽ chuyển đổi dữ liệu thử nghiệm hiện có của bạn sang định dạng NEWARE, bảo toàn tất cả các tham số và siêu dữ liệu.",
    },
    {
      question: "What data formats does NEWARE support?",
      answer: "NEWARE BTSDA supports CSV, Excel, ASCII, and native format export. Data can be exported in any format required by your analysis tools.",
      questionZh: "新威尔支持哪些数据格式？",
      answerZh: "新威尔BTSDA支持CSV、Excel、ASCII和原生格式导出。数据可以按分析工具所需的任何格式导出。",
      questionVi: "NEWARE hỗ trợ những định dạng dữ liệu nào?",
      answerVi: "NEWARE BTSDA hỗ trợ xuất CSV, Excel, ASCII và định dạng gốc. Dữ liệu có thể được xuất ở bất kỳ định dạng nào mà công cụ phân tích của bạn yêu cầu.",
    },
    {
      question: "How do I export test data?",
      answer: "In BTSDA software, go to Data → Export. Select format (CSV/Excel/ASCII), date range, and channels. Export is available at any time during or after testing.",
      questionZh: "如何导出测试数据？",
      answerZh: "在BTSDA软件中，转到数据 → 导出。选择格式（CSV/Excel/ASCII）、日期范围和通道。测试期间或测试结束后随时可以导出。",
      questionVi: "Làm thế nào để xuất dữ liệu thử nghiệm?",
      answerVi: "Trong phần mềm BTSDA, vào Dữ liệu → Xuất. Chọn định dạng (CSV/Excel/ASCII), phạm vi ngày và kênh. Xuất có sẵn bất kỳ lúc nào trong hoặc sau khi thử nghiệm.",
    },
  ],
  pricingOrders: [
    {
      question: "How much does NEWARE equipment cost?",
      answer: "Prices vary by model and configuration. Contact our sales team for a detailed quote based on your requirements. Most configurations start from $8,000 USD.",
      questionZh: "新威尔设备的价格是多少？",
      answerZh: "价格因型号和配置而异。联系我们的销售团队获取基于您需求的详细报价。大多数配置起价为8,000美元。",
      questionVi: "Thiết bị NEWARE có giá bao nhiêu?",
      answerVi: "Giá thay đổi tùy theo model và cấu hình. Liên hệ đội ngũ bán hàng của chúng tôi để nhận báo giá chi tiết dựa trên yêu cầu của bạn. Hầu hết các cấu hình bắt đầu từ $8.000 USD.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "NEWARE accepts wire transfer (T/T), Letter of Credit (L/C), and PayPal for sample orders. Payment terms are negotiable for large orders.",
      questionZh: "你们接受哪些付款方式？",
      answerZh: "新威尔接受电汇（T/T）、信用证（L/C），样品订单接受PayPal。大额订单付款条款可协商。",
      questionVi: "Bạn chấp nhận những phương thức thanh toán nào?",
      answerVi: "NEWARE chấp nhận chuyển khoản (T/T), Thư tín dụng (L/C) và PayPal cho đơn đặt hàng mẫu. Điều khoản thanh toán có thể thương lượng cho các đơn hàng lớn.",
    },
    {
      question: "What is the warranty period?",
      answer: "NEWARE provides 12-month standard warranty. Extended warranty plans (2-year, 3-year) are available at additional cost.",
      questionZh: "保修期是多久？",
      answerZh: "新威尔提供12个月标准保修。可额外付费购买延长保修计划（2年、3年）。",
      questionVi: "Thời hạn bảo hành là bao lâu?",
      answerVi: "NEWARE cung cấp bảo hành tiêu chuẩn 12 tháng. Các gói bảo hành mở rộng (2 năm, 3 năm) có sẵn với chi phí bổ sung.",
    },
  ],
};

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getMessages();

  const isZh = locale === "zh";
  const isVi = locale === "vi";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...faqData.productSelection.map((item) => ({
        "@type": "Question",
        name: isZh ? item.questionZh : isVi ? item.questionVi : item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: isZh ? item.answerZh : isVi ? item.answerVi : item.answer,
        },
      })),
      ...faqData.technicalSupport.map((item) => ({
        "@type": "Question",
        name: isZh ? item.questionZh : isVi ? item.questionVi : item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: isZh ? item.answerZh : isVi ? item.answerVi : item.answer,
        },
      })),
      ...faqData.dataMigration.map((item) => ({
        "@type": "Question",
        name: isZh ? item.questionZh : isVi ? item.questionVi : item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: isZh ? item.answerZh : isVi ? item.answerVi : item.answer,
        },
      })),
      ...faqData.pricingOrders.map((item) => ({
        "@type": "Question",
        name: isZh ? item.questionZh : isVi ? item.questionVi : item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: isZh ? item.answerZh : isVi ? item.answerVi : item.answer,
        },
      })),
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-gradient-to-r from-primary via-primary to-primary-dark text-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {isZh ? "常见问题" : isVi ? "Câu hỏi thường gặp" : "Frequently Asked Questions"}
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {isZh
              ? "查找关于新威尔电池测试设备的常见问题答案"
              : isVi
              ? "Tìm câu trả lời cho các câu hỏi phổ biến về thiết bị kiểm tra pin NEWARE"
              : "Find answers to common questions about NEWARE battery testing equipment"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <FaqClient
          faqData={faqData}
          locale={locale}
        />

        <div className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {isZh ? "找不到您的答案？" : isVi ? "Không tìm thấy câu trả lời?" : "Can't find your answer?"}
          </h3>
          <p className="text-slate-600 mb-4">
            {isZh
              ? "我们的技术支持团队随时为您提供帮助"
              : isVi
              ? "Đội ngũ hỗ trợ kỹ thuật của chúng tôi luôn sẵn sàng giúp đỡ bạn"
              : "Our technical support team is ready to help you"}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            {isZh ? "提交问题" : isVi ? "Đặt câu hỏi" : "Ask a Question"}
          </a>
        </div>
      </div>
    </div>
  );
}
