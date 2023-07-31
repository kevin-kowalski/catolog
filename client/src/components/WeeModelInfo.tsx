import { IWeeObjectInfo } from './WeeTypes';
import { PopoverPicker } from './utils/PopoverPicker.jsx';

function WeeModelInfo({ category, model, color, setColor }: IWeeObjectInfo) {
  if (!model) return <DisplayLoading />;

  const dateFmt = new Date(model.date).toLocaleDateString('de-DE') ?? '';
  const description = model.description ?? '';
  const author = model.author ?? '';
  const source = model.source ?? '';
  const modelCategory = category ?? '';

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
      <div className="category">
        {' '}
        <p>{modelCategory}</p>
        <PopoverPicker color={color} onChange={setColor} />
      </div>{' '}
    </div>
  );
}

function DisplayLoading() {
  return (
    <div className="object-info loading">
      <h3>Loading..</h3>
    </div>
  );
}

export default WeeModelInfo;
