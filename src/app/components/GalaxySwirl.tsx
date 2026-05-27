import { motion } from 'motion/react';

export function GalaxySwirl() {
  return (
    <section className="min-h-screen relative flex items-center justify-center bg-black overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
        whileInView={{ rotate: 360, scale: 1, opacity: 1 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <svg width="800" height="800" viewBox="0 0 800 800" className="opacity-20">
          {/* Spiral arms */}
          {Array.from({ length: 4 }).map((_, armIndex) => {
            const points = [];
            for (let i = 0; i < 100; i++) {
              const angle = (armIndex * Math.PI / 2) + (i / 100) * Math.PI * 4;
              const radius = (i / 100) * 350;
              const x = 400 + Math.cos(angle) * radius;
              const y = 400 + Math.sin(angle) * radius;
              points.push(`${x},${y}`);
            }
            return (
              <polyline
                key={armIndex}
                points={points.join(' ')}
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
              />
            );
          })}

          {/* Core */}
          <circle cx="400" cy="400" r="50" fill="rgba(245, 166, 35, 0.3)" />
          <circle cx="400" cy="400" r="30" fill="rgba(245, 166, 35, 0.5)" />
        </svg>
      </motion.div>

      <div className="relative z-10 text-center max-w-3xl px-8">
        <motion.h2
          className="text-[140px] leading-none tracking-tight mb-8"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Beyond
          <br />
          Our Star
        </motion.h2>

        <motion.p
          className="text-[16px] text-white/70 leading-relaxed mb-8"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          The Solar System is but a speck in the Milky Way galaxy.
          <br />
          Our galaxy contains 100-400 billion stars.
          <br />
          And there are an estimated 2 trillion galaxies in the observable universe.
        </motion.p>

        <motion.div
          className="grid grid-cols-3 gap-8 mt-16"
          style={{ fontFamily: 'Space Mono, monospace' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div>
            <div className="text-[32px] text-white/90">100-400B</div>
            <div className="text-[8px] text-white/40 tracking-widest mt-2">STARS IN MILKY WAY</div>
          </div>
          <div>
            <div className="text-[32px] text-white/90">100,000</div>
            <div className="text-[8px] text-white/40 tracking-widest mt-2">LIGHT YEARS ACROSS</div>
          </div>
          <div>
            <div className="text-[32px] text-white/90">13.6B</div>
            <div className="text-[8px] text-white/40 tracking-widest mt-2">YEARS OLD</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
