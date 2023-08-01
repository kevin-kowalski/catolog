import { Stage, OrbitControls } from '@react-three/drei';
import DefaultScene from './utils/DefaultScene';

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
          <fog attach="fog" args={['#212123', 3, 48]} />
          <DefaultScene groundPos={[0, -1.49, 0]} />
        </>
      )}
      {currentScene === 'light' && (
        <Stage adjustCamera={1.25} intensity={0.65} shadows="contact">
          {children}
        </Stage>
      )}
      {/* <OrbitControls autoRotate camera={{ position: [0, 2, 10], fov: 30 }} /> */}
      <OrbitControls autoRotate target={[0, -0.1, 0]} />
    </>
  );
}

export default Scene;
