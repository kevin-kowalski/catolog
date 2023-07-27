import { Canvas } from '@react-three/fiber';
import WeeScene from './WeeScene';
import WeeObject from './WeeObject';
import WeeObjectInfo from './WeeObjectInfo';

function WeeView() {
  const activeCategory = 'Default';

  return (
    <>
      <div className="wee-view">
        <Canvas>
          <WeeScene />
          <WeeObject position={[0, 0, 0]} />
        </Canvas>
      </div>
      <WeeObjectInfo category={activeCategory} />
    </>
  );
}

export default WeeView;
