/* eslint-disable react/prop-types */
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Backpack } from "../Backpack/Backpack";
import { OrbitControls, Stage } from "@react-three/drei";

function CanvasComponent({setMesh}) {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          zIndex: "0",
        }}
      >
        <Stage adjustCamera={2}>
          <Backpack setMesh={setMesh}/>
        </Stage>
        <OrbitControls/>
      </Canvas>
    </>
  );
}

export default CanvasComponent;
