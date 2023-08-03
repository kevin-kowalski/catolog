import { OrbitControls } from '@react-three/drei';
import DefaultScene from './utils/DefaultScene';
import PlainScene from './utils/PlainScene';
import GlassScene from './utils/PlainScene';
import { Vector3 } from 'three';

interface IWeeScene {
  currentScene: string;
  children: JSX.Element;
}

function Scene({ currentScene = 'default', children }: IWeeScene) {
  return (
    <>
      {currentScene === 'dark' && (
        <>
          {children}
          <color attach="background" args={['#151515']} />
          <fog attach="fog" args={['#212123', 3, 48]} />
          <DefaultScene groundPos={new Vector3(0, -1.49, 0)} />
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
          <GlassScene />
        </>
      )}
      <OrbitControls autoRotate target={[0, -0.1, 0]} />
    </>
  );
}

export default Scene;
