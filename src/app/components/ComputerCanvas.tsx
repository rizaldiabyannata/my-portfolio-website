"use client";

import React from "react";
import {
  useGLTF,
} from "@react-three/drei";

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
