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
    title: isZh ? "使用条款" : isVi ? "Điều khoản sử dụng" : isRu ? "Условия использования" : "Terms of Use",
    description: isZh
      ? "深圳市新威尔电子有限公司网站使用条款和条件"
      : isVi
      ? "Điều khoản sử dụng website Công ty TNHH Điện tử Neware Thâm Quyến"
      : isRu
      ? "Условия использования сайта Shenzhen Neware Electronics Co., Ltd."
      : "Terms of Use for Shenzhen Neware Electronics Co., Ltd. website",
    keywords: isZh
      ? ["使用条款", "服务条款", "网站条款", "法律声明", "免责声明"]
      : isVi
      ? ["Điều khoản sử dụng", "Điều khoản dịch vụ", "Điều khoản trang web", "Tuyên bố pháp lý", "Tuyên bố từ chối trách nhiệm"]
      : isRu
      ? ["условия использования", "условия обслуживания", "правовое уведомление", "отказ от ответственности"]
      : ["terms of use", "terms of service", "website terms", "legal notice", "disclaimer"],
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {
        en: "/en/terms",
        zh: "/zh/terms",
        vi: "/vi/terms",
        ru: "/ru/terms",
        "x-default": "/en/terms",
      },
    },
    openGraph: {
      title: isZh ? "使用条款 | NEWARE" : isVi ? "Điều khoản | NEWARE" : isRu ? "Условия использования | NEWARE" : "Terms of Use | NEWARE",
      description: isZh
        ? "深圳市新威尔电子有限公司网站使用条款"
        : isVi
        ? "Điều khoản sử dụng website NEWARE"
        : isRu
        ? "Условия использования сайта NEWARE"
        : "NEWARE website terms of use",
      url: `${SITE_URL}/${locale}/terms`,
      siteName: "NEWARE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: isRu ? "Условия использования NEWARE" : "NEWARE Terms of Use" }],
      locale: isZh ? "zh_CN" : isVi ? "vi_VN" : isRu ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@newarebattery",
      title: isZh ? "使用条款 | NEWARE" : isVi ? "Điều khoản | NEWARE" : "Terms of Use | NEWARE",
      description: isZh
        ? "深圳市新威尔电子有限公司网站使用条款"
        : isVi
        ? "Điều khoản sử dụng NEWARE"
        : "NEWARE website terms of use",
      images: [ogImage],
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === "zh";
  const isVi = locale === "vi";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {isZh ? "使用条款" : isVi ? "Điều khoản sử dụng" : "Terms of Use"}
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
              {isZh ? "条款接受" : isVi ? "Chấp nhận các điều khoản" : "Acceptance of Terms"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "您同意仅将本网站用于合法目的，不得使用本网站进行任何非法活动或以任何方式损害我们的业务、声誉或利益。访问或使用本网站即表示您同意受这些使用条款的约束。"
                : isVi
                ? "Bạn đồng ý chỉ sử dụng trang web này cho các mục đích hợp pháp và không được sử dụng trang web cho bất kỳ hoạt động bất hợp pháp nào hoặc theo bất kỳ cách nào gây hại cho doanh nghiệp, danh tiếng hoặc lợi ích của chúng tôi."
                : "You agree to use this website only for lawful purposes and shall not use this website for any illegal activities or in any way that harms our business, reputation, or interests."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "如果您不同意这些条款的任何部分，请勿使用本网站。我们保留随时修改这些条款的权利，修改后的条款将在网站上发布后生效。"
                : isVi
                ? "Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng trang web. Chúng tôi bảo lưu quyền sửa đổi các điều khoản này bất kỳ lúc nào."
                : "If you do not agree to any part of these terms, please do not use this website. We reserve the right to modify these terms at any time."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "产品信息" : isVi ? "Thông tin sản phẩm" : "Product Information"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "本网站的产品信息、价格和规格仅供一般参考之用。我们尽力确保信息的准确性，但不对信息的完整性、准确性或可靠性做任何明示或暗示的保证。"
                : isVi
                ? "Thông tin sản phẩm, giá cả và thông số kỹ thuật trên trang web này chỉ dành cho mục đích tham khảo chung. Chúng tôi nỗ lực đảm bảo tính chính xác của thông tin nhưng không bảo đảm tính đầy đủ, chính xác hoặc đáng tin cậy."
                : "Product information, prices, and specifications on this website are provided for general reference only. While we strive to ensure the accuracy of information, we make no express or implied warranties regarding completeness, accuracy, or reliability."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "产品规格、价格和供货情况如有变动，恕不另行通知。在做出任何购买决定之前，请联系我们的销售团队获取最新信息。"
                : isVi
                ? "Thông số sản phẩm, giá cả và tình trạng sẵn có có thể thay đổi mà không thông báo. Vui lòng liên hệ đội ngũ bán hàng của chúng tôi để biết thông tin mới nhất trước khi đưa ra bất kỳ quyết định mua hàng nào."
                : "Product specifications, prices, and availability are subject to change without notice. Please contact our sales team for the latest information before making any purchasing decisions."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "知识产权" : isVi ? "Sở hữu trí tuệ" : "Intellectual Property"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "本网站的所有内容，包括但不限于文本、图形、徽标、图标、图像、音频片段和软件，均为深圳市新威尔电子有限公司或其内容供应商的财产，受中国和国际版权法保护。"
                : isVi
                ? "Tất cả nội dung trên trang web này, bao gồm nhưng không giới hạn ở văn bản, đồ họa, biểu tượng, biểu tượng hình ảnh, đoạn âm thanh và phần mềm, là tài sản của Công ty TNHH Điện tử Neware Thâm Quyến hoặc các nhà cung cấp nội dung."
                : "All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, and software, is the property of Shenzhen Neware Electronics Co., Ltd. or its content suppliers."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "未经我们明确书面同意，不得复制、修改、分发、复制或以其他方式使用本网站的任何内容用于商业目的。所有商标、注册商标和商品名称均为其各自所有者的财产。"
                : isVi
                ? "Không được phép sao chép, sửa đổi, phân phối, sao chép hoặc sử dụng bất kỳ nội dung nào của trang web này cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản rõ ràng của chúng tôi."
                : "No content from this website may be copied, modified, distributed, reproduced, or otherwise used for commercial purposes without our express written consent."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "购买和销售" : isVi ? "Mua hàng và bán hàng" : "Purchases and Sales"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "通过本网站提交的任何询价或订单请求仅为要约邀请，不构成具有约束力的订单。所有销售均受我们的销售条款和条件约束。"
                : isVi
                ? "Bất kỳ yêu cầu báo giá hoặc đơn đặt hàng nào được gửi qua trang web này chỉ là lời mời đàm phán và không cấu thành đơn đặt hàng có ràng buộc. Tất cả các giao dịch bán hàng đều chịu sự điều chỉnh của các điều khoản và điều kiện bán hàng của chúng tôi."
                : "Any quote or order request submitted through this website is merely an invitation to negotiate and does not constitute a binding order. All sales are subject to our sales terms and conditions."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "产品的销售和交付受具体销售合同的约束， including relevant warranty terms. 完整的销售条款将在确认订单时提供。"
                : isVi
                ? "Việc bán và giao hàng các sản phẩm chịu sự điều chỉnh của hợp đồng bán hàng cụ thể, bao gồm các điều khoản bảo hành có liên quan."
                : "The sale and delivery of products are subject to the specific sales contract, including relevant warranty terms."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "责任限制" : isVi ? "Giới hạn trách nhiệm" : "Limitation of Liability"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "在适用法律允许的最大范围内，深圳市新威尔电子有限公司不对任何间接、附带、特殊或后果性损害承担责任，包括但不限于利润损失、数据丢失或业务中断造成的损害。"
                : isVi
                ? "Trong phạm vi tối đa được pháp luật áp dụng cho phép, Công ty TNHH Điện tử Neware Thâm Quyến không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc do hậu quả nào."
                : "To the maximum extent permitted by applicable law, Shenzhen Neware Electronics Co., Ltd. shall not be liable for any indirect, incidental, special, or consequential damages."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "我们对本网站或通过本网站提供的内容的总责任在任何情况下不应超过您在过去12个月内支付给我们的金额。"
                : isVi
                ? "Trách nhiệm tổng cộng của chúng tôi đối với trang web này hoặc nội dung được cung cấp qua trang web không được vượt quá số tiền bạn đã thanh toán cho chúng tôi trong 12 tháng qua."
                : "Our total liability for this website or content provided through it shall not exceed the amount you have paid us in the past 12 months."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "适用法律" : isVi ? "Luật áp dụng" : "Governing Law"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "本使用条款受中华人民共和国法律管辖，并按其解释。因本使用条款引起的任何争议，应提交至深圳市有管辖权的人民法院解决。"
                : isVi
                ? "Các Điều khoản Sử dụng này được điều chỉnh bởi và giải thích theo luật pháp của Cộng hòa Nhân dân Trung Hoa. Mọi tranh chấp phát sinh từ các Điều khoản Sử dụng này sẽ được giải quyết tại Tòa án Nhân dân có thẩm quyền ở Thâm Quyến."
                : "These Terms of Use are governed by and construed in accordance with the laws of the People's Republic of China. Any disputes arising from these Terms of Use shall be submitted to the competent people's court in Shenzhen."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "条款变更" : isVi ? "Thay đổi các điều khoản" : "Changes to Terms"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "我们保留随时修改这些使用条款的权利。修改后的条款将在网站上发布后生效。我们建议您定期查看这些页面以了解任何更改。"
                : isVi
                ? "Chúng tôi bảo lưu quyền sửa đổi các điều khoản sử dụng này bất kỳ lúc nào. Các điều khoản đã sửa đổi sẽ có hiệu lực khi được đăng trên trang web. Chúng tôi khuyên bạn nên xem các trang này định kỳ để biết về bất kỳ thay đổi nào."
                : "We reserve the right to modify these terms of use at any time. Modified terms will take effect when posted on the website. We recommend that you review these pages periodically for any changes."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {isZh ? "重大更改将通过电子邮件或网站通知通知您。" : isVi ? "Các thay đổi quan trọng sẽ được thông báo qua email hoặc thông báo trên trang web." : "Significant changes will be communicated via email or website notice."}
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {isZh ? "联系信息" : isVi ? "Thông tin liên hệ" : "Contact Information"}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {isZh
                ? "如果您对这些使用条款有任何疑问，请通过以下方式联系我们："
                : isVi
                ? "Nếu bạn có bất kỳ câu hỏi nào về các điều khoản sử dụng này, vui lòng liên hệ với chúng tôi qua:"
                : "If you have any questions about these Terms of Use, please contact us at:"}
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
              href={`/${locale}/privacy`}
              className="text-primary hover:underline text-sm"
            >
              {isZh ? "查看隐私政策 →" : isVi ? "Xem Chính sách bảo mật →" : "View Privacy Policy →"}
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
