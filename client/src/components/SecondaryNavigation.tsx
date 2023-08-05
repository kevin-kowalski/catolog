import React from "react";
import { ICategory } from "./utils/WeeTypes";

function SecondaryNavigation ({ collection, setPredicate }: { collection: ICategory[], setPredicate: React.Dispatch<React.SetStateAction<string>> }) {

  const collectionWithAll = [{
    _id: 'all',
    title: 'All'
  }, ...collection];

  /**
   * Handler function
   */

  // When the user clicks on an item of the collection,
  // use it to set the predicate
  function handleClick (event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const predicate = event.currentTarget.dataset.value as string;
    setPredicate(predicate);
  }

  /**
  * Render component
  */

  return (<>
    <div className="secondary-navigation">
      {collectionWithAll.map((item: ICategory) => (
        <div className="nav-item" key={item._id} data-value={item.title.toLowerCase()} onClick={handleClick}>{item.title}</div>
      ))}
    </div>
  </>);
}

export default SecondaryNavigation;