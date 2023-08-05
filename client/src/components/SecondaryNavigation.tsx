import React from "react";

function SecondaryNavigation ({ collection, setPredicate }: { collection: string[], setPredicate: React.Dispatch<React.SetStateAction<string>> }) {

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
    {collection.map((item: string) => (
      <div className="nav-item" key={item} data-value={item.toLowerCase()} onClick={handleClick}>{item}</div>
    ))}
  </>);
}

export default SecondaryNavigation;