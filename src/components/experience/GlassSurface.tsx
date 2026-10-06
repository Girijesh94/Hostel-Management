import { useEffect, useRef } from 'react';
import Container from '../../vendor/liquid-glass/container';

export default function GlassSurface() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    // Only an authored decorative texture is sampled; app content is never captured.
    const snapshot = document.createElement('canvas');
    snapshot.width = 1024; snapshot.height = 768;
    const context = snapshot.getContext('2d');
    if (!context) return;
    const gradient = context.createLinearGradient(0,0,1024,768);
    gradient.addColorStop(0,'#775462'); gradient.addColorStop(.45,'#c49c81'); gradient.addColorStop(1,'#45353c');
    context.fillStyle = gradient; context.fillRect(0,0,1024,768);
    const glass = new Container({ snapshot, borderRadius:10, tintOpacity:.08 });
    element.appendChild(glass.element);
    const resize = new ResizeObserver(() => { glass.updateSizeFromDOM(); });
    resize.observe(element);
    glass.updateSizeFromDOM();
    return () => { resize.disconnect(); glass.dispose(); };
  }, []);
  return <div ref={host} className="glass-surface" aria-hidden="true" />;
}

