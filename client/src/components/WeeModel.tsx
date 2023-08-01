import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { IElement } from './utils/WeeTypes';

export interface IWeeModel {
  currentModel: IElement;
  color?: string;
}

function WeeModel({ currentModel, color = '#282828' }: IWeeModel) {
  const { scene } = useGLTF(currentModel.glb);
  const model = setupModel(scene);
  const geometry = model.geometry;
  const modelScale = currentModel.scale.$numberDecimal ?? 1;

  return (
    geometry && (
      <mesh
        castShadow
        geometry={geometry}
        scale={modelScale}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color={color} />
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
