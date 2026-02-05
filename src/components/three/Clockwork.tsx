"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Gear({
  position,
  radius,
  thickness,
  teeth,
  rotation: initialRotation,
  speed,
}: {
  position: [number, number, number];
  radius: number;
  thickness: number;
  teeth: number;
  rotation: [number, number, number];
  speed: number;
}) {
  const gearRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (gearRef.current) {
      gearRef.current.rotation.z += speed;
    }
  });

  // Create gear geometry
  const toothHeight = radius * 0.2;
  const toothDepth = radius * 0.3;

  return (
    <group ref={gearRef} position={position} rotation={initialRotation}>
      {/* Main gear body */}
      <mesh>
        <cylinderGeometry args={[radius, radius, thickness, 32]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Teeth */}
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i / teeth) * Math.PI * 2;
        const x = Math.cos(angle) * radius * 1.2;
        const y = Math.sin(angle) * radius * 1.2;

        return (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[radius * 0.3, toothHeight, thickness * 0.8]} />
            <meshStandardMaterial color="#ff6b35" metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Center hub */}
      <mesh position={[0, 0, thickness / 2 + 0.1]}>
        <cylinderGeometry args={[radius * 0.3, radius * 0.3, thickness * 1.2, 32]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function ClockworkScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#4a90e2" />

      {/* Gears arrangement */}
      <Gear position={[-5, 0, 0]} radius={2} thickness={0.5} teeth={20} rotation={[0, 0, 0]} speed={0.01} />
      <Gear position={[5, 0, 0]} radius={1.5} thickness={0.5} teeth={15} rotation={[0, 0, 0]} speed={-0.013} />
      <Gear position={[0, 5, 0]} radius={1.8} thickness={0.5} teeth={18} rotation={[0, 0, 0]} speed={0.012} />
      <Gear position={[0, -5, 0]} radius={1.5} thickness={0.5} teeth={15} rotation={[0, 0, 0]} speed={-0.011} />
      <Gear position={[3, 3, 0]} radius={1.2} thickness={0.5} teeth={12} rotation={[0, 0, 0]} speed={0.015} />
      <Gear position={[-3, -3, 0]} radius={1.2} thickness={0.5} teeth={12} rotation={[0, 0, 0]} speed={-0.015} />

      {/* Background gradient */}
      <fog attach="fog" args={["#0a0a0a", 5, 30]} />
    </>
  );
}

export function ClockworkBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas className="!w-full !h-full">
        <color attach="background" args={["#0a0a0a"]} />
        <ClockworkScene />
      </Canvas>
    </div>
  );
}
