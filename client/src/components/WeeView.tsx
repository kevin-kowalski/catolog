import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WeeScene from './WeeScene';
import WeeModel from './WeeModel';
import WeeModelInfo from './WeeModelInfo';
import LoadingStatus from './utils/LoadingStatus';
import { getCategory } from '../services/apiService';
import { IElement } from './utils/WeeTypes';

function WeeView() {

  // Constants
  const activeCategory = 'Default';
  const defaultObjectColor = 'rgb(28, 226, 29)';

  // State variables
  const [categoryModels, setCategoryModels] = useState([]);
  const [categoryModelIndex, setCategoryModelIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState<IElement>(categoryModels[categoryModelIndex]);
  const [currentScene, setCurrentScene] = useState('dark');
  const [currentObjectColor, setCurrentObjectColor] = useState(defaultObjectColor);

  /**
   * Use effects
   */

  // When activeCategory changes, retrieve all objects
  // for the active category, and set them as the models
  useEffect(() => {
    getCategory(activeCategory)
      .then(async (res) => {
        if (res) {
          setCategoryModels(res);
        }
      })
      .catch((err) => console.log(err));
  }, [activeCategory]);

  // When the models or modelIndex state variables change,
  // and the array of models is not empty, set the current
  // model according to the modelIndex state variable
  useEffect(() => {
    if (categoryModels.length > 0) {
      setCurrentModel(categoryModels[categoryModelIndex]);
    }
  }, [categoryModels, categoryModelIndex]);

  /**
   * Handler functions
   */

  // When the user clicks on the previous object button,
  // decrease the current categoryModelIndex, while looping
  // around to the last index when going beyond the first.
  function handleClickPrev() {
    const max = categoryModels.length - 1;
    if (categoryModelIndex > 0) {
      setCategoryModelIndex(categoryModelIndex - 1);
    } else {
      setCategoryModelIndex(max);
    }
  }

  // When the user clicks on the next object button,
  // increase the current categoryModelIndex, while looping
  // around to the first index when going beyond the last.
  function handleClickNext() {
    const max = categoryModels.length - 1;
    if (categoryModelIndex < max) {
      setCategoryModelIndex(categoryModelIndex + 1);
    } else {
      setCategoryModelIndex(0);
    }
  }

  /**
   * Render component
   */

  return (<>

    <div className={`wee-view ${currentScene}`}>

      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.5, -15], fov: 30 }}>
        <Suspense fallback={<LoadingStatus />}>
          <WeeScene currentScene={currentScene}>
            {currentModel && (
              <WeeModel
                currentModel={currentModel}
                currentObjectColor={currentObjectColor}
                currentScene={currentScene}
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
      currentScene={currentScene}
      currentModel={currentModel}
      currentObjectColor={currentObjectColor}
      setCurrentScene={setCurrentScene}
      setCurrentObjectColor={setCurrentObjectColor}
    />

  </>);
}

export default WeeView;
