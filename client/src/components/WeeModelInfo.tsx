import { IWeeObjectInfo } from './utils/WeeTypes.js';
import { PopoverPicker } from './utils/PopoverPicker.jsx';

function WeeModelInfo({ currentScene = 'dark', currentModel, currentObjectColor, setCurrentScene, setCurrentObjectColor }: IWeeObjectInfo) {

  /**
   * Constants
   */

  const dateFmt = new Date(currentModel?.date).toLocaleDateString('de-DE') ?? '';
  const description = currentModel?.description ?? '';
  const author = currentModel?.author ?? '';
  const source = currentModel?.source ?? '';

  /**
   * Handler
   */

  // When the user clicks one of the buttons,
  // set the specified scene
  function handleClick(sceneName: string) {
    setCurrentScene(sceneName);
  }

  /**
   * Render component
   */

  return (<>
    {!currentModel && (
      <div className="object-info loading">
        <h3>Loading..</h3>
      </div>
    )}
    {currentModel && (
      <div className="object-info">
        <div className="details">
          <h3 className='object-title'>{currentModel.title}</h3>
          <p>
            {description} <span className="date">({dateFmt})</span>
          </p>
          <p>{author}</p>
          <p className="source">
            {source ? (
              <a href={source} target="_blank">
                {source}
              </a>
            ) : (
              ''
              )}
          </p>
        </div>
        <div className="controls">
          <div className="set-env">
            <button onClick={() => handleClick('dark')}>Dark</button>
            <button onClick={() => handleClick('light')}>Light</button>
            <button onClick={() => handleClick('glass')}>Glass</button>
          </div>
          {currentScene !== 'glass' && (
            <PopoverPicker currentObjectColor={currentObjectColor} onChange={setCurrentObjectColor} />
          )}
        </div>
      </div>
    )}
  </>);
}

export default WeeModelInfo;
