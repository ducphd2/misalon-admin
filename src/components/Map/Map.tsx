import React, { useState } from "react";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { GOOGLE_MAP_KEY } from "../../constants";
import LocationMarker from "../../assets/images/location.png";
export interface MarkerPosition {
  lat: number;
  lng: number;
}

interface MapProps {
  defaultValue: MarkerPosition;
  onCloseModal: () => void;
  onSelected: (position: MarkerPosition) => void;
}

const Map: React.FC<MapProps> = ({
  defaultValue,
  onCloseModal,
  onSelected,
}) => {
  const [markerPosition, setMarkerPosition] =
    useState<MarkerPosition>(defaultValue);

  const handleMapClick = (event: ClickEventValue) => {
    const { lat, lng } = event;
    const newPosition: MarkerPosition = { lat, lng };
    setMarkerPosition(newPosition);
    onSelected(newPosition);
  };

  console.log({markerPosition})

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        onClick={handleMapClick}
        center={markerPosition}
        zoom={11}
        bootstrapURLKeys={{
          key: GOOGLE_MAP_KEY,
        }}
      >
        <Marker lat={markerPosition.lat} lng={markerPosition.lng} />
      </GoogleMapReact>
    </div>
  );
};

interface MarkerProps {
  lat: number;
  lng: number;
}

const Marker: React.FC<MarkerProps> = ({ lat, lng }) => (
  <img
    src={LocationMarker}
    alt="Marker"
    style={{
      position: "absolute",
      transform: "translate(-50%, -100%)",
      width: "40px",
      height: "40px",
    }}
  />
);

export default Map;
