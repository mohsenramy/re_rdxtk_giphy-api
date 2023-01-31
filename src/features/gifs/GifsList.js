import React from "react";
import { useSelector } from "react-redux";
import GifsResultsPagination from "./GifsResultsPagination";
import { getGifsStatus, selectAllGifs } from "./gifsSlice";

const GifsList = () => {
  const gifs = useSelector(selectAllGifs);
  const status = useSelector(getGifsStatus);
  const error = useSelector(selectAllGifs);

  // console.log({ gifs });

  let content;
  let message;
  if (status === "idle") {
    message = <div></div>;
  } else if (status === "loading") {
    message = <div>...Loading</div>;
  } else if (status === "succeeded") {
    if (gifs.length === 0) {
      message = <div>Found no results </div>;
    }
    message = <GifsResultsPagination />;

    content = gifs.map((gif) => {
      // console.log("🚀 ~ file: GifsList.js:34 ~ content+=gifs.map ~ gif", gif);

      return (
        <div key={gif.id} className="searchResult">
          {/* <div>{gif.images.fixed_height.url}</div> */}
          <img src={gif.images.fixed_height_small.url} alt={gif.slug} />
          <p>{gif.slug}</p>
        </div>
      );
    });
  }

  return (
    <div className="searchResultsContainer">
      <h3>Gifs Results</h3>
      <h4>{message}</h4>
      <h4>{error.message}</h4>
      <div className="searchResults">{content}</div>
    </div>
  );
};

export default GifsList;
