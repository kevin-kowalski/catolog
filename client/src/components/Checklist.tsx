import { FormEvent } from "react";
import Single from "./Single";
import { ChecklistProps, ModelData } from "./utils/Types";

function Checklist ({ models, setModelsToPost, setCategoryToPost, categoryToPost }: ChecklistProps) {

  function handleSubmit(event: FormEvent<HTMLFormElement>) :void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const checkedItems = Array.from(form.elements).filter((element) => element instanceof HTMLInputElement && element.type === 'checkbox' && element.checked);
    const checkedItemIds = checkedItems.map((item) => item.id);
    setModelsToPost(checkedItemIds);
    // To do:
    // post: in die catgegorie die models reinposten
    // put : ändere Models mit neuen Kategorien
    // auf die collections route dieser collection gehen
    // seite im useffect aktualisieren, sodass kategorien aktuell sind
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