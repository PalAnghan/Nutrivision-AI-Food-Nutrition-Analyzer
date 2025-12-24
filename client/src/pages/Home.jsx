import { useEffect } from "react";

function Home() {
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <div>
      <h1>NutriVision</h1>
      <p>Check console for backend message</p>
    </div>
  );
}

export default Home;
