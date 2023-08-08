import React from "react";
import { Category, SecondaryNavigationProps } from "./utils/Types";
import { Link } from "react-router-dom";
function SecondaryNavigation ({ collection, setPredicate, setModalIsOpen, setDialogue }: SecondaryNavigationProps) {


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
    console.log('predicate', predicate)

    // go to collection route fehlt noch 
  }

  function handleButtonClick () {
    setDialogue('collection')
    setModalIsOpen(true)
  }

  /**
  * Render component
  */

  return (<>
    <div className="secondary-navigation">
      {collectionWithAll.map((item: Category) => (
        <Link key={item._id} to={`/category/${item.title}`}>
          <div key={item._id} className="nav-item" data-value={item.title.toLowerCase()} onClick={handleClick}>{item.title}</div>
        </Link>
      ))}
      <button onClick={handleButtonClick}>Add collection</button>
    </div>
  </>);
}

export default SecondaryNavigation;