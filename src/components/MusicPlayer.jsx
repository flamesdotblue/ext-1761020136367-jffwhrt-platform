import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Public-domain/CC0 happy birthday track from Pixabay
const TRACK_URL =
  'https://cdn.pixabay.com/download/audio/2022/02/23/audio_0f2f4d37d6.mp3?filename=happy-birthday-110353.mp3';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setReady(true);
    const onTime = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTime);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (e) {
      // Autoplay blocked; user must interact with page first
      console.warn('Playback error:', e);
    }
  };

  return (
    <div id="music" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-[540px]">
      <div className="rounded-2xl border border-sky-100 bg-white/80 backdrop-blur shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <Music size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">Birthday Melody</p>
            <p className="text-xs text-slate-500 truncate">Play a cheerful tune while you browse</p>
          </div>
          <button
            onClick={togglePlay}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>
        <div className="px-4 pb-3">
          <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-fuchsia-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
            />
          </div>
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-2 flex items-end gap-1 h-6"
                aria-hidden
              >
                {[...Array(12)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 rounded-full bg-sky-500/80"
                    animate={{ height: [6, 20, 10, 24, 8, 18][i % 6] }}
                    transition={{ repeat: Infinity, repeatType: 'mirror', duration: 0.6 + (i % 4) * 0.1 }}
                    style={{ display: 'inline-block' }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <audio ref={audioRef} src={TRACK_URL} preload="metadata" />
    </div>
  );
}
