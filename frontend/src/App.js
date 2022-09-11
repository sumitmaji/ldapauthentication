import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import APIErrorProvider from "./common/providers/APIErrorProvider";
import APIErrorNotification from "./component/APIErrorNotification";

import "./App.css";
import Login from "./component/Login/Login";

function App({ contextPath }) {
  return (
    <div className="wrapper">
      <APIErrorProvider>
        <APIErrorNotification />
        <BrowserRouter>
          <Routes>
            <Route path={"/authenticate"} element={<Login contextPath />} />
          </Routes>
        </BrowserRouter>
      </APIErrorProvider>
    </div>
  );
}

export default App;
