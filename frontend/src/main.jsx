import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import global from 'global';


import './css/index.css'
import './css/buttons.css'
import './css/font-poppins.css'
window.global = window;

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
