import React, { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapComponent = ({ coordinates, location }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!coordinates || coordinates.length !== 2) return;

    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.OUTDOOR,
      center: coordinates,
      zoom: 10,
    });

    new maptilersdk.Marker()
      .setLngLat(coordinates)
      // .setPopup(
      //   new maptilersdk.Popup({ offset: 25 }).setHTML(
      //     `<h3>${location || "Custom Coordinates"}</h3>`
      //   )
      // )
      .addTo(map);

    return () => map.remove();
  }, [coordinates, location]);

  return <div ref={mapContainer} style={{ height: "300px", width: "100%" }} />;
};

export default MapComponent;
