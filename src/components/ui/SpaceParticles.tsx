import { useEffect, useRef } from 'react'

export default function SpaceParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const isMobile = window.innerWidth <= 768
    const COUNT    = isMobile ? 50 : 150

    // Clear any previous particles (useful if component re-mounts)
    container.innerHTML = ''

    for (let i = 0; i < COUNT; i++) {
      const el  = document.createElement('div')
      const size = Math.random() * 2.5 + 0.5
      const dur  = Math.random() * 40 + 20
      const del  = Math.random() * 20
      const op   = Math.random() * 0.3 + 0.05
      el.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        background: white;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top:  ${Math.random() * 100}%;
        opacity: ${op};
        animation: particleDrift ${dur}s -${del}s infinite linear;
        pointer-events: none;
      `
      container.appendChild(el)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        0,
        overflow:      'hidden',
      }}
    />
  )
}
