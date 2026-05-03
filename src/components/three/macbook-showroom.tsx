"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type MacbookShowroomProps = {
  progress: number;
};

type LaptopProps = {
  progress: number;
};

function Laptop({ progress }: LaptopProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);

  const materials = useMemo(
    () => ({
      aluminum: new THREE.MeshPhysicalMaterial({
        color: "#b8bcc6",
        metalness: 0.92,
        roughness: 0.24,
        reflectivity: 0.7,
        clearcoat: 0.6,
      }),
      keybed: new THREE.MeshStandardMaterial({
        color: "#111111",
        metalness: 0.2,
        roughness: 0.78,
      }),
      screen: new THREE.MeshPhysicalMaterial({
        color: "#0a0a0d",
        metalness: 0.1,
        roughness: 0.08,
        transmission: 0.04,
      }),
      glow: new THREE.MeshBasicMaterial({
        color: "#e8eefc",
      }),
    }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current || !screenRef.current) {
      return;
    }

    const t = state.clock.getElapsedTime();
    const normalized = Math.min(progress * 4, 1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.4 + normalized * 0.9 + Math.sin(t * 0.32) * 0.06,
      0.06,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.12 + Math.cos(t * 0.28) * 0.03,
      0.05,
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -0.15 + Math.sin(t * 0.8) * 0.05,
      0.06,
    );
    screenRef.current.rotation.x = THREE.MathUtils.lerp(
      screenRef.current.rotation.x,
      -1.95 + normalized * 0.78,
      0.08,
    );
  });

  return (
    <Float rotationIntensity={0.08} floatIntensity={0.4} speed={1.2}>
      <group ref={groupRef} position={[0, -0.1, 0]}>
        <mesh material={materials.aluminum} position={[0, -0.22, 0]}>
          <boxGeometry args={[2.85, 0.12, 1.92]} />
        </mesh>

        <mesh material={materials.keybed} position={[0, -0.14, 0.12]}>
          <boxGeometry args={[2.38, 0.02, 1.34]} />
        </mesh>

        <mesh material={materials.keybed} position={[0, -0.12, -0.58]}>
          <boxGeometry args={[0.82, 0.012, 0.32]} />
        </mesh>

        <mesh material={materials.aluminum} position={[0, -0.14, 0.62]}>
          <boxGeometry args={[0.72, 0.01, 0.28]} />
        </mesh>

        <group ref={screenRef} position={[0, -0.09, -0.92]}>
          <mesh material={materials.aluminum} position={[0, 0.86, -0.03]}>
            <boxGeometry args={[2.78, 1.72, 0.08]} />
          </mesh>
          <mesh material={materials.screen} position={[0, 0.86, 0.02]}>
            <boxGeometry args={[2.54, 1.5, 0.02]} />
          </mesh>
          <mesh material={materials.glow} position={[0, 0.86, 0.04]}>
            <planeGeometry args={[2.42, 1.4]} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Scene({ progress }: MacbookShowroomProps) {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 16]} />
      <ambientLight intensity={0.45} />
      <spotLight
        intensity={70}
        angle={0.34}
        penumbra={0.9}
        position={[3.5, 5.5, 4]}
        color="#f1f5ff"
        castShadow
      />
      <spotLight
        intensity={38}
        angle={0.42}
        penumbra={1}
        position={[-4, 2.5, -2.5]}
        color="#d9e0f0"
      />
      <pointLight intensity={8} position={[0, 0.5, 2.8]} color="#ffffff" />

      <Suspense fallback={null}>
        <Laptop progress={progress} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
          <circleGeometry args={[10, 64]} />
          <meshStandardMaterial color="#050505" metalness={0.55} roughness={0.22} />
        </mesh>
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.08, 0]}
          opacity={0.42}
          scale={7}
          blur={2}
          far={4.5}
          resolution={1024}
          color="#000000"
        />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate={false}
      />
    </>
  );
}

export function MacbookShowroom({ progress }: MacbookShowroomProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.75, 4.6], fov: 32 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Scene progress={progress} />
      </Canvas>
    </div>
  );
}
