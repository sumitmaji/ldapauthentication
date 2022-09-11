import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./component/Login/Login";

function App({contextPath}) {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path={"/authenticate"} element={<Login contextPath/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
