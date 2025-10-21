import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function HeroCover({ onSeeGallery }) {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/pVLJXSVq3zyQq0OD/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-transparent to-sky-50/90 pointer-events-none" />

      <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 drop-shadow"
          >
            Happy Birthday! 🎈
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg sm:text-xl text-slate-700 max-w-xl"
          >
            A surprise wall-hanging gallery of your favorite moments, wrapped in music and celebration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex gap-3"
          >
            <button
              onClick={onSeeGallery}
              className="inline-flex items-center rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-lg shadow-sky-600/20 hover:bg-sky-700 active:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
            >
              See the Gallery
            </button>
            <a
              href="#music"
              className="inline-flex items-center rounded-full bg-white/70 backdrop-blur text-sky-700 px-6 py-3 font-semibold shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
            >
              Play the Music
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
