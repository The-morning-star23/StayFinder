import React from "react";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

const Map = ({ longitude, latitude }) => {
  const [viewport, setViewport] = React.useState({
    latitude: latitude || 28.6139,
    longitude: longitude || 77.2090,
    zoom: 12,
  });

  return (
    <div className="map-container">
      <MapGL
        {...viewport}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width: "100%", height: "300px", borderRadius: "12px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker longitude={longitude} latitude={latitude} />
      </MapGL>
    </div>
  );
};

export default Map;
