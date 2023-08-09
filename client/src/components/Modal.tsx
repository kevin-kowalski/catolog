import { useState, ChangeEvent, FormEvent, useEffect} from "react";
import { ModalProps, ModelData, NumDecimal } from "./types/types";
import Checklist from "./Checklist";
import { getAll, postModel } from "../services/apiService";
import { Category } from "./types/types";
import { useNavigate } from "react-router-dom";

function Modal ({dialogue, setModalIsOpen, collection}: ModalProps) {

  /* State Variables */

  const [inputValue, setInputValue] = useState<string>('')
  const [allModels, setAllModels] = useState<ModelData[] | null>(null);

  const [showFirstConfiguratorCollection, setShowFirstConfiguratorCollection] = useState<boolean>(true)
  const [showSecondConfiguratorCollection, setShowSecondConfiguratorCollection] = useState<boolean>(false)

  const [categoryToPost, setCategoryToPost] = useState<string>('')

  const navigate = useNavigate()

  /* Use effect */

  // When the component loads, get all models through the API service
  useEffect(() => {
    getAll()
      .then((allModelData) => {
        if (allModelData)
          setAllModels(allModelData);
      });
  }, []);

  /* Handler Functions */

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

  async function handleSubmitObject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title: string = (document.getElementById('title') as HTMLInputElement).value;
    const author: string = (document.getElementById('author') as HTMLInputElement).value;
    const glb: string = (document.getElementById('glb') as HTMLInputElement).value;
    const scale: NumDecimal = { $numberDecimal: Number((document.getElementById('scale') as HTMLInputElement).value) };
    const categories: string[] = Array.from((document.getElementById('collection') as HTMLSelectElement).selectedOptions, option => option.value);

    const obj : ModelData = {
      title,
      author,
      glb,
      scale,
      categories
    };

    const addedModel = await postModel(obj);
    const objectId = addedModel?._id;
    setModalIsOpen(false);

    const objectRoute = `model/${objectId}`;
    navigate(objectRoute);
  }

  /* Render component */

  return (<>
    <div className="modal">
    {dialogue ==='collection' && (
      <div className="modal-collection">
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>

        {showFirstConfiguratorCollection  && (

          <div className="modal-collection-1">
            <form onSubmit={handleSubmitCollection}>
              <input type="text" id="myInput" value={inputValue} onChange={handleChangeCollection} placeholder="Collection"/>
              <button type="submit">Next</button>
            </form>
          </div>

        )}
        {showSecondConfiguratorCollection && (
          <div className="modal-collection-2">
            <button onClick={handlePreviousButtonClickCollection}>back</button>
            <Checklist models={allModels!} setCategoryToPost={setCategoryToPost} categoryToPost={categoryToPost} setModalIsOpen={setModalIsOpen}></Checklist>
          </div>
        )}
      </div>
    )}
    {dialogue === 'object' && (
      <div className="modal-object">
      <button onClick={() => setModalIsOpen(false)}>Cancel</button>

        <form onSubmit={handleSubmitObject}>

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
            <select id="collection" name="collection" multiple>
            { collection.map((item: Category) => {
              return(
              <option key={item._id} value={item.title}>{item.title}</option>
              )
            })
            }
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