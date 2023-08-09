import { useEffect, useState } from "react";
import { Category, ModelData } from "./utils/Types";
import { getAll, getCategories, getCategory } from "../services/apiService";
import List from "./List";
import SecondaryNavigation from "./SecondaryNavigation";
import Modal from "./Modal";
import Search from "./Search";

function Overview () {

  // State variables
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [models, setModels] = useState<ModelData[]>([]);

  const [query, setQuery] = useState<string | null>(null);

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
    setCurrentCategoryModels();
  }, [currentCategory]);

  // When a filter is set through the Search component,
  // filter the models, that are passed on to the List component
  useEffect(() => {
    setCurrentCategoryModels();
  }, [query]);

  // Handler Functions

  function handleButtonClick () {
    setDialogue('object')
    setModalIsOpen(true)
  }

  /**
   * Helper function
   */

  // Get and set the models according to the current category
  async function setCurrentCategoryModels () {
    let modelsData: ModelData[] | undefined;

    if (currentCategory === 'all') {
      modelsData = await getAll();
    }
    else {
      modelsData = await getCategory(currentCategory);
    }

    if (modelsData && query !== null) {
      modelsData = filterModelsByCurrentQuery(modelsData);
    }

    else if (!modelsData) modelsData = [];

    setModels(modelsData);
  }

  // Filter an array of models according to the current query
  function filterModelsByCurrentQuery (modelsData: ModelData[]) {
    const regex = new RegExp(query!, 'gi');
    return modelsData.filter((model) => regex.test(model.title));
  }

  /**
   * Render component
   */

  return (<>
    <button onClick={handleButtonClick}>Add Item</button>
    <Search setQuery={setQuery}/>
    <div className="overview">
      <SecondaryNavigation collection={categories} setPredicate={setCurrentCategory} setModalIsOpen={setModalIsOpen} setDialogue={setDialogue}/>
      <List models={models}/>
    </div>
    {modalIsOpen && (
      <Modal collection={categories} dialogue={dialogue} setModalIsOpen={setModalIsOpen} />
    )}
  </>);
}

export default Overview;