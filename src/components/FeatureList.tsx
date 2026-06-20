import { image } from "../utils/image";

type Feature = {
  icon: string;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: "feature-place-ar.png",
    title: "Place in AR",
    body: "Drop a 3D model into your space.",
  },
  {
    icon: "feature-swap-character.png",
    title: "Swap Character",
    body: "Swap into your favourite character.",
  },
  {
    icon: "feature-save-memories.png",
    title: "Save Memories",
    body: "Pose together and save every moment.",
  },
];

export function FeatureList() {
  return (
    <section className="features" aria-label="Pika Snap features">
      {features.map((feature) => (
        <article className="feature" key={feature.title}>
          <img src={image(feature.icon)} alt="" />
          <div>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
