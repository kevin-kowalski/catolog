import { useEffect, useState } from "react";
import { Category, ModelData } from "./utils/Types";
import { getAll, getCategories, getCategory } from "../services/apiService";
import List from "./List";
import SecondaryNavigation from "./SecondaryNavigation";
import Modal from "./Modal";
import Search from "./Search";
import { useParams } from "react-router-dom";

function Overview () {

  // State variables
  const [categories, setCategories] = useState<Category[]>([]);
  const [models, setModels] = useState<ModelData[]>([]);

  const [query, setQuery] = useState<string | null>(null);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [dialogue, setDialogue] = useState<string>('')

  // Hooks
  const params = useParams();

  /**
   * Use effects
   */

  // When the component loads, or
  // When a filter is set through the Search component,
  // filter the models, that are passed on to the List component,
  // and set the models accordingly
  useEffect(() => {
    setCurrentCategoryModels();
  }, [params.categoryName, query]);

  // Retrieve all categories and set the categories
  // state variable to them
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories!));
  }, []);

  /**
   * Helper function
   */

  // Get and set the models according to the current category
  async function setCurrentCategoryModels () {
    let modelsData: ModelData[] | undefined;


    // If the path is a category, load all models
    // in that category
    if (params.categoryName) {
      if (params.categoryName.toLowerCase() === 'all')
        modelsData = await getAll();
      else
        modelsData = await getCategory(params.categoryName);
    }
    // Else load all models
    else modelsData = await getAll();

    // If the search is used, filter the models
    if (modelsData && query !== null) {
      modelsData = filterModelsByCurrentQuery(modelsData);
    }

    // If the models data could not be fetched,
    // set the models to an empty array
    else if (!modelsData) modelsData = [];

    setModels(modelsData);
  }

  // Filter an array of models according to the current query
  function filterModelsByCurrentQuery (modelsData: ModelData[]) {
    const regex = new RegExp(query!, 'gi');
    return modelsData.filter((model) => regex.test(model.title));
  }

  /**
   * Handler function
   */

  function handleButtonClick () {
    setDialogue('object')
    setModalIsOpen(true)
  }

  /**
   * Render component
   */

  return (<>
    <button onClick={handleButtonClick}>Add Item</button>
    <Search setQuery={setQuery}/>
    <div className="overview">
      <SecondaryNavigation collection={categories} setModalIsOpen={setModalIsOpen} setDialogue={setDialogue}/>
      <List models={models}/>
    </div>
    {modalIsOpen && (
      <Modal collection={categories} dialogue={dialogue} setModalIsOpen={setModalIsOpen} />
    )}
  </>);
}

export default Overview;