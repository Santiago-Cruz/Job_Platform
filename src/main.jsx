import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BagProvider } from './assets/contexts/BagContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BagProvider>
      <App />
    </BagProvider>
  </React.StrictMode>,
)
