import Single from "./Single";
import { ModelData } from "../types/types";
import { Link } from "react-router-dom";

function List ({ models }: { models: ModelData[] | null}) {

  /* Render component */

  return (<>
    <div className="list">
        {models!.map((model) => (
          <Link key={model._id} to={`/model/${model._id}`}>
            <Single key={model._id} model={model}/>
          </Link>
        ))}
    </div>
  </>);
}

export default List;