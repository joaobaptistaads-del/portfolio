'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function LiquidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_intensity: { value: 0.3 },
      u_color1: { value: new THREE.Color('#3b82f6') },
      u_color2: { value: new THREE.Color('#8b5cf6') },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vWave;
    uniform float u_time;
    uniform float u_intensity;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Ondas líquidas
      float wave1 = sin(pos.x * 3.0 + u_time * 2.0) * u_intensity;
      float wave2 = sin(pos.y * 2.0 - u_time * 1.5) * u_intensity;
      pos.z += wave1 + wave2;
      
      vWave = wave1 + wave2;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vWave;
    uniform float u_time;
    uniform vec3 u_color1;
    uniform vec3 u_color2;

    void main() {
      // Gradiente animado baseado nas ondas
      vec3 color = mix(u_color1, u_color2, vUv.y + vWave * 0.5);
      
      // Efeito holográfico
      float hologram = sin(vUv.y * 20.0 - u_time * 5.0) * 0.1 + 0.9;
      color *= hologram;
      
      // Transparência nas bordas
      float alpha = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
      alpha *= smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
      
      gl_FragColor = vec4(color, alpha * 0.6);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[10, 10, 50, 50]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function LiquidTransition() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <LiquidPlane />
      </Canvas>
    </div>
  );
}
