# Troubleshooting Guide

## Common Issues and Solutions

### 1. Black Hole Not Appearing

#### Symptoms
- Section shows only text, no 3D model
- "Loading singularity..." message persists

#### Solutions
1. **Check Browser Console**
   ```bash
   # Open DevTools (F12) and check for errors
   ```

2. **Verify WebGL Support**
   - Visit: https://get.webgl.org/
   - Should show spinning cube
   - If not, update graphics drivers

3. **Clear Browser Cache**
   ```bash
   # Chrome: Ctrl+Shift+Delete
   # Firefox: Ctrl+Shift+Delete
   # Safari: Cmd+Option+E
   ```

4. **Check Dependencies**
   ```bash
   npm install
   npm run build
   ```

### 2. Performance Issues / Lag

#### Symptoms
- Low frame rate (<30 FPS)
- Stuttering animations
- Delayed mouse response

#### Solutions

1. **Reduce Browser Zoom**
   - Reset to 100% (Ctrl+0)
   - Lower zoom = better performance

2. **Close Other Tabs**
   - Each tab uses GPU resources
   - Close unnecessary tabs

3. **Update Graphics Drivers**
   - NVIDIA: GeForce Experience
   - AMD: Radeon Software
   - Intel: Intel Driver & Support Assistant

4. **Enable Hardware Acceleration**
   - Chrome: `chrome://settings/system`
   - Firefox: `about:preferences#general`
   - Enable "Use hardware acceleration"

5. **Reduce Quality (Code Change)**
   ```typescript
   // In BlackHoleScene.tsx, change:
   dpr={[1, 1.5]} // to
   dpr={[0.5, 1]} // Lower quality, better performance
   ```

### 3. Black Screen / Blank Canvas

#### Symptoms
- Section is completely black
- No stars, no black hole

#### Solutions

1. **Check WebGL Context**
   ```javascript
   // Open console and run:
   const canvas = document.createElement('canvas');
   const gl = canvas.getContext('webgl2');
   console.log(gl ? 'WebGL2 supported' : 'WebGL2 not supported');
   ```

2. **Disable Browser Extensions**
   - Ad blockers can interfere with WebGL
   - Try incognito/private mode

3. **Check GPU Blacklist**
   - Chrome: `chrome://gpu`
   - Look for "WebGL: Hardware accelerated"
   - If disabled, update drivers

### 4. Mouse Interaction Not Working

#### Symptoms
- Black hole doesn't rotate with mouse
- No parallax effect

#### Solutions

1. **Check Mouse Events**
   ```javascript
   // Open console and run:
   document.addEventListener('mousemove', (e) => {
     console.log('Mouse:', e.clientX, e.clientY);
   });
   ```

2. **Verify Motion Values**
   - Check if `mouseX` and `mouseY` are updating
   - Look for console errors

3. **Disable Conflicting Scripts**
   - Other mouse tracking scripts may interfere
   - Check for cursor-related extensions

### 5. Build Errors

#### Symptoms
- `npm run build` fails
- TypeScript errors

#### Solutions

1. **Clean Install**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node Version**
   ```bash
   node --version  # Should be 16+ or 18+
   npm --version   # Should be 8+
   ```

3. **Verify Imports**
   ```typescript
   // Make sure all imports are correct:
   import { BlackHoleScene } from './components/three/BlackHoleScene';
   import { BlackHole } from './components/three/BlackHole';
   ```

### 6. Memory Leaks

#### Symptoms
- Browser becomes slow over time
- High memory usage
- Tab crashes

#### Solutions

1. **Check for Unmounted Components**
   - Ensure cleanup in useEffect hooks
   - Dispose Three.js geometries and materials

2. **Monitor Memory**
   - Chrome DevTools > Memory tab
   - Take heap snapshots
   - Look for detached DOM nodes

3. **Limit Animation Loops**
   ```typescript
   // In BlackHole.tsx, add cleanup:
   useEffect(() => {
     return () => {
       // Cleanup code here
     };
   }, []);
   ```

### 7. Mobile Issues

#### Symptoms
- Very slow on mobile
- Touch events not working
- Layout broken

#### Solutions

1. **Reduce Quality for Mobile**
   ```typescript
   // In BlackHoleScene.tsx:
   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   dpr={isMobile ? [0.5, 1] : [1, 1.5]}
   ```

2. **Add Touch Event Handlers**
   ```typescript
   // Handle touch events for mobile
   onTouchMove={(e) => {
     // Update mouse position from touch
   }}
   ```

3. **Test on Real Device**
   - Emulators don't accurately represent performance
   - Use Chrome Remote Debugging

### 8. Shader Compilation Errors

#### Symptoms
- Console shows "Failed to compile shader"
- Black hole appears pink/magenta

#### Solutions

1. **Check GLSL Syntax**
   - Ensure all shaders are valid GLSL
   - Check for typos in shader code

2. **Verify WebGL Version**
   - Some shaders require WebGL 2.0
   - Check browser support

3. **Simplify Shaders**
   - Remove complex calculations
   - Use simpler effects

## Performance Benchmarks

### Expected Performance

| Device Type | Target FPS | Typical FPS |
|-------------|-----------|-------------|
| Desktop (High-end) | 60 | 55-60 |
| Desktop (Mid-range) | 60 | 45-60 |
| Desktop (Low-end) | 30 | 25-40 |
| Mobile (High-end) | 30 | 25-35 |
| Mobile (Mid-range) | 30 | 20-30 |
| Mobile (Low-end) | 30 | 15-25 |

### Optimization Checklist

- [ ] Hardware acceleration enabled
- [ ] Latest graphics drivers installed
- [ ] Browser zoom at 100%
- [ ] No conflicting extensions
- [ ] Sufficient RAM available (4GB+)
- [ ] GPU not overheating
- [ ] Power mode set to "High Performance"

## Getting Help

### Before Asking for Help

1. Check browser console for errors
2. Try in different browser
3. Test on different device
4. Review this troubleshooting guide
5. Check if issue is reproducible

### Information to Provide

When reporting issues, include:
- Browser name and version
- Operating system
- GPU model
- Console error messages
- Steps to reproduce
- Screenshots/video if possible

### Useful Commands

```bash
# Check versions
node --version
npm --version

# Rebuild project
npm run build

# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

## Advanced Debugging

### Enable Three.js Debug Mode

```typescript
// In BlackHoleScene.tsx, add:
import { Stats } from '@react-three/drei';

// Inside Canvas:
<Stats />
```

### Monitor Frame Rate

```javascript
// Add to console:
let lastTime = performance.now();
let frames = 0;

function measureFPS() {
  frames++;
  const now = performance.now();
  if (now >= lastTime + 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = now;
  }
  requestAnimationFrame(measureFPS);
}
measureFPS();
```

### Profile Performance

1. Open Chrome DevTools
2. Go to Performance tab
3. Click Record
4. Navigate to black hole section
5. Stop recording
6. Analyze flame graph

## Still Having Issues?

If none of these solutions work:
1. Check GitHub issues for similar problems
2. Create a new issue with detailed information
3. Include console logs and screenshots
4. Mention what you've already tried
