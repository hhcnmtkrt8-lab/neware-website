export interface CaseStudy {
  id: string;
  company: string;
  companyEn: string;
  companyZh: string;
  companyVi: string;
  companyDescription: string;
  companyDescriptionEn: string;
  companyDescriptionZh: string;
  companyDescriptionVi: string;
  industry: string;
  industryEn: string;
  industryZh: string;
  industryVi: string;
  location: string;
  challenge: string;
  challengeEn: string;
  challengeZh: string;
  challengeVi: string;
  solution: string;
  solutionEn: string;
  solutionZh: string;
  solutionVi: string;
  results: string[];
  resultsEn: string[];
  resultsZh: string[];
  resultsVi: string[];
  productsUsed: string[];
  testimonial?: {
    name: string;
    nameEn: string;
    nameZh: string;
    nameVi: string;
    title: string;
    titleEn: string;
    titleZh: string;
    titleVi: string;
    quote: string;
    quoteEn: string;
    quoteZh: string;
    quoteVi: string;
  };
  logoColor: string;
  featured: boolean;
  date: string;
  dateEn: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "tesla-battery-lab",
    company: "Tesla Battery Lab",
    companyEn: "Tesla Battery Lab",
    companyZh: "特斯拉电池实验室",
    companyVi: "Phòng Thí Nghiệm Pin Tesla",
    companyDescription: "Tesla's Fremont, California facility houses one of the most advanced EV battery testing laboratories in North America, supporting the development of next-generation battery technology for Tesla vehicles worldwide.",
    companyDescriptionEn: "Tesla's Fremont, California facility houses one of the most advanced EV battery testing laboratories in North America, supporting the development of next-generation battery technology for Tesla vehicles worldwide.",
    companyDescriptionZh: "特斯拉位于加州弗里蒙特的设施拥有北美最先进的电动汽车电池测试实验室之一，支持为全球特斯拉汽车开发下一代电池技术。",
    companyDescriptionVi: "Cơ sở Tesla tại Fremont, California là một trong những phòng thí nghiệm thử nghiệm pin EV tiên tiến nhất ở Bắc Mỹ, hỗ trợ việc phát triển công nghệ pin thế hệ tiếp theo cho xe Tesla trên toàn thế giới.",
    industry: "ev",
    industryEn: "Electric Vehicles",
    industryZh: "电动汽车",
    industryVi: "Xe Điện",
    location: "Fremont, California, USA",
    challenge: "Tesla's R&D team required high-speed pulse testing capability at 1000Hz sampling to characterize battery behavior during aggressive regenerative braking and fast acceleration scenarios. Existing equipment limited their ability to capture millisecond-scale voltage transients critical for BMS algorithm development.",
    challengeEn: "Tesla's R&D team required high-speed pulse testing capability at 1000Hz sampling to characterize battery behavior during aggressive regenerative braking and fast acceleration scenarios. Existing equipment limited their ability to capture millisecond-scale voltage transients critical for BMS algorithm development.",
    challengeZh: "特斯拉研发团队需要1000Hz采样高速脉冲测试能力，以表征电池在激进再生制动和快速加速场景下的行为。现有设备限制了他们捕捉对BMS算法开发至关重要毫秒级电压瞬态的能力。",
    challengeVi: "Đội ngũ R&D của Tesla cần khả năng thử nghiệm xung tốc độ cao ở tốc độ lấy mẫu 1000Hz để đặc tính hành vi pin trong các kịch bản phanh tái sinh mạnh mẽ và tăng tốc nhanh. Thiết bị hiện có giới hạn khả năng nắm bắt các điện áp thoáng qua ở thang mili-giây rất quan trọng cho việc phát triển thuật toán BMS.",
    solution: "NEWARE deployed a BTS9000 system with 256 independent channels, each capable of 1000Hz sampling. The distributed channel architecture eliminated cross-talk during simultaneous HPPC testing, while the BTSDA software's advanced profile editor enabled complex drive cycle simulations combining pulse sequences with variable current profiles.",
    solutionEn: "NEWARE deployed a BTS9000 system with 256 independent channels, each capable of 1000Hz sampling. The distributed channel architecture eliminated cross-talk during simultaneous HPPC testing, while the BTSDA software's advanced profile editor enabled complex drive cycle simulations combining pulse sequences with variable current profiles.",
    solutionZh: "新威尔部署了具有256个独立通道的BTS9000系统，每个通道都能以1000Hz采样。分布式通道架构消除了同时HPPC测试期间的串扰，而BTSDA软件的高级配置文件编辑器支持结合脉冲序列与可变电流配置文件的复杂驾驶循环模拟。",
    solutionVi: "NEWARE triển khai hệ thống BTS9000 với 256 kênh độc lập, mỗi kênh có khả năng lấy mẫu 1000Hz. Kiến trúc kênh phân tán loại bỏ can nhiễu chéo trong quá trình thử nghiệm HPPC đồng thời, trong khi trình chỉnh sửa hồ sơ nâng cao của phần mềm BTSDA cho phép các mô phỏng chu kỳ lái phức tạp kết hợp các chuỗi xung với các hồ sơ dòng biến.",
    results: [
      "3x improvement in data resolution for pulse characterization",
      "50% faster R&D cycle through simultaneous multi-channel testing",
      "Successful capture of millisecond-scale voltage transients previously invisible",
      "Reduced BMS development timeline by 6 months",
      "Published 12 peer-reviewed papers using NEWARE-generated data",
    ],
    resultsEn: [
      "3x improvement in data resolution for pulse characterization",
      "50% faster R&D cycle through simultaneous multi-channel testing",
      "Successful capture of millisecond-scale voltage transients previously invisible",
      "Reduced BMS development timeline by 6 months",
      "Published 12 peer-reviewed papers using NEWARE-generated data",
    ],
    resultsZh: [
      "脉冲表征数据分辨率提升3倍",
      "通过同时多通道测试，研发周期缩短50%",
      "成功捕捉之前不可见的毫秒级电压瞬态",
      "BMS开发时间线缩短6个月",
      "使用新威尔生成的数据发表12篇同行评审论文",
    ],
    resultsVi: [
      "Cải thiện 3 lần độ phân giải dữ liệu cho đặc tính xung",
      "Chu kỳ R&D nhanh hơn 50% thông qua thử nghiệm đa kênh đồng thời",
      "Thành công nắm bắt các điện áp thoáng qua ở thang mili-giây trước đây không nhìn thấy",
      "Giảm 6 tháng thời gian phát triển BMS",
      "Đã xuất bản 12 bài báo đồng nghiệp sử dụng dữ liệu từ NEWARE",
    ],
    productsUsed: ["BTS9000-5V100A"],
    testimonial: {
      name: "Dr. Sarah Chen",
      nameEn: "Dr. Sarah Chen",
      nameZh: "陈博士",
      nameVi: "Tiến sĩ Sarah Chen",
      title: "Senior Battery Research Engineer",
      titleEn: "Senior Battery Research Engineer",
      titleZh: "高级电池研究工程师",
      titleVi: "Kỹ Sư Nghiên Cứu Pin Cao Cấp",
      quote: "The 1000Hz sampling capability was a game-changer for our pulse testing program. We can now see dynamics in battery behavior that were simply invisible with our previous equipment.",
      quoteEn: "The 1000Hz sampling capability was a game-changer for our pulse testing program. We can now see dynamics in battery behavior that were simply invisible with our previous equipment.",
      quoteZh: "1000Hz采样能力对我们的脉冲测试计划来说是改变游戏规则的因素。我们现在可以看到以前设备完全看不到的电池行为动态。",
      quoteVi: "Khả năng lấy mẫu 1000Hz là một yếu tố thay đổi cuộc chơi cho chương trình thử nghiệm xung của chúng tôi. Bây giờ chúng tôi có thể thấy động lực trong hành vi pin mà thiết bị trước đây hoàn toàn không nhìn thấy được.",
    },
    logoColor: "#E31937",
    featured: true,
    date: "2025-06-15",
    dateEn: "June 15, 2025",
  },
  {
    id: "rwth-aachen-university",
    company: "RWTH Aachen University",
    companyEn: "RWTH Aachen University",
    companyZh: "亚琛工业大学",
    companyVi: "Đại Học RWTH Aachen",
    companyDescription: "One of Germany's leading technical universities, RWTH Aachen houses the Institute for Power Electronics and Electrical Drives (IFEA), a world-renowned battery research center with over 200 researchers focused on next-generation energy storage technology.",
    companyDescriptionEn: "One of Germany's leading technical universities, RWTH Aachen houses the Institute for Power Electronics and Electrical Drives (IFEA), a world-renowned battery research center with over 200 researchers focused on next-generation energy storage technology.",
    companyDescriptionZh: "亚琛工业大学是德国领先的技术大学之一，拥有电力电子与电气驱动研究所（IFEA），这是一个世界著名的电池研究中心，拥有超过200名研究人员专注于下一代储能技术。",
    companyDescriptionVi: "Một trong những trường đại học kỹ thuật hàng đầu của Đức, RWTH Aachen chứa Viện Điện Tử Công Suất và Truyền Động Điện (IFEA), một trung tâm nghiên cứu pin nổi tiếng thế giới với hơn 200 nhà nghiên cứu tập trung vào công nghệ lưu trữ năng lượng thế hệ tiếp theo.",
    industry: "academic",
    industryEn: "Academic Research",
    industryZh: "学术研究",
    industryVi: "Nghiên Cứu Học Thuật",
    location: "Aachen, Germany",
    challenge: "The university needed reliable equipment capable of continuous operation for 5+ year long-term cycling studies while supporting a multi-user academic environment with over 50 concurrent researchers. Previous equipment suffered from drift and failures that invalidated years of accumulated data.",
    challengeEn: "The university needed reliable equipment capable of continuous operation for 5+ year long-term cycling studies while supporting a multi-user academic environment with over 50 concurrent researchers. Previous equipment suffered from drift and failures that invalidated years of accumulated data.",
    challengeZh: "该大学需要能够连续运行5+年长期循环研究的可靠设备，同时支持拥有超过50名并发研究人员的多元学术环境。以前设备存在漂移和故障问题，使多年积累的数据失效。",
    challengeVi: "Trường đại học cần thiết bị có khả năng vận hành liên tục trong 5+ năm cho các nghiên cứu tuổi thọ chu kỳ dài trong khi hỗ trợ môi trường học thuật đa người dùng với hơn 50 nhà nghiên cứu đồng thời. Thiết bị trước đây gặp sự trôi dạt và lỗi làm mất hiệu lực dữ liệu tích lũy trong nhiều năm.",
    solution: "NEWARE installed CT-4000 series systems across 4 laboratory rooms, totaling 512 channels. The modular architecture allowed gradual expansion as the research program grew, while the multi-user BTSDA software with role-based access control enabled secure concurrent use by multiple research groups.",
    solutionEn: "NEWARE installed CT-4000 series systems across 4 laboratory rooms, totaling 512 channels. The modular architecture allowed gradual expansion as the research program grew, while the multi-user BTSDA software with role-based access control enabled secure concurrent use by multiple research groups.",
    solutionZh: "新威尔在4个实验室安装了CT-4000系列系统，共512个通道。模块化架构允许研究项目增长时逐步扩展，而具有基于角色访问控制的多用户BTSDA软件支持多个研究小组安全并发使用。",
    solutionVi: "NEWARE lắp đặt các hệ thống dòng CT-4000 trên 4 phòng thí nghiệm, tổng cộng 512 kênh. Kiến trúc mô-đun cho phép mở rộng dần khi chương trình nghiên cứu phát triển, trong khi phần mềm BTSDA đa người dùng với kiểm soát truy cập dựa trên vai trò cho phép sử dụng đồng thời an toàn bởi nhiều nhóm nghiên cứu.",
    results: [
      "5+ years of continuous operation without significant downtime",
      "200+ peer-reviewed publications using NEWARE-generated data",
      "50+ doctoral dissertations completed using CT-4000 data",
      "Zero data loss due to equipment failures over 5 years",
      "Modular expansion from 128 to 512 channels as research grew",
      "Students trained on industry-standard BTSDA software",
    ],
    resultsEn: [
      "5+ years of continuous operation without significant downtime",
      "200+ peer-reviewed publications using NEWARE-generated data",
      "50+ doctoral dissertations completed using CT-4000 data",
      "Zero data loss due to equipment failures over 5 years",
      "Modular expansion from 128 to 512 channels as research grew",
      "Students trained on industry-standard BTSDA software",
    ],
    resultsZh: [
      "5+年连续运行，无重大停机",
      "200+篇使用新威尔生成数据的同行评审出版物",
      "50+篇使用CT-4000数据完成的博士论文",
      "5年内因设备故障导致的零数据丢失",
      "随着研究增长，从128通道模块化扩展至512通道",
      "学生在行业标准BTSDA软件上接受培训",
    ],
    resultsVi: [
      "5+ năm vận hành liên tục không có thời gian ngừng đáng kể",
      "200+ ấn phẩm đồng nghiệp sử dụng dữ liệu từ NEWARE",
      "50+ luận án tiến sĩ hoàn thành sử dụng dữ liệu CT-4000",
      "Không mất dữ liệu do lỗi thiết bị trong 5 năm",
      "Mở rộng mô-đun từ 128 lên 512 kênh khi nghiên cứu phát triển",
      "Sinh viên được đào tạo trên phần mềm BTSDA tiêu chuẩn ngành",
    ],
    productsUsed: ["CT-4008Q-5V50A"],
    testimonial: {
      name: "Prof. Klaus Weber",
      nameEn: "Prof. Klaus Weber",
      nameZh: "克劳斯·韦伯教授",
      nameVi: "Giáo sư Klaus Weber",
      title: "Director, IFEA Battery Research Center",
      titleEn: "Director, IFEA Battery Research Center",
      titleZh: "IFEA电池研究中心主任",
      titleVi: "Giám đốc, Trung Tâm Nghiên Cứu Pin IFEA",
      quote: "NEWARE equipment has been the backbone of our battery research program for over five years. The reliability and accuracy have enabled us to build longitudinal datasets that simply weren't possible with our previous equipment.",
      quoteEn: "NEWARE equipment has been the backbone of our battery research program for over five years. The reliability and accuracy have enabled us to build longitudinal datasets that simply weren't possible with our previous equipment.",
      quoteZh: "新威尔设备五年来一直是我们电池研究项目的支柱。可靠性和精度使我们能够建立以前设备根本无法实现的纵向数据集。",
      quoteVi: "Thiết bị NEWARE đã là trụ cột của chương trình nghiên cứu pin của chúng tôi trong hơn năm năm. Độ tin cậy và độ chính xác đã cho phép chúng tôi xây dựng các bộ dữ liệu dọc mà thiết bị trước đây đơn giản là không thể.",
    },
    logoColor: "#0055A5",
    featured: true,
    date: "2025-08-22",
    dateEn: "August 22, 2025",
  },
  {
    id: "samsung-sdi",
    company: "Samsung SDI",
    companyEn: "Samsung SDI",
    companyZh: "三星SDI",
    companyVi: "Samsung SDI",
    companyDescription: "Samsung SDI is a global leader in battery manufacturing, producing cells for electric vehicles, energy storage systems, and consumer electronics. The company's R&D center in Seoul develops next-generation battery technologies for global automotive OEM partners.",
    companyDescriptionEn: "Samsung SDI is a global leader in battery manufacturing, producing cells for electric vehicles, energy storage systems, and consumer electronics. The company's R&D center in Seoul develops next-generation battery technologies for global automotive OEM partners.",
    companyDescriptionZh: "三星SDI是全球领先的电池制造商，为电动汽车、储能和消费电子产品生产电芯。公司位于首尔的研发中心为全球汽车OEM合作伙伴开发下一代电池技术。",
    companyDescriptionVi: "Samsung SDI là nhà lãnh đạo toàn cầu trong sản xuất pin, sản xuất pin cho xe điện, hệ thống lưu trữ năng lượng và điện tử tiêu dùng. Trung tâm R&D của công ty tại Seoul phát triển công nghệ pin thế hệ tiếp theo cho các đối tác OEM ô tô toàn cầu.",
    industry: "manufacturing",
    industryEn: "Battery Manufacturing",
    industryZh: "电池制造",
    industryVi: "Sản Xuất Pin",
    location: "Seoul, South Korea",
    challenge: "Samsung SDI's high-volume formation lines required both high throughput and energy efficiency to remain competitive. Rising electricity costs and ambitious sustainability targets drove the need for energy recovery technology, while production volume required systems supporting 500+ channels per formation area.",
    challengeEn: "Samsung SDI's high-volume formation lines required both high throughput and energy efficiency to remain competitive. Rising electricity costs and ambitious sustainability targets drove the need for energy recovery technology, while production volume required systems supporting 500+ channels per formation area.",
    challengeZh: "三星SDI的大规模化成生产线需要高吞吐量和高能效以保持竞争力。不断上涨的电费和雄心勃勃的可持续发展目标推动了对能量回收技术的需求，而生产量要求每个化成区域支持500+通道的系统。",
    challengeVi: "Các dây chuyền tạo hình khối lượng cao của Samsung SDI đòi hỏi cả thông lượng cao và hiệu quả năng lượng để duy trì tính cạnh tranh. Chi phí điện tăng và các mục tiêu bền vững tham vọng thúc đẩy nhu cầu về công nghệ thu hồi năng lượng, trong khi khối lượng sản xuất yêu cầu các hệ thống hỗ trợ 500+ kênh cho mỗi khu vực tạo hình.",
    solution: "NEWARE deployed CE-6000 IGBT series systems with 70%+ energy recovery across Samsung SDI's formation facility. The networked architecture allowed centralized control of 600+ channels from a single operator station, while BTSDA integration with Samsung SDI's MES system enabled automated recipe management and production tracking.",
    solutionEn: "NEWARE deployed CE-6000 IGBT series systems with 70%+ energy recovery across Samsung SDI's formation facility. The networked architecture allowed centralized control of 600+ channels from a single operator station, while BTSDA integration with Samsung SDI's MES system enabled automated recipe management and production tracking.",
    solutionZh: "新威尔在三星SDI的化成设施部署了具有70%+能量回收的CE-6000 IGBT系列系统。网络架构允许从单个操作员站集中控制600+通道，而BTSDA与三星SDI的MES系统集成实现了自动化工艺管理和生产跟踪。",
    solutionVi: "NEWARE triển khai các hệ thống dòng CE-6000 IGBT với thu hồi năng lượng 70%+ trên toàn bộ cơ sở tạo hình của Samsung SDI. Kiến trúc mạng cho phép điều khiển tập trung 600+ kênh từ một trạm vận hành duy nhất, trong khi tích hợp BTSDA với hệ thống MES của Samsung SDI cho phép quản lý công thức tự động và theo dõi sản xuất.",
    results: [
      "$2M annual electricity cost savings through energy recovery",
      "40% increase in production throughput vs previous equipment",
      "70%+ energy recovery rate reducing formation room HVAC load",
      "Seamless MES integration reducing manual data entry by 95%",
      "600+ channels managed by single operator station",
      "Achieved corporate sustainability targets for Scope 2 emissions",
    ],
    resultsEn: [
      "$2M annual electricity cost savings through energy recovery",
      "40% increase in production throughput vs previous equipment",
      "70%+ energy recovery rate reducing formation room HVAC load",
      "Seamless MES integration reducing manual data entry by 95%",
      "600+ channels managed by single operator station",
      "Achieved corporate sustainability targets for Scope 2 emissions",
    ],
    resultsZh: [
      "通过能量回收每年节省200万美元电费",
      "与旧设备相比，生产吞吐量增加40%",
      "70%+能量回收率减少化成室暖通空调负荷",
      "无缝MES集成减少95%人工数据录入",
      "单操作员站管理600+通道",
      "实现企业Scope 2排放可持续发展目标",
    ],
    resultsVi: [
      "Tiết kiệm 2 triệu đô la chi phí điện hàng năm thông qua thu hồi năng lượng",
      "Tăng 40% thông lượng sản xuất so với thiết bị trước",
      "Tỷ lệ thu hồi năng lượng 70%+ giảm tải HVAC phòng tạo hình",
      "Tích hợp MES liền mạch giảm 95% nhập dữ liệu thủ công",
      "600+ kênh được quản lý bởi một trạm vận hành",
      "Đạt được các mục tiêu bền vững doanh nghiệp cho phạm vi phát thải 2",
    ],
    productsUsed: ["CE-6000-5V100A"],
    testimonial: {
      name: "Mr. Jin-ho Park",
      nameEn: "Mr. Jin-ho Park",
      nameZh: "朴真浩先生",
      nameVi: "Ông Jin-ho Park",
      title: "VP of Battery Manufacturing Technology",
      titleEn: "VP of Battery Manufacturing Technology",
      titleZh: "电池制造技术副总裁",
      titleVi: "Phó Chủ Tịch Công Nghệ Sản Xuất Pin",
      quote: "The energy recovery technology delivered exactly what we needed — significant electricity savings and reduced environmental impact. But equally important was the reliability and the seamless MES integration that has transformed our formation operations.",
      quoteEn: "The energy recovery technology delivered exactly what we needed — significant electricity savings and reduced environmental impact. But equally important was the reliability and the seamless MES integration that has transformed our formation operations.",
      quoteZh: "能量回收技术完全满足我们的需求——显著的电费节约和减少的环境影响。但同样重要的是可靠性和无缝MES集成，它改变了我们的化成运营。",
      quoteVi: "Công nghệ thu hồi năng lượng mang lại chính xác những gì chúng tôi cần — tiết kiệm điện đáng kể và giảm tác động môi trường. Nhưng cũng quan trọng không kém là độ tin cậy và tích hợp MES liền mạch đã chuyển đổi các hoạt động tạo hình của chúng tôi.",
    },
    logoColor: "#1428A0",
    featured: true,
    date: "2025-09-10",
    dateEn: "September 10, 2025",
  },
  {
    id: "catl",
    company: "CATL",
    companyEn: "CATL (Contemporary Amperex Technology)",
    companyZh: "宁德时代",
    companyVi: "CATL (Công Nghệ Tích Hợp Hiện Đại)",
    companyDescription: "CATL is the world's largest battery manufacturer, supplying cells to leading global automakers. The company's headquarters in Ningde, China operates the largest battery testing facility in the world, supporting the rapid scale-up from laboratory research to mass production.",
    companyDescriptionEn: "CATL is the world's largest battery manufacturer, supplying cells to leading global automakers. The company's headquarters in Ningde, China operates the largest battery testing facility in the world, supporting the rapid scale-up from laboratory research to mass production.",
    companyDescriptionZh: "宁德时代是全球最大的电池制造商，向全球领先汽车制造商供应电芯。公司位于中国宁德的总部运营着全球最大的电池测试设施，支持从实验室研究到大规模生产的快速扩展。",
    companyDescriptionVi: "CATL là nhà sản xuất pin lớn nhất thế giới, cung cấp pin cho các nhà sản xuất ô tô hàng đầu toàn cầu. Trụ sở công ty tại Ningde, Trung Quốc vận hành cơ sở thử nghiệm pin lớn nhất thế giới, hỗ trợ việc mở rộng nhanh chóng từ nghiên cứu phòng thí nghiệm đến sản xuất hàng loạt.",
    industry: "manufacturing",
    industryEn: "Battery Manufacturing",
    industryZh: "电池制造",
    industryVi: "Sản Xuất Pin",
    location: "Ningde, China",
    challenge: "CATL faced the challenge of scaling battery testing from pilot lab (hundreds of channels) to mass production (hundreds of thousands of channels). Key requirements included enterprise data management, integration with ERP systems, and maintaining data consistency across geographically distributed testing facilities.",
    challengeEn: "CATL faced the challenge of scaling battery testing from pilot lab (hundreds of channels) to mass production (hundreds of thousands of channels). Key requirements included enterprise data management, integration with ERP systems, and maintaining data consistency across geographically distributed testing facilities.",
    challengeZh: "宁德时代面临着将电池测试从试点实验室（数百个通道）扩展到大规模生产（数十万个通道）的挑战。关键需求包括企业数据管理、与ERP系统集成以及跨地理分布测试设施维护数据一致性。",
    challengeVi: "CATL đối mặt với thách thức mở rộng thử nghiệm pin từ phòng thí nghiệm thử nghiệm (hàng trăm kênh) đến sản xuất hàng loạt (hàng trăm nghìn kênh). Các yêu cầu chính bao gồm quản lý dữ liệu doanh nghiệp, tích hợp với hệ thống ERP và duy trì tính nhất quán dữ liệu trên các cơ sở thử nghiệm phân bố địa lý.",
    solution: "NEWARE implemented a comprehensive networked solution connecting over 500,000 channels across CATL's global facilities. The enterprise BTSDA platform provided centralized data management with real-time synchronization, while dedicated API integrations connected with CATL's SAP ERP system for automated work order management and production reporting.",
    solutionEn: "NEWARE implemented a comprehensive networked solution connecting over 500,000 channels across CATL's global facilities. The enterprise BTSDA platform provided centralized data management with real-time synchronization, while dedicated API integrations connected with CATL's SAP ERP system for automated work order management and production reporting.",
    solutionZh: "新威尔实施了一个综合网络解决方案，连接宁德时代全球设施超过500,000个通道。企业BTSDA平台提供集中数据管理和实时同步，而专用API集成连接宁德时代的SAP ERP系统，实现自动化工单管理和生产报告。",
    solutionVi: "NEWARE triển khai một giải pháp mạng toàn diện kết nối hơn 500.000 kênh trên các cơ sở toàn cầu của CATL. Nền tảng BTSDA doanh nghiệp cung cấp quản lý dữ liệu tập trung với đồng bộ hóa thời gian thực, trong khi các tích hợp API chuyên dụng kết nối với hệ thống SAP ERP của CATL để quản lý đơn hàng sản xuất tự động và báo cáo sản xuất.",
    results: [
      "500,000+ channels deployed across global facilities",
      "Seamless ERP integration eliminating manual data transfer",
      "Real-time data synchronization across 12 production sites",
      "3x improvement in formation throughput vs previous systems",
      "Centralized quality control with <0.1% data inconsistency rate",
      "Production capacity supporting 500GWh+ annual output",
    ],
    resultsEn: [
      "500,000+ channels deployed across global facilities",
      "Seamless ERP integration eliminating manual data transfer",
      "Real-time data synchronization across 12 production sites",
      "3x improvement in formation throughput vs previous systems",
      "Centralized quality control with <0.1% data inconsistency rate",
      "Production capacity supporting 500GWh+ annual output",
    ],
    resultsZh: [
      "在全球设施部署超过500,000个通道",
      "无缝ERP集成，消除手动数据传输",
      "跨12个生产基地实时数据同步",
      "与旧系统相比，化成吞吐量提升3倍",
      "集中质量控制，数据不一致率<0.1%",
      "支持500GWh+年产能的生产能力",
    ],
    resultsVi: [
      "500.000+ kênh được triển khai trên các cơ sở toàn cầu",
      "Tích hợp ERP liền mạch loại bỏ chuyển dữ liệu thủ công",
      "Đồng bộ dữ liệu thời gian thực trên 12 địa điểm sản xuất",
      "Cải thiện 3 lần thông lượng tạo hình so với các hệ thống trước",
      "Kiểm soát chất lượng tập trung với tỷ lệ không nhất quán dữ liệu <0.1%",
      "Công suất sản xuất hỗ trợ sản lượng hàng năm 500GWh+",
    ],
    productsUsed: ["CE-6000-5V100A", "CT-4008Q-5V100A"],
    testimonial: {
      name: "Dr. Robin Zheng",
      nameEn: "Dr. Robin Zheng",
      nameZh: "郑博士",
      nameVi: "Tiến sĩ Robin Zheng",
      title: "Chief Technology Officer",
      titleEn: "Chief Technology Officer",
      titleZh: "首席技术官",
      titleVi: "Giám Đốc Công Nghệ",
      quote: "NEWARE's enterprise solution was the only vendor capable of meeting our scale requirements. The 500,000+ channel deployment has become the foundation of our global quality control system.",
      quoteEn: "NEWARE's enterprise solution was the only vendor capable of meeting our scale requirements. The 500,000+ channel deployment has become the foundation of our global quality control system.",
      quoteZh: "新威尔的企业解决方案是唯一能够满足我们规模要求的供应商。超过500,000个通道的部署已成为我们全球质量控制系统的基础。",
      quoteVi: "Giải pháp doanh nghiệp của NEWARE là nhà cung cấp duy nhất có khả năng đáp ứng các yêu cầu quy mô của chúng tôi. Việc triển khai 500.000+ kênh đã trở thành nền tảng của hệ thống kiểm soát chất lượng toàn cầu của chúng tôi.",
    },
    logoColor: "#00A650",
    featured: true,
    date: "2025-10-05",
    dateEn: "October 5, 2025",
  },
];

export const caseStudyIndustries = [
  {
    value: "all",
    label: "All Industries",
    labelEn: "All Industries",
    labelZh: "所有行业",
    labelVi: "Tất Cả Ngành",
  },
  {
    value: "ev",
    label: "Electric Vehicles",
    labelEn: "Electric Vehicles",
    labelZh: "电动汽车",
    labelVi: "Xe Điện",
  },
  {
    value: "manufacturing",
    label: "Battery Manufacturing",
    labelEn: "Battery Manufacturing",
    labelZh: "电池制造",
    labelVi: "Sản Xuất Pin",
  },
  {
    value: "academic",
    label: "Academic Research",
    labelEn: "Academic Research",
    labelZh: "学术研究",
    labelVi: "Nghiên Cứu Học Thuật",
  },
];
