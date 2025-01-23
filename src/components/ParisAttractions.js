import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Train, Bus, X } from 'lucide-react';
import { attractions } from '../data/attractions';
import ImageCarousel from './ImageCarousel';

const ParisAttractions = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (attraction, index) => {
    setSelectedImage(attraction);
    setSelectedImageIndex(index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Les Plus Beaux Endroits de Paris</h1>
      
      <div className="space-y-6">
        {attractions.map((attraction) => (
          <Card key={attraction.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <div className="cursor-pointer" onClick={() => openLightbox(attraction, 0)}>
                    <ImageCarousel images={attraction.images} />
                  </div>
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

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full mx-auto" onClick={e => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative aspect-video">
              <ImageCarousel 
                images={selectedImage.images} 
                autoplayDelay={6000}
              />
            </div>

            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.name}</h3>
              <p className="text-sm text-gray-300">{selectedImage.quartier}</p>
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