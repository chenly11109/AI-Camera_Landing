import { image } from "../utils/image";

function PhotoFill({ className, src, alt }: { className: string; src: string; alt: string }) {
  return (
    <span className={`photo-fill ${className}`}>
      <img src={image(src)} alt={alt} />
    </span>
  );
}

export function ScrapbookHero() {
  return (
    <section className="scrapbook-wrap" aria-label="Pika Snap scrapbook examples">
      <img className="album" src={image("album-spread.png")} alt="" />

      <PhotoFill className="photo-ar" src="photo-ar-scene.webp" alt="AR mannequin scene preview" />
      <PhotoFill
        className="photo-character"
        src="photo-character-swap.webp"
        alt="Character swap preview"
      />
      <PhotoFill className="photo-pose" src="photo-pose-together.webp" alt="Pose together preview" />
      <PhotoFill className="photo-school" src="photo-school-days.webp" alt="School days memory" />
      <PhotoFill className="photo-cafe" src="photo-cafe-memory.webp" alt="Cafe scrapbook memory" />
      <PhotoFill className="photo-memory" src="photo-decoration.webp" alt="Decorated memory" />

      <img className="polaroid polaroid-ar" src={image("polaroid-ar.png")} alt="" />
      <img className="polaroid polaroid-character" src={image("polaroid-pose.png")} alt="" />
      <img className="polaroid polaroid-pose" src={image("polaroid-character.png")} alt="" />
      <img className="polaroid polaroid-school" src={image("polaroid-memory.png")} alt="" />
      <img className="polaroid polaroid-cafe" src={image("polaroid-school.png")} alt="" />
      <img className="polaroid polaroid-memory" src={image("polaroid-school.png")} alt="" />

      <img className="tape tape-ar" src={image("tape-kraft.png")} alt="" />
      <img className="tape tape-character" src={image("tape-kraft.png")} alt="" />
      <img className="tape tape-pose" src={image("tape-kraft.png")} alt="" />
      {/* <img className="tape tape-school" src={image("tape-yellow.png")} alt="" /> */}
      {/* <img className="tape tape-cafe" src={image("tape-yellow.png")} alt="" /> */}
      <img className="tape tape-memory" src={image("tape-peach.png")} alt="" />

      <span className="label label-ar">A R Scene</span>
      <span className="label label-character">Character Swap</span>
      <span className="label label-pose">Pose Together</span>
      <span className="caption caption-ar">Sunday At Home</span>
      <span className="caption caption-character">Sunday At Home</span>
      <span className="caption caption-pose">Just You &amp; Me</span>
      <span className="caption caption-school">School Days</span>
      <span className="caption caption-cafe">Cafe Days</span>
      <span className="caption caption-memory">Decoration</span>

      <img className="decor arrow-one" src={image("arrow-dashed.png")} alt="" />
      <img className="decor arrow-two" src={image("arrow-loop.png")} alt="" />
      {/* <img className="decor arrow-three" src={image("arrow-wavy.png")} alt="" /> */}
      <img className="decor paw" src={image("sticker-paw.png")} alt="" />
      <img className="decor orange-face" src={image("sticker-smiling-orange.png")} alt="" />
      <img className="decor orange-slice" src={image("sticker-orange-slice.png")} alt="" />
      {/* <img className="decor orange-badge" src={image("sticker-orange-badge.png")} alt="" /> */}
      <img className="decor heart-tab" src={image("sticker-heart-tab.png")} alt="" />
      <img className="decor heart" src={image("sticker-heart.png")} alt="" />
      <img className="decor sparkle-top" src={image("sparkle-tall.png")} alt="" />
      <img className="decor sparkle-bottom" src={image("sparkle-diamond.png")} alt="" />
      {/* <img className="decor flower" src={image("dried-flower.png")} alt="" /> */}
    </section>
  );
}
