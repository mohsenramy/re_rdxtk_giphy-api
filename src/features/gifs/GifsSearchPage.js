import React from "react";
import GifsList from "./GifsList";
import GifsSearch from "./GifsSearch";

const GifsSearchPage = () => {
  return (
    <section>
      <GifsSearch />
      <GifsList />
    </section>
  );
};

export default GifsSearchPage;
