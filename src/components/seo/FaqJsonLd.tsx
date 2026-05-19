import { headers } from "next/headers";

export async function FaqJsonLd() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") as string) || "zh";

  const faqItems = locale === "zh" ? [
    // Category 1: Migration Questions
    {
      question: "我可以把Arbin或Maccor系统的数据迁移到NEWARE吗？",
      answer: "是的，新威尔提供完整的数据迁移支持服务。我们的技术团队可以处理Arbin、Maccor、BioLogic等主流品牌的数据格式转换，确保历史测试数据的完整保留和可追溯性。",
    },
    {
      question: "NEWARE提供免费数据迁移服务吗？",
      answer: "我们提供免费的数据迁移评估服务，根据数据量和复杂度提供详细的迁移方案。对于标准格式转换，新威尔可提供技术支持帮助您完成迁移。",
    },
    {
      question: "从Arbin迁移数据需要多长时间？",
      answer: "数据迁移时间取决于数据量和格式复杂度。一般情况下，标准格式的迁移可在1-2周内完成，复杂定制格式可能需要2-4周。我们会提供明确的时间表和进度更新。",
    },
    // Category 2: Pricing & Configuration
    {
      question: "NEWARE CT-4000系列的价格范围是多少？",
      answer: "CT-4000系列价格根据通道数量和电流量程而定，标准配置起始价约为人民币8-15万元。具体报价需根据测试需求、通道数量和精度要求定制方案。",
    },
    {
      question: "我可以从少量通道开始，以后再扩展吗？",
      answer: "当然可以！新威尔的设备采用模块化设计，支持从8通道起步并随时扩展至数百通道。软件授权按通道数计费，扩展时仅需追加硬件和授权费用。",
    },
    {
      question: "软件更新真的是终身免费的吗？",
      answer: "是的，BTSDA软件享受终身免费更新，包括功能升级、协议兼容和安全性补丁。这确保您的设备始终保持最新功能，无后顾之忧。",
    },
    // Category 3: Technical Specifications
    {
      question: "0.02%和0.05% FS精度之间有什么区别？",
      answer: "0.02% FS精度属于高精度级别，适合研发和材料分析；0.05% FS为标准工业精度，满足大多数生产测试需求。两者的差异主要体现在小电流测试和长期稳定性方面。",
    },
    {
      question: "我需要1000Hz采样率吗？",
      answer: "1000Hz采样率主要用于针刺、过充等动态测试场景捕捉瞬态反应。对于常规循环测试，10-100Hz已足够。建议根据实际测试需求选择，避免不必要的成本。",
    },
    {
      question: "有哪些电压和电流范围可选？",
      answer: "电压范围覆盖5V至1500V，电流量程从50μA到3000A不等。我们提供超过500个标准型号，并支持定制电流量程以满足特殊测试需求。",
    },
    {
      question: "NEWARE可以测试超级电容吗？",
      answer: "可以！新威尔设备支持超级电容测试，包括低内阻测量、快速充放电循环和容量特性分析。CE-6000系列的宽电压范围特别适合大容量超级电容测试。",
    },
    {
      question: "支持哪些电池化学体系？",
      answer: "新威尔支持锂离子、磷酸铁锂、三元材料、钛酸锂、钠离子、固态电池、铅酸、镍氢等多种化学体系。BTSDA软件内置常用测试协议并支持自定义。",
    },
    // Category 4: Software & Data
    {
      question: "BTSDA软件是否随设备附带？",
      answer: "是的，BTSDA软件免费随设备提供，包含完整的设备控制、数据采集和分析功能。无需额外付费即可使用所有标准功能。",
    },
    {
      question: "BTSDA支持哪些文件格式导出？",
      answer: "BTSDA支持CSV、Excel、ASCII等通用格式导出，同时支持专有格式以确保数据完整性。还可以直接生成测试报告和图表，满足文档归档需求。",
    },
    {
      question: "我可以在多台电脑上使用BTSDA吗？",
      answer: "软件授权绑定设备而非电脑数量。您可在任意电脑上安装BTSDA并连接同一设备使用。离线模式下软件也可正常运行，方便现场测试。",
    },
    // Category 5: Warranty & Support
    {
      question: "保修期是多久？",
      answer: "所有新威尔设备享有12个月标准质保，质保期内免费维修和更换零部件。另有延保服务可选，延长至2-3年，提供更长期限的保障。",
    },
    {
      question: "我的国家有技术支持吗？",
      answer: "新威尔在全球设有多个技术服务中心，包括北美、欧洲、东南亚等地区。我们提供7×24小时远程技术支持，承诺工作时间内4小时响应。",
    },
    {
      question: "你们提供现场培训吗？",
      answer: "是的，我们提供专业的现场培训服务，涵盖设备操作、软件使用和数据分析。培训时长通常为1-3天，确保您的团队能够独立操作和维护设备。",
    },
    // Category 6: Energy Recovery
    {
      question: "使用CE-6000能量回收可以节省多少？",
      answer: "CE-6000 IGBT系列在大功率动力电池测试中可回收超过70%的放电能量。对于100kW级别的测试设备，每年可节省电费数万至数十万元不等。",
    },
    {
      question: "CE-6000的投资回报周期是多久？",
      answer: "根据测试功率和使用频率的不同，CE-6000能量回收系统的投资回报周期通常为1-3年。高频使用的场景下，回报周期可缩短至12个月以内。",
    },
    {
      question: "能量回收适用于所有电池类型吗？",
      answer: "能量回收功能适用于大多数可充电电池测试，包括动力电池和储能电池。对于需要深度放电的特殊测试，建议咨询技术团队确认适用性。",
    },
  ] : locale === "vi" ? [
    // Category 1: Migration Questions
    {
      question: "Tôi có thể di chuyển dữ liệu từ hệ thống Arbin hoặc Maccor sang NEWARE không?",
      answer: "Có, NEWARE cung cấp hỗ trợ di chuyển dữ liệu đầy đủ. Đội ngũ kỹ thuật của chúng tôi có thể xử lý chuyển đổi định dạng từ các thương hiệu phổ biến như Arbin, Maccor, BioLogic.",
    },
    {
      question: "NEWARE có cung cấp dịch vụ di chuyển dữ liệu miễn phí không?",
      answer: "Chúng tôi cung cấp đánh giá di chuyển miễn phí. Với các chuyển đổi định dạng tiêu chuẩn, NEWARE có thể hỗ trợ kỹ thuật để hoàn thành việc di chuyển.",
    },
    {
      question: "Việc di chuyển dữ liệu từ Arbin mất bao lâu?",
      answer: "Thời gian di chuyển phụ thuộc vào lượng dữ liệu và độ phức tạp. Thông thường, di chuyển định dạng tiêu chuẩn hoàn thành trong 1-2 tuần, định dạng phức tạp có thể 2-4 tuần.",
    },
    // Category 2: Pricing & Configuration
    {
      question: "Phạm vi giá cho dòng NEWARE CT-4000 là bao nhiêu?",
      answer: "Giá dòng CT-4000 tùy thuộc vào số kênh và dải dòng điện, bắt đầu từ khoảng 8-15 triệu NDT cho cấu hình tiêu chuẩn. Báo giá cụ thể theo nhu cầu thử nghiệm.",
    },
    {
      question: "Tôi có thể bắt đầu với số kênh nhỏ và mở rộng sau không?",
      answer: "Hoàn toàn có thể! Thiết bị NEWARE thiết kế theo module, hỗ trợ bắt đầu từ 8 kênh và mở rộng lên hàng trăm kênh khi cần.",
    },
    {
      question: "Cập nhật phần mềm thực sự miễn phí trọn đời chứ?",
      answer: "Đúng vậy! Phần mềm BTSDA được cập nhật miễn phí trọn đời, bao gồm nâng cấp tính năng, tương thích giao thức và bản sửa lỗi bảo mật.",
    },
    // Category 3: Technical Specifications
    {
      question: "Sự khác biệt giữa độ chính xác 0,02% và 0,05% FS là gì?",
      answer: "Độ chính xác 0,02% FS là cấp cao, phù hợp với R&D và phân tích vật liệu. Cấp 0,05% FS là tiêu chuẩn công nghiệp, đáp ứng hầu hết nhu cầu thử nghiệm sản xuất.",
    },
    {
      question: "Tôi có cần tốc độ lấy mẫu 1000Hz không?",
      answer: "Tốc độ 1000Hz chủ yếu dùng cho thử nghiệm động như xuyên kim, quá tải để bắt phản ứng thoáng qua. Với thử nghiệm chu kỳ thông thường, 10-100Hz là đủ.",
    },
    {
      question: "Những phạm vi điện áp và dòng điện nào có sẵn?",
      answer: "Điện áp từ 5V đến 1500V, dòng điện từ 50μA đến 3000A. Chúng tôi cung cấp hơn 500 model tiêu chuẩn và hỗ trợ dải dòng tùy chỉnh.",
    },
    {
      question: "NEWARE có thể thử nghiệm siêu tụ điện không?",
      answer: "Có! Thiết bị NEWARE hỗ trợ thử nghiệm siêu tụ điện, bao gồm đo ESR thấp, chu kỳ sạc-xả nhanh và phân tích đặc tính dung lượng.",
    },
    {
      question: "Những hóa học pin nào được hỗ trợ?",
      answer: "NEWARE hỗ trợ nhiều hóa học: Li-ion, LFP, NMC, LTO, sodium-ion, pin rắn, chì-axit, Ni-MH. Phần mềm BTSDA có sẵn các giao thức thử nghiệm phổ biến.",
    },
    // Category 4: Software & Data
    {
      question: "Phần mềm BTSDA có được bao gồm với thiết bị không?",
      answer: "Có, phần mềm BTSDA được cung cấp miễn phí cùng thiết bị, bao gồm điều khiển thiết bị, thu thập dữ liệu và phân tích đầy đủ.",
    },
    {
      question: "BTSDA hỗ trợ những định dạng tệp nào để xuất?",
      answer: "BTSDA hỗ trợ xuất CSV, Excel, ASCII và định dạng độc quyền để đảm bảo toàn vẹn dữ liệu. Có thể tạo báo cáo và biểu đồ thử nghiệm trực tiếp.",
    },
    {
      question: "Tôi có thể sử dụng BTSDA trên nhiều máy tính không?",
      answer: "Giấy phép phần mềm gắn với thiết bị, không phải máy tính. Bạn có thể cài đặt BTSDA trên nhiều máy và kết nối cùng một thiết bị.",
    },
    // Category 5: Warranty & Support
    {
      question: "Thời gian bảo hành là bao lâu?",
      answer: "Tất cả thiết bị NEWARE có bảo hành tiêu chuẩn 12 tháng, sửa chữa và thay thế linh kiện miễn phí. Có dịch vụ bảo hành mở rộng 2-3 năm.",
    },
    {
      question: "Hỗ trợ kỹ thuật có sẵn ở quốc gia của tôi không?",
      answer: "NEWARE có các trung tâm kỹ thuật toàn cầu tại Bắc Mỹ, Châu Âu, Đông Nam Á. Hỗ trợ từ xa 7×24 giờ với phản hồi trong 4 giờ trong giờ làm việc.",
    },
    {
      question: "Bạn có cung cấp đào tạo tại chỗ không?",
      answer: "Có, chúng tôi cung cấp đào tạo tại chỗ chuyên nghiệp bao gồm vận hành thiết bị, sử dụng phần mềm và phân tích dữ liệu. Thời gian đào tạo 1-3 ngày.",
    },
    // Category 6: Energy Recovery
    {
      question: "Tôi có thể tiết kiệm bao nhiêu với thu hồi năng lượng CE-6000?",
      answer: "Dòng CE-6000 IGBT có thể thu hồi hơn 70% năng lượng xả trong thử nghiệm pin EV công suất cao. Với thiết bị 100kW, tiết kiệm hàng năm từ hàng chục đến hàng trăm nghìn NDT.",
    },
    {
      question: "Thời gian hoàn vốn cho CE-6000 là bao lâu?",
      answer: "Tùy thuộc vào công suất thử nghiệm và tần suất sử dụng, thời gian hoàn vốn thường 1-3 năm. Với tần suất cao, có thể rút ngắn xuống dưới 12 tháng.",
    },
    {
      question: "Thu hồi năng lượng có hoạt động với tất cả các loại pin không?",
      answer: "Chức năng thu hồi năng lượng phù hợp với hầu hết pin sạc, bao gồm pin EV và pin lưu trữ. Với thử nghiệm xả sâu đặc biệt, hãy tham khảo đội ngũ kỹ thuật.",
    },
  ] : [
    // Category 1: Migration Questions
    {
      question: "Can I migrate data from Arbin or Maccor systems to NEWARE?",
      answer: "Yes, NEWARE provides complete data migration support. Our technical team can handle format conversions from major brands like Arbin, Maccor, and BioLogic, ensuring complete preservation of historical test data.",
    },
    {
      question: "Does NEWARE offer free data migration services?",
      answer: "We offer free data migration assessment services. For standard format conversions, NEWARE provides technical support to help you complete the migration smoothly.",
    },
    {
      question: "How long does data migration from Arbin take?",
      answer: "Migration time depends on data volume and format complexity. Standard format migrations typically complete in 1-2 weeks, while complex custom formats may take 2-4 weeks.",
    },
    // Category 2: Pricing & Configuration
    {
      question: "What is the price range for NEWARE CT-4000 series?",
      answer: "CT-4000 series pricing varies by channel count and current range. Standard configurations start at approximately USD 11,000-21,000. Specific quotes are provided based on your testing requirements.",
    },
    {
      question: "Can I start with a small number of channels and expand later?",
      answer: "Absolutely! NEWARE equipment uses modular design, supporting starts from 8 channels with expansion to hundreds of channels. Software licensing is per-channel, so you only pay for what you need.",
    },
    {
      question: "Are software updates really free for life?",
      answer: "Yes, BTSDA software includes lifetime free updates including feature upgrades, protocol compatibility, and security patches. This ensures your equipment stays current with no hidden costs.",
    },
    // Category 3: Technical Specifications
    {
      question: "What is the difference between 0.02% and 0.05% FS accuracy?",
      answer: "0.02% FS accuracy is high-precision grade, suitable for R&D and material analysis. 0.05% FS is standard industrial accuracy, meeting most production testing requirements with excellent value.",
    },
    {
      question: "Do I need 1000Hz sampling rate?",
      answer: "1000Hz sampling is mainly for dynamic tests like nail penetration and overcharge to capture transient reactions. For routine cycling tests, 10-100Hz is sufficient. Choose based on actual needs to avoid unnecessary costs.",
    },
    {
      question: "What voltage and current ranges are available?",
      answer: "Voltage ranges from 5V to 1500V, with current ranges from 50μA to 3000A. We offer 500+ standard models and custom current ranges for special testing requirements.",
    },
    {
      question: "Can NEWARE test supercapacitors?",
      answer: "Yes! NEWARE equipment supports supercapacitor testing including low ESR measurement, fast charge-discharge cycling, and capacitance characteristic analysis.",
    },
    {
      question: "What battery chemistries are supported?",
      answer: "NEWARE supports Li-ion, LFP, NMC, LTO, sodium-ion, solid-state, lead-acid, Ni-MH and more. BTSDA software includes common test protocols with custom protocol support.",
    },
    // Category 4: Software & Data
    {
      question: "Is BTSDA software included with the equipment?",
      answer: "Yes, BTSDA software comes free with equipment, including complete device control, data acquisition, and analysis capabilities. No additional purchase required for standard features.",
    },
    {
      question: "What file formats does BTSDA export?",
      answer: "BTSDA supports CSV, Excel, ASCII exports plus proprietary format for data integrity. You can also generate test reports and charts directly for documentation needs.",
    },
    {
      question: "Can I use BTSDA on multiple computers?",
      answer: "Software licenses are tied to the equipment, not computers. You can install BTSDA on any computer and connect to the same device. Offline mode works normally for field testing.",
    },
    // Category 5: Warranty & Support
    {
      question: "What is the warranty period?",
      answer: "All NEWARE equipment includes 12-month standard warranty with free repairs and parts replacement. Extended warranty options are available for 2-3 years of additional coverage.",
    },
    {
      question: "Is technical support available in my country?",
      answer: "NEWARE has global technical service centers including North America, Europe, and Southeast Asia. We provide 7×24 remote technical support with 4-hour response commitment during business hours.",
    },
    {
      question: "Do you offer on-site training?",
      answer: "Yes, we provide professional on-site training covering equipment operation, software usage, and data analysis. Training typically lasts 1-3 days to ensure your team can operate independently.",
    },
    // Category 6: Energy Recovery
    {
      question: "How much can I save with CE-6000 energy recovery?",
      answer: "CE-6000 IGBT series can recover over 70% of discharge energy in high-power EV battery testing. For 100kW-level equipment, annual savings can reach tens of thousands of dollars depending on usage.",
    },
    {
      question: "What is the ROI period for CE-6000?",
      answer: "Depending on test power and usage frequency, CE-6000 energy recovery ROI typically ranges from 1-3 years. High-frequency usage scenarios can achieve payback in under 12 months.",
    },
    {
      question: "Does energy recovery work with all battery types?",
      answer: "Energy recovery applies to most rechargeable battery tests including power and storage batteries. For special deep-discharge tests, we recommend consulting our technical team for compatibility confirmation.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
