import { Environment } from '@react-three/drei';
import { Vector3 } from 'three';
import BasicLights from './BasicLights';
import ReflectiveGround from './ReflectiveGround';
import { IDefaultScene } from './WeeTypes';

// Default position setting the distance to the ground plane
const defaultGroundPos = new Vector3(0, -1.7, 0);

function ReflectiveScene({ groundPos = defaultGroundPos }: IDefaultScene) {

  /**
   * Render component
   */

  return (
    <>
      <BasicLights />
      <Environment preset="city" />
      <group position={groundPos}>
        <ReflectiveGround />
      </group>
    </>
  );
}

export default ReflectiveScene;
