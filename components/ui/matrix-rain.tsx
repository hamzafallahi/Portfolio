"use client";

import { useEffect, useState } from "react";

export function MatrixRain() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="matrix-bg">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="matrix-column"
          style={{
            left: `${(i * 100) / 50}%`,
            animationDelay: `${(i * 0.1) % 2}s`,
            animationDuration: `${3 + (i % 2)}s`,
          }}
        />
      ))}
    </div>
  );
}