import React, { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const ClusterMap = ({ trailgrounds }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!trailgrounds || trailgrounds.length === 0) return;

    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/0195d003-22b7-7208-a179-e04962fc56e4/style.json?key=jOpAI5OQbFT1MDcZgNpX",
      center: [-103.5918, 52.6699],
      zoom: 3.5,
    });

    const geojsonData = {
      type: "FeatureCollection",
      features: trailgrounds
        .filter((trail) => trail.geometry?.coordinates?.length === 2)
        .map((trail) => ({
          type: "Feature",
          properties: {
            id: trail._id,
            title: trail.title,
            location: trail.location,
            distance: trail.distance,
            price: trail.price,
          },
          geometry: trail.geometry,
        })),
    };

    map.on("load", () => {
      map.addSource("trailgrounds", {
        type: "geojson",
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // 🟡 Cluster Styling
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "trailgrounds",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#facc15", // secondary
            10,
            "#ffe45c",
            30,
            "#fff4a3",
          ],
          "circle-radius": ["step", ["get", "point_count"], 18, 10, 24, 30, 30],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#facc15",
        },
      });

      // 🔳 Unclustered Single Trail Points
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "trailgrounds",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#facc15",
          "circle-radius": 6,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#facc15",
        },
      });

      // 🔁 Cluster click behavior
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        map
          .getSource("trailgrounds")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom,
            });
          });
      });

      // 📝 Popups with more detail
      map.on("click", "unclustered-point", (e) => {
        const coords = e.features[0].geometry.coordinates.slice();
        const props = e.features[0].properties;

        const popupContent = `
          <div style="font-family: sans-serif; background-color: #121212; color: #fff; padding: 12px; border-radius: 8px; max-width: 250px;">
            <h3 style="margin: 0 0 8px; font-size: 1.2rem; color: #facc15;">${props.title}</h3>
            <p style="margin: 0;"> ${props.location}</p>
            <p style="margin: 4px 0;">${props.distance} km • $${props.price}</p>
            <a href="/trailgrounds/${props.id}" style="margin-top: 6px; display: inline-block; color: #facc15; font-weight: bold; text-decoration: underline;">View Trail</a>
          </div>
        `;

        new maptilersdk.Popup()
          .setLngLat(coords)
          .setHTML(popupContent)
          .addTo(map);
      });

      map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, [trailgrounds]);

  return (
    <div
      ref={mapContainer}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default ClusterMap;
