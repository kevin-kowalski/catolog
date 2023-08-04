import * as THREE from 'three';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { IWeeModel } from './utils/WeeTypes';

function WeeModel({ currentModel, currentObjectColor = '#282828', currentScene = 'dark' }: IWeeModel) {

  // Constants
  const { scene } = useGLTF(currentModel.glb);
  const model = setupModel(scene);
  const geometry = model.geometry;
  const modelScale = currentModel.scale.$numberDecimal ?? 1;

  /**
   * Setup helper function
   */

  function setupModel(data: THREE.Group) {
    let model = null;
    const child = data.children[0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    model = child.isMesh && child;
    return model;
  }

  /**
   * Render component
   */

  return (
    <>
      {geometry && currentScene === 'glass' && (
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
      {geometry && currentScene !== 'glass' && (
        <mesh
          castShadow
          geometry={geometry}
          scale={modelScale}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color={currentObjectColor} />
        </mesh>
      )}
    </>
  );
}

export default WeeModel;
