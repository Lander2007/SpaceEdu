const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Planet-DztSAwEK.js","assets/vendor-react-DSBVGuiZ.js","assets/vendor-misc-Dn--im6K.js","assets/vendor-three-DT8FRasJ.js","assets/vendor-r3f-Cuas7gjM.js","assets/Planet-BZYH0hXL.css","assets/AsteroidBelt-DG3eBsLT.js","assets/vendor-motion-cAnlZk9E.js","assets/AsteroidBelt-iYux_TLY.css","assets/Wormhole-CypHLvOP.js","assets/Wormhole-CVvPZEKy.css","assets/Miller-DXEeQhXb.js","assets/Miller-N-5WydZy.css","assets/Galaxy-CdKtRfoa.js","assets/Galaxy-Bt3PP9j9.css","assets/ScaleComparison-Btwlopyo.js","assets/ScaleComparison-CfOpzdYP.css","assets/BlackHole-C8UiYwk3.js","assets/BlackHole-6J3DTUDz.css","assets/Concept-qL5j1itv.js","assets/Concept-xTiFJEdk.css"])))=>i.map(i=>d[i]);
import{r as t,j as e,c as Y}from"./vendor-react-DSBVGuiZ.js";import{a as $,C as W,u as L,c as K,_ as I}from"./vendor-r3f-Cuas7gjM.js";import{A as X,m as A}from"./vendor-motion-cAnlZk9E.js";import{e as B,c as q,a as C,f as z}from"./vendor-three-DT8FRasJ.js";import"./vendor-misc-Dn--im6K.js";(function(){const u=document.createElement("link").relList;if(u&&u.supports&&u.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))p(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&p(i)}).observe(document,{childList:!0,subtree:!0});function a(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function p(o){if(o.ep)return;o.ep=!0;const s=a(o);fetch(o.href,s)}})();function J(){const{active:n,progress:u}=$(),[a,p]=t.useState(0),[o,s]=t.useState(!0),i=t.useRef(0);t.useEffect(()=>{i.current=u},[u]),t.useEffect(()=>{const d=setInterval(()=>{p(h=>{if(h>=100)return clearInterval(d),100;const b=Math.random()*5+3,v=h+b;return Math.min(100,Math.max(v,i.current))})},80);return()=>clearInterval(d)},[]),t.useEffect(()=>{if(a===100){const d=setTimeout(()=>s(!1),600);return()=>clearTimeout(d)}},[a]),t.useEffect(()=>{const d=setTimeout(()=>s(!1),4500);return()=>clearTimeout(d)},[]);const c=t.useMemo(()=>a<25?"CALCULATING PLANETARY ORBITS...":a<50?"LOADING HIGH-RESOLUTION TEXTURE MAPS...":a<75?"GENERATINGProcedural BLACK HOLES...":a<95?"COMPILING COSMIC SPECTRAL STARFIELDS...":"SYSTEM READY. ENTERING THE VOID...",[a]);return o?e.jsx(X,{children:o&&e.jsxs(A.div,{initial:{opacity:1},exit:{opacity:0},transition:{duration:.9,ease:[.25,.46,.45,.94]},style:{position:"fixed",inset:0,background:"#000005",zIndex:1e4,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"24px",overflow:"hidden"},children:[e.jsx(A.div,{animate:{scale:[1,1.15,1],x:[-20,20,-20],y:[-10,10,-10]},transition:{duration:12,repeat:1/0,ease:"easeInOut"},style:{position:"absolute",top:"-10%",left:"-10%",width:"50vw",height:"50vw",background:"radial-gradient(circle, rgba(130, 80, 255, 0.12) 0%, transparent 70%)",filter:"blur(60px)",pointerEvents:"none"}}),e.jsx(A.div,{animate:{scale:[1.1,.95,1.1],x:[20,-20,20],y:[10,-10,10]},transition:{duration:15,repeat:1/0,ease:"easeInOut"},style:{position:"absolute",bottom:"-10%",right:"-10%",width:"55vw",height:"55vw",background:"radial-gradient(circle, rgba(255, 0, 150, 0.08) 0%, transparent 70%)",filter:"blur(70px)",pointerEvents:"none"}}),e.jsxs("div",{style:{position:"relative",width:"220px",height:"220px",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",width:"28px",height:"28px",borderRadius:"50%",background:"radial-gradient(circle, #FFE79A 0%, #FFA500 70%, #FF4500 100%)",boxShadow:"0 0 35px 8px rgba(255,165,0,0.55), 0 0 70px 15px rgba(255,69,0,0.3)",zIndex:5}}),e.jsx(A.div,{animate:{rotate:360},transition:{duration:1.6,repeat:1/0,ease:"linear"},style:{position:"absolute",width:"74px",height:"74px",borderRadius:"50%",border:"1px dashed rgba(255,255,255,0.06)"},children:e.jsx("div",{style:{position:"absolute",top:"-3px",left:"50%",transform:"translateX(-50%)",width:"6px",height:"6px",borderRadius:"50%",background:"#8B8680",boxShadow:"0 0 8px #8B8680"}})}),e.jsx(A.div,{animate:{rotate:360},transition:{duration:2.8,repeat:1/0,ease:"linear"},style:{position:"absolute",width:"130px",height:"130px",borderRadius:"50%",border:"1px dashed rgba(255,255,255,0.08)"},children:e.jsx("div",{style:{position:"absolute",top:"-4px",left:"50%",transform:"translateX(-50%)",width:"8px",height:"8px",borderRadius:"50%",background:"#4B9CD3",boxShadow:"0 0 10px #4B9CD3"}})}),e.jsx(A.div,{animate:{rotate:360},transition:{duration:4.2,repeat:1/0,ease:"linear"},style:{position:"absolute",width:"186px",height:"186px",borderRadius:"50%",border:"1px dashed rgba(255,255,255,0.05)"},children:e.jsx("div",{style:{position:"absolute",top:"-3px",left:"50%",transform:"translateX(-50%)",width:"6px",height:"6px",borderRadius:"50%",background:"#C1440E",boxShadow:"0 0 8px #C1440E"}})})]}),e.jsxs("div",{style:{textAlign:"center",zIndex:6,display:"flex",flexDirection:"column",gap:"6px"},children:[e.jsx(A.div,{initial:{opacity:0,y:5},animate:{opacity:.5,y:0},style:{fontFamily:"var(--font-mono)",fontSize:"0.62rem",letterSpacing:"0.22em",color:"#fff",textTransform:"uppercase"},children:c},c),e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:"1.8rem",fontWeight:700,color:"#fff",letterSpacing:"0.05em",textShadow:"0 0 15px rgba(255,255,255,0.3)"},children:[Math.round(a),"%"]})]})]})}):null}function Q(){const n=t.useRef(null),u=t.useRef(null),a=t.useRef([]),p=t.useRef({x:-100,y:-100}),o=t.useRef({x:-100,y:-100}),s=t.useRef([]);return t.useEffect(()=>{if(window.matchMedia("(hover: none)").matches)return;const i=6,c=Array.from({length:i},(r,l)=>{const f=document.createElement("div"),y=l/i*3+1;return f.style.cssText=`
        position: fixed;
        width: ${y}px; height: ${y}px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99998;
        transform: translate(-50%,-50%);
        transition: opacity 0.1s;
        left: -100px;
        top: -100px;
      `,document.body.appendChild(f),a.current.push(f),f}),d=r=>{p.current={x:r.clientX,y:r.clientY},u.current&&(u.current.style.left=r.clientX+"px",u.current.style.top=r.clientY+"px"),s.current.push({x:r.clientX,y:r.clientY}),s.current.length>i&&s.current.shift(),a.current.forEach((l,f)=>{const y=s.current[f];y&&(l.style.left=y.x+"px",l.style.top=y.y+"px",l.style.opacity=String(f/i*.35))})},h=()=>{n.current&&(n.current.style.width="56px",n.current.style.height="56px",n.current.style.background="rgba(255,255,255,0.05)",n.current.style.borderColor="rgba(255,255,255,0.85)")},b=()=>{n.current&&(n.current.style.width="36px",n.current.style.height="36px",n.current.style.background="transparent",n.current.style.borderColor="rgba(255,255,255,0.55)")},v=r=>{let l=r.target;if(l&&l.nodeType===3&&(l=l.parentElement),l&&typeof l.closest=="function"){const f=l.style?.cursor==="pointer";if(l.closest("button")||l.closest("a")||l.closest("canvas")||l.closest("input")||l.closest("select")||l.closest('[role="button"]')||l.closest('[style*="cursor: pointer"]')||f){h();return}}b()};let g;const x=()=>{o.current.x+=(p.current.x-o.current.x)*.1,o.current.y+=(p.current.y-o.current.y)*.1,n.current&&(n.current.style.left=o.current.x+"px",n.current.style.top=o.current.y+"px"),g=requestAnimationFrame(x)};return g=requestAnimationFrame(x),window.addEventListener("mousemove",d),window.addEventListener("mouseover",v),()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseover",v),cancelAnimationFrame(g),c.forEach(r=>r.remove())}},[]),typeof window<"u"&&window.matchMedia("(hover: none)").matches?null:e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:n,style:{position:"fixed",width:"36px",height:"36px",border:"1px solid rgba(255,255,255,0.55)",borderRadius:"50%",pointerEvents:"none",zIndex:99999,transform:"translate(-50%,-50%)",transition:"width 0.3s ease, height 0.3s ease, background 0.3s ease, border-color 0.3s ease",left:"-100px",top:"-100px"}}),e.jsx("div",{ref:u,style:{position:"fixed",width:"4px",height:"4px",background:"white",borderRadius:"50%",pointerEvents:"none",zIndex:99999,transform:"translate(-50%,-50%)",boxShadow:"0 0 6px 2px rgba(255,255,255,0.8)",left:"-100px",top:"-100px"}})]})}const S=[{id:"hero",label:"Home",hudLabel:"COSMOS INIT",color:"#ffffff"},{id:"sun",label:"Sun",hudLabel:"SOLAR CORE",color:"#FFB347"},{id:"mercury",label:"Mercury",hudLabel:"MERCURY",color:"#A89070"},{id:"venus",label:"Venus",hudLabel:"VENUS",color:"#E8C47A"},{id:"earth",label:"Earth",hudLabel:"EARTH CRADLE",color:"#4B9CD3"},{id:"mars",label:"Mars",hudLabel:"MARS FRONTIER",color:"#C1440E"},{id:"asteroids",label:"Asteroids",hudLabel:"ASTEROID FIELD",color:"#c084fc"},{id:"jupiter",label:"Jupiter",hudLabel:"JUPITER GIANT",color:"#C88B3A"},{id:"saturn",label:"Saturn",hudLabel:"SATURN RINGS",color:"#E4D191"},{id:"wormhole",label:"Wormhole",hudLabel:"WORMHOLE GATE",color:"#00ffff"},{id:"uranus",label:"Uranus",hudLabel:"URANUS ICE",color:"#7DE8E8"},{id:"neptune",label:"Neptune",hudLabel:"NEPTUNE STORM",color:"#3F54BA"},{id:"miller",label:"Miller",hudLabel:"MILLERS PLANET",color:"#00a0ff"},{id:"pluto",label:"Pluto",hudLabel:"PLUTO FRONTIER",color:"#C39B78"},{id:"galaxy",label:"Galaxy",hudLabel:"MILKY WAY",color:"#7de8e8"},{id:"scale",label:"Scale",hudLabel:"SCALE COMPARISON",color:"#ffffff"},{id:"black-holes",label:"Black Holes",hudLabel:"GARGANTUA",color:"#9933FF"},{id:"concept",label:"Concept",hudLabel:"THE CONCEPT",color:"#ffffff"}],Z=[{name:"Solar System",sections:[{id:"sun",label:"Sun",color:"#FFB347"},{id:"mercury",label:"Mercury",color:"#A89070"},{id:"venus",label:"Venus",color:"#E8C47A"},{id:"earth",label:"Earth",color:"#4B9CD3"},{id:"mars",label:"Mars",color:"#C1440E"},{id:"asteroids",label:"Asteroid Belt",color:"#c084fc"},{id:"jupiter",label:"Jupiter",color:"#C88B3A"},{id:"saturn",label:"Saturn",color:"#E4D191"}]},{name:"Deep Space",sections:[{id:"wormhole",label:"Wormhole Gate",color:"#00ffff"},{id:"uranus",label:"Uranus",color:"#7DE8E8"},{id:"neptune",label:"Neptune",color:"#3F54BA"},{id:"miller",label:"Miller's Planet",color:"#00a0ff"},{id:"pluto",label:"Pluto",color:"#C39B78"},{id:"galaxy",label:"Milky Way",color:"#7de8e8"}]},{name:"The Abyss",sections:[{id:"scale",label:"Scale Comparison",color:"#ffffff"},{id:"black-holes",label:"Black Holes",color:"#9933FF"},{id:"concept",label:"Mission Concept",color:"#ffffff"}]}],V={hero:"0 KM",sun:"149.6M KM",mercury:"91.7M KM",venus:"41.4M KM",earth:"0 KM",mars:"78.3M KM",asteroids:"329.0M KM",jupiter:"628.7M KM",saturn:"1.27B KM",wormhole:"Warp Horizon",uranus:"2.72B KM",neptune:"4.35B KM",miller:"12.4B KM",pluto:"5.91B KM",galaxy:"26K Light-Years",scale:"Universal Range","black-holes":"10K Light-Years",concept:"Mission End"};function ee(){const[n,u]=t.useState(!1),[a,p]=t.useState("hero"),[o,s]=t.useState(!1),[i,c]=t.useState(!1),[d,h]=t.useState(28410),[b,v]=t.useState(98.4);t.useEffect(()=>{const r=setInterval(()=>{h(l=>Math.round(l+(Math.random()-.5)*6)),v(l=>Math.min(100,Math.max(92,parseFloat((l+(Math.random()-.5)*.3).toFixed(1)))))},1500);return()=>clearInterval(r)},[]),t.useEffect(()=>{const r=[];return S.forEach(({id:l})=>{const f=document.getElementById(l);if(!f)return;const y=new IntersectionObserver(([E])=>{E.isIntersecting&&p(l)},{threshold:.3,rootMargin:"-10% 0px -10% 0px"});y.observe(f),r.push(y)}),()=>r.forEach(l=>l.disconnect())},[]),t.useEffect(()=>{const r=()=>u(window.scrollY>60),l=()=>c(window.innerWidth<=768);return r(),l(),window.addEventListener("scroll",r,{passive:!0}),window.addEventListener("resize",l),()=>{window.removeEventListener("scroll",r),window.removeEventListener("resize",l)}},[]);const g=t.useCallback(r=>{document.getElementById(r)?.scrollIntoView({behavior:"smooth"}),s(!1)},[]),x=S.find(r=>r.id===a)?.color??"#ffffff";return i?e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .mobile-grid-bg {
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px) !important;
            background-size: 32px 32px !important;
            background-position: center !important;
          }
          @keyframes fadeUpStagger {
            0% {
              opacity: 0;
              transform: translateY(12px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}}),e.jsxs("nav",{style:{position:"fixed",top:0,left:0,right:0,height:"var(--nav-height)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",zIndex:1e3,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",background:n?"rgba(3, 5, 22, 0.85)":"rgba(2, 4, 18, 0.15)",borderBottom:n?`1px solid ${x}20`:"1px solid rgba(255, 255, 255, 0.05)",transition:"all 0.4s ease"},children:[e.jsxs("div",{onClick:()=>g("hero"),style:{fontFamily:"var(--font-body)",fontSize:"0.82rem",letterSpacing:"0.35em",textTransform:"uppercase",color:"rgba(255,255,255,0.92)",display:"flex",alignItems:"center",gap:"8px",cursor:"none"},children:["spaceedu",e.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:x,boxShadow:`0 0 10px 2.5px ${x}90`,animation:"pulse 2s infinite",transition:"background 0.5s ease, box-shadow 0.5s ease"}})]}),e.jsx("button",{onClick:()=>s(!o),style:{background:"none",border:"none",cursor:"pointer",padding:"8px",display:"flex",flexDirection:"column",gap:"5px",zIndex:1001},children:[0,1,2].map(r=>e.jsx("span",{style:{display:"block",width:"22px",height:"1.5px",background:"rgba(255,255,255,0.8)",borderRadius:"1px",transition:"all 0.3s ease",transformOrigin:"center",transform:o?r===0?"translateY(6.5px) rotate(45deg)":r===2?"translateY(-6.5px) rotate(-45deg)":"scaleX(0)":"none",opacity:o&&r===1?0:1}},r))})]}),e.jsx("div",{className:"mobile-grid-bg",style:{position:"fixed",inset:0,background:"rgba(2, 4, 18, 0.98)",backdropFilter:"blur(30px)",WebkitBackdropFilter:"blur(30px)",zIndex:999,display:"flex",flexDirection:"column",alignItems:"stretch",justifyContent:"flex-start",paddingTop:"90px",paddingBottom:"40px",overflowY:"auto",opacity:o?1:0,pointerEvents:o?"auto":"none",transition:"opacity 0.4s ease"},children:S.map((r,l)=>{const f=a===r.id;return e.jsxs("button",{onClick:()=>g(r.id),style:{fontFamily:"var(--font-body)",fontSize:"1.02rem",fontWeight:f?600:400,color:f?"#ffffff":"rgba(255,255,255,0.55)",background:"none",border:"none",cursor:"pointer",letterSpacing:"0.14em",padding:"12px 28px",width:"100%",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255, 255, 255, 0.03)",transition:"all 0.3s ease",animation:o?`fadeUpStagger 0.4s ${l*.02}s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)`:"none",opacity:0},onMouseEnter:y=>{y.currentTarget.style.color="#ffffff",y.currentTarget.style.background="rgba(255, 255, 255, 0.03)"},onMouseLeave:y=>{y.currentTarget.style.color=f?"#ffffff":"rgba(255,255,255,0.55)",y.currentTarget.style.background="transparent"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:"0.66rem",color:f?r.color:"rgba(255, 255, 255, 0.25)",transition:"color 0.3s ease"},children:String(l).padStart(2,"0")}),e.jsx("span",{style:{textTransform:"uppercase"},children:r.label})]}),f&&e.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:r.color,boxShadow:`0 0 10px ${r.color}`}})]},r.id)})}),e.jsxs("div",{style:{position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"6px",background:"rgba(0,0,20,0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:`1px solid ${x}30`,borderRadius:"40px",padding:"8px 12px",zIndex:998,transition:"border-color 0.5s ease",boxShadow:`0 0 30px ${x}20`},children:[e.jsx("button",{onClick:()=>{const r=S.findIndex(l=>l.id===a);r>0&&g(S[r-1].id)},style:{width:"32px",height:"32px",borderRadius:"50%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.6)",fontSize:"14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",outline:"none"},children:"‹"}),e.jsx("div",{style:{display:"flex",gap:"5px",alignItems:"center"},children:S.map(r=>e.jsx("button",{onClick:()=>g(r.id),style:{width:a===r.id?"18px":"4px",height:"4px",borderRadius:"2px",background:a===r.id?r.color:"rgba(255,255,255,0.2)",border:"none",cursor:"pointer",padding:0,transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",boxShadow:a===r.id?`0 0 8px ${r.color}80`:"none"}},r.id))}),e.jsx("button",{onClick:()=>{const r=S.findIndex(l=>l.id===a);r<S.length-1&&g(S[r+1].id)},style:{width:"32px",height:"32px",borderRadius:"50%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.6)",fontSize:"14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",outline:"none"},children:"›"})]}),e.jsx(H,{activeColor:x})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .dynamic-island {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          height: 44px;
          width: 390px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(3, 5, 22, 0.95) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.02);
          transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          overflow: visible;
        }

        .dynamic-island:hover {
          width: 980px;
          height: 64px;
          border-radius: 32px;
          background: rgba(3, 5, 22, 0.85);
          border-color: var(--active-border-glow);
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 35px var(--active-shadow-glow);
          padding: 0 32px;
        }

        .island-compact-view {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          opacity: 1;
          visibility: visible;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform: scale(1);
        }

        .dynamic-island:hover .island-compact-view {
          opacity: 0;
          visibility: hidden;
          transform: scale(0.9);
          position: absolute;
        }

        .island-expanded-view {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
          transform: scale(0.95);
        }

        .dynamic-island:hover .island-expanded-view {
          opacity: 1;
          visibility: visible;
          transform: scale(1);
        }

        .nav-item-container {
          position: relative;
        }
        
        .nav-group-trigger {
          font-family: var(--font-body);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          background: none;
          border: none;
          cursor: none;
          transition: all 0.3s ease;
          padding: 8px 16px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-group-trigger.active {
          color: #ffffff;
        }

        .nav-item-container:hover .nav-group-trigger {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .dropdown-arrow {
          font-size: 0.45rem;
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0.6;
          display: inline-block;
        }

        .nav-item-container:hover .dropdown-arrow {
          transform: rotate(180deg);
          opacity: 1;
        }

        .nav-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(12px);
          width: 230px;
          background: rgba(3, 5, 22, 0.95);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid var(--active-border-glow);
          border-radius: 16px;
          padding: 10px;
          z-index: 1010;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 20px var(--active-shadow-glow);
        }

        .nav-item-container:hover .nav-dropdown {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-left: 2px solid transparent;
          border-radius: 8px;
          text-align: left;
          cursor: none;
          transition: all 0.2s ease;
        }

        .dropdown-item.active {
          background: rgba(255, 255, 255, 0.06);
          border-left-color: var(--active-border-glow);
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        .dropdown-item-label {
          font-family: var(--font-body);
          font-size: 0.66rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.2s ease;
        }

        .dropdown-item.active .dropdown-item-label,
        .dropdown-item:hover .dropdown-item-label {
          color: #ffffff;
        }

        .beacon-ping {
          animation: beaconPulse 2s infinite ease-in-out;
        }

        @keyframes beaconPulse {
          0% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 4px var(--active-border-glow); }
          50% { transform: scale(1.4); opacity: 1; box-shadow: 0 0 12px var(--active-border-glow); }
          100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 4px var(--active-border-glow); }
        }
      `}}),e.jsxs("nav",{className:"dynamic-island",style:{"--active-border-glow":`${x}30`,"--active-shadow-glow":`${x}20`},children:[e.jsxs("div",{className:"island-compact-view",children:[e.jsxs("div",{style:{fontFamily:"var(--font-body)",fontSize:"0.76rem",letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(255,255,255,0.92)",display:"flex",alignItems:"center",gap:"6px"},children:["spaceedu",e.jsx("span",{className:"beacon-ping",style:{width:"5px",height:"5px",borderRadius:"50%",background:x,boxShadow:`0 0 8px 1.5px ${x}80`,transition:"background 0.5s ease, box-shadow 0.5s ease","--active-border-glow":x}})]}),e.jsx("span",{style:{color:"rgba(255,255,255,0.15)",fontSize:"0.8rem"},children:"|"}),e.jsx("span",{style:{fontFamily:"var(--font-mono)",fontSize:"0.58rem",letterSpacing:"0.15em",color:x,textTransform:"uppercase",transition:"color 0.4s ease"},children:S.find(r=>r.id===a)?.hudLabel||"DEEP SPACE"}),e.jsx("span",{style:{color:"rgba(255,255,255,0.15)",fontSize:"0.8rem"},children:"|"}),e.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:"0.52rem",color:"rgba(255,255,255,0.45)",letterSpacing:"0.08em"},children:["DST: ",V[a]||"0 KM"]})]}),e.jsxs("div",{className:"island-expanded-view",children:[e.jsxs("div",{onClick:()=>g("hero"),style:{fontFamily:"var(--font-body)",fontSize:"0.82rem",letterSpacing:"0.35em",textTransform:"uppercase",color:"rgba(255,255,255,0.92)",display:"flex",alignItems:"center",gap:"8px",cursor:"none"},children:["spaceedu",e.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:x,boxShadow:`0 0 10px 2.5px ${x}90`,animation:"pulse 2s infinite",transition:"background 0.5s ease, box-shadow 0.5s ease"}})]}),e.jsx("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:Z.map(r=>{const l=r.sections.some(f=>f.id===a);return e.jsxs("div",{className:"nav-item-container",children:[e.jsxs("button",{className:`nav-group-trigger ${l?"active":""}`,children:[r.name,e.jsx("span",{className:"dropdown-arrow",children:"▼"})]}),e.jsx("div",{className:"nav-dropdown",children:r.sections.map(f=>{const y=a===f.id;return e.jsxs("button",{onClick:()=>g(f.id),className:`dropdown-item ${y?"active":""}`,children:[e.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:f.color,boxShadow:`0 0 6px ${f.color}`}}),e.jsx("span",{className:"dropdown-item-label",children:f.label})]},f.id)})})]},r.name)})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:"0.52rem",letterSpacing:"0.15em",color:"rgba(255, 255, 255, 0.4)",display:"flex",alignItems:"center",gap:"16px",padding:"4px 16px",borderRight:"1px solid rgba(255, 255, 255, 0.08)",marginRight:"4px"},children:[e.jsxs("div",{children:[e.jsx("span",{style:{color:x},children:"VEL:"})," ",d.toLocaleString()," KM/S"]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:x},children:"SIG:"})," ",b,"%"]}),e.jsxs("div",{children:[e.jsx("span",{style:{color:x},children:"DST:"})," ",V[a]||"0 KM"]})]}),e.jsx("button",{onClick:()=>g("sun"),style:{fontFamily:"var(--font-body)",fontSize:"0.68rem",letterSpacing:"0.15em",textTransform:"uppercase",padding:"10px 22px",background:"transparent",color:"#ffffff",border:`1px solid ${x}`,borderRadius:"30px",cursor:"none",fontWeight:500,boxShadow:`0 0 10px ${x}40`,transition:"all 0.3s ease"},onMouseEnter:r=>{r.currentTarget.style.background=x,r.currentTarget.style.color="#020414",r.currentTarget.style.boxShadow=`0 0 20px 5px ${x}80`,r.currentTarget.style.transform="scale(1.05)"},onMouseLeave:r=>{r.currentTarget.style.background="transparent",r.currentTarget.style.color="#ffffff",r.currentTarget.style.boxShadow=`0 0 10px ${x}40`,r.currentTarget.style.transform="scale(1)"},children:"Explore"})]})]})]}),e.jsxs("div",{style:{position:"fixed",right:"24px",top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"14px",zIndex:999,pointerEvents:"none",userSelect:"none"},children:[e.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontSize:"0.55rem",letterSpacing:"0.2em",color:x,textTransform:"uppercase",marginBottom:"6px",background:"rgba(5, 5, 12, 0.65)",border:`1px solid ${x}30`,padding:"5px 12px",borderRadius:"4px",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",transition:"color 0.4s ease, border-color 0.4s ease",boxShadow:`0 0 15px -3px ${x}30`},children:["Coordinate: ",S.find(r=>r.id===a)?.hudLabel||"DEEP SPACE"]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",position:"relative",paddingRight:"6px"},children:[e.jsx("div",{style:{position:"absolute",right:"9px",top:"5px",bottom:"5px",width:"1px",background:"rgba(255, 255, 255, 0.1)",zIndex:1}}),S.map(r=>{const l=a===r.id;return e.jsxs("div",{onClick:()=>g(r.id),style:{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:"12px",cursor:"none",pointerEvents:"auto",position:"relative",zIndex:2,height:"14px"},onMouseEnter:f=>{const y=f.currentTarget.querySelector(".timeline-label");y&&!l&&(y.style.opacity="0.8",y.style.transform="translateX(0)");const E=f.currentTarget.querySelector(".timeline-dot");E&&!l&&(E.style.transform="scale(1.5)",E.style.background=r.color)},onMouseLeave:f=>{const y=f.currentTarget.querySelector(".timeline-label");y&&!l&&(y.style.opacity="0",y.style.transform="translateX(10px)");const E=f.currentTarget.querySelector(".timeline-dot");E&&!l&&(E.style.transform="scale(1)",E.style.background="rgba(255, 255, 255, 0.3)")},children:[e.jsx("span",{className:"timeline-label",style:{fontFamily:"var(--font-mono)",fontSize:"0.52rem",letterSpacing:"0.18em",color:l?"#ffffff":"rgba(255,255,255,0.25)",opacity:l?1:0,transform:l?"translateX(0)":"translateX(10px)",transition:"opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",pointerEvents:"none",textTransform:"uppercase",textShadow:l?`0 0 10px ${r.color}60`:"none"},children:r.hudLabel}),e.jsx("div",{className:"timeline-dot",style:{width:l?"10px":"4px",height:l?"10px":"4px",borderRadius:"50%",background:l?r.color:"rgba(255, 255, 255, 0.3)",boxShadow:l?`0 0 12px 3px ${r.color}aa`:"none",transition:"all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",border:l?"1px solid #ffffff":"none",transform:"scale(1)"}})]},r.id)})]})]}),e.jsx(H,{activeColor:x})]})}function H({activeColor:n}){const[u,a]=t.useState(0);return t.useEffect(()=>{const p=()=>{const{scrollTop:o,scrollHeight:s,clientHeight:i}=document.documentElement;a(o/(s-i)*100)};return window.addEventListener("scroll",p,{passive:!0}),()=>window.removeEventListener("scroll",p)},[]),e.jsx("div",{style:{position:"fixed",top:0,left:0,height:"2px",width:`${u}%`,background:`linear-gradient(90deg, #1a88ff, #8833ff, ${n}, #ff6600)`,boxShadow:`0 0 10px 2px ${n}60`,zIndex:9999,transition:"width 0.1s linear, box-shadow 0.5s ease"}})}function te(){const[n,u]=t.useState(!1),[a,p]=t.useState(.4),[o,s]=t.useState([]),i=t.useRef(null),c=t.useRef(null),d=t.useRef([]),h=t.useRef(null),b=t.useRef(null),v=t.useRef(0),g=t.useRef(n),x=t.useRef(a);t.useEffect(()=>{g.current=n},[n]),t.useEffect(()=>{x.current=a},[a]);const r=[[110,220,261.63,329.63],[87.31,174.61,261.63,349.23],[130.81,261.63,329.63,392],[98,196,293.66,392]],l=()=>{if(i.current)return;const w=window.AudioContext||window.webkitAudioContext,j=new w;i.current=j;const R=j.createBiquadFilter();R.type="lowpass",R.frequency.setValueAtTime(450,j.currentTime),R.Q.setValueAtTime(1.5,j.currentTime),h.current=R;const T=j.createGain();T.gain.setValueAtTime(0,j.currentTime),c.current=T,R.connect(T),T.connect(j.destination)},f=()=>{if(!i.current||!h.current)return;const w=i.current,j=T=>{d.current.forEach(N=>{try{N.stop(w.currentTime+1.5)}catch{}}),d.current=[],s(T),T.forEach((N,G)=>{const M=w.createOscillator();M.type=G%2===0?"sawtooth":"triangle",M.frequency.setValueAtTime(N,w.currentTime),M.detune.setValueAtTime((Math.random()-.5)*15,w.currentTime);const O=w.createGain(),U=N<150?.35:.18;O.gain.setValueAtTime(0,w.currentTime),O.gain.linearRampToValueAtTime(U,w.currentTime+1.5),M.connect(O),O.connect(h.current),M.start(w.currentTime),d.current.push(M)}),h.current&&h.current.frequency.exponentialRampToValueAtTime(300+Math.random()*400,w.currentTime+6)},R=()=>{const T=v.current;j(r[T]),v.current=(T+1)%r.length};R(),b.current=setInterval(R,7e3)},y=()=>{b.current&&(clearInterval(b.current),b.current=null),d.current.forEach(w=>{try{w.stop()}catch{}}),d.current=[],s([])};t.useEffect(()=>{c.current&&i.current&&n&&c.current.gain.setValueAtTime(a,i.current.currentTime)},[a,n]),t.useEffect(()=>{const w=async()=>{l(),i.current?.state==="suspended"&&await i.current.resume(),c.current&&i.current&&c.current.gain.linearRampToValueAtTime(x.current,i.current.currentTime+1.5),g.current||(f(),u(!0))},j=()=>{g.current?(c.current?.gain.linearRampToValueAtTime(0,i.current.currentTime+1.2),setTimeout(()=>{y(),u(!1)},1200)):w()};return window.addEventListener("start-ambient-synth",w),window.addEventListener("toggle-ambient-synth",j),()=>{window.removeEventListener("start-ambient-synth",w),window.removeEventListener("toggle-ambient-synth",j),y()}},[]);const E=async()=>{n?(c.current?.gain.linearRampToValueAtTime(0,i.current.currentTime+1.2),setTimeout(()=>{y(),u(!1)},1200)):(l(),i.current?.state==="suspended"&&await i.current.resume(),c.current?.gain.linearRampToValueAtTime(a,i.current.currentTime+1.5),f(),u(!0))};return e.jsxs("div",{style:{position:"fixed",bottom:"24px",left:"24px",zIndex:1001,display:"flex",alignItems:"center",gap:"12px",background:"rgba(5, 5, 12, 0.45)",border:"1px solid rgba(255, 255, 255, 0.08)",padding:"8px 16px",borderRadius:"24px",backdropFilter:"blur(15px)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.5)",pointerEvents:"auto",fontFamily:"var(--font-mono)",color:"white",userSelect:"none"},children:[e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:"3px",width:"24px",height:"14px"},children:[1,2,3,4].map(w=>e.jsx("div",{style:{width:"3px",height:n?"100%":"20%",background:"#cc00ff",borderRadius:"2px",transformOrigin:"bottom",animation:n?"synthVisualizer 1.2s ease-in-out infinite alternate":"none",animationDelay:`${w*.2}s`,transition:"height 0.4s"}},w))}),e.jsx("button",{onClick:E,style:{background:"none",border:"none",color:n?"#cc00ff":"rgba(255, 255, 255, 0.8)",fontSize:"0.62rem",letterSpacing:"0.15em",textTransform:"uppercase",fontWeight:600,cursor:"none",outline:"none",transition:"color 0.3s ease"},children:n?"interstellar synth active":"activate synth"}),n&&e.jsx("input",{type:"range",min:"0.1",max:"0.8",step:"0.05",value:a,onChange:w=>p(parseFloat(w.target.value)),style:{width:"60px",accentColor:"#cc00ff",background:"rgba(255, 255, 255, 0.1)",height:"4px",borderRadius:"2px",cursor:"none",outline:"none",border:"none"}}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
        @keyframes synthVisualizer {
          0%   { transform: scaleY(0.2); }
          100% { transform: scaleY(1); }
        }
      `}})]})}function re(){const n=t.useRef(null);return t.useEffect(()=>{const u=n.current;if(!u)return;const a=u.getContext("2d");if(!a)return;const p=()=>{u.width=window.innerWidth,u.height=window.innerHeight};p(),window.addEventListener("resize",p);const s=window.innerWidth<=768?60:130,i=Array.from({length:s},()=>({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,r:Math.random()*1.2+.3,opacity:Math.random()*.28+.05,dx:(Math.random()-.5)*.08,dy:(Math.random()-.5)*.06,phase:Math.random()*Math.PI*2,speed:Math.random()*.012+.004}));let c;const d=()=>{const h=u.width,b=u.height;a.clearRect(0,0,h,b);const v=performance.now()*.001;for(const g of i){g.x=(g.x+g.dx+h)%h,g.y=(g.y+g.dy+b)%b;const x=g.opacity*(.65+.35*Math.sin(v*g.speed*60+g.phase));a.beginPath(),a.arc(g.x,g.y,g.r,0,Math.PI*2),a.fillStyle=`rgba(255,255,255,${x.toFixed(3)})`,a.fill()}c=requestAnimationFrame(d)};return d(),()=>{cancelAnimationFrame(c),window.removeEventListener("resize",p)}},[]),e.jsx("canvas",{ref:n,style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}})}const ne="_section_jxkw3_1",ae="_nebulaGlow_jxkw3_41",oe="_canvasContainer_jxkw3_50",se="_content_jxkw3_57",ie="_label_jxkw3_68",le="_title_jxkw3_79",ce="_titleVisible_jxkw3_97",de="_subtitle_jxkw3_110",ue="_subtitleVisible_jxkw3_124",pe="_cta_jxkw3_130",fe="_hudFrame_jxkw3_184",xe="_cornerTL_jxkw3_191",ge="_cornerTR_jxkw3_192",me="_cornerBL_jxkw3_193",he="_cornerBR_jxkw3_194",be="_telemetryLogs_jxkw3_228",ye="_logLine_jxkw3_244",ve="_logBullet_jxkw3_251",we="_blinkCursor_jxkw3_257",je="_rightStatus_jxkw3_262",Se="_statusMonitorRow_jxkw3_279",Ee="_signalWaveform_jxkw3_288",Te="_waveBar_jxkw3_296",Re="_centerReticle_jxkw3_307",ke="_reticleSvg_jxkw3_320",Ie="_reticleOuter_jxkw3_325",Ae="_reticleInner_jxkw3_334",Ce="_crosshair_jxkw3_341",Me="_reticleArc_jxkw3_346",_e="_bottomCoords_jxkw3_354",Le="_scrollHint_jxkw3_369",Ne="_scrollLine_jxkw3_382",Oe="_scrollDot_jxkw3_388",m={section:ne,nebulaGlow:ae,canvasContainer:oe,content:se,label:ie,title:le,titleVisible:ce,subtitle:de,subtitleVisible:ue,cta:pe,hudFrame:fe,cornerTL:xe,cornerTR:ge,cornerBL:me,cornerBR:he,telemetryLogs:be,logLine:ye,logBullet:ve,blinkCursor:we,rightStatus:je,statusMonitorRow:Se,signalWaveform:Ee,waveBar:Te,centerReticle:Re,reticleSvg:ke,reticleOuter:Ie,reticleInner:Ae,crosshair:Ce,reticleArc:Me,bottomCoords:_e,scrollHint:Le,scrollLine:Ne,scrollDot:Oe},D=(n=800,u="sine",a=.08,p=.05)=>{try{const o=window.AudioContext||window.webkitAudioContext;if(!o)return;const s=new o,i=s.createOscillator(),c=s.createGain();i.type=u,i.frequency.setValueAtTime(n,s.currentTime),c.gain.setValueAtTime(p,s.currentTime),c.gain.exponentialRampToValueAtTime(1e-5,s.currentTime+a),i.connect(c),c.connect(s.destination),i.start(),i.stop(s.currentTime+a)}catch{}};function P({radius:n,speed:u,color:a,offset:p=0}){const o=t.useRef(null);return L(s=>{const c=s.clock.getElapsedTime()*u+p;o.current&&(o.current.position.x=Math.cos(c)*n,o.current.position.y=Math.sin(c)*n)}),e.jsxs("mesh",{ref:o,children:[e.jsx("sphereGeometry",{args:[.05,8,8]}),e.jsx("meshBasicMaterial",{color:a,transparent:!0,opacity:.8,blending:C})]})}function Be(){const n=t.useRef(null),u=t.useRef(null),a=t.useRef(null),p=t.useRef(null),o=t.useRef(null),s=t.useRef(null),i=t.useRef(0);return t.useEffect(()=>{let c=null;const d=2200,h=b=>{c||(c=b);const v=Math.min((b-c)/d,1),g=1-Math.pow(1-v,4);i.current=g*1.15,v<1&&requestAnimationFrame(h)};requestAnimationFrame(h)},[]),L(()=>{n.current&&n.current.scale.setScalar(i.current)}),L(c=>{const d=c.clock.getElapsedTime();if(u.current&&(u.current.rotation.y=d*.05,u.current.rotation.x=d*.02),a.current&&(a.current.rotation.y=-d*.03,a.current.rotation.z=d*.01),p.current&&(p.current.rotation.z=d*.12),o.current&&(o.current.rotation.z=-d*.08),s.current&&(s.current.rotation.z=d*.15),n.current){const h=c.pointer.y*.35,b=c.pointer.x*.35;n.current.rotation.x+=(h-n.current.rotation.x)*.05,n.current.rotation.y+=(b-n.current.rotation.y)*.05}}),e.jsxs("group",{ref:n,position:[0,-.4,-4.5],children:[e.jsxs("mesh",{ref:u,children:[e.jsx("icosahedronGeometry",{args:[2,2]}),e.jsx("meshBasicMaterial",{wireframe:!0,color:"#00ffff",transparent:!0,opacity:.14,blending:C})]}),e.jsxs("mesh",{ref:a,children:[e.jsx("icosahedronGeometry",{args:[2.02,1]}),e.jsx("meshBasicMaterial",{wireframe:!0,color:"#7de8e8",transparent:!0,opacity:.06,blending:C})]}),e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[1.9,32,32]}),e.jsx("meshBasicMaterial",{color:"#020412",transparent:!0,opacity:.45})]}),e.jsxs("group",{rotation:[Math.PI/2.2,0,0],children:[e.jsxs("mesh",{ref:p,children:[e.jsx("ringGeometry",{args:[2.55,2.57,64]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.25,side:z,blending:C})]}),e.jsx(P,{radius:2.56,speed:.3,color:"#00ffff"}),e.jsx(P,{radius:2.56,speed:.3,color:"#00ffff",offset:Math.PI})]}),e.jsxs("group",{rotation:[Math.PI/6,Math.PI/4,0],children:[e.jsxs("mesh",{ref:o,children:[e.jsx("ringGeometry",{args:[2.9,2.915,64]}),e.jsx("meshBasicMaterial",{color:"#9933ff",transparent:!0,opacity:.2,side:z,blending:C})]}),e.jsx(P,{radius:2.907,speed:-.25,color:"#9933ff"})]}),e.jsxs("group",{rotation:[-Math.PI/4,-Math.PI/5,0],children:[e.jsxs("mesh",{ref:s,children:[e.jsx("ringGeometry",{args:[3.25,3.26,64]}),e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0,opacity:.15,side:z,blending:C})]}),e.jsx(P,{radius:3.255,speed:.18,color:"#00ffff",offset:Math.PI/2})]})]})}function Pe(){const n=t.useRef(null),{positions:u,colors:a}=t.useMemo(()=>{const s=new Float32Array(4500),i=new Float32Array(1500*3),c=[new B("#7de8e8"),new B("#ffffff"),new B("#ffdfb4"),new B("#8a2be2")];for(let d=0;d<1500;d++){const h=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1),v=5+Math.random()*25;s[d*3]=v*Math.sin(b)*Math.cos(h),s[d*3+1]=v*Math.sin(b)*Math.sin(h),s[d*3+2]=v*Math.cos(b);const g=c[Math.floor(Math.random()*c.length)];i[d*3]=g.r,i[d*3+1]=g.g,i[d*3+2]=g.b}return{positions:s,colors:i}},[]),p=t.useMemo(()=>{const o=document.createElement("canvas");o.width=16,o.height=16;const s=o.getContext("2d"),i=s.createRadialGradient(8,8,0,8,8,8);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.3,"rgba(255,255,255,0.8)"),i.addColorStop(1,"rgba(255,255,255,0)"),s.fillStyle=i,s.fillRect(0,0,16,16);const c=new q(o);return c.needsUpdate=!0,c},[]);return L(o=>{n.current&&(n.current.rotation.y=o.clock.getElapsedTime()*.003,n.current.rotation.x=o.clock.getElapsedTime()*.001)}),e.jsxs("points",{ref:n,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",args:[u,3]}),e.jsx("bufferAttribute",{attach:"attributes-color",args:[a,3]})]}),e.jsx("pointsMaterial",{size:.14,vertexColors:!0,map:p,transparent:!0,opacity:.75,blending:C,depthWrite:!1})]})}function Fe(){const n=t.useRef(null);return L(u=>{if(n.current){const a=n.current.material;a.opacity=.03+Math.abs(Math.sin(u.clock.getElapsedTime()*1.2))*.04}}),e.jsx("gridHelper",{ref:n,args:[50,45,"#00ffff","rgba(0, 255, 255, 0.12)"],position:[0,-3.2,0]})}function ze(){const{camera:n}=K();return L(u=>{const a=u.pointer.x*2.5,p=u.pointer.y*1.8+.5;n.position.x+=(a-n.position.x)*.04,n.position.y+=(p-n.position.y)*.04,n.lookAt(0,0,-10)}),null}function De({text:n,delay:u=35,callback:a}){const[p,o]=t.useState(""),s=t.useRef(a);return t.useEffect(()=>{s.current=a},[a]),t.useEffect(()=>{let i=0,c="";o("");const d=setInterval(()=>{i<n.length?(c+=n.charAt(i),o(c),i++):(clearInterval(d),s.current&&s.current())},u);return()=>clearInterval(d)},[n,u]),e.jsx("span",{children:p})}function Ge(){const[n,u]=t.useState([]),a=t.useMemo(()=>["SYS-INIT: COGNITIVE ORBIT SECURE","FREQUENCY: AUDIO CAPABLE","TARGET: ERB-01 WORMHOLE CORRIDOR","HUD CALIBRATED: 100% ALIGNED","STATUS: READY FOR DEPARTURE"],[]),p=t.useMemo(()=>["PROPULSION SYSTEM: ACTIVE","THERMAL SHIELDS: NOMINAL","GRAVITY TENSOR: BALANCED [1.0G]","WARP COILS: STEADY STATE","REACTOR CORE: 104% STABLE","OXYGEN RATIO: 20.9% NORMAL","HULL INTEGRITY: 99.8%","RADAR SWEEP: CLEAR SECTOR","COGNITIVE DRIFT: 0.01% CORR","GRID REALIGNMENT: VERIFIED","NAV-COMPUTER: SYNCING COORDS","WARP BUFFER: CHARGING [87%]","COLLISION DETECTOR: SCANNING...","QUANTUM DECOHERENCE: 0.00%","GRAVITATIONAL WAVES: MINIMAL"],[]);return t.useEffect(()=>{let o=0,s;const i=()=>{if(o<a.length)u(c=>[...c,a[o]]),o++,s=setTimeout(i,900+Math.random()*500);else{const c=()=>{const d=p[Math.floor(Math.random()*p.length)];u(h=>[...h.length>=6?h.slice(1):h,d]),s=setTimeout(c,3e3+Math.random()*3e3)};s=setTimeout(c,4e3)}};return i(),()=>clearTimeout(s)},[a,p]),e.jsxs("div",{className:m.telemetryLogs,children:[n.map((o,s)=>e.jsxs("div",{className:m.logLine,children:[e.jsx("span",{className:m.logBullet,children:">"})," ",o]},s)),e.jsx("span",{className:m.blinkCursor,children:"_"})]})}function Ve(){const[n,u]=t.useState(!1),a=t.useRef(null),p=t.useRef(null),o=t.useRef(null),s=t.useRef(1482000320),i=t.useRef(28400),c=t.useRef({d:4,h:16,m:35,s:12});t.useEffect(()=>{const b=setInterval(()=>{s.current-=Math.floor(Math.random()*5+15),a.current&&(a.current.innerText=s.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))},200),v=setInterval(()=>{i.current=28400+Math.floor((Math.random()-.5)*12),p.current&&(p.current.innerText=i.current.toLocaleString())},800),g=setInterval(()=>{const x=c.current;let r=x.s+1,l=x.m,f=x.h,y=x.d;r>=60&&(r=0,l++),l>=60&&(l=0,f++),f>=24&&(f=0,y++),c.current={d:y,h:f,m:l,s:r},o.current&&(o.current.innerText=`T+ ${String(y).padStart(3,"0")}D:${String(f).padStart(2,"0")}H:${String(l).padStart(2,"0")}M:${String(r).padStart(2,"0")}S`)},1e3);return()=>{clearInterval(b),clearInterval(v),clearInterval(g)}},[]);const d=()=>{D(1200,"sine",.05,.02)},h=b=>{b.preventDefault(),D(880,"triangle",.25,.06),setTimeout(()=>D(1320,"sine",.4,.04),100),window.dispatchEvent(new CustomEvent("start-ambient-synth"));const v=document.getElementById("sun");v&&v.scrollIntoView({behavior:"smooth"})};return e.jsxs("section",{id:"hero",className:m.section,children:[e.jsx("div",{className:m.nebulaGlow}),e.jsx("div",{className:m.canvasContainer,children:e.jsx(W,{camera:{position:[0,.5,12],fov:45},children:e.jsxs(t.Suspense,{fallback:null,children:[e.jsx(Pe,{}),e.jsx(Be,{}),e.jsx(Fe,{}),e.jsx(ze,{})]})})}),e.jsx("div",{className:"film-grain"}),e.jsxs("div",{className:m.hudFrame,children:[e.jsx("div",{className:m.cornerTL}),e.jsx("div",{className:m.cornerTR}),e.jsx("div",{className:m.cornerBL}),e.jsx("div",{className:m.cornerBR})]}),e.jsx(Ge,{}),e.jsxs("div",{className:m.rightStatus,children:[e.jsxs("span",{children:["RANGE: ",e.jsx("span",{ref:a,children:s.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")})," KM"]}),e.jsxs("span",{children:["VELOCITY: ",e.jsx("span",{ref:p,children:i.current.toLocaleString()})," KM/H"]}),e.jsx("span",{children:"SECTOR: SOL-SYS"}),e.jsxs("div",{className:m.statusMonitorRow,children:[e.jsx("span",{className:m.blinkCursor,style:{color:"#00ffff"},children:"● MONITORING ACTIVE"}),e.jsx("div",{className:m.signalWaveform,children:[0,1,2,3,4].map(b=>e.jsx("div",{className:m.waveBar,style:{animationDelay:`${b*.15}s`}},b))})]})]}),e.jsx("div",{className:m.centerReticle,children:e.jsxs("svg",{viewBox:"0 0 100 100",className:m.reticleSvg,children:[e.jsx("circle",{cx:"50",cy:"50",r:"46",className:m.reticleOuter}),e.jsx("circle",{cx:"50",cy:"50",r:"32",className:m.reticleInner}),e.jsx("line",{x1:"50",y1:"36",x2:"50",y2:"42",className:m.crosshair}),e.jsx("line",{x1:"50",y1:"58",x2:"50",y2:"64",className:m.crosshair}),e.jsx("line",{x1:"36",y1:"50",x2:"42",y2:"50",className:m.crosshair}),e.jsx("line",{x1:"58",y1:"50",x2:"64",y2:"50",className:m.crosshair}),e.jsx("path",{d:"M 18 50 A 32 32 0 0 1 50 18",className:m.reticleArc}),e.jsx("path",{d:"M 82 50 A 32 32 0 0 1 50 82",className:m.reticleArc})]})}),e.jsxs("div",{className:m.content,children:[e.jsx("p",{className:m.label,children:e.jsx(De,{text:"mankind was born on earth. it was never meant to die here.",delay:30,callback:()=>u(!0)})}),e.jsxs("h1",{className:`${m.title} ${n?m.titleVisible:""}`,children:["Explore",e.jsx("br",{}),e.jsx("em",{children:"The Cosmos"})]}),e.jsx("p",{className:`${m.subtitle} ${n?m.subtitleVisible:""}`,style:{maxWidth:"600px",margin:"14px auto 0"},children:`"We've always defined ourselves by the ability to overcome the impossible. And we began to realize that these moments when we dare to aim higher... are our greatest achievements."`}),n&&e.jsx("a",{href:"#sun",onClick:h,onMouseEnter:d,className:m.cta,style:{marginTop:"28px"},children:"Begin Exploration"})]}),e.jsxs("div",{className:m.bottomCoords,children:[e.jsx("span",{children:"LAT. 34.0522° N / LONG. 118.2437° W"}),e.jsx("span",{style:{margin:"0 12px",opacity:.3},children:"|"}),e.jsx("span",{children:`GALACTIC POS: RA 17H 45M 40S / DEC -29°00'28"`}),e.jsx("span",{style:{margin:"0 12px",opacity:.3},children:"|"}),e.jsxs("span",{ref:o,style:{color:"#00ffff",textShadow:"0 0 8px rgba(0, 255, 255, 0.4)"},children:["T+ ",String(c.current.d).padStart(3,"0"),"D:",String(c.current.h).padStart(2,"0"),"H:",String(c.current.m).padStart(2,"0"),"M:",String(c.current.s).padStart(2,"0"),"S"]})]}),e.jsxs("div",{className:m.scrollHint,children:[e.jsx("div",{className:m.scrollLine}),e.jsx("div",{className:m.scrollDot})]})]})}const F=[{id:"sun",name:"SUN",subtitle:"The heart of our solar system. A nearly perfect sphere of hot plasma, accounting for 99.86% of the total mass.",color:"#FFA500",glowColor:"rgba(255,165,0,0.4)",bgGradient:`
      radial-gradient(ellipse at 70% 20%,
        rgba(255,165,0,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 80%,
        rgba(180,90,0,0.15) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 50%,
        rgba(25,12,0,1) 0%, rgba(8,3,0,1) 100%)
    `,tilt:.12,autoSpeed:.001,texturePath:"/textures/sun.jpg",stats:{diameter:"1,392,700 km",distance:"0 km (Center)",orbital:"230M years",moons:"8 Planets"}},{id:"mercury",name:"MERCURY",subtitle:"The smallest planet. Temperatures swing from -180°C to 430°C.",color:"#A89070",glowColor:"rgba(168,144,112,0.3)",bgGradient:`
      radial-gradient(ellipse at 70% 20%,
        rgba(255,160,40,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 80%,
        rgba(180,100,20,0.15) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%,
        rgba(15,8,2,1) 0%, rgba(4,2,0,1) 100%)
    `,tilt:.03,autoSpeed:.004,texturePath:"/textures/mercury.jpg",stats:{diameter:"4,879 km",distance:"57.9M km",orbital:"88 days",moons:"0"}},{id:"venus",name:"VENUS",subtitle:"The hottest planet. Thick atmosphere of CO₂ and sulfuric acid.",color:"#E8C47A",glowColor:"rgba(232,196,122,0.3)",bgGradient:`
      radial-gradient(ellipse at 65% 15%,
        rgba(220,170,0,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 35% 85%,
        rgba(160,90,0,0.18) 0%, transparent 45%),
      radial-gradient(ellipse at 20% 40%,
        rgba(100,40,0,0.12) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%,
        rgba(20,10,0,1) 0%, rgba(8,4,0,1) 100%)
    `,tilt:3.09,autoSpeed:2e-4,texturePath:"/textures/venus.jpg",stats:{diameter:"12,104 km",distance:"108.2M km",orbital:"225 days",moons:"0"}},{id:"earth",name:"EARTH",subtitle:"The only known planet with life. 71% water, 29% land.",color:"#4B9CD3",glowColor:"rgba(75,156,211,0.35)",bgGradient:`
      radial-gradient(ellipse at 75% 10%,
        rgba(0,100,255,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 25% 85%,
        rgba(0,180,80,0.18) 0%, transparent 45%),
      linear-gradient(135deg,
        rgba(0,200,100,0.05) 0%, transparent 40%,
        rgba(0,80,255,0.08) 100%),
      radial-gradient(ellipse at 50% 50%,
        rgba(0,6,22,1) 0%, rgba(0,2,12,1) 100%)
    `,tilt:.41,autoSpeed:.003,texturePath:"/textures/earth.jpg",stats:{diameter:"12,742 km",distance:"149.6M km",orbital:"365 days",moons:"1"}},{id:"mars",name:"MARS",subtitle:"The red planet. Home to Olympus Mons, the largest volcano.",color:"#C1440E",glowColor:"rgba(193,68,14,0.35)",bgGradient:`
      radial-gradient(ellipse at 65% 20%,
        rgba(220,60,0,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 35% 75%,
        rgba(160,30,0,0.2) 0%, transparent 45%),
      radial-gradient(ellipse at 85% 65%,
        rgba(180,80,20,0.12) 0%, transparent 35%),
      radial-gradient(ellipse at 50% 50%,
        rgba(22,4,0,1) 0%, rgba(8,2,0,1) 100%)
    `,tilt:.44,autoSpeed:.0028,texturePath:"/textures/mars.jpg",stats:{diameter:"6,779 km",distance:"227.9M km",orbital:"687 days",moons:"2"}},{id:"jupiter",name:"JUPITER",subtitle:"The giant. Could fit 1,300 Earths inside its mass.",color:"#C88B3A",glowColor:"rgba(200,139,58,0.3)",bgGradient:`
      radial-gradient(ellipse at 70% 15%,
        rgba(210,140,40,0.22) 0%, transparent 50%),
      radial-gradient(ellipse at 30% 80%,
        rgba(160,90,20,0.18) 0%, transparent 45%),
      linear-gradient(180deg,
        rgba(40,20,0,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 50% 50%,
        rgba(18,8,0,1) 0%, rgba(6,3,0,1) 100%)
    `,tilt:.05,autoSpeed:.008,texturePath:"/textures/jupiter.jpg",stats:{diameter:"139,820 km",distance:"778.5M km",orbital:"12 years",moons:"95"}},{id:"saturn",name:"SATURN",subtitle:"The crown jewel. Famous for its majestic icy ring system.",color:"#E4D191",glowColor:"rgba(228,209,145,0.3)",bgGradient:`
      radial-gradient(ellipse at 50% 60%,
        rgba(210,170,50,0.2) 0%, transparent 55%),
      radial-gradient(ellipse at 75% 20%,
        rgba(190,150,20,0.18) 0%, transparent 40%),
      radial-gradient(ellipse at 25% 75%,
        rgba(15,10,0,1) 0%, rgba(5,3,0,1) 100%)
    `,tilt:.47,autoSpeed:.006,texturePath:"/textures/saturn.jpg",stats:{diameter:"116,460 km",distance:"1.43B km",orbital:"29 years",moons:"146"}},{id:"uranus",name:"URANUS",subtitle:"The ice giant. Rotates on its side at 98° axial tilt.",color:"#7DE8E8",glowColor:"rgba(125,232,232,0.3)",bgGradient:`
      radial-gradient(ellipse at 65% 15%,
        rgba(0,210,230,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 35% 80%,
        rgba(0,160,190,0.18) 0%, transparent 45%),
      linear-gradient(135deg,
        rgba(0,40,60,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%,
        rgba(0,8,16,1) 0%, rgba(0,3,10,1) 100%)
    `,tilt:1.71,autoSpeed:.005,texturePath:"/textures/uranus.jpg",stats:{diameter:"50,724 km",distance:"2.87B km",orbital:"84 years",moons:"27"}},{id:"neptune",name:"NEPTUNE",subtitle:"The windiest planet. Winds reach 2,100 km/h.",color:"#3F54BA",glowColor:"rgba(63,84,186,0.35)",bgGradient:`
      radial-gradient(ellipse at 60% 20%,
        rgba(30,70,255,0.25) 0%, transparent 50%),
      radial-gradient(ellipse at 40% 75%,
        rgba(70,0,200,0.2) 0%, transparent 45%),
      radial-gradient(ellipse at 85% 55%,
        rgba(0,50,220,0.15) 0%, transparent 35%),
      radial-gradient(ellipse at 50% 50%,
        rgba(0,4,22,1) 0%, rgba(0,1,12,1) 100%)
    `,tilt:.49,autoSpeed:.002,texturePath:"/textures/neptune.jpg",stats:{diameter:"49,244 km",distance:"4.50B km",orbital:"165 years",moons:"16"}},{id:"pluto",name:"PLUTO",subtitle:"The beloved dwarf planet. Composed of rock and ice with a heart-shaped nitrogen glacier.",color:"#C39B78",glowColor:"rgba(195,155,120,0.3)",bgGradient:`
      radial-gradient(ellipse at 65% 20%,
        rgba(150,110,80,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 35% 85%,
        rgba(100,70,50,0.15) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 50%,
        rgba(18,12,8,1) 0%, rgba(6,4,2,1) 100%)
    `,tilt:2.06,autoSpeed:8e-4,texturePath:"/textures/pluto.jpg",stats:{diameter:"2,376 km",distance:"5.91B km",orbital:"248 years",moons:"5"}}],_=["hero","sun","mercury","venus","earth","mars","asteroids","jupiter","saturn","wormhole","uranus","neptune","miller","galaxy","scale","black-holes","concept"];function He(){const n=t.useRef(0),u=t.useRef(0),a=t.useRef(!1),p=t.useCallback(()=>{for(const s of _){const i=document.getElementById(s);if(!i)continue;const c=i.getBoundingClientRect();if(c.top>=-window.innerHeight*.5&&c.top<=window.innerHeight*.5)return s}return _[0]},[]),o=t.useCallback(s=>{const i=p(),c=_.indexOf(i),d=s==="next"?_[Math.min(c+1,_.length-1)]:_[Math.max(c-1,0)];"vibrate"in navigator&&navigator.vibrate(10),document.getElementById(d)?.scrollIntoView({behavior:"smooth"})},[p]);t.useEffect(()=>{const s=d=>{d.target.tagName!=="CANVAS"&&(n.current=d.touches[0].clientY,u.current=d.touches[0].clientX,a.current=!0)},i=d=>{if(!a.current)return;const h=n.current-d.changedTouches[0].clientY,b=u.current-d.changedTouches[0].clientX;Math.abs(h)>Math.abs(b)&&Math.abs(h)>60&&o(h>0?"next":"prev"),a.current=!1},c=d=>{(d.key==="ArrowDown"||d.key==="ArrowRight")&&o("next"),(d.key==="ArrowUp"||d.key==="ArrowLeft")&&o("prev")};return window.addEventListener("touchstart",s,{passive:!0}),window.addEventListener("touchend",i,{passive:!0}),window.addEventListener("keydown",c),()=>{window.removeEventListener("touchstart",s),window.removeEventListener("touchend",i),window.removeEventListener("keydown",c)}},[o])}const Ue=t.lazy(()=>I(()=>import("./Planet-DztSAwEK.js"),__vite__mapDeps([0,1,2,3,4,5]))),Ye=t.lazy(()=>I(()=>import("./AsteroidBelt-DG3eBsLT.js"),__vite__mapDeps([6,4,1,3,2,7,8]))),$e=t.lazy(()=>I(()=>import("./Wormhole-CypHLvOP.js"),__vite__mapDeps([9,1,2,3,4,10]))),We=t.lazy(()=>I(()=>import("./Miller-DXEeQhXb.js"),__vite__mapDeps([11,1,2,3,4,12]))),Ke=t.lazy(()=>I(()=>import("./Galaxy-CdKtRfoa.js"),__vite__mapDeps([13,1,4,3,2,7,14]))),Xe=t.lazy(()=>I(()=>import("./ScaleComparison-Btwlopyo.js"),__vite__mapDeps([15,1,2,3,4,16]))),qe=t.lazy(()=>I(()=>import("./BlackHole-C8UiYwk3.js"),__vite__mapDeps([17,1,2,3,4,18]))),Je=t.lazy(()=>I(()=>import("./Concept-qL5j1itv.js"),__vite__mapDeps([19,1,2,3,20])));function k(){return e.jsx("section",{style:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#00000a",color:"rgba(255,255,255,0.1)",fontFamily:"var(--font-mono)",fontSize:"0.65rem",letterSpacing:"0.25em"},children:"LOADING SECTOR..."})}function Qe(){return He(),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(J,{}),e.jsx(Q,{}),e.jsx(ee,{}),e.jsx(te,{}),e.jsx(re,{}),e.jsxs("main",{style:{overscrollBehavior:"none"},children:[e.jsx(Ve,{}),F.map((n,u)=>{const a=[];return n.id==="jupiter"&&a.push(e.jsx(t.Suspense,{fallback:e.jsx(k,{}),children:e.jsx(Ye,{})},"asteroid-belt-section")),a.push(e.jsx(t.Suspense,{fallback:e.jsx(k,{}),children:e.jsx(Ue,{planet:n,prev:u>0?F[u-1].id:void 0,next:u<F.length-1?F[u+1].id:void 0})},n.id)),n.id==="saturn"&&a.push(e.jsx(t.Suspense,{fallback:e.jsx(k,{}),children:e.jsx($e,{})},"wormhole-section")),n.id==="neptune"&&a.push(e.jsx(t.Suspense,{fallback:e.jsx(k,{}),children:e.jsx(We,{})},"miller-section")),a}),e.jsx(t.Suspense,{fallback:e.jsx(k,{}),children:e.jsx(Ke,{})}),e.jsx(t.Suspense,{fallback:e.jsx(k,{}),children:e.jsx(Xe,{})}),e.jsx(t.Suspense,{fallback:e.jsx(k,{}),children:e.jsx(qe,{})}),e.jsx(t.Suspense,{fallback:e.jsx(k,{}),children:e.jsx(Je,{})})]})]})}Y.createRoot(document.getElementById("root")).render(e.jsx(t.StrictMode,{children:e.jsx(Qe,{})}));
