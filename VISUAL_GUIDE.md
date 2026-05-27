# Black Hole Visual Guide

## What You'll See

### The Black Hole
```
     ╭─────────────────╮
    ╱   Outer Glow     ╲
   │  ╭─────────────╮   │
   │ ╱  Accretion   ╲  │  ← Orange/yellow animated disk
   │ │   Disk       │  │     rotating with turbulence
   │ ╲             ╱   │
   │  ╰─────────────╯   │
   │    ╭───────╮       │
   │   ╱ Photon ╲      │  ← Bright gravitational lensing ring
   │   │ Sphere │      │
   │   ╲       ╱       │
   │    ╰─────╯        │
   │      ╭─╮          │
   │      │●│          │  ← Pure black event horizon
   │      ╰─╯          │
   ╲                  ╱
    ╰─────────────────╯
```

## Color Palette

### Accretion Disk
- **Inner Ring**: Bright orange/yellow (#FFD23F) - Hottest region
- **Middle Ring**: Orange (#FF6600) - Medium temperature
- **Outer Ring**: Deep red (#C1440E) - Cooler region

### Event Horizon
- **Core**: Pure black (#000000)
- **Rim**: Subtle orange glow (#FF6600 at 15% opacity)

### Photon Sphere
- **Ring**: Bright orange to white gradient
- **Intensity**: 60% opacity with additive blending

### Background
- **Space**: Pure black (#000000)
- **Stars**: White particles with varying opacity
- **Ambient Glow**: Orange haze (#FF4400 at 2% opacity)

## Animation Details

### Accretion Disk
- **Rotation Speed**: 0.15 radians/second
- **Turbulence**: Sine wave pattern with 8 cycles
- **Noise**: Procedural noise for realistic variation
- **Brightness**: Distance-based falloff (inner = brighter)

### Event Horizon
- **Rotation**: Follows mouse position (±0.3 radians)
- **Float**: Vertical sine wave (±0.1 units, 0.3 Hz)
- **Rim Light**: Edge-detected shader effect

### Photon Sphere
- **Effect**: Back-face rendering for depth
- **Glow**: Additive blending for luminosity

### Background Stars
- **Count**: 3000 particles
- **Depth**: 50 units
- **Animation**: Slow drift (0.5 speed)

## Interactive Features

### Mouse Movement
- **X-Axis**: Rotates black hole left/right (±0.3 radians)
- **Y-Axis**: Rotates black hole up/down (±0.3 radians)
- **Smoothing**: Spring physics (damping: 45, stiffness: 120)

### Parallax Layers
1. **Background Stars**: Moves opposite to mouse (depth effect)
2. **Black Hole**: Rotates with mouse
3. **Text Overlay**: Subtle parallax shift

## Performance Indicators

### Good Performance (60 FPS)
- Smooth disk rotation
- Fluid mouse interaction
- No stuttering or lag

### Reduced Performance (30-60 FPS)
- Slightly choppy rotation
- Delayed mouse response
- Adaptive quality kicks in

### Poor Performance (<30 FPS)
- Noticeable lag
- Consider reducing browser zoom
- Close other tabs/applications

## Scientific Accuracy

### Event Horizon
- Represents the point of no return
- Nothing can escape beyond this boundary
- Schwarzschild radius visualization

### Photon Sphere
- Located at 1.5× Schwarzschild radius
- Where light orbits the black hole
- Creates gravitational lensing effect

### Accretion Disk
- Matter spiraling into black hole
- Heated by friction and compression
- Emits X-rays and visible light
- Tilted at ~23° (realistic angle)

### Hawking Radiation
- Not visually represented (too subtle)
- Theoretical quantum effect
- Mentioned in data overlay

## Data Display

### Information Shown
1. **Event Horizon**: "Point of no return"
2. **Escape Velocity**: "> Speed of light"
3. **Time Dilation**: "Infinite at horizon"
4. **Hawking Radiation**: "Theoretical emission"

### Reference
- Based on Sagittarius A* (Milky Way's supermassive black hole)
- Mass: 4 million solar masses
- First image captured by Event Horizon Telescope (2019)

## Accessibility

### Reduced Motion
- Animations disabled for users who prefer reduced motion
- Static view maintained
- All content remains accessible

### Screen Readers
- Descriptive labels for all data points
- Semantic HTML structure
- ARIA labels where appropriate

## Browser Compatibility

### Full Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Partial Support
- ⚠️ Mobile browsers (reduced quality)
- ⚠️ Older browsers (fallback to 2D)

### Not Supported
- ❌ Internet Explorer (no WebGL 2.0)
- ❌ Very old mobile devices
