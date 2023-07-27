interface IWeeObjectInfo {
  category: string;
}

function WeeObjectInfo({ category }: IWeeObjectInfo) {
  return (
    <>
      <div className="object-info">
        <h3>Cube</h3>
        <p>R3F Box Object</p>
        {category}
      </div>
    </>
  );
}

export default WeeObjectInfo;
