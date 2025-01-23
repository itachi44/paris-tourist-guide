import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Train, Bus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { attractions } from '../data/attractions';

const ParisAttractions = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState({});

  const handleImageError = (attractionName, index) => {
    setImageLoadError(prev => ({
      ...prev,
      [`${attractionName}-${index}`]: true
    }));
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (selectedImage) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedImage.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (selectedImage) {
      setCurrentImageIndex((prev) =>
        prev === selectedImage.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Les Plus Beaux Endroits de Paris</h1>
      
      <div className="space-y-6">
        {attractions.map((attraction) => (
          <Card key={attraction.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 relative group">
                  {!imageLoadError[`${attraction.name}-0`] && (
                    <img
                      src={attraction.images[0].url}
                      alt={attraction.images[0].alt}
                      className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setSelectedImage(attraction);
                        setCurrentImageIndex(0);
                      }}
                      onError={() => handleImageError(attraction.name, 0)}
                    />
                  )}
                  {imageLoadError[`${attraction.name}-0`] && (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Image non disponible</p>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1 italic">
                    Crédit: {attraction.images[0].credit}
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{attraction.name}</h2>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-2"/>
                        <span>{attraction.quartier}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {attraction.description}
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Train className="w-5 h-5 text-gray-500 mt-1"/>
                      <p className="text-gray-600 text-sm">
                        {attraction.transport}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal pour l'image agrandie */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl w-full px-4">
            <button
              className="absolute -top-12 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative">
              {/* Boutons de navigation */}
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                onClick={handleNextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image */}
              <img
                src={selectedImage.images[currentImageIndex].url}
                alt={selectedImage.images[currentImageIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.name}</h3>
              <p className="text-sm mt-2">{selectedImage.images[currentImageIndex].alt}</p>
              <p className="text-sm text-gray-400 mt-1">Crédit: {selectedImage.images[currentImageIndex].credit}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Conseils pour les Touristes</h2>
        <div className="space-y-3 text-gray-600">
          <p className="flex items-center">
            <Train className="w-5 h-5 mr-2 text-gray-500"/>
            Le Pass Navigo Découverte ou les tickets de métro sont indispensables pour se déplacer facilement.
          </p>
          <p className="flex items-center">
            <Bus className="w-5 h-5 mr-2 text-gray-500"/>
            Les bus touristiques offrent une vue panoramique de la ville et permettent de découvrir les principaux monuments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParisAttractions;