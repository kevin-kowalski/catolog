import { Canvas } from '@react-three/fiber';
import WeeScene from './WeeScene';
import WeeObject from './WeeObject';
import WeeObjectInfo from './WeeObjectInfo';

function WeeView() {
  const activeCategory = 'Default';
  const categoryElements = ['Default Cube'];
  const selectedElement = {
    title: 'Default Cube',
    author: 'Unknown Artist',
    description: 'R3F Box Object',
    jsx: '',
    glb: '',
    category: 'Default',
    scale: 1,
    date: 1690448981121,
  };

  return (
    <>
      <div className="wee-view">
        <Canvas>
          <WeeScene />
          {/* <WeeObject position={[0, 0, 0]} /> */}
        </Canvas>
      </div>
      <WeeObjectInfo category={activeCategory} element={selectedElement} />
    </>
  );
}

export default WeeView;
