import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, BrowserRouter,  Routes} from "react-router-dom"
import App from './App';
import './index.css';
// import reportWebVitals from './reportWebVitals';

const route =(
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element ={< App />} />
  </Routes>
  </BrowserRouter>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <React.StrictMode>
   {route}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
