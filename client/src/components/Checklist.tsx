import { FormEvent } from "react";
import Single from "./Single";
import { ChecklistProps} from "./types/types";
import { postCategory } from "../services/apiService";
import { useNavigate } from 'react-router-dom'

function Checklist ({ models, categoryToPost, setModalIsOpen}: ChecklistProps) {

  /* Hook */

  const navigate = useNavigate()

  /* Handler function */

  // When the user clicks on submit
  function handleSubmit(event: FormEvent<HTMLFormElement>) : void {
    event.preventDefault();

    // The checkedItemIds are filtered out
    const form = event.currentTarget as HTMLFormElement;
    const checkedItems = Array.from(form.elements).filter((element) => element instanceof HTMLInputElement && element.type === 'checkbox' && element.checked);
    const checkedItemIds = checkedItems.map((item) => item.id);

    // A post request is prepared and then sent to the server
    const category = {
      title : categoryToPost,
      models: checkedItemIds
    }
    postCategory(category)

    // Redirect to the category route
    const categoryRoute = `/category/${category.title}`;
    navigate(categoryRoute)
    setModalIsOpen(false)
  }

  /* Render component */

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