import { image } from "../utils/image";

export function QrCard() {
  return (
    <aside className="qr-card" aria-label="Scan to try Pika Snap">
      <img className="qr-sparkle qr-sparkle-one" src={image("sparkle-four.png")} alt="" />
      <img className="qr-sparkle qr-sparkle-two" src={image("sparkle-tall.png")} alt="" />
      <h2 className="qr-title">Scan to Try</h2>
      <img className="qr-code" src={image("qr-code.svg")} alt="QR code placeholder" />
      <img className="qr-orange" src={image("sticker-orange-slice.png")} alt="" />
    </aside>
  );
}
