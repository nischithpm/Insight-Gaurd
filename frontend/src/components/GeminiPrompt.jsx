//GEMINI API KEY: AIzaSyDSaZR7k1bTb2YzebVOH17A0hnZVTMHdFo

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import LoaderIcon from "./LoaderIcon/Loader";

const GeminiPrompt = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);

  const genAI = new GoogleGenerativeAI(
    // PLEASE ADD YOUR GEMINI API KEY
  );

  const fetchData = async () => {
    try {
        console.log("Fetch Data is called");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `
            You are expert in the consulting in given advice for the user who are diagnosis with eye disease, Recommended the Nutrition plan and healthy lifestyle for them to increase in their longetivity. 
            Answer in 100 words only!
            `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setApiData(text);
      console.log("Fetch Data is ended with text==>", text);
    } catch (error) {
      console.log("Error Occurred:===>", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = () => {
    setLoading(true);
    fetchData();
  };
  return (
    <div className="bg-white p-4 text-center">
      <h1>Google Gemini Pro AI Integration with React Vite</h1>
      <button onClick={handleSubmit} className="bg-green-400 my-2 border-solid rounded p-2 font-bold">Generate AI Report</button>
      {loading ? <LoaderIcon /> : <h1>{apiData}</h1> }
    </div>
  );
};

export default GeminiPrompt;
