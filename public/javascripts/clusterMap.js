import React, { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const ClusterMap = ({ trailgrounds }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!trailgrounds || trailgrounds.length === 0) {
      console.log("No trailgrounds data available"); // ✅ Debugging
      return;
    }

    console.log("Trail Data for Clusters:", trailgrounds); // ✅ Debugging

    maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.OUTDOOR,
      center: [-103.5918, 40.6699],
      zoom: 3,
    });

    // ✅ Convert Trails into GeoJSON
    const geojsonData = {
      type: "FeatureCollection",
      features: trailgrounds
        .filter(
          (trail) => trail.geometry && trail.geometry.coordinates.length === 2
        )
        .map((trail) => ({
          type: "Feature",
          properties: { title: trail.title },
          geometry: trail.geometry,
        })),
    };

    console.log("Processed GeoJSON Data:", geojsonData); // ✅ Debugging

    map.on("load", () => {
      map.addSource("trailgrounds", {
        type: "geojson",
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Clustered Points
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "trailgrounds",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#00BCD4",
            10,
            "#2196F3",
            30,
            "#3F51B5",
          ],
          "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 30, 25],
        },
      });

      // Unclustered Points
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "trailgrounds",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 4,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      // Cluster Click Event
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;

        map
          .getSource("trailgrounds")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            map.easeTo({ center: features[0].geometry.coordinates, zoom });
          });
      });

      // Trail Popup
      map.on("click", "unclustered-point", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;

        new maptilersdk.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h3>${title}</h3>`)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [trailgrounds]);

  return <div ref={mapContainer} style={{ height: "500px", width: "100%" }} />;
};

export default ClusterMap;
