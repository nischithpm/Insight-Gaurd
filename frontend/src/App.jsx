import { useState, useEffect } from "react";
import axios from "axios";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Analytics from "./components/Analytics";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import GeminiPrompt from "./components/GeminiPrompt";
import TipOfTheDay from "./components/TipOfTheDay";
import ImageProcessingComponent from "./components/ImageProcessing";
import ImageUploadComponent from "./components/ImageUploadComponent";
import Newsletter from "./components/Newsletter";
import FadeInLeft from "./components/FadeInLeft";

function App({ backendUrl }) {
  const BACKENDURL = "http://localhost:8000";

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/hello-world`)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Hello World From React ⚛️</h1>
      <p>{message} From Django ⚒️</p>
      <Navbar />
      <Hero />
      <Analytics />
      <Cards />
      <TipOfTheDay />
      <ImageUploadComponent backendUrl={BACKENDURL} />
      <ImageProcessingComponent backendUrl={BACKENDURL} />
      <GeminiPrompt />
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
