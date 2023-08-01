import { IWeeObjectInfo } from './utils/WeeTypes.js';
import { PopoverPicker } from './utils/PopoverPicker.jsx';

function WeeModelInfo({
  scene = 'dark',
  model,
  color,
  setScene,
  setColor,
}: IWeeObjectInfo) {
  if (!model) return <DisplayLoading />;

  const dateFmt = new Date(model.date).toLocaleDateString('de-DE') ?? '';
  const description = model.description ?? '';
  const author = model.author ?? '';
  const source = model.source ?? '';

  return (
    <div className="object-info">
      <div className="details">
        <h3>{model.title}</h3>
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
        {scene !== 'glass' && (
          <PopoverPicker color={color} onChange={setColor} />
        )}
      </div>
    </div>
  );

  function handleClick(mode: string) {
    setScene(mode);
  }
}

function DisplayLoading() {
  return (
    <div className="object-info loading">
      <h3>Loading..</h3>
    </div>
  );
}

export default WeeModelInfo;
