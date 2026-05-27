import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function SpaceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const events = [
    { year: '1957', event: 'Sputnik 1', desc: 'First artificial satellite' },
    { year: '1961', event: 'Yuri Gagarin', desc: 'First human in space' },
    { year: '1969', event: 'Apollo 11', desc: 'First humans on the Moon' },
    { year: '1977', event: 'Voyager 1 & 2', desc: 'Journey to outer planets begins' },
    { year: '1990', event: 'Hubble Telescope', desc: 'Launched into orbit' },
    { year: '2012', event: 'Curiosity Rover', desc: 'Lands on Mars' },
    { year: '2019', event: 'First Black Hole Image', desc: 'Event Horizon Telescope' },
    { year: '2021', event: 'James Webb Telescope', desc: 'Launched to L2 point' },
  ];

  return (
    <section ref={ref} className="min-h-[200vh] relative bg-black py-32 px-16">
      <div className="sticky top-32 mb-32">
        <motion.h2
          className="text-[120px] leading-none tracking-tight mb-8"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Journey
          <br />
          Through Time
        </motion.h2>
        <motion.p
          className="text-white/50 text-[12px] italic max-w-md"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Humanity's greatest achievements in space exploration
        </motion.p>
      </div>

      {/* Vertical timeline path */}
      <div className="absolute left-1/2 top-0 h-full w-[1px]">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            strokeDasharray="10 5"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* Timeline events */}
      <div className="relative space-y-32 mt-32">
        {events.map((item, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <div
                className="text-[80px] leading-none tracking-tight text-white/10 mb-2"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
              >
                {item.year}
              </div>
              <div
                className="text-[32px] leading-tight mb-2"
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
              >
                {item.event}
              </div>
              <div
                className="text-[12px] text-white/60"
                style={{ fontFamily: 'Space Mono, monospace' }}
              >
                {item.desc}
              </div>
            </div>

            {/* Center dot */}
            <motion.div
              className="w-4 h-4 rounded-full bg-white flex-shrink-0"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              viewport={{ once: false, amount: 0.5 }}
            />

            <div className="flex-1" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
