import { Environment } from '@react-three/drei';
import BasicLights from './BasicLights';

function PlainScene() {

  /* Render component */

  return (
    <>
      <BasicLights />
      <Environment preset="city" />
    </>
  );
}

export default PlainScene;
