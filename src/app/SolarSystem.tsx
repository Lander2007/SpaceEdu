import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';

// Lazy load the BlackHoleScene for better performance
const BlackHoleScene = lazy(() => import('./components/three/BlackHoleScene').then(m => ({ default: m.BlackHoleScene })));

/* ─────────────────────────────────────────────
   SECTION CONFIG
───────────────────────────────────────────── */
const SECTIONS = [
  { id: 'hero',    label: 'Overview',  isPlanet: false },
  { id: 'sun',     label: 'The Sun',   isPlanet: true  },
  { id: 'mercury', label: 'Mercury',   isPlanet: true  },
  { id: 'venus',   label: 'Venus',     isPlanet: true  },
  { id: 'earth',   label: 'Earth',     isPlanet: true  },
  { id: 'mars',    label: 'Mars',      isPlanet: true  },
  { id: 'jupiter', label: 'Jupiter',   isPlanet: true  },
  { id: 'saturn',  label: 'Saturn',    isPlanet: true  },
  { id: 'uranus',  label: 'Uranus',    isPlanet: true  },
  { id: 'neptune', label: 'Neptune',   isPlanet: true  },
  { id: 'void',    label: 'The Void',  isPlanet: false },
];

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const contentContainerVariants = {
  warpInitial: {},
  warpAnimate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    }
  },
  warpExit: {},
  fadeInitial: {},
  fadeAnimate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  },
  fadeExit: {},
};

const textFadeUpVariants = {
  warpInitial: { opacity: 0, y: 30 },
  warpAnimate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  warpExit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } },
  
  fadeInitial: { opacity: 0, y: 30 },
  fadeAnimate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  fadeExit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } },
};

const lineExpandVariants = {
  warpInitial: { scaleX: 0, originX: 0 },
  warpAnimate: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  warpExit: { scaleX: 0, originX: 0, transition: { duration: 0.3 } },
  
  fadeInitial: { scaleX: 0, originX: 0 },
  fadeAnimate: { scaleX: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  fadeExit: { scaleX: 0, originX: 0, transition: { duration: 0.3 } },
};

const planetVariants = {
  warpInitial: (layoutType: 'left' | 'right' | 'center') => {
    const offsetX = layoutType === 'left' ? '25vw' : layoutType === 'right' ? '-25vw' : '0vw';
    return {
      scale: 0.01,
      opacity: 0,
      x: offsetX,
      y: 0,
      filter: 'brightness(3) contrast(1.5)',
    };
  },
  warpAnimate: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    filter: 'brightness(1) contrast(1)',
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    }
  },
  warpExit: (layoutType: 'left' | 'right' | 'center') => {
    const offsetX = layoutType === 'left' ? '25vw' : layoutType === 'right' ? '-25vw' : '0vw';
    return {
      scale: 0.01,
      opacity: 0,
      x: offsetX,
      y: 0,
      filter: 'brightness(3) contrast(1.5)',
      transition: {
        duration: 0.5,
        ease: [0.5, 0, 0.75, 0],
      }
    };
  },
  fadeInitial: {
    scale: 1,
    opacity: 0,
    x: 0,
    y: 0,
  },
  fadeAnimate: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    }
  },
  fadeExit: {
    scale: 1,
    opacity: 0,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    }
  }
};

/* ─────────────────────────────────────────────
   PARALLAX STARFIELD COMPONENT
───────────────────────────────────────────── */
function StarFieldParallax({ count = 180, mouseX, mouseY }: { count?: number; mouseX: any; mouseY: any }) {
  const stars = useRef<{ x: number; y: number; r: number; o: number }[]>([]);
  if (stars.current.length === 0) {
    for (let i = 0; i < count; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random() * 0.7 + 0.15,
      });
    }
  }

  const shiftX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const shiftY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  return (
    <motion.svg
      className="star-field"
      style={{
        position: 'absolute',
        inset: -20,
        width: 'calc(100% + 40px)',
        height: 'calc(100% + 40px)',
        pointerEvents: 'none',
        zIndex: 1,
        x: shiftX,
        y: shiftY,
      }}
    >
      {stars.current.map((s, i) => (
        <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white" opacity={s.o} />
      ))}
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────
   SHOOTING STARS COMPONENT
───────────────────────────────────────────── */
function ShootingStars() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      {Array.from({ length: 2 }).map((_, i) => (
        <motion.line
          key={`shooting-${i}`}
          x1={`${Math.random() * 50}%`}
          y1={`${Math.random() * 50}%`}
          x2={`${Math.random() * 50 + 15}%`}
          y2={`${Math.random() * 50 + 15}%`}
          stroke="#fff"
          strokeWidth="1.2"
          opacity="0"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1.2,
            delay: Math.random() * 10 + 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 15 + 5,
          }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   PLANET IMAGE — with 3D spherical rendering, atmospheric glow & mouse tilt
───────────────────────────────────────────── */
interface PlanetImageProps {
  src: string;
  alt: string;
  size: number;
  accentColor: string;
  accentGlow: string;
  tilt?: number;
  layoutType: 'left' | 'right' | 'center';
  mouseX: any;
  mouseY: any;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

function PlanetImage({
  src,
  alt,
  size,
  accentColor,
  accentGlow,
  tilt = 0,
  layoutType,
  mouseX,
  mouseY,
  style,
  className,
  children
}: PlanetImageProps) {
  const springX = useSpring(mouseX, { damping: 45, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 120 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const shiftX = useTransform(springX, [-0.5, 0.5], [18, -18]);
  const shiftY = useTransform(springY, [-0.5, 0.5], [18, -18]);

  return (
    <motion.div
      className={className}
      custom={layoutType}
      variants={planetVariants}
      style={{
        width: size,
        height: size,
        position: 'relative',
        perspective: 1200,
        flexShrink: 0,
        zIndex: 5,
        ...style,
      }}
    >
      {/* 1. Outer Glow layer */}
      <div
        style={{
          position: 'absolute',
          inset: -15,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentGlow} 20%, transparent 65%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 2. Parallax shift layer */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          x: shiftX,
          y: shiftY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3. Floating & 3D Tilting layer */}
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          {/* Children like rings go here to sit correctly in the 3D plane */}
          {children}

          {/* Actual Planet sphere */}
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 15px 40px rgba(0,0,0,0.65)`,
              transform: `rotate(${tilt}deg)`,
              zIndex: 1,
            }}
          >
            {/* Real NASA/ESA Photo */}
            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                animation: 'slowRotate 120s linear infinite',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/${size}/111/fff?text=${alt}`;
              }}
            />
            
            {/* 3D Sphere Shading Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.95) 90%)',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Inner Atmospheric Rim Glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                boxShadow: `inset 0 0 20px ${accentColor}`,
                opacity: 0.45,
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   DATA TABLE COMPONENT
───────────────────────────────────────────── */
function DataTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="data-table">
      {rows.map((row) => (
        <motion.div key={row.label} className="data-row" variants={textFadeUpVariants}>
          <span className="data-label">{row.label}</span>
          <span className="data-value">{row.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION 01 — HERO
───────────────────────────────────────────── */
function SectionHero({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const shiftX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const shiftY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  return (
    <motion.section
      id="section-hero"
      className="section"
      style={{ background: '#010005' }}
    >
      <ShootingStars />
      <motion.div
        style={{
          position: 'absolute', inset: -30, zIndex: 0,
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NGC_4414_%28NASA-med%29.jpg/1280px-NGC_4414_%28NASA-med%29.jpg')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3) saturate(0.55)',
          x: shiftX,
          y: shiftY,
        }}
      />
      <motion.div
        className="hero-content"
        style={{ zIndex: 2, position: 'relative' }}
        variants={contentContainerVariants}
      >
        <motion.h1 className="hero-title" variants={textFadeUpVariants}>SOLAR SYSTEM</motion.h1>
        <motion.div className="hero-divider" variants={lineExpandVariants} />
        <motion.p className="hero-sub" variants={textFadeUpVariants}>A journey through our cosmic neighborhood.</motion.p>
      </motion.div>
      <div className="hero-chevron">&#8964;</div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 02 — THE SUN
───────────────────────────────────────────── */
function SectionSun({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const pSize = Math.min(window.innerHeight * 0.68, 600);
  return (
    <motion.section
      id="section-sun"
      className="section"
      style={{
        background: '#0D0800',
        ['--accent-color' as any]: '#F5A623',
        ['--accent-glow' as any]: 'rgba(245,166,35,0.25)'
      }}
    >
      <ShootingStars />
      <div className="planet-layout left-planet" style={{ zIndex: 2, position: 'relative' }}>
        <div className="planet-col">
          <PlanetImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/1024px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg"
            alt="The Sun"
            size={pSize}
            accentColor="#F5A623"
            accentGlow="rgba(245,166,35,0.35)"
            layoutType="left"
            mouseX={mouseX}
            mouseY={mouseY}
          >
            {/* Custom Corona glow ring inside the 3D plane */}
            <div style={{
              position: 'absolute',
              width: pSize + 80,
              height: pSize + 80,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,166,35,0.09) 35%, transparent 68%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
          </PlanetImage>
        </div>
        <motion.div className="info-col" variants={contentContainerVariants}>
          <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }} variants={textFadeUpVariants}>02 / 11</motion.p>
          <motion.h2 className="section-name" style={{ fontSize: 88 }} variants={textFadeUpVariants}>THE<br />SUN</motion.h2>
          <motion.div className="accent-line" style={{ background: '#F5A623' }} variants={lineExpandVariants} />
          <DataTable rows={[
            { label: 'SURFACE TEMP', value: '5,778 K' },
            { label: 'CORE TEMP', value: '15,000,000 K' },
            { label: 'DIAMETER', value: '1,392,700 km' },
            { label: 'AGE', value: '4.6 Billion Yrs' },
            { label: 'DISTANCE FROM EARTH', value: '149.6M km' },
          ]} />
          <motion.p style={{ marginTop: 28, fontFamily: 'Inter', fontWeight: 300, fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 340 }} variants={textFadeUpVariants}>
            "Every atom in your body was forged in a star."
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 03 — MERCURY
───────────────────────────────────────────── */
function SectionMercury({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  return (
    <motion.section
      id="section-mercury"
      className="section"
      style={{
        background: '#0A0A0A',
        ['--accent-color' as any]: '#B0B0B0',
        ['--accent-glow' as any]: 'rgba(176,176,176,0.2)'
      }}
    >
      <ShootingStars />
      {/* Orbit ellipse behind text */}
      <div style={{
        position: 'absolute', right: '38%', top: '50%',
        transform: 'translate(50%, -50%)',
        width: 500, height: 200,
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '50%',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <div className="planet-layout left-planet" style={{ zIndex: 2, position: 'relative' }}>
        <div className="planet-col">
          <PlanetImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/1024px-Mercury_in_true_color.jpg"
            alt="Mercury"
            size={Math.min(window.innerHeight * 0.65, 560)}
            accentColor="#B0B0B0"
            accentGlow="rgba(176,176,176,0.2)"
            layoutType="left"
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
        <motion.div className="info-col" variants={contentContainerVariants}>
          <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }} variants={textFadeUpVariants}>03 / 11</motion.p>
          <motion.h2 className="section-name" style={{ fontSize: 100 }} variants={textFadeUpVariants}>MER<br />CURY</motion.h2>
          <motion.div className="accent-line" style={{ background: '#B0B0B0' }} variants={lineExpandVariants} />
          <DataTable rows={[
            { label: 'DIAMETER', value: '4,879 km' },
            { label: 'ORBITAL PERIOD', value: '88 Earth Days' },
            { label: 'DISTANCE FROM SUN', value: '57.9M km' },
            { label: 'SURFACE TEMP', value: '-180°C to 430°C' },
            { label: 'MOONS', value: '0' },
          ]} />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 04 — VENUS
───────────────────────────────────────────── */
function SectionVenus({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  return (
    <motion.section
      id="section-venus"
      className="section"
      style={{
        background: '#1A0D00',
        ['--accent-color' as any]: '#E8A045',
        ['--accent-glow' as any]: 'rgba(232,160,69,0.25)'
      }}
    >
      <ShootingStars />
      <div className="watermark" style={{ fontSize: 200, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        VENUS
      </div>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 1440 900">
        <path d="M 720 450 Q 900 200 720 50 Q 540 -100 300 150 Q 60 400 300 650 Q 540 900 820 750 Q 1100 600 1000 350 Q 900 100 700 200" fill="none" stroke="white" strokeWidth="2"/>
        <path d="M 720 450 Q 550 700 720 850 Q 890 1000 1100 750 Q 1310 500 1100 250 Q 890 0 650 150 Q 410 300 500 550 Q 590 800 780 700" fill="none" stroke="#E8A045" strokeWidth="1.5"/>
      </svg>

      <div className="planet-layout" style={{ display: 'grid', gridTemplateColumns: '1fr', justifyItems: 'center', zIndex: 2, position: 'relative', width: '100%', height: '100%', padding: '60px 80px' }}>
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', gap: 32 }}
          variants={contentContainerVariants}
        >
          <PlanetImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/1024px-Venus-real_color.jpg"
            alt="Venus"
            size={Math.min(window.innerHeight * 0.58, 500)}
            accentColor="#E8A045"
            accentGlow="rgba(232,160,69,0.3)"
            tilt={5}
            layoutType="center"
            mouseX={mouseX}
            mouseY={mouseY}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em' }} variants={textFadeUpVariants}>04 / 11</motion.p>
            <motion.h2 className="section-name" style={{ fontSize: 80, textAlign: 'center', letterSpacing: '0.15em' }} variants={textFadeUpVariants}>VENUS</motion.h2>
          </div>
          <div className="data-horizontal" style={{ width: '80%', maxWidth: 800 }}>
            {[
              { label: 'DIAMETER', value: '12,104 km' },
              { label: 'SURFACE TEMP', value: '465 °C' },
              { label: 'ORBITAL PERIOD', value: '225 Days' },
              { label: 'MOONS', value: '0' },
            ].map((d) => (
              <motion.div key={d.label} className="data-h-cell" variants={textFadeUpVariants}>
                <span className="data-label">{d.label}</span>
                <span className="data-value">{d.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 05 — EARTH
───────────────────────────────────────────── */
function SectionEarth({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  return (
    <motion.section
      id="section-earth"
      className="section"
      style={{
        background: '#010B19',
        ['--accent-color' as any]: '#4FC3F7',
        ['--accent-glow' as any]: 'rgba(79,195,247,0.2)'
      }}
    >
      <ShootingStars />
      <div className="planet-layout right-planet" style={{ zIndex: 2, position: 'relative' }}>
        <motion.div className="info-col" variants={contentContainerVariants}>
          <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }} variants={textFadeUpVariants}>05 / 11</motion.p>
          <motion.h2 className="section-name" style={{ fontSize: 80, lineHeight: 0.95 }} variants={textFadeUpVariants}>This is<br />home.<br />This is us.</motion.h2>
          <motion.div className="accent-bar" style={{ background: '#4FC3F7' }} variants={lineExpandVariants} />
          <motion.p className="font-mono text-dim" style={{ fontSize: 12, marginTop: 4, marginBottom: 20 }} variants={textFadeUpVariants}>Only known planet with life.</motion.p>
          <DataTable rows={[
            { label: 'DIAMETER', value: '12,742 km' },
            { label: 'SURFACE TEMP', value: '-88°C to 58°C' },
            { label: 'ORBITAL PERIOD', value: '365.25 Days' },
            { label: 'MOONS', value: '1 (Luna)' },
            { label: 'WATER COVERAGE', value: '71%' },
          ]} />
        </motion.div>
        <div className="planet-col">
          <PlanetImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1024px-The_Earth_seen_from_Apollo_17.jpg"
            alt="Earth"
            size={Math.min(window.innerHeight * 0.68, 580)}
            accentColor="#4FC3F7"
            accentGlow="rgba(79,195,247,0.25)"
            layoutType="right"
            mouseX={mouseX}
            mouseY={mouseY}
          >
            {/* Holographic sci-fi grid overlay placed correctly on 3D plane */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(79,195,247,0.09) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(79,195,247,0.09) 30px)',
              backgroundSize: '30px 30px',
              zIndex: 5,
            }} />
          </PlanetImage>
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 06 — MARS
───────────────────────────────────────────── */
function SectionMars({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const [distance, setDistance] = useState(225187000);
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(d => d + Math.floor(Math.random() * 3) - 1);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="section-mars"
      className="section"
      style={{
        background: '#120500',
        ['--accent-color' as any]: '#C1440E',
        ['--accent-glow' as any]: 'rgba(193,68,14,0.25)'
      }}
    >
      <ShootingStars />
      <div className="planet-layout left-planet" style={{ zIndex: 2, position: 'relative' }}>
        <div className="planet-col">
          <PlanetImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1024px-OSIRIS_Mars_true_color.jpg"
            alt="Mars"
            size={Math.min(window.innerHeight * 0.65, 560)}
            accentColor="#C1440E"
            accentGlow="rgba(193,68,14,0.3)"
            layoutType="left"
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
        <motion.div className="info-col" variants={contentContainerVariants}>
          <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }} variants={textFadeUpVariants}>06 / 11</motion.p>
          <motion.h2 className="section-name" style={{ fontSize: 96 }} variants={textFadeUpVariants}>MARS</motion.h2>
          <motion.div className="accent-line" style={{ background: '#C1440E' }} variants={lineExpandVariants} />
          
          <div className="mars-timeline" style={{ marginBottom: 16 }}>
            {[
              { year: '1971', mission: 'Mariner 9 — First Mars orbit' },
              { year: '1997', mission: 'Mars Pathfinder — First rover' },
              { year: '2004', mission: 'Spirit & Opportunity rovers' },
              { year: '2012', mission: 'Curiosity rover lands' },
              { year: '2021', mission: 'Perseverance + Ingenuity' },
            ].map((t) => (
              <motion.div key={t.year} className="timeline-item" variants={textFadeUpVariants}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">{t.year}</span>
                  <span className="timeline-mission">{t.mission}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="distance-counter" variants={textFadeUpVariants}>
            {distance.toLocaleString()} km
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 07 — JUPITER
───────────────────────────────────────────── */
function SectionJupiter({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const pSize = Math.min(window.innerHeight * 0.72, 620);
  return (
    <motion.section
      id="section-jupiter"
      className="section"
      style={{
        background: '#0D0800',
        ['--accent-color' as any]: '#C88B3A',
        ['--accent-glow' as any]: 'rgba(200,139,58,0.25)'
      }}
    >
      <ShootingStars />
      <div className="watermark" style={{ fontSize: 180, top: '50%', left: '45%', transform: 'translate(-50%, -50%)' }}>
        JUPITER
      </div>
      <div className="planet-layout left-planet" style={{ zIndex: 2, position: 'relative' }}>
        <div className="planet-col">
          <PlanetImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/1024px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg"
            alt="Jupiter"
            size={pSize}
            accentColor="#C88B3A"
            accentGlow="rgba(200,139,58,0.3)"
            layoutType="left"
            mouseX={mouseX}
            mouseY={mouseY}
          >
            {/* Pulsing Great Red Spot Ring in 3D Space */}
            <motion.div
              style={{
                position: 'absolute',
                width: pSize * 0.28,
                height: pSize * 0.28,
                borderRadius: '50%',
                border: '1px solid #C88B3A',
                top: '57%', left: '42%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 4,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              <span style={{
                position: 'absolute', left: '110%', top: '50%', transform: 'translateY(-50%)',
                fontFamily: 'Space Mono', fontSize: 10, color: 'rgba(200,139,58,0.9)',
                whiteSpace: 'nowrap',
              }}>← GREAT RED SPOT</span>
            </motion.div>

            {/* Storm band labels */}
            {[
              { top: '25%', label: 'NORTH EQUATORIAL BELT' },
              { top: '60%', label: 'SOUTH TEMPERATE BELT' },
            ].map((sl) => (
              <div key={sl.label} className="storm-label" style={{ top: sl.top, right: -15, transform: 'translateX(100%)', zIndex: 4 }}>
                <span className="storm-label-line" />
                {sl.label}
              </div>
            ))}
          </PlanetImage>
        </div>
        <motion.div className="info-col" variants={contentContainerVariants}>
          <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }} variants={textFadeUpVariants}>07 / 11</motion.p>
          <motion.h2 className="section-name" style={{ fontSize: 96 }} variants={textFadeUpVariants}>JUPI<br />TER</motion.h2>
          <motion.div className="accent-line" style={{ background: '#C88B3A' }} variants={lineExpandVariants} />
          
          <div className="fact-pills" style={{ marginBottom: 24 }}>
            {['95 known moons', '1,300× Earth volume', 'Largest planet', '67% H₂ atmosphere'].map((f) => (
              <motion.div key={f} className="fact-pill" variants={textFadeUpVariants}>{f}</motion.div>
            ))}
          </div>

          <DataTable rows={[
            { label: 'DIAMETER', value: '139,820 km' },
            { label: 'ORBITAL PERIOD', value: '12 Earth Years' },
            { label: 'GREAT RED SPOT', value: 'Storm active for 350+ years' },
          ]} />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 08 — SATURN
───────────────────────────────────────────── */
function SectionSaturn({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const pSize = Math.min(window.innerHeight * 0.52, 450);

  // Saturn rings split to encircle the planet body perfectly in 3D
  const renderSaturnRings = (isFront: boolean) => {
    return [1.95, 1.7, 1.48, 1.3].map((mult, i) => (
      <div
        key={`ring-${isFront ? 'front' : 'back'}-${i}`}
        style={{
          position: 'absolute',
          width: pSize * mult,
          height: pSize * 0.28,
          borderRadius: '50%',
          border: `${6 - i * 1.5}px double rgba(232,213,163,${0.32 - i * 0.07})`,
          // Exact Saturn axial tilt rotation:
          transform: 'translate(-50%, -50%) rotateX(72deg) rotateY(-18deg)',
          top: '50%',
          left: '50%',
          pointerEvents: 'none',
          zIndex: isFront ? 3 : 0,
          clipPath: isFront ? 'inset(50% 0 0 0)' : 'inset(0 0 50% 0)',
        }}
      />
    ));
  };

  return (
    <motion.section
      id="section-saturn"
      className="section"
      style={{
        background: '#0B0900',
        ['--accent-color' as any]: '#E8D5A3',
        ['--accent-glow' as any]: 'rgba(232,213,163,0.2)'
      }}
    >
      <ShootingStars />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 60, width: '100%', padding: '0 80px' }}>
          
          {/* Ring facts left */}
          <motion.div className="info-col" variants={contentContainerVariants}>
            <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 16 }} variants={textFadeUpVariants}>08 / 11</motion.p>
            <motion.h2 className="section-name" style={{ fontSize: 80, lineHeight: 0.95, marginBottom: 24 }} variants={textFadeUpVariants}>SATURN</motion.h2>
            <DataTable rows={[
              { label: 'RING WIDTH', value: '282,000 km' },
              { label: 'RING THICKNESS', value: '10 – 100 m' },
              { label: 'RING COMPOSITION', value: 'Ice & Rock Particles' },
              { label: 'MOONS', value: '146 known' },
            ]} />
          </motion.div>

          {/* Planet center — with 3D tilted wrap-around rings */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Back half of the rings */}
            {renderSaturnRings(false)}

            {/* Planet sphere */}
            <PlanetImage
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1024px-Saturn_during_Equinox.jpg"
              alt="Saturn"
              size={pSize}
              accentColor="#E8D5A3"
              accentGlow="rgba(232,213,163,0.25)"
              tilt={20}
              layoutType="center"
              mouseX={mouseX}
              mouseY={mouseY}
            />

            {/* Front half of the rings */}
            {renderSaturnRings(true)}

            {/* "SATURN" through rings text overlay */}
            <div style={{
              position: 'absolute',
              fontFamily: 'Cormorant Garamond', fontWeight: 300,
              fontSize: 48, letterSpacing: '0.4em',
              color: 'rgba(232,213,163,0.18)',
              pointerEvents: 'none',
              zIndex: 2,
              whiteSpace: 'nowrap',
            }}>
              SATURN
            </div>
          </div>

          {/* Planet facts right */}
          <motion.div className="info-col" variants={contentContainerVariants}>
            <DataTable rows={[
              { label: 'DIAMETER', value: '116,460 km' },
              { label: 'ORBITAL PERIOD', value: '29 Earth Years' },
              { label: 'DENSITY', value: 'Less than water' },
              { label: 'WIND SPEED', value: '1,800 km/h' },
            ]} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 09 — URANUS
───────────────────────────────────────────── */
function SectionUranus({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  return (
    <motion.section
      id="section-uranus"
      className="section"
      style={{
        background: '#010D10',
        ['--accent-color' as any]: '#7DE8E8',
        ['--accent-glow' as any]: 'rgba(125,232,232,0.2)'
      }}
    >
      <ShootingStars />
      <div className="planet-layout right-planet" style={{ zIndex: 2, position: 'relative' }}>
        
        {/* Left: Info + tilt diagram */}
        <motion.div className="info-col" variants={contentContainerVariants}>
          <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }} variants={textFadeUpVariants}>09 / 11</motion.p>
          <motion.h2 className="section-name" style={{ fontSize: 96 }} variants={textFadeUpVariants}>URA<br />NUS</motion.h2>
          <motion.div className="accent-line" style={{ background: '#7DE8E8' }} variants={lineExpandVariants} />
          
          {/* Animated axial tilt SVG */}
          <motion.div style={{ margin: '12px 0', display: 'flex', alignItems: 'center', gap: 20 }} variants={textFadeUpVariants}>
            <svg width="60" height="100" viewBox="0 0 60 100">
              <line x1="30" y1="0" x2="30" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
              {/* Axis line draws dynamically */}
              <motion.line
                x1="5" y1="90" x2="55" y2="10"
                stroke="#7DE8E8" strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <path d="M 30 50 A 15 15 0 0 1 43 28" fill="none" stroke="rgba(125,232,232,0.5)" strokeWidth="1"/>
              <text x="44" y="35" fill="rgba(125,232,232,0.9)" fontSize="9" fontFamily="Space Mono">98°</text>
            </svg>
            <div>
              <div className="data-label">AXIAL TILT</div>
              <div className="font-mono" style={{ fontSize: 22, color: '#7DE8E8' }}>97.77°</div>
            </div>
          </motion.div>

          <motion.p className="section-quote" style={{ fontSize: 16, maxWidth: 340, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }} variants={textFadeUpVariants}>
            "It literally rolls through space."
          </motion.p>

          <DataTable rows={[
            { label: 'DIAMETER', value: '50,724 km' },
            { label: 'ORBITAL PERIOD', value: '84 Earth Years' },
            { label: 'TEMPERATURE', value: '-224°C' },
            { label: 'MOONS', value: '28 known' },
          ]} />
        </motion.div>

        {/* Right: Planet tilted 98° */}
        <div className="planet-col">
          <PlanetImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1024px-Uranus2.jpg"
            alt="Uranus"
            size={Math.min(window.innerHeight * 0.65, 560)}
            accentColor="#7DE8E8"
            accentGlow="rgba(125,232,232,0.25)"
            tilt={98}
            layoutType="right"
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 10 — NEPTUNE
───────────────────────────────────────────── */
function SectionNeptune({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  return (
    <motion.section
      id="section-neptune"
      className="section"
      style={{
        background: '#000510',
        ['--accent-color' as any]: '#3A7BD5',
        ['--accent-glow' as any]: 'rgba(58,123,213,0.25)'
      }}
    >
      <ShootingStars />
      <div className="planet-layout left-planet" style={{ zIndex: 2, position: 'relative' }}>
        <div className="planet-col">
          <PlanetImage
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/1024px-Neptune_Full.jpg"
            alt="Neptune"
            size={Math.min(window.innerHeight * 0.65, 560)}
            accentColor="#3A7BD5"
            accentGlow="rgba(58,123,213,0.3)"
            layoutType="left"
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>
        <motion.div className="info-col" variants={contentContainerVariants}>
          <motion.p className="font-mono text-dim" style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }} variants={textFadeUpVariants}>10 / 11</motion.p>
          <motion.h2 className="section-name" style={{ fontSize: 70, lineHeight: 0.95, marginBottom: 16 }} variants={textFadeUpVariants}>THE EDGE<br />OF THE<br />KNOWN.</motion.h2>
          <motion.div className="accent-line" style={{ background: '#3A7BD5' }} variants={lineExpandVariants} />
          
          <motion.div className="wind-speed-big" variants={textFadeUpVariants}>2,100</motion.div>
          <motion.div className="wind-unit" style={{ marginBottom: 24 }} variants={textFadeUpVariants}>KM/H WIND SPEED</motion.div>

          <DataTable rows={[
            { label: 'DIAMETER', value: '49,244 km' },
            { label: 'ORBITAL PERIOD', value: '165 Earth Years' },
            { label: 'DISTANCE FROM SUN', value: '4.5 Billion km' },
            { label: 'MOONS', value: '16 known' },
          ]} />
        </motion.div>
      </div>

      <div className="edge-label" style={{ zIndex: 3 }}>
        Kuiper Belt →
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 11 — THE VOID (BLACK HOLE)
───────────────────────────────────────────── */
function SectionVoid({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const shiftX = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);
  const shiftY = useTransform(mouseY, [-0.5, 0.5], [-25, 25]);

  return (
    <motion.section
      id="section-void"
      className="section"
      style={{ background: '#000000', overflow: 'hidden' }}
    >
      {/* 3D Black Hole Scene */}
      <Suspense fallback={
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'Space Mono, monospace',
          fontSize: 12,
        }}>
          Loading singularity...
        </div>
      }>
        <BlackHoleScene mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
      
      {/* Content overlay */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '80px' }}>
        {/* Top section */}
        <motion.div
          style={{
            x: shiftX,
            y: shiftY,
          }}
          variants={contentContainerVariants}
        >
          <motion.p 
            className="font-mono text-dim" 
            style={{ fontSize: 11, letterSpacing: '0.2em', marginBottom: 12 }} 
            variants={textFadeUpVariants}
          >
            11 / 11
          </motion.p>
          <motion.h2 
            className="section-name" 
            style={{ fontSize: 120, lineHeight: 0.9, marginBottom: 24 }} 
            variants={textFadeUpVariants}
          >
            SINGU<br />LARITY
          </motion.h2>
          <motion.div 
            className="accent-line" 
            style={{ background: '#ff6600', width: 120 }} 
            variants={lineExpandVariants} 
          />
        </motion.div>

        {/* Center info */}
        <motion.div
          style={{
            position: 'absolute',
            right: 80,
            top: '50%',
            transform: 'translateY(-50%)',
            x: useTransform(shiftX, (v) => -v * 0.5),
            y: useTransform(shiftY, (v) => -v * 0.5),
          }}
          variants={contentContainerVariants}
        >
          <DataTable rows={[
            { label: 'EVENT HORIZON', value: 'Point of no return' },
            { label: 'ESCAPE VELOCITY', value: '> Speed of light' },
            { label: 'TIME DILATION', value: 'Infinite at horizon' },
            { label: 'HAWKING RADIATION', value: 'Theoretical emission' },
          ]} />
          
          <motion.p 
            style={{ 
              marginTop: 32, 
              fontFamily: 'Inter', 
              fontWeight: 300, 
              fontStyle: 'italic', 
              fontSize: 16, 
              color: 'rgba(255,255,255,0.6)', 
              lineHeight: 1.6, 
              maxWidth: 380 
            }} 
            variants={textFadeUpVariants}
          >
            "Sagittarius A★ — 4 million solar masses.<br />
            Intense gravity bending light into an accretion disk.<br />
            Where physics breaks down."
          </motion.p>
        </motion.div>

        {/* Bottom section */}
        <motion.div
          style={{
            x: useTransform(shiftX, (v) => -v),
            y: useTransform(shiftY, (v) => -v),
          }}
          variants={textFadeUpVariants}
        >
          <div style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: 48, 
            fontWeight: 300, 
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 32,
          }}>
            Beyond this,<br />
            the unknown.
          </div>
          
          {/* Footer credits */}
          <div style={{ 
            display: 'flex', 
            gap: 40, 
            fontFamily: 'Space Mono, monospace', 
            fontSize: 9, 
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}>
            <span>Images: NASA / JPL-Caltech / ESA / EHT</span>
            <span>Typography: Cormorant Garamond + Space Mono</span>
            <span>SOLAR SYSTEM © {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   NAVIGATION PILL
───────────────────────────────────────────── */
function NavPill({ current, total, onNavigate }: {
  current: number;
  total: number;
  onNavigate: (i: number) => void;
}) {
  return (
    <div id="nav-pill">
      {SECTIONS.map((s, i) => (
        <div key={s.id} className="nav-dot-wrapper" onClick={() => onNavigate(i)}>
          <div className={`nav-dot ${i === current ? 'active' : ''}`} />
          <div className="nav-tooltip">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   WARP STARBURST FLASH COMPONENT
───────────────────────────────────────────── */
function WarpFlare({ triggerKey, isWarp }: { triggerKey: any; isWarp: boolean }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!isWarp) return;
    setActive(true);
    const timer = setTimeout(() => setActive(false), 950);
    return () => clearTimeout(timer);
  }, [triggerKey, isWarp]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 80px 20px #fff, 0 0 160px 40px rgba(255,255,255,0.7), 0 0 300px 80px rgba(255,255,255,0.4)',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          initial={{ scale: 0.05, opacity: 0 }}
          animate={{
            scale: [0.05, 12, 0.05],
            opacity: [0, 1, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.9,
            times: [0, 0.45, 1],
            ease: 'easeInOut',
          }}
        >
          {/* Light Rays */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            width: 3, height: 400,
            background: 'linear-gradient(to bottom, transparent, #fff, transparent)',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            width: 3, height: 400,
            background: 'linear-gradient(to bottom, transparent, #fff, transparent)',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function SolarSystem() {
  const [current, setCurrent] = useState(0);
  const [transitionType, setTransitionType] = useState<'fade' | 'planet-warp'>('fade');
  const isTransitioning = useRef(false);

  // Global mouse coordinates for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5; // range: -0.5 to 0.5
      const y = (e.clientY / window.innerHeight) - 0.5; // range: -0.5 to 0.5
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Planet section check
  const isPlanetSection = (i: number) => SECTIONS[i]?.isPlanet === true;

  const goTo = useCallback((next: number) => {
    if (next === current || isTransitioning.current) return;
    if (next < 0 || next >= SECTIONS.length) return;

    isTransitioning.current = true;
    const fromPlanet = isPlanetSection(current);
    const toPlanet = isPlanetSection(next);
    const usePlanetTransition = fromPlanet && toPlanet;

    setTransitionType(usePlanetTransition ? 'planet-warp' : 'fade');
    setCurrent(next);

    // Timeout to release transition state lock (aligns with AnimatePresence durations)
    const duration = usePlanetTransition ? 1000 : 800;
    setTimeout(() => {
      isTransitioning.current = false;
    }, duration + 50);
  }, [current]);

  // Scroll wheel, keyboard & touch swipe listener
  useEffect(() => {
    let lastWheelTime = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime < 1000) return;
      lastWheelTime = now;
      if (e.deltaY > 0) goTo(current + 1);
      else              goTo(current - 1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') goTo(current + 1);
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   goTo(current - 1);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) {
        if (dy > 0) goTo(current + 1);
        else        goTo(current - 1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [current, goTo]);

  // Helper to render current section
  const renderSection = (index: number) => {
    switch (SECTIONS[index]?.id) {
      case 'hero':    return <SectionHero mouseX={mouseX} mouseY={mouseY} />;
      case 'sun':     return <SectionSun mouseX={mouseX} mouseY={mouseY} />;
      case 'mercury': return <SectionMercury mouseX={mouseX} mouseY={mouseY} />;
      case 'venus':   return <SectionVenus mouseX={mouseX} mouseY={mouseY} />;
      case 'earth':   return <SectionEarth mouseX={mouseX} mouseY={mouseY} />;
      case 'mars':    return <SectionMars mouseX={mouseX} mouseY={mouseY} />;
      case 'jupiter': return <SectionJupiter mouseX={mouseX} mouseY={mouseY} />;
      case 'saturn':  return <SectionSaturn mouseX={mouseX} mouseY={mouseY} />;
      case 'uranus':  return <SectionUranus mouseX={mouseX} mouseY={mouseY} />;
      case 'neptune': return <SectionNeptune mouseX={mouseX} mouseY={mouseY} />;
      case 'void':    return <SectionVoid mouseX={mouseX} mouseY={mouseY} />;
      default:        return null;
    }
  };

  return (
    <div id="scroll-container">
      {/* Background Starfield shifts globally based on mouse coordinates */}
      <StarFieldParallax count={200} mouseX={mouseX} mouseY={mouseY} />

      {/* Screen transition rendering */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
          initial={transitionType === 'planet-warp' ? 'warpInitial' : 'fadeInitial'}
          animate={transitionType === 'planet-warp' ? 'warpAnimate' : 'fadeAnimate'}
          exit={transitionType === 'planet-warp' ? 'warpExit' : 'fadeExit'}
        >
          {renderSection(current)}
        </motion.div>
      </AnimatePresence>

      {/* Cosmic lens flare burst at transition midpoint */}
      <WarpFlare triggerKey={current} isWarp={transitionType === 'planet-warp'} />

      {/* Navigation right dots */}
      <NavPill current={current} total={SECTIONS.length} onNavigate={goTo} />
    </div>
  );
}
