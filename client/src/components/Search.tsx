import React from "react";
import { SearchProps } from "../types/types";

function Search ({ setQuery }: SearchProps) {

  /* Handler function */

  // When the user types in the search input use the passed down
  // setFilter method to set the filter to the input’s value
  function handleChange (event: React.FormEvent<HTMLInputElement>) {
    const query = event.currentTarget.value;
    setQuery(query);
  }

  /* Render component */

  return (<>
    <input type="search" placeholder="Search" onChange={handleChange} />
  </>);
}

export default Search;