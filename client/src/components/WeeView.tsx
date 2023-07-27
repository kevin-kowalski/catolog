import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import WeeScene from './WeeScene';
import WeeObject from './WeeObject';
import WeeObjectInfo from './WeeObjectInfo';
import tmp from '../assets/temp.json';

function WeeView() {
  const activeCategory = 'Default';
  const categoryElements = tmp.map((el) => el.title);
  const [elIndex, setElIndex] = useState(0);
  const [element, setElement] = useState(tmp[elIndex]);
  const handleClickPrev = () => {
    if (elIndex > 0) {
      setElIndex(elIndex - 1);
    } else {
      setElIndex(categoryElements.length - 1);
    }
  };
  const handleClickNext = () => {
    if (elIndex < categoryElements.length - 1) {
      setElIndex(elIndex + 1);
    } else {
      setElIndex(0);
    }
  };

  useEffect(() => {
    setElement(tmp[elIndex]);
  }, [elIndex]);

  return (
    <>
      <div className="wee-view">
        <Canvas>
          <WeeScene />
          <WeeObject position={[0, 0, 0]} />
        </Canvas>
        <button onClick={handleClickPrev} className="btn-nav nav-prev">
          &lt;
        </button>
        <button onClick={handleClickNext} className="btn-nav nav-next">
          &gt;
        </button>
      </div>
      <WeeObjectInfo category={activeCategory} element={element} />
    </>
  );
}

export default WeeView;
