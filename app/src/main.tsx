import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Web3Context from './contexts/Web3Context.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3Context.Provider value={null}>
      <App />
    </Web3Context.Provider>
  </React.StrictMode>,
)
