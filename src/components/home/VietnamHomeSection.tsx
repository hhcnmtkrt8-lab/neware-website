"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export function VietnamHomeSection() {
  const params = useParams();
  const locale = (params.locale as string) || "vi";

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
            <circle cx="200" cy="150" r="120" stroke="white" strokeWidth="0.5" />
            <circle cx="600" cy="400" r="180" stroke="white" strokeWidth="0.5" />
            <circle cx="400" cy="300" r="80" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="300" x2="800" y2="300" stroke="white" strokeWidth="0.3" />
            <line x1="400" y1="0" x2="400" y2="600" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Văn phòng đại diện chính thức tại Việt Nam
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Thiết bị kiểm tra pin
                <br />
                <span className="text-red-200">&amp; Điện trở công nghiệp</span>
              </h1>
              <p className="text-red-100 text-lg mb-8 leading-relaxed">
                NEWARE Vietnam — Nhà phân phối chính thức thiết bị kiểm tra pin NEWARE và điện trở công nghiệp RXG20, BK6, ZX1 tại Việt Nam. Phục vụ các nhà máy sản xuất pin EV, nhà máy xi măng, khai khoáng và cảng biển.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/resistors`}
                  className="inline-flex items-center gap-2 bg-white text-red-700 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Xem sản phẩm điện trở
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                >
                  Liên hệ tư vấn
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-10 text-sm">
                {[
                  { icon: "✓", text: "Chứng nhận ISO9001" },
                  { icon: "✓", text: "Bảo hành 12 tháng" },
                  { icon: "✓", text: "Hỗ trợ kỹ thuật 24/7" },
                  { icon: "✓", text: "Giao hàng toàn quốc" },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                    <span className="text-green-400 font-bold">{badge.icon}</span>
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick product categories */}
            <div className="space-y-4">
              {[
                {
                  title: "Điện trở xả RXG20",
                  desc: "Công suất 100W–5kW, bảo vệ biến tần",
                  color: "from-red-500 to-red-600",
                  href: `/${locale}/resistors/rxg20-100w`,
                },
                {
                  title: "Điện trở khởi động BK",
                  desc: "BK6, BK12 — cho động cơ 5,5–55kW",
                  color: "from-blue-500 to-blue-600",
                  href: `/${locale}/resistors/bk6-5ohm`,
                },
                {
                  title: "Điện trở dạng tủ ZX",
                  desc: "ZX1, ZX12, ZX15, ZX37 — công suất hàng trăm kW",
                  color: "from-emerald-500 to-emerald-600",
                  href: `/${locale}/resistors/zx1-100ohm`,
                },
                {
                  title: "Điện trở màng kim loại",
                  desc: "Độ chính xác cao ±0,5%–±1%",
                  color: "from-purple-500 to-purple-600",
                  href: `/${locale}/resistors/mf-100k-1w`,
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all"
                >
                  <div className={`inline-block w-1 h-12 rounded-full bg-gradient-to-b ${item.color} mr-4 shrink-0`}></div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-red-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-red-200 text-sm">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry applications strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-sm text-gray-400 mb-6">
            Được tin tưởng bởi các doanh nghiệp hàng đầu tại Việt Nam
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-gray-400 text-sm font-medium">
            {[
              "VinFast",
              "Vingroup",
              "Samsung SDI Việt Nam",
              "Panasonic Việt Nam",
              "Xi măng Nghi Sơn",
              "Cảng Đà Nẵng",
              "Cảng Cửa Lò",
            ].map((company) => (
              <span key={company} className="hover:text-gray-600 transition-colors">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Resistor categories */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Danh mục điện trở công nghiệp
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Đầy đủ các dòng điện trở cho mọi ứng dụng công nghiệp tại Việt Nam
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                color: "red",
                bg: "bg-red-50",
                border: "border-red-200",
                title: "Điện trở xả",
                subtitle: "Braking Resistors",
                models: "RXG20 (100W–5kW)",
                features: ["Vỏ nhôm tản nhiệt", "Bảo vệ biến tần", "Lắp đặt dễ dàng"],
                href: `/${locale}/resistors`,
              },
              {
                color: "blue",
                bg: "bg-blue-50",
                border: "border-blue-200",
                title: "Điện trở khởi động",
                subtitle: "Motor Starting",
                models: "BK6, BK12, JZR2",
                features: ["Giảm dòng khởi động", "Bảo vệ động cơ", "Tuổi thọ cao"],
                href: `/${locale}/resistors`,
              },
              {
                color: "emerald",
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                title: "Điện trở dạng tủ",
                subtitle: "Cabinet Resistors",
                models: "ZX1, ZX12, ZX15, ZX37",
                features: ["Công suất hàng trăm kW", "IP44/IP54", "Chịu môi trường nặng"],
                href: `/${locale}/resistors`,
              },
              {
                color: "purple",
                bg: "bg-purple-50",
                border: "border-purple-200",
                title: "Điện trở màng",
                subtitle: "Film Resistors",
                models: "Metal Film, Carbon Film",
                features: ["Độ chính xác cao", "Công suất 0,5W–3W", "Ổn định nhiệt"],
                href: `/${locale}/resistors`,
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className={`group ${cat.bg} border ${cat.border} rounded-2xl p-6 hover:shadow-lg transition-all`}
              >
                <h3 className="font-bold text-gray-900 text-lg mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{cat.subtitle}</p>
                <p className="text-xs font-mono bg-white/60 rounded px-2 py-1 mb-4 text-gray-600">
                  {cat.models}
                </p>
                <ul className="space-y-2 mb-4">
                  {cat.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="text-sm font-semibold text-red-600 group-hover:underline">
                  Xem tất cả →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vietnam */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                Tại sao chọn NEWARE Vietnam?
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Đối tác tin cậy của doanh nghiệp Việt Nam
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Với văn phòng tại Hồ Chí Minh và Hà Nội, đội ngũ kỹ sư Việt Nam am hiểu thị trường và nhu cầu địa phương. NEWARE Vietnam mang đến giải pháp thiết bị toàn diện cho ngành sản xuất pin, xi măng, khai khoáng và logistics.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Giao hàng nhanh", desc: "Hàng có sẵn tại kho Hồ Chí Minh, giao trong 24–48 giờ" },
                  { title: "Hỗ trợ kỹ thuật bằng tiếng Việt", desc: "Đội ngũ kỹ sư Việt Nam hỗ trợ 24/7" },
                  { title: "Bảo hành chính hãng", desc: "Bảo hành 12 tháng, đổi trả trong 7 ngày" },
                  { title: "Giá cạnh tranh", desc: "Nhập khẩu trực tiếp, không qua trung gian" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-3xl p-8">
              <h3 className="font-bold text-gray-800 mb-6">Liên hệ tư vấn miễn phí</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Hồ Chí Minh</p>
                    <p className="font-semibold text-gray-800">+84-28-3823-6888</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Hà Nội</p>
                    <p className="font-semibold text-gray-800">+84-24-3833-9888</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Email</p>
                    <p className="font-semibold text-gray-800">vietnam@batteryxlab.shop</p>
                  </div>
                </div>
              </div>
              <Link
                href={`/${locale}/contact`}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Gửi yêu cầu báo giá
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
