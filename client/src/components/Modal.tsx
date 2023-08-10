import { useState, ChangeEvent, FormEvent, useEffect} from "react";
import { ModalProps, ModelData, NumDecimal } from "../types/types";
import Checklist from "./Checklist";
import { getAll, postModel } from "../services/apiService";
import { Category } from "../types/types";
import { useNavigate } from "react-router-dom";

function Modal ({dialogue, setModalIsOpen, collection}: ModalProps) {

  /* State Variables */

  const [inputValue, setInputValue] = useState<string>('');
  const [allModels, setAllModels] = useState<ModelData[] | null>(null);

  const [showFirstConfiguratorCollection, setShowFirstConfiguratorCollection] = useState<boolean>(true);
  const [showSecondConfiguratorCollection, setShowSecondConfiguratorCollection] = useState<boolean>(false);

  const [categoryToPost, setCategoryToPost] = useState<string>('');

  /* Hook */

  const navigate = useNavigate();

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
    setInputValue(event.target.value);
  }

  function handleSubmitCollection (event: FormEvent) {
    event.preventDefault();
    console.log('Form submitted:', inputValue);
    setCategoryToPost(inputValue);
    setShowFirstConfiguratorCollection(false);
    setShowSecondConfiguratorCollection(true);
  }

  function handlePreviousButtonClickCollection () {
    setShowSecondConfiguratorCollection(false);
    setShowFirstConfiguratorCollection(true);
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
    <div className="modal-wrapper appear">
    {dialogue ==='collection' && (
      <div className="modal modal-collection">

        {showFirstConfiguratorCollection  && (

          <>
            <h3 className="heading">Add a new collection</h3>
            <form onSubmit={handleSubmitCollection}>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" value={inputValue} onChange={handleChangeCollection} autoComplete="off"/>
              <div className="button-group">
                <button className="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                <button className="button primary" type="submit">Next</button>
              </div>
            </form>
          </>

        )}
        {showSecondConfiguratorCollection && (
          <>
            <Checklist models={allModels!} categoryToPost={categoryToPost} setModalIsOpen={setModalIsOpen} handlePreviousButtonClick={handlePreviousButtonClickCollection}></Checklist>
          </>
        )}
      </div>
    )}
    {dialogue === 'object' && (
      <div className="modal modal-object">
        <h3 className="heading">Add a new item</h3>
        <form onSubmit={handleSubmitObject}>
          <label htmlFor="title">Title:</label>
          <input id="title" autoComplete="off"/>
          <label htmlFor="author">Author:</label>
          <input id="author" autoComplete="off"/>
          <label htmlFor="glb">Media:</label>
          <input id="glb" autoComplete="off" />
          <label htmlFor="scale">Scale:</label>
          <input id="scale" autoComplete="off"/>
          <label htmlFor="collection">Collection:</label>
          <select id="collection" name="collection" multiple>
          { collection.map((item: Category) => {
            return(
              <option key={item._id} value={item.title}>{item.title}</option>
              )
            })
          }
          </select>
          <div className="button-group">
            <button className="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
            <button className="button primary" type="submit">Create</button>
          </div>
        </form>
      </div>
    )}
    </div>
  </>);
}

export default Modal;