import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import WeeScene from './WeeScene';
import WeeModel from './WeeModel';
import WeeModelInfo from './WeeModelInfo';
import { getCategory } from '../apiService';
import { IElement } from './WeeModelInfo';

function WeeView() {
  const activeCategory = 'Default';
  const [models, setModels] = useState([]);
  const [modelIndex, setModelIndex] = useState(0);
  const [element, setElement] = useState(models[modelIndex]);
  const [catElements, setCatElements] = useState<string[]>([]);

  useEffect(() => {
    getCategory(activeCategory)
      .then(async (res) => {
        setModels(res);
      })
      .catch((err) => console.log(err));
  }, [activeCategory]);

  useEffect(() => {
    setElement(models[modelIndex]);
    const newCatElements = models.map((m: IElement) => m.title);
    setCatElements(newCatElements);
  }, [models, modelIndex]);

  return (
    <>
      <div className="wee-view">
        <Canvas>
          <WeeScene />
          <WeeModel />
        </Canvas>
        <button onClick={handleClickPrev} className="btn-nav nav-prev">
          &lt;
        </button>
        <button onClick={handleClickNext} className="btn-nav nav-next">
          &gt;
        </button>
      </div>
      {element && <WeeModelInfo category={activeCategory} element={element} />}
    </>
  );

  function handleClickPrev() {
    const max = catElements.length - 1;
    if (modelIndex > 0) {
      setModelIndex(modelIndex - 1);
    } else {
      setModelIndex(max);
    }
  }
  function handleClickNext() {
    const max = catElements.length - 1;
    if (modelIndex < max) {
      setModelIndex(modelIndex + 1);
    } else {
      setModelIndex(0);
    }
  }
}

export default WeeView;
