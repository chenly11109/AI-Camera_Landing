import { useEffect, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./support.css";

const CONTACT_EMAIL = "chenlingya109@gmail.com";

type Language = "zh" | "en";

type SupportTopic = {
  title: string;
  body: string;
};

type SupportContent = {
  htmlLang: string;
  eyebrow: string;
  title: string;
  intro: string;
  contactTitle: string;
  contactBody: string;
  emailButton: string;
  inAppTitle: string;
  inAppBody: string;
  topicsTitle: string;
  topics: SupportTopic[];
  appleTitle: string;
  appleBody: string;
  privacyTitle: string;
  privacyBody: string;
};

const supportContent: Record<Language, SupportContent> = {
  zh: {
    htmlLang: "zh-CN",
    eyebrow: "Kira Snap: AI Anime Camera & Photo Album",
    title: "Kira Snap 支持",
    intro:
      "Kira Snap 是一款 AI 动漫相机与照片相册应用，用于创建、摆拍、保存和整理你的角色照片时刻。",
    contactTitle: "联系支持",
    contactBody:
      "如需账号、购买、积分、隐私或其他一般支持，请发送邮件给我们。我们通常会在 2-3 个工作日内回复。",
    emailButton: "发送邮件",
    inAppTitle: "在 App 内报告问题",
    inAppBody:
      "如果问题与某个生成结果有关，请在 Kira Snap 中打开该结果并点击 Feedback。这样可以帮助我们获取相关生成任务上下文，更快定位问题。",
    topicsTitle: "常见帮助主题",
    topics: [
      {
        title: "相机与相册权限",
        body: "请在 iOS 设置中允许 Kira Snap 访问相机和照片，相关功能才能拍摄、选择或保存内容。",
      },
      {
        title: "AI 生成结果",
        body: "生成结果可能与预期不同。遇到异常结果时，请优先在 App 内通过 Feedback 提交。",
      },
      {
        title: "保存到相册",
        body: "如果保存失败，请检查照片权限和设备可用存储空间，然后重试。",
      },
      {
        title: "积分与购买",
        body: "购买或积分未到账时，请邮件联系我们，并附上 Apple 购买记录或相关截图。",
      },
      {
        title: "恢复购买",
        body: "如更换设备或重新安装 App，请在 App 内使用恢复购买功能同步可恢复的权益。",
      },
      {
        title: "账号与登录",
        body: "如果无法登录，请确认邮箱、Apple 登录状态或网络连接正常。",
      },
      {
        title: "数据删除",
        body: "如需访问、更正或删除账号相关信息，请通过邮箱联系我们。",
      },
      {
        title: "上传或生成失败",
        body: "请检查网络连接并稍后重试。若问题持续，请通过 App 内 Feedback 或邮件联系我们。",
      },
    ],
    appleTitle: "Apple 购买与退款",
    appleBody:
      "App Store 购买、订阅、购买记录和退款由 Apple 处理。你可以通过 Apple 账户查看购买记录或申请退款；如果遇到积分或权益发放异常，请邮件联系我们。",
    privacyTitle: "隐私与数据",
    privacyBody:
      "Kira Snap 不会将相机、照片、视频、人像、头像或用户上传及生成内容用于广告、营销、画像或 AI 模型训练。隐私和数据请求可通过邮箱联系我们。",
  },
  en: {
    htmlLang: "en",
    eyebrow: "Kira Snap: AI Anime Camera & Photo Album",
    title: "Kira Snap Support",
    intro: "An AI anime camera and photo album app for creating, posing, and saving character moments.",
    contactTitle: "Contact Support",
    contactBody:
      "For account, purchase, credits, privacy, or general support requests, email us. We usually reply within 2-3 business days.",
    emailButton: "Email Support",
    inAppTitle: "Report an Issue in the App",
    inAppBody:
      "For generation result problems, open the result in Kira Snap and tap Feedback. This helps us identify the related generation task and investigate faster.",
    topicsTitle: "Common Help Topics",
    topics: [
      {
        title: "Camera and Photo Library permissions",
        body: "Allow Kira Snap to access Camera and Photos in iOS Settings so capture, selection, and saving features can work.",
      },
      {
        title: "AI generation results",
        body: "Generated results may differ from what you expected. For unusual results, submit Feedback from inside the app.",
      },
      {
        title: "Saving to your photo album",
        body: "If saving fails, check Photos permission and available device storage, then try again.",
      },
      {
        title: "Credits and purchases",
        body: "If purchased credits or benefits do not appear, email us with your Apple purchase record or a relevant screenshot.",
      },
      {
        title: "Restore purchases",
        body: "After reinstalling the app or changing devices, use Restore Purchases in the app to sync restorable benefits.",
      },
      {
        title: "Account and login",
        body: "If you cannot sign in, check your email, Apple sign-in state, and network connection.",
      },
      {
        title: "Data deletion",
        body: "To request access, correction, or deletion of account-related information, contact us by email.",
      },
      {
        title: "Upload or generation failures",
        body: "Check your network connection and try again later. If the issue continues, contact us through in-app Feedback or email.",
      },
    ],
    appleTitle: "Apple Purchases and Refunds",
    appleBody:
      "App Store purchases, subscriptions, purchase history, and refunds are handled by Apple. You can review purchases or request a refund through your Apple account. For credit or benefit delivery issues, email us.",
    privacyTitle: "Privacy and Data",
    privacyBody:
      "Kira Snap does not use camera data, photos, videos, portraits, avatars, or user-uploaded or generated content for advertising, marketing, profiling, or AI model training. Contact us by email for privacy and data requests.",
  },
};

function isLanguage(value: string | undefined): value is Language {
  return value === "en" || value === "zh";
}

export function SupportPage() {
  const { language: languageParam } = useParams();

  if (!isLanguage(languageParam)) {
    return <Navigate to="/support/en" replace />;
  }

  return <SupportPageContent language={languageParam} />;
}

function SupportPageContent({ language }: { language: Language }) {
  const navigate = useNavigate();
  const pageContent = useMemo(() => supportContent[language], [language]);
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=Kira%20Snap%20Support`;

  useEffect(() => {
    document.documentElement.lang = pageContent.htmlLang;
    document.title = pageContent.title;

    return () => {
      document.documentElement.lang = "en";
      document.title = "Kira Snap";
    };
  }, [pageContent.htmlLang, pageContent.title]);

  function handleLanguageChange(nextLanguage: Language) {
    navigate(`/support/${nextLanguage}`);
  }

  return (
    <main className="support-page">
      <div className="support-shell">
        <header className="support-header">
          <div>
            <p className="support-eyebrow">{pageContent.eyebrow}</p>
            <h1>{pageContent.title}</h1>
            <p className="support-intro">{pageContent.intro}</p>
          </div>
          <div className="support-language-switch" aria-label="Language">
            {(["zh", "en"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={`support-language-button${option === language ? " is-active" : ""}`}
                aria-pressed={option === language}
                onClick={() => handleLanguageChange(option)}
              >
                {option === "zh" ? "中文" : "English"}
              </button>
            ))}
          </div>
        </header>

        <section className="support-contact-panel">
          <div>
            <h2>{pageContent.contactTitle}</h2>
            <p>{pageContent.contactBody}</p>
            <p className="support-email">{CONTACT_EMAIL}</p>
          </div>
          <a className="support-email-button" href={mailtoHref}>
            {pageContent.emailButton}
          </a>
        </section>

        <section className="support-section">
          <h2>{pageContent.inAppTitle}</h2>
          <p>{pageContent.inAppBody}</p>
        </section>

        <section className="support-section">
          <h2>{pageContent.topicsTitle}</h2>
          <div className="support-qa-list">
            {pageContent.topics.map((topic) => (
              <article className="support-qa-item" key={topic.title}>
                <h3>
                  <span>Q:</span> {topic.title}
                </h3>
                <p>
                  <span>A:</span> {topic.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="support-section">
          <h2>{pageContent.appleTitle}</h2>
          <p>{pageContent.appleBody}</p>
        </section>

        <section className="support-section">
          <h2>{pageContent.privacyTitle}</h2>
          <p>{pageContent.privacyBody}</p>
        </section>
      </div>
    </main>
  );
}
