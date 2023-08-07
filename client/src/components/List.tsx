import Single from "./Single";
import { ModelData } from "./utils/WeeTypes";

function List ({ models }: { models: ModelData[]}) {

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