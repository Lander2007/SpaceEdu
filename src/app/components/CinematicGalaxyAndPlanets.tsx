import { lazy, Suspense, useLayoutEffect, useMemo, useRef } from 'react';
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

  const sunRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const planetAnimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const planetCanvasRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    }),
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
    }),
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
          <StarScene className="galaxy-star-scene" scrollTriggerId="#galaxy-section" variant="galaxy" />
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
