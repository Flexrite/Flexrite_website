import { useEffect, useLayoutEffect, useRef } from "react";
import "../text-3d.css";

export function Text3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      const cw = container.clientWidth;
      const tw = text.scrollWidth;
      if (tw === 0 || cw === 0) return;
      const padding = Math.max(16, cw * 0.06);
      const scale = Math.min(1, (cw - padding) / tw);
      text.style.setProperty("--scale", String(scale));
    };

    const ro = new ResizeObserver(() => requestAnimationFrame(fit));
    ro.observe(container);
    ro.observe(text);
    fit();

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const handler = () => {
      const text = textRef.current;
      if (!text) return;
      text.style.removeProperty("--scale");
      requestAnimationFrame(() => {
        const ev = new Event("resize");
        window.dispatchEvent(ev);
      });
    };
    window.addEventListener("orientationchange", handler);
    return () => window.removeEventListener("orientationchange", handler);
  }, []);

  return (
    <div ref={containerRef} className="text3d">
      <img
        src="/images/footertext.png"
        alt="Flexrite World"
        className="text3d__image"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '800px',
          margin: '0 auto',
          display: 'block'
        }}
      />
    </div>
  );
}
