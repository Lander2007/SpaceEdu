import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, lazy, Suspense } from "react";
import styles from "./AsteroidBelt.module.css";

interface AsteroidRegion {
  id: string;
  name: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
}

const asteroidRegions: AsteroidRegion[] = [
  {
    id: "inner-belt",
    name: "Inner Belt Zone",
    description:
      "High-density region with predominantly metallic composition. Rich in iron, nickel, and silicate minerals. It lies closest to Mars' orbit.",
    stats: [
      { label: "Avg Diameter", value: "500m - 5km" },
      { label: "Composition", value: "Metallic (M-Type)" },
      { label: "Density", value: "High Concentration" },
    ],
  },
  {
    id: "central-belt",
    name: "Central Belt Region",
    description:
      "Primary asteroid concentration containing Ceres, the largest object in the belt. Complex orbital dynamics are influenced heavily by Jupiter.",
    stats: [
      { label: "Largest Body", value: "Ceres (940km)" },
      { label: "Est. Mass", value: "3.28 × 10²¹ kg" },
      { label: "Orbital Period", value: "4.6 Years" },
    ],
  },
  {
    id: "outer-belt",
    name: "Outer Belt Edge",
    description:
      "Sparse region with carbonaceous asteroids. Transition zone moving toward the outer planets and the realm of gas giants.",
    stats: [
      { label: "Composition", value: "Carbonaceous (C-Type)" },
      { label: "Temperature", value: "-110 to -120°C" },
      { label: "Distance", value: "2.8 - 3.2 AU" },
    ],
  },
];

// Lazy-load the Three.js 3D canvas
const AsteroidBeltScene = lazy(() => import("./AsteroidBeltScene"));

export default function AsteroidBelt() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isCinematicMode, setIsCinematicMode] = useState(false);
  const [compositionFilter, setCompositionFilter] = useState<number>(0); // 0=All, 1=Metallic, 2=Stony, 3=Carbonaceous

  const currentRegionData = asteroidRegions.find(r => r.id === selectedRegion);

  const handleRegionClick = (regionId: string | null) => {
    setSelectedRegion(regionId);
    if (regionId) {
      setIsCinematicMode(false); // Disable cinematic scanning when inspecting a specific region
    }
  };

  const handleCinematicToggle = () => {
    setIsCinematicMode(!isCinematicMode);
    if (!isCinematicMode) {
      setSelectedRegion(null); // Clear active region when scanning
    }
  };

  return (
    <section id="asteroids" ref={ref} className={styles.section}>
      {/* 3D Canvas Background */}
      <div className={styles.canvasContainer}>
        {inView && (
          <Suspense fallback={
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.3)',
              fontFamily: 'Space Mono, monospace',
              fontSize: 12,
              letterSpacing: '0.1em'
            }}>
              Initializing asteroid orbital matrix...
            </div>
          }>
            <AsteroidBeltScene
              selectedRegion={selectedRegion}
              compositionFilter={compositionFilter}
              isCinematicMode={isCinematicMode}
            />
          </Suspense>
        )}
      </div>

      {/* Neighbor snap links */}
      <a href="#mars" className={styles.neighborLeft}>
        ← MARS
      </a>
      <a href="#jupiter" className={styles.neighborRight}>
        JUPITER →
      </a>

      {/* Title Watermark */}
      <motion.div
        className={styles.titleContainer}
        initial={{ opacity: 0, x: -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <p className={styles.categoryLabel}>COSMIC BOUNDARY</p>
        <h2 className={styles.title}>
          THE
          <br />
          ASTEROID
          <br />
          BELT
        </h2>
        <div className={styles.accentLine} />
      </motion.div>

      {/* Interactive HUD overlay */}
      <div className={styles.hudOverlay}>
        
        {/* Left HUD Panel: Controls & Scanner */}
        <motion.div
          className={styles.controlPanel}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.hudGroup}>
            <div className={styles.hudLabel}>BELT REGIONS SCANNER</div>
            <div className={styles.zoneButtons}>
              <button
                className={`${styles.hudBtn} ${selectedRegion === null && !isCinematicMode ? styles.activeBtn : ''}`}
                onClick={() => handleRegionClick(null)}
              >
                <span className={styles.btnDot} style={{ background: '#ffffff', boxShadow: '0 0 8px #fff' }} />
                System View
              </button>
              {asteroidRegions.map(region => (
                <button
                  key={region.id}
                  className={`${styles.hudBtn} ${selectedRegion === region.id ? styles.activeBtn : ''}`}
                  onClick={() => handleRegionClick(region.id)}
                >
                  <span
                    className={styles.btnDot}
                    style={{
                      background: region.id === 'inner-belt' ? '#f5a623' :
                                  region.id === 'central-belt' ? '#00a0ff' : '#c084fc',
                      boxShadow: `0 0 8px ${
                        region.id === 'inner-belt' ? '#f5a623' :
                        region.id === 'central-belt' ? '#00a0ff' : '#c084fc'
                      }`
                    }}
                  />
                  {region.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.hudGroup}>
            <div className={styles.hudLabel}>COMPOSITION FILTER</div>
            <div className={styles.filterTabs}>
              {[
                { value: 0, label: "ALL" },
                { value: 1, label: "M-TYPE" },
                { value: 2, label: "S-TYPE" },
                { value: 3, label: "C-TYPE" }
              ].map(tab => (
                <button
                  key={tab.value}
                  className={`${styles.filterTab} ${compositionFilter === tab.value ? styles.activeTab : ''}`}
                  onClick={() => setCompositionFilter(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.hudGroup}>
            <button
              className={`${styles.cinematicBtn} ${isCinematicMode ? styles.activeCinematic : ''}`}
              onClick={handleCinematicToggle}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              {isCinematicMode ? "SCANNING ORBITS..." : "INITIATE CINEMATIC SCAN"}
            </button>
          </div>
        </motion.div>

        {/* Right HUD Panel: Science Dashboard */}
        <motion.div
          className={styles.infoPanel}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {!selectedRegion ? (
              <motion.div
                key="default-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <p className={styles.panelLabel}>COSMIC DEBRIS FIELD</p>
                <h3 className={styles.panelTitle}>THE BORDER REGION</h3>
                <p className={styles.panelText}>
                  A vast circumstellar disc located between the orbits of Mars and
                  Jupiter. It contains millions of irregular rock bodies, acting as the
                  gateway to the outer gas giants.
                </p>

                <div className={styles.stats}>
                  {[
                    { label: "System Coordinates", value: "2.2 to 3.2 AU from Sun" },
                    { label: "Est. Asteroids", value: "1.9 Million (>1km)" },
                    { label: "Total Mass", value: "Approx. 3.0 × 10²¹ kg (4% of Moon)" },
                  ].map(s => (
                    <div key={s.label} className={styles.statCard}>
                      <div className={styles.statLabel}>{s.label}</div>
                      <div className={styles.statValue}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedRegion}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <p className={styles.panelLabel}>REGIONAL DETAILED SCAN</p>
                <h3 className={styles.panelTitle}>{currentRegionData?.name}</h3>
                <p className={styles.panelText}>
                  {currentRegionData?.description}
                </p>

                <div className={styles.stats}>
                  {currentRegionData?.stats.map(s => (
                    <div key={s.label} className={styles.statCard}>
                      <div className={styles.statLabel}>{s.label}</div>
                      <div className={styles.statValue}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
