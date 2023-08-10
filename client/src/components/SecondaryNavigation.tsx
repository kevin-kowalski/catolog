import { Category, SecondaryNavigationProps } from "../types/types";
import { Link } from "react-router-dom";
import { deleteOneCategory } from "../services/apiService";
import { useNavigate } from "react-router-dom";

function SecondaryNavigation ({ collection, setModalIsOpen, setDialogue, loadCategories }: SecondaryNavigationProps) {

  /* Hook */

  const navigate = useNavigate();

  /* Constant */

  const collectionWithAll = [{
    _id: 'all',
    title: 'All'
  }, ...collection];

  /* Handler function */

  function handleClick () {
    setDialogue('collection');
    setModalIsOpen(true);
  }

  function deleteCategory(id: string | undefined) {
    console.log(id);
    deleteOneCategory(id);
    navigate('/');
    loadCategories();
  }

  /* Render component */

  return (<>
    <div className="secondary-navigation appear">
      <div className="link-list">
        <div className="link-list-title">Collections</div>
        {collectionWithAll.map((item: Category) => (<>
          <div className="nav-item-wrapper">
            <Link key={item._id} to={`/category/${item.title}`} className="nav-item" >
              <div key={item._id} className="nav-item-text" data-value={item.title.toLowerCase()} >{item.title}</div>
            </Link>
            <svg className="icon button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={() => deleteCategory(item._id)}>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        </>))}
      </div>
      <div className="button add add-collection" onClick={handleClick}>Add collection</div>
    </div>
  </>);
}

export default SecondaryNavigation;


