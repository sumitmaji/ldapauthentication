import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./component/Login/Login";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
