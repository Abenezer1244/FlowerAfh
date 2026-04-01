import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

export function ServiceCard({ title, description, image }: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-l-4 border-accent-green">
      <div className="relative aspect-[16/10]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
