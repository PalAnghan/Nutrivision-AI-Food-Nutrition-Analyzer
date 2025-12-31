import { useState } from "react";
import FoodUpload from "../components/FoodUpload";
import ResultCard from "../components/ResultCard";

function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full text-center">
        
        <h1 className="text-3xl font-bold mb-2">
          AI Food Nutrition Analyzer
        </h1>

        <p className="text-gray-600 mb-6">
          Upload your food image and instantly get calorie & nutrition details
        </p>

        <FoodUpload setResult={setResult} />

        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}

export default Home;
