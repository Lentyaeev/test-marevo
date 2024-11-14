/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useSearchParams } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import Strap from "../Strap/Strap";
import { colors, metals } from "../../constants";

export function Backpack({setMesh}) {
  const { nodes, materials } = useGLTF("/backpack.glb");
  const meshRef = React.useRef();

  const [searchParams] = useSearchParams();
  let materialParam = "leather";

  React.useEffect(() => {
    if (meshRef.current) {
        setMesh(meshRef.current)
    }
  }, [meshRef.current])

  if (searchParams.get("material")) {
    materialParam = searchParams.get("material");
  }
  React.useEffect(() => {
    const colorParam = searchParams.get("body");
    const metalParam = searchParams.get("metal");
    if (colorParam) {
      const color = new THREE.Color(colorParam);
      const tl = gsap.timeline();
      tl.to(materials.body.color, {
        r: color.r,
        g: color.g,
        b: color.b,
        duration: 0.5,
      });
    } else {
      const color = new THREE.Color(colors[0].value);
      materials.body.color = color;
    }
    if (metalParam) {
      const color = new THREE.Color(metalParam);
      const tl = gsap.timeline();
      tl.to(materials.metall.color, {
        r: color.r,
        g: color.g,
        b: color.b,
        duration: 0.5,
      });
    } else {
      const color = new THREE.Color(metals[0]);
      materials.metall.color = color;
    }
  }, [searchParams]);

  return (
    <group dispose={null} ref={meshRef}>
      <group scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={materials.body}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={materials.metall}
        />
        <Strap
          node={nodes.Mesh_2.geometry}
          material={materials.strap}
          texture={materialParam}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/backpack.glb");
