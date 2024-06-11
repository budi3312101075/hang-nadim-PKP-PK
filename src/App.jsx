import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPages } from "./pages";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
