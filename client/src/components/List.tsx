import Single from "./Single";
import { IElement } from "./utils/WeeTypes";

function List ({ models }: { models: IElement[]}) {

  /**
   * Render component
   */

  return (<>
    {models.map((model) => (
      <Single model={model} />
    ))}
  </>);
}

export default List;