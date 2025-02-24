// src/components/MapContainer.js
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 40.7128,  // Default center (e.g., New York)
  lng: -74.0060
};

const MapContainer = ({ onLocationChange }) => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const autocompleteRef = useRef(null);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const newCenter = { lat, lng };
        setMapCenter(newCenter);
        setMarkerPosition(newCenter);
        // Call the parent's callback with the new coordinates
        if (onLocationChange) {
          onLocationChange(newCenter);
        }
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <div style={{ marginBottom: '1rem' }}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search places..."
            style={{ width: 300, height: 40, fontSize: 16, padding: '0 10px' }}
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
