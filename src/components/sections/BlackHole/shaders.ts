// src/components/sections/BlackHole/useBlackHoleShader.ts

export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

export const fragmentShader = `
  precision highp float;

  uniform vec2  uResolution;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uMouse;
  uniform float uMass;

  #define PI     3.14159265359
  #define TWO_PI 6.28318530718

  // ── Noise functions ──────────────────────────────────
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i+vec2(1,0)), f.x),
      mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for(int i = 0; i < 4; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  // ── Star field ───────────────────────────────────────
  vec3 stars(vec2 uv) {
    vec3 col = vec3(0.0);
    for(int i = 0; i < 3; i++) {
      vec2 g  = uv * (80.0 + float(i) * 60.0);
      vec2 id = floor(g);
      vec2 gf = fract(g) - 0.5;
      float r = hash(id + float(i) * 17.3);
      if(r > 0.92) {
        float b = smoothstep(0.08, 0.0, length(gf))
                * ((r-0.92)/0.08);
        float t = hash(id + float(i) * 31.7);
        vec3 sc = t < 0.2
          ? vec3(0.6, 0.7, 1.0)   // blue
          : t < 0.5
            ? vec3(1.0, 0.97, 0.9) // white
            : vec3(1.0, 0.8, 0.5); // orange
        float tw = 0.7 + 0.3 * sin(
          uTime * (2.0 + r*4.0) + r * TWO_PI
        );
        col += sc * b * tw;
      }
    }
    return col;
  }

  // ── Gravitational lensing ────────────────────────────
  vec2 lensUV(vec2 uv, float bhR) {
    float d = length(uv);
    if(d < 0.001) return uv;
    float deflect = min((bhR * 1.5 * uMass) / (d * d) * 0.08, 0.95);
    return uv + normalize(uv) * (-deflect)
         * (1.0 - d / (bhR * 4.0));
  }

  // ── Accretion disk ───────────────────────────────────
  vec4 disk(vec2 uv, float inner, float outer, float time) {
    vec2  tilted = vec2(uv.x, uv.y / 0.28);
    float r      = length(tilted);
    float angle  = atan(uv.y, uv.x);
    if(r < inner || r > outer) return vec4(0.0);

    float nr = (r - inner) / (outer - inner);

    // Doppler beaming
    float doppler = 0.5 + 0.5 * cos(angle - time * 0.3);
    float dBoost  = pow(max(doppler, 0.0), 2.5) * 2.8 + 0.15;

    // Temperature color
    float temp = 1.0 - smoothstep(0.0, 0.65, nr);
    vec3 cI = vec3(1.00, 0.96, 0.88) * 5.0;
    vec3 cM = vec3(1.00, 0.45, 0.05) * 2.5;
    vec3 cO = vec3(0.55, 0.05, 0.01) * 1.2;
    vec3 col = mix(cO, cM,  smoothstep(0.0, 0.45, temp));
         col = mix(col, cI, smoothstep(0.55, 1.0, temp));

    // Turbulence
    float n = fbm(vec2(angle * 3.0 - time * 1.2, nr * 4.0));
    float turb = 0.65 + 0.35 * n;

    // Fade
    float fade = smoothstep(0.0, 0.08, nr)
               * (1.0 - smoothstep(0.72, 1.0, nr))
               * (1.0 - smoothstep(0.0, 1.0,
                   abs(uv.y) / (r * 0.12)));

    float intensity = fade * turb * dBoost;
    vec3  final = col * intensity;

    // Inner streak
    final += vec3(1.0, 0.92, 0.75)
           * pow(1.0 - smoothstep(0.0, 0.18, nr), 4.0)
           * dBoost * 1.5;

    return vec4(final, min(intensity * 1.2, 1.0));
  }

  // ── Lensed arc (over/under sphere) ──────────────────
  vec4 lensedArc(vec2 uv, float bhR, float time) {
    float r      = length(uv);
    float angle  = atan(uv.y, uv.x);
    float arcR   = bhR * 1.25;
    float fade   = smoothstep(bhR*0.3, 0.0, abs(r - arcR));
    fade        *= smoothstep(0.15, 0.6, abs(sin(angle)));
    if(fade < 0.001) return vec4(0.0);
    float doppler = 0.5 + 0.5 * cos(angle + PI - time * 0.3);
    float dBoost  = pow(max(doppler, 0.0), 2.0) * 2.0 + 0.3;
    float nr = clamp((r - bhR*1.05) / (bhR*0.6), 0.0, 1.0);
    vec3 col = mix(
      vec3(0.6, 0.04, 0.01),
      vec3(1.0, 0.7,  0.2),
      1.0 - nr
    ) * dBoost;
    return vec4(col * fade, fade * 0.9);
  }

  void main() {
    vec2 bhCenter = uMouse * 0.08;
    vec2 uv = (gl_FragCoord.xy - uResolution * 0.5)
            / min(uResolution.x, uResolution.y) - bhCenter;

    // Scroll zoom
    uv /= (1.0 + uScroll * 0.15);

    float BH_R   = 0.14 * uMass;
    float D_IN   = 0.175 * uMass;
    float D_OUT  = 0.58 * uMass;
    float dist   = length(uv);

    // Lensed star background
    vec3 col = stars(lensUV(uv, BH_R) * 2.5 + vec2(0.3));

    // Nebula
    col += vec3(0.08, 0.02, 0.15)
         * fbm(lensUV(uv, BH_R) * 3.0) * 0.4;

    // Disk behind sphere
    if(uv.y < 0.0 || dist > BH_R) {
      vec4 d = disk(uv, D_IN, D_OUT, uTime);
      col = mix(col, d.rgb, d.a * 0.95);
    }

    // Lensed arc
    vec4 arc = lensedArc(uv, BH_R, uTime);
    col += arc.rgb * arc.a;

    // Photon rings
    float pr1 = smoothstep(BH_R+0.001, BH_R+0.006, dist)
              - smoothstep(BH_R+0.006, BH_R+0.022, dist);
    col += vec3(1.0, 0.88, 0.65) * pr1 * 4.5;

    float pr2 = smoothstep(BH_R+0.022, BH_R+0.026, dist)
              - smoothstep(BH_R+0.026, BH_R+0.038, dist);
    col += vec3(1.0, 0.75, 0.45) * pr2 * 2.0;

    // Disk in front
    if(uv.y >= 0.0) {
      vec4 df = disk(uv, D_IN, D_OUT, uTime);
      col = mix(col, df.rgb, df.a * 0.9);
    }

    // Event horizon
    if(dist < BH_R) col = vec3(0.0);

    // Outer glow
    float glow = min(0.003 / max(dist - BH_R, 0.001), 0.25)
               * smoothstep(BH_R, BH_R+0.35, dist);
    col += vec3(0.35, 0.08, 0.02) * glow;

    // Relativistic jet
    float jet = pow(abs(cos(atan(uv.y, uv.x))), 16.0)
              * smoothstep(0.3, 0.0, dist - BH_R * 3.0) * 0.3;
    col += vec3(0.4, 0.2, 0.8) * jet;

    // Vignette
    col *= 1.0 - smoothstep(0.5, 1.2, dist * 1.5);

    // ACES tone mapping
    col = (col*(2.51*col+0.03))/(col*(2.43*col+0.59)+0.14);
    col = pow(max(col, 0.0), vec3(1.0/1.8));

    gl_FragColor = vec4(col, 1.0);
  }
`
