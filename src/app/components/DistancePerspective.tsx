import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function DistancePerspective() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="min-h-screen relative bg-black flex items-center justify-center py-32 px-16">
      <motion.div
        className="max-w-6xl w-full"
        style={{ scale, opacity }}
      >
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2
            className="text-[120px] leading-none tracking-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
          >
            Perspective
          </h2>
          <p
            className="text-white/60 text-[14px] italic"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            If Earth were the size of a marble...
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-12">
          {/* Left column */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="border-l-2 border-white/20 pl-6">
              <div
                className="text-[48px] leading-none mb-2"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
              >
                1 cm
              </div>
              <div
                className="text-[12px] text-white/80 mb-2"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                SIZE OF EARTH
              </div>
              <div
                className="text-white/50 text-[14px]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                A marble in your hand
              </div>
            </div>

            <div className="border-l-2 border-amber-500/40 pl-6">
              <div
                className="text-[48px] leading-none mb-2"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
              >
                109 cm
              </div>
              <div
                className="text-[12px] text-amber-400/80 mb-2"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                SIZE OF THE SUN
              </div>
              <div
                className="text-white/50 text-[14px]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                About 3.5 feet wide — a large beach ball
              </div>
            </div>

            <div className="border-l-2 border-white/20 pl-6">
              <div
                className="text-[48px] leading-none mb-2"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
              >
                117 m
              </div>
              <div
                className="text-[12px] text-white/80 mb-2"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                DISTANCE TO THE SUN
              </div>
              <div
                className="text-white/50 text-[14px]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                About 1.2 football fields away
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="border-l-2 border-red-500/40 pl-6">
              <div
                className="text-[48px] leading-none mb-2"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
              >
                0.53 cm
              </div>
              <div
                className="text-[12px] text-red-400/80 mb-2"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                SIZE OF MARS
              </div>
              <div
                className="text-white/50 text-[14px]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                A small pebble
              </div>
            </div>

            <div className="border-l-2 border-orange-500/40 pl-6">
              <div
                className="text-[48px] leading-none mb-2"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
              >
                11 cm
              </div>
              <div
                className="text-[12px] text-orange-400/80 mb-2"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                SIZE OF JUPITER
              </div>
              <div
                className="text-white/50 text-[14px]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                A large grapefruit
              </div>
            </div>

            <div className="border-l-2 border-blue-500/40 pl-6">
              <div
                className="text-[48px] leading-none mb-2"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
              >
                4.5 km
              </div>
              <div
                className="text-[12px] text-blue-400/80 mb-2"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                DISTANCE TO NEPTUNE
              </div>
              <div
                className="text-white/50 text-[14px]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                About an hour's walk from the Sun
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="h-[1px] bg-white/10 w-full mb-8" />
          <p
            className="text-white/40 text-[11px] max-w-2xl mx-auto"
            style={{ fontFamily: 'Space Mono, monospace' }}
          >
            The nearest star (Proxima Centauri) would be 31,000 km away —
            <br />
            nearly the distance around Earth's equator.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
