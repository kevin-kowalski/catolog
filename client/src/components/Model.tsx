import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { ModelProps } from '../types/types';

function Model({ currentModel, currentObjectColor }: ModelProps) {

  /* Constants */

  const { scene } = useGLTF('../' + currentModel.glb);
  const model = setupModel(scene);
  const geometry = model.geometry;
  const modelScale = currentModel.scale?.$numberDecimal ?? 1;

  /* Setup helper function */

  function setupModel(data: THREE.Group) {
    let model = null;
    const child = data.children[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    model = child.isMesh && child;
    return model;
  }

  /* Render component */

  return (<>
    <mesh
      castShadow
      geometry={geometry}
      scale={modelScale}
      position={[0, 0, 0]}
    >
      <meshPhysicalMaterial color={currentObjectColor} roughness={0.2} metalness={0.2}/>
    </mesh>
  </>);
}

export default Model;
