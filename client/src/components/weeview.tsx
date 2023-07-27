import { Canvas } from '@react-three/fiber';
import WeeObject from './WeeObject';
import WeeObjectInfo from './WeeObjectInfo';

function WeeView() {
  return (
    <>
      <div className="wee-view">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <WeeObject position={[0, 0, 0]} />
        </Canvas>
      </div>
      <WeeObjectInfo />
    </>
  );
}

export default WeeView;
