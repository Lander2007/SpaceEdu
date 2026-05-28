import { lazy, Suspense, useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { PlanetCard } from './PlanetCard';
import { SceneLoadingFallback } from './three/SceneLoadingFallback';
import type { PlanetKey } from '../constants/planetTextures';

const StarScene = lazy(() => import('./three/StarScene'));
const PlanetScene = lazy(() => import('./three/PlanetScene'));

gsap.registerPlugin(ScrollTrigger);

type Planet = {
  name: string;
  fact: string;
  patternType: PlanetKey;
  size: number;
  distance?: string;
  orbitalPeriod?: string;
  moons?: number;
};

export function CinematicGalaxyAndPlanets() {
  const galaxyRef = useRef<HTMLElement | null>(null);
  const planetsRef = useRef<HTMLElement | null>(null);

  const galaxyTitleRef = useRef<HTMLHeadingElement | null>(null);
  const nebulaRef = useRef<HTMLParagraphElement | null>(null);
  const galaxyHudRef = useRef<HTMLDivElement | null>(null);

  const sunRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const planetAnimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const planetCanvasRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hudActive, setHudActive] = useState(false);
  const [focusMode, setFocusMode] = useState<'full' | 'core' | 'orion' | 'perseus'>('full');
  const [details, setDetails] = useState("Viewing the full Milky Way spiral galaxy. Spanning 100,000 light-years, it contains 100 to 400 billion stars. Our Solar System lies in the Orion Arm, about 26,000 light-years from the center.");
  const [detailsOpacity, setDetailsOpacity] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFocus = (mode: 'full' | 'core' | 'orion' | 'perseus', text: string) => {
    setDetailsOpacity(0);
    setFocusMode(mode);
    setHudActive(mode !== 'full');
    setTimeout(() => {
      setDetails(text);
      setDetailsOpacity(1);
    }, 200);
  };

  const planets: Planet[] = useMemo(
    () => [
      {
        name: 'MERCURY',
        fact: 'The smallest planet. A year lasts just 88 Earth days.',
        patternType: 'mercury',
        size: 280,
        distance: '57.9M km',
        orbitalPeriod: '88 days',
        moons: 0,
      },
      {
        name: 'VENUS',
        fact: 'The hottest planet. Surface temperature reaches 465°C.',
        patternType: 'venus',
        size: 320,
        distance: '108.2M km',
        orbitalPeriod: '225 days',
        moons: 0,
      },
      {
        name: 'EARTH',
        fact: 'The only known planet with life. 71% water, 29% land.',
        patternType: 'earth',
        size: 320,
        distance: '149.6M km',
        orbitalPeriod: '365 days',
        moons: 1,
      },
      {
        name: 'MARS',
        fact: 'The red planet. Home to the largest volcano in the solar system.',
        patternType: 'mars',
        size: 300,
        distance: '227.9M km',
        orbitalPeriod: '687 days',
        moons: 2,
      },
      {
        name: 'JUPITER',
        fact: 'The giant. Could fit 1,300 Earths inside.',
        patternType: 'jupiter',
        size: 420,
        distance: '778.5M km',
        orbitalPeriod: '12 years',
        moons: 95,
      },
      {
        name: 'SATURN',
        fact: 'The ringed wonder. Has 146 known moons.',
        patternType: 'saturn',
        size: 400,
        distance: '1.43B km',
        orbitalPeriod: '29 years',
        moons: 146,
      },
      {
        name: 'URANUS',
        fact: 'The tilted planet. Rotates on its side at 98°.',
        patternType: 'uranus',
        size: 360,
        distance: '2.87B km',
        orbitalPeriod: '84 years',
        moons: 28,
      },
      {
        name: 'NEPTUNE',
        fact: 'The windiest planet. Winds reach 2,100 km/h.',
        patternType: 'neptune',
        size: 350,
        distance: '4.5B km',
        orbitalPeriod: '165 years',
        moons: 16,
      },
    ],
    []
  );

  const ringDurations = useMemo(() => planets.map(() => 20 + Math.random() * 20), [planets]);

  const headingVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } },
    } as any),
    []
  );
  const bodyVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.3, ease: 'easeOut' },
      },
    } as any),
    []
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!galaxyRef.current || !planetsRef.current) return;
      if (!galaxyTitleRef.current || !nebulaRef.current) return;
      if (!sunRef.current || !overlayRef.current) return;

      const starFieldEl = document.querySelector('.star-field') as HTMLElement | null;

      gsap.set(galaxyTitleRef.current, { willChange: 'transform, opacity' });
      gsap.set(nebulaRef.current, { willChange: 'transform, opacity' });
      gsap.set(sunRef.current, { willChange: 'transform' });

      if (starFieldEl) {
        gsap.set(starFieldEl, { willChange: 'transform, opacity' });
        gsap.set(starFieldEl, { scale: 1, opacity: 0.4 });
      }

      gsap.set(galaxyTitleRef.current, { y: 0, opacity: 1, scale: 1 });
      gsap.set(nebulaRef.current, { y: 40, opacity: 0 });
      if (galaxyHudRef.current) {
        gsap.set(galaxyHudRef.current, { y: 40, opacity: 0 });
      }

      const galaxyTl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: galaxyRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (starFieldEl) {
        galaxyTl.to(starFieldEl, { scale: 1.8, opacity: 1, duration: 1 }, 0);
      }

      galaxyTl.to(galaxyTitleRef.current, { y: -200, opacity: 0, duration: 0.5 }, 0);
      galaxyTl.to(nebulaRef.current, { y: 0, opacity: 1, duration: 0.4 }, 0.6);
      if (galaxyHudRef.current) {
        galaxyTl.to(galaxyHudRef.current, { y: 0, opacity: 1, duration: 0.4 }, 0.6);
      }

      gsap.set(overlayRef.current, { opacity: 0 });
      const fadeTl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: planetsRef.current,
          start: 'top 100%',
          end: 'top 50%',
          scrub: true,
        },
      });

      fadeTl
        .to(overlayRef.current, { opacity: 1, duration: 0.4 })
        .to(overlayRef.current, { opacity: 0, duration: 0.4 });

      const planetEls = planetAnimRefs.current.filter(Boolean) as HTMLDivElement[];
      if (planetEls.length > 0) {
        planetEls.forEach((el, i) => {
          const fromX = i % 2 === 0 ? -120 : 120;
          gsap.set(el, { x: fromX, opacity: 0, willChange: 'transform, opacity' });
        });

        gsap.set(sunRef.current, { scale: 0.8 });

        const planetsTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: planetsRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        planetsTl.to(sunRef.current, { scale: 1.1, duration: 1 }, 0);
        planetsTl.to(
          planetEls,
          {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
          },
          0
        );
      }

      planetCanvasRefs.current.forEach((canvasEl) => {
        if (!canvasEl) return;
        gsap.fromTo(
          canvasEl,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: canvasEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, galaxyRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={overlayRef} className="section-transition-overlay" aria-hidden />

      <section
        ref={galaxyRef}
        id="galaxy-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <Suspense fallback={<SceneLoadingFallback size={400} label="Loading galaxy…" />}>
          <StarScene 
            className="galaxy-star-scene" 
            scrollTriggerId="#galaxy-section" 
            variant="galaxy" 
            focusMode={focusMode}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            enableCameraControl={hudActive}
          />
        </Suspense>

        <div className="galaxy-radial-overlay" aria-hidden />

        <div className="relative z-10 text-center px-6 max-w-6xl pointer-events-none">
          <h2
            ref={galaxyTitleRef}
            className="galaxy-title"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 300,
              fontSize: 'clamp(72px, 9vw, 160px)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              willChange: 'transform, opacity',
            }}
          >
            GALAXY
          </h2>

          <p
            ref={nebulaRef}
            className="galaxy-nebula"
            style={{
              marginTop: 22,
              maxWidth: 720,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              willChange: 'transform, opacity',
            }}
          >
            Nebulae are stellar nurseries: drifting clouds of gas and dust,
            collapsing under gravity to ignite new suns across unimaginable
            distance.
          </p>
        </div>

        {/* Interactive Explorer HUD */}
        <div 
          ref={galaxyHudRef}
          className="galaxy-hud-container"
          style={{ 
            position: 'absolute', 
            bottom: '8%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 20, 
            display: 'flex', 
            justifyContent: 'center', 
            width: '90%', 
            maxWidth: '540px', 
            pointerEvents: 'auto',
            willChange: 'transform, opacity',
          }}
        >
          <div className="galaxy-hud" style={{ width: '100%', margin: 0 }}>
            <div className="hud-subtitle" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#7de8e8', marginBottom: '0.8rem', opacity: 0.85 }}>
              GALACTIC COORDINATES EXPLORER
            </div>
            <div className="hud-buttons" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
              {[
                { mode: 'full', label: 'Full View', text: "Viewing the full Milky Way spiral galaxy. Spanning 100,000 light-years, it contains 100 to 400 billion stars. Our Solar System lies in the Orion Arm, about 26,000 light-years from the center." },
                { mode: 'core', label: 'Galactic Core', text: "Sagittarius A* lies at the center. A supermassive black hole with a mass of 4.1 million solar masses, it exerts extreme gravitational forces on orbiting stars." },
                { mode: 'orion', label: 'Orion Arm', text: "Zooming into the Orion Arm. Our Sun is located here in a local spur of the galaxy. A peaceful, stable stellar neighborhood ideal for the emergence of life." },
                { mode: 'perseus', label: 'Perseus Arm', text: "The Perseus Arm is one of the major spiral arms of the Milky Way. Voluminous gas clouds and active stellar nurseries collapse here, birthing thousands of new stars." }
              ].map(tab => (
                <button
                  key={tab.mode}
                  className={`hud-btn ${focusMode === tab.mode ? 'active' : ''}`}
                  onClick={() => handleFocus(tab.mode as any, tab.text)}
                  style={{
                    background: focusMode === tab.mode ? 'rgba(125, 232, 232, 0.14)' : 'rgba(255, 255, 255, 0.02)',
                    borderColor: focusMode === tab.mode ? 'rgba(125, 232, 232, 0.5)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    borderRadius: '20px',
                    padding: '0.35rem 0.85rem',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span
                    className="btn-dot"
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: focusMode === tab.mode ? '#7de8e8' : 'rgba(255,255,255,0.2)',
                      boxShadow: focusMode === tab.mode ? '0 0 6px 1px #7de8e8' : 'none'
                    }}
                  />
                  {tab.label}
                </button>
              ))}
            </div>
            <div
              className="hud-details"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.5)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: detailsOpacity,
                transition: 'opacity 0.2s ease'
              }}
            >
              {details}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={planetsRef}
        id="planets"
        className="relative"
        style={{ minHeight: '240vh', paddingTop: 120, paddingBottom: 120 }}
      >
        <div className="sun-sticky" aria-hidden>
          <div ref={sunRef} className="sun-core-3d">
            <Suspense fallback={<SceneLoadingFallback size={360} label="Loading sun…" />}>
              <PlanetScene planet="sun" size={360} showOrbit={false} autoRotate={false} enableParallax={false} />
            </Suspense>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="mb-10 text-center">
            <motion.h2
              variants={headingVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="text-[64px] leading-none tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 300, marginBottom: 18 }}
            >
              SOLAR SYSTEM
            </motion.h2>
            <motion.p
              variants={bodyVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="text-[14px] text-white/70 italic"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Real NASA-textured 3D globes — drift through orbit, hover to draw near.
            </motion.p>
          </div>

          <div className="space-y-24">
            {planets.map((p, i) => (
              <div
                key={p.name}
                className="planet-slot"
                ref={(el) => {
                  planetAnimRefs.current[i] = el;
                }}
              >
                <div
                  className="orbital-ring"
                  style={{ ['--ring-duration' as string]: `${ringDurations[i]}s` }}
                  aria-hidden
                />

                <PlanetCard
                  variant="orbit"
                  name={p.name}
                  fact={p.fact}
                  patternType={p.patternType}
                  size={p.size}
                  distance={p.distance}
                  orbitalPeriod={p.orbitalPeriod}
                  moons={p.moons}
                  canvasRef={(el) => {
                    planetCanvasRefs.current[i] = el;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
