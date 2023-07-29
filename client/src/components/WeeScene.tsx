import { Stage } from '@react-three/drei';

interface IWeeScene {
  children: JSX.Element;
}

function Scene({ children }: IWeeScene) {
  return (
    <>
      <Stage
        adjustCamera={1.25}
        intensity={0.65}
        shadows="accumulative"
        environment="city"
      >
        {children}
      </Stage>
    </>
  );
}

export default Scene;
