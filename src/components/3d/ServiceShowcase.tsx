"use client";

import { Canvas } from "@react-three/fiber";
import { Float, RoundedBox, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function ServiceCard({
  position,
  color,
  rotation,
  scale,
}: {
  position: [number, number, number];
  color: string;
  rotation?: [number, number, number];
  scale?: number;
}) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
      <RoundedBox
        args={[2.8, 1.6, 0.2]}
        radius={0.2}
        smoothness={6}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </RoundedBox>
    </Float>
  );
}

function ShowcaseScene() {
  return (
    <group>
      <ServiceCard position={[-1.2, 0.6, 0]} color="#3B82F6" rotation={[0.1, 0.3, 0]} />
      <ServiceCard position={[1.2, -0.4, -0.4]} color="#8B5CF6" rotation={[-0.1, -0.4, 0.1]} />
      <ServiceCard position={[0.2, -1.4, 0.3]} color="#EC4899" rotation={[0.2, 0.1, -0.2]} scale={0.9} />
    </group>
  );
}

export default function ServiceShowcase3D() {
  return (
    <div className="w-full h-[420px] md:h-[520px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#120A20"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} color={new THREE.Color("#a78bfa")} />
        <directionalLight position={[-4, -3, 2]} intensity={0.6} color={new THREE.Color("#60a5fa")} />
        <ShowcaseScene />
        <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={10} blur={2.5} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
