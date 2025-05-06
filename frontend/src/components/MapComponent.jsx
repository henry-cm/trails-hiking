import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ location, coordinates }) => {
  if (!coordinates || coordinates.length !== 2) return null; // Ensure valid coordinates

  return (
    <MapContainer
      center={[coordinates[1], coordinates[0]]}
      zoom={12}
      style={{ height: "300px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${
          import.meta.env.VITE_MAPTILER_API_KEY
        }`}
      />
      <Marker position={[coordinates[1], coordinates[0]]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
