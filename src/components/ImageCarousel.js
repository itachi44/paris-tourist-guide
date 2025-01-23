import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images, autoplayDelay = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isAutoplaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, autoplayDelay);
    }
    return () => clearInterval(intervalId);
  }, [images.length, autoplayDelay, isAutoplaying]);

  const goToNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative group w-full h-full"
      onMouseEnter={() => setIsAutoplaying(false)}
      onMouseLeave={() => setIsAutoplaying(true)}
    >
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out
              ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-sm">{image.alt}</p>
              <p className="text-white/80 text-xs italic">{image.credit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={goToNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 
              ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;