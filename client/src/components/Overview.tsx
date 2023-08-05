import { useEffect, useState } from "react";
import { IElement } from "./utils/WeeTypes";
import { getAll, getCategories, getCategory } from "../services/apiService";
import List from "./List";
import SecondaryNavigation from "./SecondaryNavigation";

function Overview () {

  // State variables
  const [categories, setCategories] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [models, setModels] = useState<IElement[]>([]);

  // Retrieve all categories and set the categories
  // state variable to them
  useEffect(() => {
    getCategories().then((categories) => setCategories(categories));
  }, []);

  // When the currentCategory state variable is updated,
  // retrieve all models belonging to this category.
  useEffect(() => {
    if (currentCategory === 'all') {
      getAll()
        .then((models) => {
          setModels(models);
        });
    }
    else {
      getCategory()
        .then((models) => {
          setModels(models);
        });
    }
  }, [currentCategory]);

  /**
   * Render component
   */

  return (<>
    <SecondaryNavigation collection={categories} setPredicate={setCurrentCategory} />
    <List models={models}/>
  </>);
}

export default Overview;