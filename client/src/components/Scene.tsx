import { OrbitControls } from '@react-three/drei';
// import ReflectiveScene from './utils/ReflectiveScene';
import PlainScene from './utils/PlainScene';
import { SceneProps } from './utils/WeeTypes';

function Scene({ children }: SceneProps) {

  /**
   * Render Component
   */

  return (<>
    {children}
    <color attach="background" args={['#fff']} />
    <PlainScene />
    <OrbitControls target={[0, -0.1, 0]} />
  </>);
}

export default Scene;
