import{r as i,j as e}from"./vendor-react-DSBVGuiZ.js";import{e as y}from"./vendor-misc-Dn--im6K.js";import{c as R,u as z,C as w,S as M}from"./vendor-r3f-Cuas7gjM.js";import{q as j,v as h,l as B}from"./vendor-three-DT8FRasJ.js";const S=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`,H=`
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
`;function N({scrollProgress:n,mass:l}){const a=i.useRef(null),{size:o}=R(),t=i.useMemo(()=>new j({vertexShader:S,fragmentShader:H,uniforms:{uResolution:{value:new h(o.width,o.height)},uTime:{value:0},uScroll:{value:0},uMouse:{value:new h(0,0)},uMass:{value:l}}}),[o.width,o.height]);i.useMemo(()=>{t.uniforms.uResolution&&t.uniforms.uResolution.value.set(o.width,o.height)},[o.width,o.height,t]),z(c=>{if(!t.uniforms)return;t.uniforms.uTime.value=c.clock.elapsedTime,t.uniforms.uScroll.value=n,t.uniforms.uMass.value=l;const r=c.pointer.x,f=c.pointer.y;t.uniforms.uMouse.value.x+=(r-t.uniforms.uMouse.value.x)*.08,t.uniforms.uMouse.value.y+=(f-t.uniforms.uMouse.value.y)*.08});const u=i.useMemo(()=>new B(2,2),[]);return e.jsx("mesh",{ref:a,geometry:u,material:t})}const k="_section_fyzza_3",T="_canvas_fyzza_26",C="_gradientOverlay_fyzza_34",L="_content_fyzza_42",D="_visible_fyzza_57",I="_label_fyzza_62",O="_title_fyzza_71",V="_subtitle_fyzza_84",E="_statsRow_fyzza_96",F="_statCard_fyzza_106",A="_statAccent_fyzza_119",P="_statValue_fyzza_127",$="_statLabel_fyzza_135",U="_scrollHint_fyzza_145",W="_scrollLine_fyzza_160",Y="_scrollDot_fyzza_166",s={section:k,canvas:T,gradientOverlay:C,content:L,visible:D,label:I,title:O,subtitle:V,statsRow:E,statCard:F,statAccent:A,statValue:P,statLabel:$,scrollHint:U,scrollLine:W,scrollDot:Y};function X({isVisible:n,scrollProgress:l,mass:a}){if(!n)return null;const o=typeof window<"u"&&window.innerWidth<=768;return e.jsx(w,{className:s.canvas,gl:{antialias:!o,alpha:!0,powerPreference:"high-performance"},dpr:[1,o?1.5:2],performance:{min:.5},camera:{position:[0,0,1],fov:75},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0},children:e.jsxs(i.Suspense,{fallback:null,children:[e.jsx(N,{scrollProgress:l,mass:a}),e.jsx(M,{radius:100,depth:50,count:1e3,factor:4,saturation:.5,fade:!0,speed:1})]})})}function G({value:n,label:l,delay:a}){const o=i.useRef(null),[t,u]=i.useState({animationDelay:a}),c=f=>{const d=o.current;if(!d)return;const v=d.getBoundingClientRect(),m=f.clientX-v.left,p=f.clientY-v.top,x=-(p/v.height-.5)*24,g=(m/v.width-.5)*24,b=m/v.width*100,_=p/v.height*100;u({animationDelay:a,transform:`perspective(1000px) rotateX(${x}deg) rotateY(${g}deg) scale(1.08)`,boxShadow:"0 20px 40px -15px rgba(204, 0, 255, 0.35), 0 0 20px 1px rgba(255, 0, 102, 0.1)",borderColor:"rgba(255, 255, 255, 0.25)",background:`radial-gradient(circle at ${b}% ${_}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 70%)`,transition:"none",zIndex:10})},r=()=>{u({animationDelay:a,transform:"perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",transition:"all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"})};return e.jsxs("div",{ref:o,className:s.statCard,style:t,onMouseMove:c,onMouseLeave:r,children:[e.jsx("div",{className:s.statAccent}),e.jsx("div",{className:s.statValue,children:n}),e.jsx("div",{className:s.statLabel,children:l})]})}function q({mass:n}){const l=[{value:`${(4*n).toFixed(1)}M☉`,label:"Sgr A* Mass"},{value:`${(6.5*n).toFixed(1)}B☉`,label:"M87* Mass"},{value:`${(24*n).toFixed(0)}M km`,label:"Event Horizon"},{value:"c",label:"Escape Velocity"}];return e.jsx("div",{className:s.statsRow,children:l.map((a,o)=>e.jsx(G,{value:a.value,label:a.label,delay:`${.2+o*.12}s`},a.label))})}function ee(){const{ref:n,inView:l}=y({threshold:.1}),[a,o]=i.useState(0),[t,u]=i.useState(1),c=i.useRef(null);return i.useEffect(()=>{const r=()=>{if(!c.current)return;const f=c.current.getBoundingClientRect(),d=Math.max(0,Math.min(1,-f.top/window.innerHeight));o(d)};return window.addEventListener("scroll",r,{passive:!0}),()=>window.removeEventListener("scroll",r)},[]),e.jsxs("section",{id:"black-holes",ref:r=>{c.current=r,n(r)},className:s.section,children:[e.jsx(X,{isVisible:l,scrollProgress:a,mass:t}),e.jsx("div",{className:s.gradientOverlay}),e.jsxs("div",{className:`${s.content} ${l?s.visible:""}`,children:[e.jsx("span",{className:s.label,children:"SINGULARITY / EVENT HORIZON"}),e.jsx("h1",{className:s.title,children:"BLACK HOLES"}),e.jsx("p",{className:s.subtitle,children:"Where gravity is so extreme that nothing — not even light — can escape. The most violent and mysterious objects in the universe."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"10px",margin:"20px 0 30px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"15px",padding:"16px 28px",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",minWidth:"320px",pointerEvents:"auto"},children:[e.jsxs("label",{style:{fontFamily:"var(--font-mono)",fontSize:"0.68rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)"},children:["Singularity Mass: ",t.toFixed(2),"x"]}),e.jsx("input",{type:"range",min:"0.5",max:"2.0",step:"0.05",value:t,onChange:r=>u(parseFloat(r.target.value)),style:{width:"100%",accentColor:"#cc00ff",background:"rgba(255,255,255,0.1)",borderRadius:"5px",height:"6px",outline:"none",cursor:"pointer"}}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",fontFamily:"var(--font-body)",fontSize:"0.58rem",color:"rgba(255,255,255,0.4)"},children:[e.jsx("span",{children:"0.5x (Miniature)"}),e.jsx("span",{children:"2.0x (Supermassive)"})]})]}),e.jsx(q,{mass:t})]}),e.jsxs("div",{className:s.scrollHint,children:[e.jsx("div",{className:s.scrollLine}),e.jsx("div",{className:s.scrollDot})]})]})}export{ee as default};
