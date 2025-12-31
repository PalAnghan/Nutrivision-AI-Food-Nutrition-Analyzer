import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import FoodUpload from "./components/FoodUpload";
import ResultCard from "./components/ResultCard";
import Navbar from "./components/Navbar";
import History from "./pages/History";


function App() {
  const [result, setResult] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-green-600 mb-2">
          AI Food Nutrition Analyzer
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Upload your food image and instantly get calorie & nutrition details
        </p>

        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <FoodUpload setResult={setResult} />
        </div>

        {/* Result Card */}
        {result && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <ResultCard result={result} />
          </div>
        )}

      </div>
    </div>
  }
/>


        {/* HISTORY PAGE */}
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
