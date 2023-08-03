import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WeeScene from './WeeScene';
import WeeModel from './WeeModel';
import WeeModelInfo from './WeeModelInfo';
import LoadingStatus from './utils/LoadingStatus';
import { getCategory } from '../services/apiService';
import { IElement } from './utils/WeeTypes';

function WeeView() {
  const activeCategory = 'Default';
  const [models, setModels] = useState([]);
  const [modelIndex, setModelIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState<IElement>(
    models[modelIndex],
  );
  const [catElements, setCatElements] = useState<string[]>([]);
  const [currentScene, setCurrentScene] = useState('dark');
  const lightColor = 'rgb(255, 33, 122)';
  const darkColor = 'rgb(28, 226, 29)';
  const [currentColor, setCurrentColor] = useState(darkColor);

  useEffect(() => {
    getCategory(activeCategory)
      .then(async (res) => {
        if (res) {
          setModels(res);
        }
      })
      .catch((err) => console.log(err));
  }, [activeCategory]);

  useEffect(() => {
    if (models) {
      setCurrentModel(models[modelIndex]);
      const newCatElements = models.map((m: IElement) => m.title);
      setCatElements(newCatElements);
    }
  }, [models, modelIndex]);

  useEffect(() => {
    const color = currentScene === 'light' ? lightColor : darkColor;
    if (currentColor === lightColor || currentColor === darkColor)
      setCurrentColor(color);
  }, [currentColor, currentScene]);

  return (
    <>
      <div className={`wee-view ${currentScene}`}>
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.5, -15], fov: 30 }}>
          <Suspense fallback={<LoadingStatus />}>
            <WeeScene currentScene={currentScene}>
              {currentModel && (
                <WeeModel
                  currentModel={currentModel}
                  color={currentColor}
                  curEnv={currentScene}
                />
              )}
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
      <WeeModelInfo
        scene={currentScene}
        model={currentModel}
        color={currentColor}
        setScene={setCurrentScene}
        setColor={setCurrentColor}
      />
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
