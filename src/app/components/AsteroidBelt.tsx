import { motion } from 'motion/react';

export function AsteroidBelt() {
  const asteroids = Array.from({ length: 150 });

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Title */}
      <motion.div
        className="absolute top-32 left-16 z-20"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2
          className="text-[140px] leading-none tracking-tight text-white/10"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
        >
          THE
          <br />
          ASTEROID
          <br />
          BELT
        </h2>
      </motion.div>

      {/* Asteroid field */}
      <div className="w-full h-full relative">
        <svg width="100%" height="800" viewBox="0 0 1600 800" className="absolute inset-0">
          {/* Main belt path */}
          <motion.ellipse
            cx="800"
            cy="400"
            rx="600"
            ry="150"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="100"
            strokeDasharray="2 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
          />

          {/* Asteroids */}
          {asteroids.map((_, i) => {
            const angle = (i / asteroids.length) * Math.PI * 2;
            const radiusX = 600 + (Math.random() - 0.5) * 200;
            const radiusY = 150 + (Math.random() - 0.5) * 100;
            const x = 800 + Math.cos(angle) * radiusX;
            const y = 400 + Math.sin(angle) * radiusY;
            const size = Math.random() * 4 + 1;

            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={size}
                fill="rgba(169, 169, 169, 0.6)"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.003,
                  ease: 'easeOut',
                }}
                viewport={{ once: false, amount: 0.3 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Data panel */}
      <motion.div
        className="absolute right-16 bottom-32 z-20 max-w-md"
        style={{ fontFamily: 'Space Mono, monospace' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="text-white/90 space-y-4">
          <div>
            <span className="text-[8px] text-white/40 tracking-widest block mb-1">LOCATION</span>
            <span className="text-[12px]">Between Mars and Jupiter</span>
          </div>
          <div className="h-[1px] bg-white/15" />
          <div>
            <span className="text-[8px] text-white/40 tracking-widest block mb-1">OBJECTS</span>
            <span className="text-[12px]">~1.9 million asteroids larger than 1 km</span>
          </div>
          <div className="h-[1px] bg-white/15" />
          <div>
            <span className="text-[8px] text-white/40 tracking-widest block mb-1">LARGEST</span>
            <span className="text-[12px]">Ceres (940 km diameter)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
