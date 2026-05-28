import{r as n,j as e}from"./vendor-react-DSBVGuiZ.js";import{e as d}from"./vendor-misc-Dn--im6K.js";import{u as v,C as u,S as p}from"./vendor-r3f-Cuas7gjM.js";import"./vendor-three-DT8FRasJ.js";function h(){const s=n.useRef(null),i=n.useRef({uTime:{value:0}});return v(a=>{s.current&&(s.current.rotation.y=a.clock.getElapsedTime()*.05,i.current.uTime.value=a.clock.getElapsedTime())}),e.jsxs("mesh",{ref:s,children:[e.jsx("sphereGeometry",{args:[1.6,64,64]}),e.jsx("shaderMaterial",{transparent:!0,uniforms:i.current,vertexShader:`
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          // Simple sinusoidal wave displacement mimicking water waves
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            
            // Ocean tidal wave displacements
            vec3 pos = position;
            float wave = sin(pos.x * 4.0 + uTime * 2.0) * cos(pos.z * 4.0 + uTime * 1.5) * 0.08;
            pos += normal * wave;
            
            vPosition = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,fragmentShader:`
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vec3 viewDir = normalize(-vPosition);
            vec3 normal = normalize(vNormal);

            // Ocean deep color and sparkling crest highlights
            vec3 oceanDeep = vec3(0.01, 0.12, 0.28);
            vec3 waveCrest = vec3(0.4, 0.85, 0.95);

            // Simple wave pattern noise
            float pattern = sin(vPosition.x * 20.0 + uTime * 3.0) * cos(vPosition.y * 20.0 + uTime * 2.0);
            pattern = smoothstep(0.4, 0.9, pattern);

            vec3 waterColor = mix(oceanDeep, waveCrest, pattern * 0.4);

            // Fresnel ocean reflection rim
            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
            vec3 finalColor = mix(waterColor, vec3(0.7, 0.9, 1.0), fresnel * 0.6);

            gl_FragColor = vec4(finalColor, 0.92);
          }
        `})]})}function x({isVisible:s}){return s?e.jsxs(u,{gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},camera:{position:[0,0,4.8],fov:45},style:{position:"absolute",inset:0,zIndex:1},children:[e.jsx("ambientLight",{intensity:.25,color:"#0c1a30"}),e.jsx("directionalLight",{position:[6,3,5],intensity:2.5,color:"#dcf0fa"}),e.jsx("pointLight",{position:[-4,-2,-3],intensity:1.2,color:"#005588"}),e.jsxs(n.Suspense,{fallback:null,children:[e.jsx(h,{}),e.jsx(p,{radius:120,depth:50,count:800,factor:4,saturation:.5,fade:!0,speed:1.5})]})]}):null}const f="_section_oa7e3_1",_="_overlay_oa7e3_16",g="_content_oa7e3_30",b="_visible_oa7e3_43",j="_label_oa7e3_48",y="_title_oa7e3_58",N="_subtitle_oa7e3_69",T="_sliderContainer_oa7e3_80",L="_sliderLabel_oa7e3_98",w="_sliderInput_oa7e3_106",C="_sliderFooter_oa7e3_115",I="_dilationHUD_oa7e3_124",A="_stats_oa7e3_151",S="_statCard_oa7e3_162",D="_statAccent_oa7e3_178",E="_statValue_oa7e3_186",M="_statLabel_oa7e3_193",t={section:f,overlay:_,content:g,visible:b,label:j,title:y,subtitle:N,sliderContainer:T,sliderLabel:L,sliderInput:w,sliderFooter:C,dilationHUD:I,stats:A,statCard:S,statAccent:D,statValue:E,statLabel:M};function z(){const{ref:s,inView:i}=d({threshold:.2}),[a,r]=n.useState(1),l=(a*7).toFixed(1),c=Math.round(a*7*365.25).toLocaleString();return e.jsxs("section",{id:"miller",ref:s,className:t.section,children:[e.jsx(x,{isVisible:i}),e.jsx("div",{className:t.overlay}),e.jsx("a",{href:"#neptune",className:`${t.neighbor} ${t.neighborLeft}`,style:{position:"absolute",top:"50%",left:"24px",transform:"translateY(-50%)",fontFamily:"var(--font-mono)",fontSize:"0.58rem",letterSpacing:"0.2em",color:"rgba(255,255,255,0.3)",textDecoration:"none",zIndex:10},children:"← NEPTUNE WIND"}),e.jsx("a",{href:"#galaxy",className:`${t.neighbor} ${t.neighborRight}`,style:{position:"absolute",top:"50%",right:"24px",transform:"translateY(-50%)",fontFamily:"var(--font-mono)",fontSize:"0.58rem",letterSpacing:"0.2em",color:"rgba(255,255,255,0.3)",textDecoration:"none",zIndex:10},children:"MILKY WAY →"}),e.jsxs("div",{className:`${t.content} ${i?t.visible:""}`,children:[e.jsx("p",{className:t.label,children:"FIRST PLANET EXPLORATION / GARGANTUA ORBIT"}),e.jsx("h1",{className:t.title,children:"MILLER'S PLANET"}),e.jsx("p",{className:t.subtitle,children:"A vast, infinite water world orbiting extremely close to the supermassive black hole Gargantua, experiencing extreme gravitational time dilation."}),e.jsxs("div",{className:t.sliderContainer,children:[e.jsx("div",{className:t.sliderLabel,children:"GRAVITATIONAL TIME DILATION CALCULATOR"}),e.jsx("input",{type:"range",min:"1",max:"12",step:"1",value:a,onChange:o=>r(parseInt(o.target.value)),className:t.sliderInput}),e.jsxs("div",{className:t.sliderFooter,children:[e.jsx("span",{children:"1 Hour Here"}),e.jsx("span",{children:"12 Hours Here"})]}),e.jsxs("div",{className:t.dilationHUD,children:[e.jsxs("strong",{children:[a," Hour",a>1?"s":""," on Miller"]})," ="," ",e.jsxs("span",{style:{color:"#00a0ff",fontWeight:600},children:[l," Years"]})," on Earth",e.jsxs("div",{style:{fontSize:"0.58rem",color:"rgba(255,255,255,0.4)",marginTop:"4px"},children:["(~",c," days of terrestrial timeline passing in the outer cosmos)"]})]})]}),e.jsx("div",{className:t.stats,children:[{label:"Gravity",value:"130% Earth"},{label:"Ocean Depth",value:"Shallow (0.6m)"},{label:"Tidal Waves",value:"1,200m High"},{label:"Dilation",value:"61,320x Factor"}].map((o,m)=>e.jsxs("div",{className:t.statCard,style:{animationDelay:`${m*.1}s`},children:[e.jsx("div",{className:t.statAccent}),e.jsx("div",{className:t.statValue,children:o.value}),e.jsx("div",{className:t.statLabel,children:o.label})]},o.label))})]})]})}export{z as default};
