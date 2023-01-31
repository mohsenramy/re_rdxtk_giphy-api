import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifs, getGifsPagination, getGifsStatus } from "./gifsSlice";

const GifsResultsPagination = () => {
  const dispatch = useDispatch();
  const status = useSelector(getGifsStatus);
  const pagination = useSelector(getGifsPagination);
  console.log(
    "🚀 ~ file: GifsResultsPagination.js:9 ~ GifsResultsPagination ~ pagination",
    pagination
  );

  const totalPages = () => {
    let extras = pagination.totalCount % pagination.pageLimit === 0 ? 0 : 1;
    console.log(
      "🚀 ~ file: GifsResultsPagination.js:16 ~ totalPages ~ extras",
      extras
    );
    return parseInt(pagination.totalCount / pagination.pageLimit + extras);
  };
  if (status !== "succeeded") {
    return <>no paging</>;
  }

  const onHandlePageChange = (change) => {
    let newPage = Number(pagination.currentPage) + change;
    console.log(
      "🚀 ~ file: GifsResultsPagination.js:28 ~ onHandlePageChange ~ newPage",
      newPage,
      pagination.currentPage,
      change
    );
    dispatch(fetchGifs({ currentPage: newPage }));
  };
  return (
    <div>
      <div>
        <span>totalResults{pagination?.totalCount}</span>
      </div>
      <div>
        <button
          // disabled={() => pagination.currentPage === 1}
          onClick={() => onHandlePageChange(-1)}
        >
          previous
        </button>
        <span>
          page {pagination.currentPage} of {totalPages()}
        </span>
        <button onClick={() => onHandlePageChange(1)}>next</button>
      </div>
    </div>
  );
};

export default GifsResultsPagination;
