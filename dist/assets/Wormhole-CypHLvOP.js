import{r as n,j as e}from"./vendor-react-DSBVGuiZ.js";import{e as s}from"./vendor-misc-Dn--im6K.js";import{u as a,C as l,S as c}from"./vendor-r3f-Cuas7gjM.js";import{v as u,f as m}from"./vendor-three-DT8FRasJ.js";function v(){const i=n.useRef(null),o=n.useRef({uTime:{value:0},uResolution:{value:new u(800,800)}});return a(r=>{i.current&&(i.current.rotation.y=r.clock.getElapsedTime()*.12,i.current.rotation.z=r.clock.getElapsedTime()*.08,o.current.uTime.value=r.clock.getElapsedTime())}),e.jsxs("mesh",{ref:i,children:[e.jsx("sphereGeometry",{args:[2,64,64]}),e.jsx("shaderMaterial",{transparent:!0,side:m,uniforms:o.current,vertexShader:`
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;

          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,fragmentShader:`
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;

          // Simple procedural fractional Brownian noise
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                       mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
          }

          void main() {
            // High refractive lensing index
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            
            // Fresnel refraction rim logic
            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

            // Polar coordinates swirl throat texture
            vec2 uv = vUv - 0.5;
            float r = length(uv);
            float theta = atan(uv.y, uv.x);

            // Speed swirl inside throat
            float swirl = theta + 3.0 * noise(uv * 1.5 + uTime * 0.15) - (r * 8.0) + (uTime * 0.8);
            
            // Neon cyan/violet light distortion rays
            float pattern = sin(swirl * 12.0) * 0.5 + 0.5;
            pattern *= smoothstep(0.1, 0.45, r) * (1.0 - smoothstep(0.45, 0.5, r));

            // Deep cosmic colors
            vec3 throatColor = mix(
              vec3(0.05, 0.0, 0.15), // Deep abyss void
              vec3(0.0, 0.85, 0.95), // Radiant gravitational lens ring
              pattern
            );

            // Shimmering starlight stars inside wormhole
            float stars = step(0.985, noise(uv * 35.0 + uTime * 0.05));
            throatColor += vec3(stars * 0.8);

            // Blend inside & fresnel refracting ring
            vec3 finalColor = mix(throatColor, vec3(0.6, 0.2, 1.0), fresnel * 0.7);
            float alpha = smoothstep(0.0, 0.1, r) * (0.8 + fresnel * 0.2);

            gl_FragColor = vec4(finalColor, alpha);
          }
        `})]})}function h({isVisible:i}){return i?e.jsxs(l,{gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},camera:{position:[0,0,5],fov:45},style:{position:"absolute",inset:0,zIndex:1},children:[e.jsx("ambientLight",{intensity:.2,color:"#050512"}),e.jsx("pointLight",{position:[5,5,5],intensity:1.5,color:"#00ffff"}),e.jsx("pointLight",{position:[-5,-5,-5],intensity:1.5,color:"#9900ff"}),e.jsx("directionalLight",{position:[0,0,8],intensity:.5,color:"#ffffff"}),e.jsxs(n.Suspense,{fallback:null,children:[e.jsx(v,{}),e.jsx(c,{radius:120,depth:50,count:1500,factor:4,saturation:.5,fade:!0,speed:1.5})]})]}):null}const d="_section_19qqu_1",f="_overlay_19qqu_16",p="_content_19qqu_30",x="_visible_19qqu_43",g="_label_19qqu_48",y="_title_19qqu_58",_="_subtitle_19qqu_69",b="_hudCard_19qqu_80",j="_hudHeader_19qqu_94",T="_hudText_19qqu_105",t={section:d,overlay:f,content:p,visible:x,label:g,title:y,subtitle:_,hudCard:b,hudHeader:j,hudText:T};function R(){const{ref:i,inView:o}=s({threshold:.2});return e.jsxs("section",{id:"wormhole",ref:i,className:t.section,children:[e.jsx(h,{isVisible:o}),e.jsx("div",{className:t.overlay}),e.jsx("a",{href:"#saturn",className:`${t.neighbor} ${t.neighborLeft}`,style:{position:"absolute",top:"50%",left:"24px",transform:"translateY(-50%)",fontFamily:"var(--font-mono)",fontSize:"0.58rem",letterSpacing:"0.2em",color:"rgba(255,255,255,0.3)",textDecoration:"none",zIndex:10},children:"← SATURN CORE"}),e.jsx("a",{href:"#uranus",className:`${t.neighbor} ${t.neighborRight}`,style:{position:"absolute",top:"50%",right:"24px",transform:"translateY(-50%)",fontFamily:"var(--font-mono)",fontSize:"0.58rem",letterSpacing:"0.2em",color:"rgba(255,255,255,0.3)",textDecoration:"none",zIndex:10},children:"URANUS ICE →"}),e.jsxs("div",{className:`${t.content} ${o?t.visible:""}`,children:[e.jsx("p",{className:t.label,children:"SATURN CO-ORDINATES / ERB-01"}),e.jsx("h1",{className:t.title,children:"THE WORMHOLE"}),e.jsx("p",{className:t.subtitle,children:"A spherical gravitational tunnel warped in space-time near Saturn's orbits, leading to a completely different galaxy in another dimension."}),e.jsxs("div",{className:t.hudCard,children:[e.jsx("div",{className:t.hudHeader,children:"GRAVITATIONAL TELEMETRY SUMMARY"}),e.jsxs("div",{className:t.hudText,children:["Bridge Type: Einstein-Rosen throat lens ",e.jsx("br",{}),"Deflection Index: θ ≈ 4GM/c²r (Spherical Lensing) ",e.jsx("br",{}),"Throat Diameter: ~1.25 Kilometers ",e.jsx("br",{}),"Destination Coordinates: Gargantua System (Cygnus X-1 Outer Edge)"]})]})]})]})}export{R as default};
