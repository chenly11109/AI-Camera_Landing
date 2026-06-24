import { APP_STORE_DOWNLOAD_URL } from "../constants/download";

export function StoreButton() {
  return (
    <a
      className="store-button"
      href={APP_STORE_DOWNLOAD_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Download Kira Snap on the App Store"
    >
      <span className="store-icon" aria-hidden="true">
        
      </span>
      <span className="store-copy">
        <span>Download on the</span>
        <strong>App Store</strong>
      </span>
    </a>
  );
}
