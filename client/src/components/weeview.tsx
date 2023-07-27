import { Canvas } from '@react-three/fiber';
import WeeObject from './weeobject';

function WeeView() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <WeeObject position={[0, 0, 0]} />
    </Canvas>
  );
}

export default WeeView;
