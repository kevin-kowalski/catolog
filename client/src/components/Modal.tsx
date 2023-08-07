import { useState, ChangeEvent, FormEvent} from "react";
import { ModalProps } from "./utils/Types";


function Modal ({dialogue, setModalIsOpen, setPredicate}: ModalProps) {

  // State Variables
  const [inputValue, setInputValue] = useState<string>('')

  const [showFirstConfiguratorObject, setShowFirstConfiguratorObject] = useState<boolean>(true)
  const [showSecondConfiguratorObject, setShowSecondConfiguratorObject] = useState<boolean>(false)
 
  const [showFirstConfiguratorCollection, setShowFirstConfiguratorCollection] = useState<boolean>(true)
  const [showSecondConfiguratorCollection, setShowSecondConfiguratorCollection] = useState<boolean>(false)

  // Handler Functions

    function handleChange (event: ChangeEvent<HTMLInputElement>) {
      setInputValue(event.target.value)
    }

    function handleSubmit (event: FormEvent) {
      event.preventDefault();
      console.log('Form submitted:', inputValue);
      setInputValue('');
      setShowFirstConfiguratorCollection(false)
      setShowSecondConfiguratorCollection(true)
      // post New Category
      // setLocalCategory
    }

    function handleNextButtonClickCollection () {
      //setShowFirstConfiguratorCollection(false)
      //setShowSecondConfiguratorCollection(true)
    }
    
    function handlePreviousButtonClickCollection () {
      //setShowFirstConfiguratorCollection(true)
      //setShowSecondConfiguratorCollection(false)
    }

    function handleNextButtonClickObject () {
      //setShowFirstConfiguratorObject(false)
      //setShowSecondConfiguratorObject(true)
    }
    
    function handlePreviousButtonClickObject () {
      //setShowFirstConfiguratorObject(false)
      //setShowSecondConfiguratorObject(true)
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
            <form onSubmit={handleSubmit}>
              {/* <label htmlFor="myInput">Collection:</label> */}
              <input type="text" id="myInput" value={inputValue} onChange={handleChange} placeholder="Collection"/>
              <button type="submit">Next</button>
            </form>
          </div>

        )}
        {showSecondConfiguratorCollection && (
          <button>Hello</button>
        )}
      </div>
    )}
    {dialogue === 'object' && (
      <div> 
      <button onClick={() => setModalIsOpen(false)}>Cancel</button>

        <form action="submit">
         <label htmlFor="country">Select a country</label>
          <select id="country" name="country">
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
          </select>
        </form>

    </div>
    )}
    </div>
  </>);
}

export default Modal;