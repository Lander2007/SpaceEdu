import { useEffect, useRef, useState } from 'react'

export default function AmbientSynth() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const filterRef = useRef<BiquadFilterNode | null>(null)
  const [activeFrequencies, setActiveFrequencies] = useState<number[]>([])

  // Interstellar Inspired Chords in A minor (A minor, F major, C major, E minor/G major)
  const chordProgression = [
    [110.00, 220.00, 261.63, 329.63], // Am (A2, A3, C4, E4)
    [87.31, 174.61, 261.63, 349.23],  // F (F2, F3, C4, F4)
    [130.81, 261.63, 329.63, 392.00], // C (C3, C4, E4, G4)
    [98.00, 196.00, 293.66, 392.00]   // G (G2, G3, D4, G4)
  ]

  const currentChordIdx = useRef(0)
  const chordTimerRef = useRef<any>(null)

  const initAudio = () => {
    if (audioCtxRef.current) return
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    const ctx = new AudioContextClass()
    audioCtxRef.current = ctx

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(450, ctx.currentTime)
    filter.Q.setValueAtTime(1.5, ctx.currentTime)
    filterRef.current = filter

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0, ctx.currentTime)
    masterGainRef.current = masterGain

    filter.connect(masterGain)
    masterGain.connect(ctx.destination)
  }

  const startChordCycle = () => {
    if (!audioCtxRef.current || !filterRef.current) return
    const ctx = audioCtxRef.current

    const playChord = (chord: number[]) => {
      // Clean up previous oscillators with dynamic fade out
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop(ctx.currentTime + 1.5)
        } catch (e) {}
      })
      oscillatorsRef.current = []
      setActiveFrequencies(chord)

      // Create new set of oscillators for rich warm organ sound
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        // Mix saw and triangle for cinematic pipe-organ drone warmth
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle detuning for lush chorus effect
        osc.detune.setValueAtTime((Math.random() - 0.5) * 15, ctx.currentTime)

        const oscGain = ctx.createGain()
        // Low notes louder, high notes soft and shimmering
        const level = freq < 150 ? 0.35 : 0.18
        oscGain.gain.setValueAtTime(0, ctx.currentTime)
        oscGain.gain.linearRampToValueAtTime(level, ctx.currentTime + 1.5)

        osc.connect(oscGain)
        oscGain.connect(filterRef.current!)
        
        osc.start(ctx.currentTime)
        oscillatorsRef.current.push(osc)
      })

      // Procedural filter frequency sweeping like Interstellar organ expression pedal
      if (filterRef.current) {
        const sweepFreq = 300 + Math.random() * 400
        filterRef.current.frequency.exponentialRampToValueAtTime(sweepFreq, ctx.currentTime + 6)
      }
    }

    const nextChord = () => {
      const idx = currentChordIdx.current
      playChord(chordProgression[idx])
      currentChordIdx.current = (idx + 1) % chordProgression.length
    }

    nextChord()
    // Slow chords switching every 7 seconds
    chordTimerRef.current = setInterval(nextChord, 7000)
  }

  const stopChordCycle = () => {
    if (chordTimerRef.current) {
      clearInterval(chordTimerRef.current)
      chordTimerRef.current = null
    }
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop()
      } catch (e) {}
    })
    oscillatorsRef.current = []
    setActiveFrequencies([])
  }

  const togglePlayback = async () => {
    if (!isPlaying) {
      initAudio()
      if (audioCtxRef.current?.state === 'suspended') {
        await audioCtxRef.current.resume()
      }
      masterGainRef.current?.gain.linearRampToValueAtTime(volume, audioCtxRef.current!.currentTime + 1.5)
      startChordCycle()
      setIsPlaying(true)
    } else {
      masterGainRef.current?.gain.linearRampToValueAtTime(0, audioCtxRef.current!.currentTime + 1.2)
      setTimeout(() => {
        stopChordCycle()
        setIsPlaying(false)
      }, 1200)
    }
  }

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(isPlaying ? volume : 0, audioCtxRef.current.currentTime)
    }
  }, [volume, isPlaying])

  useEffect(() => {
    const handleStart = async () => {
      initAudio()
      if (audioCtxRef.current?.state === 'suspended') {
        await audioCtxRef.current.resume()
      }
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(volume, audioCtxRef.current.currentTime + 1.5)
      }
      if (!isPlaying) {
        startChordCycle()
        setIsPlaying(true)
      }
    }

    const handleToggle = () => {
      togglePlayback()
    }

    window.addEventListener('start-ambient-synth', handleStart)
    window.addEventListener('toggle-ambient-synth', handleToggle)

    return () => {
      window.removeEventListener('start-ambient-synth', handleStart)
      window.removeEventListener('toggle-ambient-synth', handleToggle)
      stopChordCycle()
    }
  }, [isPlaying, volume])

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 1001,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(5, 5, 12, 0.45)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '8px 16px',
      borderRadius: '24px',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      pointerEvents: 'auto',
      fontFamily: 'var(--font-mono)',
      color: 'white',
      userSelect: 'none'
    }}>
      {/* Visualizer bars */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '3px',
        width: '24px',
        height: '14px',
      }}>
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            style={{
              width: '3px',
              height: isPlaying ? '100%' : '20%',
              background: '#cc00ff',
              borderRadius: '2px',
              transformOrigin: 'bottom',
              animation: isPlaying ? `synthVisualizer 1.2s ease-in-out infinite alternate` : 'none',
              animationDelay: `${bar * 0.2}s`,
              transition: 'height 0.4s'
            }}
          />
        ))}
      </div>

      <button
        onClick={togglePlayback}
        style={{
          background: 'none',
          border: 'none',
          color: isPlaying ? '#cc00ff' : 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 600,
          cursor: 'none',
          outline: 'none',
          transition: 'color 0.3s ease'
        }}
      >
        {isPlaying ? 'interstellar synth active' : 'activate synth'}
      </button>

      {isPlaying && (
        <input
          type="range"
          min="0.1"
          max="0.8"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{
            width: '60px',
            accentColor: '#cc00ff',
            background: 'rgba(255, 255, 255, 0.1)',
            height: '4px',
            borderRadius: '2px',
            cursor: 'none',
            outline: 'none',
            border: 'none'
          }}
        />
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes synthVisualizer {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1); }
        }
      `}} />
    </div>
  )
}
