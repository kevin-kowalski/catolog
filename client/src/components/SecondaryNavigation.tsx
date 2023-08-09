import { Category, SecondaryNavigationProps } from "../types/types";
import { Link } from "react-router-dom";
function SecondaryNavigation ({ collection, setModalIsOpen, setDialogue }: SecondaryNavigationProps) {

  const collectionWithAll = [{
    _id: 'all',
    title: 'All'
  }, ...collection];

  /* Handler function */

  function handleButtonClick () {
    setDialogue('collection')
    setModalIsOpen(true)
  }

  /* Render component */

  return (<>
    <div className="secondary-navigation">
      {collectionWithAll.map((item: Category) => (
        <Link key={item._id} to={`/category/${item.title}`}>
          <div key={item._id} className="nav-item" data-value={item.title.toLowerCase()} >{item.title}</div>
        </Link>
      ))}
      <button onClick={handleButtonClick}>Add collection</button>
    </div>
  </>);
}

export default SecondaryNavigation;