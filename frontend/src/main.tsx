import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Your CSS import might differ slightly
import { BrowserRouter } from 'react-router-dom' // <--- IMPORT THIS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* The Router MUST wrap the App component */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)