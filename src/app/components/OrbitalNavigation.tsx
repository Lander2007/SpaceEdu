import { useEffect, useState } from 'react';

const planets = [
  { id: 'hero', label: '◉', name: 'Start' },
  { id: 'sun', label: '☉', name: 'Sun' },
  { id: 'mercury', label: '☿', name: 'Mercury' },
  { id: 'venus', label: '♀', name: 'Venus' },
  { id: 'earth', label: '⊕', name: 'Earth' },
  { id: 'mars', label: '♂', name: 'Mars' },
  { id: 'jupiter', label: '♃', name: 'Jupiter' },
  { id: 'saturn', label: '♄', name: 'Saturn' },
  { id: 'uranus', label: '♅', name: 'Uranus' },
  { id: 'neptune', label: '♆', name: 'Neptune' },
  { id: 'outer', label: '∞', name: 'Beyond' },
  { id: 'black-holes', label: '🕳', name: 'Singularity' },
];

export function OrbitalNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const index = Math.min(Math.floor(scrollPercentage * planets.length), planets.length - 1);
      setActiveIndex(index);
      setRotation(scrollPercentage * 360);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ringRadius = 60;
  const angleStep = 360 / planets.length;

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
      <svg width="160" height="160" viewBox="-80 -80 160 160">
        {/* Orbital ring */}
        <circle
          cx="0"
          cy="0"
          r={ringRadius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.5"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Planet dots */}
        {planets.map((planet, index) => {
          const angle = (index * angleStep - 90) * (Math.PI / 180);
          const x = ringRadius * Math.cos(angle);
          const y = ringRadius * Math.sin(angle);
          const isActive = index === activeIndex;

          return (
            <g key={planet.id}>
              <circle
                cx={x}
                cy={y}
                r={isActive ? 4 : 2}
                fill={isActive ? '#F5A623' : 'rgba(255, 255, 255, 0.6)'}
                className="transition-all duration-300"
              />
              {isActive && (
                <text
                  x={x > 0 ? x + 12 : x - 12}
                  y={y + 4}
                  fill="rgba(255, 255, 255, 0.8)"
                  fontSize="10"
                  fontFamily="Space Mono, monospace"
                  textAnchor={x > 0 ? 'start' : 'end'}
                  className="transition-opacity duration-300"
                >
                  {planet.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
