'use client';

import { motion } from 'framer-motion';

const FadeInWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWrapper;
