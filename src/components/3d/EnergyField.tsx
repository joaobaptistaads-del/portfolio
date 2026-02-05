'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EnergyField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Criar grid de partículas
  const [positions, colors] = useMemo(() => {
    const positions = [];
    const colors = [];
    const gridSize = 50;
    const spacing = 0.5;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        positions.push(
          (i - gridSize / 2) * spacing,
          (j - gridSize / 2) * spacing,
          0
        );

        // Gradient de cores azul -> roxo -> rosa
        const hue = (i / gridSize) * 0.3 + 0.5; // 0.5-0.8 (azul a roxo)
        const color = new THREE.Color();
        color.setHSL(hue, 1, 0.6);
        colors.push(color.r, color.g, color.b);
      }
    }

    return [new Float32Array(positions), new Float32Array(colors)];
  }, []);

  // Shader personalizado para efeito de energia
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vIntensity;

        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Onda de energia que se propaga
          float wave = sin(length(pos.xy) * 0.5 - u_time * 2.0) * 0.3;
          pos.z += wave;
          
          // Reação ao mouse
          float dist = distance(pos.xy, u_mouse * 10.0);
          float repulsion = max(0.0, 1.0 - dist / 5.0);
          pos.z += repulsion * 2.0;
          
          vIntensity = wave + repulsion;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (3.0 + repulsion * 5.0) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vIntensity;

        void main() {
          // Ponto circular suave
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float alpha = smoothstep(0.5, 0.0, dist);
          
          // Intensidade baseada nas ondas e mouse
          float glow = abs(vIntensity) * 2.0;
          vec3 color = vColor * (1.0 + glow);
          
          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      shaderMaterial.uniforms.u_time.value = state.clock.elapsedTime;
      
      // Atualizar posição do mouse
      mousePos.current.x += (state.mouse.x - mousePos.current.x) * 0.05;
      mousePos.current.y += (state.mouse.y - mousePos.current.y) * 0.05;
      shaderMaterial.uniforms.u_mouse.value.set(mousePos.current.x, mousePos.current.y);
      
      // Rotação suave do campo
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}
