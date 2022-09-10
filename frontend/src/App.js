import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk"
import { createStore, applyMiddleware, combineReducers } from "redux";
import { restReducer } from "./redux/restReducers";
import restMiddleware from "./redux/restMiddleware";
import {getCommonReducers} from './common/reducers/combineReducers';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Welcome from "./Welcome";
import LoadData from "./LoadData";
import {LOADINGUI} from './loading/LoadingRedux'
import Loading from './loading/Loading'
import axiosReducer from "./redux/reducers/rootReducer"

import TableSchemaPage from "./pages/TableSchema"
import Header from "./pages/Header";
import TableForm from "./pages/TableForm";

const reducers = {
  restReducer,
  loading: getCommonReducers(LOADINGUI),
  ...axiosReducer
};

let store;

const logger = store => {
  return next => {
    return action => {
      const ac =  next(action)
      console.log("Store state after action: ", store.getState())
      return ac;
    }
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const middleWare = restMiddleware(props.contextPath);
    const rootReducer = combineReducers({...reducers});
    store = createStore(rootReducer, applyMiddleware(middleWare,thunk, logger));
  }

  render() {
    return (
      <IntlProvider locale={"en-US"}>
        <Provider store={store}>
          <Header />
          <BrowserRouter basename={this.props.contextPath}>
            <Routes>
              <Route path={"/"} element={<Welcome/>} />
              <Route path={"/load"} element={<LoadData/>} />
              <Route path={"/tableschema"} element={<TableSchemaPage/>} />
              <Route path={"/tableForm"} element={<TableForm/>} />
            </Routes>
          </BrowserRouter>
          <Loading/>
        </Provider>
      </IntlProvider>
    );
  }
}
