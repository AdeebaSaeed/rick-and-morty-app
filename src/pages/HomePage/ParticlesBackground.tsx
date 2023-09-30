import { useEffect, useState } from 'react';
import './ParticlesBackground.css'

// Define the Particle type
interface Particle {
  x: number;
  y: number;
}

const ParticlesBackground = () => {
  // Provide an initial state with the correct type
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticle = () => {
      const particle: Particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      };
      setParticles((prevParticles) => [...prevParticles, particle]);
    };

    const intervalId = setInterval(createParticle, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="particles-background">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="particle"
          style={{ top: `${particle.y}px`, left: `${particle.x}px` }}
        ></div>
      ))}
    </div>
  );
};

export default ParticlesBackground;



