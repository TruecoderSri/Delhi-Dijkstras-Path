// In Maps.js
import PropTypes from "prop-types";
import { useEffect } from "react";
import L from "leaflet";

const Maps = ({ mapRef }) => {
  useEffect(() => {
    if (!mapRef.current) {
      const delhiCoordinates = [28.6139, 77.209];
      const map = L.map("map", {
        maxBounds: [
          [28.4, 76.9], // South-west coordinates
          [28.9, 77.7], // North-east coordinates
        ],
      }).setView(delhiCoordinates, 11);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const legendContainer = L.control({ position: "bottomright" });
      legendContainer.onAdd = function () {
        const div = L.DomUtil.create("div", "legend-container");
        div.innerHTML = `
          <div class="legend-item flex flex-row">
            <div class="legend-marker bg-red-500 w-4 h-4 mr-2 mb-2"></div>
            <span>Starting</span>
          </div>
          <div class="legend-item flex flex-row">
            <div class="legend-marker bg-yellow-500 w-4 h-4 mr-2 mb-2"></div>
            <span>Via (Optional)</span>
          </div>
          <div class="legend-item flex flex-row">
            <div class="legend-marker bg-green-500 w-4 h-4 mr-2 mb-2"></div>
            <span>End </span>
          </div>
        `;
        return div;
      };
      legendContainer.addTo(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  });

  return <div id="map" className="p-2 h-full"></div>;
};

Maps.propTypes = {
  mapRef: PropTypes.object.isRequired,
};

export default Maps;
