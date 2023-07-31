import { Html, useProgress } from '@react-three/drei';

function LoadingStatus() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default LoadingStatus;
