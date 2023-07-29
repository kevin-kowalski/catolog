import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WeeScene from './WeeScene';
import WeeModel from './WeeModel';
import WeeModelInfo from './WeeModelInfo';
import LoadingStatus from './LoadingStatus';
import { getCategory } from '../apiService';
import { IElement } from './WeeTypes';

function WeeView() {
  const activeCategory = 'Default';
  const [models, setModels] = useState([]);
  const [modelIndex, setModelIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState<IElement>(
    models[modelIndex],
  );
  const [catElements, setCatElements] = useState<string[]>([]);

  useEffect(() => {
    getCategory(activeCategory)
      .then(async (res) => {
        setModels(res);
      })
      .catch((err) => console.log(err));
  }, [activeCategory]);

  useEffect(() => {
    setCurrentModel(models[modelIndex]);
    const newCatElements = models.map((m: IElement) => m.title);
    setCatElements(newCatElements);
  }, [models, modelIndex]);

  return (
    <>
      <div className="wee-view">
        <Canvas shadows>
          <Suspense fallback={<LoadingStatus />}>
            <WeeScene>
              {currentModel && <WeeModel currentModel={currentModel} />}
            </WeeScene>
          </Suspense>
        </Canvas>
        <button onClick={handleClickPrev} className="btn-nav nav-prev">
          &lt;
        </button>
        <button onClick={handleClickNext} className="btn-nav nav-next">
          &gt;
        </button>
      </div>
      <WeeModelInfo category={activeCategory} model={currentModel} />
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
