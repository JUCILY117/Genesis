'use client'; // Ensures this is client-side only

import { motion } from 'framer-motion';

const FadeInWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,          // Start with opacity 0 (invisible)
        y: 50,               // Start 50px below its final position
        scale: 0.8,          // Start slightly smaller for the "elastic" effect
      }}
      animate={{
        opacity: 1,          // Fade to full opacity
        y: 0,                // Move to its final position
        scale: 1,            // Scale up to its normal size
      }}
      exit={{
        opacity: 0,          // Fade out
        y: 50,               // Slide out 50px down for smooth exit
        scale: 0.8,          // Scale down slightly during exit
      }}
      transition={{
        type: 'spring',      // Spring transition to add a "snap"
        stiffness: 300,      // Makes the movement a bit snappy
        damping: 20,         // Reduces the oscillation, creating a smooth effect
        duration: 1,         // 1-second duration for smoothness
        ease: 'easeOut',     // Smooth out the end of the transition
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWrapper;
