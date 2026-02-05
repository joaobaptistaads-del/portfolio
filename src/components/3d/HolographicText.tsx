'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicTextProps {
  text: string;
  position?: [number, number, number];
  size?: number;
}

export function HolographicText({ text, position = [0, 0, 0], size = 1 }: HolographicTextProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Animação de rotação suave
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Efeito de "respiração" no material
      const material = meshRef.current.material as any;
      if (material.opacity !== undefined) {
        material.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <Text3D
        ref={meshRef}
        font="/fonts/helvetiker_bold.typeface.json"
        size={size}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={position}
      >
        {text}
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
          chromaticAberration={0.5}
          anisotropy={0.5}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.2}
          color="#3b82f6"
        />
      </Text3D>
    </Float>
  );
}

export function HolographicTitle({ children }: { children: string }) {
  return (
    <group>
      {children.split('').map((char, i) => (
        <HolographicText
          key={i}
          text={char}
          position={[i * 0.8 - (children.length * 0.8) / 2, 0, 0]}
          size={1.2}
        />
      ))}
    </group>
  );
}
