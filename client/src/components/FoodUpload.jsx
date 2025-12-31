import { useState } from "react";

function FoodUpload({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mealType, setMealType] = useState("lunch");


  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("mealType", mealType);


      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/detect-food`,  {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Server error");
      }

      // ✅ VERY IMPORTANT
      setResult(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
  type="file"
  accept="image/*"
  onChange={(e) => setFile(e.target.files[0])}
  className="block w-full text-sm text-gray-600
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:text-sm file:font-semibold
             file:bg-green-100 file:text-green-700
             hover:file:bg-green-200" />

      <br /><br />

      <select
  value={mealType}
  onChange={(e) => setMealType(e.target.value)}
  className="border rounded-lg px-3 py-2 w-full"
>
  <option value="breakfast">🍳 Breakfast</option>
  <option value="lunch">🍛 Lunch</option>
  <option value="dinner">🍽 Dinner</option>
</select>


     <button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
>
  {loading ? "Analyzing..." : "Analyze Food"}
</button>



      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default FoodUpload;
