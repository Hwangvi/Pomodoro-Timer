import { motion, useMotionValue, animate, type AnimationPlaybackControls } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { THEMES, type ThemeKey } from '../constants';

const ANIMATION_DURATION_IDLE = 8;
const CONTAINER_WIDTH = 600;
const FRAME_RATE_ACTIVE = 100;
const FRAME_RATE_IDLE = 250;

interface CharacterPetProps {
  theme: ThemeKey;
  isActive: boolean;
}

export const CharacterPet = ({ theme, isActive }: CharacterPetProps) => {
  const [frame, setFrame] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const x = useMotionValue(0);
  
  const targetRef = useRef(CONTAINER_WIDTH); 
  const animationRef = useRef<AnimationPlaybackControls | null>(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (isActive ? (prev >= 7 ? 0 : prev + 1) : (prev >= 2 ? 0 : prev + 1)));
    }, isActive ? FRAME_RATE_ACTIVE : FRAME_RATE_IDLE);
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      if (targetRef.current === CONTAINER_WIDTH) setScaleX(1);
      if (targetRef.current === 0) setScaleX(-1);

      animationRef.current = animate(x, targetRef.current, {
        duration: (Math.abs(targetRef.current - x.get()) / 75),
        ease: "linear",
        onComplete: () => {
          targetRef.current = targetRef.current === CONTAINER_WIDTH ? 0 : CONTAINER_WIDTH;
          setScaleX(targetRef.current === CONTAINER_WIDTH ? 1 : -1);
          animationRef.current = animate(x, targetRef.current, {
            duration: ANIMATION_DURATION_IDLE,
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

  const FILTERS: Record<ThemeKey, string> = {
    NEUTRAL: "",
    WARM: "sepia(1) saturate(1.5) brightness(0.7) hue-rotate(340deg)",
    DEEP: "grayscale(100%)",
    OCEAN: "hue-rotate(180deg) saturate(1.5)"
  };

  const currentFilter = FILTERS[theme];
  const config = THEMES[theme];

  return (
    <div className={`relative w-full max-w-2xl h-24 mt-4 overflow-hidden border-t-2 border-dashed ${config.border}`}>
      <motion.div className="absolute bottom-0 w-16 h-16" style={{ x, scaleX }}>
        <img 
          src={`/WalkingRobot/Walk_${frame + 1}.png`} 
          className={`w-16 h-16 object-contain pixelated ${isActive ? 'block' : 'hidden'}`}
          style={{ filter: currentFilter }}
          alt="Robot caminando"
        />
        <img 
          src={`/RobotStop/Idle.png`} 
          className={`w-16 h-16 object-contain pixelated ${!isActive ? 'block' : 'hidden'}`}
          style={{ filter: currentFilter }}
          alt="Robot en espera"
        />
      </motion.div>
    </div>
  );
};