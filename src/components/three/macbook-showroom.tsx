"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

type MacbookShowroomProps = {
  progress: MotionValue<number>;
};

type LaptopProps = {
  progress: MotionValue<number>;
};

function Laptop({ progress }: LaptopProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

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

  useEffect(() => {
    const updatePose = (value: number) => {
      if (!groupRef.current || !screenRef.current) {
        return;
      }

      const normalized = Math.min(value * 4, 1);
      groupRef.current.rotation.y = -0.28 + normalized * 0.72;
      groupRef.current.rotation.x = 0.12;
      groupRef.current.position.y = -0.14 + normalized * 0.04;
      screenRef.current.rotation.x = -1.92 + normalized * 0.72;
      invalidate();
    };

    updatePose(progress.get());
    const unsubscribe = progress.on("change", updatePose);

    return () => {
      unsubscribe();
    };
  }, [invalidate, progress]);

  return (
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
  );
}

function Scene({ progress }: MacbookShowroomProps) {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 16]} />
      <ambientLight intensity={0.45} />
      <spotLight
        intensity={48}
        angle={0.34}
        penumbra={0.9}
        position={[3.5, 5.5, 4]}
        color="#f1f5ff"
      />
      <spotLight
        intensity={24}
        angle={0.42}
        penumbra={1}
        position={[-4, 2.5, -2.5]}
        color="#d9e0f0"
      />
      <pointLight intensity={5} position={[0, 0.5, 2.8]} color="#ffffff" />

      <Suspense fallback={null}>
        <Laptop progress={progress} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
          <circleGeometry args={[10, 64]} />
          <meshStandardMaterial color="#050505" metalness={0.55} roughness={0.22} />
        </mesh>
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.08, 0]}
          opacity={0.32}
          scale={6.2}
          blur={1.6}
          far={4.5}
          resolution={512}
          color="#000000"
        />
      </Suspense>
    </>
  );
}

export function MacbookShowroom({ progress }: MacbookShowroomProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.25]}
        frameloop="demand"
        camera={{ position: [0, 0.75, 4.6], fov: 32 }}
        gl={{ antialias: false, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Scene progress={progress} />
      </Canvas>
    </div>
  );
}
