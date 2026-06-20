import { FeatureList } from "./components/FeatureList";
import { QrCard } from "./components/QrCard";
import { ScrapbookHero } from "./components/ScrapbookHero";
import { StoreButton } from "./components/StoreButton";
import { image } from "./utils/image";

export default function App() {
  return (
    <main className="landing-page">
      <div className="paper-texture" aria-hidden="true" />

      <header className="topbar">
        <a className="brand-lockup" href="/" aria-label="Kira Snap">
          <img className="brand-logo-mark" src={image("kira-snap-logo-flat-stars.webp")} alt="" />
          <img className="brand-title-mark" src={image("kira-snap-title.webp")} alt="Kira Snap" />
        </a>
        <div className="mobile-store">
          <StoreButton />
        </div>
      </header>

      <section className="hero-copy">
        <h1>
          Bring your <span>favorite</span> character to life.
        </h1>
        <p className="hero-subtitle">Place, swap, pose, and save the moment.</p>
        <div className="desktop-store">
          <StoreButton />
        </div>
      </section>

      <div className="scrapbook-stage">
        <ScrapbookHero />
      </div>

      <div className="bottom-layout">
        <QrCard />
        <FeatureList />
      </div>

      <footer>@2026 Kira Snap. All rights Reserved.</footer>
    </main>
  );
}
