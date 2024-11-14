/* eslint-disable react/prop-types */
import { useTexture } from "@react-three/drei";
import React from "react";
import * as THREE from 'three'

function Strap({ node, material, texture }) {
  const textures = useTexture([
    `./${texture}_baseColor.jpg`,
    `./${texture}_normal.jpg`,
    `./${texture}_occlusionRoughnessMetallic.jpg`,
  ]);

  textures.forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  })

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={node}
      material={material}
      material-map={textures[0]}
      material-normalMap={textures[1]}
      material-roughnessMap={textures[2]}
    />
  );
}

export default Strap;
