import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// states kyun mhi bana rahe -- reason bcz states ko deep down the components tak bhejna bahut dimaag khoti karne wala kaam ho jaayega. File structure ek tree k structure jaisa hi hai

//  Context Api - use karne ka yeah fyda hai ki agar hummne ek baar agar koi context banaya hai toh. bun ne k baad toh jaashe usko c1 use kare ya koi sa bhi component use kare bus hume kya karna hogi ki hume context api ko call karna hoga useContext hook k trough. States ko hum basically context k ander daal dete hai 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

