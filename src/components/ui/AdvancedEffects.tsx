'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function ParallaxSection({ children, speed = 0.5, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

export function FloatingElement({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -20, 0],
        rotateZ: [-2, 2, -2],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Particle3D({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ${className}`}
      animate={{
        y: [0, -100, 0],
        x: [0, Math.random() * 50 - 25, 0],
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * 2,
      }}
    />
  );
}

export function GlassPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl ${className}`}
      whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

export function AdvancedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[150px]"
        animate={{
          x: [-200, 200, -200],
          y: [-100, 100, -100],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ left: '10%', top: '20%' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px]"
        animate={{
          x: [200, -200, 200],
          y: [100, -100, 100],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ right: '10%', bottom: '20%' }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-pink-500/15 rounded-full blur-[150px]"
        animate={{
          x: [0, 150, -150, 0],
          y: [0, -150, 150, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      />
      {/* Particles */}
      {[...Array(15)].map((_, i) => (
        <Particle3D key={i} className={`left-[${Math.random() * 100}%] top-[${Math.random() * 100}%]`} />
      ))}
    </div>
  );
}
