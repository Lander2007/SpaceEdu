import { useEffect, useCallback } from 'react'

const SECTIONS = [
  'hero',
  'sun',
  'mercury',
  'venus',
  'earth',
  'mars',
  'asteroids',
  'jupiter',
  'saturn',
  'wormhole',
  'uranus',
  'neptune',
  'miller',
  'galaxy',
  'scale',
  'black-holes',
  'concept',
]

export function useSwipeNavigation() {
  let touchStartY = 0
  let touchStartX = 0
  let isSwiping   = false

  const getActiveSection = () => {
    for (const id of SECTIONS) {
      const el   = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      // If the section is currently active/visible in viewport
      if (rect.top >= -window.innerHeight * 0.5 && rect.top <= window.innerHeight * 0.5) {
        return id
      }
    }
    return SECTIONS[0]
  }

  const navigateTo = useCallback((direction: 'next' | 'prev') => {
    const current = getActiveSection()
    const i = SECTIONS.indexOf(current)
    const target = direction === 'next'
      ? SECTIONS[Math.min(i + 1, SECTIONS.length - 1)]
      : SECTIONS[Math.max(i - 1, 0)]

    // Trigger haptic feedback if navigator.vibrate is available
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }

    document.getElementById(target)
      ?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      // Skip if touching a planet canvas
      const target = e.target as HTMLElement
      if (target.tagName === 'CANVAS') return
      touchStartY  = e.touches[0].clientY
      touchStartX  = e.touches[0].clientX
      isSwiping    = true
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!isSwiping) return
      const dy = touchStartY - e.changedTouches[0].clientY
      const dx = touchStartX - e.changedTouches[0].clientX
      // Only vertical swipes with enough distance
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 60) {
        navigateTo(dy > 0 ? 'next' : 'prev')
      }
      isSwiping = false
    }

    // Arrow key navigation
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        navigateTo('next')
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        navigateTo('prev')
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })
    window.addEventListener('keydown',    onKeyDown)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('keydown',    onKeyDown)
    }
  }, [navigateTo])
}
