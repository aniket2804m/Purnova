import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999] w-64 h-64 rounded-full hidden md:block"
      style={{
        left: pos.x - 128,
        top: pos.y - 128,
        background: "radial-gradient(circle, hsl(239 84% 67% / 0.08) 0%, transparent 70%)",
      }}
    />
  );
};

export default CursorGlow;
