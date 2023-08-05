import { OrbitControls } from '@react-three/drei';
import ReflectiveScene from './utils/ReflectiveScene';
import PlainScene from './utils/PlainScene';
import { IWeeScene } from './utils/WeeTypes';

function WeeScene({ currentScene = 'default', children }: IWeeScene) {

  /**
   * Render Component
   */

  return (
    <>
      {currentScene === 'dark' && (
        <>
          {children}
          <color attach="background" args={['#151515']} />
          <fog attach="fog" args={['#212123', 3, 48]} />
          <ReflectiveScene />
        </>
      )}
      {currentScene === 'light' && (
        <>
          {children}
          <color attach="background" args={['#fafafa']} />
          <fog attach="fog" args={['#eeeeee', 3, 48]} />
          <PlainScene />
        </>
      )}
      {currentScene === 'glass' && (
        <>
          {children}
          <color attach="background" args={['#151515']} />
          <fog attach="fog" args={['#212123', 3, 48]} />
          <PlainScene />
        </>
      )}
      <OrbitControls autoRotate target={[0, -0.1, 0]} />
    </>
  );
}

export default WeeScene;
