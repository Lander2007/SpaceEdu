import '../styles/globals.css'
import Loader  from '../components/layout/Loader'
import Cursor  from '../components/layout/Cursor'
import Navbar  from '../components/layout/Navbar'
import AmbientSynth from '../components/layout/AmbientSynth'
import SpaceParticles from '../components/ui/SpaceParticles'
import Hero    from '../components/sections/Hero/Hero'
import Planet  from '../components/sections/Planet/Planet'
import AsteroidBelt from '../components/sections/AsteroidBelt/AsteroidBelt'
import Wormhole from '../components/sections/Wormhole/Wormhole'
import Miller from '../components/sections/Miller/Miller'
import Galaxy  from '../components/sections/Galaxy/Galaxy'
import ScaleComparison from '../components/sections/ScaleComparison/ScaleComparison'
import BlackHole from '../components/sections/BlackHole/BlackHole'
import Concept from '../components/sections/Concept/Concept'
import { planets } from '../data/planets'
import { useSwipeNavigation } from '../hooks/useSwipeNavigation'

export default function App() {
  useSwipeNavigation() // enables swipe + arrow key nav

  return (
    <div style={{ position: 'relative' }}>
      <Loader />
      <Cursor />
      <Navbar />
      <AmbientSynth />
      <SpaceParticles />

      {/* All sections — natural scroll with snap from globals.css */}
      <main style={{
        overscrollBehavior: 'none',
      }}>

        {/* Hero */}
        <Hero />

        {/* Planets, Asteroids, Wormhole, Miller */}
        {planets.map((planet, i) => {
          const items = []
          
          // Inject Asteroids right before Jupiter
          if (planet.id === 'jupiter') {
            items.push(<AsteroidBelt key="asteroid-belt-section" />)
          }
          
          items.push(
            <Planet
              key={planet.id}
              planet={planet}
              prev={i > 0 ? planets[i-1].id : undefined}
              next={i < planets.length-1 ? planets[i+1].id : undefined}
            />
          )
          
          // Inject Wormhole right after Saturn
          if (planet.id === 'saturn') {
            items.push(<Wormhole key="wormhole-section" />)
          }
          
          // Inject Miller's Planet right after Neptune
          if (planet.id === 'neptune') {
            items.push(<Miller key="miller-section" />)
          }
          
          return items
        })}

        {/* 3D Galaxy */}
        <Galaxy />

        {/* Scale Comparison */}
        <ScaleComparison />

        {/* Black Hole */}
        <BlackHole />

        {/* Final Epilogue Concept & Quote Section */}
        <Concept />

      </main>
    </div>
  )
}