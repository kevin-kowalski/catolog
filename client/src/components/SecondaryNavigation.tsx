import { Category, SecondaryNavigationProps } from "../types/types";
import { Link } from "react-router-dom";
function SecondaryNavigation ({ collection, setModalIsOpen, setDialogue }: SecondaryNavigationProps) {

  const collectionWithAll = [{
    _id: 'all',
    title: 'All'
  }, ...collection];

  /* Handler function */

  function handleClick () {
    setDialogue('collection')
    setModalIsOpen(true)
  }

  /* Render component */

  return (<>
    <div className="secondary-navigation">
      <div className="link-list">
        <div className="link-list-title">Collections</div>
        {collectionWithAll.map((item: Category) => (
          <Link key={item._id} to={`/category/${item.title}`}>
            <div key={item._id} className="nav-item" data-value={item.title.toLowerCase()} >{item.title}</div>
          </Link>
        ))}
      </div>
      <div className="button add add-collection" onClick={handleClick}>Add collection</div>
    </div>
  </>);
}

export default SecondaryNavigation;