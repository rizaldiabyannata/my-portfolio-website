"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html, useProgress } from "@react-three/drei";

// Komponen loader yang sudah diperbaiki
const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as='div'
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span className='canvas-loader'></span>
      <p
        style={{
          fontSize: 14,
          color: '#F1F1F1',
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

// Komponen model 3D komputer (tidak ada perubahan)
const Computer = () => {
  const { scene } = useGLTF("/model/gaming_desktop_pc-transformed.glb");

  return (
    <primitive
      object={scene}
      scale={0.4}
      position={[0, -1, -1.5]}
      rotation={[-0.01, -0.2, -0.1]}
    />
  );
};

// Komponen canvas utama
const ComputerCanvas = () => {
  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 5, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ width: '45vw', height: '100vh' }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Kontrol kamera ditambahkan di sini */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        {/* Lights dan Model */}
        <hemisphereLight intensity={2} groundColor='black' />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight intensity={2} />
        <Computer />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;