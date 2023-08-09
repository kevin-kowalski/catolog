import React from "react";
import { SearchProps } from "./utils/Types";

function Search ({ setFilter }: SearchProps) {

  /**
   * Handler function
   */

  // When the user types in the search input use the passed down
  // setFilter method to set the filter to the input’s value
  function handleChange (event: React.FormEvent<HTMLInputElement>) {
    const filter = event.currentTarget.value;
    setFilter(filter);
  }

  /**
   * Render component
   */

  return (<>
    <input type="search" placeholder="Search 🔎" onChange={handleChange} />
  </>);
}

export default Search;