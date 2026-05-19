"use client";

import { useParams } from "next/navigation";

interface HowToStep {
  "@type": "HowToStep";
  name: string;
  text: string;
}

interface HowToGuide {
  "@type": "HowTo";
  name: string;
  description: string;
  step: HowToStep[];
}

// English HowTo guides
const howToGuidesEn: HowToGuide[] = [
  {
    "@type": "HowTo",
    name: "How to Choose the Right Battery Testing Equipment for Your Research",
    description: "A comprehensive guide to selecting the optimal battery testing equipment based on your research needs, accuracy requirements, and budget.",
    step: [
      {
        "@type": "HowToStep",
        name: "Define your accuracy requirements",
        text: "Determine the precision level you need. For cutting-edge R&D requiring DCIR measurement and pulse testing, look for 0.02% FS accuracy. For standard production testing, 0.05% FS is sufficient."
      },
      {
        "@type": "HowToStep",
        name: "Determine sampling rate needs",
        text: "If you need to capture fast electrochemical phenomena, choose equipment with 1000Hz or higher sampling. For standard cycling tests, 10Hz is adequate."
      },
      {
        "@type": "HowToStep",
        name: "Plan channel count and scalability",
        text: "Start with a system that supports your current needs but can scale. NEWARE systems support up to 96 channels per mainframe with networking capability for unlimited expansion."
      },
      {
        "@type": "HowToStep",
        name: "Evaluate software ecosystem",
        text: "Check if the software supports your test protocols, offers data export compatibility, and provides free lifetime updates. NEWARE BTSDA software includes all these benefits."
      },
      {
        "@type": "HowToStep",
        name: "Consider total cost of ownership",
        text: "Factor in energy costs for high-power testing. Systems with energy recovery like NEWARE CE-6000 can save 70%+ on electricity for production testing applications."
      }
    ]
  },
  {
    "@type": "HowTo",
    name: "How to Migrate Data from Arbin or Maccor to NEWARE",
    description: "Step-by-step guide to migrating your existing battery test data and equipment configuration to NEWARE systems.",
    step: [
      {
        "@type": "HowToStep",
        name: "Export your existing test data",
        text: "Export data from your current Arbin or Maccor system in CSV or native format. Our team can assist with format identification and export procedures."
      },
      {
        "@type": "HowToStep",
        name: "Contact NEWARE for data migration support",
        text: "Reach out to our technical team at info@batteryxlab.shop or use the contact form. NEWARE provides free data migration assistance for all equipment purchases."
      },
      {
        "@type": "HowToStep",
        name: "Data format conversion",
        text: "NEWARE engineers will convert your data to compatible format and import it into NEWARE BTSDA software, preserving all metadata and test parameters."
      },
      {
        "@type": "HowToStep",
        name: "Equipment setup and training",
        text: "NEWARE provides on-site or remote installation support and training. Most customers are operational within 1-2 days."
      }
    ]
  }
];

// Chinese HowTo guides
const howToGuidesZh: HowToGuide[] = [
  {
    "@type": "HowTo",
    name: "如何为您的研究选择合适的电池测试设备",
    description: "根据您的研究需求、精度要求和预算，选择最佳电池测试设备的综合指南。",
    step: [
      {
        "@type": "HowToStep",
        name: "确定精度要求",
        text: "确定您需要的精度水平。对于需要进行DCIR测量和脉冲测试的前沿研发，需要0.02% FS的精度。对于标准生产测试，0.05% FS即可满足要求。"
      },
      {
        "@type": "HowToStep",
        name: "确定采样率需求",
        text: "如果您需要捕捉快速电化学现象，请选择1000Hz或更高采样率的设备。对于标准循环测试，10Hz即可满足要求。"
      },
      {
        "@type": "HowToStep",
        name: "规划通道数量和可扩展性",
        text: "从满足您当前需求的系统开始，但也要考虑可扩展性。NEWARE系统每个主机最多支持96个通道，并具有网络功能，可无限扩展。"
      },
      {
        "@type": "HowToStep",
        name: "评估软件生态系统",
        text: "检查软件是否支持您的测试协议、提供数据导出兼容性，并提供终身免费更新。NEWARE BTSDA软件包含所有这些优势。"
      },
      {
        "@type": "HowToStep",
        name: "考虑总拥有成本",
        text: "考虑大功率测试的能源成本。具有能量回收功能的系统（如NEWARE CE-6000）可为生产测试应用节省70%以上的电费。"
      }
    ]
  },
  {
    "@type": "HowTo",
    name: "如何从Arbin或Maccor迁移数据到NEWARE",
    description: "将现有电池测试数据和设备配置迁移到NEWARE系统的分步指南。",
    step: [
      {
        "@type": "HowToStep",
        name: "导出现有测试数据",
        text: "以CSV或原生格式从您当前的Arbin或Maccor系统导出数据。我们的团队可以协助进行格式识别和导出程序。"
      },
      {
        "@type": "HowToStep",
        name: "联系NEWARE获取数据迁移支持",
        text: "通过info@batteryxlab.shop或联系表单联系我们的技术团队。NEWARE为所有设备购买提供免费数据迁移协助。"
      },
      {
        "@type": "HowToStep",
        name: "数据格式转换",
        text: "NEWARE工程师将把您的数据转换为兼容格式并导入NEWARE BTSDA软件，保留所有元数据和测试参数。"
      },
      {
        "@type": "HowToStep",
        name: "设备安装和培训",
        text: "NEWARE提供现场或远程安装支持和培训。大多数客户在1-2天内即可投入使用。"
      }
    ]
  }
];

// Vietnamese HowTo guides
const howToGuidesVi: HowToGuide[] = [
  {
    "@type": "HowTo",
    name: "Cách chọn thiết bị kiểm tra pin phù hợp cho nghiên cứu của bạn",
    description: "Hướng dẫn toàn diện để chọn thiết bị kiểm tra pin tối ưu dựa trên nhu cầu nghiên cứu, yêu cầu độ chính xác và ngân sách của bạn.",
    step: [
      {
        "@type": "HowToStep",
        name: "Xác định yêu cầu về độ chính xác",
        text: "Xác định mức độ chính xác bạn cần. Đối với R&D tiên tiến đòi hỏi đo DCIR và thử nghiệm xung, hãy tìm độ chính xác 0,02% FS. Đối với thử nghiệm sản xuất tiêu chuẩn, 0,05% FS là đủ."
      },
      {
        "@type": "HowToStep",
        name: "Xác định nhu cầu về tần số lấy mẫu",
        text: "Nếu bạn cần ghi lại các hiện tượng điện hóa nhanh, hãy chọn thiết bị có tần số lấy mẫu 1000Hz hoặc cao hơn. Đối với thử nghiệm chu kỳ tiêu chuẩn, 10Hz là phù hợp."
      },
      {
        "@type": "HowToStep",
        name: "Lên kế hoạch về số kênh và khả năng mở rộng",
        text: "Bắt đầu với hệ thống hỗ trợ nhu cầu hiện tại nhưng có thể mở rộng. Hệ thống NEWARE hỗ trợ tối đa 96 kênh mỗi bộ điều khiển chính với khả năng kết nối mạng để mở rộng không giới hạn."
      },
      {
        "@type": "HowToStep",
        name: "Đánh giá hệ sinh thái phần mềm",
        text: "Kiểm tra xem phần mềm có hỗ trợ các giao thức thử nghiệm của bạn, cung cấp khả năng xuất dữ liệu tương thích và cập nhật miễn phí trọn đời hay không. Phần mềm NEWARE BTSDA bao gồm tất cả các lợi ích này."
      },
      {
        "@type": "HowToStep",
        name: "Xem xét tổng chi phí sở hữu",
        text: "Tính đến chi phí năng lượng cho thử nghiệm công suất cao. Các hệ thống có khả năng phục hồi năng lượng như NEWARE CE-6000 có thể tiết kiệm hơn 70% chi phí điện cho các ứng dụng thử nghiệm sản xuất."
      }
    ]
  },
  {
    "@type": "HowTo",
    name: "Cách di chuyển dữ liệu từ Arbin hoặc Maccor sang NEWARE",
    description: "Hướng dẫn từng bước để di chuyển dữ liệu thử nghiệm pin hiện có và cấu hình thiết bị sang hệ thống NEWARE.",
    step: [
      {
        "@type": "HowToStep",
        name: "Xuất dữ liệu thử nghiệm hiện có của bạn",
        text: "Xuất dữ liệu từ hệ thống Arbin hoặc Maccor hiện tại của bạn ở định dạng CSV hoặc định dạng gốc. Đội ngũ của chúng tôi có thể hỗ trợ xác định định dạng và quy trình xuất."
      },
      {
        "@type": "HowToStep",
        name: "Liên hệ NEWARE để được hỗ trợ di chuyển dữ liệu",
        text: "Liên hệ với đội ngũ kỹ thuật qua info@batteryxlab.shop hoặc sử dụng biểu mẫu liên hệ. NEWARE cung cấp hỗ trợ di chuyển dữ liệu miễn phí cho tất cả các gói mua thiết bị."
      },
      {
        "@type": "HowToStep",
        name: "Chuyển đổi định dạng dữ liệu",
        text: "Các kỹ sư NEWARE sẽ chuyển đổi dữ liệu của bạn sang định dạng tương thích và nhập vào phần mềm NEWARE BTSDA, bảo toàn tất cả siêu dữ liệu và thông số thử nghiệm."
      },
      {
        "@type": "HowToStep",
        name: "Thiết lập thiết bị và đào tạo",
        text: "NEWARE cung cấp hỗ trợ cài đặt tại chỗ hoặc từ xa và đào tạo. Hầu hết khách hàng có thể vận hành trong vòng 1-2 ngày."
      }
    ]
  }
];

export function HowToJsonLd() {
  const params = useParams();
  const locale = (params.locale as string) || "en";

  // Select the appropriate language guides
  const guides = locale === "zh" ? howToGuidesZh : locale === "vi" ? howToGuidesVi : howToGuidesEn;

  return (
    <>
      {guides.map((guide, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              ...guide
            })
          }}
        />
      ))}
    </>
  );
}
