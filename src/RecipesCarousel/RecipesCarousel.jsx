import React, { useState, useEffect } from "react";
import Carousel from "../Carousel/Carousel";

function RecipesCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = "https://dummyjson.com/recipes?limit=6&select=name,image";

  useEffect(() => {
    const controller = new AbortController();

    async function loadImages() {
      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("שגיאה בטעינת המתכונים מהשרת");
        }

        const data = await response.json();

        const recipeImages = data.recipes.map((recipe) => recipe.image);

        setImages(recipeImages);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err.message);
        setLoading(false);
      }
    }

    loadImages();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <div className="carousel-message">טוען...</div>;
  }

  if (error) {
    return <div className="carousel-message error">שגיאה: {error}</div>;
  }

  return (
    <div style={{ margin: "20px 0" }}>
      <h2 style={{ textAlign: "center", fontFamily: "Arial" }}>קרוסלת מתכונים מהשרת</h2>
      <Carousel images={images} intervalSeconds={4} />
    </div>
  );
}

export default RecipesCarousel;