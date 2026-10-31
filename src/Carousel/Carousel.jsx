import React, { useState, useEffect } from "react";
import CarouselItem from "./CarouselItem";
import "./Carousel.css";

function Carousel({ images, intervalSeconds = 3 }) {
  const [selected, setSelected] = useState(0);

  const move = (step) => {
    setSelected((prev) => {
      const count = images.length;
      return (prev + step + count) % count;
    });
  };

  // שלב 7: מעבר אוטומטי מתוקן (ללא תלות ב-selected כדי למנוע לולאה אינסופית)
  useEffect(() => {
    const timer = setInterval(() => {
      setSelected((prev) => {
        const count = images.length;
        return (prev + 1 + count) % count;
      });
    }, intervalSeconds * 1000);

    // פונקציית ניקוי (Cleanup)
    return () => {
      clearInterval(timer);
    };
  }, [intervalSeconds, images.length]);

  return (
    <div className="carousel">
      {/* תצוגת התמונות */}
      {images.map((imgSrc, index) => {
        if (index !== selected) return null;

        return (
          <CarouselItem 
            key={index} 
            src={imgSrc} 
            alt={`תמונה ${index + 1}`} 
          />
        );
      })}

      {/* חיצי הקודם והבא */}
      <button className="carousel-arrow prev" onClick={() => move(-1)}>
        ❮
      </button>
      <button className="carousel-arrow next" onClick={() => move(1)}>
        ❯
      </button>

      {/* אזור הנקודות בתחתית */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={index === selected ? "carousel-dot active" : "carousel-dot"}
            onClick={() => setSelected(index)}
            aria-label={`עבר לתמונה ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;