import { ContactShadows, Environment } from '@react-three/drei';
import { Vector3 } from 'three';
import BasicLights from './BasicLights';

// Default position setting the distance to the ground plane
const defaultPosition = new Vector3(0, -1.5, 0);

function PlainScene() {

  /**
   * Render component
   */

  return (
    <>
      <BasicLights />
      <Environment preset="city" />
      <ContactShadows
        resolution={512}
        position={defaultPosition}
        opacity={0.7}
        scale={10}
        blur={1.25}
        far={3}
      />
    </>
  );
}

export default PlainScene;
