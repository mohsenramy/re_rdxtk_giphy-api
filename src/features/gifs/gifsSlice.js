import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  gifs: [],
  status: "idle",
  error: "",
  searchTerm: "",
  pageLimit: 25,
  currentPage: 1,
  totalCount: 0,
};
const API_URL = "https://api.giphy.com/v1/gifs/search";
const API_KEY = process.env.REACT_APP_GIFY_API_KEY;
export const fetchGifs = createAsyncThunk(
  "gifs/fetchGifs",
  async (searchTerms, thunkAPI) => {
    if (searchTerms?.searchTerm) {
      thunkAPI.dispatch(addSearchTerm({ searchTerm: searchTerms.searchTerm }));
    }
    if (searchTerms?.currentPage) {
      thunkAPI.dispatch(
        currentPageChanged({ currentPage: searchTerms.currentPage })
      );
    }
    const { pageLimit, searchTerm } = thunkAPI.getState().gifs;
    const page = Number(searchTerms.currentPage || 1);

    try {
      const response = await axios.get(`${API_URL}`, {
        params: {
          api_key: API_KEY,
          q: searchTerms?.searchTerm || searchTerm,
          offset: (page - 1) * Number(pageLimit),
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
);

const gifsSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {
    addSearchTerm(state, action) {
      state.searchTerm = action.payload.searchTerm;
      // state.currentPage = 1;
    },
    currentPageChanged(state, action) {
      state.currentPage = action.payload.currentPage;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchGifs.pending, (state, action) => {
        state.status = "loading";
        // state.searchTerm = action.payload.searchTerm
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gifs = action.payload.data;
        state.totalCount = action.payload.pagination.total_count;
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        console.log("🚀 ~ file: gifsSlice.js:73 ~ .addCase ~ action", action);
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllGifs = (state) => state.gifs.gifs;
export const getGifsStatus = (state) => state.gifs.status;
export const getGifsError = (state) => state.gifs.error;
export const getGifsPagination = (state) => {
  return {
    currentPage: state.gifs.currentPage,
    pageLimit: state.gifs.pageLimit,
    totalCount: state.gifs.totalCount,
  };
};

export const { addSearchTerm, currentPageChanged } = gifsSlice.actions;

export default gifsSlice.reducer;
