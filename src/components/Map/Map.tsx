import React, { useState } from 'react';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import { GOOGLE_MAP_KEY } from '../../constants';

interface MarkerPosition {
  lat: number;
  lng: number;
}

interface MapProps {
  defaultValue?: MarkerPosition;
  onCloseModal: () => void;
}

const Map: React.FC<MapProps> = ({ defaultValue, onCloseModal }) => {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition | null>(
    defaultValue || null
  );

  const handleMapClick = (event: ClickEventValue) => {
    const { lat, lng } = event;
    setMarkerPosition({ lat, lng });
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        onClick={handleMapClick}
        center={defaultValue || { lat: 0, lng: 0 }}
        zoom={defaultValue ? 11 : 2}
        bootstrapURLKeys={{
          key: GOOGLE_MAP_KEY,
        }}
      >
        {markerPosition && (
          <Marker lat={markerPosition.lat} lng={markerPosition.lng} />
        )}
      </GoogleMapReact>
    </div>
  );
};

interface MarkerProps {
  lat: number;
  lng: number;
}

const Marker: React.FC<MarkerProps> = () => (
  <div className="marker">Marker</div>
);

export default Map;
