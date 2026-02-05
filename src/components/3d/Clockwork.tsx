"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface GearProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  direction?: number;
}

function Gear({ position, scale, speed, direction = 1 }: GearProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const toothCount = 20;
  const toothDepth = 0.2;

  // Create gear geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const radius = 1 * scale;
    const toothRadius = radius + toothDepth;

    for (let i = 0; i < toothCount; i++) {
      const angle1 = (i / toothCount) * Math.PI * 2;
      const angle2 = ((i + 0.4) / toothCount) * Math.PI * 2;
      const angle3 = ((i + 0.6) / toothCount) * Math.PI * 2;
      const angle4 = ((i + 1) / toothCount) * Math.PI * 2;

      const x1 = Math.cos(angle1) * radius;
      const y1 = Math.sin(angle1) * radius;
      const x2 = Math.cos(angle2) * toothRadius;
      const y2 = Math.sin(angle2) * toothRadius;
      const x3 = Math.cos(angle3) * toothRadius;
      const y3 = Math.sin(angle3) * toothRadius;
      const x4 = Math.cos(angle4) * radius;
      const y4 = Math.sin(angle4) * radius;

      if (i === 0) shape.moveTo(x1, y1);
      shape.lineTo(x2, y2);
      shape.lineTo(x3, y3);
      shape.lineTo(x4, y4);
    }

    const extrudeSettings = {
      depth: 0.3 * scale,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [scale]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += (speed * direction) / 100;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial
        color={Math.random() * 0xffffff}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export function ClockworkScene() {
  const gears = [
    { position: [0, 0, 0] as [number, number, number], scale: 1.5, speed: 2 },
    {
      position: [3, 0, 0] as [number, number, number],
      scale: 1,
      speed: 3,
      direction: -1,
    },
    {
      position: [-3, 0, 0] as [number, number, number],
      scale: 1.2,
      speed: 2.5,
    },
    {
      position: [0, 3, 0] as [number, number, number],
      scale: 0.8,
      speed: 4,
      direction: -1,
    },
    {
      position: [0, -3, 0] as [number, number, number],
      scale: 0.9,
      speed: 3.5,
    },
  ];

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#0099ff" />

      {gears.map((gear, idx) => (
        <Gear key={idx} {...gear} />
      ))}
    </Canvas>
  );
}

export default function ClockworkBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <ClockworkScene />
    </div>
  );
}
