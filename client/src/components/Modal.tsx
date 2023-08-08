import { useState, ChangeEvent, FormEvent} from "react";
import { ModalProps } from "./utils/Types";
import Checklist from "./Checklist";
import { mod } from "three/examples/jsm/nodes/Nodes.js";


function Modal ({dialogue, setModalIsOpen, models}: ModalProps) {

  // State Variables
  const [inputValue, setInputValue] = useState<string>('')

  const [showFirstConfiguratorCollection, setShowFirstConfiguratorCollection] = useState<boolean>(true)
  const [showSecondConfiguratorCollection, setShowSecondConfiguratorCollection] = useState<boolean>(false)

  const [categoryToPost, setCategoryToPost] = useState<string>('')
  const [modelsToPost, setModelsToPost] = useState<string[]>([])

  // Handler Functions

    function handleChangeCollection (event: ChangeEvent<HTMLInputElement>) {
      setInputValue(event.target.value)
    }

    function handleSubmitCollection (event: FormEvent) {
      event.preventDefault();
      console.log('Form submitted:', inputValue);
      setCategoryToPost(inputValue)
      setShowFirstConfiguratorCollection(false)
      setShowSecondConfiguratorCollection(true)
    }
    
    function handlePreviousButtonClickCollection () {
      setShowSecondConfiguratorCollection(false)
      setShowFirstConfiguratorCollection(true)
    }
    
  

  /**
   * Render component
   */

  return (<>
    <div className="modal">
    {dialogue ==='collection' && (
      <div className="modal-collection">
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>

        {showFirstConfiguratorCollection  && (

          <div className="modal-collection-1">
            <form onSubmit={handleSubmitCollection}>
              {/* <label htmlFor="myInput">Collection:</label> */}
              <input type="text" id="myInput" value={inputValue} onChange={handleChangeCollection} placeholder="Collection"/>
              <button type="submit">Next</button>
            </form>
          </div>

        )}
        {showSecondConfiguratorCollection && (
          <div className="modal-collection-2">
            <button onClick={handlePreviousButtonClickCollection}>back</button>
            <Checklist models={models} setModelsToPost={setModelsToPost} setCategoryToPost={setCategoryToPost} categoryToPost={categoryToPost}></Checklist>
          </div>
        )}
      </div>
    )}
    {dialogue === 'object' && (
      <div className="modal-object"> 
      <button onClick={() => setModalIsOpen(false)}>Cancel</button>

        <form action="submit">
          {/* handlesubmit: 
              - data posten
              - seite im useffect aktualisieren
              - zur collection route umleiten */}

          <div>
            <label htmlFor="title">Title:</label>
            <input id="title"/>
          </div>

          <div>
            <label htmlFor="author">Author:</label>
            <input id="author"/>
          </div>

          <div>
            <label htmlFor="glb">Media:</label>
            <input id="glb"/>
          </div>

          <div>
            <label htmlFor="scale">Scale:</label>
            <input id="scale"/>
          </div>

          <div>
            <label htmlFor="collection">Collection:</label>
            <select id="collection" name="collection">
              <option value="my collection">my collection</option>
            </select>
          </div>
          <button type="submit">Create</button>
        </form>

      </div>
    )}
    </div>
  </>);
}

export default Modal;