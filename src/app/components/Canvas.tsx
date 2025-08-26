"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload, useProgress } from "@react-three/drei";
import { Avatar } from "./Avatar";
// import ReactMemoAvatar from "./AvatarMemo";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

const CanvasScene = () => {
  return (
    <Canvas
      frameloop="always"
      shadows={true}
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25, zoom: 1.2 }}
      gl={{ preserveDrawingBuffer: true, powerPreference: "high-performance" }}
      className="w-full h-full"
    >
      <Suspense fallback={<Html center>Loading...</Html>}>
        <hemisphereLight intensity={1.5} groundColor="#222" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[0, 10, 10]}
          intensity={2.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0005}
        />
        <spotLight
          position={[0, 5, 2]}
          angle={0.3}
          penumbra={0.8}
          intensity={2}
          castShadow
          shadow-mapSize={1024}
        />
        {/* Floor plane */}
        <mesh receiveShadow position={[0, -3.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6, 6]} />
          <meshStandardMaterial color="#444" />
        </mesh>

        <Avatar
          position={[0, -3.7, 0]}
          scale={3.2}
          rotation={[0, Math.PI / 2.2, 0]}
          castShadow
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default CanvasScene;
