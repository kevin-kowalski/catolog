import Single from "./Single";
import { ModelData } from "./utils/Types";
import { Link } from "react-router-dom";

function List ({ models }: { models: ModelData[]}) {

  /**
   * Render component
   */

  return (<>
    <div className="list">
      {models.map((model) => (
        <Link key={model._id} to={`/models/${model._id}`}>
          <Single key={model._id} model={model}/>
        </Link>
      ))}
    </div>
  </>);
}

export default List;