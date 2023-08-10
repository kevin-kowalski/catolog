import { OrbitControls } from '@react-three/drei';
import PlainScene from './PlainScene';
import { SceneProps } from '../../types/types';

function Scene({ children, isHovered }: SceneProps) {

  /* Render Component */

  return (<>
    {children}
    <PlainScene />
    <OrbitControls autoRotate={isHovered} autoRotateSpeed={5} target={[0, -0.1, 0]} />
  </>);
}

export default Scene;
