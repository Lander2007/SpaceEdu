import { motion } from 'motion/react';

export function CosmicData() {
  const data = [
    {
      number: '299,792',
      unit: 'km/s',
      label: 'Speed of Light',
      description: 'Nothing travels faster in the universe',
    },
    {
      number: '13.8B',
      unit: 'years',
      label: 'Age of Universe',
      description: 'Since the Big Bang',
    },
    {
      number: '93B',
      unit: 'light years',
      label: 'Observable Universe',
      description: 'Diameter of what we can see',
    },
    {
      number: '2T',
      unit: 'galaxies',
      label: 'In Observable Universe',
      description: 'Each containing billions of stars',
    },
    {
      number: '8 min',
      unit: '20 sec',
      label: 'Light Travel Time',
      description: 'From Sun to Earth',
    },
    {
      number: '4.24',
      unit: 'light years',
      label: 'Nearest Star',
      description: 'Proxima Centauri distance',
    },
  ];

  return (
    <section className="min-h-screen relative bg-black py-32 px-16">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h2
          className="text-[140px] leading-none tracking-tight mb-8"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: false, amount: 0.2 }}
        >
          Cosmic
          <br />
          Measurements
        </motion.h2>

        <motion.div
          className="h-[1px] bg-white/20 w-full mb-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: false, amount: 0.2 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[64px] leading-none tracking-tight text-white"
                    style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
                  >
                    {item.number}
                  </span>
                  <span
                    className="text-[16px] text-white/60"
                    style={{ fontFamily: 'Space Mono, monospace' }}
                  >
                    {item.unit}
                  </span>
                </div>

                <div
                  className="text-[12px] text-white/80 tracking-wider mb-1"
                  style={{ fontFamily: 'Space Mono, monospace' }}
                >
                  {item.label}
                </div>

                <div
                  className="text-[14px] text-white/50 italic"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {item.description}
                </div>

                <div className="h-[1px] bg-white/10 mt-4" />
              </div>

              {/* Decorative corner */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-white/20" />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-white/40 text-[10px] mt-20 text-center max-w-3xl mx-auto"
          style={{ fontFamily: 'Space Mono, monospace' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          These numbers represent our best understanding of the universe.
          <br />
          They are constantly being refined as our measurements improve.
        </motion.p>
      </motion.div>
    </section>
  );
}
