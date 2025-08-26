"use client";

import React, { Suspense } from "react";
import {
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { Avatar } from "./Avatar";

// Komponen loader yang sudah diperbaiki
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

export default Computer;
