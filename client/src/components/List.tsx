import Single from "./Single";
import { IElement } from "./utils/WeeTypes";

function List ({ models }: { models: IElement[]}) {

  /**
   * Render component
   */

  return (<>
    <div className="list">
      {models.map((model) => (
        <Single key={model._id} model={model} />
      ))}
    </div>
  </>);
}

export default List;