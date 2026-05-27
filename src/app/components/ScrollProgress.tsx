import { motion, useScroll } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-blue-400 to-purple-500 origin-left z-[200]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
