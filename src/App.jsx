import { useRef } from 'react';
import HeroCover from './components/HeroCover';
import MusicPlayer from './components/MusicPlayer';
import GalleryGrid from './components/GalleryGrid';
import SurpriseNote from './components/SurpriseNote';

export default function App() {
  const galleryRef = useRef(null);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900">
      <HeroCover onSeeGallery={scrollToGallery} />

      <main className="relative z-0">
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <SurpriseNote />
        </section>

        <section ref={galleryRef} className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white/70 backdrop-blur">
          <GalleryGrid />
        </section>
      </main>

      <MusicPlayer />
    </div>
  );
}
