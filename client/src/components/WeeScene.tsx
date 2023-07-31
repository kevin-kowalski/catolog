import { Stage, OrbitControls } from '@react-three/drei';

interface IWeeScene {
  children: JSX.Element;
}

function Scene({ children }: IWeeScene) {
  return (
    <>
      <Stage
        adjustCamera={1.25}
        intensity={0.65}
        shadows="contact"
        environment="city"
      >
        {children}
      </Stage>
      <OrbitControls />
    </>
  );
}

export default Scene;
