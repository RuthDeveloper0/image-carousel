import React, { useState } from "react";
import Carousel from "./Carousel/Carousel";
import RecipesCarousel from "./RecipesCarousel/RecipesCarousel";


const sampleImages = [
  "https://picsum.photos/id/10/800/450",
  "https://picsum.photos/id/20/800/450",
  "https://picsum.photos/id/30/800/450"
];

function App() {
  const [showRecipes, setShowRecipes] = useState(true);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>פרויקט קרוסלות</h1>
      
      <h3 style={{ textAlign: "center" }}>קרוסלה מקומית</h3>
      <Carousel images={sampleImages} intervalSeconds={3} />

      <hr style={{ margin: "40px 0" }} />

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button onClick={() => setShowRecipes(!showRecipes)}>
          {showRecipes ? "הסתר קרוסלת מתכונים" : "הצג קרוסלת מתכונים"}
        </button>
      </div>

      {showRecipes && <RecipesCarousel />}
    </div>
  );
}

export default App;