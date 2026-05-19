import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";

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
    title: isZh ? "隐私政策" : isVi ? "Chính sách bảo mật" : isRu ? "Политика конфиденциальности" : "Privacy Policy",
    description: isZh
      ? "深圳市新威尔电子有限公司隐私政策，说明我们如何收集、使用和保护您的个人信息。"
      : isVi
      ? "Chính sách bảo mật của Công ty TNHH Điện tử Neware Thâm Quyến - cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn."
      : isRu
      ? "Политика конфиденциальности Shenzhen Neware Electronics Co., Ltd. — как мы собираем, используем и защищаем вашу персональную информацию."
      : "Privacy Policy for Shenzhen Neware Electronics Co., Ltd. — how we collect, use, and protect your personal information.",
    keywords: isZh
      ? ["隐私政策", "个人信息保护", "数据安全", "Cookie政策", "用户权利"]
      : isVi
      ? ["Chính sách bảo mật", "Bảo vệ thông tin cá nhân", "An ninh dữ liệu", "Chính sách Cookie", "Quyền của người dùng"]
      : isRu
      ? ["политика конфиденциальности", "защита персональных данных", "безопасность данных", "политика cookie", "права пользователей"]
      : ["privacy policy", "personal data protection", "data security", "cookie policy", "user rights"],
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        en: "/en/privacy",
        zh: "/zh/privacy",
        vi: "/vi/privacy",
        ru: "/ru/privacy",
        "x-default": "/en/privacy",
      },
    },
    openGraph: {
      title: isZh ? "隐私政策 | NEWARE" : isVi ? "Chính sách bảo mật | NEWARE" : isRu ? "Политика конфиденциальности | NEWARE" : "Privacy Policy | NEWARE",
      description: isZh
        ? "深圳市新威尔电子有限公司隐私政策"
        : isVi
        ? "Chính sách bảo mật NEWARE"
        : isRu
        ? "Политика конфиденциальности NEWARE"
        : "NEWARE privacy policy",
      url: `${SITE_URL}/${locale}/privacy`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: isRu ? "Политика конфиденциальности NEWARE" : "NEWARE Privacy Policy" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : isRu ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      title: isZh ? "隐私政策 | NEWARE" : isVi ? "Chính sách bảo mật | NEWARE" : isRu ? "Политика конфиденциальности | NEWARE" : "Privacy Policy | NEWARE",
      description: isZh
        ? "深圳市新威尔电子有限公司隐私政策"
        : isVi
        ? "Chính sách bảo mật NEWARE"
        : isRu
        ? "Политика конфиденциальности NEWARE"
        : "NEWARE privacy policy",
      images: [ogImage],
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {isZh ? "隐私政策" : isVi ? "Chính sách bảo mật" : "Privacy Policy"}
          </h1>
          <p className="text-lg text-blue-100">
            {isZh ? "最近更新：2026年1月" : isVi ? "Cập nhật lần cuối: Tháng 1 năm 2026" : "Last updated: January 2026"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-slate max-w-none">
          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "信息收集" : isVi ? "Thông tin chúng tôi thu thập" : "Information We Collect"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "我们收集您主动提供的信息，包括但不限于：姓名、电子邮件地址、公司名称、电话号码以及您通过联系表单提交的任何其他信息。我们不会在您访问网站时收集个人身份信息。"
                : isVi
                ? "Chúng tôi thu thập thông tin bạn chủ động cung cấp, bao gồm nhưng không giới hạn ở: tên, địa chỉ email, tên công ty, số điện thoại và bất kỳ thông tin nào khác bạn gửi qua biểu mẫu liên hệ."
                : "We collect information you voluntarily provide, including but not limited to: name, email address, company name, phone number, and any other information you submit through the contact form."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "当您浏览我们的网站时，我们可能会自动收集某些技术信息，例如您的IP地址、浏览器类型、操作系统以及您访问的页面。这些信息用于改善网站功能和用户体验。"
                : isVi
                ? "Khi bạn duyệt trang web của chúng tôi, chúng tôi có thể tự động thu thập một số thông tin kỹ thuật như địa chỉ IP, loại trình duyệt, hệ điều hành và các trang bạn truy cập. Thông tin này được sử dụng để cải thiện chức năng trang web và trải nghiệm người dùng."
                : "When you browse our website, we may automatically collect certain technical information such as your IP address, browser type, operating system, and pages you visit. This information is used to improve website functionality and user experience."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "信息使用" : isVi ? "Cách chúng tôi sử dụng thông tin" : "How We Use Your Information"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "我们使用收集的信息用于：响应您的咨询请求、提供产品报价、与您沟通相关业务、以及改进我们的网站和服务。您的信息不会被出售、出租或以其他方式转让给第三方用于营销目的。"
                : isVi
                ? "Chúng tôi sử dụng thông tin thu thập được để: phản hồi các yêu cầu tư vấn của bạn, cung cấp báo giá sản phẩm, giao tiếp với bạn về các vấn đề kinh doanh liên quan, và cải thiện trang web và dịch vụ của chúng tôi."
                : "We use collected information to: respond to your inquiries, provide product quotes, communicate with you regarding relevant business, and improve our website and services."}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>{isZh ? "处理产品咨询和报价请求" : isVi ? "Xử lý yêu cầu tư vấn và báo giá sản phẩm" : "Process product inquiries and quote requests"}</li>
              <li>{isZh ? "提供技术支持和售后服务" : isVi ? "Cung cấp hỗ trợ kỹ thuật và dịch vụ sau bán hàng" : "Provide technical support and after-sales service"}</li>
              <li>{isZh ? "发送产品更新和维护通知" : isVi ? "Gửi thông báo cập nhật sản phẩm và bảo trì" : "Send product updates and maintenance notifications"}</li>
              <li>{isZh ? "分析网站使用情况以改善用户体验" : isVi ? "Phân tích việc sử dụng trang web để cải thiện trải nghiệm người dùng" : "Analyze website usage to improve user experience"}</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "信息共享" : isVi ? "Chia sẻ thông tin" : "Information Sharing"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "我们不会出售、出租或以其他方式转让您的个人信息给第三方用于营销目的。我们可能会在以下情况下与第三方共享您的信息："
                : isVi
                ? "Chúng tôi không bán, cho thuê hoặc chuyển nhượng thông tin cá nhân của bạn cho bên thứ ba cho mục đích tiếp thị. Chúng tôi có thể chia sẻ thông tin của bạn với bên thứ ba trong các trường hợp sau:"
                : "We do not sell, rent, or otherwise transfer your personal information to third parties for marketing purposes. We may share your information with third parties in the following circumstances:"}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>{isZh ? "服务提供商：帮助我们运营网站和业务的第三方服务商" : isVi ? "Nhà cung cấp dịch vụ: Các nhà cung cấp dịch vụ bên thứ ba giúp chúng tôi vận hành trang web và kinh doanh" : "Service providers: Third-party vendors who help us operate the website and business"}</li>
              <li>{isZh ? "法律要求：在法律要求或政府要求时" : isVi ? "Yêu cầu pháp lý: Khi được yêu cầu bởi pháp luật hoặc chính phủ" : "Legal requirements: When required by law or government request"}</li>
              <li>{isZh ? "业务转让：合并、收购或资产出售时" : isVi ? "Chuyển nhượng kinh doanh: Trong trường hợp sáp nhập, mua lại hoặc bán tài sản" : "Business transfers: In case of merger, acquisition, or asset sale"}</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "数据安全" : isVi ? "Bảo mật dữ liệu" : "Data Security"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "我们采取合理的技术和管理措施来保护您的个人信息，防止未经授权的访问、使用或泄露。所有数据传输均使用SSL加密。"
                : isVi
                ? "Chúng tôi áp dụng các biện pháp kỹ thuật và hành chính hợp lý để bảo vệ thông tin cá nhân của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép. Tất cả truyền dữ liệu đều được mã hóa SSL."
                : "We take reasonable technical and administrative measures to protect your personal information against unauthorized access, use, or disclosure. All data transmission is encrypted using SSL."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">{isZh ? "技术措施" : isVi ? "Biện pháp kỹ thuật" : "Technical Measures"}</h3>
                <p className="text-sm text-slate-600">
                  {isZh ? "SSL加密、防火墙、安全服务器" : isVi ? "Mã hóa SSL, Tường lửa, Máy chủ bảo mật" : "SSL encryption, firewalls, secure servers"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">{isZh ? "管理措施" : isVi ? "Biện pháp quản lý" : "Administrative Measures"}</h3>
                <p className="text-sm text-slate-600">
                  {isZh ? "访问控制、定期安全审计、员工培训" : isVi ? "Kiểm soát truy cập, Đánh giá bảo mật định kỳ, Đào tạo nhân viên" : "Access control, regular security audits, employee training"}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "Cookie政策" : isVi ? "Chính sách Cookie" : "Cookies"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "我们的网站使用Cookie来改善用户体验。Cookie是存储在您设备上的小型文本文件，可帮助网站记住您的偏好和设置。"
                : isVi
                ? "Trang web của chúng tôi sử dụng Cookie để cải thiện trải nghiệm người dùng. Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn để giúp trang web ghi nhớ sở thích và cài đặt của bạn."
                : "Our website uses cookies to improve user experience. Cookies are small text files stored on your device that help the website remember your preferences and settings."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "您可以通过浏览器设置拒绝Cookie。但请注意，禁用Cookie可能会影响网站某些功能的正常使用。"
                : isVi
                ? "Bạn có thể từ chối Cookie thông qua cài đặt trình duyệt. Tuy nhiên, việc tắt Cookie có thể ảnh hưởng đến chức năng bình thường của trang web."
                : "You may refuse cookies through browser settings. However, disabling cookies may affect the normal functionality of the website."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "您的权利" : isVi ? "Quyền của bạn" : "Your Rights"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "根据适用的数据保护法律，您拥有以下权利："
                : isVi
                ? "Theo luật bảo vệ dữ liệu hiện hành, bạn có các quyền sau:"
                : "Under applicable data protection laws, you have the following rights:"}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>{isZh ? "访问权：请求获取我们持有的关于您的个人信息" : isVi ? "Quyền truy cập: Yêu cầu truy cập thông tin cá nhân mà chúng tôi lưu giữ về bạn" : "Access right: Request access to your personal information we hold"}</li>
              <li>{isZh ? "更正权：要求更正不准确的个人信息" : isVi ? "Quyền sửa chữa: Yêu cầu sửa chữa thông tin cá nhân không chính xác" : "Correction right: Request correction of inaccurate personal information"}</li>
              <li>{isZh ? "删除权：要求删除您的个人信息" : isVi ? "Quyền xóa: Yêu cầu xóa thông tin cá nhân của bạn" : "Deletion right: Request deletion of your personal information"}</li>
              <li>{isZh ? "撤回同意：随时撤回您之前给予的同意" : isVi ? "Quyền rút lại sự đồng ý: Rút lại sự đồng ý của bạn bất kỳ lúc nào" : "Withdraw consent: Withdraw your consent at any time"}</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "联系我们" : isVi ? "Liên hệ với chúng tôi" : "Contact Us"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "如果您对本隐私政策有任何疑问或想行使您的权利，请通过以下方式联系我们："
                : isVi
                ? "Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc muốn thực hiện quyền của mình, vui lòng liên hệ với chúng tôi qua:"
                : "If you have any questions about this privacy policy or wish to exercise your rights, please contact us at:"}
            </p>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <p className="text-slate-700">
                <strong>Email:</strong> info@batteryxlab.shop
              </p>
              <p className="text-slate-700">
                <strong>{isZh ? "地址：" : isVi ? "Địa chỉ:" : "Address:"}</strong>
                {isZh
                  ? "深圳市南山区科技园南区高新南七道R2-B栋5楼"
                  : isVi
                  ? "Tầng 5, Tòa R2-B, Khu vực phía Nam của Công viên Khoa học và Công nghệ, Quận Nanshan, Thâm Quyến"
                  : "5th Floor, Building R2-B, South Area of Science and Technology Park, Nanshan District, Shenzhen"}
              </p>
            </div>
          </section>

          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            <Link
              href={`/${locale}/terms`}
              className="text-primary hover:underline text-sm"
            >
              {isZh ? "查看使用条款 →" : isVi ? "Xem Điều khoản sử dụng →" : "View Terms of Use →"}
            </Link>
            <Link
              href={`/${locale}`}
              className="text-primary hover:underline text-sm"
            >
              {isZh ? "← 返回首页" : isVi ? "← Quay về trang chủ" : "← Back to Home"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
