import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import GifsSearch from "./features/gifs/GifsSearch";
import GifsSearchPage from "./features/gifs/GifsSearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GifsSearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
