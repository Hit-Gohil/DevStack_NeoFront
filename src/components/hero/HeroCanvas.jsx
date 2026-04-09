import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSelector } from 'react-redux';

// Particle system component
const Particles = ({ count = 1500, color }) => {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      scales[i] = Math.random();
    }

    return { positions, scales };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.05;
      mesh.current.rotation.x = Math.sin(time * 0.03) * 0.2;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Floating geometry
const FloatingGeometry = ({ color }) => {
  const meshRef = useRef();
  const { viewport, pointer } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1 + pointer.y * 0.2;
      meshRef.current.rotation.y = time * 0.15 + pointer.x * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1.8, 1]} scale={1}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.3}
        />
      </Icosahedron>
    </Float>
  );
};

// Inner glow sphere
const GlowSphere = ({ color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.05}
      />
    </mesh>
  );
};

// Orbital rings
const OrbitalRing = ({ color, radius = 2.5, rotationSpeed = 0.2 }) => {
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = time * rotationSpeed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
};

const HeroCanvas = () => {
  const { accentColor } = useSelector((state) => state.theme);

  // Map accent class to hex color
  const colorMap = {
    'accent-indigo': '#6366f1',
    'accent-violet': '#8b5cf6',
    'accent-cyan': '#06b6d4',
    'accent-emerald': '#10b981',
    'accent-rose': '#f43f5e',
    'accent-amber': '#f59e0b',
    'accent-blue': '#3b82f6',
    'accent-fuchsia': '#d946ef',
  };

  const color = colorMap[accentColor] || '#6366f1';

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color={color} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color={color} />

        <FloatingGeometry color={color} />
        <GlowSphere color={color} />
        <Particles count={1200} color={color} />
        <OrbitalRing color={color} radius={2.8} rotationSpeed={0.15} />
        <OrbitalRing color={color} radius={3.5} rotationSpeed={-0.1} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
