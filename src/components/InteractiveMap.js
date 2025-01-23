import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card } from '@/components/ui/card';
import { Train } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

const InteractiveMap = ({ attractions, onAttractionClick }) => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const parisCenter = { lat: 48.8566, lng: 2.3522 };

  const handleMarkerClick = (attraction) => {
    setSelectedAttraction(attraction);
    if (onAttractionClick) {
      onAttractionClick(attraction);
    }
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <MapContainer
        center={parisCenter}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {attractions.map((attraction) => (
          <Marker
            key={attraction.name}
            position={[attraction.coordinates.lat, attraction.coordinates.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(attraction),
            }}
          >
            <Popup>
              <Card className="p-4 max-w-sm">
                <div className="w-full h-40 mb-4">
                  <ImageCarousel images={attraction.images} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{attraction.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{attraction.quartier}</p>
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-gray-500 mt-1" />
                  <p className="text-xs text-gray-600">{attraction.transport}</p>
                </div>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Légende de la carte */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
        <h4 className="text-sm font-semibold mb-2">Légende</h4>
        <ul className="text-xs space-y-1">
          <li className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Monuments</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Musées</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Quartiers historiques</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InteractiveMap;