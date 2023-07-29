import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { IElement } from './WeeTypes';

export interface IWeeModel {
  currentModel: IElement;
}

function WeeModel({ currentModel }: IWeeModel) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => (meshRef.current.rotation.y += delta / 3));
  const { scene } = useGLTF(currentModel.glb);
  const model = setupModel(scene);
  const geometry = model.geometry;

  const modelScale = currentModel.scale.$numberDecimal ?? 1;
  const yPos = currentModel.ypos?.$numberDecimal ?? 0;

  return (
    geometry && (
      <mesh
        geometry={geometry}
        ref={meshRef}
        scale={modelScale}
        position={[0, yPos, 0]}
      >
        <meshStandardMaterial color={'rgb(40,40,40)'} />
      </mesh>
    )
  );
}

function setupModel(data: THREE.Group) {
  let model = null;
  const child = data.children[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  model = child.isMesh && child;
  return model;
}

export default WeeModel;
