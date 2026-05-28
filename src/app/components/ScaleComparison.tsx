import { motion } from 'motion/react';

export function ScaleComparison() {
  const planets = [
    { name: 'Mercury', size: 20, color: '#A9A9A9' },
    { name: 'Venus', size: 48, color: '#FFC649' },
    { name: 'Earth', size: 50, color: '#4169E1' },
    { name: 'Mars', size: 27, color: '#CD5C5C' },
    { name: 'Jupiter', size: 200, color: '#DAA520' },
    { name: 'Saturn', size: 180, color: '#F4E4C1' },
    { name: 'Uranus', size: 85, color: '#4FC3F7' },
    { name: 'Neptune', size: 82, color: '#1E90FF' },
    { name: 'Pluto', size: 8, color: '#C39B78' },
  ];

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center bg-black py-32 px-16">
      <motion.h2
        className="text-[100px] leading-none tracking-tight mb-32 text-center"
        style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        Scale of Wonder
      </motion.h2>

      {/* Sun reference */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0.1) 50%, transparent 80%)',
        }}
        initial={{ opacity: 0, scale: 0.5, x: -200 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div
          className="absolute left-16 top-1/2 -translate-y-1/2 text-[14px] text-white/80"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          SUN
          <div className="text-[8px] text-white/40 mt-1">1,392,700 km</div>
        </div>
      </motion.div>

      {/* Planets aligned */}
      <div className="flex items-end gap-12 justify-center flex-wrap max-w-6xl">
        {planets.map((planet, index) => (
          <motion.div
            key={planet.name}
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div
              className="rounded-full"
              style={{
                width: planet.size,
                height: planet.size,
                backgroundColor: planet.color,
                opacity: 0.7,
                boxShadow: `0 0 ${planet.size / 2}px ${planet.color}40`,
              }}
            />
            <div
              className="text-[10px] text-white/60 text-center whitespace-nowrap"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              {planet.name}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-white/40 text-[10px] mt-20 max-w-2xl text-center"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        If the Sun were the size shown, Earth would be barely visible.
        <br />
        Relative scale visualization. Not to absolute scale.
      </motion.p>
    </section>
  );
}
