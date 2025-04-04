import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
// import { useNavigate } from 'react-router-dom'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// const _RedirectAfterSignIn = () => {
//   const { isSignedIn } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//       if (isSignedIn) {
//           navigate('/dashboard'); // Redirect after sign-in
//       }
//   }, [isSignedIn, navigate]);

//   return null; // No UI needed
// };

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App onLogin={function (): void {
        throw new Error('Function not implemented.')
      } } />
    </ClerkProvider>
  </StrictMode>,
)
