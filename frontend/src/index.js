import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
const ctx = window.contextPath;
root.render(
  <React.StrictMode>
  <HashRouter>
    <App contextPath={ctx}/>
    </HashRouter>
  </React.StrictMode>
);
