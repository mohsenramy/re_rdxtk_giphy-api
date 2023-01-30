import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  gifs: [],
  status: "idle",
  error: "",
};
const API_URL = "https://api.giphy.com/v1/gifs/search";
const API_KEY = process.env.REACT_APP_GIFY_API_KEY;

export const fetchGifs = createAsyncThunk(
  "gifs/fetchGifs",
  async (searchText) => {
    console.log(API_KEY);
    try {
      const response = await axios.get(
        `${API_URL}?api_key=${API_KEY}&q=${searchText}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const gifsSlice = createSlice({
  name: "gifs",
  initialState,
  reducer: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGifs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gifs = action.payload;
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllGifs = (state) => state.gifs.gifs;
export const getGifsStatus = (state) => state.gifs.status;
export const getGifsError = (state) => state.gifs.error;

export default gifsSlice.reducer;
