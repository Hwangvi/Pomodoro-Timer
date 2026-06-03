import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const MikuPet = ({ isActive }: { isActive: boolean }) => {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev >= 8 ? 1 : prev + 1));
    }, isActive ? 100 : 250); 
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <motion.div 
      className="hidden md:flex flex-col items-center justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img 
        src={`/miku/miku_${frame}.png`} 
        alt="Miku" 
        className="w-64 h-64 object-contain pixelated"
      />
    </motion.div>
  );
};