export interface IElement {
  title: string;
  author: string;
  description: string;
  glb: string;
  date: number;
}

export interface IWeeObjectInfo {
  category: string;
  model: IElement;
}

function WeeModelInfo({ category, model }: IWeeObjectInfo) {
  const dateFmt = new Date(model.date).toLocaleDateString('de-DE');
  return (
    <>
      <div className="object-info">
        <h3>{model.title}</h3>
        <p>{model.description}</p>
        <p>{dateFmt}</p>
        {category}
      </div>
    </>
  );
}

export default WeeModelInfo;
