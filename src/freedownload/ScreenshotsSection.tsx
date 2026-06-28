import Image from "next/image";
import { ImageIcon } from "lucide-react";

type Screenshot = {
  title: string;
  image: string;
  caption: string;
};

type Props = {
  screenshots?: Screenshot[];
};

export default function ScreenshotsSection({ screenshots }: Props) {
  if (!screenshots || screenshots.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-pink-500/15 p-2 text-pink-400">
          <ImageIcon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-white">Tool screenshots</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((shot, i) => (
          <figure
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <div className="relative aspect-video w-full bg-black/40">
              <Image
                src={shot.image}
                alt={shot.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <figcaption className="p-4">
              <p className="text-sm font-semibold text-white">{shot.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {shot.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
