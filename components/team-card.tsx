import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function TeamCard({ name, role, bio, image }: TeamCardProps) {
  return (
    <div className="group rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-serif text-lg font-semibold text-text-heading">
          {name}
        </h3>
        <p className="text-sm font-medium text-accent-green">{role}</p>
        <p className="mt-1 text-sm text-text-body">{bio}</p>
      </div>
    </div>
  );
}
