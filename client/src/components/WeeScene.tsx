import { OrbitControls } from '@react-three/drei';
import DefaultScene from './utils/DefaultScene';
import PlainScene from './utils/PlainScene';

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
          <DefaultScene groundPos={[0, -1.49, 0]} />
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
      <OrbitControls autoRotate target={[0, -0.1, 0]} />
    </>
  );
}

export default Scene;
