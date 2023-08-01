import * as THREE from 'three';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { IElement } from './utils/WeeTypes';

export interface IWeeModel {
  currentModel: IElement;
  color?: string;
  curEnv?: string;
}

function WeeModel({
  currentModel,
  color = '#282828',
  curEnv = 'dark',
}: IWeeModel) {
  const { scene } = useGLTF(currentModel.glb);
  const model = setupModel(scene);
  const geometry = model.geometry;
  const modelScale = currentModel.scale.$numberDecimal ?? 1;

  return (
    <>
      {geometry && curEnv === 'glass' && (
        <mesh
          castShadow
          geometry={geometry}
          scale={modelScale}
          position={[0, 0, 0]}
        >
          <MeshTransmissionMaterial
            distortionScale={0.5}
            temporalDistortion={0.0}
            samples={6}
            resolution={64}
            thickness={-1}
            anisotropy={0.25}
          />
        </mesh>
      )}
      {geometry && curEnv !== 'glass' && (
        <mesh
          castShadow
          geometry={geometry}
          scale={modelScale}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color={color} />
        </mesh>
      )}
    </>
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
