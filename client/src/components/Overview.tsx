import { useEffect, useState } from "react";
import { Category, ModelData } from "./utils/Types";
import { getAll, getCategories, getCategory } from "../services/apiService";
import List from "./List";
import SecondaryNavigation from "./SecondaryNavigation";
import Modal from "./Modal";

function Overview () {

  // State variables
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [models, setModels] = useState<ModelData[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [dialogue, setDialogue] = useState<string>('')

  // Retrieve all categories and set the categories
  // state variable to them
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories!));
  }, []);

  // When the currentCategory state variable is updated,
  // retrieve all models belonging to this category.
  useEffect(() => {
    if (currentCategory === 'all') {
      getAll()
        .then((models) => {
          setModels(models!);
        });
    }
    else {
      getCategory(currentCategory)
        .then((models) => {
          setModels(models!);
        });
    }
  }, [currentCategory]);

  // Handler Functions

  function handleButtonClick () {
    setDialogue('object')
    setModalIsOpen(true)
  }

  /**
   * Render component
   */

  return (<>
    <button onClick={handleButtonClick}>Add Item</button>
    <div className="overview">
      <SecondaryNavigation collection={categories} setPredicate={setCurrentCategory} setModalIsOpen={setModalIsOpen} setDialogue={setDialogue}/>
      <List models={models}/>
    </div>
    {modalIsOpen && (
      <Modal dialogue={dialogue} setModalIsOpen={setModalIsOpen} models={models}/>
    )}
  </>);
}

export default Overview;