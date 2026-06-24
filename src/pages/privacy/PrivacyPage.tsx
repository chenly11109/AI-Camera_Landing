import { useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./privacy.css";

const UPDATED_DATE = "2026-06-23";
const CONTACT_EMAIL = "chenlingya109@gmail.com";
const LANGUAGE_STORAGE_KEY = "ai-camera-privacy-language";

type Language = "zh" | "en";

type PrivacySection = {
  title: string;
  paragraphs: string[];
};

type PrivacyContent = {
  htmlLang: string;
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: PrivacySection[];
};

const privacyContent: Record<Language, PrivacyContent> = {
  zh: {
    htmlLang: "zh-CN",
    eyebrow: "Kira Snap: AI Anime Camera & Photo Album",
    title: "隐私政策与服务条款",
    intro:
      "Kira Snap 是一款 AI 动漫相机与照片相册应用，用于创建、摆拍、保存和整理你的角色照片时刻。",
    updated: `最后更新日期：${UPDATED_DATE}`,
    sections: [
      {
        title: "我们处理的信息",
        paragraphs: [
          "当你使用 Kira Snap 时，我们可能会处理你主动提供或使用功能时产生的信息，包括账号信息、昵称、头像、你选择或拍摄的照片和视频、生成任务与结果、积分和购买记录、反馈内容，以及用于维护服务安全和稳定的必要信息。",
          "我们只会在提供应用功能、维护账号、处理购买、展示生成结果、响应反馈、保障安全或遵守法律要求所需的范围内处理这些信息。",
        ],
      },
      {
        title: "信息用途",
        paragraphs: [
          "我们使用信息来创建和维护账号，提供拍摄、上传、生成、预览、保存、同步、分享、积分和反馈等功能，并改进服务体验与可靠性。",
          "我们不会出售个人信息。我们不会将相机、照片、视频、人像、头像或用户上传及生成的内容用于广告、营销或画像。",
        ],
      },
      {
        title: "相机、相册与人像数据",
        paragraphs: [
          "如果你授予相机或相册权限，Kira Snap 会使用这些权限来拍摄、选择、上传、保存或生成你请求的内容。你可以随时在系统设置中关闭相关权限。",
          "我们不会为了广告、营销、画像或训练目的而保留你的相机、相册、照片、视频、头像或人像数据。",
        ],
      },
      {
        title: "AI 生成内容",
        paragraphs: [
          "Kira Snap 会根据你选择的素材、模板和操作生成图片或视频。生成结果可能与你预期不同，请在保存或分享前自行确认。",
          "用户上传的图片、视频、头像、人像数据以及生成图片或视频不会被我们为了训练 AI 模型而保留。",
          "你的应用内相册、本地生成历史和保存到设备的内容保存在你的设备本地，不会由 Kira Snap 公开发布。",
          "当你使用云端生成、同步、反馈或结果加载功能时，上传素材和生成结果可能会在云端短时间处理或保留，用于提供生成结果、结果加载、同步、问题排查和改善服务体验。",
          "云端生成结果只会短期保留。你有责任在结果可用期间及时打开结果，并将想要保留的图片或视频保存到应用内相册或你的设备中。",
        ],
      },
      {
        title: "购买与积分信息",
        paragraphs: [
          "如果你购买积分、会员或其他数字内容，我们会处理完成购买、发放权益、核对余额、处理异常和提供支持所需的信息。",
          "我们不会保存完整的付款卡号或银行账号。购买和退款也可能受应用商店或适用支付规则约束。",
        ],
      },
      {
        title: "必要服务方处理",
        paragraphs: [
          "为了提供功能、处理购买、保障安全或遵守法律要求，相关信息可能由帮助我们运营服务的必要服务方处理。我们要求这些服务方仅在必要范围内处理相关信息。",
        ],
      },
      {
        title: "数据保留与删除",
        paragraphs: [
          "我们只在实现本政策所述目的所需的时间内保留信息。你的应用内相册和本地生成历史保存在设备本地；用户生成内容仅在需要交付结果、加载结果、同步、排查问题或改善服务体验时短时间保留在云端。",
          "云端素材和生成结果可能在短期保留期限后无法继续访问或恢复。你有责任在结果可用期间打开并保存想要保留的内容。",
          "你可以在应用或设备中删除本地相册内容、本地生成历史或已保存内容，也可以通过下方邮箱联系我们，请求访问、更正或删除与你账号相关的信息。法律、安全、侵权投诉或争议处理需要的记录可能会在必要期限内保留。",
        ],
      },
      {
        title: "你的选择",
        paragraphs: [
          "你可以选择不提供某些信息，或在系统设置中关闭相机、相册等权限；但相关功能可能无法使用。",
          "你可以停止使用本应用，删除本地内容，或联系我们处理隐私相关请求。",
        ],
      },
      {
        title: "儿童",
        paragraphs: [
          "Kira Snap 并非专门面向儿童的儿童类应用。若你认为儿童向我们提供了个人信息，请联系我们，我们会采取适当措施。",
        ],
      },
      {
        title: "服务条款",
        paragraphs: [
          "你应确保上传、使用、生成、保存或分享的角色、图片、照片、视频和其他素材不侵犯他人权利，不包含违法、骚扰、仇恨、色情、暴力、欺诈或其他不当内容。",
          "生成的图片和视频仅供个人、非商业用途。除非你已取得所有必要权利和许可，否则不得出售、授权、变现、制作或发布为商业商品、用于广告，或以其他商业方式利用生成内容。",
          "你对在 Kira Snap 中上传或使用的角色、图片、照片和其他素材负责。Kira Snap 不向你授予任何第三方角色、品牌、艺术作品、照片或其他受保护素材的权利。",
          "如果我们认为上传或生成的云端内容侵犯版权、商标权、隐私权、肖像权或其他权利，或违反本条款，我们可以删除或禁用相关云端内容、限制云端功能或暂停账号。保存在你设备本地或应用内本地相册中的内容由你自行管理。",
          "Kira Snap 按现状提供服务。我们会努力保持服务稳定和安全，但不保证生成结果始终准确、完整或适合特定目的。",
        ],
      },
      {
        title: "联系我们",
        paragraphs: [`如有隐私或服务条款相关问题，请联系：${CONTACT_EMAIL}`],
      },
    ],
  },
  en: {
    htmlLang: "en",
    eyebrow: "Kira Snap: AI Anime Camera & Photo Album",
    title: "Privacy Policy and Terms of Service",
    intro:
      "An AI anime camera and photo album app for creating, posing, and saving character moments.",
    updated: `Last updated: ${UPDATED_DATE}`,
    sections: [
      {
        title: "Information We Process",
        paragraphs: [
          "When you use Kira Snap, we may process information you provide or create through app features, including account information, display name, avatar, photos and videos you choose or capture, generation tasks and results, credits and purchase records, feedback, and information needed to keep the service safe and reliable.",
          "We process this information only as needed to provide app features, maintain accounts, process purchases, show generated results, respond to feedback, protect safety, or comply with legal requirements.",
        ],
      },
      {
        title: "How Information Is Used",
        paragraphs: [
          "We use information to create and maintain accounts, provide capture, upload, generation, preview, saving, sync, sharing, credits, and feedback features, and improve service experience and reliability.",
          "We do not sell personal information. We do not use camera data, photos, videos, portraits, avatars, or user-uploaded or generated content for advertising, marketing, or profiling.",
        ],
      },
      {
        title: "Camera, Photo Library, and Portrait Data",
        paragraphs: [
          "If you grant camera or photo library permissions, Kira Snap uses those permissions to capture, select, upload, save, or generate content you request. You can turn these permissions off at any time in system settings.",
          "We do not retain your camera, photo library, photo, video, avatar, or portrait data for advertising, marketing, profiling, or training purposes.",
        ],
      },
      {
        title: "AI-Generated Content",
        paragraphs: [
          "Kira Snap generates images or videos based on the materials, templates, and actions you choose. Generated results may differ from what you expected, so please review them before saving or sharing.",
          "We do not retain user-uploaded images, videos, avatars, portrait data, or generated images or videos for the purpose of training AI models.",
          "Your in-app album, local generation history, and content saved to your device are stored locally on your device and are not publicly posted by Kira Snap.",
          "When you use cloud generation, sync, feedback, or result-loading features, uploaded materials and generated results may be processed or kept in the cloud for a limited period to provide generated results, load results, sync, troubleshoot issues, and improve the service experience.",
          "Cloud-generated results are retained only for a short period. You are responsible for opening available results in time and saving any images or videos you want to keep to the in-app album or your device.",
        ],
      },
      {
        title: "Purchases and Credits",
        paragraphs: [
          "If you purchase credits, memberships, or other digital content, we process information needed to complete purchases, deliver benefits, verify balances, handle issues, and provide support.",
          "We do not store full payment card numbers or bank account details. Purchases and refunds may also be subject to applicable store or payment rules.",
        ],
      },
      {
        title: "Necessary Service Processing",
        paragraphs: [
          "To provide features, process purchases, protect safety, or comply with legal requirements, relevant information may be processed by necessary service providers that help us operate the service. We require them to process information only as needed.",
        ],
      },
      {
        title: "Data Retention and Deletion",
        paragraphs: [
          "We retain information only for as long as needed for the purposes described in this policy. Your in-app album and local generation history are stored locally on your device; user-generated content is kept in the cloud only when needed to deliver results, load results, sync, troubleshoot issues, or improve the service experience.",
          "Cloud materials and generated results may become unavailable or unrecoverable after the short retention period. You are responsible for opening and saving content you want to keep while it is available.",
          "You can delete local album content, local generation history, or saved content in the app or on your device. You may also contact us at the email below to request access, correction, or deletion of information associated with your account. Records needed for legal, safety, infringement complaint, or dispute handling may be retained for the necessary period.",
        ],
      },
      {
        title: "Your Choices",
        paragraphs: [
          "You may choose not to provide certain information or turn off permissions such as camera or photo library access in system settings, but related features may not work.",
          "You may stop using the app, delete local content, or contact us for privacy-related requests.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Kira Snap is not directed to children as a children's app. If you believe a child has provided personal information, contact us and we will take appropriate steps.",
        ],
      },
      {
        title: "Terms of Service",
        paragraphs: [
          "You must ensure that characters, images, photos, videos, and other materials you upload, use, generate, save, or share do not infringe others' rights and do not include illegal, harassing, hateful, sexual, violent, fraudulent, or otherwise inappropriate content.",
          "Generated images and videos are provided for personal, non-commercial use. You may not sell, license, monetize, publish as commercial merchandise, use in advertising, or otherwise exploit generated content for commercial purposes unless you have all necessary rights and permissions.",
          "You are responsible for the characters, images, photos, and other materials you upload or use in Kira Snap. Kira Snap does not grant you any rights to third-party characters, brands, artworks, photos, or other protected materials.",
          "We may remove or disable related cloud content, restrict cloud features, or suspend accounts if we believe uploaded or generated cloud content violates copyright, trademark, privacy, publicity, or other rights, or otherwise violates these terms. Content saved locally on your device or in the local in-app album is managed by you.",
          "Kira Snap is provided as is. We work to keep the service stable and secure, but we do not guarantee that generated results will always be accurate, complete, or fit for a particular purpose.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [`For privacy or terms questions, contact: ${CONTACT_EMAIL}`],
      },
    ],
  },
};

function isLanguage(value: string | undefined): value is Language {
  return value === "en" || value === "zh";
}

export function PrivacyPage() {
  const { language: languageParam } = useParams();

  if (!isLanguage(languageParam)) {
    return <Navigate to="/privacy/en" replace />;
  }

  return <PrivacyPageContent language={languageParam} />;
}

function PrivacyPageContent({ language }: { language: Language }) {
  const navigate = useNavigate();
  const pageContent = useMemo(() => privacyContent[language], [language]);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = pageContent.htmlLang;
    document.title = pageContent.title;

    return () => {
      document.documentElement.lang = "en";
      document.title = "Kira Snap";
    };
  }, [language, pageContent.htmlLang, pageContent.title]);

  function handleLanguageChange(nextLanguage: Language) {
    navigate(`/privacy/${nextLanguage}`);
  }

  return (
    <main className="privacy-page">
      <div className="privacy-shell">
        <header className="privacy-header">
          <div>
            <p className="privacy-eyebrow">{pageContent.eyebrow}</p>
            <h1>{pageContent.title}</h1>
            <p className="privacy-intro">{pageContent.intro}</p>
            <p className="privacy-updated">{pageContent.updated}</p>
          </div>
          <div className="privacy-actions">
            <div className="privacy-language-switch" aria-label="Language">
              {(["zh", "en"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`privacy-language-button${option === language ? " is-active" : ""}`}
                  aria-pressed={option === language}
                  onClick={() => handleLanguageChange(option)}
                >
                  {option === "zh" ? "中文" : "English"}
                </button>
              ))}
            </div>
          </div>
        </header>

        <article className="privacy-content">
          {pageContent.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
