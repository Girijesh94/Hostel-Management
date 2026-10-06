import { useEffect, useRef, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function Atmosphere() {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let inView = false;
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(query.matches); setActive(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    if (host.current) observer.observe(host.current);
    document.addEventListener('visibilitychange', update);
    query.addEventListener('change', update);
    update();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); query.removeEventListener('change', update); };
  }, []);
  return <div ref={host} style={{ position:'absolute', inset:0 }}>
    {active && <ShaderGradientCanvas pixelDensity={1} style={{position:'absolute',inset:0}}>
      <ShaderGradient control="props" type="plane" color1="#38202c" color2="#794854" color3="#aa7964" lightType="3d" animate={reduced ? 'off' : 'on'} uSpeed={.12} uStrength={2} uFrequency={3} uDensity={1.2} cDistance={4.5} cPolarAngle={95} cAzimuthAngle={180} brightness={.8} grain="off" />
    </ShaderGradientCanvas>}
  </div>;
}


