function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 border rounded-xl bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        Detected Food
      </h2>

      <p className="text-lg font-bold text-purple-600">
        {result.food} — {result.confidence}%
      </p>

      {result.isSupported ? (
        <ul className="mt-3 text-sm text-gray-700 space-y-1">
          <li>🔥 Calories: {result.nutrition.calories} kcal</li>
          <li>🍞 Carbs: {result.nutrition.carbs} g</li>
          <li>🥩 Protein: {result.nutrition.protein} g</li>
          <li>🧈 Fat: {result.nutrition.fat} g</li>
        </ul>
      ) : (
        <>
          <p className="text-orange-600 mt-3 font-medium">
            ⚠️ This food is not supported yet. <br />
            We’ll add it in future updates.
          </p>

          {/* ✅ BONUS FEATURE BUTTON */}
          <button
            className="mt-3 text-sm text-blue-600 underline"
            onClick={() =>
              alert("Thanks! We’ll add this food soon ❤️")
            }
          >
            Request this food
          </button>
        </>
      )}
    </div>
  );
}

export default ResultCard;
