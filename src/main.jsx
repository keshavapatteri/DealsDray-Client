// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from 'react';
import ReactDOM from 'react-dom/client'; // From React 18 onwards
import './index.css';
import App from './App';

// Creating a root and rendering the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <App/>
  
);
