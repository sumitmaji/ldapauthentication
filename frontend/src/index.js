import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
const ctx = window.contextPath;
root.render(
  <React.StrictMode>
    <App contextPath={ctx}/>
  </React.StrictMode>
);
