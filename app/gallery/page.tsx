import { GalleryGrid } from "@/components/gallery-grid";
import { ScrollSection } from "@/components/scroll-section";

export default function GalleryPage() {
  return (
    <div className="pt-24">
      {/* Hero text */}
      <section className="pb-8 text-center">
        <ScrollSection>
          <h1 className="font-serif text-4xl font-bold text-text-heading sm:text-5xl">
            A home you&apos;ll feel before you see it.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-body">
            Every photo is a promise — warmth, cleanliness, and dignity in
            every corner.
          </p>
        </ScrollSection>
      </section>

      <GalleryGrid />
    </div>
  );
}
