import { IWeeObjectInfo } from './WeeTypes';

function WeeModelInfo({ category, model }: IWeeObjectInfo) {
  if (!model) return <DisplayLoading />;

  const dateFmt = new Date(model.date).toLocaleDateString('de-DE') ?? '';
  const description = model.description ?? '';
  const modelCategory = category ?? '';

  return (
    <>
      <div className="object-info">
        <h3>{model.title}</h3>
        <p>{description}</p>
        <p>{dateFmt}</p>
        {modelCategory}
      </div>
    </>
  );
}

function DisplayLoading() {
  return (
    <div className="object-info">
      <p>Loading..</p>
    </div>
  );
}

export default WeeModelInfo;
