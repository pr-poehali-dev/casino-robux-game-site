import { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

export default function Confetti({ active }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colors = ['#D4AF37', '#FFD700', '#FFA500', '#FF6347', '#9b87f5', '#FF1493'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [active]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-fade-in"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animation: `fall-${particle.id} 4s ease-out forwards`,
            boxShadow: `0 0 10px ${particle.color}`
          }}
        >
          <style>
            {`
              @keyframes fall-${particle.id} {
                0% {
                  transform: translateY(0) translateX(0) rotate(${particle.rotation}deg);
                  opacity: 1;
                }
                100% {
                  transform: translateY(${100 + particle.velocityY * 20}vh) translateX(${particle.velocityX * 10}vw) rotate(${particle.rotation + particle.rotationSpeed * 360}deg);
                  opacity: 0;
                }
              }
            `}
          </style>
        </div>
      ))}
    </div>
  );
}
