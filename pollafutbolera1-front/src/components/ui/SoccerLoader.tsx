'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SoccerLoader() {
  const ballRef = useRef<HTMLImageElement>(null);

  const randomHeight = () => `${Math.floor(Math.random() * 30) + 10}%`;

  useEffect(() => {
    const el = ballRef.current;
    if (!el) return;

    el.style.setProperty('--bounce-height', randomHeight());

    const onIteration = () => {
      el.style.setProperty('--bounce-height', randomHeight());
    };
    el.addEventListener('animationiteration', onIteration);
    return () => el.removeEventListener('animationiteration', onIteration);
  }, []);

  const [dots, setDots] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setDots(d => (d + 1) % 4);
    }, 500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <style>{`
        .loader-soccer-img {
          width: 80px;         /* puedes ajustar esto a lo que necesites */
          height: auto;        /* mantiene la proporción original */
          animation: bounce 1s infinite ease-in-out;
          animation-timing-function: cubic-bezier(0.5, 0, 1, 1);
          transform: translateY(0);
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(var(--bounce-height, 20%));
          }
        }
      `}</style>
      <img
        ref={ballRef}
        src="/pollas/loading-chicken.png"
        alt="Cargando"
        className="loader-soccer-img"
      />
      <p className="mt-10 text-gray-600 text-lg font-bold">
        Cargando{'.'.repeat(dots)}
      </p>
    </div>
  );
}
