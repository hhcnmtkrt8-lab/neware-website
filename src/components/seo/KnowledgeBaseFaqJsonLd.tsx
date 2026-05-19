"use client";

interface Props {
  locale: string;
}

interface FaqItem {
  q: string;
  qEn: string;
  qVi: string;
  a: string;
  aEn: string;
  aVi: string;
}

const faqs: Record<string, FaqItem[]> = {
  en: [
    { q: "How do I install BTSDA software?", qEn: "How do I install BTSDA software?", qVi: "Làm thế nào để cài đặt phần mềm BTSDA?", a: "Download BTSDA from our website, run the installer, and follow the on-screen instructions. The software requires Windows 10/11 and a valid license key.", aEn: "Download BTSDA from our website, run the installer, and follow the on-screen instructions. The software requires Windows 10/11 and a valid license key.", aVi: "Tải BTSDA từ trang web của chúng tôi, chạy trình cài đặt và làm theo hướng dẫn trên màn hình. Phần mềm yêu cầu Windows 10/11 và khóa cấp phép hợp lệ." },
    { q: "How do I export data to Excel?", qEn: "How do I export battery test data to Excel?", qVi: "Làm thế nào để xuất dữ liệu thử nghiệm pin ra Excel?", a: "In BTSDA, go to Data > Export, select Excel format (.xlsx), choose your channels and time range, then click Export. All data is saved with timestamps and channel metadata.", aEn: "In BTSDA, go to Data > Export, select Excel format (.xlsx), choose your channels and time range, then click Export. All data is saved with timestamps and channel metadata.", aVi: "Trong BTSDA, vào Data > Export, chọn định dạng Excel (.xlsx), chọn kênh và khoảng thời gian của bạn, sau đó nhấn Export. Tất cả dữ liệu được lưu với dấu thời gian và siêu dữ liệu kênh." },
    { q: "What is the warranty period?", qEn: "What is the warranty period for NEWARE equipment?", qVi: "Thời gian bảo hành cho thiết bị NEWARE là bao lâu?", a: "NEWARE provides a 2-year standard warranty with optional extension to 5 years. The warranty covers all hardware defects and includes free software updates throughout the warranty period.", aEn: "NEWARE provides a 2-year standard warranty with optional extension to 5 years. The warranty covers all hardware defects and includes free software updates throughout the warranty period.", aVi: "NEWARE cung cấp bảo hành tiêu chuẩn 2 năm với tùy chọn mở rộng lên 5 năm. Bảo hành bao gồm tất cả lỗi phần cứng và bao gồm cập nhật phần mềm miễn phí trong suốt thời gian bảo hành." },
    { q: "How do I measure DCIR?", qEn: "How do I measure DCIR with a NEWARE system?", qVi: "Làm thế nào để đo DCIR với hệ thống NEWARE?", a: "NEWARE BTS9000 supports HPPC (Hybrid Pulse Power Characterization) protocol for DCIR measurement. Configure the pulse parameters in BTSDA, apply the test profile, and the software will automatically calculate DCIR at each SOC point.", aEn: "NEWARE BTS9000 supports HPPC (Hybrid Pulse Power Characterization) protocol for DCIR measurement. Configure the pulse parameters in BTSDA, apply the test profile, and the software will automatically calculate DCIR at each SOC point.", aVi: "NEWARE BTS9000 hỗ trợ giao thức HPPC (Hybrid Pulse Power Characterization) để đo DCIR. Định cấu hình các thông số xung trong BTSDA, áp dụng hồ sơ thử nghiệm và phần mềm sẽ tự động tính toán DCIR tại mỗi điểm SOC." },
    { q: "How many channels can I network?", qEn: "How many channels can I network together?", qVi: "Tôi có thể kết nối mạng bao nhiêu kênh?", a: "NEWARE supports networking up to 384+ channels via LAN connection. Multiple mainframes can be connected to a single network switch and controlled through BTSDA as a unified system.", aEn: "NEWARE supports networking up to 384+ channels via LAN connection. Multiple mainframes can be connected to a single network switch and controlled through BTSDA as a unified system.", aVi: "NEWARE hỗ trợ kết nối mạng lên đến 384+ kênh qua kết nối LAN. Nhiều mainframe có thể được kết nối với một bộ chuyển mạch mạng duy nhất và được điều khiển thông qua BTSDA như một hệ thống thống nhất." },
  ],
  zh: [
    { q: "如何安装BTSDA软件？", qEn: "How do I install BTSDA software?", qVi: "Làm thế nào để cài đặt phần mềm BTSDA?", a: "从我们的网站下载BTSDA，运行安装程序，然后按照屏幕上的说明操作。软件需要Windows 10/11系统和有效的许可证密钥。", aEn: "Download BTSDA from our website, run the installer, and follow the on-screen instructions. The software requires Windows 10/11 and a valid license key.", aVi: "Tải BTSDA từ trang web của chúng tôi, chạy trình cài đặt và làm theo hướng dẫn trên màn hình. Phần mềm yêu cầu Windows 10/11 và khóa cấp phép hợp lệ." },
    { q: "如何将数据导出到Excel？", qEn: "How do I export battery test data to Excel?", qVi: "Làm thế nào để xuất dữ liệu thử nghiệm pin ra Excel?", a: "在BTSDA中，进入Data > Export，选择Excel格式(.xlsx)，选择您的通道和时间范围，然后点击Export。所有数据都带有时间戳和通道元数据保存。", aEn: "In BTSDA, go to Data > Export, select Excel format (.xlsx), choose your channels and time range, then click Export. All data is saved with timestamps and channel metadata.", aVi: "Trong BTSDA, vào Data > Export, chọn định dạng Excel (.xlsx), chọn kênh và khoảng thời gian của bạn, sau đó nhấn Export. Tất cả dữ liệu được lưu với dấu thời gian và siêu dữ liệu kênh." },
    { q: "NEWARE设备保修期是多久？", qEn: "What is the warranty period for NEWARE equipment?", qVi: "Thời gian bảo hành cho thiết bị NEWARE là bao lâu?", a: "NEWARE提供2年标准保修，可选延长至5年。保修涵盖所有硬件缺陷，并在整个保修期内包含免费软件更新。", aEn: "NEWARE provides a 2-year standard warranty with optional extension to 5 years. The warranty covers all hardware defects and includes free software updates throughout the warranty period.", aVi: "NEWARE cung cấp bảo hành tiêu chuẩn 2 năm với tùy chọn mở rộng lên 5 năm. Bảo hành bao gồm tất cả lỗi phần cứng và bao gồm cập nhật phần mềm miễn phí trong suốt thời gian bảo hành." },
    { q: "如何用NEWARE系统测量DCIR？", qEn: "How do I measure DCIR with a NEWARE system?", qVi: "Làm thế nào để đo DCIR với hệ thống NEWARE?", a: "NEWARE BTS9000支持HPPC（混合脉冲功率特性）协议进行DCIR测量。在BTSDA中配置脉冲参数，应用测试配置文件，软件将自动计算每个SOC点的DCIR。", aEn: "NEWARE BTS9000 supports HPPC (Hybrid Pulse Power Characterization) protocol for DCIR measurement. Configure the pulse parameters in BTSDA, apply the test profile, and the software will automatically calculate DCIR at each SOC point.", aVi: "NEWARE BTS9000 hỗ trợ giao thức HPPC (Hybrid Pulse Power Characterization) để đo DCIR. Định cấu hình các thông số xung trong BTSDA, áp dụng hồ sơ thử nghiệm và phần mềm sẽ tự động tính toán DCIR tại mỗi điểm SOC." },
    { q: "最多可以联网多少通道？", qEn: "How many channels can I network together?", qVi: "Tôi có thể kết nối mạng bao nhiêu kênh?", a: "NEWARE支持通过LAN连接联网最多384+个通道。多个主机可以连接到单个网络交换机，并通过BTSDA作为统一系统进行控制。", aEn: "NEWARE supports networking up to 384+ channels via LAN connection. Multiple mainframes can be connected to a single network switch and controlled through BTSDA as a unified system.", aVi: "NEWARE hỗ trợ kết nối mạng lên đến 384+ kênh qua kết nối LAN. Nhiều mainframe có thể được kết nối với một bộ chuyển mạch mạng duy nhất và được điều khiển thông qua BTSDA như một hệ thống thống nhất." },
  ],
  vi: [
    { q: "Làm thế nào để cài đặt phần mềm BTSDA?", qEn: "How do I install BTSDA software?", qVi: "Làm thế nào để cài đặt phần mềm BTSDA?", a: "Tải BTSDA từ trang web của chúng tôi, chạy trình cài đặt và làm theo hướng dẫn trên màn hình. Phần mềm yêu cầu Windows 10/11 và khóa cấp phép hợp lệ.", aEn: "Download BTSDA from our website, run the installer, and follow the on-screen instructions. The software requires Windows 10/11 and a valid license key.", aVi: "Tải BTSDA từ trang web của chúng tôi, chạy trình cài đặt và làm theo hướng dẫn trên màn hình. Phần mềm yêu cầu Windows 10/11 và khóa cấp phép hợp lệ." },
    { q: "Làm thế nào để xuất dữ liệu thử nghiệm pin ra Excel?", qEn: "How do I export battery test data to Excel?", qVi: "Làm thế nào để xuất dữ liệu thử nghiệm pin ra Excel?", a: "Trong BTSDA, vào Data > Export, chọn định dạng Excel (.xlsx), chọn kênh và khoảng thời gian của bạn, sau đó nhấn Export. Tất cả dữ liệu được lưu với dấu thời gian và siêu dữ liệu kênh.", aEn: "In BTSDA, go to Data > Export, select Excel format (.xlsx), choose your channels and time range, then click Export. All data is saved with timestamps and channel metadata.", aVi: "Trong BTSDA, vào Data > Export, chọn định dạng Excel (.xlsx), chọn kênh và khoảng thời gian của bạn, sau đó nhấn Export. Tất cả dữ liệu được lưu với dấu thời gian và siêu dữ liệu kênh." },
    { q: "Thời gian bảo hành cho thiết bị NEWARE là bao lâu?", qEn: "What is the warranty period for NEWARE equipment?", qVi: "Thời gian bảo hành cho thiết bị NEWARE là bao lâu?", a: "NEWARE cung cấp bảo hành tiêu chuẩn 2 năm với tùy chọn mở rộng lên 5 năm. Bảo hành bao gồm tất cả lỗi phần cứng và bao gồm cập nhật phần mềm miễn phí trong suốt thời gian bảo hành.", aEn: "NEWARE provides a 2-year standard warranty with optional extension to 5 years. The warranty covers all hardware defects and includes free software updates throughout the warranty period.", aVi: "NEWARE cung cấp bảo hành tiêu chuẩn 2 năm với tùy chọn mở rộng lên 5 năm. Bảo hành bao gồm tất cả lỗi phần cứng và bao gồm cập nhật phần mềm miễn phí trong suốt thời gian bảo hành." },
    { q: "Làm thế nào để đo DCIR với hệ thống NEWARE?", qEn: "How do I measure DCIR with a NEWARE system?", qVi: "Làm thế nào để đo DCIR với hệ thống NEWARE?", a: "NEWARE BTS9000 hỗ trợ giao thức HPPC (Hybrid Pulse Power Characterization) để đo DCIR. Định cấu hình các thông số xung trong BTSDA, áp dụng hồ sơ thử nghiệm và phần mềm sẽ tự động tính toán DCIR tại mỗi điểm SOC.", aEn: "NEWARE BTS9000 supports HPPC (Hybrid Pulse Power Characterization) protocol for DCIR measurement. Configure the pulse parameters in BTSDA, apply the test profile, and the software will automatically calculate DCIR at each SOC point.", aVi: "NEWARE BTS9000 hỗ trợ giao thức HPPC (Hybrid Pulse Power Characterization) để đo DCIR. Định cấu hình các thông số xung trong BTSDA, áp dụng hồ sơ thử nghiệm và phần mềm sẽ tự động tính toán DCIR tại mỗi điểm SOC." },
    { q: "Tôi có thể kết nối mạng bao nhiêu kênh?", qEn: "How many channels can I network together?", qVi: "Tôi có thể kết nối mạng bao nhiêu kênh?", a: "NEWARE hỗ trợ kết nối mạng lên đến 384+ kênh qua kết nối LAN. Nhiều mainframe có thể được kết nối với một bộ chuyển mạch mạng duy nhất và được điều khiển thông qua BTSDA như một hệ thống thống nhất.", aEn: "NEWARE supports networking up to 384+ channels via LAN connection. Multiple mainframes can be connected to a single network switch and controlled through BTSDA as a unified system.", aVi: "NEWARE hỗ trợ kết nối mạng lên đến 384+ kênh qua kết nối LAN. Nhiều mainframe có thể được kết nối với một bộ chuyển mạch mạng duy nhất và được điều khiển thông qua BTSDA như một hệ thống thống nhất." },
  ],
};

export function KnowledgeBaseFaqJsonLd({ locale }: Props) {
  const localeFaqs = faqs[locale] || faqs.en;
  const faqItems = localeFaqs.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a,
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": faqItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
