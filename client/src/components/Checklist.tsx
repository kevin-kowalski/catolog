import { FormEvent } from "react";
import Single from "./Single";
import { ChecklistProps, ModelData } from "./utils/Types";

function Checklist ({ models, setModelsToPost }: ChecklistProps) {

  function handleSubmit(event: FormEvent<HTMLFormElement>) :void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement
    const checkedItems = Array.from(form.elements).filter((element) => element instanceof HTMLInputElement && element.type === 'checkbox' && element.checked)
    // .map((element) => models.find((model) => model._id === element._id))
    const checkedItemIds = checkedItems.map((item) => item.id);
    console.log(checkedItemIds);
    

    // console.log('Checked items:', checkedItems)
    //setModelsToPost(_id von checked Models) string[]
    //post 
  }


  /**
   * Render component
   */

  return (<>
    <form onSubmit={handleSubmit}> 
      <div className="list">
        {models.map((model) => (
            <div key={model._id} className="checkbox-container">
              <label htmlFor={model._id}>
              <input
                type="checkbox"
                className="checkbox"
                id={model._id}
                value={model._id}
              />
              <Single model={model}/>
              </label>
            </div>
        ))}
      </div>
      <button type="submit">Create Collection</button>
    </form>
  </>);
}

export default Checklist;