import { OrbitControls } from '@react-three/drei';
// import ReflectiveScene from './utils/ReflectiveScene';
import PlainScene from './utils/PlainScene';
import { IWeeScene } from './utils/WeeTypes';

function Scene({ children }: IWeeScene) {

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
