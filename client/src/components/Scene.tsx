import { OrbitControls } from '@react-three/drei';
import PlainScene from './fiber/PlainScene';
import { SceneProps } from '../types/types';

function Scene({ children, isHovered }: SceneProps) {

  /* Render Component */

  return (<>
    {children}
    <color attach="background" args={['#fff']} />
    <PlainScene />
    <OrbitControls autoRotate={isHovered} target={[0, -0.1, 0]} />
  </>);
}

export default Scene;
