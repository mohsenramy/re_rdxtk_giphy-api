import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSearchTerm, fetchGifs } from "./gifsSlice";

const GifsSearch = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const onSearchClicked = () => {
    dispatch(fetchGifs({ searchTerm: searchText }));
  };

  const onSearchTermChanges = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="searchContainer">
      <input
        type="text"
        id="search-text"
        name="search-text"
        value={searchText}
        onChange={onSearchTermChanges}
        className="searchTerm"
      />
      <button onClick={onSearchClicked}>Search</button>
    </div>
  );
};

export default GifsSearch;
