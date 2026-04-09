"use client";

import { useEffect, useRef } from "react";

export default function FloatingLinesCanvas({
  linesGradient = ["#E945F5", "#2F4BC0", "#E945F5"],
  animationSpeed = 1,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 1080;
    canvas.height = 1080;

    const lines = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * animationSpeed,
      vy: (Math.random() - 0.5) * animationSpeed,
      color:
        linesGradient[Math.floor(Math.random() * linesGradient.length)],
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((l) => {
        l.x += l.vx;
        l.y += l.vy;

        if (l.x < 0 || l.x > canvas.width) l.vx *= -1;
        if (l.y < 0 || l.y > canvas.height) l.vy *= -1;

        ctx.beginPath();
        ctx.arc(l.x, l.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = l.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, [animationSpeed, linesGradient]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
    />
  );
}
