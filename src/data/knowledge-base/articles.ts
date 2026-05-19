// Detailed article content for knowledge base documents
// Full text extracted from newarebattery.com documentation

import type { Document } from "./index";

export type ArticleContent = {
  docId: string;
  sections: ArticleSection[];
};

export type ArticleSection = {
  heading: string;
  headingEn: string;
  content: string;
  contentEn: string;
  screenshots?: string[]; // relative image paths in the clone folder
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS4000 QUICK START
// Source: neware-official-guide-on-how-to-start-to-use-neware-bst4000-with-bts8-software.html
// ─────────────────────────────────────────────────────────────────────────────

export const bts4000_quickstart: ArticleContent = {
  docId: "bts4000-quickstart",
  sections: [
    {
      heading: "硬件接线",
      headingEn: "Hardware Wiring",
      content: `**第一步：硬件接线**

1. **低功率设备接线**（BTS4000 5V/10V 等型号）
   - 设备需要使用中继机（中控机）作为电脑和测试仪之间的桥接设备
   - 连接顺序：电脑（服务器）→ 中继机 → 测试仪
   - 电脑与中继机之间使用 TCP/IP（网线）连接
   - 中继机与测试仪之间使用 RS-485 端口连接
   - 如有多台测试仪，依次通过 RS-485 串联

2. **高功率设备接线**（IGBT/CE6000 等型号）
   - 高功率设备通常为一体机，中继机安装在设备顶部
   - 只需将测试仪和电脑通过 TCP/IP 直接连接即可

3. **电池接线**
   - 按顺序连接：电池 → 夹具 → 万用支架
   - 注意正负极性必须正确匹配
   - 不要将 2 节电池同时接入 1 个通道

**注意**：中继机的 IP 地址和电脑的 IP 地址必须在同一网段。例如：
- 中继机 IP：192.168.1.100
- 电脑 IP：192.168.1.50
- 子网掩码：255.255.255.0`,
      contentEn: `**Step 1: Hardware Wiring**

1. **Low-power device wiring** (BTS4000 5V/10V models)
   - Devices require a middle machine (controller) as the bridge between PC and tester
   - Connection order: PC (server) → Middle machine → Tester
   - PC to middle machine: TCP/IP (Ethernet cable)
   - Middle machine to tester: RS-485 port
   - For multiple testers, connect in series via RS-485

2. **High-power device wiring** (IGBT/CE6000 models)
   - High-power devices are typically standalone with integrated middle machine
   - Connect tester and PC directly via TCP/IP

3. **Battery wiring**
   - Connect in order: Battery → Fixture → Universal holder
   - Ensure correct polarity matching
   - Do NOT connect 2 batteries to 1 channel simultaneously`,
    },
    {
      heading: "中继机网络设置",
      headingEn: "Middle Machine Network Setup",
      content: `**第二步：中继机设置**

1. 进入中继机配置界面
2. 将"获取 IP 地址"从 AUTO（自动）更改为 MANUAL（手动）
3. 设置 IP 地址（LP）和子网掩码（SP），确保与电脑在同一网段
   - 例如：中继机 IP: 192.168.1.100
   - 电脑 IP: 192.168.1.50
   - 子网掩码: 255.255.255.0
   - 最后一位可在 2-255 之间选择任意数字`,
      contentEn: `**Step 2: Middle Machine Configuration**

1. Enter the middle machine configuration interface
2. Change "Get IP Address" from AUTO to MANUAL
3. Set IP address (LP) and subnet mask (SP) in the same network segment as the PC
   - Example: Middle machine IP: 192.168.1.100
   - PC IP: 192.168.1.50
   - Subnet mask: 255.255.255.0`,
    },
    {
      heading: "电脑网络设置",
      headingEn: "PC Network Setup",
      content: `**第三步：电脑（服务器）设置**

1. 打开"网络和共享中心"，点击"更改适配器设置"
2. 右键点击"本地连接"，选择"属性"
3. 双击"TCP/IPv4"
4. 设置 IP 地址（与中继机同一网段）：
   - IP 地址：192.168.1.50
   - 子网掩码：255.255.255.0
   - 默认网关：留空或设为中继机 IP`,
      contentEn: `**Step 3: PC (Server) Setup**

1. Open Network and Sharing Center → Change adapter settings
2. Right-click Local Area Connection → Properties
3. Double-click TCP/IPv4
4. Set IP address (same segment as middle machine):
   - IP Address: 192.168.1.50
   - Subnet Mask: 255.255.255.0
   - Default Gateway: leave empty or set to middle machine IP`,
    },
    {
      heading: "BTS 软件安装",
      headingEn: "BTS Client Software Installation",
      content: `**第四步：BTS 客户端软件安装**

安装包包含三个组件：
1. Microsoft C++ 64位组件
2. .Net 4.5.1 运行库
3. BTS 客户端及 MySQL 数据库

**下载链接**：[NEWARE_BTS_8.0.4_20251124_En.exe](NEWARE_BTS_8.0.4_20251124_En.exe)

安装步骤：
1. 运行安装程序
2. 按提示一路 Next
3. 选择安装路径
4. 完成安装后重启电脑

**登录信息**：
- 用户名：admin
- 密码：neware`,
      contentEn: `**Step 4: BTS Client Software Installation**

The installer includes three components:
1. Microsoft C++ 64-bit component
2. .Net 4.5.1 runtime library
3. BTS client and MySQL database

**Download**: [NEWARE_BTS_8.0.4_20251124_En.exe](NEWARE_BTS_8.0.4_20251124_En.exe)

**Login credentials**:
- Username: admin
- Password: neware`,
    },
    {
      heading: "通道映射与测试步骤配置",
      headingEn: "Channel Mapping and Test Step Configuration",
      content: `**第五步：操作指南**

1. **启动 BTS8.0 客户端**
   - 从 Windows 桌面快捷方式启动

2. **通道映射**
   - 登录后，在软件右侧右键点击
   - 选择"Reset Map"（重置映射）
   - 系统将自动识别所有已连接的通道

3. **设置测试步骤并开始测试**
   - 右键点击通道，选择"Single Start"
   - 配置充放电参数
   - 点击"OK"开始测试`,
      contentEn: `**Step 5: Operation Guide**

1. **Launch BTS8.0 client**
   - Start from Windows desktop shortcut

2. **Channel mapping**
   - After login, right-click on the right side
   - Select "Reset Map"
   - System will auto-detect all connected channels

3. **Configure test steps and start**
   - Right-click channel → "Single Start"
   - Configure charge/discharge parameters
   - Click "OK" to start`,
    },
    {
      heading: "测试数据查看与导出",
      headingEn: "Viewing and Exporting Test Data",
      content: `**第六步：查看和导出测试数据**

1. **实时查看测试进度**
   - 在软件主界面实时监控各通道的电压、电流、容量等数据

2. **历史数据查看**
   - 使用 BTSDA 工具打开 NDA 文件查看详细数据
   - 支持导出为 Excel (.xls)、文本 (.txt) 等格式

3. **数据备份**
   - BTS8.0 支持批量备份功能
   - 可按中继机 → 测试仪 → 单通道多层级选择备份范围
   - 建议设置合理的自动备份间隔，避免数据丢失`,
      contentEn: `**Step 6: Viewing and Exporting Test Data**

1. **Real-time monitoring**
   - Monitor voltage, current, capacity data in real-time

2. **Historical data**
   - Use BTSDA tool to open NDA files
   - Export to Excel (.xls), text (.txt) formats

3. **Data backup**
   - BTS8.0 batch backup supports multi-level selection
   - Set reasonable auto-backup intervals to prevent data loss`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS4000 TEST PROFILES
// Source: typical-test-examples-and-profiles-on-neware-bts4000.html
// ─────────────────────────────────────────────────────────────────────────────

export const bts4000_test_profiles: ArticleContent = {
  docId: "bts4000-test-profiles",
  sections: [
    {
      heading: "标准步骤设置",
      headingEn: "Standard Step Settings",
      content: `**标准步骤设置**

右键点击要测试的通道，选择"Single Start"（单通道启动）。

设置界面包含以下关键参数：
- **电压上限/下限**：电池电压的安全边界，超出范围设备进入保护模式
- **数据记录时间**：系统记录每个数据点的时间间隔，也称采样率。最小时间与设备频率相关：频率的倒数。例如设备频率为 10Hz，则最小采样时间为 1/10s（0.1s）
- **起始步骤**：测试开始的第一个步骤

**示例**：电池充电至 4V（10mA），然后放电至 1V（10mA）`,
      contentEn: `**Standard Step Settings**

Right-click the channel you want to test and select "Single Start".

Key parameters:
- **Upper/Lower voltage limit**: Safety boundaries; exceeding triggers protection mode
- **Data record time**: Sampling rate = 1/frequency. For 10Hz tester, minimum = 0.1s
- **Start step**: The first step of the test

**Example**: Charge battery to 4V at 10mA, then discharge to 1V at 10mA`,
    },
    {
      heading: "循环寿命测试",
      headingEn: "Cycle Life Test Profile",
      content: `**循环寿命测试**

基于标准测试步骤设置，创建循环寿命测试流程：

1. CC（恒流）充电至截止电压
2. CV（恒压）充电至截止电流
3. 静置
4. CC（恒流）放电至截止电压
5. 静置
6. 使用循环指令，重复上述步骤指定次数

可下载 XML 工艺文件直接导入 BTS 软件使用。`,
      contentEn: `**Cycle Life Test**

Based on standard test steps:
1. CC charge to cutoff voltage
2. CV charge to cutoff current
3. Rest
4. CC discharge to cutoff voltage
5. Rest
6. Use cycle command to repeat specified times

Downloadable XML profile can be imported directly into BTS software.`,
    },
    {
      heading: "C-Rate 模式",
      headingEn: "C-Rate Mode",
      content: `**C-Rate 模式**

新版 BTS 软件已支持 C-Rate 充放电。只需输入倍率和电压值，系统自动根据材料容量和规格容量计算电流值，无需手动换算。设置完成后系统自动显示计算电流，节省编辑时间。`,
      contentEn: `**C-Rate Mode**

New BTS software versions support C-Rate charge/discharge. Enter the rate and voltage value, and the system automatically calculates current based on material and specification capacity.`,
    },
    {
      heading: "恒压（CV）充放电设置",
      headingEn: "Constant Voltage (CV) Charge/Discharge Settings",
      content: `**恒压充放电步骤设置**

为什么恒压充放电需要设置电流？
- 恒流时电流恒定，电压变化
- 恒压时电压恒定，电流可变
- 若不设限流，放电电流可能瞬间达到设备最大值，损坏电池
- 大电流可能导致电压瞬间达到上限，通道进入保护模式

**设置截止电流**作为安全保护。也可设置截止时间。

**注意**：仅部分型号（如双量程和三量程测试仪 5V10mA/5V20mA/5V50mA/5V6A/5V12A）支持恒压放电模式。旧型号仅支持恒压充电。`,
      contentEn: `**Constant Voltage Charge/Discharge**

Why set current for CV mode?
- CC: current constant, voltage changes
- CV: voltage constant, current variable
- Without limit, current may spike to tester maximum, damaging battery

**Set cutoff current** as safety protection. Older testers only support CV charge (not discharge).`,
    },
    {
      heading: "IF 条件步骤",
      headingEn: "IF Conditional Steps",
      content: `**IF 条件步骤设置**

IF 步骤允许测试根据电池状态跳转到不同步骤。

**示例**：在恒流充电步骤中不设置截止电压，而是使用 IF 步骤判断：
- 当电压 ≥ 4V 且持续至少 5 秒时，进入下一步骤

这种条件判断方式比直接设置截止电压更灵活。`,
      contentEn: `**IF Conditional Steps**

IF steps allow the test to jump based on battery condition.

**Example**: In CC charge step, use IF instead of voltage cutoff:
- When voltage ≥ 4V for at least 5 seconds → proceed to next step

This is more flexible than direct voltage cutoff settings.`,
    },
    {
      heading: "专业模式",
      headingEn: "Professional Mode",
      content: `**专业模式**

专业模式与标准模式的主要区别在于数据记录时间和保护设置：
- 标准模式：每一步的数据记录时间相同
- 专业模式：每一步可设置不同的数据记录时间和保护边界

**注意**：若忘记设置数据记录时间，软件将使用设备的默认时间。`,
      contentEn: `**Professional Mode**

Difference from standard mode:
- Standard: same data record time for all steps
- Professional: different data record time and protection for each step

If data record time is not set, the software uses the default tester time.`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS4000 DCIR TEST
// Source: dcir-test-recipe-for-neware-bts4000.html
// ─────────────────────────────────────────────────────────────────────────────

export const bts4000_dcir: ArticleContent = {
  docId: "bts4000-dcir",
  sections: [
    {
      heading: "DCIR 测试原理",
      headingEn: "DCIR Test Principle",
      content: `**DCIR（直流内阻）测试原理**

根据 IEC 标准，使用两个放电步骤组合获取 DCIR 值：
1. **0.2C 放电 10 秒**
2. **1C 放电 1 秒**

DCIR = (V₁ - V₂) / (I₁ - I₂)

其中：
- V₁：0.2C 放电 10 秒后的电压
- V₂：1C 放电 1 秒后的电压
- I₁：0.2C 电流
- I₂：1C 电流

**下载测试工艺文件**：[BTS4000-DCIR.xml](BTS4000-DCIR.xml)`,
      contentEn: `**DCIR (Direct Current Internal Resistance) Principle**

Per IEC standard, use two discharge steps:
1. **0.2C discharge for 10s**
2. **1C discharge for 1s**

DCIR = (V₁ - V₂) / (I₁ - I₂)

Where:
- V₁: voltage after 0.2C 10s discharge
- V₂: voltage after 1C 1s discharge
- I₁: 0.2C current
- I₂: 1C current`,
    },
    {
      heading: "测试工艺步骤说明",
      headingEn: "Test Procedure Steps",
      content: `**测试工艺步骤**

以 2500mAh 锂离子电池为例（请根据实际电池修改电压和电流值）：

**步骤 1**：静置 2 分钟
**步骤 2**：使用 CCCV（恒流恒压）将电池充满
**步骤 3**：静置 2 分钟
**步骤 4**：使用 0.2C 放电 10 秒
**步骤 5**：使用 1C 放电 1 秒
**步骤 6**：重复步骤 4 和 5，直到电池电压低于 2.75V

**提示**：BTS4000 软件中没有单独的 DCIR 测试步骤，因此使用 IF 步骤实现循环控制。`,
      contentEn: `**Test Procedure (2500mAh Li-ion example — modify values for your battery)**

Step 1: Rest 2 min
Step 2: CCCV charge to full
Step 3: Rest 2 min
Step 4: 0.2C discharge for 10s
Step 5: 1C discharge for 1s
Step 6: Repeat steps 4-5 until voltage < 2.75V

BTS4000 software has no dedicated DCIR step — use IF steps for loop control.`,
    },
    {
      heading: "BTSDA 数据分析方法",
      headingEn: "BTSDA Data Analysis",
      content: `**BTSDA 数据分析方法**

测试完成后，在 BTSDA 中查看数据：

1. 打开 NDA 测试结果文件
2. 点击工具栏中的"DCIR"按钮
3. 选择相应的参数设置
4. 获取 DCIR 曲线图和数值

**下载示例 NDA 文件**：[DCIR-on-BTS4000.nda](DCIR-on-BTS4000.nda)

**下载 BTSDA 分析工具**：[BTSDA-for-BTS4000-20180810.exe](BTSDA-for-BTS4000-20180810.exe)`,
      contentEn: `**BTSDA Data Analysis**

After test:
1. Open NDA result file in BTSDA
2. Click "DCIR" button in toolbar
3. Select parameter settings
4. View DCIR curve and values

Download sample NDA: [DCIR-on-BTS4000.nda](DCIR-on-BTS4000.nda)`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PULSE TEST
// Source: pulse-test-on-neware-bts4000-and-igbt.html
// ─────────────────────────────────────────────────────────────────────────────

export const bts4000_pulse: ArticleContent = {
  docId: "bts4000-pulse",
  sections: [
    {
      heading: "脉冲测试前置准备",
      headingEn: "Pulse Test Prerequisites",
      content: `**脉冲测试前置准备**

**所需软件**：
- BTS7.6.x 用户：必须使用 BuildTest 软件创建脉冲测试步骤
- BTS8.0 用户：可直接使用内置步骤编辑器，无需 BuildTest

**第一步：确认设备参数**
- 右键点击通道，选择"Channel Info"（通道信息）
- 查看电压范围和电流量程

以 5V6A 测试仪为例。`,
      contentEn: `**Required Software**:
- BTS7.6.x users: BuildTest software required
- BTS8.0 users: Built-in step editor sufficient

**Step 1: Check device parameters**
Right-click channel → "Channel Info" to view voltage/current ranges.`,
    },
    {
      heading: "BuildTest 软件设置",
      headingEn: "BuildTest Software Setup",
      content: `**BuildTest 软件设置**

1. **切换语言**：点击"帮助" → "英文版" → "是/Yes"
2. **Operating → Setting**
3. 在"Step mode configured"中选择所有选项，点击"OK"
4. 在"System Setting"中输入正确的电压和电流量程（默认 6A），点击"OK"`,
      contentEn: `1. **Language**: Help → English version
2. **Operating → Setting**
3. Select all options in "Step mode configured"
4. Enter correct voltage/current range in "System Setting"`,
    },
    {
      heading: "脉冲步骤参数设置",
      headingEn: "Pulse Step Parameter Configuration",
      content: `**脉冲步骤设置**

1. **File → New → Advanced step**
2. 选择"Pulse"步骤类型
3. 双击黄色区域打开步骤设置窗口
4. 输入参数（以 3V-4.2V 电池为例）：
   - 负号"-"表示放电
   - 设置脉冲电流、持续时间、间隔等

**重要**：脉冲步骤时间很短，必须设置快速采样率。
- 采样率 = 1/设备频率
- 例如：设备频率 10Hz → 最小采样时间 0.1s

5. 设置完成后点击"OK"
6. 点击"Global condition" → 选择"Global Protect"
7. 点击"Single Step Condition"设置主通道和辅通道的时间间隔`,
      contentEn: `1. **File → New → Advanced step**
2. Select "Pulse" step type
3. Double-click yellow area to open settings
4. Enter parameters (example: 3V-4.2V battery):
   - "-" sign means discharge
   - Set pulse current, duration, interval

**Important**: Pulse steps are short — fast sampling rate required.
   - Sampling rate = 1/device frequency
   - 10Hz tester → minimum 0.1s`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS8.0 BACKUP FUNCTION
// Source: powerful-backup-function-in-neware-bts8-0.html
// ─────────────────────────────────────────────────────────────────────────────

export const bts8_backup: ArticleContent = {
  docId: "long-cycling-data",
  sections: [
    {
      heading: "历史数据查找",
      headingEn: "Historical Data Search",
      content: `**BTS8.0 历史数据查找**

BTS8.0 拥有更强大的历史数据搜索功能：
- 按时间范围筛选
- 按通道筛选
- 按测试状态筛选`,
      contentEn: `**BTS8.0 Historical Data Search**

BTS8.0 has powerful historical data search:
- Filter by time range
- Filter by channel
- Filter by test status`,
    },
    {
      heading: "批量备份功能",
      headingEn: "Batch Backup Function",
      content: `**数据批量备份**

BTS8.0 的批量备份功能非常强大，支持多层级选择：

1. **仅设置第4项**：表示该中继机下所有通道数据都会被备份
2. **设置第4项+第5项**：表示该测试仪所有通道数据会被备份
3. **设置第4项+第5项+第6项**：仅备份该单通道数据
4. **第7项**：建议不要设置过短的备份间隔，否则通道过多时会拖慢电脑速度

**建议**：根据实际测试规模和电脑性能，设置合理的自动备份间隔。`,
      contentEn: `**Batch Backup**

BTS8.0 batch backup supports multi-level selection:
- Setting item 4 only: all channels under this controller backed up
- Setting 4+5: all channels of that tester backed up
- Setting 4+5+6: only that channel backed up
- Do NOT set backup interval too short — it will slow down the computer with many channels`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SOFTWAREs & RESOURCES OVERVIEW
// Source: neware-bts-operation-tips-faq-and-video-clips.html
// ─────────────────────────────────────────────────────────────────────────────

export const software_overview: ArticleContent = {
  docId: "software-overview",
  sections: [
    {
      heading: "软件总览",
      headingEn: "Software Overview",
      content: `**软件与资源下载总览**

新威尔所有 BTS 软件均免费提供。成为客户后享受终身软件升级服务。BTS9000 还支持固件升级。

**软件版本**：

| 软件 | 适用设备 | 最新版本 | 更新日期 |
|------|---------|---------|---------|
| BTS8.0 | BTS4000/BTS8000/CE6000 | 8.0.4 | 2025-11-24 |
| BTS9.1 | BTS9000/BTS3000n | 9.1 | 2024-04-04 |
| BTSDA | BTS4000/BTS8000 | 2024-08-06 | 2024-08-06 |

**下载地址**：
- [BTS8.0 (BTS4000/BTS8000/CE6000)](NEWARE_BTS_8.0.4_20251124_En.exe)
- [BTS9 (BTS9000)](media/BTS92_SETUP_20250808.zip)
- [BTSDA](media/BTSDA20240806.zip)`,
      contentEn: `**Software & Resources Overview**

All Neware BTS software is free. Lifetime upgrades for customers. BTS9000 supports firmware upgrades.

| Software | Models | Version | Updated |
|----------|--------|---------|---------|
| BTS8.0 | BTS4000/BTS8000/CE6000 | 8.0.4 | 2025-11-24 |
| BTS9.1 | BTS9000/BTS3000n | 9.1 | 2024-04-04 |
| BTSDA | BTS4000/BTS8000 | 2024-08-06 | 2024-08-06`,
    },
    {
      heading: "产品型号规格表",
      headingEn: "Product Model Specifications",
      content: `**BTS4000 型号规格**

| 型号 | 电压 | 电流量程 | 精度 | 通道 |
|------|------|---------|------|------|
| BTS4000-5V1mA | 5V | 1mA | 0.05% FS | 8CH |
| BTS4000-5V10mA | 5V | 10mA (双量程) | 0.05% FS | 8CH |
| BTS4000-5V50mA | 5V | 50mA (双量程) | 0.05% FS | 8CH |
| BTS4000-5V6A | 5V | 6A (三量程) | 0.05% FS | 8CH |
| BTS4000-5V12A | 5V | 12A (三量程) | 0.05% FS | 8CH |
| BTS4000-5V20A | 5V | 20A | 0.05% FS | 8/16/32/48/96CH |
| BTS4000-5V100A | 5V | 100A | 0.05% FS | 8CH |
| BTS4000-10V10A | 10V | 10A | 0.05% FS | 8CH |
| BTS4000-15V6A | 15V | 6A | 0.05% FS | 8CH |
| BTS4000-20V50A | 20V | 50A | 0.05% FS | 4CH |
| BTS4000-30V100A | 30V | 100A | 0.05% FS | 2CH |
| BTS4000-50V20A | 50V | 20A | 0.05% FS | 2/4/8CH |
| BTS4000-60V50A | 60V | 50A | 0.05% FS | 2CH |
| BTS4000-100V60A | 100V | 60A | 0.05% FS | 1CH |`,
      contentEn: `**BTS4000 Models and Specifications**`,
    },
    {
      heading: "IGBT 型号规格",
      headingEn: "IGBT Model Specifications",
      content: `**IGBT 大功率型号规格**

IGBT 系列为能量回馈型（再生型），2 通道可并联输出双倍电流。

| 型号 | 电压 | 电流 | 特点 |
|------|------|------|------|
| IGBT-60V1000A-1CH | 60V | 1000A | 热销型号 |
| IGBT-100V500A-2CH | 100V | 500A | — |
| IGBT-120V600A-1CH | 120V | 600A | — |
| IGBT-300V400A-1CH | 300V | 400A | — |
| IGBT-500V300A-2CH | 500V | 300A | 热销型号 |
| IGBT-600V400A-1CH | 600V | 400A | 热销型号 |
| IGBT-750V300A-2CH | 750V | 300A | 热销型号 |
| IGBT-800V300A-1CH | 800V | 300A | — |
| IGBT-900V1000A-1CH | 900V | 1000A | — |
| IGBT-1000V600A-1CH | 1000V | 600A | — |`,
      contentEn: `**IGBT High Power Models**

IGBT series is energy feedback (regenerative). 2 channels can be paralleled for double current output.`,
    },
    {
      heading: "国际测试标准支持",
      headingEn: "International Testing Standards Support",
      content: `**新威尔设备支持的测试标准**

| 标准 | 描述 | 相关测试 |
|------|------|---------|
| IEC 62133 | 便携式密封二次锂电池安全要求 | 连续低速率充电、温度循环、过充、强制放电 |
| UN 38.3 | 锂电池运输安全测试 | 高度模拟、温度循环、振动、冲击等 |
| UL 1642 | 锂电池安全标准 | 部分测试项目 |
| USABC HPPC | 混合动力脉冲功率特性 | C-Rate 测试 |

**IEC 62133** 规定了便携式密封二次锂电池在正常使用和合理可预见的误用情况下的安全运行要求。新威尔电池测试仪在以下测试中发挥重要作用：连续低速率充电、温度循环、过充、强制放电等。`,
      contentEn: `**International Standards Supported**

| Standard | Description | Tests |
|----------|-------------|-------|
| IEC 62133 | Portable sealed secondary Li battery safety | Continuous charge, thermal cycling, overcharge, forced discharge |
| UN 38.3 | Li battery transport safety | Altitude simulation, thermal cycling, vibration, shock |
| UL 1642 | Li battery safety | Partial tests |
| USABC HPPC | Hybrid pulse power characterization | C-Rate tests |`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CE6000 GUIDE
// Source: neware-official-guide-on-how-to-use-ce6000-series.html
// ─────────────────────────────────────────────────────────────────────────────

export const ce6000_guide: ArticleContent = {
  docId: "ce6000-guide",
  sections: [
    {
      heading: "CE6000 系列特点",
      headingEn: "CE6000 Series Features",
      content: `**CE6000 系列能量回馈型电池模组和 PACK 测试系统**

CE6000 是新威尔全新设计的能量回馈型（再生型）测试系统，具备以下特点：

1. **能量回馈**：放电时能量回馈电网，节能 70% 以上
2. **高电压大电流**：支持 EV 电池模组和 PACK 测试
3. **高精度**：0.05% FS 精度
4. **多种通讯方式**：TCP/IP 通讯，支持远程控制`,
      contentEn: `**CE6000 Energy Feedback Battery Module and PACK Testing System**

1. **Energy feedback**: Discharge energy returned to grid, saving 70%+ power
2. **High voltage/current**: EV battery module and PACK testing support
3. **High accuracy**: 0.05% FS
4. **Multiple communication**: TCP/IP for remote control`,
    },
    {
      heading: "CE6000 与 BTS4000 的区别",
      headingEn: "CE6000 vs BTS4000 Differences",
      content: `**CE6000 与 BTS4000 的主要区别**

| 特性 | CE6000 | BTS4000 |
|------|--------|---------|
| 能量回馈 | 支持（节能 70%+） | 不支持 |
| 适用场景 | 产线大批量测试、EV PACK | 研发、小批量测试 |
| 软件 | BTS8.0 | BTS8.0 |
| 精度 | 0.05% FS | 0.05% FS |`,
      contentEn: `**Key Differences**

| Feature | CE6000 | BTS4000 |
|---------|--------|---------|
| Energy feedback | Yes (70%+ savings) | No |
| Application | Production, EV PACK | R&D, small batch |
| Software | BTS8.0 | BTS8.0 |
| Accuracy | 0.05% FS | 0.05% FS |`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS9000 QUICK START
// ─────────────────────────────────────────────────────────────────────────────

export const bts9000_quickstart: ArticleContent = {
  docId: "bts9000-quickstart",
  sections: [
    {
      heading: "BTS9000 快速连接（1-2-3 步骤）",
      headingEn: "BTS9000 Quick Connection (1-2-3 Steps)",
      content: `**BTS9000 快速上手只需 3 步**

**步骤 1：连接硬件**
- BTS9000 为一体机设计，中继机已集成在设备内部
- 使用网线将 BTS9000 直接连接到电脑的以太网口
- 确认设备电源已开启，指示灯正常

**步骤 2：设置电脑 IP**
- 打开"网络和共享中心" → 更改适配器设置
- 右键以太网连接 → 属性 → TCP/IPv4
- 手动设置 IP 地址，例如：192.168.1.50
- 子网掩码：255.255.255.0

**步骤 3：启动 BTS9 软件**
- 运行 BTS9 客户端（安装包内含 BTS9.1）
- 软件将自动识别已连接的 BTS9000 设备
- 右键通道 → Reset Map 刷新通道映射
- 开始测试`,
      contentEn: `**BTS9000 Quick Setup (3 Steps)**

**Step 1: Connect Hardware**
- BTS9000 is an all-in-one design with built-in controller
- Connect Ethernet cable from BTS9000 directly to PC
- Ensure power is on and indicators are normal

**Step 2: Set PC IP**
- Network and Sharing Center → Adapter Settings → TCP/IPv4
- Set IP manually, e.g.: 192.168.1.50
- Subnet mask: 255.255.255.0

**Step 3: Launch BTS9 Software**
- Run BTS9 client (BTS9.1 included in installer)
- Software auto-detects connected BTS9000
- Right-click channel → Reset Map
- Start testing`,
    },
    {
      heading: "BTS9.1 软件新增功能",
      headingEn: "BTS9.1 New Features",
      content: `**BTS9.1 相比 BTS8.0 的主要改进**

1. **内置 DCIR 测量功能**：无需手动配置脉冲步骤，可直接选择"测量电阻"步骤类型

2. **C-Rate 模式**：直接输入倍率值，系统自动计算电流，无需手动换算

3. **更快的采样率**：BTS9000 支持最高 1000Hz 采样率（1ms 间隔）

4. **固件升级支持**：BTS9000 支持固件在线升级

5. **多语言界面**：支持简体中文、繁体中文、英文、日文、韩文`,
      contentEn: `**BTS9.1 Key Improvements over BTS8.0**

1. **Built-in DCIR**: Direct "measure resistance" step type, no manual pulse configuration needed

2. **C-Rate Mode**: Direct rate input, auto-calculated current

3. **Faster Sampling**: BTS9000 supports up to 1000Hz (1ms interval)

4. **Firmware Upgrade**: BTS9000 supports online firmware updates

5. **Multi-language**: Simplified/Traditional Chinese, English, Japanese, Korean`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS4000 TRIPLE RANGE
// ─────────────────────────────────────────────────────────────────────────────

export const bts4000_triple_range: ArticleContent = {
  docId: "bts4000-triple-range",
  sections: [
    {
      heading: "三量程设计原理",
      headingEn: "Triple Range Design Principle",
      content: `**什么是三量程测试器？**

三量程（Triple Range）测试器在同一通道内集成了三个不同电流量程，设备根据实际电流大小自动切换量程，保证全程高精度测量。

**工作原理：**
- 小电流时使用高精度小量程
- 中电流时切换到中等量程
- 大电流时切换到大量程
- 量程切换过程自动完成，无需手动干预

**优势：**
- 宽电流量程覆盖（50µA ~ 12A 单通道）
- 全程高精度（所有量程均保持 0.05% FS 精度）
- 无需购买多个不同量程的设备`,
      contentEn: `**What is Triple Range?**

Triple Range testers integrate three current ranges in one channel. The equipment automatically switches ranges based on actual current, maintaining high accuracy throughout.

**How it works:**
- Small current: high-precision low range
- Medium current: mid range
- Large current: high range
- Switching is automatic, no manual intervention needed`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS9000 DCIR
// ─────────────────────────────────────────────────────────────────────────────

export const bts9000_dcir: ArticleContent = {
  docId: "bts9000-dcir",
  sections: [
    {
      heading: "BTS9000 内置 DCIR 测量",
      headingEn: "BTS9000 Built-in DCIR Measurement",
      content: `**BTS9000 的 DCIR 测量优势**

BTS9000 软件内置 DCIR 测量功能（称为"测量电阻"步骤），这是相比 BTS4000 的重要优势。

**操作步骤：**

1. 启动 BTS9.1 客户端
2. 右键点击通道 → Single Start
3. 在步骤类型中选择"测量电阻"
4. 设置参数：
   - 电流值（A）
   - 脉冲持续时间（s）
5. 点击 OK 开始测试

**BTS9000 DCIR 计算公式：**
DCIR = (V₀ - V₁) / I

其中 V₀ 为脉冲前电压，V₁ 为脉冲后电压，I 为脉冲电流值。

**BTS9000 支持 1000Hz 采样率**，数据精度远高于 BTS4000 的 10Hz 采样。`,
      contentEn: `**BTS9000 DCIR Advantage**

BTS9000 software has a built-in DCIR function ("measure resistance" step type) — a major advantage over BTS4000.

**Steps:**

1. Launch BTS9.1 client
2. Right-click channel → Single Start
3. Select "Measure Resistance" step type
4. Set parameters (current, duration)
5. Click OK to start

**BTS9000 supports 1000Hz sampling** — far higher precision than BTS4000's 10Hz.`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS9000 C-RATE
// ─────────────────────────────────────────────────────────────────────────────

export const bts9000_crate: ArticleContent = {
  docId: "bts9000-crate",
  sections: [
    {
      heading: "BTS9000 C-Rate 模式",
      headingEn: "BTS9000 C-Rate Mode",
      content: `**BTS9000 C-Rate 充放电设置**

BTS9000 软件支持直接以 C-rate 倍率设置充放电电流，无需手动计算。

**使用步骤：**

1. 在 BTS9 软件中创建新测试
2. 选择"C-Rate 充放电"步骤类型
3. 输入：
   - 电池标称容量（mAh）
   - C-rate 倍率（如 1C、0.5C、2C）
   - 截止电压
4. 系统自动计算电流值并显示
5. 确认后开始测试

**示例**：标称容量 2500mAh 的电池，1C 充电电流 = 2500mA = 2.5A

**支持的正向 C-Rate**：0.01C ~ 10C（取决于设备电流量程）`,
      contentEn: `**BTS9000 C-Rate Mode**

BTS9000 software supports direct C-rate input — no manual current calculation needed.

**Steps:**

1. Create new test in BTS9
2. Select "C-Rate Charge/Discharge" step type
3. Enter:
   - Battery nominal capacity (mAh)
   - C-rate (e.g. 1C, 0.5C, 2C)
   - Cutoff voltage
4. System auto-calculates and displays current
5. Confirm and start

**Example**: 2500mAh battery at 1C = 2500mA = 2.5A`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTSDA CURVES
// ─────────────────────────────────────────────────────────────────────────────

export const btsda_customize_curves: ArticleContent = {
  docId: "btsda-customize-curves",
  sections: [
    {
      heading: "BTSDA 曲线图基本操作",
      headingEn: "BTSDA Curve Display Basics",
      content: `**BTSDA 曲线图基本操作**

1. **打开 NDA 文件**：文件 → 打开 → 选择 NDA 测试结果文件
2. **选择通道**：在左侧通道列表中勾选需要显示的通道
3. **选择 X/Y 轴数据**：点击坐标轴标签，分别选择 X 轴（如时间、容量）和 Y 轴（如电压、电流）
4. **添加多条曲线**：在同一图表中叠加显示多个通道数据，便于对比分析
5. **缩放和平移**：鼠标滚轮缩放，拖拽平移

**常用曲线类型：**
- 电压-时间曲线
- 容量-循环次数曲线
- 电流-时间曲线
- 充放电曲线（电压-容量）`,
      contentEn: `**BTSDA Curve Basics**

1. **Open NDA file**: File → Open → Select NDA test result
2. **Select channels**: Check channels in the left panel
3. **Choose X/Y data**: Click axis labels to select X (time, capacity) and Y (voltage, current)
4. **Add multiple curves**: Overlay channels for comparison
5. **Zoom/Pan**: Scroll to zoom, drag to pan`,
    },
    {
      heading: "自定义图表样式",
      headingEn: "Customizing Chart Appearance",
      content: `**自定义图表样式**

1. **设置坐标轴范围**：右键点击坐标轴 → 设置范围，可固定显示区间
2. **切换图表类型**：工具栏提供折线图、散点图、直方图等多种类型
3. **保存为模板**：设置好满意的样式后，文件 → 保存模板，下次直接加载
4. **导出图片**：文件 → 导出图片，可保存为 PNG、JPEG、SVG 格式
5. **批量打印报告**：选择多个 NDA 文件，一键生成打印报告`,
      contentEn: `**Customizing Appearance**

1. **Set axis range**: Right-click axis → Set range, fix display interval
2. **Switch chart type**: Toolbar offers line, scatter, histogram types
3. **Save as template**: File → Save Template for quick reuse
4. **Export image**: File → Export Image → PNG/JPEG/SVG
5. **Batch print reports**: Select multiple NDA files for batch reporting`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTSDA DQDV
// ─────────────────────────────────────────────────────────────────────────────

export const btsda_dqdv: ArticleContent = {
  docId: "btsda-dqdv",
  sections: [
    {
      heading: "dQ/dV 分析原理",
      headingEn: "dQ/dV Analysis Principle",
      content: `**dQ/dV 微分容量分析**

dQ/dV 分析是电池研究中的重要工具，通过对充放电曲线求导，可以识别电池内部的电化学过程。

**原理：**
- 充放电过程中，电池电压变化时对应的容量变化率
- dQ/dV 峰对应电池内部的相变过程
- 峰的位置和强度可反映材料特性

**常见峰的意义：**
- 3.4V 附近（钴酸锂）：Li⁺嵌入/脱嵌
- 3.6V 附近（磷酸铁锂）：相变平台
- SEI 形成峰：首次充电时 0.8V 附近

**应用场景：**
- 电池材料表征
- 循环老化分析
- 电池 SOC/SOH 估算`,
      contentEn: `**dQ/dV Differential Capacity Analysis**

dQ/dV analysis identifies electrochemical processes by differentiating charge/discharge curves.

**Principle:**
- Rate of capacity change with voltage during charge/discharge
- dQ/dV peaks correspond to phase transitions
- Peak position/intensity reflects material properties

**Common peaks:**
- 3.4V (LiCoO₂): Li⁺ intercalation/deintercalation
- 3.6V (LiFePO₄): Phase transition plateau
- SEI formation: ~0.8V during first charge`,
    },
    {
      heading: "BTSDA 中计算 dQ/dV",
      headingEn: "Calculating dQ/dV in BTSDA",
      content: `**BTSDA dQ/dV 计算步骤**

1. 打开 NDA 充放电测试文件
2. 在工具栏点击"dQ/dV"按钮（或通过菜单：分析 → dQ/dV）
3. 选择需要分析的循环次数（可以单选或多选）
4. 设置平滑参数（推荐 3~5 点平滑，减少噪声）
5. 点击"计算"生成 dQ/dV 曲线
6. 可将多条循环的 dQ/dV 叠加显示，观察老化趋势

**注意事项：**
- dQ/dV 对数据质量要求高，确保采样率足够
- 充电和放电过程需要分开分析
- 充放电曲线需先进行容量归一化处理`,
      contentEn: `**BTSDA dQ/dV Calculation**

1. Open NDA charge/discharge test file
2. Click "dQ/dV" in toolbar (or Analysis → dQ/dV)
3. Select cycle(s) to analyze
4. Set smoothing parameter (3~5 points recommended)
5. Click "Calculate" to generate dQ/dV curve
6. Overlay multiple cycles to observe aging trends`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTSDA SUPERCAPACITOR
// ─────────────────────────────────────────────────────────────────────────────

export const btsda_supercapacitor: ArticleContent = {
  docId: "btsda-supercapacitor",
  sections: [
    {
      heading: "超级电容测试概述",
      headingEn: "Supercapacitor Testing Overview",
      content: `**超级电容测试方法**

超级电容（又称电化学电容、双电层电容）与锂电池不同，其充放电特性更适合用恒流充放电测试。

**关键参数：**
- **电容值（F）**：存储电荷的能力
- **等效串联电阻（ESR）**：内阻损耗
- **额定电压**：最大工作电压
- **漏电流**：长时间搁置后的自放电

**新威尔 CE 系列和标准 BTS4000 均可用于超级电容测试。**`,
      contentEn: `**Supercapacitor Testing**

Supercapacitors (electrochemical capacitors) differ from Li-ion — constant current charge/discharge is the preferred method.

**Key parameters:**
- **Capacitance (F)**: Charge storage capacity
- **ESR**: Internal resistance loss
- **Rated voltage**: Maximum operating voltage
- **Leakage current**: Self-discharge over time`,
    },
    {
      heading: "BTSDA 超级电容计算方法",
      headingEn: "BTSDA Supercapacitor Calculation",
      content: `**BTSDA 超级电容计算**

1. 进行恒流充放电测试（CC 模式）
2. 打开 BTSDA，加载 NDA 测试结果
3. 点击工具栏"超级电容"按钮
4. 选择充放电曲线
5. 系统自动计算：
   - **电容值**：C = I × Δt / ΔV
   - **ESR**：ESR = ΔV / I（放电开始瞬间电压降）
6. 生成测试报告

**恒流充放电测试设置建议：**
- 充电至额定电压
- 静置 30 秒
- 恒流放电至 0V（或设定的截止电压）
- 记录放电时间和电压变化`,
      contentEn: `**BTSDA Supercapacitor Calculation**

1. Run CC charge/discharge test
2. Open BTSDA, load NDA result
3. Click "Supercapacitor" button in toolbar
4. Select charge/discharge curve
5. System auto-calculates:
   - **Capacitance**: C = I × Δt / ΔV
   - **ESR**: ESR = ΔV / I (voltage drop at discharge start)
6. Generate test report`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS4000 CYCLE LIFE
// ─────────────────────────────────────────────────────────────────────────────

export const bts4000_cycle_life: ArticleContent = {
  docId: "bts4000-cycle-life",
  sections: [
    {
      heading: "循环寿命测试工艺配置",
      headingEn: "Cycle Life Test Profile Configuration",
      content: `**循环寿命测试概述**

循环寿命测试用于评估电池在长期充放电循环后的容量保持率，是电池最核心的性能指标之一。

**标准循环工艺（CC-CV）：**

步骤 1：CC（恒流）充电至截止电压
  - 电流：如 0.5C（对 2500mAh 电池为 1250mA）
  - 截止电压：标准 4.2V（磷酸铁锂为 3.65V）

步骤 2：CV（恒压）充电至截止电流
  - 恒压充电确保电池完全充满
  - 截止电流：通常设为 0.05C

步骤 3：静置（Rest）
  - 建议 5~30 分钟，使电池恢复平衡

步骤 4：CC（恒流）放电至截止电压
  - 放电电流：通常同充电电流
  - 截止电压：标准 2.75V（磷酸铁锂为 2.5V）

步骤 5：循环控制
  - 使用"循环"步骤，设置重复次数（如 1000 次）
  - 或设置容量衰减到 80% 时自动停止`,
      contentEn: `**Cycle Life Test Overview**

Cycle life testing evaluates battery capacity retention after long-term cycling.

**Standard CC-CV Cycle Profile:**

Step 1: CC charge to cutoff voltage
  - Current: e.g. 0.5C (1250mA for 2500mAh battery)
  - Cutoff voltage: 4.2V typically (3.65V for LFP)

Step 2: CV charge to cutoff current
  - Cutoff current: typically 0.05C

Step 3: Rest (5~30 min)

Step 4: CC discharge to cutoff voltage
  - Same current as charge
  - Cutoff: 2.75V typically (2.5V for LFP)

Step 5: Loop control
  - Use "Loop" step to set repeat count (e.g. 1000)
  - Or auto-stop at 80% capacity retention`,
    },
    {
      heading: "XML 工艺文件导入",
      headingEn: "Importing XML Profile Files",
      content: `**下载并导入 XML 工艺文件**

1. 下载循环寿命测试 XML 工艺文件
2. 在 BTS8.0 中，文件 → 导入工艺
3. 选择下载的 XML 文件
4. 系统将自动配置所有测试步骤
5. 根据实际电池参数修改：
   - 电压值（根据电池规格）
   - 电流值（根据电池容量）
   - 循环次数
6. 保存并分配到相应通道

**XML 工艺文件的优势：**
- 避免手动配置错误
- 快速标准化测试流程
- 便于不同实验室之间共享测试工艺`,
      contentEn: `**Download and Import XML Profile**

1. Download cycle life XML profile file
2. In BTS8.0: File → Import Profile
3. Select the XML file
4. System auto-configures all steps
5. Modify for your battery:
   - Voltage values
   - Current values (based on capacity)
   - Cycle count
6. Save and assign to channels`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS4000 RETENTION
// ─────────────────────────────────────────────────────────────────────────────

export const bts4000_retention: ArticleContent = {
  docId: "bts4000-retention",
  sections: [
    {
      heading: "容量保持率测试方法",
      headingEn: "Capacity Retention Test Method",
      content: `**容量保持率测试（自放电测试）**

容量保持率测试用于测量电池在特定温度下搁置一段时间后的剩余容量，评估电池的自放电特性。

**IEC 62133 中的连续低速率充电测试方法：**

1. 在 20±5°C 环境下，将电池充满电（CC-CV 充电至截止电流）
2. 静置 1~4 小时，使电池达到稳定状态
3. 以 0.2C 电流放电至规定的截止电压，记录放电容量 C₁
4. 重复步骤 1~3 共 5 次，取前 4 次放电容量的平均值作为初始容量
5. 将充满电的电池在 20±5°C 下搁置 28 天
6. 搁置后重复步骤 3，记录放电容量 C₂
7. 计算保持率：C₂ / C₁ × 100%

**判断标准**：搁置 28 天后，容量保持率应 ≥ 80%（具体标准参见 IEC 62133 最新版本）`,
      contentEn: `**Capacity Retention (Self-Discharge) Test**

Measures remaining capacity after rest period at specified temperature.

**IEC 62133 Continuous Low-Rate Charge Method:**

1. Fully charge at 20±5°C (CC-CV to cutoff current)
2. Rest 1~4 hours for stabilization
3. Discharge at 0.2C, record capacity C₁
4. Repeat 5 times, average of first 4 cycles = initial capacity
5. Rest fully charged battery at 20±5°C for 28 days
6. Repeat discharge, record C₂
7. Retention rate: C₂ / C₁ × 100%

**Pass criteria**: ≥80% after 28 days (per IEC 62133)`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// USABC HPPC
// ─────────────────────────────────────────────────────────────────────────────

export const bts9000_usabc_hppc: ArticleContent = {
  docId: "bts9000-usabc-hppc",
  sections: [
    {
      heading: "USABC HPPC 测试概述",
      headingEn: "USABC HPPC Test Overview",
      content: `**HPPC（混合动力脉冲功率特性）测试**

HPPC 测试是 USABC（美国先进电池联盟）制定的电池功率特性标准测试方法，用于测定电池在不同 SOC（荷电状态）下的脉冲功率能力。

**测试目的：**
- 评估电池的峰值功率能力
- 确定电池在不同 SOC 下的内阻特性
- 为混合动力车辆电池选型提供依据

**关键参数：**
- **SOC 范围**：通常测试 100% ~ 10% SOC
- **脉冲电流**：正向（充电）和负向（放电）脉冲
- **脉冲持续时间**：10 秒或 30 秒
- **电压窗口**：最低电压和最高电压限制`,
      contentEn: `**HPPC (Hybrid Pulse Power Characterization) Test**

HPPC measures battery pulse power capability at different SOC levels per USABC standards.

**Purpose:**
- Assess peak power capability
- Determine internal resistance at various SOCs
- Support HEV battery selection

**Key parameters:**
- **SOC range**: Typically 100% ~ 10%
- **Pulse current**: Charge and discharge pulses
- **Pulse duration**: 10s or 30s
- **Voltage window**: Min/max voltage limits`,
    },
    {
      heading: "BTS9000 HPPC 测试配置",
      headingEn: "BTS9000 HPPC Test Configuration",
      content: `**BTS9000 HPPC 测试步骤**

1. **初始化**：在 30±4°C 环境下，以 1C 将电池充满
2. **静置**：搁置 1 小时，使电池达到平衡
3. **HPPC 脉冲序列**（对每个 SOC 点重复）：
   - 10 秒放电脉冲（1C 或 2C）
   - 40 秒静置恢复
   - 10 秒充电脉冲（0.75C 或 1.5C）
   - 40 秒静置恢复
4. **放电至下一 SOC 点**：以 1C 放电至目标 SOC
5. **重复步骤 3~4**：直到 SOC 降至 10%
6. **最终放电**：将电池放电至截止电压

**数据分析：**
- DCIR = ΔV / I_pulse（每个 SOC 点）
- 可用功率 = V_min × I_discharge（受电压限制）
- 可用功率 = (V_max - V_oc) × I_charge（受电流限制）`,
      contentEn: `**BTS9000 HPPC Test Procedure**

1. **Init**: Fully charge at 1C (30±4°C)
2. **Rest**: 1 hour for equilibration
3. **HPPC pulse sequence** (for each SOC point):
   - 10s discharge pulse (1C or 2C)
   - 40s rest recovery
   - 10s charge pulse (0.75C or 1.5C)
   - 40s rest recovery
4. **Discharge to next SOC**: 1C to target SOC
5. **Repeat steps 3-4**: Down to 10% SOC
6. **Final discharge**: To cutoff voltage

**Analysis:**
- DCIR = ΔV / I_pulse (at each SOC)
- Available power = V_min × I_discharge`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// IEC 62133
// ─────────────────────────────────────────────────────────────────────────────

export const iec62133: ArticleContent = {
  docId: "iec-62133",
  sections: [
    {
      heading: "IEC 62133 标准概述",
      headingEn: "IEC 62133 Standard Overview",
      content: `**IEC 62133 简介**

IEC 62133 是全球应用最广泛的便携式密封二次锂电池安全标准，规定了电池在正常使用和合理可预见的误用情况下的安全要求。

**适用范围：**
- 便携式电子设备用锂离子电池
- 便携式电子产品用镍镉/镍氢电池
- 额定电压 ≤ 60V DC

**主要测试项目：**
| 测试项目 | 说明 |
|---------|------|
| 连续低速率充电 | 评估长期浮充电安全性 |
| 振动测试 | 模拟运输振动环境 |
| 热滥用测试 | 高温环境下的安全性 |
| 温度循环 | 温度骤变对电池的影响 |
| 短路测试 | 外部短路时的安全反应 |
| 强制放电测试 | 电池反向充电时的安全性 |

**新威尔 BTS 系统可执行其中大部分电化学测试。**`,
      contentEn: `**IEC 62133 Overview**

IEC 62133 is the most widely used safety standard for portable sealed secondary lithium batteries.

**Scope:**
- Li-ion batteries for portable electronics
- Rated voltage ≤ 60V DC

**Key tests:**
| Test | Description |
|------|-------------|
| Continuous low-rate charge | Long-term float charge safety |
| Vibration | Transport simulation |
| Thermal abuse | High temperature safety |
| Temperature cycling | Thermal shock effects |
| Short circuit | External short response |
| Forced discharge | Reverse charge safety |`,
    },
    {
      heading: "新威尔设备执行 IEC 62133 测试",
      headingEn: "Running IEC 62133 Tests on Neware Equipment",
      content: `**IEC 62133 测试在新威尔设备上的配置**

**1. 连续低速率充电测试（Clause 7.2.2）：**
- 使用 CC 恒流充电至规定的截止电压
- 静置 1 小时
- 重复充电/静置周期共 7 天
- 观察电池是否有泄漏、起火、爆炸

**2. 振动测试：**（需配合振动台）
- 在 BTS 中设置特定 SOC 点
- 配合振动设备进行联合测试

**3. 温度循环测试：**
- BTS 支持与温箱集成
- 设置不同温度阶段的充放电步骤
- 自动执行循环温度曲线

**4. 强制放电测试：**
- 设置电池放电至 0V（或负电压）
- 观察电池反应

**注意事项：**
- 需参考 IEC 62133 最新版本（当前为 IEC 62133:2017/EN 62133:2017）
- 不同地区（IEC、UL、JIS）版本可能有细微差异
- 建议在执行前与认证机构确认测试要求`,
      contentEn: `**IEC 62133 Tests on Neware Equipment**

**1. Continuous Low-Rate Charge (Clause 7.2.2):**
- CC charge to cutoff voltage
- Rest 1 hour
- Repeat cycle for 7 days
- Monitor for leakage, fire, explosion

**2. Vibration Test:** (requires vibration table)
- Set specific SOC in BTS
- Combined test with BTS + vibration equipment

**3. Temperature Cycling:**
- BTS supports integration with environmental chambers
- Set charge/discharge at different temperature stages

**4. Forced Discharge Test:**
- Discharge to 0V (or negative voltage)
- Observe battery response`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// UN 38.3
// ─────────────────────────────────────────────────────────────────────────────

export const un383: ArticleContent = {
  docId: "un383",
  sections: [
    {
      heading: "UN 38.3 测试标准概述",
      headingEn: "UN 38.3 Overview",
      content: `**UN 38.3 锂电池运输安全测试**

UN 38.3 是联合国《危险货物运输建议书》中规定的锂电池运输安全测试，是全球锂电池运输的强制性要求。

**适用对象：**
- 锂金属电池
- 锂离子电池
- 包含锂电池的设备

**8 项测试要求：**
| T.1 | 高度模拟 | 模拟 15000m 高空低压环境 |
| T.2 | 温度试验 | -40°C ~ +75°C 极端温度循环 |
| T.3 | 振动测试 | 模拟运输振动（正弦振动） |
| T.4 | 冲击测试 | 模拟运输冲击（6 个方向） |
| T.5 | 外部短路 | 外部 100mΩ 短路测试 |
| T.6 | 撞击测试 | 锂离子电池专用（15.24mm 钢棒撞击） |
| T.7 | 强制放电 | 电池强制反向放电测试 |
| T.8 | 温度试验（增强版） | 更严格的温度循环要求 |

**新威尔 BTS 系统可执行的测试：** T.2（部分）、T.7 强制放电、T.5 短路（需辅助设备）。`,
      contentEn: `**UN 38.3 Lithium Battery Transport Safety Tests**

UN 38.3 is a mandatory requirement for lithium battery transport worldwide.

**8 test requirements:**
| T.1 | Altitude simulation | 15000m low pressure |
| T.2 | Thermal test | -40°C ~ +75°C cycling |
| T.3 | Vibration | Transport simulation |
| T.4 | Shock | 6-directional impact |
| T.5 | External short | 100mΩ external short |
| T.6 | Impact | Li-ion only (15.24mm steel bar) |
| T.7 | Forced discharge | Reverse charge test |
| T.8 | Temperature (enhanced) | Stricter cycling |

**Tests executable on Neware BTS:** T.2 (partial), T.7, T.5 (with auxiliary equipment).`,
    },
    {
      heading: "强制放电测试步骤",
      headingEn: "Forced Discharge Test Procedure",
      content: `**T.7 强制放电测试**

**测试目的：** 评估电池在被迫反向充电时的安全性能。

**测试步骤：**

1. 电池先以 0.2C 放电至截止电压
2. 接着以等于 1C 的电流对电池进行反向充电，持续 90 分钟
3. 观察 6 小时内是否有起火、爆炸
4. 记录测试结果

**BTS 软件设置：**
- 步骤 1：CC 放电至截止电压（0.2C 放电）
- 步骤 2：CC 充电（电流设为 -1×额定电流），持续 90 分钟

**注意事项：**
- 部分设备支持负电流方向放电
- 如不支持，可通过串联电池实现等效反向充电
- 测试过程需做好安全防护措施`,
      contentEn: `**T.7 Forced Discharge Test**

**Purpose:** Evaluate battery safety under forced reverse charging.

**Steps:**

1. Discharge to cutoff at 0.2C
2. Reverse charge at 1C current for 90 minutes
3. Monitor for fire/explosion for 6 hours
4. Record results

**BTS settings:**
- Step 1: CC discharge to cutoff (0.2C)
- Step 2: CC charge at -1× rated current for 90 min`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// UL 1642
// ─────────────────────────────────────────────────────────────────────────────

export const ul1642: ArticleContent = {
  docId: "ul1642",
  sections: [
    {
      heading: "UL 1642 标准概述",
      headingEn: "UL 1642 Standard Overview",
      content: `**UL 1642 锂电池安全标准**

UL 1642 是美国 UL 安全实验室制定的锂电池安全标准，主要关注电池在异常条件下的安全性能。

**与 IEC 62133 的区别：**
- UL 1642 主要针对电池本身的安全性
- IEC 62133 侧重于含电池的成品设备
- 两者有部分测试项目重叠但判定标准不同

**UL 1642 主要测试项目（新威尔设备可执行部分）：**
- 短路测试（室温、高温）
- 异常充电测试（过充保护）
- 强制放电测试
- 热滥用测试（高温放置）

**注意事项：**
- UL 1642 测试通常需要第三方认证机构（如 UL、TÜV、SGS）执行
- 新威尔设备可作为测试平台，执行电池的电化学测试步骤
- 最终认证需由具备资质的实验室完成`,
      contentEn: `**UL 1642 Lithium Battery Safety Standard**

UL 1642 focuses on battery safety under abnormal conditions, primarily for US market certification.

**Key tests (executable on Neware):**
- Short circuit test (room temp, high temp)
- Abnormal charging (overcharge protection)
- Forced discharge
- Thermal abuse (high temperature exposure)`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS8 TROUBLESHOOTING
// ─────────────────────────────────────────────────────────────────────────────

export const bts8_troubleshooting: ArticleContent = {
  docId: "bts8-troubleshooting",
  sections: [
    {
      heading: "常见连接问题与解决方案",
      headingEn: "Common Connection Issues & Solutions",
      content: `**问题 1：软件识别不到设备**
- 检查网线连接是否正常
- 确认电脑和中继机的 IP 在同一网段（如 192.168.1.x）
- 重启中继机和电脑
- 确认防火墙未阻止 BTS 软件的网络通信
- 在中继机上查看连接状态指示灯

**问题 2：中继机无法连接**
- 手动设置电脑 IP，与中继机同一网段
- 关闭电脑防火墙（测试阶段）
- 使用 ping 命令测试连通性：ping 192.168.1.100
- 检查中继机设置页面（通常在 192.168.1.100）

**问题 3：通道进入保护模式**
- 检查电池电压是否在设备允许范围内
- 检查电池正负极是否接反
- 检查夹具接触是否良好
- 重启测试仪通道
- 查阅设备规格确认电压/电流量程是否匹配

**问题 4：通讯超时错误**
- 网络延迟过高时会出现
- 检查网络质量，尽量使用有线网络
- 减少同一网络上的设备数量`,
      contentEn: `**Issue 1: Software can't detect device**
- Check Ethernet cable connection
- Verify PC and middle machine IP in same segment
- Restart middle machine and PC
- Check firewall settings
- Check status LEDs on middle machine

**Issue 2: Middle machine connection failed**
- Manually set PC IP to same segment
- Disable firewall (for testing)
- Test with ping: ping 192.168.1.100
- Access middle machine setup page (192.168.1.100)

**Issue 3: Channel enters protection mode**
- Check battery voltage within equipment range
- Check polarity connection
- Check fixture contact quality
- Restart tester channel
- Verify voltage/current range matches

**Issue 4: Communication timeout**
- Network latency too high
- Use wired connection
- Reduce devices on same network`,
    },
    {
      heading: "通道保护模式详解",
      headingEn: "Channel Protection Mode Details",
      content: `**通道进入保护模式的原因**

保护模式是设备的安全机制，当检测到异常时会自动停止测试以保护电池和设备。

**触发保护模式的常见原因：**

1. **过压保护**：电池电压超过通道允许的最大电压
2. **欠压保护**：电池电压低于通道允许的最小电压
3. **过流保护**：电流超出电流量程
4. **温度保护**（有此功能的型号）：设备内部温度过高
5. **极性反接**：电池正负极接反

**如何退出保护模式：**
1. 移除电池
2. 在软件中右键点击通道
3. 选择"重启通道"或"Reset Channel"
4. 检查并排除问题原因后重新开始测试

**预防措施：**
- 测试前仔细核对电池规格与设备量程匹配
- 使用前检查夹具和连线是否完好
- 避免在无人值守时运行高功率测试`,
      contentEn: `**Why channels enter protection mode**

Protection mode is a safety mechanism that stops testing when abnormalities are detected.

**Common triggers:**
1. **Over-voltage**: Battery voltage exceeds channel limit
2. **Under-voltage**: Battery voltage below channel minimum
3. **Over-current**: Current exceeds range
4. **Temperature** (where applicable): Internal temperature too high
5. **Polarity reversed**: Battery connected incorrectly

**How to exit protection mode:**
1. Remove battery
2. Right-click channel in software
3. Select "Restart Channel" or "Reset Channel"
4. Fix the issue before restarting`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// IGBT GUIDE
// ─────────────────────────────────────────────────────────────────────────────

export const igbt_guide: ArticleContent = {
  docId: "igbt-guide",
  sections: [
    {
      heading: "IGBT 系统概述",
      headingEn: "IGBT System Overview",
      content: `**IGBT 大功率电池 PACK 测试系统**

IGBT 系列是新威尔的大功率能量回馈型（再生型）测试系统，专门设计用于电池模组（PACK）和大型电池测试。

**主要特点：**
- **能量回馈**：放电能量回馈电网，综合节能 70% 以上
- **大电流**：支持高达 3000A 电流输出
- **高电压**：支持 60V ~ 1000V 电压范围
- **一体化设计**：中继机与测试仪一体化，简化安装

**常见型号：**
| 型号 | 电压 | 电流 | 通道 |
|------|------|------|------|
| IGBT-60V1000A | 60V | 1000A | 1CH |
| IGBT-500V300A | 500V | 300A | 2CH |
| IGBT-600V400A | 600V | 400A | 1CH |
| IGBT-1000V600A | 1000V | 600A | 1CH |

**2 通道可并联**：双通道型号支持并联输出，实现双倍电流`,
      contentEn: `**IGBT High Power Battery PACK Testing Systems**

IGBT series are Neware's high-power regenerative testing systems for battery modules (PACK) and large battery testing.

**Key features:**
- **Energy feedback**: Discharge energy returned to grid, 70%+ energy savings
- **High current**: Up to 3000A output
- **High voltage**: 60V ~ 1000V range
- **All-in-one**: Controller integrated, simplified installation

**Common models:**
| Model | Voltage | Current | Channels |
|-------|---------|---------|----------|
| IGBT-60V1000A | 60V | 1000A | 1CH |
| IGBT-500V300A | 500V | 300A | 2CH |
| IGBT-600V400A | 600V | 400A | 1CH |
| IGBT-1000V600A | 1000V | 600A | 1CH |`,
    },
    {
      heading: "IGBT 操作指南",
      headingEn: "IGBT Operation Guide",
      content: `**IGBT 系统操作步骤**

1. **硬件连接**
   - IGBT 设备为一体机，中继机已内置
   - 使用 TCP/IP 直连电脑（网线连接）
   - 连接电池到设备端子排（注意正负极）

2. **软件设置**
   - 使用 BTS8.0 软件（与 BTS4000 相同）
   - 通道识别后进行 Reset Map
   - 设置测试步骤

3. **能量回馈设置**
   - 确保电网连接正常（三相交流）
   - 能量回馈功能默认开启
   - 无需额外配置

4. **注意事项**
   - IGBT 设备功率大，散热系统需要良好通风
   - 高压操作需专业培训
   - 定期检查冷却系统`,
      contentEn: `**IGBT System Operation**

1. **Hardware Connection**
   - IGBT is all-in-one with built-in controller
   - TCP/IP direct connection to PC
   - Connect battery to terminal (observe polarity)

2. **Software Settings**
   - Use BTS8.0 (same as BTS4000)
   - Reset Map after channel detection
   - Configure test steps

3. **Energy Feedback**
   - Ensure proper AC grid connection (three-phase)
   - Feedback enabled by default
   - No additional configuration needed`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// HARDWARE WIRING
// ─────────────────────────────────────────────────────────────────────────────

export const hardware_wiring: ArticleContent = {
  docId: "hardware-wiring",
  sections: [
    {
      heading: "电脑与中继机连接",
      headingEn: "PC to Middle Machine Connection",
      content: `**TCP/IP 网络连接**

**所需材料：**
- 超五类或六类网线（长度根据现场环境）
- 电脑需有以太网口（或使用 USB-网口转换器）

**连接步骤：**

1. 使用网线连接电脑网口和中继机网口
2. 电脑端设置固定 IP：
   - IP 地址：192.168.1.50（示例）
   - 子网掩码：255.255.255.0
   - 默认网关：留空或设为 192.168.1.100

3. 中继机端设置（通常在设备屏幕或网页界面）：
   - IP 地址：192.168.1.100（示例）
   - 子网掩码：255.255.255.0
   - 端口：5000（或默认端口）

4. 测试连通性：
   - Windows 命令行：ping 192.168.1.100
   - 收到回复即表示连接成功

**注意事项：**
- 电脑和中继机必须在同一网段（192.168.1.x）
- 如有路由器，可使用路由器分配 IP（DHCP 模式）
- 建议记录每台设备的 IP 地址，便于管理`,
      contentEn: `**TCP/IP Network Connection**

**Steps:**

1. Connect PC Ethernet port to middle machine with cable
2. Set PC fixed IP: 192.168.1.50, subnet: 255.255.255.0
3. Set middle machine IP: 192.168.1.100, same subnet
4. Test: ping 192.168.1.100

**Note:** PC and middle machine must be in same segment (192.168.1.x)`,
    },
    {
      heading: "中继机与测试仪 RS-485 连接",
      headingEn: "Middle Machine to Tester RS-485 Connection",
      content: `**RS-485 通讯连接**

**连接方式：**
- 中继机 COM 口 → 测试仪 RS-485 接口
- 使用 RJ45 网线或专用 RS-485 线缆
- 注意 RS-485 的 A/B 极性（不可接反）

**多台测试仪串联：**
- 依次串联多个测试仪的 RS-485 接口
- 总线拓扑，最后一台设备需要接终端电阻
- 软件中会自动扫描并识别所有通道

**常见问题：**
- 通讯不稳定：检查 RS-485 线缆长度（一般不超过 1000 米）
- 无法识别通道：确认 A/B 极性正确
- 丢帧：检查线缆屏蔽是否接地良好`,
      contentEn: `**RS-485 Communication**

- Middle machine COM → Tester RS-485 interface
- Use RJ45 cable or dedicated RS-485 cable
- Observe A/B polarity (do not reverse)

**Multi-tester series connection:**
- Connect RS-485 ports in daisy chain
- Terminate last device with resistor
- Software auto-scans and detects all channels`,
    },
    {
      heading: "电池与夹具接线",
      headingEn: "Battery and Fixture Wiring",
      content: `**电池接线安全规范**

**接线步骤：**
1. 确保测试仪电源已关闭
2. 将电池放入夹具，确保极性正确
3. 连接夹具引线到测试仪通道端子
4. 检查所有连接是否牢固
5. 开启测试仪电源
6. 在软件中确认通道状态正常后再开始测试

**极性说明：**
- 黑色/蓝色端子：负极（-）
- 红色端子：正极（+）
- 接线前务必确认电池正负极

**安全注意事项：**
- 切勿带电接线
- 切勿将 2 节电池同时接入 1 个通道
- 切勿超过设备的电压/电流量程
- 使用绝缘工具操作
- 高压设备操作需佩戴绝缘手套`,
      contentEn: `**Battery Wiring Safety**

1. Ensure tester power is OFF
2. Place battery in fixture, verify polarity
3. Connect fixture leads to channel terminals
4. Verify all connections are secure
5. Power on tester
6. Confirm channel status in software before starting

**Safety notes:**
- Never wire with power on
- Never connect 2 batteries to 1 channel
- Never exceed voltage/current range
- Use insulated tools
- Wear insulated gloves for high voltage`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CHAMBER INTEGRATION
// ─────────────────────────────────────────────────────────────────────────────

export const chamber_integration: ArticleContent = {
  docId: "chamber-integration",
  sections: [
    {
      heading: "温箱集成概述",
      headingEn: "Chamber Integration Overview",
      content: `**环境试验箱与 BTS 系统集成**

新威尔支持与主流环境试验箱（高低温箱）集成，实现温度与电化学联合测试。

**集成方式：**

1. **独立控制模式**（推荐）
   - BTS 系统和温箱独立运行
   - BTS 软件设置测试步骤和参数
   - 温箱独立控制温度曲线
   - 需要人工协调温度和测试阶段

2. **通讯控制模式**（高级）
   - BTS 软件与温箱通过通讯接口连接
   - 软件中设置温度触发条件
   - 实现温度和充放电步骤自动联动
   - 通常通过 RS-232/RS-485 或 TCP/IP 通讯

**测试场景：**
- 高低温循环测试
- 温度特性测试（不同温度下的容量/内阻）
- 热滥用评估
- 加速老化测试`,
      contentEn: `**Environmental Chamber Integration**

Integrating BTS systems with temperature chambers for thermal-electrical combined testing.

**Integration modes:**

1. **Independent control** (recommended)
   - BTS and chamber operate independently
   - Manual coordination of temperature and test phases

2. **Communication control** (advanced)
   - BTS software connects to chamber via RS-232/RS-485 or TCP/IP
   - Auto-link temperature and charge/discharge steps
   - Temperature triggers configured in software`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CYLINDRICAL HOLDER
// ─────────────────────────────────────────────────────────────────────────────

export const cylindrical_holder: ArticleContent = {
  docId: "cylindrical-holder",
  sections: [
    {
      heading: "圆柱电池夹具使用方法",
      headingEn: "Cylindrical Battery Holder Usage",
      content: `**圆柱电池夹具使用规范**

**支持的电池型号：**
- 18650（直径 18mm，长度 65mm）
- 21700（直径 21mm，长度 70mm）
- 26650（直径 26mm，长度 65mm）
- 其他标准圆柱电池

**使用步骤：**
1. 打开夹具，将电池放入凹槽
2. 确保电池与电极接触良好
3. 确认正负极方向正确
4. 闭合夹具并固定
5. 连接夹具引线到测试仪通道

**注意事项：**
- 每次测试前检查夹具电极是否氧化或损坏
- 接触不良会导致测量误差增大
- 大批量测试建议使用专用电池夹具架
- 测试结束后及时清理夹具电极`,
      contentEn: `**Cylindrical Battery Holder Guide**

**Supported models:** 18650, 21700, 26650 and other standard cylindrical batteries.

**Usage:**
1. Open holder, place battery in groove
2. Ensure good electrode contact
3. Verify polarity direction
4. Close and secure holder
5. Connect leads to tester channel`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// BTS8 DATA EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export const bts8_data_export: ArticleContent = {
  docId: "bts8-data-export",
  sections: [
    {
      heading: "BTS8.0 数据导出方法",
      headingEn: "BTS8.0 Data Export Methods",
      content: `**数据导出格式与步骤**

BTS8.0 支持多种数据导出格式：

**1. Excel 格式（.xls / .xlsx）**
- 在 BTS8.0 中选择通道和数据范围
- 文件 → 导出 → Excel
- 选择需要的列（时间、电压、电流、容量、能量等）
- 保存到指定位置

**2. NDA 格式（原始数据）**
- NDA 是 BTS 专用格式，保存完整测试数据
- 包含所有采样点的原始数据
- 可用 BTSDA 软件打开分析
- 导出：文件 → 导出 → NDA

**3. 文本格式（.txt / .csv）**
- 适用于第三方数据分析软件（如 MATLAB、Python）
- 文件 → 导出 → 文本
- 选择分隔符（逗号或制表符）

**批量导出：**
- 使用批量备份功能一次性导出多个通道/时间段的数据
- 避免手动逐个导出浪费时间`,
      contentEn: `**Data Export Formats in BTS8.0**

**1. Excel (.xls / .xlsx)**
- File → Export → Excel
- Select columns (time, voltage, current, capacity, energy)
- Save to location

**2. NDA format** (original data)
- BTSDA-compatible format
- Contains all raw sampling data
- File → Export → NDA

**3. Text (.txt / .csv)**
- For third-party tools (MATLAB, Python)
- File → Export → Text
- Choose delimiter (comma or tab)`,
    },
    {
      heading: "文件管理与存储优化",
      headingEn: "File Management & Storage Optimization",
      content: `**文件管理建议**

**自动备份设置：**
- 在 BTS8.0 中设置自动备份间隔（如每 24 小时）
- 选择备份存储路径（建议使用 NAS 或外接硬盘）
- 设置保留天数，自动清理过期数据

**存储优化：**
- 高采样率测试（10Hz 或以上）会产生大量数据
- 建议定期导出并删除本地历史数据
- 使用压缩格式存储，减少磁盘占用

**数据命名规范：**
- 建议命名格式：项目名称_电池型号_测试日期_通道号
- 例如：LFP-501010_18650_20240315_CH1.nda
- 便于后期查找和管理`,
      contentEn: `**File Management Tips**

**Auto-backup:**
- Set auto-backup interval in BTS8.0 (e.g. every 24h)
- Use NAS or external drive for backup storage
- Set retention period for auto-cleanup

**Storage optimization:**
- High sampling rate tests (10Hz+) generate large files
- Export and delete old data regularly
- Use compression to save disk space`,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Map from docId → article content
// ─────────────────────────────────────────────────────────────────────────────

export const articleContents: Record<string, ArticleContent> = {
  "bts4000-quickstart": bts4000_quickstart,
  "bts4000-test-profiles": bts4000_test_profiles,
  "bts4000-dcir": bts4000_dcir,
  "bts4000-pulse": bts4000_pulse,
  "bts9000-quickstart": bts9000_quickstart,
  "bts4000-triple-range": bts4000_triple_range,
  "bts9000-dcir": bts9000_dcir,
  "bts9000-crate": bts9000_crate,
  "btsda-customize-curves": btsda_customize_curves,
  "btsda-dqdv": btsda_dqdv,
  "btsda-supercapacitor": btsda_supercapacitor,
  "bts4000-cycle-life": bts4000_cycle_life,
  "bts4000-retention": bts4000_retention,
  "bts9000-usabc-hppc": bts9000_usabc_hppc,
  "iec-62133": iec62133,
  "un383": un383,
  "ul1642": ul1642,
  "bts8-troubleshooting": bts8_troubleshooting,
  "long-cycling-data": bts8_backup,
  "igbt-guide": igbt_guide,
  "hardware-wiring": hardware_wiring,
  "chamber-integration": chamber_integration,
  "cylindrical-holder": cylindrical_holder,
  "software-overview": software_overview,
  "ce6000-guide": ce6000_guide,
  "bts8-data-export": bts8_data_export,
};

export function getArticleContent(docId: string): ArticleContent | undefined {
  return articleContents[docId];
}
