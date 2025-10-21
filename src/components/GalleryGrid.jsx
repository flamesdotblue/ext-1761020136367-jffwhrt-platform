import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const IMAGES = [
  'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513152697235-fe74c283646a?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop',
];

export default function GalleryGrid() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Wall-Hanging Gallery</h2>
        <p className="mt-2 text-slate-600">A playful grid of memories with a cozy, handcrafted feel.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {IMAGES.map((src, idx) => (
          <motion.button
            key={src}
            onClick={() => setLightbox({ src, idx })}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            whileHover={{ y: -2 }}
          >
            <img
              src={src}
              alt={`Birthday memory ${idx + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.12),transparent_60%)]" />
            <div className="absolute top-2 left-2 bg-white/80 backdrop-blur rounded-md px-2 py-1 text-xs font-semibold text-sky-700 shadow">
              #{idx + 1}
            </div>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-2">
              <span className="inline-block bg-yellow-200 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded shadow transform -rotate-6">Hanging</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/90 hover:text-white flex items-center gap-2"
                aria-label="Close"
              >
                <X /> Close
              </button>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                <img src={lightbox.src} alt="Selected memory" className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
