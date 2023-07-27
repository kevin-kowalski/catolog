import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import WeeScene from './WeeScene';
import WeeObject from './WeeObject';
import WeeObjectInfo from './WeeObjectInfo';
import { getCategory } from '../apiService';
import { IElement } from './WeeObjectInfo';

function WeeView() {
  const activeCategory = 'Default';
  const [models, setModels] = useState([]);
  const [elIndex, setElIndex] = useState(0);
  const [element, setElement] = useState(models[elIndex]);
  const [catElements, setCatElements] = useState<string[]>([]);

  useEffect(() => {
    getCategory(activeCategory)
      .then(async (res) => {
        setModels(res);
      })
      .catch((err) => console.log(err));
  }, [activeCategory]);

  useEffect(() => {
    setElement(models[elIndex]);
    const newCatElements = models.map((m: IElement) => m.title);
    setCatElements(newCatElements);
  }, [models, elIndex]);

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
      {element && <WeeObjectInfo category={activeCategory} element={element} />}
    </>
  );

  function handleClickPrev() {
    if (elIndex > 0) {
      setElIndex(elIndex - 1);
    } else {
      setElIndex(catElements.length - 1);
    }
  }
  function handleClickNext() {
    if (elIndex < catElements.length - 1) {
      setElIndex(elIndex + 1);
    } else {
      setElIndex(0);
    }
  }
}

export default WeeView;
