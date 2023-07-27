export interface IElement {
  title: string;
  author: string;
  description: string;
  date: number;
}

interface IWeeObjectInfo {
  category: string;
  element: IElement;
}

function WeeObjectInfo({ category, element }: IWeeObjectInfo) {
  const dateFmt = new Date(element.date).toLocaleDateString('de-DE');
  return (
    <>
      <div className="object-info">
        <h3>{element.title}</h3>
        <p>{element.description}</p>
        <p>{dateFmt}</p>
        {category}
      </div>
    </>
  );
}

export default WeeObjectInfo;
