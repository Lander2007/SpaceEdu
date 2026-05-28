import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ringRef  = useRef<HTMLDivElement>(null)
  const dotRef   = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement[]>([])
  const pos      = useRef({ x: -100, y: -100 })
  const curr     = useRef({ x: -100, y: -100 })
  const history  = useRef<Array<{x:number,y:number}>>([])

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const TRAIL_LENGTH = 6

    // Create trail dots
    const trails = Array.from({ length: TRAIL_LENGTH }, (_, i) => {
      const el = document.createElement('div')
      const size = (i / TRAIL_LENGTH) * 3 + 1
      el.style.cssText = `
        position: fixed;
        width: ${size}px; height: ${size}px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99998;
        transform: translate(-50%,-50%);
        transition: opacity 0.1s;
        left: -100px;
        top: -100px;
      `
      document.body.appendChild(el)
      trailRef.current.push(el)
      return el
    })

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
      history.current.push({ x: e.clientX, y: e.clientY })
      if (history.current.length > TRAIL_LENGTH) {
        history.current.shift()
      }

      trailRef.current.forEach((el, i) => {
        const p = history.current[i]
        if (!p) return
        el.style.left    = p.x + 'px'
        el.style.top     = p.y + 'px'
        el.style.opacity = String((i / TRAIL_LENGTH) * 0.35)
      })
    }

    // Hover effects via event delegation
    const onEnter = () => {
      if (!ringRef.current) return
      ringRef.current.style.width  = '56px'
      ringRef.current.style.height = '56px'
      ringRef.current.style.background = 'rgba(255,255,255,0.05)'
      ringRef.current.style.borderColor = 'rgba(255,255,255,0.85)'
    }
    
    const onLeave = () => {
      if (!ringRef.current) return
      ringRef.current.style.width  = '36px'
      ringRef.current.style.height = '36px'
      ringRef.current.style.background = 'transparent'
      ringRef.current.style.borderColor = 'rgba(255,255,255,0.55)'
    }

    const onMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | SVGElement | null
      
      if (target && target.nodeType === 3) {
        target = target.parentElement as HTMLElement | null
      }

      if (target && typeof target.closest === 'function') {
        const hasPointerCursor = target.style?.cursor === 'pointer'
        if (
          target.closest('button') || 
          target.closest('a') || 
          target.closest('canvas') || 
          target.closest('input') || 
          target.closest('select') || 
          target.closest('[role="button"]') ||
          target.closest('[style*="cursor: pointer"]') ||
          hasPointerCursor
        ) {
          onEnter()
          return
        }
      }
      onLeave()
    }

    let raf: number
    const animate = () => {
      curr.current.x += (pos.current.x - curr.current.x) * 0.1
      curr.current.y += (pos.current.y - curr.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = curr.current.x + 'px'
        ringRef.current.style.top  = curr.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(raf)
      trails.forEach(el => el.remove())
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <>
      <div ref={ringRef} style={{
        position:     'fixed',
        width:        '36px', height: '36px',
        border:       '1px solid rgba(255,255,255,0.55)',
        borderRadius: '50%',
        pointerEvents:'none',
        zIndex:       99999,
        transform:    'translate(-50%,-50%)',
        transition:   'width 0.3s ease, height 0.3s ease, background 0.3s ease, border-color 0.3s ease',
        left:         '-100px', top: '-100px',
      }} />
      <div ref={dotRef} style={{
        position:     'fixed',
        width:        '4px', height: '4px',
        background:   'white',
        borderRadius: '50%',
        pointerEvents:'none',
        zIndex:       99999,
        transform:    'translate(-50%,-50%)',
        boxShadow:    '0 0 6px 2px rgba(255,255,255,0.8)',
        left:         '-100px', top: '-100px',
      }} />
    </>
  )
}
