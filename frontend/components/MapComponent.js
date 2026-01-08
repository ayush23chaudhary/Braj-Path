'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icons for different types
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          transform: rotate(45deg);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
        ">📍</div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

// Temple icon (Krishna Blue)
const templeIcon = createCustomIcon('#1E40AF');

// Hotel icon (Radha Pink)
const hotelIcon = createCustomIcon('#EC4899');

// Route point icon (Saffron)
const routeIcon = createCustomIcon('#F59E0B');

// Component to handle map centering
function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  
  return null;
}

/**
 * MapComponent - Reusable Leaflet map with OpenStreetMap
 * 
 * @param {Object} props
 * @param {Array} props.markers - Array of marker objects with { id, position: [lat, lng], title, description, type }
 * @param {Array} props.center - Center position [lat, lng]
 * @param {Number} props.zoom - Zoom level (default: 13)
 * @param {String} props.height - Map height (default: '400px')
 * @param {Function} props.onMarkerClick - Callback when marker is clicked
 */
export default function MapComponent({ 
  markers = [], 
  center = [27.4924, 77.6737], // Default: Mathura
  zoom = 13,
  height = '400px',
  onMarkerClick
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render map on server side
  if (!isMounted) {
    return (
      <div 
        style={{ height }} 
        className="bg-gray-100 rounded-lg flex items-center justify-center"
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  // Get icon based on marker type
  const getMarkerIcon = (type) => {
    switch (type) {
      case 'temple':
        return templeIcon;
      case 'hotel':
        return hotelIcon;
      case 'route':
        return routeIcon;
      default:
        return undefined; // Use default Leaflet marker
    }
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        {/* OpenStreetMap Tiles - 100% Free, No API Key Required! */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Map Controller for dynamic centering */}
        <MapController center={center} zoom={zoom} />

        {/* Render Markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={getMarkerIcon(marker.type)}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(marker);
                }
              },
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-blue-900 mb-1">{marker.title}</h3>
                {marker.description && (
                  <p className="text-sm text-gray-600">{marker.description}</p>
                )}
                {marker.address && (
                  <p className="text-xs text-gray-500 mt-1">📍 {marker.address}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

/**
 * Example Usage:
 * 
 * <MapComponent
 *   markers={[
 *     {
 *       id: 1,
 *       position: [27.4924, 77.6737],
 *       title: "Krishna Janmabhoomi",
 *       description: "Birthplace of Lord Krishna",
 *       type: "temple"
 *     },
 *     {
 *       id: 2,
 *       position: [27.5806, 77.6976],
 *       title: "Banke Bihari Temple",
 *       description: "Famous temple in Vrindavan",
 *       type: "temple"
 *     }
 *   ]}
 *   center={[27.4924, 77.6737]}
 *   zoom={12}
 *   height="500px"
 *   onMarkerClick={(marker) => console.log('Clicked:', marker)}
 * />
 */
