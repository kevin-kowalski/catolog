import { Stage, OrbitControls } from '@react-three/drei';

interface IWeeScene {
  currentScene: string;
  children: JSX.Element;
}

function Scene({ currentScene = 'default', children }: IWeeScene) {
  return (
    <>
      {currentScene === 'dark' && (
        <Stage adjustCamera={1.25} intensity={0.65} shadows="contact">
          {children}
        </Stage>
      )}
      {currentScene === 'light' && (
        <Stage adjustCamera={1.25} intensity={0.65} shadows="contact">
          {children}
        </Stage>
      )}
      <OrbitControls />
    </>
  );
}

export default Scene;
