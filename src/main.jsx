/**
 * main.jsx
 * 
 * The entry point for the React application.
 * It mounts the App component into the root DOM node in index.html.
 * It also wraps the app with BrowserRouter for routing and AppProvider for global context.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
)
