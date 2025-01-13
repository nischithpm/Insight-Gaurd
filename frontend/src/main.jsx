import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TipOfTheDay from './components/TipOfTheDay.jsx'
import ImageUploadComponent from './components/ImageUploadComponent.jsx'
import ImageProcessingComponent from './components/ImageProcessing.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import GoogleLoginComponent from './components/GoogleLogin.jsx'
import Analytics from './components/Analytics';
import Cards from './components/Cards';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import GeminiPrompt from './components/GeminiPrompt.jsx'
import AboutPage from './components/AboutPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const BACKENDURL = 'http://localhost:8000'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App backendUrl={BACKENDURL}/>
  },
  {
    path:'/about',
    element: <AboutPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='YOUR_CLIENT_ID' >
    {/* Please Add the ClientID for GoogleOAuthProvider */}
    <React.StrictMode>
    <GoogleLoginComponent />
    <RouterProvider router={router} />
  </React.StrictMode>
  </GoogleOAuthProvider> 
)
