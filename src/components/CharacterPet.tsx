import { motion, useMotionValue, animate, type AnimationPlaybackControls } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export interface CharacterPetProps {
  isCuteMode: boolean;
  isActive: boolean;
}

export const CharacterPet = ({ isCuteMode, isActive }: CharacterPetProps) => {
  const [frame, setFrame] = useState(0);
  const [scaleX, setScaleX] = useState(1); // Control manual del giro
  const x = useMotionValue(0);
  
  const targetRef = useRef(600); 
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (isActive ? (prev >= 7 ? 0 : prev + 1) : (prev >= 2 ? 0 : prev + 1)));
    }, isActive ? 100 : 250);
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      // Si estamos en un extremo, cambiamos el giro ANTES de arrancar
      if (targetRef.current === 600) setScaleX(1);
      if (targetRef.current === 0) setScaleX(-1);

      animationRef.current = animate(x, targetRef.current, {
        duration: (Math.abs(targetRef.current - x.get()) / 75),
        ease: "linear",
        onComplete: () => {
          // Cambiar dirección y giro al terminar el trayecto
          targetRef.current = targetRef.current === 600 ? 0 : 600;
          setScaleX(targetRef.current === 600 ? 1 : -1);
          
          // Continuar con el siguiente tramo
          animationRef.current = animate(x, targetRef.current, {
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          });
        }
      });
    } else {
      if (animationRef.current) animationRef.current.stop();
    }
    return () => { if (animationRef.current) animationRef.current.stop(); };
  }, [isActive, x]);

  return (
    <div className="relative w-full max-w-2xl h-24 mt-4 overflow-hidden border-t-2 border-dashed border-gray-200">
      <motion.div
        className="absolute bottom-0 w-16 h-16"
        style={{ x, scaleX }} 
      >
        <img
          src={`/Bunny/Bunny_${frame + 1}.png`}
          className={`w-16 h-16 object-contain pixelated ${isActive ? 'block' : 'hidden'} ${isCuteMode ? "" : "grayscale"}`}
        />
        <img
          src={`/bunnyStop/Bunny_stop_${(frame % 3) + 1}.png`}
          className={`w-16 h-16 object-contain pixelated ${!isActive ? 'block' : 'hidden'} ${isCuteMode ? "" : "grayscale"}`}
        />
      </motion.div>
    </div>
  );
};