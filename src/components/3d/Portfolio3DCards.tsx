'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

interface Card3DProps {
  position: [number, number, number];
  rotation: [number, number, number];
  isFlipped: boolean;
  onClick: () => void;
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
}

function AnimatedCard3D({ position, rotation, isFlipped, onClick, frontContent, backContent }: Card3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && !isFlipped) {
      // Hover effect
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime) * 0.05;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation}
      onClick={onClick}
    >
      <group
        rotation={[0, isFlipped ? Math.PI : 0, 0]}
      >
        {/* Front */}
        <RoundedBox args={[2, 2.5, 0.1]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.8}
            roughness={0.2}
            emissive="#3b82f6"
            emissiveIntensity={0.2}
          />
        </RoundedBox>

        {/* Back */}
        <RoundedBox args={[2, 2.5, 0.1]} radius={0.05} smoothness={4} position={[0, 0, -0.1]}>
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.8}
            roughness={0.2}
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
            side={THREE.BackSide}
          />
        </RoundedBox>
      </group>
    </group>
  );
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
}

interface Portfolio3DCardsProps {
  projects: Project[];
}

export default function Portfolio3DCards({ projects }: Portfolio3DCardsProps) {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardClick = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="relative h-[400px] perspective-1000"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {/* 3D Card Container */}
          <motion.div
            className="relative w-full h-full preserve-3d"
            animate={{ rotateY: flippedCards.has(project.id) ? 180 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onClick={() => handleCardClick(project.id)}
            style={{ transformStyle: 'preserve-3d', cursor: 'pointer' }}
          >
            {/* Front Face */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="relative w-full h-full backdrop-blur-xl bg-gradient-to-br from-slate-900/90 via-blue-900/50 to-purple-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group">
                {/* Shader-like animated gradient */}
                <div className="absolute inset-0 opacity-50">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.3) 100%)',
                        'linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(139,92,246,0.3) 100%)',
                        'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.3) 50%, rgba(59,130,246,0.3) 100%)',
                      ],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Flip indicator */}
                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-purple-500/30 border border-purple-400/50 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 180 }}
                    >
                      <span className="text-white text-sm">↻</span>
                    </motion.div>
                  </div>
                </div>

                {/* Holographic lines */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </div>

            {/* Back Face */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="relative w-full h-full backdrop-blur-xl bg-gradient-to-br from-purple-900/90 via-pink-900/50 to-blue-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 80%, rgba(236,72,153,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 20%, rgba(139,92,246,0.4) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                      Detalhes do Projeto
                    </h3>

                    <p className="text-white/80 text-sm">
                      {project.description}
                    </p>

                    {/* Full tech stack */}
                    <div className="space-y-2">
                      <p className="text-white/70 text-xs uppercase tracking-wider">Tecnologias</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-medium rounded-md bg-purple-500/30 text-purple-200 border border-purple-400/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 text-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver Projeto →
                    </a>
                    
                    <button
                      onClick={() => handleCardClick(project.id)}
                      className="w-full py-2 text-center rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition-all"
                    >
                      Voltar
                    </button>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-pink-400/50" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-blue-400/50" />
              </div>
            </div>
          </motion.div>

          {/* Glow effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity -z-10"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </div>
  );
}
