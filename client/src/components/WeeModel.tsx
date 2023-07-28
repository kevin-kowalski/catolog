import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTFResult, scale } from './WeeTypes';

export interface IWeeModel {
  glb: string;
  scale: scale;
}

function WeeModel({ glb, scale }: IWeeModel) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => (meshRef.current.rotation.x += delta / 3));
  const gltf = useGLTF(glb) as GLTFResult;
  const model = setupModel(gltf);
  const geometry = model.geometry;

  const modelScale = scale.$numberDecimal ?? 1;

  return (
    geometry && (
      <mesh geometry={geometry} ref={meshRef} scale={modelScale}>
        <meshStandardMaterial color={'rgb(40,40,40)'} />
      </mesh>
    )
  );
}

function setupModel(data: GLTFResult) {
  let model = null;
  const child = data.scene.children[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  model = child.isMesh && child;
  return model;
}

export default WeeModel;
