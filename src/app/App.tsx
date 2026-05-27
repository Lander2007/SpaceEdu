import { OrbitalNavigation } from './components/OrbitalNavigation';
import { ParallaxStars } from './components/ParallaxStars';
import { AsteroidBelt } from './components/AsteroidBelt';
import { ScaleComparison } from './components/ScaleComparison';
import { SpaceTimeline } from './components/SpaceTimeline';
import { CosmicData } from './components/CosmicData';
import { MouseFollower } from './components/MouseFollower';
import { ScrollProgress } from './components/ScrollProgress';
import { DistancePerspective } from './components/DistancePerspective';
import { CinematicGalaxyAndPlanets } from './components/CinematicGalaxyAndPlanets';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();

  useLenisScroll();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-black text-white overflow-x-hidden cursor-none" style={{ fontFamily: 'Inter, sans-serif', scrollBehavior: 'smooth' }}>
      <ScrollProgress />
      <MouseFollower />
      <ParallaxStars />
      <OrbitalNavigation />

      {/* SECTION 1: HERO */}
      <section id="hero" className="min-h-screen relative flex items-center justify-start px-16 overflow-hidden">
        {/* Animated star field background */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {Array.from({ length: 200 }).map((_, i) => {
            const cx = Math.random() * 100;
            const cy = Math.random() * 100;
            return (
              <motion.circle
                key={i}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r={Math.random() * 1.5}
                fill="white"
                opacity={Math.random() * 0.8 + 0.2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, Math.random() * 0.8 + 0.2, Math.random() * 0.8 + 0.2],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.01,
                  ease: 'easeOut',
                }}
              />
            );
          })}

          {/* Shooting stars */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.line
              key={`shooting-${i}`}
              x1={`${Math.random() * 50}%`}
              y1={`${Math.random() * 50}%`}
              x2={`${Math.random() * 50 + 10}%`}
              y2={`${Math.random() * 50 + 10}%`}
              stroke="white"
              strokeWidth="1"
              opacity="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 2 + i * 2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
          ))}
        </svg>

        {/* Sun corona (bottom-left, cropped) with pulsing effect */}
        <motion.div
          className="absolute -bottom-64 -left-64 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245, 166, 35, 0.15) 0%, rgba(245, 166, 35, 0.05) 40%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 1],
            scale: [0.8, 1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            ease: 'easeOut',
            times: [0, 0.3, 0.6, 1],
          }}
        />

        <div className="relative z-10 max-w-7xl">
          <motion.h1
            className="text-[200px] leading-none tracking-tighter mb-8"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 300,
              marginLeft: '-0.05em',
            }}
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            SOLAR SYSTEM
          </motion.h1>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.p
              className="text-[10px] tracking-wider"
              style={{ fontFamily: 'Space Mono, monospace' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              8 planets. 4.6 billion years. One star.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 1.2 },
            y: { duration: 2, delay: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <motion.div
            className="w-[1px] h-16 bg-white/30"
            animate={{
              scaleY: [1, 0.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <div className="text-white/40 text-xs" style={{ fontFamily: 'Space Mono, monospace' }}>
            ↓
          </div>
        </motion.div>

        {/* Decorative grid lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </section>

      {/* SECTION 2: THE SUN */}
      <section id="sun" className="min-h-screen relative flex items-center px-16 py-32">
        {/* Vertical section title */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[120px] text-white/5"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 300,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          THE SUN
        </div>

        {/* Sun illustration - left 70% */}
        <motion.div
          className="w-[70%] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <svg width="500" height="500" viewBox="0 0 500 500">
            {/* Concentric rings */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <circle
                key={i}
                cx="250"
                cy="250"
                r={250 - i * 25}
                fill="none"
                stroke={i % 3 === 0 ? '#F5A623' : i % 3 === 1 ? '#FF6B35' : '#FFD23F'}
                strokeWidth="0.5"
                opacity={0.6 - i * 0.05}
              />
            ))}
            <circle cx="250" cy="250" r="180" fill="url(#sunGradient)" opacity="0.8" />
            <defs>
              <radialGradient id="sunGradient">
                <stop offset="0%" stopColor="#FFD23F" />
                <stop offset="50%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#F5A623" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Data column - right 30% */}
        <motion.div
          className="w-[30%] flex flex-col gap-8"
          style={{ fontFamily: 'Space Mono, monospace' }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.4 }}
        >
          {[
            { label: 'Temperature', value: '5,778 K' },
            { label: 'Age', value: '4.6 Billion Years' },
            { label: 'Diameter', value: '1,392,700 km' },
            { label: 'Mass', value: '1.989 × 10³⁰ kg' },
            { label: 'Composition', value: '73% Hydrogen, 25% Helium' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
              viewport={{ once: false, amount: 0.4 }}
            >
              <div className="text-[8px] text-white/40 tracking-widest mb-1">{item.label}</div>
              <div className="text-[12px] text-white/90">{item.value}</div>
              <div className="h-[1px] bg-white/15 mt-3" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* GALAXY (Pinned) + PLANETS (Scroll-triggered entrance) */}
      <CinematicGalaxyAndPlanets />

      {/* ASTEROID BELT */}
      <AsteroidBelt />

      {/* SCALE COMPARISON */}
      <ScaleComparison />

      {/* SECTION 4: EARTH */}
      <section id="earth" className="min-h-screen relative flex items-center" style={{ background: '#010b19' }}>
        <div className="w-full grid grid-cols-2 gap-16 px-16">
          {/* Left: Earth illustration */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.4 }}
          >
            <svg width="500" height="500" viewBox="0 0 500 500">
              <circle cx="250" cy="250" r="240" fill="#1e3a8a" opacity="0.6" />

              {/* Abstract continents */}
              <path
                d="M 150 100 Q 200 80 250 120 Q 280 140 300 180 Q 290 220 250 230 Q 200 240 170 200 Q 140 160 150 100"
                fill="#22c55e"
                opacity="0.7"
              />
              <path
                d="M 320 250 Q 360 240 380 280 Q 390 320 360 350 Q 330 370 310 340 Q 300 300 320 250"
                fill="#22c55e"
                opacity="0.7"
              />
              <path
                d="M 100 300 Q 140 280 180 300 Q 200 330 170 360 Q 130 380 110 350 Q 90 320 100 300"
                fill="#22c55e"
                opacity="0.7"
              />
              <ellipse cx="200" cy="350" rx="60" ry="40" fill="#22c55e" opacity="0.6" />

              <circle cx="250" cy="250" r="240" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Right: Quote */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.4 }}
          >
            <blockquote
              className="text-[72px] leading-[0.95] mb-8"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
            >
              The pale blue dot. Everything that has ever happened, happened here.
            </blockquote>
            <cite
              className="text-[10px] text-white/50 not-italic"
              style={{ fontFamily: 'Space Mono, monospace' }}
            >
              — Carl Sagan, 1994
            </cite>
          </motion.div>
        </div>
      </section>

      {/* DISTANCE PERSPECTIVE */}
      <DistancePerspective />

      {/* SECTION 5: RINGS OF SATURN */}
      <section className="min-h-screen relative flex items-center justify-center px-16 bg-black">
        {/* Section title as watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center text-[180px] text-white/[0.02] pointer-events-none"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
        >
          SATURN
        </div>

        {/* Saturn with rings */}
        <motion.svg
          width="1200"
          height="600"
          viewBox="0 0 1200 600"
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Rings */}
          <ellipse
            cx="600"
            cy="300"
            rx="500"
            ry="80"
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
          />
          <ellipse
            cx="600"
            cy="300"
            rx="450"
            ry="72"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
          />
          <ellipse
            cx="600"
            cy="300"
            rx="400"
            ry="64"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.5"
          />

          {/* Saturn */}
          <circle cx="450" cy="300" r="120" fill="rgba(238, 232, 170, 0.3)" />
          <circle cx="450" cy="300" r="120" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />

          {/* Data annotations */}
          <g style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', fill: 'rgba(255, 255, 255, 0.6)' }}>
            <text x="150" y="250">Ring width: 282,000 km</text>
            <line x1="150" y1="255" x2="200" y2="280" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />

            <text x="900" y="200">Thickness: 10–100 m</text>
            <line x1="900" y1="205" x2="850" y2="260" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />

            <text x="750" y="450">Composition: Ice & Rock</text>
            <line x1="750" y1="445" x2="700" y2="380" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />
          </g>
        </motion.svg>

        <motion.p
          className="absolute bottom-32 text-[24px] text-white/60 italic"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
        >
          The jewel of the solar system.
        </motion.p>
      </section>

      {/* SPACE TIMELINE */}
      <SpaceTimeline />

      {/* COSMIC DATA */}
      <CosmicData />

      {/* SECTION 6: THE OUTER EDGE */}
      <section id="outer" className="min-h-screen relative flex items-center justify-center bg-black px-16">
        <div className="relative w-full max-w-5xl">
          {/* Horizontal dividing line */}
          <motion.div
            className="h-[1px] bg-white/20 w-full mb-32"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: false, amount: 0.5 }}
          />

          {/* Text above line */}
          <motion.div
            className="absolute -top-32 left-0 text-[48px] tracking-[0.2em]"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
            initial={{ opacity: 0, y: -30, x: -30 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: false, amount: 0.5 }}
          >
            Beyond Neptune.
          </motion.div>

          {/* Text below line */}
          <motion.div
            className="text-right text-[48px] tracking-[0.2em] mt-32"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
            initial={{ opacity: 0, y: 30, x: 30 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: false, amount: 0.5 }}
          >
            The Kuiper Belt.<br />
            The Oort Cloud.<br />
            The Unknown.
          </motion.div>

          {/* Blinking cursor */}
          <div
            className="absolute bottom-0 right-0 text-[48px] animate-pulse"
            style={{ fontFamily: 'Space Mono, monospace', animation: 'pulse 1.5s ease-in-out infinite' }}
          >
            _
          </div>
        </div>
      </section>

      {/* SECTION 7: FOOTER */}
      <footer className="relative min-h-screen flex flex-col items-center justify-end bg-black pt-32 pb-16 overflow-hidden">
        {/* Star map background */}
        <motion.svg
          className="absolute bottom-0 w-full"
          style={{ height: '80vh' }}
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMax slice"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* Circular star map */}
          <circle cx="600" cy="900" r="600" fill="rgba(8, 8, 8, 0.8)" />

          {/* Stars within the circle */}
          {Array.from({ length: 300 }).map((_, i) => {
            const angle = Math.random() * Math.PI;
            const distance = Math.random() * 600;
            const x = 600 + Math.cos(angle) * distance;
            const y = 900 - Math.sin(angle) * distance;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={Math.random() * 1.5 + 0.3}
                fill="white"
                opacity={Math.random() * 0.8 + 0.2}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.003 }}
                viewport={{ once: false, amount: 0.2 }}
              />
            );
          })}

          {/* Constellation lines */}
          <motion.line
            x1="400"
            y1="700"
            x2="500"
            y2="650"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: false, amount: 0.2 }}
          />
          <motion.line
            x1="500"
            y1="650"
            x2="550"
            y2="720"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: false, amount: 0.2 }}
          />
          <motion.line
            x1="700"
            y1="680"
            x2="750"
            y2="730"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: false, amount: 0.2 }}
          />
        </motion.svg>

        {/* Footer content */}
        <motion.div
          className="relative z-10 text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h3
            className="text-[32px] mb-8 tracking-wide"
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300 }}
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.5, delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            SOLAR SYSTEM
          </motion.h3>

          <div className="flex gap-8 justify-center mb-12">
            {[
              { label: 'Instagram', symbol: '□' },
              { label: 'Twitter', symbol: '○' },
              { label: 'About', symbol: '△' },
            ].map((link, index) => (
              <motion.div
                key={link.label}
                className="flex items-center gap-2 text-[10px] text-white/60 hover:text-white/90 transition-colors cursor-pointer"
                style={{ fontFamily: 'Space Mono, monospace' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <span className="text-[12px]">{link.symbol}</span>
                <span>{link.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-[8px] text-white/40 max-w-2xl mx-auto"
            style={{ fontFamily: 'Space Mono, monospace' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            © The Solar System has existed 4,600,000,000 years longer than this website.
          </motion.p>
        </motion.div>
      </footer>
    </div>
  );
}