import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const FRAME_COUNT = 100;
const frameUrl = (index: number) =>
  `/fps-video/Man_working_on_laptop_20261008193108_frames/frame_${String(index + 1).padStart(3, '0')}.png`;

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    const render = (index: number) => {
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
      const img = images[clamped];
      if (img && img.complete && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      img.onload = () => {
        loadedCount++;
        if (i === 0) render(0); // Render first frame immediately
      };
      images.push(img);
    }

    const frameObj = { frame: 0 };

    const st = gsap.to(frameObj, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: () => render(frameObj.frame),
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div className="global-bg-visual" aria-hidden="true">
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="global-bg-canvas"
      />
    </div>
  );
}
