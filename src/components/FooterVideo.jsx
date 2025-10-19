import { useMemo } from 'react';

export default function FooterVideo() {
  const source = useMemo(() => {
    const modules = import.meta.glob('../assets/*.{mp4,webm,ogg}', { eager: true });
    const entries = Object.entries(modules);
    if (!entries.length) return null;
    // Prefer mp4 if available
    const mp4 = entries.find(([p]) => p.endsWith('.mp4'));
    const chosen = mp4 || entries[0];
    return chosen[1].default || chosen[0];
  }, []);

  if (!source) return null;

  return (
    <section className="mt-0 overflow-hidden">
      <div className="relative w-screen left-[calc(50%-50vw)]">
        <video
          src={source}
          className="block w-full h-[420px] md:h-[560px] object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        />
      </div>
    </section>
  );
}