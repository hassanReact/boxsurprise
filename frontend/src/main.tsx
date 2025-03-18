import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // ✅ Import BrowserRouter
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppContextProvider } from './context/AppContext.tsx'
import Navbar from './components/Navbar.tsx'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap everything inside BrowserRouter */}
      <AppContextProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
         <Navbar/>
          <App />
        </ClerkProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
