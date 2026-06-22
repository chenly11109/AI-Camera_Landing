import { useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./privacy.css";

const UPDATED_DATE = "2026-06-18";
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
          "用户生成内容只会短时间保留在云端，用于提供生成结果、结果加载、同步、问题排查和改善服务体验。",
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
          "我们只在实现本政策所述目的所需的时间内保留信息。用户生成内容会短时间保留在云端，以便交付结果、加载结果、同步、排查问题和改善服务体验。",
          "你可以删除本地生成历史，或通过下方邮箱联系我们，请求访问、更正或删除与你账号相关的信息。法律、安全或争议处理需要的记录可能会在必要期限内保留。",
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
          "你应确保上传、生成、保存或分享的内容不侵犯他人权利，不包含违法、骚扰、仇恨、色情、暴力、欺诈或其他不当内容。",
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
          "User-generated content is kept in the cloud only for a limited period to provide generated results, load results, sync, troubleshoot issues, and improve the service experience.",
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
          "We retain information only for as long as needed for the purposes described in this policy. User-generated content is kept in the cloud for a limited period so results can be delivered, loaded, synced, troubleshot, and used to improve the service experience.",
          "You can delete local generation history or contact us at the email below to request access, correction, or deletion of information associated with your account. Records needed for legal, safety, or dispute handling may be retained for the necessary period.",
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
          "You must ensure that content you upload, generate, save, or share does not infringe others' rights and does not include illegal, harassing, hateful, sexual, violent, fraudulent, or otherwise inappropriate content.",
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
